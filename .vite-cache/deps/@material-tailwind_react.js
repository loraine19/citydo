"use client";
import {
  require_react_dom
} from "./chunk-2YVMFDJ2.js";
import {
  require_jsx_runtime
} from "./chunk-24WYNIL6.js";
import {
  require_react
} from "./chunk-QLJLW6ED.js";
import {
  __commonJS,
  __toESM
} from "./chunk-PR4QN5HX.js";

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// node_modules/material-ripple-effects/index.js
var require_material_ripple_effects = __commonJS({
  "node_modules/material-ripple-effects/index.js"(exports, module) {
    module.exports = class Ripple {
      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }
      findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
        this.x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
        this.y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
        this.z = Math.hypot(
          this.x - (clickPointX - offsetX),
          this.y - (clickPointY - offsetY)
        );
        return this.z;
      }
      appyStyles(element, color, rect, radius, event) {
        element.classList.add("ripple");
        element.style.backgroundColor = color === "dark" ? "rgba(0,0,0, 0.2)" : "rgba(255,255,255, 0.3)";
        element.style.borderRadius = "50%";
        element.style.pointerEvents = "none";
        element.style.position = "absolute";
        element.style.left = event.clientX - rect.left - radius + "px";
        element.style.top = event.clientY - rect.top - radius + "px";
        element.style.width = element.style.height = radius * 2 + "px";
      }
      applyAnimation(element) {
        element.animate(
          [
            {
              transform: "scale(0)",
              opacity: 1
            },
            {
              transform: "scale(1.5)",
              opacity: 0
            }
          ],
          {
            duration: 500,
            easing: "linear"
          }
        );
      }
      create(event, color) {
        const element = event.currentTarget;
        element.style.position = "relative";
        element.style.overflow = "hidden";
        const rect = element.getBoundingClientRect();
        const radius = this.findFurthestPoint(
          event.clientX,
          element.offsetWidth,
          rect.left,
          event.clientY,
          element.offsetHeight,
          rect.top
        );
        const circle = document.createElement("span");
        this.appyStyles(circle, color, rect, radius, event);
        this.applyAnimation(circle);
        element.appendChild(circle);
        setTimeout(() => circle.remove(), 500);
      }
    };
  }
});

// node_modules/@material-tailwind/react/dist/chunk-AXCKF2IS.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/hex-rgb/index.js
var hexCharacters = "a-f\\d";
var match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
var match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
var nonHexChars = new RegExp(`[^#${hexCharacters}]`, "gi");
var validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, "i");
function hexRgb(hex, options = {}) {
  if (typeof hex !== "string" || nonHexChars.test(hex) || !validHexSize.test(hex)) {
    throw new TypeError("Expected a valid hex string");
  }
  hex = hex.replace(/^#/, "");
  let alphaFromHex = 1;
  if (hex.length === 8) {
    alphaFromHex = Number.parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }
  if (hex.length === 4) {
    alphaFromHex = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = number >> 8 & 255;
  const blue = number & 255;
  const alpha = typeof options.alpha === "number" ? options.alpha : alphaFromHex;
  if (options.format === "array") {
    return [red, green, blue, alpha];
  }
  if (options.format === "css") {
    const alphaString = alpha === 1 ? "" : ` / ${Number((alpha * 100).toFixed(2))}%`;
    return `rgb(${red} ${green} ${blue}${alphaString})`;
  }
  return { red, green, blue, alpha };
}

// node_modules/@material-tailwind/react/dist/chunk-AR6FBTF5.js
var require_createPlugin = __commonJS2({
  "../../node_modules/.pnpm/tailwindcss@3.4.13/node_modules/tailwindcss/lib/util/createPlugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    function createPlugin(plugin2, config) {
      return {
        handler: plugin2,
        config
      };
    }
    createPlugin.withOptions = function(pluginFunction, configFunction = () => ({})) {
      const optionsFunction = function(options) {
        return {
          __options: options,
          handler: pluginFunction(options),
          config: configFunction(options)
        };
      };
      optionsFunction.__isOptionsFunction = true;
      optionsFunction.__pluginFunction = pluginFunction;
      optionsFunction.__configFunction = configFunction;
      return optionsFunction;
    };
    var _default = createPlugin;
  }
});
var require_create_plugin = __commonJS2({
  "../../node_modules/.pnpm/tailwindcss@3.4.13/node_modules/tailwindcss/lib/public/create-plugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    var _createPlugin = _interop_require_default(require_createPlugin());
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var _default = _createPlugin.default;
  }
});
var require_plugin = __commonJS2({
  "../../node_modules/.pnpm/tailwindcss@3.4.13/node_modules/tailwindcss/plugin.js"(exports, module) {
    "use strict";
    var createPlugin = require_create_plugin();
    module.exports = (createPlugin.__esModule ? createPlugin : { default: createPlugin }).default;
  }
});
var require_tailwindcss_animate = __commonJS2({
  "../../node_modules/.pnpm/tailwindcss-animate@1.0.7_tailwindcss@3.4.13/node_modules/tailwindcss-animate/index.js"(exports, module) {
    "use strict";
    var plugin2 = require_plugin();
    function filterDefault(values) {
      return Object.fromEntries(
        Object.entries(values).filter(([key]) => key !== "DEFAULT")
      );
    }
    module.exports = plugin2(
      ({ addUtilities, matchUtilities, theme: theme2 }) => {
        addUtilities({
          "@keyframes enter": theme2("keyframes.enter"),
          "@keyframes exit": theme2("keyframes.exit"),
          ".animate-in": {
            animationName: "enter",
            animationDuration: theme2("animationDuration.DEFAULT"),
            "--tw-enter-opacity": "initial",
            "--tw-enter-scale": "initial",
            "--tw-enter-rotate": "initial",
            "--tw-enter-translate-x": "initial",
            "--tw-enter-translate-y": "initial"
          },
          ".animate-out": {
            animationName: "exit",
            animationDuration: theme2("animationDuration.DEFAULT"),
            "--tw-exit-opacity": "initial",
            "--tw-exit-scale": "initial",
            "--tw-exit-rotate": "initial",
            "--tw-exit-translate-x": "initial",
            "--tw-exit-translate-y": "initial"
          }
        });
        matchUtilities(
          {
            "fade-in": (value) => ({ "--tw-enter-opacity": value }),
            "fade-out": (value) => ({ "--tw-exit-opacity": value })
          },
          { values: theme2("animationOpacity") }
        );
        matchUtilities(
          {
            "zoom-in": (value) => ({ "--tw-enter-scale": value }),
            "zoom-out": (value) => ({ "--tw-exit-scale": value })
          },
          { values: theme2("animationScale") }
        );
        matchUtilities(
          {
            "spin-in": (value) => ({ "--tw-enter-rotate": value }),
            "spin-out": (value) => ({ "--tw-exit-rotate": value })
          },
          { values: theme2("animationRotate") }
        );
        matchUtilities(
          {
            "slide-in-from-top": (value) => ({
              "--tw-enter-translate-y": `-${value}`
            }),
            "slide-in-from-bottom": (value) => ({
              "--tw-enter-translate-y": value
            }),
            "slide-in-from-left": (value) => ({
              "--tw-enter-translate-x": `-${value}`
            }),
            "slide-in-from-right": (value) => ({
              "--tw-enter-translate-x": value
            }),
            "slide-out-to-top": (value) => ({
              "--tw-exit-translate-y": `-${value}`
            }),
            "slide-out-to-bottom": (value) => ({
              "--tw-exit-translate-y": value
            }),
            "slide-out-to-left": (value) => ({
              "--tw-exit-translate-x": `-${value}`
            }),
            "slide-out-to-right": (value) => ({
              "--tw-exit-translate-x": value
            })
          },
          { values: theme2("animationTranslate") }
        );
        matchUtilities(
          { duration: (value) => ({ animationDuration: value }) },
          { values: filterDefault(theme2("animationDuration")) }
        );
        matchUtilities(
          { delay: (value) => ({ animationDelay: value }) },
          { values: theme2("animationDelay") }
        );
        matchUtilities(
          { ease: (value) => ({ animationTimingFunction: value }) },
          { values: filterDefault(theme2("animationTimingFunction")) }
        );
        addUtilities({
          ".running": { animationPlayState: "running" },
          ".paused": { animationPlayState: "paused" }
        });
        matchUtilities(
          { "fill-mode": (value) => ({ animationFillMode: value }) },
          { values: theme2("animationFillMode") }
        );
        matchUtilities(
          { direction: (value) => ({ animationDirection: value }) },
          { values: theme2("animationDirection") }
        );
        matchUtilities(
          { repeat: (value) => ({ animationIterationCount: value }) },
          { values: theme2("animationRepeat") }
        );
      },
      {
        theme: {
          extend: {
            animationDelay: ({ theme: theme2 }) => ({
              ...theme2("transitionDelay")
            }),
            animationDuration: ({ theme: theme2 }) => ({
              0: "0ms",
              ...theme2("transitionDuration")
            }),
            animationTimingFunction: ({ theme: theme2 }) => ({
              ...theme2("transitionTimingFunction")
            }),
            animationFillMode: {
              none: "none",
              forwards: "forwards",
              backwards: "backwards",
              both: "both"
            },
            animationDirection: {
              normal: "normal",
              reverse: "reverse",
              alternate: "alternate",
              "alternate-reverse": "alternate-reverse"
            },
            animationOpacity: ({ theme: theme2 }) => ({
              DEFAULT: 0,
              ...theme2("opacity")
            }),
            animationTranslate: ({ theme: theme2 }) => ({
              DEFAULT: "100%",
              ...theme2("translate")
            }),
            animationScale: ({ theme: theme2 }) => ({
              DEFAULT: 0,
              ...theme2("scale")
            }),
            animationRotate: ({ theme: theme2 }) => ({
              DEFAULT: "30deg",
              ...theme2("rotate")
            }),
            animationRepeat: {
              0: "0",
              1: "1",
              infinite: "infinite"
            },
            keyframes: {
              enter: {
                from: {
                  opacity: "var(--tw-enter-opacity, 1)",
                  transform: "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))"
                }
              },
              exit: {
                to: {
                  opacity: "var(--tw-exit-opacity, 1)",
                  transform: "translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))"
                }
              }
            }
          }
        }
      }
    );
  }
});
var import_plugin = __toESM2(require_plugin(), 1);
var import_tailwindcss_animate = __toESM2(require_tailwindcss_animate(), 1);
function getRgbChannels(hex) {
  const { red, green, blue } = hexRgb(hex);
  return `${red} ${green} ${blue}`;
}
var mtConfig = import_plugin.default.withOptions(
  function(options) {
    return function({ addBase }) {
      addBase({
        ":root": {
          /* border radius */
          "--radius": options?.radius || "1.5rem",
          /* fonts */
          "--font-sans": options?.fonts?.sans || "Inter",
          "--font-serif": options?.fonts?.serif || "",
          "--font-mono": options?.fonts?.mono || "Fira Code",
          /* base colors */
          "--color-background": getRgbChannels(
            options?.colors?.background || "#ffffff"
          ),
          "--color-foreground": getRgbChannels(
            options?.colors?.foreground || "#475569"
          ),
          "--color-black": getRgbChannels(options?.colors?.black || "#020617"),
          "--color-white": getRgbChannels(options?.colors?.white || "#ffffff"),
          /* surface color */
          "--color-surface": getRgbChannels(
            options?.colors?.surface?.default || "#e2e8f0"
          ),
          "--color-surface-dark": getRgbChannels(
            options?.colors?.surface?.dark || "#cbd5e1"
          ),
          "--color-surface-light": getRgbChannels(
            options?.colors?.surface?.light || "#f1f5f9"
          ),
          "--color-surface-foreground": getRgbChannels(
            options?.colors?.surface?.foreground || "#020617"
          ),
          /* primary color */
          "--color-primary": getRgbChannels(
            options?.colors?.primary?.default || "#1e293b"
          ),
          "--color-primary-dark": getRgbChannels(
            options?.colors?.primary?.dark || "#0f172a"
          ),
          "--color-primary-light": getRgbChannels(
            options?.colors?.primary?.light || "#334155"
          ),
          "--color-primary-foreground": getRgbChannels(
            options?.colors?.primary?.foreground || "#f8fafc"
          ),
          /* secondary color */
          "--color-secondary": getRgbChannels(
            options?.colors?.secondary?.default || "#e2e8f0"
          ),
          "--color-secondary-dark": getRgbChannels(
            options?.colors?.secondary?.dark || "#cbd5e1"
          ),
          "--color-secondary-light": getRgbChannels(
            options?.colors?.secondary?.light || "#f1f5f9"
          ),
          "--color-secondary-foreground": getRgbChannels(
            options?.colors?.secondary?.foreground || "#020617"
          ),
          /* info color */
          "--color-info": getRgbChannels(
            options?.colors?.info?.default || "#0062ff"
          ),
          "--color-info-dark": getRgbChannels(
            options?.colors?.info?.dark || "#0055dd"
          ),
          "--color-info-light": getRgbChannels(
            options?.colors?.info?.light || "#007aff"
          ),
          "--color-info-foreground": getRgbChannels(
            options?.colors?.info?.foreground || "#f8fafc"
          ),
          /* success color */
          "--color-success": getRgbChannels(
            options?.colors?.success?.default || "#00bf6b"
          ),
          "--color-success-dark": getRgbChannels(
            options?.colors?.success?.dark || "#00a35f"
          ),
          "--color-success-light": getRgbChannels(
            options?.colors?.success?.light || "#02e585"
          ),
          "--color-success-foreground": getRgbChannels(
            options?.colors?.success?.foreground || "#f8fafc"
          ),
          /* warning color */
          "--color-warning": getRgbChannels(
            options?.colors?.warning?.default || "#fca327"
          ),
          "--color-warning-dark": getRgbChannels(
            options?.colors?.warning?.dark || "#f67d0a"
          ),
          "--color-warning-light": getRgbChannels(
            options?.colors?.warning?.light || "#fdba4c"
          ),
          "--color-warning-foreground": getRgbChannels(
            options?.colors?.warning?.foreground || "#f8fafc"
          ),
          /* error color */
          "--color-error": getRgbChannels(
            options?.colors?.error?.default || "#ef4444"
          ),
          "--color-error-dark": getRgbChannels(
            options?.colors?.error?.dark || "#dc2626"
          ),
          "--color-error-light": getRgbChannels(
            options?.colors?.error?.light || "#f87171"
          ),
          "--color-error-foreground": getRgbChannels(
            options?.colors?.error?.foreground || "#f8fafc"
          )
        },
        ".dark": {
          /* base colors */
          "--color-background": getRgbChannels(
            options?.darkColors?.background || "#020617"
          ),
          "--color-foreground": getRgbChannels(
            options?.darkColors?.foreground || "#94a3b8"
          ),
          "--color-black": getRgbChannels(
            options?.darkColors?.black || "#020617"
          ),
          "--color-white": getRgbChannels(
            options?.darkColors?.white || "#ffffff"
          ),
          /* surface color */
          "--color-surface": getRgbChannels(
            options?.darkColors?.surface?.default || "#1e293b"
          ),
          "--color-surface-dark": getRgbChannels(
            options?.darkColors?.surface?.dark || "#0f172a"
          ),
          "--color-surface-light": getRgbChannels(
            options?.darkColors?.surface?.light || "#334155"
          ),
          "--color-surface-foreground": getRgbChannels(
            options?.darkColors?.surface?.foreground || "#f8fafc"
          ),
          /* primary color */
          "--color-primary": getRgbChannels(
            options?.darkColors?.primary?.default || "#e2e8f0"
          ),
          "--color-primary-dark": getRgbChannels(
            options?.darkColors?.primary?.dark || "#cbd5e1"
          ),
          "--color-primary-light": getRgbChannels(
            options?.darkColors?.primary?.light || "#f1f5f9"
          ),
          "--color-primary-foreground": getRgbChannels(
            options?.darkColors?.primary?.foreground || "#020617"
          ),
          /* secondary color */
          "--color-secondary": getRgbChannels(
            options?.darkColors?.secondary?.default || "#1e293b"
          ),
          "--color-secondary-dark": getRgbChannels(
            options?.darkColors?.secondary?.dark || "#0f172a"
          ),
          "--color-secondary-light": getRgbChannels(
            options?.darkColors?.secondary?.light || "#334155"
          ),
          "--color-secondary-foreground": getRgbChannels(
            options?.darkColors?.secondary?.foreground || "#f8fafc"
          ),
          /* info color */
          "--color-info": getRgbChannels(
            options?.darkColors?.info?.default || "#0062ff"
          ),
          "--color-info-dark": getRgbChannels(
            options?.darkColors?.info?.dark || "#0055dd"
          ),
          "--color-info-light": getRgbChannels(
            options?.darkColors?.info?.light || "#007aff"
          ),
          "--color-info-foreground": getRgbChannels(
            options?.darkColors?.info?.foreground || "#f8fafc"
          ),
          /* success color */
          "--color-success": getRgbChannels(
            options?.darkColors?.success?.default || "#00bf6b"
          ),
          "--color-success-dark": getRgbChannels(
            options?.darkColors?.success?.dark || "#00a35f"
          ),
          "--color-success-light": getRgbChannels(
            options?.darkColors?.success?.light || "#02e585"
          ),
          "--color-success-foreground": getRgbChannels(
            options?.darkColors?.success?.foreground || "#f8fafc"
          ),
          /* warning color */
          "--color-warning": getRgbChannels(
            options?.darkColors?.warning?.default || "#fca327"
          ),
          "--color-warning-dark": getRgbChannels(
            options?.darkColors?.warning?.dark || "#f67d0a"
          ),
          "--color-warning-light": getRgbChannels(
            options?.darkColors?.warning?.light || "#fdba4c"
          ),
          "--color-warning-foreground": getRgbChannels(
            options?.darkColors?.warning?.foreground || "#f8fafc"
          ),
          /* error color */
          "--color-error": getRgbChannels(
            options?.darkColors?.error?.default || "#ef4444"
          ),
          "--color-error-dark": getRgbChannels(
            options?.darkColors?.error?.dark || "#dc2626"
          ),
          "--color-error-light": getRgbChannels(
            options?.darkColors?.error?.light || "#f87171"
          ),
          "--color-error-foreground": getRgbChannels(
            options?.darkColors?.error?.foreground || "#f8fafc"
          )
        }
      });
    };
  },
  function(options) {
    return {
      darkMode: "class",
      content: [
        "./node_modules/@material-tailwind/react/src/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/src/theme/**/*.{js,ts,jsx,tsx}"
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ["var(--font-sans)", "sans-serif"],
            serif: ["var(--font-serif)", "serif"],
            body: ["var(--font-sans)", "sans-serif"],
            mono: ["var(--font-mono)", "monospace"]
          },
          borderRadius: {
            full: "calc(var(--radius) * 1000)",
            "3xl": "var(--radius)",
            "2xl": "calc(var(--radius) - 8px)",
            xl: "calc(var(--radius) - 12px)",
            lg: "calc(var(--radius) - 16px)",
            md: "calc(var(--radius) - 18px)",
            DEFAULT: "calc(var(--radius) - 20px)",
            sm: "calc(var(--radius) - 22px)"
          },
          colors: {
            background: "rgb(var(--color-background) / <alpha-value>)",
            foreground: "rgb(var(--color-foreground) / <alpha-value>)",
            black: "rgb(var(--color-black) / <alpha-value>)",
            white: "rgb(var(--color-white) / <alpha-value>)",
            surface: {
              DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
              dark: "rgb(var(--color-surface-dark) / <alpha-value>)",
              light: "rgb(var(--color-surface-light) / <alpha-value>)",
              foreground: "rgb(var(--color-surface-foreground) / <alpha-value>)"
            },
            primary: {
              DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
              dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
              light: "rgb(var(--color-primary-light) / <alpha-value>)",
              foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)"
            },
            secondary: {
              DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
              dark: "rgb(var(--color-secondary-dark) / <alpha-value>)",
              light: "rgb(var(--color-secondary-light) / <alpha-value>)",
              foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)"
            },
            info: {
              DEFAULT: "rgb(var(--color-info) / <alpha-value>)",
              dark: "rgb(var(--color-info-dark) / <alpha-value>)",
              light: "rgb(var(--color-info-light) / <alpha-value>)",
              foreground: "rgb(var(--color-info-foreground) / <alpha-value>)"
            },
            success: {
              DEFAULT: "rgb(var(--color-success) / <alpha-value>)",
              dark: "rgb(var(--color-success-dark) / <alpha-value>)",
              light: "rgb(var(--color-success-light) / <alpha-value>)",
              foreground: "rgb(var(--color-success-foreground) / <alpha-value>)"
            },
            warning: {
              DEFAULT: "rgb(var(--color-warning) / <alpha-value>)",
              dark: "rgb(var(--color-warning-dark) / <alpha-value>)",
              light: "rgb(var(--color-warning-light) / <alpha-value>)",
              foreground: "rgb(var(--color-warning-foreground) / <alpha-value>)"
            },
            error: {
              DEFAULT: "rgb(var(--color-error) / <alpha-value>)",
              dark: "rgb(var(--color-error-dark) / <alpha-value>)",
              light: "rgb(var(--color-error-light) / <alpha-value>)",
              foreground: "rgb(var(--color-error-foreground) / <alpha-value>)"
            }
          }
        }
      },
      plugins: [import_tailwindcss_animate.default]
    };
  }
);

