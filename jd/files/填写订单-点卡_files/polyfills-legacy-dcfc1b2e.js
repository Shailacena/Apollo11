(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$Z =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$1c = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$1b = fails$1c;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$1b(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$1a = fails$1c;

	var functionBindNative = !fails$1a(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var call$H = Function.prototype.call;

	var functionCall = NATIVE_BIND$4 ? call$H.bind(call$H) : function () {
	  return call$H.apply(call$H, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$7 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$7 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$7(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$2;

	var createPropertyDescriptor$a = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var call$G = FunctionPrototype$3.call;
	var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$G, call$G);

	var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$G.apply(fn, arguments);
	  };
	};

	var uncurryThis$19 = functionUncurryThis;

	var toString$x = uncurryThis$19({}.toString);
	var stringSlice$e = uncurryThis$19(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$e(toString$x(it), 8, -1);
	};

	var uncurryThis$18 = functionUncurryThis;
	var fails$19 = fails$1c;
	var classof$m = classofRaw$2;

	var $Object$5 = Object;
	var split$3 = uncurryThis$18(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$19(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$5('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$m(it) === 'String' ? split$3(it, '') : $Object$5(it);
	} : $Object$5;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$d = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$c = isNullOrUndefined$d;

	var $TypeError$t = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$h = function (it) {
	  if (isNullOrUndefined$c(it)) throw new $TypeError$t("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$5 = indexedObject;
	var requireObjectCoercible$g = requireObjectCoercible$h;

	var toIndexedObject$e = function (it) {
	  return IndexedObject$5(requireObjectCoercible$g(it));
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$y = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$x = isCallable$y;

	var isObject$u = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$x(it);
	};

	var global$Y = global$Z;
	var isCallable$w = isCallable$y;

	var aFunction = function (argument) {
	  return isCallable$w(argument) ? argument : undefined;
	};

	var getBuiltIn$l = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$Y[namespace]) : global$Y[namespace] && global$Y[namespace][method];
	};

	var uncurryThis$17 = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$17({}.isPrototypeOf);

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$X = global$Z;
	var userAgent$5 = engineUserAgent;

	var process$3 = global$X.process;
	var Deno$1 = global$X.Deno;
	var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$5) {
	  match = userAgent$5.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$5.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$3 = engineV8Version;
	var fails$18 = fails$1c;
	var global$W = global$Z;

	var $String$7 = global$W.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$18(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$7(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$7 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$7
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$k = getBuiltIn$l;
	var isCallable$v = isCallable$y;
	var isPrototypeOf$a = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$4 = Object;

	var isSymbol$6 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$k('Symbol');
	  return isCallable$v($Symbol) && isPrototypeOf$a($Symbol.prototype, $Object$4(it));
	};

	var $String$6 = String;

	var tryToString$7 = function (argument) {
	  try {
	    return $String$6(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$u = isCallable$y;
	var tryToString$6 = tryToString$7;

	var $TypeError$s = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$n = function (argument) {
	  if (isCallable$u(argument)) return argument;
	  throw new $TypeError$s(tryToString$6(argument) + ' is not a function');
	};

	var aCallable$m = aCallable$n;
	var isNullOrUndefined$b = isNullOrUndefined$d;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$a = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$b(func) ? undefined : aCallable$m(func);
	};

	var call$F = functionCall;
	var isCallable$t = isCallable$y;
	var isObject$t = isObject$u;

	var $TypeError$r = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$2 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$t(fn = input.toString) && !isObject$t(val = call$F(fn, input))) return val;
	  if (isCallable$t(fn = input.valueOf) && !isObject$t(val = call$F(fn, input))) return val;
	  if (pref !== 'string' && isCallable$t(fn = input.toString) && !isObject$t(val = call$F(fn, input))) return val;
	  throw new $TypeError$r("Can't convert object to primitive value");
	};

	var sharedStore = {exports: {}};

	var isPure = false;

	var global$V = global$Z;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$d = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$d(global$V, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$V[key] = value;
	  } return value;
	};

	var globalThis$2 = global$Z;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$2[SHARED] || defineGlobalProperty$2(SHARED, {});

	(store$3.versions || (store$3.versions = [])).push({
	  version: '3.37.1',
	  mode: 'global',
	  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var sharedStoreExports = sharedStore.exports;

	var store$2 = sharedStoreExports;

	var shared$7 = function (key, value) {
	  return store$2[key] || (store$2[key] = value || {});
	};

	var requireObjectCoercible$f = requireObjectCoercible$h;

	var $Object$3 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$l = function (argument) {
	  return $Object$3(requireObjectCoercible$f(argument));
	};

	var uncurryThis$16 = functionUncurryThis;
	var toObject$k = toObject$l;

	var hasOwnProperty = uncurryThis$16({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$k(it), key);
	};

	var uncurryThis$15 = functionUncurryThis;

	var id$2 = 0;
	var postfix = Math.random();
	var toString$w = uncurryThis$15(1.0.toString);

	var uid$5 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$w(++id$2 + postfix, 36);
	};

	var global$U = global$Z;
	var shared$6 = shared$7;
	var hasOwn$v = hasOwnProperty_1;
	var uid$4 = uid$5;
	var NATIVE_SYMBOL$6 = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$3 = global$U.Symbol;
	var WellKnownSymbolsStore$1 = shared$6('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$4;

	var wellKnownSymbol$z = function (name) {
	  if (!hasOwn$v(WellKnownSymbolsStore$1, name)) {
	    WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$6 && hasOwn$v(Symbol$3, name)
	      ? Symbol$3[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore$1[name];
	};

	var call$E = functionCall;
	var isObject$s = isObject$u;
	var isSymbol$5 = isSymbol$6;
	var getMethod$9 = getMethod$a;
	var ordinaryToPrimitive$1 = ordinaryToPrimitive$2;
	var wellKnownSymbol$y = wellKnownSymbol$z;

	var $TypeError$q = TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$y('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$4 = function (input, pref) {
	  if (!isObject$s(input) || isSymbol$5(input)) return input;
	  var exoticToPrim = getMethod$9(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$E(exoticToPrim, input, pref);
	    if (!isObject$s(result) || isSymbol$5(result)) return result;
	    throw new $TypeError$q("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive$1(input, pref);
	};

	var toPrimitive$3 = toPrimitive$4;
	var isSymbol$4 = isSymbol$6;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$4 = function (argument) {
	  var key = toPrimitive$3(argument, 'string');
	  return isSymbol$4(key) ? key : key + '';
	};

	var global$T = global$Z;
	var isObject$r = isObject$u;

	var document$3 = global$T.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$r(document$3) && isObject$r(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$G = descriptors;
	var fails$17 = fails$1c;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$G && !fails$17(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$F = descriptors;
	var call$D = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$9 = createPropertyDescriptor$a;
	var toIndexedObject$d = toIndexedObject$e;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$u = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$F ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$d(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$u(O, P)) return createPropertyDescriptor$9(!call$D(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$E = descriptors;
	var fails$16 = fails$1c;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$E && fails$16(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$q = isObject$u;

	var $String$5 = String;
	var $TypeError$p = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$E = function (argument) {
	  if (isObject$q(argument)) return argument;
	  throw new $TypeError$p($String$5(argument) + ' is not an object');
	};

	var DESCRIPTORS$D = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$D = anObject$E;
	var toPropertyKey$2 = toPropertyKey$4;

	var $TypeError$o = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$D ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$D(O);
	  P = toPropertyKey$2(P);
	  anObject$D(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$D(O);
	  P = toPropertyKey$2(P);
	  anObject$D(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$o('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$C = descriptors;
	var definePropertyModule$6 = objectDefineProperty;
	var createPropertyDescriptor$8 = createPropertyDescriptor$a;

	var createNonEnumerableProperty$e = DESCRIPTORS$C ? function (object, key, value) {
	  return definePropertyModule$6.f(object, key, createPropertyDescriptor$8(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$B = descriptors;
	var hasOwn$t = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$B && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$t(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$B || (DESCRIPTORS$B && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$14 = functionUncurryThis;
	var isCallable$s = isCallable$y;
	var store$1 = sharedStoreExports;

	var functionToString$1 = uncurryThis$14(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$s(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var global$S = global$Z;
	var isCallable$r = isCallable$y;

	var WeakMap$2 = global$S.WeakMap;

	var weakMapBasicDetection = isCallable$r(WeakMap$2) && /native code/.test(String(WeakMap$2));

	var shared$5 = shared$7;
	var uid$3 = uid$5;

	var keys$2 = shared$5('keys');

	var sharedKey$4 = function (key) {
	  return keys$2[key] || (keys$2[key] = uid$3(key));
	};

	var hiddenKeys$6 = {};

	var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
	var global$R = global$Z;
	var isObject$p = isObject$u;
	var createNonEnumerableProperty$d = createNonEnumerableProperty$e;
	var hasOwn$s = hasOwnProperty_1;
	var shared$4 = sharedStoreExports;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$5 = hiddenKeys$6;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$8 = global$R.TypeError;
	var WeakMap$1 = global$R.WeakMap;
	var set$2, get$1, has$6;

	var enforce = function (it) {
	  return has$6(it) ? get$1(it) : set$2(it, {});
	};

	var getterFor$1 = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$p(it) || (state = get$1(it)).type !== TYPE) {
	      throw new TypeError$8('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP$1 || shared$4.state) {
	  var store = shared$4.state || (shared$4.state = new WeakMap$1());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set$2 = function (it, metadata) {
	    if (store.has(it)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return store.get(it) || {};
	  };
	  has$6 = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$3('state');
	  hiddenKeys$5[STATE] = true;
	  set$2 = function (it, metadata) {
	    if (hasOwn$s(it, STATE)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$d(it, STATE, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return hasOwn$s(it, STATE) ? it[STATE] : {};
	  };
	  has$6 = function (it) {
	    return hasOwn$s(it, STATE);
	  };
	}

	var internalState = {
	  set: set$2,
	  get: get$1,
	  has: has$6,
	  enforce: enforce,
	  getterFor: getterFor$1
	};

	var uncurryThis$13 = functionUncurryThis;
	var fails$15 = fails$1c;
	var isCallable$q = isCallable$y;
	var hasOwn$r = hasOwnProperty_1;
	var DESCRIPTORS$A = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
	var inspectSource$2 = inspectSource$3;
	var InternalStateModule$e = internalState;

	var enforceInternalState$4 = InternalStateModule$e.enforce;
	var getInternalState$a = InternalStateModule$e.get;
	var $String$4 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$c = Object.defineProperty;
	var stringSlice$d = uncurryThis$13(''.slice);
	var replace$c = uncurryThis$13(''.replace);
	var join$5 = uncurryThis$13([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$A && !fails$15(function () {
	  return defineProperty$c(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$d($String$4(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$c($String$4(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$r(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
	    if (DESCRIPTORS$A) defineProperty$c(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$r(options, 'arity') && value.length !== options.arity) {
	    defineProperty$c(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$r(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$A) defineProperty$c(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState$4(value);
	  if (!hasOwn$r(state, 'source')) {
	    state.source = join$5(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$q(this) && getInternalState$a(this).source || inspectSource$2(this);
	}, 'toString');

	var makeBuiltInExports = makeBuiltIn$3.exports;

	var isCallable$p = isCallable$y;
	var definePropertyModule$5 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltInExports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$n = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$p(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$5.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$9 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$9 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$h = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$g = toIntegerOrInfinity$h;

	var max$5 = Math.max;
	var min$9 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$7 = function (index, length) {
	  var integer = toIntegerOrInfinity$g(index);
	  return integer < 0 ? max$5(integer + length, 0) : min$9(integer, length);
	};

	var toIntegerOrInfinity$f = toIntegerOrInfinity$h;

	var min$8 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$c = function (argument) {
	  var len = toIntegerOrInfinity$f(argument);
	  return len > 0 ? min$8(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$b = toLength$c;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$n = function (obj) {
	  return toLength$b(obj.length);
	};

	var toIndexedObject$c = toIndexedObject$e;
	var toAbsoluteIndex$6 = toAbsoluteIndex$7;
	var lengthOfArrayLike$m = lengthOfArrayLike$n;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$6 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$c($this);
	    var length = lengthOfArrayLike$m(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex$6(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$6(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$6(false)
	};

	var uncurryThis$12 = functionUncurryThis;
	var hasOwn$q = hasOwnProperty_1;
	var toIndexedObject$b = toIndexedObject$e;
	var indexOf$2 = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$6;

	var push$e = uncurryThis$12([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$b(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$q(hiddenKeys$4, key) && hasOwn$q(O, key) && push$e(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$q(O, key = names[i++])) {
	    ~indexOf$2(result, key) || push$e(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$3);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$j = getBuiltIn$l;
	var uncurryThis$11 = functionUncurryThis;
	var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols;
	var anObject$C = anObject$E;

	var concat$3 = uncurryThis$11([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn$j('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$2.f(anObject$C(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
	  return getOwnPropertySymbols ? concat$3(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$p = hasOwnProperty_1;
	var ownKeys$2 = ownKeys$3;
	var getOwnPropertyDescriptorModule$4 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$4 = objectDefineProperty;

	var copyConstructorProperties$5 = function (target, source, exceptions) {
	  var keys = ownKeys$2(source);
	  var defineProperty = definePropertyModule$4.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$4.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$p(target, key) && !(exceptions && hasOwn$p(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$14 = fails$1c;
	var isCallable$o = isCallable$y;

	var replacement = /#|\.prototype\./;

	var isForced$5 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$o(detection) ? fails$14(detection)
	    : !!detection;
	};

	var normalize = isForced$5.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$5.data = {};
	var NATIVE = isForced$5.NATIVE = 'N';
	var POLYFILL = isForced$5.POLYFILL = 'P';

	var isForced_1 = isForced$5;

	var global$Q = global$Z;
	var getOwnPropertyDescriptor$6 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$c = createNonEnumerableProperty$e;
	var defineBuiltIn$m = defineBuiltIn$n;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties$4 = copyConstructorProperties$5;
	var isForced$4 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$Q;
	  } else if (STATIC) {
	    target = global$Q[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = global$Q[TARGET] && global$Q[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$6(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$4(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$4(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$c(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$m(target, key, sourceProperty, options);
	  }
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$9 = FunctionPrototype$1.apply;
	var call$C = FunctionPrototype$1.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply$1 = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$2 ? call$C.bind(apply$9) : function () {
	  return call$C.apply(apply$9, arguments);
	});

	var uncurryThis$10 = functionUncurryThis;
	var aCallable$l = aCallable$n;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$10(aCallable$l(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isObject$o = isObject$u;

	var isPossiblePrototype$1 = function (argument) {
	  return isObject$o(argument) || argument === null;
	};

	var isPossiblePrototype = isPossiblePrototype$1;

	var $String$3 = String;
	var $TypeError$n = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError$n("Can't set " + $String$3(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor$3 = functionUncurryThisAccessor;
	var isObject$n = isObject$u;
	var requireObjectCoercible$e = requireObjectCoercible$h;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor$3(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    requireObjectCoercible$e(O);
	    aPossiblePrototype(proto);
	    if (!isObject$n(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var defineProperty$b = objectDefineProperty.f;

	var proxyAccessor$2 = function (Target, Source, key) {
	  key in Target || defineProperty$b(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var isCallable$n = isCallable$y;
	var isObject$m = isObject$u;
	var setPrototypeOf$7 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$7 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$7 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$n(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$m(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$7($this, NewTargetPrototype);
	  return $this;
	};

	var wellKnownSymbol$x = wellKnownSymbol$z;

	var TO_STRING_TAG$5 = wellKnownSymbol$x('toStringTag');
	var test$2 = {};

	test$2[TO_STRING_TAG$5] = 'z';

	var toStringTagSupport = String(test$2) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$m = isCallable$y;
	var classofRaw$1 = classofRaw$2;
	var wellKnownSymbol$w = wellKnownSymbol$z;

	var TO_STRING_TAG$4 = wellKnownSymbol$w('toStringTag');
	var $Object$2 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$l = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$4)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) === 'Object' && isCallable$m(O.callee) ? 'Arguments' : result;
	};

	var classof$k = classof$l;

	var $String$2 = String;

	var toString$v = function (argument) {
	  if (classof$k(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String$2(argument);
	};

	var toString$u = toString$v;

	var normalizeStringArgument$4 = function (argument, $default) {
	  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$u(argument);
	};

	var isObject$l = isObject$u;
	var createNonEnumerableProperty$b = createNonEnumerableProperty$e;

	// `InstallErrorCause` abstract operation
	// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
	var installErrorCause$1 = function (O, options) {
	  if (isObject$l(options) && 'cause' in options) {
	    createNonEnumerableProperty$b(O, 'cause', options.cause);
	  }
	};

	var uncurryThis$$ = functionUncurryThis;

	var $Error = Error;
	var replace$b = uncurryThis$$(''.replace);

	var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
	var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

	var errorStackClear = function (stack, dropEntries) {
	  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
	    while (dropEntries--) stack = replace$b(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
	  } return stack;
	};

	var fails$13 = fails$1c;
	var createPropertyDescriptor$7 = createPropertyDescriptor$a;

	var errorStackInstallable = !fails$13(function () {
	  var error = new Error('a');
	  if (!('stack' in error)) return true;
	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  Object.defineProperty(error, 'stack', createPropertyDescriptor$7(1, 7));
	  return error.stack !== 7;
	});

	var createNonEnumerableProperty$a = createNonEnumerableProperty$e;
	var clearErrorStack$2 = errorStackClear;
	var ERROR_STACK_INSTALLABLE = errorStackInstallable;

	// non-standard V8
	var captureStackTrace = Error.captureStackTrace;

	var errorStackInstall = function (error, C, stack, dropEntries) {
	  if (ERROR_STACK_INSTALLABLE) {
	    if (captureStackTrace) captureStackTrace(error, C);
	    else createNonEnumerableProperty$a(error, 'stack', clearErrorStack$2(stack, dropEntries));
	  }
	};

	var getBuiltIn$i = getBuiltIn$l;
	var hasOwn$o = hasOwnProperty_1;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$e;
	var isPrototypeOf$9 = objectIsPrototypeOf;
	var setPrototypeOf$6 = objectSetPrototypeOf;
	var copyConstructorProperties$3 = copyConstructorProperties$5;
	var proxyAccessor$1 = proxyAccessor$2;
	var inheritIfRequired$6 = inheritIfRequired$7;
	var normalizeStringArgument$3 = normalizeStringArgument$4;
	var installErrorCause = installErrorCause$1;
	var installErrorStack = errorStackInstall;
	var DESCRIPTORS$z = descriptors;

	var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
	  var STACK_TRACE_LIMIT = 'stackTraceLimit';
	  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
	  var path = FULL_NAME.split('.');
	  var ERROR_NAME = path[path.length - 1];
	  var OriginalError = getBuiltIn$i.apply(null, path);

	  if (!OriginalError) return;

	  var OriginalErrorPrototype = OriginalError.prototype;

	  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
	  if (hasOwn$o(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

	  if (!FORCED) return OriginalError;

	  var BaseError = getBuiltIn$i('Error');

	  var WrappedError = wrapper(function (a, b) {
	    var message = normalizeStringArgument$3(IS_AGGREGATE_ERROR ? b : a, undefined);
	    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
	    if (message !== undefined) createNonEnumerableProperty$9(result, 'message', message);
	    installErrorStack(result, WrappedError, result.stack, 2);
	    if (this && isPrototypeOf$9(OriginalErrorPrototype, this)) inheritIfRequired$6(result, this, WrappedError);
	    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
	    return result;
	  });

	  WrappedError.prototype = OriginalErrorPrototype;

	  if (ERROR_NAME !== 'Error') {
	    if (setPrototypeOf$6) setPrototypeOf$6(WrappedError, BaseError);
	    else copyConstructorProperties$3(WrappedError, BaseError, { name: true });
	  } else if (DESCRIPTORS$z && STACK_TRACE_LIMIT in OriginalError) {
	    proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
	    proxyAccessor$1(WrappedError, OriginalError, 'prepareStackTrace');
	  }

	  copyConstructorProperties$3(WrappedError, OriginalError);

	  try {
	    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
	    if (OriginalErrorPrototype.name !== ERROR_NAME) {
	      createNonEnumerableProperty$9(OriginalErrorPrototype, 'name', ERROR_NAME);
	    }
	    OriginalErrorPrototype.constructor = WrappedError;
	  } catch (error) { /* empty */ }

	  return WrappedError;
	};

	/* eslint-disable no-unused-vars -- required for functions `.length` */
	var $$1I = _export;
	var global$P = global$Z;
	var apply$8 = functionApply$1;
	var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

	var WEB_ASSEMBLY = 'WebAssembly';
	var WebAssembly = global$P[WEB_ASSEMBLY];

	// eslint-disable-next-line es/no-error-cause -- feature detection
	var FORCED$o = new Error('e', { cause: 7 }).cause !== 7;

	var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  var O = {};
	  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$o);
	  $$1I({ global: true, constructor: true, arity: 1, forced: FORCED$o }, O);
	};

	var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  if (WebAssembly && WebAssembly[ERROR_NAME]) {
	    var O = {};
	    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$o);
	    $$1I({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$o }, O);
	  }
	};

	// https://tc39.es/ecma262/#sec-nativeerror
	exportGlobalErrorCauseWrapper('Error', function (init) {
	  return function Error(message) { return apply$8(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('EvalError', function (init) {
	  return function EvalError(message) { return apply$8(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('RangeError', function (init) {
	  return function RangeError(message) { return apply$8(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
	  return function ReferenceError(message) { return apply$8(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
	  return function SyntaxError(message) { return apply$8(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('TypeError', function (init) {
	  return function TypeError(message) { return apply$8(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('URIError', function (init) {
	  return function URIError(message) { return apply$8(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
	  return function CompileError(message) { return apply$8(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
	  return function LinkError(message) { return apply$8(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
	  return function RuntimeError(message) { return apply$8(init, this, arguments); };
	});

	var DESCRIPTORS$y = descriptors;
	var fails$12 = fails$1c;
	var anObject$B = anObject$E;
	var normalizeStringArgument$2 = normalizeStringArgument$4;

	var nativeErrorToString = Error.prototype.toString;

	var INCORRECT_TO_STRING$2 = fails$12(function () {
	  if (DESCRIPTORS$y) {
	    // Chrome 32- incorrectly call accessor
	    // eslint-disable-next-line es/no-object-create, es/no-object-defineproperty -- safe
	    var object = Object.create(Object.defineProperty({}, 'name', { get: function () {
	      return this === object;
	    } }));
	    if (nativeErrorToString.call(object) !== 'true') return true;
	  }
	  // FF10- does not properly handle non-strings
	  return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1'
	    // IE8 does not properly handle defaults
	    || nativeErrorToString.call({}) !== 'Error';
	});

	var errorToString$2 = INCORRECT_TO_STRING$2 ? function toString() {
	  var O = anObject$B(this);
	  var name = normalizeStringArgument$2(O.name, 'Error');
	  var message = normalizeStringArgument$2(O.message);
	  return !name ? message : !message ? name : name + ': ' + message;
	} : nativeErrorToString;

	var defineBuiltIn$l = defineBuiltIn$n;
	var errorToString$1 = errorToString$2;

	var ErrorPrototype$1 = Error.prototype;

	// `Error.prototype.toString` method fix
	// https://tc39.es/ecma262/#sec-error.prototype.tostring
	if (ErrorPrototype$1.toString !== errorToString$1) {
	  defineBuiltIn$l(ErrorPrototype$1, 'toString', errorToString$1);
	}

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$4 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$x = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$A = anObject$E;
	var toIndexedObject$a = toIndexedObject$e;
	var objectKeys$3 = objectKeys$4;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$x && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$A(O);
	  var props = toIndexedObject$a(Properties);
	  var keys = objectKeys$3(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$h = getBuiltIn$l;

	var html$2 = getBuiltIn$h('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject$z = anObject$E;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$2 = hiddenKeys$6;
	var html$1 = html$2;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$2 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$2('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$2[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$2] = anObject$z(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var wellKnownSymbol$v = wellKnownSymbol$z;
	var create$9 = objectCreate;
	var defineProperty$a = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$v('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
	  defineProperty$a(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$9(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$5 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var fails$11 = fails$1c;

	var correctPrototypeGetter = !fails$11(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$n = hasOwnProperty_1;
	var isCallable$l = isCallable$y;
	var toObject$j = toObject$l;
	var sharedKey$1 = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

	var IE_PROTO = sharedKey$1('IE_PROTO');
	var $Object$1 = Object;
	var ObjectPrototype$4 = $Object$1.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$1 ? $Object$1.getPrototypeOf : function (O) {
	  var object = toObject$j(O);
	  if (hasOwn$n(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$l(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object$1 ? ObjectPrototype$4 : null;
	};

	var fails$10 = fails$1c;
	var isCallable$k = isCallable$y;
	var isObject$k = isObject$u;
	var getPrototypeOf$4 = objectGetPrototypeOf$1;
	var defineBuiltIn$k = defineBuiltIn$n;
	var wellKnownSymbol$u = wellKnownSymbol$z;

	var ITERATOR$b = wellKnownSymbol$u('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$4(getPrototypeOf$4(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject$k(IteratorPrototype$4) || fails$10(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$4[ITERATOR$b].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$k(IteratorPrototype$4[ITERATOR$b])) {
	  defineBuiltIn$k(IteratorPrototype$4, ITERATOR$b, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$4,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$9 = objectDefineProperty.f;
	var hasOwn$m = hasOwnProperty_1;
	var wellKnownSymbol$t = wellKnownSymbol$z;

	var TO_STRING_TAG$3 = wellKnownSymbol$t('toStringTag');

	var setToStringTag$e = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$m(target, TO_STRING_TAG$3)) {
	    defineProperty$9(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;
	var create$8 = objectCreate;
	var createPropertyDescriptor$6 = createPropertyDescriptor$a;
	var setToStringTag$d = setToStringTag$e;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$8(IteratorPrototype$3, { next: createPropertyDescriptor$6(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$d(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$1H = _export;
	var call$B = functionCall;
	var FunctionName$1 = functionName;
	var isCallable$j = isCallable$y;
	var createIteratorConstructor$2 = iteratorCreateConstructor;
	var getPrototypeOf$3 = objectGetPrototypeOf$1;
	var setPrototypeOf$5 = objectSetPrototypeOf;
	var setToStringTag$c = setToStringTag$e;
	var createNonEnumerableProperty$8 = createNonEnumerableProperty$e;
	var defineBuiltIn$j = defineBuiltIn$n;
	var wellKnownSymbol$s = wellKnownSymbol$z;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
	var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
	var IteratorPrototype$2 = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$a = wellKnownSymbol$s('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$2(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    }

	    return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$a]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf$3(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf$3(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (setPrototypeOf$5) {
	          setPrototypeOf$5(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (!isCallable$j(CurrentIteratorPrototype[ITERATOR$a])) {
	          defineBuiltIn$j(CurrentIteratorPrototype, ITERATOR$a, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$c(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$3 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME$1) {
	      createNonEnumerableProperty$8(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$B(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn$j(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$1H({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$a] !== defaultIterator) {
	    defineBuiltIn$j(IterablePrototype, ITERATOR$a, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$3[NAME] = defaultIterator;

	  return methods;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$6 = function (value, done) {
	  return { value: value, done: done };
	};

	var toIndexedObject$9 = toIndexedObject$e;
	var addToUnscopables$4 = addToUnscopables$5;
	var Iterators$2 = iterators;
	var InternalStateModule$d = internalState;
	var defineProperty$8 = objectDefineProperty.f;
	var defineIterator$2 = iteratorDefine;
	var createIterResultObject$5 = createIterResultObject$6;
	var DESCRIPTORS$w = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$c = InternalStateModule$d.set;
	var getInternalState$9 = InternalStateModule$d.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
	  setInternalState$c(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$9(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$9(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$5(undefined, true);
	  }
	  switch (state.kind) {
	    case 'keys': return createIterResultObject$5(index, false);
	    case 'values': return createIterResultObject$5(target[index], false);
	  } return createIterResultObject$5([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$4('keys');
	addToUnscopables$4('values');
	addToUnscopables$4('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$w && values.name !== 'values') try {
	  defineProperty$8(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	var fails$$ = fails$1c;

	var arrayMethodIsStrict$7 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$$(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $$1G = _export;
	var uncurryThis$_ = functionUncurryThis;
	var IndexedObject$4 = indexedObject;
	var toIndexedObject$8 = toIndexedObject$e;
	var arrayMethodIsStrict$6 = arrayMethodIsStrict$7;

	var nativeJoin = uncurryThis$_([].join);

	var ES3_STRINGS = IndexedObject$4 !== Object;
	var FORCED$n = ES3_STRINGS || !arrayMethodIsStrict$6('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$1G({ target: 'Array', proto: true, forced: FORCED$n }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject$8(this), separator === undefined ? ',' : separator);
	  }
	});

	var classof$j = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$8 = Array.isArray || function isArray(argument) {
	  return classof$j(argument) === 'Array';
	};

	var DESCRIPTORS$v = descriptors;
	var isArray$7 = isArray$8;

	var $TypeError$m = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$5 = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$v && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$7(O) && !getOwnPropertyDescriptor$5(O, 'length').writable) {
	    throw new $TypeError$m('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError$l = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$4 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$l('Maximum allowed index exceeded');
	  return it;
	};

	var $$1F = _export;
	var toObject$i = toObject$l;
	var lengthOfArrayLike$l = lengthOfArrayLike$n;
	var setArrayLength$2 = arraySetLength;
	var doesNotExceedSafeInteger$3 = doesNotExceedSafeInteger$4;
	var fails$_ = fails$1c;

	var INCORRECT_TO_LENGTH = fails$_(function () {
	  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
	});

	// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
	// https://bugs.chromium.org/p/v8/issues/detail?id=12681
	var properErrorOnNonWritableLength$1 = function () {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).push();
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	};

	var FORCED$m = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength$1();

	// `Array.prototype.push` method
	// https://tc39.es/ecma262/#sec-array.prototype.push
	$$1F({ target: 'Array', proto: true, arity: 1, forced: FORCED$m }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  push: function push(item) {
	    var O = toObject$i(this);
	    var len = lengthOfArrayLike$l(O);
	    var argCount = arguments.length;
	    doesNotExceedSafeInteger$3(len + argCount);
	    for (var i = 0; i < argCount; i++) {
	      O[len] = arguments[i];
	      len++;
	    }
	    setArrayLength$2(O, len);
	    return len;
	  }
	});

	var uncurryThis$Z = functionUncurryThis;
	var fails$Z = fails$1c;
	var isCallable$i = isCallable$y;
	var classof$i = classof$l;
	var getBuiltIn$g = getBuiltIn$l;
	var inspectSource$1 = inspectSource$3;

	var noop = function () { /* empty */ };
	var construct$1 = getBuiltIn$g('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$9 = uncurryThis$Z(constructorRegExp.exec);
	var INCORRECT_TO_STRING$1 = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$i(argument)) return false;
	  try {
	    construct$1(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$i(argument)) return false;
	  switch (classof$i(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING$1 || !!exec$9(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$4 = !construct$1 || fails$Z(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var DESCRIPTORS$u = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$5 = createPropertyDescriptor$a;

	var createProperty$8 = function (object, key, value) {
	  if (DESCRIPTORS$u) definePropertyModule$2.f(object, key, createPropertyDescriptor$5(0, value));
	  else object[key] = value;
	};

	var fails$Y = fails$1c;
	var wellKnownSymbol$r = wellKnownSymbol$z;
	var V8_VERSION$2 = engineV8Version;

	var SPECIES$6 = wellKnownSymbol$r('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$2 >= 51 || !fails$Y(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$6] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var uncurryThis$Y = functionUncurryThis;

	var arraySlice$a = uncurryThis$Y([].slice);

	var $$1E = _export;
	var isArray$6 = isArray$8;
	var isConstructor$3 = isConstructor$4;
	var isObject$j = isObject$u;
	var toAbsoluteIndex$5 = toAbsoluteIndex$7;
	var lengthOfArrayLike$k = lengthOfArrayLike$n;
	var toIndexedObject$7 = toIndexedObject$e;
	var createProperty$7 = createProperty$8;
	var wellKnownSymbol$q = wellKnownSymbol$z;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
	var nativeSlice = arraySlice$a;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('slice');

	var SPECIES$5 = wellKnownSymbol$q('species');
	var $Array$3 = Array;
	var max$4 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$1E({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$7(this);
	    var length = lengthOfArrayLike$k(O);
	    var k = toAbsoluteIndex$5(start, length);
	    var fin = toAbsoluteIndex$5(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$6(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$3(Constructor) && (Constructor === $Array$3 || isArray$6(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$j(Constructor)) {
	        Constructor = Constructor[SPECIES$5];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array$3 || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array$3 : Constructor)(max$4(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$7(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var classofRaw = classofRaw$2;
	var uncurryThis$X = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis$X(fn);
	};

	// eslint-disable-next-line es/no-typed-arrays -- safe
	var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

	var makeBuiltIn = makeBuiltInExports;
	var defineProperty$7 = objectDefineProperty;

	var defineBuiltInAccessor$i = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty$7.f(target, name, descriptor);
	};

	var defineBuiltIn$i = defineBuiltIn$n;

	var defineBuiltIns$6 = function (target, src, options) {
	  for (var key in src) defineBuiltIn$i(target, key, src[key], options);
	  return target;
	};

	var isPrototypeOf$8 = objectIsPrototypeOf;

	var $TypeError$k = TypeError;

	var anInstance$b = function (it, Prototype) {
	  if (isPrototypeOf$8(Prototype, it)) return it;
	  throw new $TypeError$k('Incorrect invocation');
	};

	var toIntegerOrInfinity$e = toIntegerOrInfinity$h;
	var toLength$a = toLength$c;

	var $RangeError$8 = RangeError;

	// `ToIndex` abstract operation
	// https://tc39.es/ecma262/#sec-toindex
	var toIndex$3 = function (it) {
	  if (it === undefined) return 0;
	  var number = toIntegerOrInfinity$e(it);
	  var length = toLength$a(number);
	  if (number !== length) throw new $RangeError$8('Wrong length or index');
	  return length;
	};

	// `Math.sign` method implementation
	// https://tc39.es/ecma262/#sec-math.sign
	// eslint-disable-next-line es/no-math-sign -- safe
	var mathSign = Math.sign || function sign(x) {
	  var n = +x;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
	};

	var sign = mathSign;

	var abs$1 = Math.abs;

	var EPSILON = 2.220446049250313e-16; // Number.EPSILON
	var INVERSE_EPSILON = 1 / EPSILON;

	var roundTiesToEven = function (n) {
	  return n + INVERSE_EPSILON - INVERSE_EPSILON;
	};

	var mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
	  var n = +x;
	  var absolute = abs$1(n);
	  var s = sign(n);
	  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
	  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
	  var result = a - (a - absolute);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
	  return s * result;
	};

	var floatRound = mathFloatRound;

	var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
	var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
	var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

	// `Math.fround` method implementation
	// https://tc39.es/ecma262/#sec-math.fround
	// eslint-disable-next-line es/no-math-fround -- safe
	var mathFround = Math.fround || function fround(x) {
	  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var $Array$2 = Array;
	var abs = Math.abs;
	var pow$2 = Math.pow;
	var floor$8 = Math.floor;
	var log$2 = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = $Array$2(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow$2(2, -24) - pow$2(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (number !== number || number === Infinity) {
	    // eslint-disable-next-line no-self-compare -- NaN check
	    mantissa = number !== number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$8(log$2(number) / LN2);
	    c = pow$2(2, -exponent);
	    if (number * c < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow$2(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow$2(2, mantissaLength);
	      exponent += eBias;
	    } else {
	      mantissa = number * pow$2(2, eBias - 1) * pow$2(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  while (mantissaLength >= 8) {
	    buffer[index++] = mantissa & 255;
	    mantissa /= 256;
	    mantissaLength -= 8;
	  }
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  while (exponentLength > 0) {
	    buffer[index++] = exponent & 255;
	    exponent /= 256;
	    exponentLength -= 8;
	  }
	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  while (nBits > 0) {
	    exponent = exponent * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  while (nBits > 0) {
	    mantissa = mantissa * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity : Infinity;
	  } else {
	    mantissa += pow$2(2, mantissaLength);
	    exponent -= eBias;
	  } return (sign ? -1 : 1) * mantissa * pow$2(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	var toObject$h = toObject$l;
	var toAbsoluteIndex$4 = toAbsoluteIndex$7;
	var lengthOfArrayLike$j = lengthOfArrayLike$n;

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject$h(this);
	  var length = lengthOfArrayLike$j(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex$4(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex$4(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var global$O = global$Z;
	var uncurryThis$W = functionUncurryThis;
	var DESCRIPTORS$t = descriptors;
	var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
	var FunctionName = functionName;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$e;
	var defineBuiltInAccessor$h = defineBuiltInAccessor$i;
	var defineBuiltIns$5 = defineBuiltIns$6;
	var fails$X = fails$1c;
	var anInstance$a = anInstance$b;
	var toIntegerOrInfinity$d = toIntegerOrInfinity$h;
	var toLength$9 = toLength$c;
	var toIndex$2 = toIndex$3;
	var fround = mathFround;
	var IEEE754 = ieee754;
	var getPrototypeOf$2 = objectGetPrototypeOf$1;
	var setPrototypeOf$4 = objectSetPrototypeOf;
	var arrayFill = arrayFill$1;
	var arraySlice$9 = arraySlice$a;
	var inheritIfRequired$5 = inheritIfRequired$7;
	var copyConstructorProperties$2 = copyConstructorProperties$5;
	var setToStringTag$b = setToStringTag$e;
	var InternalStateModule$c = internalState;

	var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH$1 = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var getInternalArrayBufferState = InternalStateModule$c.getterFor(ARRAY_BUFFER$1);
	var getInternalDataViewState = InternalStateModule$c.getterFor(DATA_VIEW);
	var setInternalState$b = InternalStateModule$c.set;
	var NativeArrayBuffer$1 = global$O[ARRAY_BUFFER$1];
	var $ArrayBuffer$1 = NativeArrayBuffer$1;
	var ArrayBufferPrototype$3 = $ArrayBuffer$1 && $ArrayBuffer$1[PROTOTYPE$1];
	var $DataView = global$O[DATA_VIEW];
	var DataViewPrototype$2 = $DataView && $DataView[PROTOTYPE$1];
	var ObjectPrototype$3 = Object.prototype;
	var Array$1 = global$O.Array;
	var RangeError$4 = global$O.RangeError;
	var fill = uncurryThis$W(arrayFill);
	var reverse = uncurryThis$W([].reverse);

	var packIEEE754 = IEEE754.pack;
	var unpackIEEE754 = IEEE754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(fround(number), 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter$1 = function (Constructor, key, getInternalState) {
	  defineBuiltInAccessor$h(Constructor[PROTOTYPE$1], key, {
	    configurable: true,
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var get = function (view, count, index, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex$2(index);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError$4(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = arraySlice$9(bytes, start, start + count);
	  return boolIsLittleEndian ? pack : reverse(pack);
	};

	var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex$2(index);
	  var pack = conversion(+value);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError$4(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER$1) {
	  $ArrayBuffer$1 = function ArrayBuffer(length) {
	    anInstance$a(this, ArrayBufferPrototype$3);
	    var byteLength = toIndex$2(length);
	    setInternalState$b(this, {
	      type: ARRAY_BUFFER$1,
	      bytes: fill(Array$1(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!DESCRIPTORS$t) {
	      this.byteLength = byteLength;
	      this.detached = false;
	    }
	  };

	  ArrayBufferPrototype$3 = $ArrayBuffer$1[PROTOTYPE$1];

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance$a(this, DataViewPrototype$2);
	    anInstance$a(buffer, ArrayBufferPrototype$3);
	    var bufferState = getInternalArrayBufferState(buffer);
	    var bufferLength = bufferState.byteLength;
	    var offset = toIntegerOrInfinity$d(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw new RangeError$4('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength$9(byteLength);
	    if (offset + byteLength > bufferLength) throw new RangeError$4(WRONG_LENGTH$1);
	    setInternalState$b(this, {
	      type: DATA_VIEW,
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset,
	      bytes: bufferState.bytes
	    });
	    if (!DESCRIPTORS$t) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  DataViewPrototype$2 = $DataView[PROTOTYPE$1];

	  if (DESCRIPTORS$t) {
	    addGetter$1($ArrayBuffer$1, 'byteLength', getInternalArrayBufferState);
	    addGetter$1($DataView, 'buffer', getInternalDataViewState);
	    addGetter$1($DataView, 'byteLength', getInternalDataViewState);
	    addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
	  }

	  defineBuiltIns$5(DataViewPrototype$2, {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
	    }
	  });
	} else {
	  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$2 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
	  /* eslint-disable no-new -- required for testing */
	  if (!fails$X(function () {
	    NativeArrayBuffer$1(1);
	  }) || !fails$X(function () {
	    new NativeArrayBuffer$1(-1);
	  }) || fails$X(function () {
	    new NativeArrayBuffer$1();
	    new NativeArrayBuffer$1(1.5);
	    new NativeArrayBuffer$1(NaN);
	    return NativeArrayBuffer$1.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
	  })) {
	    /* eslint-enable no-new -- required for testing */
	    $ArrayBuffer$1 = function ArrayBuffer(length) {
	      anInstance$a(this, ArrayBufferPrototype$3);
	      return inheritIfRequired$5(new NativeArrayBuffer$1(toIndex$2(length)), this, $ArrayBuffer$1);
	    };

	    $ArrayBuffer$1[PROTOTYPE$1] = ArrayBufferPrototype$3;

	    ArrayBufferPrototype$3.constructor = $ArrayBuffer$1;

	    copyConstructorProperties$2($ArrayBuffer$1, NativeArrayBuffer$1);
	  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
	    createNonEnumerableProperty$7(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
	  }

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (setPrototypeOf$4 && getPrototypeOf$2(DataViewPrototype$2) !== ObjectPrototype$3) {
	    setPrototypeOf$4(DataViewPrototype$2, ObjectPrototype$3);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer$1(2));
	  var $setInt8 = uncurryThis$W(DataViewPrototype$2.setInt8);
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns$5(DataViewPrototype$2, {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag$b($ArrayBuffer$1, ARRAY_BUFFER$1);
	setToStringTag$b($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer$1,
	  DataView: $DataView
	};

	var isConstructor$2 = isConstructor$4;
	var tryToString$5 = tryToString$7;

	var $TypeError$j = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$3 = function (argument) {
	  if (isConstructor$2(argument)) return argument;
	  throw new $TypeError$j(tryToString$5(argument) + ' is not a constructor');
	};

	var anObject$y = anObject$E;
	var aConstructor$2 = aConstructor$3;
	var isNullOrUndefined$a = isNullOrUndefined$d;
	var wellKnownSymbol$p = wellKnownSymbol$z;

	var SPECIES$4 = wellKnownSymbol$p('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$6 = function (O, defaultConstructor) {
	  var C = anObject$y(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined$a(S = anObject$y(C)[SPECIES$4]) ? defaultConstructor : aConstructor$2(S);
	};

	var $$1D = _export;
	var uncurryThis$V = functionUncurryThisClause;
	var fails$W = fails$1c;
	var ArrayBufferModule$1 = arrayBuffer;
	var anObject$x = anObject$E;
	var toAbsoluteIndex$3 = toAbsoluteIndex$7;
	var toLength$8 = toLength$c;
	var speciesConstructor$5 = speciesConstructor$6;

	var ArrayBuffer$5 = ArrayBufferModule$1.ArrayBuffer;
	var DataView$3 = ArrayBufferModule$1.DataView;
	var DataViewPrototype$1 = DataView$3.prototype;
	var nativeArrayBufferSlice = uncurryThis$V(ArrayBuffer$5.prototype.slice);
	var getUint8 = uncurryThis$V(DataViewPrototype$1.getUint8);
	var setUint8 = uncurryThis$V(DataViewPrototype$1.setUint8);

	var INCORRECT_SLICE = fails$W(function () {
	  return !new ArrayBuffer$5(2).slice(1, undefined).byteLength;
	});

	// `ArrayBuffer.prototype.slice` method
	// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
	$$1D({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice && end === undefined) {
	      return nativeArrayBufferSlice(anObject$x(this), start); // FF fix
	    }
	    var length = anObject$x(this).byteLength;
	    var first = toAbsoluteIndex$3(start, length);
	    var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
	    var result = new (speciesConstructor$5(this, ArrayBuffer$5))(toLength$8(fin - first));
	    var viewSource = new DataView$3(this);
	    var viewTarget = new DataView$3(result);
	    var index = 0;
	    while (first < fin) {
	      setUint8(viewTarget, index++, getUint8(viewSource, first++));
	    } return result;
	  }
	});

	var uncurryThisAccessor$2 = functionUncurryThisAccessor;
	var classof$h = classofRaw$2;

	var $TypeError$i = TypeError;

	// Includes
	// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
	// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
	var arrayBufferByteLength$2 = uncurryThisAccessor$2(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
	  if (classof$h(O) !== 'ArrayBuffer') throw new $TypeError$i('ArrayBuffer expected');
	  return O.byteLength;
	};

	var uncurryThis$U = functionUncurryThis;
	var arrayBufferByteLength$1 = arrayBufferByteLength$2;

	var slice$5 = uncurryThis$U(ArrayBuffer.prototype.slice);

	var arrayBufferIsDetached = function (O) {
	  if (arrayBufferByteLength$1(O) !== 0) return false;
	  try {
	    slice$5(O, 0, 0);
	    return false;
	  } catch (error) {
	    return true;
	  }
	};

	var DESCRIPTORS$s = descriptors;
	var defineBuiltInAccessor$g = defineBuiltInAccessor$i;
	var isDetached$1 = arrayBufferIsDetached;

	var ArrayBufferPrototype$2 = ArrayBuffer.prototype;

	if (DESCRIPTORS$s && !('detached' in ArrayBufferPrototype$2)) {
	  defineBuiltInAccessor$g(ArrayBufferPrototype$2, 'detached', {
	    configurable: true,
	    get: function detached() {
	      return isDetached$1(this);
	    }
	  });
	}

	var global$N = global$Z;
	var classof$g = classofRaw$2;

	var engineIsNode = classof$g(global$N.process) === 'process';

	var IS_NODE$7 = engineIsNode;

	var tryNodeRequire$2 = function (name) {
	  try {
	    // eslint-disable-next-line no-new-func -- safe
	    if (IS_NODE$7) return Function('return require("' + name + '")')();
	  } catch (error) { /* empty */ }
	};

	/* global Deno -- Deno case */
	var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

	var IS_DENO$2 = engineIsDeno;
	var IS_NODE$6 = engineIsNode;

	var engineIsBrowser = !IS_DENO$2 && !IS_NODE$6
	  && typeof window == 'object'
	  && typeof document == 'object';

	var global$M = global$Z;
	var fails$V = fails$1c;
	var V8$2 = engineV8Version;
	var IS_BROWSER$1 = engineIsBrowser;
	var IS_DENO$1 = engineIsDeno;
	var IS_NODE$5 = engineIsNode;

	var structuredClone$2 = global$M.structuredClone;

	var structuredCloneProperTransfer = !!structuredClone$2 && !fails$V(function () {
	  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if ((IS_DENO$1 && V8$2 > 92) || (IS_NODE$5 && V8$2 > 94) || (IS_BROWSER$1 && V8$2 > 97)) return false;
	  var buffer = new ArrayBuffer(8);
	  var clone = structuredClone$2(buffer, { transfer: [buffer] });
	  return buffer.byteLength !== 0 || clone.byteLength !== 8;
	});

	var global$L = global$Z;
	var tryNodeRequire$1 = tryNodeRequire$2;
	var PROPER_STRUCTURED_CLONE_TRANSFER$1 = structuredCloneProperTransfer;

	var structuredClone$1 = global$L.structuredClone;
	var $ArrayBuffer = global$L.ArrayBuffer;
	var $MessageChannel = global$L.MessageChannel;
	var detach = false;
	var WorkerThreads, channel$1, buffer, $detach;

	if (PROPER_STRUCTURED_CLONE_TRANSFER$1) {
	  detach = function (transferable) {
	    structuredClone$1(transferable, { transfer: [transferable] });
	  };
	} else if ($ArrayBuffer) try {
	  if (!$MessageChannel) {
	    WorkerThreads = tryNodeRequire$1('worker_threads');
	    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
	  }

	  if ($MessageChannel) {
	    channel$1 = new $MessageChannel();
	    buffer = new $ArrayBuffer(2);

	    $detach = function (transferable) {
	      channel$1.port1.postMessage(null, [transferable]);
	    };

	    if (buffer.byteLength === 2) {
	      $detach(buffer);
	      if (buffer.byteLength === 0) detach = $detach;
	    }
	  }
	} catch (error) { /* empty */ }

	var detachTransferable$1 = detach;

	var global$K = global$Z;
	var uncurryThis$T = functionUncurryThis;
	var uncurryThisAccessor$1 = functionUncurryThisAccessor;
	var toIndex$1 = toIndex$3;
	var isDetached = arrayBufferIsDetached;
	var arrayBufferByteLength = arrayBufferByteLength$2;
	var detachTransferable = detachTransferable$1;
	var PROPER_STRUCTURED_CLONE_TRANSFER = structuredCloneProperTransfer;

	var structuredClone = global$K.structuredClone;
	var ArrayBuffer$4 = global$K.ArrayBuffer;
	var DataView$2 = global$K.DataView;
	var TypeError$7 = global$K.TypeError;
	var min$7 = Math.min;
	var ArrayBufferPrototype$1 = ArrayBuffer$4.prototype;
	var DataViewPrototype = DataView$2.prototype;
	var slice$4 = uncurryThis$T(ArrayBufferPrototype$1.slice);
	var isResizable = uncurryThisAccessor$1(ArrayBufferPrototype$1, 'resizable', 'get');
	var maxByteLength = uncurryThisAccessor$1(ArrayBufferPrototype$1, 'maxByteLength', 'get');
	var getInt8 = uncurryThis$T(DataViewPrototype.getInt8);
	var setInt8 = uncurryThis$T(DataViewPrototype.setInt8);

	var arrayBufferTransfer = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
	  var byteLength = arrayBufferByteLength(arrayBuffer);
	  var newByteLength = newLength === undefined ? byteLength : toIndex$1(newLength);
	  var fixedLength = !isResizable || !isResizable(arrayBuffer);
	  var newBuffer;
	  if (isDetached(arrayBuffer)) throw new TypeError$7('ArrayBuffer is detached');
	  if (PROPER_STRUCTURED_CLONE_TRANSFER) {
	    arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
	    if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
	  }
	  if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
	    newBuffer = slice$4(arrayBuffer, 0, newByteLength);
	  } else {
	    var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
	    newBuffer = new ArrayBuffer$4(newByteLength, options);
	    var a = new DataView$2(arrayBuffer);
	    var b = new DataView$2(newBuffer);
	    var copyLength = min$7(newByteLength, byteLength);
	    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
	  }
	  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
	  return newBuffer;
	};

	var $$1C = _export;
	var $transfer$1 = arrayBufferTransfer;

	// `ArrayBuffer.prototype.transfer` method
	// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
	if ($transfer$1) $$1C({ target: 'ArrayBuffer', proto: true }, {
	  transfer: function transfer() {
	    return $transfer$1(this, arguments.length ? arguments[0] : undefined, true);
	  }
	});

	var $$1B = _export;
	var $transfer = arrayBufferTransfer;

	// `ArrayBuffer.prototype.transferToFixedLength` method
	// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
	if ($transfer) $$1B({ target: 'ArrayBuffer', proto: true }, {
	  transferToFixedLength: function transferToFixedLength() {
	    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
	  }
	});

	var global$J = global$Z;

	var path$2 = global$J;

	var uncurryThis$S = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$2 = uncurryThis$S(1.0.valueOf);

	// a string of all valid unicode whitespaces
	var whitespaces$5 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$R = functionUncurryThis;
	var requireObjectCoercible$d = requireObjectCoercible$h;
	var toString$t = toString$v;
	var whitespaces$4 = whitespaces$5;

	var replace$a = uncurryThis$R(''.replace);
	var ltrim = RegExp('^[' + whitespaces$4 + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces$4 + '])[' + whitespaces$4 + ']+$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$5 = function (TYPE) {
	  return function ($this) {
	    var string = toString$t(requireObjectCoercible$d($this));
	    if (TYPE & 1) string = replace$a(string, ltrim, '');
	    if (TYPE & 2) string = replace$a(string, rtrim, '$1');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$5(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$5(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$5(3)
	};

	var $$1A = _export;
	var IS_PURE$5 = isPure;
	var DESCRIPTORS$r = descriptors;
	var global$I = global$Z;
	var path$1 = path$2;
	var uncurryThis$Q = functionUncurryThis;
	var isForced$3 = isForced_1;
	var hasOwn$l = hasOwnProperty_1;
	var inheritIfRequired$4 = inheritIfRequired$7;
	var isPrototypeOf$7 = objectIsPrototypeOf;
	var isSymbol$3 = isSymbol$6;
	var toPrimitive$2 = toPrimitive$4;
	var fails$U = fails$1c;
	var getOwnPropertyNames$3 = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$6 = objectDefineProperty.f;
	var thisNumberValue$1 = thisNumberValue$2;
	var trim$2 = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$I[NUMBER];
	path$1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$6 = global$I.TypeError;
	var stringSlice$c = uncurryThis$Q(''.slice);
	var charCodeAt$4 = uncurryThis$Q(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive$2(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive$2(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol$3(it)) throw new TypeError$6('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$2(it);
	    first = charCodeAt$4(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt$4(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt$4(it, 1)) {
	        // fast equal of /^0b[01]+$/i
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0o[0-7]+$/i
	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        default:
	          return +it;
	      }
	      digits = stringSlice$c(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt$4(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	var FORCED$l = isForced$3(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

	var calledWithNew = function (dummy) {
	  // includes check on 1..constructor(foo) case
	  return isPrototypeOf$7(NumberPrototype, dummy) && fails$U(function () { thisNumberValue$1(dummy); });
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	var NumberWrapper = function Number(value) {
	  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	  return calledWithNew(this) ? inheritIfRequired$4(Object(n), this, NumberWrapper) : n;
	};

	NumberWrapper.prototype = NumberPrototype;
	if (FORCED$l && !IS_PURE$5) NumberPrototype.constructor = NumberWrapper;

	$$1A({ global: true, constructor: true, wrap: true, forced: FORCED$l }, {
	  Number: NumberWrapper
	});

	// Use `internal/copy-constructor-properties` helper in `core-js@4`
	var copyConstructorProperties$1 = function (target, source) {
	  for (var keys = DESCRIPTORS$r ? getOwnPropertyNames$3(source) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (hasOwn$l(source, key = keys[j]) && !hasOwn$l(target, key)) {
	      defineProperty$6(target, key, getOwnPropertyDescriptor$4(source, key));
	    }
	  }
	};
	if (FORCED$l || IS_PURE$5) copyConstructorProperties$1(path$1[NUMBER], NativeNumber);

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$f = classof$l;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$f(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$h = defineBuiltIn$n;
	var toString$s = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$h(Object.prototype, 'toString', toString$s, { unsafe: true });
	}

	var global$H = global$Z;
	var fails$T = fails$1c;
	var uncurryThis$P = functionUncurryThis;
	var toString$r = toString$v;
	var trim$1 = stringTrim.trim;
	var whitespaces$3 = whitespaces$5;

	var $parseInt$2 = global$H.parseInt;
	var Symbol$2 = global$H.Symbol;
	var ITERATOR$9 = Symbol$2 && Symbol$2.iterator;
	var hex = /^[+-]?0x/i;
	var exec$8 = uncurryThis$P(hex.exec);
	var FORCED$k = $parseInt$2(whitespaces$3 + '08') !== 8 || $parseInt$2(whitespaces$3 + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$9 && !fails$T(function () { $parseInt$2(Object(ITERATOR$9)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$k ? function parseInt(string, radix) {
	  var S = trim$1(toString$r(string));
	  return $parseInt$2(S, (radix >>> 0) || (exec$8(hex, S) ? 16 : 10));
	} : $parseInt$2;

	var $$1z = _export;
	var $parseInt$1 = numberParseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	$$1z({ global: true, forced: parseInt !== $parseInt$1 }, {
	  parseInt: $parseInt$1
	});

	var anObject$w = anObject$E;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$w(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$S = fails$1c;
	var global$G = global$Z;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$G.RegExp;

	var UNSUPPORTED_Y$3 = fails$S(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$2 = UNSUPPORTED_Y$3 || fails$S(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$S(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') !== null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$2,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$3
	};

	var fails$R = fails$1c;
	var global$F = global$Z;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$F.RegExp;

	var regexpUnsupportedDotAll = fails$R(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.test('\n') && re.flags === 's');
	});

	var fails$Q = fails$1c;
	var global$E = global$Z;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$E.RegExp;

	var regexpUnsupportedNcg = fails$Q(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$A = functionCall;
	var uncurryThis$O = functionUncurryThis;
	var toString$q = toString$v;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$2 = regexpStickyHelpers;
	var shared$3 = shared$7;
	var create$7 = objectCreate;
	var getInternalState$8 = internalState.get;
	var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared$3('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$c = uncurryThis$O(''.charAt);
	var indexOf$1 = uncurryThis$O(''.indexOf);
	var replace$9 = uncurryThis$O(''.replace);
	var stringSlice$b = uncurryThis$O(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$A(nativeExec, re1, 'a');
	  call$A(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$8(re);
	    var str = toString$q(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$A(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = call$A(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$9(flags, 'y', '');
	      if (indexOf$1(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$b(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$c(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$A(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$b(match.input, charsAdded);
	        match[0] = stringSlice$b(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$A(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create$7(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$1y = _export;
	var exec$7 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$1y({ target: 'RegExp', proto: true, forced: /./.exec !== exec$7 }, {
	  exec: exec$7
	});

	var call$z = functionCall;
	var hasOwn$k = hasOwnProperty_1;
	var isPrototypeOf$6 = objectIsPrototypeOf;
	var regExpFlags$1 = regexpFlags$1;

	var RegExpPrototype$7 = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype$7) && !hasOwn$k(R, 'flags') && isPrototypeOf$6(RegExpPrototype$7, R)
	    ? call$z(regExpFlags$1, R) : flags;
	};

	var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
	var defineBuiltIn$g = defineBuiltIn$n;
	var anObject$v = anObject$E;
	var $toString$3 = toString$v;
	var fails$P = fails$1c;
	var getRegExpFlags$3 = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype$6 = RegExp.prototype;
	var nativeToString = RegExpPrototype$6[TO_STRING];

	var NOT_GENERIC = fails$P(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn$g(RegExpPrototype$6, TO_STRING, function toString() {
	    var R = anObject$v(this);
	    var pattern = $toString$3(R.source);
	    var flags = $toString$3(getRegExpFlags$3(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var call$y = functionCall;
	var defineBuiltIn$f = defineBuiltIn$n;
	var regexpExec$1 = regexpExec$2;
	var fails$O = fails$1c;
	var wellKnownSymbol$o = wellKnownSymbol$z;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$e;

	var SPECIES$3 = wellKnownSymbol$o('species');
	var RegExpPrototype$5 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$o(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$O(function () {
	    // String methods call symbol-named RegExp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$O(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype$5.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: call$y(nativeRegExpMethod, regexp, str, arg2) };
	        }
	        return { done: true, value: call$y(nativeMethod, str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$f(String.prototype, KEY, methods[0]);
	    defineBuiltIn$f(RegExpPrototype$5, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$6(RegExpPrototype$5[SYMBOL], 'sham', true);
	};

	var uncurryThis$N = functionUncurryThis;
	var toIntegerOrInfinity$c = toIntegerOrInfinity$h;
	var toString$p = toString$v;
	var requireObjectCoercible$c = requireObjectCoercible$h;

	var charAt$b = uncurryThis$N(''.charAt);
	var charCodeAt$3 = uncurryThis$N(''.charCodeAt);
	var stringSlice$a = uncurryThis$N(''.slice);

	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$p(requireObjectCoercible$c($this));
	    var position = toIntegerOrInfinity$c(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$3(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$3(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$b(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$a(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$4(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$4(true)
	};

	var charAt$a = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$4 = function (S, index, unicode) {
	  return index + (unicode ? charAt$a(S, index).length : 1);
	};

	var uncurryThis$M = functionUncurryThis;
	var toObject$g = toObject$l;

	var floor$7 = Math.floor;
	var charAt$9 = uncurryThis$M(''.charAt);
	var replace$8 = uncurryThis$M(''.replace);
	var stringSlice$9 = uncurryThis$M(''.slice);
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$2 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$g(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$8(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$9(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$9(str, 0, position);
	      case "'": return stringSlice$9(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$9(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor$7(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$9(ch, 1) : captures[f - 1] + charAt$9(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var call$x = functionCall;
	var anObject$u = anObject$E;
	var isCallable$h = isCallable$y;
	var classof$e = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$h = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$h(exec)) {
	    var result = call$x(exec, R, S);
	    if (result !== null) anObject$u(result);
	    return result;
	  }
	  if (classof$e(R) === 'RegExp') return call$x(regexpExec, R, S);
	  throw new $TypeError$h('RegExp#exec called on incompatible receiver');
	};

	var apply$7 = functionApply$1;
	var call$w = functionCall;
	var uncurryThis$L = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
	var fails$N = fails$1c;
	var anObject$t = anObject$E;
	var isCallable$g = isCallable$y;
	var isNullOrUndefined$9 = isNullOrUndefined$d;
	var toIntegerOrInfinity$b = toIntegerOrInfinity$h;
	var toLength$7 = toLength$c;
	var toString$o = toString$v;
	var requireObjectCoercible$b = requireObjectCoercible$h;
	var advanceStringIndex$3 = advanceStringIndex$4;
	var getMethod$8 = getMethod$a;
	var getSubstitution$1 = getSubstitution$2;
	var regExpExec$5 = regexpExecAbstract;
	var wellKnownSymbol$n = wellKnownSymbol$z;

	var REPLACE$1 = wellKnownSymbol$n('replace');
	var max$3 = Math.max;
	var min$6 = Math.min;
	var concat$2 = uncurryThis$L([].concat);
	var push$d = uncurryThis$L([].push);
	var stringIndexOf$3 = uncurryThis$L(''.indexOf);
	var stringSlice$8 = uncurryThis$L(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE$1]) {
	    return /./[REPLACE$1]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$N(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic$3('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$b(this);
	      var replacer = isNullOrUndefined$9(searchValue) ? undefined : getMethod$8(searchValue, REPLACE$1);
	      return replacer
	        ? call$w(replacer, searchValue, O, replaceValue)
	        : call$w(nativeReplace, toString$o(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$t(this);
	      var S = toString$o(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$3(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$3(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$g(replaceValue);
	      if (!functionalReplace) replaceValue = toString$o(replaceValue);

	      var global = rx.global;
	      var fullUnicode;
	      if (global) {
	        fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec$5(rx, S);
	        if (result === null) break;

	        push$d(results, result);
	        if (!global) break;

	        var matchStr = toString$o(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$3(S, toLength$7(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$o(result[0]);
	        var position = max$3(min$6(toIntegerOrInfinity$b(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$d(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$2([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$d(replacerArgs, namedCaptures);
	          replacement = toString$o(apply$7(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution$1(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$8(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice$8(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var typedArrayConstructor = {exports: {}};

	var wellKnownSymbol$m = wellKnownSymbol$z;

	var ITERATOR$8 = wellKnownSymbol$m('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$8] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$8] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
	var DESCRIPTORS$q = descriptors;
	var global$D = global$Z;
	var isCallable$f = isCallable$y;
	var isObject$i = isObject$u;
	var hasOwn$j = hasOwnProperty_1;
	var classof$d = classof$l;
	var tryToString$4 = tryToString$7;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$e;
	var defineBuiltIn$e = defineBuiltIn$n;
	var defineBuiltInAccessor$f = defineBuiltInAccessor$i;
	var isPrototypeOf$5 = objectIsPrototypeOf;
	var getPrototypeOf$1 = objectGetPrototypeOf$1;
	var setPrototypeOf$3 = objectSetPrototypeOf;
	var wellKnownSymbol$l = wellKnownSymbol$z;
	var uid$2 = uid$5;
	var InternalStateModule$b = internalState;

	var enforceInternalState$3 = InternalStateModule$b.enforce;
	var getInternalState$7 = InternalStateModule$b.get;
	var Int8Array$4 = global$D.Int8Array;
	var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
	var Uint8ClampedArray$1 = global$D.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray$1 = Int8Array$4 && getPrototypeOf$1(Int8Array$4);
	var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf$1(Int8ArrayPrototype$1);
	var ObjectPrototype$2 = Object.prototype;
	var TypeError$5 = global$D.TypeError;

	var TO_STRING_TAG$2 = wellKnownSymbol$l('toStringTag');
	var TYPED_ARRAY_TAG$1 = uid$2('TYPED_ARRAY_TAG');
	var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$3 && classof$d(global$D.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQUIRED = false;
	var NAME$1, Constructor, Prototype;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var BigIntArrayConstructorsList = {
	  BigInt64Array: 8,
	  BigUint64Array: 8
	};

	var isView = function isView(it) {
	  if (!isObject$i(it)) return false;
	  var klass = classof$d(it);
	  return klass === 'DataView'
	    || hasOwn$j(TypedArrayConstructorsList, klass)
	    || hasOwn$j(BigIntArrayConstructorsList, klass);
	};

	var getTypedArrayConstructor$4 = function (it) {
	  var proto = getPrototypeOf$1(it);
	  if (!isObject$i(proto)) return;
	  var state = getInternalState$7(proto);
	  return (state && hasOwn$j(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$4(proto);
	};

	var isTypedArray$1 = function (it) {
	  if (!isObject$i(it)) return false;
	  var klass = classof$d(it);
	  return hasOwn$j(TypedArrayConstructorsList, klass)
	    || hasOwn$j(BigIntArrayConstructorsList, klass);
	};

	var aTypedArray$s = function (it) {
	  if (isTypedArray$1(it)) return it;
	  throw new TypeError$5('Target is not a typed array');
	};

	var aTypedArrayConstructor$2 = function (C) {
	  if (isCallable$f(C) && (!setPrototypeOf$3 || isPrototypeOf$5(TypedArray$1, C))) return C;
	  throw new TypeError$5(tryToString$4(C) + ' is not a typed array constructor');
	};

	var exportTypedArrayMethod$t = function (KEY, property, forced, options) {
	  if (!DESCRIPTORS$q) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global$D[ARRAY];
	    if (TypedArrayConstructor && hasOwn$j(TypedArrayConstructor.prototype, KEY)) try {
	      delete TypedArrayConstructor.prototype[KEY];
	    } catch (error) {
	      // old WebKit bug - some methods are non-configurable
	      try {
	        TypedArrayConstructor.prototype[KEY] = property;
	      } catch (error2) { /* empty */ }
	    }
	  }
	  if (!TypedArrayPrototype$2[KEY] || forced) {
	    defineBuiltIn$e(TypedArrayPrototype$2, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
	  }
	};

	var exportTypedArrayStaticMethod$1 = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!DESCRIPTORS$q) return;
	  if (setPrototypeOf$3) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global$D[ARRAY];
	      if (TypedArrayConstructor && hasOwn$j(TypedArrayConstructor, KEY)) try {
	        delete TypedArrayConstructor[KEY];
	      } catch (error) { /* empty */ }
	    }
	    if (!TypedArray$1[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return defineBuiltIn$e(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global$D[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      defineBuiltIn$e(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME$1 in TypedArrayConstructorsList) {
	  Constructor = global$D[NAME$1];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState$3(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
	}

	for (NAME$1 in BigIntArrayConstructorsList) {
	  Constructor = global$D[NAME$1];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState$3(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$f(TypedArray$1) || TypedArray$1 === Function.prototype) {
	  // eslint-disable-next-line no-shadow -- safe
	  TypedArray$1 = function TypedArray() {
	    throw new TypeError$5('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global$D[NAME$1]) setPrototypeOf$3(global$D[NAME$1], TypedArray$1);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$2) {
	  TypedArrayPrototype$2 = TypedArray$1.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global$D[NAME$1]) setPrototypeOf$3(global$D[NAME$1].prototype, TypedArrayPrototype$2);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf$1(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
	  setPrototypeOf$3(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
	}

	if (DESCRIPTORS$q && !hasOwn$j(TypedArrayPrototype$2, TO_STRING_TAG$2)) {
	  TYPED_ARRAY_TAG_REQUIRED = true;
	  defineBuiltInAccessor$f(TypedArrayPrototype$2, TO_STRING_TAG$2, {
	    configurable: true,
	    get: function () {
	      return isObject$i(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
	    }
	  });
	  for (NAME$1 in TypedArrayConstructorsList) if (global$D[NAME$1]) {
	    createNonEnumerableProperty$5(global$D[NAME$1], TYPED_ARRAY_TAG$1, NAME$1);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
	  aTypedArray: aTypedArray$s,
	  aTypedArrayConstructor: aTypedArrayConstructor$2,
	  exportTypedArrayMethod: exportTypedArrayMethod$t,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$1,
	  getTypedArrayConstructor: getTypedArrayConstructor$4,
	  isView: isView,
	  isTypedArray: isTypedArray$1,
	  TypedArray: TypedArray$1,
	  TypedArrayPrototype: TypedArrayPrototype$2
	};

	/* eslint-disable no-new -- required for testing */
	var global$C = global$Z;
	var fails$M = fails$1c;
	var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;
	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$3 = global$C.ArrayBuffer;
	var Int8Array$3 = global$C.Int8Array;

	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$M(function () {
	  Int8Array$3(1);
	}) || !fails$M(function () {
	  new Int8Array$3(-1);
	}) || !checkCorrectnessOfIteration$3(function (iterable) {
	  new Int8Array$3();
	  new Int8Array$3(null);
	  new Int8Array$3(1.5);
	  new Int8Array$3(iterable);
	}, true) || fails$M(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$3(new ArrayBuffer$3(2), 1, undefined).length !== 1;
	});

	var isObject$h = isObject$u;

	var floor$6 = Math.floor;

	// `IsIntegralNumber` abstract operation
	// https://tc39.es/ecma262/#sec-isintegralnumber
	// eslint-disable-next-line es/no-number-isinteger -- safe
	var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
	  return !isObject$h(it) && isFinite(it) && floor$6(it) === it;
	};

	var toIntegerOrInfinity$a = toIntegerOrInfinity$h;

	var $RangeError$7 = RangeError;

	var toPositiveInteger$2 = function (it) {
	  var result = toIntegerOrInfinity$a(it);
	  if (result < 0) throw new $RangeError$7("The argument can't be less than 0");
	  return result;
	};

	var toPositiveInteger$1 = toPositiveInteger$2;

	var $RangeError$6 = RangeError;

	var toOffset$2 = function (it, BYTES) {
	  var offset = toPositiveInteger$1(it);
	  if (offset % BYTES) throw new $RangeError$6('Wrong offset');
	  return offset;
	};

	var round = Math.round;

	var toUint8Clamped$1 = function (it) {
	  var value = round(it);
	  return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	};

	var uncurryThis$K = functionUncurryThisClause;
	var aCallable$k = aCallable$n;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$c = uncurryThis$K(uncurryThis$K.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$k(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$c(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$c = classof$l;
	var getMethod$7 = getMethod$a;
	var isNullOrUndefined$8 = isNullOrUndefined$d;
	var Iterators$1 = iterators;
	var wellKnownSymbol$k = wellKnownSymbol$z;

	var ITERATOR$7 = wellKnownSymbol$k('iterator');

	var getIteratorMethod$5 = function (it) {
	  if (!isNullOrUndefined$8(it)) return getMethod$7(it, ITERATOR$7)
	    || getMethod$7(it, '@@iterator')
	    || Iterators$1[classof$c(it)];
	};

	var call$v = functionCall;
	var aCallable$j = aCallable$n;
	var anObject$s = anObject$E;
	var tryToString$3 = tryToString$7;
	var getIteratorMethod$4 = getIteratorMethod$5;

	var $TypeError$g = TypeError;

	var getIterator$4 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
	  if (aCallable$j(iteratorMethod)) return anObject$s(call$v(iteratorMethod, argument));
	  throw new $TypeError$g(tryToString$3(argument) + ' is not iterable');
	};

	var wellKnownSymbol$j = wellKnownSymbol$z;
	var Iterators = iterators;

	var ITERATOR$6 = wellKnownSymbol$j('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$3 = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$6] === it);
	};

	var classof$b = classof$l;

	var isBigIntArray$2 = function (it) {
	  var klass = classof$b(it);
	  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
	};

	var toPrimitive$1 = toPrimitive$4;

	var $TypeError$f = TypeError;

	// `ToBigInt` abstract operation
	// https://tc39.es/ecma262/#sec-tobigint
	var toBigInt$3 = function (argument) {
	  var prim = toPrimitive$1(argument, 'number');
	  if (typeof prim == 'number') throw new $TypeError$f("Can't convert number to bigint");
	  // eslint-disable-next-line es/no-bigint -- safe
	  return BigInt(prim);
	};

	var bind$b = functionBindContext;
	var call$u = functionCall;
	var aConstructor$1 = aConstructor$3;
	var toObject$f = toObject$l;
	var lengthOfArrayLike$i = lengthOfArrayLike$n;
	var getIterator$3 = getIterator$4;
	var getIteratorMethod$3 = getIteratorMethod$5;
	var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
	var isBigIntArray$1 = isBigIntArray$2;
	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;
	var toBigInt$2 = toBigInt$3;

	var typedArrayFrom$2 = function from(source /* , mapfn, thisArg */) {
	  var C = aConstructor$1(this);
	  var O = toObject$f(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod$3(O);
	  var i, length, result, thisIsBigIntArray, value, step, iterator, next;
	  if (iteratorMethod && !isArrayIteratorMethod$2(iteratorMethod)) {
	    iterator = getIterator$3(O, iteratorMethod);
	    next = iterator.next;
	    O = [];
	    while (!(step = call$u(next, iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bind$b(mapfn, arguments[2]);
	  }
	  length = lengthOfArrayLike$i(O);
	  result = new (aTypedArrayConstructor$1(C))(length);
	  thisIsBigIntArray = isBigIntArray$1(result);
	  for (i = 0; length > i; i++) {
	    value = mapping ? mapfn(O[i], i) : O[i];
	    // FF30- typed arrays doesn't properly convert objects to typed array values
	    result[i] = thisIsBigIntArray ? toBigInt$2(value) : +value;
	  }
	  return result;
	};

	var isArray$5 = isArray$8;
	var isConstructor$1 = isConstructor$4;
	var isObject$g = isObject$u;
	var wellKnownSymbol$i = wellKnownSymbol$z;

	var SPECIES$2 = wellKnownSymbol$i('species');
	var $Array$1 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$5(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$1(C) && (C === $Array$1 || isArray$5(C.prototype))) C = undefined;
	    else if (isObject$g(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$1 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$a = functionBindContext;
	var uncurryThis$J = functionUncurryThis;
	var IndexedObject$3 = indexedObject;
	var toObject$e = toObject$l;
	var lengthOfArrayLike$h = lengthOfArrayLike$n;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;

	var push$c = uncurryThis$J([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$e($this);
	    var self = IndexedObject$3(O);
	    var length = lengthOfArrayLike$h(self);
	    var boundFunction = bind$a(callbackfn, that);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$2;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$c(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$c(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$3(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$3(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$3(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$3(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$3(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$3(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$3(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$3(7)
	};

	var getBuiltIn$f = getBuiltIn$l;
	var defineBuiltInAccessor$e = defineBuiltInAccessor$i;
	var wellKnownSymbol$h = wellKnownSymbol$z;
	var DESCRIPTORS$p = descriptors;

	var SPECIES$1 = wellKnownSymbol$h('species');

	var setSpecies$6 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$f(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS$p && Constructor && !Constructor[SPECIES$1]) {
	    defineBuiltInAccessor$e(Constructor, SPECIES$1, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var lengthOfArrayLike$g = lengthOfArrayLike$n;

	var arrayFromConstructorAndList$3 = function (Constructor, list, $length) {
	  var index = 0;
	  var length = arguments.length > 2 ? $length : lengthOfArrayLike$g(list);
	  var result = new Constructor(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var $$1x = _export;
	var global$B = global$Z;
	var call$t = functionCall;
	var DESCRIPTORS$o = descriptors;
	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
	var ArrayBufferViewCore$t = arrayBufferViewCore;
	var ArrayBufferModule = arrayBuffer;
	var anInstance$9 = anInstance$b;
	var createPropertyDescriptor$4 = createPropertyDescriptor$a;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$e;
	var isIntegralNumber = isIntegralNumber$1;
	var toLength$6 = toLength$c;
	var toIndex = toIndex$3;
	var toOffset$1 = toOffset$2;
	var toUint8Clamped = toUint8Clamped$1;
	var toPropertyKey$1 = toPropertyKey$4;
	var hasOwn$i = hasOwnProperty_1;
	var classof$a = classof$l;
	var isObject$f = isObject$u;
	var isSymbol$2 = isSymbol$6;
	var create$6 = objectCreate;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var setPrototypeOf$2 = objectSetPrototypeOf;
	var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
	var typedArrayFrom$1 = typedArrayFrom$2;
	var forEach$4 = arrayIteration.forEach;
	var setSpecies$5 = setSpecies$6;
	var defineBuiltInAccessor$d = defineBuiltInAccessor$i;
	var definePropertyModule$1 = objectDefineProperty;
	var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor;
	var arrayFromConstructorAndList$2 = arrayFromConstructorAndList$3;
	var InternalStateModule$a = internalState;
	var inheritIfRequired$3 = inheritIfRequired$7;

	var getInternalState$6 = InternalStateModule$a.get;
	var setInternalState$a = InternalStateModule$a.set;
	var enforceInternalState$2 = InternalStateModule$a.enforce;
	var nativeDefineProperty$1 = definePropertyModule$1.f;
	var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$3.f;
	var RangeError$3 = global$B.RangeError;
	var ArrayBuffer$2 = ArrayBufferModule.ArrayBuffer;
	var ArrayBufferPrototype = ArrayBuffer$2.prototype;
	var DataView$1 = ArrayBufferModule.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$t.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = ArrayBufferViewCore$t.TYPED_ARRAY_TAG;
	var TypedArray = ArrayBufferViewCore$t.TypedArray;
	var TypedArrayPrototype$1 = ArrayBufferViewCore$t.TypedArrayPrototype;
	var isTypedArray = ArrayBufferViewCore$t.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var addGetter = function (it, key) {
	  defineBuiltInAccessor$d(it, key, {
	    configurable: true,
	    get: function () {
	      return getInternalState$6(this)[key];
	    }
	  });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return isPrototypeOf$4(ArrayBufferPrototype, it) || (klass = classof$a(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && !isSymbol$2(key)
	    && key in target
	    && isIntegralNumber(+key)
	    && key >= 0;
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  key = toPropertyKey$1(key);
	  return isTypedArrayIndex(target, key)
	    ? createPropertyDescriptor$4(2, target[key])
	    : nativeGetOwnPropertyDescriptor$2(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  key = toPropertyKey$1(key);
	  if (isTypedArrayIndex(target, key)
	    && isObject$f(descriptor)
	    && hasOwn$i(descriptor, 'value')
	    && !hasOwn$i(descriptor, 'get')
	    && !hasOwn$i(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!hasOwn$i(descriptor, 'writable') || descriptor.writable)
	    && (!hasOwn$i(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty$1(target, key, descriptor);
	};

	if (DESCRIPTORS$o) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    getOwnPropertyDescriptorModule$3.f = wrappedGetOwnPropertyDescriptor;
	    definePropertyModule$1.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype$1, 'buffer');
	    addGetter(TypedArrayPrototype$1, 'byteOffset');
	    addGetter(TypedArrayPrototype$1, 'byteLength');
	    addGetter(TypedArrayPrototype$1, 'length');
	  }

	  $$1x({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global$B[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState$6(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState$6(that);
	      data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty$1(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance$9(that, TypedArrayConstructorPrototype);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject$f(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer$2(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset$1(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw new RangeError$3(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw new RangeError$3(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$6($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw new RangeError$3(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return arrayFromConstructorAndList$2(TypedArrayConstructor, data);
	        } else {
	          return call$t(typedArrayFrom$1, TypedArrayConstructor, data);
	        }
	        setInternalState$a(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView$1(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (setPrototypeOf$2) setPrototypeOf$2(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$6(TypedArrayPrototype$1);
	    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance$9(dummy, TypedArrayConstructorPrototype);
	        return inheritIfRequired$3(function () {
	          if (!isObject$f(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return arrayFromConstructorAndList$2(TypedArrayConstructor, data);
	          return call$t(typedArrayFrom$1, TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (setPrototypeOf$2) setPrototypeOf$2(TypedArrayConstructor, TypedArray);
	      forEach$4(getOwnPropertyNames$2(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty$4(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty$4(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    enforceInternalState$2(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty$4(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    $$1x({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty$4(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty$4(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies$5(CONSTRUCTOR_NAME);
	  };
	} else typedArrayConstructor.exports = function () { /* empty */ };

	var typedArrayConstructorExports = typedArrayConstructor.exports;

	var createTypedArrayConstructor$8 = typedArrayConstructorExports;

	// `Uint8Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$8('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var ArrayBufferViewCore$s = arrayBufferViewCore;
	var lengthOfArrayLike$f = lengthOfArrayLike$n;
	var toIntegerOrInfinity$9 = toIntegerOrInfinity$h;

	var aTypedArray$r = ArrayBufferViewCore$s.aTypedArray;
	var exportTypedArrayMethod$s = ArrayBufferViewCore$s.exportTypedArrayMethod;

	// `%TypedArray%.prototype.at` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
	exportTypedArrayMethod$s('at', function at(index) {
	  var O = aTypedArray$r(this);
	  var len = lengthOfArrayLike$f(O);
	  var relativeIndex = toIntegerOrInfinity$9(index);
	  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	  return (k < 0 || k >= len) ? undefined : O[k];
	});

	var tryToString$2 = tryToString$7;

	var $TypeError$e = TypeError;

	var deletePropertyOrThrow$4 = function (O, P) {
	  if (!delete O[P]) throw new $TypeError$e('Cannot delete property ' + tryToString$2(P) + ' of ' + tryToString$2(O));
	};

	var toObject$d = toObject$l;
	var toAbsoluteIndex$2 = toAbsoluteIndex$7;
	var lengthOfArrayLike$e = lengthOfArrayLike$n;
	var deletePropertyOrThrow$3 = deletePropertyOrThrow$4;

	var min$5 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.copywithin
	// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject$d(this);
	  var len = lengthOfArrayLike$e(O);
	  var to = toAbsoluteIndex$2(target, len);
	  var from = toAbsoluteIndex$2(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$5((end === undefined ? len : toAbsoluteIndex$2(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else deletePropertyOrThrow$3(O, to);
	    to += inc;
	    from += inc;
	  } return O;
	};

	var uncurryThis$I = functionUncurryThis;
	var ArrayBufferViewCore$r = arrayBufferViewCore;
	var $ArrayCopyWithin = arrayCopyWithin;

	var u$ArrayCopyWithin = uncurryThis$I($ArrayCopyWithin);
	var aTypedArray$q = ArrayBufferViewCore$r.aTypedArray;
	var exportTypedArrayMethod$r = ArrayBufferViewCore$r.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$r('copyWithin', function copyWithin(target, start /* , end */) {
	  return u$ArrayCopyWithin(aTypedArray$q(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var ArrayBufferViewCore$q = arrayBufferViewCore;
	var $every = arrayIteration.every;

	var aTypedArray$p = ArrayBufferViewCore$q.aTypedArray;
	var exportTypedArrayMethod$q = ArrayBufferViewCore$q.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$q('every', function every(callbackfn /* , thisArg */) {
	  return $every(aTypedArray$p(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$p = arrayBufferViewCore;
	var $fill = arrayFill$1;
	var toBigInt$1 = toBigInt$3;
	var classof$9 = classof$l;
	var call$s = functionCall;
	var uncurryThis$H = functionUncurryThis;
	var fails$L = fails$1c;

	var aTypedArray$o = ArrayBufferViewCore$p.aTypedArray;
	var exportTypedArrayMethod$p = ArrayBufferViewCore$p.exportTypedArrayMethod;
	var slice$3 = uncurryThis$H(''.slice);

	// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
	var CONVERSION_BUG = fails$L(function () {
	  var count = 0;
	  // eslint-disable-next-line es/no-typed-arrays -- safe
	  new Int8Array(2).fill({ valueOf: function () { return count++; } });
	  return count !== 1;
	});

	// `%TypedArray%.prototype.fill` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
	exportTypedArrayMethod$p('fill', function fill(value /* , start, end */) {
	  var length = arguments.length;
	  aTypedArray$o(this);
	  var actualValue = slice$3(classof$9(this), 0, 3) === 'Big' ? toBigInt$1(value) : +value;
	  return call$s($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
	}, CONVERSION_BUG);

	var ArrayBufferViewCore$o = arrayBufferViewCore;
	var speciesConstructor$4 = speciesConstructor$6;

	var aTypedArrayConstructor = ArrayBufferViewCore$o.aTypedArrayConstructor;
	var getTypedArrayConstructor$3 = ArrayBufferViewCore$o.getTypedArrayConstructor;

	// a part of `TypedArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#typedarray-species-create
	var typedArraySpeciesConstructor$4 = function (originalArray) {
	  return aTypedArrayConstructor(speciesConstructor$4(originalArray, getTypedArrayConstructor$3(originalArray)));
	};

	var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$3;
	var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;

	var typedArrayFromSpeciesAndList = function (instance, list) {
	  return arrayFromConstructorAndList$1(typedArraySpeciesConstructor$3(instance), list);
	};

	var ArrayBufferViewCore$n = arrayBufferViewCore;
	var $filter$1 = arrayIteration.filter;
	var fromSpeciesAndList = typedArrayFromSpeciesAndList;

	var aTypedArray$n = ArrayBufferViewCore$n.aTypedArray;
	var exportTypedArrayMethod$o = ArrayBufferViewCore$n.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$o('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter$1(aTypedArray$n(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  return fromSpeciesAndList(this, list);
	});

	var ArrayBufferViewCore$m = arrayBufferViewCore;
	var $find$1 = arrayIteration.find;

	var aTypedArray$m = ArrayBufferViewCore$m.aTypedArray;
	var exportTypedArrayMethod$n = ArrayBufferViewCore$m.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$n('find', function find(predicate /* , thisArg */) {
	  return $find$1(aTypedArray$m(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$l = arrayBufferViewCore;
	var $findIndex$1 = arrayIteration.findIndex;

	var aTypedArray$l = ArrayBufferViewCore$l.aTypedArray;
	var exportTypedArrayMethod$m = ArrayBufferViewCore$l.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$m('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex$1(aTypedArray$l(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var bind$9 = functionBindContext;
	var IndexedObject$2 = indexedObject;
	var toObject$c = toObject$l;
	var lengthOfArrayLike$d = lengthOfArrayLike$n;

	// `Array.prototype.{ findLast, findLastIndex }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_FIND_LAST_INDEX = TYPE === 1;
	  return function ($this, callbackfn, that) {
	    var O = toObject$c($this);
	    var self = IndexedObject$2(O);
	    var index = lengthOfArrayLike$d(self);
	    var boundFunction = bind$9(callbackfn, that);
	    var value, result;
	    while (index-- > 0) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (result) switch (TYPE) {
	        case 0: return value; // findLast
	        case 1: return index; // findLastIndex
	      }
	    }
	    return IS_FIND_LAST_INDEX ? -1 : undefined;
	  };
	};

	var arrayIterationFromLast = {
	  // `Array.prototype.findLast` method
	  // https://github.com/tc39/proposal-array-find-from-last
	  findLast: createMethod$2(0),
	  // `Array.prototype.findLastIndex` method
	  // https://github.com/tc39/proposal-array-find-from-last
	  findLastIndex: createMethod$2(1)
	};

	var ArrayBufferViewCore$k = arrayBufferViewCore;
	var $findLast = arrayIterationFromLast.findLast;

	var aTypedArray$k = ArrayBufferViewCore$k.aTypedArray;
	var exportTypedArrayMethod$l = ArrayBufferViewCore$k.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findLast` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
	exportTypedArrayMethod$l('findLast', function findLast(predicate /* , thisArg */) {
	  return $findLast(aTypedArray$k(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$j = arrayBufferViewCore;
	var $findLastIndex = arrayIterationFromLast.findLastIndex;

	var aTypedArray$j = ArrayBufferViewCore$j.aTypedArray;
	var exportTypedArrayMethod$k = ArrayBufferViewCore$j.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findLastIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
	exportTypedArrayMethod$k('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
	  return $findLastIndex(aTypedArray$j(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$i = arrayBufferViewCore;
	var $forEach$2 = arrayIteration.forEach;

	var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
	var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$j('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach$2(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$h = arrayBufferViewCore;
	var $includes$1 = arrayIncludes.includes;

	var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
	var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$i('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes$1(aTypedArray$h(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$g = arrayBufferViewCore;
	var $indexOf$1 = arrayIncludes.indexOf;

	var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
	var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$h('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf$1(aTypedArray$g(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var global$A = global$Z;
	var fails$K = fails$1c;
	var uncurryThis$G = functionUncurryThis;
	var ArrayBufferViewCore$f = arrayBufferViewCore;
	var ArrayIterators = es_array_iterator;
	var wellKnownSymbol$g = wellKnownSymbol$z;

	var ITERATOR$5 = wellKnownSymbol$g('iterator');
	var Uint8Array$1 = global$A.Uint8Array;
	var arrayValues = uncurryThis$G(ArrayIterators.values);
	var arrayKeys = uncurryThis$G(ArrayIterators.keys);
	var arrayEntries = uncurryThis$G(ArrayIterators.entries);
	var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
	var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;
	var TypedArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype;

	var GENERIC = !fails$K(function () {
	  TypedArrayPrototype[ITERATOR$5].call([1]);
	});

	var ITERATOR_IS_VALUES = !!TypedArrayPrototype
	  && TypedArrayPrototype.values
	  && TypedArrayPrototype[ITERATOR$5] === TypedArrayPrototype.values
	  && TypedArrayPrototype.values.name === 'values';

	var typedArrayValues = function values() {
	  return arrayValues(aTypedArray$f(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$g('entries', function entries() {
	  return arrayEntries(aTypedArray$f(this));
	}, GENERIC);
	// `%TypedArray%.prototype.keys` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$g('keys', function keys() {
	  return arrayKeys(aTypedArray$f(this));
	}, GENERIC);
	// `%TypedArray%.prototype.values` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$g('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$g(ITERATOR$5, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

	var ArrayBufferViewCore$e = arrayBufferViewCore;
	var uncurryThis$F = functionUncurryThis;

	var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
	var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;
	var $join = uncurryThis$F([].join);

	// `%TypedArray%.prototype.join` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
	exportTypedArrayMethod$f('join', function join(separator) {
	  return $join(aTypedArray$e(this), separator);
	});

	/* eslint-disable es/no-array-prototype-lastindexof -- safe */
	var apply$6 = functionApply$1;
	var toIndexedObject$6 = toIndexedObject$e;
	var toIntegerOrInfinity$8 = toIntegerOrInfinity$h;
	var lengthOfArrayLike$c = lengthOfArrayLike$n;
	var arrayMethodIsStrict$5 = arrayMethodIsStrict$7;

	var min$4 = Math.min;
	var $lastIndexOf$1 = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict$5('lastIndexOf');
	var FORCED$j = NEGATIVE_ZERO$1 || !STRICT_METHOD$2;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$j ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO$1) return apply$6($lastIndexOf$1, this, arguments) || 0;
	  var O = toIndexedObject$6(this);
	  var length = lengthOfArrayLike$c(O);
	  if (length === 0) return -1;
	  var index = length - 1;
	  if (arguments.length > 1) index = min$4(index, toIntegerOrInfinity$8(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : $lastIndexOf$1;

	var ArrayBufferViewCore$d = arrayBufferViewCore;
	var apply$5 = functionApply$1;
	var $lastIndexOf = arrayLastIndexOf;

	var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
	var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
	exportTypedArrayMethod$e('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  var length = arguments.length;
	  return apply$5($lastIndexOf, aTypedArray$d(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
	});

	var ArrayBufferViewCore$c = arrayBufferViewCore;
	var $map$1 = arrayIteration.map;
	var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;

	var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
	var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
	  return $map$1(aTypedArray$c(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (typedArraySpeciesConstructor$2(O))(length);
	  });
	});

	var aCallable$i = aCallable$n;
	var toObject$b = toObject$l;
	var IndexedObject$1 = indexedObject;
	var lengthOfArrayLike$b = lengthOfArrayLike$n;

	var $TypeError$d = TypeError;

	var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$1 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    var O = toObject$b(that);
	    var self = IndexedObject$1(O);
	    var length = lengthOfArrayLike$b(O);
	    aCallable$i(callbackfn);
	    if (length === 0 && argumentsLength < 2) throw new $TypeError$d(REDUCE_EMPTY);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw new $TypeError$d(REDUCE_EMPTY);
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$1(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$1(true)
	};

	var ArrayBufferViewCore$b = arrayBufferViewCore;
	var $reduce$1 = arrayReduce.left;

	var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
	var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$c('reduce', function reduce(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduce$1(aTypedArray$b(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$a = arrayBufferViewCore;
	var $reduceRight$1 = arrayReduce.right;

	var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
	var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRight` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$b('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduceRight$1(aTypedArray$a(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$9 = arrayBufferViewCore;

	var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
	var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;
	var floor$5 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$a('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$9(that).length;
	  var middle = floor$5(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var global$z = global$Z;
	var call$r = functionCall;
	var ArrayBufferViewCore$8 = arrayBufferViewCore;
	var lengthOfArrayLike$a = lengthOfArrayLike$n;
	var toOffset = toOffset$2;
	var toIndexedObject$5 = toObject$l;
	var fails$J = fails$1c;

	var RangeError$2 = global$z.RangeError;
	var Int8Array$2 = global$z.Int8Array;
	var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
	var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
	var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
	var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

	var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$J(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  var array = new Uint8ClampedArray(2);
	  call$r($set, array, { length: 1, 0: 3 }, 1);
	  return array[1] !== 3;
	});

	// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
	var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$8.NATIVE_ARRAY_BUFFER_VIEWS && fails$J(function () {
	  var array = new Int8Array$2(2);
	  array.set(1);
	  array.set('2', 1);
	  return array[0] !== 0 || array[1] !== 2;
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$9('set', function set(arrayLike /* , offset */) {
	  aTypedArray$8(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var src = toIndexedObject$5(arrayLike);
	  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$r($set, this, src, offset);
	  var length = this.length;
	  var len = lengthOfArrayLike$a(src);
	  var index = 0;
	  if (len + offset > length) throw new RangeError$2('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

	var ArrayBufferViewCore$7 = arrayBufferViewCore;
	var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
	var fails$I = fails$1c;
	var arraySlice$8 = arraySlice$a;

	var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
	var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

	var FORCED$i = fails$I(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$8('slice', function slice(start, end) {
	  var list = arraySlice$8(aTypedArray$7(this), start, end);
	  var C = typedArraySpeciesConstructor$1(this);
	  var index = 0;
	  var length = list.length;
	  var result = new C(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$i);

	var ArrayBufferViewCore$6 = arrayBufferViewCore;
	var $some = arrayIteration.some;

	var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
	var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$7('some', function some(callbackfn /* , thisArg */) {
	  return $some(aTypedArray$6(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var arraySlice$7 = arraySlice$a;

	var floor$4 = Math.floor;

	var sort$1 = function (array, comparefn) {
	  var length = array.length;

	  if (length < 8) {
	    // insertion sort
	    var i = 1;
	    var element, j;

	    while (i < length) {
	      j = i;
	      element = array[i];
	      while (j && comparefn(array[j - 1], element) > 0) {
	        array[j] = array[--j];
	      }
	      if (j !== i++) array[j] = element;
	    }
	  } else {
	    // merge sort
	    var middle = floor$4(length / 2);
	    var left = sort$1(arraySlice$7(array, 0, middle), comparefn);
	    var right = sort$1(arraySlice$7(array, middle), comparefn);
	    var llength = left.length;
	    var rlength = right.length;
	    var lindex = 0;
	    var rindex = 0;

	    while (lindex < llength || rindex < rlength) {
	      array[lindex + rindex] = (lindex < llength && rindex < rlength)
	        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	        : lindex < llength ? left[lindex++] : right[rindex++];
	    }
	  }

	  return array;
	};

	var arraySort$1 = sort$1;

	var userAgent$4 = engineUserAgent;

	var firefox = userAgent$4.match(/firefox\/(\d+)/i);

	var engineFfVersion = !!firefox && +firefox[1];

	var UA = engineUserAgent;

	var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent$3 = engineUserAgent;

	var webkit = userAgent$3.match(/AppleWebKit\/(\d+)\./);

	var engineWebkitVersion = !!webkit && +webkit[1];

	var global$y = global$Z;
	var uncurryThis$E = functionUncurryThisClause;
	var fails$H = fails$1c;
	var aCallable$h = aCallable$n;
	var internalSort$1 = arraySort$1;
	var ArrayBufferViewCore$5 = arrayBufferViewCore;
	var FF$1 = engineFfVersion;
	var IE_OR_EDGE$1 = engineIsIeOrEdge;
	var V8$1 = engineV8Version;
	var WEBKIT$1 = engineWebkitVersion;

	var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
	var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;
	var Uint16Array = global$y.Uint16Array;
	var nativeSort$1 = Uint16Array && uncurryThis$E(Uint16Array.prototype.sort);

	// WebKit
	var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort$1 && !(fails$H(function () {
	  nativeSort$1(new Uint16Array(2), null);
	}) && fails$H(function () {
	  nativeSort$1(new Uint16Array(2), {});
	}));

	var STABLE_SORT$1 = !!nativeSort$1 && !fails$H(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8$1) return V8$1 < 74;
	  if (FF$1) return FF$1 < 67;
	  if (IE_OR_EDGE$1) return true;
	  if (WEBKIT$1) return WEBKIT$1 < 602;

	  var array = new Uint16Array(516);
	  var expected = Array(516);
	  var index, mod;

	  for (index = 0; index < 516; index++) {
	    mod = index % 4;
	    array[index] = 515 - index;
	    expected[index] = index - 2 * mod + 3;
	  }

	  nativeSort$1(array, function (a, b) {
	    return (a / 4 | 0) - (b / 4 | 0);
	  });

	  for (index = 0; index < 516; index++) {
	    if (array[index] !== expected[index]) return true;
	  }
	});

	var getSortCompare$1 = function (comparefn) {
	  return function (x, y) {
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (y !== y) return -1;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (x !== x) return 1;
	    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
	    return x > y;
	  };
	};

	// `%TypedArray%.prototype.sort` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$6('sort', function sort(comparefn) {
	  if (comparefn !== undefined) aCallable$h(comparefn);
	  if (STABLE_SORT$1) return nativeSort$1(this, comparefn);

	  return internalSort$1(aTypedArray$5(this), getSortCompare$1(comparefn));
	}, !STABLE_SORT$1 || ACCEPT_INCORRECT_ARGUMENTS);

	var ArrayBufferViewCore$4 = arrayBufferViewCore;
	var toLength$5 = toLength$c;
	var toAbsoluteIndex$1 = toAbsoluteIndex$7;
	var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;

	var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
	var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$5('subarray', function subarray(begin, end) {
	  var O = aTypedArray$4(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex$1(begin, length);
	  var C = typedArraySpeciesConstructor(O);
	  return new C(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength$5((end === undefined ? length : toAbsoluteIndex$1(end, length)) - beginIndex)
	  );
	});

	var global$x = global$Z;
	var apply$4 = functionApply$1;
	var ArrayBufferViewCore$3 = arrayBufferViewCore;
	var fails$G = fails$1c;
	var arraySlice$6 = arraySlice$a;

	var Int8Array$1 = global$x.Int8Array;
	var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
	var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$G(function () {
	  $toLocaleString.call(new Int8Array$1(1));
	});

	var FORCED$h = fails$G(function () {
	  return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
	}) || !fails$G(function () {
	  Int8Array$1.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$4('toLocaleString', function toLocaleString() {
	  return apply$4(
	    $toLocaleString,
	    TO_LOCALE_STRING_BUG ? arraySlice$6(aTypedArray$3(this)) : aTypedArray$3(this),
	    arraySlice$6(arguments)
	  );
	}, FORCED$h);

	var lengthOfArrayLike$9 = lengthOfArrayLike$n;

	// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
	// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
	var arrayToReversed$1 = function (O, C) {
	  var len = lengthOfArrayLike$9(O);
	  var A = new C(len);
	  var k = 0;
	  for (; k < len; k++) A[k] = O[len - k - 1];
	  return A;
	};

	var arrayToReversed = arrayToReversed$1;
	var ArrayBufferViewCore$2 = arrayBufferViewCore;

	var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
	var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
	var getTypedArrayConstructor$2 = ArrayBufferViewCore$2.getTypedArrayConstructor;

	// `%TypedArray%.prototype.toReversed` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
	exportTypedArrayMethod$3('toReversed', function toReversed() {
	  return arrayToReversed(aTypedArray$2(this), getTypedArrayConstructor$2(this));
	});

	var ArrayBufferViewCore$1 = arrayBufferViewCore;
	var uncurryThis$D = functionUncurryThis;
	var aCallable$g = aCallable$n;
	var arrayFromConstructorAndList = arrayFromConstructorAndList$3;

	var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
	var getTypedArrayConstructor$1 = ArrayBufferViewCore$1.getTypedArrayConstructor;
	var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;
	var sort = uncurryThis$D(ArrayBufferViewCore$1.TypedArrayPrototype.sort);

	// `%TypedArray%.prototype.toSorted` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
	exportTypedArrayMethod$2('toSorted', function toSorted(compareFn) {
	  if (compareFn !== undefined) aCallable$g(compareFn);
	  var O = aTypedArray$1(this);
	  var A = arrayFromConstructorAndList(getTypedArrayConstructor$1(O), O);
	  return sort(A, compareFn);
	});

	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;
	var fails$F = fails$1c;
	var global$w = global$Z;
	var uncurryThis$C = functionUncurryThis;

	var Uint8Array = global$w.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
	var arrayToString = [].toString;
	var join$4 = uncurryThis$C([].join);

	if (fails$F(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return join$4(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod$1('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var lengthOfArrayLike$8 = lengthOfArrayLike$n;
	var toIntegerOrInfinity$7 = toIntegerOrInfinity$h;

	var $RangeError$5 = RangeError;

	// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
	// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
	var arrayWith$1 = function (O, C, index, value) {
	  var len = lengthOfArrayLike$8(O);
	  var relativeIndex = toIntegerOrInfinity$7(index);
	  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
	  if (actualIndex >= len || actualIndex < 0) throw new $RangeError$5('Incorrect index');
	  var A = new C(len);
	  var k = 0;
	  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
	  return A;
	};

	var arrayWith = arrayWith$1;
	var ArrayBufferViewCore = arrayBufferViewCore;
	var isBigIntArray = isBigIntArray$2;
	var toIntegerOrInfinity$6 = toIntegerOrInfinity$h;
	var toBigInt = toBigInt$3;

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

	var PROPER_ORDER = !!function () {
	  try {
	    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
	    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
	  } catch (error) {
	    // some early implementations, like WebKit, does not follow the final semantic
	    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
	    return error === 8;
	  }
	}();

	// `%TypedArray%.prototype.with` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
	exportTypedArrayMethod('with', { 'with': function (index, value) {
	  var O = aTypedArray(this);
	  var relativeIndex = toIntegerOrInfinity$6(index);
	  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
	  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
	} }['with'], !PROPER_ORDER);

	var objectGetOwnPropertyNamesExternal = {};

	/* eslint-disable es/no-object-getownpropertynames -- safe */
	var classof$8 = classofRaw$2;
	var toIndexedObject$4 = toIndexedObject$e;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$5 = arraySlice$a;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$5(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$8(it) === 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$4(it));
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$f = wellKnownSymbol$z;

	wellKnownSymbolWrapped.f = wellKnownSymbol$f;

	var path = path$2;
	var hasOwn$h = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$5 = objectDefineProperty.f;

	var wellKnownSymbolDefine = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!hasOwn$h(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var call$q = functionCall;
	var getBuiltIn$e = getBuiltIn$l;
	var wellKnownSymbol$e = wellKnownSymbol$z;
	var defineBuiltIn$d = defineBuiltIn$n;

	var symbolDefineToPrimitive = function () {
	  var Symbol = getBuiltIn$e('Symbol');
	  var SymbolPrototype = Symbol && Symbol.prototype;
	  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
	  var TO_PRIMITIVE = wellKnownSymbol$e('toPrimitive');

	  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
	    // `Symbol.prototype[@@toPrimitive]` method
	    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	    // eslint-disable-next-line no-unused-vars -- required for .length
	    defineBuiltIn$d(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	      return call$q(valueOf, this);
	    }, { arity: 1 });
	  }
	};

	var $$1w = _export;
	var global$v = global$Z;
	var call$p = functionCall;
	var uncurryThis$B = functionUncurryThis;
	var DESCRIPTORS$n = descriptors;
	var NATIVE_SYMBOL$5 = symbolConstructorDetection;
	var fails$E = fails$1c;
	var hasOwn$g = hasOwnProperty_1;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var anObject$r = anObject$E;
	var toIndexedObject$3 = toIndexedObject$e;
	var toPropertyKey = toPropertyKey$4;
	var $toString$2 = toString$v;
	var createPropertyDescriptor$3 = createPropertyDescriptor$a;
	var nativeObjectCreate = objectCreate;
	var objectKeys$2 = objectKeys$4;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var defineBuiltIn$c = defineBuiltIn$n;
	var defineBuiltInAccessor$c = defineBuiltInAccessor$i;
	var shared$2 = shared$7;
	var sharedKey = sharedKey$4;
	var hiddenKeys$1 = hiddenKeys$6;
	var uid$1 = uid$5;
	var wellKnownSymbol$d = wellKnownSymbol$z;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$5 = wellKnownSymbolDefine;
	var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
	var setToStringTag$a = setToStringTag$e;
	var InternalStateModule$9 = internalState;
	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';

	var setInternalState$9 = InternalStateModule$9.set;
	var getInternalState$5 = InternalStateModule$9.getterFor(SYMBOL);

	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$v.Symbol;
	var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
	var RangeError$1 = global$v.RangeError;
	var TypeError$4 = global$v.TypeError;
	var QObject = global$v.QObject;
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$2.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
	var push$b = uncurryThis$B([].push);

	var AllSymbols = shared$2('symbols');
	var ObjectPrototypeSymbols = shared$2('op-symbols');
	var WellKnownSymbolsStore = shared$2('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var fallbackDefineProperty = function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	};

	var setSymbolDescriptor = DESCRIPTORS$n && fails$E(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a !== 7;
	}) ? fallbackDefineProperty : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
	  setInternalState$9(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$n) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$r(O);
	  var key = toPropertyKey(P);
	  anObject$r(Attributes);
	  if (hasOwn$g(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$g(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$3(1, nativeObjectCreate(null)));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$g(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$3(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$r(O);
	  var properties = toIndexedObject$3(Properties);
	  var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!DESCRIPTORS$n || call$p($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call$p(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype$1 && hasOwn$g(AllSymbols, P) && !hasOwn$g(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$g(this, P) || !hasOwn$g(AllSymbols, P) || hasOwn$g(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$3(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype$1 && hasOwn$g(AllSymbols, key) && !hasOwn$g(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && hasOwn$g(AllSymbols, key) && !(hasOwn$g(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!hasOwn$g(AllSymbols, key) && !hasOwn$g(hiddenKeys$1, key)) push$b(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function (O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (hasOwn$g(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$g(ObjectPrototype$1, key))) {
	      push$b(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL$5) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$3(SymbolPrototype$1, this)) throw new TypeError$4('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString$2(arguments[0]);
	    var tag = uid$1(description);
	    var setter = function (value) {
	      var $this = this === undefined ? global$v : this;
	      if ($this === ObjectPrototype$1) call$p(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$g($this, HIDDEN) && hasOwn$g($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
	      var descriptor = createPropertyDescriptor$3(1, value);
	      try {
	        setSymbolDescriptor($this, tag, descriptor);
	      } catch (error) {
	        if (!(error instanceof RangeError$1)) throw error;
	        fallbackDefineProperty($this, tag, descriptor);
	      }
	    };
	    if (DESCRIPTORS$n && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype$1 = $Symbol[PROTOTYPE];

	  defineBuiltIn$c(SymbolPrototype$1, 'toString', function toString() {
	    return getInternalState$5(this).tag;
	  });

	  defineBuiltIn$c($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid$1(description), description);
	  });

	  propertyIsEnumerableModule$1.f = $propertyIsEnumerable$1;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule$2.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$d(name), name);
	  };

	  if (DESCRIPTORS$n) {
	    // https://github.com/tc39/proposal-Symbol-description
	    defineBuiltInAccessor$c(SymbolPrototype$1, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$5(this).description;
	      }
	    });
	    {
	      defineBuiltIn$c(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable$1, { unsafe: true });
	    }
	  }
	}

	$$1w({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$5, sham: !NATIVE_SYMBOL$5 }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys$2(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$5(name);
	});

	$$1w({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$5 }, {
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$1w({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$5, sham: !DESCRIPTORS$n }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$1w({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$5 }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive$1();

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$a($Symbol, SYMBOL);

	hiddenKeys$1[HIDDEN] = true;

	var NATIVE_SYMBOL$4 = symbolConstructorDetection;

	/* eslint-disable es/no-symbol -- safe */
	var symbolRegistryDetection = NATIVE_SYMBOL$4 && !!Symbol['for'] && !!Symbol.keyFor;

	var $$1v = _export;
	var getBuiltIn$d = getBuiltIn$l;
	var hasOwn$f = hasOwnProperty_1;
	var toString$n = toString$v;
	var shared$1 = shared$7;
	var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;

	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');

	// `Symbol.for` method
	// https://tc39.es/ecma262/#sec-symbol.for
	$$1v({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
	  'for': function (key) {
	    var string = toString$n(key);
	    if (hasOwn$f(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = getBuiltIn$d('Symbol')(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry$1[symbol] = string;
	    return symbol;
	  }
	});

	var $$1u = _export;
	var hasOwn$e = hasOwnProperty_1;
	var isSymbol$1 = isSymbol$6;
	var tryToString$1 = tryToString$7;
	var shared = shared$7;
	var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;

	var SymbolToStringRegistry = shared('symbol-to-string-registry');

	// `Symbol.keyFor` method
	// https://tc39.es/ecma262/#sec-symbol.keyfor
	$$1u({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
	  keyFor: function keyFor(sym) {
	    if (!isSymbol$1(sym)) throw new TypeError(tryToString$1(sym) + ' is not a symbol');
	    if (hasOwn$e(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  }
	});

	var uncurryThis$A = functionUncurryThis;
	var isArray$4 = isArray$8;
	var isCallable$e = isCallable$y;
	var classof$7 = classofRaw$2;
	var toString$m = toString$v;

	var push$a = uncurryThis$A([].push);

	var getJsonReplacerFunction = function (replacer) {
	  if (isCallable$e(replacer)) return replacer;
	  if (!isArray$4(replacer)) return;
	  var rawLength = replacer.length;
	  var keys = [];
	  for (var i = 0; i < rawLength; i++) {
	    var element = replacer[i];
	    if (typeof element == 'string') push$a(keys, element);
	    else if (typeof element == 'number' || classof$7(element) === 'Number' || classof$7(element) === 'String') push$a(keys, toString$m(element));
	  }
	  var keysLength = keys.length;
	  var root = true;
	  return function (key, value) {
	    if (root) {
	      root = false;
	      return value;
	    }
	    if (isArray$4(this)) return value;
	    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
	  };
	};

	var $$1t = _export;
	var getBuiltIn$c = getBuiltIn$l;
	var apply$3 = functionApply$1;
	var call$o = functionCall;
	var uncurryThis$z = functionUncurryThis;
	var fails$D = fails$1c;
	var isCallable$d = isCallable$y;
	var isSymbol = isSymbol$6;
	var arraySlice$4 = arraySlice$a;
	var getReplacerFunction = getJsonReplacerFunction;
	var NATIVE_SYMBOL$3 = symbolConstructorDetection;

	var $String$1 = String;
	var $stringify = getBuiltIn$c('JSON', 'stringify');
	var exec$6 = uncurryThis$z(/./.exec);
	var charAt$8 = uncurryThis$z(''.charAt);
	var charCodeAt$2 = uncurryThis$z(''.charCodeAt);
	var replace$7 = uncurryThis$z(''.replace);
	var numberToString$1 = uncurryThis$z(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$3 || fails$D(function () {
	  var symbol = getBuiltIn$c('Symbol')('stringify detection');
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) !== '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) !== '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) !== '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails$D(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice$4(arguments);
	  var $replacer = getReplacerFunction(replacer);
	  if (!isCallable$d($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
	  args[1] = function (key, value) {
	    // some old implementations (like WebKit) could pass numbers as keys
	    if (isCallable$d($replacer)) value = call$o($replacer, this, $String$1(key), value);
	    if (!isSymbol(value)) return value;
	  };
	  return apply$3($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt$8(string, offset - 1);
	  var next = charAt$8(string, offset + 1);
	  if ((exec$6(low, match) && !exec$6(hi, next)) || (exec$6(hi, match) && !exec$6(low, prev))) {
	    return '\\u' + numberToString$1(charCodeAt$2(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $$1t({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice$4(arguments);
	      var result = apply$3(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$7(result, tester, fixIllFormed) : result;
	    }
	  });
	}

	var $$1s = _export;
	var NATIVE_SYMBOL$2 = symbolConstructorDetection;
	var fails$C = fails$1c;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var toObject$a = toObject$l;

	// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FORCED$g = !NATIVE_SYMBOL$2 || fails$C(function () { getOwnPropertySymbolsModule$1.f(1); });

	// `Object.getOwnPropertySymbols` method
	// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	$$1s({ target: 'Object', stat: true, forced: FORCED$g }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    var $getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$a(it)) : [];
	  }
	});

	var $$1r = _export;
	var DESCRIPTORS$m = descriptors;
	var global$u = global$Z;
	var uncurryThis$y = functionUncurryThis;
	var hasOwn$d = hasOwnProperty_1;
	var isCallable$c = isCallable$y;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var toString$l = toString$v;
	var defineBuiltInAccessor$b = defineBuiltInAccessor$i;
	var copyConstructorProperties = copyConstructorProperties$5;

	var NativeSymbol = global$u.Symbol;
	var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

	if (DESCRIPTORS$m && isCallable$c(NativeSymbol) && (!('description' in SymbolPrototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$l(arguments[0]);
	    var result = isPrototypeOf$2(SymbolPrototype, this)
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  SymbolWrapper.prototype = SymbolPrototype;
	  SymbolPrototype.constructor = SymbolWrapper;

	  var NATIVE_SYMBOL$1 = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
	  var thisSymbolValue = uncurryThis$y(SymbolPrototype.valueOf);
	  var symbolDescriptiveString = uncurryThis$y(SymbolPrototype.toString);
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  var replace$6 = uncurryThis$y(''.replace);
	  var stringSlice$7 = uncurryThis$y(''.slice);

	  defineBuiltInAccessor$b(SymbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = thisSymbolValue(this);
	      if (hasOwn$d(EmptyStringDescriptionStore, symbol)) return '';
	      var string = symbolDescriptiveString(symbol);
	      var desc = NATIVE_SYMBOL$1 ? stringSlice$7(string, 7, -1) : replace$6(string, regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $$1r({ global: true, constructor: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	var defineWellKnownSymbol$4 = wellKnownSymbolDefine;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$4('iterator');

	var $$1q = _export;
	var fails$B = fails$1c;
	var isArray$3 = isArray$8;
	var isObject$e = isObject$u;
	var toObject$9 = toObject$l;
	var lengthOfArrayLike$7 = lengthOfArrayLike$n;
	var doesNotExceedSafeInteger$2 = doesNotExceedSafeInteger$4;
	var createProperty$6 = createProperty$8;
	var arraySpeciesCreate$1 = arraySpeciesCreate$3;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$c = wellKnownSymbol$z;
	var V8_VERSION$1 = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$c('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$B(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$e(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$3(O);
	};

	var FORCED$f = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$3('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$1q({ target: 'Array', proto: true, arity: 1, forced: FORCED$f }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$9(this);
	    var A = arraySpeciesCreate$1(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$7(E);
	        doesNotExceedSafeInteger$2(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$6(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger$2(n + 1);
	        createProperty$6(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var call$n = functionCall;
	var anObject$q = anObject$E;
	var getMethod$6 = getMethod$a;

	var iteratorClose$5 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$q(iterator);
	  try {
	    innerResult = getMethod$6(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$n(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$q(innerResult);
	  return value;
	};

	var anObject$p = anObject$E;
	var iteratorClose$4 = iteratorClose$5;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$3 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$p(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose$4(iterator, 'throw', error);
	  }
	};

	var bind$8 = functionBindContext;
	var call$m = functionCall;
	var toObject$8 = toObject$l;
	var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$3;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
	var isConstructor = isConstructor$4;
	var lengthOfArrayLike$6 = lengthOfArrayLike$n;
	var createProperty$5 = createProperty$8;
	var getIterator$2 = getIterator$4;
	var getIteratorMethod$2 = getIteratorMethod$5;

	var $Array = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject$8(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind$8(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod$2(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod$1(iteratorMethod))) {
	    result = IS_CONSTRUCTOR ? new this() : [];
	    iterator = getIterator$2(O, iteratorMethod);
	    next = iterator.next;
	    for (;!(step = call$m(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing$2(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty$5(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike$6(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$5(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var $$1p = _export;
	var from = arrayFrom$1;
	var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration$2(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$1p({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$1o = _export;
	var uncurryThis$x = functionUncurryThisClause;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict$4 = arrayMethodIsStrict$7;

	var nativeIndexOf = uncurryThis$x([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var FORCED$e = NEGATIVE_ZERO || !arrayMethodIsStrict$4('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$1o({ target: 'Array', proto: true, forced: FORCED$e }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var DESCRIPTORS$l = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis$w = functionUncurryThis;
	var defineBuiltInAccessor$a = defineBuiltInAccessor$i;

	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis$w(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec$4 = uncurryThis$w(nameRE.exec);
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS$l && !FUNCTION_NAME_EXISTS) {
	  defineBuiltInAccessor$a(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec$4(nameRE, functionToString(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var DESCRIPTORS$k = descriptors;
	var uncurryThis$v = functionUncurryThis;
	var call$l = functionCall;
	var fails$A = fails$1c;
	var objectKeys$1 = objectKeys$4;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$7 = toObject$l;
	var IndexedObject = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$4 = Object.defineProperty;
	var concat$1 = uncurryThis$v([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$A(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$k && $assign({ b: 1 }, $assign(defineProperty$4({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$4(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol('assign detection');
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] !== 7 || objectKeys$1($assign({}, B)).join('') !== alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$7(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$k || call$l(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$1n = _export;
	var assign$1 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$1n({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
	  assign: assign$1
	});

	var isObject$d = isObject$u;
	var classof$6 = classofRaw$2;
	var wellKnownSymbol$b = wellKnownSymbol$z;

	var MATCH$2 = wellKnownSymbol$b('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$d(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$6(it) === 'RegExp');
	};

	var DESCRIPTORS$j = descriptors;
	var global$t = global$Z;
	var uncurryThis$u = functionUncurryThis;
	var isForced$2 = isForced_1;
	var inheritIfRequired$2 = inheritIfRequired$7;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$e;
	var create$5 = objectCreate;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var isRegExp$3 = isRegexp;
	var toString$k = toString$v;
	var getRegExpFlags$2 = regexpGetFlags;
	var stickyHelpers$1 = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$2;
	var defineBuiltIn$b = defineBuiltIn$n;
	var fails$z = fails$1c;
	var hasOwn$c = hasOwnProperty_1;
	var enforceInternalState$1 = internalState.enforce;
	var setSpecies$4 = setSpecies$6;
	var wellKnownSymbol$a = wellKnownSymbol$z;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH$1 = wellKnownSymbol$a('match');
	var NativeRegExp = global$t.RegExp;
	var RegExpPrototype$4 = NativeRegExp.prototype;
	var SyntaxError$2 = global$t.SyntaxError;
	var exec$5 = uncurryThis$u(RegExpPrototype$4.exec);
	var charAt$7 = uncurryThis$u(''.charAt);
	var replace$5 = uncurryThis$u(''.replace);
	var stringIndexOf$2 = uncurryThis$u(''.indexOf);
	var stringSlice$6 = uncurryThis$u(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY$1 = stickyHelpers$1.MISSED_STICKY;
	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$j &&
	  (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG || fails$z(function () {
	    re2[MATCH$1] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt$7(string, index);
	    if (chr === '\\') {
	      result += chr + charAt$7(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = create$5(null);
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt$7(string, index);
	    if (chr === '\\') {
	      chr += charAt$7(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec$5(IS_NCG, stringSlice$6(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn$c(names, groupname)) {
	          throw new SyntaxError$2('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced$2('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf$1(RegExpPrototype$4, this);
	    var patternIsRegExp = isRegExp$3(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf$1(RegExpPrototype$4, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags$2(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$k(pattern);
	    flags = flags === undefined ? '' : toString$k(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf$2(flags, 's') > -1;
	      if (dotAll) flags = replace$5(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY$1 && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf$2(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y$1) flags = replace$5(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$4, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState$1(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty$3(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys$1 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$1.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys$1[index++]);
	  }

	  RegExpPrototype$4.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$4;
	  defineBuiltIn$b(global$t, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies$4('RegExp');

	var DESCRIPTORS$i = descriptors;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var classof$5 = classofRaw$2;
	var defineBuiltInAccessor$9 = defineBuiltInAccessor$i;
	var getInternalState$4 = internalState.get;

	var RegExpPrototype$3 = RegExp.prototype;
	var $TypeError$c = TypeError;

	// `RegExp.prototype.dotAll` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
	if (DESCRIPTORS$i && UNSUPPORTED_DOT_ALL) {
	  defineBuiltInAccessor$9(RegExpPrototype$3, 'dotAll', {
	    configurable: true,
	    get: function dotAll() {
	      if (this === RegExpPrototype$3) return;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof$5(this) === 'RegExp') {
	        return !!getInternalState$4(this).dotAll;
	      }
	      throw new $TypeError$c('Incompatible receiver, RegExp required');
	    }
	  });
	}

	var DESCRIPTORS$h = descriptors;
	var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
	var classof$4 = classofRaw$2;
	var defineBuiltInAccessor$8 = defineBuiltInAccessor$i;
	var getInternalState$3 = internalState.get;

	var RegExpPrototype$2 = RegExp.prototype;
	var $TypeError$b = TypeError;

	// `RegExp.prototype.sticky` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
	if (DESCRIPTORS$h && MISSED_STICKY) {
	  defineBuiltInAccessor$8(RegExpPrototype$2, 'sticky', {
	    configurable: true,
	    get: function sticky() {
	      if (this === RegExpPrototype$2) return;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof$4(this) === 'RegExp') {
	        return !!getInternalState$3(this).sticky;
	      }
	      throw new $TypeError$b('Incompatible receiver, RegExp required');
	    }
	  });
	}

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var $$1m = _export;
	var call$k = functionCall;
	var isCallable$b = isCallable$y;
	var anObject$o = anObject$E;
	var toString$j = toString$v;

	var DELEGATES_TO_EXEC = function () {
	  var execCalled = false;
	  var re = /[ac]/;
	  re.exec = function () {
	    execCalled = true;
	    return /./.exec.apply(this, arguments);
	  };
	  return re.test('abc') === true && execCalled;
	}();

	var nativeTest = /./.test;

	// `RegExp.prototype.test` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.test
	$$1m({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
	  test: function (S) {
	    var R = anObject$o(this);
	    var string = toString$j(S);
	    var exec = R.exec;
	    if (!isCallable$b(exec)) return call$k(nativeTest, R, string);
	    var result = call$k(exec, R, string);
	    if (result === null) return false;
	    anObject$o(result);
	    return true;
	  }
	});

	var charAt$6 = stringMultibyte.charAt;
	var toString$i = toString$v;
	var InternalStateModule$8 = internalState;
	var defineIterator$1 = iteratorDefine;
	var createIterResultObject$4 = createIterResultObject$6;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$8 = InternalStateModule$8.set;
	var getInternalState$2 = InternalStateModule$8.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$1(String, 'String', function (iterated) {
	  setInternalState$8(this, {
	    type: STRING_ITERATOR,
	    string: toString$i(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject$4(undefined, true);
	  point = charAt$6(string, index);
	  state.index += point.length;
	  return createIterResultObject$4(point, false);
	});

	var $$1l = _export;
	var global$s = global$Z;
	var anInstance$8 = anInstance$b;
	var anObject$n = anObject$E;
	var isCallable$a = isCallable$y;
	var getPrototypeOf = objectGetPrototypeOf$1;
	var defineBuiltInAccessor$7 = defineBuiltInAccessor$i;
	var createProperty$4 = createProperty$8;
	var fails$y = fails$1c;
	var hasOwn$b = hasOwnProperty_1;
	var wellKnownSymbol$9 = wellKnownSymbol$z;
	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var DESCRIPTORS$g = descriptors;

	var CONSTRUCTOR = 'constructor';
	var ITERATOR$4 = 'Iterator';
	var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');

	var $TypeError$a = TypeError;
	var NativeIterator = global$s[ITERATOR$4];

	// FF56- have non-standard global helper `Iterator`
	var FORCED$d = !isCallable$a(NativeIterator)
	  || NativeIterator.prototype !== IteratorPrototype$1
	  // FF44- non-standard `Iterator` passes previous tests
	  || !fails$y(function () { NativeIterator({}); });

	var IteratorConstructor = function Iterator() {
	  anInstance$8(this, IteratorPrototype$1);
	  if (getPrototypeOf(this) === IteratorPrototype$1) throw new $TypeError$a('Abstract class Iterator not directly constructable');
	};

	var defineIteratorPrototypeAccessor = function (key, value) {
	  if (DESCRIPTORS$g) {
	    defineBuiltInAccessor$7(IteratorPrototype$1, key, {
	      configurable: true,
	      get: function () {
	        return value;
	      },
	      set: function (replacement) {
	        anObject$n(this);
	        if (this === IteratorPrototype$1) throw new $TypeError$a("You can't redefine this property");
	        if (hasOwn$b(this, key)) this[key] = replacement;
	        else createProperty$4(this, key, replacement);
	      }
	    });
	  } else IteratorPrototype$1[key] = value;
	};

	if (!hasOwn$b(IteratorPrototype$1, TO_STRING_TAG$1)) defineIteratorPrototypeAccessor(TO_STRING_TAG$1, ITERATOR$4);

	if (FORCED$d || !hasOwn$b(IteratorPrototype$1, CONSTRUCTOR) || IteratorPrototype$1[CONSTRUCTOR] === Object) {
	  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
	}

	IteratorConstructor.prototype = IteratorPrototype$1;

	// `Iterator` constructor
	// https://github.com/tc39/proposal-iterator-helpers
	$$1l({ global: true, constructor: true, forced: FORCED$d }, {
	  Iterator: IteratorConstructor
	});

	var bind$7 = functionBindContext;
	var call$j = functionCall;
	var anObject$m = anObject$E;
	var tryToString = tryToString$7;
	var isArrayIteratorMethod = isArrayIteratorMethod$3;
	var lengthOfArrayLike$5 = lengthOfArrayLike$n;
	var isPrototypeOf = objectIsPrototypeOf;
	var getIterator$1 = getIterator$4;
	var getIteratorMethod$1 = getIteratorMethod$5;
	var iteratorClose$3 = iteratorClose$5;

	var $TypeError$9 = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$e = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$7(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose$3(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$m(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$1(iterable);
	    if (!iterFn) throw new $TypeError$9(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$5(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator$1(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call$j(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose$3(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	// `GetIteratorDirect(obj)` abstract operation
	// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
	var getIteratorDirect$a = function (obj) {
	  return {
	    iterator: obj,
	    next: obj.next,
	    done: false
	  };
	};

	var $$1k = _export;
	var iterate$d = iterate$e;
	var aCallable$f = aCallable$n;
	var anObject$l = anObject$E;
	var getIteratorDirect$9 = getIteratorDirect$a;

	// `Iterator.prototype.forEach` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$1k({ target: 'Iterator', proto: true, real: true }, {
	  forEach: function forEach(fn) {
	    anObject$l(this);
	    aCallable$f(fn);
	    var record = getIteratorDirect$9(this);
	    var counter = 0;
	    iterate$d(record, function (value) {
	      fn(value, counter++);
	    }, { IS_RECORD: true });
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$7;

	var STRICT_METHOD$1 = arrayMethodIsStrict$3('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$r = global$Z;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var forEach$3 = arrayForEach;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$e;

	var handlePrototype$1 = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach$3) try {
	    createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach$3);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach$3;
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  if (DOMIterables$1[COLLECTION_NAME$1]) {
	    handlePrototype$1(global$r[COLLECTION_NAME$1] && global$r[COLLECTION_NAME$1].prototype);
	  }
	}

	handlePrototype$1(DOMTokenListPrototype$1);

	var global$q = global$Z;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$e;
	var setToStringTag$9 = setToStringTag$e;
	var wellKnownSymbol$8 = wellKnownSymbol$z;

	var ITERATOR$3 = wellKnownSymbol$8('iterator');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$3] !== ArrayValues) try {
	      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$3, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$3] = ArrayValues;
	    }
	    setToStringTag$9(CollectionPrototype, COLLECTION_NAME, true);
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(global$q[COLLECTION_NAME] && global$q[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var defineWellKnownSymbol$3 = wellKnownSymbolDefine;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol$3('asyncIterator');

	var defineWellKnownSymbol$2 = wellKnownSymbolDefine;
	var defineSymbolToPrimitive = symbolDefineToPrimitive;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol$2('toPrimitive');

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive();

	var getBuiltIn$b = getBuiltIn$l;
	var defineWellKnownSymbol$1 = wellKnownSymbolDefine;
	var setToStringTag$8 = setToStringTag$e;

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol$1('toStringTag');

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$8(getBuiltIn$b('Symbol'), 'Symbol');

	var $$1j = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$1j({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$1i = _export;
	var $includes = arrayIncludes.includes;
	var fails$x = fails$1c;
	var addToUnscopables$3 = addToUnscopables$5;

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails$x(function () {
	  // eslint-disable-next-line es/no-array-prototype-includes -- detection
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$1i({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$3('includes');

	var $$1h = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$1h({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$1g = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$7;
	var CHROME_VERSION$1 = engineV8Version;
	var IS_NODE$4 = engineIsNode;

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG$1 = !IS_NODE$4 && CHROME_VERSION$1 > 79 && CHROME_VERSION$1 < 83;
	var FORCED$c = CHROME_BUG$1 || !arrayMethodIsStrict$2('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$$1g({ target: 'Array', proto: true, forced: FORCED$c }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$1f = _export;
	var uncurryThis$t = functionUncurryThis;
	var isArray$2 = isArray$8;

	var nativeReverse = uncurryThis$t([].reverse);
	var test$1 = [1, 2];

	// `Array.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794
	$$1f({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign -- dirty hack
	    if (isArray$2(this)) this.length = this.length;
	    return nativeReverse(this);
	  }
	});

	var $$1e = _export;
	var toObject$6 = toObject$l;
	var toAbsoluteIndex = toAbsoluteIndex$7;
	var toIntegerOrInfinity$5 = toIntegerOrInfinity$h;
	var lengthOfArrayLike$4 = lengthOfArrayLike$n;
	var setArrayLength$1 = arraySetLength;
	var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$4;
	var arraySpeciesCreate = arraySpeciesCreate$3;
	var createProperty$3 = createProperty$8;
	var deletePropertyOrThrow$2 = deletePropertyOrThrow$4;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

	var max$2 = Math.max;
	var min$3 = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$1e({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$6(this);
	    var len = lengthOfArrayLike$4(O);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$3(max$2(toIntegerOrInfinity$5(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger$1(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$3(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow$2(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow$2(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow$2(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength$1(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});

	var $$1d = _export;
	var toObject$5 = toObject$l;
	var lengthOfArrayLike$3 = lengthOfArrayLike$n;
	var setArrayLength = arraySetLength;
	var deletePropertyOrThrow$1 = deletePropertyOrThrow$4;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$4;

	// IE8-
	var INCORRECT_RESULT = [].unshift(0) !== 1;

	// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
	var properErrorOnNonWritableLength = function () {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).unshift();
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	};

	var FORCED$b = INCORRECT_RESULT || !properErrorOnNonWritableLength();

	// `Array.prototype.unshift` method
	// https://tc39.es/ecma262/#sec-array.prototype.unshift
	$$1d({ target: 'Array', proto: true, arity: 1, forced: FORCED$b }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  unshift: function unshift(item) {
	    var O = toObject$5(this);
	    var len = lengthOfArrayLike$3(O);
	    var argCount = arguments.length;
	    if (argCount) {
	      doesNotExceedSafeInteger(len + argCount);
	      var k = len;
	      while (k--) {
	        var to = k + argCount;
	        if (k in O) O[to] = O[k];
	        else deletePropertyOrThrow$1(O, to);
	      }
	      for (var j = 0; j < argCount; j++) {
	        O[j] = arguments[j];
	      }
	    } return setArrayLength(O, len + argCount);
	  }
	});

	var $$1c = _export;
	var global$p = global$Z;
	var arrayBufferModule = arrayBuffer;
	var setSpecies$3 = setSpecies$6;

	var ARRAY_BUFFER = 'ArrayBuffer';
	var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
	var NativeArrayBuffer = global$p[ARRAY_BUFFER];

	// `ArrayBuffer` constructor
	// https://tc39.es/ecma262/#sec-arraybuffer-constructor
	$$1c({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$1 }, {
	  ArrayBuffer: ArrayBuffer$1
	});

	setSpecies$3(ARRAY_BUFFER);

	var $$1b = _export;
	var fails$w = fails$1c;
	var toObject$4 = toObject$l;
	var toPrimitive = toPrimitive$4;

	var FORCED$a = fails$w(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	});

	// `Date.prototype.toJSON` method
	// https://tc39.es/ecma262/#sec-date.prototype.tojson
	$$1b({ target: 'Date', proto: true, arity: 1, forced: FORCED$a }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  toJSON: function toJSON(key) {
	    var O = toObject$4(this);
	    var pv = toPrimitive(O, 'number');
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	var anObject$k = anObject$E;
	var ordinaryToPrimitive = ordinaryToPrimitive$2;

	var $TypeError$8 = TypeError;

	// `Date.prototype[@@toPrimitive](hint)` method implementation
	// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
	var dateToPrimitive$1 = function (hint) {
	  anObject$k(this);
	  if (hint === 'string' || hint === 'default') hint = 'string';
	  else if (hint !== 'number') throw new $TypeError$8('Incorrect hint');
	  return ordinaryToPrimitive(this, hint);
	};

	var hasOwn$a = hasOwnProperty_1;
	var defineBuiltIn$a = defineBuiltIn$n;
	var dateToPrimitive = dateToPrimitive$1;
	var wellKnownSymbol$7 = wellKnownSymbol$z;

	var TO_PRIMITIVE = wellKnownSymbol$7('toPrimitive');
	var DatePrototype = Date.prototype;

	// `Date.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
	if (!hasOwn$a(DatePrototype, TO_PRIMITIVE)) {
	  defineBuiltIn$a(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
	}

	var $$1a = _export;
	var global$o = global$Z;

	// `globalThis` object
	// https://tc39.es/ecma262/#sec-globalthis
	$$1a({ global: true, forced: global$o.globalThis !== global$o }, {
	  globalThis: global$o
	});

	var global$n = global$Z;
	var setToStringTag$7 = setToStringTag$e;

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag$7(global$n.JSON, 'JSON', true);

	var setToStringTag$6 = setToStringTag$e;

	// Math[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-math-@@tostringtag
	setToStringTag$6(Math, 'Math', true);

	var global$m = global$Z;

	var globalIsFinite = global$m.isFinite;

	// `Number.isFinite` method
	// https://tc39.es/ecma262/#sec-number.isfinite
	// eslint-disable-next-line es/no-number-isfinite -- safe
	var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
	  return typeof it == 'number' && globalIsFinite(it);
	};

	var $$19 = _export;
	var numberIsFinite = numberIsFinite$1;

	// `Number.isFinite` method
	// https://tc39.es/ecma262/#sec-number.isfinite
	$$19({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

	var DESCRIPTORS$f = descriptors;
	var fails$v = fails$1c;
	var uncurryThis$s = functionUncurryThis;
	var objectGetPrototypeOf = objectGetPrototypeOf$1;
	var objectKeys = objectKeys$4;
	var toIndexedObject$2 = toIndexedObject$e;
	var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$s($propertyIsEnumerable);
	var push$9 = uncurryThis$s([].push);

	// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
	// of `null` prototype objects
	var IE_BUG = DESCRIPTORS$f && fails$v(function () {
	  // eslint-disable-next-line es/no-object-create -- safe
	  var O = Object.create(null);
	  O[2] = 2;
	  return !propertyIsEnumerable(O, 2);
	});

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$2(it);
	    var keys = objectKeys(O);
	    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$f || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
	        push$9(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod(false)
	};

	var $$18 = _export;
	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	$$18({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var fails$u = fails$1c;

	var freezing = !fails$u(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = {exports: {}};

	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
	var fails$t = fails$1c;

	var arrayBufferNonExtensible = fails$t(function () {
	  if (typeof ArrayBuffer == 'function') {
	    var buffer = new ArrayBuffer(8);
	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
	  }
	});

	var fails$s = fails$1c;
	var isObject$c = isObject$u;
	var classof$3 = classofRaw$2;
	var ARRAY_BUFFER_NON_EXTENSIBLE$1 = arrayBufferNonExtensible;

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var $isExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES$4 = fails$s(function () { $isExtensible(1); });

	// `Object.isExtensible` method
	// https://tc39.es/ecma262/#sec-object.isextensible
	var objectIsExtensible = (FAILS_ON_PRIMITIVES$4 || ARRAY_BUFFER_NON_EXTENSIBLE$1) ? function isExtensible(it) {
	  if (!isObject$c(it)) return false;
	  if (ARRAY_BUFFER_NON_EXTENSIBLE$1 && classof$3(it) === 'ArrayBuffer') return false;
	  return $isExtensible ? $isExtensible(it) : true;
	} : $isExtensible;

	var $$17 = _export;
	var uncurryThis$r = functionUncurryThis;
	var hiddenKeys = hiddenKeys$6;
	var isObject$b = isObject$u;
	var hasOwn$9 = hasOwnProperty_1;
	var defineProperty$3 = objectDefineProperty.f;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
	var isExtensible$1 = objectIsExtensible;
	var uid = uid$5;
	var FREEZING$2 = freezing;

	var REQUIRED = false;
	var METADATA = uid('meta');
	var id$1 = 0;

	var setMetadata = function (it) {
	  defineProperty$3(it, METADATA, { value: {
	    objectID: 'O' + id$1++, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey$1 = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject$b(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!hasOwn$9(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData$1 = function (it, create) {
	  if (!hasOwn$9(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible$1(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze$1 = function (it) {
	  if (FREEZING$2 && REQUIRED && isExtensible$1(it) && !hasOwn$9(it, METADATA)) setMetadata(it);
	  return it;
	};

	var enable = function () {
	  meta.enable = function () { /* empty */ };
	  REQUIRED = true;
	  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
	  var splice = uncurryThis$r([].splice);
	  var test = {};
	  test[METADATA] = 1;

	  // prevent exposing of metadata key
	  if (getOwnPropertyNames(test).length) {
	    getOwnPropertyNamesModule.f = function (it) {
	      var result = getOwnPropertyNames(it);
	      for (var i = 0, length = result.length; i < length; i++) {
	        if (result[i] === METADATA) {
	          splice(result, i, 1);
	          break;
	        }
	      } return result;
	    };

	    $$17({ target: 'Object', stat: true, forced: true }, {
	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
	    });
	  }
	};

	var meta = internalMetadata.exports = {
	  enable: enable,
	  fastKey: fastKey$1,
	  getWeakData: getWeakData$1,
	  onFreeze: onFreeze$1
	};

	hiddenKeys[METADATA] = true;

	var internalMetadataExports = internalMetadata.exports;

	var $$16 = _export;
	var FREEZING$1 = freezing;
	var fails$r = fails$1c;
	var isObject$a = isObject$u;
	var onFreeze = internalMetadataExports.onFreeze;

	// eslint-disable-next-line es/no-object-freeze -- safe
	var $freeze = Object.freeze;
	var FAILS_ON_PRIMITIVES$3 = fails$r(function () { $freeze(1); });

	// `Object.freeze` method
	// https://tc39.es/ecma262/#sec-object.freeze
	$$16({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3, sham: !FREEZING$1 }, {
	  freeze: function freeze(it) {
	    return $freeze && isObject$a(it) ? $freeze(onFreeze(it)) : it;
	  }
	});

	var $$15 = _export;
	var fails$q = fails$1c;
	var toIndexedObject$1 = toIndexedObject$e;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var DESCRIPTORS$e = descriptors;

	var FORCED$9 = !DESCRIPTORS$e || fails$q(function () { nativeGetOwnPropertyDescriptor(1); });

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$$15({ target: 'Object', stat: true, forced: FORCED$9, sham: !DESCRIPTORS$e }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject$1(it), key);
	  }
	});

	var $$14 = _export;
	var DESCRIPTORS$d = descriptors;
	var ownKeys$1 = ownKeys$3;
	var toIndexedObject = toIndexedObject$e;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var createProperty$2 = createProperty$8;

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	$$14({ target: 'Object', stat: true, sham: !DESCRIPTORS$d }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
	    var keys = ownKeys$1(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty$2(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var $$13 = _export;
	var fails$p = fails$1c;
	var getOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;

	// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
	var FAILS_ON_PRIMITIVES$2 = fails$p(function () { return !Object.getOwnPropertyNames(1); });

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	$$13({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
	  getOwnPropertyNames: getOwnPropertyNames
	});

	var $$12 = _export;
	var fails$o = fails$1c;
	var toObject$3 = toObject$l;
	var nativeGetPrototypeOf = objectGetPrototypeOf$1;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var FAILS_ON_PRIMITIVES$1 = fails$o(function () { nativeGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	$$12({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !CORRECT_PROTOTYPE_GETTER }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return nativeGetPrototypeOf(toObject$3(it));
	  }
	});

	var $$11 = _export;
	var toObject$2 = toObject$l;
	var nativeKeys = objectKeys$4;
	var fails$n = fails$1c;

	var FAILS_ON_PRIMITIVES = fails$n(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$11({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$2(it));
	  }
	});

	var $$10 = _export;
	var setPrototypeOf$1 = objectSetPrototypeOf;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$10({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$1
	});

	var $TypeError$7 = TypeError;

	var validateArgumentsLength$9 = function (passed, required) {
	  if (passed < required) throw new $TypeError$7('Not enough arguments');
	  return passed;
	};

	var userAgent$2 = engineUserAgent;

	// eslint-disable-next-line redos/no-vulnerable -- safe
	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

	var global$l = global$Z;
	var apply$2 = functionApply$1;
	var bind$6 = functionBindContext;
	var isCallable$9 = isCallable$y;
	var hasOwn$8 = hasOwnProperty_1;
	var fails$m = fails$1c;
	var html = html$2;
	var arraySlice$3 = arraySlice$a;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength$8 = validateArgumentsLength$9;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$3 = engineIsNode;

	var set = global$l.setImmediate;
	var clear = global$l.clearImmediate;
	var process$2 = global$l.process;
	var Dispatch = global$l.Dispatch;
	var Function$2 = global$l.Function;
	var MessageChannel = global$l.MessageChannel;
	var String$1 = global$l.String;
	var counter = 0;
	var queue$2 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel, port;

	fails$m(function () {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  $location = global$l.location;
	});

	var run = function (id) {
	  if (hasOwn$8(queue$2, id)) {
	    var fn = queue$2[id];
	    delete queue$2[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var eventListener = function (event) {
	  run(event.data);
	};

	var globalPostMessageDefer = function (id) {
	  // old engines have not location.origin
	  global$l.postMessage(String$1(id), $location.protocol + '//' + $location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(handler) {
	    validateArgumentsLength$8(arguments.length, 1);
	    var fn = isCallable$9(handler) ? handler : Function$2(handler);
	    var args = arraySlice$3(arguments, 1);
	    queue$2[++counter] = function () {
	      apply$2(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$2[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$3) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = eventListener;
	    defer = bind$6(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$l.addEventListener &&
	    isCallable$9(global$l.postMessage) &&
	    !global$l.importScripts &&
	    $location && $location.protocol !== 'file:' &&
	    !fails$m(globalPostMessageDefer)
	  ) {
	    defer = globalPostMessageDefer;
	    global$l.addEventListener('message', eventListener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var global$k = global$Z;
	var DESCRIPTORS$c = descriptors;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Avoid NodeJS experimental warning
	var safeGetBuiltIn$2 = function (name) {
	  if (!DESCRIPTORS$c) return global$k[name];
	  var descriptor = getOwnPropertyDescriptor$3(global$k, name);
	  return descriptor && descriptor.value;
	};

	var Queue$2 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$2.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    var tail = this.tail;
	    if (tail) tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      var next = this.head = entry.next;
	      if (next === null) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue$1 = Queue$2;

	var userAgent$1 = engineUserAgent;

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

	var userAgent = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$j = global$Z;
	var safeGetBuiltIn$1 = safeGetBuiltIn$2;
	var bind$5 = functionBindContext;
	var macrotask = task$1.set;
	var Queue$1 = queue$1;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$2 = engineIsNode;

	var MutationObserver = global$j.MutationObserver || global$j.WebKitMutationObserver;
	var document$2 = global$j.document;
	var process$1 = global$j.process;
	var Promise$1 = global$j.Promise;
	var microtask$2 = safeGetBuiltIn$1('queueMicrotask');
	var notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!microtask$2) {
	  var queue = new Queue$1();

	  var flush = function () {
	    var parent, fn;
	    if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
	    while (fn = queue.get()) try {
	      fn();
	    } catch (error) {
	      if (queue.head) notify$1();
	      throw error;
	    }
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = bind$5(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$2) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // `webpack` dev server bug on IE global methods - use bind(fn, global)
	    macrotask = bind$5(macrotask, global$j);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }

	  microtask$2 = function (fn) {
	    if (!queue.head) notify$1();
	    queue.add(fn);
	  };
	}

	var microtask_1 = microtask$2;

	var hostReportErrors$1 = function (a, b) {
	  try {
	    // eslint-disable-next-line no-console -- safe
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  } catch (error) { /* empty */ }
	};

	var perform$3 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var global$i = global$Z;

	var promiseNativeConstructor = global$i.Promise;

	var global$h = global$Z;
	var NativePromiseConstructor$4 = promiseNativeConstructor;
	var isCallable$8 = isCallable$y;
	var isForced$1 = isForced_1;
	var inspectSource = inspectSource$3;
	var wellKnownSymbol$6 = wellKnownSymbol$z;
	var IS_BROWSER = engineIsBrowser;
	var IS_DENO = engineIsDeno;
	var V8_VERSION = engineV8Version;

	NativePromiseConstructor$4 && NativePromiseConstructor$4.prototype;
	var SPECIES = wellKnownSymbol$6('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$8(global$h.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$4);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$4);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new NativePromiseConstructor$4(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
	});

	var promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
	  SUBCLASSING: SUBCLASSING
	};

	var newPromiseCapability$2 = {};

	var aCallable$e = aCallable$n;

	var $TypeError$6 = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw new $TypeError$6('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$e(resolve);
	  this.reject = aCallable$e(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var $$$ = _export;
	var IS_NODE$1 = engineIsNode;
	var global$g = global$Z;
	var call$i = functionCall;
	var defineBuiltIn$9 = defineBuiltIn$n;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag$5 = setToStringTag$e;
	var setSpecies$2 = setSpecies$6;
	var aCallable$d = aCallable$n;
	var isCallable$7 = isCallable$y;
	var isObject$9 = isObject$u;
	var anInstance$7 = anInstance$b;
	var speciesConstructor$3 = speciesConstructor$6;
	var task = task$1.set;
	var microtask$1 = microtask_1;
	var hostReportErrors = hostReportErrors$1;
	var perform$2 = perform$3;
	var Queue = queue$1;
	var InternalStateModule$7 = internalState;
	var NativePromiseConstructor$3 = promiseNativeConstructor;
	var PromiseConstructorDetection = promiseConstructorDetection;
	var newPromiseCapabilityModule$3 = newPromiseCapability$2;

	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule$7.getterFor(PROMISE);
	var setInternalState$7 = InternalStateModule$7.set;
	var NativePromisePrototype$2 = NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
	var PromiseConstructor = NativePromiseConstructor$3;
	var PromisePrototype = NativePromisePrototype$2;
	var TypeError$3 = global$g.TypeError;
	var document$1 = global$g.document;
	var process = global$g.process;
	var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
	var newGenericPromiseCapability = newPromiseCapability$1;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$g.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$9(it) && isCallable$7(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state === FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(new TypeError$3('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call$i(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask$1(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$g.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$g['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call$i(task, global$g, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$2(function () {
	        if (IS_NODE$1) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call$i(task, global$g, function () {
	    var promise = state.facade;
	    if (IS_NODE$1) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$4 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw new TypeError$3("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask$1(function () {
	        var wrapper = { done: false };
	        try {
	          call$i(then, value,
	            bind$4(internalResolve, wrapper, state),
	            bind$4(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED_PROMISE_CONSTRUCTOR$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance$7(this, PromisePrototype);
	    aCallable$d(executor);
	    call$i(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind$4(internalResolve, state), bind$4(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState$7(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  // `Promise.prototype.then` method
	  // https://tc39.es/ecma262/#sec-promise.prototype.then
	  Internal.prototype = defineBuiltIn$9(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability$1(speciesConstructor$3(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable$7(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable$7(onRejected) && onRejected;
	    reaction.domain = IS_NODE$1 ? process.domain : undefined;
	    if (state.state === PENDING) state.reactions.add(reaction);
	    else microtask$1(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind$4(internalResolve, state);
	    this.reject = bind$4(internalReject, state);
	  };

	  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$7(NativePromiseConstructor$3) && NativePromisePrototype$2 !== Object.prototype) {
	    nativeThen = NativePromisePrototype$2.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn$9(NativePromisePrototype$2, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call$i(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype$2.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype$2, PromisePrototype);
	    }
	  }
	}

	$$$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag$5(PromiseConstructor, PROMISE, false);
	setSpecies$2(PROMISE);

	var NativePromiseConstructor$2 = promiseNativeConstructor;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;
	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
	  NativePromiseConstructor$2.all(iterable).then(undefined, function () { /* empty */ });
	});

	var $$_ = _export;
	var call$h = functionCall;
	var aCallable$c = aCallable$n;
	var newPromiseCapabilityModule$2 = newPromiseCapability$2;
	var perform$1 = perform$3;
	var iterate$c = iterate$e;
	var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$$_({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$2.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aCallable$c(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$c(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$h($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$Z = _export;
	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
	var NativePromiseConstructor$1 = promiseNativeConstructor;
	var getBuiltIn$a = getBuiltIn$l;
	var isCallable$6 = isCallable$y;
	var defineBuiltIn$8 = defineBuiltIn$n;

	var NativePromisePrototype$1 = NativePromiseConstructor$1 && NativePromiseConstructor$1.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$$Z({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (isCallable$6(NativePromiseConstructor$1)) {
	  var method$1 = getBuiltIn$a('Promise').prototype['catch'];
	  if (NativePromisePrototype$1['catch'] !== method$1) {
	    defineBuiltIn$8(NativePromisePrototype$1, 'catch', method$1, { unsafe: true });
	  }
	}

	var $$Y = _export;
	var call$g = functionCall;
	var aCallable$b = aCallable$n;
	var newPromiseCapabilityModule$1 = newPromiseCapability$2;
	var perform = perform$3;
	var iterate$b = iterate$e;
	var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$$Y({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$1.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable$b(C.resolve);
	      iterate$b(iterable, function (promise) {
	        call$g($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$X = _export;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$$X({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    var capabilityReject = capability.reject;
	    capabilityReject(r);
	    return capability.promise;
	  }
	});

	var anObject$j = anObject$E;
	var isObject$8 = isObject$u;
	var newPromiseCapability = newPromiseCapability$2;

	var promiseResolve$2 = function (C, x) {
	  anObject$j(C);
	  if (isObject$8(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var $$W = _export;
	var getBuiltIn$9 = getBuiltIn$l;
	var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
	var promiseResolve$1 = promiseResolve$2;

	getBuiltIn$9('Promise');

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$$W({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve$1(this, x);
	  }
	});

	var isRegExp$2 = isRegexp;

	var $TypeError$5 = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp$2(it)) {
	    throw new $TypeError$5("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$5 = wellKnownSymbol$z;

	var MATCH = wellKnownSymbol$5('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$V = _export;
	var uncurryThis$q = functionUncurryThisClause;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var toLength$4 = toLength$c;
	var toString$h = toString$v;
	var notARegExp$2 = notARegexp;
	var requireObjectCoercible$a = requireObjectCoercible$h;
	var correctIsRegExpLogic$2 = correctIsRegexpLogic;

	var slice$2 = uncurryThis$q(''.slice);
	var min$2 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$2('endsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
	  var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'endsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.endsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.endswith
	$$V({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = toString$h(requireObjectCoercible$a(this));
	    notARegExp$2(searchString);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = that.length;
	    var end = endPosition === undefined ? len : min$2(toLength$4(endPosition), len);
	    var search = toString$h(searchString);
	    return slice$2(that, end - search.length, end) === search;
	  }
	});

	var call$f = functionCall;
	var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
	var anObject$i = anObject$E;
	var isNullOrUndefined$7 = isNullOrUndefined$d;
	var toLength$3 = toLength$c;
	var toString$g = toString$v;
	var requireObjectCoercible$9 = requireObjectCoercible$h;
	var getMethod$5 = getMethod$a;
	var advanceStringIndex$2 = advanceStringIndex$4;
	var regExpExec$3 = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic$2('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible$9(this);
	      var matcher = isNullOrUndefined$7(regexp) ? undefined : getMethod$5(regexp, MATCH);
	      return matcher ? call$f(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$g(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject$i(this);
	      var S = toString$g(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec$3(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$3(rx, S)) !== null) {
	        var matchStr = toString$g(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$3(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	/* eslint-disable es/no-string-prototype-matchall -- safe */
	var $$U = _export;
	var call$e = functionCall;
	var uncurryThis$p = functionUncurryThisClause;
	var createIteratorConstructor$1 = iteratorCreateConstructor;
	var createIterResultObject$3 = createIterResultObject$6;
	var requireObjectCoercible$8 = requireObjectCoercible$h;
	var toLength$2 = toLength$c;
	var toString$f = toString$v;
	var anObject$h = anObject$E;
	var isNullOrUndefined$6 = isNullOrUndefined$d;
	var classof$2 = classofRaw$2;
	var isRegExp$1 = isRegexp;
	var getRegExpFlags$1 = regexpGetFlags;
	var getMethod$4 = getMethod$a;
	var defineBuiltIn$7 = defineBuiltIn$n;
	var fails$l = fails$1c;
	var wellKnownSymbol$4 = wellKnownSymbol$z;
	var speciesConstructor$2 = speciesConstructor$6;
	var advanceStringIndex$1 = advanceStringIndex$4;
	var regExpExec$2 = regexpExecAbstract;
	var InternalStateModule$6 = internalState;
	var IS_PURE$4 = isPure;

	var MATCH_ALL = wellKnownSymbol$4('matchAll');
	var REGEXP_STRING = 'RegExp String';
	var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
	var setInternalState$6 = InternalStateModule$6.set;
	var getInternalState$1 = InternalStateModule$6.getterFor(REGEXP_STRING_ITERATOR);
	var RegExpPrototype$1 = RegExp.prototype;
	var $TypeError$4 = TypeError;
	var stringIndexOf$1 = uncurryThis$p(''.indexOf);
	var nativeMatchAll = uncurryThis$p(''.matchAll);

	var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails$l(function () {
	  nativeMatchAll('a', /./);
	});

	var $RegExpStringIterator = createIteratorConstructor$1(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
	  setInternalState$6(this, {
	    type: REGEXP_STRING_ITERATOR,
	    regexp: regexp,
	    string: string,
	    global: $global,
	    unicode: fullUnicode,
	    done: false
	  });
	}, REGEXP_STRING, function next() {
	  var state = getInternalState$1(this);
	  if (state.done) return createIterResultObject$3(undefined, true);
	  var R = state.regexp;
	  var S = state.string;
	  var match = regExpExec$2(R, S);
	  if (match === null) {
	    state.done = true;
	    return createIterResultObject$3(undefined, true);
	  }
	  if (state.global) {
	    if (toString$f(match[0]) === '') R.lastIndex = advanceStringIndex$1(S, toLength$2(R.lastIndex), state.unicode);
	    return createIterResultObject$3(match, false);
	  }
	  state.done = true;
	  return createIterResultObject$3(match, false);
	});

	var $matchAll = function (string) {
	  var R = anObject$h(this);
	  var S = toString$f(string);
	  var C = speciesConstructor$2(R, RegExp);
	  var flags = toString$f(getRegExpFlags$1(R));
	  var matcher, $global, fullUnicode;
	  matcher = new C(C === RegExp ? R.source : R, flags);
	  $global = !!~stringIndexOf$1(flags, 'g');
	  fullUnicode = !!~stringIndexOf$1(flags, 'u');
	  matcher.lastIndex = toLength$2(R.lastIndex);
	  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
	};

	// `String.prototype.matchAll` method
	// https://tc39.es/ecma262/#sec-string.prototype.matchall
	$$U({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
	  matchAll: function matchAll(regexp) {
	    var O = requireObjectCoercible$8(this);
	    var flags, S, matcher, rx;
	    if (!isNullOrUndefined$6(regexp)) {
	      if (isRegExp$1(regexp)) {
	        flags = toString$f(requireObjectCoercible$8(getRegExpFlags$1(regexp)));
	        if (!~stringIndexOf$1(flags, 'g')) throw new $TypeError$4('`.matchAll` does not allow non-global regexes');
	      }
	      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
	      matcher = getMethod$4(regexp, MATCH_ALL);
	      if (matcher === undefined && IS_PURE$4 && classof$2(regexp) === 'RegExp') matcher = $matchAll;
	      if (matcher) return call$e(matcher, regexp, O);
	    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
	    S = toString$f(O);
	    rx = new RegExp(regexp, 'g');
	    return rx[MATCH_ALL](S);
	  }
	});

	MATCH_ALL in RegExpPrototype$1 || defineBuiltIn$7(RegExpPrototype$1, MATCH_ALL, $matchAll);

	// `SameValue` abstract operation
	// https://tc39.es/ecma262/#sec-samevalue
	// eslint-disable-next-line es/no-object-is -- safe
	var sameValue$1 = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
	};

	var call$d = functionCall;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$g = anObject$E;
	var isNullOrUndefined$5 = isNullOrUndefined$d;
	var requireObjectCoercible$7 = requireObjectCoercible$h;
	var sameValue = sameValue$1;
	var toString$e = toString$v;
	var getMethod$3 = getMethod$a;
	var regExpExec$1 = regexpExecAbstract;

	// @@search logic
	fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.es/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible$7(this);
	      var searcher = isNullOrUndefined$5(regexp) ? undefined : getMethod$3(regexp, SEARCH);
	      return searcher ? call$d(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$e(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
	    function (string) {
	      var rx = anObject$g(this);
	      var S = toString$e(string);
	      var res = maybeCallNative(nativeSearch, rx, S);

	      if (res.done) return res.value;

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regExpExec$1(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var call$c = functionCall;
	var uncurryThis$o = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject$f = anObject$E;
	var isNullOrUndefined$4 = isNullOrUndefined$d;
	var requireObjectCoercible$6 = requireObjectCoercible$h;
	var speciesConstructor$1 = speciesConstructor$6;
	var advanceStringIndex = advanceStringIndex$4;
	var toLength$1 = toLength$c;
	var toString$d = toString$v;
	var getMethod$2 = getMethod$a;
	var regExpExec = regexpExecAbstract;
	var stickyHelpers = regexpStickyHelpers;
	var fails$k = fails$1c;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min$1 = Math.min;
	var push$8 = uncurryThis$o([].push);
	var stringSlice$5 = uncurryThis$o(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$k(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var BUGGY = 'abbc'.split(/(b)*/)[1] === 'c' ||
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  'test'.split(/(?:)/, -1).length !== 4 ||
	  'ab'.split(/(?:ab)*/).length !== 2 ||
	  '.'.split(/(.?)(.?)/).length !== 4 ||
	  // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
	  '.'.split(/()()/).length > 1 ||
	  ''.split(/.?/).length;

	// @@split logic
	fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit = '0'.split(undefined, 0).length ? function (separator, limit) {
	    return separator === undefined && limit === 0 ? [] : call$c(nativeSplit, this, separator, limit);
	  } : nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible$6(this);
	      var splitter = isNullOrUndefined$4(separator) ? undefined : getMethod$2(separator, SPLIT);
	      return splitter
	        ? call$c(splitter, separator, O, limit)
	        : call$c(internalSplit, toString$d(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject$f(this);
	      var S = toString$d(string);

	      if (!BUGGY) {
	        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
	        if (res.done) return res.value;
	      }

	      var C = speciesConstructor$1(rx, RegExp);
	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (UNSUPPORTED_Y ? 'g' : 'y');
	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = regExpExec(splitter, UNSUPPORTED_Y ? stringSlice$5(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min$1(toLength$1(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push$8(A, stringSlice$5(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push$8(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push$8(A, stringSlice$5(S, p));
	      return A;
	    }
	  ];
	}, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var fails$j = fails$1c;
	var whitespaces$2 = whitespaces$5;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$j(function () {
	    return !!whitespaces$2[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME && whitespaces$2[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$T = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$T({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var uncurryThis$n = functionUncurryThis;
	var requireObjectCoercible$5 = requireObjectCoercible$h;
	var toString$c = toString$v;

	var quot = /"/g;
	var replace$4 = uncurryThis$n(''.replace);

	// `CreateHTML` abstract operation
	// https://tc39.es/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = toString$c(requireObjectCoercible$5(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + replace$4(toString$c(value), quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	var fails$i = fails$1c;

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails$i(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	var $$S = _export;
	var createHTML$1 = createHtml;
	var forcedStringHTMLMethod$1 = stringHtmlForced;

	// `String.prototype.link` method
	// https://tc39.es/ecma262/#sec-string.prototype.link
	$$S({ target: 'String', proto: true, forced: forcedStringHTMLMethod$1('link') }, {
	  link: function link(url) {
	    return createHTML$1(this, 'a', 'href', url);
	  }
	});

	var createTypedArrayConstructor$7 = typedArrayConstructorExports;

	// `Float32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$7('Float32', function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$6 = typedArrayConstructorExports;

	// `Float64Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$6('Float64', function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$5 = typedArrayConstructorExports;

	// `Int8Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$5('Int8', function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$4 = typedArrayConstructorExports;

	// `Int16Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$4('Int16', function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$3 = typedArrayConstructorExports;

	// `Int32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$3('Int32', function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$2 = typedArrayConstructorExports;

	// `Uint8ClampedArray` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$2('Uint8', function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	var createTypedArrayConstructor$1 = typedArrayConstructorExports;

	// `Uint16Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$1('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor = typedArrayConstructorExports;

	// `Uint32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint32', function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var $RangeError$4 = RangeError;

	var notANan = function (it) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (it === it) return it;
	  throw new $RangeError$4('NaN is not allowed');
	};

	var call$b = functionCall;
	var create$4 = objectCreate;
	var createNonEnumerableProperty = createNonEnumerableProperty$e;
	var defineBuiltIns$4 = defineBuiltIns$6;
	var wellKnownSymbol$3 = wellKnownSymbol$z;
	var InternalStateModule$5 = internalState;
	var getMethod$1 = getMethod$a;
	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var createIterResultObject$2 = createIterResultObject$6;
	var iteratorClose$2 = iteratorClose$5;

	var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
	var ITERATOR_HELPER = 'IteratorHelper';
	var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
	var setInternalState$5 = InternalStateModule$5.set;

	var createIteratorProxyPrototype = function (IS_ITERATOR) {
	  var getInternalState = InternalStateModule$5.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

	  return defineBuiltIns$4(create$4(IteratorPrototype), {
	    next: function next() {
	      var state = getInternalState(this);
	      // for simplification:
	      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
	      //   for `%IteratorHelperPrototype%.next` - just a value
	      if (IS_ITERATOR) return state.nextHandler();
	      try {
	        var result = state.done ? undefined : state.nextHandler();
	        return createIterResultObject$2(result, state.done);
	      } catch (error) {
	        state.done = true;
	        throw error;
	      }
	    },
	    'return': function () {
	      var state = getInternalState(this);
	      var iterator = state.iterator;
	      state.done = true;
	      if (IS_ITERATOR) {
	        var returnMethod = getMethod$1(iterator, 'return');
	        return returnMethod ? call$b(returnMethod, iterator) : createIterResultObject$2(undefined, true);
	      }
	      if (state.inner) try {
	        iteratorClose$2(state.inner.iterator, 'normal');
	      } catch (error) {
	        return iteratorClose$2(iterator, 'throw', error);
	      }
	      iteratorClose$2(iterator, 'normal');
	      return createIterResultObject$2(undefined, true);
	    }
	  });
	};

	var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
	var IteratorHelperPrototype = createIteratorProxyPrototype(false);

	createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

	var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
	  var IteratorProxy = function Iterator(record, state) {
	    if (state) {
	      state.iterator = record.iterator;
	      state.next = record.next;
	    } else state = record;
	    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
	    state.nextHandler = nextHandler;
	    state.counter = 0;
	    state.done = false;
	    setInternalState$5(this, state);
	  };

	  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

	  return IteratorProxy;
	};

	var $$R = _export;
	var call$a = functionCall;
	var anObject$e = anObject$E;
	var getIteratorDirect$8 = getIteratorDirect$a;
	var notANaN = notANan;
	var toPositiveInteger = toPositiveInteger$2;
	var createIteratorProxy$2 = iteratorCreateProxy;
	var IS_PURE$3 = isPure;

	var IteratorProxy$2 = createIteratorProxy$2(function () {
	  var iterator = this.iterator;
	  var next = this.next;
	  var result, done;
	  while (this.remaining) {
	    this.remaining--;
	    result = anObject$e(call$a(next, iterator));
	    done = this.done = !!result.done;
	    if (done) return;
	  }
	  result = anObject$e(call$a(next, iterator));
	  done = this.done = !!result.done;
	  if (!done) return result.value;
	});

	// `Iterator.prototype.drop` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$R({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$3 }, {
	  drop: function drop(limit) {
	    anObject$e(this);
	    var remaining = toPositiveInteger(notANaN(+limit));
	    return new IteratorProxy$2(getIteratorDirect$8(this), {
	      remaining: remaining
	    });
	  }
	});

	var $$Q = _export;
	var call$9 = functionCall;
	var aCallable$a = aCallable$n;
	var anObject$d = anObject$E;
	var getIteratorDirect$7 = getIteratorDirect$a;
	var createIteratorProxy$1 = iteratorCreateProxy;
	var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$3;
	var IS_PURE$2 = isPure;

	var IteratorProxy$1 = createIteratorProxy$1(function () {
	  var iterator = this.iterator;
	  var predicate = this.predicate;
	  var next = this.next;
	  var result, done, value;
	  while (true) {
	    result = anObject$d(call$9(next, iterator));
	    done = this.done = !!result.done;
	    if (done) return;
	    value = result.value;
	    if (callWithSafeIterationClosing$1(iterator, predicate, [value, this.counter++], true)) return value;
	  }
	});

	// `Iterator.prototype.filter` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$Q({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$2 }, {
	  filter: function filter(predicate) {
	    anObject$d(this);
	    aCallable$a(predicate);
	    return new IteratorProxy$1(getIteratorDirect$7(this), {
	      predicate: predicate
	    });
	  }
	});

	var call$8 = functionCall;
	var aCallable$9 = aCallable$n;
	var anObject$c = anObject$E;
	var getIteratorDirect$6 = getIteratorDirect$a;
	var createIteratorProxy = iteratorCreateProxy;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$3;

	var IteratorProxy = createIteratorProxy(function () {
	  var iterator = this.iterator;
	  var result = anObject$c(call$8(this.next, iterator));
	  var done = this.done = !!result.done;
	  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
	});

	// `Iterator.prototype.map` method
	// https://github.com/tc39/proposal-iterator-helpers
	var iteratorMap = function map(mapper) {
	  anObject$c(this);
	  aCallable$9(mapper);
	  return new IteratorProxy(getIteratorDirect$6(this), {
	    mapper: mapper
	  });
	};

	var $$P = _export;
	var map = iteratorMap;
	var IS_PURE$1 = isPure;

	// `Iterator.prototype.map` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$P({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$1 }, {
	  map: map
	});

	var $$O = _export;
	var iterate$a = iterate$e;
	var aCallable$8 = aCallable$n;
	var anObject$b = anObject$E;
	var getIteratorDirect$5 = getIteratorDirect$a;

	var $TypeError$3 = TypeError;

	// `Iterator.prototype.reduce` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$O({ target: 'Iterator', proto: true, real: true }, {
	  reduce: function reduce(reducer /* , initialValue */) {
	    anObject$b(this);
	    aCallable$8(reducer);
	    var record = getIteratorDirect$5(this);
	    var noInitial = arguments.length < 2;
	    var accumulator = noInitial ? undefined : arguments[1];
	    var counter = 0;
	    iterate$a(record, function (value) {
	      if (noInitial) {
	        noInitial = false;
	        accumulator = value;
	      } else {
	        accumulator = reducer(accumulator, value, counter);
	      }
	      counter++;
	    }, { IS_RECORD: true });
	    if (noInitial) throw new $TypeError$3('Reduce of empty iterator with no initial value');
	    return accumulator;
	  }
	});

	var $$N = _export;
	var iterate$9 = iterate$e;
	var aCallable$7 = aCallable$n;
	var anObject$a = anObject$E;
	var getIteratorDirect$4 = getIteratorDirect$a;

	// `Iterator.prototype.some` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$N({ target: 'Iterator', proto: true, real: true }, {
	  some: function some(predicate) {
	    anObject$a(this);
	    aCallable$7(predicate);
	    var record = getIteratorDirect$4(this);
	    var counter = 0;
	    return iterate$9(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});

	var $$M = _export;
	var anObject$9 = anObject$E;
	var iterate$8 = iterate$e;
	var getIteratorDirect$3 = getIteratorDirect$a;

	var push$7 = [].push;

	// `Iterator.prototype.toArray` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$M({ target: 'Iterator', proto: true, real: true }, {
	  toArray: function toArray() {
	    var result = [];
	    iterate$8(getIteratorDirect$3(anObject$9(this)), push$7, { that: result, IS_RECORD: true });
	    return result;
	  }
	});

	var uncurryThis$m = functionUncurryThis;
	var hasOwn$7 = hasOwnProperty_1;

	var $SyntaxError = SyntaxError;
	var $parseInt = parseInt;
	var fromCharCode$2 = String.fromCharCode;
	var at$1 = uncurryThis$m(''.charAt);
	var slice$1 = uncurryThis$m(''.slice);
	var exec$4 = uncurryThis$m(/./.exec);

	var codePoints = {
	  '\\"': '"',
	  '\\\\': '\\',
	  '\\/': '/',
	  '\\b': '\b',
	  '\\f': '\f',
	  '\\n': '\n',
	  '\\r': '\r',
	  '\\t': '\t'
	};

	var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
	// eslint-disable-next-line regexp/no-control-character -- safe
	var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

	var parseJsonString = function (source, i) {
	  var unterminated = true;
	  var value = '';
	  while (i < source.length) {
	    var chr = at$1(source, i);
	    if (chr === '\\') {
	      var twoChars = slice$1(source, i, i + 2);
	      if (hasOwn$7(codePoints, twoChars)) {
	        value += codePoints[twoChars];
	        i += 2;
	      } else if (twoChars === '\\u') {
	        i += 2;
	        var fourHexDigits = slice$1(source, i, i + 4);
	        if (!exec$4(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
	        value += fromCharCode$2($parseInt(fourHexDigits, 16));
	        i += 4;
	      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
	    } else if (chr === '"') {
	      unterminated = false;
	      i++;
	      break;
	    } else {
	      if (exec$4(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
	      value += chr;
	      i++;
	    }
	  }
	  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
	  return { value: value, end: i };
	};

	var $$L = _export;
	var DESCRIPTORS$b = descriptors;
	var global$f = global$Z;
	var getBuiltIn$8 = getBuiltIn$l;
	var uncurryThis$l = functionUncurryThis;
	var call$7 = functionCall;
	var isCallable$5 = isCallable$y;
	var isObject$7 = isObject$u;
	var isArray$1 = isArray$8;
	var hasOwn$6 = hasOwnProperty_1;
	var toString$b = toString$v;
	var lengthOfArrayLike$2 = lengthOfArrayLike$n;
	var createProperty$1 = createProperty$8;
	var fails$h = fails$1c;
	var parseJSONString = parseJsonString;
	var NATIVE_SYMBOL = symbolConstructorDetection;

	var JSON$1 = global$f.JSON;
	var Number$1 = global$f.Number;
	var SyntaxError$1 = global$f.SyntaxError;
	var nativeParse = JSON$1 && JSON$1.parse;
	var enumerableOwnProperties = getBuiltIn$8('Object', 'keys');
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var at = uncurryThis$l(''.charAt);
	var slice = uncurryThis$l(''.slice);
	var exec$3 = uncurryThis$l(/./.exec);
	var push$6 = uncurryThis$l([].push);

	var IS_DIGIT = /^\d$/;
	var IS_NON_ZERO_DIGIT = /^[1-9]$/;
	var IS_NUMBER_START = /^(?:-|\d)$/;
	var IS_WHITESPACE = /^[\t\n\r ]$/;

	var PRIMITIVE = 0;
	var OBJECT = 1;

	var $parse = function (source, reviver) {
	  source = toString$b(source);
	  var context = new Context(source, 0);
	  var root = context.parse();
	  var value = root.value;
	  var endIndex = context.skip(IS_WHITESPACE, root.end);
	  if (endIndex < source.length) {
	    throw new SyntaxError$1('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
	  }
	  return isCallable$5(reviver) ? internalize({ '': value }, '', reviver, root) : value;
	};

	var internalize = function (holder, name, reviver, node) {
	  var val = holder[name];
	  var unmodified = node && val === node.value;
	  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
	  var elementRecordsLen, keys, len, i, P;
	  if (isObject$7(val)) {
	    var nodeIsArray = isArray$1(val);
	    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
	    if (nodeIsArray) {
	      elementRecordsLen = nodes.length;
	      len = lengthOfArrayLike$2(val);
	      for (i = 0; i < len; i++) {
	        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
	      }
	    } else {
	      keys = enumerableOwnProperties(val);
	      len = lengthOfArrayLike$2(keys);
	      for (i = 0; i < len; i++) {
	        P = keys[i];
	        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn$6(nodes, P) ? nodes[P] : undefined));
	      }
	    }
	  }
	  return call$7(reviver, holder, name, val, context);
	};

	var internalizeProperty = function (object, key, value) {
	  if (DESCRIPTORS$b) {
	    var descriptor = getOwnPropertyDescriptor$1(object, key);
	    if (descriptor && !descriptor.configurable) return;
	  }
	  if (value === undefined) delete object[key];
	  else createProperty$1(object, key, value);
	};

	var Node = function (value, end, source, nodes) {
	  this.value = value;
	  this.end = end;
	  this.source = source;
	  this.nodes = nodes;
	};

	var Context = function (source, index) {
	  this.source = source;
	  this.index = index;
	};

	// https://www.json.org/json-en.html
	Context.prototype = {
	  fork: function (nextIndex) {
	    return new Context(this.source, nextIndex);
	  },
	  parse: function () {
	    var source = this.source;
	    var i = this.skip(IS_WHITESPACE, this.index);
	    var fork = this.fork(i);
	    var chr = at(source, i);
	    if (exec$3(IS_NUMBER_START, chr)) return fork.number();
	    switch (chr) {
	      case '{':
	        return fork.object();
	      case '[':
	        return fork.array();
	      case '"':
	        return fork.string();
	      case 't':
	        return fork.keyword(true);
	      case 'f':
	        return fork.keyword(false);
	      case 'n':
	        return fork.keyword(null);
	    } throw new SyntaxError$1('Unexpected character: "' + chr + '" at: ' + i);
	  },
	  node: function (type, value, start, end, nodes) {
	    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
	  },
	  object: function () {
	    var source = this.source;
	    var i = this.index + 1;
	    var expectKeypair = false;
	    var object = {};
	    var nodes = {};
	    while (i < source.length) {
	      i = this.until(['"', '}'], i);
	      if (at(source, i) === '}' && !expectKeypair) {
	        i++;
	        break;
	      }
	      // Parsing the key
	      var result = this.fork(i).string();
	      var key = result.value;
	      i = result.end;
	      i = this.until([':'], i) + 1;
	      // Parsing value
	      i = this.skip(IS_WHITESPACE, i);
	      result = this.fork(i).parse();
	      createProperty$1(nodes, key, result);
	      createProperty$1(object, key, result.value);
	      i = this.until([',', '}'], result.end);
	      var chr = at(source, i);
	      if (chr === ',') {
	        expectKeypair = true;
	        i++;
	      } else if (chr === '}') {
	        i++;
	        break;
	      }
	    }
	    return this.node(OBJECT, object, this.index, i, nodes);
	  },
	  array: function () {
	    var source = this.source;
	    var i = this.index + 1;
	    var expectElement = false;
	    var array = [];
	    var nodes = [];
	    while (i < source.length) {
	      i = this.skip(IS_WHITESPACE, i);
	      if (at(source, i) === ']' && !expectElement) {
	        i++;
	        break;
	      }
	      var result = this.fork(i).parse();
	      push$6(nodes, result);
	      push$6(array, result.value);
	      i = this.until([',', ']'], result.end);
	      if (at(source, i) === ',') {
	        expectElement = true;
	        i++;
	      } else if (at(source, i) === ']') {
	        i++;
	        break;
	      }
	    }
	    return this.node(OBJECT, array, this.index, i, nodes);
	  },
	  string: function () {
	    var index = this.index;
	    var parsed = parseJSONString(this.source, this.index + 1);
	    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
	  },
	  number: function () {
	    var source = this.source;
	    var startIndex = this.index;
	    var i = startIndex;
	    if (at(source, i) === '-') i++;
	    if (at(source, i) === '0') i++;
	    else if (exec$3(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, ++i);
	    else throw new SyntaxError$1('Failed to parse number at: ' + i);
	    if (at(source, i) === '.') i = this.skip(IS_DIGIT, ++i);
	    if (at(source, i) === 'e' || at(source, i) === 'E') {
	      i++;
	      if (at(source, i) === '+' || at(source, i) === '-') i++;
	      var exponentStartIndex = i;
	      i = this.skip(IS_DIGIT, i);
	      if (exponentStartIndex === i) throw new SyntaxError$1("Failed to parse number's exponent value at: " + i);
	    }
	    return this.node(PRIMITIVE, Number$1(slice(source, startIndex, i)), startIndex, i);
	  },
	  keyword: function (value) {
	    var keyword = '' + value;
	    var index = this.index;
	    var endIndex = index + keyword.length;
	    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError$1('Failed to parse value at: ' + index);
	    return this.node(PRIMITIVE, value, index, endIndex);
	  },
	  skip: function (regex, i) {
	    var source = this.source;
	    for (; i < source.length; i++) if (!exec$3(regex, at(source, i))) break;
	    return i;
	  },
	  until: function (array, i) {
	    i = this.skip(IS_WHITESPACE, i);
	    var chr = at(this.source, i);
	    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
	    throw new SyntaxError$1('Unexpected character: "' + chr + '" at: ' + i);
	  }
	};

	var NO_SOURCE_SUPPORT = fails$h(function () {
	  var unsafeInt = '9007199254740993';
	  var source;
	  nativeParse(unsafeInt, function (key, value, context) {
	    source = context.source;
	  });
	  return source !== unsafeInt;
	});

	var PROPER_BASE_PARSE = NATIVE_SYMBOL && !fails$h(function () {
	  // Safari 9 bug
	  return 1 / nativeParse('-0 \t') !== -Infinity;
	});

	// `JSON.parse` method
	// https://tc39.es/ecma262/#sec-json.parse
	// https://github.com/tc39/proposal-json-parse-with-source
	$$L({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
	  parse: function parse(text, reviver) {
	    return PROPER_BASE_PARSE && !isCallable$5(reviver) ? nativeParse(text) : $parse(text, reviver);
	  }
	});

	var commonAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var base64Alphabet = commonAlphabet + '+/';
	var base64UrlAlphabet = commonAlphabet + '-_';

	var inverse = function (characters) {
	  // TODO: use `Object.create(null)` in `core-js@4`
	  var result = {};
	  var index = 0;
	  for (; index < 64; index++) result[characters.charAt(index)] = index;
	  return result;
	};

	var base64Map = {
	  i2c: base64Alphabet,
	  c2i: inverse(base64Alphabet),
	  i2cUrl: base64UrlAlphabet,
	  c2iUrl: inverse(base64UrlAlphabet)
	};

	var $$K = _export;
	var global$e = global$Z;
	var getBuiltIn$7 = getBuiltIn$l;
	var uncurryThis$k = functionUncurryThis;
	var call$6 = functionCall;
	var fails$g = fails$1c;
	var toString$a = toString$v;
	var validateArgumentsLength$7 = validateArgumentsLength$9;
	var i2c = base64Map.i2c;

	var $btoa = getBuiltIn$7('btoa');
	var charAt$5 = uncurryThis$k(''.charAt);
	var charCodeAt$1 = uncurryThis$k(''.charCodeAt);

	var BASIC$1 = !!$btoa && !fails$g(function () {
	  return $btoa('hi') !== 'aGk=';
	});

	var NO_ARG_RECEIVING_CHECK$1 = BASIC$1 && !fails$g(function () {
	  $btoa();
	});

	var WRONG_ARG_CONVERSION = BASIC$1 && fails$g(function () {
	  return $btoa(null) !== 'bnVsbA==';
	});

	var WRONG_ARITY$2 = BASIC$1 && $btoa.length !== 1;

	// `btoa` method
	// https://html.spec.whatwg.org/multipage/webappapis.html#dom-btoa
	$$K({ global: true, bind: true, enumerable: true, forced: !BASIC$1 || NO_ARG_RECEIVING_CHECK$1 || WRONG_ARG_CONVERSION || WRONG_ARITY$2 }, {
	  btoa: function btoa(data) {
	    validateArgumentsLength$7(arguments.length, 1);
	    // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
	    if (BASIC$1) return call$6($btoa, global$e, toString$a(data));
	    var string = toString$a(data);
	    var output = '';
	    var position = 0;
	    var map = i2c;
	    var block, charCode;
	    while (charAt$5(string, position) || (map = '=', position % 1)) {
	      charCode = charCodeAt$1(string, position += 3 / 4);
	      if (charCode > 0xFF) {
	        throw new (getBuiltIn$7('DOMException'))('The string contains characters outside of the Latin1 range', 'InvalidCharacterError');
	      }
	      block = block << 8 | charCode;
	      output += charAt$5(map, 63 & block >> 8 - position % 1 * 8);
	    } return output;
	  }
	});

	var domExceptionConstants = {
	  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
	  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
	  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
	  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
	  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
	  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
	  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
	  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
	  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
	  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
	  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
	  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
	  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
	  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
	  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
	  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
	  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
	  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
	  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
	  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
	  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
	  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
	  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
	  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
	  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
	};

	var $$J = _export;
	var tryNodeRequire = tryNodeRequire$2;
	var getBuiltIn$6 = getBuiltIn$l;
	var fails$f = fails$1c;
	var create$3 = objectCreate;
	var createPropertyDescriptor$2 = createPropertyDescriptor$a;
	var defineProperty$2 = objectDefineProperty.f;
	var defineBuiltIn$6 = defineBuiltIn$n;
	var defineBuiltInAccessor$6 = defineBuiltInAccessor$i;
	var hasOwn$5 = hasOwnProperty_1;
	var anInstance$6 = anInstance$b;
	var anObject$8 = anObject$E;
	var errorToString = errorToString$2;
	var normalizeStringArgument$1 = normalizeStringArgument$4;
	var DOMExceptionConstants$1 = domExceptionConstants;
	var clearErrorStack$1 = errorStackClear;
	var InternalStateModule$4 = internalState;
	var DESCRIPTORS$a = descriptors;

	var DOM_EXCEPTION$2 = 'DOMException';
	var DATA_CLONE_ERR = 'DATA_CLONE_ERR';
	var Error$2 = getBuiltIn$6('Error');
	// NodeJS < 17.0 does not expose `DOMException` to global
	var NativeDOMException$1 = getBuiltIn$6(DOM_EXCEPTION$2) || (function () {
	  try {
	    // NodeJS < 15.0 does not expose `MessageChannel` to global
	    var MessageChannel = getBuiltIn$6('MessageChannel') || tryNodeRequire('worker_threads').MessageChannel;
	    // eslint-disable-next-line es/no-weak-map, unicorn/require-post-message-target-origin -- safe
	    new MessageChannel().port1.postMessage(new WeakMap());
	  } catch (error) {
	    if (error.name === DATA_CLONE_ERR && error.code === 25) return error.constructor;
	  }
	})();
	var NativeDOMExceptionPrototype = NativeDOMException$1 && NativeDOMException$1.prototype;
	var ErrorPrototype = Error$2.prototype;
	var setInternalState$4 = InternalStateModule$4.set;
	var getInternalState = InternalStateModule$4.getterFor(DOM_EXCEPTION$2);
	var HAS_STACK = 'stack' in new Error$2(DOM_EXCEPTION$2);

	var codeFor = function (name) {
	  return hasOwn$5(DOMExceptionConstants$1, name) && DOMExceptionConstants$1[name].m ? DOMExceptionConstants$1[name].c : 0;
	};

	var $DOMException$1 = function DOMException() {
	  anInstance$6(this, DOMExceptionPrototype$1);
	  var argumentsLength = arguments.length;
	  var message = normalizeStringArgument$1(argumentsLength < 1 ? undefined : arguments[0]);
	  var name = normalizeStringArgument$1(argumentsLength < 2 ? undefined : arguments[1], 'Error');
	  var code = codeFor(name);
	  setInternalState$4(this, {
	    type: DOM_EXCEPTION$2,
	    name: name,
	    message: message,
	    code: code
	  });
	  if (!DESCRIPTORS$a) {
	    this.name = name;
	    this.message = message;
	    this.code = code;
	  }
	  if (HAS_STACK) {
	    var error = new Error$2(message);
	    error.name = DOM_EXCEPTION$2;
	    defineProperty$2(this, 'stack', createPropertyDescriptor$2(1, clearErrorStack$1(error.stack, 1)));
	  }
	};

	var DOMExceptionPrototype$1 = $DOMException$1.prototype = create$3(ErrorPrototype);

	var createGetterDescriptor = function (get) {
	  return { enumerable: true, configurable: true, get: get };
	};

	var getterFor = function (key) {
	  return createGetterDescriptor(function () {
	    return getInternalState(this)[key];
	  });
	};

	if (DESCRIPTORS$a) {
	  // `DOMException.prototype.code` getter
	  defineBuiltInAccessor$6(DOMExceptionPrototype$1, 'code', getterFor('code'));
	  // `DOMException.prototype.message` getter
	  defineBuiltInAccessor$6(DOMExceptionPrototype$1, 'message', getterFor('message'));
	  // `DOMException.prototype.name` getter
	  defineBuiltInAccessor$6(DOMExceptionPrototype$1, 'name', getterFor('name'));
	}

	defineProperty$2(DOMExceptionPrototype$1, 'constructor', createPropertyDescriptor$2(1, $DOMException$1));

	// FF36- DOMException is a function, but can't be constructed
	var INCORRECT_CONSTRUCTOR = fails$f(function () {
	  return !(new NativeDOMException$1() instanceof Error$2);
	});

	// Safari 10.1 / Chrome 32- / IE8- DOMException.prototype.toString bugs
	var INCORRECT_TO_STRING = INCORRECT_CONSTRUCTOR || fails$f(function () {
	  return ErrorPrototype.toString !== errorToString || String(new NativeDOMException$1(1, 2)) !== '2: 1';
	});

	// Deno 1.6.3- DOMException.prototype.code just missed
	var INCORRECT_CODE = INCORRECT_CONSTRUCTOR || fails$f(function () {
	  return new NativeDOMException$1(1, 'DataCloneError').code !== 25;
	});

	// Deno 1.6.3- DOMException constants just missed
	INCORRECT_CONSTRUCTOR
	  || NativeDOMException$1[DATA_CLONE_ERR] !== 25
	  || NativeDOMExceptionPrototype[DATA_CLONE_ERR] !== 25;

	var FORCED_CONSTRUCTOR$1 = INCORRECT_CONSTRUCTOR;

	// `DOMException` constructor
	// https://webidl.spec.whatwg.org/#idl-DOMException
	$$J({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR$1 }, {
	  DOMException: FORCED_CONSTRUCTOR$1 ? $DOMException$1 : NativeDOMException$1
	});

	var PolyfilledDOMException$1 = getBuiltIn$6(DOM_EXCEPTION$2);
	var PolyfilledDOMExceptionPrototype$1 = PolyfilledDOMException$1.prototype;

	if (INCORRECT_TO_STRING && (NativeDOMException$1 === PolyfilledDOMException$1)) {
	  defineBuiltIn$6(PolyfilledDOMExceptionPrototype$1, 'toString', errorToString);
	}

	if (INCORRECT_CODE && DESCRIPTORS$a && NativeDOMException$1 === PolyfilledDOMException$1) {
	  defineBuiltInAccessor$6(PolyfilledDOMExceptionPrototype$1, 'code', createGetterDescriptor(function () {
	    return codeFor(anObject$8(this).name);
	  }));
	}

	// `DOMException` constants
	for (var key$1 in DOMExceptionConstants$1) if (hasOwn$5(DOMExceptionConstants$1, key$1)) {
	  var constant$1 = DOMExceptionConstants$1[key$1];
	  var constantName$1 = constant$1.s;
	  var descriptor$2 = createPropertyDescriptor$2(6, constant$1.c);
	  if (!hasOwn$5(PolyfilledDOMException$1, constantName$1)) {
	    defineProperty$2(PolyfilledDOMException$1, constantName$1, descriptor$2);
	  }
	  if (!hasOwn$5(PolyfilledDOMExceptionPrototype$1, constantName$1)) {
	    defineProperty$2(PolyfilledDOMExceptionPrototype$1, constantName$1, descriptor$2);
	  }
	}

	var $$I = _export;
	var global$d = global$Z;
	var getBuiltIn$5 = getBuiltIn$l;
	var createPropertyDescriptor$1 = createPropertyDescriptor$a;
	var defineProperty$1 = objectDefineProperty.f;
	var hasOwn$4 = hasOwnProperty_1;
	var anInstance$5 = anInstance$b;
	var inheritIfRequired$1 = inheritIfRequired$7;
	var normalizeStringArgument = normalizeStringArgument$4;
	var DOMExceptionConstants = domExceptionConstants;
	var clearErrorStack = errorStackClear;
	var DESCRIPTORS$9 = descriptors;

	var DOM_EXCEPTION$1 = 'DOMException';
	var Error$1 = getBuiltIn$5('Error');
	var NativeDOMException = getBuiltIn$5(DOM_EXCEPTION$1);

	var $DOMException = function DOMException() {
	  anInstance$5(this, DOMExceptionPrototype);
	  var argumentsLength = arguments.length;
	  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
	  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
	  var that = new NativeDOMException(message, name);
	  var error = new Error$1(message);
	  error.name = DOM_EXCEPTION$1;
	  defineProperty$1(that, 'stack', createPropertyDescriptor$1(1, clearErrorStack(error.stack, 1)));
	  inheritIfRequired$1(that, this, $DOMException);
	  return that;
	};

	var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

	var ERROR_HAS_STACK = 'stack' in new Error$1(DOM_EXCEPTION$1);
	var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var descriptor$1 = NativeDOMException && DESCRIPTORS$9 && Object.getOwnPropertyDescriptor(global$d, DOM_EXCEPTION$1);

	// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
	// https://github.com/Jarred-Sumner/bun/issues/399
	var BUGGY_DESCRIPTOR = !!descriptor$1 && !(descriptor$1.writable && descriptor$1.configurable);

	var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

	// `DOMException` constructor patch for `.stack` where it's required
	// https://webidl.spec.whatwg.org/#es-DOMException-specialness
	$$I({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR }, { // TODO: fix export logic
	  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
	});

	var PolyfilledDOMException = getBuiltIn$5(DOM_EXCEPTION$1);
	var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

	if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
	  {
	    defineProperty$1(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor$1(1, PolyfilledDOMException));
	  }

	  for (var key in DOMExceptionConstants) if (hasOwn$4(DOMExceptionConstants, key)) {
	    var constant = DOMExceptionConstants[key];
	    var constantName = constant.s;
	    if (!hasOwn$4(PolyfilledDOMException, constantName)) {
	      defineProperty$1(PolyfilledDOMException, constantName, createPropertyDescriptor$1(6, constant.c));
	    }
	  }
	}

	var getBuiltIn$4 = getBuiltIn$l;
	var setToStringTag$4 = setToStringTag$e;

	var DOM_EXCEPTION = 'DOMException';

	// `DOMException.prototype[@@toStringTag]` property
	setToStringTag$4(getBuiltIn$4(DOM_EXCEPTION), DOM_EXCEPTION);

	var $$H = _export;
	var global$c = global$Z;
	var defineBuiltInAccessor$5 = defineBuiltInAccessor$i;
	var DESCRIPTORS$8 = descriptors;

	var $TypeError$2 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;
	var INCORRECT_VALUE = global$c.self !== global$c;

	// `self` getter
	// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
	try {
	  if (DESCRIPTORS$8) {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    var descriptor = Object.getOwnPropertyDescriptor(global$c, 'self');
	    // some engines have `self`, but with incorrect descriptor
	    // https://github.com/denoland/deno/issues/15765
	    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
	      defineBuiltInAccessor$5(global$c, 'self', {
	        get: function self() {
	          return global$c;
	        },
	        set: function self(value) {
	          if (this !== global$c) throw new $TypeError$2('Illegal invocation');
	          defineProperty(global$c, 'self', {
	            value: value,
	            writable: true,
	            configurable: true,
	            enumerable: true
	          });
	        },
	        configurable: true,
	        enumerable: true
	      });
	    }
	  } else $$H({ global: true, simple: true, forced: INCORRECT_VALUE }, {
	    self: global$c
	  });
	} catch (error) { /* empty */ }

	var fails$e = fails$1c;
	var wellKnownSymbol$2 = wellKnownSymbol$z;
	var DESCRIPTORS$7 = descriptors;
	var IS_PURE = isPure;

	var ITERATOR$2 = wellKnownSymbol$2('iterator');

	var urlConstructorDetection = !fails$e(function () {
	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var params = url.searchParams;
	  var params2 = new URLSearchParams('a=1&a=2&b=3');
	  var result = '';
	  url.pathname = 'c%20d';
	  params.forEach(function (value, key) {
	    params['delete']('b');
	    result += key + value;
	  });
	  params2['delete']('a', 2);
	  // `undefined` case is a Chromium 117 bug
	  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
	  params2['delete']('b', undefined);
	  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
	    || (!params.size && (IS_PURE || !DESCRIPTORS$7))
	    || !params.sort
	    || url.href !== 'http://a/c%20d?a=1&c=3'
	    || params.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !params[ITERATOR$2]
	    // throws in Edge
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    // not punycoded in Edge
	    || new URL('http://тест').host !== 'xn--e1aybc'
	    // not escaped in Chrome 62-
	    || new URL('http://a#б').hash !== '#%D0%B1'
	    // fails in Chrome 66-
	    || result !== 'a1c3'
	    // throws in Safari
	    || new URL('http://x', undefined).host !== 'x';
	});

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$G = _export;
	var global$b = global$Z;
	var safeGetBuiltIn = safeGetBuiltIn$2;
	var call$5 = functionCall;
	var uncurryThis$j = functionUncurryThis;
	var DESCRIPTORS$6 = descriptors;
	var USE_NATIVE_URL$1 = urlConstructorDetection;
	var defineBuiltIn$5 = defineBuiltIn$n;
	var defineBuiltInAccessor$4 = defineBuiltInAccessor$i;
	var defineBuiltIns$3 = defineBuiltIns$6;
	var setToStringTag$3 = setToStringTag$e;
	var createIteratorConstructor = iteratorCreateConstructor;
	var InternalStateModule$3 = internalState;
	var anInstance$4 = anInstance$b;
	var isCallable$4 = isCallable$y;
	var hasOwn$3 = hasOwnProperty_1;
	var bind$3 = functionBindContext;
	var classof$1 = classof$l;
	var anObject$7 = anObject$E;
	var isObject$6 = isObject$u;
	var $toString$1 = toString$v;
	var create$2 = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$a;
	var getIterator = getIterator$4;
	var getIteratorMethod = getIteratorMethod$5;
	var createIterResultObject$1 = createIterResultObject$6;
	var validateArgumentsLength$6 = validateArgumentsLength$9;
	var wellKnownSymbol$1 = wellKnownSymbol$z;
	var arraySort = arraySort$1;

	var ITERATOR$1 = wellKnownSymbol$1('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$3 = InternalStateModule$3.set;
	var getInternalParamsState = InternalStateModule$3.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule$3.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var nativeFetch = safeGetBuiltIn('fetch');
	var NativeRequest = safeGetBuiltIn('Request');
	var Headers = safeGetBuiltIn('Headers');
	var RequestPrototype = NativeRequest && NativeRequest.prototype;
	var HeadersPrototype = Headers && Headers.prototype;
	var RegExp$2 = global$b.RegExp;
	var TypeError$2 = global$b.TypeError;
	var decodeURIComponent = global$b.decodeURIComponent;
	var encodeURIComponent$1 = global$b.encodeURIComponent;
	var charAt$4 = uncurryThis$j(''.charAt);
	var join$3 = uncurryThis$j([].join);
	var push$5 = uncurryThis$j([].push);
	var replace$3 = uncurryThis$j(''.replace);
	var shift$1 = uncurryThis$j([].shift);
	var splice$1 = uncurryThis$j([].splice);
	var split$2 = uncurryThis$j(''.split);
	var stringSlice$4 = uncurryThis$j(''.slice);

	var plus = /\+/g;
	var sequences = Array(4);

	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$2('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};

	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};

	var deserialize = function (it) {
	  var result = replace$3(it, plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent(result);
	  } catch (error) {
	    while (bytes) {
	      result = replace$3(result, percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};

	var find$1 = /[!'()~]|%20/g;

	var replacements = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replacements[match];
	};

	var serialize = function (it) {
	  return replace$3(encodeURIComponent$1(it), find$1, replacer);
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$3(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    target: getInternalParamsState(params).entries,
	    index: 0,
	    kind: kind
	  });
	}, URL_SEARCH_PARAMS, function next() {
	  var state = getInternalIteratorState(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$1(undefined, true);
	  }
	  var entry = target[index];
	  switch (state.kind) {
	    case 'keys': return createIterResultObject$1(entry.key, false);
	    case 'values': return createIterResultObject$1(entry.value, false);
	  } return createIterResultObject$1([entry.key, entry.value], false);
	}, true);

	var URLSearchParamsState = function (init) {
	  this.entries = [];
	  this.url = null;

	  if (init !== undefined) {
	    if (isObject$6(init)) this.parseObject(init);
	    else this.parseQuery(typeof init == 'string' ? charAt$4(init, 0) === '?' ? stringSlice$4(init, 1) : init : $toString$1(init));
	  }
	};

	URLSearchParamsState.prototype = {
	  type: URL_SEARCH_PARAMS,
	  bindURL: function (url) {
	    this.url = url;
	    this.update();
	  },
	  parseObject: function (object) {
	    var entries = this.entries;
	    var iteratorMethod = getIteratorMethod(object);
	    var iterator, next, step, entryIterator, entryNext, first, second;

	    if (iteratorMethod) {
	      iterator = getIterator(object, iteratorMethod);
	      next = iterator.next;
	      while (!(step = call$5(next, iterator)).done) {
	        entryIterator = getIterator(anObject$7(step.value));
	        entryNext = entryIterator.next;
	        if (
	          (first = call$5(entryNext, entryIterator)).done ||
	          (second = call$5(entryNext, entryIterator)).done ||
	          !call$5(entryNext, entryIterator).done
	        ) throw new TypeError$2('Expected sequence with length 2');
	        push$5(entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
	      }
	    } else for (var key in object) if (hasOwn$3(object, key)) {
	      push$5(entries, { key: key, value: $toString$1(object[key]) });
	    }
	  },
	  parseQuery: function (query) {
	    if (query) {
	      var entries = this.entries;
	      var attributes = split$2(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split$2(attribute, '=');
	          push$5(entries, {
	            key: deserialize(shift$1(entry)),
	            value: deserialize(join$3(entry, '='))
	          });
	        }
	      }
	    }
	  },
	  serialize: function () {
	    var entries = this.entries;
	    var result = [];
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      push$5(result, serialize(entry.key) + '=' + serialize(entry.value));
	    } return join$3(result, '&');
	  },
	  update: function () {
	    this.entries.length = 0;
	    this.parseQuery(this.url.query);
	  },
	  updateURL: function () {
	    if (this.url) this.url.update();
	  }
	};

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance$4(this, URLSearchParamsPrototype$3);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var state = setInternalState$3(this, new URLSearchParamsState(init));
	  if (!DESCRIPTORS$6) this.size = state.entries.length;
	};

	var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;

	defineBuiltIns$3(URLSearchParamsPrototype$3, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength$6(arguments.length, 2);
	    push$5(state.entries, { key: $toString$1(name), value: $toString$1(value) });
	    if (!DESCRIPTORS$6) this.length++;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name /* , value */) {
	    var state = getInternalParamsState(this);
	    var length = validateArgumentsLength$6(arguments.length, 1);
	    var entries = state.entries;
	    var key = $toString$1(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString$1($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index];
	      if (entry.key === key && (value === undefined || entry.value === value)) {
	        splice$1(entries, index, 1);
	        if (value !== undefined) break;
	      } else index++;
	    }
	    if (!DESCRIPTORS$6) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength$6(arguments.length, 1);
	    var key = $toString$1(name);
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength$6(arguments.length, 1);
	    var key = $toString$1(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push$5(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name /* , value */) {
	    var entries = getInternalParamsState(this).entries;
	    var length = validateArgumentsLength$6(arguments.length, 1);
	    var key = $toString$1(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString$1($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index++];
	      if (entry.key === key && (value === undefined || entry.value === value)) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength$6(arguments.length, 1);
	    var entries = state.entries;
	    var found = false;
	    var key = $toString$1(name);
	    var val = $toString$1(value);
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) splice$1(entries, index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) push$5(entries, { key: key, value: val });
	    if (!DESCRIPTORS$6) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    arraySort(state.entries, function (a, b) {
	      return a.key > b.key ? 1 : -1;
	    });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bind$3(callback, arguments.length > 1 ? arguments[1] : undefined);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });

	// `URLSearchParams.prototype[@@iterator]` method
	defineBuiltIn$5(URLSearchParamsPrototype$3, ITERATOR$1, URLSearchParamsPrototype$3.entries, { name: 'entries' });

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	defineBuiltIn$5(URLSearchParamsPrototype$3, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, { enumerable: true });

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS$6) defineBuiltInAccessor$4(URLSearchParamsPrototype$3, 'size', {
	  get: function size() {
	    return getInternalParamsState(this).entries.length;
	  },
	  configurable: true,
	  enumerable: true
	});

	setToStringTag$3(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	$$G({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL$1 && isCallable$4(Headers)) {
	  var headersHas = uncurryThis$j(HeadersPrototype.has);
	  var headersSet = uncurryThis$j(HeadersPrototype.set);

	  var wrapRequestOptions = function (init) {
	    if (isObject$6(init)) {
	      var body = init.body;
	      var headers;
	      if (classof$1(body) === URL_SEARCH_PARAMS) {
	        headers = init.headers ? new Headers(init.headers) : new Headers();
	        if (!headersHas(headers, 'content-type')) {
	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	        return create$2(init, {
	          body: createPropertyDescriptor(0, $toString$1(body)),
	          headers: createPropertyDescriptor(0, headers)
	        });
	      }
	    } return init;
	  };

	  if (isCallable$4(nativeFetch)) {
	    $$G({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
	      fetch: function fetch(input /* , init */) {
	        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }

	  if (isCallable$4(NativeRequest)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance$4(this, RequestPrototype);
	      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };

	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;

	    $$G({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
	      Request: RequestConstructor
	    });
	  }
	}

	var web_urlSearchParams_constructor = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	var defineBuiltIn$4 = defineBuiltIn$n;
	var uncurryThis$i = functionUncurryThis;
	var toString$9 = toString$v;
	var validateArgumentsLength$5 = validateArgumentsLength$9;

	var $URLSearchParams$1 = URLSearchParams;
	var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
	var append = uncurryThis$i(URLSearchParamsPrototype$2.append);
	var $delete = uncurryThis$i(URLSearchParamsPrototype$2['delete']);
	var forEach$2 = uncurryThis$i(URLSearchParamsPrototype$2.forEach);
	var push$4 = uncurryThis$i([].push);
	var params$1 = new $URLSearchParams$1('a=1&a=2&b=3');

	params$1['delete']('a', 1);
	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	params$1['delete']('b', undefined);

	if (params$1 + '' !== 'a=2') {
	  defineBuiltIn$4(URLSearchParamsPrototype$2, 'delete', function (name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $delete(this, name);
	    var entries = [];
	    forEach$2(this, function (v, k) { // also validates `this`
	      push$4(entries, { key: k, value: v });
	    });
	    validateArgumentsLength$5(length, 1);
	    var key = toString$9(name);
	    var value = toString$9($value);
	    var index = 0;
	    var dindex = 0;
	    var found = false;
	    var entriesLength = entries.length;
	    var entry;
	    while (index < entriesLength) {
	      entry = entries[index++];
	      if (found || entry.key === key) {
	        found = true;
	        $delete(this, entry.key);
	      } else dindex++;
	    }
	    while (dindex < entriesLength) {
	      entry = entries[dindex++];
	      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
	    }
	  }, { enumerable: true, unsafe: true });
	}

	var defineBuiltIn$3 = defineBuiltIn$n;
	var uncurryThis$h = functionUncurryThis;
	var toString$8 = toString$v;
	var validateArgumentsLength$4 = validateArgumentsLength$9;

	var $URLSearchParams = URLSearchParams;
	var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
	var getAll = uncurryThis$h(URLSearchParamsPrototype$1.getAll);
	var $has = uncurryThis$h(URLSearchParamsPrototype$1.has);
	var params = new $URLSearchParams('a=1');

	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	if (params.has('a', 2) || !params.has('a', undefined)) {
	  defineBuiltIn$3(URLSearchParamsPrototype$1, 'has', function has(name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $has(this, name);
	    var values = getAll(this, name); // also validates `this`
	    validateArgumentsLength$4(length, 1);
	    var value = toString$8($value);
	    var index = 0;
	    while (index < values.length) {
	      if (values[index++] === value) return true;
	    } return false;
	  }, { enumerable: true, unsafe: true });
	}

	var DESCRIPTORS$5 = descriptors;
	var uncurryThis$g = functionUncurryThis;
	var defineBuiltInAccessor$3 = defineBuiltInAccessor$i;

	var URLSearchParamsPrototype = URLSearchParams.prototype;
	var forEach$1 = uncurryThis$g(URLSearchParamsPrototype.forEach);

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS$5 && !('size' in URLSearchParamsPrototype)) {
	  defineBuiltInAccessor$3(URLSearchParamsPrototype, 'size', {
	    get: function size() {
	      var count = 0;
	      forEach$1(this, function () { count++; });
	      return count;
	    },
	    configurable: true,
	    enumerable: true
	  });
	}

	var defineWellKnownSymbol = wellKnownSymbolDefine;

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');

	var $$F = _export;
	var $find = arrayIteration.find;
	var addToUnscopables$2 = addToUnscopables$5;

	var FIND = 'find';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$F({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$2(FIND);

	var $$E = _export;
	var $findIndex = arrayIteration.findIndex;
	var addToUnscopables$1 = addToUnscopables$5;

	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-findindex -- testing
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-array.prototype.findindex
	$$E({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1(FIND_INDEX);

	var $$D = _export;
	var $reduceRight = arrayReduce.right;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$7;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE = engineIsNode;

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED$8 = CHROME_BUG || !arrayMethodIsStrict$1('reduceRight');

	// `Array.prototype.reduceRight` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduceright
	$$D({ target: 'Array', proto: true, forced: FORCED$8 }, {
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$C = _export;
	var uncurryThis$f = functionUncurryThis;
	var aCallable$6 = aCallable$n;
	var toObject$1 = toObject$l;
	var lengthOfArrayLike$1 = lengthOfArrayLike$n;
	var deletePropertyOrThrow = deletePropertyOrThrow$4;
	var toString$7 = toString$v;
	var fails$d = fails$1c;
	var internalSort = arraySort$1;
	var arrayMethodIsStrict = arrayMethodIsStrict$7;
	var FF = engineFfVersion;
	var IE_OR_EDGE = engineIsIeOrEdge;
	var V8 = engineV8Version;
	var WEBKIT = engineWebkitVersion;

	var test = [];
	var nativeSort = uncurryThis$f(test.sort);
	var push$3 = uncurryThis$f(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$d(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$d(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict('sort');

	var STABLE_SORT = !fails$d(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 70;
	  if (FF && FF > 3) return;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 603;

	  var result = '';
	  var code, chr, value, index;

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);

	    switch (code) {
	      case 66: case 69: case 70: case 72: value = 3; break;
	      case 68: case 71: value = 4; break;
	      default: value = 2;
	    }

	    for (index = 0; index < 47; index++) {
	      test.push({ k: chr + index, v: value });
	    }
	  }

	  test.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test.length; index++) {
	    chr = test[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED$7 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    return toString$7(x) > toString$7(y) ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$C({ target: 'Array', proto: true, forced: FORCED$7 }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable$6(comparefn);

	    var array = toObject$1(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike$1(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push$3(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike$1(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});

	var setSpecies$1 = setSpecies$6;

	// `Array[@@species]` getter
	// https://tc39.es/ecma262/#sec-get-array-@@species
	setSpecies$1('Array');

	var $$B = _export;
	var global$a = global$Z;
	var uncurryThis$e = functionUncurryThis;
	var isForced = isForced_1;
	var defineBuiltIn$2 = defineBuiltIn$n;
	var InternalMetadataModule$1 = internalMetadataExports;
	var iterate$7 = iterate$e;
	var anInstance$3 = anInstance$b;
	var isCallable$3 = isCallable$y;
	var isNullOrUndefined$3 = isNullOrUndefined$d;
	var isObject$5 = isObject$u;
	var fails$c = fails$1c;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
	var setToStringTag$2 = setToStringTag$e;
	var inheritIfRequired = inheritIfRequired$7;

	var collection$4 = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$a[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var uncurriedNativeMethod = uncurryThis$e(NativePrototype[KEY]);
	    defineBuiltIn$2(NativePrototype, KEY,
	      KEY === 'add' ? function add(value) {
	        uncurriedNativeMethod(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY === 'delete' ? function (key) {
	        return IS_WEAK && !isObject$5(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY === 'get' ? function get(key) {
	        return IS_WEAK && !isObject$5(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY === 'has' ? function has(key) {
	        return IS_WEAK && !isObject$5(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  var REPLACE = isForced(
	    CONSTRUCTOR_NAME,
	    !isCallable$3(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$c(function () {
	      new NativeConstructor().entries().next();
	    }))
	  );

	  if (REPLACE) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule$1.enable();
	  } else if (isForced(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$c(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new -- required for testing
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$c(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance$3(dummy, NativePrototype);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (!isNullOrUndefined$3(iterable)) iterate$7(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  $$B({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

	  setToStringTag$2(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var create$1 = objectCreate;
	var defineBuiltInAccessor$2 = defineBuiltInAccessor$i;
	var defineBuiltIns$2 = defineBuiltIns$6;
	var bind$2 = functionBindContext;
	var anInstance$2 = anInstance$b;
	var isNullOrUndefined$2 = isNullOrUndefined$d;
	var iterate$6 = iterate$e;
	var defineIterator = iteratorDefine;
	var createIterResultObject = createIterResultObject$6;
	var setSpecies = setSpecies$6;
	var DESCRIPTORS$4 = descriptors;
	var fastKey = internalMetadataExports.fastKey;
	var InternalStateModule$2 = internalState;

	var setInternalState$2 = InternalStateModule$2.set;
	var internalStateGetterFor$1 = InternalStateModule$2.getterFor;

	var collectionStrong$2 = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance$2(that, Prototype);
	      setInternalState$2(that, {
	        type: CONSTRUCTOR_NAME,
	        index: create$1(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!DESCRIPTORS$4) that.size = 0;
	      if (!isNullOrUndefined$2(iterable)) iterate$6(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (DESCRIPTORS$4) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key === key) return entry;
	      }
	    };

	    defineBuiltIns$2(Prototype, {
	      // `{ Map, Set }.prototype.clear()` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.clear
	      // https://tc39.es/ecma262/#sec-set.prototype.clear
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        state.index = create$1(null);
	        if (DESCRIPTORS$4) state.size = 0;
	        else that.size = 0;
	      },
	      // `{ Map, Set }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.delete
	      // https://tc39.es/ecma262/#sec-set.prototype.delete
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first === entry) state.first = next;
	          if (state.last === entry) state.last = prev;
	          if (DESCRIPTORS$4) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.foreach
	      // https://tc39.es/ecma262/#sec-set.prototype.foreach
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bind$2(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // `{ Map, Set}.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.has
	      // https://tc39.es/ecma262/#sec-set.prototype.has
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    defineBuiltIns$2(Prototype, IS_MAP ? {
	      // `Map.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.get
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // `Map.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.set
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // `Set.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-set.prototype.add
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (DESCRIPTORS$4) defineBuiltInAccessor$2(Prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return Constructor;
	  },
	  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
	    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
	    // https://tc39.es/ecma262/#sec-map.prototype.entries
	    // https://tc39.es/ecma262/#sec-map.prototype.keys
	    // https://tc39.es/ecma262/#sec-map.prototype.values
	    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
	    // https://tc39.es/ecma262/#sec-set.prototype.entries
	    // https://tc39.es/ecma262/#sec-set.prototype.keys
	    // https://tc39.es/ecma262/#sec-set.prototype.values
	    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
	    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$2(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return createIterResultObject(undefined, true);
	      }
	      // return step by kind
	      if (kind === 'keys') return createIterResultObject(entry.key, false);
	      if (kind === 'values') return createIterResultObject(entry.value, false);
	      return createIterResultObject([entry.key, entry.value], false);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // `{ Map, Set }.prototype[@@species]` accessors
	    // https://tc39.es/ecma262/#sec-get-map-@@species
	    // https://tc39.es/ecma262/#sec-get-set-@@species
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	var collection$3 = collection$4;
	var collectionStrong$1 = collectionStrong$2;

	// `Map` constructor
	// https://tc39.es/ecma262/#sec-map-objects
	collection$3('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong$1);

	var $$A = _export;

	var floor$3 = Math.floor;
	var log$1 = Math.log;
	var LOG2E = Math.LOG2E;

	// `Math.clz32` method
	// https://tc39.es/ecma262/#sec-math.clz32
	$$A({ target: 'Math', stat: true }, {
	  clz32: function clz32(x) {
	    var n = x >>> 0;
	    return n ? 31 - floor$3(log$1(n + 0.5) * LOG2E) : 32;
	  }
	});

	var $$z = _export;

	// `Number.isNaN` method
	// https://tc39.es/ecma262/#sec-number.isnan
	$$z({ target: 'Number', stat: true }, {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare -- NaN check
	    return number !== number;
	  }
	});

	var $$y = _export;

	// `Number.MAX_SAFE_INTEGER` constant
	// https://tc39.es/ecma262/#sec-number.max_safe_integer
	$$y({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
	  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
	});

	var $$x = _export;

	// `Number.MIN_SAFE_INTEGER` constant
	// https://tc39.es/ecma262/#sec-number.min_safe_integer
	$$x({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
	  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
	});

	var $$w = _export;
	var iterate$5 = iterate$e;
	var createProperty = createProperty$8;

	// `Object.fromEntries` method
	// https://github.com/tc39/proposal-object-from-entries
	$$w({ target: 'Object', stat: true }, {
	  fromEntries: function fromEntries(iterable) {
	    var obj = {};
	    iterate$5(iterable, function (k, v) {
	      createProperty(obj, k, v);
	    }, { AS_ENTRIES: true });
	    return obj;
	  }
	});

	var $$v = _export;
	var is = sameValue$1;

	// `Object.is` method
	// https://tc39.es/ecma262/#sec-object.is
	$$v({ target: 'Object', stat: true }, {
	  is: is
	});

	var $$u = _export;
	var fails$b = fails$1c;
	var isObject$4 = isObject$u;
	var classof = classofRaw$2;
	var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

	// eslint-disable-next-line es/no-object-isfrozen -- safe
	var $isFrozen = Object.isFrozen;

	var FORCED$6 = ARRAY_BUFFER_NON_EXTENSIBLE || fails$b(function () { $isFrozen(1); });

	// `Object.isFrozen` method
	// https://tc39.es/ecma262/#sec-object.isfrozen
	$$u({ target: 'Object', stat: true, forced: FORCED$6 }, {
	  isFrozen: function isFrozen(it) {
	    if (!isObject$4(it)) return true;
	    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return true;
	    return $isFrozen ? $isFrozen(it) : false;
	  }
	});

	var $$t = _export;
	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	$$t({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var global$9 = global$Z;
	var fails$a = fails$1c;
	var uncurryThis$d = functionUncurryThis;
	var toString$6 = toString$v;
	var trim = stringTrim.trim;
	var whitespaces$1 = whitespaces$5;

	var charAt$3 = uncurryThis$d(''.charAt);
	var $parseFloat$1 = global$9.parseFloat;
	var Symbol$1 = global$9.Symbol;
	var ITERATOR = Symbol$1 && Symbol$1.iterator;
	var FORCED$5 = 1 / $parseFloat$1(whitespaces$1 + '-0') !== -Infinity
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails$a(function () { $parseFloat$1(Object(ITERATOR)); }));

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	var numberParseFloat = FORCED$5 ? function parseFloat(string) {
	  var trimmedString = trim(toString$6(string));
	  var result = $parseFloat$1(trimmedString);
	  return result === 0 && charAt$3(trimmedString, 0) === '-' ? -0 : result;
	} : $parseFloat$1;

	var $$s = _export;
	var $parseFloat = numberParseFloat;

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	$$s({ global: true, forced: parseFloat !== $parseFloat }, {
	  parseFloat: $parseFloat
	});

	var $$r = _export;
	var NativePromiseConstructor = promiseNativeConstructor;
	var fails$9 = fails$1c;
	var getBuiltIn$3 = getBuiltIn$l;
	var isCallable$2 = isCallable$y;
	var speciesConstructor = speciesConstructor$6;
	var promiseResolve = promiseResolve$2;
	var defineBuiltIn$1 = defineBuiltIn$n;

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!NativePromiseConstructor && fails$9(function () {
	  // eslint-disable-next-line unicorn/no-thenable -- required for testing
	  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	$$r({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn$3('Promise'));
	    var isFunction = isCallable$2(onFinally);
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
	if (isCallable$2(NativePromiseConstructor)) {
	  var method = getBuiltIn$3('Promise').prototype['finally'];
	  if (NativePromisePrototype['finally'] !== method) {
	    defineBuiltIn$1(NativePromisePrototype, 'finally', method, { unsafe: true });
	  }
	}

	var uncurryThis$c = functionUncurryThis;
	var aCallable$5 = aCallable$n;
	var isObject$3 = isObject$u;
	var hasOwn$2 = hasOwnProperty_1;
	var arraySlice$2 = arraySlice$a;
	var NATIVE_BIND = functionBindNative;

	var $Function = Function;
	var concat = uncurryThis$c([].concat);
	var join$2 = uncurryThis$c([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn$2(factories, argsLength)) {
	    var list = [];
	    var i = 0;
	    for (; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join$2(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable$5(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice$2(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat(partArgs, arraySlice$2(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject$3(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	var $$q = _export;
	var getBuiltIn$2 = getBuiltIn$l;
	var apply$1 = functionApply$1;
	var bind$1 = functionBind;
	var aConstructor = aConstructor$3;
	var anObject$6 = anObject$E;
	var isObject$2 = isObject$u;
	var create = objectCreate;
	var fails$8 = fails$1c;

	var nativeConstruct = getBuiltIn$2('Reflect', 'construct');
	var ObjectPrototype = Object.prototype;
	var push$2 = [].push;

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails$8(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});

	var ARGS_BUG = !fails$8(function () {
	  nativeConstruct(function () { /* empty */ });
	});

	var FORCED$4 = NEW_TARGET_BUG || ARGS_BUG;

	$$q({ target: 'Reflect', stat: true, forced: FORCED$4, sham: FORCED$4 }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aConstructor(Target);
	    anObject$6(args);
	    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target === newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      apply$1(push$2, $args, args);
	      return new (apply$1(bind$1, Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject$2(proto) ? proto : ObjectPrototype);
	    var result = apply$1(Target, instance, args);
	    return isObject$2(result) ? result : instance;
	  }
	});

	var $$p = _export;
	var DESCRIPTORS$3 = descriptors;
	var anObject$5 = anObject$E;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;

	// `Reflect.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
	$$p({ target: 'Reflect', stat: true, sham: !DESCRIPTORS$3 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return getOwnPropertyDescriptorModule.f(anObject$5(target), propertyKey);
	  }
	});

	var $$o = _export;
	var ownKeys = ownKeys$3;

	// `Reflect.ownKeys` method
	// https://tc39.es/ecma262/#sec-reflect.ownkeys
	$$o({ target: 'Reflect', stat: true }, {
	  ownKeys: ownKeys
	});

	var $$n = _export;
	var global$8 = global$Z;
	var setToStringTag$1 = setToStringTag$e;

	$$n({ global: true }, { Reflect: {} });

	// Reflect[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
	setToStringTag$1(global$8.Reflect, 'Reflect', true);

	var global$7 = global$Z;
	var DESCRIPTORS$2 = descriptors;
	var defineBuiltInAccessor$1 = defineBuiltInAccessor$i;
	var regExpFlags = regexpFlags$1;
	var fails$7 = fails$1c;

	// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
	var RegExp$1 = global$7.RegExp;
	var RegExpPrototype = RegExp$1.prototype;

	var FORCED$3 = DESCRIPTORS$2 && fails$7(function () {
	  var INDICES_SUPPORT = true;
	  try {
	    RegExp$1('.', 'd');
	  } catch (error) {
	    INDICES_SUPPORT = false;
	  }

	  var O = {};
	  // modern V8 bug
	  var calls = '';
	  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

	  var addGetter = function (key, chr) {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty(O, key, { get: function () {
	      calls += chr;
	      return true;
	    } });
	  };

	  var pairs = {
	    dotAll: 's',
	    global: 'g',
	    ignoreCase: 'i',
	    multiline: 'm',
	    sticky: 'y'
	  };

	  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

	  for (var key in pairs) addGetter(key, pairs[key]);

	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  var result = Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call(O);

	  return result !== expected || calls !== expected;
	});

	// `RegExp.prototype.flags` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	if (FORCED$3) defineBuiltInAccessor$1(RegExpPrototype, 'flags', {
	  configurable: true,
	  get: regExpFlags
	});

	var collection$2 = collection$4;
	var collectionStrong = collectionStrong$2;

	// `Set` constructor
	// https://tc39.es/ecma262/#sec-set-objects
	collection$2('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var $$m = _export;
	var uncurryThis$b = functionUncurryThis;
	var notARegExp$1 = notARegexp;
	var requireObjectCoercible$4 = requireObjectCoercible$h;
	var toString$5 = toString$v;
	var correctIsRegExpLogic$1 = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis$b(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$m({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString$5(requireObjectCoercible$4(this)),
	      toString$5(notARegExp$1(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var $$l = _export;
	var uncurryThis$a = functionUncurryThisClause;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var toLength = toLength$c;
	var toString$4 = toString$v;
	var notARegExp = notARegexp;
	var requireObjectCoercible$3 = requireObjectCoercible$h;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringSlice$3 = uncurryThis$a(''.slice);
	var min = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$l({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$4(requireObjectCoercible$3(this));
	    notARegExp(searchString);
	    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = toString$4(searchString);
	    return stringSlice$3(that, index, index + search.length) === search;
	  }
	});

	var $$k = _export;
	var createHTML = createHtml;
	var forcedStringHTMLMethod = stringHtmlForced;

	// `String.prototype.sub` method
	// https://tc39.es/ecma262/#sec-string.prototype.sub
	$$k({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
	  sub: function sub() {
	    return createHTML(this, 'sub', '', '');
	  }
	});

	var uncurryThis$9 = functionUncurryThis;
	var defineBuiltIns$1 = defineBuiltIns$6;
	var getWeakData = internalMetadataExports.getWeakData;
	var anInstance$1 = anInstance$b;
	var anObject$4 = anObject$E;
	var isNullOrUndefined$1 = isNullOrUndefined$d;
	var isObject$1 = isObject$u;
	var iterate$4 = iterate$e;
	var ArrayIterationModule = arrayIteration;
	var hasOwn$1 = hasOwnProperty_1;
	var InternalStateModule$1 = internalState;

	var setInternalState$1 = InternalStateModule$1.set;
	var internalStateGetterFor = InternalStateModule$1.getterFor;
	var find = ArrayIterationModule.find;
	var findIndex = ArrayIterationModule.findIndex;
	var splice = uncurryThis$9([].splice);
	var id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (state) {
	  return state.frozen || (state.frozen = new UncaughtFrozenStore());
	};

	var UncaughtFrozenStore = function () {
	  this.entries = [];
	};

	var findUncaughtFrozen = function (store, key) {
	  return find(store.entries, function (it) {
	    return it[0] === key;
	  });
	};

	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.entries.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = findIndex(this.entries, function (it) {
	      return it[0] === key;
	    });
	    if (~index) splice(this.entries, index, 1);
	    return !!~index;
	  }
	};

	var collectionWeak$2 = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance$1(that, Prototype);
	      setInternalState$1(that, {
	        type: CONSTRUCTOR_NAME,
	        id: id++,
	        frozen: undefined
	      });
	      if (!isNullOrUndefined$1(iterable)) iterate$4(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var data = getWeakData(anObject$4(key), true);
	      if (data === true) uncaughtFrozenStore(state).set(key, value);
	      else data[state.id] = value;
	      return that;
	    };

	    defineBuiltIns$1(Prototype, {
	      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
	      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
	      'delete': function (key) {
	        var state = getInternalState(this);
	        if (!isObject$1(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
	        return data && hasOwn$1(data, state.id) && delete data[state.id];
	      },
	      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
	      // https://tc39.es/ecma262/#sec-weakset.prototype.has
	      has: function has(key) {
	        var state = getInternalState(this);
	        if (!isObject$1(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state).has(key);
	        return data && hasOwn$1(data, state.id);
	      }
	    });

	    defineBuiltIns$1(Prototype, IS_MAP ? {
	      // `WeakMap.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
	      get: function get(key) {
	        var state = getInternalState(this);
	        if (isObject$1(key)) {
	          var data = getWeakData(key);
	          if (data === true) return uncaughtFrozenStore(state).get(key);
	          return data ? data[state.id] : undefined;
	        }
	      },
	      // `WeakMap.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
	      set: function set(key, value) {
	        return define(this, key, value);
	      }
	    } : {
	      // `WeakSet.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-weakset.prototype.add
	      add: function add(value) {
	        return define(this, value, true);
	      }
	    });

	    return Constructor;
	  }
	};

	var FREEZING = freezing;
	var global$6 = global$Z;
	var uncurryThis$8 = functionUncurryThis;
	var defineBuiltIns = defineBuiltIns$6;
	var InternalMetadataModule = internalMetadataExports;
	var collection$1 = collection$4;
	var collectionWeak$1 = collectionWeak$2;
	var isObject = isObject$u;
	var enforceInternalState = internalState.enforce;
	var fails$6 = fails$1c;
	var NATIVE_WEAK_MAP = weakMapBasicDetection;

	var $Object = Object;
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray = Array.isArray;
	// eslint-disable-next-line es/no-object-isextensible -- safe
	var isExtensible = $Object.isExtensible;
	// eslint-disable-next-line es/no-object-isfrozen -- safe
	var isFrozen = $Object.isFrozen;
	// eslint-disable-next-line es/no-object-issealed -- safe
	var isSealed = $Object.isSealed;
	// eslint-disable-next-line es/no-object-freeze -- safe
	var freeze = $Object.freeze;
	// eslint-disable-next-line es/no-object-seal -- safe
	var seal = $Object.seal;

	var IS_IE11 = !global$6.ActiveXObject && 'ActiveXObject' in global$6;
	var InternalWeakMap;

	var wrapper = function (init) {
	  return function WeakMap() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	};

	// `WeakMap` constructor
	// https://tc39.es/ecma262/#sec-weakmap-constructor
	var $WeakMap = collection$1('WeakMap', wrapper, collectionWeak$1);
	var WeakMapPrototype = $WeakMap.prototype;
	var nativeSet = uncurryThis$8(WeakMapPrototype.set);

	// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
	var hasMSEdgeFreezingBug = function () {
	  return FREEZING && fails$6(function () {
	    var frozenArray = freeze([]);
	    nativeSet(new $WeakMap(), frozenArray, 1);
	    return !isFrozen(frozenArray);
	  });
	};

	// IE11 WeakMap frozen keys fix
	// We can't use feature detection because it crash some old IE builds
	// https://github.com/zloirock/core-js/issues/485
	if (NATIVE_WEAK_MAP) if (IS_IE11) {
	  InternalWeakMap = collectionWeak$1.getConstructor(wrapper, 'WeakMap', true);
	  InternalMetadataModule.enable();
	  var nativeDelete = uncurryThis$8(WeakMapPrototype['delete']);
	  var nativeHas = uncurryThis$8(WeakMapPrototype.has);
	  var nativeGet = uncurryThis$8(WeakMapPrototype.get);
	  defineBuiltIns(WeakMapPrototype, {
	    'delete': function (key) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceInternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        return nativeDelete(this, key) || state.frozen['delete'](key);
	      } return nativeDelete(this, key);
	    },
	    has: function has(key) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceInternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        return nativeHas(this, key) || state.frozen.has(key);
	      } return nativeHas(this, key);
	    },
	    get: function get(key) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceInternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
	      } return nativeGet(this, key);
	    },
	    set: function set(key, value) {
	      if (isObject(key) && !isExtensible(key)) {
	        var state = enforceInternalState(this);
	        if (!state.frozen) state.frozen = new InternalWeakMap();
	        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
	      } else nativeSet(this, key, value);
	      return this;
	    }
	  });
	// Chakra Edge frozen keys fix
	} else if (hasMSEdgeFreezingBug()) {
	  defineBuiltIns(WeakMapPrototype, {
	    set: function set(key, value) {
	      var arrayIntegrityLevel;
	      if (isArray(key)) {
	        if (isFrozen(key)) arrayIntegrityLevel = freeze;
	        else if (isSealed(key)) arrayIntegrityLevel = seal;
	      }
	      nativeSet(this, key, value);
	      if (arrayIntegrityLevel) arrayIntegrityLevel(key);
	      return this;
	    }
	  });
	}

	var collection = collection$4;
	var collectionWeak = collectionWeak$2;

	// `WeakSet` constructor
	// https://tc39.es/ecma262/#sec-weakset-constructor
	collection('WeakSet', function (init) {
	  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionWeak);

	var $$j = _export;
	var iterate$3 = iterate$e;
	var aCallable$4 = aCallable$n;
	var anObject$3 = anObject$E;
	var getIteratorDirect$2 = getIteratorDirect$a;

	// `Iterator.prototype.every` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$j({ target: 'Iterator', proto: true, real: true }, {
	  every: function every(predicate) {
	    anObject$3(this);
	    aCallable$4(predicate);
	    var record = getIteratorDirect$2(this);
	    var counter = 0;
	    return !iterate$3(record, function (value, stop) {
	      if (!predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});

	var $$i = _export;
	var iterate$2 = iterate$e;
	var aCallable$3 = aCallable$n;
	var anObject$2 = anObject$E;
	var getIteratorDirect$1 = getIteratorDirect$a;

	// `Iterator.prototype.find` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$i({ target: 'Iterator', proto: true, real: true }, {
	  find: function find(predicate) {
	    anObject$2(this);
	    aCallable$3(predicate);
	    var record = getIteratorDirect$1(this);
	    var counter = 0;
	    return iterate$2(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop(value);
	    }, { IS_RECORD: true, INTERRUPTED: true }).result;
	  }
	});

	var uncurryThis$7 = functionUncurryThis;

	// eslint-disable-next-line es/no-set -- safe
	var SetPrototype$1 = Set.prototype;

	var setHelpers = {
	  // eslint-disable-next-line es/no-set -- safe
	  Set: Set,
	  add: uncurryThis$7(SetPrototype$1.add),
	  has: uncurryThis$7(SetPrototype$1.has),
	  remove: uncurryThis$7(SetPrototype$1['delete']),
	  proto: SetPrototype$1
	};

	var has$5 = setHelpers.has;

	// Perform ? RequireInternalSlot(M, [[SetData]])
	var aSet$7 = function (it) {
	  has$5(it);
	  return it;
	};

	var call$4 = functionCall;

	var iterateSimple$7 = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
	  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
	  var next = record.next;
	  var step, result;
	  while (!(step = call$4(next, iterator)).done) {
	    result = fn(step.value);
	    if (result !== undefined) return result;
	  }
	};

	var uncurryThis$6 = functionUncurryThis;
	var iterateSimple$6 = iterateSimple$7;
	var SetHelpers$5 = setHelpers;

	var Set$3 = SetHelpers$5.Set;
	var SetPrototype = SetHelpers$5.proto;
	var forEach = uncurryThis$6(SetPrototype.forEach);
	var keys = uncurryThis$6(SetPrototype.keys);
	var next = keys(new Set$3()).next;

	var setIterate = function (set, fn, interruptible) {
	  return interruptible ? iterateSimple$6({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
	};

	var SetHelpers$4 = setHelpers;
	var iterate$1 = setIterate;

	var Set$2 = SetHelpers$4.Set;
	var add$3 = SetHelpers$4.add;

	var setClone = function (set) {
	  var result = new Set$2();
	  iterate$1(set, function (it) {
	    add$3(result, it);
	  });
	  return result;
	};

	var uncurryThisAccessor = functionUncurryThisAccessor;
	var SetHelpers$3 = setHelpers;

	var setSize = uncurryThisAccessor(SetHelpers$3.proto, 'size', 'get') || function (set) {
	  return set.size;
	};

	var aCallable$2 = aCallable$n;
	var anObject$1 = anObject$E;
	var call$3 = functionCall;
	var toIntegerOrInfinity$4 = toIntegerOrInfinity$h;
	var getIteratorDirect = getIteratorDirect$a;

	var INVALID_SIZE = 'Invalid size';
	var $RangeError$3 = RangeError;
	var $TypeError$1 = TypeError;
	var max$1 = Math.max;

	var SetRecord = function (set, intSize) {
	  this.set = set;
	  this.size = max$1(intSize, 0);
	  this.has = aCallable$2(set.has);
	  this.keys = aCallable$2(set.keys);
	};

	SetRecord.prototype = {
	  getIterator: function () {
	    return getIteratorDirect(anObject$1(call$3(this.keys, this.set)));
	  },
	  includes: function (it) {
	    return call$3(this.has, this.set, it);
	  }
	};

	// `GetSetRecord` abstract operation
	// https://tc39.es/proposal-set-methods/#sec-getsetrecord
	var getSetRecord$7 = function (obj) {
	  anObject$1(obj);
	  var numSize = +obj.size;
	  // NOTE: If size is undefined, then numSize will be NaN
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (numSize !== numSize) throw new $TypeError$1(INVALID_SIZE);
	  var intSize = toIntegerOrInfinity$4(numSize);
	  if (intSize < 0) throw new $RangeError$3(INVALID_SIZE);
	  return new SetRecord(obj, intSize);
	};

	var aSet$6 = aSet$7;
	var SetHelpers$2 = setHelpers;
	var clone$2 = setClone;
	var size$4 = setSize;
	var getSetRecord$6 = getSetRecord$7;
	var iterateSet$2 = setIterate;
	var iterateSimple$5 = iterateSimple$7;

	var has$4 = SetHelpers$2.has;
	var remove$1 = SetHelpers$2.remove;

	// `Set.prototype.difference` method
	// https://github.com/tc39/proposal-set-methods
	var setDifference = function difference(other) {
	  var O = aSet$6(this);
	  var otherRec = getSetRecord$6(other);
	  var result = clone$2(O);
	  if (size$4(O) <= otherRec.size) iterateSet$2(O, function (e) {
	    if (otherRec.includes(e)) remove$1(result, e);
	  });
	  else iterateSimple$5(otherRec.getIterator(), function (e) {
	    if (has$4(O, e)) remove$1(result, e);
	  });
	  return result;
	};

	var getBuiltIn$1 = getBuiltIn$l;

	var createSetLike = function (size) {
	  return {
	    size: size,
	    has: function () {
	      return false;
	    },
	    keys: function () {
	      return {
	        next: function () {
	          return { done: true };
	        }
	      };
	    }
	  };
	};

	var setMethodAcceptSetLike$7 = function (name) {
	  var Set = getBuiltIn$1('Set');
	  try {
	    new Set()[name](createSetLike(0));
	    try {
	      // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
	      // https://github.com/tc39/proposal-set-methods/pull/88
	      new Set()[name](createSetLike(-1));
	      return false;
	    } catch (error2) {
	      return true;
	    }
	  } catch (error) {
	    return false;
	  }
	};

	var $$h = _export;
	var difference = setDifference;
	var setMethodAcceptSetLike$6 = setMethodAcceptSetLike$7;

	// `Set.prototype.difference` method
	// https://github.com/tc39/proposal-set-methods
	$$h({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$6('difference') }, {
	  difference: difference
	});

	var aSet$5 = aSet$7;
	var SetHelpers$1 = setHelpers;
	var size$3 = setSize;
	var getSetRecord$5 = getSetRecord$7;
	var iterateSet$1 = setIterate;
	var iterateSimple$4 = iterateSimple$7;

	var Set$1 = SetHelpers$1.Set;
	var add$2 = SetHelpers$1.add;
	var has$3 = SetHelpers$1.has;

	// `Set.prototype.intersection` method
	// https://github.com/tc39/proposal-set-methods
	var setIntersection = function intersection(other) {
	  var O = aSet$5(this);
	  var otherRec = getSetRecord$5(other);
	  var result = new Set$1();

	  if (size$3(O) > otherRec.size) {
	    iterateSimple$4(otherRec.getIterator(), function (e) {
	      if (has$3(O, e)) add$2(result, e);
	    });
	  } else {
	    iterateSet$1(O, function (e) {
	      if (otherRec.includes(e)) add$2(result, e);
	    });
	  }

	  return result;
	};

	var $$g = _export;
	var fails$5 = fails$1c;
	var intersection = setIntersection;
	var setMethodAcceptSetLike$5 = setMethodAcceptSetLike$7;

	var INCORRECT = !setMethodAcceptSetLike$5('intersection') || fails$5(function () {
	  // eslint-disable-next-line es/no-array-from, es/no-set -- testing
	  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
	});

	// `Set.prototype.intersection` method
	// https://github.com/tc39/proposal-set-methods
	$$g({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  intersection: intersection
	});

	var aSet$4 = aSet$7;
	var has$2 = setHelpers.has;
	var size$2 = setSize;
	var getSetRecord$4 = getSetRecord$7;
	var iterateSet = setIterate;
	var iterateSimple$3 = iterateSimple$7;
	var iteratorClose$1 = iteratorClose$5;

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
	var setIsDisjointFrom = function isDisjointFrom(other) {
	  var O = aSet$4(this);
	  var otherRec = getSetRecord$4(other);
	  if (size$2(O) <= otherRec.size) return iterateSet(O, function (e) {
	    if (otherRec.includes(e)) return false;
	  }, true) !== false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple$3(iterator, function (e) {
	    if (has$2(O, e)) return iteratorClose$1(iterator, 'normal', false);
	  }) !== false;
	};

	var $$f = _export;
	var isDisjointFrom = setIsDisjointFrom;
	var setMethodAcceptSetLike$4 = setMethodAcceptSetLike$7;

	// `Set.prototype.isDisjointFrom` method
	// https://github.com/tc39/proposal-set-methods
	$$f({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$4('isDisjointFrom') }, {
	  isDisjointFrom: isDisjointFrom
	});

	var aSet$3 = aSet$7;
	var size$1 = setSize;
	var iterate = setIterate;
	var getSetRecord$3 = getSetRecord$7;

	// `Set.prototype.isSubsetOf` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
	var setIsSubsetOf = function isSubsetOf(other) {
	  var O = aSet$3(this);
	  var otherRec = getSetRecord$3(other);
	  if (size$1(O) > otherRec.size) return false;
	  return iterate(O, function (e) {
	    if (!otherRec.includes(e)) return false;
	  }, true) !== false;
	};

	var $$e = _export;
	var isSubsetOf = setIsSubsetOf;
	var setMethodAcceptSetLike$3 = setMethodAcceptSetLike$7;

	// `Set.prototype.isSubsetOf` method
	// https://github.com/tc39/proposal-set-methods
	$$e({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$3('isSubsetOf') }, {
	  isSubsetOf: isSubsetOf
	});

	var aSet$2 = aSet$7;
	var has$1 = setHelpers.has;
	var size = setSize;
	var getSetRecord$2 = getSetRecord$7;
	var iterateSimple$2 = iterateSimple$7;
	var iteratorClose = iteratorClose$5;

	// `Set.prototype.isSupersetOf` method
	// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
	var setIsSupersetOf = function isSupersetOf(other) {
	  var O = aSet$2(this);
	  var otherRec = getSetRecord$2(other);
	  if (size(O) < otherRec.size) return false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple$2(iterator, function (e) {
	    if (!has$1(O, e)) return iteratorClose(iterator, 'normal', false);
	  }) !== false;
	};

	var $$d = _export;
	var isSupersetOf = setIsSupersetOf;
	var setMethodAcceptSetLike$2 = setMethodAcceptSetLike$7;

	// `Set.prototype.isSupersetOf` method
	// https://github.com/tc39/proposal-set-methods
	$$d({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$2('isSupersetOf') }, {
	  isSupersetOf: isSupersetOf
	});

	var aSet$1 = aSet$7;
	var SetHelpers = setHelpers;
	var clone$1 = setClone;
	var getSetRecord$1 = getSetRecord$7;
	var iterateSimple$1 = iterateSimple$7;

	var add$1 = SetHelpers.add;
	var has = SetHelpers.has;
	var remove = SetHelpers.remove;

	// `Set.prototype.symmetricDifference` method
	// https://github.com/tc39/proposal-set-methods
	var setSymmetricDifference = function symmetricDifference(other) {
	  var O = aSet$1(this);
	  var keysIter = getSetRecord$1(other).getIterator();
	  var result = clone$1(O);
	  iterateSimple$1(keysIter, function (e) {
	    if (has(O, e)) remove(result, e);
	    else add$1(result, e);
	  });
	  return result;
	};

	var $$c = _export;
	var symmetricDifference = setSymmetricDifference;
	var setMethodAcceptSetLike$1 = setMethodAcceptSetLike$7;

	// `Set.prototype.symmetricDifference` method
	// https://github.com/tc39/proposal-set-methods
	$$c({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$1('symmetricDifference') }, {
	  symmetricDifference: symmetricDifference
	});

	var aSet = aSet$7;
	var add = setHelpers.add;
	var clone = setClone;
	var getSetRecord = getSetRecord$7;
	var iterateSimple = iterateSimple$7;

	// `Set.prototype.union` method
	// https://github.com/tc39/proposal-set-methods
	var setUnion = function union(other) {
	  var O = aSet(this);
	  var keysIter = getSetRecord(other).getIterator();
	  var result = clone(O);
	  iterateSimple(keysIter, function (it) {
	    add(result, it);
	  });
	  return result;
	};

	var $$b = _export;
	var union = setUnion;
	var setMethodAcceptSetLike = setMethodAcceptSetLike$7;

	// `Set.prototype.union` method
	// https://github.com/tc39/proposal-set-methods
	$$b({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
	  union: union
	});

	var $$a = _export;
	var global$5 = global$Z;
	var clearImmediate = task$1.clear;

	// `clearImmediate` method
	// http://w3c.github.io/setImmediate/#si-clearImmediate
	$$a({ global: true, bind: true, enumerable: true, forced: global$5.clearImmediate !== clearImmediate }, {
	  clearImmediate: clearImmediate
	});

	/* global Bun -- Bun case */
	var engineIsBun = typeof Bun == 'function' && Bun && typeof Bun.version == 'string';

	var global$4 = global$Z;
	var apply = functionApply$1;
	var isCallable$1 = isCallable$y;
	var ENGINE_IS_BUN = engineIsBun;
	var USER_AGENT = engineUserAgent;
	var arraySlice$1 = arraySlice$a;
	var validateArgumentsLength$3 = validateArgumentsLength$9;

	var Function$1 = global$4.Function;
	// dirty IE9- and Bun 0.3.0- checks
	var WRAP = /MSIE .\./.test(USER_AGENT) || ENGINE_IS_BUN && (function () {
	  var version = global$4.Bun.version.split('.');
	  return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
	})();

	// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	// https://github.com/oven-sh/bun/issues/1633
	var schedulersFix$1 = function (scheduler, hasTimeArg) {
	  var firstParamIndex = hasTimeArg ? 2 : 1;
	  return WRAP ? function (handler, timeout /* , ...arguments */) {
	    var boundArgs = validateArgumentsLength$3(arguments.length, 1) > firstParamIndex;
	    var fn = isCallable$1(handler) ? handler : Function$1(handler);
	    var params = boundArgs ? arraySlice$1(arguments, firstParamIndex) : [];
	    var callback = boundArgs ? function () {
	      apply(fn, this, params);
	    } : fn;
	    return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
	  } : scheduler;
	};

	var $$9 = _export;
	var global$3 = global$Z;
	var setTask = task$1.set;
	var schedulersFix = schedulersFix$1;

	// https://github.com/oven-sh/bun/issues/1633
	var setImmediate = global$3.setImmediate ? schedulersFix(setTask, false) : setTask;

	// `setImmediate` method
	// http://w3c.github.io/setImmediate/#si-setImmediate
	$$9({ global: true, bind: true, enumerable: true, forced: global$3.setImmediate !== setImmediate }, {
	  setImmediate: setImmediate
	});

	var $$8 = _export;
	var globalThis$1 = global$Z;
	var microtask = microtask_1;
	var aCallable$1 = aCallable$n;
	var validateArgumentsLength$2 = validateArgumentsLength$9;
	var fails$4 = fails$1c;
	var DESCRIPTORS$1 = descriptors;

	// Bun ~ 1.0.30 bug
	// https://github.com/oven-sh/bun/issues/9249
	var WRONG_ARITY$1 = fails$4(function () {
	  // getOwnPropertyDescriptor for prevent experimental warning in Node 11
	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  return DESCRIPTORS$1 && Object.getOwnPropertyDescriptor(globalThis$1, 'queueMicrotask').value.length !== 1;
	});

	// `queueMicrotask` method
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
	$$8({ global: true, enumerable: true, dontCallGetSet: true, forced: WRONG_ARITY$1 }, {
	  queueMicrotask: function queueMicrotask(fn) {
	    validateArgumentsLength$2(arguments.length, 1);
	    microtask(aCallable$1(fn));
	  }
	});

	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var uncurryThis$5 = functionUncurryThis;

	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'
	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;

	var $RangeError$2 = RangeError;
	var exec$2 = uncurryThis$5(regexSeparators.exec);
	var floor$2 = Math.floor;
	var fromCharCode$1 = String.fromCharCode;
	var charCodeAt = uncurryThis$5(''.charCodeAt);
	var join$1 = uncurryThis$5([].join);
	var push$1 = uncurryThis$5([].push);
	var replace$2 = uncurryThis$5(''.replace);
	var split$1 = uncurryThis$5(''.split);
	var toLowerCase$1 = uncurryThis$5(''.toLowerCase);

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 */
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = charCodeAt(string, counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = charCodeAt(string, counter++);
	      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
	        push$1(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        push$1(output, value);
	        counter--;
	      }
	    } else {
	      push$1(output, value);
	    }
	  }
	  return output;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 */
	var digitToBasic = function (digit) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 */
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$2(delta / damp) : delta >> 1;
	  delta += floor$2(delta / numPoints);
	  while (delta > baseMinusTMin * tMax >> 1) {
	    delta = floor$2(delta / baseMinusTMin);
	    k += base;
	  }
	  return floor$2(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
	var encode = function (input) {
	  var output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  var inputLength = input.length;

	  // Initialize the state.
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;

	  // Handle the basic code points.
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      push$1(output, fromCharCode$1(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    push$1(output, delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next larger one:
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$2((maxInt - delta) / handledCPCountPlusOne)) {
	      throw new $RangeError$2(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw new $RangeError$2(OVERFLOW_ERROR);
	      }
	      if (currentValue === n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        var k = base;
	        while (true) {
	          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          push$1(output, fromCharCode$1(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$2(qMinusT / baseMinusT);
	          k += base;
	        }

	        push$1(output, fromCharCode$1(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	        delta = 0;
	        handledCPCount++;
	      }
	    }

	    delta++;
	    n++;
	  }
	  return join$1(output, '');
	};

	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = split$1(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    push$1(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
	  }
	  return join$1(encoded, '.');
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$7 = _export;
	var DESCRIPTORS = descriptors;
	var USE_NATIVE_URL = urlConstructorDetection;
	var global$2 = global$Z;
	var bind = functionBindContext;
	var uncurryThis$4 = functionUncurryThis;
	var defineBuiltIn = defineBuiltIn$n;
	var defineBuiltInAccessor = defineBuiltInAccessor$i;
	var anInstance = anInstance$b;
	var hasOwn = hasOwnProperty_1;
	var assign = objectAssign;
	var arrayFrom = arrayFrom$1;
	var arraySlice = arraySlice$a;
	var codeAt = stringMultibyte.codeAt;
	var toASCII = stringPunycodeToAscii;
	var $toString = toString$v;
	var setToStringTag = setToStringTag$e;
	var validateArgumentsLength$1 = validateArgumentsLength$9;
	var URLSearchParamsModule = web_urlSearchParams_constructor;
	var InternalStateModule = internalState;

	var setInternalState = InternalStateModule.set;
	var getInternalURLState = InternalStateModule.getterFor('URL');
	var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
	var getInternalSearchParamsState = URLSearchParamsModule.getState;

	var NativeURL = global$2.URL;
	var TypeError$1 = global$2.TypeError;
	var parseInt$1 = global$2.parseInt;
	var floor$1 = Math.floor;
	var pow$1 = Math.pow;
	var charAt$2 = uncurryThis$4(''.charAt);
	var exec$1 = uncurryThis$4(/./.exec);
	var join = uncurryThis$4([].join);
	var numberToString = uncurryThis$4(1.0.toString);
	var pop = uncurryThis$4([].pop);
	var push = uncurryThis$4([].push);
	var replace$1 = uncurryThis$4(''.replace);
	var shift = uncurryThis$4([].shift);
	var split = uncurryThis$4(''.split);
	var stringSlice$2 = uncurryThis$4(''.slice);
	var toLowerCase = uncurryThis$4(''.toLowerCase);
	var unshift = uncurryThis$4([].unshift);

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[a-z]/i;
	// eslint-disable-next-line regexp/no-obscure-range -- safe
	var ALPHANUMERIC = /[\d+-.a-z]/i;
	var DIGIT = /\d/;
	var HEX_START = /^0x/i;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\da-f]+$/i;
	/* eslint-disable regexp/no-control-character -- safe */
	var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
	var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
	var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
	var TAB_AND_NEW_LINE = /[\t\n\r]/g;
	/* eslint-enable regexp/no-control-character -- safe */
	var EOF;

	// https://url.spec.whatwg.org/#ipv4-number-parser
	var parseIPv4 = function (input) {
	  var parts = split(input, '.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] === '') {
	    parts.length--;
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part === '') return input;
	    radix = 10;
	    if (part.length > 1 && charAt$2(part, 0) === '0') {
	      radix = exec$1(HEX_START, part) ? 16 : 8;
	      part = stringSlice$2(part, radix === 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!exec$1(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
	      number = parseInt$1(part, radix);
	    }
	    push(numbers, number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index === partsLength - 1) {
	      if (number >= pow$1(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = pop(numbers);
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow$1(256, 3 - index);
	  }
	  return ipv4;
	};

	// https://url.spec.whatwg.org/#concept-ipv6-parser
	// eslint-disable-next-line max-statements -- TODO
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var chr = function () {
	    return charAt$2(input, pointer);
	  };

	  if (chr() === ':') {
	    if (charAt$2(input, 1) !== ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (chr()) {
	    if (pieceIndex === 8) return;
	    if (chr() === ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && exec$1(HEX, chr())) {
	      value = value * 16 + parseInt$1(chr(), 16);
	      pointer++;
	      length++;
	    }
	    if (chr() === '.') {
	      if (length === 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (chr()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (chr() === '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!exec$1(DIGIT, chr())) return;
	        while (exec$1(DIGIT, chr())) {
	          number = parseInt$1(chr(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece === 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
	      }
	      if (numbersSeen !== 4) return;
	      break;
	    } else if (chr() === ':') {
	      pointer++;
	      if (!chr()) return;
	    } else if (chr()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex !== 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex !== 8) return;
	  return address;
	};

	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  if (currLength > maxLength) {
	    maxIndex = currStart;
	    maxLength = currLength;
	  }
	  return maxIndex;
	};

	// https://url.spec.whatwg.org/#host-serializing
	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      unshift(result, host % 256);
	      host = floor$1(host / 256);
	    } return join(result, '.');
	  // ipv6
	  } else if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += numberToString(host[index], 16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};

	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (chr, set) {
	  var code = codeAt(chr, 0);
	  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
	};

	// https://url.spec.whatwg.org/#special-scheme
	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	// https://url.spec.whatwg.org/#windows-drive-letter
	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length === 2 && exec$1(ALPHA, charAt$2(string, 0))
	    && ((second = charAt$2(string, 1)) === ':' || (!normalized && second === '|'));
	};

	// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(stringSlice$2(string, 0, 2)) && (
	    string.length === 2 ||
	    ((third = charAt$2(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	// https://url.spec.whatwg.org/#single-dot-path-segment
	var isSingleDot = function (segment) {
	  return segment === '.' || toLowerCase(segment) === '%2e';
	};

	// https://url.spec.whatwg.org/#double-dot-path-segment
	var isDoubleDot = function (segment) {
	  segment = toLowerCase(segment);
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};

	// States:
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};

	var URLState = function (url, isBase, base) {
	  var urlString = $toString(url);
	  var baseState, failure, searchParams;
	  if (isBase) {
	    failure = this.parse(urlString);
	    if (failure) throw new TypeError$1(failure);
	    this.searchParams = null;
	  } else {
	    if (base !== undefined) baseState = new URLState(base, true);
	    failure = this.parse(urlString, null, baseState);
	    if (failure) throw new TypeError$1(failure);
	    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
	    searchParams.bindURL(this);
	    this.searchParams = searchParams;
	  }
	};

	URLState.prototype = {
	  type: 'URL',
	  // https://url.spec.whatwg.org/#url-parsing
	  // eslint-disable-next-line max-statements -- TODO
	  parse: function (input, stateOverride, base) {
	    var url = this;
	    var state = stateOverride || SCHEME_START;
	    var pointer = 0;
	    var buffer = '';
	    var seenAt = false;
	    var seenBracket = false;
	    var seenPasswordToken = false;
	    var codePoints, chr, bufferCodePoints, failure;

	    input = $toString(input);

	    if (!stateOverride) {
	      url.scheme = '';
	      url.username = '';
	      url.password = '';
	      url.host = null;
	      url.port = null;
	      url.path = [];
	      url.query = null;
	      url.fragment = null;
	      url.cannotBeABaseURL = false;
	      input = replace$1(input, LEADING_C0_CONTROL_OR_SPACE, '');
	      input = replace$1(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
	    }

	    input = replace$1(input, TAB_AND_NEW_LINE, '');

	    codePoints = arrayFrom(input);

	    while (pointer <= codePoints.length) {
	      chr = codePoints[pointer];
	      switch (state) {
	        case SCHEME_START:
	          if (chr && exec$1(ALPHA, chr)) {
	            buffer += toLowerCase(chr);
	            state = SCHEME;
	          } else if (!stateOverride) {
	            state = NO_SCHEME;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case SCHEME:
	          if (chr && (exec$1(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
	            buffer += toLowerCase(chr);
	          } else if (chr === ':') {
	            if (stateOverride && (
	              (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
	              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
	              (url.scheme === 'file' && !url.host)
	            )) return;
	            url.scheme = buffer;
	            if (stateOverride) {
	              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
	              return;
	            }
	            buffer = '';
	            if (url.scheme === 'file') {
	              state = FILE;
	            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
	              state = SPECIAL_RELATIVE_OR_AUTHORITY;
	            } else if (url.isSpecial()) {
	              state = SPECIAL_AUTHORITY_SLASHES;
	            } else if (codePoints[pointer + 1] === '/') {
	              state = PATH_OR_AUTHORITY;
	              pointer++;
	            } else {
	              url.cannotBeABaseURL = true;
	              push(url.path, '');
	              state = CANNOT_BE_A_BASE_URL_PATH;
	            }
	          } else if (!stateOverride) {
	            buffer = '';
	            state = NO_SCHEME;
	            pointer = 0;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case NO_SCHEME:
	          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
	          if (base.cannotBeABaseURL && chr === '#') {
	            url.scheme = base.scheme;
	            url.path = arraySlice(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            url.cannotBeABaseURL = true;
	            state = FRAGMENT;
	            break;
	          }
	          state = base.scheme === 'file' ? FILE : RELATIVE;
	          continue;

	        case SPECIAL_RELATIVE_OR_AUTHORITY:
	          if (chr === '/' && codePoints[pointer + 1] === '/') {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	            pointer++;
	          } else {
	            state = RELATIVE;
	            continue;
	          } break;

	        case PATH_OR_AUTHORITY:
	          if (chr === '/') {
	            state = AUTHORITY;
	            break;
	          } else {
	            state = PATH;
	            continue;
	          }

	        case RELATIVE:
	          url.scheme = base.scheme;
	          if (chr === EOF) {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice(base.path);
	            url.query = base.query;
	          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
	            state = RELATIVE_SLASH;
	          } else if (chr === '?') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice(base.path);
	            url.query = '';
	            state = QUERY;
	          } else if (chr === '#') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice(base.path);
	            url.path.length--;
	            state = PATH;
	            continue;
	          } break;

	        case RELATIVE_SLASH:
	          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          } else if (chr === '/') {
	            state = AUTHORITY;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            state = PATH;
	            continue;
	          } break;

	        case SPECIAL_AUTHORITY_SLASHES:
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          if (chr !== '/' || charAt$2(buffer, pointer + 1) !== '/') continue;
	          pointer++;
	          break;

	        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	          if (chr !== '/' && chr !== '\\') {
	            state = AUTHORITY;
	            continue;
	          } break;

	        case AUTHORITY:
	          if (chr === '@') {
	            if (seenAt) buffer = '%40' + buffer;
	            seenAt = true;
	            bufferCodePoints = arrayFrom(buffer);
	            for (var i = 0; i < bufferCodePoints.length; i++) {
	              var codePoint = bufferCodePoints[i];
	              if (codePoint === ':' && !seenPasswordToken) {
	                seenPasswordToken = true;
	                continue;
	              }
	              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	              if (seenPasswordToken) url.password += encodedCodePoints;
	              else url.username += encodedCodePoints;
	            }
	            buffer = '';
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial())
	          ) {
	            if (seenAt && buffer === '') return INVALID_AUTHORITY;
	            pointer -= arrayFrom(buffer).length + 1;
	            buffer = '';
	            state = HOST;
	          } else buffer += chr;
	          break;

	        case HOST:
	        case HOSTNAME:
	          if (stateOverride && url.scheme === 'file') {
	            state = FILE_HOST;
	            continue;
	          } else if (chr === ':' && !seenBracket) {
	            if (buffer === '') return INVALID_HOST;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PORT;
	            if (stateOverride === HOSTNAME) return;
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial())
	          ) {
	            if (url.isSpecial() && buffer === '') return INVALID_HOST;
	            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PATH_START;
	            if (stateOverride) return;
	            continue;
	          } else {
	            if (chr === '[') seenBracket = true;
	            else if (chr === ']') seenBracket = false;
	            buffer += chr;
	          } break;

	        case PORT:
	          if (exec$1(DIGIT, chr)) {
	            buffer += chr;
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial()) ||
	            stateOverride
	          ) {
	            if (buffer !== '') {
	              var port = parseInt$1(buffer, 10);
	              if (port > 0xFFFF) return INVALID_PORT;
	              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
	              buffer = '';
	            }
	            if (stateOverride) return;
	            state = PATH_START;
	            continue;
	          } else return INVALID_PORT;
	          break;

	        case FILE:
	          url.scheme = 'file';
	          if (chr === '/' || chr === '\\') state = FILE_SLASH;
	          else if (base && base.scheme === 'file') {
	            switch (chr) {
	              case EOF:
	                url.host = base.host;
	                url.path = arraySlice(base.path);
	                url.query = base.query;
	                break;
	              case '?':
	                url.host = base.host;
	                url.path = arraySlice(base.path);
	                url.query = '';
	                state = QUERY;
	                break;
	              case '#':
	                url.host = base.host;
	                url.path = arraySlice(base.path);
	                url.query = base.query;
	                url.fragment = '';
	                state = FRAGMENT;
	                break;
	              default:
	                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
	                  url.host = base.host;
	                  url.path = arraySlice(base.path);
	                  url.shortenPath();
	                }
	                state = PATH;
	                continue;
	            }
	          } else {
	            state = PATH;
	            continue;
	          } break;

	        case FILE_SLASH:
	          if (chr === '/' || chr === '\\') {
	            state = FILE_HOST;
	            break;
	          }
	          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
	            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
	            else url.host = base.host;
	          }
	          state = PATH;
	          continue;

	        case FILE_HOST:
	          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
	            if (!stateOverride && isWindowsDriveLetter(buffer)) {
	              state = PATH;
	            } else if (buffer === '') {
	              url.host = '';
	              if (stateOverride) return;
	              state = PATH_START;
	            } else {
	              failure = url.parseHost(buffer);
	              if (failure) return failure;
	              if (url.host === 'localhost') url.host = '';
	              if (stateOverride) return;
	              buffer = '';
	              state = PATH_START;
	            } continue;
	          } else buffer += chr;
	          break;

	        case PATH_START:
	          if (url.isSpecial()) {
	            state = PATH;
	            if (chr !== '/' && chr !== '\\') continue;
	          } else if (!stateOverride && chr === '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (!stateOverride && chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            state = PATH;
	            if (chr !== '/') continue;
	          } break;

	        case PATH:
	          if (
	            chr === EOF || chr === '/' ||
	            (chr === '\\' && url.isSpecial()) ||
	            (!stateOverride && (chr === '?' || chr === '#'))
	          ) {
	            if (isDoubleDot(buffer)) {
	              url.shortenPath();
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push(url.path, '');
	              }
	            } else if (isSingleDot(buffer)) {
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push(url.path, '');
	              }
	            } else {
	              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	                if (url.host) url.host = '';
	                buffer = charAt$2(buffer, 0) + ':'; // normalize windows drive letter
	              }
	              push(url.path, buffer);
	            }
	            buffer = '';
	            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
	              while (url.path.length > 1 && url.path[0] === '') {
	                shift(url.path);
	              }
	            }
	            if (chr === '?') {
	              url.query = '';
	              state = QUERY;
	            } else if (chr === '#') {
	              url.fragment = '';
	              state = FRAGMENT;
	            }
	          } else {
	            buffer += percentEncode(chr, pathPercentEncodeSet);
	          } break;

	        case CANNOT_BE_A_BASE_URL_PATH:
	          if (chr === '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case QUERY:
	          if (!stateOverride && chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            if (chr === "'" && url.isSpecial()) url.query += '%27';
	            else if (chr === '#') url.query += '%23';
	            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case FRAGMENT:
	          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
	          break;
	      }

	      pointer++;
	    }
	  },
	  // https://url.spec.whatwg.org/#host-parsing
	  parseHost: function (input) {
	    var result, codePoints, index;
	    if (charAt$2(input, 0) === '[') {
	      if (charAt$2(input, input.length - 1) !== ']') return INVALID_HOST;
	      result = parseIPv6(stringSlice$2(input, 1, -1));
	      if (!result) return INVALID_HOST;
	      this.host = result;
	    // opaque host
	    } else if (!this.isSpecial()) {
	      if (exec$1(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
	      result = '';
	      codePoints = arrayFrom(input);
	      for (index = 0; index < codePoints.length; index++) {
	        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	      }
	      this.host = result;
	    } else {
	      input = toASCII(input);
	      if (exec$1(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
	      result = parseIPv4(input);
	      if (result === null) return INVALID_HOST;
	      this.host = result;
	    }
	  },
	  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
	  cannotHaveUsernamePasswordPort: function () {
	    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
	  },
	  // https://url.spec.whatwg.org/#include-credentials
	  includesCredentials: function () {
	    return this.username !== '' || this.password !== '';
	  },
	  // https://url.spec.whatwg.org/#is-special
	  isSpecial: function () {
	    return hasOwn(specialSchemes, this.scheme);
	  },
	  // https://url.spec.whatwg.org/#shorten-a-urls-path
	  shortenPath: function () {
	    var path = this.path;
	    var pathSize = path.length;
	    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
	      path.length--;
	    }
	  },
	  // https://url.spec.whatwg.org/#concept-url-serializer
	  serialize: function () {
	    var url = this;
	    var scheme = url.scheme;
	    var username = url.username;
	    var password = url.password;
	    var host = url.host;
	    var port = url.port;
	    var path = url.path;
	    var query = url.query;
	    var fragment = url.fragment;
	    var output = scheme + ':';
	    if (host !== null) {
	      output += '//';
	      if (url.includesCredentials()) {
	        output += username + (password ? ':' + password : '') + '@';
	      }
	      output += serializeHost(host);
	      if (port !== null) output += ':' + port;
	    } else if (scheme === 'file') output += '//';
	    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
	    if (query !== null) output += '?' + query;
	    if (fragment !== null) output += '#' + fragment;
	    return output;
	  },
	  // https://url.spec.whatwg.org/#dom-url-href
	  setHref: function (href) {
	    var failure = this.parse(href);
	    if (failure) throw new TypeError$1(failure);
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-origin
	  getOrigin: function () {
	    var scheme = this.scheme;
	    var port = this.port;
	    if (scheme === 'blob') try {
	      return new URLConstructor(scheme.path[0]).origin;
	    } catch (error) {
	      return 'null';
	    }
	    if (scheme === 'file' || !this.isSpecial()) return 'null';
	    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
	  },
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  getProtocol: function () {
	    return this.scheme + ':';
	  },
	  setProtocol: function (protocol) {
	    this.parse($toString(protocol) + ':', SCHEME_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-username
	  getUsername: function () {
	    return this.username;
	  },
	  setUsername: function (username) {
	    var codePoints = arrayFrom($toString(username));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.username = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-password
	  getPassword: function () {
	    return this.password;
	  },
	  setPassword: function (password) {
	    var codePoints = arrayFrom($toString(password));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.password = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-host
	  getHost: function () {
	    var host = this.host;
	    var port = this.port;
	    return host === null ? ''
	      : port === null ? serializeHost(host)
	      : serializeHost(host) + ':' + port;
	  },
	  setHost: function (host) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(host, HOST);
	  },
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  getHostname: function () {
	    var host = this.host;
	    return host === null ? '' : serializeHost(host);
	  },
	  setHostname: function (hostname) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(hostname, HOSTNAME);
	  },
	  // https://url.spec.whatwg.org/#dom-url-port
	  getPort: function () {
	    var port = this.port;
	    return port === null ? '' : $toString(port);
	  },
	  setPort: function (port) {
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    port = $toString(port);
	    if (port === '') this.port = null;
	    else this.parse(port, PORT);
	  },
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  getPathname: function () {
	    var path = this.path;
	    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
	  },
	  setPathname: function (pathname) {
	    if (this.cannotBeABaseURL) return;
	    this.path = [];
	    this.parse(pathname, PATH_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-search
	  getSearch: function () {
	    var query = this.query;
	    return query ? '?' + query : '';
	  },
	  setSearch: function (search) {
	    search = $toString(search);
	    if (search === '') {
	      this.query = null;
	    } else {
	      if (charAt$2(search, 0) === '?') search = stringSlice$2(search, 1);
	      this.query = '';
	      this.parse(search, QUERY);
	    }
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  getSearchParams: function () {
	    return this.searchParams.facade;
	  },
	  // https://url.spec.whatwg.org/#dom-url-hash
	  getHash: function () {
	    var fragment = this.fragment;
	    return fragment ? '#' + fragment : '';
	  },
	  setHash: function (hash) {
	    hash = $toString(hash);
	    if (hash === '') {
	      this.fragment = null;
	      return;
	    }
	    if (charAt$2(hash, 0) === '#') hash = stringSlice$2(hash, 1);
	    this.fragment = '';
	    this.parse(hash, FRAGMENT);
	  },
	  update: function () {
	    this.query = this.searchParams.serialize() || null;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance(this, URLPrototype);
	  var base = validateArgumentsLength$1(arguments.length, 1) > 1 ? arguments[1] : undefined;
	  var state = setInternalState(that, new URLState(url, false, base));
	  if (!DESCRIPTORS) {
	    that.href = state.serialize();
	    that.origin = state.getOrigin();
	    that.protocol = state.getProtocol();
	    that.username = state.getUsername();
	    that.password = state.getPassword();
	    that.host = state.getHost();
	    that.hostname = state.getHostname();
	    that.port = state.getPort();
	    that.pathname = state.getPathname();
	    that.search = state.getSearch();
	    that.searchParams = state.getSearchParams();
	    that.hash = state.getHash();
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var accessorDescriptor = function (getter, setter) {
	  return {
	    get: function () {
	      return getInternalURLState(this)[getter]();
	    },
	    set: setter && function (value) {
	      return getInternalURLState(this)[setter](value);
	    },
	    configurable: true,
	    enumerable: true
	  };
	};

	if (DESCRIPTORS) {
	  // `URL.prototype.href` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-href
	  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
	  // `URL.prototype.origin` getter
	  // https://url.spec.whatwg.org/#dom-url-origin
	  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
	  // `URL.prototype.protocol` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
	  // `URL.prototype.username` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-username
	  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
	  // `URL.prototype.password` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-password
	  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
	  // `URL.prototype.host` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-host
	  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
	  // `URL.prototype.hostname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
	  // `URL.prototype.port` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-port
	  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
	  // `URL.prototype.pathname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
	  // `URL.prototype.search` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-search
	  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
	  // `URL.prototype.searchParams` getter
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
	  // `URL.prototype.hash` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hash
	  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	defineBuiltIn(URLPrototype, 'toString', function toString() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
	}

	setToStringTag(URLConstructor, 'URL');

	$$7({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
	  URL: URLConstructor
	});

	var $$6 = _export;
	var call$2 = functionCall;

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	$$6({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return call$2(URL.prototype.toString, this);
	  }
	});

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$h;
	var toString$3 = toString$v;
	var requireObjectCoercible$2 = requireObjectCoercible$h;

	var $RangeError$1 = RangeError;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	var stringRepeat = function repeat(count) {
	  var str = toString$3(requireObjectCoercible$2(this));
	  var result = '';
	  var n = toIntegerOrInfinity$3(count);
	  if (n < 0 || n === Infinity) throw new $RangeError$1('Wrong number of repetitions');
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
	  return result;
	};

	var $$5 = _export;
	var uncurryThis$3 = functionUncurryThis;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$h;
	var thisNumberValue = thisNumberValue$2;
	var $repeat = stringRepeat;
	var fails$3 = fails$1c;

	var $RangeError = RangeError;
	var $String = String;
	var floor = Math.floor;
	var repeat = uncurryThis$3($repeat);
	var stringSlice$1 = uncurryThis$3(''.slice);
	var nativeToFixed = uncurryThis$3(1.0.toFixed);

	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};

	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	var multiply = function (data, n, c) {
	  var index = -1;
	  var c2 = c;
	  while (++index < 6) {
	    c2 += n * data[index];
	    data[index] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};

	var divide = function (data, n) {
	  var index = 6;
	  var c = 0;
	  while (--index >= 0) {
	    c += data[index];
	    data[index] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};

	var dataToString = function (data) {
	  var index = 6;
	  var s = '';
	  while (--index >= 0) {
	    if (s !== '' || index === 0 || data[index] !== 0) {
	      var t = $String(data[index]);
	      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
	    }
	  } return s;
	};

	var FORCED$2 = fails$3(function () {
	  return nativeToFixed(0.00008, 3) !== '0.000' ||
	    nativeToFixed(0.9, 0) !== '1' ||
	    nativeToFixed(1.255, 2) !== '1.25' ||
	    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
	}) || !fails$3(function () {
	  // V8 ~ Android 4.3-
	  nativeToFixed({});
	});

	// `Number.prototype.toFixed` method
	// https://tc39.es/ecma262/#sec-number.prototype.tofixed
	$$5({ target: 'Number', proto: true, forced: FORCED$2 }, {
	  toFixed: function toFixed(fractionDigits) {
	    var number = thisNumberValue(this);
	    var fractDigits = toIntegerOrInfinity$2(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;

	    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
	    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError('Incorrect fraction digits');
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (number !== number) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return $String(number);
	    if (number < 0) {
	      sign = '-';
	      number = -number;
	    }
	    if (number > 1e-21) {
	      e = log(number * pow(2, 69, 1)) - 69;
	      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(data, 0, z);
	        j = fractDigits;
	        while (j >= 7) {
	          multiply(data, 1e7, 0);
	          j -= 7;
	        }
	        multiply(data, pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(data, 1 << 23);
	          j -= 23;
	        }
	        divide(data, 1 << j);
	        multiply(data, 1, 1);
	        divide(data, 2);
	        result = dataToString(data);
	      } else {
	        multiply(data, 0, z);
	        multiply(data, 1 << -e, 0);
	        result = dataToString(data) + repeat('0', fractDigits);
	      }
	    }
	    if (fractDigits > 0) {
	      k = result.length;
	      result = sign + (k <= fractDigits
	        ? '0.' + repeat('0', fractDigits - k) + result
	        : stringSlice$1(result, 0, k - fractDigits) + '.' + stringSlice$1(result, k - fractDigits));
	    } else {
	      result = sign + result;
	    } return result;
	  }
	});

	var $$4 = _export;
	var call$1 = functionCall;
	var uncurryThis$2 = functionUncurryThis;
	var requireObjectCoercible$1 = requireObjectCoercible$h;
	var isCallable = isCallable$y;
	var isNullOrUndefined = isNullOrUndefined$d;
	var isRegExp = isRegexp;
	var toString$2 = toString$v;
	var getMethod = getMethod$a;
	var getRegExpFlags = regexpGetFlags;
	var getSubstitution = getSubstitution$2;
	var wellKnownSymbol = wellKnownSymbol$z;

	var REPLACE = wellKnownSymbol('replace');
	var $TypeError = TypeError;
	var indexOf = uncurryThis$2(''.indexOf);
	uncurryThis$2(''.replace);
	var stringSlice = uncurryThis$2(''.slice);
	var max = Math.max;

	// `String.prototype.replaceAll` method
	// https://tc39.es/ecma262/#sec-string.prototype.replaceall
	$$4({ target: 'String', proto: true }, {
	  replaceAll: function replaceAll(searchValue, replaceValue) {
	    var O = requireObjectCoercible$1(this);
	    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
	    var position = 0;
	    var endOfLastMatch = 0;
	    var result = '';
	    if (!isNullOrUndefined(searchValue)) {
	      IS_REG_EXP = isRegExp(searchValue);
	      if (IS_REG_EXP) {
	        flags = toString$2(requireObjectCoercible$1(getRegExpFlags(searchValue)));
	        if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes');
	      }
	      replacer = getMethod(searchValue, REPLACE);
	      if (replacer) {
	        return call$1(replacer, searchValue, O, replaceValue);
	      }
	    }
	    string = toString$2(O);
	    searchString = toString$2(searchValue);
	    functionalReplace = isCallable(replaceValue);
	    if (!functionalReplace) replaceValue = toString$2(replaceValue);
	    searchLength = searchString.length;
	    advanceBy = max(1, searchLength);
	    position = indexOf(string, searchString);
	    while (position !== -1) {
	      replacement = functionalReplace
	        ? toString$2(replaceValue(searchString, position, string))
	        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
	      result += stringSlice(string, endOfLastMatch, position) + replacement;
	      endOfLastMatch = position + searchLength;
	      position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy);
	    }
	    if (endOfLastMatch < string.length) {
	      result += stringSlice(string, endOfLastMatch);
	    }
	    return result;
	  }
	});

	var $$3 = _export;
	var toObject = toObject$l;
	var lengthOfArrayLike = lengthOfArrayLike$n;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$h;
	var addToUnscopables = addToUnscopables$5;

	// `Array.prototype.at` method
	// https://tc39.es/ecma262/#sec-array.prototype.at
	$$3({ target: 'Array', proto: true }, {
	  at: function at(index) {
	    var O = toObject(this);
	    var len = lengthOfArrayLike(O);
	    var relativeIndex = toIntegerOrInfinity$1(index);
	    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	    return (k < 0 || k >= len) ? undefined : O[k];
	  }
	});

	addToUnscopables('at');

	var $$2 = _export;
	var uncurryThis$1 = functionUncurryThis;
	var requireObjectCoercible = requireObjectCoercible$h;
	var toIntegerOrInfinity = toIntegerOrInfinity$h;
	var toString$1 = toString$v;
	var fails$2 = fails$1c;

	var charAt$1 = uncurryThis$1(''.charAt);

	var FORCED$1 = fails$2(function () {
	  // eslint-disable-next-line es/no-array-string-prototype-at -- safe
	  return '𠮷'.at(-2) !== '\uD842';
	});

	// `String.prototype.at` method
	// https://tc39.es/ecma262/#sec-string.prototype.at
	$$2({ target: 'String', proto: true, forced: FORCED$1 }, {
	  at: function at(index) {
	    var S = toString$1(requireObjectCoercible(this));
	    var len = S.length;
	    var relativeIndex = toIntegerOrInfinity(index);
	    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	    return (k < 0 || k >= len) ? undefined : charAt$1(S, k);
	  }
	});

	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
	var exportTypedArrayStaticMethod = arrayBufferViewCore.exportTypedArrayStaticMethod;
	var typedArrayFrom = typedArrayFrom$2;

	// `%TypedArray%.from` method
	// https://tc39.es/ecma262/#sec-%typedarray%.from
	exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

	var $$1 = _export;
	var global$1 = global$Z;
	var getBuiltIn = getBuiltIn$l;
	var uncurryThis = functionUncurryThis;
	var call = functionCall;
	var fails$1 = fails$1c;
	var toString = toString$v;
	var validateArgumentsLength = validateArgumentsLength$9;
	var c2i = base64Map.c2i;

	var disallowed = /[^\d+/a-z]/i;
	var whitespaces = /[\t\n\f\r ]+/g;
	var finalEq = /[=]{1,2}$/;

	var $atob = getBuiltIn('atob');
	var fromCharCode = String.fromCharCode;
	var charAt = uncurryThis(''.charAt);
	var replace = uncurryThis(''.replace);
	var exec = uncurryThis(disallowed.exec);

	var BASIC = !!$atob && !fails$1(function () {
	  return $atob('aGk=') !== 'hi';
	});

	var NO_SPACES_IGNORE = BASIC && fails$1(function () {
	  return $atob(' ') !== '';
	});

	var NO_ENCODING_CHECK = BASIC && !fails$1(function () {
	  $atob('a');
	});

	var NO_ARG_RECEIVING_CHECK = BASIC && !fails$1(function () {
	  $atob();
	});

	var WRONG_ARITY = BASIC && $atob.length !== 1;

	var FORCED = !BASIC || NO_SPACES_IGNORE || NO_ENCODING_CHECK || NO_ARG_RECEIVING_CHECK || WRONG_ARITY;

	// `atob` method
	// https://html.spec.whatwg.org/multipage/webappapis.html#dom-atob
	$$1({ global: true, bind: true, enumerable: true, forced: FORCED }, {
	  atob: function atob(data) {
	    validateArgumentsLength(arguments.length, 1);
	    // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
	    if (BASIC && !NO_SPACES_IGNORE && !NO_ENCODING_CHECK) return call($atob, global$1, data);
	    var string = replace(toString(data), whitespaces, '');
	    var output = '';
	    var position = 0;
	    var bc = 0;
	    var length, chr, bs;
	    if (string.length % 4 === 0) {
	      string = replace(string, finalEq, '');
	    }
	    length = string.length;
	    if (length % 4 === 1 || exec(disallowed, string)) {
	      throw new (getBuiltIn('DOMException'))('The string is not correctly encoded', 'InvalidCharacterError');
	    }
	    while (position < length) {
	      chr = charAt(string, position++);
	      bs = bc % 4 ? bs * 64 + c2i[chr] : c2i[chr];
	      if (bc++ % 4) output += fromCharCode(255 & bs >> (-2 * bc & 6));
	    } return output;
	  }
	});

	var $ = _export;
	var functionApply = functionApply$1;
	var aCallable = aCallable$n;
	var anObject = anObject$E;
	var fails = fails$1c;

	// MS Edge argumentsList argument is optional
	var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
	  // eslint-disable-next-line es/no-reflect -- required for testing
	  Reflect.apply(function () { /* empty */ });
	});

	// `Reflect.apply` method
	// https://tc39.es/ecma262/#sec-reflect.apply
	$({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
	  apply: function apply(target, thisArgument, argumentsList) {
	    return functionApply(aCallable(target), thisArgument, anObject(argumentsList));
	  }
	});

	/*!
	 * SJS 6.15.1
	 */

	!function(){function e(e,t){return (t||"")+" (SystemJS https://github.com/systemjs/systemjs/blob/main/docs/errors.md#"+e+")"}function t(e,t){if(-1!==e.indexOf("\\")&&(e=e.replace(S,"/")),"/"===e[0]&&"/"===e[1])return t.slice(0,t.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var r,n=t.slice(0,t.indexOf(":")+1);if(r="/"===t[n.length+1]?"file:"!==n?(r=t.slice(n.length+2)).slice(r.indexOf("/")+1):t.slice(8):t.slice(n.length+("/"===t[n.length])),"/"===e[0])return t.slice(0,t.length-r.length-1)+e;for(var i=r.slice(0,r.lastIndexOf("/")+1)+e,o=[],s=-1,c=0;c<i.length;c++)-1!==s?"/"===i[c]&&(o.push(i.slice(s,c+1)),s=-1):"."===i[c]?"."!==i[c+1]||"/"!==i[c+2]&&c+2!==i.length?"/"===i[c+1]||c+1===i.length?c+=1:s=c:(o.pop(),c+=2):s=c;return -1!==s&&o.push(i.slice(s)),t.slice(0,t.length-r.length)+o.join("")}}function r(e,r){return t(e,r)||(-1!==e.indexOf(":")?e:t("./"+e,r))}function n(e,r,n,i,o){for(var s in e){var f=t(s,n)||s,a=e[s];if("string"==typeof a){var l=u(i,t(a,n)||a,o);l?r[f]=l:c("W1",s,a);}}}function i(e,t,i){var o;for(o in e.imports&&n(e.imports,i.imports,t,i,null),e.scopes||{}){var s=r(o,t);n(e.scopes[o],i.scopes[s]||(i.scopes[s]={}),t,i,s);}for(o in e.depcache||{})i.depcache[r(o,t)]=e.depcache[o];for(o in e.integrity||{})i.integrity[r(o,t)]=e.integrity[o];}function o(e,t){if(t[e])return e;var r=e.length;do{var n=e.slice(0,r+1);if(n in t)return n}while(-1!==(r=e.lastIndexOf("/",r-1)))}function s(e,t){var r=o(e,t);if(r){var n=t[r];if(null===n)return;if(!(e.length>r.length&&"/"!==n[n.length-1]))return n+e.slice(r.length);c("W2",r,n);}}function c(t,r,n){console.warn(e(t,[n,r].join(", ")));}function u(e,t,r){for(var n=e.scopes,i=r&&o(r,n);i;){var c=s(t,n[i]);if(c)return c;i=o(i.slice(0,i.lastIndexOf("/")),n);}return s(t,e.imports)||-1!==t.indexOf(":")&&t}function f(){this[b]={};}function a(t,r,n,i){var o=t[b][r];if(o)return o;var s=[],c=Object.create(null);j&&Object.defineProperty(c,j,{value:"Module"});var u=Promise.resolve().then((function(){return t.instantiate(r,n,i)})).then((function(n){if(!n)throw Error(e(2,r));var i=n[1]((function(e,t){o.h=!0;var r=!1;if("string"==typeof e)e in c&&c[e]===t||(c[e]=t,r=!0);else {for(var n in e)t=e[n],n in c&&c[n]===t||(c[n]=t,r=!0);e&&e.__esModule&&(c.__esModule=e.__esModule);}if(r)for(var i=0;i<s.length;i++){var u=s[i];u&&u(c);}return t}),2===n[1].length?{import:function(e,n){return t.import(e,r,n)},meta:t.createContext(r)}:void 0);return o.e=i.execute||function(){},[n[0],i.setters||[],n[2]||[]]}),(function(e){throw o.e=null,o.er=e,e})),f=u.then((function(e){return Promise.all(e[0].map((function(n,i){var o=e[1][i],s=e[2][i];return Promise.resolve(t.resolve(n,r)).then((function(e){var n=a(t,e,r,s);return Promise.resolve(n.I).then((function(){return o&&(n.i.push(o),!n.h&&n.I||o(n.n)),n}))}))}))).then((function(e){o.d=e;}))}));return o=t[b][r]={id:r,i:s,n:c,m:i,I:u,L:f,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0,p:void 0}}function l(e,t,r,n){if(!n[t.id])return n[t.id]=!0,Promise.resolve(t.L).then((function(){return t.p&&null!==t.p.e||(t.p=r),Promise.all(t.d.map((function(t){return l(e,t,r,n)})))})).catch((function(e){if(t.er)throw e;throw t.e=null,e}))}function h(e,t){return t.C=l(e,t,t,{}).then((function(){return d(e,t,{})})).then((function(){return t.n}))}function d(e,t,r){function n(){try{var e=o.call(I);if(e)return e=e.then((function(){t.C=t.n,t.E=null;}),(function(e){throw t.er=e,t.E=null,e})),t.E=e;t.C=t.n,t.L=t.I=void 0;}catch(r){throw t.er=r,r}}if(!r[t.id]){if(r[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}var i,o=t.e;return t.e=null,t.d.forEach((function(n){try{var o=d(e,n,r);o&&(i=i||[]).push(o);}catch(s){throw t.er=s,s}})),i?Promise.all(i).then(n):n()}}function v(){[].forEach.call(document.querySelectorAll("script"),(function(t){if(!t.sp)if("systemjs-module"===t.type){if(t.sp=!0,!t.src)return;System.import("import:"===t.src.slice(0,7)?t.src.slice(7):r(t.src,p)).catch((function(e){if(e.message.indexOf("https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3")>-1){var r=document.createEvent("Event");r.initEvent("error",!1,!1),t.dispatchEvent(r);}return Promise.reject(e)}));}else if("systemjs-importmap"===t.type){t.sp=!0;var n=t.src?(System.fetch||fetch)(t.src,{integrity:t.integrity,priority:t.fetchPriority,passThrough:!0}).then((function(e){if(!e.ok)throw Error(e.status);return e.text()})).catch((function(r){return r.message=e("W4",t.src)+"\n"+r.message,console.warn(r),"function"==typeof t.onerror&&t.onerror(),"{}"})):t.innerHTML;M=M.then((function(){return n})).then((function(r){!function(t,r,n){var o={};try{o=JSON.parse(r);}catch(s){console.warn(Error(e("W5")));}i(o,n,t);}(R,r,t.src||p);}));}}));}var p,m="undefined"!=typeof Symbol,g="undefined"!=typeof self,y="undefined"!=typeof document,E=g?self:commonjsGlobal;if(y){var w=document.querySelector("base[href]");w&&(p=w.href);}if(!p&&"undefined"!=typeof location){var O=(p=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==O&&(p=p.slice(0,O+1));}var x,S=/\\/g,j=m&&Symbol.toStringTag,b=m?Symbol():"@",P=f.prototype;P.import=function(e,t,r){var n=this;return t&&"object"==typeof t&&(r=t,t=void 0),Promise.resolve(n.prepareImport()).then((function(){return n.resolve(e,t,r)})).then((function(e){var t=a(n,e,void 0,r);return t.C||h(n,t)}))},P.createContext=function(e){var t=this;return {url:e,resolve:function(r,n){return Promise.resolve(t.resolve(r,n||e))}}},P.register=function(e,t,r){x=[e,t,r];},P.getRegister=function(){var e=x;return x=void 0,e};var I=Object.freeze(Object.create(null));E.System=new f;var L,C,M=Promise.resolve(),R={imports:{},scopes:{},depcache:{},integrity:{}},T=y;if(P.prepareImport=function(e){return (T||e)&&(v(),T=!1),M},P.getImportMap=function(){return JSON.parse(JSON.stringify(R))},y&&(v(),window.addEventListener("DOMContentLoaded",v)),P.addImportMap=function(e,t){i(e,t||p,R);},y){window.addEventListener("error",(function(e){J=e.filename,W=e.error;}));var _=location.origin;}P.createScript=function(e){var t=document.createElement("script");t.async=!0,e.indexOf(_+"/")&&(t.crossOrigin="anonymous");var r=R.integrity[e];return r&&(t.integrity=r),t.src=e,t};var J,W,q={},N=P.register;P.register=function(e,t){if(y&&"loading"===document.readyState&&"string"!=typeof e){var r=document.querySelectorAll("script[src]"),n=r[r.length-1];if(n){L=e;var i=this;C=setTimeout((function(){q[n.src]=[e,t],i.import(n.src);}));}}else L=void 0;return N.call(this,e,t)},P.instantiate=function(t,r){var n=q[t];if(n)return delete q[t],n;var i=this;return Promise.resolve(P.createScript(t)).then((function(n){return new Promise((function(o,s){n.addEventListener("error",(function(){s(Error(e(3,[t,r].join(", "))));})),n.addEventListener("load",(function(){if(document.head.removeChild(n),J===t)s(W);else {var e=i.getRegister(t);e&&e[0]===L&&clearTimeout(C),o(e);}})),document.head.appendChild(n);}))}))},P.shouldFetch=function(){return !1},"undefined"!=typeof fetch&&(P.fetch=fetch);var k=P.instantiate,A=/^(text|application)\/(x-)?javascript(;|$)/;P.instantiate=function(t,r,n){var i=this;return this.shouldFetch(t,r,n)?this.fetch(t,{credentials:"same-origin",integrity:R.integrity[t],meta:n}).then((function(n){if(!n.ok)throw Error(e(7,[n.status,n.statusText,t,r].join(", ")));var o=n.headers.get("content-type");if(!o||!A.test(o))throw Error(e(4,o));return n.text().then((function(e){return e.indexOf("//# sourceURL=")<0&&(e+="\n//# sourceURL="+t),(0, eval)(e),i.getRegister(t)}))})):k.apply(this,arguments)},P.resolve=function(r,n){return u(R,t(r,n=n||p)||r,n)||function(t,r){throw Error(e(8,[t,r].join(", ")))}(r,n)};var F=P.instantiate;P.instantiate=function(e,t,r){var n=R.depcache[e];if(n)for(var i=0;i<n.length;i++)a(this,this.resolve(n[i],e),e);return F.call(this,e,t,r)},g&&"function"==typeof importScripts&&(P.instantiate=function(e){var t=this;return Promise.resolve().then((function(){return importScripts(e),t.getRegister(e)}))});}();

})();
