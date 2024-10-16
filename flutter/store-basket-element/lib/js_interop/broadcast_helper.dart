import 'dart:js_interop';
import 'package:web/web.dart';

@JSExport()
class EventData {
  final dynamic data;

  EventData(this.data);
}

void broadcastAppEvent(String name, JSObject data) {
  final HTMLElement? root =
      document.querySelector('[flt-renderer]') as HTMLElement?;
  assert(root != null, 'Flutter root element cannot be found!');

  final eventDetails = CustomEventInit(detail: data);
  eventDetails.bubbles = true;
  eventDetails.composed = true;

  root!.dispatchEvent(CustomEvent(name, eventDetails));
}
