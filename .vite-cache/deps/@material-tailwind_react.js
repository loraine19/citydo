"use client";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  MaterialTailwindThemeContext,
  Tabs,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTrigger,
  TabsTriggerIndicator,
  ThemeProvider,
  __commonJS as __commonJS2,
  __toESM as __toESM2,
  accordionContentTheme,
  accordionItemTheme,
  accordionTheme,
  accordionTriggerTheme,
  alertContentTheme,
  alertDismissTriggerTheme,
  alertIconTheme,
  alertTheme,
  arrow,
  autoUpdate,
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
  flip,
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
  navbarTheme,
  offset,
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
  safePolygon,
  selectListTheme,
  selectOptionTheme,
  selectTheme,
  selectTriggerTheme,
  shift,
  size,
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
  twMerge,
  typographyTheme,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useFocus,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTheme,
  useTypeahead
} from "./chunk-IM3M4CAX.js";
import "./chunk-6JBW5ATH.js";
import {
  require_jsx_runtime
} from "./chunk-P5EAQRRD.js";
import {
  require_react
} from "./chunk-VPEBV5N7.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-SNAQBZPT.js";

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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob;
      addBase({
        ":root": {
          /* border radius */
          "--radius": (options == null ? void 0 : options.radius) || "1.5rem",
          /* fonts */
          "--font-sans": ((_a = options == null ? void 0 : options.fonts) == null ? void 0 : _a.sans) || "Inter",
          "--font-serif": ((_b = options == null ? void 0 : options.fonts) == null ? void 0 : _b.serif) || "",
          "--font-mono": ((_c = options == null ? void 0 : options.fonts) == null ? void 0 : _c.mono) || "Fira Code",
          /* base colors */
          "--color-background": getRgbChannels(
            ((_d = options == null ? void 0 : options.colors) == null ? void 0 : _d.background) || "#ffffff"
          ),
          "--color-foreground": getRgbChannels(
            ((_e = options == null ? void 0 : options.colors) == null ? void 0 : _e.foreground) || "#475569"
          ),
          "--color-black": getRgbChannels(((_f = options == null ? void 0 : options.colors) == null ? void 0 : _f.black) || "#020617"),
          "--color-white": getRgbChannels(((_g = options == null ? void 0 : options.colors) == null ? void 0 : _g.white) || "#ffffff"),
          /* surface color */
          "--color-surface": getRgbChannels(
            ((_i = (_h = options == null ? void 0 : options.colors) == null ? void 0 : _h.surface) == null ? void 0 : _i.default) || "#e2e8f0"
          ),
          "--color-surface-dark": getRgbChannels(
            ((_k = (_j = options == null ? void 0 : options.colors) == null ? void 0 : _j.surface) == null ? void 0 : _k.dark) || "#cbd5e1"
          ),
          "--color-surface-light": getRgbChannels(
            ((_m = (_l = options == null ? void 0 : options.colors) == null ? void 0 : _l.surface) == null ? void 0 : _m.light) || "#f1f5f9"
          ),
          "--color-surface-foreground": getRgbChannels(
            ((_o = (_n = options == null ? void 0 : options.colors) == null ? void 0 : _n.surface) == null ? void 0 : _o.foreground) || "#020617"
          ),
          /* primary color */
          "--color-primary": getRgbChannels(
            ((_q = (_p = options == null ? void 0 : options.colors) == null ? void 0 : _p.primary) == null ? void 0 : _q.default) || "#1e293b"
          ),
          "--color-primary-dark": getRgbChannels(
            ((_s = (_r = options == null ? void 0 : options.colors) == null ? void 0 : _r.primary) == null ? void 0 : _s.dark) || "#0f172a"
          ),
          "--color-primary-light": getRgbChannels(
            ((_u = (_t = options == null ? void 0 : options.colors) == null ? void 0 : _t.primary) == null ? void 0 : _u.light) || "#334155"
          ),
          "--color-primary-foreground": getRgbChannels(
            ((_w = (_v = options == null ? void 0 : options.colors) == null ? void 0 : _v.primary) == null ? void 0 : _w.foreground) || "#f8fafc"
          ),
          /* secondary color */
          "--color-secondary": getRgbChannels(
            ((_y = (_x = options == null ? void 0 : options.colors) == null ? void 0 : _x.secondary) == null ? void 0 : _y.default) || "#e2e8f0"
          ),
          "--color-secondary-dark": getRgbChannels(
            ((_A = (_z = options == null ? void 0 : options.colors) == null ? void 0 : _z.secondary) == null ? void 0 : _A.dark) || "#cbd5e1"
          ),
          "--color-secondary-light": getRgbChannels(
            ((_C = (_B = options == null ? void 0 : options.colors) == null ? void 0 : _B.secondary) == null ? void 0 : _C.light) || "#f1f5f9"
          ),
          "--color-secondary-foreground": getRgbChannels(
            ((_E = (_D = options == null ? void 0 : options.colors) == null ? void 0 : _D.secondary) == null ? void 0 : _E.foreground) || "#020617"
          ),
          /* info color */
          "--color-info": getRgbChannels(
            ((_G = (_F = options == null ? void 0 : options.colors) == null ? void 0 : _F.info) == null ? void 0 : _G.default) || "#0062ff"
          ),
          "--color-info-dark": getRgbChannels(
            ((_I = (_H = options == null ? void 0 : options.colors) == null ? void 0 : _H.info) == null ? void 0 : _I.dark) || "#0055dd"
          ),
          "--color-info-light": getRgbChannels(
            ((_K = (_J = options == null ? void 0 : options.colors) == null ? void 0 : _J.info) == null ? void 0 : _K.light) || "#007aff"
          ),
          "--color-info-foreground": getRgbChannels(
            ((_M = (_L = options == null ? void 0 : options.colors) == null ? void 0 : _L.info) == null ? void 0 : _M.foreground) || "#f8fafc"
          ),
          /* success color */
          "--color-success": getRgbChannels(
            ((_O = (_N = options == null ? void 0 : options.colors) == null ? void 0 : _N.success) == null ? void 0 : _O.default) || "#00bf6b"
          ),
          "--color-success-dark": getRgbChannels(
            ((_Q = (_P = options == null ? void 0 : options.colors) == null ? void 0 : _P.success) == null ? void 0 : _Q.dark) || "#00a35f"
          ),
          "--color-success-light": getRgbChannels(
            ((_S = (_R = options == null ? void 0 : options.colors) == null ? void 0 : _R.success) == null ? void 0 : _S.light) || "#02e585"
          ),
          "--color-success-foreground": getRgbChannels(
            ((_U = (_T = options == null ? void 0 : options.colors) == null ? void 0 : _T.success) == null ? void 0 : _U.foreground) || "#f8fafc"
          ),
          /* warning color */
          "--color-warning": getRgbChannels(
            ((_W = (_V = options == null ? void 0 : options.colors) == null ? void 0 : _V.warning) == null ? void 0 : _W.default) || "#fca327"
          ),
          "--color-warning-dark": getRgbChannels(
            ((_Y = (_X = options == null ? void 0 : options.colors) == null ? void 0 : _X.warning) == null ? void 0 : _Y.dark) || "#f67d0a"
          ),
          "--color-warning-light": getRgbChannels(
            ((__ = (_Z = options == null ? void 0 : options.colors) == null ? void 0 : _Z.warning) == null ? void 0 : __.light) || "#fdba4c"
          ),
          "--color-warning-foreground": getRgbChannels(
            ((_aa = (_$ = options == null ? void 0 : options.colors) == null ? void 0 : _$.warning) == null ? void 0 : _aa.foreground) || "#f8fafc"
          ),
          /* error color */
          "--color-error": getRgbChannels(
            ((_ca = (_ba = options == null ? void 0 : options.colors) == null ? void 0 : _ba.error) == null ? void 0 : _ca.default) || "#ef4444"
          ),
          "--color-error-dark": getRgbChannels(
            ((_ea = (_da = options == null ? void 0 : options.colors) == null ? void 0 : _da.error) == null ? void 0 : _ea.dark) || "#dc2626"
          ),
          "--color-error-light": getRgbChannels(
            ((_ga = (_fa = options == null ? void 0 : options.colors) == null ? void 0 : _fa.error) == null ? void 0 : _ga.light) || "#f87171"
          ),
          "--color-error-foreground": getRgbChannels(
            ((_ia = (_ha = options == null ? void 0 : options.colors) == null ? void 0 : _ha.error) == null ? void 0 : _ia.foreground) || "#f8fafc"
          )
        },
        ".dark": {
          /* base colors */
          "--color-background": getRgbChannels(
            ((_ja = options == null ? void 0 : options.darkColors) == null ? void 0 : _ja.background) || "#020617"
          ),
          "--color-foreground": getRgbChannels(
            ((_ka = options == null ? void 0 : options.darkColors) == null ? void 0 : _ka.foreground) || "#94a3b8"
          ),
          "--color-black": getRgbChannels(
            ((_la = options == null ? void 0 : options.darkColors) == null ? void 0 : _la.black) || "#020617"
          ),
          "--color-white": getRgbChannels(
            ((_ma = options == null ? void 0 : options.darkColors) == null ? void 0 : _ma.white) || "#ffffff"
          ),
          /* surface color */
          "--color-surface": getRgbChannels(
            ((_oa = (_na = options == null ? void 0 : options.darkColors) == null ? void 0 : _na.surface) == null ? void 0 : _oa.default) || "#1e293b"
          ),
          "--color-surface-dark": getRgbChannels(
            ((_qa = (_pa = options == null ? void 0 : options.darkColors) == null ? void 0 : _pa.surface) == null ? void 0 : _qa.dark) || "#0f172a"
          ),
          "--color-surface-light": getRgbChannels(
            ((_sa = (_ra = options == null ? void 0 : options.darkColors) == null ? void 0 : _ra.surface) == null ? void 0 : _sa.light) || "#334155"
          ),
          "--color-surface-foreground": getRgbChannels(
            ((_ua = (_ta = options == null ? void 0 : options.darkColors) == null ? void 0 : _ta.surface) == null ? void 0 : _ua.foreground) || "#f8fafc"
          ),
          /* primary color */
          "--color-primary": getRgbChannels(
            ((_wa = (_va = options == null ? void 0 : options.darkColors) == null ? void 0 : _va.primary) == null ? void 0 : _wa.default) || "#e2e8f0"
          ),
          "--color-primary-dark": getRgbChannels(
            ((_ya = (_xa = options == null ? void 0 : options.darkColors) == null ? void 0 : _xa.primary) == null ? void 0 : _ya.dark) || "#cbd5e1"
          ),
          "--color-primary-light": getRgbChannels(
            ((_Aa = (_za = options == null ? void 0 : options.darkColors) == null ? void 0 : _za.primary) == null ? void 0 : _Aa.light) || "#f1f5f9"
          ),
          "--color-primary-foreground": getRgbChannels(
            ((_Ca = (_Ba = options == null ? void 0 : options.darkColors) == null ? void 0 : _Ba.primary) == null ? void 0 : _Ca.foreground) || "#020617"
          ),
          /* secondary color */
          "--color-secondary": getRgbChannels(
            ((_Ea = (_Da = options == null ? void 0 : options.darkColors) == null ? void 0 : _Da.secondary) == null ? void 0 : _Ea.default) || "#1e293b"
          ),
          "--color-secondary-dark": getRgbChannels(
            ((_Ga = (_Fa = options == null ? void 0 : options.darkColors) == null ? void 0 : _Fa.secondary) == null ? void 0 : _Ga.dark) || "#0f172a"
          ),
          "--color-secondary-light": getRgbChannels(
            ((_Ia = (_Ha = options == null ? void 0 : options.darkColors) == null ? void 0 : _Ha.secondary) == null ? void 0 : _Ia.light) || "#334155"
          ),
          "--color-secondary-foreground": getRgbChannels(
            ((_Ka = (_Ja = options == null ? void 0 : options.darkColors) == null ? void 0 : _Ja.secondary) == null ? void 0 : _Ka.foreground) || "#f8fafc"
          ),
          /* info color */
          "--color-info": getRgbChannels(
            ((_Ma = (_La = options == null ? void 0 : options.darkColors) == null ? void 0 : _La.info) == null ? void 0 : _Ma.default) || "#0062ff"
          ),
          "--color-info-dark": getRgbChannels(
            ((_Oa = (_Na = options == null ? void 0 : options.darkColors) == null ? void 0 : _Na.info) == null ? void 0 : _Oa.dark) || "#0055dd"
          ),
          "--color-info-light": getRgbChannels(
            ((_Qa = (_Pa = options == null ? void 0 : options.darkColors) == null ? void 0 : _Pa.info) == null ? void 0 : _Qa.light) || "#007aff"
          ),
          "--color-info-foreground": getRgbChannels(
            ((_Sa = (_Ra = options == null ? void 0 : options.darkColors) == null ? void 0 : _Ra.info) == null ? void 0 : _Sa.foreground) || "#f8fafc"
          ),
          /* success color */
          "--color-success": getRgbChannels(
            ((_Ua = (_Ta = options == null ? void 0 : options.darkColors) == null ? void 0 : _Ta.success) == null ? void 0 : _Ua.default) || "#00bf6b"
          ),
          "--color-success-dark": getRgbChannels(
            ((_Wa = (_Va = options == null ? void 0 : options.darkColors) == null ? void 0 : _Va.success) == null ? void 0 : _Wa.dark) || "#00a35f"
          ),
          "--color-success-light": getRgbChannels(
            ((_Ya = (_Xa = options == null ? void 0 : options.darkColors) == null ? void 0 : _Xa.success) == null ? void 0 : _Ya.light) || "#02e585"
          ),
          "--color-success-foreground": getRgbChannels(
            ((__a = (_Za = options == null ? void 0 : options.darkColors) == null ? void 0 : _Za.success) == null ? void 0 : __a.foreground) || "#f8fafc"
          ),
          /* warning color */
          "--color-warning": getRgbChannels(
            ((_ab = (_$a = options == null ? void 0 : options.darkColors) == null ? void 0 : _$a.warning) == null ? void 0 : _ab.default) || "#fca327"
          ),
          "--color-warning-dark": getRgbChannels(
            ((_cb = (_bb = options == null ? void 0 : options.darkColors) == null ? void 0 : _bb.warning) == null ? void 0 : _cb.dark) || "#f67d0a"
          ),
          "--color-warning-light": getRgbChannels(
            ((_eb = (_db = options == null ? void 0 : options.darkColors) == null ? void 0 : _db.warning) == null ? void 0 : _eb.light) || "#fdba4c"
          ),
          "--color-warning-foreground": getRgbChannels(
            ((_gb = (_fb = options == null ? void 0 : options.darkColors) == null ? void 0 : _fb.warning) == null ? void 0 : _gb.foreground) || "#f8fafc"
          ),
          /* error color */
          "--color-error": getRgbChannels(
            ((_ib = (_hb = options == null ? void 0 : options.darkColors) == null ? void 0 : _hb.error) == null ? void 0 : _ib.default) || "#ef4444"
          ),
          "--color-error-dark": getRgbChannels(
            ((_kb = (_jb = options == null ? void 0 : options.darkColors) == null ? void 0 : _jb.error) == null ? void 0 : _kb.dark) || "#dc2626"
          ),
          "--color-error-light": getRgbChannels(
            ((_mb = (_lb = options == null ? void 0 : options.darkColors) == null ? void 0 : _lb.error) == null ? void 0 : _mb.light) || "#f87171"
          ),
          "--color-error-foreground": getRgbChannels(
            ((_ob = (_nb = options == null ? void 0 : options.darkColors) == null ? void 0 : _nb.error) == null ? void 0 : _ob.foreground) || "#f8fafc"
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

// node_modules/@material-tailwind/react/dist/chunk-G4TWRQ5Y.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var TooltipContext = React.createContext({
  open: false,
  setOpen: () => {
  }
});
function TooltipRoot({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement,
  offset: offset2,
  interactive,
  children
}) {
  const arrowRef = React.useRef(null);
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.tooltip) ?? tooltipTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  placement ?? (placement = (defaultProps == null ? void 0 : defaultProps.placement) ?? "top");
  offset2 ?? (offset2 = (defaultProps == null ? void 0 : defaultProps.offset) ?? 8);
  interactive ?? (interactive = (defaultProps == null ? void 0 : defaultProps.interactive) ?? false);
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offset2),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5
      }),
      shift({ padding: 5 }),
      arrow({
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
  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data
    }),
    [open, setOpen, arrowRef, interactions, data]
  );
  return (0, import_jsx_runtime.jsx)(TooltipContext.Provider, { value: contextValue, children });
}
TooltipRoot.displayName = "MaterialTailwind.Tooltip";
function TooltipTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.tooltipTrigger) ?? tooltipTriggerTheme;
  const { refs, getReferenceProps, open } = React.useContext(TooltipContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setReference, ref]);
  return (0, import_jsx_runtime.jsx)(
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
var TooltipTrigger = React.forwardRef(TooltipTriggerRoot);
function TooltipContentRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.tooltipContent) ?? tooltipContentTheme;
  const { refs, getFloatingProps, open, floatingStyles } = React.useContext(TooltipContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setFloating, ref]);
  return open ? (0, import_jsx_runtime.jsx)(FloatingPortal, { children: (0, import_jsx_runtime.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      style: { ...floatingStyles, ...props == null ? void 0 : props.style },
      className: styles,
      ...getFloatingProps && getFloatingProps(),
      children
    }
  ) }) : null;
}
TooltipContentRoot.displayName = "MaterialTailwind.TooltipContent";
var TooltipContent = React.forwardRef(TooltipContentRoot);
function TooltipArrowRoot({ as, className, ...props }, ref) {
  var _a, _b, _c;
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.tooltipArrow) ?? tooltipArrowTheme;
  const innerRef = React.useRef(null);
  const { placement, arrowRef, middlewareData } = React.useContext(TooltipContext);
  const elementRef = useMergeRefs([arrowRef, innerRef, ref]);
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement ? placement.split("-")[0] : ""];
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      style: {
        position: "absolute",
        left: (_a = middlewareData == null ? void 0 : middlewareData.arrow) == null ? void 0 : _a.x,
        top: (_b = middlewareData == null ? void 0 : middlewareData.arrow) == null ? void 0 : _b.y,
        [staticSide]: `${-((_c = innerRef == null ? void 0 : innerRef.current) == null ? void 0 : _c.clientHeight) / 2 - 1}px`,
        ...props == null ? void 0 : props.style
      },
      "data-placement": placement,
      className: styles
    }
  );
}
TooltipArrowRoot.displayName = "MaterialTailwind.TooltipArrow";
var TooltipArrow = React.forwardRef(TooltipArrowRoot);
var Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow
});

