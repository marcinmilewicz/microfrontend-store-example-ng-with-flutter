import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';

// The global _flutter namespace
declare let _flutter: {
  loader: {
    loadEntrypoint: Function;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare let window: {
  _debug: any;
  addEventListener: Function;
};

@Component({
  selector: 'flutter-loader',
  standalone: true,
  template: ` <div class="flutter-target" #flutterTarget></div>`,
  styleUrls: ['./flutter-loader.component.css'],
})
export class FlutterLoaderComponent implements AfterViewInit, OnDestroy {
  private readonly document: Document = inject(DOCUMENT);
  flutterTarget = viewChild<ElementRef>('flutterTarget');

  src = input('main.dart.js');
  assetBase = input('');
  initialEventName = input<string>('');
  eventsForListening = input<string[]>(['']);
  appLoaded = output<any>();
  eventBroadcasted = output<any>();

  #eventListeners: Array<() => void> = [];

  ngAfterViewInit(): void {
    const target: HTMLElement = this.flutterTarget()?.nativeElement;

    this.#loadFlutterApp(target);
    this.#initializeListener(target);
  }

  ngOnDestroy(): void {
    this.#removeListeners();
  }

  #initializeListener(target: HTMLElement) {
    const appLoadedListener = (event: Event) => {
      let state = (event as CustomEvent).detail;
      window._debug = state;
      this.appLoaded.emit(state);
    };

    target.addEventListener(this.initialEventName(), appLoadedListener, {
      once: true,
    });

    this.#eventListeners.push(() => {
      target.removeEventListener(this.initialEventName(), appLoadedListener);
    });

    this.eventsForListening().forEach((eventName) => {
      const listener = (event: Event) => this.eventBroadcasted.emit(event);

      target.addEventListener(eventName, listener);

      this.#eventListeners.push(() => {
        target.removeEventListener(eventName, listener);
      });
    });
  }

  #loadFlutterApp(target: HTMLElement) {
    _flutter.loader.loadEntrypoint({
      entrypointUrl: `${this.document.location.protocol}//${
        this.document.location.host
      }/${this.src()}`,
      onEntrypointLoaded: async (engineInitializer: any) => {
        const appRunner = await engineInitializer.initializeEngine({
          hostElement: target,
          assetBase: this.assetBase(),
        });

        await appRunner.runApp();
      },
    });
  }

  #removeListeners() {
    this.#eventListeners.forEach((removeListener) => removeListener());
    this.#eventListeners = []; // Clear the array after removing listeners
  }
}