// node_modules/@material-tailwind/react/dist/chunk-CXJEJBKT.js
var typographyTheme = {
  defaultProps: {
    type: "p",
    color: "inherit"
  },
  baseStyle: "font-sans antialiased",
  color: {
    inherit: "text-inherit",
    default: "text-black dark:text-white",
    primary: "text-primary",
    secondary: "text-secondary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error"
  },
  type: {
    h1: "font-bold text-4xl md:text-5xl lg:text-6xl",
    h2: "font-bold text-3xl md:text-4xl lg:text-5xl",
    h3: "font-bold text-2xl md:text-3xl lg:text-4xl",
    h4: "font-bold text-xl md:text-2xl lg:text-3xl",
    h5: "font-bold text-lg md:text-xl lg:text-2xl",
    h6: "font-bold text-base md:text-lg lg:text-xl",
    lead: "text-base md:text-lg",
    p: " text-base",
    small: "text-sm"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-CPR7EA3T.js
var sliderTheme = {
  defaultProps: {
    size: "md",
    color: "primary"
  },
  baseStyle: "relative select-none rounded-full bg-surface",
  size: {
    sm: "h-0.5",
    md: "h-1",
    lg: "h-1.5"
  }
};
var sliderRangeTheme = {
  baseStyle: "h-full rounded-full",
  color: {
    primary: "bg-primary",
    secondary: "bg-secondary",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error"
  }
};
var sliderThumbTheme = {
  baseStyle: "rounded-full shadow shadow-black/10 outline-none ring ring-transparent",
  size: {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-5 h-5"
  },
  color: {
    primary: "bg-primary border-primary focus:ring-primary/10 active:ring-primary/10",
    secondary: "bg-secondary border-secondary focus:ring-secondary/10 active:ring-secondary/10",
    info: "bg-info border-info focus:ring-info/10 active:ring-info/10",
    success: "bg-success border-success focus:ring-success/10 active:ring-success/10",
    warning: "bg-warning border-warning focus:ring-warning/10 active:ring-warning/10",
    error: "bg-error border-error focus:ring-error/10 active:ring-error/10"
  }
};
var sliderTickTheme = {
  baseStyle: "absolute h-full -translate-x-1/2 text-foreground before:absolute before:left-1/2 before:rounded-full before:content-['']",
  size: {
    sm: "text-xs before:h-1 before:w-px top-2.5 before:-top-2.5",
    md: "text-sm before:h-2 before:w-px top-3 before:-top-3",
    lg: "text-base before:h-2.5 before:w-0.5 top-3.5 before:-top-3.5 "
  },
  color: {
    primary: "before:bg-primary",
    secondary: "before:bg-secondary",
    info: "before:bg-info",
    success: "before:bg-success",
    warning: "before:bg-warning",
    error: "before:bg-error"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-CBF6OFZW.js
var spinnerTheme = {
  defaultProps: {
    size: "md",
    color: "primary"
  },
  baseStyle: "text-surface animate-spin",
  size: {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
    xxl: "h-12 w-12"
  },
  color: {
    primary: "text-primary",
    secondary: "text-secondary brightness-90",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-7SWBG6UK.js
var switchTheme = {
  defaultProps: {
    color: "primary"
  },
  baseStyle: "appearance-none relative inline-block rounded-full w-12 h-6 cursor-pointer before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-surface before:transition-colors before:duration-200 before:ease-in after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-6 after:h-6 after:border after:border-surface after:bg-background after:rounded-full checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in disabled:opacity-50 disabled:cursor-not-allowed dark:after:bg-white",
  color: {
    primary: "checked:before:bg-primary checked:after:border-primary",
    secondary: "checked:before:bg-secondary checked:after:border-secondary",
    info: "checked:before:bg-info checked:after:border-info",
    success: "checked:before:bg-success checked:after:border-success",
    warning: "checked:before:bg-warning checked:after:border-warning",
    error: "checked:before:bg-error checked:after:border-error"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-FHF6P4UN.js
var tabsTheme = {
  defaultProps: {
    orientation: "horizontal"
  },
  baseStyle: "flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
};
var tabsListTheme = {
  baseStyle: "relative flex shrink-0 w-max data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col rounded-md p-1 bg-surface-light dark:bg-surface"
};
var tabsTriggerTheme = {
  baseStyle: "inline-flex relative z-[2] py-1.5 px-3 items-center justify-center align-middle text-black dark:text-white select-none font-sans font-medium text-center text-sm aria-disabled:opacity-50 aria-disabled:pointer-events-none"
};
var tabsPanelTheme = {
  baseStyle: "p-1 w-full block"
};
var tabsTriggerIndicatorTheme = {
  baseStyle: "bg-background rounded shadow-sm shadow-black/10 transition-all duration-300 ease-in"
};

// node_modules/@material-tailwind/react/dist/chunk-APTGGM6D.js
var textareaTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    resize: false,
    isError: false,
    isSuccess: false
  },
  baseStyle: "peer block w-full resize-none outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success data-[resize=true]:resize-y",
  color: {
    primary: "hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10",
    secondary: "hover:border-secondary hover:ring-secondary/10 focus:border-secondary focus:ring-secondary/10",
    info: "hover:border-info hover:ring-info/10 focus:border-info focus:ring-info/10",
    success: "hover:border-success hover:ring-success/10 focus:border-success focus:ring-success/10",
    warning: "hover:border-warning hover:ring-warning/10 focus:border-warning focus:ring-warning/10",
    error: "hover:border-error hover:ring-error/10 focus:border-error focus:ring-error/10"
  },
  size: {
    sm: "text-sm shadow-sm p-2 rounded-md ring",
    md: "text-sm shadow-sm p-2.5 rounded-md ring",
    lg: "text-base shadow-sm p-3 rounded-lg ring-4"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-BAFDZUY3.js
var timelineTheme = {
  defaultProps: {
    color: "primary",
    mode: "timeline",
    orientation: "horizontal"
  },
  baseStyle: "flex w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=horizontal]:items-center"
};
var timelineItemTheme = {
  baseStyle: "group data-[orientation=horizontal]:block data-[orientation=vertical]:flex data-[orientation=vertical]:gap-x-6 aria-disabled:select-none aria-disabled:pointer-events-none"
};
var timelineHeaderTheme = {
  baseStyle: "relative"
};
var timelineIconTheme = {
  baseStyle: "relative z-10 grid h-10 w-10 place-items-center rounded-full bg-surface text-surface-foreground",
  color: {
    primary: "group-data-[active=true]:bg-primary group-data-[active=true]:text-primary-foreground group-data-[completed=true]:bg-primary group-data-[completed=true]:text-primary-foreground",
    secondary: "group-data-[active=true]:bg-secondary group-data-[active=true]:text-secondary-foreground group-data-[completed=true]:bg-secondary group-data-[completed=true]:text-secondary-foreground",
    info: "group-data-[active=true]:bg-info group-data-[active=true]:text-info-foreground group-data-[completed=true]:bg-info group-data-[completed=true]:text-info-foreground",
    success: "group-data-[active=true]:bg-success group-data-[active=true]:text-success-foreground group-data-[completed=true]:bg-success group-data-[completed=true]:text-success-foreground",
    warning: "group-data-[active=true]:bg-warning group-data-[active=true]:text-warning-foreground group-data-[completed=true]:bg-warning group-data-[completed=true]:text-warning-foreground",
    error: "group-data-[active=true]:bg-error group-data-[active=true]:text-error-foreground group-data-[completed=true]:bg-error group-data-[completed=true]:text-error-foreground"
  }
};
var timelineSeparatorTheme = {
  baseStyle: "bg-surface absolute data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:-translate-y-1/2",
  color: {
    primary: "group-data-[completed=true]:bg-primary",
    secondary: "group-data-[completed=true]:bg-secondary",
    info: "group-data-[completed=true]:bg-info",
    success: "group-data-[completed=true]:bg-success",
    warning: "group-data-[completed=true]:bg-warning",
    error: "group-data-[completed=true]:bg-error"
  }
};
var timelineBodyTheme = {
  baseStyle: "data-[orientation=vertical]:pb-8 data-[orientation=horizontal]:py-4 text-foreground"
};

// node_modules/@material-tailwind/react/dist/chunk-AGIFMRNV.js
var tooltipTheme = {
  defaultProps: {
    placement: "top",
    offset: 8,
    interactive: false
  }
};
var tooltipTriggerTheme = {
  baseStyle: "outline-none group"
};
var tooltipContentTheme = {
  baseStyle: "rounded-md bg-black dark:bg-white border-black dark:border-white px-1.5 py-1 text-xs text-white dark:text-black shadow-lg shadow-black/5 outline-none"
};
var tooltipArrowTheme = {
  baseStyle: "h-2 w-2 rounded-bl border border-[inherit] bg-inherit [clip-path:polygon(0_0,_100%_100%,_0_100%)] data-[placement^=bottom]:rotate-[135deg] data-[placement^=left]:rotate-[225deg] data-[placement^=right]:rotate-45 data-[placement^=top]:-rotate-45"
};

// node_modules/@material-tailwind/react/dist/chunk-77ZNGTSH.js
var listTheme = {
  baseStyle: "flex flex-col gap-0.5 min-w-60"
};
var listItemTheme = {
  defaultProps: {
    ripple: true
  },
  baseStyle: "flex items-center py-1.5 px-2.5 rounded-md align-middle select-none font-sans  transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-foreground hover:text-black dark:hover:text-white hover:bg-surface focus:bg-surface focus:text-black dark:focus:text-white data-[selected=true]:bg-surface data-[selected=true]:text-black dark:data-[selected=true]:text-white dark:bg-opacity-70"
};
var listItemStartTheme = {
  baseStyle: "grid place-items-center shrink-0 me-2.5"
};
var listItemEndTheme = {
  baseStyle: "grid place-items-center shrink-0 ps-2.5 ms-auto"
};

// node_modules/@material-tailwind/react/dist/chunk-5VIFYY3R.js
var menuTheme = {
  defaultProps: {
    placement: "bottom",
    offset: 5
  }
};
var menuTriggerTheme = {
  baseStyle: "outline-none group"
};
var menuContentTheme = {
  defaultProps: {
    disabled: false,
    initialFocus: 0,
    returnFocus: true,
    guards: true,
    modal: false,
    visuallyHiddenDismiss: true,
    closeOnFocusOut: true,
    order: ["content"]
  },
  baseStyle: "min-w-40 rounded-lg space-y-0.5 border border-surface bg-background p-1 text-sm text-foreground shadow-xl shadow-black/[0.025] outline-none"
};
var menuItemTheme = {
  defaultProps: {
    ripple: true,
    closeOnClick: true
  },
  baseStyle: "w-full text-start flex items-center py-1.5 px-2.5 rounded align-middle select-none outline-none font-sans  transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-foreground hover:text-black dark:hover:text-white hover:bg-surface focus:bg-surface focus:text-black dark:focus:text-white data-[selected=true]:bg-surface data-[selected=true]:text-black dark:data-[selected=true]:text-white dark:bg-opacity-70"
};

// node_modules/@material-tailwind/react/dist/chunk-C2SK4YPI.js
var navbarTheme = {
  defaultProps: {
    variant: "solid",
    color: "default"
  },
  baseStyle: "w-full rounded-lg border shadow-lg overflow-hidden p-2",
  variant: {
    ghost: {
      default: "bg-background/10 border-transparent shadow-transparent",
      primary: "bg-primary/10 border-transparent shadow-transparent",
      secondary: "bg-secondary/10 border-transparent shadow-transparent",
      info: "bg-info/10 border-transparent shadow-transparent",
      success: "bg-success/10 border-transparent shadow-transparent",
      warning: "bg-warning/10 border-transparent shadow-transparent",
      error: "bg-error/10 border-transparent shadow-transparent"
    },
    solid: {
      default: "bg-background border-surface shadow-black/5",
      primary: "bg-primary border-primary-dark shadow-primary-dark/25",
      secondary: "bg-secondary border-secondary-dark shadow-secondary-dark/25",
      info: "bg-info border-info-dark shadow-info-dark/25",
      success: "bg-success border-success-dark shadow-success-dark/25",
      warning: "bg-warning border-warning-dark shadow-warning-dark/25",
      error: "bg-error border-error-dark shadow-error-dark/25"
    },
    outline: {
      default: "bg-transparent border-surface shadow-transparent",
      primary: "bg-transparent border-primary shadow-transparent",
      secondary: "bg-transparent border-secondary shadow-transparent",
      info: "bg-transparent border-info shadow-transparent",
      success: "bg-transparent border-success shadow-transparent",
      warning: "bg-transparent border-warning shadow-transparent",
      error: "bg-transparent border-error shadow-transparent"
    },
    gradient: {
      default: "bg-background border-surface shadow-black/5",
      primary: "bg-gradient-to-t from-primary-dark to-primary-light shadow-primary/25 border-primary",
      secondary: "bg-gradient-to-t from-secondary-dark to-secondary-light shadow-secondary/25 border-secondary",
      info: "bg-gradient-to-t from-info-dark to-info-light shadow-info/25 border-info",
      success: "bg-gradient-to-t from-success-dark to-success-light shadow-success/25 border-success",
      warning: "bg-gradient-to-t from-warning-dark to-warning-light shadow-warning/25 border-warning",
      error: "bg-gradient-to-t from-error-dark to-error-light shadow-error/25 border-error"
    }
  }
};

// node_modules/@material-tailwind/react/dist/chunk-QTMDCPR3.js
var popoverTheme = {
  defaultProps: {
    placement: "bottom",
    offset: 10
  }
};
var popoverTriggerTheme = {
  baseStyle: "outline-none group"
};
var popoverContentTheme = {
  defaultProps: {
    disabled: false,
    initialFocus: 0,
    returnFocus: true,
    guards: true,
    modal: false,
    visuallyHiddenDismiss: true,
    closeOnFocusOut: true,
    order: ["content"]
  },
  baseStyle: "rounded-lg border border-surface bg-background p-2.5 text-sm text-foreground shadow-xl shadow-black/[0.025] outline-none"
};
var popoverArrowTheme = {
  baseStyle: "h-3 w-3 rounded-bl-sm border border-[inherit] bg-inherit [clip-path:polygon(0_0,_100%_100%,_0_100%)] data-[placement^=bottom]:rotate-[135deg] data-[placement^=left]:rotate-[225deg] data-[placement^=right]:rotate-45 data-[placement^=top]:-rotate-45"
};

// node_modules/@material-tailwind/react/dist/chunk-U44YIC2J.js
var progressTheme = {
  defaultProps: {
    size: "md",
    color: "primary"
  },
  baseStyle: "w-full bg-surface block rounded-full overflow-hidden",
  size: {
    sm: "h-2",
    md: "h-4",
    lg: "h-6"
  }
};
var progressBarTheme = {
  baseStyle: "h-full rounded-none",
  color: {
    primary: "bg-primary",
    secondary: "bg-secondary brightness-90",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-QHXOBAAC.js
var radioTheme = {
  defaultProps: {
    color: "primary",
    orientation: "vertical"
  },
  baseStyle: "flex gap-2 data-[orientation=horizontal]:items-center data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start"
};
var radioItemTheme = {
  baseStyle: "group block cursor-pointer shadow-sm shadow-black/5 relative h-5 w-5 shrink-0 rounded-full bg-transparent border border-surface transition-all duration-200 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none hover:shadow-md",
  color: {
    primary: "data-[checked=true]:bg-primary data-[checked=true]:border-primary text-primary-foreground",
    secondary: "data-[checked=true]:bg-secondary data-[checked=true]:border-secondary text-secondary-foreground",
    info: "data-[checked=true]:bg-info data-[checked=true]:border-info text-info-foreground",
    success: "data-[checked=true]:bg-success data-[checked=true]:border-success text-success-foreground",
    warning: "data-[checked=true]:bg-warning data-[checked=true]:border-warning text-warning-foreground",
    error: "data-[checked=true]:bg-error data-[checked=true]:border-error text-error-foreground"
  }
};
var radioIndicatorTheme = {
  baseStyle: "pointer-events-none absolute left-2/4 top-2/4 text-current -translate-x-2/4 -translate-y-2/4 scale-75 opacity-0 transition-all duration-200 ease-in group-data-[checked=true]:scale-100 group-data-[checked=true]:opacity-100"
};

// node_modules/@material-tailwind/react/dist/chunk-BGYX7VND.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ratingTheme = {
  defaultProps: {
    count: 5,
    color: "primary",
    ratedIcon: (0, import_jsx_runtime.jsx)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "h-6 w-6",
        children: (0, import_jsx_runtime.jsx)(
          "path",
          {
            fillRule: "evenodd",
            d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
            clipRule: "evenodd"
          }
        )
      }
    ),
    unratedIcon: (0, import_jsx_runtime.jsx)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: (0, import_jsx_runtime.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          }
        )
      }
    ),
    readonly: false
  },
  baseStyle: "inline-flex items-center [&_data-slot=icon]:w-5 [&_data-slot=icon]:h-5 [&_data-slot=icon]:text-inherit [&_data-slot=icon]:cursor-pointer",
  color: {
    primary: "text-primary",
    secondary: "text-secondary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-BGJMALSI.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var selectTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    isPill: false,
    isError: false,
    isSuccess: false,
    placement: "bottom",
    offset: 5
  }
};
var selectTriggerTheme = {
  defaultProps: {
    indicator: (0, import_jsx_runtime2.jsxs)(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        color: "currentColor",
        className: "h-[1em] w-[1em] translate-x-0.5 stroke-[1.5]",
        children: [
          (0, import_jsx_runtime2.jsx)(
            "path",
            {
              d: "M17 8L12 3L7 8",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          (0, import_jsx_runtime2.jsx)(
            "path",
            {
              d: "M17 16L12 21L7 16",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ]
      }
    )
  },
  baseStyle: "flex items-center gap-4 justify-between h-max w-full outline-none focus:outline-none text-foreground bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none text-start data-[shape=pill]:rounded-full [&_data-slot=placeholder]:text-foreground/60",
  size: {
    sm: "text-sm rounded-md py-1.5 px-2 ring shadow-sm",
    md: "text-sm rounded-md py-2 px-2.5 ring shadow-sm",
    lg: "text-base rounded-lg py-2.5 px-3 ring-4 shadow-sm"
  },
  color: {
    primary: "hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10 data-[open=true]:border-primary data-[open=true]:ring-primary/10",
    secondary: "hover:border-secondary hover:ring-secondary/10 focus:border-secondary focus:ring-secondary/10 data-[open=true]:border-secondary data-[open=true]:ring-secondary/10",
    info: "hover:border-info hover:ring-info/10 focus:border-info focus:ring-info/10 data-[open=true]:border-info data-[open=true]:ring-info/10",
    success: "hover:border-success hover:ring-success/10 focus:border-success focus:ring-success/10 data-[open=true]:border-success data-[open=true]:ring-success/10",
    warning: "hover:border-warning hover:ring-warning/10 focus:border-warning focus:ring-warning/10 data-[open=true]:border-warning data-[open=true]:ring-warning/10",
    error: "hover:border-error hover:ring-error/10 focus:border-error focus:ring-error/10 data-[open=true]:border-error data-[open=true]:ring-error/10"
  }
};
var selectListTheme = {
  defaultProps: {
    disabled: false,
    initialFocus: 0,
    returnFocus: true,
    guards: true,
    modal: true,
    visuallyHiddenDismiss: true,
    closeOnFocusOut: true,
    order: ["content"]
  },
  baseStyle: "flex flex-col gap-0.5 bg-background p-1 rounded-lg shadow-xl shadow-black/[0.025] border border-surface outline-none"
};
var selectOptionTheme = {
  defaultProps: {
    ripple: true,
    indicator: (0, import_jsx_runtime2.jsx)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 2,
        stroke: "currentColor",
        className: "h-4 w-4",
        children: (0, import_jsx_runtime2.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4.5 12.75l6 6 9-13.5"
          }
        )
      }
    )
  },
  baseStyle: "outline-none flex items-center justify-between gap-4 py-1.5 px-2.5 rounded align-middle select-none text-sm font-sans transition-all duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-foreground hover:text-black dark:hover:text-white hover:bg-surface focus:bg-surface focus:text-black dark:focus:text-white data-[selected=true]:bg-surface data-[selected=true]:text-black dark:data-[selected=true]:text-white dark:bg-opacity-70"
};

// node_modules/@material-tailwind/react/dist/chunk-YVCLQOWL.js
var checkboxTheme = {
  defaultProps: {
    color: "primary"
  },
  baseStyle: "group shadow-sm shadow-black/5 inline-block relative h-5 w-5 cursor-pointer rounded bg-transparent border border-surface transition-all duration-200 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none hover:shadow-md",
  color: {
    primary: "data-[checked=true]:bg-primary data-[checked=true]:border-primary text-primary-foreground",
    secondary: "data-[checked=true]:bg-secondary data-[checked=true]:border-secondary text-secondary-foreground",
    info: "data-[checked=true]:bg-info data-[checked=true]:border-info text-info-foreground",
    success: "data-[checked=true]:bg-success data-[checked=true]:border-success text-success-foreground",
    warning: "data-[checked=true]:bg-warning data-[checked=true]:border-warning text-warning-foreground",
    error: "data-[checked=true]:bg-error data-[checked=true]:border-error text-error-foreground"
  }
};
var checkboxIndicatorTheme = {
  baseStyle: "pointer-events-none absolute left-2/4 top-2/4 text-current -translate-x-2/4 -translate-y-2/4 scale-75 opacity-0 transition-all duration-200 ease-in data-[checked=true]:scale-100 data-[checked=true]:opacity-100"
};

// node_modules/@material-tailwind/react/dist/chunk-332RUHED.js
var chipTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    variant: "solid",
    isPill: true
  },
  baseStyle: "relative inline-flex w-max items-center border font-sans font-medium rounded-md data-[shape=pill]:rounded-full",
  size: {
    sm: "text-xs p-0.5 shadow-sm",
    md: "text-sm p-0.5 shadow-sm",
    lg: "text-sm p-1 shadow-sm"
  },
  variant: {
    ghost: {
      primary: "bg-primary/10 border-transparent text-primary shadow-none",
      secondary: "bg-secondary/10 border-transparent text-secondary-foreground shadow-none",
      info: "bg-info/10 border-transparent text-info shadow-none",
      success: "bg-success/10 border-transparent text-success shadow-none",
      warning: "bg-warning/10 border-transparent text-warning shadow-none",
      error: "bg-error/10 border-transparent text-error shadow-none"
    },
    solid: {
      primary: "bg-primary border-primary text-primary-foreground",
      secondary: "bg-secondary border-secondary text-secondary-foreground",
      info: "bg-info border-info text-info-foreground",
      success: "bg-success border-success text-success-foreground",
      warning: "bg-warning border-warning text-warning-foreground",
      error: "bg-error border-error text-error-foreground"
    },
    outline: {
      primary: "bg-transparent border-primary text-primary",
      secondary: "bg-transparent border-secondary text-secondary-foreground",
      info: "bg-transparent border-info text-info",
      success: "bg-transparent border-success text-success",
      warning: "bg-transparent border-warning text-warning",
      error: "bg-transparent border-error text-error"
    },
    gradient: {
      primary: "bg-gradient-to-tr from-primary-dark to-primary-light border-primary text-primary-foreground",
      secondary: "bg-gradient-to-tr from-secondary-dark to-secondary-light border-secondary text-secondary-foreground",
      info: "bg-gradient-to-tr from-info-dark to-info-light border-info text-info-foreground",
      success: "bg-gradient-to-tr from-success-dark to-success-light border-success text-success-foreground",
      warning: "bg-gradient-to-tr from-warning-dark to-warning-light border-warning text-warning-foreground",
      error: "bg-gradient-to-tr from-error-dark to-error-light border-error text-error-foreground"
    }
  }
};
var chipLabelTheme = {
  baseStyle: "font-inherit text-inherit leading-none",
  size: {
    sm: "my-0.5 mx-1.5",
    md: "my-1 mx-2.5",
    lg: "my-1.5 mx-3"
  }
};
var chipIconTheme = {
  baseStyle: "grid place-items-center shrink-0 rounded-full",
  size: {
    sm: "translate-x-0.5 w-3.5 h-3.5",
    md: "translate-x-1 w-4 h-4",
    lg: "translate-x-1.5 w-5 h-5"
  }
};
var chipDismissTriggerTheme = {
  defaultProps: {
    ripple: true
  },
  baseStyle: "grid place-items-center shrink-0 rounded-full p-px",
  size: {
    sm: "-translate-x-0.5 ms-0.5 w-4 h-4 stroke-2",
    md: "-translate-x-1 ms-1 w-5 h-5 stroke-2",
    lg: "-translate-x-1.5 ms-1.5 w-6 h-6 stroke-2"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-4JMI2FIT.js
var collapseTheme = {
  baseStyle: "block w-full h-0 overflow-hidden data-[open=true]:h-auto data-[open=true]:overflow-visible"
};

// node_modules/@material-tailwind/react/dist/chunk-BQYKGMWX.js
var dialogTheme = {
  defaultProps: {
    size: "md"
  }
};
var dialogTriggerTheme = {
  baseStyle: "outline-none"
};
var dialogContentTheme = {
  defaultProps: {
    disabled: false,
    initialFocus: 0,
    returnFocus: true,
    guards: true,
    modal: false,
    visuallyHiddenDismiss: true,
    closeOnFocusOut: true,
    order: ["content"]
  },
  baseStyle: "fixed z-[9998] top-1/2 left-1/2 -translate-x-1/2 px-4 py-3 max-h-[calc(100vh-32px)] overflow-y-auto -translate-y-1/2 bg-background w-full h-full rounded-xl shadow-2xl shadow-black/5 border border-surface data-[open=true]:motion-safe:animate-in data-[open=true]:motion-safe:fade-in data-[open=true]:motion-safe:zoom-in-95 data-[open=true]:motion-safe:slide-in-from-left-1/2 data-[open=true]:motion-safe:slide-in-from-top-1/2",
  size: {
    xs: "w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 h-max",
    sm: "w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 h-max",
    md: "w-10/12 md:w-8/12 lg:w-6/12 h-max",
    lg: "w-10/12 lg:w-8/12 h-max",
    xl: "w-11/12 lg:w-10/12 h-max",
    screen: "w-full h-full rounded-none max-h-screen"
  }
};
var dialogOverlayTheme = {
  defaultProps: {
    lockScroll: true
  },
  baseStyle: "fixed inset-0 w-screen h-screen z-[9997] bg-black/50 data-[open=true]:motion-safe:animate-in data-[open=true]:motion-safe:fade-in"
};
var dialogDismissTriggerTheme = {
  baseStyle: "outline-none"
};

// node_modules/@material-tailwind/react/dist/chunk-ANNCLIQH.js
var drawerTriggerTheme = {
  baseStyle: "outline-none"
};
var drawerPanelTheme = {
  defaultProps: {
    disabled: false,
    initialFocus: 0,
    returnFocus: true,
    guards: true,
    modal: false,
    visuallyHiddenDismiss: true,
    closeOnFocusOut: true,
    order: ["content"],
    placement: "right"
  },
  baseStyle: "fixed z-[9998] p-4 bg-background w-80 h-80 shadow-2xl shadow-black/5 border-surface data-[placement=top]:top-0 data-[placement=top]:left-0 data-[placement=right]:top-0 data-[placement=right]:right-0 data-[placement=bottom]:bottom-0 data-[placement=bottom]:left-0 data-[placement=left]:top-0 data-[placement=left]:left-0 data-[placement=top]:w-screen data-[placement=bottom]:w-screen data-[placement=left]:h-screen data-[placement=right]:h-screen border border-surface data-[open=true]:motion-safe:animate-in data-[open=true]:motion-safe:fade-in data-[open=true]:data-[placement=top]:motion-safe:slide-in-from-top-10 data-[open=true]:data-[placement=bottom]:motion-safe:slide-in-from-bottom-10 data-[open=true]:data-[placement=left]:motion-safe:slide-in-from-left-10 data-[open=true]:data-[placement=right]:motion-safe:slide-in-from-right-10"
};
var drawerOverlayTheme = {
  defaultProps: {
    lockScroll: true
  },
  baseStyle: "fixed inset-0 w-screen h-screen z-[9997] bg-black/50 data-[open=true]:motion-safe:animate-in data-[open=true]:motion-safe:fade-in"
};
var drawerDismissTriggerTheme = {
  baseStyle: "outline-none"
};

// node_modules/@material-tailwind/react/dist/chunk-VYISNWQG.js
var buttonTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    variant: "solid",
    ripple: true,
    isPill: false,
    isFullWidth: false
  },
  baseStyle: "inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none",
  size: {
    xs: "text-sm rounded-md py-1 px-2 shadow-sm hover:shadow",
    sm: "text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow",
    md: "text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md",
    lg: "text-base rounded-md py-2.5 px-5 shadow-sm hover:shadow-lg",
    xl: "text-base rounded-lg py-3 px-6 shadow-sm hover:shadow-lg"
  },
  variant: {
    ghost: {
      primary: "bg-transparent border-transparent text-primary hover:bg-primary/5 hover:border-primary/5 shadow-none hover:shadow-none",
      secondary: "bg-transparent border-transparent text-secondary-foreground hover:bg-secondary/10 hover:border-secondary/10 shadow-none hover:shadow-none",
      info: "bg-transparent border-transparent text-info hover:bg-info/10 hover:border-info/10 shadow-none hover:shadow-none",
      success: "bg-transparent border-transparent text-success hover:bg-success/10 hover:border-success/10 shadow-none hover:shadow-none",
      warning: "bg-transparent border-transparent text-warning hover:bg-warning/10 hover:border-warning/10 shadow-none hover:shadow-none",
      error: "bg-transparent border-transparent text-error hover:bg-error/10 hover:border-error/10 shadow-none hover:shadow-none"
    },
    solid: {
      primary: "bg-primary border-primary text-primary-foreground hover:bg-primary-light hover:border-primary-light",
      secondary: "bg-secondary border-secondary text-secondary-foreground hover:bg-secondary-light hover:border-secondary-light",
      info: "bg-info border-info text-info-foreground hover:bg-info-light hover:border-info-light",
      success: "bg-success border-success text-success-foreground hover:bg-success-light hover:border-success-light",
      warning: "bg-warning border-warning text-warning-foreground hover:bg-warning-light hover:border-warning-light",
      error: "bg-error border-error text-error-foreground hover:bg-error-light hover:border-error-light"
    },
    outline: {
      primary: "bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      secondary: "bg-transparent border-secondary text-secondary-foreground hover:bg-secondary",
      info: "bg-transparent border-info text-info hover:bg-info hover:text-info-foreground",
      success: "bg-transparent border-success text-success hover:bg-success hover:text-success-foreground",
      warning: "bg-transparent border-warning text-warning hover:bg-warning hover:text-warning-foreground",
      error: "bg-transparent border-error text-error hover:bg-error hover:text-error-foreground"
    },
    gradient: {
      primary: "bg-gradient-to-tr from-primary-dark to-primary-light border-primary text-primary-foreground hover:brightness-105",
      secondary: "bg-gradient-to-tr from-secondary-dark to-secondary-light border-secondary text-secondary-foreground hover:brightness-105",
      info: "bg-gradient-to-tr from-info-dark to-info-light border-info text-info-foreground hover:brightness-105",
      success: "bg-gradient-to-tr from-success-dark to-success-light border-success text-success-foreground hover:brightness-105",
      warning: "bg-gradient-to-tr from-warning-dark to-warning-light border-warning text-warning-foreground hover:brightness-105",
      error: "bg-gradient-to-tr from-error-dark to-error-light border-error text-error-foreground hover:brightness-105"
    }
  }
};

// node_modules/@material-tailwind/react/dist/chunk-LRNZTCBT.js
var iconButtonTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    variant: "solid",
    ripple: true,
    isCircular: false
  },
  baseStyle: "inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none data-[shape=circular]:rounded-full",
  size: {
    xs: "text-sm min-w-[30px] min-h-[30px] rounded-md shadow-sm hover:shadow",
    sm: "text-sm min-w-[34px] min-h-[34px] rounded-md shadow-sm hover:shadow",
    md: "text-sm min-w-[38px] min-h-[38px] rounded-md shadow-sm hover:shadow-md",
    lg: "text-base min-w-[46px] min-h-[46px] rounded-md shadow-sm hover:shadow-lg",
    xl: "text-base min-w-[50px] min-h-[50px] rounded-lg shadow-sm hover:shadow-lg"
  },
  variant: buttonTheme.variant
};

// node_modules/@material-tailwind/react/dist/chunk-ADIUZG7W.js
var inputTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    isPill: false,
    isError: false,
    isSuccess: false
  },
  baseStyle: "w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-black dark:text-white placeholder:text-foreground/60 bg-transparent ring-transparent border border-surface transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none data-[shape=pill]:rounded-full",
  size: {
    sm: "text-sm rounded-md py-1.5 px-2 ring shadow-sm data-[icon-placement=start]:ps-7 data-[icon-placement=end]:pe-7",
    md: "text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9",
    lg: "text-base rounded-lg py-3 leading-none px-3 ring-4 shadow-sm data-[icon-placement=start]:ps-11 data-[icon-placement=end]:pe-11"
  },
  color: {
    primary: "hover:border-primary hover:ring-primary/10 focus:border-primary focus:ring-primary/10",
    secondary: "hover:border-secondary hover:ring-secondary/10 focus:border-secondary focus:ring-secondary/10",
    info: "hover:border-info hover:ring-info/10 focus:border-info focus:ring-info/10",
    success: "hover:border-success hover:ring-success/10 focus:border-success focus:ring-success/10",
    warning: "hover:border-warning hover:ring-warning/10 focus:border-warning focus:ring-warning/10",
    error: "hover:border-error hover:ring-error/10 focus:border-error focus:ring-error/10"
  }
};
var inputIconTheme = {
  defaultProps: {
    placement: "start"
  },
  baseStyle: "pointer-events-none absolute top-1/2 -translate-y-1/2 text-foreground/70 peer-hover:text-black peer-focus:text-black dark:peer-hover:text-white dark:peer-focus:text-white transition-all duration-300 ease-in overflow-hidden",
  size: {
    sm: "w-4 h-4 data-[placement=start]:left-2 data-[placement=end]:right-2",
    md: "w-5 h-5 data-[placement=start]:left-2.5 data-[placement=end]:right-2.5",
    lg: "w-6 h-6 data-[placement=start]:left-3 data-[placement=end]:right-3"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-C4GS2FOC.js
var accordionTheme = {
  defaultProps: {
    type: "single"
  }
};
var accordionItemTheme = {
  defaultProps: {
    disabled: false
  },
  baseStyle: "group block w-full items-center justify-between cursor-pointer border-b border-surface aria-disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:select-none"
};
var accordionTriggerTheme = {
  baseStyle: "flex items-center justify-between w-full py-5 text-left font-medium dark:text-white text-black"
};
var accordionContentTheme = {
  baseStyle: "block pb-5 text-sm text-foreground h-0 data-[open=true]:h-auto"
};

// node_modules/@material-tailwind/react/dist/chunk-YTQ4A2UH.js
var alertTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    variant: "solid",
    rounded: false
  },
  baseStyle: "relative flex items-start w-full border rounded-md p-2 data-[pill=true]:rounded-full",
  variant: {
    ghost: {
      primary: "bg-primary/10 border-transparent text-primary",
      secondary: "bg-secondary/10 border-transparent text-secondary-foreground",
      info: "bg-info/10 border-transparent text-info",
      success: "bg-success/10 border-transparent text-success",
      warning: "bg-warning/10 border-transparent text-warning",
      error: "bg-error/10 border-transparent text-error"
    },
    solid: {
      primary: "bg-primary border-primary text-primary-foreground",
      secondary: "bg-secondary border-secondary text-secondary-foreground",
      info: "bg-info border-info text-info-foreground",
      success: "bg-success border-success text-success-foreground",
      warning: "bg-warning border-warning text-warning-foreground",
      error: "bg-error border-error text-error-foreground"
    },
    outline: {
      primary: "bg-transparent border-primary text-primary",
      secondary: "bg-transparent border-secondary text-secondary-foreground",
      info: "bg-transparent border-info text-info",
      success: "bg-transparent border-success text-success",
      warning: "bg-transparent border-warning text-warning",
      error: "bg-transparent border-error text-error"
    },
    gradient: {
      primary: "bg-gradient-to-tr from-primary-dark to-primary-light border-primary text-primary-foreground",
      secondary: "bg-gradient-to-tr from-secondary-dark to-secondary-light border-secondary text-secondary-foreground",
      info: "bg-gradient-to-tr from-info-dark to-info-light border-info text-info-foreground",
      success: "bg-gradient-to-tr from-success-dark to-success-light border-success text-success-foreground",
      warning: "bg-gradient-to-tr from-warning-dark to-warning-light border-warning text-warning-foreground",
      error: "bg-gradient-to-tr from-error-dark to-error-light border-error text-error-foreground"
    }
  }
};
var alertContentTheme = {
  baseStyle: "w-full text-sm font-sans leading-none m-1.5"
};
var alertIconTheme = {
  baseStyle: "grid place-items-center shrink-0 p-1"
};
var alertDismissTriggerTheme = {
  baseStyle: "outline-none"
};

