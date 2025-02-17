function __vite_legacy_guard() {
  import.meta.url;
  import("_").catch(() => 1);
  async function* g2() {
  }
  ;
}
;
function _mergeNamespaces(n2, m2) {
  for (var i2 = 0; i2 < m2.length; i2++) {
    const e2 = m2[i2];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a2 = function a3() {
      if (this instanceof a3) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a2.prototype = f2.prototype;
  } else
    a2 = {};
  Object.defineProperty(a2, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$5 = Symbol.for("react.element"), n$6 = Symbol.for("react.portal"), p$7 = Symbol.for("react.fragment"), q$6 = Symbol.for("react.strict_mode"), r$4 = Symbol.for("react.profiler"), t$6 = Symbol.for("react.provider"), u$4 = Symbol.for("react.context"), v$5 = Symbol.for("react.forward_ref"), w$3 = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$4 = Symbol.iterator;
function A$3(a2) {
  if (null === a2 || "object" !== typeof a2)
    return null;
  a2 = z$4 && a2[z$4] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$2 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$2 = {};
function E$2(a2, b2, e2) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$2;
}
E$2.prototype.isReactComponent = {};
E$2.prototype.setState = function(a2, b2) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b2, "setState");
};
E$2.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$2.prototype;
function G$2(a2, b2, e2) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$2;
}
var H$2 = G$2.prototype = new F$1();
H$2.constructor = G$2;
C$1(H$2, E$2.prototype);
H$2.isPureReactComponent = true;
var I$2 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$2 = { key: true, ref: true, __self: true, __source: true };
function M$2(a2, b2, e2) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (null != b2)
    for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2)
      J.call(b2, d2) && !L$2.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
  var g2 = arguments.length - 2;
  if (1 === g2)
    c2.children = e2;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
      f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps)
    for (d2 in g2 = a2.defaultProps, g2)
      void 0 === c2[d2] && (c2[d2] = g2[d2]);
  return { $$typeof: l$5, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$2(a2, b2) {
  return { $$typeof: l$5, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$2(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$5;
}
function escape(a2) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b2[a3];
  });
}
var P$2 = /\/+/g;
function Q$2(a2, b2) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
}
function R$2(a2, b2, e2, d2, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2)
    a2 = null;
  var h2 = false;
  if (null === a2)
    h2 = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$5:
          case n$6:
            h2 = true;
        }
    }
  if (h2)
    return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q$2(h2, 0) : d2, I$2(c2) ? (e2 = "", null != a2 && (e2 = a2.replace(P$2, "$&/") + "/"), R$2(c2, b2, e2, "", function(a3) {
      return a3;
    })) : null != c2 && (O$2(c2) && (c2 = N$2(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$2, "$&/") + "/") + a2)), b2.push(c2)), 1;
  h2 = 0;
  d2 = "" === d2 ? "." : d2 + ":";
  if (I$2(a2))
    for (var g2 = 0; g2 < a2.length; g2++) {
      k2 = a2[g2];
      var f2 = d2 + Q$2(k2, g2);
      h2 += R$2(k2, b2, e2, f2, c2);
    }
  else if (f2 = A$3(a2), "function" === typeof f2)
    for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; )
      k2 = k2.value, f2 = d2 + Q$2(k2, g2++), h2 += R$2(k2, b2, e2, f2, c2);
  else if ("object" === k2)
    throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$2(a2, b2, e2) {
  if (null == a2)
    return a2;
  var d2 = [], c2 = 0;
  R$2(a2, d2, "", "", function(a3) {
    return b2.call(e2, a3, c2++);
  });
  return d2;
}
function T$1(a2) {
  if (-1 === a2._status) {
    var b2 = a2._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a2._status || -1 === a2._status)
        a2._status = 1, a2._result = b3;
    }, function(b3) {
      if (0 === a2._status || -1 === a2._status)
        a2._status = 2, a2._result = b3;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b2);
  }
  if (1 === a2._status)
    return a2._result.default;
  throw a2._result;
}
var U$2 = { current: null }, V$1 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$2() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$2, forEach: function(a2, b2, e2) {
  S$2(a2, function() {
    b2.apply(this, arguments);
  }, e2);
}, count: function(a2) {
  var b2 = 0;
  S$2(a2, function() {
    b2++;
  });
  return b2;
}, toArray: function(a2) {
  return S$2(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$2(a2))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$2;
react_production_min.Fragment = p$7;
react_production_min.Profiler = r$4;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$6;
react_production_min.Suspense = w$3;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.act = X$2;
react_production_min.cloneElement = function(a2, b2, e2) {
  if (null === a2 || void 0 === a2)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d2 = C$1({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h2 = K$1.current);
    void 0 !== b2.key && (c2 = "" + b2.key);
    if (a2.type && a2.type.defaultProps)
      var g2 = a2.type.defaultProps;
    for (f2 in b2)
      J.call(b2, f2) && !L$2.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d2.children = e2;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$5, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$4, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$6, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a2) {
  var b2 = M$2.bind(null, a2);
  b2.type = a2;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$5, render: a2 };
};
react_production_min.isValidElement = O$2;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a2 }, _init: T$1 };
};
react_production_min.memo = function(a2, b2) {
  return { $$typeof: x$2, type: a2, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a2) {
  var b2 = V$1.transition;
  V$1.transition = {};
  try {
    a2();
  } finally {
    V$1.transition = b2;
  }
};
react_production_min.unstable_act = X$2;
react_production_min.useCallback = function(a2, b2) {
  return U$2.current.useCallback(a2, b2);
};
react_production_min.useContext = function(a2) {
  return U$2.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$2.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b2) {
  return U$2.current.useEffect(a2, b2);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b2, e2) {
  return U$2.current.useImperativeHandle(a2, b2, e2);
};
react_production_min.useInsertionEffect = function(a2, b2) {
  return U$2.current.useInsertionEffect(a2, b2);
};
react_production_min.useLayoutEffect = function(a2, b2) {
  return U$2.current.useLayoutEffect(a2, b2);
};
react_production_min.useMemo = function(a2, b2) {
  return U$2.current.useMemo(a2, b2);
};
react_production_min.useReducer = function(a2, b2, e2) {
  return U$2.current.useReducer(a2, b2, e2);
};
react_production_min.useRef = function(a2) {
  return U$2.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$2.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b2, e2) {
  return U$2.current.useSyncExternalStore(a2, b2, e2);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React__default = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React__default
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$3 = reactExports, k$4 = Symbol.for("react.element"), l$4 = Symbol.for("react.fragment"), m$5 = Object.prototype.hasOwnProperty, n$5 = f$3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$6 = { key: true, ref: true, __self: true, __source: true };
function q$5(c2, a2, g2) {
  var b2, d2 = {}, e2 = null, h2 = null;
  void 0 !== g2 && (e2 = "" + g2);
  void 0 !== a2.key && (e2 = "" + a2.key);
  void 0 !== a2.ref && (h2 = a2.ref);
  for (b2 in a2)
    m$5.call(a2, b2) && !p$6.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      void 0 === d2[b2] && (d2[b2] = a2[b2]);
  return { $$typeof: k$4, type: c2, key: e2, ref: h2, props: d2, _owner: n$5.current };
}
reactJsxRuntime_production_min.Fragment = l$4;
reactJsxRuntime_production_min.jsx = q$5;
reactJsxRuntime_production_min.jsxs = q$5;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b2) {
    var c2 = a2.length;
    a2.push(b2);
    a:
      for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e2 = a2[d2];
        if (0 < g2(e2, b2))
          a2[d2] = b2, a2[c2] = e2, c2 = d2;
        else
          break a;
      }
  }
  function h2(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length)
      return null;
    var b2 = a2[0], c2 = a2.pop();
    if (c2 !== b2) {
      a2[0] = c2;
      a:
        for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g2(C2, c2))
            n2 < e2 && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
          else if (n2 < e2 && 0 > g2(x2, c2))
            a2[d2] = x2, a2[n2] = c2, d2 = n2;
          else
            break a;
        }
    }
    return b2;
  }
  function g2(a2, b2) {
    var c2 = a2.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t = [], u2 = 1, v2 = null, y2 = 3, z = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b2 = h2(t); null !== b2; ) {
      if (null === b2.callback)
        k2(t);
      else if (b2.startTime <= a2)
        k2(t), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else
        break;
      b2 = h2(t);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2)
      if (null !== h2(r2))
        A2 = true, I2(J2);
      else {
        var b2 = h2(t);
        null !== b2 && K2(H2, b2.startTime - a2);
      }
  }
  function J2(a2, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M2()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b2);
        } else
          k2(r2);
        v2 = h2(r2);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h2(t);
        null !== m2 && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b2 = true;
      try {
        b2 = O2(true, a2);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b2) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b2) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b2, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a2) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a2.sortIndex = c2, f2(t, a2), null === h2(r2) && a2 === h2(t) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A2 || z || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$5(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a2, b2) {
  ha(a2, b2);
  ha(a2 + "Capture", b2);
}
function ha(a2, b2) {
  ea[a2] = b2;
  for (a2 = 0; a2 < b2.length; a2++)
    da.add(b2[a2]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a2) {
  if (ja.call(ma, a2))
    return true;
  if (ja.call(la, a2))
    return false;
  if (ka.test(a2))
    return ma[a2] = true;
  la[a2] = true;
  return false;
}
function pa(a2, b2, c2, d2) {
  if (null !== c2 && 0 === c2.type)
    return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2)
        return false;
      if (null !== c2)
        return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa(a2, b2, c2, d2) {
  if (null === b2 || "undefined" === typeof b2 || pa(a2, b2, c2, d2))
    return true;
  if (d2)
    return false;
  if (null !== c2)
    switch (c2.type) {
      case 3:
        return !b2;
      case 4:
        return false === b2;
      case 5:
        return isNaN(b2);
      case 6:
        return isNaN(b2) || 1 > b2;
    }
  return false;
}
function v$4(a2, b2, c2, d2, e2, f2, g2) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d2;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$3 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z$3[a2] = new v$4(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  z$3[b2] = new v$4(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z$3[a2] = new v$4(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(
    ra,
    sa
  );
  z$3[b2] = new v$4(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(ra, sa);
  z$3[b2] = new v$4(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(ra, sa);
  z$3[b2] = new v$4(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z$3.xlinkHref = new v$4("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z$3[a2] = new v$4(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta(a2, b2, c2, d2) {
  var e2 = z$3.hasOwnProperty(b2) ? z$3[b2] : null;
  if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1])
    qa(b2, c2, e2, d2) && (c2 = null), d2 || null === e2 ? oa(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b2 = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b2, c2) : a2.setAttribute(b2, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a2) {
  if (null === a2 || "object" !== typeof a2)
    return null;
  a2 = Ja && a2[Ja] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A$2 = Object.assign, La;
function Ma(a2) {
  if (void 0 === La)
    try {
      throw Error();
    } catch (c2) {
      var b2 = c2.stack.trim().match(/\n( *(at )?)/);
      La = b2 && b2[1] || "";
    }
  return "\n" + La + a2;
}
var Na = false;
function Oa(a2, b2) {
  if (!a2 || Na)
    return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2)
      if (b2 = function() {
        throw Error();
      }, Object.defineProperty(b2.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b2, []);
        } catch (l2) {
          var d2 = l2;
        }
        Reflect.construct(a2, [], b2);
      } else {
        try {
          b2.call();
        } catch (l2) {
          d2 = l2;
        }
        a2.call(b2.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d2 && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; )
        h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--)
        if (e2[g2] !== f2[h2]) {
          if (1 !== g2 || 1 !== h2) {
            do
              if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
                var k2 = "\n" + e2[g2].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g2 && 0 <= h2);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
}
function Pa(a2) {
  switch (a2.tag) {
    case 5:
      return Ma(a2.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa(a2.type, false), a2;
    case 11:
      return a2 = Oa(a2.type.render, false), a2;
    case 1:
      return a2 = Oa(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa(a2) {
  if (null == a2)
    return null;
  if ("function" === typeof a2)
    return a2.displayName || a2.name || null;
  if ("string" === typeof a2)
    return a2;
  switch (a2) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a2)
    switch (a2.$$typeof) {
      case Ca:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga:
        return b2 = a2.displayName || null, null !== b2 ? b2 : Qa(a2.type) || "Memo";
      case Ha:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return Qa(a2(b2));
        } catch (c2) {
        }
    }
  return null;
}
function Ra(a2) {
  var b2 = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b2);
    case 8:
      return b2 === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2)
        return b2.displayName || b2.name || null;
      if ("string" === typeof b2)
        return b2;
  }
  return null;
}
function Sa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta(a2) {
  var b2 = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua(a2) {
  var b2 = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d2 = "" + a2[b2];
  if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b2, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a3) {
      d2 = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a3) {
      d2 = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b2];
    } };
  }
}
function Va(a2) {
  a2._valueTracker || (a2._valueTracker = Ua(a2));
}
function Wa(a2) {
  if (!a2)
    return false;
  var b2 = a2._valueTracker;
  if (!b2)
    return true;
  var c2 = b2.getValue();
  var d2 = "";
  a2 && (d2 = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d2;
  return a2 !== c2 ? (b2.setValue(a2), true) : false;
}
function Xa(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2)
    return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b2) {
    return a2.body;
  }
}
function Ya(a2, b2) {
  var c2 = b2.checked;
  return A$2({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za(a2, b2) {
  var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
  c2 = Sa(null != b2.value ? b2.value : c2);
  a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab(a2, b2) {
  b2 = b2.checked;
  null != b2 && ta(a2, "checked", b2, false);
}
function bb(a2, b2) {
  ab(a2, b2);
  var c2 = Sa(b2.value), d2 = b2.type;
  if (null != c2)
    if ("number" === d2) {
      if (0 === c2 && "" === a2.value || a2.value != c2)
        a2.value = "" + c2;
    } else
      a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d2 || "reset" === d2) {
    a2.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a2, b2.type, Sa(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
}
function db(a2, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d2 = b2.type;
    if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value))
      return;
    b2 = "" + a2._wrapperState.initialValue;
    c2 || b2 === a2.value || (a2.value = b2);
    a2.defaultValue = b2;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb(a2, b2, c2) {
  if ("number" !== b2 || Xa(a2.ownerDocument) !== a2)
    null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a2, b2, c2, d2) {
  a2 = a2.options;
  if (b2) {
    b2 = {};
    for (var e2 = 0; e2 < c2.length; e2++)
      b2["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a2.length; c2++)
      e2 = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d2 && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b2 = null;
    for (e2 = 0; e2 < a2.length; e2++) {
      if (a2[e2].value === c2) {
        a2[e2].selected = true;
        d2 && (a2[e2].defaultSelected = true);
        return;
      }
      null !== b2 || a2[e2].disabled || (b2 = a2[e2]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb(a2, b2) {
  if (null != b2.dangerouslySetInnerHTML)
    throw Error(p$5(91));
  return A$2({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb(a2, b2) {
  var c2 = b2.value;
  if (null == c2) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (null != c2) {
      if (null != b2)
        throw Error(p$5(92));
      if (eb(c2)) {
        if (1 < c2.length)
          throw Error(p$5(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    null == b2 && (b2 = "");
    c2 = b2;
  }
  a2._wrapperState = { initialValue: Sa(c2) };
}
function ib(a2, b2) {
  var c2 = Sa(b2.value), d2 = Sa(b2.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d2 && (a2.defaultValue = "" + d2);
}
function jb(a2) {
  var b2 = a2.textContent;
  b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
}
function kb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a2, b2) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb, nb = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b2, c2, d2, e2);
    });
  } : a2;
}(function(a2, b2) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2)
    a2.innerHTML = b2;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb.firstChild; a2.firstChild; )
      a2.removeChild(a2.firstChild);
    for (; b2.firstChild; )
      a2.appendChild(b2.firstChild);
  }
});
function ob(a2, b2) {
  if (b2) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b2;
      return;
    }
  }
  a2.textContent = b2;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a2) {
  qb.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb[b2] = pb[a2];
  });
});
function rb(a2, b2, c2) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b2).trim() : b2 + "px";
}
function sb(a2, b2) {
  a2 = a2.style;
  for (var c2 in b2)
    if (b2.hasOwnProperty(c2)) {
      var d2 = 0 === c2.indexOf("--"), e2 = rb(c2, b2[c2], d2);
      "float" === c2 && (c2 = "cssFloat");
      d2 ? a2.setProperty(c2, e2) : a2[c2] = e2;
    }
}
var tb = A$2({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a2, b2) {
  if (b2) {
    if (tb[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML))
      throw Error(p$5(137, a2));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children)
        throw Error(p$5(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML))
        throw Error(p$5(61));
    }
    if (null != b2.style && "object" !== typeof b2.style)
      throw Error(p$5(62));
  }
}
function vb(a2, b2) {
  if (-1 === a2.indexOf("-"))
    return "string" === typeof b2.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb = null, zb = null, Ab = null;
function Bb(a2) {
  if (a2 = Cb(a2)) {
    if ("function" !== typeof yb)
      throw Error(p$5(280));
    var b2 = a2.stateNode;
    b2 && (b2 = Db(b2), yb(a2.stateNode, a2.type, b2));
  }
}
function Eb(a2) {
  zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
}
function Fb() {
  if (zb) {
    var a2 = zb, b2 = Ab;
    Ab = zb = null;
    Bb(a2);
    if (b2)
      for (a2 = 0; a2 < b2.length; a2++)
        Bb(b2[a2]);
  }
}
function Gb(a2, b2) {
  return a2(b2);
}
function Hb() {
}
var Ib = false;
function Jb(a2, b2, c2) {
  if (Ib)
    return a2(b2, c2);
  Ib = true;
  try {
    return Gb(a2, b2, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab)
      Hb(), Fb();
  }
}
function Kb(a2, b2) {
  var c2 = a2.stateNode;
  if (null === c2)
    return null;
  var d2 = Db(c2);
  if (null === d2)
    return null;
  c2 = d2[b2];
  a:
    switch (b2) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
        a2 = !d2;
        break a;
      default:
        a2 = false;
    }
  if (a2)
    return null;
  if (c2 && "function" !== typeof c2)
    throw Error(p$5(231, b2, typeof c2));
  return c2;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a2) {
    Lb = false;
  }
function Nb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
  Ob = true;
  Pb = a2;
} };
function Tb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p$5(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a2) {
  var b2 = a2, c2 = a2;
  if (a2.alternate)
    for (; b2.return; )
      b2 = b2.return;
  else {
    a2 = b2;
    do
      b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
    while (a2);
  }
  return 3 === b2.tag ? c2 : null;
}
function Wb(a2) {
  if (13 === a2.tag) {
    var b2 = a2.memoizedState;
    null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
    if (null !== b2)
      return b2.dehydrated;
  }
  return null;
}
function Xb(a2) {
  if (Vb(a2) !== a2)
    throw Error(p$5(188));
}
function Yb(a2) {
  var b2 = a2.alternate;
  if (!b2) {
    b2 = Vb(a2);
    if (null === b2)
      throw Error(p$5(188));
    return b2 !== a2 ? null : a2;
  }
  for (var c2 = a2, d2 = b2; ; ) {
    var e2 = c2.return;
    if (null === e2)
      break;
    var f2 = e2.alternate;
    if (null === f2) {
      d2 = e2.return;
      if (null !== d2) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2)
          return Xb(e2), a2;
        if (f2 === d2)
          return Xb(e2), b2;
        f2 = f2.sibling;
      }
      throw Error(p$5(188));
    }
    if (c2.return !== d2.return)
      c2 = e2, d2 = f2;
    else {
      for (var g2 = false, h2 = e2.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e2;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e2;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2)
          throw Error(p$5(189));
      }
    }
    if (c2.alternate !== d2)
      throw Error(p$5(190));
  }
  if (3 !== c2.tag)
    throw Error(p$5(188));
  return c2.stateNode.current === c2 ? a2 : b2;
}
function Zb(a2) {
  a2 = Yb(a2);
  return null !== a2 ? $b(a2) : null;
}
function $b(a2) {
  if (5 === a2.tag || 6 === a2.tag)
    return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b2 = $b(a2);
    if (null !== b2)
      return b2;
    a2 = a2.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B$1 = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a2) {
  if (lc && "function" === typeof lc.onCommitFiberRoot)
    try {
      lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
    } catch (b2) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc(a2, b2) {
  var c2 = a2.pendingLanes;
  if (0 === c2)
    return 0;
  var d2 = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e2;
    0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
  } else
    g2 = c2 & ~e2, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
  if (0 === d2)
    return 0;
  if (0 !== b2 && b2 !== d2 && 0 === (b2 & e2) && (e2 = d2 & -d2, f2 = b2 & -b2, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240)))
    return b2;
  0 !== (d2 & 4) && (d2 |= c2 & 16);
  b2 = a2.entangledLanes;
  if (0 !== b2)
    for (a2 = a2.entanglements, b2 &= d2; 0 < b2; )
      c2 = 31 - oc(b2), e2 = 1 << c2, d2 |= a2[c2], b2 &= ~e2;
  return d2;
}
function vc(a2, b2) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a2, b2) {
  for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e2[g2];
    if (-1 === k2) {
      if (0 === (h2 & c2) || 0 !== (h2 & d2))
        e2[g2] = vc(h2, b2);
    } else
      k2 <= b2 && (a2.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a2 = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a2;
}
function zc(a2) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++)
    b2.push(a2);
  return b2;
}
function Ac(a2, b2, c2) {
  a2.pendingLanes |= b2;
  536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b2 = 31 - oc(b2);
  a2[b2] = c2;
}
function Bc(a2, b2) {
  var c2 = a2.pendingLanes & ~b2;
  a2.pendingLanes = b2;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b2;
  a2.mutableReadLanes &= b2;
  a2.entangledLanes &= b2;
  b2 = a2.entanglements;
  var d2 = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e2 = 31 - oc(c2), f2 = 1 << e2;
    b2[e2] = 0;
    d2[e2] = -1;
    a2[e2] = -1;
    c2 &= ~f2;
  }
}
function Cc(a2, b2) {
  var c2 = a2.entangledLanes |= b2;
  for (a2 = a2.entanglements; c2; ) {
    var d2 = 31 - oc(c2), e2 = 1 << d2;
    e2 & b2 | a2[d2] & b2 && (a2[d2] |= b2);
    c2 &= ~e2;
  }
}
var C = 0;
function Dc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a2, b2) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b2.pointerId);
  }
}
function Tc(a2, b2, c2, d2, e2, f2) {
  if (null === a2 || a2.nativeEvent !== f2)
    return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a2;
  a2.eventSystemFlags |= d2;
  b2 = a2.targetContainers;
  null !== e2 && -1 === b2.indexOf(e2) && b2.push(e2);
  return a2;
}
function Uc(a2, b2, c2, d2, e2) {
  switch (b2) {
    case "focusin":
      return Lc = Tc(Lc, a2, b2, c2, d2, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a2, b2, c2, d2, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a2, b2, c2, d2, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a2, b2, c2, d2, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b2, c2, d2, e2)), true;
  }
  return false;
}
function Vc(a2) {
  var b2 = Wc(a2.target);
  if (null !== b2) {
    var c2 = Vb(b2);
    if (null !== c2) {
      if (b2 = c2.tag, 13 === b2) {
        if (b2 = Wb(c2), null !== b2) {
          a2.blockedOn = b2;
          Ic(a2.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc(a2) {
  if (null !== a2.blockedOn)
    return false;
  for (var b2 = a2.targetContainers; 0 < b2.length; ) {
    var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      wb = d2;
      c2.target.dispatchEvent(d2);
      wb = null;
    } else
      return b2 = Cb(c2), null !== b2 && Fc(b2), a2.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Zc(a2, b2, c2) {
  Xc(a2) && c2.delete(b2);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a2, b2) {
  a2.blockedOn === b2 && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a2) {
  function b2(b3) {
    return ad(b3, a2);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a2);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d2 = Kc[c2];
      d2.blockedOn === a2 && (d2.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a2);
  null !== Mc && ad(Mc, a2);
  null !== Nc && ad(Nc, a2);
  Oc.forEach(b2);
  Pc.forEach(b2);
  for (c2 = 0; c2 < Qc.length; c2++)
    d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); )
    Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a2, b2, c2, d2) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a2, b2, c2, d2);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function gd(a2, b2, c2, d2) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a2, b2, c2, d2);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function fd(a2, b2, c2, d2) {
  if (dd) {
    var e2 = Yc(a2, b2, c2, d2);
    if (null === e2)
      hd(a2, b2, d2, id, c2), Sc(a2, d2);
    else if (Uc(e2, a2, b2, c2, d2))
      d2.stopPropagation();
    else if (Sc(a2, d2), b2 & 4 && -1 < Rc.indexOf(a2)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a2, b2, c2, d2);
        null === f2 && hd(a2, b2, d2, id, c2);
        if (f2 === e2)
          break;
        e2 = f2;
      }
      null !== e2 && d2.stopPropagation();
    } else
      hd(a2, b2, d2, null, c2);
  }
}
var id = null;
function Yc(a2, b2, c2, d2) {
  id = null;
  a2 = xb(d2);
  a2 = Wc(a2);
  if (null !== a2)
    if (b2 = Vb(a2), null === b2)
      a2 = null;
    else if (c2 = b2.tag, 13 === c2) {
      a2 = Wb(b2);
      if (null !== a2)
        return a2;
      a2 = null;
    } else if (3 === c2) {
      if (b2.stateNode.current.memoizedState.isDehydrated)
        return 3 === b2.tag ? b2.stateNode.containerInfo : null;
      a2 = null;
    } else
      b2 !== a2 && (a2 = null);
  id = a2;
  return null;
}
function jd(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a2, b2 = ld, c2 = b2.length, d2, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a2 = 0; a2 < c2 && b2[a2] === e2[a2]; a2++)
    ;
  var g2 = c2 - a2;
  for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e2[f2 - d2]; d2++)
    ;
  return md = e2.slice(a2, 1 < d2 ? 1 - d2 : void 0);
}
function od(a2) {
  var b2 = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b2(b3, d2, e2, f2, g2) {
    this._reactName = b3;
    this._targetInst = e2;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a2)
      a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$2(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$2({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$2({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2)
    return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A$2({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$2({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$2({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$2({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$2({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A$2({}, ud, { key: function(a2) {
  if (a2.key) {
    var b2 = Md[a2.key] || a2.key;
    if ("Unidentified" !== b2)
      return b2;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$2({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$2({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$2({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$2({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a2, b2) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie = false;
function je(a2, b2) {
  switch (a2) {
    case "compositionend":
      return he(b2);
    case "keypress":
      if (32 !== b2.which)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a2 = b2.data, a2 === ee && fe ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b2) {
  if (ie)
    return "compositionend" === a2 || !ae && ge(a2, b2) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length)
          return b2.char;
        if (b2.which)
          return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b2 ? !!le[a2.type] : "textarea" === b2 ? true : false;
}
function ne(a2, b2, c2, d2) {
  Eb(d2);
  b2 = oe(b2, "onChange");
  0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b2 }));
}
var pe = null, qe = null;
function re(a2) {
  se(a2, 0);
}
function te(a2) {
  var b2 = ue(a2);
  if (Wa(b2))
    return a2;
}
function ve(a2, b2) {
  if ("change" === a2)
    return b2;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a2) {
  if ("value" === a2.propertyName && te(qe)) {
    var b2 = [];
    ne(b2, qe, a2, xb(a2));
    Jb(re, b2);
  }
}
function Ce(a2, b2, c2) {
  "focusin" === a2 ? (Ae(), pe = b2, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
}
function De(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2)
    return te(qe);
}
function Ee(a2, b2) {
  if ("click" === a2)
    return te(b2);
}
function Fe(a2, b2) {
  if ("input" === a2 || "change" === a2)
    return te(b2);
}
function Ge(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a2, b2) {
  if (He(a2, b2))
    return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2)
    return false;
  var c2 = Object.keys(a2), d2 = Object.keys(b2);
  if (c2.length !== d2.length)
    return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    if (!ja.call(b2, e2) || !He(a2[e2], b2[e2]))
      return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; )
    a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b2) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d2; c2; ) {
    if (3 === c2.nodeType) {
      d2 = a2 + c2.textContent.length;
      if (a2 <= b2 && d2 >= b2)
        return { node: c2, offset: b2 - a2 };
      a2 = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b2) {
  return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Le(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b2 = Xa(); b2 instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b2.contentWindow.location.href;
    } catch (d2) {
      c2 = false;
    }
    if (c2)
      a2 = b2.contentWindow;
    else
      break;
    b2 = Xa(a2.document);
  }
  return b2;
}
function Ne(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
}
function Oe(a2) {
  var b2 = Me(), c2 = a2.focusedElem, d2 = a2.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d2 && Ne(c2)) {
      if (b2 = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2)
        c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
        d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
        !a2.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
        e2 = Ke(c2, f2);
        var g2 = Ke(
          c2,
          d2
        );
        e2 && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b2), a2.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a2.addRange(b2)));
      }
    }
    b2 = [];
    for (a2 = c2; a2 = a2.parentNode; )
      1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++)
      a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a2, b2, c2) {
  var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se && Ie(Se, d2) || (Se = d2, d2 = oe(Re, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d2 }), b2.target = Qe)));
}
function Ve(a2, b2) {
  var c2 = {};
  c2[a2.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b2;
  c2["Moz" + a2] = "moz" + b2;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2])
    return Xe[a2];
  if (!We[a2])
    return a2;
  var b2 = We[a2], c2;
  for (c2 in b2)
    if (b2.hasOwnProperty(c2) && c2 in Ye)
      return Xe[a2] = b2[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b2) {
  df.set(a2, b2);
  fa(b2, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b2, c2) {
  var d2 = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub(d2, b2, void 0, a2);
  a2.currentTarget = null;
}
function se(a2, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d2 = a2[c2], e2 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b2)
        for (var g2 = d2.length - 1; 0 <= g2; g2--) {
          var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped())
            break a;
          nf(e2, h2, l2);
          f2 = k2;
        }
      else
        for (g2 = 0; g2 < d2.length; g2++) {
          h2 = d2[g2];
          k2 = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped())
            break a;
          nf(e2, h2, l2);
          f2 = k2;
        }
    }
  }
  if (Qb)
    throw a2 = Rb, Qb = false, Rb = null, a2;
}
function D$1(a2, b2) {
  var c2 = b2[of];
  void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
  var d2 = a2 + "__bubble";
  c2.has(d2) || (pf(b2, a2, 2, false), c2.add(d2));
}
function qf(a2, b2, c2) {
  var d2 = 0;
  b2 && (d2 |= 4);
  pf(c2, a2, d2, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a2), qf(b3, true, a2));
    });
    var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a2, b2, c2, d2) {
  switch (jd(b2)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c2 = e2.bind(null, b2, c2, a2);
  e2 = void 0;
  !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e2 = true);
  d2 ? void 0 !== e2 ? a2.addEventListener(b2, c2, { capture: true, passive: e2 }) : a2.addEventListener(b2, c2, true) : void 0 !== e2 ? a2.addEventListener(b2, c2, { passive: e2 }) : a2.addEventListener(b2, c2, false);
}
function hd(a2, b2, c2, d2, e2) {
  var f2 = d2;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2)
    a:
      for (; ; ) {
        if (null === d2)
          return;
        var g2 = d2.tag;
        if (3 === g2 || 4 === g2) {
          var h2 = d2.stateNode.containerInfo;
          if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2)
            break;
          if (4 === g2)
            for (g2 = d2.return; null !== g2; ) {
              var k2 = g2.tag;
              if (3 === k2 || 4 === k2) {
                if (k2 = g2.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2)
                  return;
              }
              g2 = g2.return;
            }
          for (; null !== h2; ) {
            g2 = Wc(h2);
            if (null === g2)
              return;
            k2 = g2.tag;
            if (5 === k2 || 6 === k2) {
              d2 = f2 = g2;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d2 = d2.return;
      }
  Jb(function() {
    var d3 = f2, e3 = xb(c2), g3 = [];
    a: {
      var h3 = df.get(a2);
      if (void 0 !== h3) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2))
              break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t = 0 !== (b2 & 4), J2 = !t && "scroll" === a2, x2 = t ? null !== h3 ? h3 + "Capture" : null : h3;
        t = [];
        for (var w2 = d3, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t.length && (h3 = new k3(h3, n2, null, c2, e3), g3.push({ event: h3, listeners: t }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h3 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf]))
          break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
              n2 = null;
          } else
            k3 = null, n2 = d3;
          if (k3 !== n2) {
            t = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2)
              t = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue(k3);
            u2 = null == n2 ? h3 : ue(n2);
            h3 = new t(F2, w2 + "leave", k3, c2, e3);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d3 && (t = new t(x2, w2 + "enter", n2, c2, e3), t.target = u2, t.relatedTarget = J2, F2 = t);
            J2 = F2;
            if (k3 && n2)
              b: {
                t = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t = vf(t), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t === x2 || null !== x2 && t === x2.alternate)
                    break b;
                  t = vf(t);
                  x2 = vf(x2);
                }
                t = null;
              }
            else
              t = null;
            null !== k3 && wf(g3, h3, k3, t, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t, true);
          }
        }
      }
      a: {
        h3 = d3 ? ue(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type)
          var na = ve;
        else if (me(h3))
          if (we)
            na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
        else
          (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee);
        if (na && (na = na(a2, d3))) {
          ne(g3, na, c2, e3);
          break a;
        }
        xa && xa(a2, h3, d3);
        "focusout" === a2 && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d3 ? ue(d3) : window;
      switch (a2) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable)
            Qe = xa, Re = d3, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g3, c2, e3);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g3, c2, e3);
      }
      var $a;
      if (ae)
        b: {
          switch (a2) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d3, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e3), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a2, c2) : ke(a2, c2))
        d3 = oe(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = $a);
    }
    se(g3, b2);
  });
}
function tf(a2, b2, c2) {
  return { instance: a2, listener: b2, currentTarget: c2 };
}
function oe(a2, b2) {
  for (var c2 = b2 + "Capture", d2 = []; null !== a2; ) {
    var e2 = a2, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e2)), f2 = Kb(a2, b2), null != f2 && d2.push(tf(a2, f2, e2)));
    a2 = a2.return;
  }
  return d2;
}
function vf(a2) {
  if (null === a2)
    return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b2, c2, d2, e2) {
  for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d2)
      break;
    5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e2 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  0 !== g2.length && a2.push({ event: b2, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b2, c2) {
  b2 = zf(b2);
  if (zf(a2) !== b2 && c2)
    throw Error(p$5(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b2) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b2) {
  var c2 = b2, d2 = 0;
  do {
    var e2 = c2.nextSibling;
    a2.removeChild(c2);
    if (e2 && 8 === e2.nodeType)
      if (c2 = e2.data, "/$" === c2) {
        if (0 === d2) {
          a2.removeChild(e2);
          bd(b2);
          return;
        }
        d2--;
      } else
        "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
    c2 = e2;
  } while (c2);
  bd(b2);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b2 = a2.nodeType;
    if (1 === b2 || 3 === b2)
      break;
    if (8 === b2) {
      b2 = a2.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2)
        break;
      if ("/$" === b2)
        return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b2 = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b2)
          return a2;
        b2--;
      } else
        "/$" === c2 && b2++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a2) {
  var b2 = a2[Of];
  if (b2)
    return b2;
  for (var c2 = a2.parentNode; c2; ) {
    if (b2 = c2[uf] || c2[Of]) {
      c2 = b2.alternate;
      if (null !== b2.child || null !== c2 && null !== c2.child)
        for (a2 = Mf(a2); null !== a2; ) {
          if (c2 = a2[Of])
            return c2;
          a2 = Mf(a2);
        }
      return b2;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue(a2) {
  if (5 === a2.tag || 6 === a2.tag)
    return a2.stateNode;
  throw Error(p$5(33));
}
function Db(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E$1(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a2, b2) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b2;
}
var Vf = {}, H$1 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b2) {
  var c2 = a2.type.contextTypes;
  if (!c2)
    return Vf;
  var d2 = a2.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2)
    return d2.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2)
    e2[f2] = b2[f2];
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E$1(Wf);
  E$1(H$1);
}
function ag(a2, b2, c2) {
  if (H$1.current !== Vf)
    throw Error(p$5(168));
  G$1(H$1, b2);
  G$1(Wf, c2);
}
function bg(a2, b2, c2) {
  var d2 = a2.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d2.getChildContext)
    return c2;
  d2 = d2.getChildContext();
  for (var e2 in d2)
    if (!(e2 in b2))
      throw Error(p$5(108, Ra(a2) || "Unknown", e2));
  return A$2({}, c2, d2);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$1.current;
  G$1(H$1, a2);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a2, b2, c2) {
  var d2 = a2.stateNode;
  if (!d2)
    throw Error(p$5(169));
  c2 ? (a2 = bg(a2, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E$1(Wf), E$1(H$1), G$1(H$1, a2)) : E$1(Wf);
  G$1(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b2 = C;
    try {
      var c2 = eg;
      for (C = 1; a2 < c2.length; a2++) {
        var d2 = c2[a2];
        do
          d2 = d2(true);
        while (null !== d2);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e2;
    } finally {
      C = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b2;
}
function ug(a2, b2, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d2 = rg;
  a2 = sg;
  var e2 = 32 - oc(d2) - 1;
  d2 &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - oc(b2) + e2;
  if (30 < f2) {
    var g2 = e2 - e2 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e2 -= g2;
    rg = 1 << 32 - oc(b2) + e2 | c2 << e2 | d2;
    sg = f2 + a2;
  } else
    rg = 1 << f2 | c2 << e2 | d2, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$1 = false, zg = null;
function Ag(a2, b2) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a2;
  b2 = a2.deletions;
  null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
}
function Cg(a2, b2) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a2.stateNode = b2, xg = a2, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, xg = a2, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I$1) {
    var b2 = yg;
    if (b2) {
      var c2 = b2;
      if (!Cg(a2, b2)) {
        if (Dg(a2))
          throw Error(p$5(418));
        b2 = Lf(c2.nextSibling);
        var d2 = xg;
        b2 && Cg(a2, b2) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I$1 = false, xg = a2);
      }
    } else {
      if (Dg(a2))
        throw Error(p$5(418));
      a2.flags = a2.flags & -4097 | 2;
      I$1 = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; )
    a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg)
    return false;
  if (!I$1)
    return Fg(a2), I$1 = true, false;
  var b2;
  (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a2.type, a2.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a2))
      throw Hg(), Error(p$5(418));
    for (; b2; )
      Ag(a2, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2)
      throw Error(p$5(317));
    a: {
      a2 = a2.nextSibling;
      for (b2 = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b2) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b2--;
          } else
            "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; )
    a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$1 = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a2, b2, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag)
          throw Error(p$5(309));
        var d2 = c2.stateNode;
      }
      if (!d2)
        throw Error(p$5(147, a2));
      var e2 = d2, f2 = "" + a2;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2)
        return b2.ref;
      b2 = function(a3) {
        var b3 = e2.refs;
        null === a3 ? delete b3[f2] : b3[f2] = a3;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a2)
      throw Error(p$5(284));
    if (!c2._owner)
      throw Error(p$5(290, a2));
  }
  return a2;
}
function Mg(a2, b2) {
  a2 = Object.prototype.toString.call(b2);
  throw Error(p$5(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
}
function Ng(a2) {
  var b2 = a2._init;
  return b2(a2._payload);
}
function Og(a2) {
  function b2(b3, c3) {
    if (a2) {
      var d3 = b3.deletions;
      null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a2)
      return null;
    for (; null !== d3; )
      b2(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a3, b3) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b3; )
      null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
    return a3;
  }
  function e2(a3, b3) {
    a3 = Pg(a3, b3);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b3, c3, d3) {
    b3.index = d3;
    if (!a2)
      return b3.flags |= 1048576, c3;
    d3 = b3.alternate;
    if (null !== d3)
      return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
    b3.flags |= 2;
    return c3;
  }
  function g2(b3) {
    a2 && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h2(a3, b3, c3, d3) {
    if (null === b3 || 6 !== b3.tag)
      return b3 = Qg(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e2(b3, c3);
    b3.return = a3;
    return b3;
  }
  function k2(a3, b3, c3, d3) {
    var f3 = c3.type;
    if (f3 === ya)
      return m2(a3, b3, c3.props.children, d3, c3.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b3.type))
      return d3 = e2(b3, c3.props), d3.ref = Lg(a3, b3, c3), d3.return = a3, d3;
    d3 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d3);
    d3.ref = Lg(a3, b3, c3);
    d3.return = a3;
    return d3;
  }
  function l2(a3, b3, c3, d3) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
      return b3 = Sg(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e2(b3, c3.children || []);
    b3.return = a3;
    return b3;
  }
  function m2(a3, b3, c3, d3, f3) {
    if (null === b3 || 7 !== b3.tag)
      return b3 = Tg(c3, a3.mode, d3, f3), b3.return = a3, b3;
    b3 = e2(b3, c3);
    b3.return = a3;
    return b3;
  }
  function q2(a3, b3, c3) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3)
      return b3 = Qg("" + b3, a3.mode, c3), b3.return = a3, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va:
          return c3 = Rg(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b3), c3.return = a3, c3;
        case wa:
          return b3 = Sg(b3, a3.mode, c3), b3.return = a3, b3;
        case Ha:
          var d3 = b3._init;
          return q2(a3, d3(b3._payload), c3);
      }
      if (eb(b3) || Ka(b3))
        return b3 = Tg(b3, a3.mode, c3, null), b3.return = a3, b3;
      Mg(a3, b3);
    }
    return null;
  }
  function r2(a3, b3, c3, d3) {
    var e3 = null !== b3 ? b3.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3)
      return null !== e3 ? null : h2(a3, b3, "" + c3, d3);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e3 ? k2(a3, b3, c3, d3) : null;
        case wa:
          return c3.key === e3 ? l2(a3, b3, c3, d3) : null;
        case Ha:
          return e3 = c3._init, r2(
            a3,
            b3,
            e3(c3._payload),
            d3
          );
      }
      if (eb(c3) || Ka(c3))
        return null !== e3 ? null : m2(a3, b3, c3, d3, null);
      Mg(a3, c3);
    }
    return null;
  }
  function y2(a3, b3, c3, d3, e3) {
    if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3)
      return a3 = a3.get(c3) || null, h2(b3, a3, "" + d3, e3);
    if ("object" === typeof d3 && null !== d3) {
      switch (d3.$$typeof) {
        case va:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b3, a3, d3, e3);
        case wa:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a3, d3, e3);
        case Ha:
          var f3 = d3._init;
          return y2(a3, b3, c3, f3(d3._payload), e3);
      }
      if (eb(d3) || Ka(d3))
        return a3 = a3.get(c3) || null, m2(b3, a3, d3, e3, null);
      Mg(b3, d3);
    }
    return null;
  }
  function n2(e3, g3, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b2(e3, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length)
      return c2(e3, u2), I$1 && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++)
        u2 = q2(e3, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$1 && tg(e3, w2);
      return l3;
    }
    for (u2 = d2(e3, u2); w2 < h3.length; w2++)
      x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b2(e3, a3);
    });
    I$1 && tg(e3, w2);
    return l3;
  }
  function t(e3, g3, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3)
      throw Error(p$5(150));
    h3 = l3.call(h3);
    if (null == h3)
      throw Error(p$5(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t2 = r2(e3, m3, n3.value, k3);
      if (null === t2) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t2.alternate && b2(e3, m3);
      g3 = f2(t2, g3, w2);
      null === u2 ? l3 = t2 : u2.sibling = t2;
      u2 = t2;
      m3 = x2;
    }
    if (n3.done)
      return c2(
        e3,
        m3
      ), I$1 && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next())
        n3 = q2(e3, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$1 && tg(e3, w2);
      return l3;
    }
    for (m3 = d2(e3, m3); !n3.done; w2++, n3 = h3.next())
      n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b2(e3, a3);
    });
    I$1 && tg(e3, w2);
    return l3;
  }
  function J2(a3, d3, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d3; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d3 = e2(l3, f3.props.children);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d3 = e2(l3, f3.props);
                  d3.ref = Lg(a3, l3, f3);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                }
                c2(a3, l3);
                break;
              } else
                b2(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d3 = Tg(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = Lg(a3, d3, f3), h3.return = a3, a3 = h3);
          }
          return g2(a3);
        case wa:
          a: {
            for (l3 = f3.key; null !== d3; ) {
              if (d3.key === l3)
                if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a3, d3.sibling);
                  d3 = e2(d3, f3.children || []);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                } else {
                  c2(a3, d3);
                  break;
                }
              else
                b2(a3, d3);
              d3 = d3.sibling;
            }
            d3 = Sg(f3, a3.mode, h3);
            d3.return = a3;
            a3 = d3;
          }
          return g2(a3);
        case Ha:
          return l3 = f3._init, J2(a3, d3, l3(f3._payload), h3);
      }
      if (eb(f3))
        return n2(a3, d3, f3, h3);
      if (Ka(f3))
        return t(a3, d3, f3, h3);
      Mg(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e2(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = Qg(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a2) {
  var b2 = Wg.current;
  E$1(Wg);
  a2._currentValue = b2;
}
function bh(a2, b2, c2) {
  for (; null !== a2; ) {
    var d2 = a2.alternate;
    (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
    if (a2 === c2)
      break;
    a2 = a2.return;
  }
}
function ch(a2, b2) {
  Xg = a2;
  Zg = Yg = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (dh = true), a2.firstContext = null);
}
function eh(a2) {
  var b2 = a2._currentValue;
  if (Zg !== a2)
    if (a2 = { context: a2, memoizedValue: b2, next: null }, null === Yg) {
      if (null === Xg)
        throw Error(p$5(308));
      Yg = a2;
      Xg.dependencies = { lanes: 0, firstContext: a2 };
    } else
      Yg = Yg.next = a2;
  return b2;
}
var fh = null;
function gh(a2) {
  null === fh ? fh = [a2] : fh.push(a2);
}
function hh(a2, b2, c2, d2) {
  var e2 = b2.interleaved;
  null === e2 ? (c2.next = c2, gh(b2)) : (c2.next = e2.next, e2.next = c2);
  b2.interleaved = c2;
  return ih(a2, d2);
}
function ih(a2, b2) {
  a2.lanes |= b2;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b2);
  c2 = a2;
  for (a2 = a2.return; null !== a2; )
    a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var jh = false;
function kh(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a2, b2) {
  a2 = a2.updateQueue;
  b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function mh(a2, b2) {
  return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function nh(a2, b2, c2) {
  var d2 = a2.updateQueue;
  if (null === d2)
    return null;
  d2 = d2.shared;
  if (0 !== (K & 2)) {
    var e2 = d2.pending;
    null === e2 ? b2.next = b2 : (b2.next = e2.next, e2.next = b2);
    d2.pending = b2;
    return ih(a2, c2);
  }
  e2 = d2.interleaved;
  null === e2 ? (b2.next = b2, gh(d2)) : (b2.next = e2.next, e2.next = b2);
  d2.interleaved = b2;
  return ih(a2, c2);
}
function oh(a2, b2, c2) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a2, c2);
  }
}
function ph(a2, b2) {
  var c2 = a2.updateQueue, d2 = a2.alternate;
  if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e2 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e2 = f2 = b2 : f2 = f2.next = b2;
    } else
      e2 = f2 = b2;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
  c2.lastBaseUpdate = b2;
}
function qh(a2, b2, c2, d2) {
  var e2 = a2.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (null !== h2) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d2 & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a2, t = h2;
          r2 = b2;
          y2 = c2;
          switch (t.tag) {
            case 1:
              n2 = t.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2)
                break a;
              q2 = A$2({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
      } else
        y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h2 = h2.next;
      if (null === h2)
        if (h2 = e2.shared.pending, null === h2)
          break;
        else
          r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b2 = e2.shared.interleaved;
    if (null !== b2) {
      e2 = b2;
      do
        g2 |= e2.lane, e2 = e2.next;
      while (e2 !== b2);
    } else
      null === f2 && (e2.shared.lanes = 0);
    rh |= g2;
    a2.lanes = g2;
    a2.memoizedState = q2;
  }
}
function sh(a2, b2, c2) {
  a2 = b2.effects;
  b2.effects = null;
  if (null !== a2)
    for (b2 = 0; b2 < a2.length; b2++) {
      var d2 = a2[b2], e2 = d2.callback;
      if (null !== e2) {
        d2.callback = null;
        d2 = c2;
        if ("function" !== typeof e2)
          throw Error(p$5(191, e2));
        e2.call(d2);
      }
    }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a2) {
  if (a2 === th)
    throw Error(p$5(174));
  return a2;
}
function yh(a2, b2) {
  G$1(wh, b2);
  G$1(vh, a2);
  G$1(uh, th);
  a2 = b2.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
      break;
    default:
      a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = lb(b2, a2);
  }
  E$1(uh);
  G$1(uh, b2);
}
function zh() {
  E$1(uh);
  E$1(vh);
  E$1(wh);
}
function Ah(a2) {
  xh(wh.current);
  var b2 = xh(uh.current);
  var c2 = lb(b2, a2.type);
  b2 !== c2 && (G$1(vh, a2), G$1(uh, c2));
}
function Bh(a2) {
  vh.current === a2 && (E$1(uh), E$1(vh));
}
var L$1 = Uf(0);
function Ch(a2) {
  for (var b2 = a2; null !== b2; ) {
    if (13 === b2.tag) {
      var c2 = b2.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data))
        return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128))
        return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a2)
      break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a2)
        return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a2 = 0; a2 < Dh.length; a2++)
    Dh[a2]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M$1 = null, N$1 = null, O$1 = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P$1() {
  throw Error(p$5(321));
}
function Mh(a2, b2) {
  if (null === b2)
    return false;
  for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
    if (!He(a2[c2], b2[c2]))
      return false;
  return true;
}
function Nh(a2, b2, c2, d2, e2, f2) {
  Hh = f2;
  M$1 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
  a2 = c2(d2, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2)
        throw Error(p$5(301));
      f2 += 1;
      O$1 = N$1 = null;
      b2.updateQueue = null;
      Fh.current = Qh;
      a2 = c2(d2, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b2 = null !== N$1 && null !== N$1.next;
  Hh = 0;
  O$1 = N$1 = M$1 = null;
  Ih = false;
  if (b2)
    throw Error(p$5(300));
  return a2;
}
function Sh() {
  var a2 = 0 !== Kh;
  Kh = 0;
  return a2;
}
function Th() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O$1 ? M$1.memoizedState = O$1 = a2 : O$1 = O$1.next = a2;
  return O$1;
}
function Uh() {
  if (null === N$1) {
    var a2 = M$1.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else
    a2 = N$1.next;
  var b2 = null === O$1 ? M$1.memoizedState : O$1.next;
  if (null !== b2)
    O$1 = b2, N$1 = a2;
  else {
    if (null === a2)
      throw Error(p$5(310));
    N$1 = a2;
    a2 = { memoizedState: N$1.memoizedState, baseState: N$1.baseState, baseQueue: N$1.baseQueue, queue: N$1.queue, next: null };
    null === O$1 ? M$1.memoizedState = O$1 = a2 : O$1 = O$1.next = a2;
  }
  return O$1;
}
function Vh(a2, b2) {
  return "function" === typeof b2 ? b2(a2) : b2;
}
function Wh(a2) {
  var b2 = Uh(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$5(311));
  c2.lastRenderedReducer = a2;
  var d2 = N$1, e2 = d2.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g2 = e2.next;
      e2.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2)
        null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
        M$1.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d2 : k2.next = h2;
    He(d2, b2.memoizedState) || (dh = true);
    b2.memoizedState = d2;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e2 = a2;
    do
      f2 = e2.lane, M$1.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a2);
  } else
    null === e2 && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function Xh(a2) {
  var b2 = Uh(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$5(311));
  c2.lastRenderedReducer = a2;
  var d2 = c2.dispatch, e2 = c2.pending, f2 = b2.memoizedState;
  if (null !== e2) {
    c2.pending = null;
    var g2 = e2 = e2.next;
    do
      f2 = a2(f2, g2.action), g2 = g2.next;
    while (g2 !== e2);
    He(f2, b2.memoizedState) || (dh = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function Yh() {
}
function Zh(a2, b2) {
  var c2 = M$1, d2 = Uh(), e2 = b2(), f2 = !He(d2.memoizedState, e2);
  f2 && (d2.memoizedState = e2, dh = true);
  d2 = d2.queue;
  $h(ai.bind(null, c2, d2, a2), [a2]);
  if (d2.getSnapshot !== b2 || f2 || null !== O$1 && O$1.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d2, e2, b2), void 0, null);
    if (null === Q$1)
      throw Error(p$5(349));
    0 !== (Hh & 30) || di(c2, b2, e2);
  }
  return e2;
}
function di(a2, b2, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b2, value: c2 };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
}
function ci(a2, b2, c2, d2) {
  b2.value = c2;
  b2.getSnapshot = d2;
  ei(b2) && fi(a2);
}
function ai(a2, b2, c2) {
  return c2(function() {
    ei(b2) && fi(a2);
  });
}
function ei(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b2();
    return !He(a2, c2);
  } catch (d2) {
    return true;
  }
}
function fi(a2) {
  var b2 = ih(a2, 1);
  null !== b2 && gi(b2, a2, 1, -1);
}
function hi(a2) {
  var b2 = Th();
  "function" === typeof a2 && (a2 = a2());
  b2.memoizedState = b2.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
  b2.queue = a2;
  a2 = a2.dispatch = ii.bind(null, M$1, a2);
  return [b2.memoizedState, a2];
}
function bi(a2, b2, c2, d2) {
  a2 = { tag: a2, create: b2, destroy: c2, deps: d2, next: null };
  b2 = M$1.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, M$1.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b2.lastEffect = a2));
  return a2;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a2, b2, c2, d2) {
  var e2 = Th();
  M$1.flags |= a2;
  e2.memoizedState = bi(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
}
function li(a2, b2, c2, d2) {
  var e2 = Uh();
  d2 = void 0 === d2 ? null : d2;
  var f2 = void 0;
  if (null !== N$1) {
    var g2 = N$1.memoizedState;
    f2 = g2.destroy;
    if (null !== d2 && Mh(d2, g2.deps)) {
      e2.memoizedState = bi(b2, c2, f2, d2);
      return;
    }
  }
  M$1.flags |= a2;
  e2.memoizedState = bi(1 | b2, c2, f2, d2);
}
function mi(a2, b2) {
  return ki(8390656, 8, a2, b2);
}
function $h(a2, b2) {
  return li(2048, 8, a2, b2);
}
function ni(a2, b2) {
  return li(4, 2, a2, b2);
}
function oi(a2, b2) {
  return li(4, 4, a2, b2);
}
function pi(a2, b2) {
  if ("function" === typeof b2)
    return a2 = a2(), b2(a2), function() {
      b2(null);
    };
  if (null !== b2 && void 0 !== b2)
    return a2 = a2(), b2.current = a2, function() {
      b2.current = null;
    };
}
function qi(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return li(4, 4, pi.bind(null, b2, a2), c2);
}
function ri() {
}
function si(a2, b2) {
  var c2 = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Mh(b2, d2[1]))
    return d2[0];
  c2.memoizedState = [a2, b2];
  return a2;
}
function ti(a2, b2) {
  var c2 = Uh();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Mh(b2, d2[1]))
    return d2[0];
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}
function ui(a2, b2, c2) {
  if (0 === (Hh & 21))
    return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
  He(c2, b2) || (c2 = yc(), M$1.lanes |= c2, rh |= c2, a2.baseState = true);
  return b2;
}
function vi(a2, b2) {
  var c2 = C;
  C = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d2 = Gh.transition;
  Gh.transition = {};
  try {
    a2(false), b2();
  } finally {
    C = c2, Gh.transition = d2;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a2, b2, c2) {
  var d2 = yi(a2);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2))
    Ai(b2, c2);
  else if (c2 = hh(a2, b2, c2, d2), null !== c2) {
    var e2 = R$1();
    gi(c2, a2, d2, e2);
    Bi(c2, b2, d2);
  }
}
function ii(a2, b2, c2) {
  var d2 = yi(a2), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2))
    Ai(b2, e2);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2))
      try {
        var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
        e2.hasEagerState = true;
        e2.eagerState = h2;
        if (He(h2, g2)) {
          var k2 = b2.interleaved;
          null === k2 ? (e2.next = e2, gh(b2)) : (e2.next = k2.next, k2.next = e2);
          b2.interleaved = e2;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c2 = hh(a2, b2, e2, d2);
    null !== c2 && (e2 = R$1(), gi(c2, a2, d2, e2), Bi(c2, b2, d2));
  }
}
function zi(a2) {
  var b2 = a2.alternate;
  return a2 === M$1 || null !== b2 && b2 === M$1;
}
function Ai(a2, b2) {
  Jh = Ih = true;
  var c2 = a2.pending;
  null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a2.pending = b2;
}
function Bi(a2, b2, c2) {
  if (0 !== (c2 & 4194240)) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a2, c2);
  }
}
var Rh = { readContext: eh, useCallback: P$1, useContext: P$1, useEffect: P$1, useImperativeHandle: P$1, useInsertionEffect: P$1, useLayoutEffect: P$1, useMemo: P$1, useReducer: P$1, useRef: P$1, useState: P$1, useDebugValue: P$1, useDeferredValue: P$1, useTransition: P$1, useMutableSource: P$1, useSyncExternalStore: P$1, useId: P$1, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b2) {
  Th().memoizedState = [a2, void 0 === b2 ? null : b2];
  return a2;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b2, a2),
    c2
  );
}, useLayoutEffect: function(a2, b2) {
  return ki(4194308, 4, a2, b2);
}, useInsertionEffect: function(a2, b2) {
  return ki(4, 2, a2, b2);
}, useMemo: function(a2, b2) {
  var c2 = Th();
  b2 = void 0 === b2 ? null : b2;
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}, useReducer: function(a2, b2, c2) {
  var d2 = Th();
  b2 = void 0 !== c2 ? c2(b2) : b2;
  d2.memoizedState = d2.baseState = b2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
  d2.queue = a2;
  a2 = a2.dispatch = xi.bind(null, M$1, a2);
  return [d2.memoizedState, a2];
}, useRef: function(a2) {
  var b2 = Th();
  a2 = { current: a2 };
  return b2.memoizedState = a2;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
  return Th().memoizedState = a2;
}, useTransition: function() {
  var a2 = hi(false), b2 = a2[0];
  a2 = vi.bind(null, a2[1]);
  Th().memoizedState = a2;
  return [b2, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b2, c2) {
  var d2 = M$1, e2 = Th();
  if (I$1) {
    if (void 0 === c2)
      throw Error(p$5(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (null === Q$1)
      throw Error(p$5(349));
    0 !== (Hh & 30) || di(d2, b2, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d2,
    f2,
    a2
  ), [a2]);
  d2.flags |= 2048;
  bi(9, ci.bind(null, d2, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a2 = Th(), b2 = Q$1.identifierPrefix;
  if (I$1) {
    var c2 = sg;
    var d2 = rg;
    c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else
    c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b2;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a2) {
    var b2 = Uh();
    return ui(b2, N$1.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = Wh(Vh)[0], b2 = Uh().memoizedState;
    return [a2, b2];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a2) {
  var b2 = Uh();
  return null === N$1 ? b2.memoizedState = a2 : ui(b2, N$1.memoizedState, a2);
}, useTransition: function() {
  var a2 = Xh(Vh)[0], b2 = Uh().memoizedState;
  return [a2, b2];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = A$2({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      void 0 === b2[c2] && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
function Di(a2, b2, c2, d2) {
  b2 = a2.memoizedState;
  c2 = c2(d2, b2);
  c2 = null === c2 || void 0 === c2 ? b2 : A$2({}, b2, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var Ei = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
}, enqueueSetState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = R$1(), e2 = yi(a2), f2 = mh(d2, e2);
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = nh(a2, f2, e2);
  null !== b2 && (gi(b2, a2, e2, d2), oh(b2, a2, e2));
}, enqueueReplaceState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = R$1(), e2 = yi(a2), f2 = mh(d2, e2);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = nh(a2, f2, e2);
  null !== b2 && (gi(b2, a2, e2, d2), oh(b2, a2, e2));
}, enqueueForceUpdate: function(a2, b2) {
  a2 = a2._reactInternals;
  var c2 = R$1(), d2 = yi(a2), e2 = mh(c2, d2);
  e2.tag = 2;
  void 0 !== b2 && null !== b2 && (e2.callback = b2);
  b2 = nh(a2, e2, d2);
  null !== b2 && (gi(b2, a2, d2, c2), oh(b2, a2, d2));
} };
function Fi(a2, b2, c2, d2, e2, f2, g2) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie(c2, d2) || !Ie(e2, f2) : true;
}
function Gi(a2, b2, c2) {
  var d2 = false, e2 = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b2) ? Xf : H$1.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e2) : Vf);
  b2 = new b2(c2, f2);
  a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = Ei;
  a2.stateNode = b2;
  b2._reactInternals = a2;
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function Hi(a2, b2, c2, d2) {
  a2 = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
  b2.state !== a2 && Ei.enqueueReplaceState(b2, b2.state, null);
}
function Ii(a2, b2, c2, d2) {
  var e2 = a2.stateNode;
  e2.props = c2;
  e2.state = a2.memoizedState;
  e2.refs = {};
  kh(a2);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b2) ? Xf : H$1.current, e2.context = Yf(a2, f2));
  e2.state = a2.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a2, b2, f2, c2), e2.state = a2.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b2 = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b2 !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a2, c2, e2, d2), e2.state = a2.memoizedState);
  "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
}
function Ji(a2, b2) {
  try {
    var c2 = "", d2 = b2;
    do
      c2 += Pa(d2), d2 = d2.return;
    while (d2);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b2, stack: e2, digest: null };
}
function Ki(a2, b2, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
}
function Li(a2, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a2, b2, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b2.value;
  c2.callback = function() {
    Oi || (Oi = true, Pi = d2);
    Li(a2, b2);
  };
  return c2;
}
function Qi(a2, b2, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  var d2 = a2.type.getDerivedStateFromError;
  if ("function" === typeof d2) {
    var e2 = b2.value;
    c2.payload = function() {
      return d2(e2);
    };
    c2.callback = function() {
      Li(a2, b2);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Li(a2, b2);
    "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Si(a2, b2, c2) {
  var d2 = a2.pingCache;
  if (null === d2) {
    d2 = a2.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d2.set(b2, e2);
  } else
    e2 = d2.get(b2), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b2, e2));
  e2.has(c2) || (e2.add(c2), a2 = Ti.bind(null, a2, b2, c2), b2.then(a2, a2));
}
function Ui(a2) {
  do {
    var b2;
    if (b2 = 13 === a2.tag)
      b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2)
      return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Vi(a2, b2, c2, d2, e2) {
  if (0 === (a2.mode & 1))
    return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c2, b2, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e2;
  return a2;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a2, b2, c2, d2) {
  b2.child = null === a2 ? Vg(b2, null, c2, d2) : Ug(b2, a2.child, c2, d2);
}
function Yi(a2, b2, c2, d2, e2) {
  c2 = c2.render;
  var f2 = b2.ref;
  ch(b2, e2);
  d2 = Nh(a2, b2, c2, d2, f2, e2);
  c2 = Sh();
  if (null !== a2 && !dh)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b2, e2);
  I$1 && c2 && vg(b2);
  b2.flags |= 1;
  Xi(a2, b2, d2, e2);
  return b2.child;
}
function $i(a2, b2, c2, d2, e2) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps)
      return b2.tag = 15, b2.type = f2, bj(a2, b2, f2, d2, e2);
    a2 = Rg(c2.type, null, d2, b2, b2.mode, e2);
    a2.ref = b2.ref;
    a2.return = b2;
    return b2.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e2)) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie;
    if (c2(g2, d2) && a2.ref === b2.ref)
      return Zi(a2, b2, e2);
  }
  b2.flags |= 1;
  a2 = Pg(f2, d2);
  a2.ref = b2.ref;
  a2.return = b2;
  return b2.child = a2;
}
function bj(a2, b2, c2, d2, e2) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie(f2, d2) && a2.ref === b2.ref)
      if (dh = false, b2.pendingProps = d2 = f2, 0 !== (a2.lanes & e2))
        0 !== (a2.flags & 131072) && (dh = true);
      else
        return b2.lanes = a2.lanes, Zi(a2, b2, e2);
  }
  return cj(a2, b2, c2, d2, e2);
}
function dj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d2.mode)
    if (0 === (b2.mode & 1))
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(ej, fj), fj |= c2;
    else {
      if (0 === (c2 & 1073741824))
        return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G$1(ej, fj), fj |= a2, null;
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d2 = null !== f2 ? f2.baseLanes : c2;
      G$1(ej, fj);
      fj |= d2;
    }
  else
    null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G$1(ej, fj), fj |= d2;
  Xi(a2, b2, e2, c2);
  return b2.child;
}
function gj(a2, b2) {
  var c2 = b2.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2)
    b2.flags |= 512, b2.flags |= 2097152;
}
function cj(a2, b2, c2, d2, e2) {
  var f2 = Zf(c2) ? Xf : H$1.current;
  f2 = Yf(b2, f2);
  ch(b2, e2);
  c2 = Nh(a2, b2, c2, d2, f2, e2);
  d2 = Sh();
  if (null !== a2 && !dh)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b2, e2);
  I$1 && d2 && vg(b2);
  b2.flags |= 1;
  Xi(a2, b2, c2, e2);
  return b2.child;
}
function hj(a2, b2, c2, d2, e2) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b2);
  } else
    f2 = false;
  ch(b2, e2);
  if (null === b2.stateNode)
    ij(a2, b2), Gi(b2, c2, d2), Ii(b2, c2, d2, e2), d2 = true;
  else if (null === a2) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H$1.current, l2 = Yf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && Hi(b2, g2, d2, l2);
    jh = false;
    var r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d2, g2, e2);
    k2 = b2.memoizedState;
    h2 !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = jh || Fi(b2, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
  } else {
    g2 = b2.stateNode;
    lh(a2, b2);
    h2 = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h2 : Ci(b2.type, h2);
    g2.props = l2;
    q2 = b2.pendingProps;
    r2 = g2.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H$1.current, k2 = Yf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi(b2, g2, d2, k2);
    jh = false;
    r2 = b2.memoizedState;
    g2.state = r2;
    qh(b2, d2, g2, e2);
    var n2 = b2.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = jh || Fi(b2, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), d2 = false);
  }
  return jj(a2, b2, c2, d2, f2, e2);
}
function jj(a2, b2, c2, d2, e2, f2) {
  gj(a2, b2);
  var g2 = 0 !== (b2.flags & 128);
  if (!d2 && !g2)
    return e2 && dg(b2, c2, false), Zi(a2, b2, f2);
  d2 = b2.stateNode;
  Wi.current = b2;
  var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
  b2.flags |= 1;
  null !== a2 && g2 ? (b2.child = Ug(b2, a2.child, null, f2), b2.child = Ug(b2, null, h2, f2)) : Xi(a2, b2, h2, f2);
  b2.memoizedState = d2.state;
  e2 && dg(b2, c2, true);
  return b2.child;
}
function kj(a2) {
  var b2 = a2.stateNode;
  b2.pendingContext ? ag(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a2, b2.context, false);
  yh(a2, b2.containerInfo);
}
function lj(a2, b2, c2, d2, e2) {
  Ig();
  Jg(e2);
  b2.flags |= 256;
  Xi(a2, b2, c2, d2);
  return b2.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function oj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = L$1.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
  if (h2)
    f2 = true, b2.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState)
    e2 |= 1;
  G$1(L$1, e2 & 1);
  if (null === a2) {
    Eg(b2);
    a2 = b2.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2))
      return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g2 = d2.children;
    a2 = d2.fallback;
    return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a2 = Tg(a2, d2, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = nj(c2), b2.memoizedState = mj, a2) : qj(b2, g2);
  }
  e2 = a2.memoizedState;
  if (null !== e2 && (h2 = e2.dehydrated, null !== h2))
    return rj(a2, b2, g2, d2, h2, e2, c2);
  if (f2) {
    f2 = d2.fallback;
    g2 = b2.mode;
    e2 = a2.child;
    h2 = e2.sibling;
    var k2 = { mode: "hidden", children: d2.children };
    0 === (g2 & 1) && b2.child !== e2 ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k2, b2.deletions = null) : (d2 = Pg(e2, k2), d2.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
    f2.return = b2;
    d2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    d2 = f2;
    f2 = b2.child;
    g2 = a2.child.memoizedState;
    g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a2.childLanes & ~c2;
    b2.memoizedState = mj;
    return d2;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d2 = Pg(f2, { mode: "visible", children: d2.children });
  0 === (b2.mode & 1) && (d2.lanes = c2);
  d2.return = b2;
  d2.sibling = null;
  null !== a2 && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a2], b2.flags |= 16) : c2.push(a2));
  b2.child = d2;
  b2.memoizedState = null;
  return d2;
}
function qj(a2, b2) {
  b2 = pj({ mode: "visible", children: b2 }, a2.mode, 0, null);
  b2.return = a2;
  return a2.child = b2;
}
function sj(a2, b2, c2, d2) {
  null !== d2 && Jg(d2);
  Ug(b2, a2.child, null, c2);
  a2 = qj(b2, b2.pendingProps.children);
  a2.flags |= 2;
  b2.memoizedState = null;
  return a2;
}
function rj(a2, b2, c2, d2, e2, f2, g2) {
  if (c2) {
    if (b2.flags & 256)
      return b2.flags &= -257, d2 = Ki(Error(p$5(422))), sj(a2, b2, g2, d2);
    if (null !== b2.memoizedState)
      return b2.child = a2.child, b2.flags |= 128, null;
    f2 = d2.fallback;
    e2 = b2.mode;
    d2 = pj({ mode: "visible", children: d2.children }, e2, 0, null);
    f2 = Tg(f2, e2, g2, null);
    f2.flags |= 2;
    d2.return = b2;
    f2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    0 !== (b2.mode & 1) && Ug(b2, a2.child, null, g2);
    b2.child.memoizedState = nj(g2);
    b2.memoizedState = mj;
    return f2;
  }
  if (0 === (b2.mode & 1))
    return sj(a2, b2, g2, null);
  if ("$!" === e2.data) {
    d2 = e2.nextSibling && e2.nextSibling.dataset;
    if (d2)
      var h2 = d2.dgst;
    d2 = h2;
    f2 = Error(p$5(419));
    d2 = Ki(f2, d2, void 0);
    return sj(a2, b2, g2, d2);
  }
  h2 = 0 !== (g2 & a2.childLanes);
  if (dh || h2) {
    d2 = Q$1;
    if (null !== d2) {
      switch (g2 & -g2) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d2.suspendedLanes | g2)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a2, e2), gi(d2, a2, e2, -1));
    }
    tj();
    d2 = Ki(Error(p$5(421)));
    return sj(a2, b2, g2, d2);
  }
  if ("$?" === e2.data)
    return b2.flags |= 128, b2.child = a2.child, b2 = uj.bind(null, a2), e2._reactRetry = b2, null;
  a2 = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b2;
  I$1 = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b2);
  b2 = qj(b2, d2.children);
  b2.flags |= 4096;
  return b2;
}
function vj(a2, b2, c2) {
  a2.lanes |= b2;
  var d2 = a2.alternate;
  null !== d2 && (d2.lanes |= b2);
  bh(a2.return, b2, c2);
}
function wj(a2, b2, c2, d2, e2) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
}
function xj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
  Xi(a2, b2, d2.children, c2);
  d2 = L$1.current;
  if (0 !== (d2 & 2))
    d2 = d2 & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128))
      a:
        for (a2 = b2.child; null !== a2; ) {
          if (13 === a2.tag)
            null !== a2.memoizedState && vj(a2, c2, b2);
          else if (19 === a2.tag)
            vj(a2, c2, b2);
          else if (null !== a2.child) {
            a2.child.return = a2;
            a2 = a2.child;
            continue;
          }
          if (a2 === b2)
            break a;
          for (; null === a2.sibling; ) {
            if (null === a2.return || a2.return === b2)
              break a;
            a2 = a2.return;
          }
          a2.sibling.return = a2.return;
          a2 = a2.sibling;
        }
    d2 &= 1;
  }
  G$1(L$1, d2);
  if (0 === (b2.mode & 1))
    b2.memoizedState = null;
  else
    switch (e2) {
      case "forwards":
        c2 = b2.child;
        for (e2 = null; null !== c2; )
          a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e2 = c2), c2 = c2.sibling;
        c2 = e2;
        null === c2 ? (e2 = b2.child, b2.child = null) : (e2 = c2.sibling, c2.sibling = null);
        wj(b2, false, e2, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e2 = b2.child;
        for (b2.child = null; null !== e2; ) {
          a2 = e2.alternate;
          if (null !== a2 && null === Ch(a2)) {
            b2.child = e2;
            break;
          }
          a2 = e2.sibling;
          e2.sibling = c2;
          c2 = e2;
          e2 = a2;
        }
        wj(b2, true, c2, null, f2);
        break;
      case "together":
        wj(b2, false, null, null, void 0);
        break;
      default:
        b2.memoizedState = null;
    }
  return b2.child;
}
function ij(a2, b2) {
  0 === (b2.mode & 1) && null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function Zi(a2, b2, c2) {
  null !== a2 && (b2.dependencies = a2.dependencies);
  rh |= b2.lanes;
  if (0 === (c2 & b2.childLanes))
    return null;
  if (null !== a2 && b2.child !== a2.child)
    throw Error(p$5(153));
  if (null !== b2.child) {
    a2 = b2.child;
    c2 = Pg(a2, a2.pendingProps);
    b2.child = c2;
    for (c2.return = b2; null !== a2.sibling; )
      a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function yj(a2, b2, c2) {
  switch (b2.tag) {
    case 3:
      kj(b2);
      Ig();
      break;
    case 5:
      Ah(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      yh(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b2.type._context, e2 = b2.memoizedProps.value;
      G$1(Wg, d2._currentValue);
      d2._currentValue = e2;
      break;
    case 13:
      d2 = b2.memoizedState;
      if (null !== d2) {
        if (null !== d2.dehydrated)
          return G$1(L$1, L$1.current & 1), b2.flags |= 128, null;
        if (0 !== (c2 & b2.child.childLanes))
          return oj(a2, b2, c2);
        G$1(L$1, L$1.current & 1);
        a2 = Zi(a2, b2, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G$1(L$1, L$1.current & 1);
      break;
    case 19:
      d2 = 0 !== (c2 & b2.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d2)
          return xj(a2, b2, c2);
        b2.flags |= 128;
      }
      e2 = b2.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G$1(L$1, L$1.current);
      if (d2)
        break;
      else
        return null;
    case 22:
    case 23:
      return b2.lanes = 0, dj(a2, b2, c2);
  }
  return Zi(a2, b2, c2);
}
var zj, Aj, Bj, Cj;
zj = function(a2, b2) {
  for (var c2 = b2.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag)
      a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2)
      break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b2)
        return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Aj = function() {
};
Bj = function(a2, b2, c2, d2) {
  var e2 = a2.memoizedProps;
  if (e2 !== d2) {
    a2 = b2.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Ya(a2, e2);
        d2 = Ya(a2, d2);
        f2 = [];
        break;
      case "select":
        e2 = A$2({}, e2, { value: void 0 });
        d2 = A$2({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a2, e2);
        d2 = gb(a2, d2);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
    }
    ub(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e2)
      if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2])
        if ("style" === l2) {
          var h2 = e2[l2];
          for (g2 in h2)
            h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = null != e2 ? e2[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2))
        if ("style" === l2)
          if (h2) {
            for (g2 in h2)
              !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
            for (g2 in k2)
              k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
          } else
            c2 || (f2 || (f2 = []), f2.push(
              l2,
              c2
            )), c2 = k2;
        else
          "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2)
      b2.flags |= 4;
  }
};
Cj = function(a2, b2, c2, d2) {
  c2 !== d2 && (b2.flags |= 4);
};
function Dj(a2, b2) {
  if (!I$1)
    switch (a2.tailMode) {
      case "hidden":
        b2 = a2.tail;
        for (var c2 = null; null !== b2; )
          null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
        null === c2 ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d2 = null; null !== c2; )
          null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
        null === d2 ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
    }
}
function S$1(a2) {
  var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
  if (b2)
    for (var e2 = a2.child; null !== e2; )
      c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
  else
    for (e2 = a2.child; null !== e2; )
      c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a2, e2 = e2.sibling;
  a2.subtreeFlags |= d2;
  a2.childLanes = c2;
  return b2;
}
function Ej(a2, b2, c2) {
  var d2 = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$1(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S$1(b2), null;
    case 3:
      d2 = b2.stateNode;
      zh();
      E$1(Wf);
      E$1(H$1);
      Eh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (null === a2 || null === a2.child)
        Gg(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a2, b2);
      S$1(b2);
      return null;
    case 5:
      Bh(b2);
      var e2 = xh(wh.current);
      c2 = b2.type;
      if (null !== a2 && null != b2.stateNode)
        Bj(a2, b2, c2, d2, e2), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d2) {
          if (null === b2.stateNode)
            throw Error(p$5(166));
          S$1(b2);
          return null;
        }
        a2 = xh(uh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d2[Of] = b2;
          d2[Pf] = f2;
          a2 = 0 !== (b2.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d2);
              D$1("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d2);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++)
                D$1(lf[e2], d2);
              break;
            case "source":
              D$1("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d2
              );
              D$1("load", d2);
              break;
            case "details":
              D$1("toggle", d2);
              break;
            case "input":
              Za(d2, f2);
              D$1("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d2);
              break;
            case "textarea":
              hb(d2, f2), D$1("invalid", d2);
          }
          ub(c2, f2);
          e2 = null;
          for (var g2 in f2)
            if (f2.hasOwnProperty(g2)) {
              var h2 = f2[g2];
              "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a2), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
                d2.textContent,
                h2,
                a2
              ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D$1("scroll", d2);
            }
          switch (c2) {
            case "input":
              Va(d2);
              db(d2, f2, true);
              break;
            case "textarea":
              Va(d2);
              jb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d2.onclick = Bf);
          }
          d2 = e2;
          b2.updateQueue = d2;
          null !== d2 && (b2.flags |= 4);
        } else {
          g2 = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
          a2[Of] = b2;
          a2[Pf] = d2;
          zj(a2, b2, false, false);
          b2.stateNode = a2;
          a: {
            g2 = vb(c2, d2);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e2 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e2 = d2;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++)
                  D$1(lf[e2], a2);
                e2 = d2;
                break;
              case "source":
                D$1("error", a2);
                e2 = d2;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a2
                );
                D$1("load", a2);
                e2 = d2;
                break;
              case "details":
                D$1("toggle", a2);
                e2 = d2;
                break;
              case "input":
                Za(a2, d2);
                e2 = Ya(a2, d2);
                D$1("invalid", a2);
                break;
              case "option":
                e2 = d2;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d2.multiple };
                e2 = A$2({}, d2, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb(a2, d2);
                e2 = gb(a2, d2);
                D$1("invalid", a2);
                break;
              default:
                e2 = d2;
            }
            ub(c2, e2);
            h2 = e2;
            for (f2 in h2)
              if (h2.hasOwnProperty(f2)) {
                var k2 = h2[f2];
                "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a2) : null != k2 && ta(a2, f2, k2, g2));
              }
            switch (c2) {
              case "input":
                Va(a2);
                db(a2, d2, false);
                break;
              case "textarea":
                Va(a2);
                jb(a2);
                break;
              case "option":
                null != d2.value && a2.setAttribute("value", "" + Sa(d2.value));
                break;
              case "select":
                a2.multiple = !!d2.multiple;
                f2 = d2.value;
                null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                  a2,
                  !!d2.multiple,
                  d2.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S$1(b2);
      return null;
    case 6:
      if (a2 && null != b2.stateNode)
        Cj(a2, b2, a2.memoizedProps, d2);
      else {
        if ("string" !== typeof d2 && null === b2.stateNode)
          throw Error(p$5(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.memoizedProps;
          d2[Of] = b2;
          if (f2 = d2.nodeValue !== c2) {
            if (a2 = xg, null !== a2)
              switch (a2.tag) {
                case 3:
                  Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                  break;
                case 5:
                  true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
              }
          }
          f2 && (b2.flags |= 4);
        } else
          d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
      }
      S$1(b2);
      return null;
    case 13:
      E$1(L$1);
      d2 = b2.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I$1 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128))
          Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
          if (null === a2) {
            if (!f2)
              throw Error(p$5(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2)
              throw Error(p$5(317));
            f2[Of] = b2;
          } else
            Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S$1(b2);
          f2 = false;
        } else
          null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2)
          return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128))
        return b2.lanes = c2, b2;
      d2 = null !== d2;
      d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (L$1.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S$1(b2);
      return null;
    case 4:
      return zh(), Aj(a2, b2), null === a2 && sf(b2.stateNode.containerInfo), S$1(b2), null;
    case 10:
      return ah(b2.type._context), S$1(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S$1(b2), null;
    case 19:
      E$1(L$1);
      f2 = b2.memoizedState;
      if (null === f2)
        return S$1(b2), null;
      d2 = 0 !== (b2.flags & 128);
      g2 = f2.rendering;
      if (null === g2)
        if (d2)
          Dj(f2, false);
        else {
          if (0 !== T || null !== a2 && 0 !== (a2.flags & 128))
            for (a2 = b2.child; null !== a2; ) {
              g2 = Ch(a2);
              if (null !== g2) {
                b2.flags |= 128;
                Dj(f2, false);
                d2 = g2.updateQueue;
                null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
                b2.subtreeFlags = 0;
                d2 = c2;
                for (c2 = b2.child; null !== c2; )
                  f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                G$1(L$1, L$1.current & 1 | 2);
                return b2.child;
              }
              a2 = a2.sibling;
            }
          null !== f2.tail && B$1() > Gj && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
        }
      else {
        if (!d2)
          if (a2 = Ch(g2), null !== a2) {
            if (b2.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I$1)
              return S$1(b2), null;
          } else
            2 * B$1() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Dj(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (null !== f2.tail)
        return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B$1(), b2.sibling = null, c2 = L$1.current, G$1(L$1, d2 ? c2 & 1 | 2 : c2 & 1), b2;
      S$1(b2);
      return null;
    case 22:
    case 23:
      return Hj(), d2 = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S$1(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S$1(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$5(156, b2.tag));
}
function Ij(a2, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 3:
      return zh(), E$1(Wf), E$1(H$1), Eh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 5:
      return Bh(b2), null;
    case 13:
      E$1(L$1);
      a2 = b2.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b2.alternate)
          throw Error(p$5(340));
        Ig();
      }
      a2 = b2.flags;
      return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 19:
      return E$1(L$1), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b2.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U$1 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a2, b2) {
  var c2 = a2.ref;
  if (null !== c2)
    if ("function" === typeof c2)
      try {
        c2(null);
      } catch (d2) {
        W$1(a2, b2, d2);
      }
    else
      c2.current = null;
}
function Mj(a2, b2, c2) {
  try {
    c2();
  } catch (d2) {
    W$1(a2, b2, d2);
  }
}
var Nj = false;
function Oj(a2, b2) {
  Cf = dd;
  a2 = Me();
  if (Ne(a2)) {
    if ("selectionStart" in a2)
      var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else
      a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && 0 !== d2.rangeCount) {
          c2 = d2.anchorNode;
          var e2 = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h2 = g2 + e2);
                q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
                3 === q2.nodeType && (g2 += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild))
                  break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a2)
                  break b;
                r2 === c2 && ++l2 === e2 && (h2 = g2);
                r2 === f2 && ++m2 === d2 && (k2 = g2);
                if (null !== (y2 = q2.nextSibling))
                  break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
          c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
        } else
          c2 = null;
      }
    c2 = c2 || { start: 0, end: 0 };
  } else
    c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd = false;
  for (V = b2; null !== V; )
    if (b2 = V, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2)
      a2.return = b2, V = a2;
    else
      for (; null !== V; ) {
        b2 = V;
        try {
          var n2 = b2.alternate;
          if (0 !== (b2.flags & 1024))
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n2) {
                  var t = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t : Ci(b2.type, t), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b2.stateNode.containerInfo;
                1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$5(163));
            }
        } catch (F2) {
          W$1(b2, b2.return, F2);
        }
        a2 = b2.sibling;
        if (null !== a2) {
          a2.return = b2.return;
          V = a2;
          break;
        }
        V = b2.return;
      }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a2, b2, c2) {
  var d2 = b2.updateQueue;
  d2 = null !== d2 ? d2.lastEffect : null;
  if (null !== d2) {
    var e2 = d2 = d2.next;
    do {
      if ((e2.tag & a2) === a2) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b2, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d2);
  }
}
function Qj(a2, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Rj(a2) {
  var b2 = a2.ref;
  if (null !== b2) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b2 ? b2(a2) : b2.current = a2;
  }
}
function Sj(a2) {
  var b2 = a2.alternate;
  null !== b2 && (a2.alternate = null, Sj(b2));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Tj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Uj(a2) {
  a:
    for (; ; ) {
      for (; null === a2.sibling; ) {
        if (null === a2.return || Tj(a2.return))
          return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
        if (a2.flags & 2)
          continue a;
        if (null === a2.child || 4 === a2.tag)
          continue a;
        else
          a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2))
        return a2.stateNode;
    }
}
function Vj(a2, b2, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2)
    a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d2 && (a2 = a2.child, null !== a2))
    for (Vj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
      Vj(a2, b2, c2), a2 = a2.sibling;
}
function Wj(a2, b2, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2)
    a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
  else if (4 !== d2 && (a2 = a2.child, null !== a2))
    for (Wj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
      Wj(a2, b2, c2), a2 = a2.sibling;
}
var X$1 = null, Xj = false;
function Yj(a2, b2, c2) {
  for (c2 = c2.child; null !== c2; )
    Zj(a2, b2, c2), c2 = c2.sibling;
}
function Zj(a2, b2, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount)
    try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h2) {
    }
  switch (c2.tag) {
    case 5:
      U$1 || Lj(c2, b2);
    case 6:
      var d2 = X$1, e2 = Xj;
      X$1 = null;
      Yj(a2, b2, c2);
      X$1 = d2;
      Xj = e2;
      null !== X$1 && (Xj ? (a2 = X$1, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X$1.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X$1 && (Xj ? (a2 = X$1, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X$1, c2.stateNode));
      break;
    case 4:
      d2 = X$1;
      e2 = Xj;
      X$1 = c2.stateNode.containerInfo;
      Xj = true;
      Yj(a2, b2, c2);
      X$1 = d2;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
        e2 = d2 = d2.next;
        do {
          var f2 = e2, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b2, g2) : 0 !== (f2 & 4) && Mj(c2, b2, g2));
          e2 = e2.next;
        } while (e2 !== d2);
      }
      Yj(a2, b2, c2);
      break;
    case 1:
      if (!U$1 && (Lj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount))
        try {
          d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
        } catch (h2) {
          W$1(c2, b2, h2);
        }
      Yj(a2, b2, c2);
      break;
    case 21:
      Yj(a2, b2, c2);
      break;
    case 22:
      c2.mode & 1 ? (U$1 = (d2 = U$1) || null !== c2.memoizedState, Yj(a2, b2, c2), U$1 = d2) : Yj(a2, b2, c2);
      break;
    default:
      Yj(a2, b2, c2);
  }
}
function ak(a2) {
  var b2 = a2.updateQueue;
  if (null !== b2) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Kj());
    b2.forEach(function(b3) {
      var d2 = bk.bind(null, a2, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
    });
  }
}
function ck(a2, b2) {
  var c2 = b2.deletions;
  if (null !== c2)
    for (var d2 = 0; d2 < c2.length; d2++) {
      var e2 = c2[d2];
      try {
        var f2 = a2, g2 = b2, h2 = g2;
        a:
          for (; null !== h2; ) {
            switch (h2.tag) {
              case 5:
                X$1 = h2.stateNode;
                Xj = false;
                break a;
              case 3:
                X$1 = h2.stateNode.containerInfo;
                Xj = true;
                break a;
              case 4:
                X$1 = h2.stateNode.containerInfo;
                Xj = true;
                break a;
            }
            h2 = h2.return;
          }
        if (null === X$1)
          throw Error(p$5(160));
        Zj(f2, g2, e2);
        X$1 = null;
        Xj = false;
        var k2 = e2.alternate;
        null !== k2 && (k2.return = null);
        e2.return = null;
      } catch (l2) {
        W$1(e2, b2, l2);
      }
    }
  if (b2.subtreeFlags & 12854)
    for (b2 = b2.child; null !== b2; )
      dk(b2, a2), b2 = b2.sibling;
}
function dk(a2, b2) {
  var c2 = a2.alternate, d2 = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b2, a2);
      ek(a2);
      if (d2 & 4) {
        try {
          Pj(3, a2, a2.return), Qj(3, a2);
        } catch (t) {
          W$1(a2, a2.return, t);
        }
        try {
          Pj(5, a2, a2.return);
        } catch (t) {
          W$1(a2, a2.return, t);
        }
      }
      break;
    case 1:
      ck(b2, a2);
      ek(a2);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      break;
    case 5:
      ck(b2, a2);
      ek(a2);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      if (a2.flags & 32) {
        var e2 = a2.stateNode;
        try {
          ob(e2, "");
        } catch (t) {
          W$1(a2, a2.return, t);
        }
      }
      if (d2 & 4 && (e2 = a2.stateNode, null != e2)) {
        var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2)
          try {
            "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
            vb(h2, g2);
            var l2 = vb(h2, f2);
            for (g2 = 0; g2 < k2.length; g2 += 2) {
              var m2 = k2[g2], q2 = k2[g2 + 1];
              "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
            }
            switch (h2) {
              case "input":
                bb(e2, f2);
                break;
              case "textarea":
                ib(e2, f2);
                break;
              case "select":
                var r2 = e2._wrapperState.wasMultiple;
                e2._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e2,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e2[Pf] = f2;
          } catch (t) {
            W$1(a2, a2.return, t);
          }
      }
      break;
    case 6:
      ck(b2, a2);
      ek(a2);
      if (d2 & 4) {
        if (null === a2.stateNode)
          throw Error(p$5(162));
        e2 = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t) {
          W$1(a2, a2.return, t);
        }
      }
      break;
    case 3:
      ck(b2, a2);
      ek(a2);
      if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated)
        try {
          bd(b2.containerInfo);
        } catch (t) {
          W$1(a2, a2.return, t);
        }
      break;
    case 4:
      ck(b2, a2);
      ek(a2);
      break;
    case 13:
      ck(b2, a2);
      ek(a2);
      e2 = a2.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B$1()));
      d2 & 4 && ak(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U$1 = (l2 = U$1) || m2, ck(b2, a2), U$1 = l2) : ck(b2, a2);
      ek(a2);
      if (d2 & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1))
          for (V = a2, m2 = a2.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d2 = r2;
                    c2 = r2.return;
                    try {
                      b2 = d2, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                    } catch (t) {
                      W$1(d2, c2, t);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a2; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
                } catch (t) {
                  W$1(a2, a2.return, t);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t) {
                  W$1(a2, a2.return, t);
                }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a2)
              break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a2)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      ck(b2, a2);
      ek(a2);
      d2 & 4 && ak(a2);
      break;
    case 21:
      break;
    default:
      ck(
        b2,
        a2
      ), ek(a2);
  }
}
function ek(a2) {
  var b2 = a2.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Tj(c2)) {
            var d2 = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$5(160));
      }
      switch (d2.tag) {
        case 5:
          var e2 = d2.stateNode;
          d2.flags & 32 && (ob(e2, ""), d2.flags &= -33);
          var f2 = Uj(a2);
          Wj(a2, f2, e2);
          break;
        case 3:
        case 4:
          var g2 = d2.stateNode.containerInfo, h2 = Uj(a2);
          Vj(a2, h2, g2);
          break;
        default:
          throw Error(p$5(161));
      }
    } catch (k2) {
      W$1(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b2 & 4096 && (a2.flags &= -4097);
}
function hk(a2, b2, c2) {
  V = a2;
  ik(a2);
}
function ik(a2, b2, c2) {
  for (var d2 = 0 !== (a2.mode & 1); null !== V; ) {
    var e2 = V, f2 = e2.child;
    if (22 === e2.tag && d2) {
      var g2 = null !== e2.memoizedState || Jj;
      if (!g2) {
        var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U$1;
        h2 = Jj;
        var l2 = U$1;
        Jj = g2;
        if ((U$1 = k2) && !l2)
          for (V = e2; null !== V; )
            g2 = V, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g2, V = k2) : jk(e2);
        for (; null !== f2; )
          V = f2, ik(f2), f2 = f2.sibling;
        V = e2;
        Jj = h2;
        U$1 = l2;
      }
      kk(a2);
    } else
      0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V = f2) : kk(a2);
  }
}
function kk(a2) {
  for (; null !== V; ) {
    var b2 = V;
    if (0 !== (b2.flags & 8772)) {
      var c2 = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772))
          switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              U$1 || Qj(5, b2);
              break;
            case 1:
              var d2 = b2.stateNode;
              if (b2.flags & 4 && !U$1)
                if (null === c2)
                  d2.componentDidMount();
                else {
                  var e2 = b2.elementType === b2.type ? c2.memoizedProps : Ci(b2.type, c2.memoizedProps);
                  d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b2.updateQueue;
              null !== f2 && sh(b2, f2, d2);
              break;
            case 3:
              var g2 = b2.updateQueue;
              if (null !== g2) {
                c2 = null;
                if (null !== b2.child)
                  switch (b2.child.tag) {
                    case 5:
                      c2 = b2.child.stateNode;
                      break;
                    case 1:
                      c2 = b2.child.stateNode;
                  }
                sh(b2, g2, c2);
              }
              break;
            case 5:
              var h2 = b2.stateNode;
              if (null === c2 && b2.flags & 4) {
                c2 = h2;
                var k2 = b2.memoizedProps;
                switch (b2.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b2.memoizedState) {
                var l2 = b2.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$5(163));
          }
        U$1 || b2.flags & 512 && Rj(b2);
      } catch (r2) {
        W$1(b2, b2.return, r2);
      }
    }
    if (b2 === a2) {
      V = null;
      break;
    }
    c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V = c2;
      break;
    }
    V = b2.return;
  }
}
function gk(a2) {
  for (; null !== V; ) {
    var b2 = V;
    if (b2 === a2) {
      V = null;
      break;
    }
    var c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V = c2;
      break;
    }
    V = b2.return;
  }
}
function jk(a2) {
  for (; null !== V; ) {
    var b2 = V;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Qj(4, b2);
          } catch (k2) {
            W$1(b2, c2, k2);
          }
          break;
        case 1:
          var d2 = b2.stateNode;
          if ("function" === typeof d2.componentDidMount) {
            var e2 = b2.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              W$1(b2, e2, k2);
            }
          }
          var f2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W$1(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Rj(b2);
          } catch (k2) {
            W$1(b2, g2, k2);
          }
      }
    } catch (k2) {
      W$1(b2, b2.return, k2);
    }
    if (b2 === a2) {
      V = null;
      break;
    }
    var h2 = b2.sibling;
    if (null !== h2) {
      h2.return = b2.return;
      V = h2;
      break;
    }
    V = b2.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q$1 = null, Y = null, Z$1 = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R$1() {
  return 0 !== (K & 6) ? B$1() : -1 !== Ak ? Ak : Ak = B$1();
}
function yi(a2) {
  if (0 === (a2.mode & 1))
    return 1;
  if (0 !== (K & 2) && 0 !== Z$1)
    return Z$1 & -Z$1;
  if (null !== Kg.transition)
    return 0 === Bk && (Bk = yc()), Bk;
  a2 = C;
  if (0 !== a2)
    return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd(a2.type);
  return a2;
}
function gi(a2, b2, c2, d2) {
  if (50 < yk)
    throw yk = 0, zk = null, Error(p$5(185));
  Ac(a2, c2, d2);
  if (0 === (K & 2) || a2 !== Q$1)
    a2 === Q$1 && (0 === (K & 2) && (qk |= c2), 4 === T && Ck(a2, Z$1)), Dk(a2, d2), 1 === c2 && 0 === K && 0 === (b2.mode & 1) && (Gj = B$1() + 500, fg && jg());
}
function Dk(a2, b2) {
  var c2 = a2.callbackNode;
  wc(a2, b2);
  var d2 = uc(a2, a2 === Q$1 ? Z$1 : 0);
  if (0 === d2)
    null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b2 = d2 & -d2, a2.callbackPriority !== b2) {
    null != c2 && bc(c2);
    if (1 === b2)
      0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
        0 === (K & 6) && jg();
      }), c2 = null;
    else {
      switch (Dc(d2)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Fk(c2, Gk.bind(null, a2));
    }
    a2.callbackPriority = b2;
    a2.callbackNode = c2;
  }
}
function Gk(a2, b2) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6))
    throw Error(p$5(327));
  var c2 = a2.callbackNode;
  if (Hk() && a2.callbackNode !== c2)
    return null;
  var d2 = uc(a2, a2 === Q$1 ? Z$1 : 0);
  if (0 === d2)
    return null;
  if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b2)
    b2 = Ik(a2, d2);
  else {
    b2 = d2;
    var e2 = K;
    K |= 2;
    var f2 = Jk();
    if (Q$1 !== a2 || Z$1 !== b2)
      uk = null, Gj = B$1() + 500, Kk(a2, b2);
    do
      try {
        Lk();
        break;
      } catch (h2) {
        Mk(a2, h2);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e2;
    null !== Y ? b2 = 0 : (Q$1 = null, Z$1 = 0, b2 = T);
  }
  if (0 !== b2) {
    2 === b2 && (e2 = xc(a2), 0 !== e2 && (d2 = e2, b2 = Nk(a2, e2)));
    if (1 === b2)
      throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B$1()), c2;
    if (6 === b2)
      Ck(a2, d2);
    else {
      e2 = a2.current.alternate;
      if (0 === (d2 & 30) && !Ok(e2) && (b2 = Ik(a2, d2), 2 === b2 && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b2 = Nk(a2, f2))), 1 === b2))
        throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B$1()), c2;
      a2.finishedWork = e2;
      a2.finishedLanes = d2;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$5(345));
        case 2:
          Pk(a2, tk, uk);
          break;
        case 3:
          Ck(a2, d2);
          if ((d2 & 130023424) === d2 && (b2 = fk + 500 - B$1(), 10 < b2)) {
            if (0 !== uc(a2, 0))
              break;
            e2 = a2.suspendedLanes;
            if ((e2 & d2) !== d2) {
              R$1();
              a2.pingedLanes |= a2.suspendedLanes & e2;
              break;
            }
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b2);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 4:
          Ck(a2, d2);
          if ((d2 & 4194240) === d2)
            break;
          b2 = a2.eventTimes;
          for (e2 = -1; 0 < d2; ) {
            var g2 = 31 - oc(d2);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e2 && (e2 = g2);
            d2 &= ~f2;
          }
          d2 = e2;
          d2 = B$1() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
          if (10 < d2) {
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d2);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 5:
          Pk(a2, tk, uk);
          break;
        default:
          throw Error(p$5(329));
      }
    }
  }
  Dk(a2, B$1());
  return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
}
function Nk(a2, b2) {
  var c2 = sk;
  a2.current.memoizedState.isDehydrated && (Kk(a2, b2).flags |= 256);
  a2 = Ik(a2, b2);
  2 !== a2 && (b2 = tk, tk = c2, null !== b2 && Fj(b2));
  return a2;
}
function Fj(a2) {
  null === tk ? tk = a2 : tk.push.apply(tk, a2);
}
function Ok(a2) {
  for (var b2 = a2; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2))
        for (var d2 = 0; d2 < c2.length; d2++) {
          var e2 = c2[d2], f2 = e2.getSnapshot;
          e2 = e2.value;
          try {
            if (!He(f2(), e2))
              return false;
          } catch (g2) {
            return false;
          }
        }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c2)
      c2.return = b2, b2 = c2;
    else {
      if (b2 === a2)
        break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a2)
          return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Ck(a2, b2) {
  b2 &= ~rk;
  b2 &= ~qk;
  a2.suspendedLanes |= b2;
  a2.pingedLanes &= ~b2;
  for (a2 = a2.expirationTimes; 0 < b2; ) {
    var c2 = 31 - oc(b2), d2 = 1 << c2;
    a2[c2] = -1;
    b2 &= ~d2;
  }
}
function Ek(a2) {
  if (0 !== (K & 6))
    throw Error(p$5(327));
  Hk();
  var b2 = uc(a2, 0);
  if (0 === (b2 & 1))
    return Dk(a2, B$1()), null;
  var c2 = Ik(a2, b2);
  if (0 !== a2.tag && 2 === c2) {
    var d2 = xc(a2);
    0 !== d2 && (b2 = d2, c2 = Nk(a2, d2));
  }
  if (1 === c2)
    throw c2 = pk, Kk(a2, 0), Ck(a2, b2), Dk(a2, B$1()), c2;
  if (6 === c2)
    throw Error(p$5(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b2;
  Pk(a2, tk, uk);
  Dk(a2, B$1());
  return null;
}
function Qk(a2, b2) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b2);
  } finally {
    K = c2, 0 === K && (Gj = B$1() + 500, fg && jg());
  }
}
function Rk(a2) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b2 = K;
  K |= 1;
  var c2 = ok.transition, d2 = C;
  try {
    if (ok.transition = null, C = 1, a2)
      return a2();
  } finally {
    C = d2, ok.transition = c2, K = b2, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E$1(ej);
}
function Kk(a2, b2) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y)
    for (c2 = Y.return; null !== c2; ) {
      var d2 = c2;
      wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          null !== d2 && void 0 !== d2 && $f();
          break;
        case 3:
          zh();
          E$1(Wf);
          E$1(H$1);
          Eh();
          break;
        case 5:
          Bh(d2);
          break;
        case 4:
          zh();
          break;
        case 13:
          E$1(L$1);
          break;
        case 19:
          E$1(L$1);
          break;
        case 10:
          ah(d2.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c2 = c2.return;
    }
  Q$1 = a2;
  Y = a2 = Pg(a2.current, null);
  Z$1 = fj = b2;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b2 = 0; b2 < fh.length; b2++)
      if (c2 = fh[b2], d2 = c2.interleaved, null !== d2) {
        c2.interleaved = null;
        var e2 = d2.next, f2 = c2.pending;
        if (null !== f2) {
          var g2 = f2.next;
          f2.next = e2;
          d2.next = g2;
        }
        c2.pending = d2;
      }
    fh = null;
  }
  return a2;
}
function Mk(a2, b2) {
  do {
    var c2 = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d2 = M$1.memoizedState; null !== d2; ) {
          var e2 = d2.queue;
          null !== e2 && (e2.pending = null);
          d2 = d2.next;
        }
        Ih = false;
      }
      Hh = 0;
      O$1 = N$1 = M$1 = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c2 || null === c2.return) {
        T = 1;
        pk = b2;
        Y = null;
        break;
      }
      a: {
        var f2 = a2, g2 = c2.return, h2 = c2, k2 = b2;
        b2 = Z$1;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g2, h2, f2, b2);
            y2.mode & 1 && Si(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t = /* @__PURE__ */ new Set();
              t.add(k2);
              b2.updateQueue = t;
            } else
              n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Si(f2, l2, b2);
              tj();
              break a;
            }
            k2 = Error(p$5(426));
          }
        } else if (I$1 && h2.mode & 1) {
          var J2 = Ui(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g2, h2, f2, b2);
            Jg(Ji(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h2);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Ni(f2, k2, b2);
              ph(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Qi(f2, h2, b2);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c2);
    } catch (na) {
      b2 = na;
      Y === c2 && null !== c2 && (Y = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a2 = mk.current;
  mk.current = Rh;
  return null === a2 ? Rh : a2;
}
function tj() {
  if (0 === T || 3 === T || 2 === T)
    T = 4;
  null === Q$1 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q$1, Z$1);
}
function Ik(a2, b2) {
  var c2 = K;
  K |= 2;
  var d2 = Jk();
  if (Q$1 !== a2 || Z$1 !== b2)
    uk = null, Kk(a2, b2);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a2, e2);
    }
  while (1);
  $g();
  K = c2;
  mk.current = d2;
  if (null !== Y)
    throw Error(p$5(261));
  Q$1 = null;
  Z$1 = 0;
  return T;
}
function Tk() {
  for (; null !== Y; )
    Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); )
    Uk(Y);
}
function Uk(a2) {
  var b2 = Vk(a2.alternate, a2, fj);
  a2.memoizedProps = a2.pendingProps;
  null === b2 ? Sk(a2) : Y = b2;
  nk.current = null;
}
function Sk(a2) {
  var b2 = a2;
  do {
    var c2 = b2.alternate;
    a2 = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c2 = Ej(c2, b2, fj), null !== c2) {
        Y = c2;
        return;
      }
    } else {
      c2 = Ij(c2, b2);
      if (null !== c2) {
        c2.flags &= 32767;
        Y = c2;
        return;
      }
      if (null !== a2)
        a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y = b2;
      return;
    }
    Y = b2 = a2;
  } while (null !== b2);
  0 === T && (T = 5);
}
function Pk(a2, b2, c2) {
  var d2 = C, e2 = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a2, b2, c2, d2);
  } finally {
    ok.transition = e2, C = d2;
  }
  return null;
}
function Wk(a2, b2, c2, d2) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6))
    throw Error(p$5(327));
  c2 = a2.finishedWork;
  var e2 = a2.finishedLanes;
  if (null === c2)
    return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current)
    throw Error(p$5(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a2, f2);
  a2 === Q$1 && (Y = Q$1 = null, Z$1 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g2 = C;
    C = 1;
    var h2 = K;
    K |= 4;
    nk.current = null;
    Oj(a2, c2);
    dk(c2, a2);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    hk(c2);
    dc();
    K = h2;
    C = g2;
    ok.transition = f2;
  } else
    a2.current = c2;
  vk && (vk = false, wk = a2, xk = e2);
  f2 = a2.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c2.stateNode);
  Dk(a2, B$1());
  if (null !== b2)
    for (d2 = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++)
      e2 = b2[c2], d2(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi)
    throw Oi = false, a2 = Pi, Pi = null, a2;
  0 !== (xk & 1) && 0 !== a2.tag && Hk();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a2 = Dc(xk), b2 = ok.transition, c2 = C;
    try {
      ok.transition = null;
      C = 16 > a2 ? 16 : a2;
      if (null === wk)
        var d2 = false;
      else {
        a2 = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6))
          throw Error(p$5(331));
        var e2 = K;
        K |= 4;
        for (V = a2.current; null !== V; ) {
          var f2 = V, g2 = f2.child;
          if (0 !== (V.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2)
                    q2.return = m2, V = q2;
                  else
                    for (; null !== V; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t = n2.child;
                if (null !== t) {
                  n2.child = null;
                  do {
                    var J2 = t.sibling;
                    t.sibling = null;
                    t = J2;
                  } while (null !== t);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2)
            g2.return = f2, V = g2;
          else
            b:
              for (; null !== V; ) {
                f2 = V;
                if (0 !== (f2.flags & 2048))
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V = x2;
                  break b;
                }
                V = f2.return;
              }
        }
        var w2 = a2.current;
        for (V = w2; null !== V; ) {
          g2 = V;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2)
            u2.return = g2, V = u2;
          else
            b:
              for (g2 = w2; null !== V; ) {
                h2 = V;
                if (0 !== (h2.flags & 2048))
                  try {
                    switch (h2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h2);
                    }
                  } catch (na) {
                    W$1(h2, h2.return, na);
                  }
                if (h2 === g2) {
                  V = null;
                  break b;
                }
                var F2 = h2.sibling;
                if (null !== F2) {
                  F2.return = h2.return;
                  V = F2;
                  break b;
                }
                V = h2.return;
              }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot)
          try {
            lc.onPostCommitFiberRoot(kc, a2);
          } catch (na) {
          }
        d2 = true;
      }
      return d2;
    } finally {
      C = c2, ok.transition = b2;
    }
  }
  return false;
}
function Xk(a2, b2, c2) {
  b2 = Ji(c2, b2);
  b2 = Ni(a2, b2, 1);
  a2 = nh(a2, b2, 1);
  b2 = R$1();
  null !== a2 && (Ac(a2, 1, b2), Dk(a2, b2));
}
function W$1(a2, b2, c2) {
  if (3 === a2.tag)
    Xk(a2, a2, c2);
  else
    for (; null !== b2; ) {
      if (3 === b2.tag) {
        Xk(b2, a2, c2);
        break;
      } else if (1 === b2.tag) {
        var d2 = b2.stateNode;
        if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
          a2 = Ji(c2, a2);
          a2 = Qi(b2, a2, 1);
          b2 = nh(b2, a2, 1);
          a2 = R$1();
          null !== b2 && (Ac(b2, 1, a2), Dk(b2, a2));
          break;
        }
      }
      b2 = b2.return;
    }
}
function Ti(a2, b2, c2) {
  var d2 = a2.pingCache;
  null !== d2 && d2.delete(b2);
  b2 = R$1();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  Q$1 === a2 && (Z$1 & c2) === c2 && (4 === T || 3 === T && (Z$1 & 130023424) === Z$1 && 500 > B$1() - fk ? Kk(a2, 0) : rk |= c2);
  Dk(a2, b2);
}
function Yk(a2, b2) {
  0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = R$1();
  a2 = ih(a2, b2);
  null !== a2 && (Ac(a2, b2, c2), Dk(a2, c2));
}
function uj(a2) {
  var b2 = a2.memoizedState, c2 = 0;
  null !== b2 && (c2 = b2.retryLane);
  Yk(a2, c2);
}
function bk(a2, b2) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d2 = a2.stateNode;
      var e2 = a2.memoizedState;
      null !== e2 && (c2 = e2.retryLane);
      break;
    case 19:
      d2 = a2.stateNode;
      break;
    default:
      throw Error(p$5(314));
  }
  null !== d2 && d2.delete(b2);
  Yk(a2, c2);
}
var Vk;
Vk = function(a2, b2, c2) {
  if (null !== a2)
    if (a2.memoizedProps !== b2.pendingProps || Wf.current)
      dh = true;
    else {
      if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128))
        return dh = false, yj(a2, b2, c2);
      dh = 0 !== (a2.flags & 131072) ? true : false;
    }
  else
    dh = false, I$1 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d2 = b2.type;
      ij(a2, b2);
      a2 = b2.pendingProps;
      var e2 = Yf(b2, H$1.current);
      ch(b2, c2);
      e2 = Nh(null, b2, d2, a2, e2, c2);
      var f2 = Sh();
      b2.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b2), e2.updater = Ei, b2.stateNode = e2, e2._reactInternals = b2, Ii(b2, d2, a2, c2), b2 = jj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I$1 && f2 && vg(b2), Xi(null, b2, e2, c2), b2 = b2.child);
      return b2;
    case 16:
      d2 = b2.elementType;
      a: {
        ij(a2, b2);
        a2 = b2.pendingProps;
        e2 = d2._init;
        d2 = e2(d2._payload);
        b2.type = d2;
        e2 = b2.tag = Zk(d2);
        a2 = Ci(d2, a2);
        switch (e2) {
          case 0:
            b2 = cj(null, b2, d2, a2, c2);
            break a;
          case 1:
            b2 = hj(null, b2, d2, a2, c2);
            break a;
          case 11:
            b2 = Yi(null, b2, d2, a2, c2);
            break a;
          case 14:
            b2 = $i(null, b2, d2, Ci(d2.type, a2), c2);
            break a;
        }
        throw Error(p$5(
          306,
          d2,
          ""
        ));
      }
      return b2;
    case 0:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), cj(a2, b2, d2, e2, c2);
    case 1:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), hj(a2, b2, d2, e2, c2);
    case 3:
      a: {
        kj(b2);
        if (null === a2)
          throw Error(p$5(387));
        d2 = b2.pendingProps;
        f2 = b2.memoizedState;
        e2 = f2.element;
        lh(a2, b2);
        qh(b2, d2, null, c2);
        var g2 = b2.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated)
          if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
            e2 = Ji(Error(p$5(423)), b2);
            b2 = lj(a2, b2, d2, c2, e2);
            break a;
          } else if (d2 !== e2) {
            e2 = Ji(Error(p$5(424)), b2);
            b2 = lj(a2, b2, d2, c2, e2);
            break a;
          } else
            for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I$1 = true, zg = null, c2 = Vg(b2, null, d2, c2), b2.child = c2; c2; )
              c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d2 === e2) {
            b2 = Zi(a2, b2, c2);
            break a;
          }
          Xi(a2, b2, d2, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Ah(b2), null === a2 && Eg(b2), d2 = b2.type, e2 = b2.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e2.children, Ef(d2, e2) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), gj(a2, b2), Xi(a2, b2, g2, c2), b2.child;
    case 6:
      return null === a2 && Eg(b2), null;
    case 13:
      return oj(a2, b2, c2);
    case 4:
      return yh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a2 ? b2.child = Ug(b2, null, d2, c2) : Xi(a2, b2, d2, c2), b2.child;
    case 11:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), Yi(a2, b2, d2, e2, c2);
    case 7:
      return Xi(a2, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d2 = b2.type._context;
        e2 = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e2.value;
        G$1(Wg, d2._currentValue);
        d2._currentValue = g2;
        if (null !== f2)
          if (He(f2.value, g2)) {
            if (f2.children === e2.children && !Wf.current) {
              b2 = Zi(a2, b2, c2);
              break a;
            }
          } else
            for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
              var h2 = f2.dependencies;
              if (null !== h2) {
                g2 = f2.child;
                for (var k2 = h2.firstContext; null !== k2; ) {
                  if (k2.context === d2) {
                    if (1 === f2.tag) {
                      k2 = mh(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c2);
                    bh(
                      f2.return,
                      c2,
                      b2
                    );
                    h2.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag)
                g2 = f2.type === b2.type ? null : f2.child;
              else if (18 === f2.tag) {
                g2 = f2.return;
                if (null === g2)
                  throw Error(p$5(341));
                g2.lanes |= c2;
                h2 = g2.alternate;
                null !== h2 && (h2.lanes |= c2);
                bh(g2, c2, b2);
                g2 = f2.sibling;
              } else
                g2 = f2.child;
              if (null !== g2)
                g2.return = f2;
              else
                for (g2 = f2; null !== g2; ) {
                  if (g2 === b2) {
                    g2 = null;
                    break;
                  }
                  f2 = g2.sibling;
                  if (null !== f2) {
                    f2.return = g2.return;
                    g2 = f2;
                    break;
                  }
                  g2 = g2.return;
                }
              f2 = g2;
            }
        Xi(a2, b2, e2.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e2 = b2.type, d2 = b2.pendingProps.children, ch(b2, c2), e2 = eh(e2), d2 = d2(e2), b2.flags |= 1, Xi(a2, b2, d2, c2), b2.child;
    case 14:
      return d2 = b2.type, e2 = Ci(d2, b2.pendingProps), e2 = Ci(d2.type, e2), $i(a2, b2, d2, e2, c2);
    case 15:
      return bj(a2, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Ci(d2, e2), ij(a2, b2), b2.tag = 1, Zf(d2) ? (a2 = true, cg(b2)) : a2 = false, ch(b2, c2), Gi(b2, d2, e2), Ii(b2, d2, e2, c2), jj(null, b2, d2, true, a2, c2);
    case 19:
      return xj(a2, b2, c2);
    case 22:
      return dj(a2, b2, c2);
  }
  throw Error(p$5(156, b2.tag));
};
function Fk(a2, b2) {
  return ac(a2, b2);
}
function $k(a2, b2, c2, d2) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b2, c2, d2) {
  return new $k(a2, b2, c2, d2);
}
function aj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function Zk(a2) {
  if ("function" === typeof a2)
    return aj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da)
      return 11;
    if (a2 === Ga)
      return 14;
  }
  return 2;
}
function Pg(a2, b2) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b2 = a2.dependencies;
  c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function Rg(a2, b2, c2, d2, e2, f2) {
  var g2 = 2;
  d2 = a2;
  if ("function" === typeof a2)
    aj(a2) && (g2 = 1);
  else if ("string" === typeof a2)
    g2 = 5;
  else
    a:
      switch (a2) {
        case ya:
          return Tg(c2.children, e2, f2, b2);
        case za:
          g2 = 8;
          e2 |= 8;
          break;
        case Aa:
          return a2 = Bg(12, c2, b2, e2 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
        case Ea:
          return a2 = Bg(13, c2, b2, e2), a2.elementType = Ea, a2.lanes = f2, a2;
        case Fa:
          return a2 = Bg(19, c2, b2, e2), a2.elementType = Fa, a2.lanes = f2, a2;
        case Ia:
          return pj(c2, e2, f2, b2);
        default:
          if ("object" === typeof a2 && null !== a2)
            switch (a2.$$typeof) {
              case Ba:
                g2 = 10;
                break a;
              case Ca:
                g2 = 9;
                break a;
              case Da:
                g2 = 11;
                break a;
              case Ga:
                g2 = 14;
                break a;
              case Ha:
                g2 = 16;
                d2 = null;
                break a;
            }
          throw Error(p$5(130, null == a2 ? a2 : typeof a2, ""));
      }
  b2 = Bg(g2, c2, b2, e2);
  b2.elementType = a2;
  b2.type = d2;
  b2.lanes = f2;
  return b2;
}
function Tg(a2, b2, c2, d2) {
  a2 = Bg(7, a2, d2, b2);
  a2.lanes = c2;
  return a2;
}
function pj(a2, b2, c2, d2) {
  a2 = Bg(22, a2, d2, b2);
  a2.elementType = Ia;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function Qg(a2, b2, c2) {
  a2 = Bg(6, a2, null, b2);
  a2.lanes = c2;
  return a2;
}
function Sg(a2, b2, c2) {
  b2 = Bg(4, null !== a2.children ? a2.children : [], a2.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b2;
}
function al(a2, b2, c2, d2, e2) {
  this.tag = b2;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  a2 = new al(a2, b2, c2, h2, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg(3, null, null, b2);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a2;
}
function cl(a2, b2, c2) {
  var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b2, implementation: c2 };
}
function dl(a2) {
  if (!a2)
    return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb(a2) !== a2 || 1 !== a2.tag)
      throw Error(p$5(170));
    var b2 = a2;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p$5(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2))
      return bg(a2, c2, b2);
  }
  return b2;
}
function el(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  a2 = bl(c2, d2, true, a2, e2, f2, g2, h2, k2);
  a2.context = dl(null);
  c2 = a2.current;
  d2 = R$1();
  e2 = yi(c2);
  f2 = mh(d2, e2);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  nh(c2, f2, e2);
  a2.current.lanes = e2;
  Ac(a2, e2, d2);
  Dk(a2, d2);
  return a2;
}
function fl(a2, b2, c2, d2) {
  var e2 = b2.current, f2 = R$1(), g2 = yi(e2);
  c2 = dl(c2);
  null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
  b2 = mh(f2, g2);
  b2.payload = { element: a2 };
  d2 = void 0 === d2 ? null : d2;
  null !== d2 && (b2.callback = d2);
  a2 = nh(e2, b2, g2);
  null !== a2 && (gi(a2, e2, g2, f2), oh(a2, e2, g2));
  return g2;
}
function gl(a2) {
  a2 = a2.current;
  if (!a2.child)
    return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function hl(a2, b2) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
  }
}
function il(a2, b2) {
  hl(a2, b2);
  (a2 = a2.alternate) && hl(a2, b2);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ll(a2) {
  this._internalRoot = a2;
}
ml.prototype.render = ll.prototype.render = function(a2) {
  var b2 = this._internalRoot;
  if (null === b2)
    throw Error(p$5(409));
  fl(a2, b2, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b2 = a2.containerInfo;
    Rk(function() {
      fl(null, a2, null, null);
    });
    b2[uf] = null;
  }
};
function ml(a2) {
  this._internalRoot = a2;
}
ml.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b2 = Hc();
    a2 = { blockedOn: null, target: a2, priority: b2 };
    for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++)
      ;
    Qc.splice(c2, 0, a2);
    0 === c2 && Vc(a2);
  }
};
function nl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function pl() {
}
function ql(a2, b2, c2, d2, e2) {
  if (e2) {
    if ("function" === typeof d2) {
      var f2 = d2;
      d2 = function() {
        var a3 = gl(g2);
        f2.call(a3);
      };
    }
    var g2 = el(b2, d2, a2, 0, null, false, false, "", pl);
    a2._reactRootContainer = g2;
    a2[uf] = g2.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk();
    return g2;
  }
  for (; e2 = a2.lastChild; )
    a2.removeChild(e2);
  if ("function" === typeof d2) {
    var h2 = d2;
    d2 = function() {
      var a3 = gl(k2);
      h2.call(a3);
    };
  }
  var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Rk(function() {
    fl(b2, k2, c2, d2);
  });
  return k2;
}
function rl(a2, b2, c2, d2, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e2) {
      var h2 = e2;
      e2 = function() {
        var a3 = gl(g2);
        h2.call(a3);
      };
    }
    fl(b2, g2, a2, e2);
  } else
    g2 = ql(c2, b2, a2, e2, d2);
  return gl(g2);
}
Ec = function(a2) {
  switch (a2.tag) {
    case 3:
      var b2 = a2.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = tc(b2.pendingLanes);
        0 !== c2 && (Cc(b2, c2 | 1), Dk(b2, B$1()), 0 === (K & 6) && (Gj = B$1() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b3 = ih(a2, 1);
        if (null !== b3) {
          var c3 = R$1();
          gi(b3, a2, 1, c3);
        }
      }), il(a2, 1);
  }
};
Fc = function(a2) {
  if (13 === a2.tag) {
    var b2 = ih(a2, 134217728);
    if (null !== b2) {
      var c2 = R$1();
      gi(b2, a2, 134217728, c2);
    }
    il(a2, 134217728);
  }
};
Gc = function(a2) {
  if (13 === a2.tag) {
    var b2 = yi(a2), c2 = ih(a2, b2);
    if (null !== c2) {
      var d2 = R$1();
      gi(c2, a2, b2, d2);
    }
    il(a2, b2);
  }
};
Hc = function() {
  return C;
};
Ic = function(a2, b2) {
  var c2 = C;
  try {
    return C = a2, b2();
  } finally {
    C = c2;
  }
};
yb = function(a2, b2, c2) {
  switch (b2) {
    case "input":
      bb(a2, c2);
      b2 = c2.name;
      if ("radio" === c2.type && null != b2) {
        for (c2 = a2; c2.parentNode; )
          c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d2 = c2[b2];
          if (d2 !== a2 && d2.form === a2.form) {
            var e2 = Db(d2);
            if (!e2)
              throw Error(p$5(90));
            Wa(d2);
            bb(d2, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a2, c2);
      break;
    case "select":
      b2 = c2.value, null != b2 && fb(a2, !!c2.multiple, b2, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber)
    try {
      kc = vl.inject(ul), lc = vl;
    } catch (a2) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a2, b2) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b2))
    throw Error(p$5(200));
  return cl(a2, b2, null, c2);
};
reactDom_production_min.createRoot = function(a2, b2) {
  if (!nl(a2))
    throw Error(p$5(299));
  var c2 = false, d2 = "", e2 = kl;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e2 = b2.onRecoverableError));
  b2 = bl(a2, 1, false, null, null, c2, false, d2, e2);
  a2[uf] = b2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ll(b2);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2)
    return null;
  if (1 === a2.nodeType)
    return a2;
  var b2 = a2._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a2.render)
      throw Error(p$5(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$5(268, a2));
  }
  a2 = Zb(b2);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Rk(a2);
};
reactDom_production_min.hydrate = function(a2, b2, c2) {
  if (!ol(b2))
    throw Error(p$5(200));
  return rl(null, a2, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b2, c2) {
  if (!nl(a2))
    throw Error(p$5(405));
  var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g2 = kl;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
  b2 = el(b2, null, a2, 1, null != c2 ? c2 : null, e2, false, f2, g2);
  a2[uf] = b2.current;
  sf(a2);
  if (d2)
    for (a2 = 0; a2 < d2.length; a2++)
      c2 = d2[a2], e2 = c2._getVersion, e2 = e2(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e2] : b2.mutableSourceEagerHydrationData.push(
        c2,
        e2
      );
  return new ml(b2);
};
reactDom_production_min.render = function(a2, b2, c2) {
  if (!ol(b2))
    throw Error(p$5(200));
  return rl(null, a2, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!ol(a2))
    throw Error(p$5(40));
  return a2._reactRootContainer ? (Rk(function() {
    rl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d2) {
  if (!ol(c2))
    throw Error(p$5(200));
  if (null == a2 || void 0 === a2._reactInternals)
    throw Error(p$5(38));
  return rl(a2, b2, c2, false, d2);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
const ReactDOM$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ReactDOM
}, [reactDomExports]);
var createRoot;
var m$4 = reactDomExports;
{
  createRoot = m$4.createRoot;
  m$4.hydrateRoot;
}
const App$1 = "";
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e$2 = reactExports;
function h$4(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var k$3 = "function" === typeof Object.is ? Object.is : h$4, l$3 = e$2.useState, m$3 = e$2.useEffect, n$4 = e$2.useLayoutEffect, p$4 = e$2.useDebugValue;
function q$4(a2, b2) {
  var d2 = b2(), f2 = l$3({ inst: { value: d2, getSnapshot: b2 } }), c2 = f2[0].inst, g2 = f2[1];
  n$4(function() {
    c2.value = d2;
    c2.getSnapshot = b2;
    r$3(c2) && g2({ inst: c2 });
  }, [a2, d2, b2]);
  m$3(function() {
    r$3(c2) && g2({ inst: c2 });
    return a2(function() {
      r$3(c2) && g2({ inst: c2 });
    });
  }, [a2]);
  p$4(d2);
  return d2;
}
function r$3(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var d2 = b2();
    return !k$3(a2, d2);
  } catch (f2) {
    return true;
  }
}
function t$5(a2, b2) {
  return b2();
}
var u$3 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$5 : q$4;
useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e$2.useSyncExternalStore ? e$2.useSyncExternalStore : u$3;
{
  shim.exports = useSyncExternalStoreShim_production_min;
}
var shimExports = shim.exports;
var withSelector = { exports: {} };
var withSelector_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h$3 = reactExports, n$3 = shimExports;
function p$3(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var q$3 = "function" === typeof Object.is ? Object.is : p$3, r$2 = n$3.useSyncExternalStore, t$4 = h$3.useRef, u$2 = h$3.useEffect, v$3 = h$3.useMemo, w$2 = h$3.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a2, b2, e2, l2, g2) {
  var c2 = t$4(null);
  if (null === c2.current) {
    var f2 = { hasValue: false, value: null };
    c2.current = f2;
  } else
    f2 = c2.current;
  c2 = v$3(function() {
    function a3(a4) {
      if (!c3) {
        c3 = true;
        d3 = a4;
        a4 = l2(a4);
        if (void 0 !== g2 && f2.hasValue) {
          var b3 = f2.value;
          if (g2(b3, a4))
            return k2 = b3;
        }
        return k2 = a4;
      }
      b3 = k2;
      if (q$3(d3, a4))
        return b3;
      var e3 = l2(a4);
      if (void 0 !== g2 && g2(b3, e3))
        return b3;
      d3 = a4;
      return k2 = e3;
    }
    var c3 = false, d3, k2, m2 = void 0 === e2 ? null : e2;
    return [function() {
      return a3(b2());
    }, null === m2 ? void 0 : function() {
      return a3(m2());
    }];
  }, [b2, e2, l2, g2]);
  var d2 = r$2(a2, c2[0], c2[1]);
  u$2(function() {
    f2.hasValue = true;
    f2.value = d2;
  }, [d2]);
  w$2(d2);
  return d2;
};
{
  withSelector.exports = withSelector_production_min;
}
var withSelectorExports = withSelector.exports;
function defaultNoopBatch(callback) {
  callback();
}
let batch = defaultNoopBatch;
const setBatch = (newBatch) => batch = newBatch;
const getBatch = () => batch;
const ContextKey = Symbol.for("react-redux-context");
const gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  var _gT$ContextKey;
  if (!reactExports.createContext)
    return {};
  const contextMap = (_gT$ContextKey = gT[ContextKey]) != null ? _gT$ContextKey : gT[ContextKey] = /* @__PURE__ */ new Map();
  let realContext = contextMap.get(reactExports.createContext);
  if (!realContext) {
    realContext = reactExports.createContext(null);
    contextMap.set(reactExports.createContext, realContext);
  }
  return realContext;
}
const ReactReduxContext = /* @__PURE__ */ getContext();
function createReduxContextHook(context = ReactReduxContext) {
  return function useReduxContext2() {
    const contextValue = reactExports.useContext(context);
    return contextValue;
  };
}
const useReduxContext = /* @__PURE__ */ createReduxContextHook();
const notInitialized = () => {
  throw new Error("uSES not initialized!");
};
let useSyncExternalStoreWithSelector = notInitialized;
const initializeUseSelector = (fn2) => {
  useSyncExternalStoreWithSelector = fn2;
};
const refEquality = (a2, b2) => a2 === b2;
function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
  return function useSelector2(selector, equalityFnOrOptions = {}) {
    const {
      equalityFn = refEquality,
      stabilityCheck = void 0,
      noopCheck = void 0
    } = typeof equalityFnOrOptions === "function" ? {
      equalityFn: equalityFnOrOptions
    } : equalityFnOrOptions;
    const {
      store: store2,
      subscription,
      getServerState,
      stabilityCheck: globalStabilityCheck,
      noopCheck: globalNoopCheck
    } = useReduxContext$1();
    reactExports.useRef(true);
    const wrappedSelector = reactExports.useCallback({
      [selector.name](state) {
        const selected = selector(state);
        return selected;
      }
    }[selector.name], [selector, globalStabilityCheck, stabilityCheck]);
    const selectedState = useSyncExternalStoreWithSelector(subscription.addNestedSub, store2.getState, getServerState || store2.getState, wrappedSelector, equalityFn);
    reactExports.useDebugValue(selectedState);
    return selectedState;
  };
}
const useSelector = /* @__PURE__ */ createSelectorHook();
var reactIs$1 = { exports: {} };
var reactIs_production_min$1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$2 = "function" === typeof Symbol && Symbol.for, c$2 = b$2 ? Symbol.for("react.element") : 60103, d$2 = b$2 ? Symbol.for("react.portal") : 60106, e$1 = b$2 ? Symbol.for("react.fragment") : 60107, f$2 = b$2 ? Symbol.for("react.strict_mode") : 60108, g$2 = b$2 ? Symbol.for("react.profiler") : 60114, h$2 = b$2 ? Symbol.for("react.provider") : 60109, k$2 = b$2 ? Symbol.for("react.context") : 60110, l$2 = b$2 ? Symbol.for("react.async_mode") : 60111, m$2 = b$2 ? Symbol.for("react.concurrent_mode") : 60111, n$2 = b$2 ? Symbol.for("react.forward_ref") : 60112, p$2 = b$2 ? Symbol.for("react.suspense") : 60113, q$2 = b$2 ? Symbol.for("react.suspense_list") : 60120, r$1 = b$2 ? Symbol.for("react.memo") : 60115, t$3 = b$2 ? Symbol.for("react.lazy") : 60116, v$2 = b$2 ? Symbol.for("react.block") : 60121, w$1 = b$2 ? Symbol.for("react.fundamental") : 60117, x$1 = b$2 ? Symbol.for("react.responder") : 60118, y$1 = b$2 ? Symbol.for("react.scope") : 60119;
function z$2(a2) {
  if ("object" === typeof a2 && null !== a2) {
    var u2 = a2.$$typeof;
    switch (u2) {
      case c$2:
        switch (a2 = a2.type, a2) {
          case l$2:
          case m$2:
          case e$1:
          case g$2:
          case f$2:
          case p$2:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k$2:
              case n$2:
              case t$3:
              case r$1:
              case h$2:
                return a2;
              default:
                return u2;
            }
        }
      case d$2:
        return u2;
    }
  }
}
function A$1(a2) {
  return z$2(a2) === m$2;
}
reactIs_production_min$1.AsyncMode = l$2;
reactIs_production_min$1.ConcurrentMode = m$2;
reactIs_production_min$1.ContextConsumer = k$2;
reactIs_production_min$1.ContextProvider = h$2;
reactIs_production_min$1.Element = c$2;
reactIs_production_min$1.ForwardRef = n$2;
reactIs_production_min$1.Fragment = e$1;
reactIs_production_min$1.Lazy = t$3;
reactIs_production_min$1.Memo = r$1;
reactIs_production_min$1.Portal = d$2;
reactIs_production_min$1.Profiler = g$2;
reactIs_production_min$1.StrictMode = f$2;
reactIs_production_min$1.Suspense = p$2;
reactIs_production_min$1.isAsyncMode = function(a2) {
  return A$1(a2) || z$2(a2) === l$2;
};
reactIs_production_min$1.isConcurrentMode = A$1;
reactIs_production_min$1.isContextConsumer = function(a2) {
  return z$2(a2) === k$2;
};
reactIs_production_min$1.isContextProvider = function(a2) {
  return z$2(a2) === h$2;
};
reactIs_production_min$1.isElement = function(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === c$2;
};
reactIs_production_min$1.isForwardRef = function(a2) {
  return z$2(a2) === n$2;
};
reactIs_production_min$1.isFragment = function(a2) {
  return z$2(a2) === e$1;
};
reactIs_production_min$1.isLazy = function(a2) {
  return z$2(a2) === t$3;
};
reactIs_production_min$1.isMemo = function(a2) {
  return z$2(a2) === r$1;
};
reactIs_production_min$1.isPortal = function(a2) {
  return z$2(a2) === d$2;
};
reactIs_production_min$1.isProfiler = function(a2) {
  return z$2(a2) === g$2;
};
reactIs_production_min$1.isStrictMode = function(a2) {
  return z$2(a2) === f$2;
};
reactIs_production_min$1.isSuspense = function(a2) {
  return z$2(a2) === p$2;
};
reactIs_production_min$1.isValidElementType = function(a2) {
  return "string" === typeof a2 || "function" === typeof a2 || a2 === e$1 || a2 === m$2 || a2 === g$2 || a2 === f$2 || a2 === p$2 || a2 === q$2 || "object" === typeof a2 && null !== a2 && (a2.$$typeof === t$3 || a2.$$typeof === r$1 || a2.$$typeof === h$2 || a2.$$typeof === k$2 || a2.$$typeof === n$2 || a2.$$typeof === w$1 || a2.$$typeof === x$1 || a2.$$typeof === y$1 || a2.$$typeof === v$2);
};
reactIs_production_min$1.typeOf = z$2;
{
  reactIs$1.exports = reactIs_production_min$1;
}
var reactIsExports = reactIs$1.exports;
var reactIs = reactIsExports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1 = Symbol.for("react.element"), c$1 = Symbol.for("react.portal"), d$1 = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f$1 = Symbol.for("react.profiler"), g$1 = Symbol.for("react.provider"), h$1 = Symbol.for("react.context"), k$1 = Symbol.for("react.server_context"), l$1 = Symbol.for("react.forward_ref"), m$1 = Symbol.for("react.suspense"), n$1 = Symbol.for("react.suspense_list"), p$1 = Symbol.for("react.memo"), q$1 = Symbol.for("react.lazy"), t$2 = Symbol.for("react.offscreen"), u$1;
u$1 = Symbol.for("react.module.reference");
function v$1(a2) {
  if ("object" === typeof a2 && null !== a2) {
    var r2 = a2.$$typeof;
    switch (r2) {
      case b$1:
        switch (a2 = a2.type, a2) {
          case d$1:
          case f$1:
          case e:
          case m$1:
          case n$1:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k$1:
              case h$1:
              case l$1:
              case q$1:
              case p$1:
              case g$1:
                return a2;
              default:
                return r2;
            }
        }
      case c$1:
        return r2;
    }
  }
}
reactIs_production_min.ContextConsumer = h$1;
reactIs_production_min.ContextProvider = g$1;
reactIs_production_min.Element = b$1;
reactIs_production_min.ForwardRef = l$1;
reactIs_production_min.Fragment = d$1;
reactIs_production_min.Lazy = q$1;
reactIs_production_min.Memo = p$1;
reactIs_production_min.Portal = c$1;
reactIs_production_min.Profiler = f$1;
reactIs_production_min.StrictMode = e;
reactIs_production_min.Suspense = m$1;
reactIs_production_min.SuspenseList = n$1;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a2) {
  return v$1(a2) === h$1;
};
reactIs_production_min.isContextProvider = function(a2) {
  return v$1(a2) === g$1;
};
reactIs_production_min.isElement = function(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === b$1;
};
reactIs_production_min.isForwardRef = function(a2) {
  return v$1(a2) === l$1;
};
reactIs_production_min.isFragment = function(a2) {
  return v$1(a2) === d$1;
};
reactIs_production_min.isLazy = function(a2) {
  return v$1(a2) === q$1;
};
reactIs_production_min.isMemo = function(a2) {
  return v$1(a2) === p$1;
};
reactIs_production_min.isPortal = function(a2) {
  return v$1(a2) === c$1;
};
reactIs_production_min.isProfiler = function(a2) {
  return v$1(a2) === f$1;
};
reactIs_production_min.isStrictMode = function(a2) {
  return v$1(a2) === e;
};
reactIs_production_min.isSuspense = function(a2) {
  return v$1(a2) === m$1;
};
reactIs_production_min.isSuspenseList = function(a2) {
  return v$1(a2) === n$1;
};
reactIs_production_min.isValidElementType = function(a2) {
  return "string" === typeof a2 || "function" === typeof a2 || a2 === d$1 || a2 === f$1 || a2 === e || a2 === m$1 || a2 === n$1 || a2 === t$2 || "object" === typeof a2 && null !== a2 && (a2.$$typeof === q$1 || a2.$$typeof === p$1 || a2.$$typeof === g$1 || a2.$$typeof === h$1 || a2.$$typeof === l$1 || a2.$$typeof === u$1 || void 0 !== a2.getModuleId) ? true : false;
};
reactIs_production_min.typeOf = v$1;
function createListenerCollection() {
  const batch2 = getBatch();
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      batch2(() => {
        let listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get() {
      let listeners = [];
      let listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      let listener = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null)
          return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
const nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store2, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  let subscriptionsAmount = 0;
  let selfSubscribed = false;
  function addNestedSub(listener) {
    trySubscribe();
    const cleanupListener = listeners.subscribe(listener);
    let removed = false;
    return () => {
      if (!removed) {
        removed = true;
        cleanupListener();
        tryUnsubscribe();
      }
    };
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return selfSubscribed;
  }
  function trySubscribe() {
    subscriptionsAmount++;
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store2.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    subscriptionsAmount--;
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true;
      trySubscribe();
    }
  }
  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false;
      tryUnsubscribe();
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners
  };
  return subscription;
}
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const useIsomorphicLayoutEffect$1 = canUseDOM ? reactExports.useLayoutEffect : reactExports.useEffect;
function Provider({
  store: store2,
  context,
  children,
  serverState,
  stabilityCheck = "once",
  noopCheck = "once"
}) {
  const contextValue = reactExports.useMemo(() => {
    const subscription = createSubscription(store2);
    return {
      store: store2,
      subscription,
      getServerState: serverState ? () => serverState : void 0,
      stabilityCheck,
      noopCheck
    };
  }, [store2, serverState, stabilityCheck, noopCheck]);
  const previousState = reactExports.useMemo(() => store2.getState(), [store2]);
  useIsomorphicLayoutEffect$1(() => {
    const {
      subscription
    } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store2.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
initializeUseSelector(withSelectorExports.useSyncExternalStoreWithSelector);
setBatch(reactDomExports.unstable_batchedUpdates);
/**
 * @remix-run/router v1.16.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source2 = arguments[i2];
      for (var key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          target[key2] = source2[key2];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e2) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location2, index2) {
  return {
    usr: location2.state,
    key: location2.key,
    idx: index2
  };
}
function createLocation(current, to, state, key2) {
  if (state === void 0) {
    state = null;
  }
  let location2 = _extends$2({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key2 || createKey()
  });
  return location2;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$2({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location2 = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location2, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location2, index2);
    let url = history.createHref(location2);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location2 = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location2, to);
    index2 = getIndex();
    let historyState = getHistoryState(location2, index2);
    let url = history.createHref(location2);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn2) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn2;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
const immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map((route, index2) => {
    let treePath = [...parentPath, index2];
    let id2 = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id2], 'Found a route id collision on id "' + id2 + "\".  Route id's must be globally unique within Data Router usages");
    if (isIndexRoute(route)) {
      let indexRoute = _extends$2({}, route, mapRouteProperties2(route), {
        id: id2
      });
      manifest[id2] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends$2({}, route, mapRouteProperties2(route), {
        id: id2,
        children: void 0
      });
      manifest[id2] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location2 = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location2.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index2, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a2, b2) => a2.score !== b2.score ? b2.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s2) => s2 === "*";
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b2) {
  let siblings = a2.length === b2.length && a2.slice(0, -1).every((n2, i2) => n2 === b2[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index2) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index2];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_2, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === matches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$2({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
class ErrorResponseImpl {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties2;
  if (init.mapRouteProperties) {
    mapRouteProperties2 = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties2 = defaultMapRouteProperties;
  }
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.unstable_dataStrategy || defaultDataStrategy;
  let future = _extends$2({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_partialHydration: false,
    v7_prependBasename: false,
    v7_relativeSplatPath: false,
    unstable_skipActionErrorRevalidation: false
  }, init.future);
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions = null;
  let getScrollRestorationKey = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialErrors = null;
  if (initialMatches == null) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  let initialized;
  let hasLazyRoutes = initialMatches.some((m2) => m2.route.lazy);
  let hasLoaders = initialMatches.some((m2) => m2.route.loader);
  if (hasLazyRoutes) {
    initialized = false;
  } else if (!hasLoaders) {
    initialized = true;
  } else if (future.v7_partialHydration) {
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors = init.hydrationData ? init.hydrationData.errors : null;
    let isRouteInitialized = (m2) => {
      if (!m2.route.loader) {
        return true;
      }
      if (typeof m2.route.loader === "function" && m2.route.loader.hydrate === true) {
        return false;
      }
      return loaderData && loaderData[m2.route.id] !== void 0 || errors && errors[m2.route.id] !== void 0;
    };
    if (errors) {
      let idx = initialMatches.findIndex((m2) => errors[m2.route.id] !== void 0);
      initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
    } else {
      initialized = initialMatches.every(isRouteInitialized);
    }
  } else {
    initialized = init.hydrationData != null;
  }
  let router2;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = Action.Pop;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledDeferredRoutes = [];
  let cancelledFetcherLoads = [];
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let deletedFetchers = /* @__PURE__ */ new Set();
  let activeDeferreds = /* @__PURE__ */ new Map();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let ignoreNextHistoryUpdate = false;
  function initialize() {
    unlistenHistory = init.history.listen((_ref) => {
      let {
        action: historyAction,
        location: location2,
        delta
      } = _ref;
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location2,
        historyAction
      });
      if (blockerKey && delta != null) {
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1);
        updateBlocker(blockerKey, {
          state: "blocked",
          location: location2,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location: location2
            });
            init.history.go(delta);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location2);
    });
    if (isBrowser) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location, {
        initialHydration: true
      });
    }
    return router2;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_2, key2) => deleteFetcher(key2));
    state.blockers.forEach((_2, key2) => deleteBlocker(key2));
  }
  function subscribe(fn2) {
    subscribers.add(fn2);
    return () => subscribers.delete(fn2);
  }
  function updateState(newState, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state = _extends$2({}, state, newState);
    let completedFetchers = [];
    let deletedFetchersKeys = [];
    if (future.v7_fetcherPersist) {
      state.fetchers.forEach((fetcher, key2) => {
        if (fetcher.state === "idle") {
          if (deletedFetchers.has(key2)) {
            deletedFetchersKeys.push(key2);
          } else {
            completedFetchers.push(key2);
          }
        }
      });
    }
    [...subscribers].forEach((subscriber) => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      unstable_viewTransitionOpts: opts.viewTransitionOpts,
      unstable_flushSync: opts.flushSync === true
    }));
    if (future.v7_fetcherPersist) {
      completedFetchers.forEach((key2) => state.fetchers.delete(key2));
      deletedFetchersKeys.forEach((key2) => deleteFetcher(key2));
    }
  }
  function completeNavigation(location2, newState, _temp) {
    var _location$state, _location$state2;
    let {
      flushSync
    } = _temp === void 0 ? {} : _temp;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location2.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_2, k2) => blockers.set(k2, IDLE_BLOCKER));
    }
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location2.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation)
      ;
    else if (pendingAction === Action.Pop)
      ;
    else if (pendingAction === Action.Push) {
      init.history.push(location2, location2.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location2, location2.state);
    }
    let viewTransitionOpts;
    if (pendingAction === Action.Pop) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location2.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location2
        };
      } else if (appliedViewTransitions.has(location2.pathname)) {
        viewTransitionOpts = {
          currentLocation: location2,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location2.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location2.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location2
      };
    }
    updateState(_extends$2({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location: location2,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location2, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), {
      viewTransitionOpts,
      flushSync: flushSync === true
    });
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends$2({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false)
      ;
    else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.unstable_viewTransition,
      flushSync
    });
  }
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    if (state.navigation.state === "submitting") {
      return;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  }
  async function startNavigation(historyAction, location2, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location2, basename);
    let flushSync = (opts && opts.flushSync) === true;
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location2.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse);
      cancelActiveDeferreds();
      completeNavigation(location2, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      }, {
        flushSync
      });
      return;
    }
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location2) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location2, {
        matches
      }, {
        flushSync
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location2, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [findNearestBoundary(matches).route.id, {
        type: ResultType.error,
        error: opts.pendingError
      }];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(request, location2, opts.submission, matches, {
        replace: opts.replace,
        flushSync
      });
      if (actionResult.shortCircuited) {
        return;
      }
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location2, opts.submission);
      flushSync = false;
      request = createClientSideRequest(init.history, request.url, request.signal);
    }
    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location2, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location2, _extends$2({
      matches
    }, getActionDataForCommit(pendingActionResult), {
      loaderData,
      errors
    }));
  }
  async function handleAction(request, location2, submission, matches, opts) {
    if (opts === void 0) {
      opts = {};
    }
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location2, submission);
    updateState({
      navigation
    }, {
      flushSync: opts.flushSync === true
    });
    let result;
    let actionMatch = getTargetMatch(matches, location2);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location2.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches);
      result = results[0];
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace;
      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        let location3 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
        replace = location3 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location2, matches, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location2, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location2, future.v7_partialHydration && initialHydration === true, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
    cancelActiveDeferreds((routeId) => !(matches && matches.some((m2) => m2.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m2) => m2.route.id === routeId));
    pendingNavigationLoadId = ++incrementingLoadId;
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(location2, _extends$2({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null
      }, getActionDataForCommit(pendingActionResult), updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
      return {
        shortCircuited: true
      };
    }
    if (!isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration)) {
      revalidatingFetchers.forEach((rf2) => {
        let fetcher = state.fetchers.get(rf2.key);
        let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
        state.fetchers.set(rf2.key, revalidatingFetcher);
      });
      let actionData;
      if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
        actionData = {
          [pendingActionResult[0]]: pendingActionResult[1].data
        };
      } else if (state.actionData) {
        if (Object.keys(state.actionData).length === 0) {
          actionData = null;
        } else {
          actionData = state.actionData;
        }
      }
      updateState(_extends$2({
        navigation: loadingNavigation
      }, actionData !== void 0 ? {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
    }
    revalidatingFetchers.forEach((rf2) => {
      if (fetchControllers.has(rf2.key)) {
        abortFetcher(rf2.key);
      }
      if (rf2.controller) {
        fetchControllers.set(rf2.key, rf2.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f2) => abortFetcher(f2.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach((rf2) => fetchControllers.delete(rf2.key));
    let redirect = findRedirect([...loaderResults, ...fetcherResults]);
    if (redirect) {
      if (redirect.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      await startRedirectNavigation(request, redirect.result, {
        replace
      });
      return {
        shortCircuited: true
      };
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    if (future.v7_partialHydration && initialHydration && state.errors) {
      Object.entries(state.errors).filter((_ref2) => {
        let [id2] = _ref2;
        return !matchesToLoad.some((m2) => m2.route.id === id2);
      }).forEach((_ref3) => {
        let [routeId, error] = _ref3;
        errors = Object.assign(errors || {}, {
          [routeId]: error
        });
      });
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends$2({
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function fetch2(key2, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key2))
      abortFetcher(key2);
    let flushSync = (opts && opts.unstable_flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    if (!matches) {
      setFetcherError(key2, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }), {
        flushSync
      });
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key2, routeId, error, {
        flushSync
      });
      return;
    }
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key2, routeId, path, match, matches, flushSync, submission);
      return;
    }
    fetchLoadMatches.set(key2, {
      routeId,
      path
    });
    handleFetcherLoader(key2, routeId, path, match, matches, flushSync, submission);
  }
  async function handleFetcherAction(key2, routeId, path, match, requestMatches, flushSync, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key2);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key2, routeId, error, {
        flushSync
      });
      return;
    }
    let existingFetcher = state.fetchers.get(key2);
    updateFetcherState(key2, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key2, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy("action", fetchRequest, [match], requestMatches);
    let actionResult = actionResults[0];
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key2) === abortController) {
        fetchControllers.delete(key2);
      }
      return;
    }
    if (future.v7_fetcherPersist && deletedFetchers.has(key2)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key2, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key2);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key2, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key2);
          updateFetcherState(key2, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, {
            fetcherSubmission: submission
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key2, routeId, actionResult.error);
        return;
      }
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key2, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key2, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
    revalidatingFetchers.filter((rf2) => rf2.key !== key2).forEach((rf2) => {
      let staleKey = rf2.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher);
      if (fetchControllers.has(staleKey)) {
        abortFetcher(staleKey);
      }
      if (rf2.controller) {
        fetchControllers.set(staleKey, rf2.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf2) => abortFetcher(rf2.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key2);
    fetchControllers.delete(key2);
    revalidatingFetchers.forEach((r2) => fetchControllers.delete(r2.key));
    let redirect = findRedirect([...loaderResults, ...fetcherResults]);
    if (redirect) {
      if (redirect.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return startRedirectNavigation(revalidationRequest, redirect.result);
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key2)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key2, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key2, routeId, path, match, matches, flushSync, submission) {
    let existingFetcher = state.fetchers.get(key2);
    updateFetcherState(key2, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key2, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy("loader", fetchRequest, [match], matches);
    let result = results[0];
    if (isDeferredResult(result)) {
      result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
    }
    if (fetchControllers.get(key2) === abortController) {
      fetchControllers.delete(key2);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (deletedFetchers.has(key2)) {
      updateFetcherState(key2, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key2, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key2);
        await startRedirectNavigation(fetchRequest, result);
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key2, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    updateFetcherState(key2, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect, _temp2) {
    let {
      submission,
      fetcherSubmission,
      replace
    } = _temp2 === void 0 ? {} : _temp2;
    if (redirect.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location2 = redirect.response.headers.get("Location");
    invariant(location2, "Expected a Location header on the redirect Response");
    location2 = normalizeRedirectLocation(location2, new URL(request.url), basename);
    let redirectLocation = createLocation(state.location, location2, {
      _isRedirect: true
    });
    if (isBrowser) {
      let isDocumentReload = false;
      if (redirect.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX.test(location2)) {
        const url = init.history.createURL(location2);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace) {
          routerWindow.location.replace(location2);
        } else {
          routerWindow.location.assign(location2);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
    let {
      formMethod,
      formAction,
      formEncType
    } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends$2({}, activeSubmission, {
          formAction: location2
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callDataStrategy(type, request, matchesToLoad, matches) {
    try {
      let results = await callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties2);
      return await Promise.all(results.map((result, i2) => {
        if (isRedirectHandlerResult(result)) {
          let response = result.result;
          return {
            type: ResultType.redirect,
            response: normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i2].route.id, matches, basename, future.v7_relativeSplatPath)
          };
        }
        return convertHandlerResultToDataResult(result);
      }));
    } catch (e2) {
      return matchesToLoad.map(() => ({
        type: ResultType.error,
        error: e2
      }));
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let [loaderResults, ...fetcherResults] = await Promise.all([matchesToLoad.length ? callDataStrategy("loader", request, matchesToLoad, matches) : [], ...fetchersToLoad.map((f2) => {
      if (f2.matches && f2.match && f2.controller) {
        let fetcherRequest = createClientSideRequest(init.history, f2.path, f2.controller.signal);
        return callDataStrategy("loader", fetcherRequest, [f2.match], f2.matches).then((r2) => r2[0]);
      } else {
        return Promise.resolve({
          type: ResultType.error,
          error: getInternalRouterError(404, {
            pathname: f2.path
          })
        });
      }
    })]);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f2) => f2.match), fetcherResults, fetchersToLoad.map((f2) => f2.controller ? f2.controller.signal : null), true)]);
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    fetchLoadMatches.forEach((_2, key2) => {
      if (fetchControllers.has(key2)) {
        cancelledFetcherLoads.push(key2);
        abortFetcher(key2);
      }
    });
  }
  function updateFetcherState(key2, fetcher, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state.fetchers.set(key2, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function setFetcherError(key2, routeId, error, opts) {
    if (opts === void 0) {
      opts = {};
    }
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key2);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function getFetcher(key2) {
    if (future.v7_fetcherPersist) {
      activeFetchers.set(key2, (activeFetchers.get(key2) || 0) + 1);
      if (deletedFetchers.has(key2)) {
        deletedFetchers.delete(key2);
      }
    }
    return state.fetchers.get(key2) || IDLE_FETCHER;
  }
  function deleteFetcher(key2) {
    let fetcher = state.fetchers.get(key2);
    if (fetchControllers.has(key2) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key2))) {
      abortFetcher(key2);
    }
    fetchLoadMatches.delete(key2);
    fetchReloadIds.delete(key2);
    fetchRedirectIds.delete(key2);
    deletedFetchers.delete(key2);
    state.fetchers.delete(key2);
  }
  function deleteFetcherAndUpdateState(key2) {
    if (future.v7_fetcherPersist) {
      let count = (activeFetchers.get(key2) || 0) - 1;
      if (count <= 0) {
        activeFetchers.delete(key2);
        deletedFetchers.add(key2);
      } else {
        activeFetchers.set(key2, count);
      }
    } else {
      deleteFetcher(key2);
    }
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key2) {
    let controller = fetchControllers.get(key2);
    invariant(controller, "Expected fetch controller: " + key2);
    controller.abort();
    fetchControllers.delete(key2);
  }
  function markFetchersDone(keys) {
    for (let key2 of keys) {
      let fetcher = getFetcher(key2);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key2, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key2 of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key2);
      invariant(fetcher, "Expected fetcher: " + key2);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key2);
        doneKeys.push(key2);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key2, id2] of fetchReloadIds) {
      if (id2 < landedId) {
        let fetcher = state.fetchers.get(key2);
        invariant(fetcher, "Expected fetcher: " + key2);
        if (fetcher.state === "loading") {
          abortFetcher(key2);
          fetchReloadIds.delete(key2);
          yeetedKeys.push(key2);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key2, fn2) {
    let blocker = state.blockers.get(key2) || IDLE_BLOCKER;
    if (blockerFunctions.get(key2) !== fn2) {
      blockerFunctions.set(key2, fn2);
    }
    return blocker;
  }
  function deleteBlocker(key2) {
    state.blockers.delete(key2);
    blockerFunctions.delete(key2);
  }
  function updateBlocker(key2, newBlocker) {
    let blocker = state.blockers.get(key2) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key2, newBlocker);
    updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref4) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref4;
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y2 = getSavedScrollPosition(state.location, state.matches);
      if (y2 != null) {
        updateState({
          restoreScrollPosition: y2
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location2, matches) {
    if (getScrollRestorationKey) {
      let key2 = getScrollRestorationKey(location2, matches.map((m2) => convertRouteMatchToUiMatch(m2, state.loaderData)));
      return key2 || location2.key;
    }
    return location2.key;
  }
  function saveScrollPosition(location2, matches) {
    if (savedScrollPositions && getScrollPosition) {
      let key2 = getScrollKey(location2, matches);
      savedScrollPositions[key2] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location2, matches) {
    if (savedScrollPositions) {
      let key2 = getScrollKey(location2, matches);
      let y2 = savedScrollPositions[key2];
      if (typeof y2 === "number") {
        return y2;
      }
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest);
  }
  router2 = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router2;
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location2, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location2.pathname, basename) || location2.pathname, relative === "path");
  if (to == null) {
    path.search = location2.search;
    path.hash = location2.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce((acc, _ref5) => {
          let [name, value] = _ref5;
          return "" + acc + name + "=" + value + "\n";
        }, "")
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e2) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData === "function", "FormData is not available in this environment");
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e2) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return {
      path,
      submission
    };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index2 = matches.findIndex((m2) => m2.route.id === boundaryId);
    if (index2 >= 0) {
      boundaryMatches = matches.slice(0, index2);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location2, isInitialLoad, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location2);
  let boundaryId = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[0] : void 0;
  let boundaryMatches = boundaryId ? getLoaderMatchesUntilBoundary(matches, boundaryId) : matches;
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index2) => {
    let {
      route
    } = match;
    if (route.lazy) {
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (isInitialLoad) {
      if (typeof route.loader !== "function" || route.loader.hydrate) {
        return true;
      }
      return state.loaderData[route.id] === void 0 && // Don't re-run if the loader ran and threw an error
      (!state.errors || state.errors[route.id] === void 0);
    }
    if (isNewLoader(state.loaderData, state.matches[index2], match) || cancelledDeferredRoutes.some((id2) => id2 === match.route.id)) {
      return true;
    }
    let currentRouteMatch = state.matches[index2];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends$2({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      unstable_actionStatus: actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false : (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
        currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      )
    }));
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f2, key2) => {
    if (isInitialLoad || !matches.some((m2) => m2.route.id === f2.routeId) || deletedFetchers.has(key2)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f2.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key: key2,
        routeId: f2.routeId,
        path: f2.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key2);
    let fetcherMatch = getTargetMatch(fetcherMatches, f2.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key2)) {
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.includes(key2)) {
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
      shouldRevalidate = isRevalidationRequired;
    } else {
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends$2({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        unstable_actionStatus: actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      }));
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key: key2,
        routeId: f2.routeId,
        path: f2.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  Object.assign(routeToUpdate, routeUpdates);
  Object.assign(routeToUpdate, _extends$2({}, mapRouteProperties2(routeToUpdate), {
    lazy: void 0
  }));
}
function defaultDataStrategy(opts) {
  return Promise.all(opts.matches.map((m2) => m2.resolve()));
}
async function callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties2, requestContext) {
  let routeIdsToLoad = matchesToLoad.reduce((acc, m2) => acc.add(m2.route.id), /* @__PURE__ */ new Set());
  let loadedMatches = /* @__PURE__ */ new Set();
  let results = await dataStrategyImpl({
    matches: matches.map((match) => {
      let shouldLoad = routeIdsToLoad.has(match.route.id);
      let resolve = (handlerOverride) => {
        loadedMatches.add(match.route.id);
        return shouldLoad ? callLoaderOrAction(type, request, match, manifest, mapRouteProperties2, handlerOverride, requestContext) : Promise.resolve({
          type: ResultType.data,
          result: void 0
        });
      };
      return _extends$2({}, match, {
        shouldLoad,
        resolve
      });
    }),
    request,
    params: matches[0].params,
    context: requestContext
  });
  matches.forEach((m2) => invariant(loadedMatches.has(m2.route.id), '`match.resolve()` was not called for route id "' + m2.route.id + '". You must call `match.resolve()` on every match passed to `dataStrategy` to ensure all routes are properly loaded.'));
  return results.filter((_2, i2) => routeIdsToLoad.has(matches[i2].route.id));
}
async function callLoaderOrAction(type, request, match, manifest, mapRouteProperties2, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_2, r2) => reject = r2);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + type + '" [routeId: ' + match.route.id + "]")));
      }
      return handler({
        request,
        params: match.params,
        context: staticContext
      }, ...ctx !== void 0 ? [ctx] : []);
    };
    let handlerPromise;
    if (handlerOverride) {
      handlerPromise = handlerOverride((ctx) => actualHandler(ctx));
    } else {
      handlerPromise = (async () => {
        try {
          let val = await actualHandler();
          return {
            type: "data",
            result: val
          };
        } catch (e2) {
          return {
            type: "error",
            result: e2
          };
        }
      })();
    }
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (match.route.lazy) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e2) => {
            handlerError = e2;
          }),
          loadLazyRouteModule(match.route, mapRouteProperties2, manifest)
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await loadLazyRouteModule(match.route, mapRouteProperties2, manifest);
        handler = match.route[type];
        if (handler) {
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return {
            type: ResultType.data,
            result: void 0
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e2) {
    return {
      type: ResultType.error,
      result: e2
    };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertHandlerResultToDataResult(handlerResult) {
  let {
    result,
    type,
    status
  } = handlerResult;
  if (isResponse(result)) {
    let data;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data = null;
        } else {
          data = await result.json();
        }
      } else {
        data = await result.text();
      }
    } catch (e2) {
      return {
        type: ResultType.error,
        error: e2
      };
    }
    if (type === ResultType.error) {
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(result.status, result.statusText, data),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === ResultType.error) {
    return {
      type: ResultType.error,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : status
    };
  }
  if (isDeferredData(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result,
    statusCode: status
  };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
  let location2 = response.headers.get("Location");
  invariant(location2, "Redirects returned/thrown from loaders/actions must have a Location header");
  if (!ABSOLUTE_URL_REGEX.test(location2)) {
    let trimmedMatches = matches.slice(0, matches.findIndex((m2) => m2.route.id === routeId) + 1);
    location2 = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location2, v7_relativeSplatPath);
    response.headers.set("Location", location2);
  }
  return response;
}
function normalizeRedirectLocation(location2, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX.test(location2)) {
    let normalizedLocation = location2;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location2;
}
function createClientSideRequest(history, location2, signal, submission) {
  let url = history.createURL(stripHashFromPath(location2)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({
        "Content-Type": formEncType
      });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key2, value] of formData.entries()) {
    searchParams.append(key2, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key2, value] of searchParams.entries()) {
    formData.append(key2, value);
  }
  return formData;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  results.forEach((result, index2) => {
    let id2 = matchesToLoad[index2].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id2] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id2);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      loaderData[id2] = void 0;
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id2] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id2, result.deferredData);
        loaderData[id2] = result.deferredData.data;
        if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id2] = result.headers;
        }
      } else {
        loaderData[id2] = result.data;
        if (result.statusCode && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id2] = result.headers;
        }
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = {
      [pendingActionResult[0]]: pendingError
    };
    loaderData[pendingActionResult[0]] = void 0;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(
    matches,
    matchesToLoad,
    results,
    pendingActionResult,
    activeDeferreds,
    false
    // This method is only called client side so we always want to bubble
  );
  for (let index2 = 0; index2 < revalidatingFetchers.length; index2++) {
    let {
      key: key2,
      match,
      controller
    } = revalidatingFetchers[index2];
    invariant(fetcherResults !== void 0 && fetcherResults[index2] !== void 0, "Did not find corresponding fetcher result");
    let result = fetcherResults[index2];
    if (controller && controller.signal.aborted) {
      continue;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends$2({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key2);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key2, doneFetcher);
    }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends$2({}, newLoaderData);
  for (let match of matches) {
    let id2 = match.route.id;
    if (newLoaderData.hasOwnProperty(id2)) {
      if (newLoaderData[id2] !== void 0) {
        mergedLoaderData[id2] = newLoaderData[id2];
      }
    } else if (loaderData[id2] !== void 0 && match.route.loader) {
      mergedLoaderData[id2] = loaderData[id2];
    }
    if (errors && errors.hasOwnProperty(id2)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m2) => m2.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m2) => m2.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r2) => r2.index || !r2.path || r2.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp5) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp5 === void 0 ? {} : _temp5;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = 'No route matches URL "' + pathname + '"';
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
    }
  }
  return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
  for (let i2 = results.length - 1; i2 >= 0; i2--) {
    let result = results[i2];
    if (isRedirectResult(result)) {
      return {
        result,
        idx: i2
      };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends$2({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a2, b2) {
  if (a2.pathname !== b2.pathname || a2.search !== b2.search) {
    return false;
  }
  if (a2.hash === "") {
    return b2.hash !== "";
  } else if (a2.hash === b2.hash) {
    return true;
  } else if (b2.hash !== "") {
    return true;
  }
  return false;
}
function isRedirectHandlerResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index2 = 0; index2 < results.length; index2++) {
    let result = results[index2];
    let match = matchesToLoad[index2];
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find((m2) => m2.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      let signal = signals[index2];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
      await resolveDeferredData(result, signal, isFetcher).then((result2) => {
        if (result2) {
          results[index2] = result2 || results[index2];
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e2) {
      return {
        type: ResultType.error,
        error: e2
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v2) => v2 === "");
}
function getTargetMatch(matches, location2) {
  let search = typeof location2 === "string" ? parsePath(location2).search : location2.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json
  } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location2, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location: location2,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location: location2,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location2, submission) {
  let navigation = {
    state: "submitting",
    location: location2,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k2, v2] of Object.entries(json || {})) {
        if (v2 && Array.isArray(v2)) {
          transitions.set(k2, new Set(v2 || []));
        }
      }
    }
  } catch (e2) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k2, v2] of transitions) {
      json[k2] = [...v2];
    }
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
/**
 * React Router v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source2 = arguments[i2];
      for (var key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          target[key2] = source2[key2];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb2) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb2);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location2;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location2 = parsedLocationArg;
  } else {
    location2 = locationFromContext;
  }
  let pathname = location2.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$1({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location2),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState2;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index2 === 0) {
          warningOnce("route-fallback", false);
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index2) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function useNavigateStable() {
  let {
    router: router2
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id2 = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router2.navigate(to);
    } else {
      router2.navigate(to, _extends$1({
        fromRouteId: id2
      }, options));
    }
  }, [router2, id2]);
  return navigate;
}
const alreadyWarned = {};
function warningOnce(key2, cond, message) {
  if (!cond && !alreadyWarned[key2]) {
    alreadyWarned[key2] = true;
  }
}
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    future,
    static: isStatic
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends$1({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key: key2 = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key: key2
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key2, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
new Promise(() => {
});
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    Object.assign(updates, {
      element: /* @__PURE__ */ reactExports.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    Object.assign(updates, {
      hydrateFallbackElement: /* @__PURE__ */ reactExports.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    Object.assign(updates, {
      errorElement: /* @__PURE__ */ reactExports.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source2 = arguments[i2];
      for (var key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          target[key2] = source2[key2];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key2) => {
    let value = init[key2];
    return memo.concat(Array.isArray(value) ? value.map((v2) => [key2, v2]) : [[key2, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_2, key2) => {
      if (!searchParams.has(key2)) {
        defaultSearchParams.getAll(key2).forEach((value) => {
          searchParams.append(key2, value);
        });
      }
    });
  }
  return searchParams;
}
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e2) {
}
function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties,
    unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = _extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key2, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key2] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key2] = error;
          } catch (e2) {
          }
        }
      }
      if (serialized[key2] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key2] = error;
      }
    } else {
      serialized[key2] = val;
    }
  }
  return serialized;
}
const ViewTransitionContext = /* @__PURE__ */ reactExports.createContext({
  isTransitioning: false
});
const FetchersContext = /* @__PURE__ */ reactExports.createContext(/* @__PURE__ */ new Map());
const START_TRANSITION = "startTransition";
const startTransitionImpl = React[START_TRANSITION];
const FLUSH_SYNC = "flushSync";
const flushSyncImpl = ReactDOM$1[FLUSH_SYNC];
function startTransitionSafe(cb2) {
  if (startTransitionImpl) {
    startTransitionImpl(cb2);
  } else {
    cb2();
  }
}
function flushSyncSafe(cb2) {
  if (flushSyncImpl) {
    flushSyncImpl(cb2);
  } else {
    cb2();
  }
}
class Deferred {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
}
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router: router2,
    future
  } = _ref;
  let [state, setStateImpl] = reactExports.useState(router2.state);
  let [pendingState, setPendingState] = reactExports.useState();
  let [vtContext, setVtContext] = reactExports.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = reactExports.useState();
  let [transition, setTransition] = reactExports.useState();
  let [interruption, setInterruption] = reactExports.useState();
  let fetcherData = reactExports.useRef(/* @__PURE__ */ new Map());
  let {
    v7_startTransition
  } = future || {};
  let optInStartTransition = reactExports.useCallback((cb2) => {
    if (v7_startTransition) {
      startTransitionSafe(cb2);
    } else {
      cb2();
    }
  }, [v7_startTransition]);
  let setState = reactExports.useCallback((newState, _ref2) => {
    let {
      deletedFetchers,
      unstable_flushSync: flushSync,
      unstable_viewTransitionOpts: viewTransitionOpts
    } = _ref2;
    deletedFetchers.forEach((key2) => fetcherData.current.delete(key2));
    newState.fetchers.forEach((fetcher, key2) => {
      if (fetcher.data !== void 0) {
        fetcherData.current.set(key2, fetcher.data);
      }
    });
    let isViewTransitionUnavailable = router2.window == null || router2.window.document == null || typeof router2.window.document.startViewTransition !== "function";
    if (!viewTransitionOpts || isViewTransitionUnavailable) {
      if (flushSync) {
        flushSyncSafe(() => setStateImpl(newState));
      } else {
        optInStartTransition(() => setStateImpl(newState));
      }
      return;
    }
    if (flushSync) {
      flushSyncSafe(() => {
        if (transition) {
          renderDfd && renderDfd.resolve();
          transition.skipTransition();
        }
        setVtContext({
          isTransitioning: true,
          flushSync: true,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      });
      let t = router2.window.document.startViewTransition(() => {
        flushSyncSafe(() => setStateImpl(newState));
      });
      t.finished.finally(() => {
        flushSyncSafe(() => {
          setRenderDfd(void 0);
          setTransition(void 0);
          setPendingState(void 0);
          setVtContext({
            isTransitioning: false
          });
        });
      });
      flushSyncSafe(() => setTransition(t));
      return;
    }
    if (transition) {
      renderDfd && renderDfd.resolve();
      transition.skipTransition();
      setInterruption({
        state: newState,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    } else {
      setPendingState(newState);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    }
  }, [router2.window, transition, renderDfd, fetcherData, optInStartTransition]);
  reactExports.useLayoutEffect(() => router2.subscribe(setState), [router2, setState]);
  reactExports.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  reactExports.useEffect(() => {
    if (renderDfd && pendingState && router2.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router2.window.document.startViewTransition(async () => {
        optInStartTransition(() => setStateImpl(newState));
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({
          isTransitioning: false
        });
      });
      setTransition(transition2);
    }
  }, [optInStartTransition, pendingState, renderDfd, router2.window]);
  reactExports.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  reactExports.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  reactExports.useEffect(() => {
  }, []);
  let navigator2 = reactExports.useMemo(() => {
    return {
      createHref: router2.createHref,
      encodeLocation: router2.encodeLocation,
      go: (n2) => router2.navigate(n2),
      push: (to, state2, opts) => router2.navigate(to, {
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state2, opts) => router2.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router2]);
  let basename = router2.basename || "/";
  let dataRouterContext = reactExports.useMemo(() => ({
    router: router2,
    navigator: navigator2,
    static: false,
    basename
  }), [router2, navigator2, basename]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ reactExports.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ reactExports.createElement(FetchersContext.Provider, {
    value: fetcherData.current
  }, /* @__PURE__ */ reactExports.createElement(ViewTransitionContext.Provider, {
    value: vtContext
  }, /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator2,
    future: {
      v7_relativeSplatPath: router2.future.v7_relativeSplatPath
    }
  }, state.initialized || router2.future.v7_partialHydration ? /* @__PURE__ */ reactExports.createElement(DataRoutes, {
    routes: router2.routes,
    future: router2.future,
    state
  }) : fallbackElement))))), null);
}
function DataRoutes(_ref3) {
  let {
    routes,
    future,
    state
  } = _ref3;
  return useRoutesImpl(routes, void 0, state, future);
}
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useSearchParams(defaultInit) {
  let defaultSearchParamsRef = reactExports.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = reactExports.useRef(false);
  let location2 = useLocation();
  let searchParams = reactExports.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location2.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current)
  ), [location2.search]);
  let navigate = useNavigate();
  let setSearchParams = reactExports.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "//storage.360buyimg.com/dlxt/recharge/2d8254d/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i2 = links.length - 1; i2 >= 0; i2--) {
        const link2 = links[i2];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector('link[href="'.concat(dep, '"]').concat(cssSelector))) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error("Unable to preload CSS for ".concat(dep))));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e2 = new Event("vite:preloadError", { cancelable: true });
    e2.payload = err;
    window.dispatchEvent(e2);
    if (!e2.defaultPrevented) {
      throw err;
    }
  });
};
const Vender = reactExports.lazy(() => __vitePreload(() => import("./index-b3160cd3.js"), true ? ["assets/index-b3160cd3.js","assets/index-3a81e4d4.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/md5-8ad6269f.js","assets/index-e2a3dac1.css"] : void 0));
const FlowSettlement = reactExports.lazy(() => __vitePreload(() => import("./index-f1bc2263.js"), true ? ["assets/index-f1bc2263.js","assets/index-3a81e4d4.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/price-75f0ab53.js","assets/price-30cec9ef.css","assets/md5-8ad6269f.js","assets/shortpassword-307c61c6.js","assets/CSSTransition-43491b93.js","assets/debounce-5804ce82.js","assets/debounce-33cd572b.css","assets/shortpassword-1deb4e9d.css","assets/index-c997db16.css"] : void 0));
const TelphoneFeeSettlement = reactExports.lazy(() => __vitePreload(() => import("./index-114f436f.js"), true ? ["assets/index-114f436f.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/dialog-20949392.js","assets/CSSTransition-43491b93.js","assets/dialog-c868a763.css","assets/price-75f0ab53.js","assets/price-30cec9ef.css","assets/shortpassword-307c61c6.js","assets/debounce-5804ce82.js","assets/debounce-33cd572b.css","assets/shortpassword-1deb4e9d.css","assets/md5-8ad6269f.js","assets/index-3a81e4d4.js","assets/Loading-e426be01.js","assets/Loading-d68a110f.css","assets/index-7072865f.css"] : void 0));
const CardFeeSettlement = reactExports.lazy(() => __vitePreload(() => import("./index-4ccee3ee.js"), true ? ["assets/index-4ccee3ee.js","assets/price-75f0ab53.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/price-30cec9ef.css","assets/shortpassword-307c61c6.js","assets/CSSTransition-43491b93.js","assets/debounce-5804ce82.js","assets/debounce-33cd572b.css","assets/shortpassword-1deb4e9d.css","assets/dayjs.min-bb8d73df.js","assets/dayjs-4ef6a1bd.css","assets/dialog-20949392.js","assets/dialog-c868a763.css","assets/index-3a81e4d4.js","assets/Loading-e426be01.js","assets/Loading-d68a110f.css","assets/index-a4e72a70.css"] : void 0));
const OrderDetail = reactExports.lazy(() => __vitePreload(() => import("./index-f4ed77bf.js"), true ? ["assets/index-f4ed77bf.js","assets/price-75f0ab53.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/price-30cec9ef.css","assets/dialog-20949392.js","assets/CSSTransition-43491b93.js","assets/dialog-c868a763.css","assets/Loading-e426be01.js","assets/Loading-d68a110f.css","assets/index-3a81e4d4.js","assets/md5-8ad6269f.js","assets/dayjs.min-bb8d73df.js","assets/dayjs-4ef6a1bd.css","assets/index-907e4ac4.css"] : void 0));
const ErrorPage = reactExports.lazy(() => __vitePreload(() => import("./index-ad54bb05.js"), true ? ["assets/index-ad54bb05.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/index-ea82265d.css"] : void 0));
const NotFound = reactExports.lazy(() => __vitePreload(() => import("./index-791c27c9.js"), true ? [] : void 0));
const ExChange = reactExports.lazy(() => __vitePreload(() => import("./index-6d979528.js"), true ? ["assets/index-6d979528.js","assets/index-3a81e4d4.js","assets/toast-21e34d7d.js","assets/toast-2ffa0efe.css","assets/dialog-20949392.js","assets/CSSTransition-43491b93.js","assets/dialog-c868a763.css","assets/debounce-5804ce82.js","assets/debounce-33cd572b.css","assets/index-decc4cf0.css"] : void 0));
const routerConf = [
  {
    path: "/",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/error" })
  },
  {
    path: "/vender",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(Vender, {})
  },
  {
    path: "/flowSettlement",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(FlowSettlement, {})
  },
  {
    path: "/telphoneFeeSettlement",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(TelphoneFeeSettlement, {})
  },
  {
    path: "/cardSettlement",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(CardFeeSettlement, {})
  },
  {
    path: "/orderDetail",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDetail, {})
  },
  {
    path: "/error",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorPage, {})
  },
  {
    path: "/exChange",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(ExChange, {})
  },
  {
    path: "/*",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {})
  }
];
const AutoLoginHOC = (Wrapper) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/NotFound", replace: true });
};
routerConf.forEach((_routerConf) => {
  if (_routerConf.autoLogin) {
    if (_routerConf.element)
      _routerConf.element = AutoLoginHOC(_routerConf.element);
  }
});
const { VITE_APP_BASE_URL, VITE_APP_NAME, MODE, PROD } = { "VITE_APP_NAME": "recharge", "VITE_APP_BASE_URL": "", "VITE_APP_BASE_URL_COLOR": "https://api.m.jd.com", "VITE_APP_STATIC_URL": "//storage.360buyimg.com", "VITE_APP_WQ_BIZID": "rdcactivity", "VITE_APP_WQ_APPID": "773", "VITE_APP_BROWSER_VERSION": "['not IE 11', 'ios11', 'Chrome 64']", "VITE_APP_LOCAL_USE_MOCK": "false", "VITE_APP_PROD_USE_CHUNK_MOCK": "false", "VITE_APP_MOBILE_DEVICE": "true", "VITE_APP_SDAPPID": "8e94a", "VITE_APP_COLOR_APPID": "tsw-m", "VITE_APP_COLOR_FUNCTION": "zyoungster_h5_api", "VITE_APP_OSS_BUCKET": "dlxt", "VITE_APP_OSS_ACCESS_KEY": "09qeZL2GXnXvieq0", "VITE_APP_OSS_SECERT_KEY": "9tGJuy4iN2ZFmBn7dM18kJNConAKZP2DKq5P5MUk", "VITE_APP_CARD_SETTLEMENT_URL": "//recharge.m.jd.com/cardSettlement?source=5&skuId=", "BASE_URL": "//storage.360buyimg.com/dlxt/recharge/2d8254d", "MODE": "production", "DEV": false, "PROD": true, "SSR": false, "LEGACY": false };
const tongtianTower = ["pro.m.jd.com", "prodev.m.jd.com", "h5static.m.jd.com"];
const isBeInTower = !!tongtianTower.filter((url) => window.location.href.includes(url)).length;
const babelUrl = "".concat(window.location.pathname);
const RouterBaseName = isBeInTower ? babelUrl : MODE === "pre" && PROD ? "/".concat(VITE_APP_NAME).concat(VITE_APP_BASE_URL) : VITE_APP_BASE_URL;
const router = createBrowserRouter(routerConf, {
  basename: RouterBaseName
});
function n(n2) {
  for (var r2 = arguments.length, t = Array(r2 > 1 ? r2 - 1 : 0), e2 = 1; e2 < r2; e2++)
    t[e2 - 1] = arguments[e2];
  throw Error("[Immer] minified error nr: " + n2 + (t.length ? " " + t.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n2) {
  return !!n2 && !!n2[Q];
}
function t$1(n2) {
  var r2;
  return !!n2 && (function(n3) {
    if (!n3 || "object" != typeof n3)
      return false;
    var r3 = Object.getPrototypeOf(n3);
    if (null === r3)
      return true;
    var t = Object.hasOwnProperty.call(r3, "constructor") && r3.constructor;
    return t === Object || "function" == typeof t && Function.toString.call(t) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!(null === (r2 = n2.constructor) || void 0 === r2 ? void 0 : r2[L]) || s(n2) || v(n2));
}
function i(n2, r2, t) {
  void 0 === t && (t = false), 0 === o(n2) ? (t ? Object.keys : nn)(n2).forEach(function(e2) {
    t && "symbol" == typeof e2 || r2(e2, n2[e2], n2);
  }) : n2.forEach(function(t2, e2) {
    return r2(e2, t2, n2);
  });
}
function o(n2) {
  var r2 = n2[Q];
  return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
}
function u(n2, r2) {
  return 2 === o(n2) ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
}
function a(n2, r2) {
  return 2 === o(n2) ? n2.get(r2) : n2[r2];
}
function f(n2, r2, t) {
  var e2 = o(n2);
  2 === e2 ? n2.set(r2, t) : 3 === e2 ? n2.add(t) : n2[r2] = t;
}
function c(n2, r2) {
  return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
}
function s(n2) {
  return X && n2 instanceof Map;
}
function v(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var r2 = rn(n2);
  delete r2[Q];
  for (var t = nn(r2), e2 = 0; e2 < t.length; e2++) {
    var i2 = t[e2], o2 = r2[i2];
    false === o2.writable && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
  }
  return Object.create(Object.getPrototypeOf(n2), r2);
}
function d(n2, e2) {
  return void 0 === e2 && (e2 = false), y(n2) || r(n2) || !t$1(n2) || (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e2 && i(n2, function(n3, r2) {
    return d(r2, true);
  }, true)), n2;
}
function h() {
  n(2);
}
function y(n2) {
  return null == n2 || "object" != typeof n2 || Object.isFrozen(n2);
}
function b(r2) {
  var t = tn[r2];
  return t || n(18, r2), t;
}
function m(n2, r2) {
  tn[n2] || (tn[n2] = r2);
}
function _() {
  return U;
}
function j(n2, r2) {
  r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
}
function g(n2) {
  O(n2), n2.p.forEach(S), n2.p = null;
}
function O(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var r2 = n2[Q];
  0 === r2.i || 1 === r2.i ? r2.j() : r2.g = true;
}
function P(r2, e2) {
  e2._ = e2.p.length;
  var i2 = e2.p[0], o2 = void 0 !== r2 && r2 !== i2;
  return e2.h.O || b("ES5").S(e2, r2, o2), o2 ? (i2[Q].P && (g(e2), n(4)), t$1(r2) && (r2 = M(e2, r2), e2.l || x(e2, r2)), e2.u && b("Patches").M(i2[Q].t, r2, e2.u, e2.s)) : r2 = M(e2, i2, []), g(e2), e2.u && e2.v(e2.u, e2.s), r2 !== H ? r2 : void 0;
}
function M(n2, r2, t) {
  if (y(r2))
    return r2;
  var e2 = r2[Q];
  if (!e2)
    return i(r2, function(i2, o3) {
      return A(n2, e2, r2, i2, o3, t);
    }, true), r2;
  if (e2.A !== n2)
    return r2;
  if (!e2.P)
    return x(n2, e2.t, true), e2.t;
  if (!e2.I) {
    e2.I = true, e2.A._--;
    var o2 = 4 === e2.i || 5 === e2.i ? e2.o = l(e2.k) : e2.o, u2 = o2, a2 = false;
    3 === e2.i && (u2 = new Set(o2), o2.clear(), a2 = true), i(u2, function(r3, i2) {
      return A(n2, e2, o2, r3, i2, t, a2);
    }), x(n2, o2, false), t && n2.u && b("Patches").N(e2, t, n2.u, n2.s);
  }
  return e2.o;
}
function A(e2, i2, o2, a2, c2, s2, v2) {
  if (r(c2)) {
    var p2 = M(e2, c2, s2 && i2 && 3 !== i2.i && !u(i2.R, a2) ? s2.concat(a2) : void 0);
    if (f(o2, a2, p2), !r(p2))
      return;
    e2.m = false;
  } else
    v2 && o2.add(c2);
  if (t$1(c2) && !y(c2)) {
    if (!e2.h.D && e2._ < 1)
      return;
    M(e2, c2), i2 && i2.A.l || x(e2, c2);
  }
}
function x(n2, r2, t) {
  void 0 === t && (t = false), !n2.l && n2.h.D && n2.m && d(r2, t);
}
function z$1(n2, r2) {
  var t = n2[Q];
  return (t ? p(t) : n2)[r2];
}
function I(n2, r2) {
  if (r2 in n2)
    for (var t = Object.getPrototypeOf(n2); t; ) {
      var e2 = Object.getOwnPropertyDescriptor(t, r2);
      if (e2)
        return e2;
      t = Object.getPrototypeOf(t);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function N(n2, r2, t) {
  var e2 = s(r2) ? b("MapSet").F(r2, t) : v(r2) ? b("MapSet").T(r2, t) : n2.O ? function(n3, r3) {
    var t2 = Array.isArray(n3), e3 = { i: t2 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, R: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e3, o2 = en;
    t2 && (i2 = [e3], o2 = on);
    var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e3.k = f2, e3.j = a2, f2;
  }(r2, t) : b("ES5").J(r2, t);
  return (t ? t.A : _()).p.push(e2), e2;
}
function R(e2) {
  return r(e2) || n(22, e2), function n2(r2) {
    if (!t$1(r2))
      return r2;
    var e3, u2 = r2[Q], c2 = o(r2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e3 = D(r2, c2), u2.I = false;
    } else
      e3 = D(r2, c2);
    return i(e3, function(r3, t) {
      u2 && a(u2.t, r3) === t || f(e3, r3, n2(t));
    }), 3 === c2 ? new Set(e3) : e3;
  }(e2);
}
function D(n2, r2) {
  switch (r2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
function F() {
  function t(n2, r2) {
    var t2 = s2[n2];
    return t2 ? t2.enumerable = r2 : s2[n2] = t2 = { configurable: true, enumerable: r2, get: function() {
      var r3 = this[Q];
      return en.get(r3, n2);
    }, set: function(r3) {
      var t3 = this[Q];
      en.set(t3, n2, r3);
    } }, t2;
  }
  function e2(n2) {
    for (var r2 = n2.length - 1; r2 >= 0; r2--) {
      var t2 = n2[r2][Q];
      if (!t2.P)
        switch (t2.i) {
          case 5:
            a2(t2) && k(t2);
            break;
          case 4:
            o2(t2) && k(t2);
        }
    }
  }
  function o2(n2) {
    for (var r2 = n2.t, t2 = n2.k, e3 = nn(t2), i2 = e3.length - 1; i2 >= 0; i2--) {
      var o3 = e3[i2];
      if (o3 !== Q) {
        var a3 = r2[o3];
        if (void 0 === a3 && !u(r2, o3))
          return true;
        var f2 = t2[o3], s3 = f2 && f2[Q];
        if (s3 ? s3.t !== a3 : !c(f2, a3))
          return true;
      }
    }
    var v2 = !!r2[Q];
    return e3.length !== nn(r2).length + (v2 ? 0 : 1);
  }
  function a2(n2) {
    var r2 = n2.k;
    if (r2.length !== n2.t.length)
      return true;
    var t2 = Object.getOwnPropertyDescriptor(r2, r2.length - 1);
    if (t2 && !t2.get)
      return true;
    for (var e3 = 0; e3 < r2.length; e3++)
      if (!r2.hasOwnProperty(e3))
        return true;
    return false;
  }
  var s2 = {};
  m("ES5", { J: function(n2, r2) {
    var e3 = Array.isArray(n2), i2 = function(n3, r3) {
      if (n3) {
        for (var e4 = Array(r3.length), i3 = 0; i3 < r3.length; i3++)
          Object.defineProperty(e4, "" + i3, t(i3, true));
        return e4;
      }
      var o4 = rn(r3);
      delete o4[Q];
      for (var u2 = nn(o4), a3 = 0; a3 < u2.length; a3++) {
        var f2 = u2[a3];
        o4[f2] = t(f2, n3 || !!o4[f2].enumerable);
      }
      return Object.create(Object.getPrototypeOf(r3), o4);
    }(e3, n2), o3 = { i: e3 ? 5 : 4, A: r2 ? r2.A : _(), P: false, I: false, R: {}, l: r2, t: n2, k: i2, o: null, g: false, C: false };
    return Object.defineProperty(i2, Q, { value: o3, writable: true }), i2;
  }, S: function(n2, t2, o3) {
    o3 ? r(t2) && t2[Q].A === n2 && e2(n2.p) : (n2.u && function n3(r2) {
      if (r2 && "object" == typeof r2) {
        var t3 = r2[Q];
        if (t3) {
          var e3 = t3.t, o4 = t3.k, f2 = t3.R, c2 = t3.i;
          if (4 === c2)
            i(o4, function(r3) {
              r3 !== Q && (void 0 !== e3[r3] || u(e3, r3) ? f2[r3] || n3(o4[r3]) : (f2[r3] = true, k(t3)));
            }), i(e3, function(n4) {
              void 0 !== o4[n4] || u(o4, n4) || (f2[n4] = false, k(t3));
            });
          else if (5 === c2) {
            if (a2(t3) && (k(t3), f2.length = true), o4.length < e3.length)
              for (var s3 = o4.length; s3 < e3.length; s3++)
                f2[s3] = false;
            else
              for (var v2 = e3.length; v2 < o4.length; v2++)
                f2[v2] = true;
            for (var p2 = Math.min(o4.length, e3.length), l2 = 0; l2 < p2; l2++)
              o4.hasOwnProperty(l2) || (f2[l2] = true), void 0 === f2[l2] && n3(o4[l2]);
          }
        }
      }
    }(n2.p[0]), e2(n2.p));
  }, K: function(n2) {
    return 4 === n2.i ? o2(n2) : a2(n2);
  } });
}
var G, U, W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), X = "undefined" != typeof Map, q = "undefined" != typeof Set, B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", Z = "" + Object.prototype.constructor, nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames, rn = Object.getOwnPropertyDescriptors || function(n2) {
  var r2 = {};
  return nn(n2).forEach(function(t) {
    r2[t] = Object.getOwnPropertyDescriptor(n2, t);
  }), r2;
}, tn = {}, en = { get: function(n2, r2) {
  if (r2 === Q)
    return n2;
  var e2 = p(n2);
  if (!u(e2, r2))
    return function(n3, r3, t) {
      var e3, i3 = I(r3, t);
      return i3 ? "value" in i3 ? i3.value : null === (e3 = i3.get) || void 0 === e3 ? void 0 : e3.call(n3.k) : void 0;
    }(n2, e2, r2);
  var i2 = e2[r2];
  return n2.I || !t$1(i2) ? i2 : i2 === z$1(n2.t, r2) ? (E(n2), n2.o[r2] = N(n2.A.h, i2, n2)) : i2;
}, has: function(n2, r2) {
  return r2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, r2, t) {
  var e2 = I(p(n2), r2);
  if (null == e2 ? void 0 : e2.set)
    return e2.set.call(n2.k, t), true;
  if (!n2.P) {
    var i2 = z$1(p(n2), r2), o2 = null == i2 ? void 0 : i2[Q];
    if (o2 && o2.t === t)
      return n2.o[r2] = t, n2.R[r2] = false, true;
    if (c(t, i2) && (void 0 !== t || u(n2.t, r2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[r2] === t && (void 0 !== t || r2 in n2.o) || Number.isNaN(t) && Number.isNaN(n2.o[r2]) || (n2.o[r2] = t, n2.R[r2] = true), true;
}, deleteProperty: function(n2, r2) {
  return void 0 !== z$1(n2.t, r2) || r2 in n2.t ? (n2.R[r2] = false, E(n2), k(n2)) : delete n2.R[r2], n2.o && delete n2.o[r2], true;
}, getOwnPropertyDescriptor: function(n2, r2) {
  var t = p(n2), e2 = Reflect.getOwnPropertyDescriptor(t, r2);
  return e2 ? { writable: true, configurable: 1 !== n2.i || "length" !== r2, enumerable: e2.enumerable, value: t[r2] } : e2;
}, defineProperty: function() {
  n(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n(12);
} }, on = {};
i(en, function(n2, r2) {
  on[n2] = function() {
    return arguments[0] = arguments[0][0], r2.apply(this, arguments);
  };
}), on.deleteProperty = function(r2, t) {
  return on.set.call(this, r2, t, void 0);
}, on.set = function(r2, t, e2) {
  return en.set.call(this, r2[0], t, e2, r2[0]);
};
var un = function() {
  function e2(r2) {
    var e3 = this;
    this.O = B, this.D = true, this.produce = function(r3, i3, o2) {
      if ("function" == typeof r3 && "function" != typeof i3) {
        var u2 = i3;
        i3 = r3;
        var a2 = e3;
        return function(n2) {
          var r4 = this;
          void 0 === n2 && (n2 = u2);
          for (var t = arguments.length, e4 = Array(t > 1 ? t - 1 : 0), o3 = 1; o3 < t; o3++)
            e4[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var t2;
            return (t2 = i3).call.apply(t2, [r4, n3].concat(e4));
          });
        };
      }
      var f2;
      if ("function" != typeof i3 && n(6), void 0 !== o2 && "function" != typeof o2 && n(7), t$1(r3)) {
        var c2 = w(e3), s2 = N(e3, r3, void 0), v2 = true;
        try {
          f2 = i3(s2), v2 = false;
        } finally {
          v2 ? g(c2) : O(c2);
        }
        return "undefined" != typeof Promise && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw g(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!r3 || "object" != typeof r3) {
        if (void 0 === (f2 = i3(r3)) && (f2 = r3), f2 === H && (f2 = void 0), e3.D && d(f2, true), o2) {
          var p2 = [], l2 = [];
          b("Patches").M(r3, f2, p2, l2), o2(p2, l2);
        }
        return f2;
      }
      n(21, r3);
    }, this.produceWithPatches = function(n2, r3) {
      if ("function" == typeof n2)
        return function(r4) {
          for (var t2 = arguments.length, i4 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++)
            i4[o3 - 1] = arguments[o3];
          return e3.produceWithPatches(r4, function(r5) {
            return n2.apply(void 0, [r5].concat(i4));
          });
        };
      var t, i3, o2 = e3.produce(n2, r3, function(n3, r4) {
        t = n3, i3 = r4;
      });
      return "undefined" != typeof Promise && o2 instanceof Promise ? o2.then(function(n3) {
        return [n3, t, i3];
      }) : [o2, t, i3];
    }, "boolean" == typeof (null == r2 ? void 0 : r2.useProxies) && this.setUseProxies(r2.useProxies), "boolean" == typeof (null == r2 ? void 0 : r2.autoFreeze) && this.setAutoFreeze(r2.autoFreeze);
  }
  var i2 = e2.prototype;
  return i2.createDraft = function(e3) {
    t$1(e3) || n(8), r(e3) && (e3 = R(e3));
    var i3 = w(this), o2 = N(this, e3, void 0);
    return o2[Q].C = true, O(i3), o2;
  }, i2.finishDraft = function(r2, t) {
    var e3 = r2 && r2[Q];
    var i3 = e3.A;
    return j(i3, t), P(void 0, i3);
  }, i2.setAutoFreeze = function(n2) {
    this.D = n2;
  }, i2.setUseProxies = function(r2) {
    r2 && !B && n(20), this.O = r2;
  }, i2.applyPatches = function(n2, t) {
    var e3;
    for (e3 = t.length - 1; e3 >= 0; e3--) {
      var i3 = t[e3];
      if (0 === i3.path.length && "replace" === i3.op) {
        n2 = i3.value;
        break;
      }
    }
    e3 > -1 && (t = t.slice(e3 + 1));
    var o2 = b("Patches").$;
    return r(n2) ? o2(n2, t) : this.produce(n2, function(n3) {
      return o2(n3, t);
    });
  }, e2;
}(), an = new un(), fn = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function toPrimitive(t, r2) {
  if ("object" != _typeof(t) || !t)
    return t;
  var e2 = t[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t, r2 || "default");
    if ("object" != _typeof(i2))
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t);
}
function toPropertyKey(t) {
  var i2 = toPrimitive(t, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _defineProperty(obj, key2, value) {
  key2 = toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function ownKeys(e2, r2) {
  var t = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t), true).forEach(function(r3) {
      _defineProperty(e2, r3, t[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t, r3));
    });
  }
  return e2;
}
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
}
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject$1(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage(1));
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error(formatProdErrorMessage(2));
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(3));
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(formatProdErrorMessage(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(5));
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index2 = nextListeners.indexOf(listener);
      nextListeners.splice(index2, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject$1(action)) {
      throw new Error(formatProdErrorMessage(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage(8));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i2 = 0; i2 < listeners.length; i2++) {
      var listener = listeners[i2];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage(11));
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key2) {
    var reducer = reducers[key2];
    var initialState2 = reducer(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(formatProdErrorMessage(12));
    }
    if (typeof reducer(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage(13));
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i2 = 0; i2 < reducerKeys.length; i2++) {
    var key2 = reducerKeys[i2];
    if (typeof reducers[key2] === "function") {
      finalReducers[key2] = reducers[key2];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e2) {
    shapeAssertionError = e2;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage(14));
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function(arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function(a2, b2) {
    return function() {
      return a2(b2.apply(void 0, arguments));
    };
  });
}
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function(createStore2) {
    return function() {
      var store2 = createStore2.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error(formatProdErrorMessage(15));
      };
      var middlewareAPI = {
        getState: store2.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function(middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store2.dispatch);
      return _objectSpread2(_objectSpread2({}, store2), {}, {
        dispatch: _dispatch
      });
    };
  };
}
function createThunkMiddleware(extraArgument) {
  var middleware = function middleware2(_ref) {
    var dispatch = _ref.dispatch, getState = _ref.getState;
    return function(next) {
      return function(action) {
        if (typeof action === "function") {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    };
  };
  return middleware;
}
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
const thunkMiddleware = thunk;
var __extends$1 = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var __generator = globalThis && globalThis.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y2, t, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_2)
      try {
        if (f2 = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done)
          return t;
        if (y2 = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t[1]) {
              _2.label = t[1];
              t = op;
              break;
            }
            if (t && _2.label < t[2]) {
              _2.label = t[2];
              _2.ops.push(op);
              break;
            }
            if (t[2])
              _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from) {
  for (var i2 = 0, il2 = from.length, j2 = to.length; i2 < il2; i2++, j2++)
    to[j2] = from[i2];
  return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function(obj, key2, value) {
  return key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
};
var __spreadValues = function(a2, b2) {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var _i = 0, _c = __getOwnPropSymbols(b2); _i < _c.length; _i++) {
      var prop = _c[_i];
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = function(a2, b2) {
  return __defProps(a2, __getOwnPropDescs(b2));
};
var __async = function(__this, __arguments, generator) {
  return new Promise(function(resolve, reject) {
    var fulfilled = function(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = function(value) {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = function(x2) {
      return x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0)
    return void 0;
  if (typeof arguments[0] === "object")
    return compose;
  return compose.apply(null, arguments);
};
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  var proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  var baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}
function createAction(type, prepareAction) {
  function actionCreator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return __spreadValues(__spreadValues({
        type,
        payload: prepared.payload
      }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
    }
    return { type, payload: args[0] };
  }
  actionCreator.toString = function() {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function(action) {
    return action.type === type;
  };
  return actionCreator;
}
var MiddlewareArray = (
  /** @class */
  function(_super) {
    __extends$1(MiddlewareArray2, _super);
    function MiddlewareArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
      return _this;
    }
    Object.defineProperty(MiddlewareArray2, Symbol.species, {
      get: function() {
        return MiddlewareArray2;
      },
      enumerable: false,
      configurable: true
    });
    MiddlewareArray2.prototype.concat = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray2.prototype.prepend = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr[0].concat(this))))();
      }
      return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr.concat(this))))();
    };
    return MiddlewareArray2;
  }(Array)
);
var EnhancerArray = (
  /** @class */
  function(_super) {
    __extends$1(EnhancerArray2, _super);
    function EnhancerArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, EnhancerArray2.prototype);
      return _this;
    }
    Object.defineProperty(EnhancerArray2, Symbol.species, {
      get: function() {
        return EnhancerArray2;
      },
      enumerable: false,
      configurable: true
    });
    EnhancerArray2.prototype.concat = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    EnhancerArray2.prototype.prepend = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (EnhancerArray2.bind.apply(EnhancerArray2, __spreadArray([void 0], arr[0].concat(this))))();
      }
      return new (EnhancerArray2.bind.apply(EnhancerArray2, __spreadArray([void 0], arr.concat(this))))();
    };
    return EnhancerArray2;
  }(Array)
);
function freezeDraftable(val) {
  return t$1(val) ? fn(val, function() {
  }) : val;
}
function isBoolean(x2) {
  return typeof x2 === "boolean";
}
function curryGetDefaultMiddleware() {
  return function curriedGetDefaultMiddleware(options) {
    return getDefaultMiddleware(options);
  };
}
function getDefaultMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  var _c = options.thunk, thunk2 = _c === void 0 ? true : _c;
  options.immutableCheck;
  options.serializableCheck;
  options.actionCreatorCheck;
  var middlewareArray = new MiddlewareArray();
  if (thunk2) {
    if (isBoolean(thunk2)) {
      middlewareArray.push(thunkMiddleware);
    } else {
      middlewareArray.push(thunkMiddleware.withExtraArgument(thunk2.extraArgument));
    }
  }
  return middlewareArray;
}
var IS_PRODUCTION = true;
function configureStore(options) {
  var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
  var _c = options || {}, _d = _c.reducer, reducer = _d === void 0 ? void 0 : _d, _e = _c.middleware, middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e, _f = _c.devTools, devTools = _f === void 0 ? true : _f, _g = _c.preloadedState, preloadedState = _g === void 0 ? void 0 : _g, _h = _c.enhancers, enhancers = _h === void 0 ? void 0 : _h;
  var rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  }
  var finalMiddleware = middleware;
  if (typeof finalMiddleware === "function") {
    finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
  }
  var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
  var finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools(__spreadValues({
      trace: !IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
  }
  var defaultEnhancers = new EnhancerArray(middlewareEnhancer);
  var storeEnhancers = defaultEnhancers;
  if (Array.isArray(enhancers)) {
    storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(defaultEnhancers);
  }
  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
  var actionsMap = {};
  var actionMatchers = [];
  var defaultCaseReducer;
  var builder = {
    addCase: function(typeOrActionCreator, reducer) {
      var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) {
        throw new Error("`builder.addCase` cannot be called with an empty action type");
      }
      if (type in actionsMap) {
        throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher: function(matcher, reducer) {
      actionMatchers.push({ matcher, reducer });
      return builder;
    },
    addDefaultCase: function(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x2) {
  return typeof x2 === "function";
}
function createReducer(initialState2, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }
  var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
  var getInitialState;
  if (isStateFunction(initialState2)) {
    getInitialState = function() {
      return freezeDraftable(initialState2());
    };
  } else {
    var frozenInitialState_1 = freezeDraftable(initialState2);
    getInitialState = function() {
      return frozenInitialState_1;
    };
  }
  function reducer(state, action) {
    if (state === void 0) {
      state = getInitialState();
    }
    var caseReducers = __spreadArray([
      actionsMap[action.type]
    ], finalActionMatchers.filter(function(_c2) {
      var matcher = _c2.matcher;
      return matcher(action);
    }).map(function(_c2) {
      var reducer2 = _c2.reducer;
      return reducer2;
    }));
    if (caseReducers.filter(function(cr) {
      return !!cr;
    }).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce(function(previousState, caseReducer) {
      if (caseReducer) {
        if (r(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!t$1(previousState)) {
          var result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return fn(previousState, function(draft2) {
            return caseReducer(draft2, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
function getType2(slice, actionKey) {
  return slice + "/" + actionKey;
}
function createSlice(options) {
  var name = options.name;
  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }
  if (typeof process !== "undefined" && false) {
    if (options.initialState === void 0) {
      console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    }
  }
  var initialState2 = typeof options.initialState == "function" ? options.initialState : freezeDraftable(options.initialState);
  var reducers = options.reducers || {};
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function(reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType2(name, reducerName);
    var caseReducer;
    var prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });
  function buildReducer() {
    var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _d = _c[0], extraReducers = _d === void 0 ? {} : _d, _e = _c[1], actionMatchers = _e === void 0 ? [] : _e, _f = _c[2], defaultCaseReducer = _f === void 0 ? void 0 : _f;
    var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
    return createReducer(initialState2, function(builder) {
      for (var key2 in finalCaseReducers) {
        builder.addCase(key2, finalCaseReducers[key2]);
      }
      for (var _i = 0, actionMatchers_1 = actionMatchers; _i < actionMatchers_1.length; _i++) {
        var m2 = actionMatchers_1[_i];
        builder.addMatcher(m2.matcher, m2.reducer);
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer);
      }
    });
  }
  var _reducer;
  return {
    name,
    reducer: function(state, action) {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,
    getInitialState: function() {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer.getInitialState();
    }
  };
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function(size) {
  if (size === void 0) {
    size = 21;
  }
  var id2 = "";
  var i2 = size;
  while (i2--) {
    id2 += urlAlphabet[Math.random() * 64 | 0];
  }
  return id2;
};
var commonProperties = [
  "name",
  "message",
  "stack",
  "code"
];
var RejectWithValue = (
  /** @class */
  function() {
    function RejectWithValue2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return RejectWithValue2;
  }()
);
var FulfillWithMeta = (
  /** @class */
  function() {
    function FulfillWithMeta2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return FulfillWithMeta2;
  }()
);
var miniSerializeError = function(value) {
  if (typeof value === "object" && value !== null) {
    var simpleError = {};
    for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
      var property = commonProperties_1[_i];
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return { message: String(value) };
};
(function() {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
      return {
        payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "fulfilled"
        })
      };
    });
    var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
      return {
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "pending"
        })
      };
    });
    var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
      return {
        payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
      };
    });
    var AC = typeof AbortController !== "undefined" ? AbortController : (
      /** @class */
      function() {
        function class_1() {
          this.signal = {
            aborted: false,
            addEventListener: function() {
            },
            dispatchEvent: function() {
              return false;
            },
            onabort: function() {
            },
            removeEventListener: function() {
            },
            reason: void 0,
            throwIfAborted: function() {
            }
          };
        }
        class_1.prototype.abort = function() {
        };
        return class_1;
      }()
    );
    function actionCreator(arg) {
      return function(dispatch, getState, extra) {
        var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        var abortController = new AC();
        var abortReason;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        var promise2 = function() {
          return __async(this, null, function() {
            var _a2, _b, finalAction, conditionResult, abortedPromise, err_1, skipDispatch;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _c.trys.push([0, 4, , 5]);
                  conditionResult = (_a2 = options == null ? void 0 : options.condition) == null ? void 0 : _a2.call(options, arg, { getState, extra });
                  if (!isThenable(conditionResult))
                    return [3, 2];
                  return [4, conditionResult];
                case 1:
                  conditionResult = _c.sent();
                  _c.label = 2;
                case 2:
                  if (conditionResult === false || abortController.signal.aborted) {
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  }
                  abortedPromise = new Promise(function(_2, reject) {
                    return abortController.signal.addEventListener("abort", function() {
                      return reject({
                        name: "AbortError",
                        message: abortReason || "Aborted"
                      });
                    });
                  });
                  dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, { requestId, arg }, { getState, extra })));
                  return [4, Promise.race([
                    abortedPromise,
                    Promise.resolve(payloadCreator(arg, {
                      dispatch,
                      getState,
                      extra,
                      requestId,
                      signal: abortController.signal,
                      abort,
                      rejectWithValue: function(value, meta) {
                        return new RejectWithValue(value, meta);
                      },
                      fulfillWithValue: function(value, meta) {
                        return new FulfillWithMeta(value, meta);
                      }
                    })).then(function(result) {
                      if (result instanceof RejectWithValue) {
                        throw result;
                      }
                      if (result instanceof FulfillWithMeta) {
                        return fulfilled(result.payload, requestId, arg, result.meta);
                      }
                      return fulfilled(result, requestId, arg);
                    })
                  ])];
                case 3:
                  finalAction = _c.sent();
                  return [3, 5];
                case 4:
                  err_1 = _c.sent();
                  finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                  return [3, 5];
                case 5:
                  skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                  if (!skipDispatch) {
                    dispatch(finalAction);
                  }
                  return [2, finalAction];
              }
            });
          });
        }();
        return Object.assign(promise2, {
          abort,
          requestId,
          arg,
          unwrap: function() {
            return promise2.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      typePrefix
    });
  }
  createAsyncThunk2.withTypes = function() {
    return createAsyncThunk2;
  };
  return createAsyncThunk2;
})();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}
var alm = "listenerMiddleware";
createAction(alm + "/add");
createAction(alm + "/removeAll");
createAction(alm + "/remove");
var promise;
typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : globalThis) : function(cb2) {
  return (promise || (promise = Promise.resolve())).then(cb2).catch(function(err) {
    return setTimeout(function() {
      throw err;
    }, 0);
  });
};
F();
const initialState$3 = {
  value: 0
};
const counterSlice = createSlice({
  name: "counter",
  initialState: initialState$3,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});
const counterReducer = counterSlice.reducer;
const initialState$2 = {
  skuPrice: 0,
  // 原始价格
  finalPrice: 0,
  // 结算金额
  beanSelected: false,
  // 京豆是否选中
  couponSelectedIndex: -1,
  // 选中的优惠券索引
  beanCount: 0,
  // 选中的京豆数量
  couponBatchId: "",
  // 选中的优惠券批次号
  phoneNo: ""
  // 手机号
};
const flowSettlementSlice = createSlice({
  name: "flowSettlement",
  initialState: initialState$2,
  reducers: {
    setSkuPrice: (state, action) => {
      state.skuPrice = action.payload;
    },
    setFinalPrice: (state, action) => {
      state.finalPrice = action.payload;
    },
    setBeanSelected: (state, action) => {
      state.beanSelected = action.payload;
    },
    setBeanCount: (state, action) => {
      state.beanCount = action.payload;
    },
    setCouponSelectedIndex: (state, action) => {
      state.couponSelectedIndex = action.payload;
    },
    setCouponBatchId: (state, action) => {
      state.couponBatchId = action.payload;
    },
    setPhoneNo: (state, action) => {
      state.phoneNo = action.payload;
    }
  }
});
const {
  setFinalPrice: setFinalPrice$1,
  setSkuPrice: setSkuPrice$1,
  setBeanSelected: setBeanSelected$1,
  setCouponSelectedIndex: setCouponSelectedIndex$1,
  setPhoneNo: setPhoneNo$1,
  setBeanCount: setBeanCount$1,
  setCouponBatchId: setCouponBatchId$1
} = flowSettlementSlice.actions;
const flowSettlementReducer = flowSettlementSlice.reducer;
const initialState$1 = {
  fillType: 0,
  // 充值类型
  skuPrice: 0,
  // 原始价格
  finalPrice: 0,
  // 结算金额
  facePrice: 0,
  // 话费面额
  venderId: "",
  // 店铺ID
  beanSelected: false,
  // 京豆是否选中
  couponSelectedIndex: -1,
  // 选中的优惠券索引
  beanCount: 0,
  // 选中的京豆数量
  couponBatchId: "",
  // 选中的优惠券批次号
  couponType: 1,
  // 1东券 2京券
  phoneNo: "",
  // 手机号
  isp: 0,
  // 运营商
  areaCode: 1
  // 省份
};
const telphoneFeeSettlementSlice = createSlice({
  name: "telphoneFeeSettlement",
  initialState: initialState$1,
  reducers: {
    setSkuPrice: (state, action) => {
      state.skuPrice = action.payload;
    },
    setFinalPrice: (state, action) => {
      state.finalPrice = action.payload;
    },
    setFacePrice: (state, action) => {
      state.facePrice = action.payload;
    },
    setVenderId: (state, action) => {
      state.venderId = action.payload;
    },
    setBeanSelected: (state, action) => {
      state.beanSelected = action.payload;
    },
    setBeanCount: (state, action) => {
      state.beanCount = action.payload;
    },
    setCouponSelectedIndex: (state, action) => {
      state.couponSelectedIndex = action.payload;
    },
    setCouponBatchId: (state, action) => {
      state.couponBatchId = action.payload;
    },
    setPhoneNo: (state, action) => {
      state.phoneNo = action.payload;
    },
    setCouponType: (state, action) => {
      state.couponType = action.payload;
    },
    setIsp: (state, action) => {
      state.isp = action.payload;
    },
    setAreaCode: (state, action) => {
      state.areaCode = action.payload;
    },
    setFillType: (state, action) => {
      state.fillType = action.payload;
    }
  }
});
const {
  setFinalPrice,
  setSkuPrice,
  setBeanSelected,
  setCouponSelectedIndex,
  setPhoneNo,
  setBeanCount,
  setCouponBatchId,
  setFacePrice,
  setCouponType,
  setVenderId,
  setIsp,
  setAreaCode,
  setFillType
} = telphoneFeeSettlementSlice.actions;
const telphoneFeeSettlementReducer = telphoneFeeSettlementSlice.reducer;
function strip(num, precision) {
  if (precision === void 0) {
    precision = 15;
  }
  return +parseFloat(Number(num).toPrecision(precision));
}
function digitLength(num) {
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
function float2Fixed(num) {
  if (num.toString().indexOf("e") === -1) {
    return Number(num.toString().replace(".", ""));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
    }
  }
}
function createOperation(operation) {
  return function() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      nums[_i] = arguments[_i];
    }
    var first = nums[0], others = nums.slice(1);
    return others.reduce(function(prev, next) {
      return operation(prev, next);
    }, first);
  };
}
var times = createOperation(function(num1, num2) {
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
});
var plus = createOperation(function(num1, num2) {
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
});
var minus = createOperation(function(num1, num2) {
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
});
var divide = createOperation(function(num1, num2) {
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
});
function round(num, decimal) {
  var base = Math.pow(10, decimal);
  var result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  return result;
}
var _boundaryCheckingState = true;
function enableBoundaryChecking(flag) {
  if (flag === void 0) {
    flag = true;
  }
  _boundaryCheckingState = flag;
}
var index = {
  strip,
  plus,
  minus,
  times,
  divide,
  round,
  digitLength,
  float2Fixed,
  enableBoundaryChecking
};
const initialState = {
  payInfo: { promotionPrice: 0, finnalPrice: 0, num: 1, perPrice: 0 },
  // 原始价格
  originDiscountInfo: { balance: 0, dxqInfos: [], unavalibdxq: [], payMode: [] },
  disCountInfo: { bean: { radioText: "暂无可用京豆", maxCount: 0, useCount: 0, select: false }, coupon: [] },
  skuDetail: {
    skuName: "",
    hyxfType: false,
    productType: 0,
    canUseJingDou: 1,
    gamePromptText: "",
    aloneSubmitFlag: "1",
    categoryId: 0,
    logo: "",
    skuPrice: 0,
    autoFeeSkus: [],
    skuId: "",
    type: 1,
    brandId: 0,
    tencentDownGrade: ""
  },
  dynamicForm: [],
  autoFeeLinkInfo: {
    promotionActivityId: -1,
    promotionText: "",
    identityPromotionPeriod: 0,
    identityPromotionPrice: 0
  },
  autoFeeProtocalCheck: false,
  // 续费协议是否选中；续费sku时和非续费关联续费时公用此变量
  autoFeeSkuSelect: false,
  // 非续费sku关联续费sku时，是否选中了续费sku
  maxBuyCount: 0,
  loading: false,
  couponPageText: {
    phoneCouponUseDesc: "1、当前列表只展示话费充值相关的优惠券;\n\n2、单笔订单只支持使用一张东券，东券与京券不可叠加;\n\n3、京券金额大于订单应付金额，差额不予退回。",
    videoCouponUseDesc: "1、当前列表只展示视频娱乐相关优惠券;\n\n2、一个订单只能使用一张优惠券;\n\n3、京券金额大于订单应付金额，差额不予退回。",
    qqRechargeCouponUseDesc: "1、当前列表只展示QQ充值相关优惠券;\n\n2、一个订单只能使用一张优惠券;\n\n3、京券金额大于订单应付金额，差额不予退回。",
    curBusCouponUseDesc: "1、当前列表只展示当前业务相关优惠券;\n\n2、一个订单只能使用一张优惠券;\n\n3、京券金额大于订单应付金额，差额不予退回。",
    gamePropsCouponUseDesc: "1、当前列表只展示游戏道具相关优惠券;\n\n2、一个订单只能使用一张优惠券;\n\n3、京券金额大于订单应付金额，差额不予退回。",
    flowCouponUseDesc: "1、当前列表只展示流量充值相关的优惠券;\n\n2、一个订单只能使用一张优惠券;\n\n3、京券金额大于订单应付金额，差额不予退回。",
    unavailableTips: "这里只有充值优惠券哦，其他优惠券请到我的-优惠券查看",
    qqCardCouponUseDesc: "1、当前列表只展示游戏点卡相关的优惠券;\n\n2、一个订单只能使用一张优惠券;\n\n3、京券金额大于订单应付金额，差额不予退回。"
  }
};
const cardSettlementSlice = createSlice({
  name: "cardSettlement",
  initialState,
  reducers: {
    setPayInfo: (state, action) => {
      state.payInfo = action.payload;
    },
    updatePayFinnal: (state, action) => {
      state.payInfo = { ...state.payInfo, finnalPrice: action.payload };
    },
    setOriginDiscountInfo: (state, action) => {
      state.originDiscountInfo = action.payload;
    },
    setDisCountInfo: (state, action) => {
      state.disCountInfo = action.payload;
    },
    setSkuDetail: (state, action) => {
      state.skuDetail = action.payload;
    },
    setDynamicForms: (state, action) => {
      state.dynamicForm = action.payload;
    },
    updateDynamicForm: (state, action) => {
      const historyDynamicForm = state.dynamicForm;
      const data = action.payload;
      const item = historyDynamicForm.find((item2) => item2.name === data.name);
      if (item) {
        item.value = data.value;
        item.uploadInfo = data.uploadInfo;
      }
      state.dynamicForm = historyDynamicForm;
    },
    setAutoFeeLinkInfo: (state, action) => {
      state.autoFeeLinkInfo = action.payload;
    },
    setAutoFeeProtocalCheck: (state, action) => {
      state.autoFeeProtocalCheck = action.payload;
    },
    setAutoFeeSkuSelect: (state, action) => {
      state.autoFeeSkuSelect = action.payload;
    },
    setMaxBuyCount: (state, action) => {
      state.maxBuyCount = action.payload;
    },
    updateSubmitBtnTxt: (state, action) => {
      state.skuDetail = { ...state.skuDetail, regularButtonText: action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateBuyCount: (state, action) => {
      state.skuDetail = { ...state.skuDetail, buyCount: action.payload };
    },
    updateSkuPrice: (state, action) => {
      const perPrice = Number(index.times(action.payload, 100));
      state.skuDetail = { ...state.skuDetail, skuPrice: perPrice };
    },
    setCouponUseNotice: (state, action) => {
      state.couponPageText = action.payload;
    }
  }
});
const {
  setPayInfo,
  updatePayFinnal,
  setOriginDiscountInfo,
  setDisCountInfo,
  setSkuDetail,
  setDynamicForms,
  updateDynamicForm,
  setAutoFeeLinkInfo,
  setAutoFeeProtocalCheck,
  setAutoFeeSkuSelect,
  setMaxBuyCount,
  updateSubmitBtnTxt,
  updateBuyCount,
  setLoading,
  updateSkuPrice,
  setCouponUseNotice
} = cardSettlementSlice.actions;
const cardSettlementSliceReducer = cardSettlementSlice.reducer;
const store = configureStore({
  reducer: {
    counter: counterReducer,
    flowSettlement: flowSettlementReducer,
    telphoneFeeSettlement: telphoneFeeSettlementReducer,
    cardSettlement: cardSettlementSliceReducer
  }
});
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(React__default.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RouterProvider, { router, fallbackElement: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "RouterProvider fallbackElement" }) }) }) }) });
};
(function() {
  /**
   * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
   *
   * @codingstandard ftlabs-jsv2
   * @copyright The Financial Times Limited [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   */
  function FastClick(layer, options) {
    var oldOnClick;
    options = options || {};
    this.trackingClick = false;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchIdentifier = 0;
    this.touchBoundary = options.touchBoundary || 10;
    this.layer = layer;
    this.tapDelay = options.tapDelay || 200;
    this.tapTimeout = options.tapTimeout || 700;
    if (FastClick.notNeeded(layer)) {
      return;
    }
    function bind(method, context2) {
      return function() {
        return method.apply(context2, arguments);
      };
    }
    var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
    var context = this;
    for (var i2 = 0, l2 = methods.length; i2 < l2; i2++) {
      context[methods[i2]] = bind(context[methods[i2]], context);
    }
    if (deviceIsAndroid) {
      layer.addEventListener("mouseover", this.onMouse, true);
      layer.addEventListener("mousedown", this.onMouse, true);
      layer.addEventListener("mouseup", this.onMouse, true);
    }
    layer.addEventListener("click", this.onClick, true);
    layer.addEventListener("touchstart", this.onTouchStart, false);
    layer.addEventListener("touchmove", this.onTouchMove, false);
    layer.addEventListener("touchend", this.onTouchEnd, false);
    layer.addEventListener("touchcancel", this.onTouchCancel, false);
    if (!Event.prototype.stopImmediatePropagation) {
      layer.removeEventListener = function(type, callback, capture) {
        var rmv = Node.prototype.removeEventListener;
        if (type === "click") {
          rmv.call(layer, type, callback.hijacked || callback, capture);
        } else {
          rmv.call(layer, type, callback, capture);
        }
      };
      layer.addEventListener = function(type, callback, capture) {
        var adv = Node.prototype.addEventListener;
        if (type === "click") {
          adv.call(
            layer,
            type,
            callback.hijacked || (callback.hijacked = function(event) {
              if (!event.propagationStopped) {
                callback(event);
              }
            }),
            capture
          );
        } else {
          adv.call(layer, type, callback, capture);
        }
      };
    }
    if (typeof layer.onclick === "function") {
      oldOnClick = layer.onclick;
      layer.addEventListener(
        "click",
        function(event) {
          oldOnClick(event);
        },
        false
      );
      layer.onclick = null;
    }
  }
  var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
  var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0 && !deviceIsWindowsPhone;
  var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
  var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
  var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);
  var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
  FastClick.prototype.needsClick = function(target) {
    switch (target.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (target.disabled) {
          return true;
        }
        break;
      case "input":
        if (deviceIsIOS && target.type === "file" || target.disabled) {
          return true;
        }
        break;
      case "label":
      case "iframe":
      case "video":
        return true;
    }
    return /\bneedsclick\b/.test(target.className);
  };
  FastClick.prototype.needsFocus = function(target) {
    switch (target.nodeName.toLowerCase()) {
      case "textarea":
        return true;
      case "select":
        return !deviceIsAndroid;
      case "input":
        switch (target.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return false;
        }
        return !target.disabled && !target.readOnly;
      default:
        return /\bneedsfocus\b/.test(target.className);
    }
  };
  FastClick.prototype.sendClick = function(targetElement, event) {
    var clickEvent, touch;
    if (document.activeElement && document.activeElement !== targetElement) {
      document.activeElement.blur();
    }
    touch = event.changedTouches[0];
    clickEvent = document.createEvent("MouseEvents");
    clickEvent.initMouseEvent(
      this.determineEventType(targetElement),
      true,
      true,
      window,
      1,
      touch.screenX,
      touch.screenY,
      touch.clientX,
      touch.clientY,
      false,
      false,
      false,
      false,
      0,
      null
    );
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
  };
  FastClick.prototype.determineEventType = function(targetElement) {
    if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
      return "mousedown";
    }
    return "click";
  };
  FastClick.prototype.focus = function(targetElement) {
    var length;
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time" && targetElement.type !== "month") {
      length = targetElement.value.length;
      targetElement.focus();
      targetElement.setSelectionRange(length, length);
    } else {
      targetElement.focus();
    }
  };
  FastClick.prototype.updateScrollParent = function(targetElement) {
    var scrollParent, parentElement;
    scrollParent = targetElement.fastClickScrollParent;
    if (!scrollParent || !scrollParent.contains(targetElement)) {
      parentElement = targetElement;
      do {
        if (parentElement.scrollHeight > parentElement.offsetHeight) {
          scrollParent = parentElement;
          targetElement.fastClickScrollParent = parentElement;
          break;
        }
        parentElement = parentElement.parentElement;
      } while (parentElement);
    }
    if (scrollParent) {
      scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
    }
  };
  FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
    if (eventTarget.nodeType === Node.TEXT_NODE) {
      return eventTarget.parentNode;
    }
    return eventTarget;
  };
  FastClick.prototype.onTouchStart = function(event) {
    var targetElement, touch, selection;
    if (event.targetTouches.length > 1) {
      return true;
    }
    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];
    if (deviceIsIOS) {
      selection = window.getSelection();
      if (selection.rangeCount && !selection.isCollapsed) {
        return true;
      }
      if (!deviceIsIOS4) {
        if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
          event.preventDefault();
          return false;
        }
        this.lastTouchIdentifier = touch.identifier;
        this.updateScrollParent(targetElement);
      }
    }
    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
      event.preventDefault();
    }
    return true;
  };
  FastClick.prototype.touchHasMoved = function(event) {
    var touch = event.changedTouches[0], boundary = this.touchBoundary;
    if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
      return true;
    }
    return false;
  };
  FastClick.prototype.onTouchMove = function(event) {
    if (!this.trackingClick) {
      return true;
    }
    if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
      this.trackingClick = false;
      this.targetElement = null;
    }
    return true;
  };
  FastClick.prototype.findControl = function(labelElement) {
    if (labelElement.control !== void 0) {
      return labelElement.control;
    }
    if (labelElement.htmlFor) {
      return document.getElementById(labelElement.htmlFor);
    }
    return labelElement.querySelector(
      "button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea"
    );
  };
  FastClick.prototype.onTouchEnd = function(event) {
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
    if (!this.trackingClick) {
      return true;
    }
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
      this.cancelNextClick = true;
      return true;
    }
    if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
      return true;
    }
    this.cancelNextClick = false;
    this.lastClickTime = event.timeStamp;
    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    if (deviceIsIOSWithBadTarget) {
      touch = event.changedTouches[0];
      targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
      targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }
    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === "label") {
      forElement = this.findControl(targetElement);
      if (forElement) {
        this.focus(targetElement);
        if (deviceIsAndroid) {
          return false;
        }
        targetElement = forElement;
      }
    } else if (this.needsFocus(targetElement)) {
      if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === "input") {
        this.targetElement = null;
        return false;
      }
      this.focus(targetElement);
      this.sendClick(targetElement, event);
      if (!deviceIsIOS || targetTagName !== "select") {
        this.targetElement = null;
        event.preventDefault();
      }
      return false;
    }
    if (deviceIsIOS && !deviceIsIOS4) {
      scrollParent = targetElement.fastClickScrollParent;
      if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
        return true;
      }
    }
    if (!this.needsClick(targetElement)) {
      event.preventDefault();
      this.sendClick(targetElement, event);
    }
    return false;
  };
  FastClick.prototype.onTouchCancel = function() {
    this.trackingClick = false;
    this.targetElement = null;
  };
  FastClick.prototype.onMouse = function(event) {
    if (!this.targetElement) {
      return true;
    }
    if (event.forwardedTouchEvent) {
      return true;
    }
    if (!event.cancelable) {
      return true;
    }
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      } else {
        event.propagationStopped = true;
      }
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
    return true;
  };
  FastClick.prototype.onClick = function(event) {
    var permitted;
    if (this.trackingClick) {
      this.targetElement = null;
      this.trackingClick = false;
      return true;
    }
    if (event.target.type === "submit" && event.detail === 0) {
      return true;
    }
    permitted = this.onMouse(event);
    if (!permitted) {
      this.targetElement = null;
    }
    return permitted;
  };
  FastClick.prototype.destroy = function() {
    var layer = this.layer;
    if (deviceIsAndroid) {
      layer.removeEventListener("mouseover", this.onMouse, true);
      layer.removeEventListener("mousedown", this.onMouse, true);
      layer.removeEventListener("mouseup", this.onMouse, true);
    }
    layer.removeEventListener("click", this.onClick, true);
    layer.removeEventListener("touchstart", this.onTouchStart, false);
    layer.removeEventListener("touchmove", this.onTouchMove, false);
    layer.removeEventListener("touchend", this.onTouchEnd, false);
    layer.removeEventListener("touchcancel", this.onTouchCancel, false);
  };
  FastClick.notNeeded = function(layer) {
    var metaViewport;
    var chromeVersion;
    var blackberryVersion;
    var firefoxVersion;
    if (typeof window.ontouchstart === "undefined") {
      return true;
    }
    chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
    if (chromeVersion) {
      if (deviceIsAndroid) {
        metaViewport = document.querySelector("meta[name=viewport]");
        if (metaViewport) {
          if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
            return true;
          }
          if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        }
      } else {
        return true;
      }
    }
    if (deviceIsBlackBerry10) {
      blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
      if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
        metaViewport = document.querySelector("meta[name=viewport]");
        if (metaViewport) {
          if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
            return true;
          }
          if (document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
          }
        }
      }
    }
    if (layer.style.msTouchAction === "none" || layer.style.touchAction === "manipulation") {
      return true;
    }
    firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
    if (firefoxVersion >= 27) {
      metaViewport = document.querySelector("meta[name=viewport]");
      if (metaViewport && (metaViewport.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
        return true;
      }
    }
    if (layer.style.touchAction === "none" || layer.style.touchAction === "manipulation") {
      return true;
    }
    return false;
  };
  FastClick.attach = function(layer, options) {
    return new FastClick(layer, options);
  };
  if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
    define(function() {
      return FastClick;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick;
  } else {
    window.FastClick = FastClick;
  }
})();
const FastClickModule = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n2) {
  return BI_RM.charAt(n2);
}
function op_and(x2, y2) {
  return x2 & y2;
}
function op_or(x2, y2) {
  return x2 | y2;
}
function op_xor(x2, y2) {
  return x2 ^ y2;
}
function op_andnot(x2, y2) {
  return x2 & ~y2;
}
function lbit(x2) {
  if (x2 == 0) {
    return -1;
  }
  var r2 = 0;
  if ((x2 & 65535) == 0) {
    x2 >>= 16;
    r2 += 16;
  }
  if ((x2 & 255) == 0) {
    x2 >>= 8;
    r2 += 8;
  }
  if ((x2 & 15) == 0) {
    x2 >>= 4;
    r2 += 4;
  }
  if ((x2 & 3) == 0) {
    x2 >>= 2;
    r2 += 2;
  }
  if ((x2 & 1) == 0) {
    ++r2;
  }
  return r2;
}
function cbit(x2) {
  var r2 = 0;
  while (x2 != 0) {
    x2 &= x2 - 1;
    ++r2;
  }
  return r2;
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h2) {
  var i2;
  var c2;
  var ret = "";
  for (i2 = 0; i2 + 3 <= h2.length; i2 += 3) {
    c2 = parseInt(h2.substring(i2, i2 + 3), 16);
    ret += b64map.charAt(c2 >> 6) + b64map.charAt(c2 & 63);
  }
  if (i2 + 1 == h2.length) {
    c2 = parseInt(h2.substring(i2, i2 + 1), 16);
    ret += b64map.charAt(c2 << 2);
  } else if (i2 + 2 == h2.length) {
    c2 = parseInt(h2.substring(i2, i2 + 2), 16);
    ret += b64map.charAt(c2 >> 2) + b64map.charAt((c2 & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
function b64tohex(s2) {
  var ret = "";
  var i2;
  var k2 = 0;
  var slop = 0;
  for (i2 = 0; i2 < s2.length; ++i2) {
    if (s2.charAt(i2) == b64pad) {
      break;
    }
    var v2 = b64map.indexOf(s2.charAt(i2));
    if (v2 < 0) {
      continue;
    }
    if (k2 == 0) {
      ret += int2char(v2 >> 2);
      slop = v2 & 3;
      k2 = 1;
    } else if (k2 == 1) {
      ret += int2char(slop << 2 | v2 >> 4);
      slop = v2 & 15;
      k2 = 2;
    } else if (k2 == 2) {
      ret += int2char(slop);
      ret += int2char(v2 >> 2);
      slop = v2 & 3;
      k2 = 3;
    } else {
      ret += int2char(slop << 2 | v2 >> 4);
      ret += int2char(v2 & 15);
      k2 = 0;
    }
  }
  if (k2 == 1) {
    ret += int2char(slop << 2);
  }
  return ret;
}
var decoder$1;
var Hex = {
  decode: function(a2) {
    var i2;
    if (decoder$1 === void 0) {
      var hex = "0123456789ABCDEF";
      var ignore = " \f\n\r	 \u2028\u2029";
      decoder$1 = {};
      for (i2 = 0; i2 < 16; ++i2) {
        decoder$1[hex.charAt(i2)] = i2;
      }
      hex = hex.toLowerCase();
      for (i2 = 10; i2 < 16; ++i2) {
        decoder$1[hex.charAt(i2)] = i2;
      }
      for (i2 = 0; i2 < ignore.length; ++i2) {
        decoder$1[ignore.charAt(i2)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i2 = 0; i2 < a2.length; ++i2) {
      var c2 = a2.charAt(i2);
      if (c2 == "=") {
        break;
      }
      c2 = decoder$1[c2];
      if (c2 == -1) {
        continue;
      }
      if (c2 === void 0) {
        throw new Error("Illegal character at offset " + i2);
      }
      bits |= c2;
      if (++char_count >= 2) {
        out[out.length] = bits;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 4;
      }
    }
    if (char_count) {
      throw new Error("Hex encoding incomplete: 4 bits missing");
    }
    return out;
  }
};
var decoder;
var Base64 = {
  decode: function(a2) {
    var i2;
    if (decoder === void 0) {
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var ignore = "= \f\n\r	 \u2028\u2029";
      decoder = /* @__PURE__ */ Object.create(null);
      for (i2 = 0; i2 < 64; ++i2) {
        decoder[b64.charAt(i2)] = i2;
      }
      decoder["-"] = 62;
      decoder["_"] = 63;
      for (i2 = 0; i2 < ignore.length; ++i2) {
        decoder[ignore.charAt(i2)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i2 = 0; i2 < a2.length; ++i2) {
      var c2 = a2.charAt(i2);
      if (c2 == "=") {
        break;
      }
      c2 = decoder[c2];
      if (c2 == -1) {
        continue;
      }
      if (c2 === void 0) {
        throw new Error("Illegal character at offset " + i2);
      }
      bits |= c2;
      if (++char_count >= 4) {
        out[out.length] = bits >> 16;
        out[out.length] = bits >> 8 & 255;
        out[out.length] = bits & 255;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 6;
      }
    }
    switch (char_count) {
      case 1:
        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
      case 2:
        out[out.length] = bits >> 10;
        break;
      case 3:
        out[out.length] = bits >> 16;
        out[out.length] = bits >> 8 & 255;
        break;
    }
    return out;
  },
  re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
  unarmor: function(a2) {
    var m2 = Base64.re.exec(a2);
    if (m2) {
      if (m2[1]) {
        a2 = m2[1];
      } else if (m2[2]) {
        a2 = m2[2];
      } else {
        throw new Error("RegExp out of sync");
      }
    }
    return Base64.decode(a2);
  }
};
var max = 1e13;
var Int10 = (
  /** @class */
  function() {
    function Int102(value) {
      this.buf = [+value || 0];
    }
    Int102.prototype.mulAdd = function(m2, c2) {
      var b2 = this.buf;
      var l2 = b2.length;
      var i2;
      var t;
      for (i2 = 0; i2 < l2; ++i2) {
        t = b2[i2] * m2 + c2;
        if (t < max) {
          c2 = 0;
        } else {
          c2 = 0 | t / max;
          t -= c2 * max;
        }
        b2[i2] = t;
      }
      if (c2 > 0) {
        b2[i2] = c2;
      }
    };
    Int102.prototype.sub = function(c2) {
      var b2 = this.buf;
      var l2 = b2.length;
      var i2;
      var t;
      for (i2 = 0; i2 < l2; ++i2) {
        t = b2[i2] - c2;
        if (t < 0) {
          t += max;
          c2 = 1;
        } else {
          c2 = 0;
        }
        b2[i2] = t;
      }
      while (b2[b2.length - 1] === 0) {
        b2.pop();
      }
    };
    Int102.prototype.toString = function(base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }
      var b2 = this.buf;
      var s2 = b2[b2.length - 1].toString();
      for (var i2 = b2.length - 2; i2 >= 0; --i2) {
        s2 += (max + b2[i2]).toString().substring(1);
      }
      return s2;
    };
    Int102.prototype.valueOf = function() {
      var b2 = this.buf;
      var v2 = 0;
      for (var i2 = b2.length - 1; i2 >= 0; --i2) {
        v2 = v2 * max + b2[i2];
      }
      return v2;
    };
    Int102.prototype.simplify = function() {
      var b2 = this.buf;
      return b2.length == 1 ? b2[0] : this;
    };
    return Int102;
  }()
);
var ellipsis = "…";
var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function stringCut(str, len) {
  if (str.length > len) {
    str = str.substring(0, len) + ellipsis;
  }
  return str;
}
var Stream = (
  /** @class */
  function() {
    function Stream2(enc, pos) {
      this.hexDigits = "0123456789ABCDEF";
      if (enc instanceof Stream2) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else {
        this.enc = enc;
        this.pos = pos;
      }
    }
    Stream2.prototype.get = function(pos) {
      if (pos === void 0) {
        pos = this.pos++;
      }
      if (pos >= this.enc.length) {
        throw new Error("Requesting byte offset ".concat(pos, " on a stream of length ").concat(this.enc.length));
      }
      return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
    };
    Stream2.prototype.hexByte = function(b2) {
      return this.hexDigits.charAt(b2 >> 4 & 15) + this.hexDigits.charAt(b2 & 15);
    };
    Stream2.prototype.hexDump = function(start, end, raw) {
      var s2 = "";
      for (var i2 = start; i2 < end; ++i2) {
        s2 += this.hexByte(this.get(i2));
        if (raw !== true) {
          switch (i2 & 15) {
            case 7:
              s2 += "  ";
              break;
            case 15:
              s2 += "\n";
              break;
            default:
              s2 += " ";
          }
        }
      }
      return s2;
    };
    Stream2.prototype.isASCII = function(start, end) {
      for (var i2 = start; i2 < end; ++i2) {
        var c2 = this.get(i2);
        if (c2 < 32 || c2 > 176) {
          return false;
        }
      }
      return true;
    };
    Stream2.prototype.parseStringISO = function(start, end) {
      var s2 = "";
      for (var i2 = start; i2 < end; ++i2) {
        s2 += String.fromCharCode(this.get(i2));
      }
      return s2;
    };
    Stream2.prototype.parseStringUTF = function(start, end) {
      var s2 = "";
      for (var i2 = start; i2 < end; ) {
        var c2 = this.get(i2++);
        if (c2 < 128) {
          s2 += String.fromCharCode(c2);
        } else if (c2 > 191 && c2 < 224) {
          s2 += String.fromCharCode((c2 & 31) << 6 | this.get(i2++) & 63);
        } else {
          s2 += String.fromCharCode((c2 & 15) << 12 | (this.get(i2++) & 63) << 6 | this.get(i2++) & 63);
        }
      }
      return s2;
    };
    Stream2.prototype.parseStringBMP = function(start, end) {
      var str = "";
      var hi2;
      var lo;
      for (var i2 = start; i2 < end; ) {
        hi2 = this.get(i2++);
        lo = this.get(i2++);
        str += String.fromCharCode(hi2 << 8 | lo);
      }
      return str;
    };
    Stream2.prototype.parseTime = function(start, end, shortYear) {
      var s2 = this.parseStringISO(start, end);
      var m2 = (shortYear ? reTimeS : reTimeL).exec(s2);
      if (!m2) {
        return "Unrecognized time: " + s2;
      }
      if (shortYear) {
        m2[1] = +m2[1];
        m2[1] += +m2[1] < 70 ? 2e3 : 1900;
      }
      s2 = m2[1] + "-" + m2[2] + "-" + m2[3] + " " + m2[4];
      if (m2[5]) {
        s2 += ":" + m2[5];
        if (m2[6]) {
          s2 += ":" + m2[6];
          if (m2[7]) {
            s2 += "." + m2[7];
          }
        }
      }
      if (m2[8]) {
        s2 += " UTC";
        if (m2[8] != "Z") {
          s2 += m2[8];
          if (m2[9]) {
            s2 += ":" + m2[9];
          }
        }
      }
      return s2;
    };
    Stream2.prototype.parseInteger = function(start, end) {
      var v2 = this.get(start);
      var neg = v2 > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s2 = "";
      while (v2 == pad && ++start < end) {
        v2 = this.get(start);
      }
      len = end - start;
      if (len === 0) {
        return neg ? -1 : 0;
      }
      if (len > 4) {
        s2 = v2;
        len <<= 3;
        while (((+s2 ^ pad) & 128) == 0) {
          s2 = +s2 << 1;
          --len;
        }
        s2 = "(" + len + " bit)\n";
      }
      if (neg) {
        v2 = v2 - 256;
      }
      var n2 = new Int10(v2);
      for (var i2 = start + 1; i2 < end; ++i2) {
        n2.mulAdd(256, this.get(i2));
      }
      return s2 + n2.toString();
    };
    Stream2.prototype.parseBitString = function(start, end, maxLength) {
      var unusedBit = this.get(start);
      var lenBit = (end - start - 1 << 3) - unusedBit;
      var intro = "(" + lenBit + " bit)\n";
      var s2 = "";
      for (var i2 = start + 1; i2 < end; ++i2) {
        var b2 = this.get(i2);
        var skip = i2 == end - 1 ? unusedBit : 0;
        for (var j2 = 7; j2 >= skip; --j2) {
          s2 += b2 >> j2 & 1 ? "1" : "0";
        }
        if (s2.length > maxLength) {
          return intro + stringCut(s2, maxLength);
        }
      }
      return intro + s2;
    };
    Stream2.prototype.parseOctetString = function(start, end, maxLength) {
      if (this.isASCII(start, end)) {
        return stringCut(this.parseStringISO(start, end), maxLength);
      }
      var len = end - start;
      var s2 = "(" + len + " byte)\n";
      maxLength /= 2;
      if (len > maxLength) {
        end = start + maxLength;
      }
      for (var i2 = start; i2 < end; ++i2) {
        s2 += this.hexByte(this.get(i2));
      }
      if (len > maxLength) {
        s2 += ellipsis;
      }
      return s2;
    };
    Stream2.prototype.parseOID = function(start, end, maxLength) {
      var s2 = "";
      var n2 = new Int10();
      var bits = 0;
      for (var i2 = start; i2 < end; ++i2) {
        var v2 = this.get(i2);
        n2.mulAdd(128, v2 & 127);
        bits += 7;
        if (!(v2 & 128)) {
          if (s2 === "") {
            n2 = n2.simplify();
            if (n2 instanceof Int10) {
              n2.sub(80);
              s2 = "2." + n2.toString();
            } else {
              var m2 = n2 < 80 ? n2 < 40 ? 0 : 1 : 2;
              s2 = m2 + "." + (n2 - m2 * 40);
            }
          } else {
            s2 += "." + n2.toString();
          }
          if (s2.length > maxLength) {
            return stringCut(s2, maxLength);
          }
          n2 = new Int10();
          bits = 0;
        }
      }
      if (bits > 0) {
        s2 += ".incomplete";
      }
      return s2;
    };
    return Stream2;
  }()
);
var ASN1 = (
  /** @class */
  function() {
    function ASN12(stream, header, length, tag, sub) {
      if (!(tag instanceof ASN1Tag)) {
        throw new Error("Invalid tag value.");
      }
      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }
    ASN12.prototype.typeName = function() {
      switch (this.tag.tagClass) {
        case 0:
          switch (this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            case 20:
              return "TeletexString";
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString";
          }
          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
          return "Private_" + this.tag.tagNumber.toString();
      }
    };
    ASN12.prototype.content = function(maxLength) {
      if (this.tag === void 0) {
        return null;
      }
      if (maxLength === void 0) {
        maxLength = Infinity;
      }
      var content = this.posContent();
      var len = Math.abs(this.length);
      if (!this.tag.isUniversal()) {
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        }
        return this.stream.parseOctetString(content, content + len, maxLength);
      }
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(content) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(content, content + len);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
        case 6:
          return this.stream.parseOID(content, content + len, maxLength);
        case 16:
        case 17:
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          } else {
            return "(no elem)";
          }
        case 12:
          return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
          return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
        case 30:
          return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
        case 23:
        case 24:
          return this.stream.parseTime(content, content + len, this.tag.tagNumber == 23);
      }
      return null;
    };
    ASN12.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    };
    ASN12.prototype.toPrettyString = function(indent) {
      if (indent === void 0) {
        indent = "";
      }
      var s2 = indent + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0) {
        s2 += "+";
      }
      s2 += this.length;
      if (this.tag.tagConstructed) {
        s2 += " (constructed)";
      } else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null) {
        s2 += " (encapsulates)";
      }
      s2 += "\n";
      if (this.sub !== null) {
        indent += "  ";
        for (var i2 = 0, max2 = this.sub.length; i2 < max2; ++i2) {
          s2 += this.sub[i2].toPrettyString(indent);
        }
      }
      return s2;
    };
    ASN12.prototype.posStart = function() {
      return this.stream.pos;
    };
    ASN12.prototype.posContent = function() {
      return this.stream.pos + this.header;
    };
    ASN12.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    ASN12.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };
    ASN12.decodeLength = function(stream) {
      var buf = stream.get();
      var len = buf & 127;
      if (len == buf) {
        return len;
      }
      if (len > 6) {
        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
      }
      if (len === 0) {
        return null;
      }
      buf = 0;
      for (var i2 = 0; i2 < len; ++i2) {
        buf = buf * 256 + stream.get();
      }
      return buf;
    };
    ASN12.prototype.getHexStringValue = function() {
      var hexString = this.toHexString();
      var offset = this.header * 2;
      var length = this.length * 2;
      return hexString.substr(offset, length);
    };
    ASN12.decode = function(str) {
      var stream;
      if (!(str instanceof Stream)) {
        stream = new Stream(str, 0);
      } else {
        stream = str;
      }
      var streamStart = new Stream(stream);
      var tag = new ASN1Tag(stream);
      var len = ASN12.decodeLength(stream);
      var start = stream.pos;
      var header = start - streamStart.pos;
      var sub = null;
      var getSub = function() {
        var ret = [];
        if (len !== null) {
          var end = start + len;
          while (stream.pos < end) {
            ret[ret.length] = ASN12.decode(stream);
          }
          if (stream.pos != end) {
            throw new Error("Content size is not correct for container starting at offset " + start);
          }
        } else {
          try {
            for (; ; ) {
              var s2 = ASN12.decode(stream);
              if (s2.tag.isEOC()) {
                break;
              }
              ret[ret.length] = s2;
            }
            len = start - stream.pos;
          } catch (e2) {
            throw new Error("Exception while decoding undefined length content: " + e2);
          }
        }
        return ret;
      };
      if (tag.tagConstructed) {
        sub = getSub();
      } else if (tag.isUniversal() && (tag.tagNumber == 3 || tag.tagNumber == 4)) {
        try {
          if (tag.tagNumber == 3) {
            if (stream.get() != 0) {
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
          }
          sub = getSub();
          for (var i2 = 0; i2 < sub.length; ++i2) {
            if (sub[i2].tag.isEOC()) {
              throw new Error("EOC is not supposed to be actual content.");
            }
          }
        } catch (e2) {
          sub = null;
        }
      }
      if (sub === null) {
        if (len === null) {
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
        }
        stream.pos = start + Math.abs(len);
      }
      return new ASN12(streamStart, header, len, tag, sub);
    };
    return ASN12;
  }()
);
var ASN1Tag = (
  /** @class */
  function() {
    function ASN1Tag2(stream) {
      var buf = stream.get();
      this.tagClass = buf >> 6;
      this.tagConstructed = (buf & 32) !== 0;
      this.tagNumber = buf & 31;
      if (this.tagNumber == 31) {
        var n2 = new Int10();
        do {
          buf = stream.get();
          n2.mulAdd(128, buf & 127);
        } while (buf & 128);
        this.tagNumber = n2.simplify();
      }
    }
    ASN1Tag2.prototype.isUniversal = function() {
      return this.tagClass === 0;
    };
    ASN1Tag2.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0;
    };
    return ASN1Tag2;
  }()
);
var dbits;
var canary = 244837814094590;
var j_lm = (canary & 16777215) == 15715070;
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
var BigInteger = (
  /** @class */
  function() {
    function BigInteger2(a2, b2, c2) {
      if (a2 != null) {
        if ("number" == typeof a2) {
          this.fromNumber(a2, b2, c2);
        } else if (b2 == null && "string" != typeof a2) {
          this.fromString(a2, 256);
        } else {
          this.fromString(a2, b2);
        }
      }
    }
    BigInteger2.prototype.toString = function(b2) {
      if (this.s < 0) {
        return "-" + this.negate().toString(b2);
      }
      var k2;
      if (b2 == 16) {
        k2 = 4;
      } else if (b2 == 8) {
        k2 = 3;
      } else if (b2 == 2) {
        k2 = 1;
      } else if (b2 == 32) {
        k2 = 5;
      } else if (b2 == 4) {
        k2 = 2;
      } else {
        return this.toRadix(b2);
      }
      var km = (1 << k2) - 1;
      var d2;
      var m2 = false;
      var r2 = "";
      var i2 = this.t;
      var p2 = this.DB - i2 * this.DB % k2;
      if (i2-- > 0) {
        if (p2 < this.DB && (d2 = this[i2] >> p2) > 0) {
          m2 = true;
          r2 = int2char(d2);
        }
        while (i2 >= 0) {
          if (p2 < k2) {
            d2 = (this[i2] & (1 << p2) - 1) << k2 - p2;
            d2 |= this[--i2] >> (p2 += this.DB - k2);
          } else {
            d2 = this[i2] >> (p2 -= k2) & km;
            if (p2 <= 0) {
              p2 += this.DB;
              --i2;
            }
          }
          if (d2 > 0) {
            m2 = true;
          }
          if (m2) {
            r2 += int2char(d2);
          }
        }
      }
      return m2 ? r2 : "0";
    };
    BigInteger2.prototype.negate = function() {
      var r2 = nbi();
      BigInteger2.ZERO.subTo(this, r2);
      return r2;
    };
    BigInteger2.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this;
    };
    BigInteger2.prototype.compareTo = function(a2) {
      var r2 = this.s - a2.s;
      if (r2 != 0) {
        return r2;
      }
      var i2 = this.t;
      r2 = i2 - a2.t;
      if (r2 != 0) {
        return this.s < 0 ? -r2 : r2;
      }
      while (--i2 >= 0) {
        if ((r2 = this[i2] - a2[i2]) != 0) {
          return r2;
        }
      }
      return 0;
    };
    BigInteger2.prototype.bitLength = function() {
      if (this.t <= 0) {
        return 0;
      }
      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    };
    BigInteger2.prototype.mod = function(a2) {
      var r2 = nbi();
      this.abs().divRemTo(a2, null, r2);
      if (this.s < 0 && r2.compareTo(BigInteger2.ZERO) > 0) {
        a2.subTo(r2, r2);
      }
      return r2;
    };
    BigInteger2.prototype.modPowInt = function(e2, m2) {
      var z;
      if (e2 < 256 || m2.isEven()) {
        z = new Classic(m2);
      } else {
        z = new Montgomery(m2);
      }
      return this.exp(e2, z);
    };
    BigInteger2.prototype.clone = function() {
      var r2 = nbi();
      this.copyTo(r2);
      return r2;
    };
    BigInteger2.prototype.intValue = function() {
      if (this.s < 0) {
        if (this.t == 1) {
          return this[0] - this.DV;
        } else if (this.t == 0) {
          return -1;
        }
      } else if (this.t == 1) {
        return this[0];
      } else if (this.t == 0) {
        return 0;
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    BigInteger2.prototype.byteValue = function() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    };
    BigInteger2.prototype.shortValue = function() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    };
    BigInteger2.prototype.signum = function() {
      if (this.s < 0) {
        return -1;
      } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
        return 0;
      } else {
        return 1;
      }
    };
    BigInteger2.prototype.toByteArray = function() {
      var i2 = this.t;
      var r2 = [];
      r2[0] = this.s;
      var p2 = this.DB - i2 * this.DB % 8;
      var d2;
      var k2 = 0;
      if (i2-- > 0) {
        if (p2 < this.DB && (d2 = this[i2] >> p2) != (this.s & this.DM) >> p2) {
          r2[k2++] = d2 | this.s << this.DB - p2;
        }
        while (i2 >= 0) {
          if (p2 < 8) {
            d2 = (this[i2] & (1 << p2) - 1) << 8 - p2;
            d2 |= this[--i2] >> (p2 += this.DB - 8);
          } else {
            d2 = this[i2] >> (p2 -= 8) & 255;
            if (p2 <= 0) {
              p2 += this.DB;
              --i2;
            }
          }
          if ((d2 & 128) != 0) {
            d2 |= -256;
          }
          if (k2 == 0 && (this.s & 128) != (d2 & 128)) {
            ++k2;
          }
          if (k2 > 0 || d2 != this.s) {
            r2[k2++] = d2;
          }
        }
      }
      return r2;
    };
    BigInteger2.prototype.equals = function(a2) {
      return this.compareTo(a2) == 0;
    };
    BigInteger2.prototype.min = function(a2) {
      return this.compareTo(a2) < 0 ? this : a2;
    };
    BigInteger2.prototype.max = function(a2) {
      return this.compareTo(a2) > 0 ? this : a2;
    };
    BigInteger2.prototype.and = function(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_and, r2);
      return r2;
    };
    BigInteger2.prototype.or = function(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_or, r2);
      return r2;
    };
    BigInteger2.prototype.xor = function(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_xor, r2);
      return r2;
    };
    BigInteger2.prototype.andNot = function(a2) {
      var r2 = nbi();
      this.bitwiseTo(a2, op_andnot, r2);
      return r2;
    };
    BigInteger2.prototype.not = function() {
      var r2 = nbi();
      for (var i2 = 0; i2 < this.t; ++i2) {
        r2[i2] = this.DM & ~this[i2];
      }
      r2.t = this.t;
      r2.s = ~this.s;
      return r2;
    };
    BigInteger2.prototype.shiftLeft = function(n2) {
      var r2 = nbi();
      if (n2 < 0) {
        this.rShiftTo(-n2, r2);
      } else {
        this.lShiftTo(n2, r2);
      }
      return r2;
    };
    BigInteger2.prototype.shiftRight = function(n2) {
      var r2 = nbi();
      if (n2 < 0) {
        this.lShiftTo(-n2, r2);
      } else {
        this.rShiftTo(n2, r2);
      }
      return r2;
    };
    BigInteger2.prototype.getLowestSetBit = function() {
      for (var i2 = 0; i2 < this.t; ++i2) {
        if (this[i2] != 0) {
          return i2 * this.DB + lbit(this[i2]);
        }
      }
      if (this.s < 0) {
        return this.t * this.DB;
      }
      return -1;
    };
    BigInteger2.prototype.bitCount = function() {
      var r2 = 0;
      var x2 = this.s & this.DM;
      for (var i2 = 0; i2 < this.t; ++i2) {
        r2 += cbit(this[i2] ^ x2);
      }
      return r2;
    };
    BigInteger2.prototype.testBit = function(n2) {
      var j2 = Math.floor(n2 / this.DB);
      if (j2 >= this.t) {
        return this.s != 0;
      }
      return (this[j2] & 1 << n2 % this.DB) != 0;
    };
    BigInteger2.prototype.setBit = function(n2) {
      return this.changeBit(n2, op_or);
    };
    BigInteger2.prototype.clearBit = function(n2) {
      return this.changeBit(n2, op_andnot);
    };
    BigInteger2.prototype.flipBit = function(n2) {
      return this.changeBit(n2, op_xor);
    };
    BigInteger2.prototype.add = function(a2) {
      var r2 = nbi();
      this.addTo(a2, r2);
      return r2;
    };
    BigInteger2.prototype.subtract = function(a2) {
      var r2 = nbi();
      this.subTo(a2, r2);
      return r2;
    };
    BigInteger2.prototype.multiply = function(a2) {
      var r2 = nbi();
      this.multiplyTo(a2, r2);
      return r2;
    };
    BigInteger2.prototype.divide = function(a2) {
      var r2 = nbi();
      this.divRemTo(a2, r2, null);
      return r2;
    };
    BigInteger2.prototype.remainder = function(a2) {
      var r2 = nbi();
      this.divRemTo(a2, null, r2);
      return r2;
    };
    BigInteger2.prototype.divideAndRemainder = function(a2) {
      var q2 = nbi();
      var r2 = nbi();
      this.divRemTo(a2, q2, r2);
      return [q2, r2];
    };
    BigInteger2.prototype.modPow = function(e2, m2) {
      var i2 = e2.bitLength();
      var k2;
      var r2 = nbv(1);
      var z;
      if (i2 <= 0) {
        return r2;
      } else if (i2 < 18) {
        k2 = 1;
      } else if (i2 < 48) {
        k2 = 3;
      } else if (i2 < 144) {
        k2 = 4;
      } else if (i2 < 768) {
        k2 = 5;
      } else {
        k2 = 6;
      }
      if (i2 < 8) {
        z = new Classic(m2);
      } else if (m2.isEven()) {
        z = new Barrett(m2);
      } else {
        z = new Montgomery(m2);
      }
      var g2 = [];
      var n2 = 3;
      var k1 = k2 - 1;
      var km = (1 << k2) - 1;
      g2[1] = z.convert(this);
      if (k2 > 1) {
        var g22 = nbi();
        z.sqrTo(g2[1], g22);
        while (n2 <= km) {
          g2[n2] = nbi();
          z.mulTo(g22, g2[n2 - 2], g2[n2]);
          n2 += 2;
        }
      }
      var j2 = e2.t - 1;
      var w2;
      var is1 = true;
      var r22 = nbi();
      var t;
      i2 = nbits(e2[j2]) - 1;
      while (j2 >= 0) {
        if (i2 >= k1) {
          w2 = e2[j2] >> i2 - k1 & km;
        } else {
          w2 = (e2[j2] & (1 << i2 + 1) - 1) << k1 - i2;
          if (j2 > 0) {
            w2 |= e2[j2 - 1] >> this.DB + i2 - k1;
          }
        }
        n2 = k2;
        while ((w2 & 1) == 0) {
          w2 >>= 1;
          --n2;
        }
        if ((i2 -= n2) < 0) {
          i2 += this.DB;
          --j2;
        }
        if (is1) {
          g2[w2].copyTo(r2);
          is1 = false;
        } else {
          while (n2 > 1) {
            z.sqrTo(r2, r22);
            z.sqrTo(r22, r2);
            n2 -= 2;
          }
          if (n2 > 0) {
            z.sqrTo(r2, r22);
          } else {
            t = r2;
            r2 = r22;
            r22 = t;
          }
          z.mulTo(r22, g2[w2], r2);
        }
        while (j2 >= 0 && (e2[j2] & 1 << i2) == 0) {
          z.sqrTo(r2, r22);
          t = r2;
          r2 = r22;
          r22 = t;
          if (--i2 < 0) {
            i2 = this.DB - 1;
            --j2;
          }
        }
      }
      return z.revert(r2);
    };
    BigInteger2.prototype.modInverse = function(m2) {
      var ac2 = m2.isEven();
      if (this.isEven() && ac2 || m2.signum() == 0) {
        return BigInteger2.ZERO;
      }
      var u2 = m2.clone();
      var v2 = this.clone();
      var a2 = nbv(1);
      var b2 = nbv(0);
      var c2 = nbv(0);
      var d2 = nbv(1);
      while (u2.signum() != 0) {
        while (u2.isEven()) {
          u2.rShiftTo(1, u2);
          if (ac2) {
            if (!a2.isEven() || !b2.isEven()) {
              a2.addTo(this, a2);
              b2.subTo(m2, b2);
            }
            a2.rShiftTo(1, a2);
          } else if (!b2.isEven()) {
            b2.subTo(m2, b2);
          }
          b2.rShiftTo(1, b2);
        }
        while (v2.isEven()) {
          v2.rShiftTo(1, v2);
          if (ac2) {
            if (!c2.isEven() || !d2.isEven()) {
              c2.addTo(this, c2);
              d2.subTo(m2, d2);
            }
            c2.rShiftTo(1, c2);
          } else if (!d2.isEven()) {
            d2.subTo(m2, d2);
          }
          d2.rShiftTo(1, d2);
        }
        if (u2.compareTo(v2) >= 0) {
          u2.subTo(v2, u2);
          if (ac2) {
            a2.subTo(c2, a2);
          }
          b2.subTo(d2, b2);
        } else {
          v2.subTo(u2, v2);
          if (ac2) {
            c2.subTo(a2, c2);
          }
          d2.subTo(b2, d2);
        }
      }
      if (v2.compareTo(BigInteger2.ONE) != 0) {
        return BigInteger2.ZERO;
      }
      if (d2.compareTo(m2) >= 0) {
        return d2.subtract(m2);
      }
      if (d2.signum() < 0) {
        d2.addTo(m2, d2);
      } else {
        return d2;
      }
      if (d2.signum() < 0) {
        return d2.add(m2);
      } else {
        return d2;
      }
    };
    BigInteger2.prototype.pow = function(e2) {
      return this.exp(e2, new NullExp());
    };
    BigInteger2.prototype.gcd = function(a2) {
      var x2 = this.s < 0 ? this.negate() : this.clone();
      var y2 = a2.s < 0 ? a2.negate() : a2.clone();
      if (x2.compareTo(y2) < 0) {
        var t = x2;
        x2 = y2;
        y2 = t;
      }
      var i2 = x2.getLowestSetBit();
      var g2 = y2.getLowestSetBit();
      if (g2 < 0) {
        return x2;
      }
      if (i2 < g2) {
        g2 = i2;
      }
      if (g2 > 0) {
        x2.rShiftTo(g2, x2);
        y2.rShiftTo(g2, y2);
      }
      while (x2.signum() > 0) {
        if ((i2 = x2.getLowestSetBit()) > 0) {
          x2.rShiftTo(i2, x2);
        }
        if ((i2 = y2.getLowestSetBit()) > 0) {
          y2.rShiftTo(i2, y2);
        }
        if (x2.compareTo(y2) >= 0) {
          x2.subTo(y2, x2);
          x2.rShiftTo(1, x2);
        } else {
          y2.subTo(x2, y2);
          y2.rShiftTo(1, y2);
        }
      }
      if (g2 > 0) {
        y2.lShiftTo(g2, y2);
      }
      return y2;
    };
    BigInteger2.prototype.isProbablePrime = function(t) {
      var i2;
      var x2 = this.abs();
      if (x2.t == 1 && x2[0] <= lowprimes[lowprimes.length - 1]) {
        for (i2 = 0; i2 < lowprimes.length; ++i2) {
          if (x2[0] == lowprimes[i2]) {
            return true;
          }
        }
        return false;
      }
      if (x2.isEven()) {
        return false;
      }
      i2 = 1;
      while (i2 < lowprimes.length) {
        var m2 = lowprimes[i2];
        var j2 = i2 + 1;
        while (j2 < lowprimes.length && m2 < lplim) {
          m2 *= lowprimes[j2++];
        }
        m2 = x2.modInt(m2);
        while (i2 < j2) {
          if (m2 % lowprimes[i2++] == 0) {
            return false;
          }
        }
      }
      return x2.millerRabin(t);
    };
    BigInteger2.prototype.copyTo = function(r2) {
      for (var i2 = this.t - 1; i2 >= 0; --i2) {
        r2[i2] = this[i2];
      }
      r2.t = this.t;
      r2.s = this.s;
    };
    BigInteger2.prototype.fromInt = function(x2) {
      this.t = 1;
      this.s = x2 < 0 ? -1 : 0;
      if (x2 > 0) {
        this[0] = x2;
      } else if (x2 < -1) {
        this[0] = x2 + this.DV;
      } else {
        this.t = 0;
      }
    };
    BigInteger2.prototype.fromString = function(s2, b2) {
      var k2;
      if (b2 == 16) {
        k2 = 4;
      } else if (b2 == 8) {
        k2 = 3;
      } else if (b2 == 256) {
        k2 = 8;
      } else if (b2 == 2) {
        k2 = 1;
      } else if (b2 == 32) {
        k2 = 5;
      } else if (b2 == 4) {
        k2 = 2;
      } else {
        this.fromRadix(s2, b2);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i2 = s2.length;
      var mi2 = false;
      var sh2 = 0;
      while (--i2 >= 0) {
        var x2 = k2 == 8 ? +s2[i2] & 255 : intAt(s2, i2);
        if (x2 < 0) {
          if (s2.charAt(i2) == "-") {
            mi2 = true;
          }
          continue;
        }
        mi2 = false;
        if (sh2 == 0) {
          this[this.t++] = x2;
        } else if (sh2 + k2 > this.DB) {
          this[this.t - 1] |= (x2 & (1 << this.DB - sh2) - 1) << sh2;
          this[this.t++] = x2 >> this.DB - sh2;
        } else {
          this[this.t - 1] |= x2 << sh2;
        }
        sh2 += k2;
        if (sh2 >= this.DB) {
          sh2 -= this.DB;
        }
      }
      if (k2 == 8 && (+s2[0] & 128) != 0) {
        this.s = -1;
        if (sh2 > 0) {
          this[this.t - 1] |= (1 << this.DB - sh2) - 1 << sh2;
        }
      }
      this.clamp();
      if (mi2) {
        BigInteger2.ZERO.subTo(this, this);
      }
    };
    BigInteger2.prototype.clamp = function() {
      var c2 = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c2) {
        --this.t;
      }
    };
    BigInteger2.prototype.dlShiftTo = function(n2, r2) {
      var i2;
      for (i2 = this.t - 1; i2 >= 0; --i2) {
        r2[i2 + n2] = this[i2];
      }
      for (i2 = n2 - 1; i2 >= 0; --i2) {
        r2[i2] = 0;
      }
      r2.t = this.t + n2;
      r2.s = this.s;
    };
    BigInteger2.prototype.drShiftTo = function(n2, r2) {
      for (var i2 = n2; i2 < this.t; ++i2) {
        r2[i2 - n2] = this[i2];
      }
      r2.t = Math.max(this.t - n2, 0);
      r2.s = this.s;
    };
    BigInteger2.prototype.lShiftTo = function(n2, r2) {
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n2 / this.DB);
      var c2 = this.s << bs & this.DM;
      for (var i2 = this.t - 1; i2 >= 0; --i2) {
        r2[i2 + ds + 1] = this[i2] >> cbs | c2;
        c2 = (this[i2] & bm) << bs;
      }
      for (var i2 = ds - 1; i2 >= 0; --i2) {
        r2[i2] = 0;
      }
      r2[ds] = c2;
      r2.t = this.t + ds + 1;
      r2.s = this.s;
      r2.clamp();
    };
    BigInteger2.prototype.rShiftTo = function(n2, r2) {
      r2.s = this.s;
      var ds = Math.floor(n2 / this.DB);
      if (ds >= this.t) {
        r2.t = 0;
        return;
      }
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r2[0] = this[ds] >> bs;
      for (var i2 = ds + 1; i2 < this.t; ++i2) {
        r2[i2 - ds - 1] |= (this[i2] & bm) << cbs;
        r2[i2 - ds] = this[i2] >> bs;
      }
      if (bs > 0) {
        r2[this.t - ds - 1] |= (this.s & bm) << cbs;
      }
      r2.t = this.t - ds;
      r2.clamp();
    };
    BigInteger2.prototype.subTo = function(a2, r2) {
      var i2 = 0;
      var c2 = 0;
      var m2 = Math.min(a2.t, this.t);
      while (i2 < m2) {
        c2 += this[i2] - a2[i2];
        r2[i2++] = c2 & this.DM;
        c2 >>= this.DB;
      }
      if (a2.t < this.t) {
        c2 -= a2.s;
        while (i2 < this.t) {
          c2 += this[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 += this.s;
      } else {
        c2 += this.s;
        while (i2 < a2.t) {
          c2 -= a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 -= a2.s;
      }
      r2.s = c2 < 0 ? -1 : 0;
      if (c2 < -1) {
        r2[i2++] = this.DV + c2;
      } else if (c2 > 0) {
        r2[i2++] = c2;
      }
      r2.t = i2;
      r2.clamp();
    };
    BigInteger2.prototype.multiplyTo = function(a2, r2) {
      var x2 = this.abs();
      var y2 = a2.abs();
      var i2 = x2.t;
      r2.t = i2 + y2.t;
      while (--i2 >= 0) {
        r2[i2] = 0;
      }
      for (i2 = 0; i2 < y2.t; ++i2) {
        r2[i2 + x2.t] = x2.am(0, y2[i2], r2, i2, 0, x2.t);
      }
      r2.s = 0;
      r2.clamp();
      if (this.s != a2.s) {
        BigInteger2.ZERO.subTo(r2, r2);
      }
    };
    BigInteger2.prototype.squareTo = function(r2) {
      var x2 = this.abs();
      var i2 = r2.t = 2 * x2.t;
      while (--i2 >= 0) {
        r2[i2] = 0;
      }
      for (i2 = 0; i2 < x2.t - 1; ++i2) {
        var c2 = x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
        if ((r2[i2 + x2.t] += x2.am(i2 + 1, 2 * x2[i2], r2, 2 * i2 + 1, c2, x2.t - i2 - 1)) >= x2.DV) {
          r2[i2 + x2.t] -= x2.DV;
          r2[i2 + x2.t + 1] = 1;
        }
      }
      if (r2.t > 0) {
        r2[r2.t - 1] += x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
      }
      r2.s = 0;
      r2.clamp();
    };
    BigInteger2.prototype.divRemTo = function(m2, q2, r2) {
      var pm = m2.abs();
      if (pm.t <= 0) {
        return;
      }
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q2 != null) {
          q2.fromInt(0);
        }
        if (r2 != null) {
          this.copyTo(r2);
        }
        return;
      }
      if (r2 == null) {
        r2 = nbi();
      }
      var y2 = nbi();
      var ts = this.s;
      var ms = m2.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y2);
        pt.lShiftTo(nsh, r2);
      } else {
        pm.copyTo(y2);
        pt.copyTo(r2);
      }
      var ys = y2.t;
      var y0 = y2[ys - 1];
      if (y0 == 0) {
        return;
      }
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y2[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt;
      var d2 = (1 << this.F1) / yt;
      var e2 = 1 << this.F2;
      var i2 = r2.t;
      var j2 = i2 - ys;
      var t = q2 == null ? nbi() : q2;
      y2.dlShiftTo(j2, t);
      if (r2.compareTo(t) >= 0) {
        r2[r2.t++] = 1;
        r2.subTo(t, r2);
      }
      BigInteger2.ONE.dlShiftTo(ys, t);
      t.subTo(y2, y2);
      while (y2.t < ys) {
        y2[y2.t++] = 0;
      }
      while (--j2 >= 0) {
        var qd2 = r2[--i2] == y0 ? this.DM : Math.floor(r2[i2] * d1 + (r2[i2 - 1] + e2) * d2);
        if ((r2[i2] += y2.am(0, qd2, r2, j2, 0, ys)) < qd2) {
          y2.dlShiftTo(j2, t);
          r2.subTo(t, r2);
          while (r2[i2] < --qd2) {
            r2.subTo(t, r2);
          }
        }
      }
      if (q2 != null) {
        r2.drShiftTo(ys, q2);
        if (ts != ms) {
          BigInteger2.ZERO.subTo(q2, q2);
        }
      }
      r2.t = ys;
      r2.clamp();
      if (nsh > 0) {
        r2.rShiftTo(nsh, r2);
      }
      if (ts < 0) {
        BigInteger2.ZERO.subTo(r2, r2);
      }
    };
    BigInteger2.prototype.invDigit = function() {
      if (this.t < 1) {
        return 0;
      }
      var x2 = this[0];
      if ((x2 & 1) == 0) {
        return 0;
      }
      var y2 = x2 & 3;
      y2 = y2 * (2 - (x2 & 15) * y2) & 15;
      y2 = y2 * (2 - (x2 & 255) * y2) & 255;
      y2 = y2 * (2 - ((x2 & 65535) * y2 & 65535)) & 65535;
      y2 = y2 * (2 - x2 * y2 % this.DV) % this.DV;
      return y2 > 0 ? this.DV - y2 : -y2;
    };
    BigInteger2.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    };
    BigInteger2.prototype.exp = function(e2, z) {
      if (e2 > 4294967295 || e2 < 1) {
        return BigInteger2.ONE;
      }
      var r2 = nbi();
      var r22 = nbi();
      var g2 = z.convert(this);
      var i2 = nbits(e2) - 1;
      g2.copyTo(r2);
      while (--i2 >= 0) {
        z.sqrTo(r2, r22);
        if ((e2 & 1 << i2) > 0) {
          z.mulTo(r22, g2, r2);
        } else {
          var t = r2;
          r2 = r22;
          r22 = t;
        }
      }
      return z.revert(r2);
    };
    BigInteger2.prototype.chunkSize = function(r2) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r2));
    };
    BigInteger2.prototype.toRadix = function(b2) {
      if (b2 == null) {
        b2 = 10;
      }
      if (this.signum() == 0 || b2 < 2 || b2 > 36) {
        return "0";
      }
      var cs = this.chunkSize(b2);
      var a2 = Math.pow(b2, cs);
      var d2 = nbv(a2);
      var y2 = nbi();
      var z = nbi();
      var r2 = "";
      this.divRemTo(d2, y2, z);
      while (y2.signum() > 0) {
        r2 = (a2 + z.intValue()).toString(b2).substr(1) + r2;
        y2.divRemTo(d2, y2, z);
      }
      return z.intValue().toString(b2) + r2;
    };
    BigInteger2.prototype.fromRadix = function(s2, b2) {
      this.fromInt(0);
      if (b2 == null) {
        b2 = 10;
      }
      var cs = this.chunkSize(b2);
      var d2 = Math.pow(b2, cs);
      var mi2 = false;
      var j2 = 0;
      var w2 = 0;
      for (var i2 = 0; i2 < s2.length; ++i2) {
        var x2 = intAt(s2, i2);
        if (x2 < 0) {
          if (s2.charAt(i2) == "-" && this.signum() == 0) {
            mi2 = true;
          }
          continue;
        }
        w2 = b2 * w2 + x2;
        if (++j2 >= cs) {
          this.dMultiply(d2);
          this.dAddOffset(w2, 0);
          j2 = 0;
          w2 = 0;
        }
      }
      if (j2 > 0) {
        this.dMultiply(Math.pow(b2, j2));
        this.dAddOffset(w2, 0);
      }
      if (mi2) {
        BigInteger2.ZERO.subTo(this, this);
      }
    };
    BigInteger2.prototype.fromNumber = function(a2, b2, c2) {
      if ("number" == typeof b2) {
        if (a2 < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a2, c2);
          if (!this.testBit(a2 - 1)) {
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          while (!this.isProbablePrime(b2)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a2) {
              this.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), this);
            }
          }
        }
      } else {
        var x2 = [];
        var t = a2 & 7;
        x2.length = (a2 >> 3) + 1;
        b2.nextBytes(x2);
        if (t > 0) {
          x2[0] &= (1 << t) - 1;
        } else {
          x2[0] = 0;
        }
        this.fromString(x2, 256);
      }
    };
    BigInteger2.prototype.bitwiseTo = function(a2, op, r2) {
      var i2;
      var f2;
      var m2 = Math.min(a2.t, this.t);
      for (i2 = 0; i2 < m2; ++i2) {
        r2[i2] = op(this[i2], a2[i2]);
      }
      if (a2.t < this.t) {
        f2 = a2.s & this.DM;
        for (i2 = m2; i2 < this.t; ++i2) {
          r2[i2] = op(this[i2], f2);
        }
        r2.t = this.t;
      } else {
        f2 = this.s & this.DM;
        for (i2 = m2; i2 < a2.t; ++i2) {
          r2[i2] = op(f2, a2[i2]);
        }
        r2.t = a2.t;
      }
      r2.s = op(this.s, a2.s);
      r2.clamp();
    };
    BigInteger2.prototype.changeBit = function(n2, op) {
      var r2 = BigInteger2.ONE.shiftLeft(n2);
      this.bitwiseTo(r2, op, r2);
      return r2;
    };
    BigInteger2.prototype.addTo = function(a2, r2) {
      var i2 = 0;
      var c2 = 0;
      var m2 = Math.min(a2.t, this.t);
      while (i2 < m2) {
        c2 += this[i2] + a2[i2];
        r2[i2++] = c2 & this.DM;
        c2 >>= this.DB;
      }
      if (a2.t < this.t) {
        c2 += a2.s;
        while (i2 < this.t) {
          c2 += this[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 += this.s;
      } else {
        c2 += this.s;
        while (i2 < a2.t) {
          c2 += a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        c2 += a2.s;
      }
      r2.s = c2 < 0 ? -1 : 0;
      if (c2 > 0) {
        r2[i2++] = c2;
      } else if (c2 < -1) {
        r2[i2++] = this.DV + c2;
      }
      r2.t = i2;
      r2.clamp();
    };
    BigInteger2.prototype.dMultiply = function(n2) {
      this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    };
    BigInteger2.prototype.dAddOffset = function(n2, w2) {
      if (n2 == 0) {
        return;
      }
      while (this.t <= w2) {
        this[this.t++] = 0;
      }
      this[w2] += n2;
      while (this[w2] >= this.DV) {
        this[w2] -= this.DV;
        if (++w2 >= this.t) {
          this[this.t++] = 0;
        }
        ++this[w2];
      }
    };
    BigInteger2.prototype.multiplyLowerTo = function(a2, n2, r2) {
      var i2 = Math.min(this.t + a2.t, n2);
      r2.s = 0;
      r2.t = i2;
      while (i2 > 0) {
        r2[--i2] = 0;
      }
      for (var j2 = r2.t - this.t; i2 < j2; ++i2) {
        r2[i2 + this.t] = this.am(0, a2[i2], r2, i2, 0, this.t);
      }
      for (var j2 = Math.min(a2.t, n2); i2 < j2; ++i2) {
        this.am(0, a2[i2], r2, i2, 0, n2 - i2);
      }
      r2.clamp();
    };
    BigInteger2.prototype.multiplyUpperTo = function(a2, n2, r2) {
      --n2;
      var i2 = r2.t = this.t + a2.t - n2;
      r2.s = 0;
      while (--i2 >= 0) {
        r2[i2] = 0;
      }
      for (i2 = Math.max(n2 - this.t, 0); i2 < a2.t; ++i2) {
        r2[this.t + i2 - n2] = this.am(n2 - i2, a2[i2], r2, 0, 0, this.t + i2 - n2);
      }
      r2.clamp();
      r2.drShiftTo(1, r2);
    };
    BigInteger2.prototype.modInt = function(n2) {
      if (n2 <= 0) {
        return 0;
      }
      var d2 = this.DV % n2;
      var r2 = this.s < 0 ? n2 - 1 : 0;
      if (this.t > 0) {
        if (d2 == 0) {
          r2 = this[0] % n2;
        } else {
          for (var i2 = this.t - 1; i2 >= 0; --i2) {
            r2 = (d2 * r2 + this[i2]) % n2;
          }
        }
      }
      return r2;
    };
    BigInteger2.prototype.millerRabin = function(t) {
      var n1 = this.subtract(BigInteger2.ONE);
      var k2 = n1.getLowestSetBit();
      if (k2 <= 0) {
        return false;
      }
      var r2 = n1.shiftRight(k2);
      t = t + 1 >> 1;
      if (t > lowprimes.length) {
        t = lowprimes.length;
      }
      var a2 = nbi();
      for (var i2 = 0; i2 < t; ++i2) {
        a2.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y2 = a2.modPow(r2, this);
        if (y2.compareTo(BigInteger2.ONE) != 0 && y2.compareTo(n1) != 0) {
          var j2 = 1;
          while (j2++ < k2 && y2.compareTo(n1) != 0) {
            y2 = y2.modPowInt(2, this);
            if (y2.compareTo(BigInteger2.ONE) == 0) {
              return false;
            }
          }
          if (y2.compareTo(n1) != 0) {
            return false;
          }
        }
      }
      return true;
    };
    BigInteger2.prototype.square = function() {
      var r2 = nbi();
      this.squareTo(r2);
      return r2;
    };
    BigInteger2.prototype.gcda = function(a2, callback) {
      var x2 = this.s < 0 ? this.negate() : this.clone();
      var y2 = a2.s < 0 ? a2.negate() : a2.clone();
      if (x2.compareTo(y2) < 0) {
        var t = x2;
        x2 = y2;
        y2 = t;
      }
      var i2 = x2.getLowestSetBit();
      var g2 = y2.getLowestSetBit();
      if (g2 < 0) {
        callback(x2);
        return;
      }
      if (i2 < g2) {
        g2 = i2;
      }
      if (g2 > 0) {
        x2.rShiftTo(g2, x2);
        y2.rShiftTo(g2, y2);
      }
      var gcda1 = function() {
        if ((i2 = x2.getLowestSetBit()) > 0) {
          x2.rShiftTo(i2, x2);
        }
        if ((i2 = y2.getLowestSetBit()) > 0) {
          y2.rShiftTo(i2, y2);
        }
        if (x2.compareTo(y2) >= 0) {
          x2.subTo(y2, x2);
          x2.rShiftTo(1, x2);
        } else {
          y2.subTo(x2, y2);
          y2.rShiftTo(1, y2);
        }
        if (!(x2.signum() > 0)) {
          if (g2 > 0) {
            y2.lShiftTo(g2, y2);
          }
          setTimeout(function() {
            callback(y2);
          }, 0);
        } else {
          setTimeout(gcda1, 0);
        }
      };
      setTimeout(gcda1, 10);
    };
    BigInteger2.prototype.fromNumberAsync = function(a2, b2, c2, callback) {
      if ("number" == typeof b2) {
        if (a2 < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a2, c2);
          if (!this.testBit(a2 - 1)) {
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          var bnp_1 = this;
          var bnpfn1_1 = function() {
            bnp_1.dAddOffset(2, 0);
            if (bnp_1.bitLength() > a2) {
              bnp_1.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), bnp_1);
            }
            if (bnp_1.isProbablePrime(b2)) {
              setTimeout(function() {
                callback();
              }, 0);
            } else {
              setTimeout(bnpfn1_1, 0);
            }
          };
          setTimeout(bnpfn1_1, 0);
        }
      } else {
        var x2 = [];
        var t = a2 & 7;
        x2.length = (a2 >> 3) + 1;
        b2.nextBytes(x2);
        if (t > 0) {
          x2[0] &= (1 << t) - 1;
        } else {
          x2[0] = 0;
        }
        this.fromString(x2, 256);
      }
    };
    return BigInteger2;
  }()
);
var NullExp = (
  /** @class */
  function() {
    function NullExp2() {
    }
    NullExp2.prototype.convert = function(x2) {
      return x2;
    };
    NullExp2.prototype.revert = function(x2) {
      return x2;
    };
    NullExp2.prototype.mulTo = function(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
    };
    NullExp2.prototype.sqrTo = function(x2, r2) {
      x2.squareTo(r2);
    };
    return NullExp2;
  }()
);
var Classic = (
  /** @class */
  function() {
    function Classic2(m2) {
      this.m = m2;
    }
    Classic2.prototype.convert = function(x2) {
      if (x2.s < 0 || x2.compareTo(this.m) >= 0) {
        return x2.mod(this.m);
      } else {
        return x2;
      }
    };
    Classic2.prototype.revert = function(x2) {
      return x2;
    };
    Classic2.prototype.reduce = function(x2) {
      x2.divRemTo(this.m, null, x2);
    };
    Classic2.prototype.mulTo = function(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
      this.reduce(r2);
    };
    Classic2.prototype.sqrTo = function(x2, r2) {
      x2.squareTo(r2);
      this.reduce(r2);
    };
    return Classic2;
  }()
);
var Montgomery = (
  /** @class */
  function() {
    function Montgomery2(m2) {
      this.m = m2;
      this.mp = m2.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m2.DB - 15) - 1;
      this.mt2 = 2 * m2.t;
    }
    Montgomery2.prototype.convert = function(x2) {
      var r2 = nbi();
      x2.abs().dlShiftTo(this.m.t, r2);
      r2.divRemTo(this.m, null, r2);
      if (x2.s < 0 && r2.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r2, r2);
      }
      return r2;
    };
    Montgomery2.prototype.revert = function(x2) {
      var r2 = nbi();
      x2.copyTo(r2);
      this.reduce(r2);
      return r2;
    };
    Montgomery2.prototype.reduce = function(x2) {
      while (x2.t <= this.mt2) {
        x2[x2.t++] = 0;
      }
      for (var i2 = 0; i2 < this.m.t; ++i2) {
        var j2 = x2[i2] & 32767;
        var u0 = j2 * this.mpl + ((j2 * this.mph + (x2[i2] >> 15) * this.mpl & this.um) << 15) & x2.DM;
        j2 = i2 + this.m.t;
        x2[j2] += this.m.am(0, u0, x2, i2, 0, this.m.t);
        while (x2[j2] >= x2.DV) {
          x2[j2] -= x2.DV;
          x2[++j2]++;
        }
      }
      x2.clamp();
      x2.drShiftTo(this.m.t, x2);
      if (x2.compareTo(this.m) >= 0) {
        x2.subTo(this.m, x2);
      }
    };
    Montgomery2.prototype.mulTo = function(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
      this.reduce(r2);
    };
    Montgomery2.prototype.sqrTo = function(x2, r2) {
      x2.squareTo(r2);
      this.reduce(r2);
    };
    return Montgomery2;
  }()
);
var Barrett = (
  /** @class */
  function() {
    function Barrett2(m2) {
      this.m = m2;
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m2.t, this.r2);
      this.mu = this.r2.divide(m2);
    }
    Barrett2.prototype.convert = function(x2) {
      if (x2.s < 0 || x2.t > 2 * this.m.t) {
        return x2.mod(this.m);
      } else if (x2.compareTo(this.m) < 0) {
        return x2;
      } else {
        var r2 = nbi();
        x2.copyTo(r2);
        this.reduce(r2);
        return r2;
      }
    };
    Barrett2.prototype.revert = function(x2) {
      return x2;
    };
    Barrett2.prototype.reduce = function(x2) {
      x2.drShiftTo(this.m.t - 1, this.r2);
      if (x2.t > this.m.t + 1) {
        x2.t = this.m.t + 1;
        x2.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x2.compareTo(this.r2) < 0) {
        x2.dAddOffset(1, this.m.t + 1);
      }
      x2.subTo(this.r2, x2);
      while (x2.compareTo(this.m) >= 0) {
        x2.subTo(this.m, x2);
      }
    };
    Barrett2.prototype.mulTo = function(x2, y2, r2) {
      x2.multiplyTo(y2, r2);
      this.reduce(r2);
    };
    Barrett2.prototype.sqrTo = function(x2, r2) {
      x2.squareTo(r2);
      this.reduce(r2);
    };
    return Barrett2;
  }()
);
function nbi() {
  return new BigInteger(null);
}
function parseBigInt(str, r2) {
  return new BigInteger(str, r2);
}
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = function am2(i2, x2, w2, j2, c2, n2) {
    var xl = x2 & 32767;
    var xh2 = x2 >> 15;
    while (--n2 >= 0) {
      var l2 = this[i2] & 32767;
      var h2 = this[i2++] >> 15;
      var m2 = xh2 * l2 + h2 * xl;
      l2 = xl * l2 + ((m2 & 32767) << 15) + w2[j2] + (c2 & 1073741823);
      c2 = (l2 >>> 30) + (m2 >>> 15) + xh2 * h2 + (c2 >>> 30);
      w2[j2++] = l2 & 1073741823;
    }
    return c2;
  };
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  BigInteger.prototype.am = function am1(i2, x2, w2, j2, c2, n2) {
    while (--n2 >= 0) {
      var v2 = x2 * this[i2++] + w2[j2] + c2;
      c2 = Math.floor(v2 / 67108864);
      w2[j2++] = v2 & 67108863;
    }
    return c2;
  };
  dbits = 26;
} else {
  BigInteger.prototype.am = function am3(i2, x2, w2, j2, c2, n2) {
    var xl = x2 & 16383;
    var xh2 = x2 >> 14;
    while (--n2 >= 0) {
      var l2 = this[i2] & 16383;
      var h2 = this[i2++] >> 14;
      var m2 = xh2 * l2 + h2 * xl;
      l2 = xl * l2 + ((m2 & 16383) << 14) + w2[j2] + c2;
      c2 = (l2 >> 28) + (m2 >> 14) + xh2 * h2;
      w2[j2++] = l2 & 268435455;
    }
    return c2;
  };
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function intAt(s2, i2) {
  var c2 = BI_RC[s2.charCodeAt(i2)];
  return c2 == null ? -1 : c2;
}
function nbv(i2) {
  var r2 = nbi();
  r2.fromInt(i2);
  return r2;
}
function nbits(x2) {
  var r2 = 1;
  var t;
  if ((t = x2 >>> 16) != 0) {
    x2 = t;
    r2 += 16;
  }
  if ((t = x2 >> 8) != 0) {
    x2 = t;
    r2 += 8;
  }
  if ((t = x2 >> 4) != 0) {
    x2 = t;
    r2 += 4;
  }
  if ((t = x2 >> 2) != 0) {
    x2 = t;
    r2 += 2;
  }
  if ((t = x2 >> 1) != 0) {
    x2 = t;
    r2 += 1;
  }
  return r2;
}
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
var Arcfour = (
  /** @class */
  function() {
    function Arcfour2() {
      this.i = 0;
      this.j = 0;
      this.S = [];
    }
    Arcfour2.prototype.init = function(key2) {
      var i2;
      var j2;
      var t;
      for (i2 = 0; i2 < 256; ++i2) {
        this.S[i2] = i2;
      }
      j2 = 0;
      for (i2 = 0; i2 < 256; ++i2) {
        j2 = j2 + this.S[i2] + key2[i2 % key2.length] & 255;
        t = this.S[i2];
        this.S[i2] = this.S[j2];
        this.S[j2] = t;
      }
      this.i = 0;
      this.j = 0;
    };
    Arcfour2.prototype.next = function() {
      var t;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t;
      return this.S[t + this.S[this.i] & 255];
    };
    return Arcfour2;
  }()
);
function prng_newstate() {
  return new Arcfour();
}
var rng_psize = 256;
var rng_state;
var rng_pool = null;
var rng_pptr;
if (rng_pool == null) {
  rng_pool = [];
  rng_pptr = 0;
  var t = void 0;
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t) {
      rng_pool[rng_pptr++] = z[t] & 255;
    }
  }
  var count = 0;
  var onMouseMoveListener_1 = function(ev) {
    count = count || 0;
    if (count >= 256 || rng_pptr >= rng_psize) {
      if (window.removeEventListener) {
        window.removeEventListener("mousemove", onMouseMoveListener_1, false);
      } else if (window.detachEvent) {
        window.detachEvent("onmousemove", onMouseMoveListener_1);
      }
      return;
    }
    try {
      var mouseCoordinates = ev.x + ev.y;
      rng_pool[rng_pptr++] = mouseCoordinates & 255;
      count += 1;
    } catch (e2) {
    }
  };
  if (typeof window !== "undefined") {
    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }
}
function rng_get_byte() {
  if (rng_state == null) {
    rng_state = prng_newstate();
    while (rng_pptr < rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  return rng_state.next();
}
var SecureRandom = (
  /** @class */
  function() {
    function SecureRandom2() {
    }
    SecureRandom2.prototype.nextBytes = function(ba) {
      for (var i2 = 0; i2 < ba.length; ++i2) {
        ba[i2] = rng_get_byte();
      }
    };
    return SecureRandom2;
  }()
);
function pkcs1pad1(s2, n2) {
  if (n2 < s2.length + 22) {
    console.error("Message too long for RSA");
    return null;
  }
  var len = n2 - s2.length - 6;
  var filler = "";
  for (var f2 = 0; f2 < len; f2 += 2) {
    filler += "ff";
  }
  var m2 = "0001" + filler + "00" + s2;
  return parseBigInt(m2, 16);
}
function pkcs1pad2(s2, n2) {
  if (n2 < s2.length + 11) {
    console.error("Message too long for RSA");
    return null;
  }
  var ba = [];
  var i2 = s2.length - 1;
  while (i2 >= 0 && n2 > 0) {
    var c2 = s2.charCodeAt(i2--);
    if (c2 < 128) {
      ba[--n2] = c2;
    } else if (c2 > 127 && c2 < 2048) {
      ba[--n2] = c2 & 63 | 128;
      ba[--n2] = c2 >> 6 | 192;
    } else {
      ba[--n2] = c2 & 63 | 128;
      ba[--n2] = c2 >> 6 & 63 | 128;
      ba[--n2] = c2 >> 12 | 224;
    }
  }
  ba[--n2] = 0;
  var rng = new SecureRandom();
  var x2 = [];
  while (n2 > 2) {
    x2[0] = 0;
    while (x2[0] == 0) {
      rng.nextBytes(x2);
    }
    ba[--n2] = x2[0];
  }
  ba[--n2] = 2;
  ba[--n2] = 0;
  return new BigInteger(ba);
}
var RSAKey = (
  /** @class */
  function() {
    function RSAKey2() {
      this.n = null;
      this.e = 0;
      this.d = null;
      this.p = null;
      this.q = null;
      this.dmp1 = null;
      this.dmq1 = null;
      this.coeff = null;
    }
    RSAKey2.prototype.doPublic = function(x2) {
      return x2.modPowInt(this.e, this.n);
    };
    RSAKey2.prototype.doPrivate = function(x2) {
      if (this.p == null || this.q == null) {
        return x2.modPow(this.d, this.n);
      }
      var xp = x2.mod(this.p).modPow(this.dmp1, this.p);
      var xq = x2.mod(this.q).modPow(this.dmq1, this.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(this.p);
      }
      return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    };
    RSAKey2.prototype.setPublic = function(N2, E2) {
      if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
        this.n = parseBigInt(N2, 16);
        this.e = parseInt(E2, 16);
      } else {
        console.error("Invalid RSA public key");
      }
    };
    RSAKey2.prototype.encrypt = function(text) {
      var maxLength = this.n.bitLength() + 7 >> 3;
      var m2 = pkcs1pad2(text, maxLength);
      if (m2 == null) {
        return null;
      }
      var c2 = this.doPublic(m2);
      if (c2 == null) {
        return null;
      }
      var h2 = c2.toString(16);
      var length = h2.length;
      for (var i2 = 0; i2 < maxLength * 2 - length; i2++) {
        h2 = "0" + h2;
      }
      return h2;
    };
    RSAKey2.prototype.setPrivate = function(N2, E2, D2) {
      if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
        this.n = parseBigInt(N2, 16);
        this.e = parseInt(E2, 16);
        this.d = parseBigInt(D2, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    };
    RSAKey2.prototype.setPrivateEx = function(N2, E2, D2, P2, Q2, DP, DQ, C2) {
      if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
        this.n = parseBigInt(N2, 16);
        this.e = parseInt(E2, 16);
        this.d = parseBigInt(D2, 16);
        this.p = parseBigInt(P2, 16);
        this.q = parseBigInt(Q2, 16);
        this.dmp1 = parseBigInt(DP, 16);
        this.dmq1 = parseBigInt(DQ, 16);
        this.coeff = parseBigInt(C2, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    };
    RSAKey2.prototype.generate = function(B2, E2) {
      var rng = new SecureRandom();
      var qs = B2 >> 1;
      this.e = parseInt(E2, 16);
      var ee2 = new BigInteger(E2, 16);
      for (; ; ) {
        for (; ; ) {
          this.p = new BigInteger(B2 - qs, 1, rng);
          if (this.p.subtract(BigInteger.ONE).gcd(ee2).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
            break;
          }
        }
        for (; ; ) {
          this.q = new BigInteger(qs, 1, rng);
          if (this.q.subtract(BigInteger.ONE).gcd(ee2).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
            break;
          }
        }
        if (this.p.compareTo(this.q) <= 0) {
          var t = this.p;
          this.p = this.q;
          this.q = t;
        }
        var p1 = this.p.subtract(BigInteger.ONE);
        var q1 = this.q.subtract(BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee2).compareTo(BigInteger.ONE) == 0) {
          this.n = this.p.multiply(this.q);
          this.d = ee2.modInverse(phi);
          this.dmp1 = this.d.mod(p1);
          this.dmq1 = this.d.mod(q1);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    };
    RSAKey2.prototype.decrypt = function(ctext) {
      var c2 = parseBigInt(ctext, 16);
      var m2 = this.doPrivate(c2);
      if (m2 == null) {
        return null;
      }
      return pkcs1unpad2(m2, this.n.bitLength() + 7 >> 3);
    };
    RSAKey2.prototype.generateAsync = function(B2, E2, callback) {
      var rng = new SecureRandom();
      var qs = B2 >> 1;
      this.e = parseInt(E2, 16);
      var ee2 = new BigInteger(E2, 16);
      var rsa = this;
      var loop1 = function() {
        var loop4 = function() {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }
          var p1 = rsa.p.subtract(BigInteger.ONE);
          var q1 = rsa.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee2).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee2.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function() {
              callback();
            }, 0);
          } else {
            setTimeout(loop1, 0);
          }
        };
        var loop3 = function() {
          rsa.q = nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function() {
            rsa.q.subtract(BigInteger.ONE).gcda(ee2, function(r2) {
              if (r2.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else {
                setTimeout(loop3, 0);
              }
            });
          });
        };
        var loop2 = function() {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B2 - qs, 1, rng, function() {
            rsa.p.subtract(BigInteger.ONE).gcda(ee2, function(r2) {
              if (r2.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3, 0);
              } else {
                setTimeout(loop2, 0);
              }
            });
          });
        };
        setTimeout(loop2, 0);
      };
      setTimeout(loop1, 0);
    };
    RSAKey2.prototype.sign = function(text, digestMethod, digestName) {
      var header = getDigestHeader(digestName);
      var digest = header + digestMethod(text).toString();
      var m2 = pkcs1pad1(digest, this.n.bitLength() / 4);
      if (m2 == null) {
        return null;
      }
      var c2 = this.doPrivate(m2);
      if (c2 == null) {
        return null;
      }
      var h2 = c2.toString(16);
      if ((h2.length & 1) == 0) {
        return h2;
      } else {
        return "0" + h2;
      }
    };
    RSAKey2.prototype.verify = function(text, signature, digestMethod) {
      var c2 = parseBigInt(signature, 16);
      var m2 = this.doPublic(c2);
      if (m2 == null) {
        return null;
      }
      var unpadded = m2.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };
    return RSAKey2;
  }()
);
function pkcs1unpad2(d2, n2) {
  var b2 = d2.toByteArray();
  var i2 = 0;
  while (i2 < b2.length && b2[i2] == 0) {
    ++i2;
  }
  if (b2.length - i2 != n2 - 1 || b2[i2] != 2) {
    return null;
  }
  ++i2;
  while (b2[i2] != 0) {
    if (++i2 >= b2.length) {
      return null;
    }
  }
  var ret = "";
  while (++i2 < b2.length) {
    var c2 = b2[i2] & 255;
    if (c2 < 128) {
      ret += String.fromCharCode(c2);
    } else if (c2 > 191 && c2 < 224) {
      ret += String.fromCharCode((c2 & 31) << 6 | b2[i2 + 1] & 63);
      ++i2;
    } else {
      ret += String.fromCharCode((c2 & 15) << 12 | (b2[i2 + 1] & 63) << 6 | b2[i2 + 2] & 63);
      i2 += 2;
    }
  }
  return ret;
}
var DIGEST_HEADERS = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function getDigestHeader(name) {
  return DIGEST_HEADERS[name] || "";
}
function removeDigestHeader(str) {
  for (var name_1 in DIGEST_HEADERS) {
    if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
      var header = DIGEST_HEADERS[name_1];
      var len = header.length;
      if (str.substr(0, len) == header) {
        return str.substr(len);
      }
    }
  }
  return str;
}
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var YAHOO = {};
YAHOO.lang = {
  /**
   * Utility to set up the prototype, constructor and superclass properties to
   * support an inheritance strategy that can chain constructors and methods.
   * Static members will not be inherited.
   *
   * @method extend
   * @static
   * @param {Function} subc   the object to modify
   * @param {Function} superc the object to inherit
   * @param {Object} overrides  additional properties/methods to add to the
   *                              subclass prototype.  These will override the
   *                              matching items obtained from the superclass
   *                              if present.
   */
  extend: function(subc, superc, overrides) {
    if (!superc || !subc) {
      throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    }
    var F2 = function() {
    };
    F2.prototype = superc.prototype;
    subc.prototype = new F2();
    subc.prototype.constructor = subc;
    subc.superclass = superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
      superc.prototype.constructor = superc;
    }
    if (overrides) {
      var i2;
      for (i2 in overrides) {
        subc.prototype[i2] = overrides[i2];
      }
      var _IEEnumFix = function() {
      }, ADD = ["toString", "valueOf"];
      try {
        if (/MSIE/.test(navigator.userAgent)) {
          _IEEnumFix = function(r2, s2) {
            for (i2 = 0; i2 < ADD.length; i2 = i2 + 1) {
              var fname = ADD[i2], f2 = s2[fname];
              if (typeof f2 === "function" && f2 != Object.prototype[fname]) {
                r2[fname] = f2;
              }
            }
          };
        }
      } catch (ex) {
      }
      _IEEnumFix(subc.prototype, overrides);
    }
  }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var KJUR = {};
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1)
  KJUR.asn1 = {};
KJUR.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(i2) {
    var h2 = i2.toString(16);
    if (h2.length % 2 == 1)
      h2 = "0" + h2;
    return h2;
  };
  this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
    var h2 = bigIntegerValue.toString(16);
    if (h2.substr(0, 1) != "-") {
      if (h2.length % 2 == 1) {
        h2 = "0" + h2;
      } else {
        if (!h2.match(/^[0-7]/)) {
          h2 = "00" + h2;
        }
      }
    } else {
      var hPos = h2.substr(1);
      var xorLen = hPos.length;
      if (xorLen % 2 == 1) {
        xorLen += 1;
      } else {
        if (!h2.match(/^[0-7]/)) {
          xorLen += 2;
        }
      }
      var hMask = "";
      for (var i2 = 0; i2 < xorLen; i2++) {
        hMask += "f";
      }
      var biMask = new BigInteger(hMask, 16);
      var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
      h2 = biNeg.toString(16).replace(/^-/, "");
    }
    return h2;
  };
  this.getPEMStringFromHex = function(dataHex, pemHeader) {
    return hextopem(dataHex, pemHeader);
  };
  this.newObject = function(param) {
    var _KJUR = KJUR, _KJUR_asn1 = _KJUR.asn1, _DERBoolean = _KJUR_asn1.DERBoolean, _DERInteger = _KJUR_asn1.DERInteger, _DERBitString = _KJUR_asn1.DERBitString, _DEROctetString = _KJUR_asn1.DEROctetString, _DERNull = _KJUR_asn1.DERNull, _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier, _DEREnumerated = _KJUR_asn1.DEREnumerated, _DERUTF8String = _KJUR_asn1.DERUTF8String, _DERNumericString = _KJUR_asn1.DERNumericString, _DERPrintableString = _KJUR_asn1.DERPrintableString, _DERTeletexString = _KJUR_asn1.DERTeletexString, _DERIA5String = _KJUR_asn1.DERIA5String, _DERUTCTime = _KJUR_asn1.DERUTCTime, _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime, _DERSequence = _KJUR_asn1.DERSequence, _DERSet = _KJUR_asn1.DERSet, _DERTaggedObject = _KJUR_asn1.DERTaggedObject, _newObject = _KJUR_asn1.ASN1Util.newObject;
    var keys = Object.keys(param);
    if (keys.length != 1)
      throw "key of param shall be only one.";
    var key2 = keys[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key2 + ":") == -1)
      throw "undefined key: " + key2;
    if (key2 == "bool")
      return new _DERBoolean(param[key2]);
    if (key2 == "int")
      return new _DERInteger(param[key2]);
    if (key2 == "bitstr")
      return new _DERBitString(param[key2]);
    if (key2 == "octstr")
      return new _DEROctetString(param[key2]);
    if (key2 == "null")
      return new _DERNull(param[key2]);
    if (key2 == "oid")
      return new _DERObjectIdentifier(param[key2]);
    if (key2 == "enum")
      return new _DEREnumerated(param[key2]);
    if (key2 == "utf8str")
      return new _DERUTF8String(param[key2]);
    if (key2 == "numstr")
      return new _DERNumericString(param[key2]);
    if (key2 == "prnstr")
      return new _DERPrintableString(param[key2]);
    if (key2 == "telstr")
      return new _DERTeletexString(param[key2]);
    if (key2 == "ia5str")
      return new _DERIA5String(param[key2]);
    if (key2 == "utctime")
      return new _DERUTCTime(param[key2]);
    if (key2 == "gentime")
      return new _DERGeneralizedTime(param[key2]);
    if (key2 == "seq") {
      var paramList = param[key2];
      var a2 = [];
      for (var i2 = 0; i2 < paramList.length; i2++) {
        var asn1Obj = _newObject(paramList[i2]);
        a2.push(asn1Obj);
      }
      return new _DERSequence({ "array": a2 });
    }
    if (key2 == "set") {
      var paramList = param[key2];
      var a2 = [];
      for (var i2 = 0; i2 < paramList.length; i2++) {
        var asn1Obj = _newObject(paramList[i2]);
        a2.push(asn1Obj);
      }
      return new _DERSet({ "array": a2 });
    }
    if (key2 == "tag") {
      var tagParam = param[key2];
      if (Object.prototype.toString.call(tagParam) === "[object Array]" && tagParam.length == 3) {
        var obj = _newObject(tagParam[2]);
        return new _DERTaggedObject({
          tag: tagParam[0],
          explicit: tagParam[1],
          obj
        });
      } else {
        var newParam = {};
        if (tagParam.explicit !== void 0)
          newParam.explicit = tagParam.explicit;
        if (tagParam.tag !== void 0)
          newParam.tag = tagParam.tag;
        if (tagParam.obj === void 0)
          throw "obj shall be specified for 'tag'.";
        newParam.obj = _newObject(tagParam.obj);
        return new _DERTaggedObject(newParam);
      }
    }
  };
  this.jsonToASN1HEX = function(param) {
    var asn1Obj = this.newObject(param);
    return asn1Obj.getEncodedHex();
  };
}();
KJUR.asn1.ASN1Util.oidHexToInt = function(hex) {
  var s2 = "";
  var i01 = parseInt(hex.substr(0, 2), 16);
  var i0 = Math.floor(i01 / 40);
  var i1 = i01 % 40;
  var s2 = i0 + "." + i1;
  var binbuf = "";
  for (var i2 = 2; i2 < hex.length; i2 += 2) {
    var value = parseInt(hex.substr(i2, 2), 16);
    var bin = ("00000000" + value.toString(2)).slice(-8);
    binbuf = binbuf + bin.substr(1, 7);
    if (bin.substr(0, 1) == "0") {
      var bi2 = new BigInteger(binbuf, 2);
      s2 = s2 + "." + bi2.toString(10);
      binbuf = "";
    }
  }
  return s2;
};
KJUR.asn1.ASN1Util.oidIntToHex = function(oidString) {
  var itox = function(i3) {
    var h3 = i3.toString(16);
    if (h3.length == 1)
      h3 = "0" + h3;
    return h3;
  };
  var roidtox = function(roid) {
    var h3 = "";
    var bi2 = new BigInteger(roid, 10);
    var b2 = bi2.toString(2);
    var padLen = 7 - b2.length % 7;
    if (padLen == 7)
      padLen = 0;
    var bPad = "";
    for (var i3 = 0; i3 < padLen; i3++)
      bPad += "0";
    b2 = bPad + b2;
    for (var i3 = 0; i3 < b2.length - 1; i3 += 7) {
      var b8 = b2.substr(i3, 7);
      if (i3 != b2.length - 7)
        b8 = "1" + b8;
      h3 += itox(parseInt(b8, 2));
    }
    return h3;
  };
  if (!oidString.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + oidString;
  }
  var h2 = "";
  var a2 = oidString.split(".");
  var i0 = parseInt(a2[0]) * 40 + parseInt(a2[1]);
  h2 += itox(i0);
  a2.splice(0, 2);
  for (var i2 = 0; i2 < a2.length; i2++) {
    h2 += roidtox(a2[i2]);
  }
  return h2;
};
KJUR.asn1.ASN1Object = function() {
  var hV = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV == "undefined" || this.hV == null) {
      throw "this.hV is null or undefined.";
    }
    if (this.hV.length % 2 == 1) {
      throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
    }
    var n2 = this.hV.length / 2;
    var hN = n2.toString(16);
    if (hN.length % 2 == 1) {
      hN = "0" + hN;
    }
    if (n2 < 128) {
      return hN;
    } else {
      var hNlen = hN.length / 2;
      if (hNlen > 15) {
        throw "ASN.1 length too long to represent by 8x: n = " + n2.toString(16);
      }
      var head = 128 + hNlen;
      return head.toString(16) + hN;
    }
  };
  this.getEncodedHex = function() {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
    }
    return this.hTLV;
  };
  this.getValueHex = function() {
    this.getEncodedHex();
    return this.hV;
  };
  this.getFreshValueHex = function() {
    return "";
  };
};
KJUR.asn1.DERAbstractString = function(params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  this.getString = function() {
    return this.s;
  };
  this.setString = function(newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(this.s);
  };
  this.setStringHex = function(newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string") {
      this.setString(params);
    } else if (typeof params["str"] != "undefined") {
      this.setString(params["str"]);
    } else if (typeof params["hex"] != "undefined") {
      this.setStringHex(params["hex"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function(params) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  this.localDateToUTC = function(d2) {
    utc = d2.getTime() + d2.getTimezoneOffset() * 6e4;
    var utcDate = new Date(utc);
    return utcDate;
  };
  this.formatDate = function(dateObject, type, withMillis) {
    var pad = this.zeroPadding;
    var d2 = this.localDateToUTC(dateObject);
    var year = String(d2.getFullYear());
    if (type == "utc")
      year = year.substr(2, 2);
    var month = pad(String(d2.getMonth() + 1), 2);
    var day = pad(String(d2.getDate()), 2);
    var hour = pad(String(d2.getHours()), 2);
    var min = pad(String(d2.getMinutes()), 2);
    var sec = pad(String(d2.getSeconds()), 2);
    var s2 = year + month + day + hour + min + sec;
    if (withMillis === true) {
      var millis = d2.getMilliseconds();
      if (millis != 0) {
        var sMillis = pad(String(millis), 3);
        sMillis = sMillis.replace(/[0]+$/, "");
        s2 = s2 + "." + sMillis;
      }
    }
    return s2 + "Z";
  };
  this.zeroPadding = function(s2, len) {
    if (s2.length >= len)
      return s2;
    return new Array(len - s2.length + 1).join("0") + s2;
  };
  this.getString = function() {
    return this.s;
  };
  this.setString = function(newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(newS);
  };
  this.setByDateValue = function(year, month, day, hour, min, sec) {
    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
    this.setByDate(dateObject);
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function(params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  this.setByASN1ObjectArray = function(asn1ObjectArray) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = asn1ObjectArray;
  };
  this.appendASN1Object = function(asn1Object) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(asn1Object);
  };
  this.asn1Array = new Array();
  if (typeof params != "undefined") {
    if (typeof params["array"] != "undefined") {
      this.asn1Array = params["array"];
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBoolean = function() {
  KJUR.asn1.DERBoolean.superclass.constructor.call(this);
  this.hT = "01";
  this.hTLV = "0101ff";
};
YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
KJUR.asn1.DERInteger = function(params) {
  KJUR.asn1.DERInteger.superclass.constructor.call(this);
  this.hT = "02";
  this.setByBigInteger = function(bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  this.setByInteger = function(intValue) {
    var bi2 = new BigInteger(String(intValue), 10);
    this.setByBigInteger(bi2);
  };
  this.setValueHex = function(newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params["bigint"] != "undefined") {
      this.setByBigInteger(params["bigint"]);
    } else if (typeof params["int"] != "undefined") {
      this.setByInteger(params["int"]);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params["hex"] != "undefined") {
      this.setValueHex(params["hex"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function(params) {
  if (params !== void 0 && typeof params.obj !== "undefined") {
    var o2 = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = "00" + o2.getEncodedHex();
  }
  KJUR.asn1.DERBitString.superclass.constructor.call(this);
  this.hT = "03";
  this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = newHexStringIncludingUnusedBits;
  };
  this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
    if (unusedBits < 0 || 7 < unusedBits) {
      throw "unused bits shall be from 0 to 7: u = " + unusedBits;
    }
    var hUnusedBits = "0" + unusedBits;
    this.hTLV = null;
    this.isModified = true;
    this.hV = hUnusedBits + hValue;
  };
  this.setByBinaryString = function(binaryString) {
    binaryString = binaryString.replace(/0+$/, "");
    var unusedBits = 8 - binaryString.length % 8;
    if (unusedBits == 8)
      unusedBits = 0;
    for (var i2 = 0; i2 <= unusedBits; i2++) {
      binaryString += "0";
    }
    var h2 = "";
    for (var i2 = 0; i2 < binaryString.length - 1; i2 += 8) {
      var b2 = binaryString.substr(i2, 8);
      var x2 = parseInt(b2, 2).toString(16);
      if (x2.length == 1)
        x2 = "0" + x2;
      h2 += x2;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = "0" + unusedBits + h2;
  };
  this.setByBooleanArray = function(booleanArray) {
    var s2 = "";
    for (var i2 = 0; i2 < booleanArray.length; i2++) {
      if (booleanArray[i2] == true) {
        s2 += "1";
      } else {
        s2 += "0";
      }
    }
    this.setByBinaryString(s2);
  };
  this.newFalseArray = function(nLength) {
    var a2 = new Array(nLength);
    for (var i2 = 0; i2 < nLength; i2++) {
      a2[i2] = false;
    }
    return a2;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(params);
    } else if (typeof params["hex"] != "undefined") {
      this.setHexValueIncludingUnusedBits(params["hex"]);
    } else if (typeof params["bin"] != "undefined") {
      this.setByBinaryString(params["bin"]);
    } else if (typeof params["array"] != "undefined") {
      this.setByBooleanArray(params["array"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function(params) {
  if (params !== void 0 && typeof params.obj !== "undefined") {
    var o2 = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = o2.getEncodedHex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
  this.hT = "04";
};
YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function() {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function(params) {
  var itox = function(i2) {
    var h2 = i2.toString(16);
    if (h2.length == 1)
      h2 = "0" + h2;
    return h2;
  };
  var roidtox = function(roid) {
    var h2 = "";
    var bi2 = new BigInteger(roid, 10);
    var b2 = bi2.toString(2);
    var padLen = 7 - b2.length % 7;
    if (padLen == 7)
      padLen = 0;
    var bPad = "";
    for (var i2 = 0; i2 < padLen; i2++)
      bPad += "0";
    b2 = bPad + b2;
    for (var i2 = 0; i2 < b2.length - 1; i2 += 7) {
      var b8 = b2.substr(i2, 7);
      if (i2 != b2.length - 7)
        b8 = "1" + b8;
      h2 += itox(parseInt(b8, 2));
    }
    return h2;
  };
  KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
  this.hT = "06";
  this.setValueHex = function(newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  this.setValueOidString = function(oidString) {
    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h2 = "";
    var a2 = oidString.split(".");
    var i0 = parseInt(a2[0]) * 40 + parseInt(a2[1]);
    h2 += itox(i0);
    a2.splice(0, 2);
    for (var i2 = 0; i2 < a2.length; i2++) {
      h2 += roidtox(a2[i2]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = h2;
  };
  this.setValueName = function(oidName) {
    var oid = KJUR.asn1.x509.OID.name2oid(oidName);
    if (oid !== "") {
      this.setValueOidString(oid);
    } else {
      throw "DERObjectIdentifier oidName undefined: " + oidName;
    }
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (params !== void 0) {
    if (typeof params === "string") {
      if (params.match(/^[0-2].[0-9.]+$/)) {
        this.setValueOidString(params);
      } else {
        this.setValueName(params);
      }
    } else if (params.oid !== void 0) {
      this.setValueOidString(params.oid);
    } else if (params.hex !== void 0) {
      this.setValueHex(params.hex);
    } else if (params.name !== void 0) {
      this.setValueName(params.name);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DEREnumerated = function(params) {
  KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
  this.hT = "0a";
  this.setByBigInteger = function(bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  this.setByInteger = function(intValue) {
    var bi2 = new BigInteger(String(intValue), 10);
    this.setByBigInteger(bi2);
  };
  this.setValueHex = function(newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params["int"] != "undefined") {
      this.setByInteger(params["int"]);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params["hex"] != "undefined") {
      this.setValueHex(params["hex"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function(params) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
  this.hT = "0c";
};
YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function(params) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
  this.hT = "12";
};
YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function(params) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
  this.hT = "13";
};
YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function(params) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
  this.hT = "14";
};
YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function(params) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
  this.hT = "16";
};
YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function(params) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
  this.hT = "17";
  this.setByDate = function(dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, "utc");
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function() {
    if (typeof this.date == "undefined" && typeof this.s == "undefined") {
      this.date = /* @__PURE__ */ new Date();
      this.s = this.formatDate(this.date, "utc");
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== void 0) {
    if (params.str !== void 0) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
      this.setString(params);
    } else if (params.hex !== void 0) {
      this.setStringHex(params.hex);
    } else if (params.date !== void 0) {
      this.setByDate(params.date);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function(params) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
  this.hT = "18";
  this.withMillis = false;
  this.setByDate = function(dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, "gen", this.withMillis);
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function() {
    if (this.date === void 0 && this.s === void 0) {
      this.date = /* @__PURE__ */ new Date();
      this.s = this.formatDate(this.date, "gen", this.withMillis);
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== void 0) {
    if (params.str !== void 0) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
      this.setString(params);
    } else if (params.hex !== void 0) {
      this.setStringHex(params.hex);
    } else if (params.date !== void 0) {
      this.setByDate(params.date);
    }
    if (params.millis === true) {
      this.withMillis = true;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function(params) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
  this.hT = "30";
  this.getFreshValueHex = function() {
    var h2 = "";
    for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
      var asn1Obj = this.asn1Array[i2];
      h2 += asn1Obj.getEncodedHex();
    }
    this.hV = h2;
    return this.hV;
  };
};
YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function(params) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, params);
  this.hT = "31";
  this.sortFlag = true;
  this.getFreshValueHex = function() {
    var a2 = new Array();
    for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
      var asn1Obj = this.asn1Array[i2];
      a2.push(asn1Obj.getEncodedHex());
    }
    if (this.sortFlag == true)
      a2.sort();
    this.hV = a2.join("");
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params.sortflag != "undefined" && params.sortflag == false)
      this.sortFlag = false;
  }
};
YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function(params) {
  KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
  this.hT = "a0";
  this.hV = "";
  this.isExplicit = true;
  this.asn1Object = null;
  this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
    this.hT = tagNoHex;
    this.isExplicit = isExplicitFlag;
    this.asn1Object = asn1Object;
    if (this.isExplicit) {
      this.hV = this.asn1Object.getEncodedHex();
      this.hTLV = null;
      this.isModified = true;
    } else {
      this.hV = null;
      this.hTLV = asn1Object.getEncodedHex();
      this.hTLV = this.hTLV.replace(/^../, tagNoHex);
      this.isModified = false;
    }
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params["tag"] != "undefined") {
      this.hT = params["tag"];
    }
    if (typeof params["explicit"] != "undefined") {
      this.isExplicit = params["explicit"];
    }
    if (typeof params["obj"] != "undefined") {
      this.asn1Object = params["obj"];
      this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
var __extends = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var JSEncryptRSAKey = (
  /** @class */
  function(_super) {
    __extends(JSEncryptRSAKey2, _super);
    function JSEncryptRSAKey2(key2) {
      var _this = _super.call(this) || this;
      if (key2) {
        if (typeof key2 === "string") {
          _this.parseKey(key2);
        } else if (JSEncryptRSAKey2.hasPrivateKeyProperty(key2) || JSEncryptRSAKey2.hasPublicKeyProperty(key2)) {
          _this.parsePropertiesFrom(key2);
        }
      }
      return _this;
    }
    JSEncryptRSAKey2.prototype.parseKey = function(pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
        var asn1 = ASN1.decode(der);
        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }
        if (asn1.sub.length === 9) {
          modulus = asn1.sub[1].getHexStringValue();
          this.n = parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue();
          this.d = parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue();
          this.p = parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue();
          this.q = parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue();
          this.dmp1 = parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue();
          this.dmq1 = parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue();
          this.coeff = parseBigInt(coefficient, 16);
        } else if (asn1.sub.length === 2) {
          if (asn1.sub[0].sub) {
            var bit_string = asn1.sub[1];
            var sequence = bit_string.sub[0];
            modulus = sequence.sub[0].getHexStringValue();
            this.n = parseBigInt(modulus, 16);
            public_exponent = sequence.sub[1].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
          } else {
            modulus = asn1.sub[0].getHexStringValue();
            this.n = parseBigInt(modulus, 16);
            public_exponent = asn1.sub[1].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
          }
        } else {
          return false;
        }
        return true;
      } catch (ex) {
        return false;
      }
    };
    JSEncryptRSAKey2.prototype.getPrivateBaseKey = function() {
      var options = {
        array: [
          new KJUR.asn1.DERInteger({ int: 0 }),
          new KJUR.asn1.DERInteger({ bigint: this.n }),
          new KJUR.asn1.DERInteger({ int: this.e }),
          new KJUR.asn1.DERInteger({ bigint: this.d }),
          new KJUR.asn1.DERInteger({ bigint: this.p }),
          new KJUR.asn1.DERInteger({ bigint: this.q }),
          new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
          new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
          new KJUR.asn1.DERInteger({ bigint: this.coeff })
        ]
      };
      var seq = new KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    JSEncryptRSAKey2.prototype.getPrivateBaseKeyB64 = function() {
      return hex2b64(this.getPrivateBaseKey());
    };
    JSEncryptRSAKey2.prototype.getPublicBaseKey = function() {
      var first_sequence = new KJUR.asn1.DERSequence({
        array: [
          new KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          new KJUR.asn1.DERNull()
        ]
      });
      var second_sequence = new KJUR.asn1.DERSequence({
        array: [
          new KJUR.asn1.DERInteger({ bigint: this.n }),
          new KJUR.asn1.DERInteger({ int: this.e })
        ]
      });
      var bit_string = new KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex()
      });
      var seq = new KJUR.asn1.DERSequence({
        array: [first_sequence, bit_string]
      });
      return seq.getEncodedHex();
    };
    JSEncryptRSAKey2.prototype.getPublicBaseKeyB64 = function() {
      return hex2b64(this.getPublicBaseKey());
    };
    JSEncryptRSAKey2.wordwrap = function(str, width) {
      width = width || 64;
      if (!str) {
        return str;
      }
      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    JSEncryptRSAKey2.prototype.getPrivateKey = function() {
      var key2 = "-----BEGIN RSA PRIVATE KEY-----\n";
      key2 += JSEncryptRSAKey2.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key2 += "-----END RSA PRIVATE KEY-----";
      return key2;
    };
    JSEncryptRSAKey2.prototype.getPublicKey = function() {
      var key2 = "-----BEGIN PUBLIC KEY-----\n";
      key2 += JSEncryptRSAKey2.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key2 += "-----END PUBLIC KEY-----";
      return key2;
    };
    JSEncryptRSAKey2.hasPublicKeyProperty = function(obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
    };
    JSEncryptRSAKey2.hasPrivateKeyProperty = function(obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
    };
    JSEncryptRSAKey2.prototype.parsePropertiesFrom = function(obj) {
      this.n = obj.n;
      this.e = obj.e;
      if (obj.hasOwnProperty("d")) {
        this.d = obj.d;
        this.p = obj.p;
        this.q = obj.q;
        this.dmp1 = obj.dmp1;
        this.dmq1 = obj.dmq1;
        this.coeff = obj.coeff;
      }
    };
    return JSEncryptRSAKey2;
  }(RSAKey)
);
var _a;
var version = typeof process !== "undefined" ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_package_version : void 0;
var JSEncrypt = (
  /** @class */
  function() {
    function JSEncrypt2(options) {
      if (options === void 0) {
        options = {};
      }
      options = options || {};
      this.default_key_size = options.default_key_size ? parseInt(options.default_key_size, 10) : 1024;
      this.default_public_exponent = options.default_public_exponent || "010001";
      this.log = options.log || false;
      this.key = null;
    }
    JSEncrypt2.prototype.setKey = function(key2) {
      if (this.log && this.key) {
        console.warn("A key was already set, overriding existing.");
      }
      this.key = new JSEncryptRSAKey(key2);
    };
    JSEncrypt2.prototype.setPrivateKey = function(privkey) {
      this.setKey(privkey);
    };
    JSEncrypt2.prototype.setPublicKey = function(pubkey) {
      this.setKey(pubkey);
    };
    JSEncrypt2.prototype.decrypt = function(str) {
      try {
        return this.getKey().decrypt(b64tohex(str));
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.encrypt = function(str) {
      try {
        return hex2b64(this.getKey().encrypt(str));
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.sign = function(str, digestMethod, digestName) {
      try {
        return hex2b64(this.getKey().sign(str, digestMethod, digestName));
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.verify = function(str, signature, digestMethod) {
      try {
        return this.getKey().verify(str, b64tohex(signature), digestMethod);
      } catch (ex) {
        return false;
      }
    };
    JSEncrypt2.prototype.getKey = function(cb2) {
      if (!this.key) {
        this.key = new JSEncryptRSAKey();
        if (cb2 && {}.toString.call(cb2) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb2);
          return;
        }
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    };
    JSEncrypt2.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey();
    };
    JSEncrypt2.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64();
    };
    JSEncrypt2.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey();
    };
    JSEncrypt2.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64();
    };
    JSEncrypt2.version = version;
    return JSEncrypt2;
  }()
);
const source = "1";
const channelSource = "sx";
const key = "e7c398ffcb2d4824b4d0a703e38eb0bb";
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrd3xz+j7NoyIf5v3jYOeT+26YrgINczkj7E8rGoOGZHTmpbRxDIWGGglNhPEQlFhaAN5MA9Su48kng9QxZ9qWuWMket7paGcDmQJCv0NRISTz7/VaJnYjKyNfTNsGRMqMq6Ef8ZBcOv9wZkygfNvY81nPaiIOA6Erj8iCOeyoNwIDAQAB";
const txsmLink = "https://txsm-m.jd.com/?babelChannel=ttt44";
const MD5KEY = "e7c398ffcb2d4824b4d0a703e38eb0bb";
var ServiceType = /* @__PURE__ */ ((ServiceType2) => {
  ServiceType2["huafei"] = "1";
  ServiceType2["flow"] = "2";
  ServiceType2["game"] = "3";
  return ServiceType2;
})(ServiceType || {});
var PayStatus = /* @__PURE__ */ ((PayStatus2) => {
  PayStatus2[PayStatus2["unknown"] = 0] = "unknown";
  PayStatus2[PayStatus2["waitPay"] = 1] = "waitPay";
  PayStatus2[PayStatus2["paid"] = 2] = "paid";
  PayStatus2[PayStatus2["cancelled"] = 3] = "cancelled";
  PayStatus2[PayStatus2["refunded"] = 4] = "refunded";
  return PayStatus2;
})(PayStatus || {});
const environment = () => {
  const jmfe2 = window.jmfe;
  if (jmfe2.isApp("jd"))
    return "2";
  if (jmfe2.isApp("jdlittle"))
    return "4";
  if (jmfe2.isApp("wx") || jmfe2.isApp("qq"))
    return "3";
  return "1";
};
const rechargeversion = "12.8";
const moduleName = "JDReactVirtualRecharge";
var OrderDetailEvent = /* @__PURE__ */ ((OrderDetailEvent2) => {
  OrderDetailEvent2[OrderDetailEvent2["connect"] = 0] = "connect";
  OrderDetailEvent2[OrderDetailEvent2["cancel"] = 1] = "cancel";
  OrderDetailEvent2[OrderDetailEvent2["goToPay"] = 2] = "goToPay";
  OrderDetailEvent2[OrderDetailEvent2["copy"] = 3] = "copy";
  OrderDetailEvent2[OrderDetailEvent2["seekShop"] = 4] = "seekShop";
  OrderDetailEvent2[OrderDetailEvent2["buyAgain"] = 5] = "buyAgain";
  OrderDetailEvent2[OrderDetailEvent2["banner"] = 6] = "banner";
  OrderDetailEvent2[OrderDetailEvent2["feedInfo"] = 7] = "feedInfo";
  return OrderDetailEvent2;
})(OrderDetailEvent || {});
function orderDetailEventId(event, serviceType) {
  switch (serviceType) {
    case "3":
      return "M3CCardOrder" + {
        [
          0
          /* connect */
        ]: "_Connect",
        [
          1
          /* cancel */
        ]: "_cancel",
        [
          2
          /* goToPay */
        ]: "_GoToPay",
        [
          3
          /* copy */
        ]: "_Copy",
        [
          4
          /* seekShop */
        ]: "_SeekShop",
        [
          5
          /* buyAgain */
        ]: "_BuyAgain",
        [
          6
          /* banner */
        ]: "_adslot_cl",
        [
          7
          /* feedInfo */
        ]: "_goodsfeed_cl"
      }[event];
    default:
      return "HFOrder" + {
        [
          0
          /* connect */
        ]: "_Userconsult",
        [
          1
          /* cancel */
        ]: "_CancelOrd",
        [
          2
          /* goToPay */
        ]: "_GoPay",
        [
          3
          /* copy */
        ]: "_CopyOrdernum",
        [
          4
          /* seekShop */
        ]: "_ShopQualification",
        [
          5
          /* buyAgain */
        ]: "_BuyTwice",
        [
          6
          /* banner */
        ]: "_adslot_cl",
        [
          7
          /* feedInfo */
        ]: "_goodsfeed_cl"
      }[event];
  }
}
var formType = /* @__PURE__ */ ((formType2) => {
  formType2[formType2["input"] = 1] = "input";
  formType2[formType2["select"] = 2] = "select";
  return formType2;
})(formType || {});
var chargeType = /* @__PURE__ */ ((chargeType2) => {
  chargeType2[chargeType2["ChargeModePWD"] = 1] = "ChargeModePWD";
  chargeType2[chargeType2["ChargeModeStraight"] = 2] = "ChargeModeStraight";
  return chargeType2;
})(chargeType || {});
const QQ_GAME_DES_KEY = "2E1ZMAF88CCE5EBE551FR3E9AA6FF322";
const DEFAULT_ERR_MSG = "商品太火爆，请稍后重试";
const CARD_VERSION = "1.10";
const JD_APP_SOURCE = 5;
const ADDRESS = "address";
const importHack = (module2, moduleName2) => {
  if (typeof module2 === "function") {
    return module2;
  }
  if (module2.default) {
    return module2.default;
  }
  const wModule = window[moduleName2];
  if (wModule) {
    return wModule.default ? wModule.default : wModule;
  }
  if (module2) {
    return module2;
  }
  throw new Error("无法处理模块 : ".concat(moduleName2));
};
const envs = { "VITE_APP_NAME": "recharge", "VITE_APP_BASE_URL": "", "VITE_APP_BASE_URL_COLOR": "https://api.m.jd.com", "VITE_APP_STATIC_URL": "//storage.360buyimg.com", "VITE_APP_WQ_BIZID": "rdcactivity", "VITE_APP_WQ_APPID": "773", "VITE_APP_BROWSER_VERSION": "['not IE 11', 'ios11', 'Chrome 64']", "VITE_APP_LOCAL_USE_MOCK": "false", "VITE_APP_PROD_USE_CHUNK_MOCK": "false", "VITE_APP_MOBILE_DEVICE": "true", "VITE_APP_SDAPPID": "8e94a", "VITE_APP_COLOR_APPID": "tsw-m", "VITE_APP_COLOR_FUNCTION": "zyoungster_h5_api", "VITE_APP_OSS_BUCKET": "dlxt", "VITE_APP_OSS_ACCESS_KEY": "09qeZL2GXnXvieq0", "VITE_APP_OSS_SECERT_KEY": "9tGJuy4iN2ZFmBn7dM18kJNConAKZP2DKq5P5MUk", "VITE_APP_CARD_SETTLEMENT_URL": "//recharge.m.jd.com/cardSettlement?source=5&skuId=", "BASE_URL": "//storage.360buyimg.com/dlxt/recharge/2d8254d", "MODE": "production", "DEV": false, "PROD": true, "SSR": false, "LEGACY": false };
const { VITE_APP_MOBILE_DEVICE = "false" } = envs;
const jmfe = window.jmfe;
const INJECT_MOBILE_ACTION = {
  // 移动端meta注入
  registerMobileMeta: () => {
    const _meta = document.createElement("meta");
    _meta.name = "viewport";
    _meta.content = "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName("head")[0].appendChild(_meta);
  },
  // FastClick => 300ms延迟
  registerFastClick: () => {
    const FastClick = importHack(FastClickModule, "FastClick");
    try {
      if ("addEventListener" in document) {
        document.addEventListener(
          "DOMContentLoaded",
          () => {
            FastClick && FastClick.attach(document.body);
          },
          false
        );
      }
    } catch (err) {
    }
  }
};
const registerLibrary = () => {
  if (JSON.parse(VITE_APP_MOBILE_DEVICE)) {
    Promise.all(Object.values(INJECT_MOBILE_ACTION)).then((_injects) => {
      Promise.resolve(_injects);
    });
  }
};
const getQueryString = (name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r2 = window.location.search.substr(1).match(reg);
  if (r2 !== null) {
    return unescape(r2[2]);
  }
  return "";
};
const getQueries = (url = location.search) => {
  if (url) {
    if (url.indexOf("?") !== -1) {
      url = url.slice(url.indexOf("?") + 1);
    }
    const entries = url.split("&").map((e2) => {
      const pair = e2.split("=");
      if (pair && pair.length === 2 && pair[0] && pair[1]) {
        return [pair[0], decodeURIComponent(pair[1])];
      }
      return [];
    }).filter((e2) => e2.length === 2);
    return Object.fromEntries(entries || []);
  }
  return {};
};
const transformTelAddSpace = (number = "") => {
  return number.split("").reduce((curr, item, idx) => {
    (idx === 3 || idx === 7) && curr.push(" ");
    curr.push(item);
    return curr;
  }, []).join("");
};
const encryptRsa = (val) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const rsaPassWord = encryptor.encrypt(val);
  return String(rsaPassWord);
};
const reportPv = (pageId) => {
  try {
    const MPing = window.MPing;
    const pv = new MPing.inputs.PV({
      page_id: pageId
    });
    const mping = new MPing();
    mping.send(pv);
  } catch (err) {
  }
};
const reportClick = (eventId, pageId, jsonParam = false, eventParam = false, pageParam = false) => {
  try {
    const MPing = window.MPing;
    const click = new MPing.inputs.Click(eventId);
    if (jsonParam) {
      click.json_param = jsonParam;
    }
    if (eventParam) {
      click.event_param = eventParam;
    }
    if (pageParam) {
      click.page_param = pageParam;
    }
    if (pageId) {
      click.page_id = pageId;
    }
    click.updateEventSeries();
    const mping = new MPing();
    mping.send(click);
  } catch (err) {
  }
};
const reportMetaOrder = (pageId, ordId, skuId, price) => {
  try {
    const MPing = window.MPing;
    const orderId = "" + ordId;
    const totalPrice = "" + price;
    const skuIds = skuId;
    const mping = new MPing();
    for (let i2 = 0; i2 < skuIds.length; i2++) {
      const ord = new MPing.inputs.Order(skuIds[i2]);
      ord.sale_ord_id = orderId;
      ord.order_total_fee = totalPrice;
      ord.skuid = skuIds[i2];
      ord.page_id = pageId;
      mping.send(ord);
    }
  } catch (err) {
  }
};
const onHandleMobileNav = (json) => {
  var _a2, _b, _c, _d, _e;
  if (jmfe.isApp("jd")) {
    if (jmfe.isIOS()) {
      (_c = (_b = (_a2 = window.webkit) == null ? void 0 : _a2.messageHandlers) == null ? void 0 : _b.MobileNavi) == null ? void 0 : _c.postMessage({
        method: "configNavigationBar",
        params: JSON.stringify(json)
      });
    } else {
      window.MobileNavi && ((_e = (_d = window.MobileNavi).configNavigationBar) == null ? void 0 : _e.call(_d, JSON.stringify(json)));
    }
  }
};
const getNaviBarBottom = () => {
  return jmfe.getNavigationStatusHeight().then((response = {}) => {
    if (jmfe.isIOS()) {
      const { status, data } = response;
      if (status === "0" && data) {
        const { statusBarHeight, navigationHeight } = data;
        return statusBarHeight + navigationHeight;
      }
    } else {
      const { statusBarHeight, navigationHeight } = response;
      return statusBarHeight + navigationHeight;
    }
    return 0;
  });
};
const hideNaviHandler = (naviMenuType = "wb") => {
  onHandleMobileNav({
    supportTran: "1",
    tranParams: {
      hideNavi: "0",
      // 注意是字符串"1" 展示导航栏
      naviMenuType
    }
  });
};
const checkSystem = () => {
  const u2 = window.navigator.userAgent;
  const isAndroid = u2.indexOf("Android") > -1 || u2.indexOf("Linux") > -1;
  const isIOS = !!u2.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid) {
    return "android";
  }
  if (isIOS) {
    return "ios";
  }
};
async function cp(value, callback) {
  var _a2;
  if (((_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText) && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(value);
      return callback == null ? void 0 : callback(true);
    } catch (error) {
    }
  }
  function selectText(x2) {
    if (document.selection) {
      const range = document.body.createTextRange();
      range.moveToElementText(x2);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      selection == null ? void 0 : selection.removeAllRanges();
      range.selectNodeContents(x2);
      selection == null ? void 0 : selection.addRange(range);
    }
  }
  const $input = document.createElement("div");
  $input.style.opacity = "0";
  $input.style.position = "absoulte";
  $input.style.webkitUserSelect = "text";
  $input.style.userSelect = "text";
  $input.innerText = value;
  document.body.appendChild($input);
  selectText($input);
  const result = document.execCommand("copy");
  callback && callback(result);
}
function webviewRedirect(url) {
  const agent = navigator.userAgent.toLowerCase();
  if (!url) {
    return false;
  }
  if (agent.indexOf("jdapp") >= 0) {
    const href = 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","action":"to","url":"' + encodeURIComponent(url) + '"}';
    window.location.href = href;
    return true;
  } else {
    window.location.href = url;
    return true;
  }
}
const isHarmony = () => {
  var _a2;
  return (_a2 = window.jmfe) == null ? void 0 : _a2.isHarmony();
};
const jumpToDongDong = (orderId, orderValue, orderTime, productUrl = "", venderId, entry = "jd_phone_order_shoujichongzhi") => {
  let href = "";
  const jmfeCur = window.jmfe;
  if ((jmfeCur == null ? void 0 : jmfeCur.isAndroid()) && (jmfeCur == null ? void 0 : jmfeCur.isApp("jd")) && (jmfeCur == null ? void 0 : jmfeCur.versionCompare("10.1.6", jmfeCur == null ? void 0 : jmfeCur.getAppVersion("jd"))) > 0) {
    href = 'openApp.jdMobile://virtual?params={"category":"jump","des":"im","orderId":"' + orderId + '","entry":"' + entry + '","venderId":"' + (venderId || "") + '","orderValue":"' + orderValue + '","orderTime":"' + orderTime + '","from":"com.jd.start.dd.entryask","customer_type":"1","productUrl":"' + productUrl + '"}';
  } else if ((jmfeCur == null ? void 0 : jmfeCur.isApp("jd")) && !isHarmony()) {
    href = 'openApp.jdMobile://virtual?params={"category":"jump","des":"jd_dongdong_chat","orderId":"' + orderId + '","entry":"' + entry + '","venderId":"' + (venderId || "") + '"}';
  } else {
    href = "https://jdcs.m.jd.com/chat/index.action?entry=m_order_sj&orderId=".concat(orderId, "&venderId=").concat(venderId);
  }
  window.location.href = href;
};
const getCardClientParam = () => {
  let param = {};
  const source2 = getQueryString("source");
  if (jmfe.isIOS()) {
    param = { appKey: "apple" };
  } else if (jmfe.isAndroid()) {
    param = { appKey: "android" };
  } else if (isHarmony()) {
    param = { appKey: "harmony" };
  } else {
    param = { appKey: "android" };
  }
  param = { ...param, source: Number(source2) };
  if (jmfe.isApp("jd")) {
    param = { ...param, source: JD_APP_SOURCE };
  }
  return param;
};
function getCookieJDV(name, noDecode) {
  const arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  let res = "";
  if (arr !== null) {
    if (noDecode) {
      res = arr[2];
    } else {
      try {
        res = decodeURIComponent(arr[2]);
      } catch (e2) {
        res = arr[2];
      }
    }
  }
  return res;
}
const getClientParams = async () => {
  const res = await new Promise((resolve) => {
    jmfe.getDeviceInfo().then(({ status, data }) => {
      if (status === "0") {
        setTimeout(() => {
          resolve(data);
        }, 0);
      }
    }).catch(() => resolve({}));
  });
  const { uuid = "", systemVersion = "", appVersion = "" } = res || {};
  const clientVersion = appVersion;
  const osVersion = systemVersion;
  const screen = "".concat(window.screen.width * window.devicePixelRatio, "*").concat(window.screen.height * window.devicePixelRatio);
  const client = getClientType();
  return {
    clientVersion,
    osVersion,
    screen,
    uuid,
    // 设备唯一编号客户端 app必传(加密传输)
    client
  };
};
const getClientType = () => {
  var _a2, _b;
  const isIOSFlag = (_a2 = window.jmfe) == null ? void 0 : _a2.isIOS();
  const isAndroidFlag = (_b = window.jmfe) == null ? void 0 : _b.isAndroid();
  const isHarmonyFlag = isHarmony();
  let client = "";
  if (isIOSFlag) {
    client = "apple";
  } else if (isAndroidFlag) {
    client = "android";
  } else if (isHarmonyFlag) {
    client = "m";
  }
  return client;
};
const goBack = () => {
  if (jmfe.isJDApp()) {
    jmfe.goBackRouter();
  } else {
    window.history.go(-1);
  }
};
const jumpUrl = (url) => {
  var _a2;
  url && ((_a2 = window.jmfe) == null ? void 0 : _a2.toAny(url));
};
const encryStr = (originStr, showCount, placeHolderCharater) => {
  if (originStr && typeof originStr === "string" && originStr.length > showCount) {
    let tarStr = originStr;
    let tarCountToHide = originStr.length - showCount;
    let palceHodlerStr = "";
    const maxLength = 10;
    tarCountToHide = Math.min(tarCountToHide, maxLength);
    for (let index2 = 0; index2 < tarCountToHide; index2++) {
      palceHodlerStr = palceHodlerStr.concat(placeHolderCharater);
    }
    tarStr = originStr.slice(0, showCount) + palceHodlerStr;
    return tarStr;
  } else {
    return originStr;
  }
};
const container = document.getElementById("root");
registerLibrary();
if (container) {
  const root = createRoot(container);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
}
if (window.jmfe) {
  const { isJDApp, isHarmony: isHarmony2, versionCompare, getAppVersion, callRouter } = window.jmfe;
  const routerURL = "router://JDBaseUtilsModule/isUI14Enable";
  const params = {
    routerURL,
    routerParam: {},
    jdRouter: "1"
  };
  const hasUI14Switch = isJDApp() && !isHarmony2() && versionCompare(getAppVersion("jd") || "", "13.6.6") >= 0;
  hasUI14Switch && callRouter(params).then(({ status, data }) => {
    if (status === "0" && Number(data) === 1) {
      document.documentElement.setAttribute("data-theme", "v14");
    }
  }).catch((e2) => {
    console.warn("callRouter isUI14Enable", e2);
  });
}
export {
  setLoading as $,
  setCouponBatchId as A,
  setCouponType as B,
  setBeanSelected as C,
  setBeanCount as D,
  setFinalPrice as E,
  getCookieJDV as F,
  getClientParams as G,
  txsmLink as H,
  setSkuPrice as I,
  setFacePrice as J,
  setVenderId as K,
  setFillType as L,
  updateDynamicForm as M,
  formType as N,
  jumpUrl as O,
  setAutoFeeProtocalCheck as P,
  updateSubmitBtnTxt as Q,
  React__default as R,
  setAutoFeeSkuSelect as S,
  getCardClientParam as T,
  DEFAULT_ERR_MSG as U,
  CARD_VERSION as V,
  QQ_GAME_DES_KEY as W,
  ADDRESS as X,
  chargeType as Y,
  goBack as Z,
  _defineProperty as _,
  __vite_legacy_guard,
  setPhoneNo$1 as a,
  setSkuDetail as a0,
  setDynamicForms as a1,
  setCouponUseNotice as a2,
  setMaxBuyCount as a3,
  updateSkuPrice as a4,
  setPayInfo as a5,
  setOriginDiscountInfo as a6,
  updatePayFinnal as a7,
  setDisCountInfo as a8,
  updateBuyCount as a9,
  ReactDOM as aA,
  getAugmentedNamespace as aB,
  router as aC,
  toPropertyKey as aD,
  ReactDOM$1 as aE,
  setAutoFeeLinkInfo as aa,
  ReactReduxContext as ab,
  useReduxContext as ac,
  createReduxContextHook as ad,
  useSelector as ae,
  _typeof as af,
  ServiceType as ag,
  moduleName as ah,
  rechargeversion as ai,
  PayStatus as aj,
  orderDetailEventId as ak,
  OrderDetailEvent as al,
  webviewRedirect as am,
  cp as an,
  encryStr as ao,
  MD5KEY as ap,
  getQueries as aq,
  isHarmony as ar,
  hideNaviHandler as as,
  getNaviBarBottom as at,
  jumpToDongDong as au,
  getDefaultExportFromCjs as av,
  commonjsGlobal as aw,
  createRoot as ax,
  useSearchParams as ay,
  reactDomExports as az,
  checkSystem as b,
  channelSource as c,
  reportClick as d,
  setBeanSelected$1 as e,
  setCouponBatchId$1 as f,
  getQueryString as g,
  setCouponSelectedIndex$1 as h,
  index as i,
  jsxRuntimeExports as j,
  key as k,
  setFinalPrice$1 as l,
  setBeanCount$1 as m,
  encryptRsa as n,
  reportMetaOrder as o,
  reportPv as p,
  setSkuPrice$1 as q,
  reactExports as r,
  source as s,
  transformTelAddSpace as t,
  useNavigate as u,
  environment as v,
  setPhoneNo as w,
  setIsp as x,
  setAreaCode as y,
  setCouponSelectedIndex as z
};