// node_modules/@material-tailwind/react/dist/chunk-HOAN5TY4.js
var React2 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
function TypographyRoot({ as, color, type, className, children, ...props }, ref) {
  const Component = as ? as : type === "lead" ? "p" : type || "p";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.typography) ?? typographyTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  if (headings.includes(type) && color === "inherit") {
    color = "default";
  } else {
    color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "inherit");
  }
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "inherit");
  type ?? (type = (defaultProps == null ? void 0 : defaultProps.type) ?? "p");
  const styles = twMerge(
    theme2.baseStyle,
    theme2["type"][type],
    theme2["color"][color],
    className
  );
  return (0, import_jsx_runtime2.jsx)(Component, { ...props, ref, className: styles, children });
}
TypographyRoot.displayName = "MaterialTailwind.Typography";
var Typography = React2.forwardRef(TypographyRoot);

// node_modules/@material-tailwind/react/dist/chunk-OKU4DFWG.js
var React3 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function RatingRoot({
  as,
  color,
  ratedIcon,
  unratedIcon,
  count,
  value,
  onValueChange,
  className,
  readonly,
  ...props
}, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.rating) ?? ratingTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  ratedIcon ?? (ratedIcon = (defaultProps == null ? void 0 : defaultProps.ratedIcon) ?? (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "h-6 w-6",
      children: (0, import_jsx_runtime3.jsx)(
        "path",
        {
          fillRule: "evenodd",
          d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
          clipRule: "evenodd"
        }
      )
    }
  ));
  unratedIcon ?? (unratedIcon = (defaultProps == null ? void 0 : defaultProps.unratedIcon) ?? (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "h-6 w-6",
      children: (0, import_jsx_runtime3.jsx)(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        }
      )
    }
  ));
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  count ?? (count = (defaultProps == null ? void 0 : defaultProps.count) ?? 5);
  value ?? (value = 0);
  readonly ?? (readonly = (defaultProps == null ? void 0 : defaultProps.readonly) ?? false);
  const [ratingValue, setRatingValue] = React3.useState(() => [
    ...Array(value).fill("rated"),
    ...Array(count - value).fill("un_rated")
  ]);
  const [ratingOnHover, setRatingOnHover] = React3.useState(() => [
    ...Array(count).fill("un_rated")
  ]);
  const [isHover, setIsHover] = React3.useState(false);
  const baseStyles = twMerge(theme2.baseStyle, theme2.color[color], className);
  const iconStyle = twMerge(theme2.icon);
  const renderRating = (data) => data.map((el, idx) => {
    var _a;
    const isRated = el === "rated";
    const elementToRender = isRated ? ratedIcon : unratedIcon;
    return React3.isValidElement(elementToRender) ? React3.cloneElement(elementToRender, {
      ...elementToRender == null ? void 0 : elementToRender.props,
      key: idx,
      onClick: (event) => {
        var _a2, _b;
        if (readonly)
          return;
        const nextRating = ratingValue.map(
          (_, i) => i <= idx ? "rated" : "un_rated"
        );
        setRatingValue(nextRating);
        onValueChange && typeof onValueChange === "function" && onValueChange(nextRating.filter((el2) => el2 === "rated").length);
        ((_a2 = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _a2.onClick) && ((_b = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _b.onClick(event));
      },
      onMouseEnter: (event) => {
        var _a2, _b;
        if (readonly)
          return;
        const nextRating = ratingOnHover.map(
          (_, i) => i <= idx ? "rated" : "un_rated"
        );
        setIsHover(true);
        setRatingOnHover(nextRating);
        ((_a2 = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _a2.onMouseEnter) && ((_b = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _b.onMouseEnter(event));
      },
      onMouseLeave: (event) => {
        var _a2, _b;
        if (!readonly) {
          setIsHover(false);
        }
        ((_a2 = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _a2.onMouseLeave) && ((_b = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _b.onMouseLeave(event));
      },
      "data-slot": "icon",
      className: twMerge(
        iconStyle,
        (_a = elementToRender == null ? void 0 : elementToRender.props) == null ? void 0 : _a.className
      )
    }) : React3.createElement(elementToRender, {
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
  return (0, import_jsx_runtime3.jsx)(Component, { ...props, ref, className: baseStyles, children: isHover ? renderRating(ratingOnHover) : renderRating(ratingValue) });
}
RatingRoot.displayName = "MaterialTailwind.Rating";
var Rating = React3.forwardRef(RatingRoot);

// node_modules/@material-tailwind/react/dist/chunk-NIMJP7RL.js
var React4 = __toESM(require_react(), 1);
var import_material_ripple_effects = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var SelectContext = React4.createContext({
  size: "md",
  color: "primary",
  isError: false,
  isSuccess: false,
  disabled: false,
  placement: "bottom",
  offset: 5
});
function SelectRootBase({
  size: size2,
  color,
  isPill,
  isError,
  isSuccess,
  disabled,
  placement,
  offset: offset2,
  value,
  name,
  onValueChange,
  children
}, ref) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.select) ?? selectTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [isOpen, setIsOpen] = React4.useState(false);
  const [selected, setSelected] = React4.useState(() => ({
    value,
    element: null
  }));
  const [activeIndex, setActiveIndex] = React4.useState(null);
  const [selectedIndex, setSelectedIndex] = React4.useState(null);
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  isPill ?? (isPill = (defaultProps == null ? void 0 : defaultProps.isPill) ?? false);
  isError ?? (isError = (defaultProps == null ? void 0 : defaultProps.isError) ?? false);
  isSuccess ?? (isSuccess = (defaultProps == null ? void 0 : defaultProps.isSuccess) ?? false);
  placement ?? (placement = (defaultProps == null ? void 0 : defaultProps.placement) ?? "bottom");
  offset2 ?? (offset2 = (defaultProps == null ? void 0 : defaultProps.offset) ?? 5);
  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      offset(offset2),
      size({
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
  const labelsRef = React4.useRef([]);
  const elementsRef = React4.useRef([]);
  const handleSelect = React4.useCallback((index) => {
    var _a;
    setSelectedIndex(index);
    setIsOpen(false);
    if (index !== null) {
      setSelected(labelsRef.current[index]);
      onValueChange == null ? void 0 : onValueChange((_a = labelsRef.current[index]) == null ? void 0 : _a.value);
    }
  }, []);
  function handleTypeaheadMatch(index) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex
  });
  const labelsRefTypehead = React4.useRef(
    labelsRef.current.map((item) => item == null ? void 0 : item.value)
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
  const contextValue = React4.useMemo(
    () => ({
      color,
      size: size2,
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
      size2,
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
  return (0, import_jsx_runtime4.jsxs)(SelectContext.Provider, { value: contextValue, children: [
    children,
    (0, import_jsx_runtime4.jsx)(
      "input",
      {
        readOnly: true,
        ref,
        name,
        style: { display: "none" },
        value: value || (selected == null ? void 0 : selected.value) || ""
      }
    )
  ] });
}
SelectRootBase.displayName = "MaterialTailwind.Select";
var SelectRoot = React4.forwardRef(SelectRootBase);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.selectTrigger) ?? selectTriggerTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const {
    refs,
    getReferenceProps,
    selected,
    isPill,
    color,
    size: size2,
    isOpen,
    isError,
    isSuccess,
    disabled
  } = React4.useContext(SelectContext);
  const value = selected == null ? void 0 : selected.value;
  const element = selected == null ? void 0 : selected.element;
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setReference, ref]);
  indicator ?? (indicator = (defaultProps == null ? void 0 : defaultProps.indicator) ?? (0, import_jsx_runtime4.jsxs)(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      color: "currentColor",
      className: "h-[1em] w-[1em] translate-x-0.5 stroke-[1.5]",
      children: [
        (0, import_jsx_runtime4.jsx)(
          "path",
          {
            d: "M17 8L12 3L7 8",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        (0, import_jsx_runtime4.jsx)(
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
  ));
  const styles = twMerge(
    theme2.baseStyle,
    theme2.size[size2],
    theme2.color[color],
    isPill && theme2.isPill,
    className
  );
  return (0, import_jsx_runtime4.jsxs)(
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
        children ? children({ value, element }) : element ?? (0, import_jsx_runtime4.jsx)("span", { "data-slot": "placeholder", className: theme2.placeholder, children: placeholder }),
        indicator
      ]
    }
  );
}
SelectTriggerRoot.displayName = "MaterialTailwind.SelectTrigger";
var SelectTrigger = React4.forwardRef(SelectTriggerRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.selectList) ?? selectListTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
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
  } = React4.useContext(SelectContext);
  disabled ?? (disabled = (defaultProps == null ? void 0 : defaultProps.disabled) ?? false);
  initialFocus ?? (initialFocus = (defaultProps == null ? void 0 : defaultProps.initialFocus) ?? 0);
  returnFocus ?? (returnFocus = (defaultProps == null ? void 0 : defaultProps.returnFocus) ?? true);
  guards ?? (guards = (defaultProps == null ? void 0 : defaultProps.guards) ?? true);
  modal ?? (modal = (defaultProps == null ? void 0 : defaultProps.modal) ?? true);
  visuallyHiddenDismiss ?? (visuallyHiddenDismiss = (defaultProps == null ? void 0 : defaultProps.visuallyHiddenDismiss) ?? true);
  closeOnFocusOut ?? (closeOnFocusOut = (defaultProps == null ? void 0 : defaultProps.closeOnFocusOut) ?? true);
  order ?? (order = (defaultProps == null ? void 0 : defaultProps.order) ?? ["content"]);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setFloating, ref]);
  React4.useEffect(() => {
    var _a, _b;
    if (controlledValue) {
      const label = children == null ? void 0 : children.find(
        (el) => (selected == null ? void 0 : selected.value) === el.props.value
      );
      if (label) {
        setSelected == null ? void 0 : setSelected({
          value: ((_a = label == null ? void 0 : label.props) == null ? void 0 : _a.value) || "",
          element: ((_b = label == null ? void 0 : label.props) == null ? void 0 : _b.children) || ""
        });
      }
    }
  }, []);
  return isOpen ? (0, import_jsx_runtime4.jsx)(
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
      children: (0, import_jsx_runtime4.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": isOpen,
          style: { ...floatingStyles, ...props == null ? void 0 : props.style },
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children: (0, import_jsx_runtime4.jsx)(
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
var SelectList = React4.forwardRef(SelectListRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.selectOption) ?? selectOptionTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const { getItemProps, handleSelect, activeIndex, selectedIndex, selected } = React4.useContext(SelectContext);
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  indicator ?? (indicator = (defaultProps == null ? void 0 : defaultProps.indicator) ?? (0, import_jsx_runtime4.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "h-4 w-4",
      children: (0, import_jsx_runtime4.jsx)(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M4.5 12.75l6 6 9-13.5"
        }
      )
    }
  ));
  const { ref: itemRef, index } = useListItem({
    label: { value, element: children }
  });
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects.default();
  const handleClick = (e) => {
    const onClick = props == null ? void 0 : props.onClick;
    if (ripple) {
      rippleEffect.create(e, "dark");
    }
    handleSelect && handleSelect(index);
    onClick == null ? void 0 : onClick(e);
  };
  const curValue = (selected == null ? void 0 : selected.value) || "";
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index || curValue === value;
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([itemRef, ref]);
  return (0, import_jsx_runtime4.jsxs)(
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
var SelectOption = React4.forwardRef(SelectOptionRoot);
var Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  List: SelectList,
  Option: SelectOption
});

// node_modules/@material-tailwind/react/dist/chunk-BAHTMLHP.js
var React6 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-ranger/build/esm/index.js
var React5 = __toESM(require_react());

// node_modules/@tanstack/ranger/build/esm/index.js
var getBoundingClientRect = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    left: Math.ceil(rect.left),
    width: Math.ceil(rect.width)
  };
};
var sortNumList = (arr) => [...arr].map(Number).sort((a, b) => a - b);
var linearInterpolator = {
  getPercentageForValue: (val, min, max) => {
    return Math.max(0, Math.min(100, (val - min) / (max - min) * 100));
  },
  getValueForClientX: (clientX, trackDims, min, max) => {
    const {
      left,
      width
    } = trackDims;
    const percentageValue = (clientX - left) / width;
    const value = (max - min) * percentageValue;
    return value + min;
  }
};
var Ranger = class {
  constructor(opts) {
    __publicField(this, "sortedValues", []);
    __publicField(this, "rangerElement", null);
    __publicField(this, "_willUpdate", () => {
      const rangerElement = this.options.getRangerElement();
      if (this.rangerElement !== rangerElement) {
        this.rangerElement = rangerElement;
      }
    });
    __publicField(this, "getValueForClientX", (clientX) => {
      const trackDims = getBoundingClientRect(this.rangerElement);
      return this.options.interpolator.getValueForClientX(clientX, trackDims, this.options.min, this.options.max);
    });
    __publicField(this, "getNextStep", (val, direction) => {
      const {
        min,
        max
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
        if (nextVal >= min && nextVal <= max) {
          return nextVal;
        } else {
          return val;
        }
      }
    });
    __publicField(this, "roundToStep", (val) => {
      const {
        min,
        max
      } = this.options;
      let left = min;
      let right = max;
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
        right = Math.min(left + stepSize, max);
      }
      if (val - left < right - val) {
        return left;
      }
      return right;
    });
    __publicField(this, "handleDrag", (e) => {
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
    });
    __publicField(this, "handleKeyDown", (e, i) => {
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
    });
    __publicField(this, "handlePress", (_e, i) => {
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
    });
    __publicField(this, "getPercentageForValue", (val) => this.options.interpolator.getPercentageForValue(val, this.options.min, this.options.max));
    __publicField(this, "getTicks", () => {
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
    });
    __publicField(this, "getSteps", () => {
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
    });
    __publicField(this, "handles", () => {
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
    });
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
};

// node_modules/@tanstack/react-ranger/build/esm/index.js
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React5.useLayoutEffect : React5.useEffect;
function useRanger(options) {
  const rerender = React5.useReducer(() => ({}), {})[1];
  const resolvedOptions = {
    ...options,
    rerender,
    onChange: (instance2) => {
      var _a;
      rerender();
      (_a = options.onChange) == null ? void 0 : _a.call(options, instance2);
    }
  };
  const [instance] = React5.useState(() => new Ranger(resolvedOptions));
  instance.setOptions(resolvedOptions);
  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });
  return instance;
}

// node_modules/@material-tailwind/react/dist/chunk-BAHTMLHP.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var import_react8 = __toESM(require_react(), 1);
var SliderContext = React6.createContext({
  min: 0,
  max: 100,
  step: 1
});
function SliderRootBase({
  as,
  color,
  size: size2,
  disabled,
  min,
  max,
  step,
  value: controlledValue,
  onValueChange: setControlledValue,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "div";
  const sliderRef = React6.useRef(null);
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.slider) ?? sliderTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  const [uncontrolledValue, setUncontrolledValue] = React6.useState([
    0
  ]);
  const value = (controlledValue == null ? void 0 : controlledValue.slice(0, 2)) ?? uncontrolledValue;
  const onValueChange = setControlledValue ?? setUncontrolledValue;
  const contextValue = React6.useMemo(
    () => ({
      size: size2,
      color,
      value,
      onValueChange,
      min: min ?? 0,
      max: max ?? 100,
      step: step ?? 1,
      sliderRef
    }),
    [value, onValueChange, min, max, step, size2, color]
  );
  const styles = twMerge(theme2.baseStyle, theme2["size"][size2], className);
  const elementRef = useMergeRefs([sliderRef, ref]);
  return (0, import_jsx_runtime5.jsx)(SliderContext.Provider, { value: contextValue, children: (0, import_jsx_runtime5.jsx)(Component, { ref: elementRef, ...props, className: styles, children }) });
}
SliderRootBase.displayName = "MaterialTailwind.Slider";
var SliderRoot = React6.forwardRef(SliderRootBase);
function SliderRangeRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.sliderRange) ?? sliderRangeTheme;
  const { sliderRef, value, onValueChange, min, max, step, color } = React6.useContext(SliderContext);
  const sliderInstance = useRanger({
    getRangerElement: () => sliderRef.current,
    values: value,
    min: min ?? 0,
    max: max ?? 100,
    stepSize: step ?? 1,
    onDrag: (instance) => onValueChange == null ? void 0 : onValueChange(instance.sortedValues),
    onChange: (instance) => onValueChange == null ? void 0 : onValueChange(instance.sortedValues)
  });
  return sliderInstance.getSteps().map(({ left, width }, i) => (0, import_jsx_runtime5.jsx)(
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
        ...props == null ? void 0 : props.style
      },
      children
    }
  ));
}
SliderRangeRoot.displayName = "MaterialTailwind.SliderRange";
var SliderRange = React6.forwardRef(SliderRangeRoot);
function SliderThumbRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.sliderThumb) ?? sliderThumbTheme;
  const { sliderRef, value, onValueChange, min, max, step, size: size2, color } = React6.useContext(SliderContext);
  const sliderInstance = useRanger({
    getRangerElement: () => sliderRef.current,
    values: value,
    min: min ?? 0,
    max: max ?? 100,
    stepSize: step ?? 1,
    onDrag: (instance) => onValueChange == null ? void 0 : onValueChange(instance.sortedValues),
    onChange: (instance) => onValueChange == null ? void 0 : onValueChange(instance.sortedValues)
  });
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2 ?? "md"],
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
      return (0, import_react8.createElement)(
        Component,
        {
          ...props,
          ref,
          key: i,
          onKeyDown: (e) => {
            var _a;
            (_a = props == null ? void 0 : props.onKeyDown) == null ? void 0 : _a.call(props, e);
            onKeyDownHandler(e);
          },
          onMouseDown: (e) => {
            var _a;
            (_a = props == null ? void 0 : props.onMouseDown) == null ? void 0 : _a.call(props, e);
            onMouseDownHandler(e);
          },
          onTouchStart: (e) => {
            var _a;
            (_a = props == null ? void 0 : props.onTouchStart) == null ? void 0 : _a.call(props, e);
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
            ...props == null ? void 0 : props.style
          }
        }
      );
    }
  );
}
SliderThumbRoot.displayName = "MaterialTailwind.SliderThumb";
var SliderThumb = React6.forwardRef(SliderThumbRoot);
function SliderTickRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.sliderTick) ?? sliderTickTheme;
  const { sliderRef, value, onValueChange, min, max, step, size: size2, color } = React6.useContext(SliderContext);
  const sliderInstance = useRanger({
    getRangerElement: () => sliderRef.current,
    values: value,
    min: min ?? 0,
    max: max ?? 100,
    stepSize: step ?? 1,
    onDrag: (instance) => onValueChange == null ? void 0 : onValueChange(instance.sortedValues),
    onChange: (instance) => onValueChange == null ? void 0 : onValueChange(instance.sortedValues)
  });
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2 ?? "md"],
    theme2["color"][color ?? "primary"],
    className
  );
  return sliderInstance.getTicks().map(({ value: value2, key, percentage }) => (0, import_react8.createElement)(
    Component,
    {
      ...props,
      key,
      ref,
      className: styles,
      style: {
        left: `${percentage}%`,
        ...props == null ? void 0 : props.style
      }
    },
    value2
  ));
}
SliderTickRoot.displayName = "MaterialTailwind.SliderTick";
var SliderTick = React6.forwardRef(SliderTickRoot);
var Slider = Object.assign(SliderRoot, {
  Range: SliderRange,
  Thumb: SliderThumb,
  Tick: SliderTick
});