// node_modules/@material-tailwind/react/dist/chunk-PTC7KVHU.js
var avatarTheme = {
  defaultProps: {
    size: "md",
    variant: "circular"
  },
  baseStyle: "inline-block object-cover object-center data-[shape=square]:rounded-none data-[shape=circular]:rounded-full data-[shape=rounded]:rounded-[current]",
  size: {
    xs: "w-6 h-6 rounded-sm",
    sm: "w-8 h-8 rounded",
    md: "w-11 h-11 rounded-md",
    lg: "w-14 h-14 rounded-md",
    xl: "w-20 h-20 rounded-lg",
    xxl: "w-28 h-28 rounded-xl"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-V2YBIGWT.js
var badgeTheme = {
  defaultProps: {
    color: "primary",
    overlap: "square",
    placement: "top-end"
  },
  baseStyle: "relative inline-flex"
};
var badgeContentTheme = {
  baseStyle: ""
};
var badgeIndicatorTheme = {
  baseStyle: `
    absolute px-1 py-0.5 text-xs border leading-none grid place-items-center rounded-full min-w-3 min-h-3

    data-[placement='top-start']:data-[overlap='square']:top-[6%] data-[placement='top-start']:data-[overlap='square']:left-[6%]
    data-[placement='top-start']:data-[overlap='square']:-translate-x-1/2 data-[placement='top-start']:data-[overlap='square']:-translate-y-1/2
    data-[placement='top-start']:data-[overlap='circular']:top-[14%] data-[placement='top-start']:data-[overlap='circular']:left-[14%]
    data-[placement='top-start']:data-[overlap='circular']:-translate-x-1/2 data-[placement='top-start']:data-[overlap='circular']:-translate-y-1/2
    
    data-[placement='top-end']:data-[overlap='square']:top-[6%] data-[placement='top-end']:data-[overlap='square']:right-[6%]
    data-[placement='top-end']:data-[overlap='square']:translate-x-1/2 data-[placement='top-end']:data-[overlap='square']:-translate-y-1/2
    data-[placement='top-end']:data-[overlap='circular']:top-[14%] data-[placement='top-end']:data-[overlap='circular']:right-[14%]
    data-[placement='top-end']:data-[overlap='circular']:translate-x-1/2 data-[placement='top-end']:data-[overlap='circular']:-translate-y-1/2
    
    data-[placement='bottom-start']:data-[overlap='square']:bottom-[6%] data-[placement='bottom-start']:data-[overlap='square']:left-[6%]
    data-[placement='bottom-start']:data-[overlap='square']:-translate-x-1/2 data-[placement='bottom-start']:data-[overlap='square']:translate-y-1/2
    data-[placement='bottom-start']:data-[overlap='circular']:bottom-[14%] data-[placement='bottom-start']:data-[overlap='circular']:left-[14%]
    data-[placement='bottom-start']:data-[overlap='circular']:-translate-x-1/2 data-[placement='bottom-start']:data-[overlap='circular']:translate-y-1/2
    
    data-[placement='bottom-end']:data-[overlap='square']:bottom-[6%] data-[placement='bottom-end']:data-[overlap='square']:right-[6%]
    data-[placement='bottom-end']:data-[overlap='square']:translate-x-1/2 data-[placement='bottom-end']:data-[overlap='square']:translate-y-1/2
    data-[placement='bottom-end']:data-[overlap='circular']:bottom-[14%] data-[placement='bottom-end']:data-[overlap='circular']:right-[14%]
    data-[placement='bottom-end']:data-[overlap='circular']:translate-x-1/2 data-[placement='bottom-end']:data-[overlap='circular']:translate-y-1/2
  `,
  color: {
    primary: "bg-primary border-primary text-primary-foreground",
    secondary: "bg-secondary border-secondary text-secondary-foreground",
    info: "bg-info border-info text-info-foreground",
    success: "bg-success border-success text-success-foreground",
    warning: "bg-warning border-warning text-warning-foreground",
    error: "bg-error border-error text-error-foreground"
  }
};

// node_modules/@material-tailwind/react/dist/chunk-FOAJJTIZ.js
var breadcrumbTheme = {
  baseStyle: "flex flex-wrap items-center gap-1 p-1"
};
var breadcrumbLinkTheme = {
  baseStyle: "inline-flex items-center gap-1.5 text-sm text-black dark:text-white transition-colors duration-300 ease-in hover:text-primary dark:hover:text-primary"
};
var breadcrumbSeparatorTheme = {
  baseStyle: "inline-block mx-1 text-sm select-none pointer-events-none opacity-50 text-black dark:text-white"
};

// node_modules/@material-tailwind/react/dist/chunk-LN4CMBOV.js
var buttonGroupTheme = {
  defaultProps: {
    size: "md",
    color: "primary",
    variant: "solid",
    ripple: true,
    isFullWidth: false,
    isPill: false,
    orientation: "horizontal"
  },
  baseStyle: "inline-flex data-[width=full]:w-full data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:[&:not(:first-child):not(:last-child):not([data-variant=ghost])]:[&_*]:rounded-none data-[orientation=horizontal]:[&:first-child:not([data-variant=ghost])]:[&_*]:rounded-r-none data-[orientation=horizontal]:[&:last-child:not([data-variant=ghost])]:[&_*]:rounded-l-none data-[orientation=horizontal]:[&:not(:first-child):not(:last-child):not([data-variant=ghost])]:[&_*]:border-l-0 data-[orientation=horizontal]:[&:last-child:not([data-variant=ghost])]:[&_*]:border-l-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:[&:not(:first-child):not(:last-child):not([data-variant=ghost])]:[&_*]:rounded-none data-[orientation=vertical]:[&:first-child:not([data-variant=ghost])]:[&_*]:rounded-b-none data-[orientation=vertical]:[&:last-child:not([data-variant=ghost])]:[&_*]:rounded-t-none data-[orientation=vertical]:[&:not(:first-child):not(:last-child):not([data-variant=ghost])]:[&_*]:border-t-0 data-[orientation=vertical]:[&:last-child:not([data-variant=ghost])]:[&_*]:border-t-0"
};

// node_modules/@material-tailwind/react/dist/chunk-FQY26STY.js
var cardTheme = {
  defaultProps: {
    variant: "solid",
    color: "default"
  },
  baseStyle: "w-full rounded-lg border shadow-sm overflow-hidden",
  variant: {
    ghost: {
      default: "bg-background/10 border-transparent shadow-transparent",
      primary: "bg-primary/10 border-transparent shadow-transparent",
      secondary: "bg-secondary/10 border-transparent shadow-transparent",
      info: "bg-info/10 border-transparent shadow-transparent",
      success: "bg-success/10 border-transparent shadow-transparent",
      warning: "bg-warning/10 border-transparent shadow-transparent",
      error: "bg-error/10 border-transparent shadow-transparent"
    },
    solid: {
      default: "bg-background border-surface shadow-black/5",
      primary: "bg-primary border-primary-dark shadow-primary-dark/25",
      secondary: "bg-secondary border-secondary-dark shadow-secondary-dark/25",
      info: "bg-info border-info-dark shadow-info-dark/25",
      success: "bg-success border-success-dark shadow-success-dark/25",
      warning: "bg-warning border-warning-dark shadow-warning-dark/25",
      error: "bg-error border-error-dark shadow-error-dark/25"
    },
    outline: {
      default: "bg-transparent border-surface shadow-black/5",
      primary: "bg-transparent border-primary shadow-black/5",
      secondary: "bg-transparent border-secondary shadow-black/5",
      info: "bg-transparent border-info shadow-black/5",
      success: "bg-transparent border-success shadow-black/5",
      warning: "bg-transparent border-warning shadow-black/5",
      error: "bg-transparent border-error shadow-black/5"
    },
    gradient: {
      default: "bg-background border-surface shadow-black/5",
      primary: "bg-gradient-to-t from-primary-dark to-primary-light shadow-primary/25 border-primary",
      secondary: "bg-gradient-to-t from-secondary-dark to-secondary-light shadow-secondary/25 border-secondary",
      info: "bg-gradient-to-t from-info-dark to-info-light shadow-info/25 border-info",
      success: "bg-gradient-to-t from-success-dark to-success-light shadow-success/25 border-success",
      warning: "bg-gradient-to-t from-warning-dark to-warning-light shadow-warning/25 border-warning",
      error: "bg-gradient-to-t from-error-dark to-error-light shadow-error/25 border-error"
    }
  }
};
var cardHeaderTheme = {
  baseStyle: "w-[calc(100%-16px)] h-max rounded m-2"
};
var cardBodyTheme = {
  baseStyle: "w-full h-max rounded px-3.5 py-2.5"
};
var cardFooterTheme = {
  baseStyle: "w-full px-3.5 pt-2 pb-3.5 rounded"
};

// node_modules/@material-tailwind/react/dist/chunk-GUZBX522.js
var theme = {
  accordion: accordionTheme,
  accordionItem: accordionItemTheme,
  accordionTrigger: accordionTriggerTheme,
  accordionContent: accordionContentTheme,
  alert: alertTheme,
  alertContent: alertContentTheme,
  alertIcon: alertIconTheme,
  alertDismissTrigger: alertDismissTriggerTheme,
  avatar: avatarTheme,
  breadcrumb: breadcrumbTheme,
  breadcrumbLink: breadcrumbLinkTheme,
  breadcrumbSeparator: breadcrumbSeparatorTheme,
  button: buttonTheme,
  buttonGroup: buttonGroupTheme,
  checkbox: checkboxTheme,
  checkboxIndicator: checkboxIndicatorTheme,
  card: cardTheme,
  cardHeader: cardHeaderTheme,
  cardBody: cardBodyTheme,
  cardFooter: cardFooterTheme,
  chip: chipTheme,
  chipLabel: chipLabelTheme,
  chipIcon: chipIconTheme,
  chipDismissTrigger: chipDismissTriggerTheme,
  collapse: collapseTheme,
  dialog: dialogTheme,
  dialogTrigger: dialogTriggerTheme,
  dialogOverlay: dialogOverlayTheme,
  dialogContent: dialogContentTheme,
  dialogDismissTrigger: dialogDismissTriggerTheme,
  drawerTrigger: drawerTriggerTheme,
  drawerOverlay: drawerOverlayTheme,
  drawerPanel: drawerPanelTheme,
  drawerDismissTrigger: drawerDismissTriggerTheme,
  iconButton: iconButtonTheme,
  input: inputTheme,
  inputIcon: inputIconTheme,
  list: listTheme,
  listItem: listItemTheme,
  listItemStart: listItemStartTheme,
  listItemEnd: listItemEndTheme,
  menu: menuTheme,
  menuContent: menuContentTheme,
  menuTrigger: menuTriggerTheme,
  menuItem: menuItemTheme,
  popover: popoverTheme,
  popoverTrigger: popoverTriggerTheme,
  popoverContent: popoverContentTheme,
  popoverArrow: popoverArrowTheme,
  progress: progressTheme,
  progressBar: progressBarTheme,
  radio: radioTheme,
  radioItem: radioItemTheme,
  radioIndicator: radioIndicatorTheme,
  rating: ratingTheme,
  select: selectTheme,
  selectTrigger: selectTriggerTheme,
  selectList: selectListTheme,
  selectOption: selectOptionTheme,
  spinner: spinnerTheme,
  switch: switchTheme,
  tabs: tabsTheme,
  tabsList: tabsListTheme,
  tabsTrigger: tabsTriggerTheme,
  tabsPanel: tabsPanelTheme,
  tabsTriggerIndicator: tabsTriggerIndicatorTheme,
  textarea: textareaTheme,
  tooltip: tooltipTheme,
  tooltipTrigger: tooltipTriggerTheme,
  tooltipContent: tooltipContentTheme,
  tooltipArrow: tooltipArrowTheme,
  typography: typographyTheme,
  timeline: timelineTheme,
  timelineItem: timelineItemTheme,
  timelineHeader: timelineHeaderTheme,
  timelineIcon: timelineIconTheme,
  timelineSeparator: timelineSeparatorTheme,
  timelineBody: timelineBodyTheme,
  navbar: navbarTheme,
  badge: badgeTheme,
  badgeContent: badgeContentTheme,
  badgeIndicator: badgeIndicatorTheme,
  slider: sliderTheme,
  sliderRange: sliderRangeTheme,
  sliderThumb: sliderThumbTheme,
  sliderTick: sliderTickTheme
};

// node_modules/tailwind-merge/dist/lib/tw-join.mjs
function twJoin() {
  var index3 = 0;
  var argument;
  var resolvedValue;
  var string = "";
  while (index3 < arguments.length) {
    if (argument = arguments[index3++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  var resolvedValue;
  var string = "";
  for (var k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}

// node_modules/tailwind-merge/dist/_virtual/_rollupPluginBabelHelpers.mjs
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// node_modules/tailwind-merge/dist/lib/class-utils.mjs
var CLASS_PART_SEPARATOR = "-";
function createClassUtils(config) {
  var classMap = createClassMap(config);
  function getClassGroupId(className) {
    var classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId) {
    return config.conflictingClassGroups[classGroupId] || [];
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  var _classPartObject$vali;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  var currentClassPart = classParts[0];
  var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  var classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_classPartObject$vali = classPartObject.validators.find(function(_ref) {
    var validator = _ref.validator;
    return validator(classRest);
  })) == null ? void 0 : _classPartObject$vali.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    var property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  var theme2 = config.theme, prefix = config.prefix;
  var classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(function(_ref2) {
    var classGroupId = _ref2[0], classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme2);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme2) {
  classGroup.forEach(function(classDefinition) {
    if (typeof classDefinition === "string") {
      var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme2), classPartObject, classGroupId, theme2);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(function(_ref3) {
      var key = _ref3[0], classGroup2 = _ref3[1];
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme2);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function(pathPart) {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(function(_ref4) {
    var classGroupId = _ref4[0], classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function(classDefinition) {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(function(_ref5) {
          var key = _ref5[0], value = _ref5[1];
          return [prefix + key, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}

// node_modules/tailwind-merge/dist/lib/lru-cache.mjs
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: function get() {
        return void 0;
      },
      set: function set() {
      }
    };
  }
  var cacheSize = 0;
  var cache = /* @__PURE__ */ new Map();
  var previousCache = /* @__PURE__ */ new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get: function get(key) {
      var value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set: function set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}

// node_modules/tailwind-merge/dist/lib/modifier-utils.mjs
var IMPORTANT_MODIFIER = "!";
function createSplitModifiers(config) {
  var separator = config.separator || ":";
  return function splitModifiers(className) {
    var bracketDepth = 0;
    var modifiers = [];
    var modifierStart = 0;
    for (var index3 = 0; index3 < className.length; index3++) {
      var _char = className[index3];
      if (bracketDepth === 0 && _char === separator[0]) {
        if (separator.length === 1 || className.slice(index3, index3 + separator.length) === separator) {
          modifiers.push(className.slice(modifierStart, index3));
          modifierStart = index3 + separator.length;
        }
      }
      if (_char === "[") {
        bracketDepth++;
      } else if (_char === "]") {
        bracketDepth--;
      }
    }
    var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function(modifier) {
    var isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
  return sortedModifiers;
}

// node_modules/tailwind-merge/dist/lib/config-utils.mjs
function createConfigUtils(config) {
  return _extends({
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config)
  }, createClassUtils(config));
}

// node_modules/tailwind-merge/dist/lib/merge-classlist.mjs
var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
  var splitModifiers = configUtils.splitModifiers, getClassGroupId = configUtils.getClassGroupId, getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  var classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(function(originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName), modifiers = _splitModifiers.modifiers, hasImportantModifier = _splitModifiers.hasImportantModifier, baseClassName = _splitModifiers.baseClassName;
    var classGroupId = getClassGroupId(baseClassName);
    if (!classGroupId) {
      return {
        isTailwindClass: false,
        originalClassName
      };
    }
    var variantModifier = sortModifiers(modifiers).join(":");
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName
    };
  }).reverse().filter(function(parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId, classGroupId = parsed.classGroupId;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId).forEach(function(group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function(parsed) {
    return parsed.originalClassName;
  }).join(" ");
}

// node_modules/tailwind-merge/dist/lib/create-tailwind-merge.mjs
function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    var firstCreateConfig = createConfig[0], restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function(previousConfig, createConfigCurrent) {
      return createConfigCurrent(previousConfig);
    }, firstCreateConfig());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    var cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    var result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}

// node_modules/tailwind-merge/dist/lib/from-theme.mjs
function fromTheme(key) {
  var themeGetter = function themeGetter2(theme2) {
    return theme2[key] || [];
  };
  themeGetter.isThemeGetter = true;
  return themeGetter;
}

// node_modules/tailwind-merge/dist/lib/validators.mjs
var arbitraryValueRegex = /^\[(.+)\]$/;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh)/;
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(classPart) {
  return !Number.isNaN(Number(classPart)) || stringLengths.has(classPart) || fractionRegex.test(classPart) || isArbitraryLength(classPart);
}
function isArbitraryLength(classPart) {
  var _arbitraryValueRegex$;
  var arbitraryValue = (_arbitraryValueRegex$ = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$[1];
  if (arbitraryValue) {
    return arbitraryValue.startsWith("length:") || lengthUnitRegex.test(arbitraryValue);
  }
  return false;
}
function isArbitrarySize(classPart) {
  var _arbitraryValueRegex$2;
  var arbitraryValue = (_arbitraryValueRegex$2 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$2[1];
  return arbitraryValue ? arbitraryValue.startsWith("size:") : false;
}
function isArbitraryPosition(classPart) {
  var _arbitraryValueRegex$3;
  var arbitraryValue = (_arbitraryValueRegex$3 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$3[1];
  return arbitraryValue ? arbitraryValue.startsWith("position:") : false;
}
function isArbitraryUrl(classPart) {
  var _arbitraryValueRegex$4;
  var arbitraryValue = (_arbitraryValueRegex$4 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$4[1];
  return arbitraryValue ? arbitraryValue.startsWith("url(") || arbitraryValue.startsWith("url:") : false;
}
function isArbitraryNumber(classPart) {
  var _arbitraryValueRegex$5;
  var arbitraryValue = (_arbitraryValueRegex$5 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$5[1];
  return arbitraryValue ? !Number.isNaN(Number(arbitraryValue)) || arbitraryValue.startsWith("number:") : false;
}
function isInteger(classPart) {
  var _arbitraryValueRegex$6;
  var arbitraryValue = (_arbitraryValueRegex$6 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$6[1];
  if (arbitraryValue) {
    return Number.isInteger(Number(arbitraryValue));
  }
  return Number.isInteger(Number(classPart));
}
function isArbitraryValue(classPart) {
  return arbitraryValueRegex.test(classPart);
}
function isAny() {
  return true;
}
function isTshirtSize(classPart) {
  return tshirtUnitRegex.test(classPart);
}
function isArbitraryShadow(classPart) {
  var _arbitraryValueRegex$7;
  var arbitraryValue = (_arbitraryValueRegex$7 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$7[1];
  if (arbitraryValue) {
    return shadowRegex.test(arbitraryValue);
  }
  return false;
}

// node_modules/tailwind-merge/dist/lib/default-config.mjs
function getDefaultConfig() {
  var colors = fromTheme("colors");
  var spacing = fromTheme("spacing");
  var blur = fromTheme("blur");
  var brightness = fromTheme("brightness");
  var borderColor = fromTheme("borderColor");
  var borderRadius = fromTheme("borderRadius");
  var borderSpacing = fromTheme("borderSpacing");
  var borderWidth = fromTheme("borderWidth");
  var contrast = fromTheme("contrast");
  var grayscale = fromTheme("grayscale");
  var hueRotate = fromTheme("hueRotate");
  var invert = fromTheme("invert");
  var gap = fromTheme("gap");
  var gradientColorStops = fromTheme("gradientColorStops");
  var inset = fromTheme("inset");
  var margin = fromTheme("margin");
  var opacity = fromTheme("opacity");
  var padding = fromTheme("padding");
  var saturate = fromTheme("saturate");
  var scale = fromTheme("scale");
  var sepia = fromTheme("sepia");
  var skew = fromTheme("skew");
  var space = fromTheme("space");
  var translate = fromTheme("translate");
  var getOverscroll = function getOverscroll2() {
    return ["auto", "contain", "none"];
  };
  var getOverflow = function getOverflow2() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  };
  var getSpacingWithAuto = function getSpacingWithAuto2() {
    return ["auto", spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty2() {
    return ["", isLength];
  };
  var getIntegerWithAuto = function getIntegerWithAuto2() {
    return ["auto", isInteger];
  };
  var getPositions = function getPositions2() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  };
  var getLineStyles = function getLineStyles2() {
    return ["solid", "dashed", "dotted", "double", "none"];
  };
  var getBlendModes = function getBlendModes2() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  };
  var getAlign = function getAlign2() {
    return ["start", "end", "center", "between", "around", "evenly"];
  };
  var getZeroAndEmpty = function getZeroAndEmpty2() {
    return ["", "0", isArbitraryValue];
  };
  var getBreaks = function getBreaks2() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ["none", "", isTshirtSize, isArbitraryLength],
      brightness: [isInteger],
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryLength],
      borderSpacing: [spacing],
      borderWidth: getLengthWithEmpty(),
      contrast: [isInteger],
      grayscale: getZeroAndEmpty(),
      hueRotate: [isInteger],
      invert: getZeroAndEmpty(),
      gap: [spacing],
      gradientColorStops: [colors],
      inset: getSpacingWithAuto(),
      margin: getSpacingWithAuto(),
      opacity: [isInteger],
      padding: [spacing],
      saturate: [isInteger],
      scale: [isInteger],
      sepia: getZeroAndEmpty(),
      skew: [isInteger, isArbitraryValue],
      space: [spacing],
      translate: [spacing]
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{
        "float": ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [spacing]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: [isInteger]
        }]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getIntegerWithAuto()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getIntegerWithAuto()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger]
        }]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getIntegerWithAuto()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getIntegerWithAuto()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: getAlign()
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: [].concat(getAlign(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(getAlign(), ["baseline", "stretch"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", isLength]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryLength]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [spacing, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", isLength]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [spacing, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryLength]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(getLineStyles(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: [spacing]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryLength]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{
        "break": ["normal", "words", "all", "keep"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryUrl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(getLineStyles(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(getLineStyles())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmpty()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Beldn Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isInteger]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isInteger]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": [spacing]
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": [spacing]
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": [spacing]
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": [spacing]
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": [spacing]
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": [spacing]
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": [spacing]
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": [spacing]
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": [spacing]
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": [spacing]
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": [spacing]
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": [spacing]
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": [spacing]
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": [spacing]
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    }
  };
}

// node_modules/tailwind-merge/dist/lib/tw-merge.mjs
var twMerge = createTailwindMerge(getDefaultConfig);

// node_modules/@material-tailwind/react/dist/chunk-5DV345YV.js
function mergeTheme(entry) {
  const result = {};
  const defaultProps = entry?.["defaultProps"];
  for (const key in entry) {
    if (key !== "defaultProps") {
      if (Array.isArray(entry[key])) {
        Object.assign(result, {
          [key]: twMerge(entry[key].join(" "))
        });
      } else {
        Object.assign(result, {
          [key]: mergeTheme(entry[key])
        });
      }
    }
  }
  return defaultProps ? {
    ...result,
    defaultProps
  } : result;
}

// node_modules/@material-tailwind/react/dist/chunk-L3VNOE5J.js
function parseObject(entry) {
  const result = {};
  const defaultProps = entry?.["defaultProps"];
  for (const key in entry) {
    if (key !== "defaultProps") {
      if (typeof entry[key] === "object") {
        Object.assign(result, {
          [key]: parseObject(entry[key])
        });
      } else {
        Object.assign(result, {
          [key]: entry[key].split(" ")
        });
      }
    }
  }
  return defaultProps ? {
    ...result,
    defaultProps
  } : result;
}

// node_modules/@material-tailwind/react/dist/chunk-JVDTBYWX.js
var React = __toESM(require_react(), 1);
var import_deepmerge = __toESM(require_cjs(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var MaterialTailwindThemeContext = React.createContext(theme);
MaterialTailwindThemeContext.displayName = "MaterialTailwind.ThemeProvider";
function ThemeProvider({
  value,
  children
}) {
  const mainTheme = parseObject(theme);
  const providedTheme = parseObject(value);
  const combinedTheme = (0, import_deepmerge.default)(mainTheme, providedTheme);
  const mergedTheme = mergeTheme(combinedTheme);
  return (0, import_jsx_runtime3.jsx)(MaterialTailwindThemeContext.Provider, { value: mergedTheme, children });
}
function useTheme() {
  const context = React.useContext(MaterialTailwindThemeContext);
  if (!context) {
    return null;
  }
  return context;
}

// node_modules/@material-tailwind/react/dist/chunk-G4TWRQ5Y.js
var React4 = __toESM(require_react(), 1);

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var React3 = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}

// node_modules/@floating-ui/react/utils/dist/floating-ui.react.utils.mjs
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
    var _activeElement;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map((_ref) => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  if (isAndroid() && event.pointerType) {
    return event.type === "click" && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  return !isAndroid() && event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function isAndroid() {
  const re = /android/i;
  return re.test(getPlatform()) || re.test(getUserAgent());
}
function isMac() {
  return getPlatform().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ["mouse", "pen"];
  if (!strict) {
    values.push("", void 0);
  }
  return values.includes(pointerType);
}
function isReactEvent(event) {
  return "nativeEvent" in event;
}
function isRootElement(element) {
  return element.matches("html,body");
}
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const e = event;
  return e.target != null && node.contains(e.target);
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
  return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var floor = Math.floor;

// node_modules/@floating-ui/core/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides2 = ["top", "right", "bottom", "left"];
var alignments2 = ["start", "end"];
var placements2 = sides2.reduce((acc, side) => acc.concat(side, side + "-" + alignments2[0], side + "-" + alignments2[1]), []);
var min = Math.min;
var max = Math.max;
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max3 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset4 = clamp(min$1, center, max3);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max3 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset4,
        centerOffset: center - offset4 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements4 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides4 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides4[0]], overflow[sides4[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements4[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min3 = mainAxisCoord + overflow[minSide];
        const max3 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min3, mainAxisCoord, max3);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min3 = crossAxisCoord + overflow[minSide];
        const max3 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min3, crossAxisCoord, max3);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/dom/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides3 = ["top", "right", "bottom", "left"];
var alignments3 = ["start", "end"];
var placements3 = sides3.reduce((acc, side) => acc.concat(side, side + "-" + alignments3[0], side + "-" + alignments3[1]), []);
var min2 = Math.min;
var max2 = Math.max;
var round = Math.round;
var floor2 = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});

// node_modules/@floating-ui/dom/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName2(node) {
  if (isNode2(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement2(node) {
  var _ref;
  return (_ref = (isNode2(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode2(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement2(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement2(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot2(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
var invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle3(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
var tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);
function isTableElement(element) {
  return tableElements.has(getNodeName2(element));
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
var transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
var willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
var containValues = ["paint", "layout", "strict", "content"];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement2(elementOrCss) ? getComputedStyle3(elementOrCss) : elementOrCss;
  return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode2(element);
  while (isHTMLElement2(currentNode) && !isLastTraversableNode2(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode2(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
var lastTraversableNodeNames = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function isLastTraversableNode2(node) {
  return lastTraversableNodeNames.has(getNodeName2(node));
}
function getComputedStyle3(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement2(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode2(node) {
  if (getNodeName2(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot2(node) && node.host || // Fallback.
    getDocumentElement2(node)
  );
  return isShadowRoot2(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode2(node);
  if (isLastTraversableNode2(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement2(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle3(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement2(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement2(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement2(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow2(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement2(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow2(domElement);
    const offsetWin = offsetParent && isElement2(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle3(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement2(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement2(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement2(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName2(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement2(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement2(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max2(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max2(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle3(body).direction === "rtl") {
    x += max2(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement2(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement2(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement2(element));
  } else if (isElement2(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode2(element);
  if (parentNode === stopNode || !isElement2(parentNode) || isLastTraversableNode2(parentNode)) {
    return false;
  }
  return getComputedStyle3(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement2(el) && getNodeName2(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle3(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode2(element) : element;
  while (isElement2(currentNode) && !isLastTraversableNode2(currentNode)) {
    const computedStyle = getComputedStyle3(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode2(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement2(offsetParent);
  const documentElement = getDocumentElement2(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName2(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle3(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement2(element) || getComputedStyle3(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement2(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement2(element)) {
    let svgOffsetParent = getParentNode2(element);
    while (svgOffsetParent && !isLastTraversableNode2(svgOffsetParent)) {
      if (isElement2(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode2(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode2(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle3(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: getDocumentElement2,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: isElement2,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement2(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId2);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor2(top);
    const insetRight = floor2(root.clientWidth - (left + width));
    const insetBottom = floor2(root.clientHeight - (top + height));
    const insetLeft = floor2(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max2(0, min2(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React2 = __toESM(require_react(), 1);
var import_react = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var isClient = typeof document !== "undefined";
var noop = function noop2() {
};
var index = isClient ? import_react.useLayoutEffect : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React2.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React2.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React2.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React2.useState(null);
  const [_floating, _setFloating] = React2.useState(null);
  const setReference = React2.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React2.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React2.useRef(null);
  const floatingRef = React2.useRef(null);
  const dataRef = React2.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React2.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React2.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React2.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React2.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React2.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React2.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
var offset3 = (options, deps) => ({
  ...offset2(options),
  options: [options, deps]
});
var shift3 = (options, deps) => ({
  ...shift2(options),
  options: [options, deps]
});
var flip3 = (options, deps) => ({
  ...flip2(options),
  options: [options, deps]
});
var size3 = (options, deps) => ({
  ...size2(options),
  options: [options, deps]
});
var arrow3 = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var import_react_dom3 = __toESM(require_react_dom(), 1);
function useMergeRefs(refs) {
  return React3.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
var useInsertionEffect = React3["useInsertionEffect".toString()];
var useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React3.useRef(() => {
    if (true) {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React3.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index3, cols, prevRow) {
  return Math.floor(index3 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index3) {
  return index3 < 0 || index3 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  const isDisabledIndex = disabledIndices ? (index4) => disabledIndices.includes(index4) : (index4) => {
    const element = list[index4];
    return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
  };
  let index3 = startingIndex;
  do {
    index3 += decrement ? -amount : amount;
  } while (index3 >= 0 && index3 <= list.length - 1 && isDisabledIndex(index3));
  return index3;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset4 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset4 : offset4 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === ARROW_RIGHT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === ARROW_LEFT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices,
          decrement: true
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === ARROW_LEFT ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
var rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}
var index2 = typeof document !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;
function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
var FloatingListContext = React3.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function FloatingList(_ref) {
  let {
    children,
    elementsRef,
    labelsRef
  } = _ref;
  const [map, setMap] = React3.useState(() => /* @__PURE__ */ new Map());
  const register = React3.useCallback((node) => {
    setMap((prevMap) => new Map(prevMap).set(node, null));
  }, []);
  const unregister = React3.useCallback((node) => {
    setMap((prevMap) => {
      const map2 = new Map(prevMap);
      map2.delete(node);
      return map2;
    });
  }, []);
  index2(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index3) => {
      newMap.set(node, index3);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return React3.createElement(FloatingListContext.Provider, {
    value: React3.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef])
  }, children);
}
function useListItem(_temp) {
  let {
    label
  } = _temp === void 0 ? {} : _temp;
  const [index$1, setIndex] = React3.useState(null);
  const componentRef = React3.useRef(null);
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = React3.useContext(FloatingListContext);
  const ref = React3.useCallback((node) => {
    componentRef.current = node;
    if (index$1 !== null) {
      elementsRef.current[index$1] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== void 0;
        labelsRef.current[index$1] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index$1, elementsRef, labelsRef, label]);
  index2(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index2(() => {
    const index3 = componentRef.current ? map.get(componentRef.current) : null;
    if (index3 != null) {
      setIndex(index3);
    }
  }, [map]);
  return React3.useMemo(() => ({
    ref,
    index: index$1 == null ? -1 : index$1
  }), [index$1, ref]);
}
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  } else if (render) {
    return React3.cloneElement(render, computedProps);
  }
  return React3.createElement("div", computedProps);
}
var CompositeContext = React3.createContext({
  activeIndex: 0,
  onNavigate: () => {
  }
});
var horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
var verticalKeys = [ARROW_UP, ARROW_DOWN];
var allKeys = [...horizontalKeys, ...verticalKeys];
var Composite = React3.forwardRef(function Composite2(_ref, forwardedRef) {
  let {
    render,
    orientation = "both",
    loop = true,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    ...props
  } = _ref;
  const [internalActiveIndex, internalSetActiveIndex] = React3.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = React3.useRef([]);
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const contextValue = React3.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    const prevIndex = activeIndex;
    let nextIndex = activeIndex;
    if (isGrid) {
      nextIndex = getGridNavigatedIndex(elementsRef, {
        event,
        orientation,
        loop,
        cols,
        disabledIndices,
        minIndex,
        maxIndex,
        prevIndex
      });
    }
    const toEndKeys = {
      horizontal: [ARROW_RIGHT],
      vertical: [ARROW_DOWN],
      both: [ARROW_RIGHT, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [ARROW_LEFT],
      vertical: [ARROW_UP],
      both: [ARROW_LEFT, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      queueMicrotask(() => {
        enqueueFocus(elementsRef.current[nextIndex]);
      });
    }
  }
  const computedProps = {
    ...props,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e) {
      props.onKeyDown == null || props.onKeyDown(e);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
      handleKeyDown(e);
    }
  };
  return React3.createElement(CompositeContext.Provider, {
    value: contextValue
  }, React3.createElement(FloatingList, {
    elementsRef
  }, renderJsx(render, computedProps)));
});
var CompositeItem = React3.forwardRef(function CompositeItem2(_ref2, forwardedRef) {
  let {
    render,
    ...props
  } = _ref2;
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = React3.useContext(CompositeContext);
  const {
    ref,
    index: index3
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index3;
  const computedProps = {
    ...props,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    "data-active": isActive ? "" : void 0,
    onFocus(e) {
      props.onFocus == null || props.onFocus(e);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e);
      onNavigate(index3);
    }
  };
  return renderJsx(render, computedProps);
});
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var serverHandoffComplete = false;
var count = 0;
var genId = () => "floating-ui-" + count++;
function useFloatingId() {
  const [id, setId] = React3.useState(() => serverHandoffComplete ? genId() : void 0);
  index2(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React3.useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
    }
  }, []);
  return id;
}
var useReactId = React3["useId".toString()];
var useId = useReactId || useFloatingId;
var FloatingArrow = React3.forwardRef(function FloatingArrow2(_ref, ref) {
  let {
    context: {
      placement,
      elements: {
        floating
      },
      middlewareData: {
        arrow: arrow4
      }
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d,
    style: {
      transform,
      ...restStyle
    } = {},
    ...rest
  } = _ref;
  if (true) {
    if (!ref) {
      console.warn("Floating UI: The `ref` prop is required for the `FloatingArrow`", "component.");
    }
  }
  const clipPathId = useId();
  if (!floating) {
    return null;
  }
  strokeWidth *= 2;
  const halfStrokeWidth = strokeWidth / 2;
  const svgX = width / 2 * (tipRadius / -8 + 1);
  const svgY = height / 2 * tipRadius / 4;
  const [side, alignment] = placement.split("-");
  const isRTL2 = platform.isRTL(floating);
  const isCustomShape = !!d;
  const isVerticalSide = side === "top" || side === "bottom";
  const yOffsetProp = staticOffset && alignment === "end" ? "bottom" : "top";
  let xOffsetProp = staticOffset && alignment === "end" ? "right" : "left";
  if (staticOffset && isRTL2) {
    xOffsetProp = alignment === "end" ? "left" : "right";
  }
  const arrowX = (arrow4 == null ? void 0 : arrow4.x) != null ? staticOffset || arrow4.x : "";
  const arrowY = (arrow4 == null ? void 0 : arrow4.y) != null ? staticOffset || arrow4.y : "";
  const dValue = d || "M0,0" + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + " Z";
  const rotation = {
    top: isCustomShape ? "rotate(180deg)" : "",
    left: isCustomShape ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: isCustomShape ? "" : "rotate(180deg)",
    right: isCustomShape ? "rotate(-90deg)" : "rotate(90deg)"
  }[side];
  return React3.createElement("svg", _extends2({}, rest, {
    "aria-hidden": true,
    ref,
    width: isCustomShape ? width : width + strokeWidth,
    height: width,
    viewBox: "0 0 " + width + " " + (height > width ? height : width),
    style: {
      position: "absolute",
      pointerEvents: "none",
      [xOffsetProp]: arrowX,
      [yOffsetProp]: arrowY,
      [side]: isVerticalSide || isCustomShape ? "100%" : "calc(100% - " + strokeWidth / 2 + "px)",
      transform: "" + rotation + (transform != null ? transform : ""),
      ...restStyle
    }
  }), strokeWidth > 0 && React3.createElement("path", {
    clipPath: "url(#" + clipPathId + ")",
    fill: "none",
    stroke,
    strokeWidth: strokeWidth + (d ? 0 : 1),
    d: dValue
  }), React3.createElement("path", {
    stroke: strokeWidth && !d ? rest.fill : "none",
    d: dValue
  }), React3.createElement("clipPath", {
    id: clipPathId
  }, React3.createElement("rect", {
    x: -halfStrokeWidth,
    y: halfStrokeWidth * (isCustomShape ? -1 : 1),
    width: width + strokeWidth,
    height: width
  })));
});
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
var FloatingNodeContext = React3.createContext(null);
var FloatingTreeContext = React3.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React3.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
var useFloatingTree = () => React3.useContext(FloatingTreeContext);
function useFloatingNodeId(customParentId) {
  const id = useId();
  const tree = useFloatingTree();
  const reactParentId = useFloatingParentNodeId();
  const parentId = customParentId || reactParentId;
  index2(() => {
    const node = {
      id,
      parentId
    };
    tree == null || tree.addNode(node);
    return () => {
      tree == null || tree.removeNode(node);
    };
  }, [tree, id, parentId]);
  return id;
}
function FloatingNode(_ref) {
  let {
    children,
    id
  } = _ref;
  const parentId = useFloatingParentNodeId();
  return React3.createElement(FloatingNodeContext.Provider, {
    value: React3.useMemo(() => ({
      id,
      parentId
    }), [id, parentId])
  }, children);
}
function FloatingTree(_ref2) {
  let {
    children
  } = _ref2;
  const nodesRef = React3.useRef([]);
  const addNode = React3.useCallback((node) => {
    nodesRef.current = [...nodesRef.current, node];
  }, []);
  const removeNode = React3.useCallback((node) => {
    nodesRef.current = nodesRef.current.filter((n) => n !== node);
  }, []);
  const events = React3.useState(() => createPubSub())[0];
  return React3.createElement(FloatingTreeContext.Provider, {
    value: React3.useMemo(() => ({
      nodesRef,
      addNode,
      removeNode,
      events
    }), [nodesRef, addNode, removeNode, events])
  }, children);
}
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
function useLatestRef2(value) {
  const ref = (0, import_react2.useRef)(value);
  index2(() => {
    ref.current = value;
  });
  return ref;
}
var safePolygonIdentifier = createAttribute("safe-polygon");
function getDelay(value, prop, pointerType) {
  if (pointerType && !isMouseLikePointerType(pointerType)) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  return value == null ? void 0 : value[prop];
}
function useHover(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements: {
      domReference,
      floating
    },
    refs
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = props;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef2(handleClose);
  const delayRef = useLatestRef2(delay);
  const pointerTypeRef = React3.useRef();
  const timeoutRef = React3.useRef();
  const handlerRef = React3.useRef();
  const restTimeoutRef = React3.useRef();
  const blockMouseMoveRef = React3.useRef(true);
  const performedPointerEventsMutationRef = React3.useRef(false);
  const unbindMouseMoveRef = React3.useRef(() => {
  });
  const isHoverOpen = React3.useCallback(() => {
    var _dataRef$current$open;
    const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
    return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
  }, [dataRef]);
  React3.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onOpenChange2(_ref) {
      let {
        open: open2
      } = _ref;
      if (!open2) {
        clearTimeout(timeoutRef.current);
        clearTimeout(restTimeoutRef.current);
        blockMouseMoveRef.current = true;
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
    };
  }, [enabled, events]);
  React3.useEffect(() => {
    if (!enabled || !handleCloseRef.current || !open) {
      return;
    }
    function onLeave(event) {
      if (isHoverOpen()) {
        onOpenChange(false, event, "hover");
      }
    }
    const html = getDocument(floating).documentElement;
    html.addEventListener("mouseleave", onLeave);
    return () => {
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [floating, open, onOpenChange, enabled, handleCloseRef, dataRef, isHoverOpen]);
  const closeWithDelay = React3.useCallback(function(event, runElseBranch, reason) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    if (reason === void 0) {
      reason = "hover";
    }
    const closeDelay = getDelay(delayRef.current, "close", pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onOpenChange(false, event, reason), closeDelay);
    } else if (runElseBranch) {
      clearTimeout(timeoutRef.current);
      onOpenChange(false, event, reason);
    }
  }, [delayRef, onOpenChange]);
  const cleanupMouseMoveHandler = React3.useCallback(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = void 0;
  }, []);
  const clearPointerEvents = React3.useCallback(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = getDocument(refs.floating.current).body;
      body.style.pointerEvents = "";
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  }, [refs]);
  React3.useEffect(() => {
    if (!enabled) {
      return;
    }
    function isClickLikeOpenEvent() {
      return dataRef.current.openEvent ? ["click", "mousedown"].includes(dataRef.current.openEvent.type) : false;
    }
    function onMouseEnter(event) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;
      if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || restMs > 0 && getDelay(delayRef.current, "open") === 0) {
        return;
      }
      const openDelay = getDelay(delayRef.current, "open", pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = setTimeout(() => {
          onOpenChange(true, event, "hover");
        }, openDelay);
      } else {
        onOpenChange(true, event, "hover");
      }
    }
    function onMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      unbindMouseMoveRef.current();
      const doc = getDocument(floating);
      clearTimeout(restTimeoutRef.current);
      if (handleCloseRef.current) {
        if (!open) {
          clearTimeout(timeoutRef.current);
        }
        handlerRef.current = handleCloseRef.current({
          ...context,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            closeWithDelay(event, true, "safe-polygon");
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener("mousemove", handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener("mousemove", handler);
        };
        return;
      }
      const shouldClose = pointerTypeRef.current === "touch" ? !contains(floating, event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      handleCloseRef.current == null || handleCloseRef.current({
        ...context,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          closeWithDelay(event);
        }
      })(event);
    }
    if (isElement(domReference)) {
      const ref = domReference;
      open && ref.addEventListener("mouseleave", onScrollMouseLeave);
      floating == null || floating.addEventListener("mouseleave", onScrollMouseLeave);
      move && ref.addEventListener("mousemove", onMouseEnter, {
        once: true
      });
      ref.addEventListener("mouseenter", onMouseEnter);
      ref.addEventListener("mouseleave", onMouseLeave);
      return () => {
        open && ref.removeEventListener("mouseleave", onScrollMouseLeave);
        floating == null || floating.removeEventListener("mouseleave", onScrollMouseLeave);
        move && ref.removeEventListener("mousemove", onMouseEnter);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [domReference, floating, enabled, context, mouseOnly, restMs, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, tree, delayRef, handleCloseRef, dataRef]);
  index2(() => {
    var _handleCloseRef$curre;
    if (!enabled) {
      return;
    }
    if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
      const body = getDocument(floating).body;
      body.setAttribute(safePolygonIdentifier, "");
      body.style.pointerEvents = "none";
      performedPointerEventsMutationRef.current = true;
      if (isElement(domReference) && floating) {
        var _tree$nodesRef$curren;
        const ref = domReference;
        const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = "";
        }
        ref.style.pointerEvents = "auto";
        floating.style.pointerEvents = "auto";
        return () => {
          ref.style.pointerEvents = "";
          floating.style.pointerEvents = "";
        };
      }
    }
  }, [enabled, open, parentId, floating, domReference, tree, handleCloseRef, dataRef, isHoverOpen]);
  index2(() => {
    if (!open) {
      pointerTypeRef.current = void 0;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  React3.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      clearPointerEvents();
    };
  }, [enabled, domReference, cleanupMouseMoveHandler, clearPointerEvents]);
  return React3.useMemo(() => {
    if (!enabled) {
      return {};
    }
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      reference: {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove(event) {
          if (open || restMs === 0) {
            return;
          }
          clearTimeout(restTimeoutRef.current);
          restTimeoutRef.current = setTimeout(() => {
            if (!blockMouseMoveRef.current) {
              onOpenChange(true, event.nativeEvent, "hover");
            }
          }, restMs);
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(timeoutRef.current);
        },
        onMouseLeave(event) {
          closeWithDelay(event.nativeEvent, false);
        }
      }
    };
  }, [enabled, restMs, open, onOpenChange, closeWithDelay]);
}
var FloatingDelayGroupContext = React3.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: false
});
function getAncestors(nodes, id) {
  var _nodes$find;
  let allAncestors = [];
  let currentParentId = (_nodes$find = nodes.find((node) => node.id === id)) == null ? void 0 : _nodes$find.parentId;
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}
function getChildren(nodes, id) {
  let allChildren = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    });
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function getDeepestNode(nodes, id) {
  let deepestNodeId;
  let maxDepth = -1;
  function findDeepest(nodeId, depth) {
    if (depth > maxDepth) {
      deepestNodeId = nodeId;
      maxDepth = depth;
    }
    const children = getChildren(nodes, nodeId);
    children.forEach((child) => {
      findDeepest(child.id, depth + 1);
    });
  }
  findDeepest(id, 0);
  return nodes.find((node) => node.id === deepestNodeId);
}
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
var markerMap = {};
var lockCount = 0;
var supportsInert = () => typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
var unwrapHost = (node) => node && (node.host || unwrapHost(node.parentNode));
var correctElements = (parent, targets) => targets.map((target) => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter((x) => x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
  const markerName = "data-floating-ui-inert";
  const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToKeep = /* @__PURE__ */ new Set();
  const elementsToStop = new Set(avoidElements);
  const hiddenElements = [];
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  const markerCounter = markerMap[markerName];
  avoidElements.forEach(keep);
  deep(body);
  elementsToKeep.clear();
  function keep(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    el.parentNode && keep(el.parentNode);
  }
  function deep(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, (node) => {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
        const alreadyHidden = attr !== null && attr !== "false";
        const counterValue = (counterMap.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "");
        }
        if (!alreadyHidden && controlAttribute) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    });
  }
  lockCount++;
  return () => {
    hiddenElements.forEach((element) => {
      const counterValue = (counterMap.get(element) || 0) - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;
      counterMap.set(element, counterValue);
      markerCounter.set(element, markerValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) {
          element.removeAttribute(controlAttribute);
        }
        uncontrolledElementsSet.delete(element);
      }
      if (!markerValue) {
        element.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
      markerMap = {};
    }
  };
}
function markOthers(avoidElements, ariaHidden, inert) {
  if (ariaHidden === void 0) {
    ariaHidden = false;
  }
  if (inert === void 0) {
    inert = false;
  }
  const body = getDocument(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll("[aria-live]"))), body, ariaHidden, inert);
}
var getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function getTabbableIn(container, direction) {
  const allTabbable = tabbable(container, getTabbableOptions());
  if (direction === "prev") {
    allTabbable.reverse();
  }
  const activeIndex = allTabbable.indexOf(activeElement(getDocument(container)));
  const nextTabbableElements = allTabbable.slice(activeIndex + 1);
  return nextTabbableElements[0];
}
function getNextTabbable() {
  return getTabbableIn(document.body, "next");
}
function getPreviousTabbable() {
  return getTabbableIn(document.body, "prev");
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container, getTabbableOptions());
  tabbableElements.forEach((element) => {
    element.dataset.tabindex = element.getAttribute("tabindex") || "";
    element.setAttribute("tabindex", "-1");
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  });
}
var HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
var timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
var FocusGuard = React3.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React3.useState();
  index2(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return React3.createElement("span", _extends2({}, props, restProps));
});
var PortalContext = React3.createContext(null);
function useFloatingPortalNode(_temp) {
  let {
    id,
    root
  } = _temp === void 0 ? {} : _temp;
  const [portalNode, setPortalNode] = React3.useState(null);
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const data = React3.useMemo(() => ({
    id,
    root,
    portalContext,
    uniqueId
  }), [id, root, portalContext, uniqueId]);
  const dataRef = React3.useRef();
  index2(() => {
    return () => {
      portalNode == null || portalNode.remove();
    };
  }, [portalNode, data]);
  index2(() => {
    if (dataRef.current === data) return;
    dataRef.current = data;
    const {
      id: id2,
      root: root2,
      portalContext: portalContext2,
      uniqueId: uniqueId2
    } = data;
    const existingIdRoot = id2 ? document.getElementById(id2) : null;
    const attr = createAttribute("portal");
    if (existingIdRoot) {
      const subRoot = document.createElement("div");
      subRoot.id = uniqueId2;
      subRoot.setAttribute(attr, "");
      existingIdRoot.appendChild(subRoot);
      setPortalNode(subRoot);
    } else {
      let container = root2 || (portalContext2 == null ? void 0 : portalContext2.portalNode);
      if (container && !isElement(container)) container = container.current;
      container = container || document.body;
      let idWrapper = null;
      if (id2) {
        idWrapper = document.createElement("div");
        idWrapper.id = id2;
        container.appendChild(idWrapper);
      }
      const subRoot = document.createElement("div");
      subRoot.id = uniqueId2;
      subRoot.setAttribute(attr, "");
      container = idWrapper || container;
      container.appendChild(subRoot);
      setPortalNode(subRoot);
    }
  }, [data]);
  return portalNode;
}
function FloatingPortal(_ref) {
  let {
    children,
    id,
    root = null,
    preserveTabOrder = true
  } = _ref;
  const portalNode = useFloatingPortalNode({
    id,
    root
  });
  const [focusManagerState, setFocusManagerState] = React3.useState(null);
  const beforeOutsideRef = React3.useRef(null);
  const afterOutsideRef = React3.useRef(null);
  const beforeInsideRef = React3.useRef(null);
  const afterInsideRef = React3.useRef(null);
  const shouldRenderGuards = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode)
  );
  React3.useEffect(() => {
    if (!portalNode || !preserveTabOrder || focusManagerState != null && focusManagerState.modal) {
      return;
    }
    function onFocus(event) {
      if (portalNode && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, preserveTabOrder, focusManagerState == null ? void 0 : focusManagerState.modal]);
  return React3.createElement(PortalContext.Provider, {
    value: React3.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode])
  }, shouldRenderGuards && portalNode && React3.createElement(FocusGuard, {
    "data-type": "outside",
    ref: beforeOutsideRef,
    onFocus: (event) => {
      if (isOutsideEvent(event, portalNode)) {
        var _beforeInsideRef$curr;
        (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
      } else {
        const prevTabbable = getPreviousTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        prevTabbable == null || prevTabbable.focus();
      }
    }
  }), shouldRenderGuards && portalNode && React3.createElement("span", {
    "aria-owns": portalNode.id,
    style: HIDDEN_STYLES
  }), portalNode && (0, import_react_dom3.createPortal)(children, portalNode), shouldRenderGuards && portalNode && React3.createElement(FocusGuard, {
    "data-type": "outside",
    ref: afterOutsideRef,
    onFocus: (event) => {
      if (isOutsideEvent(event, portalNode)) {
        var _afterInsideRef$curre;
        (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
      } else {
        const nextTabbable = getNextTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        nextTabbable == null || nextTabbable.focus();
        (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent));
      }
    }
  }));
}
var usePortalContext = () => React3.useContext(PortalContext);
var LIST_LIMIT = 20;
var previouslyFocusedElements = [];
function addPreviouslyFocusedElement(element) {
  previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
  if (element && getNodeName(element) !== "body") {
    previouslyFocusedElements.push(element);
    if (previouslyFocusedElements.length > LIST_LIMIT) {
      previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
    }
  }
}
function getPreviouslyFocusedElement() {
  return previouslyFocusedElements.slice().reverse().find((el) => el.isConnected);
}
var VisuallyHiddenDismiss = React3.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return React3.createElement("button", _extends2({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    order = ["content"],
    guards: _guards = true,
    initialFocus = 0,
    returnFocus = true,
    modal: originalModal = true,
    visuallyHiddenDismiss = false,
    closeOnFocusOut = true
  } = props;
  const {
    open,
    refs,
    nodeId,
    onOpenChange,
    events,
    dataRef,
    elements: {
      domReference,
      floating
    }
  } = context;
  const ignoreInitialFocus = typeof initialFocus === "number" && initialFocus < 0;
  const isUntrappedTypeableCombobox = (domReference == null ? void 0 : domReference.getAttribute("role")) === "combobox" && isTypeableElement(domReference) && ignoreInitialFocus;
  const modal = isUntrappedTypeableCombobox ? false : originalModal;
  const guards = supportsInert() ? _guards : true;
  const orderRef = useLatestRef2(order);
  const initialFocusRef = useLatestRef2(initialFocus);
  const returnFocusRef = useLatestRef2(returnFocus);
  const tree = useFloatingTree();
  const portalContext = usePortalContext();
  const startDismissButtonRef = React3.useRef(null);
  const endDismissButtonRef = React3.useRef(null);
  const preventReturnFocusRef = React3.useRef(false);
  const isPointerDownRef = React3.useRef(false);
  const isInsidePortal = portalContext != null;
  const getTabbableContent = React3.useCallback(function(container) {
    if (container === void 0) {
      container = floating;
    }
    return container ? tabbable(container, getTabbableOptions()) : [];
  }, [floating]);
  const getTabbableElements = React3.useCallback((container) => {
    const content = getTabbableContent(container);
    return orderRef.current.map((type) => {
      if (domReference && type === "reference") {
        return domReference;
      }
      if (floating && type === "floating") {
        return floating;
      }
      return content;
    }).filter(Boolean).flat();
  }, [domReference, floating, orderRef, getTabbableContent]);
  React3.useEffect(() => {
    if (disabled || !modal) return;
    function onKeyDown(event) {
      if (event.key === "Tab") {
        if (contains(floating, activeElement(getDocument(floating))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          stopEvent(event);
        }
        const els = getTabbableElements();
        const target = getTarget(event);
        if (orderRef.current[0] === "reference" && target === domReference) {
          stopEvent(event);
          if (event.shiftKey) {
            enqueueFocus(els[els.length - 1]);
          } else {
            enqueueFocus(els[1]);
          }
        }
        if (orderRef.current[1] === "floating" && target === floating && event.shiftKey) {
          stopEvent(event);
          enqueueFocus(els[0]);
        }
      }
    }
    const doc = getDocument(floating);
    doc.addEventListener("keydown", onKeyDown);
    return () => {
      doc.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, domReference, floating, modal, orderRef, refs, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
  React3.useEffect(() => {
    if (disabled || !closeOnFocusOut) return;
    function handlePointerDown() {
      isPointerDownRef.current = true;
      setTimeout(() => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      queueMicrotask(() => {
        const movedToUnrelatedNode = !(contains(domReference, relatedTarget) || contains(floating, relatedTarget) || contains(relatedTarget, floating) || contains(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute("focus-guard")) || tree && (getChildren(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context, _node$context2;
          return contains((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || contains((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
        }) || getAncestors(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context3, _node$context4;
          return ((_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating) === relatedTarget || ((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.domReference) === relatedTarget;
        })));
        if (relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        relatedTarget !== getPreviouslyFocusedElement()) {
          preventReturnFocusRef.current = true;
          onOpenChange(false, event);
        }
      });
    }
    if (floating && isHTMLElement(domReference)) {
      domReference.addEventListener("focusout", handleFocusOutside);
      domReference.addEventListener("pointerdown", handlePointerDown);
      !modal && floating.addEventListener("focusout", handleFocusOutside);
      return () => {
        domReference.removeEventListener("focusout", handleFocusOutside);
        domReference.removeEventListener("pointerdown", handlePointerDown);
        !modal && floating.removeEventListener("focusout", handleFocusOutside);
      };
    }
  }, [disabled, domReference, floating, modal, nodeId, tree, portalContext, onOpenChange, closeOnFocusOut]);
  React3.useEffect(() => {
    var _portalContext$portal;
    if (disabled) return;
    const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute("portal") + "]")) || []);
    if (floating) {
      const insideElements = [floating, ...portalNodes, startDismissButtonRef.current, endDismissButtonRef.current, orderRef.current.includes("reference") || isUntrappedTypeableCombobox ? domReference : null].filter((x) => x != null);
      const cleanup = originalModal || isUntrappedTypeableCombobox ? markOthers(insideElements, guards, !guards) : markOthers(insideElements);
      return () => {
        cleanup();
      };
    }
  }, [disabled, domReference, floating, originalModal, orderRef, portalContext, isUntrappedTypeableCombobox, guards]);
  index2(() => {
    if (disabled || !floating) return;
    const doc = getDocument(floating);
    const previouslyFocusedElement = activeElement(doc);
    queueMicrotask(() => {
      const focusableElements = getTabbableElements(floating);
      const initialFocusValue = initialFocusRef.current;
      const elToFocus = (typeof initialFocusValue === "number" ? focusableElements[initialFocusValue] : initialFocusValue.current) || floating;
      const focusAlreadyInsideFloatingEl = contains(floating, previouslyFocusedElement);
      if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
        enqueueFocus(elToFocus, {
          preventScroll: elToFocus === floating
        });
      }
    });
  }, [disabled, open, floating, ignoreInitialFocus, getTabbableElements, initialFocusRef]);
  index2(() => {
    if (disabled || !floating) return;
    let preventReturnFocusScroll = false;
    const doc = getDocument(floating);
    const previouslyFocusedElement = activeElement(doc);
    const contextData = dataRef.current;
    addPreviouslyFocusedElement(previouslyFocusedElement);
    function onOpenChange2(_ref) {
      let {
        reason,
        event,
        nested
      } = _ref;
      if (reason === "escape-key" && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      if (reason === "hover" && event.type === "mouseleave") {
        preventReturnFocusRef.current = true;
      }
      if (reason !== "outside-press") return;
      if (nested) {
        preventReturnFocusRef.current = false;
        preventReturnFocusScroll = true;
      } else {
        preventReturnFocusRef.current = !(isVirtualClick(event) || isVirtualPointerEvent(event));
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
      const activeEl = activeElement(doc);
      const isFocusInsideFloatingTree = contains(floating, activeEl) || tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
        var _node$context5;
        return contains((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.floating, activeEl);
      });
      const shouldFocusReference = isFocusInsideFloatingTree || contextData.openEvent && ["click", "mousedown"].includes(contextData.openEvent.type);
      if (shouldFocusReference && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      const returnElement = getPreviouslyFocusedElement();
      if (
        // eslint-disable-next-line react-hooks/exhaustive-deps
        returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(returnElement) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (returnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)
      ) {
        enqueueFocus(returnElement, {
          // When dismissing nested floating elements, by the time the rAF has
          // executed, the menus will all have been unmounted. When they try
          // to get focused, the calls get ignored — leaving the root
          // reference focused as desired.
          cancelPrevious: false,
          preventScroll: preventReturnFocusScroll
        });
      }
    };
  }, [disabled, floating, returnFocusRef, dataRef, refs, events, tree, nodeId]);
  index2(() => {
    if (disabled || !portalContext) return;
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange,
      refs
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, onOpenChange, refs, closeOnFocusOut]);
  index2(() => {
    if (disabled || !floating || typeof MutationObserver !== "function" || ignoreInitialFocus) {
      return;
    }
    const handleMutation = () => {
      const tabIndex = floating.getAttribute("tabindex");
      if (orderRef.current.includes("floating") || activeElement(getDocument(floating)) !== refs.domReference.current && getTabbableContent().length === 0) {
        if (tabIndex !== "0") {
          floating.setAttribute("tabindex", "0");
        }
      } else if (tabIndex !== "-1") {
        floating.setAttribute("tabindex", "-1");
      }
    };
    handleMutation();
    const observer = new MutationObserver(handleMutation);
    observer.observe(floating, {
      childList: true,
      subtree: true,
      attributes: true
    });
    return () => {
      observer.disconnect();
    };
  }, [disabled, floating, refs, orderRef, getTabbableContent, ignoreInitialFocus]);
  function renderDismissButton(location) {
    if (disabled || !visuallyHiddenDismiss || !modal) {
      return null;
    }
    return React3.createElement(VisuallyHiddenDismiss, {
      ref: location === "start" ? startDismissButtonRef : endDismissButtonRef,
      onClick: (event) => onOpenChange(false, event.nativeEvent)
    }, typeof visuallyHiddenDismiss === "string" ? visuallyHiddenDismiss : "Dismiss");
  }
  const shouldRenderGuards = !disabled && guards && (isInsidePortal || modal);
  return React3.createElement(React3.Fragment, null, shouldRenderGuards && React3.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.beforeInsideRef,
    onFocus: (event) => {
      if (modal) {
        const els = getTabbableElements();
        enqueueFocus(order[0] === "reference" ? els[0] : els[els.length - 1]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        preventReturnFocusRef.current = false;
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const nextTabbable = getNextTabbable() || domReference;
          nextTabbable == null || nextTabbable.focus();
        } else {
          var _portalContext$before;
          (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
        }
      }
    }
  }), !isUntrappedTypeableCombobox && renderDismissButton("start"), children, renderDismissButton("end"), shouldRenderGuards && React3.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.afterInsideRef,
    onFocus: (event) => {
      if (modal) {
        enqueueFocus(getTabbableElements()[0]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        if (closeOnFocusOut) {
          preventReturnFocusRef.current = true;
        }
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const prevTabbable = getPreviousTabbable() || domReference;
          prevTabbable == null || prevTabbable.focus();
        } else {
          var _portalContext$afterO;
          (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
        }
      }
    }
  }));
}
var activeLocks = /* @__PURE__ */ new Set();
var FloatingOverlay = React3.forwardRef(function FloatingOverlay2(_ref, ref) {
  let {
    lockScroll = false,
    ...rest
  } = _ref;
  const lockId = useId();
  index2(() => {
    if (!lockScroll) return;
    activeLocks.add(lockId);
    const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
    const bodyStyle = document.body.style;
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.pageXOffset;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.pageYOffset;
    bodyStyle.overflow = "hidden";
    if (scrollbarWidth) {
      bodyStyle[paddingProp] = scrollbarWidth + "px";
    }
    if (isIOS) {
      var _window$visualViewpor, _window$visualViewpor2;
      const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
      const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
      Object.assign(bodyStyle, {
        position: "fixed",
        top: -(scrollY - Math.floor(offsetTop)) + "px",
        left: -(scrollX - Math.floor(offsetLeft)) + "px",
        right: "0"
      });
    }
    return () => {
      activeLocks.delete(lockId);
      if (activeLocks.size === 0) {
        Object.assign(bodyStyle, {
          overflow: "",
          [paddingProp]: ""
        });
        if (isIOS) {
          Object.assign(bodyStyle, {
            position: "",
            top: "",
            left: "",
            right: ""
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [lockId, lockScroll]);
  return React3.createElement("div", _extends2({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
function isButtonTarget(event) {
  return isHTMLElement(event.target) && event.target.tagName === "BUTTON";
}
function isSpaceIgnored(element) {
  return isTypeableElement(element);
}
function useClick(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    elements: {
      domReference
    }
  } = context;
  const {
    enabled = true,
    event: eventOption = "click",
    toggle = true,
    ignoreMouse = false,
    keyboardHandlers = true
  } = props;
  const pointerTypeRef = React3.useRef();
  const didKeyDownRef = React3.useRef(false);
  return React3.useMemo(() => {
    if (!enabled) return {};
    return {
      reference: {
        onPointerDown(event) {
          pointerTypeRef.current = event.pointerType;
        },
        onMouseDown(event) {
          if (event.button !== 0) {
            return;
          }
          if (isMouseLikePointerType(pointerTypeRef.current, true) && ignoreMouse) {
            return;
          }
          if (eventOption === "click") {
            return;
          }
          if (open && toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === "mousedown" : true)) {
            onOpenChange(false, event.nativeEvent, "click");
          } else {
            event.preventDefault();
            onOpenChange(true, event.nativeEvent, "click");
          }
        },
        onClick(event) {
          if (eventOption === "mousedown" && pointerTypeRef.current) {
            pointerTypeRef.current = void 0;
            return;
          }
          if (isMouseLikePointerType(pointerTypeRef.current, true) && ignoreMouse) {
            return;
          }
          if (open && toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === "click" : true)) {
            onOpenChange(false, event.nativeEvent, "click");
          } else {
            onOpenChange(true, event.nativeEvent, "click");
          }
        },
        onKeyDown(event) {
          pointerTypeRef.current = void 0;
          if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
            return;
          }
          if (event.key === " " && !isSpaceIgnored(domReference)) {
            event.preventDefault();
            didKeyDownRef.current = true;
          }
          if (event.key === "Enter") {
            if (open && toggle) {
              onOpenChange(false, event.nativeEvent, "click");
            } else {
              onOpenChange(true, event.nativeEvent, "click");
            }
          }
        },
        onKeyUp(event) {
          if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
            return;
          }
          if (event.key === " " && didKeyDownRef.current) {
            didKeyDownRef.current = false;
            if (open && toggle) {
              onOpenChange(false, event.nativeEvent, "click");
            } else {
              onOpenChange(true, event.nativeEvent, "click");
            }
          }
        }
      }
    };
  }, [enabled, dataRef, eventOption, ignoreMouse, keyboardHandlers, domReference, toggle, open, onOpenChange]);
}
var bubbleHandlerKeys = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
};
var captureHandlerKeys = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
};
var normalizeProp = (normalizable) => {
  var _normalizable$escapeK, _normalizable$outside;
  return {
    escapeKey: typeof normalizable === "boolean" ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
    outsidePress: typeof normalizable === "boolean" ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
  };
};
function useDismiss(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    nodeId,
    elements: {
      reference,
      domReference,
      floating
    },
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = "pointerdown",
    referencePress = false,
    referencePressEvent = "pointerdown",
    ancestorScroll = false,
    bubbles,
    capture
  } = props;
  const tree = useFloatingTree();
  const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === "function" ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === "function" ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = React3.useRef(false);
  const endedOrStartedInsideRef = React3.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const {
    escapeKey: escapeKeyCapture,
    outsidePress: outsidePressCapture
  } = normalizeProp(capture);
  const closeOnEscapeKeyDown = useEffectEvent((event) => {
    if (!open || !enabled || !escapeKey || event.key !== "Escape") {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      event.stopPropagation();
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _child$context;
          if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event, "escape-key");
  });
  const closeOnEscapeKeyDownCapture = useEffectEvent((event) => {
    var _getTarget2;
    const callback = () => {
      var _getTarget;
      closeOnEscapeKeyDown(event);
      (_getTarget = getTarget(event)) == null || _getTarget.removeEventListener("keydown", callback);
    };
    (_getTarget2 = getTarget(event)) == null || _getTarget2.addEventListener("keydown", callback);
  });
  const closeOnPressOutside = useEffectEvent((event) => {
    const insideReactTree = insideReactTreeRef.current;
    insideReactTreeRef.current = false;
    const endedOrStartedInside = endedOrStartedInsideRef.current;
    endedOrStartedInsideRef.current = false;
    if (outsidePressEvent === "click" && endedOrStartedInside) {
      return;
    }
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === "function" && !outsidePress(event)) {
      return;
    }
    const target = getTarget(event);
    const inertSelector = "[" + createAttribute("inert") + "]";
    const markers = getDocument(floating).querySelectorAll(inertSelector);
    let targetRootAncestor = isElement(target) ? target : null;
    while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
      const nextParent = getParentNode(targetRootAncestor);
      if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
        break;
      } else {
        targetRootAncestor = nextParent;
      }
    }
    if (markers.length && isElement(target) && !isRootElement(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !contains(target, floating) && // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(markers).every((marker) => !contains(targetRootAncestor, marker))) {
      return;
    }
    if (isHTMLElement(target) && floating) {
      const canScrollX = target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      let xCond = canScrollY && event.offsetX > target.clientWidth;
      if (canScrollY) {
        const isRTL2 = getComputedStyle2(target).direction === "rtl";
        if (isRTL2) {
          xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
        }
      }
      if (xCond || canScrollX && event.offsetY > target.clientHeight) {
        return;
      }
    }
    const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
      var _node$context;
      return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
    });
    if (isEventTargetWithin(event, floating) || isEventTargetWithin(event, domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach((child) => {
        var _child$context2;
        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
          return;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    onOpenChange(false, event, "outside-press");
  });
  const closeOnPressOutsideCapture = useEffectEvent((event) => {
    var _getTarget4;
    const callback = () => {
      var _getTarget3;
      closeOnPressOutside(event);
      (_getTarget3 = getTarget(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
    };
    (_getTarget4 = getTarget(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
  });
  React3.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    function onScroll(event) {
      onOpenChange(false, event, "ancestor-scroll");
    }
    const doc = getDocument(floating);
    escapeKey && doc.addEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
    outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement(domReference)) {
        ancestors = getOverflowAncestors(domReference);
      }
      if (isElement(floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(floating));
      }
      if (!isElement(reference) && reference && reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(reference.contextElement));
      }
    }
    ancestors = ancestors.filter((ancestor) => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    return () => {
      escapeKey && doc.removeEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
      outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener("scroll", onScroll);
      });
    };
  }, [dataRef, floating, domReference, reference, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
  React3.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  return React3.useMemo(() => {
    if (!enabled) {
      return {};
    }
    return {
      reference: {
        onKeyDown: closeOnEscapeKeyDown,
        [bubbleHandlerKeys[referencePressEvent]]: (event) => {
          if (referencePress) {
            onOpenChange(false, event.nativeEvent, "reference-press");
          }
        }
      },
      floating: {
        onKeyDown: closeOnEscapeKeyDown,
        onMouseDown() {
          endedOrStartedInsideRef.current = true;
        },
        onMouseUp() {
          endedOrStartedInsideRef.current = true;
        },
        [captureHandlerKeys[outsidePressEvent]]: () => {
          insideReactTreeRef.current = true;
        }
      }
    };
  }, [enabled, referencePress, outsidePressEvent, referencePressEvent, onOpenChange, closeOnEscapeKeyDown]);
}
var devMessageSet;
if (true) {
  devMessageSet = /* @__PURE__ */ new Set();
}
function useFloating2(options) {
  var _options$elements2;
  if (options === void 0) {
    options = {};
  }
  const {
    open = false,
    onOpenChange: unstable_onOpenChange,
    nodeId
  } = options;
  if (true) {
    var _options$elements;
    const err = "Floating UI: Cannot pass a virtual element to the `elements.reference` option, as it must be a real DOM element. Use `refs.setPositionReference` instead.";
    if ((_options$elements = options.elements) != null && _options$elements.reference && !isElement(options.elements.reference)) {
      var _devMessageSet;
      if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(err))) {
        var _devMessageSet2;
        (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(err);
        console.error(err);
      }
    }
  }
  const [_domReference, setDomReference] = React3.useState(null);
  const domReference = ((_options$elements2 = options.elements) == null ? void 0 : _options$elements2.reference) || _domReference;
  const position = useFloating(options);
  const tree = useFloatingTree();
  const nested = useFloatingParentNodeId() != null;
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    if (open2) {
      dataRef.current.openEvent = event;
    }
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    unstable_onOpenChange == null || unstable_onOpenChange(open2, event, reason);
  });
  const domReferenceRef = React3.useRef(null);
  const dataRef = React3.useRef({});
  const events = React3.useState(() => createPubSub())[0];
  const floatingId = useId();
  const setPositionReference = React3.useCallback((node) => {
    const positionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    position.refs.setReference(positionReference);
  }, [position.refs]);
  const setReference = React3.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React3.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React3.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React3.useMemo(() => ({
    ...position,
    refs,
    elements,
    dataRef,
    nodeId,
    floatingId,
    events,
    open,
    onOpenChange
  }), [position, nodeId, floatingId, events, open, onOpenChange, refs, elements]);
  index2(() => {
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React3.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
function useFocus(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    events,
    refs,
    elements: {
      floating,
      domReference
    }
  } = context;
  const {
    enabled = true,
    visibleOnly = true
  } = props;
  const blockFocusRef = React3.useRef(false);
  const timeoutRef = React3.useRef();
  const keyboardModalityRef = React3.useRef(true);
  React3.useEffect(() => {
    if (!enabled) {
      return;
    }
    const win = getWindow(domReference);
    function onBlur() {
      if (!open && isHTMLElement(domReference) && domReference === activeElement(getDocument(domReference))) {
        blockFocusRef.current = true;
      }
    }
    function onKeyDown() {
      keyboardModalityRef.current = true;
    }
    win.addEventListener("blur", onBlur);
    win.addEventListener("keydown", onKeyDown, true);
    return () => {
      win.removeEventListener("blur", onBlur);
      win.removeEventListener("keydown", onKeyDown, true);
    };
  }, [floating, domReference, open, enabled]);
  React3.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onOpenChange2(_ref) {
      let {
        reason
      } = _ref;
      if (reason === "reference-press" || reason === "escape-key") {
        blockFocusRef.current = true;
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
    };
  }, [events, enabled]);
  React3.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return React3.useMemo(() => {
    if (!enabled) {
      return {};
    }
    return {
      reference: {
        onPointerDown(event) {
          if (isVirtualPointerEvent(event.nativeEvent)) return;
          keyboardModalityRef.current = false;
        },
        onMouseLeave() {
          blockFocusRef.current = false;
        },
        onFocus(event) {
          if (blockFocusRef.current) return;
          const target = getTarget(event.nativeEvent);
          if (visibleOnly && isElement(target)) {
            try {
              if (isSafari() && isMac()) throw Error();
              if (!target.matches(":focus-visible")) return;
            } catch (e) {
              if (!keyboardModalityRef.current && !isTypeableElement(target)) {
                return;
              }
            }
          }
          onOpenChange(true, event.nativeEvent, "focus");
        },
        onBlur(event) {
          blockFocusRef.current = false;
          const relatedTarget = event.relatedTarget;
          const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
          timeoutRef.current = window.setTimeout(() => {
            const activeEl = activeElement(domReference ? domReference.ownerDocument : document);
            if (!relatedTarget && activeEl === domReference) return;
            if (contains(refs.floating.current, relatedTarget) || contains(domReference, relatedTarget) || movedToFocusGuard) {
              return;
            }
            onOpenChange(false, event.nativeEvent, "focus");
          });
        }
      }
    };
  }, [enabled, visibleOnly, domReference, refs, onOpenChange]);
}
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  return {
    ...elementKey === "floating" && {
      tabIndex: -1
    },
    ...userProps,
    ...propsList.map((value) => value ? value[elementKey] : null).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const deps = propsList;
  const getReferenceProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  const getFloatingProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  const getItemProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    propsList.map((key) => key == null ? void 0 : key.item)
  );
  return React3.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
var isPreventScrollSupported = false;
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical;
    case "horizontal":
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key == " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  return doSwitch(orientation, vertical, horizontal);
}
function useListNavigation(context, props) {
  const {
    open,
    onOpenChange,
    refs,
    elements: {
      domReference,
      floating
    }
  } = context;
  const {
    listRef,
    activeIndex,
    onNavigate: unstable_onNavigate = () => {
    },
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = "vertical",
    cols = 1,
    scrollItemIntoView = true,
    virtualItemRef
  } = props;
  if (true) {
    if (allowEscape) {
      if (!loop) {
        console.warn(["Floating UI: `useListNavigation` looping must be enabled to allow", "escaping."].join(" "));
      }
      if (!virtual) {
        console.warn(["Floating UI: `useListNavigation` must be virtual to allow", "escaping."].join(" "));
      }
    }
    if (orientation === "vertical" && cols > 1) {
      console.warn(["Floating UI: In grid list navigation mode (`cols` > 1), the", '`orientation` should be either "horizontal" or "both".'].join(" "));
    }
  }
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const onNavigate = useEffectEvent(unstable_onNavigate);
  const focusItemOnOpenRef = React3.useRef(focusItemOnOpen);
  const indexRef = React3.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = React3.useRef(null);
  const isPointerModalityRef = React3.useRef(true);
  const previousOnNavigateRef = React3.useRef(onNavigate);
  const previousMountedRef = React3.useRef(!!floating);
  const forceSyncFocus = React3.useRef(false);
  const forceScrollIntoViewRef = React3.useRef(false);
  const disabledIndicesRef = useLatestRef2(disabledIndices);
  const latestOpenRef = useLatestRef2(open);
  const scrollItemIntoViewRef = useLatestRef2(scrollItemIntoView);
  const [activeId, setActiveId] = React3.useState();
  const [virtualId, setVirtualId] = React3.useState();
  const focusItem = useEffectEvent(function(listRef2, indexRef2, forceScrollIntoView) {
    if (forceScrollIntoView === void 0) {
      forceScrollIntoView = false;
    }
    const item2 = listRef2.current[indexRef2.current];
    if (!item2) return;
    if (virtual) {
      setActiveId(item2.id);
      tree == null || tree.events.emit("virtualfocus", item2);
      if (virtualItemRef) {
        virtualItemRef.current = item2;
      }
    } else {
      enqueueFocus(item2, {
        preventScroll: true,
        // Mac Safari does not move the virtual cursor unless the focus call
        // is sync. However, for the very first focus call, we need to wait
        // for the position to be ready in order to prevent unwanted
        // scrolling. This means the virtual cursor will not move to the first
        // item when first opening the floating element, but will on
        // subsequent calls. `preventScroll` is supported in modern Safari,
        // so we can use that instead.
        // iOS Safari must be async or the first item will not be focused.
        sync: isMac() && isSafari() ? isPreventScrollSupported || forceSyncFocus.current : false
      });
    }
    requestAnimationFrame(() => {
      const scrollIntoViewOptions = scrollItemIntoViewRef.current;
      const shouldScrollIntoView = scrollIntoViewOptions && item2 && (forceScrollIntoView || !isPointerModalityRef.current);
      if (shouldScrollIntoView) {
        item2.scrollIntoView == null || item2.scrollIntoView(typeof scrollIntoViewOptions === "boolean" ? {
          block: "nearest",
          inline: "nearest"
        } : scrollIntoViewOptions);
      }
    });
  });
  index2(() => {
    document.createElement("div").focus({
      get preventScroll() {
        isPreventScrollSupported = true;
        return false;
      }
    });
  }, []);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (open && floating) {
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true;
        onNavigate(selectedIndex);
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1;
      previousOnNavigateRef.current(null);
    }
  }, [enabled, open, floating, selectedIndex, onNavigate]);
  index2(() => {
    if (!enabled) {
      return;
    }
    if (open && floating) {
      if (activeIndex == null) {
        forceSyncFocus.current = false;
        if (selectedIndex != null) {
          return;
        }
        if (previousMountedRef.current) {
          indexRef.current = -1;
          focusItem(listRef, indexRef);
        }
        if (!previousMountedRef.current && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          let runs = 0;
          const waitForListPopulated = () => {
            if (listRef.current[0] == null) {
              if (runs < 2) {
                const scheduler = runs ? requestAnimationFrame : queueMicrotask;
                scheduler(waitForListPopulated);
              }
              runs++;
            } else {
              indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
              keyRef.current = null;
              onNavigate(indexRef.current);
            }
          };
          waitForListPopulated();
        }
      } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem(listRef, indexRef, forceScrollIntoViewRef.current);
        forceScrollIntoViewRef.current = false;
      }
    }
  }, [enabled, open, floating, activeIndex, selectedIndex, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);
  index2(() => {
    var _nodes$find;
    if (!enabled || floating || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = (_nodes$find = nodes.find((node) => node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
    const activeEl = activeElement(getDocument(floating));
    const treeContainsActiveEl = nodes.some((node) => node.context && contains(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, floating, tree, parentId, virtual]);
  index2(() => {
    if (!enabled || !tree || !virtual || parentId) return;
    function handleVirtualFocus(item2) {
      setVirtualId(item2.id);
      if (virtualItemRef) {
        virtualItemRef.current = item2;
      }
    }
    tree.events.on("virtualfocus", handleVirtualFocus);
    return () => {
      tree.events.off("virtualfocus", handleVirtualFocus);
    };
  }, [enabled, tree, virtual, parentId, virtualItemRef]);
  index2(() => {
    previousOnNavigateRef.current = onNavigate;
    previousMountedRef.current = !!floating;
  });
  index2(() => {
    if (!open) {
      keyRef.current = null;
    }
  }, [open]);
  const hasActiveIndex = activeIndex != null;
  const item = React3.useMemo(() => {
    function syncCurrentTarget(currentTarget) {
      if (!open) return;
      const index3 = listRef.current.indexOf(currentTarget);
      if (index3 !== -1) {
        onNavigate(index3);
      }
    }
    const props2 = {
      onFocus(_ref) {
        let {
          currentTarget
        } = _ref;
        syncCurrentTarget(currentTarget);
      },
      onClick: (_ref2) => {
        let {
          currentTarget
        } = _ref2;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      // Safari
      ...focusItemOnHover && {
        onMouseMove(_ref3) {
          let {
            currentTarget
          } = _ref3;
          syncCurrentTarget(currentTarget);
        },
        onPointerLeave(_ref4) {
          let {
            pointerType
          } = _ref4;
          if (!isPointerModalityRef.current || pointerType === "touch") {
            return;
          }
          indexRef.current = -1;
          focusItem(listRef, indexRef);
          onNavigate(null);
          if (!virtual) {
            enqueueFocus(refs.floating.current, {
              preventScroll: true
            });
          }
        }
      }
    };
    return props2;
  }, [open, refs, focusItem, focusItemOnHover, listRef, onNavigate, virtual]);
  return React3.useMemo(() => {
    if (!enabled) {
      return {};
    }
    const disabledIndices2 = disabledIndicesRef.current;
    function onKeyDown(event) {
      isPointerModalityRef.current = false;
      forceSyncFocus.current = true;
      if (!latestOpenRef.current && event.currentTarget === refs.floating.current) {
        return;
      }
      if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
        stopEvent(event);
        onOpenChange(false, event.nativeEvent, "list-navigation");
        if (isHTMLElement(domReference) && !virtual) {
          domReference.focus();
        }
        return;
      }
      const currentIndex = indexRef.current;
      const minIndex = getMinIndex(listRef, disabledIndices2);
      const maxIndex = getMaxIndex(listRef, disabledIndices2);
      if (event.key === "Home") {
        stopEvent(event);
        indexRef.current = minIndex;
        onNavigate(indexRef.current);
      }
      if (event.key === "End") {
        stopEvent(event);
        indexRef.current = maxIndex;
        onNavigate(indexRef.current);
      }
      if (cols > 1) {
        indexRef.current = getGridNavigatedIndex(listRef, {
          event,
          orientation,
          loop,
          cols,
          disabledIndices: disabledIndices2,
          minIndex,
          maxIndex,
          prevIndex: indexRef.current,
          stopEvent: true
        });
        onNavigate(indexRef.current);
        if (orientation === "both") {
          return;
        }
      }
      if (isMainOrientationKey(event.key, orientation)) {
        stopEvent(event);
        if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
          indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
          onNavigate(indexRef.current);
          return;
        }
        if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
          if (loop) {
            indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
              startingIndex: currentIndex,
              disabledIndices: disabledIndices2
            });
          } else {
            indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
              startingIndex: currentIndex,
              disabledIndices: disabledIndices2
            }));
          }
        } else {
          if (loop) {
            indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
              startingIndex: currentIndex,
              decrement: true,
              disabledIndices: disabledIndices2
            });
          } else {
            indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
              startingIndex: currentIndex,
              decrement: true,
              disabledIndices: disabledIndices2
            }));
          }
        }
        if (isIndexOutOfBounds(listRef, indexRef.current)) {
          onNavigate(null);
        } else {
          onNavigate(indexRef.current);
        }
      }
    }
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    const ariaActiveDescendantProp = virtual && open && hasActiveIndex && {
      "aria-activedescendant": virtualId || activeId
    };
    const activeItem = listRef.current.find((item2) => (item2 == null ? void 0 : item2.id) === activeId);
    return {
      reference: {
        ...ariaActiveDescendantProp,
        onKeyDown(event) {
          isPointerModalityRef.current = false;
          const isArrowKey = event.key.indexOf("Arrow") === 0;
          const isCrossOpenKey = isCrossOrientationOpenKey(event.key, orientation, rtl);
          const isCrossCloseKey = isCrossOrientationCloseKey(event.key, orientation, rtl);
          const isMainKey = isMainOrientationKey(event.key, orientation);
          const isNavigationKey = (nested ? isCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
          if (virtual && open) {
            const rootNode = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.parentId == null);
            const deepestNode = tree && rootNode ? getDeepestNode(tree.nodesRef.current, rootNode.id) : null;
            if (isArrowKey && deepestNode && virtualItemRef) {
              const eventObject = new KeyboardEvent("keydown", {
                key: event.key,
                bubbles: true
              });
              if (isCrossOpenKey || isCrossCloseKey) {
                var _deepestNode$context, _deepestNode$context2;
                const isCurrentTarget = ((_deepestNode$context = deepestNode.context) == null ? void 0 : _deepestNode$context.elements.domReference) === event.currentTarget;
                const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? activeItem : null;
                if (dispatchItem) {
                  stopEvent(event);
                  dispatchItem.dispatchEvent(eventObject);
                  setVirtualId(void 0);
                }
              }
              if (isMainKey && deepestNode.context) {
                if (deepestNode.context.open && deepestNode.parentId && event.currentTarget !== deepestNode.context.elements.domReference) {
                  var _deepestNode$context$;
                  stopEvent(event);
                  (_deepestNode$context$ = deepestNode.context.elements.domReference) == null || _deepestNode$context$.dispatchEvent(eventObject);
                  return;
                }
              }
            }
            return onKeyDown(event);
          }
          if (!open && !openOnArrowKeyDown && isArrowKey) {
            return;
          }
          if (isNavigationKey) {
            keyRef.current = nested && isMainKey ? null : event.key;
          }
          if (nested) {
            if (isCrossOpenKey) {
              stopEvent(event);
              if (open) {
                indexRef.current = getMinIndex(listRef, disabledIndices2);
                onNavigate(indexRef.current);
              } else {
                onOpenChange(true, event.nativeEvent, "list-navigation");
              }
            }
            return;
          }
          if (isMainKey) {
            if (selectedIndex != null) {
              indexRef.current = selectedIndex;
            }
            stopEvent(event);
            if (!open && openOnArrowKeyDown) {
              onOpenChange(true, event.nativeEvent, "list-navigation");
            } else {
              onKeyDown(event);
            }
            if (open) {
              onNavigate(indexRef.current);
            }
          }
        },
        onFocus() {
          if (open) {
            onNavigate(null);
          }
        },
        onPointerDown: checkVirtualPointer,
        onMouseDown: checkVirtualMouse,
        onClick: checkVirtualMouse
      },
      floating: {
        "aria-orientation": orientation === "both" ? void 0 : orientation,
        ...ariaActiveDescendantProp,
        onKeyDown,
        onPointerMove() {
          isPointerModalityRef.current = true;
        }
      },
      item
    };
  }, [domReference, refs, activeId, virtualId, disabledIndicesRef, latestOpenRef, listRef, enabled, orientation, rtl, virtual, open, hasActiveIndex, nested, selectedIndex, openOnArrowKeyDown, allowEscape, cols, loop, focusItemOnOpen, onNavigate, onOpenChange, item, tree, virtualItemRef]);
}
function useRole(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    floatingId
  } = context;
  const {
    enabled = true,
    role = "dialog"
  } = props;
  const referenceId = useId();
  return React3.useMemo(() => {
    if (!enabled) return {};
    const floatingProps = {
      id: floatingId,
      ...role !== "label" && {
        role
      }
    };
    if (role === "tooltip" || role === "label") {
      return {
        reference: {
          ["aria-" + (role === "label" ? "labelledby" : "describedby")]: open ? floatingId : void 0
        },
        floating: floatingProps
      };
    }
    return {
      reference: {
        "aria-expanded": open ? "true" : "false",
        "aria-haspopup": role === "alertdialog" ? "dialog" : role,
        "aria-controls": open ? floatingId : void 0,
        ...role === "listbox" && {
          role: "combobox"
        },
        ...role === "menu" && {
          id: referenceId
        }
      },
      floating: {
        ...floatingProps,
        ...role === "menu" && {
          "aria-labelledby": referenceId
        }
      }
    };
  }, [enabled, role, open, floatingId, referenceId]);
}
function useTypeahead(context, props) {
  var _ref;
  const {
    open,
    dataRef
  } = context;
  const {
    listRef,
    activeIndex,
    onMatch: unstable_onMatch,
    onTypingChange: unstable_onTypingChange,
    enabled = true,
    findMatch = null,
    resetMs = 750,
    ignoreKeys = [],
    selectedIndex = null
  } = props;
  const timeoutIdRef = React3.useRef();
  const stringRef = React3.useRef("");
  const prevIndexRef = React3.useRef((_ref = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref : -1);
  const matchIndexRef = React3.useRef(null);
  const onMatch = useEffectEvent(unstable_onMatch);
  const onTypingChange = useEffectEvent(unstable_onTypingChange);
  const findMatchRef = useLatestRef2(findMatch);
  const ignoreKeysRef = useLatestRef2(ignoreKeys);
  index2(() => {
    if (open) {
      clearTimeout(timeoutIdRef.current);
      matchIndexRef.current = null;
      stringRef.current = "";
    }
  }, [open]);
  index2(() => {
    if (open && stringRef.current === "") {
      var _ref2;
      prevIndexRef.current = (_ref2 = selectedIndex != null ? selectedIndex : activeIndex) != null ? _ref2 : -1;
    }
  }, [open, selectedIndex, activeIndex]);
  return React3.useMemo(() => {
    if (!enabled) {
      return {};
    }
    function setTypingChange(value) {
      if (value) {
        if (!dataRef.current.typing) {
          dataRef.current.typing = value;
          onTypingChange(value);
        }
      } else {
        if (dataRef.current.typing) {
          dataRef.current.typing = value;
          onTypingChange(value);
        }
      }
    }
    function getMatchingIndex(list, orderedList, string) {
      const str = findMatchRef.current ? findMatchRef.current(orderedList, string) : orderedList.find((text) => (text == null ? void 0 : text.toLocaleLowerCase().indexOf(string.toLocaleLowerCase())) === 0);
      return str ? list.indexOf(str) : -1;
    }
    function onKeyDown(event) {
      const listContent = listRef.current;
      if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
        if (getMatchingIndex(listContent, listContent, stringRef.current) === -1) {
          setTypingChange(false);
        } else if (event.key === " ") {
          stopEvent(event);
        }
      }
      if (listContent == null || ignoreKeysRef.current.includes(event.key) || // Character key.
      event.key.length !== 1 || // Modifier key.
      event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      if (open && event.key !== " ") {
        stopEvent(event);
        setTypingChange(true);
      }
      const allowRapidSuccessionOfFirstLetter = listContent.every((text) => {
        var _text$, _text$2;
        return text ? ((_text$ = text[0]) == null ? void 0 : _text$.toLocaleLowerCase()) !== ((_text$2 = text[1]) == null ? void 0 : _text$2.toLocaleLowerCase()) : true;
      });
      if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
        stringRef.current = "";
        prevIndexRef.current = matchIndexRef.current;
      }
      stringRef.current += event.key;
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        stringRef.current = "";
        prevIndexRef.current = matchIndexRef.current;
        setTypingChange(false);
      }, resetMs);
      const prevIndex = prevIndexRef.current;
      const index3 = getMatchingIndex(listContent, [...listContent.slice((prevIndex || 0) + 1), ...listContent.slice(0, (prevIndex || 0) + 1)], stringRef.current);
      if (index3 !== -1) {
        onMatch(index3);
        matchIndexRef.current = index3;
      } else if (event.key !== " ") {
        stringRef.current = "";
        setTypingChange(false);
      }
    }
    return {
      reference: {
        onKeyDown
      },
      floating: {
        onKeyDown,
        onKeyUp(event) {
          if (event.key === " ") {
            setTypingChange(false);
          }
        }
      }
    };
  }, [enabled, open, dataRef, listRef, resetMs, ignoreKeysRef, findMatchRef, onMatch, onTypingChange]);
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let isInside2 = false;
  const length = polygon.length;
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0];
    const [xj, yj] = polygon[j] || [0, 0];
    const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside2 = !isInside2;
    }
  }
  return isInside2;
}
function isInside(point, rect) {
  return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
function safePolygon(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    buffer = 0.5,
    blockPointerEvents = false,
    requireIntent = true
  } = options;
  let timeoutId2;
  let hasLanded = false;
  let lastX = null;
  let lastY = null;
  let lastCursorTime = performance.now();
  function getCursorSpeed(x, y) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastCursorTime;
    if (lastX === null || lastY === null || elapsedTime === 0) {
      lastX = x;
      lastY = y;
      lastCursorTime = currentTime;
      return null;
    }
    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / elapsedTime;
    lastX = x;
    lastY = y;
    lastCursorTime = currentTime;
    return speed;
  }
  const fn = (_ref) => {
    let {
      x,
      y,
      placement,
      elements,
      onClose,
      nodeId,
      tree
    } = _ref;
    return function onMouseMove(event) {
      function close() {
        clearTimeout(timeoutId2);
        onClose();
      }
      clearTimeout(timeoutId2);
      if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
        return;
      }
      const {
        clientX,
        clientY
      } = event;
      const clientPoint = [clientX, clientY];
      const target = getTarget(event);
      const isLeave = event.type === "mouseleave";
      const isOverFloatingEl = contains(elements.floating, target);
      const isOverReferenceEl = contains(elements.domReference, target);
      const refRect = elements.domReference.getBoundingClientRect();
      const rect = elements.floating.getBoundingClientRect();
      const side = placement.split("-")[0];
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      const isOverReferenceRect = isInside(clientPoint, refRect);
      const isFloatingWider = rect.width > refRect.width;
      const isFloatingTaller = rect.height > refRect.height;
      const left = (isFloatingWider ? refRect : rect).left;
      const right = (isFloatingWider ? refRect : rect).right;
      const top = (isFloatingTaller ? refRect : rect).top;
      const bottom = (isFloatingTaller ? refRect : rect).bottom;
      if (isOverFloatingEl) {
        hasLanded = true;
        if (!isLeave) {
          return;
        }
      }
      if (isOverReferenceEl) {
        hasLanded = false;
      }
      if (isOverReferenceEl && !isLeave) {
        hasLanded = true;
        return;
      }
      if (isLeave && isElement(event.relatedTarget) && contains(elements.floating, event.relatedTarget)) {
        return;
      }
      if (tree && getChildren(tree.nodesRef.current, nodeId).some((_ref2) => {
        let {
          context
        } = _ref2;
        return context == null ? void 0 : context.open;
      })) {
        return;
      }
      if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
        return close();
      }
      let rectPoly = [];
      switch (side) {
        case "top":
          rectPoly = [[left, refRect.top + 1], [left, rect.bottom - 1], [right, rect.bottom - 1], [right, refRect.top + 1]];
          break;
        case "bottom":
          rectPoly = [[left, rect.top + 1], [left, refRect.bottom - 1], [right, refRect.bottom - 1], [right, rect.top + 1]];
          break;
        case "left":
          rectPoly = [[rect.right - 1, bottom], [rect.right - 1, top], [refRect.left + 1, top], [refRect.left + 1, bottom]];
          break;
        case "right":
          rectPoly = [[refRect.right - 1, bottom], [refRect.right - 1, top], [rect.left + 1, top], [rect.left + 1, bottom]];
          break;
      }
      function getPolygon(_ref3) {
        let [x2, y2] = _ref3;
        switch (side) {
          case "top": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "bottom": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "left": {
            const cursorPointOne = [x2 + buffer + 1, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 + buffer + 1, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
            return [...commonPoints, cursorPointOne, cursorPointTwo];
          }
          case "right": {
            const cursorPointOne = [x2 - buffer, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 - buffer, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
        }
      }
      if (isPointInPolygon([clientX, clientY], rectPoly)) {
        return;
      } else if (hasLanded && !isOverReferenceRect) {
        return close();
      }
      if (!isLeave && requireIntent) {
        const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
        const cursorSpeedThreshold = 0.1;
        if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
          return close();
        }
      }
      if (!isPointInPolygon([clientX, clientY], getPolygon([x, y]))) {
        close();
      } else if (!hasLanded && requireIntent) {
        timeoutId2 = window.setTimeout(close, 40);
      }
    };
  };
  fn.__options = {
    blockPointerEvents
  };
  return fn;
}

// node_modules/@material-tailwind/react/dist/chunk-G4TWRQ5Y.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var TooltipContext = React4.createContext({
  open: false,
  setOpen: () => {
  }
});
function TooltipRoot({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement,
  offset: offset4,
  interactive,
  children
}) {
  const arrowRef = React4.useRef(null);
  const contextTheme = useTheme();
  const theme2 = contextTheme?.tooltip ?? tooltipTheme;
  const defaultProps = theme2?.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React4.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  placement ??= defaultProps?.placement ?? "top";
  offset4 ??= defaultProps?.offset ?? 8;
  interactive ??= defaultProps?.interactive ?? false;
  const data = useFloating2({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset3(offset4),
      flip3({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5
      }),
      shift3({ padding: 5 }),
      arrow3({
        element: arrowRef,
        padding: 5
      })
    ]
  });
  const { context } = data;
  const hover = useHover(context, {
    move: true,
    enabled: controlledOpen == null,
    handleClose: interactive ? safePolygon() : null
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const interactions = useInteractions([hover, focus, dismiss, role]);
  const contextValue = React4.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data
    }),
    [open, setOpen, arrowRef, interactions, data]
  );
  return (0, import_jsx_runtime4.jsx)(TooltipContext.Provider, { value: contextValue, children });
}
TooltipRoot.displayName = "MaterialTailwind.Tooltip";
function TooltipTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.tooltipTrigger ?? tooltipTriggerTheme;
  const { refs, getReferenceProps, open } = React4.useContext(TooltipContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setReference, ref]);
  return (0, import_jsx_runtime4.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      className: styles,
      ...getReferenceProps && getReferenceProps(),
      children
    }
  );
}
TooltipTriggerRoot.displayName = "MaterialTailwind.TooltipTrigger";
var TooltipTrigger = React4.forwardRef(TooltipTriggerRoot);
function TooltipContentRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.tooltipContent ?? tooltipContentTheme;
  const { refs, getFloatingProps, open, floatingStyles } = React4.useContext(TooltipContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setFloating, ref]);
  return open ? (0, import_jsx_runtime4.jsx)(FloatingPortal, { children: (0, import_jsx_runtime4.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      style: { ...floatingStyles, ...props?.style },
      className: styles,
      ...getFloatingProps && getFloatingProps(),
      children
    }
  ) }) : null;
}
TooltipContentRoot.displayName = "MaterialTailwind.TooltipContent";
var TooltipContent = React4.forwardRef(TooltipContentRoot);
function TooltipArrowRoot({ as, className, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.tooltipArrow ?? tooltipArrowTheme;
  const innerRef = React4.useRef(null);
  const { placement, arrowRef, middlewareData } = React4.useContext(TooltipContext);
  const elementRef = useMergeRefs([arrowRef, innerRef, ref]);
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement ? placement.split("-")[0] : ""];
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime4.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      style: {
        position: "absolute",
        left: middlewareData?.arrow?.x,
        top: middlewareData?.arrow?.y,
        [staticSide]: `${-innerRef?.current?.clientHeight / 2 - 1}px`,
        ...props?.style
      },
      "data-placement": placement,
      className: styles
    }
  );
}
TooltipArrowRoot.displayName = "MaterialTailwind.TooltipArrow";
var TooltipArrow = React4.forwardRef(TooltipArrowRoot);
var Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow
});

// node_modules/@material-tailwind/react/dist/chunk-HOAN5TY4.js
var React5 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
function TypographyRoot({ as, color, type, className, children, ...props }, ref) {
  const Component = as ? as : type === "lead" ? "p" : type || "p";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.typography ?? typographyTheme;
  const defaultProps = theme2?.defaultProps;
  if (headings.includes(type) && color === "inherit") {
    color = "default";
  } else {
    color ??= defaultProps?.color ?? "inherit";
  }
  color ??= defaultProps?.color ?? "inherit";
  type ??= defaultProps?.type ?? "p";
  const styles = twMerge(
    theme2.baseStyle,
    theme2["type"][type],
    theme2["color"][color],
    className
  );
  return (0, import_jsx_runtime5.jsx)(Component, { ...props, ref, className: styles, children });
}
TypographyRoot.displayName = "MaterialTailwind.Typography";
var Typography = React5.forwardRef(TypographyRoot);

// node_modules/@material-tailwind/react/dist/chunk-OKU4DFWG.js
var React6 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function RatingRoot({
  as,
  color,
  ratedIcon,
  unratedIcon,
  count: count2,
  value,
  onValueChange,
  className,
  readonly,
  ...props
}, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.rating ?? ratingTheme;
  const defaultProps = theme2?.defaultProps;
  ratedIcon ??= defaultProps?.ratedIcon ?? (0, import_jsx_runtime6.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "h-6 w-6",
      children: (0, import_jsx_runtime6.jsx)(
        "path",
        {
          fillRule: "evenodd",
          d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
          clipRule: "evenodd"
        }
      )
    }
  );
  unratedIcon ??= defaultProps?.unratedIcon ?? (0, import_jsx_runtime6.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "h-6 w-6",
      children: (0, import_jsx_runtime6.jsx)(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        }
      )
    }
  );
  color ??= defaultProps?.color ?? "primary";
  count2 ??= defaultProps?.count ?? 5;
  value ??= 0;
  readonly ??= defaultProps?.readonly ?? false;
  const [ratingValue, setRatingValue] = React6.useState(() => [
    ...Array(value).fill("rated"),
    ...Array(count2 - value).fill("un_rated")
  ]);
  const [ratingOnHover, setRatingOnHover] = React6.useState(() => [
    ...Array(count2).fill("un_rated")
  ]);
  const [isHover, setIsHover] = React6.useState(false);
  const baseStyles = twMerge(theme2.baseStyle, theme2.color[color], className);
  const iconStyle = twMerge(theme2.icon);
  const renderRating = (data) => data.map((el, idx) => {
    const isRated = el === "rated";
    const elementToRender = isRated ? ratedIcon : unratedIcon;
    return React6.isValidElement(elementToRender) ? React6.cloneElement(elementToRender, {
      ...elementToRender?.props,
      key: idx,
      onClick: (event) => {
        if (readonly)
          return;
        const nextRating = ratingValue.map(
          (_, i) => i <= idx ? "rated" : "un_rated"
        );
        setRatingValue(nextRating);
        onValueChange && typeof onValueChange === "function" && onValueChange(nextRating.filter((el2) => el2 === "rated").length);
        elementToRender?.props?.onClick && elementToRender?.props?.onClick(event);
      },
      onMouseEnter: (event) => {
        if (readonly)
          return;
        const nextRating = ratingOnHover.map(
          (_, i) => i <= idx ? "rated" : "un_rated"
        );
        setIsHover(true);
        setRatingOnHover(nextRating);
        elementToRender?.props?.onMouseEnter && elementToRender?.props?.onMouseEnter(event);
      },
      onMouseLeave: (event) => {
        if (!readonly) {
          setIsHover(false);
        }
        elementToRender?.props?.onMouseLeave && elementToRender?.props?.onMouseLeave(event);
      },
      "data-slot": "icon",
      className: twMerge(
        iconStyle,
        elementToRender?.props?.className
      )
    }) : React6.createElement(elementToRender, {
      key: idx,
      onClick: () => {
        if (readonly)
          return;
        const nextRating = ratingValue.map(
          (_, i) => i <= idx ? "rated" : "un_rated"
        );
        setRatingValue(nextRating);
        onValueChange && typeof onValueChange === "function" && onValueChange(nextRating.filter((el2) => el2 === "rated").length);
      },
      onMouseEnter: () => {
        if (readonly)
          return;
        const nextRating = ratingOnHover.map(
          (_, i) => i <= idx ? "rated" : "un_rated"
        );
        setIsHover(true);
        setRatingOnHover(nextRating);
      },
      onMouseLeave: () => {
        if (!readonly) {
          setIsHover(false);
        }
      },
      className: iconStyle
    });
  });
  return (0, import_jsx_runtime6.jsx)(Component, { ...props, ref, className: baseStyles, children: isHover ? renderRating(ratingOnHover) : renderRating(ratingValue) });
}
RatingRoot.displayName = "MaterialTailwind.Rating";
var Rating = React6.forwardRef(RatingRoot);

// node_modules/@material-tailwind/react/dist/chunk-NIMJP7RL.js
var React7 = __toESM(require_react(), 1);
var import_material_ripple_effects = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var SelectContext = React7.createContext({
  size: "md",
  color: "primary",
  isError: false,
  isSuccess: false,
  disabled: false,
  placement: "bottom",
  offset: 5
});
function SelectRootBase({
  size: size4,
  color,
  isPill,
  isError,
  isSuccess,
  disabled,
  placement,
  offset: offset4,
  value,
  name,
  onValueChange,
  children
}, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.select ?? selectTheme;
  const defaultProps = theme2?.defaultProps;
  const [isOpen, setIsOpen] = React7.useState(false);
  const [selected, setSelected] = React7.useState(() => ({
    value,
    element: null
  }));
  const [activeIndex, setActiveIndex] = React7.useState(null);
  const [selectedIndex, setSelectedIndex] = React7.useState(null);
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  isPill ??= defaultProps?.isPill ?? false;
  isError ??= defaultProps?.isError ?? false;
  isSuccess ??= defaultProps?.isSuccess ?? false;
  placement ??= defaultProps?.placement ?? "bottom";
  offset4 ??= defaultProps?.offset ?? 5;
  const { refs, floatingStyles, context } = useFloating2({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip3(),
      offset3(offset4),
      size3({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
            zIndex: 9999
          });
        },
        padding: 10
      })
    ]
  });
  const labelsRef = React7.useRef([]);
  const elementsRef = React7.useRef([]);
  const handleSelect = React7.useCallback((index3) => {
    setSelectedIndex(index3);
    setIsOpen(false);
    if (index3 !== null) {
      setSelected(labelsRef.current[index3]);
      onValueChange?.(labelsRef.current[index3]?.value);
    }
  }, []);
  function handleTypeaheadMatch(index3) {
    if (isOpen) {
      setActiveIndex(index3);
    } else {
      handleSelect(index3);
    }
  }
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex
  });
  const labelsRefTypehead = React7.useRef(
    labelsRef.current.map((item) => item?.value)
  );
  const typeahead = useTypeahead(context, {
    listRef: labelsRefTypehead,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, typeahead, click, dismiss, role]
  );
  const contextValue = React7.useMemo(
    () => ({
      color,
      size: size4,
      isPill,
      isError,
      isSuccess,
      disabled,
      selected,
      activeIndex,
      selectedIndex,
      context,
      refs,
      floatingStyles,
      elementsRef,
      labelsRef,
      setSelected,
      getItemProps,
      handleSelect,
      getReferenceProps,
      getFloatingProps,
      isOpen,
      controlledValue: value
    }),
    [
      color,
      size4,
      isPill,
      isError,
      isSuccess,
      disabled,
      selected,
      activeIndex,
      selectedIndex,
      context,
      refs,
      floatingStyles,
      elementsRef,
      labelsRef,
      getItemProps,
      handleSelect,
      getReferenceProps,
      getFloatingProps,
      isOpen,
      value
    ]
  );
  return (0, import_jsx_runtime7.jsxs)(SelectContext.Provider, { value: contextValue, children: [
    children,
    (0, import_jsx_runtime7.jsx)(
      "input",
      {
        readOnly: true,
        ref,
        name,
        style: { display: "none" },
        value: value || selected?.value || ""
      }
    )
  ] });
}
SelectRootBase.displayName = "MaterialTailwind.Select";
var SelectRoot = React7.forwardRef(SelectRootBase);
function SelectTriggerRoot({
  as,
  indicator,
  placeholder,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.selectTrigger ?? selectTriggerTheme;
  const defaultProps = theme2?.defaultProps;
  const {
    refs,
    getReferenceProps,
    selected,
    isPill,
    color,
    size: size4,
    isOpen,
    isError,
    isSuccess,
    disabled
  } = React7.useContext(SelectContext);
  const value = selected?.value;
  const element = selected?.element;
  const elementRef = useMergeRefs([refs?.setReference, ref]);
  indicator ??= defaultProps?.indicator ?? (0, import_jsx_runtime7.jsxs)(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      color: "currentColor",
      className: "h-[1em] w-[1em] translate-x-0.5 stroke-[1.5]",
      children: [
        (0, import_jsx_runtime7.jsx)(
          "path",
          {
            d: "M17 8L12 3L7 8",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        (0, import_jsx_runtime7.jsx)(
          "path",
          {
            d: "M17 16L12 21L7 16",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
  const styles = twMerge(
    theme2.baseStyle,
    theme2.size[size4],
    theme2.color[color],
    isPill && theme2.isPill,
    className
  );
  return (0, import_jsx_runtime7.jsxs)(
    Component,
    {
      ...props,
      ref: elementRef,
      tabIndex: 0,
      type: "button",
      className: styles,
      "data-open": isOpen,
      disabled,
      "data-error": isError,
      "data-success": isSuccess,
      ...getReferenceProps && getReferenceProps(),
      children: [
        children ? children({ value, element }) : element ?? (0, import_jsx_runtime7.jsx)("span", { "data-slot": "placeholder", className: theme2.placeholder, children: placeholder }),
        indicator
      ]
    }
  );
}
SelectTriggerRoot.displayName = "MaterialTailwind.SelectTrigger";
var SelectTrigger = React7.forwardRef(SelectTriggerRoot);
function SelectListRoot({
  as,
  className,
  children,
  disabled,
  initialFocus,
  returnFocus,
  guards,
  modal,
  visuallyHiddenDismiss,
  closeOnFocusOut,
  order,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.selectList ?? selectListTheme;
  const defaultProps = theme2?.defaultProps;
  const {
    context,
    refs,
    getFloatingProps,
    floatingStyles,
    elementsRef,
    labelsRef,
    isOpen,
    selected,
    setSelected,
    controlledValue
  } = React7.useContext(SelectContext);
  disabled ??= defaultProps?.disabled ?? false;
  initialFocus ??= defaultProps?.initialFocus ?? 0;
  returnFocus ??= defaultProps?.returnFocus ?? true;
  guards ??= defaultProps?.guards ?? true;
  modal ??= defaultProps?.modal ?? true;
  visuallyHiddenDismiss ??= defaultProps?.visuallyHiddenDismiss ?? true;
  closeOnFocusOut ??= defaultProps?.closeOnFocusOut ?? true;
  order ??= defaultProps?.order ?? ["content"];
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setFloating, ref]);
  React7.useEffect(() => {
    if (controlledValue) {
      const label = children?.find(
        (el) => selected?.value === el.props.value
      );
      if (label) {
        setSelected?.({
          value: label?.props?.value || "",
          element: label?.props?.children || ""
        });
      }
    }
  }, []);
  return isOpen ? (0, import_jsx_runtime7.jsx)(
    FloatingFocusManager,
    {
      order,
      modal,
      guards,
      disabled,
      returnFocus,
      initialFocus,
      closeOnFocusOut,
      visuallyHiddenDismiss,
      context,
      children: (0, import_jsx_runtime7.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": isOpen,
          style: { ...floatingStyles, ...props?.style },
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children: (0, import_jsx_runtime7.jsx)(
            FloatingList,
            {
              elementsRef,
              labelsRef,
              children
            }
          )
        }
      )
    }
  ) : null;
}
SelectListRoot.displayName = "MaterialTailwind.SelectList";
var SelectList = React7.forwardRef(SelectListRoot);
function SelectOptionRoot({
  as,
  className,
  value,
  ripple,
  indicator,
  children,
  ...props
}, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.selectOption ?? selectOptionTheme;
  const defaultProps = theme2?.defaultProps;
  const { getItemProps, handleSelect, activeIndex, selectedIndex, selected } = React7.useContext(SelectContext);
  ripple ??= defaultProps?.ripple ?? true;
  indicator ??= defaultProps?.indicator ?? (0, import_jsx_runtime7.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "h-4 w-4",
      children: (0, import_jsx_runtime7.jsx)(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M4.5 12.75l6 6 9-13.5"
        }
      )
    }
  );
  const { ref: itemRef, index: index3 } = useListItem({
    label: { value, element: children }
  });
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects.default();
  const handleClick = (e) => {
    const onClick = props?.onClick;
    if (ripple) {
      rippleEffect.create(e, "dark");
    }
    handleSelect && handleSelect(index3);
    onClick?.(e);
  };
  const curValue = selected?.value || "";
  const isActive = activeIndex === index3;
  const isSelected = selectedIndex === index3 || curValue === value;
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([itemRef, ref]);
  return (0, import_jsx_runtime7.jsxs)(
    Component,
    {
      ...props,
      ref: elementRef,
      role: "option",
      "data-selected": isActive && isSelected,
      "aria-selected": isActive && isSelected,
      tabIndex: isActive ? 0 : -1,
      className: styles,
      ...getItemProps && getItemProps({
        onClick: handleClick
      }),
      children: [
        children,
        isSelected && indicator
      ]
    }
  );
}
SelectOptionRoot.displayName = "MaterialTailwind.SelectOption";
var SelectOption = React7.forwardRef(SelectOptionRoot);
var Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  List: SelectList,
  Option: SelectOption
});

// node_modules/@material-tailwind/react/dist/chunk-BAHTMLHP.js
var React9 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-ranger/build/esm/index.js
var React8 = __toESM(require_react());

// node_modules/@tanstack/ranger/build/esm/index.js
var getBoundingClientRect2 = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    left: Math.ceil(rect.left),
    width: Math.ceil(rect.width)
  };
};
var sortNumList = (arr) => [...arr].map(Number).sort((a, b) => a - b);
var linearInterpolator = {
  getPercentageForValue: (val, min3, max3) => {
    return Math.max(0, Math.min(100, (val - min3) / (max3 - min3) * 100));
  },
  getValueForClientX: (clientX, trackDims, min3, max3) => {
    const {
      left,
      width
    } = trackDims;
    const percentageValue = (clientX - left) / width;
    const value = (max3 - min3) * percentageValue;
    return value + min3;
  }
};
var Ranger = class {
  sortedValues = [];
  rangerElement = null;
  constructor(opts) {
    this.setOptions(opts);
  }
  setOptions(opts) {
    Object.entries(opts).forEach(([key, value]) => {
      if (typeof value === "undefined") delete opts[key];
    });
    this.options = {
      debug: false,
      tickSize: 10,
      interpolator: linearInterpolator,
      onChange: () => {
      },
      ...opts
    };
  }
  _willUpdate = () => {
    const rangerElement = this.options.getRangerElement();
    if (this.rangerElement !== rangerElement) {
      this.rangerElement = rangerElement;
    }
  };
  getValueForClientX = (clientX) => {
    const trackDims = getBoundingClientRect2(this.rangerElement);
    return this.options.interpolator.getValueForClientX(clientX, trackDims, this.options.min, this.options.max);
  };
  getNextStep = (val, direction) => {
    const {
      min: min3,
      max: max3
    } = this.options;
    if ("steps" in this.options) {
      const {
        steps
      } = this.options;
      let currIndex = steps.indexOf(val);
      let nextIndex = currIndex + direction;
      if (nextIndex >= 0 && nextIndex < steps.length) {
        return steps[nextIndex];
      } else {
        return val;
      }
    } else {
      let nextVal = val + this.options.stepSize * direction;
      if (nextVal >= min3 && nextVal <= max3) {
        return nextVal;
      } else {
        return val;
      }
    }
  };
  roundToStep = (val) => {
    const {
      min: min3,
      max: max3
    } = this.options;
    let left = min3;
    let right = max3;
    if ("steps" in this.options) {
      this.options.steps.forEach((step) => {
        if (step <= val && step > left) {
          left = step;
        }
        if (step >= val && step < right) {
          right = step;
        }
      });
    } else {
      const {
        stepSize
      } = this.options;
      while (left < val && left + stepSize < val) {
        left += stepSize;
      }
      right = Math.min(left + stepSize, max3);
    }
    if (val - left < right - val) {
      return left;
    }
    return right;
  };
  handleDrag = (e) => {
    if (this.activeHandleIndex === void 0) {
      return;
    }
    const clientX = e.type === "touchmove" ? e.changedTouches[0].clientX : e.clientX;
    const newValue = this.getValueForClientX(clientX);
    const newRoundedValue = this.roundToStep(newValue);
    this.sortedValues = [...this.options.values.slice(0, this.activeHandleIndex), newRoundedValue, ...this.options.values.slice(this.activeHandleIndex + 1)];
    if (this.options.onDrag) {
      this.options.onDrag(this);
    } else {
      this.tempValues = this.sortedValues;
      this.options.rerender();
    }
  };
  handleKeyDown = (e, i) => {
    const {
      values
    } = this.options;
    if (e.keyCode === 37 || e.keyCode === 39) {
      this.activeHandleIndex = i;
      const direction = e.keyCode === 37 ? -1 : 1;
      const newValue = this.getNextStep(values[i], direction);
      const newValues = [...values.slice(0, i), newValue, ...values.slice(i + 1)];
      this.sortedValues = sortNumList(newValues);
      if (this.options.onChange) {
        this.options.onChange(this);
      }
    }
  };
  handlePress = (_e, i) => {
    this.activeHandleIndex = i;
    this.options.rerender();
    const handleRelease = () => {
      const {
        tempValues,
        handleDrag: handleDrag2
      } = this;
      document.removeEventListener("mousemove", handleDrag2);
      document.removeEventListener("touchmove", handleDrag2);
      document.removeEventListener("mouseup", handleRelease);
      document.removeEventListener("touchend", handleRelease);
      this.sortedValues = sortNumList(tempValues || this.options.values);
      if (this.options.onChange) {
        this.options.onChange(this);
      }
      if (this.options.onDrag) {
        this.options.onDrag(this);
      }
      this.activeHandleIndex = void 0;
      this.tempValues = void 0;
      this.options.rerender();
    };
    const {
      handleDrag
    } = this;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("mouseup", handleRelease);
    document.addEventListener("touchend", handleRelease);
  };
  getPercentageForValue = (val) => this.options.interpolator.getPercentageForValue(val, this.options.min, this.options.max);
  getTicks = () => {
    let ticks = [];
    if (this.options.ticks) {
      ticks = [...this.options.ticks];
    } else if ("steps" in this.options) {
      ticks = [...this.options.steps];
    } else {
      ticks = [this.options.min];
      while (ticks[ticks.length - 1] < this.options.max - this.options.tickSize) {
        ticks.push(ticks[ticks.length - 1] + this.options.tickSize);
      }
      ticks.push(this.options.max);
    }
    return ticks.map((value, i) => ({
      value,
      key: i,
      percentage: this.getPercentageForValue(value)
    }));
  };
  getSteps = () => {
    const values = sortNumList(this.tempValues || this.options.values);
    return [...values, this.options.max].map((value, i) => {
      const previousValue = values[i - 1];
      const leftValue = previousValue !== void 0 ? previousValue : this.options.min;
      const left = this.getPercentageForValue(leftValue);
      const width = this.getPercentageForValue(value) - left;
      return {
        left,
        width
      };
    });
  };
  handles = () => {
    return (this.tempValues || this.options.values).map((value, i) => ({
      value,
      isActive: i === this.activeHandleIndex,
      onKeyDownHandler: (e) => {
        this.handleKeyDown(e, i);
      },
      onMouseDownHandler: (e) => {
        this.handlePress(e, i);
      },
      onTouchStart: (e) => {
        this.handlePress(e, i);
      }
    }));
  };
};

// node_modules/@tanstack/react-ranger/build/esm/index.js
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React8.useLayoutEffect : React8.useEffect;
function useRanger(options) {
  const rerender = React8.useReducer(() => ({}), {})[1];
  const resolvedOptions = {
    ...options,
    rerender,
    onChange: (instance2) => {
      rerender();
      options.onChange?.(instance2);
    }
  };
  const [instance] = React8.useState(() => new Ranger(resolvedOptions));
  instance.setOptions(resolvedOptions);
  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });
  return instance;
}

// node_modules/@material-tailwind/react/dist/chunk-BAHTMLHP.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var import_react10 = __toESM(require_react(), 1);
var SliderContext = React9.createContext({
  min: 0,
  max: 100,
  step: 1
});
function SliderRootBase({
  as,
  color,
  size: size4,
  disabled,
  min: min3,
  max: max3,
  step,
  value: controlledValue,
  onValueChange: setControlledValue,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "div";
  const sliderRef = React9.useRef(null);
  const contextTheme = useTheme();
  const theme2 = contextTheme?.slider ?? sliderTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  const [uncontrolledValue, setUncontrolledValue] = React9.useState([
    0
  ]);
  const value = controlledValue?.slice(0, 2) ?? uncontrolledValue;
  const onValueChange = setControlledValue ?? setUncontrolledValue;
  const contextValue = React9.useMemo(
    () => ({
      size: size4,
      color,
      value,
      onValueChange,
      min: min3 ?? 0,
      max: max3 ?? 100,
      step: step ?? 1,
      sliderRef
    }),
    [value, onValueChange, min3, max3, step, size4, color]
  );
  const styles = twMerge(theme2.baseStyle, theme2["size"][size4], className);
  const elementRef = useMergeRefs([sliderRef, ref]);
  return (0, import_jsx_runtime8.jsx)(SliderContext.Provider, { value: contextValue, children: (0, import_jsx_runtime8.jsx)(Component, { ref: elementRef, ...props, className: styles, children }) });
}
SliderRootBase.displayName = "MaterialTailwind.Slider";
var SliderRoot = React9.forwardRef(SliderRootBase);
function SliderRangeRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.sliderRange ?? sliderRangeTheme;
  const { sliderRef, value, onValueChange, min: min3, max: max3, step, color } = React9.useContext(SliderContext);
  const sliderInstance = useRanger({
    getRangerElement: () => sliderRef.current,
    values: value,
    min: min3 ?? 0,
    max: max3 ?? 100,
    stepSize: step ?? 1,
    onDrag: (instance) => onValueChange?.(instance.sortedValues),
    onChange: (instance) => onValueChange?.(instance.sortedValues)
  });
  return sliderInstance.getSteps().map(({ left, width }, i) => (0, import_jsx_runtime8.jsx)(
    Component,
    {
      ref,
      ...props,
      className: twMerge(
        theme2.baseStyle,
        value && value.length > 1 ? i === 0 ? "bg-transparent" : i === 1 ? theme2["color"][color ?? "primary"] : "bg-transparent" : i === 0 ? theme2["color"][color ?? "primary"] : "bg-transparent",
        className
      ),
      style: {
        position: "absolute",
        left: `${left}%`,
        width: `${width}%`,
        ...props?.style
      },
      children
    }
  ));
}
SliderRangeRoot.displayName = "MaterialTailwind.SliderRange";
var SliderRange = React9.forwardRef(SliderRangeRoot);
function SliderThumbRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.sliderThumb ?? sliderThumbTheme;
  const { sliderRef, value, onValueChange, min: min3, max: max3, step, size: size4, color } = React9.useContext(SliderContext);
  const sliderInstance = useRanger({
    getRangerElement: () => sliderRef.current,
    values: value,
    min: min3 ?? 0,
    max: max3 ?? 100,
    stepSize: step ?? 1,
    onDrag: (instance) => onValueChange?.(instance.sortedValues),
    onChange: (instance) => onValueChange?.(instance.sortedValues)
  });
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4 ?? "md"],
    theme2["color"][color ?? "primary"],
    className
  );
  return sliderInstance.handles().map(
    ({
      value: value2,
      onKeyDownHandler,
      onMouseDownHandler,
      onTouchStart,
      isActive
    }, i) => {
      return (0, import_react10.createElement)(
        Component,
        {
          ...props,
          ref,
          key: i,
          onKeyDown: (e) => {
            props?.onKeyDown?.(e);
            onKeyDownHandler(e);
          },
          onMouseDown: (e) => {
            props?.onMouseDown?.(e);
            onMouseDownHandler(e);
          },
          onTouchStart: (e) => {
            props?.onTouchStart?.(e);
            onTouchStart(e);
          },
          role: "slider",
          "aria-valuemin": sliderInstance.options.min,
          "aria-valuemax": sliderInstance.options.max,
          "aria-valuenow": value2,
          className: styles,
          style: {
            position: "absolute",
            top: "50%",
            left: `${sliderInstance.getPercentageForValue(value2)}%`,
            zIndex: isActive ? "1" : "0",
            transform: "translate(-50%, -50%)",
            ...props?.style
          }
        }
      );
    }
  );
}
SliderThumbRoot.displayName = "MaterialTailwind.SliderThumb";
var SliderThumb = React9.forwardRef(SliderThumbRoot);
function SliderTickRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.sliderTick ?? sliderTickTheme;
  const { sliderRef, value, onValueChange, min: min3, max: max3, step, size: size4, color } = React9.useContext(SliderContext);
  const sliderInstance = useRanger({
    getRangerElement: () => sliderRef.current,
    values: value,
    min: min3 ?? 0,
    max: max3 ?? 100,
    stepSize: step ?? 1,
    onDrag: (instance) => onValueChange?.(instance.sortedValues),
    onChange: (instance) => onValueChange?.(instance.sortedValues)
  });
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4 ?? "md"],
    theme2["color"][color ?? "primary"],
    className
  );
  return sliderInstance.getTicks().map(({ value: value2, key, percentage }) => (0, import_react10.createElement)(
    Component,
    {
      ...props,
      key,
      ref,
      className: styles,
      style: {
        left: `${percentage}%`,
        ...props?.style
      }
    },
    value2
  ));
}
SliderTickRoot.displayName = "MaterialTailwind.SliderTick";
var SliderTick = React9.forwardRef(SliderTickRoot);
var Slider = Object.assign(SliderRoot, {
  Range: SliderRange,
  Thumb: SliderThumb,
  Tick: SliderTick
});

// node_modules/@material-tailwind/react/dist/chunk-W7QACMSV.js
var React10 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function SpinnerRoot({ size: size4, color, className, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme.spinner ?? spinnerTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  const styles = twMerge(theme2.baseStyle, theme2.size[size4], className);
  const spinnerColor = twMerge(theme2.color[color]);
  return (0, import_jsx_runtime9.jsxs)(
    "svg",
    {
      ...props,
      ref,
      fill: "none",
      className: styles,
      viewBox: "0 0 64 64",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        (0, import_jsx_runtime9.jsx)(
          "path",
          {
            stroke: "currentColor",
            strokeWidth: "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          }
        ),
        (0, import_jsx_runtime9.jsx)(
          "path",
          {
            strokeWidth: "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: spinnerColor,
            d: "M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762",
            stroke: "currentColor"
          }
        )
      ]
    }
  );
}
SpinnerRoot.displayName = "MaterialTailwind.Spinner";
var Spinner = React10.forwardRef(SpinnerRoot);

// node_modules/@material-tailwind/react/dist/chunk-45N2MFVJ.js
var React11 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
function SwitchRoot({ color, className, ...props }, ref) {
  const innerID = React11.useId();
  const contextTheme = useTheme();
  const theme2 = contextTheme?.switch ?? switchTheme;
  const defaultProps = theme2?.defaultProps;
  color ??= defaultProps?.color ?? "primary";
  const styles = twMerge(
    theme2.baseStyle,
    theme2.trackStyle,
    theme2.circleStyle,
    theme2.color[color],
    className
  );
  return (0, import_jsx_runtime10.jsx)(
    "input",
    {
      ...props,
      ref,
      type: "checkbox",
      className: styles,
      id: props?.id || innerID
    }
  );
}
SwitchRoot.displayName = "MaterialTailwind.Switch";
var Switch = React11.forwardRef(SwitchRoot);

// node_modules/@material-tailwind/react/dist/chunk-CATVNKHO.js
var React12 = __toESM(require_react(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var TabsContext = React12.createContext({
  activeTab: "",
  orientation: "horizontal"
});
function TabsRootBase({
  as,
  value,
  defaultValue,
  onValueChange,
  orientation,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.tabs || tabsTheme;
  const defaultProps = contextTheme.defaultProps;
  orientation ??= defaultProps?.orientation ?? "horizontal";
  const tabsValue = value || defaultValue;
  const [indicatorRect, setIndicatorRect] = React12.useState({
    clientWidth: 0,
    clientHeight: 0,
    offsetLeft: 0,
    offsetTop: 0
  });
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = React12.useState(() => tabsValue);
  const activeTab = value || uncontrolledActiveTab;
  const setActiveTab = onValueChange || setUncontrolledActiveTab;
  React12.useEffect(() => {
    setActiveTab(tabsValue);
  }, [tabsValue]);
  const contextValue = React12.useMemo(
    () => ({
      orientation,
      activeTab,
      setActiveTab,
      indicatorRect,
      setIndicatorRect
    }),
    [orientation, activeTab, setActiveTab, indicatorRect, setIndicatorRect]
  );
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(TabsContext.Provider, { value: contextValue, children: (0, import_jsx_runtime11.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-orientation": orientation,
      children
    }
  ) });
}
TabsRootBase.displayName = "MaterialTailwind.TabsRoot";
var TabsRoot = React12.forwardRef(TabsRootBase);
function TabsListRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.tabsList || tabsListTheme;
  const { orientation } = React12.useContext(TabsContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(
    Component,
    {
      ...props,
      ref,
      role: "tablist",
      className: styles,
      "aria-orientation": orientation,
      "data-orientation": orientation,
      children
    }
  );
}
TabsListRoot.displayName = "MaterialTailwind.TabsList";
var TabsList = React12.forwardRef(TabsListRoot);
function TabsTriggerRoot({ as, value, className, children, ...props }, ref) {
  const Component = as || "button";
  const innerRef = React12.useRef(null);
  const [elementRect, setElementRect] = React12.useState(
    null
  );
  const contextTheme = useTheme();
  const theme2 = contextTheme.tabsTrigger || tabsTriggerTheme;
  const { activeTab, setActiveTab, setIndicatorRect } = React12.useContext(TabsContext);
  const isActive = activeTab === value;
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([innerRef, ref]);
  React12.useEffect(() => {
    const element = innerRef.current;
    if (element) {
      setElementRect(element);
    }
  }, []);
  const handleIndicatorRect = React12.useCallback(() => {
    if (isActive && elementRect) {
      setIndicatorRect?.({
        clientWidth: elementRect.clientWidth,
        clientHeight: elementRect.clientHeight,
        offsetLeft: elementRect.offsetLeft,
        offsetTop: elementRect.offsetTop
      });
    }
  }, [isActive, elementRect]);
  React12.useEffect(() => {
    handleIndicatorRect();
  }, [handleIndicatorRect]);
  React12.useEffect(() => {
    window.addEventListener("resize", handleIndicatorRect);
    return () => {
      window.removeEventListener("resize", handleIndicatorRect);
    };
  }, [handleIndicatorRect]);
  return (0, import_jsx_runtime11.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      role: "tab",
      className: styles,
      "data-active": isActive,
      "aria-selected": isActive,
      onClick: (event) => {
        props.onClick?.(event);
        setActiveTab?.(value);
      },
      children
    }
  );
}
TabsTriggerRoot.displayName = "MaterialTailwind.TabsTrigger";
var TabsTrigger = React12.forwardRef(TabsTriggerRoot);
function TabsPanelRoot({ as, value, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.tabsPanel || tabsPanelTheme;
  const { activeTab, orientation } = React12.useContext(TabsContext);
  const isActive = activeTab === value;
  const styles = twMerge(theme2.baseStyle, className);
  return isActive ? (0, import_jsx_runtime11.jsx)(
    Component,
    {
      ...props,
      ref,
      role: "tabpanel",
      className: styles,
      "data-active": isActive,
      "data-orientation": orientation,
      children
    }
  ) : null;
}
TabsPanelRoot.displayName = "MaterialTailwind.TabsPanel";
var TabsPanel = React12.forwardRef(TabsPanelRoot);
function TabsTriggerIndicatorRoot({ as, className, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme.tabsTriggerIndicator || tabsTriggerIndicatorTheme;
  const { indicatorRect } = React12.useContext(TabsContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(
    Component,
    {
      ...props,
      ref,
      style: {
        ...props?.style,
        width: indicatorRect?.clientWidth,
        height: indicatorRect?.clientHeight,
        left: indicatorRect?.offsetLeft,
        top: indicatorRect?.offsetTop,
        position: "absolute",
        zIndex: 1
      },
      className: styles
    }
  );
}
TabsTriggerIndicatorRoot.displayName = "MaterialTailwind.TabsTriggerIndicator";
var TabsTriggerIndicator = React12.forwardRef(
  TabsTriggerIndicatorRoot
);
var Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
  TriggerIndicator: TabsTriggerIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-N7VZAGKE.js
var React13 = __toESM(require_react(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
function TextareaRoot({
  color,
  size: size4,
  resize,
  isError,
  isSuccess,
  className,
  ...props
}, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.textarea ?? textareaTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  resize ??= defaultProps?.resize ?? false;
  isError ??= defaultProps?.isError ?? false;
  isSuccess ??= defaultProps?.isSuccess ?? false;
  const styles = twMerge(
    theme2.baseStyle,
    theme2.color[color],
    theme2.size[size4],
    resize && theme2["resize"],
    isError && theme2["isError"],
    isSuccess && theme2["isSuccess"],
    className
  );
  return (0, import_jsx_runtime12.jsx)(
    "textarea",
    {
      rows: 8,
      ...props,
      ref,
      className: styles,
      "data-error": isError,
      "data-success": isSuccess
    }
  );
}
TextareaRoot.displayName = "MaterialTailwind.Textarea";
var Textarea = React13.forwardRef(TextareaRoot);

// node_modules/@material-tailwind/react/dist/chunk-7N6QJBKP.js
var React14 = __toESM(require_react(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var TimelineContext = React14.createContext({
  value: "",
  setValue: () => {
  },
  color: "primary",
  mode: "timeline",
  orientation: "horizontal"
});
function TimelineRootBase({
  as,
  value,
  defaultValue,
  onValueChange,
  color,
  mode,
  orientation,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.timeline ?? timelineTheme;
  const defaultProps = theme2?.defaultProps;
  const innerRef = React14.useRef(null);
  const [innerValue, setInnerValue] = React14.useState(defaultValue || "");
  value ??= innerValue;
  onValueChange ??= setInnerValue;
  mode ??= defaultProps?.mode ?? "timeline";
  color ??= defaultProps?.color ?? "primary";
  orientation ??= defaultProps?.orientation ?? "horizontal";
  React14.useEffect(() => {
    const parentEl = innerRef?.current;
    if (parentEl && !value) {
      const children2 = Array.from(parentEl.children);
      const firstChild = children2[0];
      onValueChange?.(firstChild.dataset.value);
    }
  }, []);
  React14.useEffect(() => {
    if (mode === "stepper") {
      const parentEl = innerRef?.current;
      if (parentEl) {
        const children2 = Array.from(parentEl.children);
        const currentEl = children2.find(
          (child) => child.dataset.value == value
        );
        const currentElIndex = children2.findIndex(
          (child) => child.dataset.value == value
        );
        const activeElIndex = children2.findIndex(
          (child) => child.dataset.active === "true"
        );
        const completedSteps = children2.filter(
          (_, index3) => index3 < activeElIndex
        );
        const incompletedSteps = children2.filter(
          (_, index3) => index3 > activeElIndex
        );
        completedSteps.forEach((step) => {
          step.dataset.completed = "true";
        });
        incompletedSteps.forEach((step) => {
          step.dataset.completed = "false";
        });
        if (currentElIndex === activeElIndex && currentEl) {
          currentEl.dataset.completed = "false";
        }
      }
    }
  }, [value]);
  const contextValue = React14.useMemo(
    () => ({
      value,
      setValue: onValueChange,
      orientation,
      color,
      mode,
      parentRef: innerRef
    }),
    [value, onValueChange, orientation, color, mode]
  );
  const styles = twMerge(theme2.baseStyle, className);
  const mergedRef = useMergeRefs([ref, innerRef]);
  return (0, import_jsx_runtime13.jsx)(
    Component,
    {
      ...props,
      ref: mergedRef,
      className: styles,
      "data-orientation": orientation,
      children: (0, import_jsx_runtime13.jsx)(TimelineContext.Provider, { value: contextValue, children })
    }
  );
}
TimelineRootBase.displayName = "MaterialTailwind.Timeline";
var TimelineRoot = React14.forwardRef(TimelineRootBase);
function TimelineItemRoot({ as, value, className, disabled, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.timelineItem ?? timelineItemTheme;
  const {
    mode,
    setValue,
    orientation,
    value: contextValue
  } = React14.useContext(TimelineContext);
  const innerRef = React14.useRef(null);
  value ??= React14.useId();
  const isActive = contextValue == value || mode === "timeline";
  function onClick(event) {
    props?.onClick?.(event);
    if (mode === "stepper") {
      setValue?.(value);
    }
  }
  const styles = twMerge(theme2.baseStyle, className);
  const mergedRef = useMergeRefs([ref, innerRef]);
  return (0, import_jsx_runtime13.jsx)(
    Component,
    {
      ...props,
      ref: mergedRef,
      onClick,
      "data-value": value,
      "data-active": isActive,
      "data-completed": isActive,
      "data-orientation": orientation,
      "aria-disabled": disabled,
      className: styles,
      children
    }
  );
}
TimelineItemRoot.displayName = "MaterialTailwind.TimelineItem";
var TimelineItem = React14.forwardRef(TimelineItemRoot);
function TimelineHeaderRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.timelineHeader ?? timelineHeaderTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime13.jsx)(Component, { ...props, ref, className: styles, children });
}
TimelineHeaderRoot.displayName = "MaterialTailwind.TimelineHeader";
var TimelineHeader = React14.forwardRef(TimelineHeaderRoot);
function TimelineIconRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.timelineIcon ?? timelineIconTheme;
  const { color } = React14.useContext(TimelineContext);
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  return (0, import_jsx_runtime13.jsx)(Component, { ...props, ref, className: styles, children });
}
TimelineIconRoot.displayName = "MaterialTailwind.TimelineIcon";
var TimelineIcon = React14.forwardRef(TimelineIconRoot);
function TimelineSeparatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.timelineSeparator ?? timelineSeparatorTheme;
  const { orientation, color } = React14.useContext(TimelineContext);
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  return (0, import_jsx_runtime13.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-orientation": orientation,
      className: styles,
      children
    }
  );
}
TimelineSeparatorRoot.displayName = "MaterialTailwind.TimelineSeparator";
var TimelineSeparator = React14.forwardRef(TimelineSeparatorRoot);
function TimelineBodyRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.timelineBody ?? timelineBodyTheme;
  const { orientation } = React14.useContext(TimelineContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime13.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-orientation": orientation,
      children
    }
  );
}
TimelineBodyRoot.displayName = "MaterialTailwind.TimelineBody";
var TimelineBody = React14.forwardRef(TimelineBodyRoot);
var Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Icon: TimelineIcon,
  Body: TimelineBody,
  Header: TimelineHeader,
  Separator: TimelineSeparator
});

// node_modules/@material-tailwind/react/dist/chunk-7QFTCBAN.js
var React15 = __toESM(require_react(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var InputContext = React15.createContext({
  size: "md",
  color: "primary",
  isError: false,
  isSuccess: false,
  iconPlacement: "start",
  isIconDefined: false,
  isPill: false,
  disabled: false,
  setIconPlacement: () => null,
  setIsIconDefined: () => null
});
function InputRootBase({
  as,
  color,
  size: size4,
  isPill,
  isError,
  isSuccess,
  disabled,
  className,
  children,
  type = "text",
  ...props
}, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.input ?? inputTheme;
  const defaultProps = theme2?.defaultProps;
  const [isIconDefined, setIsIconDefined] = React15.useState(false);
  const [iconPlacement, setIconPlacement] = React15.useState("start");
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  isPill ??= defaultProps?.isPill ?? false;
  isError ??= defaultProps?.isError ?? false;
  isSuccess ??= defaultProps?.isSuccess ?? false;
  const styles = twMerge(
    theme2.baseStyle,
    theme2.size[size4],
    theme2.color[color],
    className,
    "peer"
  );
  const contextValue = React15.useMemo(
    () => ({
      size: size4,
      color,
      isError,
      isSuccess,
      iconPlacement,
      isIconDefined,
      disabled,
      isPill,
      setIconPlacement,
      setIsIconDefined
    }),
    [
      size4,
      color,
      isError,
      isSuccess,
      iconPlacement,
      isIconDefined,
      disabled,
      isPill,
      setIconPlacement,
      setIsIconDefined
    ]
  );
  const inputType = [
    "text",
    "email",
    "password",
    "search",
    "number",
    "tel",
    "url",
    "hidden"
  ].includes(type) ? type : "text";
  return (0, import_jsx_runtime14.jsx)(Component, { className: "relative w-full", children: (0, import_jsx_runtime14.jsxs)(InputContext.Provider, { value: contextValue, children: [
    (0, import_jsx_runtime14.jsx)(
      "input",
      {
        ...props,
        ref,
        type: inputType,
        className: styles,
        disabled,
        "data-error": isError,
        "data-success": isSuccess,
        "data-shape": isPill ? "pill" : "default",
        "data-icon-placement": isIconDefined ? iconPlacement : ""
      }
    ),
    children
  ] }) });
}
InputRootBase.displayName = "MaterialTailwind.Input";
var InputRoot = React15.forwardRef(InputRootBase);
function InputIconRoot({ as, placement, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const {
    size: size4,
    iconPlacement,
    setIconPlacement,
    setIsIconDefined,
    isError,
    isSuccess,
    disabled
  } = React15.useContext(InputContext);
  const theme2 = contextTheme?.inputIcon ?? inputIconTheme;
  const defaultProps = theme2?.defaultProps;
  placement ??= defaultProps?.placement ?? "start";
  React15.useEffect(() => {
    setIsIconDefined(true);
    return () => {
      setIsIconDefined(false);
    };
  }, []);
  React15.useEffect(() => {
    setIconPlacement(placement);
    return () => {
      setIconPlacement("start");
    };
  }, [placement]);
  const styles = twMerge(theme2.baseStyle, theme2.size[size4], props?.className);
  return (0, import_jsx_runtime14.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-error": isError,
      "data-success": isSuccess,
      "aria-disabled": disabled,
      "data-placement": iconPlacement
    }
  );
}
InputIconRoot.displayName = "MaterialTailwind.InputIcon";
var InputIcon = React15.forwardRef(InputIconRoot);
var Input = Object.assign(InputRoot, {
  Icon: InputIcon
});

// node_modules/@material-tailwind/react/dist/chunk-4ZWUS624.js
var React16 = __toESM(require_react(), 1);
var import_material_ripple_effects2 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
function ListRootBase({ as, className, children, ...props }, ref) {
  const Component = as ?? "ul";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.list ?? listTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime15.jsx)(Component, { ...props, ref, className: styles, children });
}
ListRootBase.displayName = "MaterialTailwind.List";
var ListRoot = React16.forwardRef(ListRootBase);
function ListItemRoot({
  as,
  className,
  disabled,
  selected,
  ripple,
  children,
  ...props
}, ref) {
  const Component = as ?? "li";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.listItem ?? listItemTheme;
  const defaultProps = theme2?.defaultProps;
  ripple ??= defaultProps?.ripple ?? true;
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects2.default();
  const handleClick = (e) => {
    const onClick = props?.onClick;
    if (ripple) {
      rippleEffect.create(e, "dark");
    }
    return typeof onClick === "function" && onClick(e);
  };
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime15.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-selected": selected,
      "aria-disabled": disabled,
      onClick: handleClick,
      children
    }
  );
}
ListItemRoot.displayName = "MaterialTailwind.ListItem";
var ListItem = React16.forwardRef(ListItemRoot);
function ListItemStartRoot({ as, className, disabled, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.listItemStart ?? listItemStartTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime15.jsx)(Component, { ...props, ref, className: styles, children });
}
ListItemStartRoot.displayName = "MaterialTailwind.ListItemStart";
var ListItemStart = React16.forwardRef(ListItemStartRoot);
function ListItemEndRoot({ as, className, disabled, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.listItemEnd ?? listItemEndTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime15.jsx)(Component, { ...props, ref, className: styles, children });
}
ListItemEndRoot.displayName = "MaterialTailwind.ListItemEnd";
var ListItemEnd = React16.forwardRef(ListItemEndRoot);
var List = Object.assign(ListRoot, {
  Item: ListItem,
  ItemStart: ListItemStart,
  ItemEnd: ListItemEnd
});

// node_modules/@material-tailwind/react/dist/chunk-KWVMMTQK.js
var React17 = __toESM(require_react(), 1);
var import_material_ripple_effects3 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var MenuContext = React17.createContext({
  open: false,
  setOpen: () => {
  }
});
function MenuCore({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement,
  offset: offset4,
  children
}) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.menu ?? menuTheme;
  const defaultProps = theme2?.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React17.useState(false);
  const [activeIndex, setActiveIndex] = React17.useState(null);
  const elementsRef = React17.useRef([]);
  const labelsRef = React17.useRef([]);
  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();
  const isNested = parentId != null;
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  placement ??= isNested ? "right-start" : defaultProps?.placement ?? "bottom";
  offset4 ??= isNested ? 8 : defaultProps?.offset ?? 5;
  const { floatingStyles, refs, context } = useFloating2({
    nodeId,
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset3(offset4), flip3(), shift3({ padding: 5 })]
  });
  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true })
  });
  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation]
  );
  const contextValue = React17.useMemo(
    () => ({
      open,
      setOpen,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      floatingStyles,
      refs,
      context,
      item,
      isNested,
      activeIndex,
      elementsRef,
      labelsRef
    }),
    [
      open,
      setOpen,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      floatingStyles,
      refs,
      context,
      item,
      isNested,
      activeIndex,
      elementsRef,
      labelsRef
    ]
  );
  React17.useEffect(() => {
    if (!tree)
      return;
    function handleTreeClick() {
      setOpen(false);
    }
    function onSubMenuOpen(event) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setOpen(false);
      }
    }
    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);
    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);
  React17.useEffect(() => {
    if (open && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, open, nodeId, parentId]);
  return (0, import_jsx_runtime16.jsx)(FloatingNode, { id: nodeId, children: (0, import_jsx_runtime16.jsx)(MenuContext.Provider, { value: contextValue, children }) });
}
function MenuRoot(props) {
  const parentId = useFloatingParentNodeId();
  return parentId === null ? (0, import_jsx_runtime16.jsx)(FloatingTree, { children: (0, import_jsx_runtime16.jsx)(MenuCore, { ...props }) }) : (0, import_jsx_runtime16.jsx)(MenuCore, { ...props });
}
MenuRoot.displayName = "MaterialTailwind.Menu";
function MenuTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.menuTrigger ?? menuTriggerTheme;
  const {
    refs,
    item,
    activeIndex,
    isNested,
    getReferenceProps,
    getItemProps,
    open
  } = React17.useContext(MenuContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setReference, item?.ref, ref]);
  return (0, import_jsx_runtime16.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      "data-nested": isNested,
      tabIndex: !isNested ? void 0 : activeIndex === item?.index ? 0 : -1,
      role: isNested ? "menuitem" : void 0,
      className: styles,
      ...getReferenceProps && getItemProps && getReferenceProps(getItemProps()),
      children
    }
  );
}
MenuTriggerRoot.displayName = "MaterialTailwind.MenuTrigger";
var MenuTrigger = React17.forwardRef(MenuTriggerRoot);
function MenuContentRoot({
  as,
  className,
  children,
  disabled,
  initialFocus,
  returnFocus,
  guards,
  modal,
  visuallyHiddenDismiss,
  closeOnFocusOut,
  order,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.menuContent ?? menuContentTheme;
  const defaultProps = theme2.defaultProps;
  const {
    elementsRef,
    labelsRef,
    context,
    refs,
    getFloatingProps,
    open,
    floatingStyles,
    isNested
  } = React17.useContext(MenuContext);
  disabled ??= defaultProps?.disabled ?? false;
  initialFocus ??= defaultProps?.initialFocus ?? 0;
  returnFocus ??= defaultProps?.returnFocus ?? true;
  guards ??= defaultProps?.guards ?? true;
  modal ??= defaultProps?.modal ?? false;
  visuallyHiddenDismiss ??= defaultProps?.visuallyHiddenDismiss ?? true;
  closeOnFocusOut ??= defaultProps?.closeOnFocusOut ?? true;
  order ??= defaultProps?.order ?? ["content"];
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setFloating, ref]);
  return (0, import_jsx_runtime16.jsx)(FloatingList, { elementsRef, labelsRef, children: open && (0, import_jsx_runtime16.jsx)(FloatingPortal, { children: (0, import_jsx_runtime16.jsx)(
    FloatingFocusManager,
    {
      order,
      modal,
      guards,
      disabled,
      initialFocus: isNested ? -1 : initialFocus,
      returnFocus: isNested ? false : returnFocus,
      closeOnFocusOut,
      visuallyHiddenDismiss,
      context,
      children: (0, import_jsx_runtime16.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": open,
          style: { ...floatingStyles, ...props?.style },
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children
        }
      )
    }
  ) }) });
}
MenuContentRoot.displayName = "MaterialTailwind.MenuContent";
var MenuContent = React17.forwardRef(MenuContentRoot);
function MenuItemRoot({
  as,
  className,
  ripple,
  disabled,
  closeOnClick,
  children,
  ...props
}, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.menuItem ?? menuItemTheme;
  const defaultProps = theme2.defaultProps;
  const { activeIndex, getItemProps } = React17.useContext(MenuContext);
  ripple ??= defaultProps?.ripple ?? true;
  closeOnClick ??= defaultProps?.closeOnClick ?? true;
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects3.default();
  const item = useListItem({
    label: disabled ? null : children
  });
  const tree = useFloatingTree();
  const isActive = item.index === activeIndex;
  const elementRef = useMergeRefs([item.ref, ref]);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime16.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      role: "menuitem",
      "aria-disabled": disabled,
      tabIndex: isActive ? 0 : -1,
      className: styles,
      ...getItemProps && getItemProps({
        onClick(event) {
          props.onClick?.(event);
          if (closeOnClick) {
            tree?.events.emit("click");
          }
          if (ripple) {
            rippleEffect.create(event, "dark");
          }
        }
      }),
      children
    }
  );
}
MenuItemRoot.displayName = "MaterialTailwind.MenuItem";
var MenuItem = React17.forwardRef(MenuItemRoot);
var Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem
});

// node_modules/@material-tailwind/react/dist/chunk-WUFUNYGN.js
var React18 = __toESM(require_react(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
function NavbarRoot({ as, color, variant, className, children, ...props }, ref) {
  const Component = as || "nav";
  const contextTheme = useTheme();
  const theme2 = contextTheme.navbar || navbarTheme;
  const defaultProps = theme2.defaultProps;
  color ??= defaultProps?.color ?? "default";
  variant ??= defaultProps?.variant ?? "solid";
  const styles = twMerge(
    theme2.baseStyle,
    theme2.variant[variant][color],
    className
  );
  return (0, import_jsx_runtime17.jsx)(Component, { ...props, ref, className: styles, children });
}
NavbarRoot.displayName = "MaterialTailwind.Navbar";
var Navbar = React18.forwardRef(NavbarRoot);

// node_modules/@material-tailwind/react/dist/chunk-EW6AUMUA.js
var React19 = __toESM(require_react(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var PopoverContext = React19.createContext({
  open: false,
  setOpen: () => {
  }
});
function PopoverRoot({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement,
  offset: offset4,
  children
}) {
  const arrowRef = React19.useRef(null);
  const contextTheme = useTheme();
  const theme2 = contextTheme?.popover ?? popoverTheme;
  const defaultProps = theme2?.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React19.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  placement ??= defaultProps?.placement ?? "bottom";
  offset4 ??= defaultProps?.offset ?? 10;
  const data = useFloating2({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset3(offset4),
      flip3({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5
      }),
      shift3({ padding: 5 }),
      arrow3({
        element: arrowRef,
        padding: 5
      })
    ]
  });
  const { context } = data;
  const click = useClick(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);
  const contextValue = React19.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data
    }),
    [open, setOpen, arrowRef, interactions, data]
  );
  return (0, import_jsx_runtime18.jsx)(PopoverContext.Provider, { value: contextValue, children });
}
PopoverRoot.displayName = "MaterialTailwind.Popover";
function PopoverTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.popoverTrigger ?? popoverTriggerTheme;
  const { refs, getReferenceProps, open } = React19.useContext(PopoverContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setReference, ref]);
  return (0, import_jsx_runtime18.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      className: styles,
      ...getReferenceProps && getReferenceProps(),
      children
    }
  );
}
PopoverTriggerRoot.displayName = "MaterialTailwind.PopoverTrigger";
var PopoverTrigger = React19.forwardRef(PopoverTriggerRoot);
function PopoverContentRoot({
  as,
  className,
  children,
  disabled,
  initialFocus,
  returnFocus,
  guards,
  modal,
  visuallyHiddenDismiss,
  closeOnFocusOut,
  order,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.popoverContent ?? popoverContentTheme;
  const defaultProps = theme2.defaultProps;
  const { context, refs, getFloatingProps, open, floatingStyles } = React19.useContext(PopoverContext);
  disabled ??= defaultProps?.disabled ?? false;
  initialFocus ??= defaultProps?.initialFocus ?? 0;
  returnFocus ??= defaultProps?.returnFocus ?? true;
  guards ??= defaultProps?.guards ?? true;
  modal ??= defaultProps?.modal ?? false;
  visuallyHiddenDismiss ??= defaultProps?.visuallyHiddenDismiss ?? true;
  closeOnFocusOut ??= defaultProps?.closeOnFocusOut ?? true;
  order ??= defaultProps?.order ?? [
    "content"
  ];
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setFloating, ref]);
  return open ? (0, import_jsx_runtime18.jsx)(FloatingPortal, { children: (0, import_jsx_runtime18.jsx)(
    FloatingFocusManager,
    {
      order,
      modal,
      guards,
      disabled,
      returnFocus,
      initialFocus,
      closeOnFocusOut,
      visuallyHiddenDismiss,
      context,
      children: (0, import_jsx_runtime18.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": open,
          style: { ...floatingStyles, ...props?.style },
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children
        }
      )
    }
  ) }) : null;
}
PopoverContentRoot.displayName = "MaterialTailwind.PopoverContent";
var PopoverContent = React19.forwardRef(PopoverContentRoot);
function PopoverArrowRoot({ as, className, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.popoverArrow ?? popoverArrowTheme;
  const innerRef = React19.useRef(null);
  const { placement, arrowRef, middlewareData } = React19.useContext(PopoverContext);
  const elementRef = useMergeRefs([arrowRef, innerRef, ref]);
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement ? placement.split("-")[0] : ""];
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime18.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      style: {
        position: "absolute",
        left: middlewareData?.arrow?.x,
        top: middlewareData?.arrow?.y,
        [staticSide]: `${-innerRef?.current?.clientHeight / 2 - 1}px`,
        ...props?.style
      },
      "data-placement": placement,
      className: styles
    }
  );
}
PopoverArrowRoot.displayName = "MaterialTailwind.PopoverArrow";
var PopoverArrow = React19.forwardRef(PopoverArrowRoot);
var Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow
});

