var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$S =
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

var fails$U = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$T = fails$U;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$T(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$S = fails$U;

var functionBindNative = !fails$S(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$F = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$F.bind(call$F) : function () {
  return call$F.apply(call$F, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$6 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$6 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$6(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$9 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$E = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$E, call$E);

var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$E.apply(fn, arguments);
  };
};

var uncurryThis$Y = functionUncurryThis;

var toString$t = uncurryThis$Y({}.toString);
var stringSlice$d = uncurryThis$Y(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$d(toString$t(it), 8, -1);
};

var uncurryThis$X = functionUncurryThis;
var fails$R = fails$U;
var classof$j = classofRaw$2;

var $Object$5 = Object;
var split$3 = uncurryThis$X(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$R(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$5('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$j(it) === 'String' ? split$3(it, '') : $Object$5(it);
} : $Object$5;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$c = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$b = isNullOrUndefined$c;

var $TypeError$r = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$f = function (it) {
  if (isNullOrUndefined$b(it)) throw new $TypeError$r("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$4 = indexedObject;
var requireObjectCoercible$e = requireObjectCoercible$f;

var toIndexedObject$7 = function (it) {
  return IndexedObject$4(requireObjectCoercible$e(it));
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

var isObject$o = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$x(it);
};

var global$R = global$S;
var isCallable$w = isCallable$y;

var aFunction = function (argument) {
  return isCallable$w(argument) ? argument : undefined;
};

var getBuiltIn$h = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$R[namespace]) : global$R[namespace] && global$R[namespace][method];
};

var uncurryThis$W = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$W({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$Q = global$S;
var userAgent$5 = engineUserAgent;

var process$3 = global$Q.process;
var Deno$1 = global$Q.Deno;
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
var V8_VERSION$1 = engineV8Version;
var fails$Q = fails$U;
var global$P = global$S;

var $String$7 = global$P.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$Q(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$7(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$4 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$4
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$g = getBuiltIn$h;
var isCallable$v = isCallable$y;
var isPrototypeOf$8 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$4 = Object;

var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$g('Symbol');
  return isCallable$v($Symbol) && isPrototypeOf$8($Symbol.prototype, $Object$4(it));
};

var $String$6 = String;

var tryToString$6 = function (argument) {
  try {
    return $String$6(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$u = isCallable$y;
var tryToString$5 = tryToString$6;

var $TypeError$q = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$l = function (argument) {
  if (isCallable$u(argument)) return argument;
  throw new $TypeError$q(tryToString$5(argument) + ' is not a function');
};

var aCallable$k = aCallable$l;
var isNullOrUndefined$a = isNullOrUndefined$c;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$a = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$a(func) ? undefined : aCallable$k(func);
};

var call$D = functionCall;
var isCallable$t = isCallable$y;
var isObject$n = isObject$o;

var $TypeError$p = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$t(fn = input.toString) && !isObject$n(val = call$D(fn, input))) return val;
  if (isCallable$t(fn = input.valueOf) && !isObject$n(val = call$D(fn, input))) return val;
  if (pref !== 'string' && isCallable$t(fn = input.toString) && !isObject$n(val = call$D(fn, input))) return val;
  throw new $TypeError$p("Can't convert object to primitive value");
};

var sharedStore = {exports: {}};

var isPure = false;

var global$O = global$S;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$c = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$c(global$O, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$O[key] = value;
  } return value;
};

var globalThis$2 = global$S;
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

var shared$4 = function (key, value) {
  return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible$d = requireObjectCoercible$f;

var $Object$3 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$d = function (argument) {
  return $Object$3(requireObjectCoercible$d(argument));
};

var uncurryThis$V = functionUncurryThis;
var toObject$c = toObject$d;

var hasOwnProperty = uncurryThis$V({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$c(it), key);
};

var uncurryThis$U = functionUncurryThis;

var id$2 = 0;
var postfix = Math.random();
var toString$s = uncurryThis$U(1.0.toString);

var uid$4 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$s(++id$2 + postfix, 36);
};

var global$N = global$S;
var shared$3 = shared$4;
var hasOwn$p = hasOwnProperty_1;
var uid$3 = uid$4;
var NATIVE_SYMBOL$3 = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$3 = global$N.Symbol;
var WellKnownSymbolsStore = shared$3('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$3;

var wellKnownSymbol$s = function (name) {
  if (!hasOwn$p(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL$3 && hasOwn$p(Symbol$3, name)
      ? Symbol$3[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$C = functionCall;
var isObject$m = isObject$o;
var isSymbol$3 = isSymbol$4;
var getMethod$9 = getMethod$a;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$r = wellKnownSymbol$s;

var $TypeError$o = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$r('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$2 = function (input, pref) {
  if (!isObject$m(input) || isSymbol$3(input)) return input;
  var exoticToPrim = getMethod$9(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$C(exoticToPrim, input, pref);
    if (!isObject$m(result) || isSymbol$3(result)) return result;
    throw new $TypeError$o("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive$1 = toPrimitive$2;
var isSymbol$2 = isSymbol$4;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive$1(argument, 'string');
  return isSymbol$2(key) ? key : key + '';
};

var global$M = global$S;
var isObject$l = isObject$o;

var document$3 = global$M.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$l(document$3) && isObject$l(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$x = descriptors;
var fails$P = fails$U;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$x && !fails$P(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$w = descriptors;
var call$B = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$8 = createPropertyDescriptor$9;
var toIndexedObject$6 = toIndexedObject$7;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$o = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$w ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$6(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$o(O, P)) return createPropertyDescriptor$8(!call$B(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$v = descriptors;
var fails$O = fails$U;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$v && fails$O(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$k = isObject$o;

var $String$5 = String;
var $TypeError$n = TypeError;

// `Assert: Type(argument) is Object`
var anObject$z = function (argument) {
  if (isObject$k(argument)) return argument;
  throw new $TypeError$n($String$5(argument) + ' is not an object');
};

var DESCRIPTORS$u = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$y = anObject$z;
var toPropertyKey$1 = toPropertyKey$3;

var $TypeError$m = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$u ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$y(O);
  P = toPropertyKey$1(P);
  anObject$y(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$y(O);
  P = toPropertyKey$1(P);
  anObject$y(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$m('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$t = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$7 = createPropertyDescriptor$9;

var createNonEnumerableProperty$d = DESCRIPTORS$t ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$7(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$3 = {exports: {}};

var DESCRIPTORS$s = descriptors;
var hasOwn$n = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$s && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$n(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$s || (DESCRIPTORS$s && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$T = functionUncurryThis;
var isCallable$s = isCallable$y;
var store$1 = sharedStoreExports;

var functionToString = uncurryThis$T(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$s(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$L = global$S;
var isCallable$r = isCallable$y;

var WeakMap$2 = global$L.WeakMap;

var weakMapBasicDetection = isCallable$r(WeakMap$2) && /native code/.test(String(WeakMap$2));

var shared$2 = shared$4;
var uid$2 = uid$4;

var keys$2 = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys$2[key] || (keys$2[key] = uid$2(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
var global$K = global$S;
var isObject$j = isObject$o;
var createNonEnumerableProperty$c = createNonEnumerableProperty$d;
var hasOwn$m = hasOwnProperty_1;
var shared$1 = sharedStoreExports;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$4 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$6 = global$K.TypeError;
var WeakMap$1 = global$K.WeakMap;
var set$2, get$1, has$6;

var enforce = function (it) {
  return has$6(it) ? get$1(it) : set$2(it, {});
};

var getterFor$1 = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$j(it) || (state = get$1(it)).type !== TYPE) {
      throw new TypeError$6('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP$1 || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap$1());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$2 = function (it, metadata) {
    if (store.has(it)) throw new TypeError$6(OBJECT_ALREADY_INITIALIZED);
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
  var STATE = sharedKey$2('state');
  hiddenKeys$4[STATE] = true;
  set$2 = function (it, metadata) {
    if (hasOwn$m(it, STATE)) throw new TypeError$6(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$c(it, STATE, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return hasOwn$m(it, STATE) ? it[STATE] : {};
  };
  has$6 = function (it) {
    return hasOwn$m(it, STATE);
  };
}

var internalState = {
  set: set$2,
  get: get$1,
  has: has$6,
  enforce: enforce,
  getterFor: getterFor$1
};

var uncurryThis$S = functionUncurryThis;
var fails$N = fails$U;
var isCallable$q = isCallable$y;
var hasOwn$l = hasOwnProperty_1;
var DESCRIPTORS$r = descriptors;
var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$c = internalState;

var enforceInternalState$4 = InternalStateModule$c.enforce;
var getInternalState$8 = InternalStateModule$c.get;
var $String$4 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$b = Object.defineProperty;
var stringSlice$c = uncurryThis$S(''.slice);
var replace$b = uncurryThis$S(''.replace);
var join$3 = uncurryThis$S([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$r && !fails$N(function () {
  return defineProperty$b(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
  if (stringSlice$c($String$4(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$b($String$4(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$l(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
    if (DESCRIPTORS$r) defineProperty$b(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$l(options, 'arity') && value.length !== options.arity) {
    defineProperty$b(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$l(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$r) defineProperty$b(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState$4(value);
  if (!hasOwn$l(state, 'source')) {
    state.source = join$3(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$2(function toString() {
  return isCallable$q(this) && getInternalState$8(this).source || inspectSource$2(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$3.exports;

var isCallable$p = isCallable$y;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn$1 = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$i = function (O, key, value, options) {
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
    else definePropertyModule$4.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$7 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$7 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$d = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$c = toIntegerOrInfinity$d;

var max$3 = Math.max;
var min$6 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$3 = function (index, length) {
  var integer = toIntegerOrInfinity$c(index);
  return integer < 0 ? max$3(integer + length, 0) : min$6(integer, length);
};

var toIntegerOrInfinity$b = toIntegerOrInfinity$d;

var min$5 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$b = function (argument) {
  var len = toIntegerOrInfinity$b(argument);
  return len > 0 ? min$5(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$a = toLength$b;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$h = function (obj) {
  return toLength$a(obj.length);
};

var toIndexedObject$5 = toIndexedObject$7;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;
var lengthOfArrayLike$g = lengthOfArrayLike$h;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$5 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$5($this);
    var length = lengthOfArrayLike$g(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex$2(fromIndex, length);
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
  includes: createMethod$5(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$5(false)
};

var uncurryThis$R = functionUncurryThis;
var hasOwn$k = hasOwnProperty_1;
var toIndexedObject$4 = toIndexedObject$7;
var indexOf$2 = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$5;

var push$b = uncurryThis$R([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$4(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$k(hiddenKeys$3, key) && hasOwn$k(O, key) && push$b(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$k(O, key = names[i++])) {
    ~indexOf$2(result, key) || push$b(result, key);
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

var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$2);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$f = getBuiltIn$h;
var uncurryThis$Q = functionUncurryThis;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$x = anObject$z;

var concat$2 = uncurryThis$Q([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$f('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$x(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$j = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;

var copyConstructorProperties$4 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$3.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$j(target, key) && !(exceptions && hasOwn$j(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$M = fails$U;
var isCallable$o = isCallable$y;

var replacement = /#|\.prototype\./;

var isForced$4 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable$o(detection) ? fails$M(detection)
    : !!detection;
};

var normalize = isForced$4.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$4.data = {};
var NATIVE = isForced$4.NATIVE = 'N';
var POLYFILL = isForced$4.POLYFILL = 'P';

var isForced_1 = isForced$4;

var global$J = global$S;
var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$b = createNonEnumerableProperty$d;
var defineBuiltIn$h = defineBuiltIn$i;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$3 = copyConstructorProperties$4;
var isForced$3 = isForced_1;

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
    target = global$J;
  } else if (STATIC) {
    target = global$J[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global$J[TARGET] && global$J[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$5(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$3(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$b(sourceProperty, 'sham', true);
    }
    defineBuiltIn$h(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$6 = FunctionPrototype.apply;
var call$A = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$A.bind(apply$6) : function () {
  return call$A.apply(apply$6, arguments);
});

var uncurryThis$P = functionUncurryThis;
var aCallable$j = aCallable$l;

var functionUncurryThisAccessor = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis$P(aCallable$j(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

var isObject$i = isObject$o;

var isPossiblePrototype$1 = function (argument) {
  return isObject$i(argument) || argument === null;
};

var isPossiblePrototype = isPossiblePrototype$1;

var $String$3 = String;
var $TypeError$l = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError$l("Can't set " + $String$3(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor$3 = functionUncurryThisAccessor;
var isObject$h = isObject$o;
var requireObjectCoercible$c = requireObjectCoercible$f;
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
    requireObjectCoercible$c(O);
    aPossiblePrototype(proto);
    if (!isObject$h(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty$a = objectDefineProperty.f;

var proxyAccessor$2 = function (Target, Source, key) {
  key in Target || defineProperty$a(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$n = isCallable$y;
var isObject$g = isObject$o;
var setPrototypeOf$6 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$6 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$6 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$n(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$g(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$6($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$q = wellKnownSymbol$s;

var TO_STRING_TAG$5 = wellKnownSymbol$q('toStringTag');
var test$2 = {};

test$2[TO_STRING_TAG$5] = 'z';

var toStringTagSupport = String(test$2) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$m = isCallable$y;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$p = wellKnownSymbol$s;

var TO_STRING_TAG$4 = wellKnownSymbol$p('toStringTag');
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
var classof$i = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$4)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw$1(O)
    // ES3 arguments fallback
    : (result = classofRaw$1(O)) === 'Object' && isCallable$m(O.callee) ? 'Arguments' : result;
};

var classof$h = classof$i;

var $String$2 = String;

var toString$r = function (argument) {
  if (classof$h(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String$2(argument);
};

var toString$q = toString$r;

var normalizeStringArgument$4 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$q(argument);
};

var isObject$f = isObject$o;
var createNonEnumerableProperty$a = createNonEnumerableProperty$d;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$f(options) && 'cause' in options) {
    createNonEnumerableProperty$a(O, 'cause', options.cause);
  }
};

var uncurryThis$O = functionUncurryThis;

var $Error = Error;
var replace$a = uncurryThis$O(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var errorStackClear = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace$a(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$L = fails$U;
var createPropertyDescriptor$6 = createPropertyDescriptor$9;

var errorStackInstallable = !fails$L(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$6(1, 7));
  return error.stack !== 7;
});

var createNonEnumerableProperty$9 = createNonEnumerableProperty$d;
var clearErrorStack$2 = errorStackClear;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

var errorStackInstall = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty$9(error, 'stack', clearErrorStack$2(stack, dropEntries));
  }
};

var getBuiltIn$e = getBuiltIn$h;
var hasOwn$i = hasOwnProperty_1;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$d;
var isPrototypeOf$7 = objectIsPrototypeOf;
var setPrototypeOf$5 = objectSetPrototypeOf;
var copyConstructorProperties$2 = copyConstructorProperties$4;
var proxyAccessor$1 = proxyAccessor$2;
var inheritIfRequired$5 = inheritIfRequired$6;
var normalizeStringArgument$3 = normalizeStringArgument$4;
var installErrorCause = installErrorCause$1;
var installErrorStack = errorStackInstall;
var DESCRIPTORS$q = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$e.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$i(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$e('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument$3(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$8(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf$7(OriginalErrorPrototype, this)) inheritIfRequired$5(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$5) setPrototypeOf$5(WrappedError, BaseError);
    else copyConstructorProperties$2(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$q && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor$1(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties$2(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$8(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $$14 = _export;
var global$I = global$S;
var apply$5 = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global$I[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED$c = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$c);
  $$14({ global: true, constructor: true, arity: 1, forced: FORCED$c }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$c);
    $$14({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$c }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply$5(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply$5(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply$5(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply$5(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply$5(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply$5(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply$5(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply$5(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply$5(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply$5(init, this, arguments); };
});

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$p = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$w = anObject$z;
var toIndexedObject$3 = toIndexedObject$7;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$p && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$w(O);
  var props = toIndexedObject$3(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$d = getBuiltIn$h;

var html$2 = getBuiltIn$d('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$v = anObject$z;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$1 = hiddenKeys$5;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

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
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$v(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$o = wellKnownSymbol$s;
var create$7 = objectCreate;
var defineProperty$9 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$o('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
  defineProperty$9(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$7(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$2 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$K = fails$U;

var correctPrototypeGetter = !fails$K(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$h = hasOwnProperty_1;
var isCallable$l = isCallable$y;
var toObject$b = toObject$d;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype$2 = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$b(O);
  if (hasOwn$h(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$l(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype$2 : null;
};

var fails$J = fails$U;
var isCallable$k = isCallable$y;
var isObject$e = isObject$o;
var getPrototypeOf$4 = objectGetPrototypeOf;
var defineBuiltIn$g = defineBuiltIn$i;
var wellKnownSymbol$n = wellKnownSymbol$s;

var ITERATOR$a = wellKnownSymbol$n('iterator');
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

var NEW_ITERATOR_PROTOTYPE = !isObject$e(IteratorPrototype$4) || fails$J(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$4[ITERATOR$a].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$k(IteratorPrototype$4[ITERATOR$a])) {
  defineBuiltIn$g(IteratorPrototype$4, ITERATOR$a, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$4,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$8 = objectDefineProperty.f;
var hasOwn$g = hasOwnProperty_1;
var wellKnownSymbol$m = wellKnownSymbol$s;

var TO_STRING_TAG$3 = wellKnownSymbol$m('toStringTag');

var setToStringTag$a = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$g(target, TO_STRING_TAG$3)) {
    defineProperty$8(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;
var create$6 = objectCreate;
var createPropertyDescriptor$5 = createPropertyDescriptor$9;
var setToStringTag$9 = setToStringTag$a;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$6(IteratorPrototype$3, { next: createPropertyDescriptor$5(+!ENUMERABLE_NEXT, next) });
  setToStringTag$9(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$13 = _export;
var call$z = functionCall;
var FunctionName$1 = functionName;
var isCallable$j = isCallable$y;
var createIteratorConstructor$2 = iteratorCreateConstructor;
var getPrototypeOf$3 = objectGetPrototypeOf;
var setPrototypeOf$4 = objectSetPrototypeOf;
var setToStringTag$8 = setToStringTag$a;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$d;
var defineBuiltIn$f = defineBuiltIn$i;
var wellKnownSymbol$l = wellKnownSymbol$s;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
var IteratorPrototype$2 = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$9 = wellKnownSymbol$l('iterator');
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
  var nativeIterator = IterablePrototype[ITERATOR$9]
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
        if (setPrototypeOf$4) {
          setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (!isCallable$j(CurrentIteratorPrototype[ITERATOR$9])) {
          defineBuiltIn$f(CurrentIteratorPrototype, ITERATOR$9, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$8(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME$3 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME$1) {
      createNonEnumerableProperty$7(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$z(nativeIterator, this); };
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
        defineBuiltIn$f(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$13({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$9] !== defaultIterator) {
    defineBuiltIn$f(IterablePrototype, ITERATOR$9, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$5 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject$2 = toIndexedObject$7;
var addToUnscopables$1 = addToUnscopables$2;
var Iterators$2 = iterators;
var InternalStateModule$b = internalState;
var defineProperty$7 = objectDefineProperty.f;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$4 = createIterResultObject$5;
var DESCRIPTORS$o = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$a = InternalStateModule$b.set;
var getInternalState$7 = InternalStateModule$b.getterFor(ARRAY_ITERATOR);

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
var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$a(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$2(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$7(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject$4(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject$4(index, false);
    case 'values': return createIterResultObject$4(target[index], false);
  } return createIterResultObject$4([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('keys');
addToUnscopables$1('values');
addToUnscopables$1('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$o && values.name !== 'values') try {
  defineProperty$7(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var classof$g = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$6 = Array.isArray || function isArray(argument) {
  return classof$g(argument) === 'Array';
};

var DESCRIPTORS$n = descriptors;
var isArray$5 = isArray$6;

var $TypeError$k = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$n && !function () {
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
  if (isArray$5(O) && !getOwnPropertyDescriptor$4(O, 'length').writable) {
    throw new $TypeError$k('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

var $TypeError$j = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$2 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$j('Maximum allowed index exceeded');
  return it;
};

var $$12 = _export;
var toObject$a = toObject$d;
var lengthOfArrayLike$f = lengthOfArrayLike$h;
var setArrayLength$1 = arraySetLength;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
var fails$I = fails$U;

var INCORRECT_TO_LENGTH = fails$I(function () {
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

var FORCED$b = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength$1();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$$12({ target: 'Array', proto: true, arity: 1, forced: FORCED$b }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$a(this);
    var len = lengthOfArrayLike$f(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger$1(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength$1(O, len);
    return len;
  }
});

var classofRaw = classofRaw$2;
var uncurryThis$N = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis$N(fn);
};

// eslint-disable-next-line es/no-typed-arrays -- safe
var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

var makeBuiltIn = makeBuiltInExports;
var defineProperty$6 = objectDefineProperty;

var defineBuiltInAccessor$e = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty$6.f(target, name, descriptor);
};

var defineBuiltIn$e = defineBuiltIn$i;

var defineBuiltIns$5 = function (target, src, options) {
  for (var key in src) defineBuiltIn$e(target, key, src[key], options);
  return target;
};

var isPrototypeOf$6 = objectIsPrototypeOf;

var $TypeError$i = TypeError;

var anInstance$a = function (it, Prototype) {
  if (isPrototypeOf$6(Prototype, it)) return it;
  throw new $TypeError$i('Incorrect invocation');
};

var toIntegerOrInfinity$a = toIntegerOrInfinity$d;
var toLength$9 = toLength$b;

var $RangeError$8 = RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
var toIndex$3 = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity$a(it);
  var length = toLength$9(number);
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
var floor$6 = Math.floor;
var log$1 = Math.log;
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
    exponent = floor$6(log$1(number) / LN2);
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

var toObject$9 = toObject$d;
var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var lengthOfArrayLike$e = lengthOfArrayLike$h;

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
  var O = toObject$9(this);
  var length = lengthOfArrayLike$e(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$1(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex$1(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var uncurryThis$M = functionUncurryThis;

var arraySlice$8 = uncurryThis$M([].slice);

var global$H = global$S;
var uncurryThis$L = functionUncurryThis;
var DESCRIPTORS$m = descriptors;
var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
var FunctionName = functionName;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$d;
var defineBuiltInAccessor$d = defineBuiltInAccessor$e;
var defineBuiltIns$4 = defineBuiltIns$5;
var fails$H = fails$U;
var anInstance$9 = anInstance$a;
var toIntegerOrInfinity$9 = toIntegerOrInfinity$d;
var toLength$8 = toLength$b;
var toIndex$2 = toIndex$3;
var fround = mathFround;
var IEEE754 = ieee754;
var getPrototypeOf$2 = objectGetPrototypeOf;
var setPrototypeOf$3 = objectSetPrototypeOf;
var arrayFill = arrayFill$1;
var arraySlice$7 = arraySlice$8;
var inheritIfRequired$4 = inheritIfRequired$6;
var copyConstructorProperties$1 = copyConstructorProperties$4;
var setToStringTag$7 = setToStringTag$a;
var InternalStateModule$a = internalState;

var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var ARRAY_BUFFER$1 = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH$1 = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var getInternalArrayBufferState = InternalStateModule$a.getterFor(ARRAY_BUFFER$1);
var getInternalDataViewState = InternalStateModule$a.getterFor(DATA_VIEW);
var setInternalState$9 = InternalStateModule$a.set;
var NativeArrayBuffer$1 = global$H[ARRAY_BUFFER$1];
var $ArrayBuffer$1 = NativeArrayBuffer$1;
var ArrayBufferPrototype$3 = $ArrayBuffer$1 && $ArrayBuffer$1[PROTOTYPE];
var $DataView = global$H[DATA_VIEW];
var DataViewPrototype$2 = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$1 = Object.prototype;
var Array$1 = global$H.Array;
var RangeError$3 = global$H.RangeError;
var fill = uncurryThis$L(arrayFill);
var reverse = uncurryThis$L([].reverse);

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
  defineBuiltInAccessor$d(Constructor[PROTOTYPE], key, {
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
  if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
  var bytes = store.bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice$7(bytes, start, start + count);
  return boolIsLittleEndian ? pack : reverse(pack);
};

var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
  var store = getInternalDataViewState(view);
  var intIndex = toIndex$2(index);
  var pack = conversion(+value);
  var boolIsLittleEndian = !!isLittleEndian;
  if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
  var bytes = store.bytes;
  var start = intIndex + store.byteOffset;
  for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER$1) {
  $ArrayBuffer$1 = function ArrayBuffer(length) {
    anInstance$9(this, ArrayBufferPrototype$3);
    var byteLength = toIndex$2(length);
    setInternalState$9(this, {
      type: ARRAY_BUFFER$1,
      bytes: fill(Array$1(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS$m) {
      this.byteLength = byteLength;
      this.detached = false;
    }
  };

  ArrayBufferPrototype$3 = $ArrayBuffer$1[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance$9(this, DataViewPrototype$2);
    anInstance$9(buffer, ArrayBufferPrototype$3);
    var bufferState = getInternalArrayBufferState(buffer);
    var bufferLength = bufferState.byteLength;
    var offset = toIntegerOrInfinity$9(byteOffset);
    if (offset < 0 || offset > bufferLength) throw new RangeError$3('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength$8(byteLength);
    if (offset + byteLength > bufferLength) throw new RangeError$3(WRONG_LENGTH$1);
    setInternalState$9(this, {
      type: DATA_VIEW,
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset,
      bytes: bufferState.bytes
    });
    if (!DESCRIPTORS$m) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype$2 = $DataView[PROTOTYPE];

  if (DESCRIPTORS$m) {
    addGetter$1($ArrayBuffer$1, 'byteLength', getInternalArrayBufferState);
    addGetter$1($DataView, 'buffer', getInternalDataViewState);
    addGetter$1($DataView, 'byteLength', getInternalDataViewState);
    addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
  }

  defineBuiltIns$4(DataViewPrototype$2, {
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
  if (!fails$H(function () {
    NativeArrayBuffer$1(1);
  }) || !fails$H(function () {
    new NativeArrayBuffer$1(-1);
  }) || fails$H(function () {
    new NativeArrayBuffer$1();
    new NativeArrayBuffer$1(1.5);
    new NativeArrayBuffer$1(NaN);
    return NativeArrayBuffer$1.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
    /* eslint-enable no-new -- required for testing */
    $ArrayBuffer$1 = function ArrayBuffer(length) {
      anInstance$9(this, ArrayBufferPrototype$3);
      return inheritIfRequired$4(new NativeArrayBuffer$1(toIndex$2(length)), this, $ArrayBuffer$1);
    };

    $ArrayBuffer$1[PROTOTYPE] = ArrayBufferPrototype$3;

    ArrayBufferPrototype$3.constructor = $ArrayBuffer$1;

    copyConstructorProperties$1($ArrayBuffer$1, NativeArrayBuffer$1);
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty$6(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf$3 && getPrototypeOf$2(DataViewPrototype$2) !== ObjectPrototype$1) {
    setPrototypeOf$3(DataViewPrototype$2, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer$1(2));
  var $setInt8 = uncurryThis$L(DataViewPrototype$2.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns$4(DataViewPrototype$2, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag$7($ArrayBuffer$1, ARRAY_BUFFER$1);
setToStringTag$7($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer$1,
  DataView: $DataView
};

var uncurryThis$K = functionUncurryThis;
var fails$G = fails$U;
var isCallable$i = isCallable$y;
var classof$f = classof$i;
var getBuiltIn$c = getBuiltIn$h;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var construct = getBuiltIn$c('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$9 = uncurryThis$K(constructorRegExp.exec);
var INCORRECT_TO_STRING$2 = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$i(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$i(argument)) return false;
  switch (classof$f(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING$2 || !!exec$9(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$3 = !construct || fails$G(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor$2 = isConstructor$3;
var tryToString$4 = tryToString$6;

var $TypeError$h = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$2 = function (argument) {
  if (isConstructor$2(argument)) return argument;
  throw new $TypeError$h(tryToString$4(argument) + ' is not a constructor');
};

var anObject$u = anObject$z;
var aConstructor$1 = aConstructor$2;
var isNullOrUndefined$9 = isNullOrUndefined$c;
var wellKnownSymbol$k = wellKnownSymbol$s;

var SPECIES$4 = wellKnownSymbol$k('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$5 = function (O, defaultConstructor) {
  var C = anObject$u(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined$9(S = anObject$u(C)[SPECIES$4]) ? defaultConstructor : aConstructor$1(S);
};

var $$11 = _export;
var uncurryThis$J = functionUncurryThisClause;
var fails$F = fails$U;
var ArrayBufferModule$1 = arrayBuffer;
var anObject$t = anObject$z;
var toAbsoluteIndex = toAbsoluteIndex$3;
var toLength$7 = toLength$b;
var speciesConstructor$4 = speciesConstructor$5;

var ArrayBuffer$5 = ArrayBufferModule$1.ArrayBuffer;
var DataView$3 = ArrayBufferModule$1.DataView;
var DataViewPrototype$1 = DataView$3.prototype;
var nativeArrayBufferSlice = uncurryThis$J(ArrayBuffer$5.prototype.slice);
var getUint8 = uncurryThis$J(DataViewPrototype$1.getUint8);
var setUint8 = uncurryThis$J(DataViewPrototype$1.setUint8);

var INCORRECT_SLICE = fails$F(function () {
  return !new ArrayBuffer$5(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$$11({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice && end === undefined) {
      return nativeArrayBufferSlice(anObject$t(this), start); // FF fix
    }
    var length = anObject$t(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor$4(this, ArrayBuffer$5))(toLength$7(fin - first));
    var viewSource = new DataView$3(this);
    var viewTarget = new DataView$3(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});

var uncurryThisAccessor$2 = functionUncurryThisAccessor;
var classof$e = classofRaw$2;

var $TypeError$g = TypeError;

// Includes
// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
var arrayBufferByteLength$2 = uncurryThisAccessor$2(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
  if (classof$e(O) !== 'ArrayBuffer') throw new $TypeError$g('ArrayBuffer expected');
  return O.byteLength;
};

var uncurryThis$I = functionUncurryThis;
var arrayBufferByteLength$1 = arrayBufferByteLength$2;

var slice$5 = uncurryThis$I(ArrayBuffer.prototype.slice);

var arrayBufferIsDetached = function (O) {
  if (arrayBufferByteLength$1(O) !== 0) return false;
  try {
    slice$5(O, 0, 0);
    return false;
  } catch (error) {
    return true;
  }
};

var DESCRIPTORS$l = descriptors;
var defineBuiltInAccessor$c = defineBuiltInAccessor$e;
var isDetached$1 = arrayBufferIsDetached;

var ArrayBufferPrototype$2 = ArrayBuffer.prototype;

if (DESCRIPTORS$l && !('detached' in ArrayBufferPrototype$2)) {
  defineBuiltInAccessor$c(ArrayBufferPrototype$2, 'detached', {
    configurable: true,
    get: function detached() {
      return isDetached$1(this);
    }
  });
}

var global$G = global$S;
var classof$d = classofRaw$2;

var engineIsNode = classof$d(global$G.process) === 'process';

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

var global$F = global$S;
var fails$E = fails$U;
var V8$2 = engineV8Version;
var IS_BROWSER$1 = engineIsBrowser;
var IS_DENO$1 = engineIsDeno;
var IS_NODE$5 = engineIsNode;

var structuredClone$2 = global$F.structuredClone;

var structuredCloneProperTransfer = !!structuredClone$2 && !fails$E(function () {
  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if ((IS_DENO$1 && V8$2 > 92) || (IS_NODE$5 && V8$2 > 94) || (IS_BROWSER$1 && V8$2 > 97)) return false;
  var buffer = new ArrayBuffer(8);
  var clone = structuredClone$2(buffer, { transfer: [buffer] });
  return buffer.byteLength !== 0 || clone.byteLength !== 8;
});

var global$E = global$S;
var tryNodeRequire$1 = tryNodeRequire$2;
var PROPER_STRUCTURED_CLONE_TRANSFER$1 = structuredCloneProperTransfer;

var structuredClone$1 = global$E.structuredClone;
var $ArrayBuffer = global$E.ArrayBuffer;
var $MessageChannel = global$E.MessageChannel;
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

var global$D = global$S;
var uncurryThis$H = functionUncurryThis;
var uncurryThisAccessor$1 = functionUncurryThisAccessor;
var toIndex$1 = toIndex$3;
var isDetached = arrayBufferIsDetached;
var arrayBufferByteLength = arrayBufferByteLength$2;
var detachTransferable = detachTransferable$1;
var PROPER_STRUCTURED_CLONE_TRANSFER = structuredCloneProperTransfer;

var structuredClone = global$D.structuredClone;
var ArrayBuffer$4 = global$D.ArrayBuffer;
var DataView$2 = global$D.DataView;
var TypeError$5 = global$D.TypeError;
var min$4 = Math.min;
var ArrayBufferPrototype$1 = ArrayBuffer$4.prototype;
var DataViewPrototype = DataView$2.prototype;
var slice$4 = uncurryThis$H(ArrayBufferPrototype$1.slice);
var isResizable = uncurryThisAccessor$1(ArrayBufferPrototype$1, 'resizable', 'get');
var maxByteLength = uncurryThisAccessor$1(ArrayBufferPrototype$1, 'maxByteLength', 'get');
var getInt8 = uncurryThis$H(DataViewPrototype.getInt8);
var setInt8 = uncurryThis$H(DataViewPrototype.setInt8);

var arrayBufferTransfer = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
  var byteLength = arrayBufferByteLength(arrayBuffer);
  var newByteLength = newLength === undefined ? byteLength : toIndex$1(newLength);
  var fixedLength = !isResizable || !isResizable(arrayBuffer);
  var newBuffer;
  if (isDetached(arrayBuffer)) throw new TypeError$5('ArrayBuffer is detached');
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
    var copyLength = min$4(newByteLength, byteLength);
    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
  }
  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
  return newBuffer;
};

var $$10 = _export;
var $transfer$1 = arrayBufferTransfer;

// `ArrayBuffer.prototype.transfer` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
if ($transfer$1) $$10({ target: 'ArrayBuffer', proto: true }, {
  transfer: function transfer() {
    return $transfer$1(this, arguments.length ? arguments[0] : undefined, true);
  }
});

var $$$ = _export;
var $transfer = arrayBufferTransfer;

// `ArrayBuffer.prototype.transferToFixedLength` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
if ($transfer) $$$({ target: 'ArrayBuffer', proto: true }, {
  transferToFixedLength: function transferToFixedLength() {
    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
  }
});

// a string of all valid unicode whitespaces
var whitespaces$5 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$G = functionUncurryThis;
var requireObjectCoercible$b = requireObjectCoercible$f;
var toString$p = toString$r;
var whitespaces$4 = whitespaces$5;

var replace$9 = uncurryThis$G(''.replace);
var ltrim = RegExp('^[' + whitespaces$4 + ']+');
var rtrim = RegExp('(^|[^' + whitespaces$4 + '])[' + whitespaces$4 + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$4 = function (TYPE) {
  return function ($this) {
    var string = toString$p(requireObjectCoercible$b($this));
    if (TYPE & 1) string = replace$9(string, ltrim, '');
    if (TYPE & 2) string = replace$9(string, rtrim, '$1');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$4(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$4(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$4(3)
};

var global$C = global$S;
var fails$D = fails$U;
var uncurryThis$F = functionUncurryThis;
var toString$o = toString$r;
var trim$1 = stringTrim.trim;
var whitespaces$3 = whitespaces$5;

var $parseInt$2 = global$C.parseInt;
var Symbol$2 = global$C.Symbol;
var ITERATOR$8 = Symbol$2 && Symbol$2.iterator;
var hex = /^[+-]?0x/i;
var exec$8 = uncurryThis$F(hex.exec);
var FORCED$a = $parseInt$2(whitespaces$3 + '08') !== 8 || $parseInt$2(whitespaces$3 + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR$8 && !fails$D(function () { $parseInt$2(Object(ITERATOR$8)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED$a ? function parseInt(string, radix) {
  var S = trim$1(toString$o(string));
  return $parseInt$2(S, (radix >>> 0) || (exec$8(hex, S) ? 16 : 10));
} : $parseInt$2;

var $$_ = _export;
var $parseInt$1 = numberParseInt;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$$_({ global: true, forced: parseInt !== $parseInt$1 }, {
  parseInt: $parseInt$1
});

var anObject$s = anObject$z;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$s(this);
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

var fails$C = fails$U;
var global$B = global$S;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$B.RegExp;

var UNSUPPORTED_Y$3 = fails$C(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails$C(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$C(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$1,
  UNSUPPORTED_Y: UNSUPPORTED_Y$3
};

var fails$B = fails$U;
var global$A = global$S;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$A.RegExp;

var regexpUnsupportedDotAll = fails$B(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.test('\n') && re.flags === 's');
});

var fails$A = fails$U;
var global$z = global$S;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$z.RegExp;

var regexpUnsupportedNcg = fails$A(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$y = functionCall;
var uncurryThis$E = functionUncurryThis;
var toString$n = toString$r;
var regexpFlags = regexpFlags$1;
var stickyHelpers$2 = regexpStickyHelpers;
var shared = shared$4;
var create$5 = objectCreate;
var getInternalState$6 = internalState.get;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$b = uncurryThis$E(''.charAt);
var indexOf$1 = uncurryThis$E(''.indexOf);
var replace$8 = uncurryThis$E(''.replace);
var stringSlice$b = uncurryThis$E(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$y(nativeExec, re1, 'a');
  call$y(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$6(re);
    var str = toString$n(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$y(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = call$y(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$8(flags, 'y', '');
      if (indexOf$1(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$b(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$b(str, re.lastIndex - 1) !== '\n')) {
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

    match = call$y(nativeExec, sticky ? reCopy : re, strCopy);

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
      call$y(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$5(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$Z = _export;
var exec$7 = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$Z({ target: 'RegExp', proto: true, forced: /./.exec !== exec$7 }, {
  exec: exec$7
});

var call$x = functionCall;
var hasOwn$f = hasOwnProperty_1;
var isPrototypeOf$5 = objectIsPrototypeOf;
var regExpFlags$1 = regexpFlags$1;

var RegExpPrototype$6 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$6) && !hasOwn$f(R, 'flags') && isPrototypeOf$5(RegExpPrototype$6, R)
    ? call$x(regExpFlags$1, R) : flags;
};

var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var defineBuiltIn$d = defineBuiltIn$i;
var anObject$r = anObject$z;
var $toString$2 = toString$r;
var fails$z = fails$U;
var getRegExpFlags$3 = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype$5 = RegExp.prototype;
var nativeToString = RegExpPrototype$5[TO_STRING];

var NOT_GENERIC = fails$z(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$d(RegExpPrototype$5, TO_STRING, function toString() {
    var R = anObject$r(this);
    var pattern = $toString$2(R.source);
    var flags = $toString$2(getRegExpFlags$3(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

// TODO: Remove from `core-js@4` since it's moved to entry points

var call$w = functionCall;
var defineBuiltIn$c = defineBuiltIn$i;
var regexpExec$1 = regexpExec$2;
var fails$y = fails$U;
var wellKnownSymbol$j = wellKnownSymbol$s;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$d;

var SPECIES$3 = wellKnownSymbol$j('species');
var RegExpPrototype$4 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$j(KEY);

  var DELEGATES_TO_SYMBOL = !fails$y(function () {
    // String methods call symbol-named RegExp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$y(function () {
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
      if ($exec === regexpExec$1 || $exec === RegExpPrototype$4.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: call$w(nativeRegExpMethod, regexp, str, arg2) };
        }
        return { done: true, value: call$w(nativeMethod, str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn$c(String.prototype, KEY, methods[0]);
    defineBuiltIn$c(RegExpPrototype$4, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$5(RegExpPrototype$4[SYMBOL], 'sham', true);
};

var uncurryThis$D = functionUncurryThis;
var toIntegerOrInfinity$8 = toIntegerOrInfinity$d;
var toString$m = toString$r;
var requireObjectCoercible$a = requireObjectCoercible$f;

var charAt$a = uncurryThis$D(''.charAt);
var charCodeAt$3 = uncurryThis$D(''.charCodeAt);
var stringSlice$a = uncurryThis$D(''.slice);

var createMethod$3 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$m(requireObjectCoercible$a($this));
    var position = toIntegerOrInfinity$8(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$3(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt$3(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$a(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$a(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$3(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$3(true)
};

var charAt$9 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$4 = function (S, index, unicode) {
  return index + (unicode ? charAt$9(S, index).length : 1);
};

var uncurryThis$C = functionUncurryThis;
var toObject$8 = toObject$d;

var floor$5 = Math.floor;
var charAt$8 = uncurryThis$C(''.charAt);
var replace$7 = uncurryThis$C(''.replace);
var stringSlice$9 = uncurryThis$C(''.slice);
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
    namedCaptures = toObject$8(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$7(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt$8(ch, 0)) {
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
          var f = floor$5(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt$8(ch, 1) : captures[f - 1] + charAt$8(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var call$v = functionCall;
var anObject$q = anObject$z;
var isCallable$h = isCallable$y;
var classof$c = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError$f = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$h(exec)) {
    var result = call$v(exec, R, S);
    if (result !== null) anObject$q(result);
    return result;
  }
  if (classof$c(R) === 'RegExp') return call$v(regexpExec, R, S);
  throw new $TypeError$f('RegExp#exec called on incompatible receiver');
};

var apply$4 = functionApply;
var call$u = functionCall;
var uncurryThis$B = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
var fails$x = fails$U;
var anObject$p = anObject$z;
var isCallable$g = isCallable$y;
var isNullOrUndefined$8 = isNullOrUndefined$c;
var toIntegerOrInfinity$7 = toIntegerOrInfinity$d;
var toLength$6 = toLength$b;
var toString$l = toString$r;
var requireObjectCoercible$9 = requireObjectCoercible$f;
var advanceStringIndex$3 = advanceStringIndex$4;
var getMethod$8 = getMethod$a;
var getSubstitution$1 = getSubstitution$2;
var regExpExec$4 = regexpExecAbstract;
var wellKnownSymbol$i = wellKnownSymbol$s;

var REPLACE$1 = wellKnownSymbol$i('replace');
var max$2 = Math.max;
var min$3 = Math.min;
var concat$1 = uncurryThis$B([].concat);
var push$a = uncurryThis$B([].push);
var stringIndexOf$3 = uncurryThis$B(''.indexOf);
var stringSlice$8 = uncurryThis$B(''.slice);

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

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$x(function () {
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
      var O = requireObjectCoercible$9(this);
      var replacer = isNullOrUndefined$8(searchValue) ? undefined : getMethod$8(searchValue, REPLACE$1);
      return replacer
        ? call$u(replacer, searchValue, O, replaceValue)
        : call$u(nativeReplace, toString$l(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$p(this);
      var S = toString$l(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf$3(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf$3(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable$g(replaceValue);
      if (!functionalReplace) replaceValue = toString$l(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];
      var result;
      while (true) {
        result = regExpExec$4(rx, S);
        if (result === null) break;

        push$a(results, result);
        if (!global) break;

        var matchStr = toString$l(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$3(S, toLength$6(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString$l(result[0]);
        var position = max$2(min$3(toIntegerOrInfinity$7(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push$a(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat$1([matched], captures, position, S);
          if (namedCaptures !== undefined) push$a(replacerArgs, namedCaptures);
          replacement = toString$l(apply$4(replaceValue, undefined, replacerArgs));
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

var wellKnownSymbol$h = wellKnownSymbol$s;

var ITERATOR$7 = wellKnownSymbol$h('iterator');
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
  iteratorWithReturn[ITERATOR$7] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
  try {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$7] = function () {
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
var DESCRIPTORS$k = descriptors;
var global$y = global$S;
var isCallable$f = isCallable$y;
var isObject$d = isObject$o;
var hasOwn$e = hasOwnProperty_1;
var classof$b = classof$i;
var tryToString$3 = tryToString$6;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$d;
var defineBuiltIn$b = defineBuiltIn$i;
var defineBuiltInAccessor$b = defineBuiltInAccessor$e;
var isPrototypeOf$4 = objectIsPrototypeOf;
var getPrototypeOf$1 = objectGetPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var wellKnownSymbol$g = wellKnownSymbol$s;
var uid$1 = uid$4;
var InternalStateModule$9 = internalState;

var enforceInternalState$3 = InternalStateModule$9.enforce;
var getInternalState$5 = InternalStateModule$9.get;
var Int8Array$4 = global$y.Int8Array;
var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
var Uint8ClampedArray$1 = global$y.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
var TypedArray$1 = Int8Array$4 && getPrototypeOf$1(Int8Array$4);
var TypedArrayPrototype$1 = Int8ArrayPrototype$1 && getPrototypeOf$1(Int8ArrayPrototype$1);
var ObjectPrototype = Object.prototype;
var TypeError$4 = global$y.TypeError;

var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$2 && classof$b(global$y.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

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
  if (!isObject$d(it)) return false;
  var klass = classof$b(it);
  return klass === 'DataView'
    || hasOwn$e(TypedArrayConstructorsList, klass)
    || hasOwn$e(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor$3 = function (it) {
  var proto = getPrototypeOf$1(it);
  if (!isObject$d(proto)) return;
  var state = getInternalState$5(proto);
  return (state && hasOwn$e(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$3(proto);
};

var isTypedArray$1 = function (it) {
  if (!isObject$d(it)) return false;
  var klass = classof$b(it);
  return hasOwn$e(TypedArrayConstructorsList, klass)
    || hasOwn$e(BigIntArrayConstructorsList, klass);
};

var aTypedArray$a = function (it) {
  if (isTypedArray$1(it)) return it;
  throw new TypeError$4('Target is not a typed array');
};

var aTypedArrayConstructor$1 = function (C) {
  if (isCallable$f(C) && (!setPrototypeOf$2 || isPrototypeOf$4(TypedArray$1, C))) return C;
  throw new TypeError$4(tryToString$3(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod$a = function (KEY, property, forced, options) {
  if (!DESCRIPTORS$k) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global$y[ARRAY];
    if (TypedArrayConstructor && hasOwn$e(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype$1[KEY] || forced) {
    defineBuiltIn$b(TypedArrayPrototype$1, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod$1 = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$k) return;
  if (setPrototypeOf$2) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$y[ARRAY];
      if (TypedArrayConstructor && hasOwn$e(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray$1[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn$b(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$y[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn$b(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global$y[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState$3(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global$y[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState$3(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$f(TypedArray$1) || TypedArray$1 === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray$1 = function TypedArray() {
    throw new TypeError$4('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$y[NAME]) setPrototypeOf$2(global$y[NAME], TypedArray$1);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype) {
  TypedArrayPrototype$1 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (global$y[NAME]) setPrototypeOf$2(global$y[NAME].prototype, TypedArrayPrototype$1);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf$1(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
  setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
}

if (DESCRIPTORS$k && !hasOwn$e(TypedArrayPrototype$1, TO_STRING_TAG$2)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor$b(TypedArrayPrototype$1, TO_STRING_TAG$2, {
    configurable: true,
    get: function () {
      return isObject$d(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (global$y[NAME]) {
    createNonEnumerableProperty$4(global$y[NAME], TYPED_ARRAY_TAG$1, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$a,
  aTypedArrayConstructor: aTypedArrayConstructor$1,
  exportTypedArrayMethod: exportTypedArrayMethod$a,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$1,
  getTypedArrayConstructor: getTypedArrayConstructor$3,
  isView: isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$1
};

/* eslint-disable no-new -- required for testing */
var global$x = global$S;
var fails$w = fails$U;
var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$3 = global$x.ArrayBuffer;
var Int8Array$3 = global$x.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$w(function () {
  Int8Array$3(1);
}) || !fails$w(function () {
  new Int8Array$3(-1);
}) || !checkCorrectnessOfIteration$2(function (iterable) {
  new Int8Array$3();
  new Int8Array$3(null);
  new Int8Array$3(1.5);
  new Int8Array$3(iterable);
}, true) || fails$w(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$3(new ArrayBuffer$3(2), 1, undefined).length !== 1;
});

var isObject$c = isObject$o;

var floor$4 = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
  return !isObject$c(it) && isFinite(it) && floor$4(it) === it;
};

var toIntegerOrInfinity$6 = toIntegerOrInfinity$d;

var $RangeError$7 = RangeError;

var toPositiveInteger$2 = function (it) {
  var result = toIntegerOrInfinity$6(it);
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

var uncurryThis$A = functionUncurryThisClause;
var aCallable$i = aCallable$l;
var NATIVE_BIND = functionBindNative;

var bind$a = uncurryThis$A(uncurryThis$A.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$i(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$a(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var classof$a = classof$i;
var getMethod$7 = getMethod$a;
var isNullOrUndefined$7 = isNullOrUndefined$c;
var Iterators$1 = iterators;
var wellKnownSymbol$f = wellKnownSymbol$s;

var ITERATOR$6 = wellKnownSymbol$f('iterator');

var getIteratorMethod$5 = function (it) {
  if (!isNullOrUndefined$7(it)) return getMethod$7(it, ITERATOR$6)
    || getMethod$7(it, '@@iterator')
    || Iterators$1[classof$a(it)];
};

var call$t = functionCall;
var aCallable$h = aCallable$l;
var anObject$o = anObject$z;
var tryToString$2 = tryToString$6;
var getIteratorMethod$4 = getIteratorMethod$5;

var $TypeError$e = TypeError;

var getIterator$4 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
  if (aCallable$h(iteratorMethod)) return anObject$o(call$t(iteratorMethod, argument));
  throw new $TypeError$e(tryToString$2(argument) + ' is not iterable');
};

var wellKnownSymbol$e = wellKnownSymbol$s;
var Iterators = iterators;

var ITERATOR$5 = wellKnownSymbol$e('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$3 = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$5] === it);
};

var classof$9 = classof$i;

var isBigIntArray$2 = function (it) {
  var klass = classof$9(it);
  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
};

var toPrimitive = toPrimitive$2;

var $TypeError$d = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
var toBigInt$3 = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw new $TypeError$d("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};

var bind$9 = functionBindContext;
var call$s = functionCall;
var aConstructor = aConstructor$2;
var toObject$7 = toObject$d;
var lengthOfArrayLike$d = lengthOfArrayLike$h;
var getIterator$3 = getIterator$4;
var getIteratorMethod$3 = getIteratorMethod$5;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
var isBigIntArray$1 = isBigIntArray$2;
var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
var toBigInt$2 = toBigInt$3;

var typedArrayFrom$2 = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject$7(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$3(O);
  var i, length, result, thisIsBigIntArray, value, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod$2(iteratorMethod)) {
    iterator = getIterator$3(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call$s(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind$9(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike$d(O);
  result = new (aTypedArrayConstructor(C))(length);
  thisIsBigIntArray = isBigIntArray$1(result);
  for (i = 0; length > i; i++) {
    value = mapping ? mapfn(O[i], i) : O[i];
    // FF30- typed arrays doesn't properly convert objects to typed array values
    result[i] = thisIsBigIntArray ? toBigInt$2(value) : +value;
  }
  return result;
};

var isArray$4 = isArray$6;
var isConstructor$1 = isConstructor$3;
var isObject$b = isObject$o;
var wellKnownSymbol$d = wellKnownSymbol$s;

var SPECIES$2 = wellKnownSymbol$d('species');
var $Array$1 = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$4(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor$1(C) && (C === $Array$1 || isArray$4(C.prototype))) C = undefined;
    else if (isObject$b(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array$1 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$8 = functionBindContext;
var uncurryThis$z = functionUncurryThis;
var IndexedObject$3 = indexedObject;
var toObject$6 = toObject$d;
var lengthOfArrayLike$c = lengthOfArrayLike$h;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push$9 = uncurryThis$z([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$6($this);
    var self = IndexedObject$3(O);
    var length = lengthOfArrayLike$c(self);
    var boundFunction = bind$8(callbackfn, that);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
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
          case 2: push$9(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$9(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$2(7)
};

var getBuiltIn$b = getBuiltIn$h;
var defineBuiltInAccessor$a = defineBuiltInAccessor$e;
var wellKnownSymbol$c = wellKnownSymbol$s;
var DESCRIPTORS$j = descriptors;

var SPECIES$1 = wellKnownSymbol$c('species');

var setSpecies$4 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$b(CONSTRUCTOR_NAME);

  if (DESCRIPTORS$j && Constructor && !Constructor[SPECIES$1]) {
    defineBuiltInAccessor$a(Constructor, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var lengthOfArrayLike$b = lengthOfArrayLike$h;

var arrayFromConstructorAndList$2 = function (Constructor, list, $length) {
  var index = 0;
  var length = arguments.length > 2 ? $length : lengthOfArrayLike$b(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var $$Y = _export;
var global$w = global$S;
var call$r = functionCall;
var DESCRIPTORS$i = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$a = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance$8 = anInstance$a;
var createPropertyDescriptor$4 = createPropertyDescriptor$9;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$d;
var isIntegralNumber = isIntegralNumber$1;
var toLength$5 = toLength$b;
var toIndex = toIndex$3;
var toOffset$1 = toOffset$2;
var toUint8Clamped = toUint8Clamped$1;
var toPropertyKey = toPropertyKey$3;
var hasOwn$d = hasOwnProperty_1;
var classof$8 = classof$i;
var isObject$a = isObject$o;
var isSymbol$1 = isSymbol$4;
var create$4 = objectCreate;
var isPrototypeOf$3 = objectIsPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var typedArrayFrom$1 = typedArrayFrom$2;
var forEach$3 = arrayIteration.forEach;
var setSpecies$3 = setSpecies$4;
var defineBuiltInAccessor$9 = defineBuiltInAccessor$e;
var definePropertyModule$1 = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$2;
var InternalStateModule$8 = internalState;
var inheritIfRequired$3 = inheritIfRequired$6;

var getInternalState$4 = InternalStateModule$8.get;
var setInternalState$8 = InternalStateModule$8.set;
var enforceInternalState$2 = InternalStateModule$8.enforce;
var nativeDefineProperty = definePropertyModule$1.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var RangeError$2 = global$w.RangeError;
var ArrayBuffer$2 = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer$2.prototype;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$a.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$a.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$a.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore$a.TypedArrayPrototype;
var isTypedArray = ArrayBufferViewCore$a.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var addGetter = function (it, key) {
  defineBuiltInAccessor$9(it, key, {
    configurable: true,
    get: function () {
      return getInternalState$4(this)[key];
    }
  });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf$3(ArrayBufferPrototype, it) || (klass = classof$8(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol$1(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor$4(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject$a(descriptor)
    && hasOwn$d(descriptor, 'value')
    && !hasOwn$d(descriptor, 'get')
    && !hasOwn$d(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwn$d(descriptor, 'writable') || descriptor.writable)
    && (!hasOwn$d(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS$i) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule$1.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $$Y({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global$w[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState$4(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState$4(that);
      data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
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
        anInstance$8(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject$a(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$2(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw new RangeError$2(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw new RangeError$2(WRONG_LENGTH);
          } else {
            byteLength = toLength$5($length) * BYTES;
            if (byteLength + byteOffset > $len) throw new RangeError$2(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return arrayFromConstructorAndList$1(TypedArrayConstructor, data);
        } else {
          return call$r(typedArrayFrom$1, TypedArrayConstructor, data);
        }
        setInternalState$8(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView$1(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$4(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance$8(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired$3(function () {
          if (!isObject$a(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return arrayFromConstructorAndList$1(TypedArrayConstructor, data);
          return call$r(typedArrayFrom$1, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf$1) setPrototypeOf$1(TypedArrayConstructor, TypedArray);
      forEach$3(getOwnPropertyNames$1(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty$3(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    enforceInternalState$2(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $$Y({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty$3(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies$3(CONSTRUCTOR_NAME);
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

var ArrayBufferViewCore$9 = arrayBufferViewCore;
var lengthOfArrayLike$a = lengthOfArrayLike$h;
var toIntegerOrInfinity$5 = toIntegerOrInfinity$d;

var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
var exportTypedArrayMethod$9 = ArrayBufferViewCore$9.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
exportTypedArrayMethod$9('at', function at(index) {
  var O = aTypedArray$9(this);
  var len = lengthOfArrayLike$a(O);
  var relativeIndex = toIntegerOrInfinity$5(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});

var ArrayBufferViewCore$8 = arrayBufferViewCore;
var $fill = arrayFill$1;
var toBigInt$1 = toBigInt$3;
var classof$7 = classof$i;
var call$q = functionCall;
var uncurryThis$y = functionUncurryThis;
var fails$v = fails$U;

var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
var exportTypedArrayMethod$8 = ArrayBufferViewCore$8.exportTypedArrayMethod;
var slice$3 = uncurryThis$y(''.slice);

// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
var CONVERSION_BUG = fails$v(function () {
  var count = 0;
  // eslint-disable-next-line es/no-typed-arrays -- safe
  new Int8Array(2).fill({ valueOf: function () { return count++; } });
  return count !== 1;
});

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod$8('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  aTypedArray$8(this);
  var actualValue = slice$3(classof$7(this), 0, 3) === 'Big' ? toBigInt$1(value) : +value;
  return call$q($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
}, CONVERSION_BUG);

var bind$7 = functionBindContext;
var IndexedObject$2 = indexedObject;
var toObject$5 = toObject$d;
var lengthOfArrayLike$9 = lengthOfArrayLike$h;

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE === 1;
  return function ($this, callbackfn, that) {
    var O = toObject$5($this);
    var self = IndexedObject$2(O);
    var index = lengthOfArrayLike$9(self);
    var boundFunction = bind$7(callbackfn, that);
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
  findLast: createMethod$1(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod$1(1)
};

var ArrayBufferViewCore$7 = arrayBufferViewCore;
var $findLast = arrayIterationFromLast.findLast;

var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
var exportTypedArrayMethod$7 = ArrayBufferViewCore$7.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
exportTypedArrayMethod$7('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray$7(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$6 = arrayBufferViewCore;
var $findLastIndex = arrayIterationFromLast.findLastIndex;

var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
var exportTypedArrayMethod$6 = ArrayBufferViewCore$6.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
exportTypedArrayMethod$6('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var global$v = global$S;
var call$p = functionCall;
var ArrayBufferViewCore$5 = arrayBufferViewCore;
var lengthOfArrayLike$8 = lengthOfArrayLike$h;
var toOffset = toOffset$2;
var toIndexedObject$1 = toObject$d;
var fails$u = fails$U;

var RangeError$1 = global$v.RangeError;
var Int8Array$2 = global$v.Int8Array;
var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
var exportTypedArrayMethod$5 = ArrayBufferViewCore$5.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$u(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call$p($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$5.NATIVE_ARRAY_BUFFER_VIEWS && fails$u(function () {
  var array = new Int8Array$2(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$5('set', function set(arrayLike /* , offset */) {
  aTypedArray$5(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject$1(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$p($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike$8(src);
  var index = 0;
  if (len + offset > length) throw new RangeError$1('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

var arraySlice$6 = arraySlice$8;

var floor$3 = Math.floor;

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
    var middle = floor$3(length / 2);
    var left = sort$1(arraySlice$6(array, 0, middle), comparefn);
    var right = sort$1(arraySlice$6(array, middle), comparefn);
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

var global$u = global$S;
var uncurryThis$x = functionUncurryThisClause;
var fails$t = fails$U;
var aCallable$g = aCallable$l;
var internalSort$1 = arraySort$1;
var ArrayBufferViewCore$4 = arrayBufferViewCore;
var FF$1 = engineFfVersion;
var IE_OR_EDGE$1 = engineIsIeOrEdge;
var V8$1 = engineV8Version;
var WEBKIT$1 = engineWebkitVersion;

var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
var exportTypedArrayMethod$4 = ArrayBufferViewCore$4.exportTypedArrayMethod;
var Uint16Array = global$u.Uint16Array;
var nativeSort$1 = Uint16Array && uncurryThis$x(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort$1 && !(fails$t(function () {
  nativeSort$1(new Uint16Array(2), null);
}) && fails$t(function () {
  nativeSort$1(new Uint16Array(2), {});
}));

var STABLE_SORT$1 = !!nativeSort$1 && !fails$t(function () {
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
exportTypedArrayMethod$4('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable$g(comparefn);
  if (STABLE_SORT$1) return nativeSort$1(this, comparefn);

  return internalSort$1(aTypedArray$4(this), getSortCompare$1(comparefn));
}, !STABLE_SORT$1 || ACCEPT_INCORRECT_ARGUMENTS);

var global$t = global$S;
var apply$3 = functionApply;
var ArrayBufferViewCore$3 = arrayBufferViewCore;
var fails$s = fails$U;
var arraySlice$5 = arraySlice$8;

var Int8Array$1 = global$t.Int8Array;
var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$s(function () {
  $toLocaleString.call(new Int8Array$1(1));
});

var FORCED$9 = fails$s(function () {
  return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
}) || !fails$s(function () {
  Int8Array$1.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod$3('toLocaleString', function toLocaleString() {
  return apply$3(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice$5(aTypedArray$3(this)) : aTypedArray$3(this),
    arraySlice$5(arguments)
  );
}, FORCED$9);

var lengthOfArrayLike$7 = lengthOfArrayLike$h;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
var arrayToReversed$1 = function (O, C) {
  var len = lengthOfArrayLike$7(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};

var arrayToReversed = arrayToReversed$1;
var ArrayBufferViewCore$2 = arrayBufferViewCore;

var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod;
var getTypedArrayConstructor$2 = ArrayBufferViewCore$2.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
exportTypedArrayMethod$2('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray$2(this), getTypedArrayConstructor$2(this));
});

var ArrayBufferViewCore$1 = arrayBufferViewCore;
var uncurryThis$w = functionUncurryThis;
var aCallable$f = aCallable$l;
var arrayFromConstructorAndList = arrayFromConstructorAndList$2;

var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var getTypedArrayConstructor$1 = ArrayBufferViewCore$1.getTypedArrayConstructor;
var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
var sort = uncurryThis$w(ArrayBufferViewCore$1.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
exportTypedArrayMethod$1('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable$f(compareFn);
  var O = aTypedArray$1(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor$1(O), O);
  return sort(A, compareFn);
});

var lengthOfArrayLike$6 = lengthOfArrayLike$h;
var toIntegerOrInfinity$4 = toIntegerOrInfinity$d;

var $RangeError$5 = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
var arrayWith$1 = function (O, C, index, value) {
  var len = lengthOfArrayLike$6(O);
  var relativeIndex = toIntegerOrInfinity$4(index);
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
var toIntegerOrInfinity$3 = toIntegerOrInfinity$d;
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
  var relativeIndex = toIntegerOrInfinity$3(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER);

var $$X = _export;
var DESCRIPTORS$h = descriptors;
var global$s = global$S;
var uncurryThis$v = functionUncurryThis;
var hasOwn$c = hasOwnProperty_1;
var isCallable$e = isCallable$y;
var isPrototypeOf$2 = objectIsPrototypeOf;
var toString$k = toString$r;
var defineBuiltInAccessor$8 = defineBuiltInAccessor$e;
var copyConstructorProperties = copyConstructorProperties$4;

var NativeSymbol = global$s.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS$h && isCallable$e(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$k(arguments[0]);
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

  var NATIVE_SYMBOL$2 = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
  var thisSymbolValue = uncurryThis$v(SymbolPrototype.valueOf);
  var symbolDescriptiveString = uncurryThis$v(SymbolPrototype.toString);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace$6 = uncurryThis$v(''.replace);
  var stringSlice$7 = uncurryThis$v(''.slice);

  defineBuiltInAccessor$8(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = thisSymbolValue(this);
      if (hasOwn$c(EmptyStringDescriptionStore, symbol)) return '';
      var string = symbolDescriptiveString(symbol);
      var desc = NATIVE_SYMBOL$2 ? stringSlice$7(string, 7, -1) : replace$6(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $$X({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

var DESCRIPTORS$g = descriptors;
var uncurryThis$u = functionUncurryThis;
var call$o = functionCall;
var fails$r = fails$U;
var objectKeys = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$4 = toObject$d;
var IndexedObject$1 = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$5 = Object.defineProperty;
var concat = uncurryThis$u([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$r(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$g && $assign({ b: 1 }, $assign(defineProperty$5({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$5(this, 'b', {
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
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$4(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject$1(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$g || call$o(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$W = _export;
var assign$1 = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$W({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
  assign: assign$1
});

var isObject$9 = isObject$o;
var classof$6 = classofRaw$2;
var wellKnownSymbol$b = wellKnownSymbol$s;

var MATCH$2 = wellKnownSymbol$b('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$9(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$6(it) === 'RegExp');
};

var DESCRIPTORS$f = descriptors;
var global$r = global$S;
var uncurryThis$t = functionUncurryThis;
var isForced$2 = isForced_1;
var inheritIfRequired$2 = inheritIfRequired$6;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$d;
var create$3 = objectCreate;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var isPrototypeOf$1 = objectIsPrototypeOf;
var isRegExp$3 = isRegexp;
var toString$j = toString$r;
var getRegExpFlags$2 = regexpGetFlags;
var stickyHelpers$1 = regexpStickyHelpers;
var proxyAccessor = proxyAccessor$2;
var defineBuiltIn$a = defineBuiltIn$i;
var fails$q = fails$U;
var hasOwn$b = hasOwnProperty_1;
var enforceInternalState$1 = internalState.enforce;
var setSpecies$2 = setSpecies$4;
var wellKnownSymbol$a = wellKnownSymbol$s;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var MATCH$1 = wellKnownSymbol$a('match');
var NativeRegExp = global$r.RegExp;
var RegExpPrototype$3 = NativeRegExp.prototype;
var SyntaxError$2 = global$r.SyntaxError;
var exec$6 = uncurryThis$t(RegExpPrototype$3.exec);
var charAt$7 = uncurryThis$t(''.charAt);
var replace$5 = uncurryThis$t(''.replace);
var stringIndexOf$2 = uncurryThis$t(''.indexOf);
var stringSlice$6 = uncurryThis$t(''.slice);
// TODO: Use only proper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers$1.MISSED_STICKY;
var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS$f &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG || fails$q(function () {
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
  var names = create$3(null);
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
        if (exec$6(IS_NCG, stringSlice$6(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn$b(names, groupname)) {
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
    var thisIsRegExp = isPrototypeOf$1(RegExpPrototype$3, this);
    var patternIsRegExp = isRegExp$3(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf$1(RegExpPrototype$3, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags$2(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString$j(pattern);
    flags = flags === undefined ? '' : toString$j(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf$2(flags, 's') > -1;
      if (dotAll) flags = replace$5(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf$2(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y$1) flags = replace$5(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);

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
      createNonEnumerableProperty$2(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys$1 = getOwnPropertyNames(NativeRegExp), index = 0; keys$1.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys$1[index++]);
  }

  RegExpPrototype$3.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$3;
  defineBuiltIn$a(global$r, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies$2('RegExp');

var DESCRIPTORS$e = descriptors;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var classof$5 = classofRaw$2;
var defineBuiltInAccessor$7 = defineBuiltInAccessor$e;
var getInternalState$3 = internalState.get;

var RegExpPrototype$2 = RegExp.prototype;
var $TypeError$c = TypeError;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS$e && UNSUPPORTED_DOT_ALL) {
  defineBuiltInAccessor$7(RegExpPrototype$2, 'dotAll', {
    configurable: true,
    get: function dotAll() {
      if (this === RegExpPrototype$2) return;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof$5(this) === 'RegExp') {
        return !!getInternalState$3(this).dotAll;
      }
      throw new $TypeError$c('Incompatible receiver, RegExp required');
    }
  });
}

// TODO: Remove from `core-js@4` since it's moved to entry points

var $$V = _export;
var call$n = functionCall;
var isCallable$d = isCallable$y;
var anObject$n = anObject$z;
var toString$i = toString$r;

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
$$V({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (S) {
    var R = anObject$n(this);
    var string = toString$i(S);
    var exec = R.exec;
    if (!isCallable$d(exec)) return call$n(nativeTest, R, string);
    var result = call$n(exec, R, string);
    if (result === null) return false;
    anObject$n(result);
    return true;
  }
});

var DESCRIPTORS$d = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$9;

var createProperty$4 = function (object, key, value) {
  if (DESCRIPTORS$d) definePropertyModule.f(object, key, createPropertyDescriptor$3(0, value));
  else object[key] = value;
};

var $$U = _export;
var global$q = global$S;
var anInstance$7 = anInstance$a;
var anObject$m = anObject$z;
var isCallable$c = isCallable$y;
var getPrototypeOf = objectGetPrototypeOf;
var defineBuiltInAccessor$6 = defineBuiltInAccessor$e;
var createProperty$3 = createProperty$4;
var fails$p = fails$U;
var hasOwn$a = hasOwnProperty_1;
var wellKnownSymbol$9 = wellKnownSymbol$s;
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var DESCRIPTORS$c = descriptors;

var CONSTRUCTOR = 'constructor';
var ITERATOR$4 = 'Iterator';
var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');

var $TypeError$b = TypeError;
var NativeIterator = global$q[ITERATOR$4];

// FF56- have non-standard global helper `Iterator`
var FORCED$8 = !isCallable$c(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype$1
  // FF44- non-standard `Iterator` passes previous tests
  || !fails$p(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance$7(this, IteratorPrototype$1);
  if (getPrototypeOf(this) === IteratorPrototype$1) throw new $TypeError$b('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS$c) {
    defineBuiltInAccessor$6(IteratorPrototype$1, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject$m(this);
        if (this === IteratorPrototype$1) throw new $TypeError$b("You can't redefine this property");
        if (hasOwn$a(this, key)) this[key] = replacement;
        else createProperty$3(this, key, replacement);
      }
    });
  } else IteratorPrototype$1[key] = value;
};

if (!hasOwn$a(IteratorPrototype$1, TO_STRING_TAG$1)) defineIteratorPrototypeAccessor(TO_STRING_TAG$1, ITERATOR$4);

if (FORCED$8 || !hasOwn$a(IteratorPrototype$1, CONSTRUCTOR) || IteratorPrototype$1[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype$1;

// `Iterator` constructor
// https://github.com/tc39/proposal-iterator-helpers
$$U({ global: true, constructor: true, forced: FORCED$8 }, {
  Iterator: IteratorConstructor
});

var call$m = functionCall;
var anObject$l = anObject$z;
var getMethod$6 = getMethod$a;

var iteratorClose$5 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$l(iterator);
  try {
    innerResult = getMethod$6(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$m(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$l(innerResult);
  return value;
};

var bind$6 = functionBindContext;
var call$l = functionCall;
var anObject$k = anObject$z;
var tryToString$1 = tryToString$6;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
var lengthOfArrayLike$5 = lengthOfArrayLike$h;
var isPrototypeOf = objectIsPrototypeOf;
var getIterator$2 = getIterator$4;
var getIteratorMethod$2 = getIteratorMethod$5;
var iteratorClose$4 = iteratorClose$5;

var $TypeError$a = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$d = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$6(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$4(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$k(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$2(iterable);
    if (!iterFn) throw new $TypeError$a(tryToString$1(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$1(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$5(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator$2(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$l(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$4(iterator, 'throw', error);
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

var $$T = _export;
var iterate$c = iterate$d;
var aCallable$e = aCallable$l;
var anObject$j = anObject$z;
var getIteratorDirect$9 = getIteratorDirect$a;

// `Iterator.prototype.forEach` method
// https://github.com/tc39/proposal-iterator-helpers
$$T({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject$j(this);
    aCallable$e(fn);
    var record = getIteratorDirect$9(this);
    var counter = 0;
    iterate$c(record, function (value) {
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
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var global$p = global$S;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$d;
var setToStringTag$6 = setToStringTag$a;
var wellKnownSymbol$8 = wellKnownSymbol$s;

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
    setToStringTag$6(CollectionPrototype, COLLECTION_NAME, true);
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
  handlePrototype(global$p[COLLECTION_NAME] && global$p[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var $$S = _export;
var $includes = arrayIncludes.includes;
var fails$o = fails$U;
var addToUnscopables = addToUnscopables$2;

// FF99+ bug
var BROKEN_ON_SPARSE = fails$o(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$S({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var aCallable$d = aCallable$l;
var toObject$3 = toObject$d;
var IndexedObject = indexedObject;
var lengthOfArrayLike$4 = lengthOfArrayLike$h;

var $TypeError$9 = TypeError;

var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    var O = toObject$3(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike$4(O);
    aCallable$d(callbackfn);
    if (length === 0 && argumentsLength < 2) throw new $TypeError$9(REDUCE_EMPTY);
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
        throw new $TypeError$9(REDUCE_EMPTY);
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
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

var fails$n = fails$U;

var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$n(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var $$R = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;
var CHROME_VERSION$1 = engineV8Version;
var IS_NODE$4 = engineIsNode;

// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG$1 = !IS_NODE$4 && CHROME_VERSION$1 > 79 && CHROME_VERSION$1 < 83;
var FORCED$7 = CHROME_BUG$1 || !arrayMethodIsStrict$2('reduce');

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$R({ target: 'Array', proto: true, forced: FORCED$7 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

var tryToString = tryToString$6;

var $TypeError$8 = TypeError;

var deletePropertyOrThrow$2 = function (O, P) {
  if (!delete O[P]) throw new $TypeError$8('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

var $$Q = _export;
var toObject$2 = toObject$d;
var lengthOfArrayLike$3 = lengthOfArrayLike$h;
var setArrayLength = arraySetLength;
var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;

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

var FORCED$6 = INCORRECT_RESULT || !properErrorOnNonWritableLength();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$$Q({ target: 'Array', proto: true, arity: 1, forced: FORCED$6 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject$2(this);
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

var $$P = _export;
var global$o = global$S;
var arrayBufferModule = arrayBuffer;
var setSpecies$1 = setSpecies$4;

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global$o[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor
$$P({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$1 }, {
  ArrayBuffer: ArrayBuffer$1
});

setSpecies$1(ARRAY_BUFFER);

var $$O = _export;
var global$n = global$S;

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$$O({ global: true, forced: global$n.globalThis !== global$n }, {
  globalThis: global$n
});

var uncurryThis$s = functionUncurryThis;
var isArray$3 = isArray$6;
var isCallable$b = isCallable$y;
var classof$4 = classofRaw$2;
var toString$h = toString$r;

var push$8 = uncurryThis$s([].push);

var getJsonReplacerFunction = function (replacer) {
  if (isCallable$b(replacer)) return replacer;
  if (!isArray$3(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push$8(keys, element);
    else if (typeof element == 'number' || classof$4(element) === 'Number' || classof$4(element) === 'String') push$8(keys, toString$h(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray$3(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};

var $$N = _export;
var getBuiltIn$a = getBuiltIn$h;
var apply$2 = functionApply;
var call$k = functionCall;
var uncurryThis$r = functionUncurryThis;
var fails$m = fails$U;
var isCallable$a = isCallable$y;
var isSymbol = isSymbol$4;
var arraySlice$4 = arraySlice$8;
var getReplacerFunction = getJsonReplacerFunction;
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var $String$1 = String;
var $stringify = getBuiltIn$a('JSON', 'stringify');
var exec$5 = uncurryThis$r(/./.exec);
var charAt$6 = uncurryThis$r(''.charAt);
var charCodeAt$2 = uncurryThis$r(''.charCodeAt);
var replace$4 = uncurryThis$r(''.replace);
var numberToString$1 = uncurryThis$r(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$1 || fails$m(function () {
  var symbol = getBuiltIn$a('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails$m(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice$4(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable$a($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable$a($replacer)) value = call$k($replacer, this, $String$1(key), value);
    if (!isSymbol(value)) return value;
  };
  return apply$2($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt$6(string, offset - 1);
  var next = charAt$6(string, offset + 1);
  if ((exec$5(low, match) && !exec$5(hi, next)) || (exec$5(hi, match) && !exec$5(low, prev))) {
    return '\\u' + numberToString$1(charCodeAt$2(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $$N({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice$4(arguments);
      var result = apply$2(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$4(result, tester, fixIllFormed) : result;
    }
  });
}

var $TypeError$7 = TypeError;

var validateArgumentsLength$9 = function (passed, required) {
  if (passed < required) throw new $TypeError$7('Not enough arguments');
  return passed;
};

var userAgent$2 = engineUserAgent;

// eslint-disable-next-line redos/no-vulnerable -- safe
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$m = global$S;
var apply$1 = functionApply;
var bind$5 = functionBindContext;
var isCallable$9 = isCallable$y;
var hasOwn$9 = hasOwnProperty_1;
var fails$l = fails$U;
var html = html$2;
var arraySlice$3 = arraySlice$8;
var createElement = documentCreateElement$2;
var validateArgumentsLength$8 = validateArgumentsLength$9;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var set = global$m.setImmediate;
var clear = global$m.clearImmediate;
var process$2 = global$m.process;
var Dispatch = global$m.Dispatch;
var Function$2 = global$m.Function;
var MessageChannel = global$m.MessageChannel;
var String$1 = global$m.String;
var counter = 0;
var queue$2 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails$l(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global$m.location;
});

var run = function (id) {
  if (hasOwn$9(queue$2, id)) {
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
  global$m.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength$8(arguments.length, 1);
    var fn = isCallable$9(handler) ? handler : Function$2(handler);
    var args = arraySlice$3(arguments, 1);
    queue$2[++counter] = function () {
      apply$1(fn, undefined, args);
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
    defer = bind$5(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$m.addEventListener &&
    isCallable$9(global$m.postMessage) &&
    !global$m.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$l(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    global$m.addEventListener('message', eventListener, false);
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

var global$l = global$S;
var DESCRIPTORS$b = descriptors;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn$2 = function (name) {
  if (!DESCRIPTORS$b) return global$l[name];
  var descriptor = getOwnPropertyDescriptor$3(global$l, name);
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

var global$k = global$S;
var safeGetBuiltIn$1 = safeGetBuiltIn$2;
var bind$4 = functionBindContext;
var macrotask = task$1.set;
var Queue$1 = queue$1;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver = global$k.MutationObserver || global$k.WebKitMutationObserver;
var document$2 = global$k.document;
var process$1 = global$k.process;
var Promise$1 = global$k.Promise;
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
    then = bind$4(promise.then, promise);
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
    macrotask = bind$4(macrotask, global$k);
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

var global$j = global$S;

var promiseNativeConstructor = global$j.Promise;

var global$i = global$S;
var NativePromiseConstructor$4 = promiseNativeConstructor;
var isCallable$8 = isCallable$y;
var isForced$1 = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$7 = wellKnownSymbol$s;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$4 && NativePromiseConstructor$4.prototype;
var SPECIES = wellKnownSymbol$7('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$8(global$i.PromiseRejectionEvent);

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

var aCallable$c = aCallable$l;

var $TypeError$6 = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError$6('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$c(resolve);
  this.reject = aCallable$c(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$M = _export;
var IS_NODE$1 = engineIsNode;
var global$h = global$S;
var call$j = functionCall;
var defineBuiltIn$9 = defineBuiltIn$i;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$5 = setToStringTag$a;
var setSpecies = setSpecies$4;
var aCallable$b = aCallable$l;
var isCallable$7 = isCallable$y;
var isObject$8 = isObject$o;
var anInstance$6 = anInstance$a;
var speciesConstructor$3 = speciesConstructor$5;
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
var TypeError$3 = global$h.TypeError;
var document$1 = global$h.document;
var process = global$h.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$h.dispatchEvent);
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
  return isObject$8(it) && isCallable$7(then = it.then) ? then : false;
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
        call$j(then, result, resolve, reject);
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
    global$h.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$h['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$j(task, global$h, function () {
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
  call$j(task, global$h, function () {
    var promise = state.facade;
    if (IS_NODE$1) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$3 = function (fn, state, unwrap) {
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
          call$j(then, value,
            bind$3(internalResolve, wrapper, state),
            bind$3(internalReject, wrapper, state)
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
    anInstance$6(this, PromisePrototype);
    aCallable$b(executor);
    call$j(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$3(internalResolve, state), bind$3(internalReject, state));
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
    this.resolve = bind$3(internalResolve, state);
    this.reject = bind$3(internalReject, state);
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
          call$j(nativeThen, that, resolve, reject);
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

$$M({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag$5(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var NativePromiseConstructor$2 = promiseNativeConstructor;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
  NativePromiseConstructor$2.all(iterable).then(undefined, function () { /* empty */ });
});

var $$L = _export;
var call$i = functionCall;
var aCallable$a = aCallable$l;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$b = iterate$d;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$L({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$a(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$b(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$i($promiseResolve, C, promise).then(function (value) {
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

var $$K = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor$1 = promiseNativeConstructor;
var getBuiltIn$9 = getBuiltIn$h;
var isCallable$6 = isCallable$y;
var defineBuiltIn$8 = defineBuiltIn$i;

var NativePromisePrototype$1 = NativePromiseConstructor$1 && NativePromiseConstructor$1.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$K({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$6(NativePromiseConstructor$1)) {
  var method$1 = getBuiltIn$9('Promise').prototype['catch'];
  if (NativePromisePrototype$1['catch'] !== method$1) {
    defineBuiltIn$8(NativePromisePrototype$1, 'catch', method$1, { unsafe: true });
  }
}

var $$J = _export;
var call$h = functionCall;
var aCallable$9 = aCallable$l;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate$a = iterate$d;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$J({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable$9(C.resolve);
      iterate$a(iterable, function (promise) {
        call$h($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$I = _export;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$I({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    var capabilityReject = capability.reject;
    capabilityReject(r);
    return capability.promise;
  }
});

var anObject$i = anObject$z;
var isObject$7 = isObject$o;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$2 = function (C, x) {
  anObject$i(C);
  if (isObject$7(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$H = _export;
var getBuiltIn$8 = getBuiltIn$h;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve$1 = promiseResolve$2;

getBuiltIn$8('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$H({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
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

var wellKnownSymbol$6 = wellKnownSymbol$s;

var MATCH = wellKnownSymbol$6('match');

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

var $$G = _export;
var uncurryThis$q = functionUncurryThisClause;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var toLength$4 = toLength$b;
var toString$g = toString$r;
var notARegExp$2 = notARegexp;
var requireObjectCoercible$8 = requireObjectCoercible$f;
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
$$G({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString$g(requireObjectCoercible$8(this));
    notARegExp$2(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min$2(toLength$4(endPosition), len);
    var search = toString$g(searchString);
    return slice$2(that, end - search.length, end) === search;
  }
});

var call$g = functionCall;
var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var anObject$h = anObject$z;
var isNullOrUndefined$6 = isNullOrUndefined$c;
var toLength$3 = toLength$b;
var toString$f = toString$r;
var requireObjectCoercible$7 = requireObjectCoercible$f;
var getMethod$5 = getMethod$a;
var advanceStringIndex$2 = advanceStringIndex$4;
var regExpExec$3 = regexpExecAbstract;

// @@match logic
fixRegExpWellKnownSymbolLogic$2('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible$7(this);
      var matcher = isNullOrUndefined$6(regexp) ? undefined : getMethod$5(regexp, MATCH);
      return matcher ? call$g(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$f(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$h(this);
      var S = toString$f(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec$3(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$3(rx, S)) !== null) {
        var matchStr = toString$f(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$3(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

/* eslint-disable es/no-string-prototype-matchall -- safe */
var $$F = _export;
var call$f = functionCall;
var uncurryThis$p = functionUncurryThisClause;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var createIterResultObject$3 = createIterResultObject$5;
var requireObjectCoercible$6 = requireObjectCoercible$f;
var toLength$2 = toLength$b;
var toString$e = toString$r;
var anObject$g = anObject$z;
var isNullOrUndefined$5 = isNullOrUndefined$c;
var classof$3 = classofRaw$2;
var isRegExp$1 = isRegexp;
var getRegExpFlags$1 = regexpGetFlags;
var getMethod$4 = getMethod$a;
var defineBuiltIn$7 = defineBuiltIn$i;
var fails$k = fails$U;
var wellKnownSymbol$5 = wellKnownSymbol$s;
var speciesConstructor$2 = speciesConstructor$5;
var advanceStringIndex$1 = advanceStringIndex$4;
var regExpExec$2 = regexpExecAbstract;
var InternalStateModule$6 = internalState;
var IS_PURE$4 = isPure;

var MATCH_ALL = wellKnownSymbol$5('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState$6 = InternalStateModule$6.set;
var getInternalState$2 = InternalStateModule$6.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype$1 = RegExp.prototype;
var $TypeError$4 = TypeError;
var stringIndexOf$1 = uncurryThis$p(''.indexOf);
var nativeMatchAll = uncurryThis$p(''.matchAll);

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails$k(function () {
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
  var state = getInternalState$2(this);
  if (state.done) return createIterResultObject$3(undefined, true);
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec$2(R, S);
  if (match === null) {
    state.done = true;
    return createIterResultObject$3(undefined, true);
  }
  if (state.global) {
    if (toString$e(match[0]) === '') R.lastIndex = advanceStringIndex$1(S, toLength$2(R.lastIndex), state.unicode);
    return createIterResultObject$3(match, false);
  }
  state.done = true;
  return createIterResultObject$3(match, false);
});

var $matchAll = function (string) {
  var R = anObject$g(this);
  var S = toString$e(string);
  var C = speciesConstructor$2(R, RegExp);
  var flags = toString$e(getRegExpFlags$1(R));
  var matcher, $global, fullUnicode;
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf$1(flags, 'g');
  fullUnicode = !!~stringIndexOf$1(flags, 'u');
  matcher.lastIndex = toLength$2(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall
$$F({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible$6(this);
    var flags, S, matcher, rx;
    if (!isNullOrUndefined$5(regexp)) {
      if (isRegExp$1(regexp)) {
        flags = toString$e(requireObjectCoercible$6(getRegExpFlags$1(regexp)));
        if (!~stringIndexOf$1(flags, 'g')) throw new $TypeError$4('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
      matcher = getMethod$4(regexp, MATCH_ALL);
      if (matcher === undefined && IS_PURE$4 && classof$3(regexp) === 'RegExp') matcher = $matchAll;
      if (matcher) return call$f(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
    S = toString$e(O);
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

var call$e = functionCall;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var anObject$f = anObject$z;
var isNullOrUndefined$4 = isNullOrUndefined$c;
var requireObjectCoercible$5 = requireObjectCoercible$f;
var sameValue = sameValue$1;
var toString$d = toString$r;
var getMethod$3 = getMethod$a;
var regExpExec$1 = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$5(this);
      var searcher = isNullOrUndefined$4(regexp) ? undefined : getMethod$3(regexp, SEARCH);
      return searcher ? call$e(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$d(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject$f(this);
      var S = toString$d(string);
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

var call$d = functionCall;
var uncurryThis$o = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject$e = anObject$z;
var isNullOrUndefined$3 = isNullOrUndefined$c;
var requireObjectCoercible$4 = requireObjectCoercible$f;
var speciesConstructor$1 = speciesConstructor$5;
var advanceStringIndex = advanceStringIndex$4;
var toLength$1 = toLength$b;
var toString$c = toString$r;
var getMethod$2 = getMethod$a;
var regExpExec = regexpExecAbstract;
var stickyHelpers = regexpStickyHelpers;
var fails$j = fails$U;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min$1 = Math.min;
var push$7 = uncurryThis$o([].push);
var stringSlice$5 = uncurryThis$o(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$j(function () {
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
    return separator === undefined && limit === 0 ? [] : call$d(nativeSplit, this, separator, limit);
  } : nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$4(this);
      var splitter = isNullOrUndefined$3(separator) ? undefined : getMethod$2(separator, SPLIT);
      return splitter
        ? call$d(splitter, separator, O, limit)
        : call$d(internalSplit, toString$c(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject$e(this);
      var S = toString$c(string);

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
          push$7(A, stringSlice$5(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push$7(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push$7(A, stringSlice$5(S, p));
      return A;
    }
  ];
}, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

var PROPER_FUNCTION_NAME = functionName.PROPER;
var fails$i = fails$U;
var whitespaces$2 = whitespaces$5;

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails$i(function () {
    return !!whitespaces$2[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces$2[METHOD_NAME].name !== METHOD_NAME);
  });
};

var $$E = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced;

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$$E({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
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

var call$c = functionCall;
var create$2 = objectCreate;
var createNonEnumerableProperty = createNonEnumerableProperty$d;
var defineBuiltIns$3 = defineBuiltIns$5;
var wellKnownSymbol$4 = wellKnownSymbol$s;
var InternalStateModule$5 = internalState;
var getMethod$1 = getMethod$a;
var IteratorPrototype = iteratorsCore.IteratorPrototype;
var createIterResultObject$2 = createIterResultObject$5;
var iteratorClose$3 = iteratorClose$5;

var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState$5 = InternalStateModule$5.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule$5.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns$3(create$2(IteratorPrototype), {
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
        return returnMethod ? call$c(returnMethod, iterator) : createIterResultObject$2(undefined, true);
      }
      if (state.inner) try {
        iteratorClose$3(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose$3(iterator, 'throw', error);
      }
      iteratorClose$3(iterator, 'normal');
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

var $$D = _export;
var call$b = functionCall;
var anObject$d = anObject$z;
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
    result = anObject$d(call$b(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
  }
  result = anObject$d(call$b(next, iterator));
  done = this.done = !!result.done;
  if (!done) return result.value;
});

// `Iterator.prototype.drop` method
// https://github.com/tc39/proposal-iterator-helpers
$$D({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$3 }, {
  drop: function drop(limit) {
    anObject$d(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new IteratorProxy$2(getIteratorDirect$8(this), {
      remaining: remaining
    });
  }
});

var anObject$c = anObject$z;
var iteratorClose$2 = iteratorClose$5;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$3 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$c(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose$2(iterator, 'throw', error);
  }
};

var $$C = _export;
var call$a = functionCall;
var aCallable$8 = aCallable$l;
var anObject$b = anObject$z;
var getIteratorDirect$7 = getIteratorDirect$a;
var createIteratorProxy$1 = iteratorCreateProxy;
var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$3;
var IS_PURE$2 = isPure;

var IteratorProxy$1 = createIteratorProxy$1(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject$b(call$a(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing$2(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://github.com/tc39/proposal-iterator-helpers
$$C({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$2 }, {
  filter: function filter(predicate) {
    anObject$b(this);
    aCallable$8(predicate);
    return new IteratorProxy$1(getIteratorDirect$7(this), {
      predicate: predicate
    });
  }
});

var call$9 = functionCall;
var aCallable$7 = aCallable$l;
var anObject$a = anObject$z;
var getIteratorDirect$6 = getIteratorDirect$a;
var createIteratorProxy = iteratorCreateProxy;
var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$3;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject$a(call$9(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing$1(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
var iteratorMap = function map(mapper) {
  anObject$a(this);
  aCallable$7(mapper);
  return new IteratorProxy(getIteratorDirect$6(this), {
    mapper: mapper
  });
};

var $$B = _export;
var map = iteratorMap;
var IS_PURE$1 = isPure;

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
$$B({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$1 }, {
  map: map
});

var $$A = _export;
var iterate$9 = iterate$d;
var aCallable$6 = aCallable$l;
var anObject$9 = anObject$z;
var getIteratorDirect$5 = getIteratorDirect$a;

var $TypeError$3 = TypeError;

// `Iterator.prototype.reduce` method
// https://github.com/tc39/proposal-iterator-helpers
$$A({ target: 'Iterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject$9(this);
    aCallable$6(reducer);
    var record = getIteratorDirect$5(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;
    iterate$9(record, function (value) {
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

var $$z = _export;
var iterate$8 = iterate$d;
var aCallable$5 = aCallable$l;
var anObject$8 = anObject$z;
var getIteratorDirect$4 = getIteratorDirect$a;

// `Iterator.prototype.some` method
// https://github.com/tc39/proposal-iterator-helpers
$$z({ target: 'Iterator', proto: true, real: true }, {
  some: function some(predicate) {
    anObject$8(this);
    aCallable$5(predicate);
    var record = getIteratorDirect$4(this);
    var counter = 0;
    return iterate$8(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

var $$y = _export;
var anObject$7 = anObject$z;
var iterate$7 = iterate$d;
var getIteratorDirect$3 = getIteratorDirect$a;

var push$6 = [].push;

// `Iterator.prototype.toArray` method
// https://github.com/tc39/proposal-iterator-helpers
$$y({ target: 'Iterator', proto: true, real: true }, {
  toArray: function toArray() {
    var result = [];
    iterate$7(getIteratorDirect$3(anObject$7(this)), push$6, { that: result, IS_RECORD: true });
    return result;
  }
});

var uncurryThis$n = functionUncurryThis;
var hasOwn$8 = hasOwnProperty_1;

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode$2 = String.fromCharCode;
var at$1 = uncurryThis$n(''.charAt);
var slice$1 = uncurryThis$n(''.slice);
var exec$4 = uncurryThis$n(/./.exec);

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
      if (hasOwn$8(codePoints, twoChars)) {
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

var $$x = _export;
var DESCRIPTORS$a = descriptors;
var global$g = global$S;
var getBuiltIn$7 = getBuiltIn$h;
var uncurryThis$m = functionUncurryThis;
var call$8 = functionCall;
var isCallable$5 = isCallable$y;
var isObject$6 = isObject$o;
var isArray$2 = isArray$6;
var hasOwn$7 = hasOwnProperty_1;
var toString$b = toString$r;
var lengthOfArrayLike$2 = lengthOfArrayLike$h;
var createProperty$2 = createProperty$4;
var fails$h = fails$U;
var parseJSONString = parseJsonString;
var NATIVE_SYMBOL = symbolConstructorDetection;

var JSON = global$g.JSON;
var Number$1 = global$g.Number;
var SyntaxError$1 = global$g.SyntaxError;
var nativeParse = JSON && JSON.parse;
var enumerableOwnProperties = getBuiltIn$7('Object', 'keys');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var at = uncurryThis$m(''.charAt);
var slice = uncurryThis$m(''.slice);
var exec$3 = uncurryThis$m(/./.exec);
var push$5 = uncurryThis$m([].push);

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
  if (isObject$6(val)) {
    var nodeIsArray = isArray$2(val);
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
        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn$7(nodes, P) ? nodes[P] : undefined));
      }
    }
  }
  return call$8(reviver, holder, name, val, context);
};

var internalizeProperty = function (object, key, value) {
  if (DESCRIPTORS$a) {
    var descriptor = getOwnPropertyDescriptor$1(object, key);
    if (descriptor && !descriptor.configurable) return;
  }
  if (value === undefined) delete object[key];
  else createProperty$2(object, key, value);
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
      createProperty$2(nodes, key, result);
      createProperty$2(object, key, result.value);
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
      push$5(nodes, result);
      push$5(array, result.value);
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
$$x({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
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

var $$w = _export;
var global$f = global$S;
var getBuiltIn$6 = getBuiltIn$h;
var uncurryThis$l = functionUncurryThis;
var call$7 = functionCall;
var fails$g = fails$U;
var toString$a = toString$r;
var validateArgumentsLength$7 = validateArgumentsLength$9;
var i2c = base64Map.i2c;

var $btoa = getBuiltIn$6('btoa');
var charAt$5 = uncurryThis$l(''.charAt);
var charCodeAt$1 = uncurryThis$l(''.charCodeAt);

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
$$w({ global: true, bind: true, enumerable: true, forced: !BASIC$1 || NO_ARG_RECEIVING_CHECK$1 || WRONG_ARG_CONVERSION || WRONG_ARITY$2 }, {
  btoa: function btoa(data) {
    validateArgumentsLength$7(arguments.length, 1);
    // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
    if (BASIC$1) return call$7($btoa, global$f, toString$a(data));
    var string = toString$a(data);
    var output = '';
    var position = 0;
    var map = i2c;
    var block, charCode;
    while (charAt$5(string, position) || (map = '=', position % 1)) {
      charCode = charCodeAt$1(string, position += 3 / 4);
      if (charCode > 0xFF) {
        throw new (getBuiltIn$6('DOMException'))('The string contains characters outside of the Latin1 range', 'InvalidCharacterError');
      }
      block = block << 8 | charCode;
      output += charAt$5(map, 63 & block >> 8 - position % 1 * 8);
    } return output;
  }
});

var DESCRIPTORS$9 = descriptors;
var fails$f = fails$U;
var anObject$6 = anObject$z;
var normalizeStringArgument$2 = normalizeStringArgument$4;

var nativeErrorToString = Error.prototype.toString;

var INCORRECT_TO_STRING$1 = fails$f(function () {
  if (DESCRIPTORS$9) {
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

var errorToString$1 = INCORRECT_TO_STRING$1 ? function toString() {
  var O = anObject$6(this);
  var name = normalizeStringArgument$2(O.name, 'Error');
  var message = normalizeStringArgument$2(O.message);
  return !name ? message : !message ? name : name + ': ' + message;
} : nativeErrorToString;

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

var $$v = _export;
var tryNodeRequire = tryNodeRequire$2;
var getBuiltIn$5 = getBuiltIn$h;
var fails$e = fails$U;
var create$1 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$9;
var defineProperty$4 = objectDefineProperty.f;
var defineBuiltIn$6 = defineBuiltIn$i;
var defineBuiltInAccessor$5 = defineBuiltInAccessor$e;
var hasOwn$6 = hasOwnProperty_1;
var anInstance$5 = anInstance$a;
var anObject$5 = anObject$z;
var errorToString = errorToString$1;
var normalizeStringArgument$1 = normalizeStringArgument$4;
var DOMExceptionConstants$1 = domExceptionConstants;
var clearErrorStack$1 = errorStackClear;
var InternalStateModule$4 = internalState;
var DESCRIPTORS$8 = descriptors;

var DOM_EXCEPTION$2 = 'DOMException';
var DATA_CLONE_ERR = 'DATA_CLONE_ERR';
var Error$2 = getBuiltIn$5('Error');
// NodeJS < 17.0 does not expose `DOMException` to global
var NativeDOMException$1 = getBuiltIn$5(DOM_EXCEPTION$2) || (function () {
  try {
    // NodeJS < 15.0 does not expose `MessageChannel` to global
    var MessageChannel = getBuiltIn$5('MessageChannel') || tryNodeRequire('worker_threads').MessageChannel;
    // eslint-disable-next-line es/no-weak-map, unicorn/require-post-message-target-origin -- safe
    new MessageChannel().port1.postMessage(new WeakMap());
  } catch (error) {
    if (error.name === DATA_CLONE_ERR && error.code === 25) return error.constructor;
  }
})();
var NativeDOMExceptionPrototype = NativeDOMException$1 && NativeDOMException$1.prototype;
var ErrorPrototype = Error$2.prototype;
var setInternalState$4 = InternalStateModule$4.set;
var getInternalState$1 = InternalStateModule$4.getterFor(DOM_EXCEPTION$2);
var HAS_STACK = 'stack' in new Error$2(DOM_EXCEPTION$2);

var codeFor = function (name) {
  return hasOwn$6(DOMExceptionConstants$1, name) && DOMExceptionConstants$1[name].m ? DOMExceptionConstants$1[name].c : 0;
};

var $DOMException$1 = function DOMException() {
  anInstance$5(this, DOMExceptionPrototype$1);
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
  if (!DESCRIPTORS$8) {
    this.name = name;
    this.message = message;
    this.code = code;
  }
  if (HAS_STACK) {
    var error = new Error$2(message);
    error.name = DOM_EXCEPTION$2;
    defineProperty$4(this, 'stack', createPropertyDescriptor$2(1, clearErrorStack$1(error.stack, 1)));
  }
};

var DOMExceptionPrototype$1 = $DOMException$1.prototype = create$1(ErrorPrototype);

var createGetterDescriptor = function (get) {
  return { enumerable: true, configurable: true, get: get };
};

var getterFor = function (key) {
  return createGetterDescriptor(function () {
    return getInternalState$1(this)[key];
  });
};

if (DESCRIPTORS$8) {
  // `DOMException.prototype.code` getter
  defineBuiltInAccessor$5(DOMExceptionPrototype$1, 'code', getterFor('code'));
  // `DOMException.prototype.message` getter
  defineBuiltInAccessor$5(DOMExceptionPrototype$1, 'message', getterFor('message'));
  // `DOMException.prototype.name` getter
  defineBuiltInAccessor$5(DOMExceptionPrototype$1, 'name', getterFor('name'));
}

defineProperty$4(DOMExceptionPrototype$1, 'constructor', createPropertyDescriptor$2(1, $DOMException$1));

// FF36- DOMException is a function, but can't be constructed
var INCORRECT_CONSTRUCTOR = fails$e(function () {
  return !(new NativeDOMException$1() instanceof Error$2);
});

// Safari 10.1 / Chrome 32- / IE8- DOMException.prototype.toString bugs
var INCORRECT_TO_STRING = INCORRECT_CONSTRUCTOR || fails$e(function () {
  return ErrorPrototype.toString !== errorToString || String(new NativeDOMException$1(1, 2)) !== '2: 1';
});

// Deno 1.6.3- DOMException.prototype.code just missed
var INCORRECT_CODE = INCORRECT_CONSTRUCTOR || fails$e(function () {
  return new NativeDOMException$1(1, 'DataCloneError').code !== 25;
});

// Deno 1.6.3- DOMException constants just missed
INCORRECT_CONSTRUCTOR
  || NativeDOMException$1[DATA_CLONE_ERR] !== 25
  || NativeDOMExceptionPrototype[DATA_CLONE_ERR] !== 25;

var FORCED_CONSTRUCTOR$1 = INCORRECT_CONSTRUCTOR;

// `DOMException` constructor
// https://webidl.spec.whatwg.org/#idl-DOMException
$$v({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR$1 }, {
  DOMException: FORCED_CONSTRUCTOR$1 ? $DOMException$1 : NativeDOMException$1
});

var PolyfilledDOMException$1 = getBuiltIn$5(DOM_EXCEPTION$2);
var PolyfilledDOMExceptionPrototype$1 = PolyfilledDOMException$1.prototype;

if (INCORRECT_TO_STRING && (NativeDOMException$1 === PolyfilledDOMException$1)) {
  defineBuiltIn$6(PolyfilledDOMExceptionPrototype$1, 'toString', errorToString);
}

if (INCORRECT_CODE && DESCRIPTORS$8 && NativeDOMException$1 === PolyfilledDOMException$1) {
  defineBuiltInAccessor$5(PolyfilledDOMExceptionPrototype$1, 'code', createGetterDescriptor(function () {
    return codeFor(anObject$5(this).name);
  }));
}

// `DOMException` constants
for (var key$1 in DOMExceptionConstants$1) if (hasOwn$6(DOMExceptionConstants$1, key$1)) {
  var constant$1 = DOMExceptionConstants$1[key$1];
  var constantName$1 = constant$1.s;
  var descriptor$2 = createPropertyDescriptor$2(6, constant$1.c);
  if (!hasOwn$6(PolyfilledDOMException$1, constantName$1)) {
    defineProperty$4(PolyfilledDOMException$1, constantName$1, descriptor$2);
  }
  if (!hasOwn$6(PolyfilledDOMExceptionPrototype$1, constantName$1)) {
    defineProperty$4(PolyfilledDOMExceptionPrototype$1, constantName$1, descriptor$2);
  }
}

var $$u = _export;
var global$e = global$S;
var getBuiltIn$4 = getBuiltIn$h;
var createPropertyDescriptor$1 = createPropertyDescriptor$9;
var defineProperty$3 = objectDefineProperty.f;
var hasOwn$5 = hasOwnProperty_1;
var anInstance$4 = anInstance$a;
var inheritIfRequired$1 = inheritIfRequired$6;
var normalizeStringArgument = normalizeStringArgument$4;
var DOMExceptionConstants = domExceptionConstants;
var clearErrorStack = errorStackClear;
var DESCRIPTORS$7 = descriptors;

var DOM_EXCEPTION$1 = 'DOMException';
var Error$1 = getBuiltIn$4('Error');
var NativeDOMException = getBuiltIn$4(DOM_EXCEPTION$1);

var $DOMException = function DOMException() {
  anInstance$4(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = new Error$1(message);
  error.name = DOM_EXCEPTION$1;
  defineProperty$3(that, 'stack', createPropertyDescriptor$1(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired$1(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in new Error$1(DOM_EXCEPTION$1);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var descriptor$1 = NativeDOMException && DESCRIPTORS$7 && Object.getOwnPropertyDescriptor(global$e, DOM_EXCEPTION$1);

// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
// https://github.com/Jarred-Sumner/bun/issues/399
var BUGGY_DESCRIPTOR = !!descriptor$1 && !(descriptor$1.writable && descriptor$1.configurable);

var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$$u({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn$4(DOM_EXCEPTION$1);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  {
    defineProperty$3(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor$1(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn$5(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn$5(PolyfilledDOMException, constantName)) {
      defineProperty$3(PolyfilledDOMException, constantName, createPropertyDescriptor$1(6, constant.c));
    }
  }
}

var getBuiltIn$3 = getBuiltIn$h;
var setToStringTag$4 = setToStringTag$a;

var DOM_EXCEPTION = 'DOMException';

// `DOMException.prototype[@@toStringTag]` property
setToStringTag$4(getBuiltIn$3(DOM_EXCEPTION), DOM_EXCEPTION);

var $$t = _export;
var global$d = global$S;
var defineBuiltInAccessor$4 = defineBuiltInAccessor$e;
var DESCRIPTORS$6 = descriptors;

var $TypeError$2 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$2 = Object.defineProperty;
var INCORRECT_VALUE = global$d.self !== global$d;

// `self` getter
// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
try {
  if (DESCRIPTORS$6) {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var descriptor = Object.getOwnPropertyDescriptor(global$d, 'self');
    // some engines have `self`, but with incorrect descriptor
    // https://github.com/denoland/deno/issues/15765
    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
      defineBuiltInAccessor$4(global$d, 'self', {
        get: function self() {
          return global$d;
        },
        set: function self(value) {
          if (this !== global$d) throw new $TypeError$2('Illegal invocation');
          defineProperty$2(global$d, 'self', {
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
  } else $$t({ global: true, simple: true, forced: INCORRECT_VALUE }, {
    self: global$d
  });
} catch (error) { /* empty */ }

var fails$d = fails$U;
var wellKnownSymbol$3 = wellKnownSymbol$s;
var DESCRIPTORS$5 = descriptors;
var IS_PURE = isPure;

var ITERATOR$2 = wellKnownSymbol$3('iterator');

var urlConstructorDetection = !fails$d(function () {
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
    || (!params.size && (IS_PURE || !DESCRIPTORS$5))
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

var $$s = _export;
var global$c = global$S;
var safeGetBuiltIn = safeGetBuiltIn$2;
var call$6 = functionCall;
var uncurryThis$k = functionUncurryThis;
var DESCRIPTORS$4 = descriptors;
var USE_NATIVE_URL$1 = urlConstructorDetection;
var defineBuiltIn$5 = defineBuiltIn$i;
var defineBuiltInAccessor$3 = defineBuiltInAccessor$e;
var defineBuiltIns$2 = defineBuiltIns$5;
var setToStringTag$3 = setToStringTag$a;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule$3 = internalState;
var anInstance$3 = anInstance$a;
var isCallable$4 = isCallable$y;
var hasOwn$4 = hasOwnProperty_1;
var bind$2 = functionBindContext;
var classof$2 = classof$i;
var anObject$4 = anObject$z;
var isObject$5 = isObject$o;
var $toString$1 = toString$r;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$9;
var getIterator$1 = getIterator$4;
var getIteratorMethod$1 = getIteratorMethod$5;
var createIterResultObject$1 = createIterResultObject$5;
var validateArgumentsLength$6 = validateArgumentsLength$9;
var wellKnownSymbol$2 = wellKnownSymbol$s;
var arraySort = arraySort$1;

var ITERATOR$1 = wellKnownSymbol$2('iterator');
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
var RegExp$2 = global$c.RegExp;
var TypeError$2 = global$c.TypeError;
var decodeURIComponent = global$c.decodeURIComponent;
var encodeURIComponent$1 = global$c.encodeURIComponent;
var charAt$4 = uncurryThis$k(''.charAt);
var join$2 = uncurryThis$k([].join);
var push$4 = uncurryThis$k([].push);
var replace$3 = uncurryThis$k(''.replace);
var shift$1 = uncurryThis$k([].shift);
var splice$1 = uncurryThis$k([].splice);
var split$2 = uncurryThis$k(''.split);
var stringSlice$4 = uncurryThis$k(''.slice);

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
    if (isObject$5(init)) this.parseObject(init);
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
    var iteratorMethod = getIteratorMethod$1(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator$1(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call$6(next, iterator)).done) {
        entryIterator = getIterator$1(anObject$4(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call$6(entryNext, entryIterator)).done ||
          (second = call$6(entryNext, entryIterator)).done ||
          !call$6(entryNext, entryIterator).done
        ) throw new TypeError$2('Expected sequence with length 2');
        push$4(entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
      }
    } else for (var key in object) if (hasOwn$4(object, key)) {
      push$4(entries, { key: key, value: $toString$1(object[key]) });
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
          push$4(entries, {
            key: deserialize(shift$1(entry)),
            value: deserialize(join$2(entry, '='))
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
      push$4(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join$2(result, '&');
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
  anInstance$3(this, URLSearchParamsPrototype$3);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var state = setInternalState$3(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS$4) this.size = state.entries.length;
};

var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;

defineBuiltIns$2(URLSearchParamsPrototype$3, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$6(arguments.length, 2);
    push$4(state.entries, { key: $toString$1(name), value: $toString$1(value) });
    if (!DESCRIPTORS$4) this.length++;
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
    if (!DESCRIPTORS$4) this.size = entries.length;
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
      if (entries[index].key === key) push$4(result, entries[index].value);
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
    if (!found) push$4(entries, { key: key, value: val });
    if (!DESCRIPTORS$4) this.size = entries.length;
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
    var boundFunction = bind$2(callback, arguments.length > 1 ? arguments[1] : undefined);
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
if (DESCRIPTORS$4) defineBuiltInAccessor$3(URLSearchParamsPrototype$3, 'size', {
  get: function size() {
    return getInternalParamsState(this).entries.length;
  },
  configurable: true,
  enumerable: true
});

setToStringTag$3(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$s({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL$1 && isCallable$4(Headers)) {
  var headersHas = uncurryThis$k(HeadersPrototype.has);
  var headersSet = uncurryThis$k(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject$5(init)) {
      var body = init.body;
      var headers;
      if (classof$2(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable$4(nativeFetch)) {
    $$s({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable$4(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance$3(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$s({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

var web_urlSearchParams_constructor = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

var defineBuiltIn$4 = defineBuiltIn$i;
var uncurryThis$j = functionUncurryThis;
var toString$9 = toString$r;
var validateArgumentsLength$5 = validateArgumentsLength$9;

var $URLSearchParams$1 = URLSearchParams;
var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
var append = uncurryThis$j(URLSearchParamsPrototype$2.append);
var $delete = uncurryThis$j(URLSearchParamsPrototype$2['delete']);
var forEach$2 = uncurryThis$j(URLSearchParamsPrototype$2.forEach);
var push$3 = uncurryThis$j([].push);
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
      push$3(entries, { key: k, value: v });
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

var defineBuiltIn$3 = defineBuiltIn$i;
var uncurryThis$i = functionUncurryThis;
var toString$8 = toString$r;
var validateArgumentsLength$4 = validateArgumentsLength$9;

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
var getAll = uncurryThis$i(URLSearchParamsPrototype$1.getAll);
var $has = uncurryThis$i(URLSearchParamsPrototype$1.has);
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

var DESCRIPTORS$3 = descriptors;
var uncurryThis$h = functionUncurryThis;
var defineBuiltInAccessor$2 = defineBuiltInAccessor$e;

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach$1 = uncurryThis$h(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS$3 && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor$2(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach$1(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}

var $$r = _export;
var $reduceRight = arrayReduce.right;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
var FORCED$5 = CHROME_BUG || !arrayMethodIsStrict$1('reduceRight');

// `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright
$$r({ target: 'Array', proto: true, forced: FORCED$5 }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$q = _export;
var uncurryThis$g = functionUncurryThis;
var isArray$1 = isArray$6;

var nativeReverse = uncurryThis$g([].reverse);
var test$1 = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$$q({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray$1(this)) this.length = this.length;
    return nativeReverse(this);
  }
});

var $$p = _export;
var uncurryThis$f = functionUncurryThis;
var aCallable$4 = aCallable$l;
var toObject$1 = toObject$d;
var lengthOfArrayLike$1 = lengthOfArrayLike$h;
var deletePropertyOrThrow = deletePropertyOrThrow$2;
var toString$7 = toString$r;
var fails$c = fails$U;
var internalSort = arraySort$1;
var arrayMethodIsStrict = arrayMethodIsStrict$3;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;

var test = [];
var nativeSort = uncurryThis$f(test.sort);
var push$2 = uncurryThis$f(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails$c(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails$c(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails$c(function () {
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

var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

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
$$p({ target: 'Array', proto: true, forced: FORCED$4 }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable$4(comparefn);

    var array = toObject$1(this);

    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike$1(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push$2(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = lengthOfArrayLike$1(items);
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow(array, index++);

    return array;
  }
});

var $$o = _export;
var iterate$6 = iterate$d;
var createProperty$1 = createProperty$4;

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$$o({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate$6(iterable, function (k, v) {
      createProperty$1(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});

var global$b = global$S;
var fails$b = fails$U;
var uncurryThis$e = functionUncurryThis;
var toString$6 = toString$r;
var trim = stringTrim.trim;
var whitespaces$1 = whitespaces$5;

var charAt$3 = uncurryThis$e(''.charAt);
var $parseFloat$1 = global$b.parseFloat;
var Symbol$1 = global$b.Symbol;
var ITERATOR = Symbol$1 && Symbol$1.iterator;
var FORCED$3 = 1 / $parseFloat$1(whitespaces$1 + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails$b(function () { $parseFloat$1(Object(ITERATOR)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
var numberParseFloat = FORCED$3 ? function parseFloat(string) {
  var trimmedString = trim(toString$6(string));
  var result = $parseFloat$1(trimmedString);
  return result === 0 && charAt$3(trimmedString, 0) === '-' ? -0 : result;
} : $parseFloat$1;

var $$n = _export;
var $parseFloat = numberParseFloat;

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$$n({ global: true, forced: parseFloat !== $parseFloat }, {
  parseFloat: $parseFloat
});

var $$m = _export;
var NativePromiseConstructor = promiseNativeConstructor;
var fails$a = fails$U;
var getBuiltIn$2 = getBuiltIn$h;
var isCallable$3 = isCallable$y;
var speciesConstructor = speciesConstructor$5;
var promiseResolve = promiseResolve$2;
var defineBuiltIn$2 = defineBuiltIn$i;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromiseConstructor && fails$a(function () {
  // eslint-disable-next-line unicorn/no-thenable -- required for testing
  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$$m({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn$2('Promise'));
    var isFunction = isCallable$3(onFinally);
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
if (isCallable$3(NativePromiseConstructor)) {
  var method = getBuiltIn$2('Promise').prototype['finally'];
  if (NativePromisePrototype['finally'] !== method) {
    defineBuiltIn$2(NativePromisePrototype, 'finally', method, { unsafe: true });
  }
}

var $$l = _export;
var global$a = global$S;
var setToStringTag$2 = setToStringTag$a;

$$l({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag$2(global$a.Reflect, 'Reflect', true);

var global$9 = global$S;
var DESCRIPTORS$2 = descriptors;
var defineBuiltInAccessor$1 = defineBuiltInAccessor$e;
var regExpFlags = regexpFlags$1;
var fails$9 = fails$U;

// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp$1 = global$9.RegExp;
var RegExpPrototype = RegExp$1.prototype;

var FORCED$2 = DESCRIPTORS$2 && fails$9(function () {
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
if (FORCED$2) defineBuiltInAccessor$1(RegExpPrototype, 'flags', {
  configurable: true,
  get: regExpFlags
});

var $$k = _export;
var uncurryThis$d = functionUncurryThis;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$3 = requireObjectCoercible$f;
var toString$5 = toString$r;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;

var stringIndexOf = uncurryThis$d(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$k({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString$5(requireObjectCoercible$3(this)),
      toString$5(notARegExp$1(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

var $$j = _export;
var uncurryThis$c = functionUncurryThisClause;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var toLength = toLength$b;
var toString$4 = toString$r;
var notARegExp = notARegexp;
var requireObjectCoercible$2 = requireObjectCoercible$f;
var correctIsRegExpLogic = correctIsRegexpLogic;

var stringSlice$3 = uncurryThis$c(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$$j({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString$4(requireObjectCoercible$2(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString$4(searchString);
    return stringSlice$3(that, index, index + search.length) === search;
  }
});

var fails$8 = fails$U;

var freezing = !fails$8(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = {exports: {}};

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof$1 = classofRaw$2;
var toIndexedObject = toIndexedObject$7;
var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
var arraySlice$2 = arraySlice$8;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice$2(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof$1(it) === 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails$7 = fails$U;

var arrayBufferNonExtensible = fails$7(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

var fails$6 = fails$U;
var isObject$4 = isObject$o;
var classof = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails$6(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
var objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject$4(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

var $$i = _export;
var uncurryThis$b = functionUncurryThis;
var hiddenKeys = hiddenKeys$5;
var isObject$3 = isObject$o;
var hasOwn$3 = hasOwnProperty_1;
var defineProperty$1 = objectDefineProperty.f;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
var isExtensible$1 = objectIsExtensible;
var uid = uid$4;
var FREEZING$1 = freezing;

var REQUIRED = false;
var METADATA = uid('meta');
var id$1 = 0;

var setMetadata = function (it) {
  defineProperty$1(it, METADATA, { value: {
    objectID: 'O' + id$1++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject$3(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn$3(it, METADATA)) {
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
  if (!hasOwn$3(it, METADATA)) {
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
var onFreeze = function (it) {
  if (FREEZING$1 && REQUIRED && isExtensible$1(it) && !hasOwn$3(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis$b([].splice);
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

    $$i({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = internalMetadata.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData$1,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

var internalMetadataExports = internalMetadata.exports;

var $$h = _export;
var global$8 = global$S;
var uncurryThis$a = functionUncurryThis;
var isForced = isForced_1;
var defineBuiltIn$1 = defineBuiltIn$i;
var InternalMetadataModule$1 = internalMetadataExports;
var iterate$5 = iterate$d;
var anInstance$2 = anInstance$a;
var isCallable$2 = isCallable$y;
var isNullOrUndefined$2 = isNullOrUndefined$c;
var isObject$2 = isObject$o;
var fails$5 = fails$U;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;
var setToStringTag$1 = setToStringTag$a;
var inheritIfRequired = inheritIfRequired$6;

var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global$8[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis$a(NativePrototype[KEY]);
    defineBuiltIn$1(NativePrototype, KEY,
      KEY === 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY === 'delete' ? function (key) {
        return IS_WEAK && !isObject$2(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY === 'get' ? function get(key) {
        return IS_WEAK && !isObject$2(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY === 'has' ? function has(key) {
        return IS_WEAK && !isObject$2(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable$2(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$5(function () {
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
    var THROWS_ON_PRIMITIVES = fails$5(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails$5(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$2(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (!isNullOrUndefined$2(iterable)) iterate$5(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
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
  $$h({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

  setToStringTag$1(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var uncurryThis$9 = functionUncurryThis;
var defineBuiltIns$1 = defineBuiltIns$5;
var getWeakData = internalMetadataExports.getWeakData;
var anInstance$1 = anInstance$a;
var anObject$3 = anObject$z;
var isNullOrUndefined$1 = isNullOrUndefined$c;
var isObject$1 = isObject$o;
var iterate$4 = iterate$d;
var ArrayIterationModule = arrayIteration;
var hasOwn$2 = hasOwnProperty_1;
var InternalStateModule$2 = internalState;

var setInternalState$2 = InternalStateModule$2.set;
var internalStateGetterFor = InternalStateModule$2.getterFor;
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

var collectionWeak$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance$1(that, Prototype);
      setInternalState$2(that, {
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
      var data = getWeakData(anObject$3(key), true);
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
        return data && hasOwn$2(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject$1(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn$2(data, state.id);
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
var global$7 = global$S;
var uncurryThis$8 = functionUncurryThis;
var defineBuiltIns = defineBuiltIns$5;
var InternalMetadataModule = internalMetadataExports;
var collection = collection$1;
var collectionWeak = collectionWeak$1;
var isObject = isObject$o;
var enforceInternalState = internalState.enforce;
var fails$4 = fails$U;
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

var IS_IE11 = !global$7.ActiveXObject && 'ActiveXObject' in global$7;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis$8(WeakMapPrototype.set);

// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
var hasMSEdgeFreezingBug = function () {
  return FREEZING && fails$4(function () {
    var frozenArray = freeze([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen(frozenArray);
  });
};

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP) if (IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
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

var $$g = _export;
var iterate$3 = iterate$d;
var aCallable$3 = aCallable$l;
var anObject$2 = anObject$z;
var getIteratorDirect$2 = getIteratorDirect$a;

// `Iterator.prototype.every` method
// https://github.com/tc39/proposal-iterator-helpers
$$g({ target: 'Iterator', proto: true, real: true }, {
  every: function every(predicate) {
    anObject$2(this);
    aCallable$3(predicate);
    var record = getIteratorDirect$2(this);
    var counter = 0;
    return !iterate$3(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

var $$f = _export;
var iterate$2 = iterate$d;
var aCallable$2 = aCallable$l;
var anObject$1 = anObject$z;
var getIteratorDirect$1 = getIteratorDirect$a;

// `Iterator.prototype.find` method
// https://github.com/tc39/proposal-iterator-helpers
$$f({ target: 'Iterator', proto: true, real: true }, {
  find: function find(predicate) {
    anObject$1(this);
    aCallable$2(predicate);
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

var call$5 = functionCall;

var iterateSimple$7 = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call$5(next, iterator)).done) {
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

var aCallable$1 = aCallable$l;
var anObject = anObject$z;
var call$4 = functionCall;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$d;
var getIteratorDirect = getIteratorDirect$a;

var INVALID_SIZE = 'Invalid size';
var $RangeError$3 = RangeError;
var $TypeError$1 = TypeError;
var max$1 = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max$1(intSize, 0);
  this.has = aCallable$1(set.has);
  this.keys = aCallable$1(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject(call$4(this.keys, this.set)));
  },
  includes: function (it) {
    return call$4(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
var getSetRecord$7 = function (obj) {
  anObject(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError$1(INVALID_SIZE);
  var intSize = toIntegerOrInfinity$2(numSize);
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

var getBuiltIn$1 = getBuiltIn$h;

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

var $$e = _export;
var difference = setDifference;
var setMethodAcceptSetLike$6 = setMethodAcceptSetLike$7;

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
$$e({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$6('difference') }, {
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

var $$d = _export;
var fails$3 = fails$U;
var intersection = setIntersection;
var setMethodAcceptSetLike$5 = setMethodAcceptSetLike$7;

var INCORRECT = !setMethodAcceptSetLike$5('intersection') || fails$3(function () {
  // eslint-disable-next-line es/no-array-from, es/no-set -- testing
  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
});

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
$$d({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
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

var $$c = _export;
var isDisjointFrom = setIsDisjointFrom;
var setMethodAcceptSetLike$4 = setMethodAcceptSetLike$7;

// `Set.prototype.isDisjointFrom` method
// https://github.com/tc39/proposal-set-methods
$$c({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$4('isDisjointFrom') }, {
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

var $$b = _export;
var isSubsetOf = setIsSubsetOf;
var setMethodAcceptSetLike$3 = setMethodAcceptSetLike$7;

// `Set.prototype.isSubsetOf` method
// https://github.com/tc39/proposal-set-methods
$$b({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$3('isSubsetOf') }, {
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

var $$a = _export;
var isSupersetOf = setIsSupersetOf;
var setMethodAcceptSetLike$2 = setMethodAcceptSetLike$7;

// `Set.prototype.isSupersetOf` method
// https://github.com/tc39/proposal-set-methods
$$a({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$2('isSupersetOf') }, {
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

var $$9 = _export;
var symmetricDifference = setSymmetricDifference;
var setMethodAcceptSetLike$1 = setMethodAcceptSetLike$7;

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
$$9({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$1('symmetricDifference') }, {
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

var $$8 = _export;
var union = setUnion;
var setMethodAcceptSetLike = setMethodAcceptSetLike$7;

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
$$8({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
  union: union
});

var $$7 = _export;
var global$6 = global$S;
var clearImmediate = task$1.clear;

// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$$7({ global: true, bind: true, enumerable: true, forced: global$6.clearImmediate !== clearImmediate }, {
  clearImmediate: clearImmediate
});

/* global Bun -- Bun case */
var engineIsBun = typeof Bun == 'function' && Bun && typeof Bun.version == 'string';

var global$5 = global$S;
var apply = functionApply;
var isCallable$1 = isCallable$y;
var ENGINE_IS_BUN = engineIsBun;
var USER_AGENT = engineUserAgent;
var arraySlice$1 = arraySlice$8;
var validateArgumentsLength$3 = validateArgumentsLength$9;

var Function$1 = global$5.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENGINE_IS_BUN && (function () {
  var version = global$5.Bun.version.split('.');
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

var $$6 = _export;
var global$4 = global$S;
var setTask = task$1.set;
var schedulersFix = schedulersFix$1;

// https://github.com/oven-sh/bun/issues/1633
var setImmediate = global$4.setImmediate ? schedulersFix(setTask, false) : setTask;

// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$$6({ global: true, bind: true, enumerable: true, forced: global$4.setImmediate !== setImmediate }, {
  setImmediate: setImmediate
});

var $$5 = _export;
var globalThis$1 = global$S;
var microtask = microtask_1;
var aCallable = aCallable$l;
var validateArgumentsLength$2 = validateArgumentsLength$9;
var fails$2 = fails$U;
var DESCRIPTORS$1 = descriptors;

// Bun ~ 1.0.30 bug
// https://github.com/oven-sh/bun/issues/9249
var WRONG_ARITY$1 = fails$2(function () {
  // getOwnPropertyDescriptor for prevent experimental warning in Node 11
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  return DESCRIPTORS$1 && Object.getOwnPropertyDescriptor(globalThis$1, 'queueMicrotask').value.length !== 1;
});

// `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
$$5({ global: true, enumerable: true, dontCallGetSet: true, forced: WRONG_ARITY$1 }, {
  queueMicrotask: function queueMicrotask(fn) {
    validateArgumentsLength$2(arguments.length, 1);
    microtask(aCallable(fn));
  }
});

var charAt$2 = stringMultibyte.charAt;
var toString$3 = toString$r;
var InternalStateModule$1 = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$5;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState = InternalStateModule$1.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: toString$3(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt$2(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

var bind$1 = functionBindContext;
var call$3 = functionCall;
var toObject = toObject$d;
var callWithSafeIterationClosing = callWithSafeIterationClosing$3;
var isArrayIteratorMethod = isArrayIteratorMethod$3;
var isConstructor = isConstructor$3;
var lengthOfArrayLike = lengthOfArrayLike$h;
var createProperty = createProperty$4;
var getIterator = getIterator$4;
var getIteratorMethod = getIteratorMethod$5;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    result = IS_CONSTRUCTOR ? new this() : [];
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    for (;!(step = call$3(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

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

var $$4 = _export;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL = urlConstructorDetection;
var global$3 = global$S;
var bind = functionBindContext;
var uncurryThis$4 = functionUncurryThis;
var defineBuiltIn = defineBuiltIn$i;
var defineBuiltInAccessor = defineBuiltInAccessor$e;
var anInstance = anInstance$a;
var hasOwn$1 = hasOwnProperty_1;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySlice$8;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$r;
var setToStringTag = setToStringTag$a;
var validateArgumentsLength$1 = validateArgumentsLength$9;
var URLSearchParamsModule = web_urlSearchParams_constructor;
var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global$3.URL;
var TypeError$1 = global$3.TypeError;
var parseInt$1 = global$3.parseInt;
var floor$1 = Math.floor;
var pow$1 = Math.pow;
var charAt$1 = uncurryThis$4(''.charAt);
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
    if (part.length > 1 && charAt$1(part, 0) === '0') {
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
    return charAt$1(input, pointer);
  };

  if (chr() === ':') {
    if (charAt$1(input, 1) !== ':') return;
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
  return code > 0x20 && code < 0x7F && !hasOwn$1(set, chr) ? chr : encodeURIComponent(chr);
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
  return string.length === 2 && exec$1(ALPHA, charAt$1(string, 0))
    && ((second = charAt$1(string, 1)) === ':' || (!normalized && second === '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice$2(string, 0, 2)) && (
    string.length === 2 ||
    ((third = charAt$1(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
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
              (url.isSpecial() !== hasOwn$1(specialSchemes, buffer)) ||
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
          if (chr !== '/' || charAt$1(buffer, pointer + 1) !== '/') continue;
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
                buffer = charAt$1(buffer, 0) + ':'; // normalize windows drive letter
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
    if (charAt$1(input, 0) === '[') {
      if (charAt$1(input, input.length - 1) !== ']') return INVALID_HOST;
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
    return hasOwn$1(specialSchemes, this.scheme);
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
      if (charAt$1(search, 0) === '?') search = stringSlice$2(search, 1);
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
    if (charAt$1(hash, 0) === '#') hash = stringSlice$2(hash, 1);
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

$$4({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

var $$3 = _export;
var call$2 = functionCall;

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$$3({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return call$2(URL.prototype.toString, this);
  }
});

var uncurryThis$3 = functionUncurryThis;

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
var thisNumberValue$1 = uncurryThis$3(1.0.valueOf);

var toIntegerOrInfinity$1 = toIntegerOrInfinity$d;
var toString$2 = toString$r;
var requireObjectCoercible$1 = requireObjectCoercible$f;

var $RangeError$1 = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
var stringRepeat = function repeat(count) {
  var str = toString$2(requireObjectCoercible$1(this));
  var result = '';
  var n = toIntegerOrInfinity$1(count);
  if (n < 0 || n === Infinity) throw new $RangeError$1('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

var $$2 = _export;
var uncurryThis$2 = functionUncurryThis;
var toIntegerOrInfinity = toIntegerOrInfinity$d;
var thisNumberValue = thisNumberValue$1;
var $repeat = stringRepeat;
var fails$1 = fails$U;

var $RangeError = RangeError;
var $String = String;
var floor = Math.floor;
var repeat = uncurryThis$2($repeat);
var stringSlice$1 = uncurryThis$2(''.slice);
var nativeToFixed = uncurryThis$2(1.0.toFixed);

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

var FORCED$1 = fails$1(function () {
  return nativeToFixed(0.00008, 3) !== '0.000' ||
    nativeToFixed(0.9, 0) !== '1' ||
    nativeToFixed(1.255, 2) !== '1.25' ||
    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails$1(function () {
  // V8 ~ Android 4.3-
  nativeToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$$2({ target: 'Number', proto: true, forced: FORCED$1 }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
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

var $$1 = _export;
var call$1 = functionCall;
var uncurryThis$1 = functionUncurryThis;
var requireObjectCoercible = requireObjectCoercible$f;
var isCallable = isCallable$y;
var isNullOrUndefined = isNullOrUndefined$c;
var isRegExp = isRegexp;
var toString$1 = toString$r;
var getMethod = getMethod$a;
var getRegExpFlags = regexpGetFlags;
var getSubstitution = getSubstitution$2;
var wellKnownSymbol$1 = wellKnownSymbol$s;

var REPLACE = wellKnownSymbol$1('replace');
var $TypeError = TypeError;
var indexOf = uncurryThis$1(''.indexOf);
uncurryThis$1(''.replace);
var stringSlice = uncurryThis$1(''.slice);
var max = Math.max;

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$$1({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (!isNullOrUndefined(searchValue)) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString$1(requireObjectCoercible(getRegExpFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) {
        return call$1(replacer, searchValue, O, replaceValue);
      }
    }
    string = toString$1(O);
    searchString = toString$1(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString$1(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = indexOf(string, searchString);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString$1(replaceValue(searchString, position, string))
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

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
var exportTypedArrayStaticMethod = arrayBufferViewCore.exportTypedArrayStaticMethod;
var typedArrayFrom = typedArrayFrom$2;

// `%TypedArray%.from` method
// https://tc39.es/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

var $ = _export;
var global$2 = global$S;
var getBuiltIn = getBuiltIn$h;
var uncurryThis = functionUncurryThis;
var call = functionCall;
var fails = fails$U;
var toString = toString$r;
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

var BASIC = !!$atob && !fails(function () {
  return $atob('aGk=') !== 'hi';
});

var NO_SPACES_IGNORE = BASIC && fails(function () {
  return $atob(' ') !== '';
});

var NO_ENCODING_CHECK = BASIC && !fails(function () {
  $atob('a');
});

var NO_ARG_RECEIVING_CHECK = BASIC && !fails(function () {
  $atob();
});

var WRONG_ARITY = BASIC && $atob.length !== 1;

var FORCED = !BASIC || NO_SPACES_IGNORE || NO_ENCODING_CHECK || NO_ARG_RECEIVING_CHECK || WRONG_ARITY;

// `atob` method
// https://html.spec.whatwg.org/multipage/webappapis.html#dom-atob
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  atob: function atob(data) {
    validateArgumentsLength(arguments.length, 1);
    // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
    if (BASIC && !NO_SPACES_IGNORE && !NO_ENCODING_CHECK) return call($atob, global$2, data);
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

var global$1 = global$S;

var path$1 = global$1;

var wellKnownSymbolWrapped = {};

var wellKnownSymbol = wellKnownSymbol$s;

wellKnownSymbolWrapped.f = wellKnownSymbol;

var path = path$1;
var hasOwn = hasOwnProperty_1;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineProperty = objectDefineProperty.f;

var wellKnownSymbolDefine = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

var defineWellKnownSymbol = wellKnownSymbolDefine;

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');