// node_modules/@material-tailwind/react/dist/chunk-W7QACMSV.js
var React7 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function SpinnerRoot({ size: size2, color, className, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = contextTheme.spinner ?? spinnerTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  const styles = twMerge(theme2.baseStyle, theme2.size[size2], className);
  const spinnerColor = twMerge(theme2.color[color]);
  return (0, import_jsx_runtime6.jsxs)(
    "svg",
    {
      ...props,
      ref,
      fill: "none",
      className: styles,
      viewBox: "0 0 64 64",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        (0, import_jsx_runtime6.jsx)(
          "path",
          {
            stroke: "currentColor",
            strokeWidth: "5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          }
        ),
        (0, import_jsx_runtime6.jsx)(
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
var Spinner = React7.forwardRef(SpinnerRoot);

// node_modules/@material-tailwind/react/dist/chunk-45N2MFVJ.js
var React8 = __toESM(require_react(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function SwitchRoot({ color, className, ...props }, ref) {
  const innerID = React8.useId();
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.switch) ?? switchTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  const styles = twMerge(
    theme2.baseStyle,
    theme2.trackStyle,
    theme2.circleStyle,
    theme2.color[color],
    className
  );
  return (0, import_jsx_runtime7.jsx)(
    "input",
    {
      ...props,
      ref,
      type: "checkbox",
      className: styles,
      id: (props == null ? void 0 : props.id) || innerID
    }
  );
}
SwitchRoot.displayName = "MaterialTailwind.Switch";
var Switch = React8.forwardRef(SwitchRoot);

// node_modules/@material-tailwind/react/dist/chunk-N7VZAGKE.js
var React9 = __toESM(require_react(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
function TextareaRoot({
  color,
  size: size2,
  resize,
  isError,
  isSuccess,
  className,
  ...props
}, ref) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.textarea) ?? textareaTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  resize ?? (resize = (defaultProps == null ? void 0 : defaultProps.resize) ?? false);
  isError ?? (isError = (defaultProps == null ? void 0 : defaultProps.isError) ?? false);
  isSuccess ?? (isSuccess = (defaultProps == null ? void 0 : defaultProps.isSuccess) ?? false);
  const styles = twMerge(
    theme2.baseStyle,
    theme2.color[color],
    theme2.size[size2],
    resize && theme2["resize"],
    isError && theme2["isError"],
    isSuccess && theme2["isSuccess"],
    className
  );
  return (0, import_jsx_runtime8.jsx)(
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
var Textarea = React9.forwardRef(TextareaRoot);

// node_modules/@material-tailwind/react/dist/chunk-7N6QJBKP.js
var React10 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var TimelineContext = React10.createContext({
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.timeline) ?? timelineTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const innerRef = React10.useRef(null);
  const [innerValue, setInnerValue] = React10.useState(defaultValue || "");
  value ?? (value = innerValue);
  onValueChange ?? (onValueChange = setInnerValue);
  mode ?? (mode = (defaultProps == null ? void 0 : defaultProps.mode) ?? "timeline");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  orientation ?? (orientation = (defaultProps == null ? void 0 : defaultProps.orientation) ?? "horizontal");
  React10.useEffect(() => {
    const parentEl = innerRef == null ? void 0 : innerRef.current;
    if (parentEl && !value) {
      const children2 = Array.from(parentEl.children);
      const firstChild = children2[0];
      onValueChange == null ? void 0 : onValueChange(firstChild.dataset.value);
    }
  }, []);
  React10.useEffect(() => {
    if (mode === "stepper") {
      const parentEl = innerRef == null ? void 0 : innerRef.current;
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
          (_, index) => index < activeElIndex
        );
        const incompletedSteps = children2.filter(
          (_, index) => index > activeElIndex
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
  const contextValue = React10.useMemo(
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
  return (0, import_jsx_runtime9.jsx)(
    Component,
    {
      ...props,
      ref: mergedRef,
      className: styles,
      "data-orientation": orientation,
      children: (0, import_jsx_runtime9.jsx)(TimelineContext.Provider, { value: contextValue, children })
    }
  );
}
TimelineRootBase.displayName = "MaterialTailwind.Timeline";
var TimelineRoot = React10.forwardRef(TimelineRootBase);
function TimelineItemRoot({ as, value, className, disabled, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.timelineItem) ?? timelineItemTheme;
  const {
    mode,
    setValue,
    orientation,
    value: contextValue
  } = React10.useContext(TimelineContext);
  const innerRef = React10.useRef(null);
  value ?? (value = React10.useId());
  const isActive = contextValue == value || mode === "timeline";
  function onClick(event) {
    var _a;
    (_a = props == null ? void 0 : props.onClick) == null ? void 0 : _a.call(props, event);
    if (mode === "stepper") {
      setValue == null ? void 0 : setValue(value);
    }
  }
  const styles = twMerge(theme2.baseStyle, className);
  const mergedRef = useMergeRefs([ref, innerRef]);
  return (0, import_jsx_runtime9.jsx)(
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
var TimelineItem = React10.forwardRef(TimelineItemRoot);
function TimelineHeaderRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.timelineHeader) ?? timelineHeaderTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime9.jsx)(Component, { ...props, ref, className: styles, children });
}
TimelineHeaderRoot.displayName = "MaterialTailwind.TimelineHeader";
var TimelineHeader = React10.forwardRef(TimelineHeaderRoot);
function TimelineIconRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.timelineIcon) ?? timelineIconTheme;
  const { color } = React10.useContext(TimelineContext);
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  return (0, import_jsx_runtime9.jsx)(Component, { ...props, ref, className: styles, children });
}
TimelineIconRoot.displayName = "MaterialTailwind.TimelineIcon";
var TimelineIcon = React10.forwardRef(TimelineIconRoot);
function TimelineSeparatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.timelineSeparator) ?? timelineSeparatorTheme;
  const { orientation, color } = React10.useContext(TimelineContext);
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  return (0, import_jsx_runtime9.jsx)(
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
var TimelineSeparator = React10.forwardRef(TimelineSeparatorRoot);
function TimelineBodyRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.timelineBody) ?? timelineBodyTheme;
  const { orientation } = React10.useContext(TimelineContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime9.jsx)(
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
var TimelineBody = React10.forwardRef(TimelineBodyRoot);
var Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Icon: TimelineIcon,
  Body: TimelineBody,
  Header: TimelineHeader,
  Separator: TimelineSeparator
});

// node_modules/@material-tailwind/react/dist/chunk-7QFTCBAN.js
var React11 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var InputContext = React11.createContext({
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
  size: size2,
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.input) ?? inputTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [isIconDefined, setIsIconDefined] = React11.useState(false);
  const [iconPlacement, setIconPlacement] = React11.useState("start");
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  isPill ?? (isPill = (defaultProps == null ? void 0 : defaultProps.isPill) ?? false);
  isError ?? (isError = (defaultProps == null ? void 0 : defaultProps.isError) ?? false);
  isSuccess ?? (isSuccess = (defaultProps == null ? void 0 : defaultProps.isSuccess) ?? false);
  const styles = twMerge(
    theme2.baseStyle,
    theme2.size[size2],
    theme2.color[color],
    className,
    "peer"
  );
  const contextValue = React11.useMemo(
    () => ({
      size: size2,
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
      size2,
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
  return (0, import_jsx_runtime10.jsx)(Component, { className: "relative w-full", children: (0, import_jsx_runtime10.jsxs)(InputContext.Provider, { value: contextValue, children: [
    (0, import_jsx_runtime10.jsx)(
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
var InputRoot = React11.forwardRef(InputRootBase);
function InputIconRoot({ as, placement, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const {
    size: size2,
    iconPlacement,
    setIconPlacement,
    setIsIconDefined,
    isError,
    isSuccess,
    disabled
  } = React11.useContext(InputContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.inputIcon) ?? inputIconTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  placement ?? (placement = (defaultProps == null ? void 0 : defaultProps.placement) ?? "start");
  React11.useEffect(() => {
    setIsIconDefined(true);
    return () => {
      setIsIconDefined(false);
    };
  }, []);
  React11.useEffect(() => {
    setIconPlacement(placement);
    return () => {
      setIconPlacement("start");
    };
  }, [placement]);
  const styles = twMerge(theme2.baseStyle, theme2.size[size2], props == null ? void 0 : props.className);
  return (0, import_jsx_runtime10.jsx)(
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
var InputIcon = React11.forwardRef(InputIconRoot);
var Input = Object.assign(InputRoot, {
  Icon: InputIcon
});

// node_modules/@material-tailwind/react/dist/chunk-4ZWUS624.js
var React12 = __toESM(require_react(), 1);
var import_material_ripple_effects2 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
function ListRootBase({ as, className, children, ...props }, ref) {
  const Component = as ?? "ul";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.list) ?? listTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(Component, { ...props, ref, className: styles, children });
}
ListRootBase.displayName = "MaterialTailwind.List";
var ListRoot = React12.forwardRef(ListRootBase);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.listItem) ?? listItemTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects2.default();
  const handleClick = (e) => {
    const onClick = props == null ? void 0 : props.onClick;
    if (ripple) {
      rippleEffect.create(e, "dark");
    }
    return typeof onClick === "function" && onClick(e);
  };
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(
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
var ListItem = React12.forwardRef(ListItemRoot);
function ListItemStartRoot({ as, className, disabled, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.listItemStart) ?? listItemStartTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(Component, { ...props, ref, className: styles, children });
}
ListItemStartRoot.displayName = "MaterialTailwind.ListItemStart";
var ListItemStart = React12.forwardRef(ListItemStartRoot);
function ListItemEndRoot({ as, className, disabled, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.listItemEnd) ?? listItemEndTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime11.jsx)(Component, { ...props, ref, className: styles, children });
}
ListItemEndRoot.displayName = "MaterialTailwind.ListItemEnd";
var ListItemEnd = React12.forwardRef(ListItemEndRoot);
var List = Object.assign(ListRoot, {
  Item: ListItem,
  ItemStart: ListItemStart,
  ItemEnd: ListItemEnd
});

// node_modules/@material-tailwind/react/dist/chunk-KWVMMTQK.js
var React13 = __toESM(require_react(), 1);
var import_material_ripple_effects3 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var MenuContext = React13.createContext({
  open: false,
  setOpen: () => {
  }
});
function MenuCore({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement,
  offset: offset2,
  children
}) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.menu) ?? menuTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React13.useState(false);
  const [activeIndex, setActiveIndex] = React13.useState(null);
  const elementsRef = React13.useRef([]);
  const labelsRef = React13.useRef([]);
  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();
  const isNested = parentId != null;
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  placement ?? (placement = isNested ? "right-start" : (defaultProps == null ? void 0 : defaultProps.placement) ?? "bottom");
  offset2 ?? (offset2 = isNested ? 8 : (defaultProps == null ? void 0 : defaultProps.offset) ?? 5);
  const { floatingStyles, refs, context } = useFloating({
    nodeId,
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offset2), flip(), shift({ padding: 5 })]
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
  const contextValue = React13.useMemo(
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
  React13.useEffect(() => {
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
  React13.useEffect(() => {
    if (open && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, open, nodeId, parentId]);
  return (0, import_jsx_runtime12.jsx)(FloatingNode, { id: nodeId, children: (0, import_jsx_runtime12.jsx)(MenuContext.Provider, { value: contextValue, children }) });
}
function MenuRoot(props) {
  const parentId = useFloatingParentNodeId();
  return parentId === null ? (0, import_jsx_runtime12.jsx)(FloatingTree, { children: (0, import_jsx_runtime12.jsx)(MenuCore, { ...props }) }) : (0, import_jsx_runtime12.jsx)(MenuCore, { ...props });
}
MenuRoot.displayName = "MaterialTailwind.Menu";
function MenuTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.menuTrigger) ?? menuTriggerTheme;
  const {
    refs,
    item,
    activeIndex,
    isNested,
    getReferenceProps,
    getItemProps,
    open
  } = React13.useContext(MenuContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setReference, item == null ? void 0 : item.ref, ref]);
  return (0, import_jsx_runtime12.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      "data-open": open,
      "data-nested": isNested,
      tabIndex: !isNested ? void 0 : activeIndex === (item == null ? void 0 : item.index) ? 0 : -1,
      role: isNested ? "menuitem" : void 0,
      className: styles,
      ...getReferenceProps && getItemProps && getReferenceProps(getItemProps()),
      children
    }
  );
}
MenuTriggerRoot.displayName = "MaterialTailwind.MenuTrigger";
var MenuTrigger = React13.forwardRef(MenuTriggerRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.menuContent) ?? menuContentTheme;
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
  } = React13.useContext(MenuContext);
  disabled ?? (disabled = (defaultProps == null ? void 0 : defaultProps.disabled) ?? false);
  initialFocus ?? (initialFocus = (defaultProps == null ? void 0 : defaultProps.initialFocus) ?? 0);
  returnFocus ?? (returnFocus = (defaultProps == null ? void 0 : defaultProps.returnFocus) ?? true);
  guards ?? (guards = (defaultProps == null ? void 0 : defaultProps.guards) ?? true);
  modal ?? (modal = (defaultProps == null ? void 0 : defaultProps.modal) ?? false);
  visuallyHiddenDismiss ?? (visuallyHiddenDismiss = (defaultProps == null ? void 0 : defaultProps.visuallyHiddenDismiss) ?? true);
  closeOnFocusOut ?? (closeOnFocusOut = (defaultProps == null ? void 0 : defaultProps.closeOnFocusOut) ?? true);
  order ?? (order = (defaultProps == null ? void 0 : defaultProps.order) ?? ["content"]);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setFloating, ref]);
  return (0, import_jsx_runtime12.jsx)(FloatingList, { elementsRef, labelsRef, children: open && (0, import_jsx_runtime12.jsx)(FloatingPortal, { children: (0, import_jsx_runtime12.jsx)(
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
      children: (0, import_jsx_runtime12.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": open,
          style: { ...floatingStyles, ...props == null ? void 0 : props.style },
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children
        }
      )
    }
  ) }) });
}
MenuContentRoot.displayName = "MaterialTailwind.MenuContent";
var MenuContent = React13.forwardRef(MenuContentRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.menuItem) ?? menuItemTheme;
  const defaultProps = theme2.defaultProps;
  const { activeIndex, getItemProps } = React13.useContext(MenuContext);
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  closeOnClick ?? (closeOnClick = (defaultProps == null ? void 0 : defaultProps.closeOnClick) ?? true);
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects3.default();
  const item = useListItem({
    label: disabled ? null : children
  });
  const tree = useFloatingTree();
  const isActive = item.index === activeIndex;
  const elementRef = useMergeRefs([item.ref, ref]);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime12.jsx)(
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
          var _a;
          (_a = props.onClick) == null ? void 0 : _a.call(props, event);
          if (closeOnClick) {
            tree == null ? void 0 : tree.events.emit("click");
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
var MenuItem = React13.forwardRef(MenuItemRoot);
var Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem
});

// node_modules/@material-tailwind/react/dist/chunk-WUFUNYGN.js
var React14 = __toESM(require_react(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
function NavbarRoot({ as, color, variant, className, children, ...props }, ref) {
  const Component = as || "nav";
  const contextTheme = useTheme();
  const theme2 = contextTheme.navbar || navbarTheme;
  const defaultProps = theme2.defaultProps;
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "default");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  const styles = twMerge(
    theme2.baseStyle,
    theme2.variant[variant][color],
    className
  );
  return (0, import_jsx_runtime13.jsx)(Component, { ...props, ref, className: styles, children });
}
NavbarRoot.displayName = "MaterialTailwind.Navbar";
var Navbar = React14.forwardRef(NavbarRoot);

// node_modules/@material-tailwind/react/dist/chunk-EW6AUMUA.js
var React15 = __toESM(require_react(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var PopoverContext = React15.createContext({
  open: false,
  setOpen: () => {
  }
});
function PopoverRoot({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement,
  offset: offset2,
  children
}) {
  const arrowRef = React15.useRef(null);
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.popover) ?? popoverTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React15.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  placement ?? (placement = (defaultProps == null ? void 0 : defaultProps.placement) ?? "bottom");
  offset2 ?? (offset2 = (defaultProps == null ? void 0 : defaultProps.offset) ?? 10);
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offset2),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5
      }),
      shift({ padding: 5 }),
      arrow({
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
  const contextValue = React15.useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data
    }),
    [open, setOpen, arrowRef, interactions, data]
  );
  return (0, import_jsx_runtime14.jsx)(PopoverContext.Provider, { value: contextValue, children });
}
PopoverRoot.displayName = "MaterialTailwind.Popover";
function PopoverTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.popoverTrigger) ?? popoverTriggerTheme;
  const { refs, getReferenceProps, open } = React15.useContext(PopoverContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setReference, ref]);
  return (0, import_jsx_runtime14.jsx)(
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
var PopoverTrigger = React15.forwardRef(PopoverTriggerRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.popoverContent) ?? popoverContentTheme;
  const defaultProps = theme2.defaultProps;
  const { context, refs, getFloatingProps, open, floatingStyles } = React15.useContext(PopoverContext);
  disabled ?? (disabled = (defaultProps == null ? void 0 : defaultProps.disabled) ?? false);
  initialFocus ?? (initialFocus = (defaultProps == null ? void 0 : defaultProps.initialFocus) ?? 0);
  returnFocus ?? (returnFocus = (defaultProps == null ? void 0 : defaultProps.returnFocus) ?? true);
  guards ?? (guards = (defaultProps == null ? void 0 : defaultProps.guards) ?? true);
  modal ?? (modal = (defaultProps == null ? void 0 : defaultProps.modal) ?? false);
  visuallyHiddenDismiss ?? (visuallyHiddenDismiss = (defaultProps == null ? void 0 : defaultProps.visuallyHiddenDismiss) ?? true);
  closeOnFocusOut ?? (closeOnFocusOut = (defaultProps == null ? void 0 : defaultProps.closeOnFocusOut) ?? true);
  order ?? (order = (defaultProps == null ? void 0 : defaultProps.order) ?? [
    "content"
  ]);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setFloating, ref]);
  return open ? (0, import_jsx_runtime14.jsx)(FloatingPortal, { children: (0, import_jsx_runtime14.jsx)(
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
      children: (0, import_jsx_runtime14.jsx)(
        Component,
        {
          ...props,
          ref: elementRef,
          "data-open": open,
          style: { ...floatingStyles, ...props == null ? void 0 : props.style },
          className: styles,
          ...getFloatingProps && getFloatingProps(),
          children
        }
      )
    }
  ) }) : null;
}
PopoverContentRoot.displayName = "MaterialTailwind.PopoverContent";
var PopoverContent = React15.forwardRef(PopoverContentRoot);
function PopoverArrowRoot({ as, className, ...props }, ref) {
  var _a, _b, _c;
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.popoverArrow) ?? popoverArrowTheme;
  const innerRef = React15.useRef(null);
  const { placement, arrowRef, middlewareData } = React15.useContext(PopoverContext);
  const elementRef = useMergeRefs([arrowRef, innerRef, ref]);
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement ? placement.split("-")[0] : ""];
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime14.jsx)(
    Component,
    {
      ...props,
      ref: elementRef,
      style: {
        position: "absolute",
        left: (_a = middlewareData == null ? void 0 : middlewareData.arrow) == null ? void 0 : _a.x,
        top: (_b = middlewareData == null ? void 0 : middlewareData.arrow) == null ? void 0 : _b.y,
        [staticSide]: `${-((_c = innerRef == null ? void 0 : innerRef.current) == null ? void 0 : _c.clientHeight) / 2 - 1}px`,
        ...props == null ? void 0 : props.style
      },
      "data-placement": placement,
      className: styles
    }
  );
}
PopoverArrowRoot.displayName = "MaterialTailwind.PopoverArrow";
var PopoverArrow = React15.forwardRef(PopoverArrowRoot);
var Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow
});