// node_modules/@material-tailwind/react/dist/chunk-ADFSQ3F2.js
var React20 = __toESM(require_react(), 1);
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var ProgressContext = React20.createContext({
  value: 0,
  color: "primary"
});
function ProgressRootBase({ as, size: size4, color, value, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.progress ?? progressTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  const styles = twMerge(theme2.baseStyle, theme2.size[size4], className);
  const contextValue = React20.useMemo(() => ({ value, color }), [value, color]);
  return (0, import_jsx_runtime19.jsx)(ProgressContext.Provider, { value: contextValue, children: (0, import_jsx_runtime19.jsx)(Component, { ...props, ref, className: styles, children }) });
}
ProgressRootBase.displayName = "MaterialTailwind.Progress";
var ProgressRoot = React20.forwardRef(ProgressRootBase);
function ProgressBarRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const { color, value } = React20.useContext(ProgressContext);
  const theme2 = contextTheme.progressBar ?? progressBarTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2.color[color],
    className
  );
  return (0, import_jsx_runtime19.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      style: {
        width: `${value}%`,
        ...props?.style
      },
      children
    }
  );
}
ProgressBarRoot.displayName = "MaterialTailwind.ProgressBar";
var ProgressBar = React20.forwardRef(ProgressBarRoot);
var Progress = Object.assign(ProgressRoot, {
  Bar: ProgressBar
});

