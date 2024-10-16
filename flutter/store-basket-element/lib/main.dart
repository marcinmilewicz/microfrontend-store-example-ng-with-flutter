import 'dart:js_interop';
import 'package:flutter/material.dart';
import 'package:store_basket/store_basket.dart';
import 'js_interop/store_basket_manager.dart';
import 'js_interop/broadcast_helper.dart';

void main() {
  runApp(MyApp());
}

ThemeData getApplicationTheme() {
  return ThemeData(
    cardTheme: const CardTheme(
      color: Color(0x92DDFFAA),
      shadowColor: Colors.transparent,
      elevation: 0,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0x92DDFFAA),
        textStyle: const TextStyle(
          color: Colors.black,
          fontSize: 16,
        ),
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final GlobalKey<StoreBasketState> _storeBasketKey =
      GlobalKey<StoreBasketState>();

  late StoreBasketManager storeBasketManager;

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final state = _storeBasketKey.currentState;

      if (state != null) {
        storeBasketManager = StoreBasketManager(storeBasketState: state);
        final export = createJSInteropWrapper(storeBasketManager);

        broadcastAppEvent('[StoreBasket] initialized', export);
      }
    });
  }

  void onBroadcast(String name, Object data) {
    JSObject jsObject = createJSInteropWrapper(EventData(data));
    broadcastAppEvent(name, jsObject);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: getApplicationTheme(),
      home: StoreBasket(key: _storeBasketKey, onBroadcast: onBroadcast),
    );
  }
}