// node_modules/@material-tailwind/react/dist/chunk-ADFSQ3F2.js
var React16 = __toESM(require_react(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var ProgressContext = React16.createContext({
  value: 0,
  color: "primary"
});
function ProgressRootBase({ as, size: size2, color, value, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.progress ?? progressTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  const styles = twMerge(theme2.baseStyle, theme2.size[size2], className);
  const contextValue = React16.useMemo(() => ({ value, color }), [value, color]);
  return (0, import_jsx_runtime15.jsx)(ProgressContext.Provider, { value: contextValue, children: (0, import_jsx_runtime15.jsx)(Component, { ...props, ref, className: styles, children }) });
}
ProgressRootBase.displayName = "MaterialTailwind.Progress";
var ProgressRoot = React16.forwardRef(ProgressRootBase);
function ProgressBarRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const { color, value } = React16.useContext(ProgressContext);
  const theme2 = contextTheme.progressBar ?? progressBarTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2.color[color],
    className
  );
  return (0, import_jsx_runtime15.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      style: {
        width: `${value}%`,
        ...props == null ? void 0 : props.style
      },
      children
    }
  );
}
ProgressBarRoot.displayName = "MaterialTailwind.ProgressBar";
var ProgressBar = React16.forwardRef(ProgressBarRoot);
var Progress = Object.assign(ProgressRoot, {
  Bar: ProgressBar
});