// node_modules/@material-tailwind/react/dist/chunk-UBL2QCU4.js
var React21 = __toESM(require_react(), 1);
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var RadioContext = React21.createContext({
  globalValue: "",
  color: "primary",
  setGlobalValue: () => {
  }
});
function RadioRootBase({
  as,
  value,
  defaultValue,
  onValueChange,
  color,
  orientation,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.radio ?? radioTheme;
  const defaultProps = theme2?.defaultProps;
  const [innerValue, setInnerValue] = React21.useState(defaultValue || "");
  value ??= innerValue;
  onValueChange ??= setInnerValue;
  color ??= defaultProps?.color ?? "primary";
  orientation ??= defaultProps?.orientation ?? "vertical";
  const styles = twMerge(theme2.baseStyle, className);
  const contextValue = React21.useMemo(
    () => ({
      color,
      globalValue: value,
      setGlobalValue: onValueChange
    }),
    [color, value, onValueChange]
  );
  return (0, import_jsx_runtime20.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-value": value,
      "data-orientation": orientation,
      children: (0, import_jsx_runtime20.jsx)(RadioContext.Provider, { value: contextValue, children })
    }
  );
}
RadioRootBase.displayName = "MaterialTailwind.Radio";
var RadioRoot = React21.forwardRef(RadioRootBase);
function RadioItemRoot({ disabled, className, children, value, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.radioItem ?? radioItemTheme;
  const { globalValue, setGlobalValue, color } = React21.useContext(RadioContext);
  const innerId = React21.useId();
  const innerValue = React21.useId();
  const mainValue = value || innerValue;
  const isChecked = globalValue === mainValue;
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  return (0, import_jsx_runtime20.jsxs)(
    "label",
    {
      ref,
      className: styles,
      "data-value": mainValue,
      "data-checked": isChecked,
      "aria-disabled": disabled,
      htmlFor: props?.id || innerId,
      children: [
        (0, import_jsx_runtime20.jsx)(
          "input",
          {
            ...props,
            id: props?.id || innerId,
            type: "radio",
            checked: isChecked,
            value: mainValue,
            onChange: (e) => {
              props?.onChange?.(e);
              setGlobalValue?.(mainValue);
            },
            style: { display: "none" }
          }
        ),
        children
      ]
    }
  );
}
RadioItemRoot.displayName = "MaterialTailwind.RadioItem";
var RadioItem = React21.forwardRef(RadioItemRoot);
function RadioIndicatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.radioIndicator ?? radioIndicatorTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime20.jsx)(Component, { ...props, className: styles, ref, children: children || (0, import_jsx_runtime20.jsx)(
    "svg",
    {
      width: "10px",
      height: "10px",
      viewBox: "0 0 22 22",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, import_jsx_runtime20.jsx)(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25Z",
          fill: "currentColor"
        }
      )
    }
  ) });
}
RadioIndicatorRoot.displayName = "MaterialTailwind.RadioIndicator";
var RadioIndicator = React21.forwardRef(RadioIndicatorRoot);
var Radio = Object.assign(RadioRoot, {
  Item: RadioItem,
  Indicator: RadioIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-RGPTN62M.js
var React22 = __toESM(require_react(), 1);
var import_material_ripple_effects4 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
function ButtonRoot({
  as,
  color,
  variant,
  size: size4,
  ripple,
  isPill,
  isFullWidth,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.button ?? buttonTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  ripple ??= defaultProps?.ripple ?? true;
  color ??= defaultProps?.color ?? "primary";
  variant ??= defaultProps?.variant ?? "solid";
  isPill ??= defaultProps?.isPill ?? false;
  isFullWidth ??= defaultProps?.isFullWidth ?? false;
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects4.default();
  const handleClick = (e) => {
    const onClick = props?.onClick;
    const isDarkRipple = variant === "ghost" || color === "secondary";
    if (ripple) {
      rippleEffect.create(e, isDarkRipple ? "dark" : "light");
    }
    return typeof onClick === "function" && onClick(e);
  };
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4],
    theme2["variant"][variant][color],
    className
  );
  return (0, import_jsx_runtime21.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      onClick: handleClick,
      "data-shape": isPill ? "pill" : "default",
      "data-width": isFullWidth ? "full" : "default",
      children
    }
  );
}
ButtonRoot.displayName = "MaterialTailwind.Button";
var Button = React22.forwardRef(ButtonRoot);

