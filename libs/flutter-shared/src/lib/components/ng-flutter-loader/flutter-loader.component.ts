import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
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
export class FlutterLoaderComponent implements AfterViewInit {
  private readonly document: Document = inject(DOCUMENT);
  flutterTarget = viewChild<ElementRef>('flutterTarget');

  src = input('main.dart.js');
  assetBase = input('');
  initialEventName = input<string>('');
  appLoaded = output();

  ngAfterViewInit(): void {
    const target: HTMLElement = this.flutterTarget()?.nativeElement;

    this.#loadFlutterApp(target);
    this.#initializeListener(target);
  }

  #initializeListener(target: HTMLElement) {
    target.addEventListener(
      this.initialEventName(),
      (event: Event) => {
        let state = (event as CustomEvent).detail;
        window._debug = state;
        this.appLoaded.emit(state);
      },
      {
        once: true,
      }
    );
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
}