// node_modules/@material-tailwind/react/dist/chunk-UBL2QCU4.js
var React17 = __toESM(require_react(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var RadioContext = React17.createContext({
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.radio) ?? radioTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [innerValue, setInnerValue] = React17.useState(defaultValue || "");
  value ?? (value = innerValue);
  onValueChange ?? (onValueChange = setInnerValue);
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  orientation ?? (orientation = (defaultProps == null ? void 0 : defaultProps.orientation) ?? "vertical");
  const styles = twMerge(theme2.baseStyle, className);
  const contextValue = React17.useMemo(
    () => ({
      color,
      globalValue: value,
      setGlobalValue: onValueChange
    }),
    [color, value, onValueChange]
  );
  return (0, import_jsx_runtime16.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-value": value,
      "data-orientation": orientation,
      children: (0, import_jsx_runtime16.jsx)(RadioContext.Provider, { value: contextValue, children })
    }
  );
}
RadioRootBase.displayName = "MaterialTailwind.Radio";
var RadioRoot = React17.forwardRef(RadioRootBase);
function RadioItemRoot({ disabled, className, children, value, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.radioItem) ?? radioItemTheme;
  const { globalValue, setGlobalValue, color } = React17.useContext(RadioContext);
  const innerId = React17.useId();
  const innerValue = React17.useId();
  const mainValue = value || innerValue;
  const isChecked = globalValue === mainValue;
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  return (0, import_jsx_runtime16.jsxs)(
    "label",
    {
      ref,
      className: styles,
      "data-value": mainValue,
      "data-checked": isChecked,
      "aria-disabled": disabled,
      htmlFor: (props == null ? void 0 : props.id) || innerId,
      children: [
        (0, import_jsx_runtime16.jsx)(
          "input",
          {
            ...props,
            id: (props == null ? void 0 : props.id) || innerId,
            type: "radio",
            checked: isChecked,
            value: mainValue,
            onChange: (e) => {
              var _a;
              (_a = props == null ? void 0 : props.onChange) == null ? void 0 : _a.call(props, e);
              setGlobalValue == null ? void 0 : setGlobalValue(mainValue);
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
var RadioItem = React17.forwardRef(RadioItemRoot);
function RadioIndicatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.radioIndicator) ?? radioIndicatorTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime16.jsx)(Component, { ...props, className: styles, ref, children: children || (0, import_jsx_runtime16.jsx)(
    "svg",
    {
      width: "10px",
      height: "10px",
      viewBox: "0 0 22 22",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, import_jsx_runtime16.jsx)(
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
var RadioIndicator = React17.forwardRef(RadioIndicatorRoot);
var Radio = Object.assign(RadioRoot, {
  Item: RadioItem,
  Indicator: RadioIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-RGPTN62M.js
var React18 = __toESM(require_react(), 1);
var import_material_ripple_effects4 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
function ButtonRoot({
  as,
  color,
  variant,
  size: size2,
  ripple,
  isPill,
  isFullWidth,
  className,
  children,
  ...props
}, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.button) ?? buttonTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  isPill ?? (isPill = (defaultProps == null ? void 0 : defaultProps.isPill) ?? false);
  isFullWidth ?? (isFullWidth = (defaultProps == null ? void 0 : defaultProps.isFullWidth) ?? false);
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects4.default();
  const handleClick = (e) => {
    const onClick = props == null ? void 0 : props.onClick;
    const isDarkRipple = variant === "ghost" || color === "secondary";
    if (ripple) {
      rippleEffect.create(e, isDarkRipple ? "dark" : "light");
    }
    return typeof onClick === "function" && onClick(e);
  };
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2],
    theme2["variant"][variant][color],
    className
  );
  return (0, import_jsx_runtime17.jsx)(
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
var Button = React18.forwardRef(ButtonRoot);

// node_modules/@material-tailwind/react/dist/chunk-IKBRS3ZQ.js
var React19 = __toESM(require_react(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
function CardRootBase({ as, color, variant, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.card || cardTheme;
  const defaultProps = theme2.defaultProps;
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "default");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  const styles = twMerge(
    theme2.baseStyle,
    theme2.variant[variant][color],
    className
  );
  return (0, import_jsx_runtime18.jsx)(Component, { ...props, ref, className: styles, children });
}
CardRootBase.displayName = "MaterialTailwind.Card";
var CardRoot = React19.forwardRef(CardRootBase);
function CardHeaderRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.cardHeader || cardHeaderTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime18.jsx)(Component, { ...props, ref, className: styles, children });
}
CardHeaderRoot.displayName = "MaterialTailwind.CardHeader";
var CardHeader = React19.forwardRef(CardHeaderRoot);
function CardBodyRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.cardBody || cardBodyTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime18.jsx)(Component, { ...props, ref, className: styles, children });
}
CardBodyRoot.displayName = "MaterialTailwind.CardBody";
var CardBody = React19.forwardRef(CardBodyRoot);
function CardFooterRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.cardFooter || cardFooterTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime18.jsx)(Component, { ...props, ref, className: styles, children });
}
CardFooterRoot.displayName = "MaterialTailwind.CardFooter";
var CardFooter = React19.forwardRef(CardFooterRoot);
var Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
});

// node_modules/@material-tailwind/react/dist/chunk-RWVEEWUM.js
var React20 = __toESM(require_react(), 1);
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var CheckboxContext = React20.createContext({
  color: "primary",
  disabled: false,
  checked: false
});
function CheckboxRootBase({ color, disabled, className, children, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.checkbox) ?? checkboxTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const innerId = React20.useId();
  const [checked, setChecked] = React20.useState((props == null ? void 0 : props.checked) || false);
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  const styles = twMerge(theme2.baseStyle, theme2.color[color], className);
  React20.useEffect(() => {
    if (props == null ? void 0 : props.defaultChecked) {
      setChecked(props == null ? void 0 : props.defaultChecked);
    }
  }, []);
  const contextValue = React20.useMemo(
    () => ({
      color,
      checked,
      disabled
    }),
    [color, checked, disabled]
  );
  return (0, import_jsx_runtime19.jsxs)(
    "label",
    {
      ref,
      className: styles,
      "data-checked": checked,
      "aria-disabled": disabled,
      htmlFor: (props == null ? void 0 : props.id) || innerId,
      children: [
        (0, import_jsx_runtime19.jsx)(
          "input",
          {
            ...props,
            id: (props == null ? void 0 : props.id) || innerId,
            type: "checkbox",
            checked: (props == null ? void 0 : props.defaultChecked) ? void 0 : (props == null ? void 0 : props.checked) || checked,
            onChange: (e) => {
              var _a;
              (_a = props == null ? void 0 : props.onChange) == null ? void 0 : _a.call(props, e);
              setChecked((cur) => !cur);
            },
            style: { display: "none" }
          }
        ),
        (0, import_jsx_runtime19.jsx)(CheckboxContext.Provider, { value: contextValue, children })
      ]
    }
  );
}
CheckboxRootBase.displayName = "MaterialTailwind.Checkbox";
var CheckboxRoot = React20.forwardRef(CheckboxRootBase);
function CheckboxIndicatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const { checked } = React20.useContext(CheckboxContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.checkboxIndicator) ?? checkboxIndicatorTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime19.jsx)(Component, { ...props, "data-checked": checked, className: styles, ref, children: children || (0, import_jsx_runtime19.jsx)(
    "svg",
    {
      fill: "none",
      width: "18px",
      height: "18px",
      strokeWidth: "2",
      color: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: (0, import_jsx_runtime19.jsx)(
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
var CheckboxIndicator = React20.forwardRef(CheckboxIndicatorRoot);
var Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-IIM6BP3Z.js
var React21 = __toESM(require_react(), 1);
var import_material_ripple_effects5 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var ChipContext = React21.createContext({
  size: "md",
  color: "primary",
  variant: "solid",
  open: true,
  setOpen: () => {
  }
});
function ChipRootBase({
  as,
  size: size2,
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.chip) ?? chipTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React21.useState(true);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  isPill ?? (isPill = (defaultProps == null ? void 0 : defaultProps.isPill) ?? true);
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2],
    theme2["variant"][variant][color],
    className
  );
  const contextValue = React21.useMemo(
    () => ({
      size: size2,
      color,
      variant,
      open,
      setOpen
    }),
    [size2, color, variant, open, setOpen]
  );
  return open ? (0, import_jsx_runtime20.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": open,
      "data-shape": isPill ? "pill" : "default",
      className: styles,
      children: (0, import_jsx_runtime20.jsx)(ChipContext.Provider, { value: contextValue, children })
    }
  ) : null;
}
ChipRootBase.displayName = "MaterialTailwind.Chip";
var ChipRoot = React21.forwardRef(ChipRootBase);
function ChipLabelRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const { size: size2 } = React21.useContext(ChipContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.chipLabel) ?? chipLabelTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2 || "md"],
    className
  );
  return (0, import_jsx_runtime20.jsx)(Component, { ...props, ref, className: styles, children });
}
ChipLabelRoot.displayName = "MaterialTailwind.ChipLabel";
var ChipLabel = React21.forwardRef(ChipLabelRoot);
function ChipIconRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const { size: size2 } = React21.useContext(ChipContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.chipIcon) ?? chipIconTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2 || "md"],
    className
  );
  return (0, import_jsx_runtime20.jsx)(Component, { ...props, ref, className: styles, children });
}
ChipIconRoot.displayName = "MaterialTailwind.ChipIcon";
var ChipIcon = React21.forwardRef(ChipIconRoot);
function ChipDismissTriggerRoot({ as, ripple, className, children, ...props }, ref) {
  const Component = as ?? "button";
  const contextTheme = useTheme();
  const { size: size2, color, variant, setOpen } = React21.useContext(ChipContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.chipDismissTrigger) ?? chipDismissTriggerTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects5.default();
  const handleClick = (event) => {
    var _a;
    setOpen == null ? void 0 : setOpen(false);
    (_a = props.onClick) == null ? void 0 : _a.call(props, event);
    const isDarkRipple = variant === "ghost" || variant === "outline" || color === "secondary" || color === "warning";
    if (ripple) {
      rippleEffect.create(event, isDarkRipple ? "dark" : "light");
    }
  };
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2 || "md"],
    className
  );
  return (0, import_jsx_runtime20.jsx)(Component, { ...props, ref, className: styles, onClick: handleClick, children: children || (0, import_jsx_runtime20.jsx)(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      color: "currentColor",
      className: "h-full w-full",
      children: (0, import_jsx_runtime20.jsx)(
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
var ChipDismissTrigger = React21.forwardRef(ChipDismissTriggerRoot);
var Chip = Object.assign(ChipRoot, {
  Icon: ChipIcon,
  Label: ChipLabel,
  DismissTrigger: ChipDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-IWGKJKRP.js
var React22 = __toESM(require_react(), 1);
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
function CollapseRoot({ as, open, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.collapse) ?? collapseTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return open ? (0, import_jsx_runtime21.jsx)(Component, { ...props, ref, "data-open": open, className: styles, children }) : null;
}
CollapseRoot.displayName = "MaterialTailwind.Collapse";
var Collapse = React22.forwardRef(CollapseRoot);

// node_modules/@material-tailwind/react/dist/chunk-FLMXDNZI.js
var React23 = __toESM(require_react(), 1);
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
var DialogContext = React23.createContext({
  open: false,
  setOpen: () => {
  }
});
function DialogRoot({
  size: size2,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children
}) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.dialog) ?? dialogTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React23.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  const data = useFloating({
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
  const contextValue = React23.useMemo(
    () => ({
      open,
      setOpen,
      size: size2,
      ...interactions,
      ...data
    }),
    [open, setOpen, size2, interactions, data]
  );
  return (0, import_jsx_runtime22.jsx)(DialogContext.Provider, { value: contextValue, children });
}
DialogRoot.displayName = "MaterialTailwind.Dialog";
function DialogTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.dialogTrigger) ?? dialogTriggerTheme;
  const { refs, getReferenceProps, open } = React23.useContext(DialogContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setReference, ref]);
  return (0, import_jsx_runtime22.jsx)(
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
var DialogTrigger = React23.forwardRef(DialogTriggerRoot);
function DialogOverlayRoot({ className, lockScroll, children, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.dialogOverlay) ?? dialogOverlayTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const { open } = React23.useContext(DialogContext);
  lockScroll ?? (lockScroll = (defaultProps == null ? void 0 : defaultProps.lockScroll) ?? true);
  const styles = twMerge(theme2.baseStyle, className);
  return open ? (0, import_jsx_runtime22.jsx)(FloatingPortal, { children: (0, import_jsx_runtime22.jsx)(
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
var DialogOverlay = React23.forwardRef(DialogOverlayRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.dialogContent) ?? dialogContentTheme;
  const defaultProps = theme2.defaultProps;
  const { context, refs, getFloatingProps, open, size: size2 } = React23.useContext(DialogContext);
  disabled ?? (disabled = (defaultProps == null ? void 0 : defaultProps.disabled) ?? false);
  initialFocus ?? (initialFocus = (defaultProps == null ? void 0 : defaultProps.initialFocus) ?? 0);
  returnFocus ?? (returnFocus = (defaultProps == null ? void 0 : defaultProps.returnFocus) ?? true);
  guards ?? (guards = (defaultProps == null ? void 0 : defaultProps.guards) ?? true);
  modal ?? (modal = (defaultProps == null ? void 0 : defaultProps.modal) ?? false);
  visuallyHiddenDismiss ?? (visuallyHiddenDismiss = (defaultProps == null ? void 0 : defaultProps.visuallyHiddenDismiss) ?? true);
  closeOnFocusOut ?? (closeOnFocusOut = (defaultProps == null ? void 0 : defaultProps.closeOnFocusOut) ?? true);
  order ?? (order = (defaultProps == null ? void 0 : defaultProps.order) ?? ["content"]);
  const styles = twMerge(theme2.baseStyle, theme2.size[size2], className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setFloating, ref]);
  return open ? (0, import_jsx_runtime22.jsx)(
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
      children: (0, import_jsx_runtime22.jsx)(
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
var DialogContent = React23.forwardRef(DialogContentRoot);
function DialogDismissTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.dialogDismissTrigger) ?? dialogDismissTriggerTheme;
  const { open, setOpen } = React23.useContext(DialogContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime22.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": open,
      className: styles,
      onClick: (event) => {
        var _a;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
        if (setOpen) {
          setOpen(false);
        }
      },
      children
    }
  );
}
DialogDismissTriggerRoot.displayName = "MaterialTailwind.DialogDismissTrigger";
var DialogDismissTrigger = React23.forwardRef(
  DialogDismissTriggerRoot
);
var Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  DismissTrigger: DialogDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-3MLHBTLS.js
var React24 = __toESM(require_react(), 1);
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var DrawerContext = React24.createContext(
  {}
);
function DrawerRoot({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  children
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React24.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const data = useFloating({
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
  const contextValue = React24.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data
    }),
    [open, setOpen, interactions, data]
  );
  return (0, import_jsx_runtime23.jsx)(DrawerContext.Provider, { value: contextValue, children });
}
DrawerRoot.displayName = "MaterialTailwind.Drawer";
function DrawerTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.drawerTrigger) ?? drawerTriggerTheme;
  const { refs, getReferenceProps, open } = React24.useContext(DrawerContext);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setReference, ref]);
  return (0, import_jsx_runtime23.jsx)(
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
var DrawerTrigger = React24.forwardRef(DrawerTriggerRoot);
function DrawerOverlayRoot({ className, lockScroll, children, ...props }, ref) {
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.drawerOverlay) ?? drawerOverlayTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const { open } = React24.useContext(DrawerContext);
  lockScroll ?? (lockScroll = (defaultProps == null ? void 0 : defaultProps.lockScroll) ?? true);
  const styles = twMerge(theme2.baseStyle, className);
  return open ? (0, import_jsx_runtime23.jsx)(FloatingPortal, { children: (0, import_jsx_runtime23.jsx)(
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
var DrawerOverlay = React24.forwardRef(DrawerOverlayRoot);
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.drawerPanel) ?? drawerPanelTheme;
  const defaultProps = theme2.defaultProps;
  const { context, refs, getFloatingProps, open } = React24.useContext(DrawerContext);
  placement ?? (placement = (defaultProps == null ? void 0 : defaultProps.placement) ?? "right");
  disabled ?? (disabled = (defaultProps == null ? void 0 : defaultProps.disabled) ?? false);
  initialFocus ?? (initialFocus = (defaultProps == null ? void 0 : defaultProps.initialFocus) ?? 0);
  returnFocus ?? (returnFocus = (defaultProps == null ? void 0 : defaultProps.returnFocus) ?? true);
  guards ?? (guards = (defaultProps == null ? void 0 : defaultProps.guards) ?? true);
  modal ?? (modal = (defaultProps == null ? void 0 : defaultProps.modal) ?? false);
  visuallyHiddenDismiss ?? (visuallyHiddenDismiss = (defaultProps == null ? void 0 : defaultProps.visuallyHiddenDismiss) ?? true);
  closeOnFocusOut ?? (closeOnFocusOut = (defaultProps == null ? void 0 : defaultProps.closeOnFocusOut) ?? true);
  order ?? (order = (defaultProps == null ? void 0 : defaultProps.order) ?? ["content"]);
  const styles = twMerge(theme2.baseStyle, className);
  const elementRef = useMergeRefs([refs == null ? void 0 : refs.setFloating, ref]);
  return open ? (0, import_jsx_runtime23.jsx)(
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
      children: (0, import_jsx_runtime23.jsx)(
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
var DrawerPanel = React24.forwardRef(DrawerPanelRoot);
function DrawerDismissTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.drawerDismissTrigger) ?? drawerDismissTriggerTheme;
  const { open, setOpen } = React24.useContext(DrawerContext);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime23.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": open,
      className: styles,
      onClick: (event) => {
        var _a;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
        if (setOpen) {
          setOpen(false);
        }
      },
      children
    }
  );
}
DrawerDismissTriggerRoot.displayName = "MaterialTailwind.DrawerDismissTrigger";
var DrawerDismissTrigger = React24.forwardRef(
  DrawerDismissTriggerRoot
);
var Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Overlay: DrawerOverlay,
  Panel: DrawerPanel,
  DismissTrigger: DrawerDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-ERVJILQN.js
var React25 = __toESM(require_react(), 1);
var import_material_ripple_effects6 = __toESM(require_material_ripple_effects(), 1);
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
function IconButtonRoot({
  as,
  color,
  variant,
  size: size2,
  ripple,
  isCircular,
  className,
  children,
  ...props
}, ref) {
  const Component = as ?? "button";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.iconButton) ?? iconButtonTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  isCircular ?? (isCircular = (defaultProps == null ? void 0 : defaultProps.isCircular) ?? false);
  const rippleEffect = ripple !== void 0 && new import_material_ripple_effects6.default();
  const handleClick = (e) => {
    const onClick = props == null ? void 0 : props.onClick;
    const isDarkRipple = variant === "ghost" || color === "secondary";
    if (ripple) {
      rippleEffect.create(e, isDarkRipple ? "dark" : "light");
    }
    return typeof onClick === "function" && onClick(e);
  };
  const styles = twMerge(
    theme2.baseStyle,
    theme2["size"][size2],
    theme2["variant"][variant][color],
    className
  );
  return (0, import_jsx_runtime24.jsx)(
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
var IconButton = React25.forwardRef(IconButtonRoot);

// node_modules/@material-tailwind/react/dist/chunk-YK3RJFJS.js
var React26 = __toESM(require_react(), 1);
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
var AccordionContext = React26.createContext({
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
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  type ?? (type = (defaultProps == null ? void 0 : defaultProps.type) ?? "single");
  const accordionValue = value || defaultValue;
  const [uncontrolledActiveItem, setUncontrolledActiveItem] = React26.useState("");
  const activeItem = value || uncontrolledActiveItem;
  const setActiveItem = onValueChange || setUncontrolledActiveItem;
  React26.useEffect(() => {
    setActiveItem(accordionValue);
  }, [accordionValue]);
  const contextValue = React26.useMemo(
    () => ({
      type,
      activeItem,
      setActiveItem
    }),
    [type, activeItem, setActiveItem]
  );
  return (0, import_jsx_runtime25.jsx)(AccordionContext.Provider, { value: contextValue, children });
}
AccordionRoot.displayName = "MaterialTailwind.Accordion";
var AccordionItemContext = React26.createContext("");
function AccordionItemRoot({ as, value, disabled, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordionItem || accordionItemTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const { type, activeItem } = React26.useContext(AccordionContext);
  disabled ?? (disabled = (defaultProps == null ? void 0 : defaultProps.disabled) ?? false);
  const isMultiple = type === "multiple";
  const isOpen = isMultiple ? activeItem == null ? void 0 : activeItem.includes(value) : activeItem === value;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime25.jsx)(AccordionItemContext.Provider, { value, children: (0, import_jsx_runtime25.jsx)(
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
var AccordionItem = React26.forwardRef(AccordionItemRoot);
function AccordionTriggerRoot({ as, className, children, ...props }, ref) {
  const Component = as || "button";
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordionTrigger || accordionTriggerTheme;
  const value = React26.useContext(AccordionItemContext);
  const { type, activeItem, setActiveItem } = React26.useContext(AccordionContext);
  const isMultiple = type === "multiple";
  const isOpen = isMultiple ? activeItem == null ? void 0 : activeItem.includes(value) : activeItem === value;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime25.jsx)(
    Component,
    {
      ...props,
      ref,
      "data-open": isOpen,
      className: styles,
      onClick: (event) => {
        var _a;
        if (isMultiple) {
          if (activeItem == null ? void 0 : activeItem.includes(value)) {
            setActiveItem == null ? void 0 : setActiveItem(
              (prev) => prev.filter((item) => item !== value)
            );
          } else {
            setActiveItem == null ? void 0 : setActiveItem((prev) => [...prev, value]);
          }
        } else {
          setActiveItem == null ? void 0 : setActiveItem((prev) => prev === value ? "" : value);
        }
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
      },
      children
    }
  );
}
AccordionTriggerRoot.displayName = "MaterialTailwind.AccordionTrigger";
var AccordionTrigger = React26.forwardRef(AccordionTriggerRoot);
function AccordionContentRoot({ as, className, children, ...props }, ref) {
  const Component = as || "div";
  const contextTheme = useTheme();
  const theme2 = contextTheme.accordionContent || accordionContentTheme;
  const value = React26.useContext(AccordionItemContext);
  const { type, activeItem } = React26.useContext(AccordionContext);
  const isMultiple = type === "multiple";
  const isOpen = isMultiple ? activeItem == null ? void 0 : activeItem.includes(value) : activeItem === value;
  const styles = twMerge(theme2.baseStyle, className);
  return isOpen ? (0, import_jsx_runtime25.jsx)(Component, { ...props, ref, className: styles, "data-open": isOpen, children }) : null;
}
AccordionContentRoot.displayName = "MaterialTailwind.AccordionContent";
var AccordionContent = React26.forwardRef(AccordionContentRoot);
var Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
});

// node_modules/@material-tailwind/react/dist/chunk-BZAXDA4P.js
var React27 = __toESM(require_react(), 1);
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var AlertContext = React27.createContext({
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.alert) ?? alertTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  const [uncontrolledOpen, setUncontrolledOpen] = React27.useState(true);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  isPill ?? (isPill = (defaultProps == null ? void 0 : defaultProps.isPill) ?? false);
  const styles = twMerge(
    theme2.baseStyle,
    theme2["variant"][variant][color],
    className
  );
  const contextValue = React27.useMemo(
    () => ({
      color,
      variant,
      isPill,
      open,
      setOpen
    }),
    [color, variant, isPill, open, setOpen]
  );
  return open ? (0, import_jsx_runtime26.jsx)(
    Component,
    {
      ...props,
      ref,
      role: "alert",
      "data-open": open,
      "data-pill": isPill,
      className: styles,
      children: (0, import_jsx_runtime26.jsx)(AlertContext.Provider, { value: contextValue, children })
    }
  ) : null;
}
AlertRootBase.displayName = "MaterialTailwind.Alert";
var AlertRoot = React27.forwardRef(AlertRootBase);
function AlertContentRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.alertContent) ?? alertContentTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime26.jsx)(Component, { ...props, ref, className: styles, children });
}
AlertContentRoot.displayName = "MaterialTailwind.AlertContent";
var AlertContent = React27.forwardRef(AlertContentRoot);
function AlertIconRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.alertIcon) ?? alertIconTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime26.jsx)(Component, { ...props, ref, className: styles, children });
}
AlertIconRoot.displayName = "MaterialTailwind.AlertIcon";
var AlertIcon = React27.forwardRef(AlertIconRoot);
function AlertDismissTriggerRoot({ as, ripple, className, children, ...props }, ref) {
  const Component = as ?? "button";
  const contextTheme = useTheme();
  const { setOpen } = React27.useContext(AlertContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.alertDismissTrigger) ?? alertDismissTriggerTheme;
  const styles = children ? className : twMerge(theme2.baseStyle, className);
  function closeAlert(event) {
    var _a;
    setOpen == null ? void 0 : setOpen(false);
    (_a = props.onClick) == null ? void 0 : _a.call(props, event);
  }
  return (0, import_jsx_runtime26.jsx)(Component, { ...props, ref, className: styles, onClick: closeAlert, children: children || (0, import_jsx_runtime26.jsx)(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      color: "currentColor",
      className: "m-1 h-5 w-5 stroke-2",
      children: (0, import_jsx_runtime26.jsx)(
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
var AlertDismissTrigger = React27.forwardRef(
  AlertDismissTriggerRoot
);
var Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Content: AlertContent,
  DismissTrigger: AlertDismissTrigger
});

// node_modules/@material-tailwind/react/dist/chunk-2B5ROVH4.js
var React28 = __toESM(require_react(), 1);
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
function AvatarRoot({ as, src, alt, shape, size: size2, className, ...props }, ref) {
  const Component = as ?? "img";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.avatar) ?? avatarTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  shape ?? (shape = (defaultProps == null ? void 0 : defaultProps.shape) ?? "circular");
  const styles = twMerge(theme2.baseStyle, theme2["size"][size2], className);
  return (0, import_jsx_runtime27.jsx)(
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
var Avatar = React28.forwardRef(AvatarRoot);

// node_modules/@material-tailwind/react/dist/chunk-G5X27O3A.js
var React29 = __toESM(require_react(), 1);
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
var BadgeContext = React29.createContext({
  color: "primary",
  overlap: "square",
  placement: "top-end"
});
function BadgeRootBase({ as, color, overlap, placement, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.badge) ?? badgeTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  overlap ?? (overlap = (defaultProps == null ? void 0 : defaultProps.overlap) ?? "square");
  placement ?? (placement = (defaultProps == null ? void 0 : defaultProps.placement) ?? "top-end");
  const styles = twMerge(theme2.baseStyle, className);
  const contextValue = React29.useMemo(
    () => ({
      color,
      overlap,
      placement
    }),
    [color, overlap, placement]
  );
  return (0, import_jsx_runtime28.jsx)(Component, { ...props, ref, className: styles, children: (0, import_jsx_runtime28.jsx)(BadgeContext.Provider, { value: contextValue, children }) });
}
BadgeRootBase.displayName = "MaterialTailwind.Badge";
var BadgeRoot = React29.forwardRef(BadgeRootBase);
function BadgeContentRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "div";
  const contextTheme = useTheme();
  const theme2 = (contextTheme == null ? void 0 : contextTheme.badgeContent) ?? badgeContentTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime28.jsx)(Component, { ...props, ref, className: styles, children });
}
BadgeContentRoot.displayName = "MaterialTailwind.BadgeContent";
var BadgeContent = React29.forwardRef(BadgeContentRoot);
function BadgeIndicatorRoot({ as, className, children, ...props }, ref) {
  const Component = as ?? "span";
  const contextTheme = useTheme();
  const { overlap, placement, color } = React29.useContext(BadgeContext);
  const theme2 = (contextTheme == null ? void 0 : contextTheme.badgeIndicator) ?? badgeIndicatorTheme;
  const styles = twMerge(
    theme2.baseStyle,
    theme2.color[color || "primary"],
    className
  );
  return (0, import_jsx_runtime28.jsx)(
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
var BadgeIndicator = React29.forwardRef(BadgeIndicatorRoot);
var Badge = Object.assign(BadgeRoot, {
  Content: BadgeContent,
  Indicator: BadgeIndicator
});

// node_modules/@material-tailwind/react/dist/chunk-7NW3TT2S.js
var React30 = __toESM(require_react(), 1);
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
function BreadcrumbRootBase({ as, className, children, ...props }, ref) {
  const Component = as || "nav";
  const contextTheme = useTheme();
  const theme2 = contextTheme.breadcrumb || breadcrumbTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime29.jsx)(Component, { ...props, ref, className: styles, children });
}
BreadcrumbRootBase.displayName = "MaterialTailwind.Breadcrumb";
var BreadcrumbRoot = React30.forwardRef(BreadcrumbRootBase);
function BreadcrumbLinkRoot({ as, className, children, ...props }, ref) {
  const Component = as || "a";
  const contextTheme = useTheme();
  const theme2 = contextTheme.breadcrumbLink || breadcrumbLinkTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime29.jsx)(Component, { ...props, ref, className: styles, children });
}
BreadcrumbLinkRoot.displayName = "MaterialTailwind.BreadcrumbLink";
var BreadcrumbLink = React30.forwardRef(BreadcrumbLinkRoot);
function BreadcrumbSeparatorRoot({ as, className, children, ...props }, ref) {
  const Component = as || "span";
  const contextTheme = useTheme();
  const theme2 = contextTheme.breadcrumbSeparator || breadcrumbSeparatorTheme;
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime29.jsx)(Component, { ...props, ref, className: styles, children: children || "/" });
}
BreadcrumbSeparatorRoot.displayName = "MaterialTailwind.BreadcrumbSeparator";
var BreadcrumbSeparator = React30.forwardRef(
  BreadcrumbSeparatorRoot
);
var Breadcrumb = Object.assign(BreadcrumbRoot, {
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator
});

// node_modules/@material-tailwind/react/dist/chunk-UIGTWEVF.js
var React31 = __toESM(require_react(), 1);
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
function ButtonGroupRoot({
  as,
  color,
  variant,
  size: size2,
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
  const theme2 = (contextTheme == null ? void 0 : contextTheme.buttonGroup) ?? buttonGroupTheme;
  const defaultProps = theme2 == null ? void 0 : theme2.defaultProps;
  size2 ?? (size2 = (defaultProps == null ? void 0 : defaultProps.size) ?? "md");
  ripple ?? (ripple = (defaultProps == null ? void 0 : defaultProps.ripple) ?? true);
  color ?? (color = (defaultProps == null ? void 0 : defaultProps.color) ?? "primary");
  variant ?? (variant = (defaultProps == null ? void 0 : defaultProps.variant) ?? "solid");
  orientation ?? (orientation = (defaultProps == null ? void 0 : defaultProps.orientation) ?? "horizontal");
  isFullWidth ?? (isFullWidth = (defaultProps == null ? void 0 : defaultProps.isFullWidth) ?? false);
  isPill ?? (isPill = (defaultProps == null ? void 0 : defaultProps.isPill) ?? false);
  const styles = twMerge(theme2.baseStyle, className);
  return (0, import_jsx_runtime30.jsx)(
    Component,
    {
      ...props,
      ref,
      className: styles,
      "data-variant": variant,
      "data-orientation": orientation,
      "data-shape": isPill ? "pill" : "default",
      "data-width": isFullWidth ? "full" : "default",
      children: React31.Children.map(
        children,
        (child) => React31.isValidElement(child) && React31.cloneElement(child, {
          variant,
          size: size2,
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
var ButtonGroup = React31.forwardRef(ButtonGroupRoot);
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