// node_modules/@material-tailwind/react/dist/chunk-IKBRS3ZQ.js
var React23 = __toESM(require_react(), 1);
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
function CardRootBase({ as, color, variant, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.card || cardTheme;
  const defaultProps = theme2.defaultProps;
  color ??= defaultProps?.color ?? "default";
  variant ??= defaultProps?.variant ?? "solid";
  const styles = twMerge(
    theme2.baseStyle,
    theme2.variant[variant][color],
    className
  );
  return (0, import_jsx_runtime22.jsx)(Component, { ...props, ref, className: styles, children });
}
CardRootBase.displayName = "MaterialTailwind.Card";
var CardRoot = React23.forwardRef(CardRootBase);
function CardHeaderRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.cardHeader || cardHeaderTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime22.jsx)(Component, { ...props, ref, className: styles, children });
}
CardHeaderRoot.displayName = "MaterialTailwind.CardHeader";
var CardHeader = React23.forwardRef(CardHeaderRoot);
function CardBodyRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.cardBody || cardBodyTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime22.jsx)(Component, { ...props, ref, className: styles, children });
}
CardBodyRoot.displayName = "MaterialTailwind.CardBody";
var CardBody = React23.forwardRef(CardBodyRoot);
function CardFooterRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.cardFooter || cardFooterTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime22.jsx)(Component, { ...props, ref, className: styles, children });
}
CardFooterRoot.displayName = "MaterialTailwind.CardFooter";
var CardFooter = React23.forwardRef(CardFooterRoot);
var Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
});

// node_modules/@material-tailwind/react/dist/chunk-RWVEEWUM.js
var React24 = __toESM(require_react(), 1);
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var CheckboxContext = React24.createContext({
  color: "primary",
  disabled: false,
  checked: false
});
function CheckboxRootBase({ color, disabled, className, children, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.checkbox ?? checkboxTheme;
  const defaultProps = theme2?.defaultProps;
  const innerId = React24.useId();
  const [checked, setChecked] = React24.useState(props?.checked || false);
  color ??= defaultProps?.color ?? "primary";
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  React24.useEffect(() => {
    if (props?.defaultChecked) {
      setChecked(props?.defaultChecked);
    }
  }, []);
  const contextValue = React24.useMemo(
    () => ({
      color,
      checked,
      disabled
    }),
    [color, checked, disabled]
  );
  return (0, import_jsx_runtime23.jsxs)(
    "label",
    {
      ref,
      className: styles,
      "data-checked": checked,
      "aria-disabled": disabled,
      htmlFor: props?.id || innerId,
      children: [
        (0, import_jsx_runtime23.jsx)(
          "input",
          {
            ...props,
            id: props?.id || innerId,
            type: "checkbox",
            checked: props?.defaultChecked ? void 0 : props?.checked || checked,
            onChange: (e) => {
              props?.onChange?.(e);
              setChecked((cur) => !cur);
            },
            style: { display: "none" }
          }
        ),
        (0, import_jsx_runtime23.jsx)(CheckboxContext.Provider, { value: contextValue, children })
      ]
    }
  );
}
CheckboxRootBase.displayName = "MaterialTailwind.Checkbox";
var CheckboxRoot = React24.forwardRef(CheckboxRootBase);
function CheckboxIndicatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const { checked } = React24.useContext(CheckboxContext);
  const theme2 = contextTheme?.checkboxIndicator ?? checkboxIndicatorTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime23.jsx)(Component, { ...props, "data-checked": checked, className: styles, ref, children: children || (0, import_jsx_runtime23.jsx)(
    "svg",
    {
      fill: "none",
      width: "18px",
      height: "18px",
      strokeWidth: "2",
      color: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, import_jsx_runtime23.jsx)(
        "path",
        {
          d: "M5 13L9 17L19 7",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  ) });
}
CheckboxIndicatorRoot.displayName = "MaterialTailwind.CheckboxIndicator";
var CheckboxIndicator = React24.forwardRef(CheckboxIndicatorRoot);
var Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-IIM6BP3Z.js
var React25 = __toESM(require_react(), 1);
var import_material_ripple_effects5 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var ChipContext = React25.createContext({
  size: "md",
  color: "primary",
  variant: "solid",
  open: true,
  setOpen: () => {
  }
});
function ChipRootBase({
  as,
  size: size4,
  color,
  variant,
  className,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children,
  isPill,
  ...props
}, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.chip ?? chipTheme;
  const defaultProps = theme2?.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React25.useState(true);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  size4 ??= defaultProps?.size ?? "md";
  color ??= defaultProps?.color ?? "primary";
  variant ??= defaultProps?.variant ?? "solid";
  isPill ??= defaultProps?.isPill ?? true;
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4],
    theme2["variant"][variant][color],
    className
  );
  const contextValue = React25.useMemo(
    () => ({
      size: size4,
      color,
      variant,
      open,
      setOpen
    }),
    [size4, color, variant, open, setOpen]
  );
  return open ? (0, import_jsx_runtime24.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": open,
      "data-shape": isPill ? "pill" : "default",
      className: styles,
      children: (0, import_jsx_runtime24.jsx)(ChipContext.Provider, { value: contextValue, children })
    }
  ) : null;
}
ChipRootBase.displayName = "MaterialTailwind.Chip";
var ChipRoot = React25.forwardRef(ChipRootBase);
function ChipLabelRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const { size: size4 } = React25.useContext(ChipContext);
  const theme2 = contextTheme?.chipLabel ?? chipLabelTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4 || "md"],
    className
  );
  return (0, import_jsx_runtime24.jsx)(Component, { ...props, ref, className: styles, children });
}
ChipLabelRoot.displayName = "MaterialTailwind.ChipLabel";
var ChipLabel = React25.forwardRef(ChipLabelRoot);
function ChipIconRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const { size: size4 } = React25.useContext(ChipContext);
  const theme2 = contextTheme?.chipIcon ?? chipIconTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4 || "md"],
    className
  );
  return (0, import_jsx_runtime24.jsx)(Component, { ...props, ref, className: styles, children });
}
ChipIconRoot.displayName = "MaterialTailwind.ChipIcon";
var ChipIcon = React25.forwardRef(ChipIconRoot);
function ChipDismissTriggerRoot({ as, ripple, className, children, ...props }, ref) {
  const Component = as ?? "button";
  const contextTheme = useTheme();
  const { size: size4, color, variant, setOpen } = React25.useContext(ChipContext);
  const theme2 = contextTheme?.chipDismissTrigger ?? chipDismissTriggerTheme;
  const defaultProps = theme2?.defaultProps;
  ripple ??= defaultProps?.ripple ?? true;
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects5.default();
  const handleClick = (event) => {
    setOpen?.(false);
    props.onClick?.(event);
    const isDarkRipple = variant === "ghost" || variant === "outline" || color === "secondary" || color === "warning";
    if (ripple) {
      rippleEffect.create(event, isDarkRipple ? "dark" : "light");
    }
  };
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4 || "md"],
    className
  );
  return (0, import_jsx_runtime24.jsx)(Component, { ...props, ref, className: styles, onClick: handleClick, children: children || (0, import_jsx_runtime24.jsx)(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      color: "currentColor",
      className: "h-full w-full",
      children: (0, import_jsx_runtime24.jsx)(
        "path",
        {
          d: "M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  ) });
}
ChipDismissTriggerRoot.displayName = "MaterialTailwind.ChipDismissTrigger";
var ChipDismissTrigger = React25.forwardRef(ChipDismissTriggerRoot);
var Chip = Object.assign(ChipRoot, {
  Icon: ChipIcon,
  Label: ChipLabel,
  DismissTrigger: ChipDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-IWGKJKRP.js
var React26 = __toESM(require_react(), 1);
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
function CollapseRoot({ as, open, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.collapse ?? collapseTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return open ? (0, import_jsx_runtime25.jsx)(Component, { ...props, ref, "data-open": open, className: styles, children }) : null;
}
CollapseRoot.displayName = "MaterialTailwind.Collapse";
var Collapse = React26.forwardRef(CollapseRoot);

// node_modules/@material-tailwind/react/dist/chunk-FLMXDNZI.js
var React27 = __toESM(require_react(), 1);
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var DialogContext = React27.createContext({
  open: false,
  setOpen: () => {
  }
});
function DialogRoot({
  size: size4,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children
}) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.dialog ?? dialogTheme;
  const defaultProps = theme2?.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React27.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  size4 ??= defaultProps?.size ?? "md";
  const data = useFloating2({
    open,
    onOpenChange: setOpen
  });
  const { context } = data;
  const click = useClick(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);
  const contextValue = React27.useMemo(
    () => ({
      open,
      setOpen,
      size: size4,
      ...interactions,
      ...data
    }),
    [open, setOpen, size4, interactions, data]
  );
  return (0, import_jsx_runtime26.jsx)(DialogContext.Provider, { value: contextValue, children });
}
DialogRoot.displayName = "MaterialTailwind.Dialog";
function DialogTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.dialogTrigger ?? dialogTriggerTheme;
  const { refs, getReferenceProps, open } = React27.useContext(DialogContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setReference, ref]);
  return (0, import_jsx_runtime26.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      className: styles,
      ...getReferenceProps && getReferenceProps(),
      children
    }
  );
}
DialogTriggerRoot.displayName = "MaterialTailwind.DialogTrigger";
var DialogTrigger = React27.forwardRef(DialogTriggerRoot);
function DialogOverlayRoot({ className, lockScroll, children, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.dialogOverlay ?? dialogOverlayTheme;
  const defaultProps = theme2?.defaultProps;
  const { open } = React27.useContext(DialogContext);
  lockScroll ??= defaultProps?.lockScroll ?? true;
  const styles = twMerge(theme2.baseStyle, className);
  return open ? (0, import_jsx_runtime26.jsx)(FloatingPortal, { children: (0, import_jsx_runtime26.jsx)(
    FloatingOverlay,
    {
      ...props,
      ref,
      "data-open": open,
      className: styles,
      lockScroll,
      children
    }
  ) }) : null;
}
DialogOverlayRoot.displayName = "MaterialTailwind.DialogOverlay";
var DialogOverlay = React27.forwardRef(DialogOverlayRoot);
function DialogContentRoot({
  as,
  className,
  children,
  disabled,
  initialFocus,
  returnFocus,
  guards,
  modal,
  visuallyHiddenDismiss,
  closeOnFocusOut,
  order,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.dialogContent ?? dialogContentTheme;
  const defaultProps = theme2.defaultProps;
  const { context, refs, getFloatingProps, open, size: size4 } = React27.useContext(DialogContext);
  disabled ??= defaultProps?.disabled ?? false;
  initialFocus ??= defaultProps?.initialFocus ?? 0;
  returnFocus ??= defaultProps?.returnFocus ?? true;
  guards ??= defaultProps?.guards ?? true;
  modal ??= defaultProps?.modal ?? false;
  visuallyHiddenDismiss ??= defaultProps?.visuallyHiddenDismiss ?? true;
  closeOnFocusOut ??= defaultProps?.closeOnFocusOut ?? true;
  order ??= defaultProps?.order ?? ["content"];
  const styles = twMerge(theme2.baseStyle, theme2.size[size4], className);
  const elementRef = useMergeRefs([refs?.setFloating, ref]);
  return open ? (0, import_jsx_runtime26.jsx)(
    FloatingFocusManager,
    {
      order,
      modal,
      guards,
      disabled,
      returnFocus,
      initialFocus,
      closeOnFocusOut,
      visuallyHiddenDismiss,
      context,
      children: (0, import_jsx_runtime26.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": open,
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children
        }
      )
    }
  ) : null;
}
DialogContentRoot.displayName = "MaterialTailwind.DialogContent";
var DialogContent = React27.forwardRef(DialogContentRoot);
function DialogDismissTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.dialogDismissTrigger ?? dialogDismissTriggerTheme;
  const { open, setOpen } = React27.useContext(DialogContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime26.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": open,
      className: styles,
      onClick: (event) => {
        props.onClick?.(event);
        if (setOpen) {
          setOpen(false);
        }
      },
      children
    }
  );
}
DialogDismissTriggerRoot.displayName = "MaterialTailwind.DialogDismissTrigger";
var DialogDismissTrigger = React27.forwardRef(
  DialogDismissTriggerRoot
);
var Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  DismissTrigger: DialogDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-3MLHBTLS.js
var React28 = __toESM(require_react(), 1);
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
var DrawerContext = React28.createContext(
  {}
);
function DrawerRoot({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React28.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const data = useFloating2({
    open,
    onOpenChange: setOpen
  });
  const { context } = data;
  const click = useClick(context, {
    enabled: controlledOpen == null
  });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);
  const interactions = useInteractions([click, dismiss, role]);
  const contextValue = React28.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data
    }),
    [open, setOpen, interactions, data]
  );
  return (0, import_jsx_runtime27.jsx)(DrawerContext.Provider, { value: contextValue, children });
}
DrawerRoot.displayName = "MaterialTailwind.Drawer";
function DrawerTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.drawerTrigger ?? drawerTriggerTheme;
  const { refs, getReferenceProps, open } = React28.useContext(DrawerContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setReference, ref]);
  return (0, import_jsx_runtime27.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      className: styles,
      ...getReferenceProps && getReferenceProps(),
      children
    }
  );
}
DrawerTriggerRoot.displayName = "MaterialTailwind.DrawerTrigger";
var DrawerTrigger = React28.forwardRef(DrawerTriggerRoot);
function DrawerOverlayRoot({ className, lockScroll, children, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme?.drawerOverlay ?? drawerOverlayTheme;
  const defaultProps = theme2?.defaultProps;
  const { open } = React28.useContext(DrawerContext);
  lockScroll ??= defaultProps?.lockScroll ?? true;
  const styles = twMerge(theme2.baseStyle, className);
  return open ? (0, import_jsx_runtime27.jsx)(FloatingPortal, { children: (0, import_jsx_runtime27.jsx)(
    FloatingOverlay,
    {
      ...props,
      ref,
      "data-open": open,
      className: styles,
      lockScroll,
      children
    }
  ) }) : null;
}
DrawerOverlayRoot.displayName = "MaterialTailwind.DrawerOverlay";
var DrawerOverlay = React28.forwardRef(DrawerOverlayRoot);
function DrawerPanelRoot({
  as,
  className,
  children,
  placement,
  disabled,
  initialFocus,
  returnFocus,
  guards,
  modal,
  visuallyHiddenDismiss,
  closeOnFocusOut,
  order,
  ...props
}, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.drawerPanel ?? drawerPanelTheme;
  const defaultProps = theme2.defaultProps;
  const { context, refs, getFloatingProps, open } = React28.useContext(DrawerContext);
  placement ??= defaultProps?.placement ?? "right";
  disabled ??= defaultProps?.disabled ?? false;
  initialFocus ??= defaultProps?.initialFocus ?? 0;
  returnFocus ??= defaultProps?.returnFocus ?? true;
  guards ??= defaultProps?.guards ?? true;
  modal ??= defaultProps?.modal ?? false;
  visuallyHiddenDismiss ??= defaultProps?.visuallyHiddenDismiss ?? true;
  closeOnFocusOut ??= defaultProps?.closeOnFocusOut ?? true;
  order ??= defaultProps?.order ?? ["content"];
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs?.setFloating, ref]);
  return open ? (0, import_jsx_runtime27.jsx)(
    FloatingFocusManager,
    {
      order,
      modal,
      guards,
      disabled,
      returnFocus,
      initialFocus,
      closeOnFocusOut,
      visuallyHiddenDismiss,
      context,
      children: (0, import_jsx_runtime27.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          className: styles,
          "data-open": open,
          "data-placement": placement,
          ...getFloatingProps && getFloatingProps(),
          children
        }
      )
    }
  ) : null;
}
DrawerPanelRoot.displayName = "MaterialTailwind.DrawerPanel";
var DrawerPanel = React28.forwardRef(DrawerPanelRoot);
function DrawerDismissTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.drawerDismissTrigger ?? drawerDismissTriggerTheme;
  const { open, setOpen } = React28.useContext(DrawerContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime27.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": open,
      className: styles,
      onClick: (event) => {
        props.onClick?.(event);
        if (setOpen) {
          setOpen(false);
        }
      },
      children
    }
  );
}
DrawerDismissTriggerRoot.displayName = "MaterialTailwind.DrawerDismissTrigger";
var DrawerDismissTrigger = React28.forwardRef(
  DrawerDismissTriggerRoot
);
var Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Overlay: DrawerOverlay,
  Panel: DrawerPanel,
  DismissTrigger: DrawerDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-ERVJILQN.js
var React29 = __toESM(require_react(), 1);
var import_material_ripple_effects6 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
function IconButtonRoot({
  as,
  color,
  variant,
  size: size4,
  ripple,
  isCircular,
  className,
  children,
  ...props
}, ref) {
  const Component = as ?? "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.iconButton ?? iconButtonTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  ripple ??= defaultProps?.ripple ?? true;
  color ??= defaultProps?.color ?? "primary";
  variant ??= defaultProps?.variant ?? "solid";
  isCircular ??= defaultProps?.isCircular ?? false;
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects6.default();
  const handleClick = (e) => {
    const onClick = props?.onClick;
    const isDarkRipple = variant === "ghost" || color === "secondary";
    if (ripple) {
      rippleEffect.create(e, isDarkRipple ? "dark" : "light");
    }
    return typeof onClick === "function" && onClick(e);
  };
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size4],
    theme2["variant"][variant][color],
    className
  );
  return (0, import_jsx_runtime28.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      onClick: handleClick,
      "data-shape": isCircular ? "circular" : "default",
      children
    }
  );
}
IconButtonRoot.displayName = "MaterialTailwind.IconButton";
var IconButton = React29.forwardRef(IconButtonRoot);

// node_modules/@material-tailwind/react/dist/chunk-YK3RJFJS.js
var React30 = __toESM(require_react(), 1);
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
var AccordionContext = React30.createContext({
  type: "single",
  activeItem: "",
  setActiveItem: () => {
  }
});
function AccordionRoot({
  type,
  value,
  defaultValue,
  onValueChange,
  children
}) {
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordion || accordionTheme;
  const defaultProps = theme2?.defaultProps;
  type ??= defaultProps?.type ?? "single";
  const accordionValue = value || defaultValue;
  const [uncontrolledActiveItem, setUncontrolledActiveItem] = React30.useState("");
  const activeItem = value || uncontrolledActiveItem;
  const setActiveItem = onValueChange || setUncontrolledActiveItem;
  React30.useEffect(() => {
    setActiveItem(accordionValue);
  }, [accordionValue]);
  const contextValue = React30.useMemo(
    () => ({
      type,
      activeItem,
      setActiveItem
    }),
    [type, activeItem, setActiveItem]
  );
  return (0, import_jsx_runtime29.jsx)(AccordionContext.Provider, { value: contextValue, children });
}
AccordionRoot.displayName = "MaterialTailwind.Accordion";
var AccordionItemContext = React30.createContext("");
function AccordionItemRoot({ as, value, disabled, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordionItem || accordionItemTheme;
  const defaultProps = theme2?.defaultProps;
  const { type, activeItem } = React30.useContext(AccordionContext);
  disabled ??= defaultProps?.disabled ?? false;
  const isMultiple = type === "multiple";
  const isOpen = isMultiple ? activeItem?.includes(value) : activeItem === value;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime29.jsx)(AccordionItemContext.Provider, { value, children: (0, import_jsx_runtime29.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": isOpen,
      className: styles,
      "aria-disabled": disabled,
      children
    }
  ) });
}
AccordionItemRoot.displayName = "MaterialTailwind.AccordionItem";
var AccordionItem = React30.forwardRef(AccordionItemRoot);
function AccordionTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordionTrigger || accordionTriggerTheme;
  const value = React30.useContext(AccordionItemContext);
  const { type, activeItem, setActiveItem } = React30.useContext(AccordionContext);
  const isMultiple = type === "multiple";
  const isOpen = isMultiple ? activeItem?.includes(value) : activeItem === value;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime29.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": isOpen,
      className: styles,
      onClick: (event) => {
        if (isMultiple) {
          if (activeItem?.includes(value)) {
            setActiveItem?.(
              (prev) => prev.filter((item) => item !== value)
            );
          } else {
            setActiveItem?.((prev) => [...prev, value]);
          }
        } else {
          setActiveItem?.((prev) => prev === value ? "" : value);
        }
        props.onClick?.(event);
      },
      children
    }
  );
}
AccordionTriggerRoot.displayName = "MaterialTailwind.AccordionTrigger";
var AccordionTrigger = React30.forwardRef(AccordionTriggerRoot);
function AccordionContentRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordionContent || accordionContentTheme;
  const value = React30.useContext(AccordionItemContext);
  const { type, activeItem } = React30.useContext(AccordionContext);
  const isMultiple = type === "multiple";
  const isOpen = isMultiple ? activeItem?.includes(value) : activeItem === value;
  const styles = twMerge(theme2.baseStyle, className);
  return isOpen ? (0, import_jsx_runtime29.jsx)(Component, { ...props, ref, className: styles, "data-open": isOpen, children }) : null;
}
AccordionContentRoot.displayName = "MaterialTailwind.AccordionContent";
var AccordionContent = React30.forwardRef(AccordionContentRoot);
var Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
});

// node_modules/@material-tailwind/react/dist/chunk-BZAXDA4P.js
var React31 = __toESM(require_react(), 1);
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
var AlertContext = React31.createContext({
  color: "primary",
  variant: "solid",
  isPill: false,
  open: true,
  setOpen: () => {
  }
});
function AlertRootBase({
  as,
  color,
  variant,
  isPill,
  className,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children,
  ...props
}, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.alert ?? alertTheme;
  const defaultProps = theme2?.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React31.useState(true);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  color ??= defaultProps?.color ?? "primary";
  variant ??= defaultProps?.variant ?? "solid";
  isPill ??= defaultProps?.isPill ?? false;
  const styles = twMerge(
    theme2.baseStyle,
    theme2["variant"][variant][color],
    className
  );
  const contextValue = React31.useMemo(
    () => ({
      color,
      variant,
      isPill,
      open,
      setOpen
    }),
    [color, variant, isPill, open, setOpen]
  );
  return open ? (0, import_jsx_runtime30.jsx)(
    Component,
    {
      ...props,
      ref,
      role: "alert",
      "data-open": open,
      "data-pill": isPill,
      className: styles,
      children: (0, import_jsx_runtime30.jsx)(AlertContext.Provider, { value: contextValue, children })
    }
  ) : null;
}
AlertRootBase.displayName = "MaterialTailwind.Alert";
var AlertRoot = React31.forwardRef(AlertRootBase);
function AlertContentRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.alertContent ?? alertContentTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime30.jsx)(Component, { ...props, ref, className: styles, children });
}
AlertContentRoot.displayName = "MaterialTailwind.AlertContent";
var AlertContent = React31.forwardRef(AlertContentRoot);
function AlertIconRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.alertIcon ?? alertIconTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime30.jsx)(Component, { ...props, ref, className: styles, children });
}
AlertIconRoot.displayName = "MaterialTailwind.AlertIcon";
var AlertIcon = React31.forwardRef(AlertIconRoot);
function AlertDismissTriggerRoot({ as, ripple, className, children, ...props }, ref) {
  const Component = as ?? "button";
  const contextTheme = useTheme();
  const { setOpen } = React31.useContext(AlertContext);
  const theme2 = contextTheme?.alertDismissTrigger ?? alertDismissTriggerTheme;
  const styles = children ? className : twMerge(theme2.baseStyle, className);
  function closeAlert(event) {
    setOpen?.(false);
    props.onClick?.(event);
  }
  return (0, import_jsx_runtime30.jsx)(Component, { ...props, ref, className: styles, onClick: closeAlert, children: children || (0, import_jsx_runtime30.jsx)(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      color: "currentColor",
      className: "m-1 h-5 w-5 stroke-2",
      children: (0, import_jsx_runtime30.jsx)(
        "path",
        {
          d: "M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  ) });
}
AlertDismissTriggerRoot.displayName = "MaterialTailwind.AlertDismissTrigger";
var AlertDismissTrigger = React31.forwardRef(
  AlertDismissTriggerRoot
);
var Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Content: AlertContent,
  DismissTrigger: AlertDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-2B5ROVH4.js
var React32 = __toESM(require_react(), 1);
var import_jsx_runtime31 = __toESM(require_jsx_runtime(), 1);
function AvatarRoot({ as, src, alt, shape, size: size4, className, ...props }, ref) {
  const Component = as ?? "img";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.avatar ?? avatarTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  shape ??= defaultProps?.shape ?? "circular";
  const styles = twMerge(theme2.baseStyle, theme2["size"][size4], className);
  return (0, import_jsx_runtime31.jsx)(
    Component,
    {
      ...props,
      ref,
      src,
      alt,
      className: styles,
      "data-shape": shape
    }
  );
}
AvatarRoot.displayName = "MaterialTailwind.Avatar";
var Avatar = React32.forwardRef(AvatarRoot);

// node_modules/@material-tailwind/react/dist/chunk-G5X27O3A.js
var React33 = __toESM(require_react(), 1);
var import_jsx_runtime32 = __toESM(require_jsx_runtime(), 1);
var BadgeContext = React33.createContext({
  color: "primary",
  overlap: "square",
  placement: "top-end"
});
function BadgeRootBase({ as, color, overlap, placement, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.badge ?? badgeTheme;
  const defaultProps = theme2?.defaultProps;
  color ??= defaultProps?.color ?? "primary";
  overlap ??= defaultProps?.overlap ?? "square";
  placement ??= defaultProps?.placement ?? "top-end";
  const styles = twMerge(theme2.baseStyle, className);
  const contextValue = React33.useMemo(
    () => ({
      color,
      overlap,
      placement
    }),
    [color, overlap, placement]
  );
  return (0, import_jsx_runtime32.jsx)(Component, { ...props, ref, className: styles, children: (0, import_jsx_runtime32.jsx)(BadgeContext.Provider, { value: contextValue, children }) });
}
BadgeRootBase.displayName = "MaterialTailwind.Badge";
var BadgeRoot = React33.forwardRef(BadgeRootBase);
function BadgeContentRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.badgeContent ?? badgeContentTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime32.jsx)(Component, { ...props, ref, className: styles, children });
}
BadgeContentRoot.displayName = "MaterialTailwind.BadgeContent";
var BadgeContent = React33.forwardRef(BadgeContentRoot);
function BadgeIndicatorRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const { overlap, placement, color } = React33.useContext(BadgeContext);
  const theme2 = contextTheme?.badgeIndicator ?? badgeIndicatorTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2.color[color || "primary"],
    className
  );
  return (0, import_jsx_runtime32.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-overlap": overlap,
      "data-placement": placement,
      children
    }
  );
}
BadgeIndicatorRoot.displayName = "MaterialTailwind.BadgeIndicator";
var BadgeIndicator = React33.forwardRef(BadgeIndicatorRoot);
var Badge = Object.assign(BadgeRoot, {
  Content: BadgeContent,
  Indicator: BadgeIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-7NW3TT2S.js
var React34 = __toESM(require_react(), 1);
var import_jsx_runtime33 = __toESM(require_jsx_runtime(), 1);
function BreadcrumbRootBase({ as, className, children, ...props }, ref) {
  const Component = as || "nav";
  const contextTheme = useTheme();
  const theme2 = contextTheme.breadcrumb || breadcrumbTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime33.jsx)(Component, { ...props, ref, className: styles, children });
}
BreadcrumbRootBase.displayName = "MaterialTailwind.Breadcrumb";
var BreadcrumbRoot = React34.forwardRef(BreadcrumbRootBase);
function BreadcrumbLinkRoot({ as, className, children, ...props }, ref) {
  const Component = as || "a";
  const contextTheme = useTheme();
  const theme2 = contextTheme.breadcrumbLink || breadcrumbLinkTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime33.jsx)(Component, { ...props, ref, className: styles, children });
}
BreadcrumbLinkRoot.displayName = "MaterialTailwind.BreadcrumbLink";
var BreadcrumbLink = React34.forwardRef(BreadcrumbLinkRoot);
function BreadcrumbSeparatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme.breadcrumbSeparator || breadcrumbSeparatorTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime33.jsx)(Component, { ...props, ref, className: styles, children: children || "/" });
}
BreadcrumbSeparatorRoot.displayName = "MaterialTailwind.BreadcrumbSeparator";
var BreadcrumbSeparator = React34.forwardRef(
  BreadcrumbSeparatorRoot
);
var Breadcrumb = Object.assign(BreadcrumbRoot, {
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator
});

// node_modules/@material-tailwind/react/dist/chunk-UIGTWEVF.js
var React35 = __toESM(require_react(), 1);
var import_jsx_runtime34 = __toESM(require_jsx_runtime(), 1);
function ButtonGroupRoot({
  as,
  color,
  variant,
  size: size4,
  ripple,
  isPill,
  isFullWidth,
  className,
  orientation,
  children,
  ...props
}, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme?.buttonGroup ?? buttonGroupTheme;
  const defaultProps = theme2?.defaultProps;
  size4 ??= defaultProps?.size ?? "md";
  ripple ??= defaultProps?.ripple ?? true;
  color ??= defaultProps?.color ?? "primary";
  variant ??= defaultProps?.variant ?? "solid";
  orientation ??= defaultProps?.orientation ?? "horizontal";
  isFullWidth ??= defaultProps?.isFullWidth ?? false;
  isPill ??= defaultProps?.isPill ?? false;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime34.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-variant": variant,
      "data-orientation": orientation,
      "data-shape": isPill ? "pill" : "default",
      "data-width": isFullWidth ? "full" : "default",
      children: React35.Children.map(
        children,
        (child) => React35.isValidElement(child) && React35.cloneElement(child, {
          variant,
          size: size4,
          color,
          ripple,
          isPill,
          isFullWidth,
          "data-variant": variant,
          "data-orientation": orientation,
          ...child.props
        })
      )
    }
  );
}
ButtonGroupRoot.displayName = "MaterialTailwind.ButtonGroup";
var ButtonGroup = React35.forwardRef(ButtonGroupRoot);
export {
  Accordion,
  AccordionContent,
  AccordionContext,
  AccordionItem,
  AccordionItemContext,
  AccordionRoot,
  AccordionTrigger,
  Alert,
  AlertContent,
  AlertContext,
  AlertDismissTrigger,
  AlertIcon,
  Avatar,
  Badge,
  BadgeContent,
  BadgeContext,
  BadgeIndicator,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  Checkbox,
  CheckboxContext,
  CheckboxIndicator,
  CheckboxRoot,
  Chip,
  ChipContext,
  ChipDismissTrigger,
  ChipIcon,
  ChipLabel,
  ChipRoot,
  Collapse,
  Dialog,
  DialogContent,
  DialogDismissTrigger,
  DialogOverlay,
  DialogRoot,
  DialogTrigger,
  Drawer,
  DrawerDismissTrigger,
  DrawerOverlay,
  DrawerPanel,
  DrawerRoot,
  DrawerTrigger,
  IconButton,
  Input,
  InputContext,
  InputIcon,
  InputRoot,
  List,
  ListItem,
  ListItemEnd,
  ListItemStart,
  ListRoot,
  MaterialTailwindThemeContext,
  Menu,
  MenuContent,
  MenuContext,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Navbar,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverContext,
  PopoverRoot,
  PopoverTrigger,
  Progress,
  ProgressBar,
  ProgressContext,
  ProgressRoot,
  Radio,
  RadioContext,
  RadioIndicator,
  RadioItem,
  RadioRoot,
  Rating,
  Select,
  SelectContext,
  SelectList,
  SelectOption,
  SelectTrigger,
  Slider,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTick,
  Spinner,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTrigger,
  TabsTriggerIndicator,
  Textarea,
  ThemeProvider,
  Timeline,
  TimelineBody,
  TimelineContext,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineRoot,
  TimelineSeparator,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipContext,
  TooltipRoot,
  TooltipTrigger,
  Typography,
  accordionContentTheme,
  accordionItemTheme,
  accordionTheme,
  accordionTriggerTheme,
  alertContentTheme,
  alertDismissTriggerTheme,
  alertIconTheme,
  alertTheme,
  avatarTheme,
  badgeContentTheme,
  badgeIndicatorTheme,
  badgeTheme,
  breadcrumbLinkTheme,
  breadcrumbSeparatorTheme,
  breadcrumbTheme,
  buttonGroupTheme,
  buttonTheme,
  cardBodyTheme,
  cardFooterTheme,
  cardHeaderTheme,
  cardTheme,
  checkboxIndicatorTheme,
  checkboxTheme,
  chipDismissTriggerTheme,
  chipIconTheme,
  chipLabelTheme,
  chipTheme,
  collapseTheme,
  dialogContentTheme,
  dialogDismissTriggerTheme,
  dialogOverlayTheme,
  dialogTheme,
  dialogTriggerTheme,
  drawerDismissTriggerTheme,
  drawerOverlayTheme,
  drawerPanelTheme,
  drawerTriggerTheme,
  iconButtonTheme,
  inputIconTheme,
  inputTheme,
  listItemEndTheme,
  listItemStartTheme,
  listItemTheme,
  listTheme,
  menuContentTheme,
  menuItemTheme,
  menuTheme,
  menuTriggerTheme,
  mergeTheme,
  mtConfig,
  navbarTheme,
  parseObject,
  popoverArrowTheme,
  popoverContentTheme,
  popoverTheme,
  popoverTriggerTheme,
  progressBarTheme,
  progressTheme,
  radioIndicatorTheme,
  radioItemTheme,
  radioTheme,
  ratingTheme,
  selectListTheme,
  selectOptionTheme,
  selectTheme,
  selectTriggerTheme,
  sliderRangeTheme,
  sliderTheme,
  sliderThumbTheme,
  sliderTickTheme,
  spinnerTheme,
  switchTheme,
  tabsListTheme,
  tabsPanelTheme,
  tabsTheme,
  tabsTriggerIndicatorTheme,
  tabsTriggerTheme,
  textareaTheme,
  theme,
  timelineBodyTheme,
  timelineHeaderTheme,
  timelineIconTheme,
  timelineItemTheme,
  timelineSeparatorTheme,
  timelineTheme,
  tooltipArrowTheme,
  tooltipContentTheme,
  tooltipTheme,
  tooltipTriggerTheme,
  typographyTheme,
  useTheme
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

@tanstack/ranger/build/esm/index.js:
  (**
   * ranger
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@tanstack/react-ranger/build/esm/index.js:
  (**
   * react-ranger
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=@material-tailwind_react.js.map
