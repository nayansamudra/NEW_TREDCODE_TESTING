/*
 Highstock JS v11.1.0 (2023-06-05)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (S, L) {
  "object" === typeof module && module.exports
    ? ((L["default"] = L), (module.exports = S.document ? L(S) : L))
    : "function" === typeof define && define.amd
    ? define("highcharts/highstock", function () {
        return L(S);
      })
    : (S.Highcharts && S.Highcharts.error(16, !0), (S.Highcharts = L(S)));
})("undefined" !== typeof window ? window : this, function (S) {
  function L(a, A, J, K) {
    a.hasOwnProperty(A) ||
      ((a[A] = K.apply(null, J)),
      "function" === typeof CustomEvent &&
        S.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: A, module: a[A] },
          })
        ));
  }
  var a = {};
  L(a, "Core/Globals.js", [], function () {
    var a;
    (function (a) {
      a.SVG_NS = "http://www.w3.org/2000/svg";
      a.product = "Highcharts";
      a.version = "11.1.0";
      a.win = "undefined" !== typeof S ? S : {};
      a.doc = a.win.document;
      a.svg =
        a.doc &&
        a.doc.createElementNS &&
        !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
      a.userAgent = (a.win.navigator && a.win.navigator.userAgent) || "";
      a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
      a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
      a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
      a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
      a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent);
      a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
      a.deg2rad = (2 * Math.PI) / 360;
      a.hasBidiBug =
        a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
      a.hasTouch = !!a.win.TouchEvent;
      a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      a.noop = function () {};
      a.supportsPassiveEvents = (function () {
        let u = !1;
        if (!a.isMS) {
          const A = Object.defineProperty({}, "passive", {
            get: function () {
              u = !0;
            },
          });
          a.win.addEventListener &&
            a.win.removeEventListener &&
            (a.win.addEventListener("testPassive", a.noop, A),
            a.win.removeEventListener("testPassive", a.noop, A));
        }
        return u;
      })();
      a.charts = [];
      a.dateFormats = {};
      a.seriesTypes = {};
      a.symbolSizes = {};
      a.chartCount = 0;
    })(a || (a = {}));
    ("");
    return a;
  });
  L(a, "Core/Utilities.js", [a["Core/Globals.js"]], function (a) {
    function u(c, b, d, z) {
      const k = b ? "Highcharts error" : "Highcharts warning";
      32 === c && (c = `${k}: Deprecated member`);
      const w = t(c);
      let r = w ? `${k} #${c}: www.highcharts.com/errors/${c}/` : c.toString();
      if ("undefined" !== typeof z) {
        let c = "";
        w && (r += "?");
        M(z, function (b, k) {
          c += `\n - ${k}: ${b}`;
          w && (r += encodeURI(k) + "=" + encodeURI(b));
        });
        r += c;
      }
      f(
        a,
        "displayError",
        { chart: d, code: c, message: r, params: z },
        function () {
          if (b) throw Error(r);
          l.console && -1 === u.messages.indexOf(r) && console.warn(r);
        }
      );
      u.messages.push(r);
    }
    function J(c, b) {
      return parseInt(c, b || 10);
    }
    function K(c) {
      return "string" === typeof c;
    }
    function G(c) {
      c = Object.prototype.toString.call(c);
      return "[object Array]" === c || "[object Array Iterator]" === c;
    }
    function D(c, b) {
      return !!c && "object" === typeof c && (!b || !G(c));
    }
    function E(c) {
      return D(c) && "number" === typeof c.nodeType;
    }
    function B(c) {
      const b = c && c.constructor;
      return !(!D(c, !0) || E(c) || !b || !b.name || "Object" === b.name);
    }
    function t(c) {
      return (
        "number" === typeof c && !isNaN(c) && Infinity > c && -Infinity < c
      );
    }
    function q(c) {
      return "undefined" !== typeof c && null !== c;
    }
    function m(c, b, d) {
      const k = K(b) && !q(d);
      let F;
      const w = (b, d) => {
        q(b)
          ? c.setAttribute(d, b)
          : k
          ? (F = c.getAttribute(d)) ||
            "class" !== d ||
            (F = c.getAttribute(d + "Name"))
          : c.removeAttribute(d);
      };
      K(b) ? w(d, b) : M(b, w);
      return F;
    }
    function p(c) {
      return G(c) ? c : [c];
    }
    function n(c, b) {
      let k;
      c || (c = {});
      for (k in b) c[k] = b[k];
      return c;
    }
    function h() {
      const c = arguments,
        b = c.length;
      for (let k = 0; k < b; k++) {
        const b = c[k];
        if ("undefined" !== typeof b && null !== b) return b;
      }
    }
    function g(c, b) {
      a.isMS &&
        !a.svg &&
        b &&
        q(b.opacity) &&
        (b.filter = `alpha(opacity=${100 * b.opacity})`);
      n(c.style, b);
    }
    function e(c) {
      return Math.pow(10, Math.floor(Math.log(c) / Math.LN10));
    }
    function x(c, b) {
      return 1e14 < c ? c : parseFloat(c.toPrecision(b || 14));
    }
    function I(c, b, d) {
      let k;
      if ("width" === b)
        return (
          (b = Math.min(c.offsetWidth, c.scrollWidth)),
          (d = c.getBoundingClientRect && c.getBoundingClientRect().width),
          d < b && d >= b - 1 && (b = Math.floor(d)),
          Math.max(
            0,
            b -
              (I(c, "padding-left", !0) || 0) -
              (I(c, "padding-right", !0) || 0)
          )
        );
      if ("height" === b)
        return Math.max(
          0,
          Math.min(c.offsetHeight, c.scrollHeight) -
            (I(c, "padding-top", !0) || 0) -
            (I(c, "padding-bottom", !0) || 0)
        );
      if ((c = l.getComputedStyle(c, void 0)))
        (k = c.getPropertyValue(b)), h(d, "opacity" !== b) && (k = J(k));
      return k;
    }
    function M(c, b, d) {
      for (const k in c)
        Object.hasOwnProperty.call(c, k) && b.call(d || c[k], c[k], k, c);
    }
    function C(c, b, d) {
      function k(b, k) {
        const d = c.removeEventListener;
        d && d.call(c, b, k, !1);
      }
      function F(d) {
        let F, w;
        c.nodeName &&
          (b ? ((F = {}), (F[b] = !0)) : (F = d),
          M(F, function (c, b) {
            if (d[b]) for (w = d[b].length; w--; ) k(b, d[b][w].fn);
          }));
      }
      var w = ("function" === typeof c && c.prototype) || c;
      if (Object.hasOwnProperty.call(w, "hcEvents")) {
        const c = w.hcEvents;
        b
          ? ((w = c[b] || []),
            d
              ? ((c[b] = w.filter(function (c) {
                  return d !== c.fn;
                })),
                k(b, d))
              : (F(c), (c[b] = [])))
          : (F(c), delete w.hcEvents);
      }
    }
    function f(c, b, d, f) {
      d = d || {};
      if (r.createEvent && (c.dispatchEvent || (c.fireEvent && c !== a))) {
        var k = r.createEvent("Events");
        k.initEvent(b, !0, !0);
        d = n(k, d);
        c.dispatchEvent ? c.dispatchEvent(d) : c.fireEvent(b, d);
      } else if (c.hcEvents) {
        d.target ||
          n(d, {
            preventDefault: function () {
              d.defaultPrevented = !0;
            },
            target: c,
            type: b,
          });
        k = [];
        let F = c,
          w = !1;
        for (; F.hcEvents; )
          Object.hasOwnProperty.call(F, "hcEvents") &&
            F.hcEvents[b] &&
            (k.length && (w = !0), k.unshift.apply(k, F.hcEvents[b])),
            (F = Object.getPrototypeOf(F));
        w && k.sort((c, b) => c.order - b.order);
        k.forEach((b) => {
          !1 === b.fn.call(c, d) && d.preventDefault();
        });
      }
      f && !d.defaultPrevented && f.call(c, d);
    }
    const { charts: y, doc: r, win: l } = a;
    (u || (u = {})).messages = [];
    Math.easeInOutSine = function (c) {
      return -0.5 * (Math.cos(Math.PI * c) - 1);
    };
    var v = Array.prototype.find
      ? function (c, b) {
          return c.find(b);
        }
      : function (c, b) {
          let k;
          const d = c.length;
          for (k = 0; k < d; k++) if (b(c[k], k)) return c[k];
        };
    M(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (c, b) {
        a[b] = function (k) {
          u(32, !1, void 0, { [`Highcharts.${b}`]: `use Array.${c}` });
          return Array.prototype[c].apply(k, [].slice.call(arguments, 1));
        };
      }
    );
    let d;
    const b = (function () {
      const c = Math.random().toString(36).substring(2, 9) + "-";
      let b = 0;
      return function () {
        return "highcharts-" + (d ? "" : c) + b++;
      };
    })();
    l.jQuery &&
      (l.jQuery.fn.highcharts = function () {
        const c = [].slice.call(arguments);
        if (this[0])
          return c[0]
            ? (new a[K(c[0]) ? c.shift() : "Chart"](this[0], c[0], c[1]), this)
            : y[m(this[0], "data-highcharts-chart")];
      });
    v = {
      addEvent: function (c, b, d, f = {}) {
        var k = ("function" === typeof c && c.prototype) || c;
        Object.hasOwnProperty.call(k, "hcEvents") || (k.hcEvents = {});
        k = k.hcEvents;
        a.Point &&
          c instanceof a.Point &&
          c.series &&
          c.series.chart &&
          (c.series.chart.runTrackerClick = !0);
        const w = c.addEventListener;
        w &&
          w.call(
            c,
            b,
            d,
            a.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === f.passive
                      ? -1 !== b.indexOf("touch")
                      : f.passive,
                  capture: !1,
                }
              : !1
          );
        k[b] || (k[b] = []);
        k[b].push({
          fn: d,
          order: "number" === typeof f.order ? f.order : Infinity,
        });
        k[b].sort((c, b) => c.order - b.order);
        return function () {
          C(c, b, d);
        };
      },
      arrayMax: function (c) {
        let b = c.length,
          d = c[0];
        for (; b--; ) c[b] > d && (d = c[b]);
        return d;
      },
      arrayMin: function (c) {
        let b = c.length,
          d = c[0];
        for (; b--; ) c[b] < d && (d = c[b]);
        return d;
      },
      attr: m,
      clamp: function (c, b, d) {
        return c > b ? (c < d ? c : d) : b;
      },
      clearTimeout: function (c) {
        q(c) && clearTimeout(c);
      },
      correctFloat: x,
      createElement: function (c, b, d, f, F) {
        c = r.createElement(c);
        b && n(c, b);
        F && g(c, { padding: "0", border: "none", margin: "0" });
        d && g(c, d);
        f && f.appendChild(c);
        return c;
      },
      css: g,
      defined: q,
      destroyObjectProperties: function (c, b) {
        M(c, function (k, d) {
          k && k !== b && k.destroy && k.destroy();
          delete c[d];
        });
      },
      diffObjects: function (c, b, d, f) {
        function k(c, b, F, w) {
          const H = d ? b : c;
          M(c, function (d, l) {
            if (!w && f && -1 < f.indexOf(l) && b[l]) {
              d = p(d);
              F[l] = [];
              for (let c = 0; c < Math.max(d.length, b[l].length); c++)
                b[l][c] &&
                  (void 0 === d[c]
                    ? (F[l][c] = b[l][c])
                    : ((F[l][c] = {}), k(d[c], b[l][c], F[l][c], w + 1)));
            } else if (D(d, !0) && !d.nodeType)
              (F[l] = G(d) ? [] : {}),
                k(d, b[l] || {}, F[l], w + 1),
                0 !== Object.keys(F[l]).length ||
                  ("colorAxis" === l && 0 === w) ||
                  delete F[l];
            else if (c[l] !== b[l] || (l in c && !(l in b))) F[l] = H[l];
          });
        }
        const w = {};
        k(c, b, w, 0);
        return w;
      },
      discardElement: function (c) {
        c && c.parentElement && c.parentElement.removeChild(c);
      },
      erase: function (c, b) {
        let k = c.length;
        for (; k--; )
          if (c[k] === b) {
            c.splice(k, 1);
            break;
          }
      },
      error: u,
      extend: n,
      extendClass: function (c, b) {
        const k = function () {};
        k.prototype = new c();
        n(k.prototype, b);
        return k;
      },
      find: v,
      fireEvent: f,
      getClosestDistance: function (c, b) {
        const k = !b;
        let d, F, f, l;
        c.forEach((c) => {
          if (1 < c.length)
            for (l = F = c.length - 1; 0 < l; l--)
              (f = c[l] - c[l - 1]),
                0 > f && !k
                  ? (null === b || void 0 === b ? void 0 : b(), (b = void 0))
                  : f && ("undefined" === typeof d || f < d) && (d = f);
        });
        return d;
      },
      getMagnitude: e,
      getNestedProperty: function (c, b) {
        for (c = c.split("."); c.length && q(b); ) {
          const d = c.shift();
          if ("undefined" === typeof d || "__proto__" === d) return;
          if ("this" === d) {
            let c;
            D(b) && (c = b["@this"]);
            return null !== c && void 0 !== c ? c : b;
          }
          b = b[d];
          if (
            !q(b) ||
            "function" === typeof b ||
            "number" === typeof b.nodeType ||
            b === l
          )
            return;
        }
        return b;
      },
      getStyle: I,
      inArray: function (c, b, d) {
        u(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return b.indexOf(c, d);
      },
      insertItem: function (c, b) {
        const d = c.options.index,
          k = b.length;
        let F;
        for (F = c.options.isInternal ? k : 0; F < k + 1; F++)
          if (
            !b[F] ||
            (t(d) && d < h(b[F].options.index, b[F]._i)) ||
            b[F].options.isInternal
          ) {
            b.splice(F, 0, c);
            break;
          }
        return F;
      },
      isArray: G,
      isClass: B,
      isDOMElement: E,
      isFunction: function (b) {
        return "function" === typeof b;
      },
      isNumber: t,
      isObject: D,
      isString: K,
      keys: function (b) {
        u(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(b);
      },
      merge: function () {
        let b,
          d = arguments,
          f = {};
        const l = function (b, c) {
          "object" !== typeof b && (b = {});
          M(c, function (d, k) {
            "__proto__" !== k &&
              "constructor" !== k &&
              (!D(d, !0) || B(d) || E(d)
                ? (b[k] = c[k])
                : (b[k] = l(b[k] || {}, d)));
          });
          return b;
        };
        !0 === d[0] && ((f = d[1]), (d = Array.prototype.slice.call(d, 2)));
        const F = d.length;
        for (b = 0; b < F; b++) f = l(f, d[b]);
        return f;
      },
      normalizeTickInterval: function (b, d, f, l, F) {
        let c = b;
        f = h(f, e(b));
        const k = b / f;
        d ||
          ((d = F
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === l &&
            (1 === f
              ? (d = d.filter(function (b) {
                  return 0 === b % 1;
                }))
              : 0.1 >= f && (d = [1 / f])));
        for (
          l = 0;
          l < d.length &&
          !((c = d[l]),
          (F && c * f >= b) || (!F && k <= (d[l] + (d[l + 1] || d[l])) / 2));
          l++
        );
        return (c = x(c * f, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: M,
      offset: function (b) {
        const c = r.documentElement;
        b =
          b.parentElement || b.parentNode
            ? b.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: b.top + (l.pageYOffset || c.scrollTop) - (c.clientTop || 0),
          left: b.left + (l.pageXOffset || c.scrollLeft) - (c.clientLeft || 0),
          width: b.width,
          height: b.height,
        };
      },
      pad: function (b, d, f) {
        return (
          Array((d || 2) + 1 - String(b).replace("-", "").length).join(
            f || "0"
          ) + b
        );
      },
      pick: h,
      pInt: J,
      pushUnique: function (b, d) {
        return 0 > b.indexOf(d) && !!b.push(d);
      },
      relativeLength: function (b, d, f) {
        return /%$/.test(b)
          ? (d * parseFloat(b)) / 100 + (f || 0)
          : parseFloat(b);
      },
      removeEvent: C,
      splat: p,
      stableSort: function (b, d) {
        const c = b.length;
        let k, F;
        for (F = 0; F < c; F++) b[F].safeI = F;
        b.sort(function (b, c) {
          k = d(b, c);
          return 0 === k ? b.safeI - c.safeI : k;
        });
        for (F = 0; F < c; F++) delete b[F].safeI;
      },
      syncTimeout: function (b, d, f) {
        if (0 < d) return setTimeout(b, d, f);
        b.call(0, f);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: b,
      useSerialIds: function (b) {
        return (d = h(b, d));
      },
      wrap: function (b, d, f) {
        const c = b[d];
        b[d] = function () {
          const b = arguments,
            d = this;
          return f.apply(
            this,
            [
              function () {
                return c.apply(d, arguments.length ? arguments : b);
              },
            ].concat([].slice.call(arguments))
          );
        };
      },
    };
    ("");
    return v;
  });
  L(a, "Core/Chart/ChartDefaults.js", [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: "x" },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 },
      },
      reflow: !0,
      type: "line",
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: { zIndex: 6 },
          position: { align: "right", x: -10, y: 10 },
        },
      },
      width: null,
      height: null,
      borderColor: "#334eff",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
    };
  });
  L(
    a,
    "Core/Color/Color.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A) {
      const { isNumber: u, merge: K, pInt: G } = A;
      class D {
        static parse(a) {
          return a ? new D(a) : D.None;
        }
        constructor(u) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = u;
          const B = a.Color;
          if (B && B !== D) return new B(u);
          this.init(u);
        }
        init(a) {
          let B;
          let t;
          if ("object" === typeof a && "undefined" !== typeof a.stops)
            this.stops = a.stops.map((m) => new D(m[1]));
          else if ("string" === typeof a) {
            this.input = a = D.names[a.toLowerCase()] || a;
            if ("#" === a.charAt(0)) {
              var q = a.length;
              var m = parseInt(a.substr(1), 16);
              7 === q
                ? (B = [(m & 16711680) >> 16, (m & 65280) >> 8, m & 255, 1])
                : 4 === q &&
                  (B = [
                    ((m & 3840) >> 4) | ((m & 3840) >> 8),
                    ((m & 240) >> 4) | (m & 240),
                    ((m & 15) << 4) | (m & 15),
                    1,
                  ]);
            }
            if (!B)
              for (m = D.parsers.length; m-- && !B; )
                (t = D.parsers[m]), (q = t.regex.exec(a)) && (B = t.parse(q));
          }
          B && (this.rgba = B);
        }
        get(a) {
          const B = this.input,
            t = this.rgba;
          if ("object" === typeof B && "undefined" !== typeof this.stops) {
            const q = K(B);
            q.stops = [].slice.call(q.stops);
            this.stops.forEach((m, p) => {
              q.stops[p] = [q.stops[p][0], m.get(a)];
            });
            return q;
          }
          return t && u(t[0])
            ? "rgb" === a || (!a && 1 === t[3])
              ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
              : "a" === a
              ? `${t[3]}`
              : "rgba(" + t.join(",") + ")"
            : B;
        }
        brighten(a) {
          const B = this.rgba;
          if (this.stops)
            this.stops.forEach(function (t) {
              t.brighten(a);
            });
          else if (u(a) && 0 !== a)
            for (let t = 0; 3 > t; t++)
              (B[t] += G(255 * a)),
                0 > B[t] && (B[t] = 0),
                255 < B[t] && (B[t] = 255);
          return this;
        }
        setOpacity(a) {
          this.rgba[3] = a;
          return this;
        }
        tweenTo(a, B) {
          const t = this.rgba,
            q = a.rgba;
          if (!u(t[0]) || !u(q[0])) return a.input || "none";
          a = 1 !== q[3] || 1 !== t[3];
          return (
            (a ? "rgba(" : "rgb(") +
            Math.round(q[0] + (t[0] - q[0]) * (1 - B)) +
            "," +
            Math.round(q[1] + (t[1] - q[1]) * (1 - B)) +
            "," +
            Math.round(q[2] + (t[2] - q[2]) * (1 - B)) +
            (a ? "," + (q[3] + (t[3] - q[3]) * (1 - B)) : "") +
            ")"
          );
        }
      }
      D.names = { white: "#ffffff", black: "#000000" };
      D.parsers = [
        {
          regex:
            /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
          parse: function (a) {
            return [G(a[1]), G(a[2]), G(a[3]), parseFloat(a[4], 10)];
          },
        },
        {
          regex:
            /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
          parse: function (a) {
            return [G(a[1]), G(a[2]), G(a[3]), 1];
          },
        },
      ];
      D.None = new D("");
      ("");
      return D;
    }
  );
  L(a, "Core/Color/Palettes.js", [], function () {
    return {
      colors:
        "#2caffe #544fc5 #00e272 #fe6a35 #6b8abc #d568fb #2ee0ca #fa4b42 #feb56a #91e8e1".split(
          " "
        ),
    };
  });
  L(
    a,
    "Core/Time.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A) {
      const { win: u } = a,
        {
          defined: K,
          error: G,
          extend: D,
          isObject: E,
          merge: B,
          objectEach: t,
          pad: q,
          pick: m,
          splat: p,
          timeUnits: n,
        } = A,
        h = a.isSafari && u.Intl && u.Intl.DateTimeFormat.prototype.formatRange,
        g =
          a.isSafari && u.Intl && !u.Intl.DateTimeFormat.prototype.formatRange;
      class e {
        constructor(x) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = u.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(x);
        }
        get(x, e) {
          if (this.variableTimezone || this.timezoneOffset) {
            const g = e.getTime(),
              h = g - this.getTimezoneOffset(e);
            e.setTime(h);
            x = e["getUTC" + x]();
            e.setTime(g);
            return x;
          }
          return this.useUTC ? e["getUTC" + x]() : e["get" + x]();
        }
        set(x, e, g) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === x ||
              "Seconds" === x ||
              ("Minutes" === x && 0 === this.getTimezoneOffset(e) % 36e5)
            )
              return e["setUTC" + x](g);
            var I = this.getTimezoneOffset(e);
            I = e.getTime() - I;
            e.setTime(I);
            e["setUTC" + x](g);
            x = this.getTimezoneOffset(e);
            I = e.getTime() + x;
            return e.setTime(I);
          }
          return this.useUTC || (h && "FullYear" === x)
            ? e["setUTC" + x](g)
            : e["set" + x](g);
        }
        update(e = {}) {
          const x = m(e.useUTC, !0);
          this.options = e = B(!0, this.options, e);
          this.Date = e.Date || u.Date || Date;
          this.timezoneOffset =
            ((this.useUTC = x) && e.timezoneOffset) || void 0;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = x && !(!e.getTimezoneOffset && !e.timezone);
        }
        makeTime(e, h, n, q, f, y) {
          let r, l, v;
          this.useUTC
            ? ((r = this.Date.UTC.apply(0, arguments)),
              (l = this.getTimezoneOffset(r)),
              (r += l),
              (v = this.getTimezoneOffset(r)),
              l !== v
                ? (r += v - l)
                : l - 36e5 !== this.getTimezoneOffset(r - 36e5) ||
                  g ||
                  (r -= 36e5))
            : (r = new this.Date(
                e,
                h,
                m(n, 1),
                m(q, 0),
                m(f, 0),
                m(y, 0)
              ).getTime());
          return r;
        }
        timezoneOffsetFunction() {
          const e = this,
            g = this.options,
            h = g.getTimezoneOffset,
            n = g.moment || u.moment;
          if (!this.useUTC)
            return function (f) {
              return 6e4 * new Date(f.toString()).getTimezoneOffset();
            };
          if (g.timezone) {
            if (n)
              return function (f) {
                return 6e4 * -n.tz(f, g.timezone).utcOffset();
              };
            G(25);
          }
          return this.useUTC && h
            ? function (f) {
                return 6e4 * h(f.valueOf());
              }
            : function () {
                return 6e4 * (e.timezoneOffset || 0);
              };
        }
        dateFormat(e, g, h) {
          if (!K(g) || isNaN(g))
            return (
              (a.defaultOptions.lang && a.defaultOptions.lang.invalidDate) || ""
            );
          e = m(e, "%Y-%m-%d %H:%M:%S");
          const x = this;
          var f = new this.Date(g);
          const y = this.get("Hours", f),
            r = this.get("Day", f),
            l = this.get("Date", f),
            v = this.get("Month", f),
            d = this.get("FullYear", f),
            b = a.defaultOptions.lang,
            c = b && b.weekdays,
            k = b && b.shortWeekdays;
          f = D(
            {
              a: k ? k[r] : c[r].substr(0, 3),
              A: c[r],
              d: q(l),
              e: q(l, 2, " "),
              w: r,
              b: b.shortMonths[v],
              B: b.months[v],
              m: q(v + 1),
              o: v + 1,
              y: d.toString().substr(2, 2),
              Y: d,
              H: q(y),
              k: y,
              I: q(y % 12 || 12),
              l: y % 12 || 12,
              M: q(this.get("Minutes", f)),
              p: 12 > y ? "AM" : "PM",
              P: 12 > y ? "am" : "pm",
              S: q(f.getSeconds()),
              L: q(Math.floor(g % 1e3), 3),
            },
            a.dateFormats
          );
          t(f, function (b, c) {
            for (; -1 !== e.indexOf("%" + c); )
              e = e.replace(
                "%" + c,
                "function" === typeof b ? b.call(x, g) : b
              );
          });
          return h ? e.substr(0, 1).toUpperCase() + e.substr(1) : e;
        }
        resolveDTLFormat(e) {
          return E(e, !0)
            ? e
            : ((e = p(e)), { main: e[0], from: e[1], to: e[2] });
        }
        getTimeTicks(e, g, h, q) {
          const f = this,
            y = [],
            r = {};
          var l = new f.Date(g);
          const v = e.unitRange,
            d = e.count || 1;
          let b;
          q = m(q, 1);
          if (K(g)) {
            f.set(
              "Milliseconds",
              l,
              v >= n.second ? 0 : d * Math.floor(f.get("Milliseconds", l) / d)
            );
            v >= n.second &&
              f.set(
                "Seconds",
                l,
                v >= n.minute ? 0 : d * Math.floor(f.get("Seconds", l) / d)
              );
            v >= n.minute &&
              f.set(
                "Minutes",
                l,
                v >= n.hour ? 0 : d * Math.floor(f.get("Minutes", l) / d)
              );
            v >= n.hour &&
              f.set(
                "Hours",
                l,
                v >= n.day ? 0 : d * Math.floor(f.get("Hours", l) / d)
              );
            v >= n.day &&
              f.set(
                "Date",
                l,
                v >= n.month
                  ? 1
                  : Math.max(1, d * Math.floor(f.get("Date", l) / d))
              );
            if (v >= n.month) {
              f.set(
                "Month",
                l,
                v >= n.year ? 0 : d * Math.floor(f.get("Month", l) / d)
              );
              var c = f.get("FullYear", l);
            }
            v >= n.year && f.set("FullYear", l, c - (c % d));
            v === n.week &&
              ((c = f.get("Day", l)),
              f.set("Date", l, f.get("Date", l) - c + q + (c < q ? -7 : 0)));
            c = f.get("FullYear", l);
            q = f.get("Month", l);
            const k = f.get("Date", l),
              w = f.get("Hours", l);
            g = l.getTime();
            (!f.variableTimezone && f.useUTC) ||
              !K(h) ||
              (b =
                h - g > 4 * n.month ||
                f.getTimezoneOffset(g) !== f.getTimezoneOffset(h));
            g = l.getTime();
            for (l = 1; g < h; )
              y.push(g),
                (g =
                  v === n.year
                    ? f.makeTime(c + l * d, 0)
                    : v === n.month
                    ? f.makeTime(c, q + l * d)
                    : !b || (v !== n.day && v !== n.week)
                    ? b && v === n.hour && 1 < d
                      ? f.makeTime(c, q, k, w + l * d)
                      : g + v * d
                    : f.makeTime(c, q, k + l * d * (v === n.day ? 1 : 7))),
                l++;
            y.push(g);
            v <= n.hour &&
              1e4 > y.length &&
              y.forEach(function (b) {
                0 === b % 18e5 &&
                  "000000000" === f.dateFormat("%H%M%S%L", b) &&
                  (r[b] = "day");
              });
          }
          y.info = D(e, { higherRanks: r, totalRange: v * d });
          return y;
        }
        getDateFormat(e, g, h, q) {
          const f = this.dateFormat("%m-%d %H:%M:%S.%L", g),
            y = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 };
          let r,
            l = "millisecond";
          for (r in n) {
            if (
              e === n.week &&
              +this.dateFormat("%w", g) === h &&
              "00:00:00.000" === f.substr(6)
            ) {
              r = "week";
              break;
            }
            if (n[r] > e) {
              r = l;
              break;
            }
            if (y[r] && f.substr(y[r]) !== "01-01 00:00:00.000".substr(y[r]))
              break;
            "week" !== r && (l = r);
          }
          return this.resolveDTLFormat(q[r]).main;
        }
      }
      ("");
      return e;
    }
  );
  L(
    a,
    "Core/Defaults.js",
    [
      a["Core/Chart/ChartDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Color/Palettes.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D) {
      const { isTouchDevice: u, svg: B } = J,
        { merge: t } = D,
        q = {
          colors: K.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months:
              "January February March April May June July August September October November December".split(
                " "
              ),
            shortMonths:
              "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays:
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              ),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " ",
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: a,
          title: {
            style: { color: "#333333", fontWeight: "bold" },
            text: "Chart title",
            align: "center",
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: {
            style: { color: "#666666", fontSize: "0.8em" },
            text: "",
            align: "center",
            widthAdjust: -44,
          },
          caption: {
            margin: 15,
            style: { color: "#666666", fontSize: "0.8em" },
            text: "",
            align: "left",
            verticalAlign: "bottom",
          },
          plotOptions: {},
          legend: {
            enabled: !0,
            align: "center",
            alignColumns: !0,
            className: "highcharts-no-tooltip",
            layout: "horizontal",
            itemMarginBottom: 2,
            itemMarginTop: 2,
            labelFormatter: function () {
              return this.name;
            },
            borderColor: "#999999",
            borderRadius: 0,
            navigation: {
              style: { fontSize: "0.8em" },
              activeColor: "#0022ff",
              inactiveColor: "#cccccc",
            },
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "0.8em",
              textDecoration: "none",
              textOverflow: "ellipsis",
            },
            itemHoverStyle: { color: "#000000" },
            itemHiddenStyle: {
              color: "#666666",
              textDecoration: "line-through",
            },
            shadow: !1,
            itemCheckboxStyle: {
              position: "absolute",
              width: "13px",
              height: "13px",
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: { style: { fontSize: "0.8em", fontWeight: "bold" } },
          },
          loading: {
            labelStyle: {
              fontWeight: "bold",
              position: "relative",
              top: "45%",
            },
            style: {
              position: "absolute",
              backgroundColor: "#ffffff",
              opacity: 0.5,
              textAlign: "center",
            },
          },
          tooltip: {
            enabled: !0,
            animation: B,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: "%A, %e %b, %H:%M:%S.%L",
              second: "%A, %e %b, %H:%M:%S",
              minute: "%A, %e %b, %H:%M",
              hour: "%A, %e %b, %H:%M",
              day: "%A, %e %b %Y",
              week: "Week from %A, %e %b %Y",
              month: "%B %Y",
              year: "%Y",
            },
            footerFormat: "",
            headerShape: "callout",
            hideDelay: 500,
            padding: 8,
            shape: "callout",
            shared: !1,
            snap: u ? 25 : 10,
            headerFormat:
              '<span style="font-size: 0.8em">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: "#ffffff",
            borderWidth: void 0,
            shadow: !0,
            stickOnContact: !1,
            style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            href: "https://www.highcharts.com?credits",
            position: {
              align: "right",
              x: -10,
              verticalAlign: "bottom",
              y: -5,
            },
            style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" },
            text: "Highcharts.com",
          },
        };
      q.chart.styledMode = !1;
      ("");
      const m = new G(q.time);
      a = {
        defaultOptions: q,
        defaultTime: m,
        getOptions: function () {
          return q;
        },
        setOptions: function (a) {
          t(!0, q, a);
          if (a.time || a.global)
            J.time
              ? J.time.update(t(q.global, q.time, a.global, a.time))
              : (J.time = m);
          return q;
        },
      };
      ("");
      return a;
    }
  );
  L(
    a,
    "Core/Animation/Fx.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A, J) {
      const { parse: u } = a,
        { win: G } = A,
        { isNumber: D, objectEach: E } = J;
      class B {
        constructor(a, q, m) {
          this.pos = NaN;
          this.options = q;
          this.elem = a;
          this.prop = m;
        }
        dSetter() {
          var a = this.paths;
          const q = a && a[0];
          a = a && a[1];
          const m = this.now || 0;
          let p = [];
          if (1 !== m && q && a)
            if (q.length === a.length && 1 > m)
              for (let n = 0; n < a.length; n++) {
                const h = q[n],
                  g = a[n],
                  e = [];
                for (let x = 0; x < g.length; x++) {
                  const a = h[x],
                    n = g[x];
                  D(a) && D(n) && ("A" !== g[0] || (4 !== x && 5 !== x))
                    ? (e[x] = a + m * (n - a))
                    : (e[x] = n);
                }
                p.push(e);
              }
            else p = a;
          else p = this.toD || [];
          this.elem.attr("d", p, void 0, !0);
        }
        update() {
          const a = this.elem,
            q = this.prop,
            m = this.now,
            p = this.options.step;
          if (this[q + "Setter"]) this[q + "Setter"]();
          else
            a.attr
              ? a.element && a.attr(q, m, null, !0)
              : (a.style[q] = m + this.unit);
          p && p.call(a, m, this);
        }
        run(a, q, m) {
          const p = this,
            n = p.options,
            h = function (e) {
              return h.stopped ? !1 : p.step(e);
            },
            g =
              G.requestAnimationFrame ||
              function (e) {
                setTimeout(e, 13);
              },
            e = function () {
              for (let e = 0; e < B.timers.length; e++)
                B.timers[e]() || B.timers.splice(e--, 1);
              B.timers.length && g(e);
            };
          a !== q || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = a),
              (this.end = q),
              (this.unit = m),
              (this.now = this.start),
              (this.pos = 0),
              (h.elem = this.elem),
              (h.prop = this.prop),
              h() && 1 === B.timers.push(h) && g(e))
            : (delete n.curAnim[this.prop],
              n.complete &&
                0 === Object.keys(n.curAnim).length &&
                n.complete.call(this.elem));
        }
        step(a) {
          const q = +new Date(),
            m = this.options,
            p = this.elem,
            n = m.complete,
            h = m.duration,
            g = m.curAnim;
          let e;
          p.attr && !p.element
            ? (a = !1)
            : a || q >= h + this.startTime
            ? ((this.now = this.end),
              (this.pos = 1),
              this.update(),
              (e = g[this.prop] = !0),
              E(g, function (g) {
                !0 !== g && (e = !1);
              }),
              e && n && n.call(p),
              (a = !1))
            : ((this.pos = m.easing((q - this.startTime) / h)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (a = !0));
          return a;
        }
        initPath(a, q, m) {
          function p(f, y) {
            for (; f.length < M; ) {
              var r = f[0];
              const l = y[M - f.length];
              l &&
                "M" === r[0] &&
                (f[0] =
                  "C" === l[0]
                    ? ["C", r[1], r[2], r[1], r[2], r[1], r[2]]
                    : ["L", r[1], r[2]]);
              f.unshift(r);
              e && ((r = f.pop()), f.push(f[f.length - 1], r));
            }
          }
          function n(f, y) {
            for (; f.length < M; )
              if (
                ((y = f[Math.floor(f.length / x) - 1].slice()),
                "C" === y[0] && ((y[1] = y[5]), (y[2] = y[6])),
                e)
              ) {
                const e = f[Math.floor(f.length / x)].slice();
                f.splice(f.length / 2, 0, y, e);
              } else f.push(y);
          }
          const h = a.startX,
            g = a.endX;
          m = m.slice();
          const e = a.isArea,
            x = e ? 2 : 1;
          let I, M, C;
          q = q && q.slice();
          if (!q) return [m, m];
          if (h && g && g.length) {
            for (a = 0; a < h.length; a++)
              if (h[a] === g[0]) {
                I = a;
                break;
              } else if (h[0] === g[g.length - h.length + a]) {
                I = a;
                C = !0;
                break;
              } else if (h[h.length - 1] === g[g.length - h.length + a]) {
                I = h.length - a;
                break;
              }
            "undefined" === typeof I && (q = []);
          }
          q.length &&
            D(I) &&
            ((M = m.length + I * x),
            C ? (p(q, m), n(m, q)) : (p(m, q), n(q, m)));
          return [q, m];
        }
        fillSetter() {
          B.prototype.strokeSetter.apply(this, arguments);
        }
        strokeSetter() {
          this.elem.attr(
            this.prop,
            u(this.start).tweenTo(u(this.end), this.pos),
            void 0,
            !0
          );
        }
      }
      B.timers = [];
      return B;
    }
  );
  L(
    a,
    "Core/Animation/AnimationUtilities.js",
    [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]],
    function (a, A) {
      function u(a) {
        return t(a)
          ? q({ duration: 500, defer: 0 }, a)
          : { duration: a ? 500 : 0, defer: 0 };
      }
      function K(n, h) {
        let g = a.timers.length;
        for (; g--; )
          a.timers[g].elem !== n ||
            (h && h !== a.timers[g].prop) ||
            (a.timers[g].stopped = !0);
      }
      const {
        defined: G,
        getStyle: D,
        isArray: E,
        isNumber: B,
        isObject: t,
        merge: q,
        objectEach: m,
        pick: p,
      } = A;
      return {
        animate: function (n, h, g) {
          let e,
            x = "",
            I,
            p,
            C;
          t(g) ||
            ((C = arguments),
            (g = { duration: C[2], easing: C[3], complete: C[4] }));
          B(g.duration) || (g.duration = 400);
          g.easing =
            "function" === typeof g.easing
              ? g.easing
              : Math[g.easing] || Math.easeInOutSine;
          g.curAnim = q(h);
          m(h, function (f, y) {
            K(n, y);
            p = new a(n, g, y);
            I = void 0;
            "d" === y && E(h.d)
              ? ((p.paths = p.initPath(n, n.pathArray, h.d)),
                (p.toD = h.d),
                (e = 0),
                (I = 1))
              : n.attr
              ? (e = n.attr(y))
              : ((e = parseFloat(D(n, y)) || 0), "opacity" !== y && (x = "px"));
            I || (I = f);
            "string" === typeof I &&
              I.match("px") &&
              (I = I.replace(/px/g, ""));
            p.run(e, I, x);
          });
        },
        animObject: u,
        getDeferredAnimation: function (a, h, g) {
          const e = u(h);
          let x = 0,
            n = 0;
          (g ? [g] : a.series).forEach((g) => {
            g = u(g.options.animation);
            x = h && G(h.defer) ? e.defer : Math.max(x, g.duration + g.defer);
            n = Math.min(e.duration, g.duration);
          });
          a.renderer.forExport && (x = 0);
          return { defer: Math.max(0, x - n), duration: Math.min(x, n) };
        },
        setAnimation: function (a, h) {
          h.renderer.globalAnimation = p(a, h.options.chart.animation, !0);
        },
        stop: K,
      };
    }
  );
  L(
    a,
    "Core/Renderer/HTML/AST.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A) {
      const { SVG_NS: u, win: K } = a,
        {
          attr: G,
          createElement: D,
          css: E,
          error: B,
          isFunction: t,
          isString: q,
          objectEach: m,
          splat: p,
        } = A;
      ({ trustedTypes: A } = K);
      const n =
        A &&
        t(A.createPolicy) &&
        A.createPolicy("highcharts", { createHTML: (e) => e });
      A = n ? n.createHTML("") : "";
      try {
        var h = !!new DOMParser().parseFromString(A, "text/html");
      } catch (x) {
        h = !1;
      }
      const g = h;
      class e {
        static filterUserAttributes(g) {
          m(g, (x, h) => {
            let a = !0;
            -1 === e.allowedAttributes.indexOf(h) && (a = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(h) &&
              (a = q(x) && e.allowedReferences.some((f) => 0 === x.indexOf(f)));
            a ||
              (B(33, !1, void 0, { "Invalid attribute in config": `${h}` }),
              delete g[h]);
            q(x) && g[h] && (g[h] = x.replace(/</g, "&lt;"));
          });
          return g;
        }
        static parseStyle(e) {
          return e.split(";").reduce((e, g) => {
            g = g.split(":").map((f) => f.trim());
            const x = g.shift();
            x &&
              g.length &&
              (e[x.replace(/-([a-z])/g, (f) => f[1].toUpperCase())] =
                g.join(":"));
            return e;
          }, {});
        }
        static setElementHTML(g, h) {
          g.innerHTML = e.emptyHTML;
          h && new e(h).addToDOM(g);
        }
        constructor(e) {
          this.nodes = "string" === typeof e ? this.parseMarkup(e) : e;
        }
        addToDOM(g) {
          function h(g, x) {
            let f;
            p(g).forEach(function (y) {
              var r = y.tagName;
              const l = y.textContent
                  ? a.doc.createTextNode(y.textContent)
                  : void 0,
                v = e.bypassHTMLFiltering;
              let d;
              if (r)
                if ("#text" === r) d = l;
                else if (-1 !== e.allowedTags.indexOf(r) || v) {
                  r = a.doc.createElementNS(
                    "svg" === r ? u : x.namespaceURI || u,
                    r
                  );
                  const b = y.attributes || {};
                  m(y, function (c, d) {
                    "tagName" !== d &&
                      "attributes" !== d &&
                      "children" !== d &&
                      "style" !== d &&
                      "textContent" !== d &&
                      (b[d] = c);
                  });
                  G(r, v ? b : e.filterUserAttributes(b));
                  y.style && E(r, y.style);
                  l && r.appendChild(l);
                  h(y.children || [], r);
                  d = r;
                } else B(33, !1, void 0, { "Invalid tagName in config": r });
              d && x.appendChild(d);
              f = d;
            });
            return f;
          }
          return h(this.nodes, g);
        }
        parseMarkup(h) {
          const x = [];
          h = h.trim().replace(/ style=(["'])/g, " data-style=$1");
          if (g)
            h = new DOMParser().parseFromString(
              n ? n.createHTML(h) : h,
              "text/html"
            );
          else {
            const e = D("div");
            e.innerHTML = h;
            h = { body: e };
          }
          const a = (g, f) => {
            var y = g.nodeName.toLowerCase();
            const r = { tagName: y };
            "#text" === y && (r.textContent = g.textContent || "");
            if ((y = g.attributes)) {
              const f = {};
              [].forEach.call(y, (l) => {
                "data-style" === l.name
                  ? (r.style = e.parseStyle(l.value))
                  : (f[l.name] = l.value);
              });
              r.attributes = f;
            }
            if (g.childNodes.length) {
              const f = [];
              [].forEach.call(g.childNodes, (l) => {
                a(l, f);
              });
              f.length && (r.children = f);
            }
            f.push(r);
          };
          [].forEach.call(h.body.childNodes, (e) => a(e, x));
          return x;
        }
      }
      e.allowedAttributes =
        "alt aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill flood-color flood-opacity height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(
          " "
        );
      e.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
      e.allowedTags =
        "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feDropShadow feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(
          " "
        );
      e.emptyHTML = A;
      e.bypassHTMLFiltering = !1;
      ("");
      return e;
    }
  );
  L(
    a,
    "Core/Templating.js",
    [a["Core/Defaults.js"], a["Core/Utilities.js"]],
    function (a, A) {
      function u(g = "", e, x) {
        const a = /\{([a-zA-Z0-9:\.,;\-\/<>%_@"'= #\(\)]+)\}/g,
          n = /\(([a-zA-Z0-9:\.,;\-\/<>%_@"'= ]+)\)/g,
          q = [],
          f = /f$/,
          y = /\.([0-9])/,
          r = G.lang,
          l = (x && x.time) || D,
          v = (x && x.numberFormatter) || K,
          d = (b = "") => {
            let c;
            return "true" === b
              ? !0
              : "false" === b
              ? !1
              : (c = Number(b)).toString() === b
              ? c
              : B(b, e);
          };
        let b,
          c,
          k = 0,
          w;
        for (; null !== (b = a.exec(g)); ) {
          const d = n.exec(b[1]);
          d && ((b = d), (w = !0));
          (c && c.isBlock) ||
            (c = {
              ctx: e,
              expression: b[1],
              find: b[0],
              isBlock: "#" === b[1].charAt(0),
              start: b.index,
              startInner: b.index + b[0].length,
              length: b[0].length,
            });
          var z = b[1].split(" ")[0].replace("#", "");
          h[z] && (c.isBlock && z === c.fn && k++, c.fn || (c.fn = z));
          z = "else" === b[1];
          if (c.isBlock && c.fn && (b[1] === `/${c.fn}` || z))
            if (k) z || k--;
            else {
              var F = c.startInner;
              F = g.substr(F, b.index - F);
              void 0 === c.body
                ? ((c.body = F), (c.startInner = b.index + b[0].length))
                : (c.elseBody = F);
              c.find += F + b[0];
              z || (q.push(c), (c = void 0));
            }
          else c.isBlock || q.push(c);
          if (d && (null === c || void 0 === c || !c.isBlock)) break;
        }
        q.forEach((b) => {
          const { body: c, elseBody: k, expression: F, fn: w } = b;
          var H;
          if (w) {
            var z = [b],
              x = F.split(" ");
            for (H = h[w].length; H--; ) z.unshift(d(x[H + 1]));
            H = h[w].apply(e, z);
            b.isBlock && "boolean" === typeof H && (H = u(H ? c : k, e));
          } else
            (z = F.split(":")),
              (H = d(z.shift() || "")),
              z.length &&
                "number" === typeof H &&
                ((z = z.join(":")),
                f.test(z)
                  ? ((x = parseInt((z.match(y) || ["", "-1"])[1], 10)),
                    null !== H &&
                      (H = v(
                        H,
                        x,
                        r.decimalPoint,
                        -1 < z.indexOf(",") ? r.thousandsSep : ""
                      )))
                  : (H = l.dateFormat(z, H)));
          g = g.replace(b.find, p(H, ""));
        });
        return w ? u(g, e, x) : g;
      }
      function K(g, e, h, a) {
        g = +g || 0;
        e = +e;
        const x = G.lang;
        var m = (g.toString().split(".")[1] || "").split("e")[0].length;
        const f = g.toString().split("e"),
          y = e;
        if (-1 === e) e = Math.min(m, 20);
        else if (!q(e)) e = 2;
        else if (e && f[1] && 0 > f[1]) {
          var r = e + +f[1];
          0 <= r
            ? ((f[0] = (+f[0]).toExponential(r).split("e")[0]), (e = r))
            : ((f[0] = f[0].split(".")[0] || 0),
              (g = 20 > e ? (f[0] * Math.pow(10, f[1])).toFixed(e) : 0),
              (f[1] = 0));
        }
        r = (
          Math.abs(f[1] ? f[0] : g) + Math.pow(10, -Math.max(e, m) - 1)
        ).toFixed(e);
        m = String(n(r));
        const l = 3 < m.length ? m.length % 3 : 0;
        h = p(h, x.decimalPoint);
        a = p(a, x.thousandsSep);
        g = (0 > g ? "-" : "") + (l ? m.substr(0, l) + a : "");
        g =
          0 > +f[1] && !y
            ? "0"
            : g + m.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + a);
        e && (g += h + r.slice(-e));
        f[1] && 0 !== +g && (g += "e" + f[1]);
        return g;
      }
      const { defaultOptions: G, defaultTime: D } = a,
        {
          extend: E,
          getNestedProperty: B,
          isArray: t,
          isNumber: q,
          isObject: m,
          pick: p,
          pInt: n,
        } = A,
        h = {
          add: (g, e) => g + e,
          divide: (g, e) => (0 !== e ? g / e : ""),
          eq: (g, e) => g == e,
          each: function (g) {
            const e = arguments[arguments.length - 1];
            return t(g)
              ? g
                  .map((h, a) =>
                    u(
                      e.body,
                      E(m(h) ? h : { "@this": h }, {
                        "@index": a,
                        "@first": 0 === a,
                        "@last": a === g.length - 1,
                      })
                    )
                  )
                  .join("")
              : !1;
          },
          ge: (g, e) => g >= e,
          gt: (g, e) => g > e,
          if: (g) => !!g,
          le: (g, e) => g <= e,
          lt: (g, e) => g < e,
          multiply: (g, e) => g * e,
          ne: (g, e) => g != e,
          subtract: (g, e) => g - e,
          unless: (g) => !g,
        };
      return {
        dateFormat: function (g, e, h) {
          return D.dateFormat(g, e, h);
        },
        format: u,
        helpers: h,
        numberFormat: K,
      };
    }
  );
  L(
    a,
    "Core/Renderer/RendererUtilities.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { clamp: u, pick: J, stableSort: K } = a;
      var G;
      (function (a) {
        function A(a, t, q) {
          const m = a;
          var p = m.reducedLen || t,
            n = (e, g) => (g.rank || 0) - (e.rank || 0);
          const h = (e, g) => e.target - g.target;
          let g,
            e = !0,
            x = [],
            I = 0;
          for (g = a.length; g--; ) I += a[g].size;
          if (I > p) {
            K(a, n);
            for (I = g = 0; I <= p; ) (I += a[g].size), g++;
            x = a.splice(g - 1, a.length);
          }
          K(a, h);
          for (
            a = a.map((e) => ({
              size: e.size,
              targets: [e.target],
              align: J(e.align, 0.5),
            }));
            e;

          ) {
            for (g = a.length; g--; )
              (p = a[g]),
                (n =
                  (Math.min.apply(0, p.targets) +
                    Math.max.apply(0, p.targets)) /
                  2),
                (p.pos = u(n - p.size * p.align, 0, t - p.size));
            g = a.length;
            for (e = !1; g--; )
              0 < g &&
                a[g - 1].pos + a[g - 1].size > a[g].pos &&
                ((a[g - 1].size += a[g].size),
                (a[g - 1].targets = a[g - 1].targets.concat(a[g].targets)),
                (a[g - 1].align = 0.5),
                a[g - 1].pos + a[g - 1].size > t &&
                  (a[g - 1].pos = t - a[g - 1].size),
                a.splice(g, 1),
                (e = !0));
          }
          m.push.apply(m, x);
          g = 0;
          a.some((e) => {
            let a = 0;
            return (e.targets || []).some(() => {
              m[g].pos = e.pos + a;
              if (
                "undefined" !== typeof q &&
                Math.abs(m[g].pos - m[g].target) > q
              )
                return (
                  m.slice(0, g + 1).forEach((f) => delete f.pos),
                  (m.reducedLen = (m.reducedLen || t) - 0.1 * t),
                  m.reducedLen > 0.1 * t && A(m, t, q),
                  !0
                );
              a += m[g].size;
              g++;
              return !1;
            });
          });
          K(m, h);
          return m;
        }
        a.distribute = A;
      })(G || (G = {}));
      return G;
    }
  );
  L(
    a,
    "Core/Renderer/SVG/SVGElement.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      const { animate: u, animObject: D, stop: E } = a,
        { deg2rad: B, doc: t, svg: q, SVG_NS: m, win: p } = J,
        {
          addEvent: n,
          attr: h,
          createElement: g,
          css: e,
          defined: x,
          erase: I,
          extend: M,
          fireEvent: C,
          isArray: f,
          isFunction: y,
          isObject: r,
          isString: l,
          merge: v,
          objectEach: d,
          pick: b,
          pInt: c,
          syncTimeout: k,
          uniqueKey: w,
        } = K;
      class z {
        constructor() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = m;
        }
        _defaultGetter(c) {
          c = b(
            this[c + "Value"],
            this[c],
            this.element ? this.element.getAttribute(c) : null,
            0
          );
          /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
          return c;
        }
        _defaultSetter(b, c, d) {
          d.setAttribute(c, b);
        }
        add(b) {
          const c = this.renderer,
            d = this.element;
          let k;
          b && (this.parentGroup = b);
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            c.buildText(this);
          this.added = !0;
          if (!b || b.handleZ || this.zIndex) k = this.zIndexSetter();
          k || (b ? b.element : c.box).appendChild(d);
          if (this.onAdd) this.onAdd();
          return this;
        }
        addClass(b, c) {
          const d = c ? "" : this.attr("class") || "";
          b = (b || "")
            .split(/ /g)
            .reduce(
              function (b, c) {
                -1 === d.indexOf(c) && b.push(c);
                return b;
              },
              d ? [d] : []
            )
            .join(" ");
          b !== d && this.attr("class", b);
          return this;
        }
        afterSetters() {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        }
        align(c, d, k) {
          const F = {};
          var f = this.renderer,
            e = f.alignedObjects,
            H;
          let w, r;
          if (c) {
            if (
              ((this.alignOptions = c), (this.alignByTranslate = d), !k || l(k))
            )
              (this.alignTo = H = k || "renderer"),
                I(e, this),
                e.push(this),
                (k = void 0);
          } else
            (c = this.alignOptions),
              (d = this.alignByTranslate),
              (H = this.alignTo);
          k = b(k, f[H], "scrollablePlotBox" === H ? f.plotBox : void 0, f);
          H = c.align;
          const z = c.verticalAlign;
          f = (k.x || 0) + (c.x || 0);
          e = (k.y || 0) + (c.y || 0);
          "right" === H ? (w = 1) : "center" === H && (w = 2);
          w && (f += (k.width - (c.width || 0)) / w);
          F[d ? "translateX" : "x"] = Math.round(f);
          "bottom" === z ? (r = 1) : "middle" === z && (r = 2);
          r && (e += (k.height - (c.height || 0)) / r);
          F[d ? "translateY" : "y"] = Math.round(e);
          this[this.placed ? "animate" : "attr"](F);
          this.placed = !0;
          this.alignAttr = F;
          return this;
        }
        alignSetter(b) {
          const c = { left: "start", center: "middle", right: "end" };
          c[b] &&
            ((this.alignValue = b),
            this.element.setAttribute("text-anchor", c[b]));
        }
        animate(c, f, l) {
          const F = D(b(f, this.renderer.globalAnimation, !0));
          f = F.defer;
          t.hidden && (F.duration = 0);
          0 !== F.duration
            ? (l && (F.complete = l),
              k(() => {
                this.element && u(this, c, F);
              }, f))
            : (this.attr(c, void 0, l || F.complete),
              d(
                c,
                function (b, c) {
                  F.step &&
                    F.step.call(this, b, { prop: c, pos: 1, elem: this });
                },
                this
              ));
          return this;
        }
        applyTextOutline(b) {
          const c = this.element;
          -1 !== b.indexOf("contrast") &&
            (b = b.replace(
              /contrast/g,
              this.renderer.getContrast(c.style.fill)
            ));
          var d = b.split(" ");
          b = d[d.length - 1];
          if ((d = d[0]) && "none" !== d && J.svg) {
            this.fakeTS = !0;
            d = d.replace(/(^[\d\.]+)(.*?)$/g, function (b, c, d) {
              return 2 * Number(c) + d;
            });
            this.removeTextOutline();
            const k = t.createElementNS(m, "tspan");
            h(k, {
              class: "highcharts-text-outline",
              fill: b,
              stroke: b,
              "stroke-width": d,
              "stroke-linejoin": "round",
            });
            b = c.querySelector("textPath") || c;
            [].forEach.call(b.childNodes, (b) => {
              const c = b.cloneNode(!0);
              c.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach((b) =>
                  c.removeAttribute(b)
                );
              k.appendChild(c);
            });
            let F = 0;
            [].forEach.call(b.querySelectorAll("text tspan"), (b) => {
              F += Number(b.getAttribute("dy"));
            });
            d = t.createElementNS(m, "tspan");
            d.textContent = "\u200b";
            h(d, { x: Number(c.getAttribute("x")), dy: -F });
            k.appendChild(d);
            b.insertBefore(k, b.firstChild);
          }
        }
        attr(b, c, k, f) {
          const F = this.element,
            l = z.symbolCustomAttribs;
          let H,
            e,
            w = this,
            r,
            v;
          "string" === typeof b &&
            "undefined" !== typeof c &&
            ((H = b), (b = {}), (b[H] = c));
          "string" === typeof b
            ? (w = (this[b + "Getter"] || this._defaultGetter).call(this, b, F))
            : (d(
                b,
                function (c, d) {
                  r = !1;
                  f || E(this, d);
                  this.symbolName &&
                    -1 !== l.indexOf(d) &&
                    (e || (this.symbolAttr(b), (e = !0)), (r = !0));
                  !this.rotation ||
                    ("x" !== d && "y" !== d) ||
                    (this.doTransform = !0);
                  r ||
                    ((v = this[d + "Setter"] || this._defaultSetter),
                    v.call(this, c, d, F));
                },
                this
              ),
              this.afterSetters());
          k && k.call(this);
          return w;
        }
        clip(b) {
          return this.attr(
            "clip-path",
            b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none"
          );
        }
        crisp(b, c) {
          c = c || b.strokeWidth || 0;
          const d = (Math.round(c) % 2) / 2;
          b.x = Math.floor(b.x || this.x || 0) + d;
          b.y = Math.floor(b.y || this.y || 0) + d;
          b.width = Math.floor((b.width || this.width || 0) - 2 * d);
          b.height = Math.floor((b.height || this.height || 0) - 2 * d);
          x(b.strokeWidth) && (b.strokeWidth = c);
          return b;
        }
        complexColor(b, c, k) {
          const F = this.renderer;
          let l,
            e,
            H,
            r,
            z,
            y,
            g,
            N,
            a,
            h,
            n = [],
            q;
          C(this.renderer, "complexColor", { args: arguments }, function () {
            b.radialGradient
              ? (e = "radialGradient")
              : b.linearGradient && (e = "linearGradient");
            if (e) {
              H = b[e];
              z = F.gradients;
              y = b.stops;
              a = k.radialReference;
              f(H) &&
                (b[e] = H =
                  {
                    x1: H[0],
                    y1: H[1],
                    x2: H[2],
                    y2: H[3],
                    gradientUnits: "userSpaceOnUse",
                  });
              "radialGradient" === e &&
                a &&
                !x(H.gradientUnits) &&
                ((r = H),
                (H = v(H, F.getRadialAttr(a, r), {
                  gradientUnits: "userSpaceOnUse",
                })));
              d(H, function (b, c) {
                "id" !== c && n.push(c, b);
              });
              d(y, function (b) {
                n.push(b);
              });
              n = n.join(",");
              if (z[n]) h = z[n].attr("id");
              else {
                H.id = h = w();
                const b = (z[n] = F.createElement(e).attr(H).add(F.defs));
                b.radAttr = r;
                b.stops = [];
                y.forEach(function (c) {
                  0 === c[1].indexOf("rgba")
                    ? ((l = A.parse(c[1])),
                      (g = l.get("rgb")),
                      (N = l.get("a")))
                    : ((g = c[1]), (N = 1));
                  c = F.createElement("stop")
                    .attr({ offset: c[0], "stop-color": g, "stop-opacity": N })
                    .add(b);
                  b.stops.push(c);
                });
              }
              q = "url(" + F.url + "#" + h + ")";
              k.setAttribute(c, q);
              k.gradient = n;
              b.toString = function () {
                return q;
              };
            }
          });
        }
        css(b) {
          const k = this.styles,
            f = {},
            F = this.element;
          let l,
            w = !k;
          k &&
            d(b, function (b, c) {
              k && k[c] !== b && ((f[c] = b), (w = !0));
            });
          if (w) {
            k && (b = M(k, f));
            null === b.width || "auto" === b.width
              ? delete this.textWidth
              : "text" === F.nodeName.toLowerCase() &&
                b.width &&
                (l = this.textWidth = c(b.width));
            this.styles = b;
            l && !q && this.renderer.forExport && delete b.width;
            const d = v(b);
            F.namespaceURI === this.SVG_NS &&
              (["textOutline", "textOverflow", "width"].forEach(
                (b) => d && delete d[b]
              ),
              d.color && (d.fill = d.color));
            e(F, d);
          }
          this.added &&
            ("text" === this.element.nodeName && this.renderer.buildText(this),
            b.textOutline && this.applyTextOutline(b.textOutline));
          return this;
        }
        dashstyleSetter(d) {
          let k = this["stroke-width"];
          "inherit" === k && (k = 1);
          if ((d = d && d.toLowerCase())) {
            const f = d
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (d = f.length; d--; ) f[d] = "" + c(f[d]) * b(k, NaN);
            d = f.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", d);
          }
        }
        destroy() {
          const b = this;
          var c = b.element || {};
          const k = b.renderer;
          var f = c.ownerSVGElement;
          let l = ("SPAN" === c.nodeName && b.parentGroup) || void 0;
          c.onclick =
            c.onmouseout =
            c.onmouseover =
            c.onmousemove =
            c.point =
              null;
          E(b);
          if (b.clipPath && f) {
            const c = b.clipPath;
            [].forEach.call(
              f.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (b) {
                -1 < b.getAttribute("clip-path").indexOf(c.element.id) &&
                  b.removeAttribute("clip-path");
              }
            );
            b.clipPath = c.destroy();
          }
          if (b.stops) {
            for (f = 0; f < b.stops.length; f++) b.stops[f].destroy();
            b.stops.length = 0;
            b.stops = void 0;
          }
          for (
            b.safeRemoveChild(c);
            l && l.div && 0 === l.div.childNodes.length;

          )
            (c = l.parentGroup),
              b.safeRemoveChild(l.div),
              delete l.div,
              (l = c);
          b.alignTo && I(k.alignedObjects, b);
          d(b, function (c, d) {
            b[d] && b[d].parentGroup === b && b[d].destroy && b[d].destroy();
            delete b[d];
          });
        }
        dSetter(b, c, d) {
          f(b) &&
            ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
            (this.pathArray = b),
            (b = b.reduce(
              (b, c, d) =>
                c && c.join
                  ? (d ? b + " " : "") + c.join(" ")
                  : (c || "").toString(),
              ""
            )));
          /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
          this[c] !== b && (d.setAttribute(c, b), (this[c] = b));
        }
        fadeOut(c) {
          const d = this;
          d.animate(
            { opacity: 0 },
            {
              duration: b(c, 150),
              complete: function () {
                d.hide();
              },
            }
          );
        }
        fillSetter(b, c, d) {
          "string" === typeof b
            ? d.setAttribute(c, b)
            : b && this.complexColor(b, c, d);
        }
        getBBox(c, d) {
          const {
              alignValue: k,
              element: f,
              renderer: l,
              styles: F,
              textStr: H,
            } = this,
            { cache: w, cacheKeys: r } = l;
          var v = f.namespaceURI === this.SVG_NS;
          d = b(d, this.rotation, 0);
          var g = l.styledMode
            ? f && z.prototype.getStyle.call(f, "font-size")
            : F && F.fontSize;
          let N;
          let a;
          x(H) &&
            ((a = H.toString()),
            -1 === a.indexOf("<") && (a = a.replace(/[0-9]/g, "0")),
            (a += [
              "",
              l.rootFontSize,
              g,
              d,
              this.textWidth,
              k,
              F && F.textOverflow,
              F && F.fontWeight,
            ].join()));
          a && !c && (N = w[a]);
          if (!N) {
            if (v || l.forExport) {
              try {
                var h =
                  this.fakeTS &&
                  function (b) {
                    const c = f.querySelector(".highcharts-text-outline");
                    c && e(c, { display: b });
                  };
                y(h) && h("none");
                N = f.getBBox
                  ? M({}, f.getBBox())
                  : {
                      width: f.offsetWidth,
                      height: f.offsetHeight,
                      x: 0,
                      y: 0,
                    };
                y(h) && h("");
              } catch (da) {
                ("");
              }
              if (!N || 0 > N.width) N = { x: 0, y: 0, width: 0, height: 0 };
            } else N = this.htmlGetBBox();
            h = N.width;
            c = N.height;
            v &&
              (N.height = c =
                { "11px,17": 14, "13px,20": 16 }[
                  `${g || ""},${Math.round(c)}`
                ] || c);
            if (d) {
              v = Number(f.getAttribute("y") || 0) - N.y;
              g = { right: 1, center: 0.5 }[k || 0] || 0;
              var n = d * B,
                q = (d - 90) * B,
                m = h * Math.cos(n);
              d = h * Math.sin(n);
              var p = Math.cos(q);
              n = Math.sin(q);
              h = N.x + g * (h - m) + v * p;
              q = h + m;
              p = q - c * p;
              m = p - m;
              v = N.y + v - g * d + v * n;
              g = v + d;
              c = g - c * n;
              d = c - d;
              N.x = Math.min(h, q, p, m);
              N.y = Math.min(v, g, c, d);
              N.width = Math.max(h, q, p, m) - N.x;
              N.height = Math.max(v, g, c, d) - N.y;
            }
          }
          if (a && ("" === H || 0 < N.height)) {
            for (; 250 < r.length; ) delete w[r.shift()];
            w[a] || r.push(a);
            w[a] = N;
          }
          return N;
        }
        getStyle(b) {
          return p
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(b);
        }
        hasClass(b) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(b);
        }
        hide() {
          return this.attr({ visibility: "hidden" });
        }
        htmlGetBBox() {
          return { height: 0, width: 0, x: 0, y: 0 };
        }
        init(b, c) {
          this.element =
            "span" === c ? g(c) : t.createElementNS(this.SVG_NS, c);
          this.renderer = b;
          C(this, "afterInit");
        }
        on(b, c) {
          const { onEvents: d } = this;
          if (d[b]) d[b]();
          d[b] = n(this.element, b, c);
          return this;
        }
        opacitySetter(b, c, d) {
          this.opacity = b = Number(Number(b).toFixed(3));
          d.setAttribute(c, b);
        }
        removeClass(b) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(l(b) ? new RegExp(`(^| )${b}( |$)`) : b, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        }
        removeTextOutline() {
          const b = this.element.querySelector("tspan.highcharts-text-outline");
          b && this.safeRemoveChild(b);
        }
        safeRemoveChild(b) {
          const c = b.parentNode;
          c && c.removeChild(b);
        }
        setRadialReference(b) {
          const c =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = b;
          c &&
            c.radAttr &&
            c.animate(this.renderer.getRadialAttr(b, c.radAttr));
          return this;
        }
        setTextPath(b, c) {
          c = v(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
            },
            c
          );
          const d = this.renderer.url,
            k = this.text || this,
            f = k.textPath,
            { attributes: l, enabled: H } = c;
          b = b || (f && f.path);
          f && f.undo();
          b && H
            ? ((c = n(k, "afterModifyTree", (c) => {
                if (b && H) {
                  let H = b.attr("id");
                  H || b.attr("id", (H = w()));
                  var f = { x: 0, y: 0 };
                  x(l.dx) && ((f.dx = l.dx), delete l.dx);
                  x(l.dy) && ((f.dy = l.dy), delete l.dy);
                  k.attr(f);
                  this.attr({ transform: "" });
                  this.box && (this.box = this.box.destroy());
                  f = c.nodes.slice(0);
                  c.nodes.length = 0;
                  c.nodes[0] = {
                    tagName: "textPath",
                    attributes: M(l, {
                      "text-anchor": l.textAnchor,
                      href: `${d}#${H}`,
                    }),
                    children: f,
                  };
                }
              })),
              (k.textPath = { path: b, undo: c }))
            : (k.attr({ dx: 0, dy: 0 }), delete k.textPath);
          this.added && ((k.textCache = ""), this.renderer.buildText(k));
          return this;
        }
        shadow(b) {
          var c;
          const { renderer: d } = this,
            k = v(
              90 ===
                (null === (c = this.parentGroup) || void 0 === c
                  ? void 0
                  : c.rotation)
                ? { offsetX: -1, offsetY: -1 }
                : {},
              r(b) ? b : {}
            );
          c = d.shadowDefinition(k);
          return this.attr({ filter: b ? `url(${d.url}#${c})` : "none" });
        }
        show(b = !0) {
          return this.attr({ visibility: b ? "inherit" : "visible" });
        }
        ["stroke-widthSetter"](b, c, d) {
          this[c] = b;
          d.setAttribute(c, b);
        }
        strokeWidth() {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          const b = this.getStyle("stroke-width");
          let d = 0,
            k;
          b.indexOf("px") === b.length - 2
            ? (d = c(b))
            : "" !== b &&
              ((k = t.createElementNS(m, "rect")),
              h(k, { width: b, "stroke-width": 0 }),
              this.element.parentNode.appendChild(k),
              (d = k.getBBox().width),
              k.parentNode.removeChild(k));
          return d;
        }
        symbolAttr(c) {
          const d = this;
          z.symbolCustomAttribs.forEach(function (k) {
            d[k] = b(c[k], d[k]);
          });
          d.attr({
            d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d),
          });
        }
        textSetter(b) {
          b !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = b),
            this.added && this.renderer.buildText(this));
        }
        titleSetter(c) {
          const d = this.element,
            k =
              d.getElementsByTagName("title")[0] ||
              t.createElementNS(this.SVG_NS, "title");
          d.insertBefore ? d.insertBefore(k, d.firstChild) : d.appendChild(k);
          k.textContent = String(b(c, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        }
        toFront() {
          const b = this.element;
          b.parentNode.appendChild(b);
          return this;
        }
        translate(b, c) {
          return this.attr({ translateX: b, translateY: c });
        }
        updateTransform() {
          const {
              element: c,
              matrix: d,
              rotation: k = 0,
              scaleX: f,
              scaleY: l,
              translateX: e = 0,
              translateY: H = 0,
            } = this,
            w = ["translate(" + e + "," + H + ")"];
          x(d) && w.push("matrix(" + d.join(",") + ")");
          k &&
            w.push(
              "rotate(" +
                k +
                " " +
                b(this.rotationOriginX, c.getAttribute("x"), 0) +
                " " +
                b(this.rotationOriginY, c.getAttribute("y") || 0) +
                ")"
            );
          (x(f) || x(l)) && w.push("scale(" + b(f, 1) + " " + b(l, 1) + ")");
          w.length &&
            !(this.text || this).textPath &&
            c.setAttribute("transform", w.join(" "));
        }
        visibilitySetter(b, c, d) {
          "inherit" === b
            ? d.removeAttribute(c)
            : this[c] !== b && d.setAttribute(c, b);
          this[c] = b;
        }
        xGetter(b) {
          "circle" === this.element.nodeName &&
            ("x" === b ? (b = "cx") : "y" === b && (b = "cy"));
          return this._defaultGetter(b);
        }
        zIndexSetter(b, d) {
          var k = this.renderer,
            f = this.parentGroup;
          const l = (f || k).element || k.box,
            e = this.element;
          k = l === k.box;
          let H = !1,
            w;
          var r = this.added;
          let z;
          x(b)
            ? (e.setAttribute("data-z-index", b),
              (b = +b),
              this[d] === b && (r = !1))
            : x(this[d]) && e.removeAttribute("data-z-index");
          this[d] = b;
          if (r) {
            (b = this.zIndex) && f && (f.handleZ = !0);
            d = l.childNodes;
            for (z = d.length - 1; 0 <= z && !H; z--)
              if (
                ((f = d[z]),
                (r = f.getAttribute("data-z-index")),
                (w = !x(r)),
                f !== e)
              )
                if (0 > b && w && !k && !z) l.insertBefore(e, d[z]), (H = !0);
                else if (c(r) <= b || (w && (!x(b) || 0 <= b)))
                  l.insertBefore(e, d[z + 1]), (H = !0);
            H || (l.insertBefore(e, d[k ? 3 : 0]), (H = !0));
          }
          return H;
        }
      }
      z.symbolCustomAttribs =
        "anchorX anchorY clockwise end height innerR r start width x y".split(
          " "
        );
      z.prototype.strokeSetter = z.prototype.fillSetter;
      z.prototype.yGetter = z.prototype.xGetter;
      z.prototype.matrixSetter =
        z.prototype.rotationOriginXSetter =
        z.prototype.rotationOriginYSetter =
        z.prototype.rotationSetter =
        z.prototype.scaleXSetter =
        z.prototype.scaleYSetter =
        z.prototype.translateXSetter =
        z.prototype.translateYSetter =
        z.prototype.verticalAlignSetter =
          function (b, c) {
            this[c] = b;
            this.doTransform = !0;
          };
      ("");
      return z;
    }
  );
  L(
    a,
    "Core/Renderer/RendererRegistry.js",
    [a["Core/Globals.js"]],
    function (a) {
      var u;
      (function (u) {
        u.rendererTypes = {};
        let A;
        u.getRendererType = function (a = A) {
          return u.rendererTypes[a] || u.rendererTypes[A];
        };
        u.registerRendererType = function (G, D, E) {
          u.rendererTypes[G] = D;
          if (!A || E) (A = G), (a.Renderer = D);
        };
      })(u || (u = {}));
      return u;
    }
  );
  L(
    a,
    "Core/Renderer/SVG/SVGLabel.js",
    [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]],
    function (a, A) {
      const {
        defined: u,
        extend: K,
        isNumber: G,
        merge: D,
        pick: E,
        removeEvent: B,
      } = A;
      class t extends a {
        constructor(a, m, p, n, h, g, e, x, I, M) {
          super();
          this.paddingRightSetter = this.paddingLeftSetter = this.paddingSetter;
          this.init(a, "g");
          this.textStr = m;
          this.x = p;
          this.y = n;
          this.anchorX = g;
          this.anchorY = e;
          this.baseline = I;
          this.className = M;
          this.addClass(
            "button" === M ? "highcharts-no-tooltip" : "highcharts-label"
          );
          M && this.addClass("highcharts-" + M);
          this.text = a.text(void 0, 0, 0, x).attr({ zIndex: 1 });
          let q;
          "string" === typeof h &&
            ((q = /^url\((.*?)\)$/.test(h)) || this.renderer.symbols[h]) &&
            (this.symbolKey = h);
          this.bBox = t.emptyBBox;
          this.padding = 3;
          this.baselineOffset = 0;
          this.needsBox = a.styledMode || q;
          this.deferredAttr = {};
          this.alignFactor = 0;
        }
        alignSetter(a) {
          a = { left: 0, center: 0.5, right: 1 }[a];
          a !== this.alignFactor &&
            ((this.alignFactor = a),
            this.bBox && G(this.xSetting) && this.attr({ x: this.xSetting }));
        }
        anchorXSetter(a, m) {
          this.anchorX = a;
          this.boxAttr(
            m,
            Math.round(a) - this.getCrispAdjust() - this.xSetting
          );
        }
        anchorYSetter(a, m) {
          this.anchorY = a;
          this.boxAttr(m, a - this.ySetting);
        }
        boxAttr(a, m) {
          this.box ? this.box.attr(a, m) : (this.deferredAttr[a] = m);
        }
        css(q) {
          if (q) {
            const a = {};
            q = D(q);
            t.textProps.forEach((m) => {
              "undefined" !== typeof q[m] && ((a[m] = q[m]), delete q[m]);
            });
            this.text.css(a);
            "fontSize" in a || "fontWeight" in a
              ? this.updateTextPadding()
              : ("width" in a || "textOverflow" in a) && this.updateBoxSize();
          }
          return a.prototype.css.call(this, q);
        }
        destroy() {
          B(this.element, "mouseenter");
          B(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          a.prototype.destroy.call(this);
        }
        fillSetter(a, m) {
          a && (this.needsBox = !0);
          this.fill = a;
          this.boxAttr(m, a);
        }
        getBBox() {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          const a = this.padding,
            m = E(this.paddingLeft, a);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - m,
            y: this.bBox.y - a,
          };
        }
        getCrispAdjust() {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        }
        heightSetter(a) {
          this.heightSetting = a;
        }
        onAdd() {
          this.text.add(this);
          this.attr({
            text: E(this.textStr, ""),
            x: this.x || 0,
            y: this.y || 0,
          });
          this.box &&
            u(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        }
        paddingSetter(a, m) {
          G(a)
            ? a !== this[m] && ((this[m] = a), this.updateTextPadding())
            : (this[m] = void 0);
        }
        rSetter(a, m) {
          this.boxAttr(m, a);
        }
        strokeSetter(a, m) {
          this.stroke = a;
          this.boxAttr(m, a);
        }
        ["stroke-widthSetter"](a, m) {
          a && (this.needsBox = !0);
          this["stroke-width"] = a;
          this.boxAttr(m, a);
        }
        ["text-alignSetter"](a) {
          this.textAlign = a;
        }
        textSetter(a) {
          "undefined" !== typeof a && this.text.attr({ text: a });
          this.updateTextPadding();
        }
        updateBoxSize() {
          var a = this.text;
          const m = {},
            p = this.padding,
            n = (this.bBox =
              (G(this.widthSetting) &&
                G(this.heightSetting) &&
                !this.textAlign) ||
              !u(a.textStr)
                ? t.emptyBBox
                : a.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || n.height || 0) + 2 * p;
          const h = this.renderer.fontMetrics(a);
          this.baselineOffset =
            p +
            Math.min((this.text.firstLineMetrics || h).b, n.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - h.h) / 2);
          this.needsBox &&
            !a.textPath &&
            (this.box ||
              ((a = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              a.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : "")
              ),
              a.add(this)),
            (a = this.getCrispAdjust()),
            (m.x = a),
            (m.y = (this.baseline ? -this.baselineOffset : 0) + a),
            (m.width = Math.round(this.width)),
            (m.height = Math.round(this.height)),
            this.box.attr(K(m, this.deferredAttr)),
            (this.deferredAttr = {}));
        }
        updateTextPadding() {
          const a = this.text;
          if (!a.textPath) {
            this.updateBoxSize();
            const m = this.baseline ? 0 : this.baselineOffset;
            let p = E(this.paddingLeft, this.padding);
            u(this.widthSetting) &&
              this.bBox &&
              ("center" === this.textAlign || "right" === this.textAlign) &&
              (p +=
                { center: 0.5, right: 1 }[this.textAlign] *
                (this.widthSetting - this.bBox.width));
            if (p !== a.x || m !== a.y)
              a.attr("x", p),
                a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)),
                "undefined" !== typeof m && a.attr("y", m);
            a.x = p;
            a.y = m;
          }
        }
        widthSetter(a) {
          this.widthSetting = G(a) ? a : void 0;
        }
        getPaddedWidth() {
          var a = this.padding;
          const m = E(this.paddingLeft, a);
          a = E(this.paddingRight, a);
          return (this.widthSetting || this.bBox.width || 0) + m + a;
        }
        xSetter(a) {
          this.x = a;
          this.alignFactor &&
            ((a -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(a);
          this.attr("translateX", this.xSetting);
        }
        ySetter(a) {
          this.ySetting = this.y = Math.round(a);
          this.attr("translateY", this.ySetting);
        }
      }
      t.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
      t.textProps =
        "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow whiteSpace width".split(
          " "
        );
      return t;
    }
  );
  L(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function (a) {
    function u(a, t, q, m, p) {
      const n = [];
      if (p) {
        const h = p.start || 0,
          g = E(p.r, q);
        q = E(p.r, m || q);
        m = (p.end || 0) - 0.001;
        const e = p.innerR,
          x = E(p.open, 0.001 > Math.abs((p.end || 0) - h - 2 * Math.PI)),
          I = Math.cos(h),
          M = Math.sin(h),
          C = Math.cos(m),
          f = Math.sin(m),
          y = E(p.longArc, 0.001 > m - h - Math.PI ? 0 : 1);
        let r = ["A", g, q, 0, y, E(p.clockwise, 1), a + g * C, t + q * f];
        r.params = { start: h, end: m, cx: a, cy: t };
        n.push(["M", a + g * I, t + q * M], r);
        G(e) &&
          ((r = [
            "A",
            e,
            e,
            0,
            y,
            G(p.clockwise) ? 1 - p.clockwise : 0,
            a + e * I,
            t + e * M,
          ]),
          (r.params = { start: m, end: h, cx: a, cy: t }),
          n.push(
            x ? ["M", a + e * C, t + e * f] : ["L", a + e * C, t + e * f],
            r
          ));
        x || n.push(["Z"]);
      }
      return n;
    }
    function J(a, t, q, m, p) {
      return p && p.r
        ? K(a, t, q, m, p)
        : [
            ["M", a, t],
            ["L", a + q, t],
            ["L", a + q, t + m],
            ["L", a, t + m],
            ["Z"],
          ];
    }
    function K(a, t, q, m, p) {
      p = (null === p || void 0 === p ? void 0 : p.r) || 0;
      return [
        ["M", a + p, t],
        ["L", a + q - p, t],
        ["A", p, p, 0, 0, 1, a + q, t + p],
        ["L", a + q, t + m - p],
        ["A", p, p, 0, 0, 1, a + q - p, t + m],
        ["L", a + p, t + m],
        ["A", p, p, 0, 0, 1, a, t + m - p],
        ["L", a, t + p],
        ["A", p, p, 0, 0, 1, a + p, t],
        ["Z"],
      ];
    }
    const { defined: G, isNumber: D, pick: E } = a;
    return {
      arc: u,
      callout: function (a, t, q, m, p) {
        const n = Math.min((p && p.r) || 0, q, m),
          h = n + 6,
          g = p && p.anchorX;
        p = (p && p.anchorY) || 0;
        const e = K(a, t, q, m, { r: n });
        if (!D(g)) return e;
        a + g >= q
          ? p > t + h && p < t + m - h
            ? e.splice(
                3,
                1,
                ["L", a + q, p - 6],
                ["L", a + q + 6, p],
                ["L", a + q, p + 6],
                ["L", a + q, t + m - n]
              )
            : e.splice(
                3,
                1,
                ["L", a + q, m / 2],
                ["L", g, p],
                ["L", a + q, m / 2],
                ["L", a + q, t + m - n]
              )
          : 0 >= a + g
          ? p > t + h && p < t + m - h
            ? e.splice(
                7,
                1,
                ["L", a, p + 6],
                ["L", a - 6, p],
                ["L", a, p - 6],
                ["L", a, t + n]
              )
            : e.splice(
                7,
                1,
                ["L", a, m / 2],
                ["L", g, p],
                ["L", a, m / 2],
                ["L", a, t + n]
              )
          : p && p > m && g > a + h && g < a + q - h
          ? e.splice(
              5,
              1,
              ["L", g + 6, t + m],
              ["L", g, t + m + 6],
              ["L", g - 6, t + m],
              ["L", a + n, t + m]
            )
          : p &&
            0 > p &&
            g > a + h &&
            g < a + q - h &&
            e.splice(
              1,
              1,
              ["L", g - 6, t],
              ["L", g, t - 6],
              ["L", g + 6, t],
              ["L", q - n, t]
            );
        return e;
      },
      circle: function (a, t, q, m) {
        return u(a + q / 2, t + m / 2, q / 2, m / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (a, t, q, m) {
        return [
          ["M", a + q / 2, t],
          ["L", a + q, t + m / 2],
          ["L", a + q / 2, t + m],
          ["L", a, t + m / 2],
          ["Z"],
        ];
      },
      rect: J,
      roundedRect: K,
      square: J,
      triangle: function (a, t, q, m) {
        return [
          ["M", a + q / 2, t],
          ["L", a + q, t + m],
          ["L", a, t + m],
          ["Z"],
        ];
      },
      "triangle-down": function (a, t, q, m) {
        return [["M", a, t], ["L", a + q, t], ["L", a + q / 2, t + m], ["Z"]];
      },
    };
  });
  L(
    a,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { doc: u, SVG_NS: G, win: D } = A,
        {
          attr: E,
          extend: B,
          fireEvent: t,
          isString: q,
          objectEach: m,
          pick: p,
        } = J;
      class n {
        constructor(a) {
          const g = a.styles;
          this.renderer = a.renderer;
          this.svgElement = a;
          this.width = a.textWidth;
          this.textLineHeight = g && g.lineHeight;
          this.textOutline = g && g.textOutline;
          this.ellipsis = !(!g || "ellipsis" !== g.textOverflow);
          this.noWrap = !(!g || "nowrap" !== g.whiteSpace);
        }
        buildSVG() {
          const h = this.svgElement,
            g = h.element;
          var e = h.renderer,
            x = p(h.textStr, "").toString();
          const n = -1 !== x.indexOf("<"),
            m = g.childNodes;
          e = !h.added && e.box;
          const C = /<br.*?>/g;
          var f = [
            x,
            this.ellipsis,
            this.noWrap,
            this.textLineHeight,
            this.textOutline,
            h.getStyle("font-size"),
            this.width,
          ].join();
          if (f !== h.textCache) {
            h.textCache = f;
            delete h.actualWidth;
            for (f = m.length; f--; ) g.removeChild(m[f]);
            n ||
            this.ellipsis ||
            this.width ||
            h.textPath ||
            (-1 !== x.indexOf(" ") && (!this.noWrap || C.test(x)))
              ? "" !== x &&
                (e && e.appendChild(g),
                (x = new a(x)),
                this.modifyTree(x.nodes),
                x.addToDOM(g),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (g.textContent || "").indexOf("\u2026") &&
                  h.attr(
                    "title",
                    this.unescapeEntities(h.textStr || "", ["&lt;", "&gt;"])
                  ),
                e && e.removeChild(g))
              : g.appendChild(u.createTextNode(this.unescapeEntities(x)));
            q(this.textOutline) &&
              h.applyTextOutline &&
              h.applyTextOutline(this.textOutline);
          }
        }
        modifyDOM() {
          const a = this.svgElement,
            g = E(a.element, "x");
          a.firstLineMetrics = void 0;
          let e;
          for (; (e = a.element.firstChild); )
            if (/^[\s\u200B]*$/.test(e.textContent || " "))
              a.element.removeChild(e);
            else break;
          [].forEach.call(
            a.element.querySelectorAll("tspan.highcharts-br"),
            (e, f) => {
              e.nextSibling &&
                e.previousSibling &&
                (0 === f &&
                  1 === e.previousSibling.nodeType &&
                  (a.firstLineMetrics = a.renderer.fontMetrics(
                    e.previousSibling
                  )),
                E(e, { dy: this.getLineHeight(e.nextSibling), x: g }));
            }
          );
          const x = this.width || 0;
          if (x) {
            var n = (e, f) => {
                var y = e.textContent || "";
                const r = y.replace(/([^\^])-/g, "$1- ").split(" ");
                var l =
                  !this.noWrap &&
                  (1 < r.length || 1 < a.element.childNodes.length);
                const v = this.getLineHeight(f);
                let d = 0,
                  b = a.actualWidth;
                if (this.ellipsis)
                  y &&
                    this.truncate(
                      e,
                      y,
                      void 0,
                      0,
                      Math.max(0, x - 0.8 * v),
                      (b, d) => b.substring(0, d) + "\u2026"
                    );
                else if (l) {
                  y = [];
                  for (l = []; f.firstChild && f.firstChild !== e; )
                    l.push(f.firstChild), f.removeChild(f.firstChild);
                  for (; r.length; )
                    r.length &&
                      !this.noWrap &&
                      0 < d &&
                      (y.push(e.textContent || ""),
                      (e.textContent = r.join(" ").replace(/- /g, "-"))),
                      this.truncate(
                        e,
                        void 0,
                        r,
                        0 === d ? b || 0 : 0,
                        x,
                        (b, d) => r.slice(0, d).join(" ").replace(/- /g, "-")
                      ),
                      (b = a.actualWidth),
                      d++;
                  l.forEach((b) => {
                    f.insertBefore(b, e);
                  });
                  y.forEach((b) => {
                    f.insertBefore(u.createTextNode(b), e);
                    b = u.createElementNS(G, "tspan");
                    b.textContent = "\u200b";
                    E(b, { dy: v, x: g });
                    f.insertBefore(b, e);
                  });
                }
              },
              m = (e) => {
                [].slice.call(e.childNodes).forEach((f) => {
                  f.nodeType === D.Node.TEXT_NODE
                    ? n(f, e)
                    : (-1 !== f.className.baseVal.indexOf("highcharts-br") &&
                        (a.actualWidth = 0),
                      m(f));
                });
              };
            m(a.element);
          }
        }
        getLineHeight(a) {
          a = a.nodeType === D.Node.TEXT_NODE ? a.parentElement : a;
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(a || this.svgElement.element).h;
        }
        modifyTree(a) {
          const g = (e, h) => {
            const {
                attributes: x = {},
                children: n,
                style: m = {},
                tagName: f,
              } = e,
              y = this.renderer.styledMode;
            if ("b" === f || "strong" === f)
              y ? (x["class"] = "highcharts-strong") : (m.fontWeight = "bold");
            else if ("i" === f || "em" === f)
              y
                ? (x["class"] = "highcharts-emphasized")
                : (m.fontStyle = "italic");
            m && m.color && (m.fill = m.color);
            "br" === f
              ? ((x["class"] = "highcharts-br"),
                (e.textContent = "\u200b"),
                (h = a[h + 1]) &&
                  h.textContent &&
                  (h.textContent = h.textContent.replace(/^ +/gm, "")))
              : "a" === f &&
                n &&
                n.some((f) => "#text" === f.tagName) &&
                (e.children = [{ children: n, tagName: "tspan" }]);
            "#text" !== f && "a" !== f && (e.tagName = "tspan");
            B(e, { attributes: x, style: m });
            n && n.filter((f) => "#text" !== f.tagName).forEach(g);
          };
          a.forEach(g);
          t(this.svgElement, "afterModifyTree", { nodes: a });
        }
        truncate(a, g, e, x, n, m) {
          const h = this.svgElement,
            { rotation: f } = h,
            y = [];
          let r = e ? 1 : 0,
            l = (g || e || "").length,
            v = l,
            d,
            b;
          const c = function (b, c) {
            b = c || b;
            if (
              (c = a.parentNode) &&
              "undefined" === typeof y[b] &&
              c.getSubStringLength
            )
              try {
                y[b] = x + c.getSubStringLength(0, e ? b + 1 : b);
              } catch (z) {
                ("");
              }
            return y[b];
          };
          h.rotation = 0;
          b = c(a.textContent.length);
          if (x + b > n) {
            for (; r <= l; )
              (v = Math.ceil((r + l) / 2)),
                e && (d = m(e, v)),
                (b = c(v, d && d.length - 1)),
                r === l ? (r = l + 1) : b > n ? (l = v - 1) : (r = v);
            0 === l
              ? (a.textContent = "")
              : (g && l === g.length - 1) ||
                (a.textContent = d || m(g || e, v));
          }
          e && e.splice(0, v);
          h.actualWidth = b;
          h.rotation = f;
        }
        unescapeEntities(a, g) {
          m(this.renderer.escapes, function (e, h) {
            (g && -1 !== g.indexOf(e)) ||
              (a = a.toString().replace(new RegExp(e, "g"), h));
          });
          return a;
        }
      }
      return n;
    }
  );
  L(
    a,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGLabel.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Renderer/SVG/TextBuilder.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E, B, t) {
      const {
          charts: q,
          deg2rad: m,
          doc: p,
          isFirefox: n,
          isMS: h,
          isWebKit: g,
          noop: e,
          SVG_NS: x,
          symbolSizes: I,
          win: M,
        } = J,
        {
          addEvent: C,
          attr: f,
          createElement: y,
          css: r,
          defined: l,
          destroyObjectProperties: v,
          extend: d,
          isArray: b,
          isNumber: c,
          isObject: k,
          isString: w,
          merge: z,
          pick: F,
          pInt: O,
          uniqueKey: P,
        } = t;
      let T;
      class u {
        constructor(b, c, d, k, f, a, l) {
          this.width =
            this.url =
            this.style =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(b, c, d, k, f, a, l);
        }
        init(b, c, d, k, a, l, e) {
          const H = this.createElement("svg").attr({
              version: "1.1",
              class: "highcharts-root",
            }),
            w = H.element;
          e || H.css(this.getStyle(k));
          b.appendChild(w);
          f(b, "dir", "ltr");
          -1 === b.innerHTML.indexOf("xmlns") && f(w, "xmlns", this.SVG_NS);
          this.box = w;
          this.boxWrapper = H;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              p.createTextNode("Created with Highcharts 11.1.0")
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = l;
          this.forExport = a;
          this.styledMode = e;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.rootFontSize = H.getStyle("font-size");
          this.setSize(c, d, !1);
          let z;
          n &&
            b.getBoundingClientRect &&
            ((c = function () {
              r(b, { left: 0, top: 0 });
              z = b.getBoundingClientRect();
              r(b, {
                left: Math.ceil(z.left) - z.left + "px",
                top: Math.ceil(z.top) - z.top + "px",
              });
            }),
            c(),
            (this.unSubPixelFix = C(M, "resize", c)));
        }
        definition(b) {
          return new a([b]).addToDOM(this.defs.element);
        }
        getReferenceURL() {
          if ((n || g) && p.getElementsByTagName("base").length) {
            if (!l(T)) {
              var b = P();
              b = new a([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: b },
                          children: [
                            {
                              tagName: "rect",
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": `url(#${b})`,
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(p.body);
              r(b, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              const c = p.elementFromPoint(6, 6);
              T = "hitme" === (c && c.id);
              p.body.removeChild(b);
            }
            if (T)
              return M.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        }
        getStyle(b) {
          return (this.style = d(
            { fontFamily: "Helvetica, Arial, sans-serif", fontSize: "1rem" },
            b
          ));
        }
        setStyle(b) {
          this.boxWrapper.css(this.getStyle(b));
        }
        isHidden() {
          return !this.boxWrapper.getBBox().width;
        }
        destroy() {
          const b = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          v(this.gradients || {});
          this.gradients = null;
          this.defs = b.destroy();
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        }
        createElement(b) {
          const c = new this.Element();
          c.init(this, b);
          return c;
        }
        getRadialAttr(b, c) {
          return {
            cx: b[0] - b[2] / 2 + (c.cx || 0) * b[2],
            cy: b[1] - b[2] / 2 + (c.cy || 0) * b[2],
            r: (c.r || 0) * b[2],
          };
        }
        shadowDefinition(b) {
          const c = [
              `highcharts-drop-shadow-${this.chartIndex}`,
              ...Object.keys(b).map((c) => b[c]),
            ]
              .join("-")
              .replace(/[^a-z0-9\-]/g, ""),
            d = z(
              {
                color: "#000000",
                offsetX: 1,
                offsetY: 1,
                opacity: 0.15,
                width: 5,
              },
              b
            );
          this.defs.element.querySelector(`#${c}`) ||
            this.definition({
              tagName: "filter",
              attributes: { id: c },
              children: [
                {
                  tagName: "feDropShadow",
                  attributes: {
                    dx: d.offsetX,
                    dy: d.offsetY,
                    "flood-color": d.color,
                    "flood-opacity": Math.min(5 * d.opacity, 1),
                    stdDeviation: d.width / 2,
                  },
                },
              ],
            });
          return c;
        }
        buildText(b) {
          new B(b).buildSVG();
        }
        getContrast(b) {
          b = A.parse(b).rgba.map((b) => {
            b /= 255;
            return 0.03928 >= b
              ? b / 12.92
              : Math.pow((b + 0.055) / 1.055, 2.4);
          });
          b = 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
          return 1.05 / (b + 0.05) > (b + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
        }
        button(b, c, f, l, e = {}, w, r, v, y, g) {
          const H = this.label(b, c, f, y, void 0, void 0, g, void 0, "button"),
            N = this.styledMode;
          b = e.states || {};
          let F = 0;
          e = z(e);
          delete e.states;
          const x = z(
            {
              color: "#333333",
              cursor: "pointer",
              fontSize: "0.8em",
              fontWeight: "normal",
            },
            e.style
          );
          delete e.style;
          let n = a.filterUserAttributes(e);
          H.attr(z({ padding: 8, r: 2 }, n));
          let m, p, Q;
          N ||
            ((n = z(
              { fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 },
              n
            )),
            (w = z(
              n,
              { fill: "#e6e6e6" },
              a.filterUserAttributes(w || b.hover || {})
            )),
            (m = w.style),
            delete w.style,
            (r = z(
              n,
              {
                fill: "#e6e9ff",
                style: { color: "#000000", fontWeight: "bold" },
              },
              a.filterUserAttributes(r || b.select || {})
            )),
            (p = r.style),
            delete r.style,
            (v = z(
              n,
              { style: { color: "#cccccc" } },
              a.filterUserAttributes(v || b.disabled || {})
            )),
            (Q = v.style),
            delete v.style);
          C(H.element, h ? "mouseover" : "mouseenter", function () {
            3 !== F && H.setState(1);
          });
          C(H.element, h ? "mouseout" : "mouseleave", function () {
            3 !== F && H.setState(F);
          });
          H.setState = function (b) {
            1 !== b && (H.state = F = b);
            H.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][b || 0]
            );
            N ||
              (H.attr([n, w, r, v][b || 0]),
              (b = [x, m, p, Q][b || 0]),
              k(b) && H.css(b));
          };
          N ||
            (H.attr(n).css(d({ cursor: "default" }, x)),
            g && H.text.css({ pointerEvents: "none" }));
          return H.on("touchstart", (b) => b.stopPropagation()).on(
            "click",
            function (b) {
              3 !== F && l.call(H, b);
            }
          );
        }
        crispLine(b, c, d = "round") {
          const k = b[0],
            f = b[1];
          l(k[1]) &&
            k[1] === f[1] &&
            (k[1] = f[1] = Math[d](k[1]) - (c % 2) / 2);
          l(k[2]) &&
            k[2] === f[2] &&
            (k[2] = f[2] = Math[d](k[2]) + (c % 2) / 2);
          return b;
        }
        path(c) {
          const f = this.styledMode ? {} : { fill: "none" };
          b(c) ? (f.d = c) : k(c) && d(f, c);
          return this.createElement("path").attr(f);
        }
        circle(b, c, d) {
          b = k(b) ? b : "undefined" === typeof b ? {} : { x: b, y: c, r: d };
          c = this.createElement("circle");
          c.xSetter = c.ySetter = function (b, c, d) {
            d.setAttribute("c" + c, b);
          };
          return c.attr(b);
        }
        arc(b, c, d, f, a, l) {
          k(b)
            ? ((f = b), (c = f.y), (d = f.r), (b = f.x))
            : (f = { innerR: f, start: a, end: l });
          b = this.symbol("arc", b, c, d, d, f);
          b.r = d;
          return b;
        }
        rect(b, c, a, l, e, w) {
          b = k(b)
            ? b
            : "undefined" === typeof b
            ? {}
            : {
                x: b,
                y: c,
                r: e,
                width: Math.max(a || 0, 0),
                height: Math.max(l || 0, 0),
              };
          const H = this.createElement("rect");
          this.styledMode ||
            ("undefined" !== typeof w &&
              ((b["stroke-width"] = w), d(b, H.crisp(b))),
            (b.fill = "none"));
          H.rSetter = function (b, c, d) {
            H.r = b;
            f(d, { rx: b, ry: b });
          };
          H.rGetter = function () {
            return H.r || 0;
          };
          return H.attr(b);
        }
        roundedRect(b) {
          return this.symbol("roundedRect").attr(b);
        }
        setSize(b, c, d) {
          this.width = b;
          this.height = c;
          this.boxWrapper.animate(
            { width: b, height: c },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: F(d, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        }
        g(b) {
          const c = this.createElement("g");
          return b ? c.attr({ class: "highcharts-" + b }) : c;
        }
        image(b, d, k, f, a, l) {
          const H = { preserveAspectRatio: "none" };
          c(d) && (H.x = d);
          c(k) && (H.y = k);
          c(f) && (H.width = f);
          c(a) && (H.height = a);
          const e = this.createElement("image").attr(H);
          d = function (c) {
            e.attr({ href: b });
            l.call(e, c);
          };
          l
            ? (e.attr({
                href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
              }),
              (k = new M.Image()),
              C(k, "load", d),
              (k.src = b),
              k.complete && d({}))
            : e.attr({ href: b });
          return e;
        }
        symbol(b, c, k, a, e, w) {
          const H = this,
            z = /^url\((.*?)\)$/,
            v = z.test(b),
            g = !v && (this.symbols[b] ? b : "circle"),
            h = g && this.symbols[g];
          let x, n, m, Y;
          if (h)
            "number" === typeof c &&
              (n = h.call(
                this.symbols,
                Math.round(c || 0),
                Math.round(k || 0),
                a || 0,
                e || 0,
                w
              )),
              (x = this.path(n)),
              H.styledMode || x.attr("fill", "none"),
              d(x, {
                symbolName: g || void 0,
                x: c,
                y: k,
                width: a,
                height: e,
              }),
              w && d(x, w);
          else if (v) {
            m = b.match(z)[1];
            const d = (x = this.image(m));
            d.imgwidth = F(w && w.width, I[m] && I[m].width);
            d.imgheight = F(w && w.height, I[m] && I[m].height);
            Y = (b) => b.attr({ width: b.width, height: b.height });
            ["width", "height"].forEach(function (b) {
              d[b + "Setter"] = function (b, c) {
                this[c] = b;
                const {
                  alignByTranslate: d,
                  element: k,
                  width: a,
                  height: H,
                  imgwidth: e,
                  imgheight: r,
                } = this;
                b = this["img" + c];
                if (l(b)) {
                  let l = 1;
                  w && "within" === w.backgroundSize && a && H
                    ? ((l = Math.min(a / e, H / r)),
                      f(k, {
                        width: Math.round(e * l),
                        height: Math.round(r * l),
                      }))
                    : k && k.setAttribute(c, b);
                  d ||
                    this.translate(
                      ((a || 0) - e * l) / 2,
                      ((H || 0) - r * l) / 2
                    );
                }
              };
            });
            l(c) && d.attr({ x: c, y: k });
            d.isImg = !0;
            l(d.imgwidth) && l(d.imgheight)
              ? Y(d)
              : (d.attr({ width: 0, height: 0 }),
                y("img", {
                  onload: function () {
                    const b = q[H.chartIndex];
                    0 === this.width &&
                      (r(this, { position: "absolute", top: "-999em" }),
                      p.body.appendChild(this));
                    I[m] = { width: this.width, height: this.height };
                    d.imgwidth = this.width;
                    d.imgheight = this.height;
                    d.element && Y(d);
                    this.parentNode && this.parentNode.removeChild(this);
                    H.imgCount--;
                    if (!H.imgCount && b && !b.hasLoaded) b.onload();
                  },
                  src: m,
                }),
                this.imgCount++);
          }
          return x;
        }
        clipRect(b, c, d, k) {
          const f = P() + "-",
            a = this.createElement("clipPath").attr({ id: f }).add(this.defs);
          b = this.rect(b, c, d, k, 0).add(a);
          b.id = f;
          b.clipPath = a;
          b.count = 0;
          return b;
        }
        text(b, c, d, k) {
          const f = {};
          if (k && (this.allowHTML || !this.forExport))
            return this.html(b, c, d);
          f.x = Math.round(c || 0);
          d && (f.y = Math.round(d));
          l(b) && (f.text = b);
          b = this.createElement("text").attr(f);
          if (!k || (this.forExport && !this.allowHTML))
            b.xSetter = function (b, c, d) {
              const k = d.getElementsByTagName("tspan"),
                f = d.getAttribute(c);
              for (let d = 0, a; d < k.length; d++)
                (a = k[d]), a.getAttribute(c) === f && a.setAttribute(c, b);
              d.setAttribute(c, b);
            };
          return b;
        }
        fontMetrics(b) {
          b = O(G.prototype.getStyle.call(b, "font-size") || 0);
          const c = 24 > b ? b + 3 : Math.round(1.2 * b);
          return { h: c, b: Math.round(0.8 * c), f: b };
        }
        rotCorr(b, c, d) {
          let k = b;
          c && d && (k = Math.max(k * Math.cos(c * m), 4));
          return { x: (-b / 3) * Math.sin(c * m), y: k };
        }
        pathToSegments(b) {
          const d = [],
            k = [],
            f = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
          for (let a = 0; a < b.length; a++)
            w(k[0]) &&
              c(b[a]) &&
              k.length === f[k[0].toUpperCase()] &&
              b.splice(a, 0, k[0].replace("M", "L").replace("m", "l")),
              "string" === typeof b[a] &&
                (k.length && d.push(k.slice(0)), (k.length = 0)),
              k.push(b[a]);
          d.push(k.slice(0));
          return d;
        }
        label(b, c, d, k, f, a, l, e, w) {
          return new D(this, b, c, d, k, f, a, l, e, w);
        }
        alignElements() {
          this.alignedObjects.forEach((b) => b.align());
        }
      }
      d(u.prototype, {
        Element: G,
        SVG_NS: x,
        escapes: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        },
        symbols: E,
        draw: e,
      });
      K.registerRendererType("svg", u, !0);
      ("");
      return u;
    }
  );
  L(
    a,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      a["Core/Globals.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { isFirefox: u, isMS: G, isWebKit: D, win: E } = a,
        { css: B, defined: t, extend: q, pick: m, pInt: p } = J,
        n = [];
      class h extends A {
        static compose(a) {
          if (J.pushUnique(n, a)) {
            const e = h.prototype,
              g = a.prototype;
            g.getSpanCorrection = e.getSpanCorrection;
            g.htmlCss = e.htmlCss;
            g.htmlGetBBox = e.htmlGetBBox;
            g.htmlUpdateTransform = e.htmlUpdateTransform;
            g.setSpanRotation = e.setSpanRotation;
          }
          return a;
        }
        getSpanCorrection(a, e, h) {
          this.xCorr = -a * h;
          this.yCorr = -e;
        }
        htmlCss(a) {
          const e = "SPAN" === this.element.tagName && a && "width" in a,
            g = m(e && a.width, void 0);
          let h;
          e && (delete a.width, (this.textWidth = g), (h = !0));
          a &&
            "ellipsis" === a.textOverflow &&
            ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
          this.styles = q(this.styles, a);
          B(this.element, a);
          h && this.htmlUpdateTransform();
          return this;
        }
        htmlGetBBox() {
          const a = this.element;
          return {
            x: a.offsetLeft,
            y: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        }
        htmlUpdateTransform() {
          if (this.added) {
            var a = this.renderer,
              e = this.element,
              h = this.x || 0,
              n = this.y || 0,
              m = this.textAlign || "left",
              q = { left: 0, center: 0.5, right: 1 }[m],
              f = this.styles,
              y = f && f.whiteSpace;
            B(e, {
              marginLeft: this.translateX || 0,
              marginTop: this.translateY || 0,
            });
            if ("SPAN" === e.tagName) {
              f = this.rotation;
              const l = this.textWidth && p(this.textWidth),
                v = [f, m, e.innerHTML, this.textWidth, this.textAlign].join();
              let d = !1;
              if (l !== this.oldTextWidth) {
                if (this.textPxLength) var r = this.textPxLength;
                else
                  B(e, { width: "", whiteSpace: y || "nowrap" }),
                    (r = e.offsetWidth);
                (l > this.oldTextWidth || r > l) &&
                  (/[ \-]/.test(e.textContent || e.innerText) ||
                    "ellipsis" === e.style.textOverflow) &&
                  (B(e, {
                    width: r > l || f ? l + "px" : "auto",
                    display: "block",
                    whiteSpace: y || "normal",
                  }),
                  (this.oldTextWidth = l),
                  (d = !0));
              }
              this.hasBoxWidthChanged = d;
              v !== this.cTT &&
                ((a = a.fontMetrics(e).b),
                !t(f) ||
                  (f === (this.oldRotation || 0) && m === this.oldAlign) ||
                  this.setSpanRotation(f, q, a),
                this.getSpanCorrection(
                  (!t(f) && this.textPxLength) || e.offsetWidth,
                  a,
                  q,
                  f,
                  m
                ));
              B(e, {
                left: h + (this.xCorr || 0) + "px",
                top: n + (this.yCorr || 0) + "px",
              });
              this.cTT = v;
              this.oldRotation = f;
              this.oldAlign = m;
            }
          } else this.alignOnAdd = !0;
        }
        setSpanRotation(a, e, h) {
          const g = {},
            x =
              G && !/Edge/.test(E.navigator.userAgent)
                ? "-ms-transform"
                : D
                ? "-webkit-transform"
                : u
                ? "MozTransform"
                : E.opera
                ? "-o-transform"
                : void 0;
          x &&
            ((g[x] = g.transform = "rotate(" + a + "deg)"),
            (g[x + (u ? "Origin" : "-origin")] = g.transformOrigin =
              100 * e + "% " + h + "px"),
            B(this.element, g));
        }
      }
      return h;
    }
  );
  L(
    a,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      const { attr: u, createElement: D, extend: E, pick: B } = K,
        t = [];
      class q extends J {
        static compose(a) {
          K.pushUnique(t, a) && (a.prototype.html = q.prototype.html);
          return a;
        }
        html(m, p, n) {
          const h = this.createElement("span"),
            g = h.element,
            e = h.renderer,
            x = function (a, e) {
              ["opacity", "visibility"].forEach(function (g) {
                a[g + "Setter"] = function (f, y, r) {
                  const l = a.div ? a.div.style : e;
                  A.prototype[g + "Setter"].call(this, f, y, r);
                  l && (l[y] = f);
                };
              });
              a.addedSetters = !0;
            };
          h.textSetter = function (e) {
            e !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              a.setElementHTML(this.element, B(e, "")),
              (this.textStr = e),
              (h.doTransform = !0));
          };
          x(h, h.element.style);
          h.xSetter =
            h.ySetter =
            h.alignSetter =
            h.rotationSetter =
              function (a, e) {
                "align" === e ? (h.alignValue = h.textAlign = a) : (h[e] = a);
                h.doTransform = !0;
              };
          h.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          h.attr({ text: m, x: Math.round(p), y: Math.round(n) }).css({
            position: "absolute",
          });
          e.styledMode ||
            h.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          g.style.whiteSpace = "nowrap";
          h.css = h.htmlCss;
          h.add = function (a) {
            const n = e.box.parentNode,
              m = [];
            let f;
            if ((this.parentGroup = a)) {
              if (((f = a.div), !f)) {
                for (; a; ) m.push(a), (a = a.parentGroup);
                m.reverse().forEach(function (a) {
                  function e(b, c) {
                    a[c] = b;
                    "translateX" === c
                      ? (d.left = b + "px")
                      : (d.top = b + "px");
                    a.doTransform = !0;
                  }
                  const l = u(a.element, "class"),
                    v = a.styles || {};
                  f = a.div =
                    a.div ||
                    D(
                      "div",
                      l ? { className: l } : void 0,
                      {
                        position: "absolute",
                        left: (a.translateX || 0) + "px",
                        top: (a.translateY || 0) + "px",
                        display: a.display,
                        opacity: a.opacity,
                        visibility: a.visibility,
                      },
                      f || n
                    );
                  const d = f.style;
                  E(a, {
                    classSetter: (function (b) {
                      return function (c) {
                        this.element.setAttribute("class", c);
                        b.className = c;
                      };
                    })(f),
                    css: function (b) {
                      h.css.call(a, b);
                      ["cursor", "pointerEvents"].forEach((c) => {
                        b[c] && (d[c] = b[c]);
                      });
                      return a;
                    },
                    on: function () {
                      m[0].div &&
                        h.on.apply(
                          { element: m[0].div, onEvents: a.onEvents },
                          arguments
                        );
                      return a;
                    },
                    translateXSetter: e,
                    translateYSetter: e,
                  });
                  a.addedSetters || x(a);
                  a.css(v);
                });
              }
            } else f = n;
            f.appendChild(g);
            h.added = !0;
            h.alignOnAdd && h.htmlUpdateTransform();
            return h;
          };
          return h;
        }
      }
      return q;
    }
  );
  L(a, "Core/Axis/AxisDefaults.js", [], function () {
    var a;
    (function (a) {
      a.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: "%H:%M:%S.%L", range: !1 },
          second: { main: "%H:%M:%S", range: !1 },
          minute: { main: "%H:%M", range: !1 },
          hour: { main: "%H:%M", range: !1 },
          day: { main: "%e %b" },
          week: { main: "%e %b" },
          month: { main: "%b '%y" },
          year: { main: "%Y" },
        },
        endOnTick: !1,
        gridLineDashStyle: "Solid",
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: 15,
          enabled: !0,
          indentation: 10,
          overflow: "justify",
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          zIndex: 7,
          style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: "Solid",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minorTicksPerMajor: 5,
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: "#666666", fontSize: "0.8em" },
        },
        type: "linear",
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#333333",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        gridLineWidth: void 0,
        tickColor: "#333333",
      };
      a.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: void 0 },
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: "justify",
          formatter: function () {
            const { numberFormatter: a } = this.axis.chart;
            return a(this.total || 0, -1);
          },
          style: {
            color: "#000000",
            fontSize: "0.7em",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      a.defaultLeftAxisOptions = { title: { rotation: 270 } };
      a.defaultRightAxisOptions = { title: { rotation: 90 } };
      a.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45] },
        margin: 15,
        title: { rotation: 0 },
      };
      a.defaultTopAxisOptions = {
        labels: { autoRotation: [-45] },
        margin: 15,
        title: { rotation: 0 },
      };
    })(a || (a = {}));
    return a;
  });
  L(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: u, isFunction: J, objectEach: K, removeEvent: G } = a;
    var D;
    (function (a) {
      a.registerEventOptions = function (a, t) {
        a.eventOptions = a.eventOptions || {};
        K(t.events, function (q, m) {
          a.eventOptions[m] !== q &&
            (a.eventOptions[m] &&
              (G(a, m, a.eventOptions[m]), delete a.eventOptions[m]),
            J(q) && ((a.eventOptions[m] = q), u(a, m, q, { order: 0 })));
        });
      };
    })(D || (D = {}));
    return D;
  });
  L(
    a,
    "Core/Axis/Tick.js",
    [a["Core/Templating.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A, J) {
      const { deg2rad: u } = A,
        {
          clamp: G,
          correctFloat: D,
          defined: E,
          destroyObjectProperties: B,
          extend: t,
          fireEvent: q,
          isNumber: m,
          merge: p,
          objectEach: n,
          pick: h,
        } = J;
      class g {
        constructor(a, g, h, n, m) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = g;
          this.type = h || "";
          this.parameters = m || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          q(this, "init");
          h || n || this.addLabel();
        }
        addLabel() {
          const e = this,
            g = e.axis;
          var n = g.options;
          const p = g.chart;
          var C = g.categories;
          const f = g.logarithmic,
            y = g.names,
            r = e.pos,
            l = h(e.options && e.options.labels, n.labels);
          var v = g.tickPositions;
          const d = r === v[0],
            b = r === v[v.length - 1],
            c = (!l.step || 1 === l.step) && 1 === g.tickInterval;
          v = v.info;
          let k = e.label,
            w,
            z,
            F;
          C = this.parameters.category || (C ? h(C[r], y[r], r) : r);
          f && m(C) && (C = D(f.lin2log(C)));
          g.dateTime &&
            (v
              ? ((z = p.time.resolveDTLFormat(
                  n.dateTimeLabelFormats[
                    (!n.grid && v.higherRanks[r]) || v.unitName
                  ]
                )),
                (w = z.main))
              : m(C) &&
                (w = g.dateTime.getXDateFormat(
                  C,
                  n.dateTimeLabelFormats || {}
                )));
          e.isFirst = d;
          e.isLast = b;
          const O = {
            axis: g,
            chart: p,
            dateTimeLabelFormat: w,
            isFirst: d,
            isLast: b,
            pos: r,
            tick: e,
            tickPositionInfo: v,
            value: C,
          };
          q(this, "labelFormat", O);
          const P = (b) =>
            l.formatter
              ? l.formatter.call(b, b)
              : l.format
              ? ((b.text = g.defaultLabelFormatter.call(b, b)),
                a.format(l.format, b, p))
              : g.defaultLabelFormatter.call(b, b);
          n = P.call(O, O);
          const T = z && z.list;
          e.shortenLabel = T
            ? function () {
                for (F = 0; F < T.length; F++)
                  if (
                    (t(O, { dateTimeLabelFormat: T[F] }),
                    k.attr({ text: P.call(O, O) }),
                    k.getBBox().width < g.getSlotWidth(e) - 2 * l.padding)
                  )
                    return;
                k.attr({ text: "" });
              }
            : void 0;
          c && g._addedPlotLB && e.moveLabel(n, l);
          E(k) || e.movedLabel
            ? k &&
              k.textStr !== n &&
              !c &&
              (!k.textWidth ||
                l.style.width ||
                k.styles.width ||
                k.css({ width: null }),
              k.attr({ text: n }),
              (k.textPxLength = k.getBBox().width))
            : ((e.label = k = e.createLabel({ x: 0, y: 0 }, n, l)),
              (e.rotation = 0));
        }
        createLabel(a, g, h) {
          const e = this.axis,
            n = e.chart;
          if (
            (a =
              E(g) && h.enabled
                ? n.renderer.text(g, a.x, a.y, h.useHTML).add(e.labelGroup)
                : null)
          )
            n.styledMode || a.css(p(h.style)),
              (a.textPxLength = a.getBBox().width);
          return a;
        }
        destroy() {
          B(this, this.axis);
        }
        getPosition(a, g, h, n) {
          const e = this.axis,
            f = e.chart,
            y = (n && f.oldChartHeight) || f.chartHeight;
          a = {
            x: a
              ? D(e.translate(g + h, void 0, void 0, n) + e.transB)
              : e.left +
                e.offset +
                (e.opposite
                  ? ((n && f.oldChartWidth) || f.chartWidth) - e.right - e.left
                  : 0),
            y: a
              ? y - e.bottom + e.offset - (e.opposite ? e.height : 0)
              : D(y - e.translate(g + h, void 0, void 0, n) - e.transB),
          };
          a.y = G(a.y, -1e5, 1e5);
          q(this, "afterGetPosition", { pos: a });
          return a;
        }
        getLabelPosition(a, g, n, m, p, f, y, r) {
          const l = this.axis,
            e = l.transA,
            d =
              l.isLinked && l.linkedParent
                ? l.linkedParent.reversed
                : l.reversed,
            b = l.staggerLines,
            c = l.tickRotCorr || { x: 0, y: 0 },
            k =
              m || l.reserveSpaceDefault
                ? 0
                : -l.labelOffset * ("center" === l.labelAlign ? 0.5 : 1),
            w = p.distance,
            z = {};
          n =
            0 === l.side
              ? n.rotation
                ? -w
                : -n.getBBox().height
              : 2 === l.side
              ? c.y + w
              : Math.cos(n.rotation * u) * (c.y - n.getBBox(!1, 0).height / 2);
          E(p.y) && (n = 0 === l.side && l.horiz ? p.y + n : p.y);
          a =
            a +
            h(p.x, [0, 1, 0, -1][l.side] * w) +
            k +
            c.x -
            (f && m ? f * e * (d ? -1 : 1) : 0);
          g = g + n - (f && !m ? f * e * (d ? 1 : -1) : 0);
          b &&
            ((m = (y / (r || 1)) % b),
            l.opposite && (m = b - m - 1),
            (g += (l.labelOffset / b) * m));
          z.x = a;
          z.y = Math.round(g);
          q(this, "afterGetLabelPosition", {
            pos: z,
            tickmarkOffset: f,
            index: y,
          });
          return z;
        }
        getLabelSize() {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        }
        getMarkPath(a, g, h, n, m, f) {
          return f.crispLine(
            [
              ["M", a, g],
              ["L", a + (m ? 0 : -h), g + (m ? h : 0)],
            ],
            n
          );
        }
        handleOverflow(a) {
          const e = this.axis,
            g = e.options.labels,
            n = a.x;
          var m = e.chart.chartWidth,
            f = e.chart.spacing;
          const y = h(e.labelLeft, Math.min(e.pos, f[3]));
          f = h(
            e.labelRight,
            Math.max(e.isRadial ? 0 : e.pos + e.len, m - f[1])
          );
          const r = this.label,
            l = this.rotation,
            v = { left: 0, center: 0.5, right: 1 }[
              e.labelAlign || r.attr("align")
            ],
            d = r.getBBox().width,
            b = e.getSlotWidth(this),
            c = {};
          let k = b,
            w = 1,
            z;
          if (l || "justify" !== g.overflow)
            0 > l && n - v * d < y
              ? (z = Math.round(n / Math.cos(l * u) - y))
              : 0 < l &&
                n + v * d > f &&
                (z = Math.round((m - n) / Math.cos(l * u)));
          else if (
            ((m = n + (1 - v) * d),
            n - v * d < y
              ? (k = a.x + k * (1 - v) - y)
              : m > f && ((k = f - a.x + k * v), (w = -1)),
            (k = Math.min(b, k)),
            k < b &&
              "center" === e.labelAlign &&
              (a.x += w * (b - k - v * (b - Math.min(d, k)))),
            d > k || (e.autoRotation && (r.styles || {}).width))
          )
            z = k;
          z &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((c.width = Math.floor(z) + "px"),
                (g.style || {}).textOverflow || (c.textOverflow = "ellipsis"),
                r.css(c)));
        }
        moveLabel(a, g) {
          const e = this;
          var h = e.label;
          const m = e.axis;
          let f = !1;
          h && h.textStr === a
            ? ((e.movedLabel = h), (f = !0), delete e.label)
            : n(m.ticks, function (g) {
                f ||
                  g.isNew ||
                  g === e ||
                  !g.label ||
                  g.label.textStr !== a ||
                  ((e.movedLabel = g.label),
                  (f = !0),
                  (g.labelPos = e.movedLabel.xy),
                  delete g.label);
              });
          f ||
            (!e.labelPos && !h) ||
            ((h = e.labelPos || h.xy),
            (e.movedLabel = e.createLabel(h, a, g)),
            e.movedLabel && e.movedLabel.attr({ opacity: 0 }));
        }
        render(a, g, n) {
          var e = this.axis,
            m = e.horiz,
            f = this.pos,
            y = h(this.tickmarkOffset, e.tickmarkOffset);
          f = this.getPosition(m, f, y, g);
          y = f.x;
          const r = f.y;
          e = (m && y === e.pos + e.len) || (!m && r === e.pos) ? -1 : 1;
          m = h(n, this.label && this.label.newOpacity, 1);
          n = h(n, 1);
          this.isActive = !0;
          this.renderGridLine(g, n, e);
          this.renderMark(f, n, e);
          this.renderLabel(f, g, m, a);
          this.isNew = !1;
          q(this, "afterRender");
        }
        renderGridLine(a, g, n) {
          const e = this.axis,
            m = e.options,
            f = {},
            y = this.pos,
            r = this.type,
            l = h(this.tickmarkOffset, e.tickmarkOffset),
            v = e.chart.renderer;
          let d = this.gridLine,
            b = m.gridLineWidth,
            c = m.gridLineColor,
            k = m.gridLineDashStyle;
          "minor" === this.type &&
            ((b = m.minorGridLineWidth),
            (c = m.minorGridLineColor),
            (k = m.minorGridLineDashStyle));
          d ||
            (e.chart.styledMode ||
              ((f.stroke = c), (f["stroke-width"] = b || 0), (f.dashstyle = k)),
            r || (f.zIndex = 1),
            a && (g = 0),
            (this.gridLine = d =
              v
                .path()
                .attr(f)
                .addClass("highcharts-" + (r ? r + "-" : "") + "grid-line")
                .add(e.gridGroup)));
          if (
            d &&
            (n = e.getPlotLinePath({
              value: y + l,
              lineWidth: d.strokeWidth() * n,
              force: "pass",
              old: a,
              acrossPanes: !1,
            }))
          )
            d[a || this.isNew ? "attr" : "animate"]({ d: n, opacity: g });
        }
        renderMark(a, g, n) {
          const e = this.axis;
          var m = e.options;
          const f = e.chart.renderer,
            y = this.type,
            r = e.tickSize(y ? y + "Tick" : "tick"),
            l = a.x;
          a = a.y;
          const v = h(
            m["minor" !== y ? "tickWidth" : "minorTickWidth"],
            !y && e.isXAxis ? 1 : 0
          );
          m = m["minor" !== y ? "tickColor" : "minorTickColor"];
          let d = this.mark;
          const b = !d;
          r &&
            (e.opposite && (r[0] = -r[0]),
            d ||
              ((this.mark = d =
                f
                  .path()
                  .addClass("highcharts-" + (y ? y + "-" : "") + "tick")
                  .add(e.axisGroup)),
              e.chart.styledMode || d.attr({ stroke: m, "stroke-width": v })),
            d[b ? "attr" : "animate"]({
              d: this.getMarkPath(l, a, r[0], d.strokeWidth() * n, e.horiz, f),
              opacity: g,
            }));
        }
        renderLabel(a, g, n, p) {
          var e = this.axis;
          const f = e.horiz,
            y = e.options,
            r = this.label,
            l = y.labels,
            v = l.step;
          e = h(this.tickmarkOffset, e.tickmarkOffset);
          const d = a.x;
          a = a.y;
          let b = !0;
          r &&
            m(d) &&
            ((r.xy = a = this.getLabelPosition(d, a, r, f, l, e, p, v)),
            (this.isFirst && !this.isLast && !y.showFirstLabel) ||
            (this.isLast && !this.isFirst && !y.showLastLabel)
              ? (b = !1)
              : !f ||
                l.step ||
                l.rotation ||
                g ||
                0 === n ||
                this.handleOverflow(a),
            v && p % v && (b = !1),
            b && m(a.y)
              ? ((a.opacity = n),
                r[this.isNewLabel ? "attr" : "animate"](a).show(!0),
                (this.isNewLabel = !1))
              : (r.hide(), (this.isNewLabel = !0)));
        }
        replaceMovedLabel() {
          const a = this.label,
            g = this.axis;
          a &&
            !this.isNew &&
            (a.animate({ opacity: 0 }, void 0, a.destroy), delete this.label);
          g.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        }
      }
      ("");
      return g;
    }
  );
  L(
    a,
    "Core/Axis/Axis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/AxisDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E, B) {
      const { animObject: t } = a,
        { defaultOptions: q } = K,
        { registerEventOptions: m } = G,
        { deg2rad: p } = D,
        {
          arrayMax: n,
          arrayMin: h,
          clamp: g,
          correctFloat: e,
          defined: x,
          destroyObjectProperties: I,
          erase: u,
          error: C,
          extend: f,
          fireEvent: y,
          getClosestDistance: r,
          insertItem: l,
          isArray: v,
          isNumber: d,
          isString: b,
          merge: c,
          normalizeTickInterval: k,
          objectEach: w,
          pick: z,
          relativeLength: F,
          removeEvent: O,
          splat: P,
          syncTimeout: T,
        } = B,
        U = (b, c) =>
          k(
            c,
            void 0,
            void 0,
            z(b.options.allowDecimals, 0.5 > c || void 0 !== b.tickAmount),
            !!b.tickAmount
          );
      class W {
        constructor(b, c, d) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.index =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(b, c, d);
        }
        init(b, c, k = this.coll) {
          const a = "xAxis" === k;
          this.chart = b;
          this.horiz = this.isZAxis || (b.inverted ? !a : a);
          this.isXAxis = a;
          this.coll = k;
          y(this, "init", { userOptions: c });
          this.opposite = z(c.opposite, this.opposite);
          this.side = z(
            c.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
          );
          this.setOptions(c);
          k = this.options;
          const f = k.labels,
            e = k.type;
          this.userOptions = c;
          this.minPixelPadding = 0;
          this.reversed = z(k.reversed, this.reversed);
          this.visible = k.visible;
          this.zoomEnabled = k.zoomEnabled;
          this.hasNames = "category" === e || !0 === k.categories;
          this.categories = k.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = x(k.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = k.minRange || k.maxZoom;
          this.range = k.range;
          this.offset = k.offset || 0;
          this.min = this.max = null;
          c = z(k.crosshair, P(b.options.tooltip.crosshairs)[a ? 0 : 1]);
          this.crosshair = !0 === c ? {} : c;
          -1 === b.axes.indexOf(this) &&
            (a ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
            l(this, b[this.coll]));
          b.orderItems(this.coll);
          this.series = this.series || [];
          b.inverted &&
            !this.isZAxis &&
            a &&
            "undefined" === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = d(f.rotation) ? f.rotation : void 0;
          m(this, k);
          y(this, "afterInit");
        }
        setOptions(b) {
          this.options = c(
            A.defaultXAxisOptions,
            "yAxis" === this.coll && A.defaultYAxisOptions,
            [
              A.defaultTopAxisOptions,
              A.defaultRightAxisOptions,
              A.defaultBottomAxisOptions,
              A.defaultLeftAxisOptions,
            ][this.side],
            c(q[this.coll], b)
          );
          y(this, "afterSetOptions", { userOptions: b });
        }
        defaultLabelFormatter(b) {
          var c = this.axis;
          ({ numberFormatter: b } = this.chart);
          const k = d(this.value) ? this.value : NaN,
            a = c.chart.time,
            f = this.dateTimeLabelFormat;
          var e = q.lang;
          const l = e.numericSymbols;
          e = e.numericSymbolMagnitude || 1e3;
          const H = c.logarithmic ? Math.abs(k) : c.tickInterval;
          let w = l && l.length,
            g;
          if (c.categories) g = `${this.value}`;
          else if (f) g = a.dateFormat(f, k);
          else if (w && 1e3 <= H)
            for (; w-- && "undefined" === typeof g; )
              (c = Math.pow(e, w + 1)),
                H >= c &&
                  0 === (10 * k) % c &&
                  null !== l[w] &&
                  0 !== k &&
                  (g = b(k / c, -1) + l[w]);
          "undefined" === typeof g &&
            (g = 1e4 <= Math.abs(k) ? b(k, -1) : b(k, -1, void 0, ""));
          return g;
        }
        getSeriesExtremes() {
          const b = this,
            c = b.chart;
          let k;
          y(this, "getSeriesExtremes", null, function () {
            b.hasVisibleSeries = !1;
            b.dataMin = b.dataMax = b.threshold = null;
            b.softThreshold = !b.isXAxis;
            b.series.forEach(function (a) {
              if (a.visible || !c.options.chart.ignoreHiddenSeries) {
                var f = a.options;
                let c = f.threshold,
                  e,
                  l;
                b.hasVisibleSeries = !0;
                b.positiveValuesOnly && 0 >= c && (c = null);
                if (b.isXAxis)
                  (f = a.xData) &&
                    f.length &&
                    ((f = b.logarithmic ? f.filter((b) => 0 < b) : f),
                    (k = a.getXExtremes(f)),
                    (e = k.min),
                    (l = k.max),
                    d(e) ||
                      e instanceof Date ||
                      ((f = f.filter(d)),
                      (k = a.getXExtremes(f)),
                      (e = k.min),
                      (l = k.max)),
                    f.length &&
                      ((b.dataMin = Math.min(z(b.dataMin, e), e)),
                      (b.dataMax = Math.max(z(b.dataMax, l), l))));
                else if (
                  ((a = a.applyExtremes()),
                  d(a.dataMin) &&
                    ((e = a.dataMin),
                    (b.dataMin = Math.min(z(b.dataMin, e), e))),
                  d(a.dataMax) &&
                    ((l = a.dataMax),
                    (b.dataMax = Math.max(z(b.dataMax, l), l))),
                  x(c) && (b.threshold = c),
                  !f.softThreshold || b.positiveValuesOnly)
                )
                  b.softThreshold = !1;
              }
            });
          });
          y(this, "afterGetSeriesExtremes");
        }
        translate(b, c, k, a, f, l) {
          const w = this.linkedParent || this,
            H = a && w.old ? w.old.min : w.min;
          if (!d(H)) return NaN;
          const g = w.minPixelPadding;
          f =
            (w.isOrdinal ||
              (w.brokenAxis && w.brokenAxis.hasBreaks) ||
              (w.logarithmic && f)) &&
            w.lin2val;
          let r = 1,
            z = 0;
          a = a && w.old ? w.old.transA : w.transA;
          a || (a = w.transA);
          k && ((r *= -1), (z = w.len));
          w.reversed && ((r *= -1), (z -= r * (w.sector || w.len)));
          c
            ? ((l = (b * r + z - g) / a + H), f && (l = w.lin2val(l)))
            : (f && (b = w.val2lin(b)),
              (b = r * (b - H) * a),
              (l = (w.isRadial ? b : e(b)) + z + r * g + (d(l) ? a * l : 0)));
          return l;
        }
        toPixels(b, c) {
          return (
            this.translate(b, !1, !this.horiz, void 0, !0) + (c ? 0 : this.pos)
          );
        }
        toValue(b, c) {
          return this.translate(
            b - (c ? 0 : this.pos),
            !0,
            !this.horiz,
            void 0,
            !0
          );
        }
        getPlotLinePath(b) {
          function c(b, c, d) {
            "pass" !== n &&
              (b < c || b > d) &&
              (n ? (b = g(b, c, d)) : (O = !0));
            return b;
          }
          const k = this,
            a = k.chart,
            f = k.left,
            e = k.top,
            l = b.old,
            w = b.value,
            H = b.lineWidth,
            r = (l && a.oldChartHeight) || a.chartHeight,
            v = (l && a.oldChartWidth) || a.chartWidth,
            F = k.transB;
          let h = b.translatedValue,
            n = b.force,
            m,
            x,
            p,
            q,
            O;
          b = {
            value: w,
            lineWidth: H,
            old: l,
            force: n,
            acrossPanes: b.acrossPanes,
            translatedValue: h,
          };
          y(this, "getPlotLinePath", b, function (b) {
            h = z(h, k.translate(w, void 0, void 0, l));
            h = g(h, -1e5, 1e5);
            m = p = Math.round(h + F);
            x = q = Math.round(r - h - F);
            d(h)
              ? k.horiz
                ? ((x = e), (q = r - k.bottom), (m = p = c(m, f, f + k.width)))
                : ((m = f), (p = v - k.right), (x = q = c(x, e, e + k.height)))
              : ((O = !0), (n = !1));
            b.path =
              O && !n
                ? null
                : a.renderer.crispLine(
                    [
                      ["M", m, x],
                      ["L", p, q],
                    ],
                    H || 1
                  );
          });
          return b.path;
        }
        getLinearTickPositions(b, c, d) {
          const k = e(Math.floor(c / b) * b);
          d = e(Math.ceil(d / b) * b);
          const a = [];
          let f, l;
          e(k + b) === k && (l = 20);
          if (this.single) return [c];
          for (c = k; c <= d; ) {
            a.push(c);
            c = e(c + b, l);
            if (c === f) break;
            f = c;
          }
          return a;
        }
        getMinorTickInterval() {
          const b = this.options;
          return !0 === b.minorTicks
            ? z(b.minorTickInterval, "auto")
            : !1 === b.minorTicks
            ? null
            : b.minorTickInterval;
        }
        getMinorTickPositions() {
          var b = this.options;
          const c = this.tickPositions,
            d = this.minorTickInterval;
          var k = this.pointRangePadding || 0;
          const a = this.min - k;
          k = this.max + k;
          const f = k - a;
          let l = [];
          if (f && f / d < this.len / 3) {
            const f = this.logarithmic;
            if (f)
              this.paddedTicks.forEach(function (b, c, k) {
                c &&
                  l.push.apply(l, f.getLogTickPositions(d, k[c - 1], k[c], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              l = l.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(d),
                  a,
                  k,
                  b.startOfWeek
                )
              );
            else
              for (b = a + ((c[0] - a) % d); b <= k && b !== l[0]; b += d)
                l.push(b);
          }
          0 !== l.length && this.trimTicks(l);
          return l;
        }
        adjustForMinRange() {
          const b = this.options,
            c = this.logarithmic;
          let d = this.min;
          var k = this.max;
          let a, f;
          if (this.isXAxis && "undefined" === typeof this.minRange && !c)
            if (x(b.min) || x(b.max) || x(b.floor) || x(b.ceiling))
              this.minRange = null;
            else {
              var l =
                r(
                  this.series.map((b) => {
                    var c;
                    return (
                      (b.xIncrement
                        ? null === (c = b.xData) || void 0 === c
                          ? void 0
                          : c.slice(0, 2)
                        : b.xData) || []
                    );
                  })
                ) || 0;
              this.minRange = Math.min(5 * l, this.dataMax - this.dataMin);
            }
          k - d < this.minRange &&
            ((l = this.dataMax - this.dataMin >= this.minRange),
            (f = this.minRange),
            (k = (f - k + d) / 2),
            (a = [d - k, z(b.min, d - k)]),
            l && (a[2] = c ? c.log2lin(this.dataMin) : this.dataMin),
            (d = n(a)),
            (k = [d + f, z(b.max, d + f)]),
            l && (k[2] = c ? c.log2lin(this.dataMax) : this.dataMax),
            (k = h(k)),
            k - d < f &&
              ((a[0] = k - f), (a[1] = z(b.min, k - f)), (d = n(a))));
          this.min = d;
          this.max = k;
        }
        getClosest() {
          let b, c;
          if (this.categories) c = 1;
          else {
            const d = [];
            this.series.forEach(function (b) {
              var k;
              const a = b.closestPointRange,
                f = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
              1 === (null === (k = b.xData) || void 0 === k ? void 0 : k.length)
                ? d.push(b.xData[0])
                : !b.noSharedTooltip &&
                  x(a) &&
                  f &&
                  (c = x(c) ? Math.min(c, a) : a);
            });
            d.length && (d.sort((b, c) => b - c), (b = r([d])));
          }
          return b && c ? Math.min(b, c) : b || c;
        }
        nameToX(b) {
          const c = v(this.options.categories),
            d = c ? this.categories : this.names;
          let k = b.options.x,
            a;
          b.series.requireSorting = !1;
          x(k) ||
            (k =
              this.options.uniqueNames && d
                ? c
                  ? d.indexOf(b.name)
                  : z(d.keys[b.name], -1)
                : b.series.autoIncrement());
          -1 === k ? !c && d && (a = d.length) : (a = k);
          "undefined" !== typeof a
            ? ((this.names[a] = b.name), (this.names.keys[b.name] = a))
            : b.x && (a = b.x);
          return a;
        }
        updateNames() {
          const b = this,
            c = this.names;
          0 < c.length &&
            (Object.keys(c.keys).forEach(function (b) {
              delete c.keys[b];
            }),
            (c.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (c) {
              c.xIncrement = null;
              if (!c.points || c.isDirtyData)
                (b.max = Math.max(b.max, c.xData.length - 1)),
                  c.processData(),
                  c.generatePoints();
              c.data.forEach(function (d, k) {
                let a;
                d &&
                  d.options &&
                  "undefined" !== typeof d.name &&
                  ((a = b.nameToX(d)),
                  "undefined" !== typeof a &&
                    a !== d.x &&
                    ((d.x = a), (c.xData[k] = a)));
              });
            }));
        }
        setAxisTranslation() {
          const c = this,
            d = c.max - c.min;
          var k = c.linkedParent;
          const a = !!c.categories,
            f = c.isXAxis;
          let l = c.axisPointRange || 0,
            e,
            w = 0,
            g = 0,
            r = c.transA;
          if (f || a || l)
            (e = c.getClosest()),
              k
                ? ((w = k.minPointOffset), (g = k.pointRangePadding))
                : c.series.forEach(function (d) {
                    const k = a
                        ? 1
                        : f
                        ? z(d.options.pointRange, e, 0)
                        : c.axisPointRange || 0,
                      r = d.options.pointPlacement;
                    l = Math.max(l, k);
                    if (!c.single || a)
                      (d = d.is("xrange") ? !f : f),
                        (w = Math.max(w, d && b(r) ? 0 : k / 2)),
                        (g = Math.max(g, d && "on" === r ? 0 : k));
                  }),
              (k = c.ordinal && c.ordinal.slope && e ? c.ordinal.slope / e : 1),
              (c.minPointOffset = w *= k),
              (c.pointRangePadding = g *= k),
              (c.pointRange = Math.min(l, c.single && a ? 1 : d)),
              f && e && (c.closestPointRange = e);
          c.translationSlope =
            c.transA =
            r =
              c.staticScale || c.len / (d + g || 1);
          c.transB = c.horiz ? c.left : c.bottom;
          c.minPixelPadding = r * w;
          y(this, "afterSetAxisTranslation");
        }
        minFromRange() {
          return this.max - this.range;
        }
        setTickInterval(b) {
          var c = this.chart;
          const k = this.logarithmic,
            a = this.options,
            f = this.isXAxis,
            l = this.isLinked,
            w = a.tickPixelInterval,
            g = this.categories,
            r = this.softThreshold;
          let v = a.maxPadding,
            F = a.minPadding;
          let h =
              d(a.tickInterval) && 0 <= a.tickInterval
                ? a.tickInterval
                : void 0,
            H = d(this.threshold) ? this.threshold : null,
            n,
            m,
            p;
          this.dateTime || g || l || this.getTickAmount();
          m = z(this.userMin, a.min);
          p = z(this.userMax, a.max);
          if (l) {
            this.linkedParent = c[this.coll][a.linkedTo];
            var q = this.linkedParent.getExtremes();
            this.min = z(q.min, q.dataMin);
            this.max = z(q.max, q.dataMax);
            a.type !== this.linkedParent.options.type && C(11, 1, c);
          } else
            r &&
              x(H) &&
              (this.dataMin >= H
                ? ((q = H), (F = 0))
                : this.dataMax <= H && ((n = H), (v = 0))),
              (this.min = z(m, q, this.dataMin)),
              (this.max = z(p, n, this.dataMax));
          k &&
            (this.positiveValuesOnly &&
              !b &&
              0 >= Math.min(this.min, z(this.dataMin, this.min)) &&
              C(10, 1, c),
            (this.min = e(k.log2lin(this.min), 16)),
            (this.max = e(k.log2lin(this.max), 16)));
          this.range &&
            x(this.max) &&
            ((this.userMin =
              this.min =
              m =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = p = this.max),
            (this.range = null));
          y(this, "foundExtremes");
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !d(this.userMin) &&
            d(a.softMin) &&
            a.softMin < this.min &&
            (this.min = m = a.softMin);
          !d(this.userMax) &&
            d(a.softMax) &&
            a.softMax > this.max &&
            (this.max = p = a.softMax);
          !(
            g ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            l
          ) &&
            x(this.min) &&
            x(this.max) &&
            (c = this.max - this.min) &&
            (!x(m) && F && (this.min -= c * F),
            !x(p) && v && (this.max += c * v));
          !d(this.userMin) &&
            d(a.floor) &&
            (this.min = Math.max(this.min, a.floor));
          !d(this.userMax) &&
            d(a.ceiling) &&
            (this.max = Math.min(this.max, a.ceiling));
          r &&
            x(this.dataMin) &&
            ((H = H || 0),
            !x(m) && this.min < H && this.dataMin >= H
              ? (this.min = this.options.minRange
                  ? Math.min(H, this.max - this.minRange)
                  : H)
              : !x(p) &&
                this.max > H &&
                this.dataMax <= H &&
                (this.max = this.options.minRange
                  ? Math.max(H, this.min + this.minRange)
                  : H));
          d(this.min) &&
            d(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (x(this.options.min)
              ? (this.max = this.min)
              : x(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            "undefined" === typeof this.min ||
            "undefined" === typeof this.max
              ? 1
              : l &&
                this.linkedParent &&
                !h &&
                w === this.linkedParent.options.tickPixelInterval
              ? (h = this.linkedParent.tickInterval)
              : z(
                  h,
                  this.tickAmount
                    ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                    : void 0,
                  g ? 1 : ((this.max - this.min) * w) / Math.max(this.len, w)
                );
          if (f && !b) {
            const b =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (c) {
              c.forceCrop = c.forceCropping && c.forceCropping();
              c.processData(b);
            });
            y(this, "postProcessData", { hasExtremesChanged: b });
          }
          this.setAxisTranslation();
          y(this, "initialAxisTranslation");
          this.pointRange &&
            !h &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          b = z(
            a.minTickInterval,
            this.dateTime && !this.series.some((b) => b.noSharedTooltip)
              ? this.closestPointRange
              : 0
          );
          !h && this.tickInterval < b && (this.tickInterval = b);
          this.dateTime ||
            this.logarithmic ||
            h ||
            (this.tickInterval = U(this, this.tickInterval));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        }
        setTickPositions() {
          var b = this.options;
          const c = b.tickPositions,
            k = b.tickPositioner;
          var a = this.getMinorTickInterval(),
            f = this.hasVerticalPanning(),
            l = "colorAxis" === this.coll;
          const e = (l || !f) && b.startOnTick;
          f = (l || !f) && b.endOnTick;
          l = [];
          let w;
          this.tickmarkOffset =
            this.categories &&
            "between" === b.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === a && this.tickInterval
              ? this.tickInterval / b.minorTicksPerMajor
              : a;
          this.single =
            this.min === this.max &&
            x(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
          if (c) l = c.slice();
          else if (d(this.min) && d(this.max)) {
            if (
              (this.ordinal && this.ordinal.positions) ||
              !(
                (this.max - this.min) / this.tickInterval >
                Math.max(2 * this.len, 200)
              )
            )
              if (this.dateTime)
                l = this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(
                    this.tickInterval,
                    b.units
                  ),
                  this.min,
                  this.max,
                  b.startOfWeek,
                  this.ordinal && this.ordinal.positions,
                  this.closestPointRange,
                  !0
                );
              else if (this.logarithmic)
                l = this.logarithmic.getLogTickPositions(
                  this.tickInterval,
                  this.min,
                  this.max
                );
              else
                for (a = b = this.tickInterval; a <= 2 * b; )
                  if (
                    ((l = this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    )),
                    this.tickAmount && l.length > this.tickAmount)
                  )
                    this.tickInterval = U(this, (a *= 1.1));
                  else break;
            else (l = [this.min, this.max]), C(19, !1, this.chart);
            l.length > this.len &&
              ((l = [l[0], l[l.length - 1]]), l[0] === l[1] && (l.length = 1));
            k &&
              ((this.tickPositions = l),
              (w = k.apply(this, [this.min, this.max])) && (l = w));
          }
          this.tickPositions = l;
          this.paddedTicks = l.slice(0);
          this.trimTicks(l, e, f);
          !this.isLinked &&
            d(this.min) &&
            d(this.max) &&
            (this.single &&
              2 > l.length &&
              !this.categories &&
              !this.series.some(
                (b) => b.is("heatmap") && "between" === b.options.pointPlacement
              ) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            c || w || this.adjustTickAmount());
          y(this, "afterSetTickPositions");
        }
        trimTicks(b, c, d) {
          const k = b[0],
            a = b[b.length - 1],
            f = (!this.isOrdinal && this.minPointOffset) || 0;
          y(this, "trimTicks");
          if (!this.isLinked) {
            if (c && -Infinity !== k) this.min = k;
            else for (; this.min - f > b[0]; ) b.shift();
            if (d) this.max = a;
            else for (; this.max + f < b[b.length - 1]; ) b.pop();
            0 === b.length &&
              x(k) &&
              !this.options.tickPositions &&
              b.push((a + k) / 2);
          }
        }
        alignToOthers() {
          const b = this,
            c = [this],
            k = b.options,
            a =
              "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
            f = [];
          let l;
          b.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && k.alignTicks) ||
              a) &&
            !1 !== k.startOnTick &&
            !1 !== k.endOnTick &&
            !b.logarithmic
          ) {
            const d = (b) => {
                const { horiz: c, options: d } = b;
                return [c ? d.left : d.top, d.width, d.height, d.pane].join();
              },
              k = d(this);
            this.chart[this.coll].forEach(function (a) {
              const { series: f } = a;
              f.length &&
                f.some((b) => b.visible) &&
                a !== b &&
                d(a) === k &&
                ((l = !0), c.push(a));
            });
          }
          if (l && a) {
            c.forEach((c) => {
              c = c.getThresholdAlignment(b);
              d(c) && f.push(c);
            });
            const k =
              1 < f.length ? f.reduce((b, c) => b + c, 0) / f.length : void 0;
            c.forEach((b) => {
              b.thresholdAlignment = k;
            });
          }
          return l;
        }
        getThresholdAlignment(b) {
          (!d(this.dataMin) ||
            (this !== b &&
              this.series.some((b) => b.isDirty || b.isDirtyData))) &&
            this.getSeriesExtremes();
          if (d(this.threshold))
            return (
              (b = g(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1
              )),
              this.options.reversed && (b = 1 - b),
              b
            );
        }
        getTickAmount() {
          const b = this.options,
            c = b.tickPixelInterval;
          let d = b.tickAmount;
          !x(b.tickInterval) &&
            !d &&
            this.len < c &&
            !this.isRadial &&
            !this.logarithmic &&
            b.startOnTick &&
            b.endOnTick &&
            (d = 2);
          !d && this.alignToOthers() && (d = Math.ceil(this.len / c) + 1);
          4 > d && ((this.finalTickAmt = d), (d = 5));
          this.tickAmount = d;
        }
        adjustTickAmount() {
          const b = this,
            {
              finalTickAmt: c,
              max: k,
              min: a,
              options: f,
              tickPositions: l,
              tickAmount: w,
              thresholdAlignment: g,
            } = b,
            r = l && l.length;
          var v = z(b.threshold, b.softThreshold ? 0 : null);
          var F = b.tickInterval;
          let h;
          d(g) &&
            ((h = 0.5 > g ? Math.ceil(g * (w - 1)) : Math.floor(g * (w - 1))),
            f.reversed && (h = w - 1 - h));
          if (b.hasData() && d(a) && d(k)) {
            const g = () => {
              b.transA *= (r - 1) / (w - 1);
              b.min = f.startOnTick ? l[0] : Math.min(a, l[0]);
              b.max = f.endOnTick
                ? l[l.length - 1]
                : Math.max(k, l[l.length - 1]);
            };
            if (d(h) && d(b.threshold)) {
              for (
                ;
                l[h] !== v || l.length !== w || l[0] > a || l[l.length - 1] < k;

              ) {
                l.length = 0;
                for (l.push(b.threshold); l.length < w; )
                  void 0 === l[h] || l[h] > b.threshold
                    ? l.unshift(e(l[0] - F))
                    : l.push(e(l[l.length - 1] + F));
                if (F > 8 * b.tickInterval) break;
                F *= 2;
              }
              g();
            } else if (r < w) {
              for (; l.length < w; )
                l.length % 2 || a === v
                  ? l.push(e(l[l.length - 1] + F))
                  : l.unshift(e(l[0] - F));
              g();
            }
            if (x(c)) {
              for (F = v = l.length; F--; )
                ((3 === c && 1 === F % 2) || (2 >= c && 0 < F && F < v - 1)) &&
                  l.splice(F, 1);
              b.finalTickAmt = void 0;
            }
          }
        }
        setScale() {
          let b = !1,
            c = !1;
          this.series.forEach(function (d) {
            b = b || d.isDirtyData || d.isDirty;
            c = c || (d.xAxis && d.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          const d = this.len !== (this.old && this.old.len);
          d ||
          b ||
          c ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking &&
                (this.stacking.resetStacks(), this.stacking.buildStacks()),
              (this.forceRedraw = !1),
              this.userMinRange || (this.minRange = void 0),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  d ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          b && this.panningState && (this.panningState.isDirty = !0);
          y(this, "afterSetScale");
        }
        setExtremes(b, c, d, k, a) {
          const l = this,
            e = l.chart;
          d = z(d, !0);
          l.series.forEach(function (b) {
            delete b.kdTree;
          });
          a = f(a, { min: b, max: c });
          y(l, "setExtremes", a, function () {
            l.userMin = b;
            l.userMax = c;
            l.eventArgs = a;
            d && e.redraw(k);
          });
        }
        zoom(b, c) {
          const d = this,
            k = this.dataMin,
            a = this.dataMax,
            f = this.options,
            l = Math.min(k, z(f.min, k)),
            e = Math.max(a, z(f.max, a));
          b = { newMin: b, newMax: c };
          y(this, "zoom", b, function (b) {
            let c = b.newMin,
              f = b.newMax;
            if (c !== d.min || f !== d.max)
              d.allowZoomOutside ||
                (x(k) && (c < l && (c = l), c > e && (c = e)),
                x(a) && (f < l && (f = l), f > e && (f = e))),
                (d.displayBtn =
                  "undefined" !== typeof c || "undefined" !== typeof f),
                d.setExtremes(c, f, !1, void 0, { trigger: "zoom" });
            b.zoomed = !0;
          });
          return b.zoomed;
        }
        setAxisSize() {
          const b = this.chart;
          var c = this.options;
          const d = c.offsets || [0, 0, 0, 0],
            k = this.horiz,
            a = (this.width = Math.round(
              F(z(c.width, b.plotWidth - d[3] + d[1]), b.plotWidth)
            )),
            f = (this.height = Math.round(
              F(z(c.height, b.plotHeight - d[0] + d[2]), b.plotHeight)
            )),
            l = (this.top = Math.round(
              F(z(c.top, b.plotTop + d[0]), b.plotHeight, b.plotTop)
            ));
          c = this.left = Math.round(
            F(z(c.left, b.plotLeft + d[3]), b.plotWidth, b.plotLeft)
          );
          this.bottom = b.chartHeight - f - l;
          this.right = b.chartWidth - a - c;
          this.len = Math.max(k ? a : f, 0);
          this.pos = k ? c : l;
        }
        getExtremes() {
          const b = this.logarithmic;
          return {
            min: b ? e(b.lin2log(this.min)) : this.min,
            max: b ? e(b.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        }
        getThreshold(b) {
          var c = this.logarithmic;
          const d = c ? c.lin2log(this.min) : this.min;
          c = c ? c.lin2log(this.max) : this.max;
          null === b || -Infinity === b
            ? (b = d)
            : Infinity === b
            ? (b = c)
            : d > b
            ? (b = d)
            : c < b && (b = c);
          return this.translate(b, 0, 1, 0, 1);
        }
        autoLabelAlign(b) {
          const c = (z(b, 0) - 90 * this.side + 720) % 360;
          b = { align: "center" };
          y(this, "autoLabelAlign", b, function (b) {
            15 < c && 165 > c
              ? (b.align = "right")
              : 195 < c && 345 > c && (b.align = "left");
          });
          return b.align;
        }
        tickSize(b) {
          const c = this.options,
            d = z(
              c["tick" === b ? "tickWidth" : "minorTickWidth"],
              "tick" === b && this.isXAxis && !this.categories ? 1 : 0
            );
          let k = c["tick" === b ? "tickLength" : "minorTickLength"],
            a;
          d && k && ("inside" === c[b + "Position"] && (k = -k), (a = [k, d]));
          b = { tickSize: a };
          y(this, "afterTickSize", b);
          return b.tickSize;
        }
        labelMetrics() {
          const b = this.chart.renderer;
          var c = this.ticks;
          c = c[Object.keys(c)[0]] || {};
          return this.chart.renderer.fontMetrics(
            c.label || c.movedLabel || b.box
          );
        }
        unsquish() {
          const b = this.options.labels;
          var c = this.horiz;
          const k = this.tickInterval,
            a =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / k),
            f = b.rotation,
            l = 0.75 * this.labelMetrics().h,
            w = Math.max(this.max - this.min, 0),
            g = function (b) {
              let c = b / (a || 1);
              c = 1 < c ? Math.ceil(c) : 1;
              c * k > w &&
                Infinity !== b &&
                Infinity !== a &&
                w &&
                (c = Math.ceil(w / k));
              return e(c * k);
            };
          let r = k,
            v,
            F = Number.MAX_VALUE,
            h;
          if (c) {
            if (
              (b.staggerLines ||
                (d(f)
                  ? (h = [f])
                  : a < b.autoRotationLimit && (h = b.autoRotation)),
              h)
            ) {
              let b;
              for (const d of h)
                if (d === f || (d && -90 <= d && 90 >= d))
                  (c = g(Math.abs(l / Math.sin(p * d)))),
                    (b = c + Math.abs(d / 360)),
                    b < F && ((F = b), (v = d), (r = c));
            }
          } else r = g(l);
          this.autoRotation = h;
          this.labelRotation = z(v, d(f) ? f : 0);
          return b.step ? k : r;
        }
        getSlotWidth(b) {
          const c = this.chart,
            k = this.horiz,
            a = this.options.labels,
            f = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            l = c.margin[3];
          if (b && d(b.slotWidth)) return b.slotWidth;
          if (k && 2 > a.step)
            return a.rotation ? 0 : ((this.staggerLines || 1) * this.len) / f;
          if (!k) {
            b = a.style.width;
            if (void 0 !== b) return parseInt(String(b), 10);
            if (l) return l - c.spacing[3];
          }
          return 0.33 * c.chartWidth;
        }
        renderUnsquish() {
          const c = this.chart,
            d = c.renderer,
            k = this.tickPositions,
            a = this.ticks,
            f = this.options.labels,
            l = f.style,
            e = this.horiz,
            w = this.getSlotWidth();
          var g = Math.max(1, Math.round(w - 2 * f.padding));
          const r = {},
            z = this.labelMetrics(),
            v = l.textOverflow;
          let F,
            h,
            y = 0;
          b(f.rotation) || (r.rotation = f.rotation || 0);
          k.forEach(function (b) {
            b = a[b];
            b.movedLabel && b.replaceMovedLabel();
            b &&
              b.label &&
              b.label.textPxLength > y &&
              (y = b.label.textPxLength);
          });
          this.maxLabelLength = y;
          if (this.autoRotation)
            y > g && y > z.h
              ? (r.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (w && ((F = g), !v))
            for (h = "clip", g = k.length; !e && g--; ) {
              var n = k[g];
              if ((n = a[n].label))
                n.styles && "ellipsis" === n.styles.textOverflow
                  ? n.css({ textOverflow: "clip" })
                  : n.textPxLength > w && n.css({ width: w + "px" }),
                  n.getBBox().height > this.len / k.length - (z.h - z.f) &&
                    (n.specificTextOverflow = "ellipsis");
            }
          r.rotation &&
            ((F = y > 0.5 * c.chartHeight ? 0.33 * c.chartHeight : y),
            v || (h = "ellipsis"));
          if (
            (this.labelAlign =
              f.align || this.autoLabelAlign(this.labelRotation))
          )
            r.align = this.labelAlign;
          k.forEach(function (b) {
            const c = (b = a[b]) && b.label,
              d = l.width,
              k = {};
            c &&
              (c.attr(r),
              b.shortenLabel
                ? b.shortenLabel()
                : F &&
                  !d &&
                  "nowrap" !== l.whiteSpace &&
                  (F < c.textPxLength || "SPAN" === c.element.tagName)
                ? ((k.width = F + "px"),
                  v || (k.textOverflow = c.specificTextOverflow || h),
                  c.css(k))
                : c.styles &&
                  c.styles.width &&
                  !k.width &&
                  !d &&
                  c.css({ width: null }),
              delete c.specificTextOverflow,
              (b.rotation = r.rotation));
          }, this);
          this.tickRotCorr = d.rotCorr(
            z.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        }
        hasData() {
          return (
            this.series.some(function (b) {
              return b.hasData();
            }) ||
            (this.options.showEmpty && x(this.min) && x(this.max))
          );
        }
        addTitle(b) {
          const d = this.chart.renderer,
            k = this.horiz,
            a = this.opposite,
            f = this.options.title,
            l = this.chart.styledMode;
          let e;
          this.axisTitle ||
            ((e = f.textAlign) ||
              (e = (
                k
                  ? { low: "left", middle: "center", high: "right" }
                  : {
                      low: a ? "right" : "left",
                      middle: "center",
                      high: a ? "left" : "right",
                    }
              )[f.align]),
            (this.axisTitle = d
              .text(f.text || "", 0, 0, f.useHTML)
              .attr({ zIndex: 7, rotation: f.rotation, align: e })
              .addClass("highcharts-axis-title")),
            l || this.axisTitle.css(c(f.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          l ||
            f.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[b ? "show" : "hide"](b);
        }
        generateTick(b) {
          const c = this.ticks;
          c[b] ? c[b].addLabel() : (c[b] = new E(this, b));
        }
        getOffset() {
          const b = this,
            {
              chart: c,
              horiz: k,
              options: a,
              side: f,
              ticks: l,
              tickPositions: e,
              coll: g,
              axisParent: r,
            } = b,
            v = c.renderer,
            F = c.inverted && !b.isZAxis ? [1, 0, 3, 2][f] : f;
          var h = b.hasData();
          const n = a.title;
          var m = a.labels;
          const p = d(a.crossing);
          var q = c.axisOffset;
          const O = c.clipOffset,
            I = [-1, 1, 1, -1][f],
            t = a.className;
          let P,
            T = 0,
            u;
          var C = 0;
          let M = 0;
          b.showAxis = P = h || a.showEmpty;
          b.staggerLines = (b.horiz && m.staggerLines) || void 0;
          if (!b.axisGroup) {
            const c = (b, c, d) =>
              v
                .g(b)
                .attr({ zIndex: d })
                .addClass(
                  `highcharts-${g.toLowerCase()}${c} ` +
                    (this.isRadial ? `highcharts-radial-axis${c} ` : "") +
                    (t || "")
                )
                .add(r);
            b.gridGroup = c("grid", "-grid", a.gridZIndex);
            b.axisGroup = c("axis", "", a.zIndex);
            b.labelGroup = c("axis-labels", "-labels", m.zIndex);
          }
          h || b.isLinked
            ? (e.forEach(function (c) {
                b.generateTick(c);
              }),
              b.renderUnsquish(),
              (b.reserveSpaceDefault =
                0 === f ||
                2 === f ||
                { 1: "left", 3: "right" }[f] === b.labelAlign),
              z(
                m.reserveSpace,
                p ? !1 : null,
                "center" === b.labelAlign ? !0 : null,
                b.reserveSpaceDefault
              ) &&
                e.forEach(function (b) {
                  M = Math.max(l[b].getLabelSize(), M);
                }),
              b.staggerLines && (M *= b.staggerLines),
              (b.labelOffset = M * (b.opposite ? -1 : 1)))
            : w(l, function (b, c) {
                b.destroy();
                delete l[c];
              });
          n &&
            n.text &&
            !1 !== n.enabled &&
            (b.addTitle(P),
            P &&
              !p &&
              !1 !== n.reserveSpace &&
              ((b.titleOffset = T =
                b.axisTitle.getBBox()[k ? "height" : "width"]),
              (u = n.offset),
              (C = x(u) ? 0 : z(n.margin, k ? 5 : 10))));
          b.renderLine();
          b.offset = I * z(a.offset, q[f] ? q[f] + (a.margin || 0) : 0);
          b.tickRotCorr = b.tickRotCorr || { x: 0, y: 0 };
          h = 0 === f ? -b.labelMetrics().h : 2 === f ? b.tickRotCorr.y : 0;
          C = Math.abs(M) + C;
          M &&
            (C =
              C -
              h +
              I *
                (k
                  ? z(m.y, b.tickRotCorr.y + I * m.distance)
                  : z(m.x, I * m.distance)));
          b.axisTitleMargin = z(u, C);
          b.getMaxLabelDimensions &&
            (b.maxLabelDimensions = b.getMaxLabelDimensions(l, e));
          "colorAxis" !== g &&
            ((m = this.tickSize("tick")),
            (q[f] = Math.max(
              q[f],
              (b.axisTitleMargin || 0) + T + I * b.offset,
              C,
              e && e.length && m ? m[0] + I * b.offset : 0
            )),
            (q =
              !b.axisLine || a.offset
                ? 0
                : 2 * Math.floor(b.axisLine.strokeWidth() / 2)),
            (O[F] = Math.max(O[F], q)));
          y(this, "afterGetOffset");
        }
        getLinePath(b) {
          const c = this.chart,
            d = this.opposite;
          var k = this.offset;
          const a = this.horiz,
            f = this.left + (d ? this.width : 0) + k;
          k = c.chartHeight - this.bottom - (d ? this.height : 0) + k;
          d && (b *= -1);
          return c.renderer.crispLine(
            [
              ["M", a ? this.left : f, a ? k : this.top],
              [
                "L",
                a ? c.chartWidth - this.right : f,
                a ? k : c.chartHeight - this.bottom,
              ],
            ],
            b
          );
        }
        renderLine() {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        }
        getTitlePosition(b) {
          var c = this.horiz,
            d = this.left;
          const k = this.top;
          var a = this.len;
          const f = this.options.title,
            l = c ? d : k,
            e = this.opposite,
            w = this.offset,
            g = f.x,
            r = f.y,
            z = this.chart.renderer.fontMetrics(b);
          b = b ? Math.max(b.getBBox(!1, 0).height - z.h - 1, 0) : 0;
          a = {
            low: l + (c ? 0 : a),
            middle: l + a / 2,
            high: l + (c ? a : 0),
          }[f.align];
          d =
            (c ? k + this.height : d) +
            (c ? 1 : -1) * (e ? -1 : 1) * (this.axisTitleMargin || 0) +
            [-b, b, z.f, -b][this.side];
          c = {
            x: c ? a + g : d + (e ? this.width : 0) + w + g,
            y: c ? d + r - (e ? this.height : 0) + w : a + r,
          };
          y(this, "afterGetTitlePosition", { titlePosition: c });
          return c;
        }
        renderMinorTick(b, c) {
          const d = this.minorTicks;
          d[b] || (d[b] = new E(this, b, "minor"));
          c && d[b].isNew && d[b].render(null, !0);
          d[b].render(null, !1, 1);
        }
        renderTick(b, c, d) {
          const k = this.ticks;
          if (
            !this.isLinked ||
            (b >= this.min && b <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            k[b] || (k[b] = new E(this, b)),
              d && k[b].isNew && k[b].render(c, !0, -1),
              k[b].render(c);
        }
        render() {
          const b = this,
            c = b.chart,
            k = b.logarithmic,
            a = b.options,
            f = b.isLinked,
            l = b.tickPositions,
            e = b.axisTitle,
            g = b.ticks,
            r = b.minorTicks,
            z = b.alternateBands,
            v = a.stackLabels,
            F = a.alternateGridColor;
          var h = a.crossing;
          const n = b.tickmarkOffset,
            m = b.axisLine,
            x = b.showAxis,
            p = t(c.renderer.globalAnimation);
          let q, O;
          b.labelEdge.length = 0;
          b.overlap = !1;
          [g, r, z].forEach(function (b) {
            w(b, function (b) {
              b.isActive = !1;
            });
          });
          if (d(h)) {
            const d = this.isXAxis ? c.yAxis[0] : c.xAxis[0],
              k = [1, -1, -1, 1][this.side];
            d &&
              ((h = d.toPixels(h, !0)),
              b.horiz && (h = d.len - h),
              (b.offset = k * h));
          }
          if (b.hasData() || f) {
            const f = b.chart.hasRendered && b.old && d(b.old.min);
            b.minorTickInterval &&
              !b.categories &&
              b.getMinorTickPositions().forEach(function (c) {
                b.renderMinorTick(c, f);
              });
            l.length &&
              (l.forEach(function (c, d) {
                b.renderTick(c, d, f);
              }),
              n &&
                (0 === b.min || b.single) &&
                (g[-1] || (g[-1] = new E(b, -1, null, !0)), g[-1].render(-1)));
            F &&
              l.forEach(function (d, a) {
                O = "undefined" !== typeof l[a + 1] ? l[a + 1] + n : b.max - n;
                0 === a % 2 &&
                  d < b.max &&
                  O <= b.max + (c.polar ? -n : n) &&
                  (z[d] || (z[d] = new D.PlotLineOrBand(b)),
                  (q = d + n),
                  (z[d].options = {
                    from: k ? k.lin2log(q) : q,
                    to: k ? k.lin2log(O) : O,
                    color: F,
                    className: "highcharts-alternate-grid",
                  }),
                  z[d].render(),
                  (z[d].isActive = !0));
              });
            b._addedPlotLB ||
              ((b._addedPlotLB = !0),
              (a.plotLines || [])
                .concat(a.plotBands || [])
                .forEach(function (c) {
                  b.addPlotBandOrLine(c);
                }));
          }
          [g, r, z].forEach(function (b) {
            const d = [],
              k = p.duration;
            w(b, function (b, c) {
              b.isActive || (b.render(c, !1, 0), (b.isActive = !1), d.push(c));
            });
            T(
              function () {
                let c = d.length;
                for (; c--; )
                  b[d[c]] &&
                    !b[d[c]].isActive &&
                    (b[d[c]].destroy(), delete b[d[c]]);
              },
              b !== z && c.hasRendered && k ? k : 0
            );
          });
          m &&
            (m[m.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(m.strokeWidth()),
            }),
            (m.isPlaced = !0),
            m[x ? "show" : "hide"](x));
          e &&
            x &&
            (e[e.isNew ? "attr" : "animate"](b.getTitlePosition(e)),
            (e.isNew = !1));
          v && v.enabled && b.stacking && b.stacking.renderStackTotals();
          b.old = {
            len: b.len,
            max: b.max,
            min: b.min,
            transA: b.transA,
            userMax: b.userMax,
            userMin: b.userMin,
          };
          b.isDirty = !1;
          y(this, "afterRender");
        }
        redraw() {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (b) {
              b.render();
            }));
          this.series.forEach(function (b) {
            b.isDirty = !0;
          });
        }
        getKeepProps() {
          return this.keepProps || W.keepProps;
        }
        destroy(b) {
          const c = this,
            d = c.plotLinesAndBands,
            k = this.eventOptions;
          y(this, "destroy", { keepEvents: b });
          b || O(c);
          [c.ticks, c.minorTicks, c.alternateBands].forEach(function (b) {
            I(b);
          });
          if (d) for (b = d.length; b--; ) d[b].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (b) {
              c[b] && (c[b] = c[b].destroy());
            });
          for (const b in c.plotLinesAndBandsGroups)
            c.plotLinesAndBandsGroups[b] =
              c.plotLinesAndBandsGroups[b].destroy();
          w(c, function (b, d) {
            -1 === c.getKeepProps().indexOf(d) && delete c[d];
          });
          this.eventOptions = k;
        }
        drawCrosshair(b, c) {
          const d = this.crosshair;
          var k = z(d && d.snap, !0);
          const a = this.chart;
          let l,
            e = this.cross;
          y(this, "drawCrosshair", { e: b, point: c });
          b || (b = this.cross && this.cross.e);
          if (d && !1 !== (x(c) || !k)) {
            k
              ? x(c) &&
                (l = z(
                  "colorAxis" !== this.coll ? c.crosshairPos : null,
                  this.isXAxis ? c.plotX : this.len - c.plotY
                ))
              : (l =
                  b &&
                  (this.horiz
                    ? b.chartX - this.pos
                    : this.len - b.chartY + this.pos));
            if (x(l)) {
              var w = {
                value: c && (this.isXAxis ? c.x : z(c.stackY, c.y)),
                translatedValue: l,
              };
              a.polar &&
                f(w, {
                  isCrosshair: !0,
                  chartX: b && b.chartX,
                  chartY: b && b.chartY,
                  point: c,
                });
              w = this.getPlotLinePath(w) || null;
            }
            if (!x(w)) {
              this.hideCrosshair();
              return;
            }
            k = this.categories && !this.isRadial;
            e ||
              ((this.cross = e =
                a.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (k ? "category " : "thin ") +
                      (d.className || "")
                  )
                  .attr({ zIndex: z(d.zIndex, 2) })
                  .add()),
              a.styledMode ||
                (e
                  .attr({
                    stroke:
                      d.color ||
                      (k
                        ? J.parse("#ccd3ff").setOpacity(0.25).get()
                        : "#cccccc"),
                    "stroke-width": z(d.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                d.dashStyle && e.attr({ dashstyle: d.dashStyle })));
            e.show().attr({ d: w });
            k && !d.width && e.attr({ "stroke-width": this.transA });
            this.cross.e = b;
          } else this.hideCrosshair();
          y(this, "afterDrawCrosshair", { e: b, point: c });
        }
        hideCrosshair() {
          this.cross && this.cross.hide();
          y(this, "afterHideCrosshair");
        }
        hasVerticalPanning() {
          const b = this.chart.options.chart.panning;
          return !!(b && b.enabled && /y/.test(b.type));
        }
        update(b, d) {
          const k = this.chart;
          b = c(this.userOptions, b);
          this.destroy(!0);
          this.init(k, b);
          k.isDirtyBox = !0;
          z(d, !0) && k.redraw();
        }
        remove(b) {
          const c = this.chart,
            d = this.coll,
            k = this.series;
          let a = k.length;
          for (; a--; ) k[a] && k[a].remove(!1);
          u(c.axes, this);
          u(c[d] || [], this);
          c.orderItems(d);
          this.destroy();
          c.isDirtyBox = !0;
          z(b, !0) && c.redraw();
        }
        setTitle(b, c) {
          this.update({ title: b }, c);
        }
        setCategories(b, c) {
          this.update({ categories: b }, c);
        }
      }
      W.defaultOptions = A.defaultXAxisOptions;
      W.keepProps = "coll extKey hcEvents names series userMax userMin".split(
        " "
      );
      ("");
      return W;
    }
  );
  L(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function (a) {
    const {
      addEvent: u,
      getMagnitude: J,
      normalizeTickInterval: K,
      timeUnits: G,
    } = a;
    var D;
    (function (E) {
      function B() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function t(a) {
        "datetime" !== a.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new m(this));
      }
      const q = [];
      E.compose = function (m) {
        a.pushUnique(q, m) &&
          (m.keepProps.push("dateTime"),
          (m.prototype.getTimeTicks = B),
          u(m, "init", t));
        return m;
      };
      class m {
        constructor(a) {
          this.axis = a;
        }
        normalizeTimeTickInterval(a, n) {
          const h = n || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null],
          ];
          n = h[h.length - 1];
          let g = G[n[0]],
            e = n[1],
            m;
          for (
            m = 0;
            m < h.length &&
            !((n = h[m]),
            (g = G[n[0]]),
            (e = n[1]),
            h[m + 1] && a <= (g * e[e.length - 1] + G[h[m + 1][0]]) / 2);
            m++
          );
          g === G.year && a < 5 * g && (e = [1, 2, 5]);
          a = K(a / g, e, "year" === n[0] ? Math.max(J(a / g), 1) : 1);
          return { unitRange: g, count: a, unitName: n[0] };
        }
        getXDateFormat(a, n) {
          const { axis: h } = this,
            g = h.chart.time;
          return h.closestPointRange
            ? g.getDateFormat(
                h.closestPointRange,
                a,
                h.options.startOfWeek,
                n
              ) || g.resolveDTLFormat(n.year).main
            : g.resolveDTLFormat(n.day).main;
        }
      }
      E.Additions = m;
    })(D || (D = {}));
    return D;
  });
  L(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: u, normalizeTickInterval: J, pick: K } = a;
    var G;
    (function (A) {
      function E(a) {
        let m = this.logarithmic;
        "logarithmic" !== a.userOptions.type
          ? (this.logarithmic = void 0)
          : m || (this.logarithmic = new q(this));
      }
      function B() {
        const a = this.logarithmic;
        a &&
          ((this.lin2val = function (m) {
            return a.lin2log(m);
          }),
          (this.val2lin = function (m) {
            return a.log2lin(m);
          }));
      }
      const t = [];
      A.compose = function (m) {
        a.pushUnique(t, m) &&
          (m.keepProps.push("logarithmic"),
          u(m, "init", E),
          u(m, "afterInit", B));
        return m;
      };
      class q {
        constructor(a) {
          this.axis = a;
        }
        getLogTickPositions(a, p, n, h) {
          const g = this.axis;
          var e = g.len,
            m = g.options;
          let q = [];
          h || (this.minorAutoInterval = void 0);
          if (0.5 <= a)
            (a = Math.round(a)), (q = g.getLinearTickPositions(a, p, n));
          else if (0.08 <= a) {
            m = Math.floor(p);
            let g, x, f, y, r;
            for (
              e =
                0.3 < a
                  ? [1, 2, 4]
                  : 0.15 < a
                  ? [1, 2, 4, 6, 8]
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              m < n + 1 && !r;
              m++
            )
              for (x = e.length, g = 0; g < x && !r; g++)
                (f = this.log2lin(this.lin2log(m) * e[g])),
                  f > p &&
                    (!h || y <= n) &&
                    "undefined" !== typeof y &&
                    q.push(y),
                  y > n && (r = !0),
                  (y = f);
          } else
            (p = this.lin2log(p)),
              (n = this.lin2log(n)),
              (a = h ? g.getMinorTickInterval() : m.tickInterval),
              (a = K(
                "auto" === a ? null : a,
                this.minorAutoInterval,
                ((m.tickPixelInterval / (h ? 5 : 1)) * (n - p)) /
                  ((h ? e / g.tickPositions.length : e) || 1)
              )),
              (a = J(a)),
              (q = g.getLinearTickPositions(a, p, n).map(this.log2lin)),
              h || (this.minorAutoInterval = a / 5);
          h || (g.tickInterval = a);
          return q;
        }
        lin2log(a) {
          return Math.pow(10, a);
        }
        log2lin(a) {
          return Math.log(a) / Math.LN10;
        }
      }
      A.Additions = q;
    })(G || (G = {}));
    return G;
  });
  L(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { erase: u, extend: J, isNumber: K } = a;
      var G;
      (function (A) {
        function E(a) {
          return this.addPlotBandOrLine(a, "plotBands");
        }
        function B(a, h) {
          const e = this.userOptions;
          let n = new g(this, a);
          this.visible && (n = n.render());
          if (n) {
            this._addedPlotLB ||
              ((this._addedPlotLB = !0),
              (e.plotLines || []).concat(e.plotBands || []).forEach((a) => {
                this.addPlotBandOrLine(a);
              }));
            if (h) {
              const g = e[h] || [];
              g.push(a);
              e[h] = g;
            }
            this.plotLinesAndBands.push(n);
          }
          return n;
        }
        function t(a) {
          return this.addPlotBandOrLine(a, "plotLines");
        }
        function q(a, g, h = this.options) {
          const e = this.getPlotLinePath({
              value: g,
              force: !0,
              acrossPanes: h.acrossPanes,
            }),
            n = [],
            f = this.horiz;
          g =
            !K(this.min) ||
            !K(this.max) ||
            (a < this.min && g < this.min) ||
            (a > this.max && g > this.max);
          a = this.getPlotLinePath({
            value: a,
            force: !0,
            acrossPanes: h.acrossPanes,
          });
          h = 1;
          let y;
          if (a && e)
            for (
              g && ((y = a.toString() === e.toString()), (h = 0)), g = 0;
              g < a.length;
              g += 2
            ) {
              const r = a[g],
                l = a[g + 1],
                v = e[g],
                d = e[g + 1];
              ("M" !== r[0] && "L" !== r[0]) ||
                ("M" !== l[0] && "L" !== l[0]) ||
                ("M" !== v[0] && "L" !== v[0]) ||
                ("M" !== d[0] && "L" !== d[0]) ||
                (f && v[1] === r[1]
                  ? ((v[1] += h), (d[1] += h))
                  : f || v[2] !== r[2] || ((v[2] += h), (d[2] += h)),
                n.push(
                  ["M", r[1], r[2]],
                  ["L", l[1], l[2]],
                  ["L", d[1], d[2]],
                  ["L", v[1], v[2]],
                  ["Z"]
                ));
              n.isFlat = y;
            }
          return n;
        }
        function m(a) {
          this.removePlotBandOrLine(a);
        }
        function p(a) {
          const e = this.plotLinesAndBands,
            g = this.options,
            h = this.userOptions;
          if (e) {
            let n = e.length;
            for (; n--; ) e[n].id === a && e[n].destroy();
            [
              g.plotLines || [],
              h.plotLines || [],
              g.plotBands || [],
              h.plotBands || [],
            ].forEach(function (f) {
              for (n = f.length; n--; ) (f[n] || {}).id === a && u(f, f[n]);
            });
          }
        }
        function n(a) {
          this.removePlotBandOrLine(a);
        }
        const h = [];
        let g;
        A.compose = function (e, x) {
          g || (g = e);
          a.pushUnique(h, x) &&
            J(x.prototype, {
              addPlotBand: E,
              addPlotLine: t,
              addPlotBandOrLine: B,
              getPlotBandPath: q,
              removePlotBand: m,
              removePlotLine: n,
              removePlotBandOrLine: p,
            });
          return x;
        };
      })(G || (G = {}));
      return G;
    }
  );
  L(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
    [
      a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A) {
      const {
        arrayMax: u,
        arrayMin: K,
        defined: G,
        destroyObjectProperties: D,
        erase: E,
        fireEvent: B,
        merge: t,
        objectEach: q,
        pick: m,
      } = A;
      class p {
        static compose(n) {
          return a.compose(p, n);
        }
        constructor(a, h) {
          this.axis = a;
          h && ((this.options = h), (this.id = h.id));
        }
        render() {
          B(this, "render");
          const a = this,
            h = a.axis,
            g = h.horiz;
          var e = h.logarithmic;
          const x = a.options,
            p = x.color,
            u = m(x.zIndex, 0),
            C = x.events,
            f = {},
            y = h.chart.renderer;
          let r = x.label,
            l = a.label,
            v = x.to,
            d = x.from,
            b = x.value,
            c = a.svgElem;
          var k = [];
          const w = G(d) && G(v);
          k = G(b);
          const z = !c,
            F = {
              class:
                "highcharts-plot-" +
                (w ? "band " : "line ") +
                (x.className || ""),
            };
          let O = w ? "bands" : "lines";
          e && ((d = e.log2lin(d)), (v = e.log2lin(v)), (b = e.log2lin(b)));
          h.chart.styledMode ||
            (k
              ? ((F.stroke = p || "#999999"),
                (F["stroke-width"] = m(x.width, 1)),
                x.dashStyle && (F.dashstyle = x.dashStyle))
              : w &&
                ((F.fill = p || "#e6e9ff"),
                x.borderWidth &&
                  ((F.stroke = x.borderColor),
                  (F["stroke-width"] = x.borderWidth))));
          f.zIndex = u;
          O += "-" + u;
          (e = h.plotLinesAndBandsGroups[O]) ||
            (h.plotLinesAndBandsGroups[O] = e =
              y
                .g("plot-" + O)
                .attr(f)
                .add());
          z && (a.svgElem = c = y.path().attr(F).add(e));
          if (k)
            k = h.getPlotLinePath({
              value: b,
              lineWidth: c.strokeWidth(),
              acrossPanes: x.acrossPanes,
            });
          else if (w) k = h.getPlotBandPath(d, v, x);
          else return;
          !a.eventsAdded &&
            C &&
            (q(C, function (b, d) {
              c.on(d, function (b) {
                C[d].apply(a, [b]);
              });
            }),
            (a.eventsAdded = !0));
          (z || !c.d) && k && k.length
            ? c.attr({ d: k })
            : c &&
              (k
                ? (c.show(), c.animate({ d: k }))
                : c.d && (c.hide(), l && (a.label = l = l.destroy())));
          r &&
          (G(r.text) || G(r.formatter)) &&
          k &&
          k.length &&
          0 < h.width &&
          0 < h.height &&
          !k.isFlat
            ? ((r = t(
                {
                  align: g && w && "center",
                  x: g ? !w && 4 : 10,
                  verticalAlign: !g && w && "middle",
                  y: g ? (w ? 16 : 10) : w ? 6 : -4,
                  rotation: g && !w && 90,
                },
                r
              )),
              this.renderLabel(r, k, w, u))
            : l && l.hide();
          return a;
        }
        renderLabel(a, h, g, e) {
          const n = this.axis;
          var m = n.chart.renderer;
          let p = this.label;
          p ||
            ((this.label = p =
              m
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    "highcharts-plot-" +
                    (g ? "band" : "line") +
                    "-label " +
                    (a.className || ""),
                  zIndex: e,
                })
                .add()),
            n.chart.styledMode ||
              p.css(
                t({ fontSize: "0.8em", textOverflow: "ellipsis" }, a.style)
              ));
          e = h.xBounds || [h[0][1], h[1][1], g ? h[2][1] : h[0][1]];
          h = h.yBounds || [h[0][2], h[1][2], g ? h[2][2] : h[0][2]];
          g = K(e);
          m = K(h);
          p.align(a, !1, { x: g, y: m, width: u(e) - g, height: u(h) - m });
          (p.alignValue && "left" !== p.alignValue) ||
            ((a = a.clip ? n.width : n.chart.chartWidth),
            p.css({
              width:
                (90 === p.rotation
                  ? n.height - (p.alignAttr.y - n.top)
                  : a - (p.alignAttr.x - n.left)) + "px",
            }));
          p.show(!0);
        }
        getLabelText(a) {
          return G(a.formatter) ? a.formatter.call(this) : a.text;
        }
        destroy() {
          E(this.axis.plotLinesAndBands, this);
          delete this.axis;
          D(this);
        }
      }
      ("");
      ("");
      return p;
    }
  );
  L(
    a,
    "Core/Tooltip.js",
    [
      a["Core/Templating.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G) {
      const { format: u } = a,
        { doc: E, isSafari: B } = A,
        { distribute: t } = J,
        {
          addEvent: q,
          clamp: m,
          css: p,
          discardElement: n,
          extend: h,
          fireEvent: g,
          isArray: e,
          isNumber: x,
          isString: I,
          merge: M,
          pick: C,
          splat: f,
          syncTimeout: y,
        } = G;
      class r {
        constructor(a, f) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = a;
          this.init(a, f);
        }
        bodyFormatter(a) {
          return a.map(function (a) {
            const d = a.series.tooltipOptions;
            return (
              d[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter
            ).call(
              a.point,
              d[(a.point.formatPrefix || "point") + "Format"] || ""
            );
          });
        }
        cleanSplit(a) {
          this.chart.series.forEach(function (f) {
            const d = f && f.tt;
            d && (!d.isActive || a ? (f.tt = d.destroy()) : (d.isActive = !1));
          });
        }
        defaultFormatter(a) {
          const l = this.points || f(this);
          let d;
          d = [a.tooltipFooterHeaderFormatter(l[0])];
          d = d.concat(a.bodyFormatter(l));
          d.push(a.tooltipFooterHeaderFormatter(l[0], !0));
          return d;
        }
        destroy() {
          this.label && (this.label = this.label.destroy());
          this.split &&
            (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), n(this.container));
          G.clearTimeout(this.hideTimer);
          G.clearTimeout(this.tooltipTimeout);
        }
        getAnchor(a, e) {
          var d = this.chart;
          const b = d.pointer,
            c = d.inverted,
            k = d.plotTop;
          d = d.plotLeft;
          a = f(a);
          a[0].series &&
            a[0].series.yAxis &&
            !a[0].series.yAxis.options.reversedStacks &&
            (a = a.slice().reverse());
          if (this.followPointer && e)
            "undefined" === typeof e.chartX && (e = b.normalize(e)),
              (a = [e.chartX - d, e.chartY - k]);
          else if (a[0].tooltipPos) a = a[0].tooltipPos;
          else {
            let b = 0,
              f = 0;
            a.forEach(function (c) {
              if ((c = c.pos(!0))) (b += c[0]), (f += c[1]);
            });
            b /= a.length;
            f /= a.length;
            this.shared &&
              1 < a.length &&
              e &&
              (c ? (b = e.chartX) : (f = e.chartY));
            a = [b - d, f - k];
          }
          return a.map(Math.round);
        }
        getClassName(a, f, d) {
          const b = a.series,
            c = b.options;
          return [
            this.options.className,
            "highcharts-label",
            d && "highcharts-tooltip-header",
            f ? "highcharts-tooltip-box" : "highcharts-tooltip",
            !d && "highcharts-color-" + C(a.colorIndex, b.colorIndex),
            c && c.className,
          ]
            .filter(I)
            .join(" ");
        }
        getLabel() {
          const a = this,
            f = this.chart.styledMode,
            d = this.options,
            b = this.split && this.allowShared,
            c =
              d.style.pointerEvents ||
              (this.shouldStickOnContact() ? "auto" : "none");
          let k,
            e = this.chart.renderer;
          if (this.label) {
            var g = !this.label.hasClass("highcharts-label");
            ((!b && g) || (b && !g)) && this.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              g = this.chart.options.chart.style;
              const b = K.getRendererType();
              this.container = k = A.doc.createElement("div");
              k.className = "highcharts-tooltip-container";
              p(k, {
                position: "absolute",
                top: "1px",
                pointerEvents: c,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((g && g.zIndex) || 0) + 3
                ),
              });
              A.doc.body.appendChild(k);
              this.renderer = e = new b(
                k,
                0,
                0,
                g,
                void 0,
                void 0,
                e.styledMode
              );
            }
            b
              ? (this.label = e.g("tooltip"))
              : ((this.label = e
                  .label(
                    "",
                    0,
                    0,
                    d.shape,
                    void 0,
                    void 0,
                    d.useHTML,
                    void 0,
                    "tooltip"
                  )
                  .attr({ padding: d.padding, r: d.borderRadius })),
                f ||
                  this.label
                    .attr({
                      fill: d.backgroundColor,
                      "stroke-width": d.borderWidth || 0,
                    })
                    .css(d.style)
                    .css({ pointerEvents: c }));
            if (a.outside) {
              const b = this.label,
                { xSetter: c, ySetter: d } = b;
              b.xSetter = function (d) {
                c.call(b, a.distance);
                k.style.left = d + "px";
              };
              b.ySetter = function (c) {
                d.call(b, a.distance);
                k.style.top = c + "px";
              };
            }
            this.label.attr({ zIndex: 8 }).shadow(d.shadow).add();
          }
          return this.label;
        }
        getPlayingField() {
          const { body: a, documentElement: f } = E,
            { chart: d, distance: b, outside: c } = this;
          return {
            width: c
              ? Math.max(
                  a.scrollWidth,
                  f.scrollWidth,
                  a.offsetWidth,
                  f.offsetWidth,
                  f.clientWidth
                ) -
                2 * b
              : d.chartWidth,
            height: c
              ? Math.max(
                  a.scrollHeight,
                  f.scrollHeight,
                  a.offsetHeight,
                  f.offsetHeight,
                  f.clientHeight
                )
              : d.chartHeight,
          };
        }
        getPosition(a, f, d) {
          const b = this.chart,
            c = this.distance,
            k = {},
            l = (b.inverted && d.h) || 0,
            e = this.outside;
          var g = this.getPlayingField();
          const r = g.width,
            h = g.height,
            v = b.pointer.getChartPosition();
          g = (k) => {
            const l = "x" === k;
            return [k, l ? r : h, l ? a : f].concat(
              e
                ? [
                    l ? a * v.scaleX : f * v.scaleY,
                    l
                      ? v.left - c + (d.plotX + b.plotLeft) * v.scaleX
                      : v.top - c + (d.plotY + b.plotTop) * v.scaleY,
                    0,
                    l ? r : h,
                  ]
                : [
                    l ? a : f,
                    l ? d.plotX + b.plotLeft : d.plotY + b.plotTop,
                    l ? b.plotLeft : b.plotTop,
                    l ? b.plotLeft + b.plotWidth : b.plotTop + b.plotHeight,
                  ]
            );
          };
          let y = g("y"),
            n = g("x"),
            m;
          g = !!d.negative;
          !b.polar &&
            b.hoverSeries &&
            b.hoverSeries.yAxis &&
            b.hoverSeries.yAxis.reversed &&
            (g = !g);
          const p = !this.followPointer && C(d.ttBelow, !b.inverted === g),
            x = function (b, d, a, f, w, g, r) {
              const z = e ? ("y" === b ? c * v.scaleY : c * v.scaleX) : c,
                h = (a - f) / 2,
                F = f < w - c,
                y = w + c + f < d,
                n = w - z - a + h;
              w = w + z - h;
              if (p && y) k[b] = w;
              else if (!p && F) k[b] = n;
              else if (F) k[b] = Math.min(r - f, 0 > n - l ? n : n - l);
              else if (y) k[b] = Math.max(g, w + l + a > d ? w : w + l);
              else return !1;
            },
            q = function (b, d, a, f, l) {
              let e;
              l < c || l > d - c
                ? (e = !1)
                : (k[b] =
                    l < a / 2 ? 1 : l > d - f / 2 ? d - f - 2 : l - a / 2);
              return e;
            },
            t = function (b) {
              const c = y;
              y = n;
              n = c;
              m = b;
            },
            N = function () {
              !1 !== x.apply(0, y)
                ? !1 !== q.apply(0, n) || m || (t(!0), N())
                : m
                ? (k.x = k.y = 0)
                : (t(!0), N());
            };
          (b.inverted || 1 < this.len) && t();
          N();
          return k;
        }
        hide(a) {
          const f = this;
          G.clearTimeout(this.hideTimer);
          a = C(a, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = y(function () {
              f.getLabel().fadeOut(a ? void 0 : a);
              f.isHidden = !0;
            }, a));
        }
        init(a, f) {
          this.chart = a;
          this.options = f;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = f.split && !a.inverted && !a.polar;
          this.shared = f.shared || this.split;
          this.outside = C(
            f.outside,
            !(!a.scrollablePixelsX && !a.scrollablePixelsY)
          );
        }
        shouldStickOnContact(a) {
          return !(
            this.followPointer ||
            !this.options.stickOnContact ||
            (a && !this.chart.pointer.inClass(a.target, "highcharts-tooltip"))
          );
        }
        move(a, f, d, b) {
          const c = this,
            k = c.now,
            l =
              !1 !== c.options.animation &&
              !c.isHidden &&
              (1 < Math.abs(a - k.x) || 1 < Math.abs(f - k.y)),
            e = c.followPointer || 1 < c.len;
          h(k, {
            x: l ? (2 * k.x + a) / 3 : a,
            y: l ? (k.y + f) / 2 : f,
            anchorX: e ? void 0 : l ? (2 * k.anchorX + d) / 3 : d,
            anchorY: e ? void 0 : l ? (k.anchorY + b) / 2 : b,
          });
          c.getLabel().attr(k);
          c.drawTracker();
          l &&
            (G.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              c && c.move(a, f, d, b);
            }, 32)));
        }
        refresh(a, r) {
          const d = this.chart,
            b = this.options,
            c = d.pointer,
            k = f(a),
            l = k[0],
            z = [];
          var h = b.format,
            y = b.formatter || this.defaultFormatter;
          const n = this.shared,
            v = d.styledMode;
          let m = {};
          if (b.enabled && l.series) {
            G.clearTimeout(this.hideTimer);
            this.allowShared = !(!e(a) && a.series && a.series.noSharedTooltip);
            this.followPointer =
              !this.split && l.series.tooltipOptions.followPointer;
            a = this.getAnchor(a, r);
            var p = a[0],
              x = a[1];
            n && this.allowShared
              ? (c.applyInactiveState(k),
                k.forEach(function (b) {
                  b.setState("hover");
                  z.push(b.getLabelConfig());
                }),
                (m = l.getLabelConfig()),
                (m.points = z))
              : (m = l.getLabelConfig());
            this.len = z.length;
            h = I(h) ? u(h, m, d) : y.call(m, this);
            y = l.series;
            this.distance = C(y.tooltipOptions.distance, 16);
            if (!1 === h) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(h, k);
              else {
                let f = p,
                  e = x;
                r &&
                  c.isDirectTouch &&
                  ((f = r.chartX - d.plotLeft), (e = r.chartY - d.plotTop));
                if (
                  d.polar ||
                  !1 === y.options.clip ||
                  k.some(
                    (b) => c.isDirectTouch || b.series.shouldShowTooltip(f, e)
                  )
                )
                  (r = this.getLabel()),
                    (b.style.width && !v) ||
                      r.css({
                        width:
                          (this.outside ? this.getPlayingField() : d.spacingBox)
                            .width + "px",
                      }),
                    r.attr({ text: h && h.join ? h.join("") : h }),
                    r.addClass(this.getClassName(l), !0),
                    v ||
                      r.attr({
                        stroke:
                          b.borderColor || l.color || y.color || "#666666",
                      }),
                    this.updatePosition({
                      plotX: p,
                      plotY: x,
                      negative: l.negative,
                      ttBelow: l.ttBelow,
                      h: a[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            g(this, "refresh");
          }
        }
        renderSplit(a, f) {
          function d(c, d, a, k, f = !0) {
            a
              ? ((d = R ? 0 : J),
                (c = m(c - k / 2, N.left, N.right - k - (b.outside ? V : 0))))
              : ((d -= D),
                (c = f ? c - k - u : c + u),
                (c = m(c, f ? c : N.left, N.right)));
            return { x: c, y: d };
          }
          const b = this,
            {
              chart: c,
              chart: {
                chartWidth: k,
                chartHeight: l,
                plotHeight: e,
                plotLeft: g,
                plotTop: r,
                pointer: y,
                scrollablePixelsY: n = 0,
                scrollablePixelsX: v,
                scrollingContainer: { scrollLeft: p, scrollTop: x } = {
                  scrollLeft: 0,
                  scrollTop: 0,
                },
                styledMode: q,
              },
              distance: u,
              options: M,
              options: { positioner: A },
            } = b,
            N =
              b.outside && "number" !== typeof v
                ? E.documentElement.getBoundingClientRect()
                : { left: p, right: p + k, top: x, bottom: x + l },
            X = b.getLabel(),
            Q = this.renderer || c.renderer,
            R = !(!c.xAxis[0] || !c.xAxis[0].opposite),
            { left: V, top: G } = y.getChartPosition();
          let D = r + x,
            K = 0,
            J = e - n;
          I(a) && (a = [!1, a]);
          a = a.slice(0, f.length + 1).reduce(function (c, a, k) {
            if (!1 !== a && "" !== a) {
              k = f[k - 1] || {
                isHeader: !0,
                plotX: f[0].plotX,
                plotY: e,
                series: {},
              };
              const n = k.isHeader;
              var l = n ? b : k.series,
                w;
              {
                var h = k;
                a = a.toString();
                var z = l.tt;
                const { isHeader: c, series: d } = h;
                z ||
                  ((z = { padding: M.padding, r: M.borderRadius }),
                  q ||
                    ((z.fill = M.backgroundColor),
                    (z["stroke-width"] =
                      null !== (w = M.borderWidth) && void 0 !== w ? w : 1)),
                  (z = Q.label(
                    "",
                    0,
                    0,
                    M[c ? "headerShape" : "shape"],
                    void 0,
                    void 0,
                    M.useHTML
                  )
                    .addClass(b.getClassName(h, !0, c))
                    .attr(z)
                    .add(X)));
                z.isActive = !0;
                z.attr({ text: a });
                q ||
                  z
                    .css(M.style)
                    .attr({
                      stroke: M.borderColor || h.color || d.color || "#333333",
                    });
                w = z;
              }
              w = l.tt = w;
              h = w.getBBox();
              l = h.width + w.strokeWidth();
              n && ((K = h.height), (J += K), R && (D -= K));
              {
                const {
                  isHeader: b,
                  plotX: c = 0,
                  plotY: d = 0,
                  series: f,
                } = k;
                if (b) {
                  a = g + c;
                  var y = r + e / 2;
                } else {
                  const { xAxis: b, yAxis: k } = f;
                  a = b.pos + m(c, -u, b.len + u);
                  f.shouldShowTooltip(0, k.pos - r + d, { ignoreX: !0 }) &&
                    (y = k.pos + d);
                }
                a = m(a, N.left - u, N.right + u);
                y = { anchorX: a, anchorY: y };
              }
              const { anchorX: v, anchorY: F } = y;
              "number" === typeof F
                ? ((y = h.height + 1),
                  (h = A ? A.call(b, l, y, k) : d(v, F, n, l)),
                  c.push({
                    align: A ? 0 : void 0,
                    anchorX: v,
                    anchorY: F,
                    boxWidth: l,
                    point: k,
                    rank: C(h.rank, n ? 1 : 0),
                    size: y,
                    target: h.y,
                    tt: w,
                    x: h.x,
                  }))
                : (w.isActive = !1);
            }
            return c;
          }, []);
          !A &&
            a.some((c) => {
              var { outside: d } = b;
              d = (d ? V : 0) + c.anchorX;
              return d < N.left && d + c.boxWidth < N.right
                ? !0
                : d < V - N.left + c.boxWidth && N.right - d > d;
            }) &&
            (a = a.map((b) => {
              const { x: c, y: a } = d(
                b.anchorX,
                b.anchorY,
                b.point.isHeader,
                b.boxWidth,
                !1
              );
              return h(b, { target: a, x: c });
            }));
          b.cleanSplit();
          t(a, J);
          var ba = V,
            L = V;
          a.forEach(function (c) {
            const { x: d, boxWidth: a, isHeader: k } = c;
            k ||
              (b.outside && V + d < ba && (ba = V + d),
              !k && b.outside && ba + a > L && (L = V + d));
          });
          a.forEach(function (c) {
            const {
                x: d,
                anchorX: a,
                anchorY: k,
                pos: f,
                point: { isHeader: l },
              } = c,
              e = {
                visibility: "undefined" === typeof f ? "hidden" : "inherit",
                x: d,
                y: (f || 0) + D,
                anchorX: a,
                anchorY: k,
              };
            if (b.outside && d < a) {
              const b = V - ba;
              0 < b &&
                (l || ((e.x = d + b), (e.anchorX = a + b)),
                l && ((e.x = (L - ba) / 2), (e.anchorX = a + b)));
            }
            c.tt.attr(e);
          });
          const { container: fa, outside: ca, renderer: ka } = b;
          if (ca && fa && ka) {
            const { width: b, height: c, x: d, y: a } = X.getBBox();
            ka.setSize(b + d, c + a, !1);
            fa.style.left = ba + "px";
            fa.style.top = G + "px";
          }
          B && X.attr({ opacity: 1 === X.opacity ? 0.999 : 1 });
        }
        drawTracker() {
          if (this.shouldStickOnContact()) {
            var a = this.chart,
              f = this.label,
              d = this.shared ? a.hoverPoints : a.hoverPoint;
            if (f && d) {
              var b = { x: 0, y: 0, width: 0, height: 0 };
              d = this.getAnchor(d);
              var c = f.getBBox();
              d[0] += a.plotLeft - f.translateX;
              d[1] += a.plotTop - f.translateY;
              b.x = Math.min(0, d[0]);
              b.y = Math.min(0, d[1]);
              b.width =
                0 > d[0]
                  ? Math.max(Math.abs(d[0]), c.width - d[0])
                  : Math.max(Math.abs(d[0]), c.width);
              b.height =
                0 > d[1]
                  ? Math.max(Math.abs(d[1]), c.height - Math.abs(d[1]))
                  : Math.max(Math.abs(d[1]), c.height);
              this.tracker
                ? this.tracker.attr(b)
                : ((this.tracker = f.renderer
                    .rect(b)
                    .addClass("highcharts-tracker")
                    .add(f)),
                  a.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          } else this.tracker && (this.tracker = this.tracker.destroy());
        }
        styledModeFormat(a) {
          return a
            .replace('style="font-size: 0.8em"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"'
            );
        }
        tooltipFooterHeaderFormatter(a, f) {
          const d = a.series,
            b = d.tooltipOptions;
          var c = d.xAxis;
          const k = c && c.dateTime;
          c = { isFooter: f, labelConfig: a };
          let l = b.xDateFormat,
            e = b[f ? "footerFormat" : "headerFormat"];
          g(this, "headerFormatter", c, function (c) {
            k &&
              !l &&
              x(a.key) &&
              (l = k.getXDateFormat(a.key, b.dateTimeLabelFormats));
            k &&
              l &&
              ((a.point && a.point.tooltipDateKeys) || ["key"]).forEach(
                function (b) {
                  e = e.replace(
                    "{point." + b + "}",
                    "{point." + b + ":" + l + "}"
                  );
                }
              );
            d.chart.styledMode && (e = this.styledModeFormat(e));
            c.text = u(e, { point: a, series: d }, this.chart);
          });
          return c.text;
        }
        update(a) {
          this.destroy();
          this.init(this.chart, M(!0, this.options, a));
        }
        updatePosition(a) {
          const { chart: f, distance: d, options: b } = this;
          var c = f.pointer;
          const k = this.getLabel(),
            { left: l, top: e, scaleX: g, scaleY: r } = c.getChartPosition();
          c = (b.positioner || this.getPosition).call(
            this,
            k.width,
            k.height,
            a
          );
          let h = (a.plotX || 0) + f.plotLeft;
          a = (a.plotY || 0) + f.plotTop;
          let y;
          if (this.outside) {
            b.positioner && ((c.x += l - d), (c.y += e - d));
            y = (b.borderWidth || 0) + 2 * d;
            this.renderer.setSize(k.width + y, k.height + y, !1);
            if (1 !== g || 1 !== r)
              p(this.container, { transform: `scale(${g}, ${r})` }),
                (h *= g),
                (a *= r);
            h += l - c.x;
            a += e - c.y;
          }
          this.move(Math.round(c.x), Math.round(c.y || 0), h, a);
        }
      }
      (function (a) {
        const f = [];
        a.compose = function (d) {
          G.pushUnique(f, d) &&
            q(d, "afterInit", function () {
              const b = this.chart;
              b.options.tooltip && (b.tooltip = new a(b, b.options.tooltip));
            });
        };
      })(r || (r = {}));
      ("");
      return r;
    }
  );
  L(
    a,
    "Core/Series/Point.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/Templating.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G) {
      const { animObject: u } = A,
        { defaultOptions: E } = J,
        { format: B } = K,
        {
          addEvent: t,
          defined: q,
          erase: m,
          extend: p,
          fireEvent: n,
          getNestedProperty: h,
          isArray: g,
          isFunction: e,
          isNumber: x,
          isObject: I,
          merge: M,
          objectEach: C,
          pick: f,
          syncTimeout: y,
          removeEvent: r,
          uniqueKey: l,
        } = G;
      class v {
        constructor() {
          this.category = void 0;
          this.destroyed = !1;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.shapeArgs = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        animateBeforeDestroy() {
          const d = this,
            b = { x: d.startXPos, opacity: 0 },
            c = d.getGraphicalProps();
          c.singular.forEach(function (c) {
            d[c] = d[c].animate(
              "dataLabel" === c
                ? { x: d[c].startXPos, y: d[c].startYPos, opacity: 0 }
                : b
            );
          });
          c.plural.forEach(function (b) {
            d[b].forEach(function (b) {
              b.element &&
                b.animate(
                  p(
                    { x: d.startXPos },
                    b.startYPos ? { x: b.startXPos, y: b.startYPos } : {}
                  )
                );
            });
          });
        }
        applyOptions(d, b) {
          const c = this.series,
            a = c.options.pointValKey || c.pointValKey;
          d = v.prototype.optionsToObject.call(this, d);
          p(this, d);
          this.options = this.options ? p(this.options, d) : d;
          d.group && delete this.group;
          d.dataLabels && delete this.dataLabels;
          a && (this.y = v.prototype.getNestedProperty.call(this, a));
          this.formatPrefix = (this.isNull = this.isValid && !this.isValid())
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof b &&
            c.xAxis &&
            c.xAxis.hasNames &&
            (this.x = c.xAxis.nameToX(this));
          "undefined" === typeof this.x && c
            ? (this.x = "undefined" === typeof b ? c.autoIncrement() : b)
            : x(d.x) &&
              c.options.relativeXValue &&
              (this.x = c.autoIncrement(d.x));
          return this;
        }
        destroy() {
          if (!this.destroyed) {
            const b = this;
            var d = b.series;
            const c = d.chart;
            d = d.options.dataSorting;
            const a = c.hoverPoints,
              f = u(b.series.chart.renderer.globalAnimation),
              l = () => {
                if (b.graphic || b.graphics || b.dataLabel || b.dataLabels)
                  r(b), b.destroyElements();
                for (const c in b) delete b[c];
              };
            b.legendItem && c.legend.destroyItem(b);
            a && (b.setState(), m(a, b), a.length || (c.hoverPoints = null));
            if (b === c.hoverPoint) b.onMouseOut();
            d && d.enabled
              ? (this.animateBeforeDestroy(), y(l, f.duration))
              : l();
            c.pointCount--;
          }
          this.destroyed = !0;
        }
        destroyElements(d) {
          const b = this;
          d = b.getGraphicalProps(d);
          d.singular.forEach(function (c) {
            b[c] = b[c].destroy();
          });
          d.plural.forEach(function (c) {
            b[c].forEach(function (b) {
              b && b.element && b.destroy();
            });
            delete b[c];
          });
        }
        firePointEvent(d, b, c) {
          const a = this,
            f = this.series.options;
          (f.point.events[d] ||
            (a.options && a.options.events && a.options.events[d])) &&
            a.importEvents();
          "click" === d &&
            f.allowPointSelect &&
            (c = function (b) {
              a.select && a.select(null, b.ctrlKey || b.metaKey || b.shiftKey);
            });
          n(a, d, b, c);
        }
        getClassName() {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        }
        getGraphicalProps(d) {
          const b = this,
            c = [],
            a = { singular: [], plural: [] };
          let f, l;
          d = d || { graphic: 1, dataLabel: 1 };
          d.graphic && c.push("graphic");
          d.dataLabel &&
            c.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
          for (l = c.length; l--; ) (f = c[l]), b[f] && a.singular.push(f);
          ["graphic", "dataLabel", "connector"].forEach(function (c) {
            const k = c + "s";
            d[c] && b[k] && a.plural.push(k);
          });
          return a;
        }
        getLabelConfig() {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        }
        getNestedProperty(d) {
          if (d)
            return 0 === d.indexOf("custom.") ? h(d, this.options) : this[d];
        }
        getZone() {
          var d = this.series;
          const b = d.zones;
          d = d.zoneAxis || "y";
          let c,
            a = 0;
          for (c = b[a]; this[d] >= c.value; ) c = b[++a];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            c && c.color && !this.options.color ? c.color : this.nonZonedColor;
          return c;
        }
        hasNewShapeType() {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        }
        init(d, b, c) {
          this.series = d;
          this.applyOptions(b, c);
          this.id = q(this.id) ? this.id : l();
          this.resolveColor();
          d.chart.pointCount++;
          n(this, "afterInit");
          return this;
        }
        isValid() {
          return null !== this.x && x(this.y);
        }
        optionsToObject(d) {
          var b = this.series;
          const c = b.options.keys,
            a = c || b.pointArrayMap || ["y"],
            f = a.length;
          let l = {},
            e = 0,
            r = 0;
          if (x(d) || null === d) l[a[0]] = d;
          else if (g(d))
            for (
              !c &&
              d.length > f &&
              ((b = typeof d[0]),
              "string" === b ? (l.name = d[0]) : "number" === b && (l.x = d[0]),
              e++);
              r < f;

            )
              (c && "undefined" === typeof d[e]) ||
                (0 < a[r].indexOf(".")
                  ? v.prototype.setNestedProperty(l, d[e], a[r])
                  : (l[a[r]] = d[e])),
                e++,
                r++;
          else
            "object" === typeof d &&
              ((l = d),
              d.dataLabels && (b._hasPointLabels = !0),
              d.marker && (b._hasPointMarkers = !0));
          return l;
        }
        pos(d, b = this.plotY) {
          if (!this.destroyed) {
            const { plotX: c, series: a } = this,
              { chart: f, xAxis: l, yAxis: e } = a;
            let g = 0,
              r = 0;
            if (x(c) && x(b))
              return (
                d &&
                  ((g = l ? l.pos : f.plotLeft), (r = e ? e.pos : f.plotTop)),
                f.inverted && l && e
                  ? [e.len - b + r, l.len - c + g]
                  : [c + g, b + r]
              );
          }
        }
        resolveColor() {
          const d = this.series;
          var b = d.chart.styledMode;
          let c;
          var a = d.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          d.options.colorByPoint
            ? (b ||
                ((a = d.options.colors || d.chart.options.colors),
                (c = a[d.colorCounter]),
                (a = a.length)),
              (b = d.colorCounter),
              d.colorCounter++,
              d.colorCounter === a && (d.colorCounter = 0))
            : (b || (c = d.color), (b = d.colorIndex));
          this.colorIndex = f(this.options.colorIndex, b);
          this.color = f(this.options.color, c);
        }
        setNestedProperty(d, b, c) {
          c.split(".").reduce(function (c, d, a, f) {
            c[d] = f.length - 1 === a ? b : I(c[d], !0) ? c[d] : {};
            return c[d];
          }, d);
          return d;
        }
        shouldDraw() {
          return !this.isNull;
        }
        tooltipFormatter(d) {
          const b = this.series,
            c = b.tooltipOptions,
            a = f(c.valueDecimals, ""),
            l = c.valuePrefix || "",
            e = c.valueSuffix || "";
          b.chart.styledMode && (d = b.chart.tooltip.styledModeFormat(d));
          (b.pointArrayMap || ["y"]).forEach(function (b) {
            b = "{point." + b;
            if (l || e) d = d.replace(RegExp(b + "}", "g"), l + b + "}" + e);
            d = d.replace(RegExp(b + "}", "g"), b + ":,." + a + "f}");
          });
          return B(d, { point: this, series: this.series }, b.chart);
        }
        update(d, b, c, a) {
          function k() {
            l.applyOptions(d);
            var a = g && l.hasMockGraphic;
            a = null === l.y ? !a : a;
            g && a && ((l.graphic = g.destroy()), delete l.hasMockGraphic);
            I(d, !0) &&
              (g &&
                g.element &&
                d &&
                d.marker &&
                "undefined" !== typeof d.marker.symbol &&
                (l.graphic = g.destroy()),
              d &&
                d.dataLabels &&
                l.dataLabel &&
                (l.dataLabel = l.dataLabel.destroy()),
              l.connector && (l.connector = l.connector.destroy()));
            y = l.index;
            e.updateParallelArrays(l, y);
            h.data[y] =
              I(h.data[y], !0) || I(d, !0) ? l.options : f(d, h.data[y]);
            e.isDirty = e.isDirtyData = !0;
            !e.fixedBox && e.hasCartesianSeries && (r.isDirtyBox = !0);
            "point" === h.legendType && (r.isDirtyLegend = !0);
            b && r.redraw(c);
          }
          const l = this,
            e = l.series,
            g = l.graphic,
            r = e.chart,
            h = e.options;
          let y;
          b = f(b, !0);
          !1 === a ? k() : l.firePointEvent("update", { options: d }, k);
        }
        remove(d, b) {
          this.series.removePoint(this.series.data.indexOf(this), d, b);
        }
        select(d, b) {
          const c = this,
            a = c.series,
            l = a.chart;
          this.selectedStaging = d = f(d, !c.selected);
          c.firePointEvent(
            d ? "select" : "unselect",
            { accumulate: b },
            function () {
              c.selected = c.options.selected = d;
              a.options.data[a.data.indexOf(c)] = c.options;
              c.setState(d && "select");
              b ||
                l.getSelectedPoints().forEach(function (b) {
                  const d = b.series;
                  b.selected &&
                    b !== c &&
                    ((b.selected = b.options.selected = !1),
                    (d.options.data[d.data.indexOf(b)] = b.options),
                    b.setState(
                      l.hoverPoints && d.options.inactiveOtherPoints
                        ? "inactive"
                        : ""
                    ),
                    b.firePointEvent("unselect"));
                });
            }
          );
          delete this.selectedStaging;
        }
        onMouseOver(d) {
          const b = this.series.chart,
            c = b.pointer;
          d = d
            ? c.normalize(d)
            : c.getChartCoordinatesFromPoint(this, b.inverted);
          c.runPointActions(d, this);
        }
        onMouseOut() {
          const d = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (d.hoverPoints || []).forEach(function (b) {
              b.setState();
            });
          d.hoverPoints = d.hoverPoint = null;
        }
        importEvents() {
          if (!this.hasImportedEvents) {
            const d = this,
              b = M(d.series.options.point, d.options).events;
            d.events = b;
            C(b, function (b, a) {
              e(b) && t(d, a, b);
            });
            this.hasImportedEvents = !0;
          }
        }
        setState(d, b) {
          const c = this.series;
          var k = this.state,
            l = c.options.states[d || "normal"] || {},
            e = E.plotOptions[c.type].marker && c.options.marker;
          const g = e && !1 === e.enabled,
            r = (e && e.states && e.states[d || "normal"]) || {},
            h = !1 === r.enabled,
            y = this.marker || {},
            v = c.chart,
            m = e && c.markerAttribs;
          let q = c.halo;
          var t;
          let I;
          var u = c.stateMarkerGraphic;
          d = d || "";
          if (
            !(
              (d === this.state && !b) ||
              (this.selected && "select" !== d) ||
              !1 === l.enabled ||
              (d && (h || (g && !1 === r.enabled))) ||
              (d && y.states && y.states[d] && !1 === y.states[d].enabled)
            )
          ) {
            this.state = d;
            m && (t = c.markerAttribs(this, d));
            if (this.graphic && !this.hasMockGraphic) {
              k && this.graphic.removeClass("highcharts-point-" + k);
              d && this.graphic.addClass("highcharts-point-" + d);
              if (!v.styledMode) {
                k = c.pointAttribs(this, d);
                I = f(v.options.chart.animation, l.animation);
                const b = k.opacity;
                c.options.inactiveOtherPoints &&
                  x(b) &&
                  ((this.dataLabels || []).forEach(function (c) {
                    c &&
                      !c.hasClass("highcharts-data-label-hidden") &&
                      c.animate({ opacity: b }, I);
                  }),
                  this.connector && this.connector.animate({ opacity: b }, I));
                this.graphic.animate(k, I);
              }
              t &&
                this.graphic.animate(
                  t,
                  f(v.options.chart.animation, r.animation, e.animation)
                );
              u && u.hide();
            } else {
              if (d && r) {
                e = y.symbol || c.symbol;
                u && u.currentSymbol !== e && (u = u.destroy());
                if (t)
                  if (u) u[b ? "animate" : "attr"]({ x: t.x, y: t.y });
                  else
                    e &&
                      ((c.stateMarkerGraphic = u =
                        v.renderer
                          .symbol(e, t.x, t.y, t.width, t.height)
                          .add(c.markerGroup)),
                      (u.currentSymbol = e));
                !v.styledMode &&
                  u &&
                  "inactive" !== this.state &&
                  u.attr(c.pointAttribs(this, d));
              }
              u &&
                (u[d && this.isInside ? "show" : "hide"](),
                (u.element.point = this),
                u.addClass(this.getClassName(), !0));
            }
            l = l.halo;
            t = ((u = this.graphic || u) && u.visibility) || "inherit";
            l && l.size && u && "hidden" !== t && !this.isCluster
              ? (q || (c.halo = q = v.renderer.path().add(u.parentGroup)),
                q.show()[b ? "animate" : "attr"]({ d: this.haloPath(l.size) }),
                q.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    f(this.colorIndex, c.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: t,
                  zIndex: -1,
                }),
                (q.point = this),
                v.styledMode ||
                  q.attr(
                    p(
                      {
                        fill: this.color || c.color,
                        "fill-opacity": l.opacity,
                      },
                      a.filterUserAttributes(l.attributes || {})
                    )
                  ))
              : q &&
                q.point &&
                q.point.haloPath &&
                q.animate({ d: q.point.haloPath(0) }, null, q.hide);
            n(this, "afterSetState", { state: d });
          }
        }
        haloPath(d) {
          const b = this.pos();
          return b
            ? this.series.chart.renderer.symbols.circle(
                Math.floor(b[0]) - d,
                b[1] - d,
                2 * d,
                2 * d
              )
            : [];
        }
      }
      ("");
      return v;
    }
  );
  L(
    a,
    "Core/Pointer.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A, J) {
      const { parse: u } = a,
        { charts: G, noop: D } = A,
        {
          addEvent: E,
          attr: B,
          css: t,
          defined: q,
          extend: m,
          find: p,
          fireEvent: n,
          isNumber: h,
          isObject: g,
          objectEach: e,
          offset: x,
          pick: I,
          splat: M,
        } = J;
      class C {
        constructor(a, e) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = e;
          this.init(a, e);
        }
        applyInactiveState(a) {
          let f = [],
            e;
          (a || []).forEach(function (a) {
            e = a.series;
            f.push(e);
            e.linkedParent && f.push(e.linkedParent);
            e.linkedSeries && (f = f.concat(e.linkedSeries));
            e.navigatorSeries && f.push(e.navigatorSeries);
          });
          this.chart.series.forEach(function (a) {
            -1 === f.indexOf(a)
              ? a.setState("inactive", !0)
              : a.options.inactiveOtherPoints &&
                a.setAllPointsToState("inactive");
          });
        }
        destroy() {
          const a = this;
          this.eventsToUnbind.forEach((a) => a());
          this.eventsToUnbind = [];
          A.chartCount ||
            (C.unbindDocumentMouseUp &&
              (C.unbindDocumentMouseUp = C.unbindDocumentMouseUp()),
            C.unbindDocumentTouchEnd &&
              (C.unbindDocumentTouchEnd = C.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          e(a, function (f, e) {
            a[e] = void 0;
          });
        }
        getSelectionMarkerAttrs(a, e) {
          const f = {
            args: { chartX: a, chartY: e },
            attrs: {},
            shapeType: "rect",
          };
          n(this, "getSelectionMarkerAttrs", f, (f) => {
            const {
              chart: l,
              mouseDownX: d = 0,
              mouseDownY: b = 0,
              zoomHor: c,
              zoomVert: k,
            } = this;
            f = f.attrs;
            let g;
            f.x = l.plotLeft;
            f.y = l.plotTop;
            f.width = c ? 1 : l.plotWidth;
            f.height = k ? 1 : l.plotHeight;
            c &&
              ((g = a - d),
              (f.width = Math.abs(g)),
              (f.x = (0 < g ? 0 : g) + d));
            k &&
              ((g = e - b),
              (f.height = Math.abs(g)),
              (f.y = (0 < g ? 0 : g) + b));
          });
          return f;
        }
        drag(a) {
          const f = this.chart,
            e = f.options.chart;
          var l = f.plotLeft;
          const h = f.plotTop,
            d = f.plotWidth,
            b = f.plotHeight,
            c = this.mouseDownX || 0,
            k = this.mouseDownY || 0,
            w = g(e.panning) ? e.panning && e.panning.enabled : e.panning,
            n = e.panKey && a[e.panKey + "Key"];
          let m = a.chartX,
            p = a.chartY,
            q = this.selectionMarker;
          if (!q || !q.touch)
            if (
              (m < l ? (m = l) : m > l + d && (m = l + d),
              p < h ? (p = h) : p > h + b && (p = h + b),
              (this.hasDragged = Math.sqrt(
                Math.pow(c - m, 2) + Math.pow(k - p, 2)
              )),
              10 < this.hasDragged)
            ) {
              l = f.isInsidePlot(c - l, k - h, { visiblePlotOnly: !0 });
              const { shapeType: b, attrs: d } = this.getSelectionMarkerAttrs(
                m,
                p
              );
              (!f.hasCartesianSeries && !f.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !l ||
                n ||
                q ||
                ((this.selectionMarker = q = f.renderer[b]()),
                q
                  .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                  .add(),
                f.styledMode ||
                  q.attr({
                    fill:
                      e.selectionMarkerFill ||
                      u("#334eff").setOpacity(0.25).get(),
                  }));
              q && q.attr(d);
              l && !q && w && f.pan(a, e.panning);
            }
        }
        dragStart(a) {
          const f = this.chart;
          f.mouseIsDown = a.type;
          f.cancelClick = !1;
          f.mouseDownX = this.mouseDownX = a.chartX;
          f.mouseDownY = this.mouseDownY = a.chartY;
        }
        getSelectionBox(a) {
          const f = { args: { marker: a }, result: {} };
          n(this, "getSelectionBox", f, (f) => {
            f.result = {
              x: a.attr ? +a.attr("x") : a.x,
              y: a.attr ? +a.attr("y") : a.y,
              width: a.attr ? a.attr("width") : a.width,
              height: a.attr ? a.attr("height") : a.height,
            };
          });
          return f.result;
        }
        drop(a) {
          const f = this,
            e = this.chart,
            l = this.hasPinched;
          if (this.selectionMarker) {
            const {
                x: g,
                y: d,
                width: b,
                height: c,
              } = this.getSelectionBox(this.selectionMarker),
              k = {
                originalEvent: a,
                xAxis: [],
                yAxis: [],
                x: g,
                y: d,
                width: b,
                height: c,
              };
            let r = !!e.mapView;
            if (this.hasDragged || l)
              e.axes.forEach(function (e) {
                if (
                  e.zoomEnabled &&
                  q(e.min) &&
                  (l || f[{ xAxis: "zoomX", yAxis: "zoomY" }[e.coll]]) &&
                  h(g) &&
                  h(d) &&
                  h(b) &&
                  h(c)
                ) {
                  var w = e.horiz;
                  const f = "touchend" === a.type ? e.minPixelPadding : 0,
                    l = e.toValue((w ? g : d) + f);
                  w = e.toValue((w ? g + b : d + c) - f);
                  k[e.coll].push({
                    axis: e,
                    min: Math.min(l, w),
                    max: Math.max(l, w),
                  });
                  r = !0;
                }
              }),
                r &&
                  n(e, "selection", k, function (b) {
                    e.zoom(m(b, l ? { animation: !1 } : null));
                  });
            h(e.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            l && this.scaleGroups();
          }
          e &&
            h(e.index) &&
            (t(e.container, { cursor: e._cursor }),
            (e.cancelClick = 10 < this.hasDragged),
            (e.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        }
        findNearestKDPoint(a, e, r) {
          let f;
          a.forEach(function (a) {
            var d =
              !(a.noSharedTooltip && e) &&
              0 > a.options.findNearestPointBy.indexOf("y");
            a = a.searchPoint(r, d);
            if ((d = g(a, !0) && a.series) && !(d = !g(f, !0))) {
              {
                d = f.distX - a.distX;
                const b = f.dist - a.dist,
                  c =
                    (a.series.group && a.series.group.zIndex) -
                    (f.series.group && f.series.group.zIndex);
                d =
                  0 !== d && e
                    ? d
                    : 0 !== b
                    ? b
                    : 0 !== c
                    ? c
                    : f.series.index > a.series.index
                    ? -1
                    : 1;
              }
              d = 0 < d;
            }
            d && (f = a);
          });
          return f;
        }
        getChartCoordinatesFromPoint(a, e) {
          var f = a.series;
          const l = f.xAxis;
          f = f.yAxis;
          const g = a.shapeArgs;
          if (l && f) {
            let d = I(a.clientX, a.plotX),
              b = a.plotY || 0;
            a.isNode && g && h(g.x) && h(g.y) && ((d = g.x), (b = g.y));
            return e
              ? { chartX: f.len + f.pos - b, chartY: l.len + l.pos - d }
              : { chartX: d + l.pos, chartY: b + f.pos };
          }
          if (g && g.x && g.y) return { chartX: g.x, chartY: g.y };
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          var { container: a } = this.chart;
          const e = x(a);
          this.chartPosition = {
            left: e.left,
            top: e.top,
            scaleX: 1,
            scaleY: 1,
          };
          const g = a.offsetWidth;
          a = a.offsetHeight;
          2 < g &&
            2 < a &&
            ((this.chartPosition.scaleX = e.width / g),
            (this.chartPosition.scaleY = e.height / a));
          return this.chartPosition;
        }
        getCoordinates(a) {
          const f = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (e) {
            f[e.isXAxis ? "xAxis" : "yAxis"].push({
              axis: e,
              value: e.toValue(a[e.horiz ? "chartX" : "chartY"]),
            });
          });
          return f;
        }
        getHoverData(a, e, h, l, m, d) {
          const b = [];
          l = !(!l || !a);
          const c = function (b) {
            return (
              b.visible &&
              !(!m && b.directTouch) &&
              I(b.options.enableMouseTracking, !0)
            );
          };
          let k,
            f = {
              chartX: d ? d.chartX : void 0,
              chartY: d ? d.chartY : void 0,
              shared: m,
            };
          n(this, "beforeGetHoverData", f);
          k =
            e && !e.stickyTracking
              ? [e]
              : h.filter((b) => b.stickyTracking && (f.filter || c)(b));
          const r = l || !d ? a : this.findNearestKDPoint(k, m, d);
          e = r && r.series;
          r &&
            (m && !e.noSharedTooltip
              ? ((k = h.filter(function (b) {
                  return f.filter ? f.filter(b) : c(b) && !b.noSharedTooltip;
                })),
                k.forEach(function (c) {
                  let a = p(c.points, function (b) {
                    return b.x === r.x && !b.isNull;
                  });
                  g(a) &&
                    (c.boosted && c.boost && (a = c.boost.getPoint(a)),
                    b.push(a));
                }))
              : b.push(r));
          f = { hoverPoint: r };
          n(this, "afterGetHoverData", f);
          return { hoverPoint: f.hoverPoint, hoverSeries: e, hoverPoints: b };
        }
        getPointFromEvent(a) {
          a = a.target;
          let f;
          for (; a && !f; ) (f = a.point), (a = a.parentNode);
          return f;
        }
        onTrackerMouseOut(a) {
          a = a.relatedTarget;
          const f = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !f ||
              !a ||
              f.stickyTracking ||
              this.inClass(a, "highcharts-tooltip") ||
              (this.inClass(a, "highcharts-series-" + f.index) &&
                this.inClass(a, "highcharts-tracker"))
            )
          )
            f.onMouseOut();
        }
        inClass(a, e) {
          let f;
          for (; a; ) {
            if ((f = B(a, "class"))) {
              if (-1 !== f.indexOf(e)) return !0;
              if (-1 !== f.indexOf("highcharts-container")) return !1;
            }
            a = a.parentElement;
          }
        }
        init(a, e) {
          this.options = e;
          this.chart = a;
          this.runChartClick = !(!e.chart.events || !e.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          this.setDOMEvents();
          n(this, "afterInit");
        }
        normalize(a, e) {
          var f = a.touches,
            l = f
              ? f.length
                ? f.item(0)
                : I(f.changedTouches, a.changedTouches)[0]
              : a;
          e || (e = this.getChartPosition());
          f = l.pageX - e.left;
          l = l.pageY - e.top;
          f /= e.scaleX;
          l /= e.scaleY;
          return m(a, { chartX: Math.round(f), chartY: Math.round(l) });
        }
        onContainerClick(a) {
          const f = this.chart,
            e = f.hoverPoint;
          a = this.normalize(a);
          const l = f.plotLeft,
            g = f.plotTop;
          f.cancelClick ||
            (e && this.inClass(a.target, "highcharts-tracker")
              ? (n(e.series, "click", m(a, { point: e })),
                f.hoverPoint && e.firePointEvent("click", a))
              : (m(a, this.getCoordinates(a)),
                f.isInsidePlot(a.chartX - l, a.chartY - g, {
                  visiblePlotOnly: !0,
                }) && n(f, "click", a)));
        }
        onContainerMouseDown(a) {
          const f = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (A.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || f)
            this.zoomOption(a),
              f && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        }
        onContainerMouseLeave(a) {
          const f = G[I(C.hoverChartIndex, -1)];
          a = this.normalize(a);
          f &&
            a.relatedTarget &&
            !this.inClass(a.relatedTarget, "highcharts-tooltip") &&
            (f.pointer.reset(), (f.pointer.chartPosition = void 0));
        }
        onContainerMouseEnter(a) {
          delete this.chartPosition;
        }
        onContainerMouseMove(a) {
          const f = this.chart,
            e = f.tooltip;
          a = this.normalize(a);
          this.setHoverChartIndex();
          ("mousedown" === f.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          f.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (e && e.shouldStickOnContact(a)) ||
            (this.inClass(a.target, "highcharts-no-tooltip")
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        }
        onDocumentTouchEnd(a) {
          const f = G[I(C.hoverChartIndex, -1)];
          f && f.pointer.drop(a);
        }
        onContainerTouchMove(a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        }
        onContainerTouchStart(a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        }
        onDocumentMouseMove(a) {
          const f = this.chart,
            e = f.tooltip,
            l = this.chartPosition;
          a = this.normalize(a, l);
          !l ||
            f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            (e && e.shouldStickOnContact(a)) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        }
        onDocumentMouseUp(a) {
          const f = G[I(C.hoverChartIndex, -1)];
          f && f.pointer.drop(a);
        }
        pinch(a) {
          const f = this,
            e = f.chart,
            l = f.pinchDown,
            g = a.touches || [],
            d = g.length,
            b = f.lastValidTouch,
            c = f.hasZoom,
            k = {},
            h =
              1 === d &&
              ((f.inClass(a.target, "highcharts-tracker") &&
                e.runTrackerClick) ||
                f.runChartClick),
            z = {};
          var F = f.chart.tooltip;
          F = 1 === d && I(F && F.options.followTouchMove, !0);
          let p = f.selectionMarker;
          1 < d ? (f.initiated = !0) : F && (f.initiated = !1);
          c && f.initiated && !h && !1 !== a.cancelable && a.preventDefault();
          [].map.call(g, function (b) {
            return f.normalize(b);
          });
          "touchstart" === a.type
            ? ([].forEach.call(g, function (b, c) {
                l[c] = { chartX: b.chartX, chartY: b.chartY };
              }),
              (b.x = [l[0].chartX, l[1] && l[1].chartX]),
              (b.y = [l[0].chartY, l[1] && l[1].chartY]),
              e.axes.forEach(function (b) {
                if (b.zoomEnabled) {
                  const c = e.bounds[b.horiz ? "h" : "v"],
                    a = b.minPixelPadding,
                    d = b.toPixels(
                      Math.min(I(b.options.min, b.dataMin), b.dataMin)
                    ),
                    k = b.toPixels(
                      Math.max(I(b.options.max, b.dataMax), b.dataMax)
                    ),
                    f = Math.max(d, k);
                  c.min = Math.min(b.pos, Math.min(d, k) - a);
                  c.max = Math.max(b.pos + b.len, f + a);
                }
              }),
              (f.res = !0))
            : F
            ? this.runPointActions(f.normalize(a))
            : l.length &&
              (n(e, "touchpan", { originalEvent: a }, () => {
                p ||
                  (f.selectionMarker = p =
                    m({ destroy: D, touch: !0 }, e.plotBox));
                f.pinchTranslate(l, g, k, p, z, b);
                f.hasPinched = c;
                f.scaleGroups(k, z);
              }),
              f.res && ((f.res = !1), this.reset(!1, 0)));
        }
        pinchTranslate(a, e, g, l, h, d) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, e, g, l, h, d);
          this.zoomVert && this.pinchTranslateDirection(!1, a, e, g, l, h, d);
        }
        pinchTranslateDirection(a, e, g, l, h, d, b, c) {
          const k = this.chart,
            f = a ? "x" : "y",
            r = a ? "X" : "Y",
            n = "chart" + r,
            m = a ? "width" : "height",
            v = k["plot" + (a ? "Left" : "Top")],
            y = k.inverted,
            p = k.bounds[a ? "h" : "v"],
            q = 1 === e.length,
            x = e[0][n],
            t = !q && e[1][n];
          e = function () {
            "number" === typeof X &&
              20 < Math.abs(x - t) &&
              (C = c || Math.abs(N - X) / Math.abs(x - t));
            I = (v - N) / C + x;
            u = k["plot" + (a ? "Width" : "Height")] / C;
          };
          let u,
            I,
            C = c || 1,
            N = g[0][n],
            X = !q && g[1][n],
            Q;
          e();
          g = I;
          g < p.min
            ? ((g = p.min), (Q = !0))
            : g + u > p.max && ((g = p.max - u), (Q = !0));
          Q
            ? ((N -= 0.8 * (N - b[f][0])),
              "number" === typeof X && (X -= 0.8 * (X - b[f][1])),
              e())
            : (b[f] = [N, X]);
          y || ((d[f] = I - v), (d[m] = u));
          d = y ? 1 / C : C;
          h[m] = u;
          h[f] = g;
          l[y ? (a ? "scaleY" : "scaleX") : "scale" + r] = C;
          l["translate" + r] = d * v + (N - d * x);
        }
        reset(a, e) {
          const f = this.chart,
            l = f.hoverSeries,
            g = f.hoverPoint,
            d = f.hoverPoints,
            b = f.tooltip,
            c = b && b.shared ? d : g;
          a &&
            c &&
            M(c).forEach(function (b) {
              b.series.isCartesian &&
                "undefined" === typeof b.plotX &&
                (a = !1);
            });
          if (a)
            b &&
              c &&
              M(c).length &&
              (b.refresh(c),
              b.shared && d
                ? d.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian &&
                      (b.series.xAxis.crosshair &&
                        b.series.xAxis.drawCrosshair(null, b),
                      b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b));
                  })
                : g &&
                  (g.setState(g.state, !0),
                  f.axes.forEach(function (b) {
                    b.crosshair &&
                      g.series[b.coll] === b &&
                      b.drawCrosshair(null, g);
                  })));
          else {
            if (g) g.onMouseOut();
            d &&
              d.forEach(function (b) {
                b.setState();
              });
            if (l) l.onMouseOut();
            b && b.hide(e);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            f.axes.forEach(function (b) {
              b.hideCrosshair();
            });
            this.hoverX = f.hoverPoints = f.hoverPoint = null;
          }
        }
        runPointActions(a, e, g) {
          const f = this.chart,
            h = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
            d = h ? h.shared : !1;
          let b = e || f.hoverPoint,
            c = (b && b.series) || f.hoverSeries;
          e = this.getHoverData(
            b,
            c,
            f.series,
            (!a || "touchmove" !== a.type) &&
              (!!e || (c && c.directTouch && this.isDirectTouch)),
            d,
            a
          );
          b = e.hoverPoint;
          c = e.hoverSeries;
          const k = e.hoverPoints;
          e = c && c.tooltipOptions.followPointer && !c.tooltipOptions.split;
          const w = d && c && !c.noSharedTooltip;
          if (b && (g || b !== f.hoverPoint || (h && h.isHidden))) {
            (f.hoverPoints || []).forEach(function (b) {
              -1 === k.indexOf(b) && b.setState();
            });
            if (f.hoverSeries !== c) c.onMouseOver();
            this.applyInactiveState(k);
            (k || []).forEach(function (b) {
              b.setState("hover");
            });
            f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
            if (!b.series) return;
            f.hoverPoints = k;
            f.hoverPoint = b;
            b.firePointEvent("mouseOver", void 0, () => {
              h && b && h.refresh(w ? k : b, a);
            });
          } else
            e &&
              h &&
              !h.isHidden &&
              ((g = h.getAnchor([{}], a)),
              f.isInsidePlot(g[0], g[1], { visiblePlotOnly: !0 }) &&
                h.updatePosition({ plotX: g[0], plotY: g[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = E(
              f.container.ownerDocument,
              "mousemove",
              function (b) {
                const c = G[C.hoverChartIndex];
                if (c) c.pointer.onDocumentMouseMove(b);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          f.axes.forEach(function (b) {
            const c = I((b.crosshair || {}).snap, !0);
            let d;
            c &&
              (((d = f.hoverPoint) && d.series[b.coll] === b) ||
                (d = p(k, (c) => c.series && c.series[b.coll] === b)));
            d || !c ? b.drawCrosshair(a, d) : b.hideCrosshair();
          });
        }
        scaleGroups(a, e) {
          const f = this.chart;
          f.series.forEach(function (l) {
            const g = a || l.getPlotBox();
            l.group &&
              ((l.xAxis && l.xAxis.zoomEnabled) || f.mapView) &&
              (l.group.attr(g),
              l.markerGroup &&
                (l.markerGroup.attr(g),
                l.markerGroup.clip(e ? f.clipRect : null)),
              l.dataLabelsGroup && l.dataLabelsGroup.attr(g));
          });
          f.clipRect.attr(e || f.clipBox);
        }
        setDOMEvents() {
          const a = this.chart.container,
            e = a.ownerDocument;
          a.onmousedown = this.onContainerMouseDown.bind(this);
          a.onmousemove = this.onContainerMouseMove.bind(this);
          a.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            E(a, "mouseenter", this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            E(a, "mouseleave", this.onContainerMouseLeave.bind(this))
          );
          C.unbindDocumentMouseUp ||
            (C.unbindDocumentMouseUp = E(
              e,
              "mouseup",
              this.onDocumentMouseUp.bind(this)
            ));
          let g = this.chart.renderTo.parentElement;
          for (; g && "BODY" !== g.tagName; )
            this.eventsToUnbind.push(
              E(g, "scroll", () => {
                delete this.chartPosition;
              })
            ),
              (g = g.parentElement);
          A.hasTouch &&
            (this.eventsToUnbind.push(
              E(a, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              E(a, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            C.unbindDocumentTouchEnd ||
              (C.unbindDocumentTouchEnd = E(
                e,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 }
              )));
        }
        setHoverChartIndex() {
          const a = this.chart,
            e = A.charts[I(C.hoverChartIndex, -1)];
          if (e && e !== a)
            e.pointer.onContainerMouseLeave({ relatedTarget: a.container });
          (e && e.mouseIsDown) || (C.hoverChartIndex = a.index);
        }
        touch(a, e) {
          const f = this.chart;
          let l, g;
          this.setHoverChartIndex();
          1 === a.touches.length
            ? ((a = this.normalize(a)),
              (g = f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop, {
                visiblePlotOnly: !0,
              })) && !f.openMenu
                ? (e && this.runPointActions(a),
                  "touchmove" === a.type &&
                    ((e = this.pinchDown),
                    (l = e[0]
                      ? 4 <=
                        Math.sqrt(
                          Math.pow(e[0].chartX - a.chartX, 2) +
                            Math.pow(e[0].chartY - a.chartY, 2)
                        )
                      : !1)),
                  I(l, !0) && this.pinch(a))
                : e && this.reset())
            : 2 === a.touches.length && this.pinch(a);
        }
        touchSelect(a) {
          return !(
            !this.chart.zooming.singleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        }
        zoomOption(a) {
          const f = this.chart,
            e = f.inverted;
          var l = f.zooming.type || "";
          /touch/.test(a.type) && (l = I(f.zooming.pinchType, l));
          this.zoomX = a = /x/.test(l);
          this.zoomY = l = /y/.test(l);
          this.zoomHor = (a && !e) || (l && e);
          this.zoomVert = (l && !e) || (a && e);
          this.hasZoom = a || l;
        }
      }
      (function (a) {
        const f = [],
          e = [];
        a.compose = function (f) {
          J.pushUnique(e, f) &&
            E(f, "beforeRender", function () {
              this.pointer = new a(this, this.options);
            });
        };
        a.dissolve = function () {
          for (let a = 0, e = f.length; a < e; ++a) f[a]();
          f.length = 0;
        };
      })(C || (C = {}));
      ("");
      return C;
    }
  );
  L(
    a,
    "Core/Legend/Legend.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Templating.js"],
      a["Core/Globals.js"],
      a["Core/Series/Point.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D) {
      const { animObject: u, setAnimation: B } = a,
        { format: t } = A,
        { marginNames: q } = J,
        { distribute: m } = G,
        {
          addEvent: p,
          createElement: n,
          css: h,
          defined: g,
          discardElement: e,
          find: x,
          fireEvent: I,
          isNumber: M,
          merge: C,
          pick: f,
          relativeLength: y,
          stableSort: r,
          syncTimeout: l,
        } = D;
      class v {
        constructor(a, b) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = a;
          this.init(a, b);
        }
        init(a, b) {
          this.chart = a;
          this.setOptions(b);
          b.enabled &&
            (this.render(),
            p(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            p(this.chart, "render", () => {
              this.proximate &&
                (this.proximatePositions(), this.positionItems());
            }));
        }
        setOptions(a) {
          const b = f(a.padding, 8);
          this.options = a;
          this.chart.styledMode ||
            ((this.itemStyle = a.itemStyle),
            (this.itemHiddenStyle = C(this.itemStyle, a.itemHiddenStyle)));
          this.itemMarginTop = a.itemMarginTop;
          this.itemMarginBottom = a.itemMarginBottom;
          this.padding = b;
          this.initialItemY = b - 5;
          this.symbolWidth = f(a.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === a.layout && !this.chart.inverted;
          this.baseline = void 0;
        }
        update(a, b) {
          const c = this.chart;
          this.setOptions(C(!0, this.options, a));
          this.destroy();
          c.isDirtyLegend = c.isDirtyBox = !0;
          f(b, !0) && c.redraw();
          I(this, "afterUpdate");
        }
        colorizeItem(a, b) {
          const { group: c, label: d, line: f, symbol: e } = a.legendItem || {};
          if (c)
            c[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            const { itemHiddenStyle: c } = this,
              k = c.color,
              l = b ? a.color || k : k,
              g = a.options && a.options.marker;
            let h = { fill: l };
            null === d || void 0 === d
              ? void 0
              : d.css(C(b ? this.itemStyle : c));
            null === f || void 0 === f ? void 0 : f.attr({ stroke: l });
            e &&
              (g &&
                e.isMarker &&
                ((h = a.pointAttribs()), b || (h.stroke = h.fill = k)),
              e.attr(h));
          }
          I(this, "afterColorizeItem", { item: a, visible: b });
        }
        positionItems() {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        }
        positionItem(a) {
          const { group: b, x: c = 0, y: d = 0 } = a.legendItem || {};
          var f = this.options,
            e = f.symbolPadding;
          const l = !f.rtl;
          f = a.checkbox;
          b &&
            b.element &&
            ((e = {
              translateX: l ? c : this.legendWidth - c - 2 * e - 4,
              translateY: d,
            }),
            b[g(b.translateY) ? "animate" : "attr"](e, void 0, () => {
              I(this, "afterPositionItem", { item: a });
            }));
          f && ((f.x = c), (f.y = d));
        }
        destroyItem(a) {
          const b = a.checkbox,
            c = a.legendItem || {};
          for (const b of ["group", "label", "line", "symbol"])
            c[b] && (c[b] = c[b].destroy());
          b && e(b);
          a.legendItem = void 0;
        }
        destroy() {
          for (const a of this.getAllItems()) this.destroyItem(a);
          for (const a of "clipRect up down pager nav box title group".split(
            " "
          ))
            this[a] && (this[a] = this[a].destroy());
          this.display = null;
        }
        positionCheckboxes() {
          const a = this.group && this.group.alignAttr,
            b = this.clipHeight || this.legendHeight,
            c = this.titleHeight;
          let k;
          a &&
            ((k = a.translateY),
            this.allItems.forEach(function (d) {
              const f = d.checkbox;
              let e;
              f &&
                ((e = k + c + f.y + (this.scrollOffset || 0) + 3),
                h(f, {
                  left: a.translateX + d.checkboxOffset + f.x - 20 + "px",
                  top: e + "px",
                  display:
                    this.proximate || (e > k - 6 && e < k + b - 6)
                      ? ""
                      : "none",
                }));
            }, this));
        }
        renderTitle() {
          var a = this.options;
          const b = this.padding,
            c = a.title;
          let k = 0;
          c.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  c.text,
                  b - 3,
                  b - 4,
                  void 0,
                  void 0,
                  void 0,
                  a.useHTML,
                  void 0,
                  "legend-title"
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(c.style),
              this.title.add(this.group)),
            c.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (a = this.title.getBBox()),
            (k = a.height),
            (this.offsetWidth = a.width),
            this.contentGroup.attr({ translateY: k }));
          this.titleHeight = k;
        }
        setText(a) {
          const b = this.options;
          a.legendItem.label.attr({
            text: b.labelFormat
              ? t(b.labelFormat, a, this.chart)
              : b.labelFormatter.call(a),
          });
        }
        renderItem(a) {
          const b = (a.legendItem = a.legendItem || {});
          var c = this.chart,
            d = c.renderer;
          const e = this.options,
            l = this.symbolWidth,
            g = e.symbolPadding || 0,
            h = this.itemStyle,
            n = this.itemHiddenStyle,
            r = "horizontal" === e.layout ? f(e.itemDistance, 20) : 0,
            m = !e.rtl,
            v = !a.series,
            p = !v && a.series.drawLegendSymbol ? a.series : a;
          var q = p.options;
          const y = this.createCheckboxForItem && q && q.showCheckbox,
            x = e.useHTML,
            t = a.options.className;
          let N = b.label;
          q = l + g + r + (y ? 20 : 0);
          N ||
            ((b.group = d
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  p.type +
                  "-series highcharts-color-" +
                  a.colorIndex +
                  (t ? " " + t : "") +
                  (v ? " highcharts-series-" + a.index : "")
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (b.label = N = d.text("", m ? l + g : -g, this.baseline || 0, x)),
            c.styledMode || N.css(C(a.visible ? h : n)),
            N.attr({ align: m ? "left" : "right", zIndex: 2 }).add(b.group),
            this.baseline ||
              ((this.fontMetrics = d.fontMetrics(N)),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              N.attr("y", this.baseline),
              (this.symbolHeight = f(e.symbolHeight, this.fontMetrics.f)),
              e.squareSymbol &&
                ((this.symbolWidth = f(
                  e.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (q = this.symbolWidth + g + r + (y ? 20 : 0)),
                m && N.attr("x", this.symbolWidth + g))),
            p.drawLegendSymbol(this, a),
            this.setItemEvents && this.setItemEvents(a, N, x));
          y &&
            !a.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(a);
          this.colorizeItem(a, a.visible);
          (!c.styledMode && h.width) ||
            N.css({
              width:
                (e.itemWidth || this.widthOption || c.spacingBox.width) -
                q +
                "px",
            });
          this.setText(a);
          c = N.getBBox();
          d = (this.fontMetrics && this.fontMetrics.h) || 0;
          a.itemWidth = a.checkboxOffset =
            e.itemWidth || b.labelWidth || c.width + q;
          this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
          this.totalItemWidth += a.itemWidth;
          this.itemHeight = a.itemHeight = Math.round(
            b.labelHeight || (c.height > 1.5 * d ? c.height : d)
          );
        }
        layoutItem(a) {
          var b = this.options;
          const c = this.padding,
            d = "horizontal" === b.layout,
            e = a.itemHeight,
            l = this.itemMarginBottom,
            g = this.itemMarginTop,
            h = d ? f(b.itemDistance, 20) : 0,
            n = this.maxLegendWidth;
          b =
            b.alignColumns && this.totalItemWidth > n
              ? this.maxItemWidth
              : a.itemWidth;
          const r = a.legendItem || {};
          d &&
            this.itemX - c + b > n &&
            ((this.itemX = c),
            this.lastLineHeight && (this.itemY += g + this.lastLineHeight + l),
            (this.lastLineHeight = 0));
          this.lastItemY = g + this.itemY + l;
          this.lastLineHeight = Math.max(e, this.lastLineHeight);
          r.x = this.itemX;
          r.y = this.itemY;
          d
            ? (this.itemX += b)
            : ((this.itemY += g + e + l), (this.lastLineHeight = e));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (d ? this.itemX - c - (a.checkbox ? 0 : h) : b) + c,
              this.offsetWidth
            );
        }
        getAllItems() {
          let a = [];
          this.chart.series.forEach(function (b) {
            const c = b && b.options;
            b &&
              f(c.showInLegend, g(c.linkedTo) ? !1 : void 0, !0) &&
              (a = a.concat(
                (b.legendItem || {}).labels ||
                  ("point" === c.legendType ? b.data : b)
              ));
          });
          I(this, "afterGetAllItems", { allItems: a });
          return a;
        }
        getAlignment() {
          const a = this.options;
          return this.proximate
            ? a.align.charAt(0) + "tv"
            : a.floating
            ? ""
            : a.align.charAt(0) +
              a.verticalAlign.charAt(0) +
              a.layout.charAt(0);
        }
        adjustMargins(a, b) {
          const c = this.chart,
            d = this.options,
            e = this.getAlignment();
          e &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (k, l) {
              k.test(e) &&
                !g(a[l]) &&
                (c[q[l]] = Math.max(
                  c[q[l]],
                  c.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][l] * d[l % 2 ? "x" : "y"] +
                    f(d.margin, 12) +
                    b[l] +
                    (c.titleOffset[l] || 0)
                ));
            });
        }
        proximatePositions() {
          const a = this.chart,
            b = [],
            c = "left" === this.options.align;
          this.allItems.forEach(function (d) {
            var k;
            var f = c;
            let e;
            d.yAxis &&
              (d.xAxis.options.reversed && (f = !f),
              d.points &&
                (k = x(
                  f ? d.points : d.points.slice(0).reverse(),
                  function (b) {
                    return M(b.plotY);
                  }
                )),
              (f =
                this.itemMarginTop +
                d.legendItem.label.getBBox().height +
                this.itemMarginBottom),
              (e = d.yAxis.top - a.plotTop),
              d.visible
                ? ((k = k ? k.plotY : d.yAxis.height), (k += e - 0.3 * f))
                : (k = e + d.yAxis.height),
              b.push({ target: k, size: f, item: d }));
          }, this);
          let k;
          for (const c of m(b, a.plotHeight))
            (k = c.item.legendItem || {}),
              M(c.pos) && (k.y = a.plotTop - a.spacing[0] + c.pos);
        }
        render() {
          const a = this.chart,
            b = a.renderer,
            c = this.options,
            k = this.padding;
          var f = this.getAllItems();
          let e,
            l = this.group,
            g = this.box;
          this.itemX = k;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = y(c.width, a.spacingBox.width - k);
          var h = a.spacingBox.width - 2 * k - c.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (h /= 2);
          this.maxLegendWidth = this.widthOption || h;
          l ||
            ((this.group = l =
              b
                .g("legend")
                .addClass(c.className || "")
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = b.g().attr({ zIndex: 1 }).add(l)),
            (this.scrollGroup = b.g().add(this.contentGroup)));
          this.renderTitle();
          r(
            f,
            (b, c) =>
              ((b.options && b.options.legendIndex) || 0) -
              ((c.options && c.options.legendIndex) || 0)
          );
          c.reversed && f.reverse();
          this.allItems = f;
          this.display = h = !!f.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          f.forEach(this.renderItem, this);
          f.forEach(this.layoutItem, this);
          f = (this.widthOption || this.offsetWidth) + k;
          e = this.lastItemY + this.lastLineHeight + this.titleHeight;
          e = this.handleOverflow(e);
          e += k;
          g ||
            (this.box = g =
              b
                .rect()
                .addClass("highcharts-legend-box")
                .attr({ r: c.borderRadius })
                .add(l));
          a.styledMode ||
            g
              .attr({
                stroke: c.borderColor,
                "stroke-width": c.borderWidth || 0,
                fill: c.backgroundColor || "none",
              })
              .shadow(c.shadow);
          if (0 < f && 0 < e)
            g[g.placed ? "animate" : "attr"](
              g.crisp.call(
                {},
                { x: 0, y: 0, width: f, height: e },
                g.strokeWidth()
              )
            );
          l[h ? "show" : "hide"]();
          a.styledMode && "none" === l.getStyle("display") && (f = e = 0);
          this.legendWidth = f;
          this.legendHeight = e;
          h && this.align();
          this.proximate || this.positionItems();
          I(this, "afterRender");
        }
        align(a = this.chart.spacingBox) {
          const b = this.chart,
            c = this.options;
          let d = a.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0]
            ? (d += b.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < b.titleOffset[2] &&
              (d -= b.titleOffset[2]);
          d !== a.y && (a = C(a, { y: d }));
          b.hasRendered || (this.group.placed = !1);
          this.group.align(
            C(c, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : c.verticalAlign,
            }),
            !0,
            a
          );
        }
        handleOverflow(a) {
          const b = this,
            c = this.chart,
            d = c.renderer,
            e = this.options;
          var l = e.y;
          const g = "top" === e.verticalAlign,
            h = this.padding,
            n = e.maxHeight,
            r = e.navigation,
            m = f(r.animation, !0),
            v = r.arrowSize || 12,
            p = this.pages,
            q = this.allItems,
            y = function (c) {
              "number" === typeof c
                ? I.attr({ height: c })
                : I && ((b.clipRect = I.destroy()), b.contentGroup.clip());
              b.contentGroup.div &&
                (b.contentGroup.div.style.clip = c
                  ? "rect(" + h + "px,9999px," + (h + c) + "px,0)"
                  : "auto");
            },
            x = function (a) {
              b[a] = d
                .circle(0, 0, 1.3 * v)
                .translate(v / 2, v / 2)
                .add(Q);
              c.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
              return b[a];
            };
          let t, N, u;
          l = c.spacingBox.height + (g ? -l : l) - h;
          let Q = this.nav,
            I = this.clipRect;
          "horizontal" !== e.layout ||
            "middle" === e.verticalAlign ||
            e.floating ||
            (l /= 2);
          n && (l = Math.min(l, n));
          p.length = 0;
          a && 0 < l && a > l && !1 !== r.enabled
            ? ((this.clipHeight = t =
                Math.max(l - 20 - this.titleHeight - h, 0)),
              (this.currentPage = f(this.currentPage, 1)),
              (this.fullHeight = a),
              q.forEach((b, c) => {
                u = b.legendItem || {};
                b = u.y || 0;
                const a = Math.round(u.label.getBBox().height);
                let d = p.length;
                if (!d || (b - p[d - 1] > t && (N || b) !== p[d - 1]))
                  p.push(N || b), d++;
                u.pageIx = d - 1;
                N && ((q[c - 1].legendItem || {}).pageIx = d - 1);
                c === q.length - 1 &&
                  b + a - p[d - 1] > t &&
                  b > p[d - 1] &&
                  (p.push(b), (u.pageIx = d));
                b !== N && (N = b);
              }),
              I ||
                ((I = b.clipRect = d.clipRect(0, h - 2, 9999, 0)),
                b.contentGroup.clip(I)),
              y(t),
              Q ||
                ((this.nav = Q = d.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = d.symbol("triangle", 0, 0, v, v).add(Q)),
                x("upTracker").on("click", function () {
                  b.scroll(-1, m);
                }),
                (this.pager = d
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                !c.styledMode && r.style && this.pager.css(r.style),
                this.pager.add(Q),
                (this.down = d.symbol("triangle-down", 0, 0, v, v).add(Q)),
                x("downTracker").on("click", function () {
                  b.scroll(1, m);
                })),
              b.scroll(0),
              (a = l))
            : Q &&
              (y(),
              (this.nav = Q.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return a;
        }
        scroll(a, b) {
          const c = this.chart,
            d = this.pages,
            e = d.length,
            g = this.clipHeight,
            h = this.options.navigation,
            n = this.pager,
            r = this.padding;
          let m = this.currentPage + a;
          m > e && (m = e);
          0 < m &&
            ("undefined" !== typeof b && B(b, c),
            this.nav.attr({
              translateX: r,
              translateY: g + this.padding + 7 + this.titleHeight,
              visibility: "inherit",
            }),
            [this.up, this.upTracker].forEach(function (b) {
              b.attr({
                class:
                  1 === m
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            n.attr({ text: m + "/" + e }),
            [this.down, this.downTracker].forEach(function (b) {
              b.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  m === e
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            c.styledMode ||
              (this.up.attr({
                fill: 1 === m ? h.inactiveColor : h.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === m ? "default" : "pointer" }),
              this.down.attr({
                fill: m === e ? h.inactiveColor : h.activeColor,
              }),
              this.downTracker.css({
                cursor: m === e ? "default" : "pointer",
              })),
            (this.scrollOffset = -d[m - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = m),
            this.positionCheckboxes(),
            (a = u(f(b, c.renderer.globalAnimation, !0))),
            l(() => {
              I(this, "afterScroll", { currentPage: m });
            }, a.duration));
        }
        setItemEvents(a, b, c) {
          const d = this,
            f = a.legendItem || {},
            e = d.chart.renderer.boxWrapper,
            l = a instanceof K,
            g = "highcharts-legend-" + (l ? "point" : "series") + "-active",
            h = d.chart.styledMode;
          c = c ? [b, f.symbol] : [f.group];
          const n = (b) => {
            d.allItems.forEach((c) => {
              a !== c &&
                [c].concat(c.linkedSeries || []).forEach((c) => {
                  c.setState(b, !l);
                });
            });
          };
          for (const k of c)
            if (k)
              k.on("mouseover", function () {
                a.visible && n("inactive");
                a.setState("hover");
                a.visible && e.addClass(g);
                h || b.css(d.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  d.chart.styledMode ||
                    b.css(C(a.visible ? d.itemStyle : d.itemHiddenStyle));
                  n("");
                  e.removeClass(g);
                  a.setState();
                })
                .on("click", function (b) {
                  const c = function () {
                    a.setVisible && a.setVisible();
                    n(a.visible ? "inactive" : "");
                  };
                  e.removeClass(g);
                  b = { browserEvent: b };
                  a.firePointEvent
                    ? a.firePointEvent("legendItemClick", b, c)
                    : I(a, "legendItemClick", b, c);
                });
        }
        createCheckboxForItem(a) {
          a.checkbox = n(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: a.selected,
              defaultChecked: a.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          p(a.checkbox, "click", function (b) {
            I(
              a.series || a,
              "checkboxClick",
              { checked: b.target.checked, item: a },
              function () {
                a.select();
              }
            );
          });
        }
      }
      (function (a) {
        const b = [];
        a.compose = function (c) {
          D.pushUnique(b, c) &&
            p(c, "beforeMargins", function () {
              this.legend = new a(this, this.options.legend);
            });
        };
      })(v || (v = {}));
      ("");
      return v;
    }
  );
  L(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function (a) {
    const { extend: u, merge: J, pick: K } = a;
    var G;
    (function (a) {
      a.lineMarker = function (a, B) {
        B = this.legendItem = this.legendItem || {};
        var t = this.options;
        const q = a.symbolWidth,
          m = a.symbolHeight,
          p = m / 2,
          n = this.chart.renderer,
          h = B.group;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        let g = {},
          e = t.marker,
          x = 0;
        this.chart.styledMode ||
          ((g = { "stroke-width": Math.min(t.lineWidth || 0, 24) }),
          t.dashStyle
            ? (g.dashstyle = t.dashStyle)
            : "square" !== t.linecap && (g["stroke-linecap"] = "round"));
        B.line = n.path().addClass("highcharts-graph").attr(g).add(h);
        g["stroke-linecap"] && (x = Math.min(B.line.strokeWidth(), q) / 2);
        q &&
          B.line.attr({
            d: [
              ["M", x, a],
              ["L", q - x, a],
            ],
          });
        e &&
          !1 !== e.enabled &&
          q &&
          ((t = Math.min(K(e.radius, p), p)),
          0 === this.symbol.indexOf("url") &&
            ((e = J(e, { width: m, height: m })), (t = 0)),
          (B.symbol = B =
            n
              .symbol(
                this.symbol,
                q / 2 - t,
                a - t,
                2 * t,
                2 * t,
                u({ context: "legend" }, e)
              )
              .addClass("highcharts-point")
              .add(h)),
          (B.isMarker = !0));
      };
      a.rectangle = function (a, u) {
        u = u.legendItem || {};
        const t = a.symbolHeight,
          q = a.options.squareSymbol;
        u.symbol = this.chart.renderer
          .rect(
            q ? (a.symbolWidth - t) / 2 : 0,
            a.baseline - t + 1,
            q ? t : a.symbolWidth,
            t,
            K(a.options.symbolRadius, t / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(u.group);
      };
    })(G || (G = {}));
    return G;
  });
  L(a, "Core/Series/SeriesDefaults.js", [], function () {
    return {
      lineWidth: 1,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      enableMouseTracking: !0,
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: "#ffffff",
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 150 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: "center",
        borderWidth: 0,
        defer: !0,
        formatter: function () {
          const { numberFormatter: a } = this.series.chart;
          return "number" !== typeof this.y ? "" : a(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: "0.7em",
          fontWeight: "bold",
          color: "contrast",
          textOutline: "1px contrast",
        },
        verticalAlign: "bottom",
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 150 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 150 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: "x",
    };
  });
  L(
    a,
    "Core/Series/SeriesRegistry.js",
    [
      a["Core/Globals.js"],
      a["Core/Defaults.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      const { defaultOptions: u } = A,
        { extendClass: D, merge: E } = K;
      var B;
      (function (t) {
        function q(a, p) {
          const n = u.plotOptions || {},
            h = p.defaultOptions,
            g = p.prototype;
          g.type = a;
          g.pointClass || (g.pointClass = J);
          h && (n[a] = h);
          t.seriesTypes[a] = p;
        }
        t.seriesTypes = a.seriesTypes;
        t.registerSeriesType = q;
        t.seriesType = function (a, p, n, h, g) {
          const e = u.plotOptions || {};
          p = p || "";
          e[a] = E(e[p], n);
          q(a, D(t.seriesTypes[p] || function () {}, h));
          t.seriesTypes[a].prototype.type = a;
          g && (t.seriesTypes[a].prototype.pointClass = D(J, g));
          return t.seriesTypes[a];
        };
      })(B || (B = {}));
      return B;
    }
  );
  L(
    a,
    "Core/Series/Series.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/SeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E, B, t, q) {
      const { animObject: m, setAnimation: p } = a,
        { defaultOptions: n } = A,
        { registerEventOptions: h } = J,
        { hasTouch: g, svg: e, win: x } = K,
        { seriesTypes: u } = B,
        {
          arrayMax: M,
          arrayMin: C,
          clamp: f,
          correctFloat: y,
          defined: r,
          diffObjects: l,
          erase: v,
          error: d,
          extend: b,
          find: c,
          fireEvent: k,
          getClosestDistance: w,
          getNestedProperty: z,
          insertItem: F,
          isArray: O,
          isNumber: P,
          isString: T,
          merge: U,
          objectEach: W,
          pick: H,
          removeEvent: Y,
          splat: ea,
          syncTimeout: aa,
        } = q;
      class Z {
        constructor() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        init(c, a) {
          k(this, "init", { options: a });
          const d = this,
            f = c.series;
          this.eventsToUnbind = [];
          d.chart = c;
          d.options = d.setOptions(a);
          a = d.options;
          d.linkedSeries = [];
          d.bindAxes();
          b(d, {
            name: a.name,
            state: "",
            visible: !1 !== a.visible,
            selected: !0 === a.selected,
          });
          h(this, a);
          const e = a.events;
          if (
            (e && e.click) ||
            (a.point && a.point.events && a.point.events.click) ||
            a.allowPointSelect
          )
            c.runTrackerClick = !0;
          d.getColor();
          d.getSymbol();
          d.parallelArrays.forEach(function (b) {
            d[b + "Data"] || (d[b + "Data"] = []);
          });
          d.isCartesian && (c.hasCartesianSeries = !0);
          let l;
          f.length && (l = f[f.length - 1]);
          d._i = H(l && l._i, -1) + 1;
          d.opacity = d.options.opacity;
          c.orderItems("series", F(this, f));
          a.dataSorting && a.dataSorting.enabled
            ? d.setDataSortingOptions()
            : d.points || d.data || d.setData(a.data, !1);
          k(this, "afterInit");
        }
        is(b) {
          return u[b] && this instanceof u[b];
        }
        bindAxes() {
          const b = this,
            c = b.options,
            a = b.chart;
          let f;
          k(this, "bindAxes", null, function () {
            (b.axisTypes || []).forEach(function (k) {
              a[k].forEach(function (a) {
                f = a.options;
                if (
                  H(c[k], 0) === a.index ||
                  ("undefined" !== typeof c[k] && c[k] === f.id)
                )
                  F(b, a.series), (b[k] = a), (a.isDirty = !0);
              });
              b[k] || b.optionalAxis === k || d(18, !0, a);
            });
          });
          k(this, "afterBindAxes");
        }
        updateParallelArrays(b, c, a) {
          const d = b.series,
            k = P(c)
              ? function (a) {
                  const k = "y" === a && d.toYData ? d.toYData(b) : b[a];
                  d[a + "Data"][c] = k;
                }
              : function (b) {
                  Array.prototype[c].apply(d[b + "Data"], a);
                };
          d.parallelArrays.forEach(k);
        }
        hasData() {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        }
        autoIncrement(b) {
          var c = this.options;
          const a = c.pointIntervalUnit,
            d = c.relativeXValue,
            k = this.chart.time;
          let f = this.xIncrement,
            e;
          f = H(f, c.pointStart, 0);
          this.pointInterval = e = H(this.pointInterval, c.pointInterval, 1);
          d && P(b) && (e *= b);
          a &&
            ((c = new k.Date(f)),
            "day" === a
              ? k.set("Date", c, k.get("Date", c) + e)
              : "month" === a
              ? k.set("Month", c, k.get("Month", c) + e)
              : "year" === a && k.set("FullYear", c, k.get("FullYear", c) + e),
            (e = c.getTime() - f));
          if (d && P(b)) return f + e;
          this.xIncrement = f + e;
          return f;
        }
        setDataSortingOptions() {
          const c = this.options;
          b(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          r(c.pointRange) || (c.pointRange = 1);
        }
        setOptions(b) {
          var c, a;
          const d = this.chart;
          var f = d.options.plotOptions,
            e = d.userOptions || {};
          const l = U(b);
          b = d.styledMode;
          const g = { plotOptions: f, userOptions: l };
          k(this, "setOptions", g);
          const h = g.plotOptions[this.type];
          e = e.plotOptions || {};
          const m = e.series || {},
            w = n.plotOptions[this.type] || {},
            v = e[this.type] || {};
          this.userOptions = g.userOptions;
          f = U(h, f.series, v, l);
          this.tooltipOptions = U(
            n.tooltip,
            null === (c = n.plotOptions.series) || void 0 === c
              ? void 0
              : c.tooltip,
            null === w || void 0 === w ? void 0 : w.tooltip,
            d.userOptions.tooltip,
            null === (a = e.series) || void 0 === a ? void 0 : a.tooltip,
            v.tooltip,
            l.tooltip
          );
          this.stickyTracking = H(
            l.stickyTracking,
            v.stickyTracking,
            m.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : f.stickyTracking
          );
          null === h.marker && delete f.marker;
          this.zoneAxis = f.zoneAxis;
          a = this.zones = (f.zones || []).slice();
          (!f.negativeColor && !f.negativeFillColor) ||
            f.zones ||
            ((c = {
              value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
              className: "highcharts-negative",
            }),
            b ||
              ((c.color = f.negativeColor),
              (c.fillColor = f.negativeFillColor)),
            a.push(c));
          a.length &&
            r(a[a.length - 1].value) &&
            a.push(b ? {} : { color: this.color, fillColor: this.fillColor });
          k(this, "afterSetOptions", { options: f });
          return f;
        }
        getName() {
          return H(this.options.name, "Series " + (this.index + 1));
        }
        getCyclic(b, c, a) {
          const d = this.chart,
            k = `${b}Index`,
            f = `${b}Counter`,
            e =
              (null === a || void 0 === a ? void 0 : a.length) ||
              d.options.chart.colorCount;
          if (!c) {
            var l = H(
              "color" === b ? this.options.colorIndex : void 0,
              this[k]
            );
            r(l) ||
              (d.series.length || (d[f] = 0), (l = d[f] % e), (d[f] += 1));
            a && (c = a[l]);
          }
          "undefined" !== typeof l && (this[k] = l);
          this[b] = c;
        }
        getColor() {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = "#cccccc")
            : this.getCyclic(
                "color",
                this.options.color || n.plotOptions[this.type].color,
                this.chart.options.colors
              );
        }
        getPointsCollection() {
          return (this.hasGroupedData ? this.points : this.data) || [];
        }
        getSymbol() {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        }
        findPointIndex(b, a) {
          const d = b.id,
            k = b.x,
            f = this.points;
          var e = this.options.dataSorting,
            l;
          let g, h;
          if (d) (e = this.chart.get(d)), e instanceof D && (l = e);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((l = (c) => !c.touched && c.index === b.index),
              e && e.matchByName
                ? (l = (c) => !c.touched && c.name === b.name)
                : this.options.relativeXValue &&
                  (l = (c) => !c.touched && c.options.x === b.x),
              (l = c(f, l)),
              !l)
            )
              return;
          l && ((h = l && l.index), "undefined" !== typeof h && (g = !0));
          "undefined" === typeof h && P(k) && (h = this.xData.indexOf(k, a));
          -1 !== h &&
            "undefined" !== typeof h &&
            this.cropped &&
            (h = h >= this.cropStart ? h - this.cropStart : h);
          !g && P(h) && f[h] && f[h].touched && (h = void 0);
          return h;
        }
        updateData(b, c) {
          const a = this.options,
            d = a.dataSorting,
            k = this.points,
            f = [],
            e = this.requireSorting,
            l = b.length === k.length;
          let g,
            h,
            n,
            m = !0;
          this.xIncrement = null;
          b.forEach(function (b, c) {
            var h =
              (r(b) &&
                this.pointClass.prototype.optionsToObject.call(
                  { series: this },
                  b
                )) ||
              {};
            const m = h.x;
            if (h.id || P(m)) {
              if (
                ((h = this.findPointIndex(h, n)),
                -1 === h || "undefined" === typeof h
                  ? f.push(b)
                  : k[h] && b !== a.data[h]
                  ? (k[h].update(b, !1, null, !1),
                    (k[h].touched = !0),
                    e && (n = h + 1))
                  : k[h] && (k[h].touched = !0),
                !l || c !== h || (d && d.enabled) || this.hasDerivedData)
              )
                g = !0;
            } else f.push(b);
          }, this);
          if (g)
            for (b = k.length; b--; )
              (h = k[b]) && !h.touched && h.remove && h.remove(!1, c);
          else
            !l || (d && d.enabled)
              ? (m = !1)
              : (b.forEach(function (b, c) {
                  b === k[c].y ||
                    k[c].destroyed ||
                    k[c].update(b, !1, null, !1);
                }),
                (f.length = 0));
          k.forEach(function (b) {
            b && (b.touched = !1);
          });
          if (!m) return !1;
          f.forEach(function (b) {
            this.addPoint(b, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = M(this.xData)), this.autoIncrement());
          return !0;
        }
        setData(b, c = !0, a, k) {
          var f;
          const e = this,
            l = e.points,
            g = (l && l.length) || 0,
            h = e.options,
            n = e.chart,
            r = h.dataSorting,
            m = e.xAxis,
            w = h.turboThreshold,
            v = this.xData,
            z = this.yData;
          var p = e.pointArrayMap;
          p = p && p.length;
          const q = h.keys;
          let F,
            y = 0,
            x = 1,
            N = null;
          if (!n.options.chart.allowMutatingData) {
            h.data && delete e.options.data;
            e.userOptions.data && delete e.userOptions.data;
            var t = U(!0, b);
          }
          b = t || b || [];
          t = b.length;
          r && r.enabled && (b = this.sortData(b));
          n.options.chart.allowMutatingData &&
            !1 !== k &&
            t &&
            g &&
            !e.cropped &&
            !e.hasGroupedData &&
            e.visible &&
            !e.boosted &&
            (F = this.updateData(b, a));
          if (!F) {
            e.xIncrement = null;
            e.colorCounter = 0;
            this.parallelArrays.forEach(function (b) {
              e[b + "Data"].length = 0;
            });
            if (w && t > w)
              if (((N = e.getFirstValidPoint(b)), P(N)))
                for (a = 0; a < t; a++)
                  (v[a] = this.autoIncrement()), (z[a] = b[a]);
              else if (O(N))
                if (p)
                  if (N.length === p)
                    for (a = 0; a < t; a++)
                      (v[a] = this.autoIncrement()), (z[a] = b[a]);
                  else
                    for (a = 0; a < t; a++)
                      (k = b[a]), (v[a] = k[0]), (z[a] = k.slice(1, p + 1));
                else if (
                  (q &&
                    ((y = q.indexOf("x")),
                    (x = q.indexOf("y")),
                    (y = 0 <= y ? y : 0),
                    (x = 0 <= x ? x : 1)),
                  1 === N.length && (x = 0),
                  y === x)
                )
                  for (a = 0; a < t; a++)
                    (v[a] = this.autoIncrement()), (z[a] = b[a][x]);
                else
                  for (a = 0; a < t; a++)
                    (k = b[a]), (v[a] = k[y]), (z[a] = k[x]);
              else d(12, !1, n);
            else
              for (a = 0; a < t; a++)
                (k = { series: e }),
                  e.pointClass.prototype.applyOptions.apply(k, [b[a]]),
                  e.updateParallelArrays(k, a);
            z && T(z[0]) && d(14, !0, n);
            e.data = [];
            e.options.data = e.userOptions.data = b;
            for (a = g; a--; )
              null === (f = l[a]) || void 0 === f ? void 0 : f.destroy();
            m && (m.minRange = m.userMinRange);
            e.isDirty = n.isDirtyBox = !0;
            e.isDirtyData = !!l;
            a = !1;
          }
          "point" === h.legendType &&
            (this.processData(), this.generatePoints());
          c && n.redraw(a);
        }
        sortData(b) {
          const c = this,
            a = c.options.dataSorting.sortKey || "y",
            d = function (b, c) {
              return (
                (r(c) &&
                  b.pointClass.prototype.optionsToObject.call(
                    { series: b },
                    c
                  )) ||
                {}
              );
            };
          b.forEach(function (a, k) {
            b[k] = d(c, a);
            b[k].index = k;
          }, this);
          b.concat()
            .sort((b, c) => {
              b = z(a, b);
              c = z(a, c);
              return c < b ? -1 : c > b ? 1 : 0;
            })
            .forEach(function (b, c) {
              b.x = c;
            }, this);
          c.linkedSeries &&
            c.linkedSeries.forEach(function (c) {
              const a = c.options,
                k = a.data;
              (a.dataSorting && a.dataSorting.enabled) ||
                !k ||
                (k.forEach(function (a, f) {
                  k[f] = d(c, a);
                  b[f] && ((k[f].x = b[f].x), (k[f].index = f));
                }),
                c.setData(k, !1));
            });
          return b;
        }
        getProcessedData(b) {
          const c = this;
          var a = c.xAxis,
            k = c.options;
          const f = k.cropThreshold,
            e = b || c.getExtremesFromAll || k.getExtremesFromAll,
            l = null === a || void 0 === a ? void 0 : a.logarithmic,
            g = c.isCartesian;
          let h = 0;
          let n;
          b = c.xData;
          k = c.yData;
          let r = !1;
          const m = b.length;
          if (a) {
            var v = a.getExtremes();
            n = v.min;
            v = v.max;
            r = !(!a.categories || a.names.length);
          }
          if (g && c.sorted && !e && (!f || m > f || c.forceCrop))
            if (b[m - 1] < n || b[0] > v) (b = []), (k = []);
            else if (c.yData && (b[0] < n || b[m - 1] > v)) {
              var z = this.cropData(c.xData, c.yData, n, v);
              b = z.xData;
              k = z.yData;
              h = z.start;
              z = !0;
            }
          a = w(
            [l ? b.map(l.log2lin) : b],
            () => c.requireSorting && !r && d(15, !1, c.chart)
          );
          return {
            xData: b,
            yData: k,
            cropped: z,
            cropStart: h,
            closestPointRange: a,
          };
        }
        processData(b) {
          const c = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !c.isDirty &&
            !this.yAxis.isDirty &&
            !b
          )
            return !1;
          b = this.getProcessedData();
          this.cropped = b.cropped;
          this.cropStart = b.cropStart;
          this.processedXData = b.xData;
          this.processedYData = b.yData;
          this.closestPointRange = this.basePointRange = b.closestPointRange;
          k(this, "afterProcessData");
        }
        cropData(b, c, a, d, k) {
          const f = b.length;
          let e,
            l = 0,
            g = f;
          k = H(k, this.cropShoulder);
          for (e = 0; e < f; e++)
            if (b[e] >= a) {
              l = Math.max(0, e - k);
              break;
            }
          for (a = e; a < f; a++)
            if (b[a] > d) {
              g = a + k;
              break;
            }
          return {
            xData: b.slice(l, g),
            yData: c.slice(l, g),
            start: l,
            end: g,
          };
        }
        generatePoints() {
          var c = this.options;
          const a = this.processedData || c.data,
            d = this.processedXData,
            f = this.processedYData,
            e = this.pointClass,
            l = d.length,
            g = this.cropStart || 0,
            h = this.hasGroupedData,
            n = c.keys,
            r = [];
          c = c.dataGrouping && c.dataGrouping.groupAll ? g : 0;
          let m;
          let w,
            v,
            z = this.data;
          if (!z && !h) {
            var p = [];
            p.length = a.length;
            z = this.data = p;
          }
          n && h && (this.options.keys = !1);
          for (v = 0; v < l; v++)
            (p = g + v),
              h
                ? ((w = new e().init(this, [d[v]].concat(ea(f[v])))),
                  (w.dataGroup = this.groupMap[c + v]),
                  w.dataGroup.options &&
                    ((w.options = w.dataGroup.options),
                    b(w, w.dataGroup.options),
                    delete w.dataLabels))
                : (w = z[p]) ||
                  "undefined" === typeof a[p] ||
                  (z[p] = w = new e().init(this, a[p], d[v])),
              w && ((w.index = h ? c + v : p), (r[v] = w));
          this.options.keys = n;
          if (z && (l !== (m = z.length) || h))
            for (v = 0; v < m; v++)
              v !== g || h || (v += l),
                z[v] && (z[v].destroyElements(), (z[v].plotX = void 0));
          this.data = z;
          this.points = r;
          k(this, "afterGeneratePoints");
        }
        getXExtremes(b) {
          return { min: C(b), max: M(b) };
        }
        getExtremes(b, c) {
          const a = this.xAxis;
          var d = this.yAxis;
          const f = this.processedXData || this.xData,
            e = [],
            l = this.requireSorting ? this.cropShoulder : 0;
          d = d ? d.positiveValuesOnly : !1;
          let g,
            h = 0,
            n = 0,
            r = 0;
          b = b || this.stackedYData || this.processedYData || [];
          const w = b.length;
          if (a) {
            var m = a.getExtremes();
            h = m.min;
            n = m.max;
          }
          for (g = 0; g < w; g++) {
            var v = f[g];
            m = b[g];
            var z = (P(m) || O(m)) && (m.length || 0 < m || !d);
            v =
              c ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !a ||
              ((f[g + l] || v) >= h && (f[g - l] || v) <= n);
            if (z && v)
              if ((z = m.length)) for (; z--; ) P(m[z]) && (e[r++] = m[z]);
              else e[r++] = m;
          }
          b = { activeYData: e, dataMin: C(e), dataMax: M(e) };
          k(this, "afterGetExtremes", { dataExtremes: b });
          return b;
        }
        applyExtremes() {
          const b = this.getExtremes();
          this.dataMin = b.dataMin;
          this.dataMax = b.dataMax;
          return b;
        }
        getFirstValidPoint(b) {
          const c = b.length;
          let a = 0,
            d = null;
          for (; null === d && a < c; ) (d = b[a]), a++;
          return d;
        }
        translate() {
          var b;
          this.processedXData || this.processData();
          this.generatePoints();
          var c = this.options;
          const a = c.stacking,
            d = this.xAxis,
            e = d.categories,
            l = this.enabledDataSorting,
            g = this.yAxis,
            h = this.points,
            n = h.length,
            m = this.pointPlacementToXValue(),
            w = !!m,
            v = c.threshold;
          c = c.startFromThreshold ? v : 0;
          let z,
            p,
            q,
            F,
            x = Number.MAX_VALUE;
          for (z = 0; z < n; z++) {
            const k = h[z],
              n = k.x;
            let t,
              u,
              I = k.y,
              N = k.low;
            const C =
              a &&
              (null === (b = g.stacking) || void 0 === b
                ? void 0
                : b.stacks[
                    (this.negStacks && I < (c ? 0 : v) ? "-" : "") +
                      this.stackKey
                  ]);
            p = d.translate(n, !1, !1, !1, !0, m);
            k.plotX = P(p) ? y(f(p, -1e5, 1e5)) : void 0;
            a &&
              this.visible &&
              C &&
              C[n] &&
              ((F = this.getStackIndicator(F, n, this.index)),
              !k.isNull && F.key && ((t = C[n]), (u = t.points[F.key])),
              t &&
                O(u) &&
                ((N = u[0]),
                (I = u[1]),
                N === c && F.key === C[n].base && (N = H(P(v) ? v : g.min)),
                g.positiveValuesOnly && r(N) && 0 >= N && (N = void 0),
                (k.total = k.stackTotal = H(t.total)),
                (k.percentage =
                  r(k.y) && t.total ? (k.y / t.total) * 100 : void 0),
                (k.stackY = I),
                this.irregularWidths ||
                  t.setOffset(
                    this.pointXOffset || 0,
                    this.barW || 0,
                    void 0,
                    void 0,
                    void 0,
                    this.xAxis
                  )));
            k.yBottom = r(N)
              ? f(g.translate(N, !1, !0, !1, !0), -1e5, 1e5)
              : void 0;
            this.dataModify && (I = this.dataModify.modifyValue(I, z));
            let ca;
            P(I) &&
              void 0 !== k.plotX &&
              ((ca = g.translate(I, !1, !0, !1, !0)),
              (ca = P(ca) ? f(ca, -1e5, 1e5) : void 0));
            k.plotY = ca;
            k.isInside = this.isPointInside(k);
            k.clientX = w ? y(d.translate(n, !1, !1, !1, !0, m)) : p;
            k.negative = (k.y || 0) < (v || 0);
            k.category = H(e && e[k.x], k.x);
            k.isNull ||
              !1 === k.visible ||
              ("undefined" !== typeof q && (x = Math.min(x, Math.abs(p - q))),
              (q = p));
            k.zone = this.zones.length ? k.getZone() : void 0;
            !k.graphic && this.group && l && (k.isNew = !0);
          }
          this.closestPointRangePx = x;
          k(this, "afterTranslate");
        }
        getValidPoints(b, c, a) {
          const d = this.chart;
          return (b || this.points || []).filter(function (b) {
            const { plotX: k, plotY: f } = b;
            return (!a && (b.isNull || !P(f))) ||
              (c && !d.isInsidePlot(k, f, { inverted: d.inverted }))
              ? !1
              : !1 !== b.visible;
          });
        }
        getClipBox() {
          const { chart: b, xAxis: c, yAxis: a } = this,
            d = U(b.clipBox);
          c && c.len !== b.plotSizeX && (d.width = c.len);
          a && a.len !== b.plotSizeY && (d.height = a.len);
          return d;
        }
        getSharedClipKey() {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
        }
        setClip() {
          const { chart: b, group: c, markerGroup: a } = this,
            d = b.sharedClips,
            k = b.renderer,
            f = this.getClipBox(),
            e = this.getSharedClipKey();
          let l = d[e];
          l ? l.animate(f) : (d[e] = l = k.clipRect(f));
          c && c.clip(!1 === this.options.clip ? void 0 : l);
          a && a.clip();
        }
        animate(b) {
          const { chart: c, group: a, markerGroup: d } = this,
            k = c.inverted;
          var f = m(this.options.animation),
            e = [this.getSharedClipKey(), f.duration, f.easing, f.defer].join();
          let l = c.sharedClips[e],
            g = c.sharedClips[e + "m"];
          if (b && a)
            (f = this.getClipBox()),
              l
                ? l.attr("height", f.height)
                : ((f.width = 0),
                  k && (f.x = c.plotHeight),
                  (l = c.renderer.clipRect(f)),
                  (c.sharedClips[e] = l),
                  (g = c.renderer.clipRect({
                    x: -99,
                    y: -99,
                    width: k ? c.plotWidth + 199 : 99,
                    height: k ? 99 : c.plotHeight + 199,
                  })),
                  (c.sharedClips[e + "m"] = g)),
              a.clip(l),
              d && d.clip(g);
          else if (l && !l.hasClass("highcharts-animating")) {
            e = this.getClipBox();
            const b = f.step;
            d &&
              d.element.childNodes.length &&
              (f.step = function (c, a) {
                b && b.apply(a, arguments);
                "width" === a.prop &&
                  g &&
                  g.element &&
                  g.attr(k ? "height" : "width", c + 99);
              });
            l.addClass("highcharts-animating").animate(e, f);
          }
        }
        afterAnimate() {
          this.setClip();
          W(this.chart.sharedClips, (b, c, a) => {
            b &&
              !this.chart.container.querySelector(
                `[clip-path="url(#${b.id})"]`
              ) &&
              (b.destroy(), delete a[c]);
          });
          this.finishedAnimating = !0;
          k(this, "afterAnimate");
        }
        drawPoints(b = this.points) {
          const c = this.chart,
            a = c.styledMode,
            { colorAxis: d, options: k } = this,
            f = k.marker,
            e = this[this.specialGroup || "markerGroup"],
            l = this.xAxis,
            g = H(
              f.enabled,
              !l || l.isRadial ? !0 : null,
              this.closestPointRangePx >= f.enabledThreshold * f.radius
            );
          let h, n, m, r;
          let w, v;
          if (!1 !== f.enabled || this._hasPointMarkers)
            for (h = 0; h < b.length; h++) {
              n = b[h];
              r = (m = n.graphic) ? "animate" : "attr";
              var z = n.marker || {};
              w = !!n.marker;
              if (
                ((g && "undefined" === typeof z.enabled) || z.enabled) &&
                !n.isNull &&
                !1 !== n.visible
              ) {
                const b = H(z.symbol, this.symbol, "rect");
                v = this.markerAttribs(n, n.selected && "select");
                this.enabledDataSorting &&
                  (n.startXPos = l.reversed ? -(v.width || 0) : l.width);
                const k = !1 !== n.isInside;
                !m &&
                  k &&
                  (0 < (v.width || 0) || n.hasImage) &&
                  ((n.graphic = m =
                    c.renderer
                      .symbol(b, v.x, v.y, v.width, v.height, w ? z : f)
                      .add(e)),
                  this.enabledDataSorting &&
                    c.hasRendered &&
                    (m.attr({ x: n.startXPos }), (r = "animate")));
                m && "animate" === r && m[k ? "show" : "hide"](k).animate(v);
                if (m)
                  if (
                    ((z = this.pointAttribs(
                      n,
                      a || !n.selected ? void 0 : "select"
                    )),
                    a)
                  )
                    d && m.css({ fill: z.fill });
                  else m[r](z);
                m && m.addClass(n.getClassName(), !0);
              } else m && (n.graphic = m.destroy());
            }
        }
        markerAttribs(b, c) {
          const a = this.options;
          var d = a.marker;
          const k = b.marker || {},
            f = k.symbol || d.symbol,
            e = {};
          let l = H(k.radius, d && d.radius);
          c &&
            ((d = d.states[c]),
            (c = k.states && k.states[c]),
            (l = H(
              c && c.radius,
              d && d.radius,
              l && l + ((d && d.radiusPlus) || 0)
            )));
          b.hasImage = f && 0 === f.indexOf("url");
          b.hasImage && (l = 0);
          b = b.pos();
          P(l) &&
            b &&
            ((e.x = b[0] - l),
            (e.y = b[1] - l),
            a.crisp && (e.x = Math.floor(e.x)));
          l && (e.width = e.height = 2 * l);
          return e;
        }
        pointAttribs(b, c) {
          var a = this.options.marker,
            d = b && b.options;
          const k = (d && d.marker) || {};
          var f = d && d.color,
            e = b && b.color;
          const l = b && b.zone && b.zone.color;
          let g = this.color;
          b = H(k.lineWidth, a.lineWidth);
          d = 1;
          g = f || l || e || g;
          f = k.fillColor || a.fillColor || g;
          e = k.lineColor || a.lineColor || g;
          c = c || "normal";
          a = a.states[c] || {};
          c = (k.states && k.states[c]) || {};
          b = H(
            c.lineWidth,
            a.lineWidth,
            b + H(c.lineWidthPlus, a.lineWidthPlus, 0)
          );
          f = c.fillColor || a.fillColor || f;
          e = c.lineColor || a.lineColor || e;
          d = H(c.opacity, a.opacity, d);
          return { stroke: e, "stroke-width": b, fill: f, opacity: d };
        }
        destroy(b) {
          const c = this,
            a = c.chart,
            d = /AppleWebKit\/533/.test(x.navigator.userAgent),
            f = c.data || [];
          let e, l, g, h;
          k(c, "destroy", { keepEventsForUpdate: b });
          this.removeEvents(b);
          (c.axisTypes || []).forEach(function (b) {
            (h = c[b]) &&
              h.series &&
              (v(h.series, c), (h.isDirty = h.forceRedraw = !0));
          });
          c.legendItem && c.chart.legend.destroyItem(c);
          for (l = f.length; l--; ) (g = f[l]) && g.destroy && g.destroy();
          c.clips && c.clips.forEach((b) => b.destroy());
          q.clearTimeout(c.animationTimeout);
          W(c, function (b, c) {
            b instanceof t &&
              !b.survive &&
              ((e = d && "group" === c ? "hide" : "destroy"), b[e]());
          });
          a.hoverSeries === c && (a.hoverSeries = void 0);
          v(a.series, c);
          a.orderItems("series");
          W(c, function (a, d) {
            (b && "hcEvents" === d) || delete c[d];
          });
        }
        applyZones() {
          const b = this,
            c = this.chart,
            a = c.renderer,
            d = this.zones,
            k = this.clips || [],
            e = this.graph,
            l = this.area,
            g = Math.max(c.plotWidth, c.plotHeight),
            h = this[(this.zoneAxis || "y") + "Axis"],
            n = c.inverted;
          let m,
            r,
            w,
            v,
            z,
            p,
            q,
            F,
            y,
            x,
            t,
            u = !1;
          d.length && (e || l) && h && "undefined" !== typeof h.min
            ? ((z = h.reversed),
              (p = h.horiz),
              e && !this.showLine && e.hide(),
              l && l.hide(),
              (v = h.getExtremes()),
              d.forEach(function (d, I) {
                m = z ? (p ? c.plotWidth : 0) : p ? 0 : h.toPixels(v.min) || 0;
                m = f(H(r, m), 0, g);
                r = f(Math.round(h.toPixels(H(d.value, v.max), !0) || 0), 0, g);
                u && (m = r = h.toPixels(v.max));
                q = Math.abs(m - r);
                F = Math.min(m, r);
                y = Math.max(m, r);
                h.isXAxis
                  ? ((w = { x: n ? y : F, y: 0, width: q, height: g }),
                    p || (w.x = c.plotHeight - w.x))
                  : ((w = { x: 0, y: n ? y : F, width: g, height: q }),
                    p && (w.y = c.plotWidth - w.y));
                k[I] ? k[I].animate(w) : (k[I] = a.clipRect(w));
                x = b["zone-area-" + I];
                t = b["zone-graph-" + I];
                e && t && t.clip(k[I]);
                l && x && x.clip(k[I]);
                u = d.value > v.max;
                b.resetZones && 0 === r && (r = void 0);
              }),
              (this.clips = k))
            : b.visible && (e && e.show(), l && l.show());
        }
        plotGroup(b, c, a, d, k) {
          let f = this[b];
          const e = !f;
          a = { visibility: a, zIndex: d || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (a.opacity = this.opacity);
          e && (this[b] = f = this.chart.renderer.g().add(k));
          f.addClass(
            "highcharts-" +
              c +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (r(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          f.attr(a)[e ? "attr" : "animate"](this.getPlotBox(c));
          return f;
        }
        getPlotBox(b) {
          let c = this.xAxis,
            a = this.yAxis;
          const d = this.chart;
          b =
            d.inverted &&
            !d.polar &&
            c &&
            !1 !== this.invertible &&
            "series" === b;
          d.inverted && ((c = a), (a = this.xAxis));
          return {
            translateX: c ? c.left : d.plotLeft,
            translateY: a ? a.top : d.plotTop,
            rotation: b ? 90 : 0,
            rotationOriginX: b ? (c.len - a.len) / 2 : 0,
            rotationOriginY: b ? (c.len + a.len) / 2 : 0,
            scaleX: b ? -1 : 1,
            scaleY: 1,
          };
        }
        removeEvents(b) {
          b || Y(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (b) {
              b();
            }),
            (this.eventsToUnbind.length = 0));
        }
        render() {
          const b = this;
          var c = b.chart;
          const a = b.options,
            d = m(a.animation),
            f = b.visible ? "inherit" : "hidden",
            e = a.zIndex,
            l = b.hasRendered;
          c = c.seriesGroup;
          let g = b.finishedAnimating ? 0 : d.duration;
          k(this, "render");
          b.plotGroup("group", "series", f, e, c);
          b.markerGroup = b.plotGroup("markerGroup", "markers", f, e, c);
          !1 !== a.clip && b.setClip();
          b.animate && g && b.animate(!0);
          b.drawGraph && (b.drawGraph(), b.applyZones());
          b.visible && b.drawPoints();
          b.drawDataLabels && b.drawDataLabels();
          b.redrawPoints && b.redrawPoints();
          b.drawTracker && a.enableMouseTracking && b.drawTracker();
          b.animate && g && b.animate();
          l ||
            (g && d.defer && (g += d.defer),
            (b.animationTimeout = aa(function () {
              b.afterAnimate();
            }, g || 0)));
          b.isDirty = !1;
          b.hasRendered = !0;
          k(b, "afterRender");
        }
        redraw() {
          const b = this.isDirty || this.isDirtyData;
          this.translate();
          this.render();
          b && delete this.kdTree;
        }
        searchPoint(b, c) {
          const a = this.xAxis,
            d = this.yAxis,
            k = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: k ? a.len - b.chartY + a.pos : b.chartX - a.pos,
              plotY: k ? d.len - b.chartX + d.pos : b.chartY - d.pos,
            },
            c,
            b
          );
        }
        buildKDTree(b) {
          function c(b, d, k) {
            var f = b && b.length;
            let e;
            if (f)
              return (
                (e = a.kdAxisArray[d % k]),
                b.sort(function (b, c) {
                  return b[e] - c[e];
                }),
                (f = Math.floor(f / 2)),
                {
                  point: b[f],
                  left: c(b.slice(0, f), d + 1, k),
                  right: c(b.slice(f + 1), d + 1, k),
                }
              );
          }
          this.buildingKdTree = !0;
          const a = this,
            d = -1 < a.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete a.kdTree;
          aa(
            function () {
              a.kdTree = c(a.getValidPoints(null, !a.directTouch), d, d);
              a.buildingKdTree = !1;
            },
            a.options.kdNow || (b && "touchstart" === b.type) ? 0 : 1
          );
        }
        searchKDTree(b, c, a) {
          function d(b, c, a, g) {
            const h = c.point;
            var n = k.kdAxisArray[a % g];
            let m = h;
            var w = r(b[f]) && r(h[f]) ? Math.pow(b[f] - h[f], 2) : null;
            var v = r(b[e]) && r(h[e]) ? Math.pow(b[e] - h[e], 2) : null;
            v = (w || 0) + (v || 0);
            h.dist = r(v) ? Math.sqrt(v) : Number.MAX_VALUE;
            h.distX = r(w) ? Math.sqrt(w) : Number.MAX_VALUE;
            n = b[n] - h[n];
            v = 0 > n ? "left" : "right";
            w = 0 > n ? "right" : "left";
            c[v] && ((v = d(b, c[v], a + 1, g)), (m = v[l] < m[l] ? v : h));
            c[w] &&
              Math.sqrt(n * n) < m[l] &&
              ((b = d(b, c[w], a + 1, g)), (m = b[l] < m[l] ? b : m));
            return m;
          }
          const k = this,
            f = this.kdAxisArray[0],
            e = this.kdAxisArray[1],
            l = c ? "distX" : "dist";
          c = -1 < k.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(a);
          if (this.kdTree) return d(b, this.kdTree, c, c);
        }
        pointPlacementToXValue() {
          const {
            options: { pointPlacement: b, pointRange: c },
            xAxis: a,
          } = this;
          let d = b;
          "between" === d && (d = a.reversed ? -0.5 : 0.5);
          return P(d) ? d * (c || a.pointRange) : 0;
        }
        isPointInside(b) {
          const { chart: c, xAxis: a, yAxis: d } = this;
          return (
            "undefined" !== typeof b.plotY &&
            "undefined" !== typeof b.plotX &&
            0 <= b.plotY &&
            b.plotY <= (d ? d.len : c.plotHeight) &&
            0 <= b.plotX &&
            b.plotX <= (a ? a.len : c.plotWidth)
          );
        }
        drawTracker() {
          const b = this,
            c = b.options,
            a = c.trackByArea,
            d = [].concat(a ? b.areaPath : b.graphPath),
            f = b.chart,
            l = f.pointer,
            h = f.renderer,
            n = f.options.tooltip.snap,
            m = b.tracker,
            r = function (a) {
              if (c.enableMouseTracking && f.hoverSeries !== b) b.onMouseOver();
            },
            w = "rgba(192,192,192," + (e ? 0.0001 : 0.002) + ")";
          m
            ? m.attr({ d })
            : b.graph &&
              ((b.tracker = h
                .path(d)
                .attr({
                  visibility: b.visible ? "inherit" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  a ? "highcharts-tracker-area" : "highcharts-tracker-line"
                )
                .add(b.group)),
              f.styledMode ||
                b.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: w,
                  fill: a ? w : "none",
                  "stroke-width": b.graph.strokeWidth() + (a ? 0 : 2 * n),
                }),
              [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (
                b
              ) {
                if (
                  b &&
                  (b
                    .addClass("highcharts-tracker")
                    .on("mouseover", r)
                    .on("mouseout", function (b) {
                      l.onTrackerMouseOut(b);
                    }),
                  c.cursor && !f.styledMode && b.css({ cursor: c.cursor }),
                  g)
                )
                  b.on("touchstart", r);
              }));
          k(this, "afterDrawTracker");
        }
        addPoint(b, c, a, d, f) {
          const e = this.options,
            l = this.data,
            g = this.chart;
          var h = this.xAxis;
          h = h && h.hasNames && h.names;
          const n = e.data,
            m = this.xData;
          let r, w;
          c = H(c, !0);
          const v = { series: this };
          this.pointClass.prototype.applyOptions.apply(v, [b]);
          const z = v.x;
          w = m.length;
          if (this.requireSorting && z < m[w - 1])
            for (r = !0; w && m[w - 1] > z; ) w--;
          this.updateParallelArrays(v, "splice", [w, 0, 0]);
          this.updateParallelArrays(v, w);
          h && v.name && (h[z] = v.name);
          n.splice(w, 0, b);
          if (r || this.processedData)
            this.data.splice(w, 0, null), this.processData();
          "point" === e.legendType && this.generatePoints();
          a &&
            (l[0] && l[0].remove
              ? l[0].remove(!1)
              : (l.shift(), this.updateParallelArrays(v, "shift"), n.shift()));
          !1 !== f && k(this, "addPoint", { point: v });
          this.isDirtyData = this.isDirty = !0;
          c && g.redraw(d);
        }
        removePoint(b, c, a) {
          const d = this,
            k = d.data,
            f = k[b],
            e = d.points,
            l = d.chart,
            g = function () {
              e && e.length === k.length && e.splice(b, 1);
              k.splice(b, 1);
              d.options.data.splice(b, 1);
              d.updateParallelArrays(f || { series: d }, "splice", [b, 1]);
              f && f.destroy();
              d.isDirty = !0;
              d.isDirtyData = !0;
              c && l.redraw();
            };
          p(a, l);
          c = H(c, !0);
          f ? f.firePointEvent("remove", null, g) : g();
        }
        remove(b, c, a, d) {
          function f() {
            e.destroy(d);
            l.isDirtyLegend = l.isDirtyBox = !0;
            l.linkSeries(d);
            H(b, !0) && l.redraw(c);
          }
          const e = this,
            l = e.chart;
          !1 !== a ? k(e, "remove", null, f) : f();
        }
        update(c, a) {
          c = l(c, this.userOptions);
          k(this, "update", { options: c });
          const f = this,
            e = f.chart;
          var g = f.userOptions;
          const h = f.initialType || f.type;
          var n = e.options.plotOptions;
          const m = u[h].prototype;
          var w = f.finishedAnimating && { animation: !1 };
          const r = {};
          let v,
            z = [
              "colorIndex",
              "eventOptions",
              "navigatorSeries",
              "symbolIndex",
              "baseSeries",
            ],
            p = c.type || g.type || e.options.chart.type;
          const q = !(
            this.hasDerivedData ||
            (p && p !== this.type) ||
            "undefined" !== typeof c.pointStart ||
            "undefined" !== typeof c.pointInterval ||
            "undefined" !== typeof c.relativeXValue ||
            c.joinBy ||
            c.mapData ||
            f.hasOptionChanged("dataGrouping") ||
            f.hasOptionChanged("pointStart") ||
            f.hasOptionChanged("pointInterval") ||
            f.hasOptionChanged("pointIntervalUnit") ||
            f.hasOptionChanged("keys")
          );
          p = p || h;
          q &&
            (z.push(
              "data",
              "isDirtyData",
              "points",
              "processedData",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "level",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== c.visible && z.push("area", "graph"),
            f.parallelArrays.forEach(function (b) {
              z.push(b + "Data");
            }),
            c.data &&
              (c.dataSorting && b(f.options.dataSorting, c.dataSorting),
              this.setData(c.data, !1)));
          c = U(
            g,
            w,
            {
              index: "undefined" === typeof g.index ? f.index : g.index,
              pointStart: H(
                n && n.series && n.series.pointStart,
                g.pointStart,
                f.xData[0]
              ),
            },
            !q && { data: f.options.data },
            c
          );
          q && c.data && (c.data = f.options.data);
          z = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
          ].concat(z);
          z.forEach(function (b) {
            z[b] = f[b];
            delete f[b];
          });
          n = !1;
          if (u[p]) {
            if (((n = p !== f.type), f.remove(!1, !1, !1, !0), n))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(f, u[p].prototype);
              else {
                w = Object.hasOwnProperty.call(f, "hcEvents") && f.hcEvents;
                for (v in m) f[v] = void 0;
                b(f, u[p].prototype);
                w ? (f.hcEvents = w) : delete f.hcEvents;
              }
          } else d(17, !0, e, { missingModuleFor: p });
          z.forEach(function (b) {
            f[b] = z[b];
          });
          f.init(e, c);
          if (q && this.points) {
            c = f.options;
            if (!1 === c.visible) (r.graphic = 1), (r.dataLabel = 1);
            else if (!f._hasPointLabels) {
              const { marker: b, dataLabels: a } = c;
              g = g.marker || {};
              !b ||
                (!1 !== b.enabled &&
                  g.symbol === b.symbol &&
                  g.height === b.height &&
                  g.width === b.width) ||
                (r.graphic = 1);
              a && !1 === a.enabled && (r.dataLabel = 1);
            }
            for (const b of this.points)
              b &&
                b.series &&
                (b.resolveColor(),
                Object.keys(r).length && b.destroyElements(r),
                !1 === c.showInLegend &&
                  b.legendItem &&
                  e.legend.destroyItem(b));
          }
          f.initialType = h;
          e.linkSeries();
          n && f.linkedSeries.length && (f.isDirtyData = !0);
          k(this, "afterUpdate");
          H(a, !0) && e.redraw(q ? void 0 : !1);
        }
        setName(b) {
          this.name = this.options.name = this.userOptions.name = b;
          this.chart.isDirtyLegend = !0;
        }
        hasOptionChanged(b) {
          const c = this.options[b],
            a = this.chart.options.plotOptions,
            d = this.userOptions[b];
          return d
            ? c !== d
            : c !==
                H(
                  a && a[this.type] && a[this.type][b],
                  a && a.series && a.series[b],
                  c
                );
        }
        onMouseOver() {
          const b = this.chart,
            c = b.hoverSeries;
          b.pointer.setHoverChartIndex();
          if (c && c !== this) c.onMouseOut();
          this.options.events.mouseOver && k(this, "mouseOver");
          this.setState("hover");
          b.hoverSeries = this;
        }
        onMouseOut() {
          const b = this.options,
            c = this.chart,
            a = c.tooltip,
            d = c.hoverPoint;
          c.hoverSeries = null;
          if (d) d.onMouseOut();
          this && b.events.mouseOut && k(this, "mouseOut");
          !a ||
            this.stickyTracking ||
            (a.shared && !this.noSharedTooltip) ||
            a.hide();
          c.series.forEach(function (b) {
            b.setState("", !0);
          });
        }
        setState(b, c) {
          const a = this;
          var d = a.options;
          const k = a.graph,
            f = d.inactiveOtherPoints,
            e = d.states,
            l = H(
              e[b || "normal"] && e[b || "normal"].animation,
              a.chart.options.chart.animation
            );
          let g = d.lineWidth,
            h = 0,
            n = d.opacity;
          b = b || "";
          if (
            a.state !== b &&
            ([a.group, a.markerGroup, a.dataLabelsGroup].forEach(function (c) {
              c &&
                (a.state && c.removeClass("highcharts-series-" + a.state),
                b && c.addClass("highcharts-series-" + b));
            }),
            (a.state = b),
            !a.chart.styledMode)
          ) {
            if (e[b] && !1 === e[b].enabled) return;
            b &&
              ((g = e[b].lineWidth || g + (e[b].lineWidthPlus || 0)),
              (n = H(e[b].opacity, n)));
            if (k && !k.dashstyle && P(g))
              for (
                d = { "stroke-width": g }, k.animate(d, l);
                a["zone-graph-" + h];

              )
                a["zone-graph-" + h].animate(d, l), (h += 1);
            f ||
              [
                a.group,
                a.markerGroup,
                a.dataLabelsGroup,
                a.labelBySeries,
              ].forEach(function (b) {
                b && b.animate({ opacity: n }, l);
              });
          }
          c && f && a.points && a.setAllPointsToState(b || void 0);
        }
        setAllPointsToState(b) {
          this.points.forEach(function (c) {
            c.setState && c.setState(b);
          });
        }
        setVisible(b, c) {
          const a = this,
            d = a.chart,
            f = d.options.chart.ignoreHiddenSeries,
            e = a.visible,
            l = (a.visible =
              b =
              a.options.visible =
              a.userOptions.visible =
                "undefined" === typeof b ? !e : b)
              ? "show"
              : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (b) {
              if (a[b]) a[b][l]();
            }
          );
          if (
            d.hoverSeries === a ||
            (d.hoverPoint && d.hoverPoint.series) === a
          )
            a.onMouseOut();
          a.legendItem && d.legend.colorizeItem(a, b);
          a.isDirty = !0;
          a.options.stacking &&
            d.series.forEach(function (b) {
              b.options.stacking && b.visible && (b.isDirty = !0);
            });
          a.linkedSeries.forEach(function (c) {
            c.setVisible(b, !1);
          });
          f && (d.isDirtyBox = !0);
          k(a, l);
          !1 !== c && d.redraw();
        }
        show() {
          this.setVisible(!0);
        }
        hide() {
          this.setVisible(!1);
        }
        select(b) {
          this.selected =
            b =
            this.options.selected =
              "undefined" === typeof b ? !this.selected : b;
          this.checkbox && (this.checkbox.checked = b);
          k(this, b ? "select" : "unselect");
        }
        shouldShowTooltip(b, c, a = {}) {
          a.series = this;
          a.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(b, c, a);
        }
        drawLegendSymbol(b, c) {
          var a;
          null === (a = G[this.options.legendSymbol || "rectangle"]) ||
          void 0 === a
            ? void 0
            : a.call(this, b, c);
        }
      }
      Z.defaultOptions = E;
      Z.types = B.seriesTypes;
      Z.registerType = B.registerSeriesType;
      b(Z.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: D,
        requireSorting: !0,
        sorted: !0,
      });
      B.series = Z;
      ("");
      ("");
      return Z;
    }
  );
  L(
    a,
    "Core/Chart/Chart.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/Templating.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
      a["Core/Renderer/HTML/AST.js"],
    ],
    function (a, A, J, K, G, D, E, B, t, q, m, p, n) {
      const { animate: h, animObject: g, setAnimation: e } = a,
        { defaultOptions: x, defaultTime: u } = J,
        { numberFormat: M } = K,
        { registerEventOptions: C } = G,
        { charts: f, doc: y, marginNames: r, svg: l, win: v } = D,
        { seriesTypes: d } = t,
        {
          addEvent: b,
          attr: c,
          createElement: k,
          css: w,
          defined: z,
          diffObjects: F,
          discardElement: O,
          erase: P,
          error: T,
          extend: U,
          find: W,
          fireEvent: H,
          getStyle: Y,
          isArray: ea,
          isNumber: aa,
          isObject: Z,
          isString: N,
          merge: L,
          objectEach: Q,
          pick: R,
          pInt: V,
          relativeLength: ha,
          removeEvent: ia,
          splat: da,
          syncTimeout: ja,
          uniqueKey: ba,
        } = p;
      class S {
        static chart(b, c, a) {
          return new S(b, c, a);
        }
        constructor(b, c, a) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.zooming =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(b, c, a);
        }
        getArgs(b, c, a) {
          N(b) || b.nodeName
            ? ((this.renderTo = b), this.init(c, a))
            : this.init(b, c);
        }
        setZoomOptions() {
          const b = this.options.chart,
            c = b.zooming;
          this.zooming = Object.assign(Object.assign({}, c), {
            type: R(b.zoomType, c.type),
            key: R(b.zoomKey, c.key),
            pinchType: R(b.pinchType, c.pinchType),
            singleTouch: R(b.zoomBySingleTouch, c.singleTouch, !1),
            resetButton: L(c.resetButton, b.resetZoomButton),
          });
        }
        init(b, c) {
          H(this, "init", { args: arguments }, function () {
            const a = L(x, b),
              d = a.chart;
            this.userOptions = U({}, b);
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = c;
            this.isResizing = 0;
            this.options = a;
            this.axes = [];
            this.series = [];
            this.time =
              b.time && Object.keys(b.time).length ? new m(b.time) : D.time;
            this.numberFormatter = d.numberFormatter || M;
            this.styledMode = d.styledMode;
            this.hasCartesianSeries = d.showAxes;
            this.index = f.length;
            f.push(this);
            D.chartCount++;
            C(this, d);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            this.setZoomOptions();
            H(this, "afterInit");
            this.firstRender();
          });
        }
        initSeries(b) {
          var c = this.options.chart;
          c = b.type || c.type;
          const a = d[c];
          a || T(17, !0, this, { missingModuleFor: c });
          c = new a();
          "function" === typeof c.init && c.init(this, b);
          return c;
        }
        setSeriesData() {
          this.getSeriesOrderByLinks().forEach(function (b) {
            b.points ||
              b.data ||
              !b.enabledDataSorting ||
              b.setData(b.options.data, !1);
          });
        }
        getSeriesOrderByLinks() {
          return this.series.concat().sort(function (b, c) {
            return b.linkedSeries.length || c.linkedSeries.length
              ? c.linkedSeries.length - b.linkedSeries.length
              : 0;
          });
        }
        orderItems(b, c = 0) {
          const a = this[b],
            d = (this.options[b] = da(this.options[b]).slice());
          b = this.userOptions[b] = this.userOptions[b]
            ? da(this.userOptions[b]).slice()
            : [];
          this.hasRendered && (d.splice(c), b.splice(c));
          if (a)
            for (let k = c, f = a.length; k < f; ++k)
              if ((c = a[k]))
                (c.index = k),
                  c instanceof B && (c.name = c.getName()),
                  c.options.isInternal ||
                    ((d[k] = c.options), (b[k] = c.userOptions));
        }
        isInsidePlot(b, c, a = {}) {
          const {
            inverted: d,
            plotBox: k,
            plotLeft: f,
            plotTop: e,
            scrollablePlotBox: l,
          } = this;
          var g = 0;
          let h = 0;
          a.visiblePlotOnly &&
            this.scrollingContainer &&
            ({ scrollLeft: g, scrollTop: h } = this.scrollingContainer);
          const n = a.series,
            m = (a.visiblePlotOnly && l) || k;
          var w = a.inverted ? c : b;
          c = a.inverted ? b : c;
          b = { x: w, y: c, isInsidePlot: !0, options: a };
          if (!a.ignoreX) {
            const c = (n && (d && !this.polar ? n.yAxis : n.xAxis)) || {
              pos: f,
              len: Infinity,
            };
            w = a.paneCoordinates ? c.pos + w : f + w;
            (w >= Math.max(g + f, c.pos) &&
              w <= Math.min(g + f + m.width, c.pos + c.len)) ||
              (b.isInsidePlot = !1);
          }
          !a.ignoreY &&
            b.isInsidePlot &&
            ((g = (!d && a.axis && !a.axis.isXAxis && a.axis) ||
              (n && (d ? n.xAxis : n.yAxis)) || { pos: e, len: Infinity }),
            (a = a.paneCoordinates ? g.pos + c : e + c),
            (a >= Math.max(h + e, g.pos) &&
              a <= Math.min(h + e + m.height, g.pos + g.len)) ||
              (b.isInsidePlot = !1));
          H(this, "afterIsInsidePlot", b);
          return b.isInsidePlot;
        }
        redraw(b) {
          H(this, "beforeRedraw");
          const c = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            a = this.series,
            d = this.pointer,
            k = this.legend,
            f = this.userOptions.legend,
            l = this.renderer,
            g = l.isHidden(),
            h = [];
          let n,
            m,
            w = this.isDirtyBox,
            r = this.isDirtyLegend,
            v;
          l.rootFontSize = l.boxWrapper.getStyle("font-size");
          this.setResponsive && this.setResponsive(!1);
          e(this.hasRendered ? b : !1, this);
          g && this.temporaryDisplay();
          this.layOutTitles(!1);
          for (b = a.length; b--; )
            if (((v = a[b]), v.options.stacking || v.options.centerInCategory))
              if (((m = !0), v.isDirty)) {
                n = !0;
                break;
              }
          if (n)
            for (b = a.length; b--; )
              (v = a[b]), v.options.stacking && (v.isDirty = !0);
          a.forEach(function (b) {
            b.isDirty &&
              ("point" === b.options.legendType
                ? ("function" === typeof b.updateTotals && b.updateTotals(),
                  (r = !0))
                : f && (f.labelFormatter || f.labelFormat) && (r = !0));
            b.isDirtyData && H(b, "updatedData");
          });
          r &&
            k &&
            k.options.enabled &&
            (k.render(), (this.isDirtyLegend = !1));
          m && this.getStacks();
          c.forEach(function (b) {
            b.updateNames();
            b.setScale();
          });
          this.getMargins();
          c.forEach(function (b) {
            b.isDirty && (w = !0);
          });
          c.forEach(function (b) {
            const c = b.min + "," + b.max;
            b.extKey !== c &&
              ((b.extKey = c),
              h.push(function () {
                H(b, "afterSetExtremes", U(b.eventArgs, b.getExtremes()));
                delete b.eventArgs;
              }));
            (w || m) && b.redraw();
          });
          w && this.drawChartBox();
          H(this, "predraw");
          a.forEach(function (b) {
            (w || b.isDirty) && b.visible && b.redraw();
            b.isDirtyData = !1;
          });
          d && d.reset(!0);
          l.draw();
          H(this, "redraw");
          H(this, "render");
          g && this.temporaryDisplay(!0);
          h.forEach(function (b) {
            b.call();
          });
        }
        get(b) {
          function c(c) {
            return c.id === b || (c.options && c.options.id === b);
          }
          const a = this.series;
          let d = W(this.axes, c) || W(this.series, c);
          for (let b = 0; !d && b < a.length; b++) d = W(a[b].points || [], c);
          return d;
        }
        getAxes() {
          const b = this.options;
          H(this, "getAxes");
          for (const c of ["xAxis", "yAxis"]) {
            const a = (b[c] = da(b[c] || {}));
            for (const b of a) new A(this, b, c);
          }
          H(this, "afterGetAxes");
        }
        getSelectedPoints() {
          return this.series.reduce((b, c) => {
            c.getPointsCollection().forEach((c) => {
              R(c.selectedStaging, c.selected) && b.push(c);
            });
            return b;
          }, []);
        }
        getSelectedSeries() {
          return this.series.filter(function (b) {
            return b.selected;
          });
        }
        setTitle(b, c, a) {
          this.applyDescription("title", b);
          this.applyDescription("subtitle", c);
          this.applyDescription("caption", void 0);
          this.layOutTitles(a);
        }
        applyDescription(b, c) {
          const a = this,
            d = (this.options[b] = L(this.options[b], c));
          let k = this[b];
          k && c && (this[b] = k = k.destroy());
          d &&
            !k &&
            ((k = this.renderer
              .text(d.text, 0, 0, d.useHTML)
              .attr({
                align: d.align,
                class: "highcharts-" + b,
                zIndex: d.zIndex || 4,
              })
              .add()),
            (k.update = function (c, d) {
              a.applyDescription(b, c);
              a.layOutTitles(d);
            }),
            this.styledMode ||
              k.css(
                U(
                  "title" === b
                    ? { fontSize: this.options.isStock ? "1em" : "1.2em" }
                    : {},
                  d.style
                )
              ),
            (this[b] = k));
        }
        layOutTitles(b = !0) {
          const c = [0, 0, 0],
            a = this.renderer,
            d = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function (b) {
            const k = this[b],
              f = this.options[b],
              e = f.verticalAlign || "top";
            b =
              "title" === b
                ? "top" === e
                  ? -3
                  : 0
                : "top" === e
                ? c[0] + 2
                : 0;
            if (k) {
              k.css({
                width: (f.width || d.width + (f.widthAdjust || 0)) + "px",
              });
              const l = a.fontMetrics(k).b,
                g = Math.round(k.getBBox(f.useHTML).height);
              k.align(
                U({ y: "bottom" === e ? l : b + l, height: g }, f),
                !1,
                "spacingBox"
              );
              f.floating ||
                ("top" === e
                  ? (c[0] = Math.ceil(c[0] + g))
                  : "bottom" === e && (c[2] = Math.ceil(c[2] + g)));
            }
          }, this);
          c[0] &&
            "top" === (this.options.title.verticalAlign || "top") &&
            (c[0] += this.options.title.margin);
          c[2] &&
            "bottom" === this.options.caption.verticalAlign &&
            (c[2] += this.options.caption.margin);
          const k =
            !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
          this.titleOffset = c;
          H(this, "afterLayOutTitles");
          !this.isDirtyBox &&
            k &&
            ((this.isDirtyBox = this.isDirtyLegend = k),
            this.hasRendered && b && this.isDirtyBox && this.redraw());
        }
        getContainerBox() {
          return {
            width: Y(this.renderTo, "width", !0) || 0,
            height: Y(this.renderTo, "height", !0) || 0,
          };
        }
        getChartSize() {
          var b = this.options.chart;
          const c = b.width;
          b = b.height;
          const a = this.getContainerBox();
          this.chartWidth = Math.max(0, c || a.width || 600);
          this.chartHeight = Math.max(
            0,
            ha(b, this.chartWidth) || (1 < a.height ? a.height : 400)
          );
          this.containerBox = a;
        }
        temporaryDisplay(b) {
          let c = this.renderTo;
          if (b)
            for (; c && c.style; )
              c.hcOrigStyle && (w(c, c.hcOrigStyle), delete c.hcOrigStyle),
                c.hcOrigDetached &&
                  (y.body.removeChild(c), (c.hcOrigDetached = !1)),
                (c = c.parentNode);
          else
            for (; c && c.style; ) {
              y.body.contains(c) ||
                c.parentNode ||
                ((c.hcOrigDetached = !0), y.body.appendChild(c));
              if ("none" === Y(c, "display", !1) || c.hcOricDetached)
                (c.hcOrigStyle = {
                  display: c.style.display,
                  height: c.style.height,
                  overflow: c.style.overflow,
                }),
                  (b = { display: "block", overflow: "hidden" }),
                  c !== this.renderTo && (b.height = 0),
                  w(c, b),
                  c.offsetWidth ||
                    c.style.setProperty("display", "block", "important");
              c = c.parentNode;
              if (c === y.body) break;
            }
        }
        setClassName(b) {
          this.container.className = "highcharts-container " + (b || "");
        }
        getContainer() {
          const b = this.options,
            a = b.chart;
          var d = ba();
          let g,
            h = this.renderTo;
          h || (this.renderTo = h = a.renderTo);
          N(h) && (this.renderTo = h = y.getElementById(h));
          h || T(13, !0, this);
          var m = V(c(h, "data-highcharts-chart"));
          aa(m) && f[m] && f[m].hasRendered && f[m].destroy();
          c(h, "data-highcharts-chart", this.index);
          h.innerHTML = n.emptyHTML;
          a.skipClone || h.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          m = this.chartWidth;
          const r = this.chartHeight;
          w(h, { overflow: "hidden" });
          this.styledMode ||
            (g = U(
              {
                position: "relative",
                overflow: "hidden",
                width: m + "px",
                height: r + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                userSelect: "none",
                "touch-action": "manipulation",
                outline: "none",
              },
              a.style || {}
            ));
          this.container = d = k("div", { id: d }, g, h);
          this._cursor = d.style.cursor;
          this.renderer = new (
            a.renderer || !l ? E.getRendererType(a.renderer) : q
          )(
            d,
            m,
            r,
            void 0,
            a.forExport,
            b.exporting && b.exporting.allowHTML,
            this.styledMode
          );
          this.containerBox = this.getContainerBox();
          e(void 0, this);
          this.setClassName(a.className);
          if (this.styledMode)
            for (const c in b.defs) this.renderer.definition(b.defs[c]);
          else this.renderer.setStyle(a.style);
          this.renderer.chartIndex = this.index;
          H(this, "afterGetContainer");
        }
        getMargins(b) {
          const { spacing: c, margin: a, titleOffset: d } = this;
          this.resetMargins();
          d[0] &&
            !z(a[0]) &&
            (this.plotTop = Math.max(this.plotTop, d[0] + c[0]));
          d[2] &&
            !z(a[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, d[2] + c[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(a, c);
          H(this, "getMargins");
          b || this.getAxisMargins();
        }
        getAxisMargins() {
          const b = this,
            c = (b.axisOffset = [0, 0, 0, 0]),
            a = b.colorAxis,
            d = b.margin,
            k = function (b) {
              b.forEach(function (b) {
                b.visible && b.getOffset();
              });
            };
          b.hasCartesianSeries ? k(b.axes) : a && a.length && k(a);
          r.forEach(function (a, k) {
            z(d[k]) || (b[a] += c[k]);
          });
          b.setChartSize();
        }
        getOptions() {
          return F(this.userOptions, x);
        }
        reflow(b) {
          const c = this;
          var a = c.options.chart;
          a = z(a.width) && z(a.height);
          const d = c.containerBox,
            k = c.getContainerBox();
          delete c.pointer.chartPosition;
          if (!a && !c.isPrinting && d && k.width) {
            if (k.width !== d.width || k.height !== d.height)
              p.clearTimeout(c.reflowTimeout),
                (c.reflowTimeout = ja(
                  function () {
                    c.container && c.setSize(void 0, void 0, !1);
                  },
                  b ? 100 : 0
                ));
            c.containerBox = k;
          }
        }
        setReflow() {
          const c = this;
          var a = (b) => {
            var a;
            (null === (a = c.options) || void 0 === a ? 0 : a.chart.reflow) &&
              c.hasLoaded &&
              c.reflow(b);
          };
          "function" === typeof ResizeObserver
            ? new ResizeObserver(a).observe(c.renderTo)
            : ((a = b(v, "resize", a)), b(this, "destroy", a));
        }
        setSize(b, c, a) {
          const d = this,
            k = d.renderer;
          d.isResizing += 1;
          e(a, d);
          a = k.globalAnimation;
          d.oldChartHeight = d.chartHeight;
          d.oldChartWidth = d.chartWidth;
          "undefined" !== typeof b && (d.options.chart.width = b);
          "undefined" !== typeof c && (d.options.chart.height = c);
          d.getChartSize();
          d.styledMode ||
            (a ? h : w)(
              d.container,
              { width: d.chartWidth + "px", height: d.chartHeight + "px" },
              a
            );
          d.setChartSize(!0);
          k.setSize(d.chartWidth, d.chartHeight, a);
          d.axes.forEach(function (b) {
            b.isDirty = !0;
            b.setScale();
          });
          d.isDirtyLegend = !0;
          d.isDirtyBox = !0;
          d.layOutTitles();
          d.getMargins();
          d.redraw(a);
          d.oldChartHeight = null;
          H(d, "resize");
          ja(function () {
            d &&
              H(d, "endResize", null, function () {
                --d.isResizing;
              });
          }, g(a).duration);
        }
        setChartSize(b) {
          var c = this.inverted;
          const a = this.renderer;
          var d = this.chartWidth,
            k = this.chartHeight;
          const f = this.options.chart,
            e = this.spacing,
            l = this.clipOffset;
          let g, h, n, m;
          this.plotLeft = g = Math.round(this.plotLeft);
          this.plotTop = h = Math.round(this.plotTop);
          this.plotWidth = n = Math.max(
            0,
            Math.round(d - g - this.marginRight)
          );
          this.plotHeight = m = Math.max(
            0,
            Math.round(k - h - this.marginBottom)
          );
          this.plotSizeX = c ? m : n;
          this.plotSizeY = c ? n : m;
          this.plotBorderWidth = f.plotBorderWidth || 0;
          this.spacingBox = a.spacingBox = {
            x: e[3],
            y: e[0],
            width: d - e[3] - e[1],
            height: k - e[0] - e[2],
          };
          this.plotBox = a.plotBox = { x: g, y: h, width: n, height: m };
          c = 2 * Math.floor(this.plotBorderWidth / 2);
          d = Math.ceil(Math.max(c, l[3]) / 2);
          k = Math.ceil(Math.max(c, l[0]) / 2);
          this.clipBox = {
            x: d,
            y: k,
            width: Math.floor(this.plotSizeX - Math.max(c, l[1]) / 2 - d),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(c, l[2]) / 2 - k)
            ),
          };
          b ||
            (this.axes.forEach(function (b) {
              b.setAxisSize();
              b.setAxisTranslation();
            }),
            a.alignElements());
          H(this, "afterSetChartSize", { skipAxes: b });
        }
        resetMargins() {
          H(this, "resetMargins");
          const b = this,
            c = b.options.chart;
          ["margin", "spacing"].forEach(function (a) {
            const d = c[a],
              k = Z(d) ? d : [d, d, d, d];
            ["Top", "Right", "Bottom", "Left"].forEach(function (d, f) {
              b[a][f] = R(c[a + d], k[f]);
            });
          });
          r.forEach(function (c, a) {
            b[c] = R(b.margin[a], b.spacing[a]);
          });
          b.axisOffset = [0, 0, 0, 0];
          b.clipOffset = [0, 0, 0, 0];
        }
        drawChartBox() {
          const b = this.options.chart,
            c = this.renderer,
            a = this.chartWidth,
            d = this.chartHeight,
            k = this.styledMode,
            f = this.plotBGImage;
          var e = b.backgroundColor;
          const l = b.plotBackgroundColor,
            g = b.plotBackgroundImage,
            h = this.plotLeft,
            n = this.plotTop,
            m = this.plotWidth,
            w = this.plotHeight,
            r = this.plotBox,
            v = this.clipRect,
            z = this.clipBox;
          let p = this.chartBackground,
            q = this.plotBackground,
            F = this.plotBorder,
            y,
            x,
            t = "animate";
          p ||
            ((this.chartBackground = p =
              c.rect().addClass("highcharts-background").add()),
            (t = "attr"));
          if (k) y = x = p.strokeWidth();
          else {
            y = b.borderWidth || 0;
            x = y + (b.shadow ? 8 : 0);
            e = { fill: e || "none" };
            if (y || p["stroke-width"])
              (e.stroke = b.borderColor), (e["stroke-width"] = y);
            p.attr(e).shadow(b.shadow);
          }
          p[t]({
            x: x / 2,
            y: x / 2,
            width: a - x - (y % 2),
            height: d - x - (y % 2),
            r: b.borderRadius,
          });
          t = "animate";
          q ||
            ((t = "attr"),
            (this.plotBackground = q =
              c.rect().addClass("highcharts-plot-background").add()));
          q[t](r);
          k ||
            (q.attr({ fill: l || "none" }).shadow(b.plotShadow),
            g &&
              (f
                ? (g !== f.attr("href") && f.attr("href", g), f.animate(r))
                : (this.plotBGImage = c.image(g, h, n, m, w).add())));
          v
            ? v.animate({ width: z.width, height: z.height })
            : (this.clipRect = c.clipRect(z));
          t = "animate";
          F ||
            ((t = "attr"),
            (this.plotBorder = F =
              c
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
          k ||
            F.attr({
              stroke: b.plotBorderColor,
              "stroke-width": b.plotBorderWidth || 0,
              fill: "none",
            });
          F[t](F.crisp({ x: h, y: n, width: m, height: w }, -F.strokeWidth()));
          this.isDirtyBox = !1;
          H(this, "afterDrawChartBox");
        }
        propFromSeries() {
          const b = this,
            c = b.options.chart,
            a = b.options.series;
          let k, f, e;
          ["inverted", "angular", "polar"].forEach(function (l) {
            f = d[c.type];
            e = c[l] || (f && f.prototype[l]);
            for (k = a && a.length; !e && k--; )
              (f = d[a[k].type]) && f.prototype[l] && (e = !0);
            b[l] = e;
          });
        }
        linkSeries(b) {
          const c = this,
            a = c.series;
          a.forEach(function (b) {
            b.linkedSeries.length = 0;
          });
          a.forEach(function (b) {
            let a = b.options.linkedTo;
            N(a) &&
              (a = ":previous" === a ? c.series[b.index - 1] : c.get(a)) &&
              a.linkedParent !== b &&
              (a.linkedSeries.push(b),
              (b.linkedParent = a),
              a.enabledDataSorting && b.setDataSortingOptions(),
              (b.visible = R(b.options.visible, a.options.visible, b.visible)));
          });
          H(this, "afterLinkSeries", { isUpdating: b });
        }
        renderSeries() {
          this.series.forEach(function (b) {
            b.translate();
            b.render();
          });
        }
        render() {
          const b = this.axes,
            c = this.colorAxis,
            a = this.renderer,
            d = function (b) {
              b.forEach(function (b) {
                b.visible && b.render();
              });
            };
          let k = 0;
          this.setTitle();
          H(this, "beforeMargins");
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          const f = this.plotWidth;
          b.some(function (b) {
            if (
              b.horiz &&
              b.visible &&
              b.options.labels.enabled &&
              b.series.length
            )
              return (k = 21), !0;
          });
          const e = (this.plotHeight = Math.max(this.plotHeight - k, 0));
          b.forEach(function (b) {
            b.setScale();
          });
          this.getAxisMargins();
          const l = 1.1 < f / this.plotWidth,
            g = 1.05 < e / this.plotHeight;
          if (l || g)
            b.forEach(function (b) {
              ((b.horiz && l) || (!b.horiz && g)) && b.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? d(b) : c && c.length && d(c);
          this.seriesGroup ||
            (this.seriesGroup = a
              .g("series-group")
              .attr({ zIndex: 3 })
              .shadow(this.options.chart.seriesGroupShadow)
              .add());
          this.renderSeries();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        }
        addCredits(b) {
          const c = this,
            a = L(!0, this.options.credits, b);
          a.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(a.text + (this.mapCredits || ""), 0, 0)
              .addClass("highcharts-credits")
              .on("click", function () {
                a.href && (v.location.href = a.href);
              })
              .attr({ align: a.position.align, zIndex: 8 })),
            c.styledMode || this.credits.css(a.style),
            this.credits.add().align(a.position),
            (this.credits.update = function (b) {
              c.credits = c.credits.destroy();
              c.addCredits(b);
            }));
        }
        destroy() {
          const b = this,
            c = b.axes,
            a = b.series,
            d = b.container,
            k = d && d.parentNode;
          let e;
          H(b, "destroy");
          b.renderer.forExport ? P(f, b) : (f[b.index] = void 0);
          D.chartCount--;
          b.renderTo.removeAttribute("data-highcharts-chart");
          ia(b);
          for (e = c.length; e--; ) c[e] = c[e].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (e = a.length; e--; ) a[e] = a[e].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
            .split(" ")
            .forEach(function (c) {
              const a = b[c];
              a && a.destroy && (b[c] = a.destroy());
            });
          d && ((d.innerHTML = n.emptyHTML), ia(d), k && O(d));
          Q(b, function (c, a) {
            delete b[a];
          });
        }
        firstRender() {
          const b = this,
            c = b.options;
          b.getContainer();
          b.resetMargins();
          b.setChartSize();
          b.propFromSeries();
          b.getAxes();
          const a = ea(c.series) ? c.series : [];
          c.series = [];
          a.forEach(function (c) {
            b.initSeries(c);
          });
          b.linkSeries();
          b.setSeriesData();
          H(b, "beforeRender");
          b.render();
          b.pointer.getChartPosition();
          if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
          b.temporaryDisplay(!0);
        }
        onload() {
          this.callbacks.concat([this.callback]).forEach(function (b) {
            b && "undefined" !== typeof this.index && b.apply(this, [this]);
          }, this);
          H(this, "load");
          H(this, "render");
          z(this.index) && this.setReflow();
          this.warnIfA11yModuleNotLoaded();
          this.hasLoaded = !0;
        }
        warnIfA11yModuleNotLoaded() {
          const { options: b, title: c } = this;
          b &&
            !this.accessibility &&
            (this.renderer.boxWrapper.attr({
              role: "img",
              "aria-label": ((c && c.element.textContent) || "").replace(
                /</g,
                "&lt;"
              ),
            }),
            (b.accessibility && !1 === b.accessibility.enabled) ||
              T(
                'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                !1,
                this
              ));
        }
        addSeries(b, c, a) {
          const d = this;
          let k;
          b &&
            ((c = R(c, !0)),
            H(d, "addSeries", { options: b }, function () {
              k = d.initSeries(b);
              d.isDirtyLegend = !0;
              d.linkSeries();
              k.enabledDataSorting && k.setData(b.data, !1);
              H(d, "afterAddSeries", { series: k });
              c && d.redraw(a);
            }));
          return k;
        }
        addAxis(b, c, a, d) {
          return this.createAxis(c ? "xAxis" : "yAxis", {
            axis: b,
            redraw: a,
            animation: d,
          });
        }
        addColorAxis(b, c, a) {
          return this.createAxis("colorAxis", {
            axis: b,
            redraw: c,
            animation: a,
          });
        }
        createAxis(b, c) {
          b = new A(this, c.axis, b);
          R(c.redraw, !0) && this.redraw(c.animation);
          return b;
        }
        showLoading(c) {
          const a = this,
            d = a.options,
            f = d.loading,
            e = function () {
              l &&
                w(l, {
                  left: a.plotLeft + "px",
                  top: a.plotTop + "px",
                  width: a.plotWidth + "px",
                  height: a.plotHeight + "px",
                });
            };
          let l = a.loadingDiv,
            g = a.loadingSpan;
          l ||
            (a.loadingDiv = l =
              k(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                a.container
              ));
          g ||
            ((a.loadingSpan = g =
              k("span", { className: "highcharts-loading-inner" }, null, l)),
            b(a, "redraw", e));
          l.className = "highcharts-loading";
          n.setElementHTML(g, R(c, d.lang.loading, ""));
          a.styledMode ||
            (w(l, U(f.style, { zIndex: 10 })),
            w(g, f.labelStyle),
            a.loadingShown ||
              (w(l, { opacity: 0, display: "" }),
              h(
                l,
                { opacity: f.style.opacity || 0.5 },
                { duration: f.showDuration || 0 }
              )));
          a.loadingShown = !0;
          e();
        }
        hideLoading() {
          const b = this.options,
            c = this.loadingDiv;
          c &&
            ((c.className = "highcharts-loading highcharts-loading-hidden"),
            this.styledMode ||
              h(
                c,
                { opacity: 0 },
                {
                  duration: b.loading.hideDuration || 100,
                  complete: function () {
                    w(c, { display: "none" });
                  },
                }
              ));
          this.loadingShown = !1;
        }
        update(b, c, a, d) {
          const k = this,
            f = {
              credits: "addCredits",
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption",
            },
            e = b.isResponsiveOptions,
            l = [];
          let g, h;
          H(k, "update", { options: b });
          e || k.setResponsive(!1, !0);
          b = F(b, k.options);
          k.userOptions = L(k.userOptions, b);
          var n = b.chart;
          if (n) {
            L(!0, k.options.chart, n);
            this.setZoomOptions();
            "className" in n && k.setClassName(n.className);
            if ("inverted" in n || "polar" in n || "type" in n) {
              k.propFromSeries();
              var w = !0;
            }
            "alignTicks" in n && (w = !0);
            "events" in n && C(this, n);
            Q(n, function (b, c) {
              -1 !== k.propsRequireUpdateSeries.indexOf("chart." + c) &&
                (g = !0);
              -1 !== k.propsRequireDirtyBox.indexOf(c) && (k.isDirtyBox = !0);
              -1 !== k.propsRequireReflow.indexOf(c) &&
                (e ? (k.isDirtyBox = !0) : (h = !0));
            });
            !k.styledMode &&
              n.style &&
              k.renderer.setStyle(k.options.chart.style || {});
          }
          !k.styledMode && b.colors && (this.options.colors = b.colors);
          b.time &&
            (this.time === u && (this.time = new m(b.time)),
            L(!0, k.options.time, b.time));
          Q(b, function (c, a) {
            if (k[a] && "function" === typeof k[a].update) k[a].update(c, !1);
            else if ("function" === typeof k[f[a]]) k[f[a]](c);
            else
              "colors" !== a &&
                -1 === k.collectionsWithUpdate.indexOf(a) &&
                L(!0, k.options[a], b[a]);
            "chart" !== a &&
              -1 !== k.propsRequireUpdateSeries.indexOf(a) &&
              (g = !0);
          });
          this.collectionsWithUpdate.forEach(function (c) {
            b[c] &&
              (da(b[c]).forEach(function (b, d) {
                const f = z(b.id);
                let e;
                f && (e = k.get(b.id));
                !e &&
                  k[c] &&
                  (e = k[c][R(b.index, d)]) &&
                  ((f && z(e.options.id)) || e.options.isInternal) &&
                  (e = void 0);
                e && e.coll === c && (e.update(b, !1), a && (e.touched = !0));
                !e &&
                  a &&
                  k.collectionsWithInit[c] &&
                  (k.collectionsWithInit[c][0].apply(
                    k,
                    [b].concat(k.collectionsWithInit[c][1] || []).concat([!1])
                  ).touched = !0);
              }),
              a &&
                k[c].forEach(function (b) {
                  b.touched || b.options.isInternal
                    ? delete b.touched
                    : l.push(b);
                }));
          });
          l.forEach(function (b) {
            b.chart && b.remove && b.remove(!1);
          });
          w &&
            k.axes.forEach(function (b) {
              b.update({}, !1);
            });
          g &&
            k.getSeriesOrderByLinks().forEach(function (b) {
              b.chart && b.update({}, !1);
            }, this);
          w = n && n.width;
          n = n && (N(n.height) ? ha(n.height, w || k.chartWidth) : n.height);
          h || (aa(w) && w !== k.chartWidth) || (aa(n) && n !== k.chartHeight)
            ? k.setSize(w, n, d)
            : R(c, !0) && k.redraw(d);
          H(k, "afterUpdate", { options: b, redraw: c, animation: d });
        }
        setSubtitle(b, c) {
          this.applyDescription("subtitle", b);
          this.layOutTitles(c);
        }
        setCaption(b, c) {
          this.applyDescription("caption", b);
          this.layOutTitles(c);
        }
        showResetZoom() {
          function b() {
            c.zoomOut();
          }
          const c = this,
            a = x.lang,
            d = c.zooming.resetButton,
            k = d.theme,
            f =
              "chart" === d.relativeTo || "spacingBox" === d.relativeTo
                ? null
                : "scrollablePlotBox";
          H(this, "beforeShowResetZoom", null, function () {
            c.resetZoomButton = c.renderer
              .button(a.resetZoom, null, null, b, k)
              .attr({ align: d.position.align, title: a.resetZoomTitle })
              .addClass("highcharts-reset-zoom")
              .add()
              .align(d.position, !1, f);
          });
          H(this, "afterShowResetZoom");
        }
        zoomOut() {
          H(this, "selection", { resetSelection: !0 }, this.zoom);
        }
        zoom(b) {
          const c = this,
            a = c.pointer;
          let d = !1,
            k;
          !b || b.resetSelection
            ? (c.axes.forEach(function (b) {
                k = b.zoom();
              }),
              (a.initiated = !1))
            : b.xAxis.concat(b.yAxis).forEach(function (b) {
                const f = b.axis;
                if (
                  (a[f.isXAxis ? "zoomX" : "zoomY"] &&
                    z(a.mouseDownX) &&
                    z(a.mouseDownY) &&
                    c.isInsidePlot(
                      a.mouseDownX - c.plotLeft,
                      a.mouseDownY - c.plotTop,
                      { axis: f }
                    )) ||
                  !z(c.inverted ? a.mouseDownX : a.mouseDownY)
                )
                  (k = f.zoom(b.min, b.max)), f.displayBtn && (d = !0);
              });
          const f = c.resetZoomButton;
          d && !f
            ? c.showResetZoom()
            : !d && Z(f) && (c.resetZoomButton = f.destroy());
          k &&
            c.redraw(
              R(c.options.chart.animation, b && b.animation, 100 > c.pointCount)
            );
        }
        pan(b, c) {
          const a = this,
            d = a.hoverPoints;
          c = "object" === typeof c ? c : { enabled: c, type: "x" };
          const k = a.options.chart;
          k && k.panning && (k.panning = c);
          const f = c.type;
          let e;
          H(this, "pan", { originalEvent: b }, function () {
            d &&
              d.forEach(function (b) {
                b.setState();
              });
            let c = a.xAxis;
            "xy" === f ? (c = c.concat(a.yAxis)) : "y" === f && (c = a.yAxis);
            const k = {};
            c.forEach(function (c) {
              if (c.options.panningEnabled && !c.options.isInternal) {
                var d = c.horiz,
                  l = b[d ? "chartX" : "chartY"];
                d = d ? "mouseDownX" : "mouseDownY";
                var g = a[d],
                  h = c.minPointOffset || 0,
                  n =
                    (c.reversed && !a.inverted) || (!c.reversed && a.inverted)
                      ? -1
                      : 1,
                  m = c.getExtremes(),
                  w = c.toValue(g - l, !0) + h * n,
                  r =
                    c.toValue(g + c.len - l, !0) -
                    (h * n || (c.isXAxis && c.pointRangePadding) || 0),
                  v = r < w;
                n = c.hasVerticalPanning();
                g = v ? r : w;
                w = v ? w : r;
                var z = c.panningState;
                !n ||
                  c.isXAxis ||
                  (z && !z.isDirty) ||
                  c.series.forEach(function (b) {
                    var c = b.getProcessedData(!0);
                    c = b.getExtremes(c.yData, !0);
                    z ||
                      (z = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    aa(c.dataMin) &&
                      aa(c.dataMax) &&
                      ((z.startMin = Math.min(
                        R(b.options.threshold, Infinity),
                        c.dataMin,
                        z.startMin
                      )),
                      (z.startMax = Math.max(
                        R(b.options.threshold, -Infinity),
                        c.dataMax,
                        z.startMax
                      )));
                  });
                n = Math.min(
                  R(z && z.startMin, m.dataMin),
                  h ? m.min : c.toValue(c.toPixels(m.min) - c.minPixelPadding)
                );
                r = Math.max(
                  R(z && z.startMax, m.dataMax),
                  h ? m.max : c.toValue(c.toPixels(m.max) + c.minPixelPadding)
                );
                c.panningState = z;
                c.isOrdinal ||
                  ((h = n - g),
                  0 < h && ((w += h), (g = n)),
                  (h = w - r),
                  0 < h && ((w = r), (g -= h)),
                  c.series.length &&
                    g !== m.min &&
                    w !== m.max &&
                    g >= n &&
                    w <= r &&
                    (c.setExtremes(g, w, !1, !1, { trigger: "pan" }),
                    !a.resetZoomButton &&
                      g !== n &&
                      w !== r &&
                      f.match("y") &&
                      (a.showResetZoom(), (c.displayBtn = !1)),
                    (e = !0)),
                  (k[d] = l));
              }
            });
            Q(k, (b, c) => {
              a[c] = b;
            });
            e && a.redraw(!1);
            w(a.container, { cursor: "move" });
          });
        }
      }
      U(S.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [S.prototype.addAxis, [!0]],
          yAxis: [S.prototype.addAxis, [!1]],
          series: [S.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " "
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " "
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " "
          ),
      });
      ("");
      return S;
    }
  );
  L(
    a,
    "Extensions/ScrollablePlotArea.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Series/Series.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D) {
      const { stop: u } = a,
        { addEvent: B, createElement: t, defined: q, merge: m, pick: p } = D;
      B(J, "afterSetChartSize", function (a) {
        var h = this.options.chart.scrollablePlotArea,
          g = h && h.minWidth;
        h = h && h.minHeight;
        let e;
        if (!this.renderer.forExport) {
          if (g) {
            if ((this.scrollablePixelsX = g = Math.max(0, g - this.chartWidth)))
              (this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                m(this.plotBox)),
                (this.plotBox.width = this.plotWidth += g),
                this.inverted
                  ? (this.clipBox.height += g)
                  : (this.clipBox.width += g),
                (e = { 1: { name: "right", value: g } });
          } else
            h &&
              ((this.scrollablePixelsY = g = Math.max(0, h - this.chartHeight)),
              q(g) &&
                ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                  m(this.plotBox)),
                (this.plotBox.height = this.plotHeight += g),
                this.inverted
                  ? (this.clipBox.width += g)
                  : (this.clipBox.height += g),
                (e = { 2: { name: "bottom", value: g } })));
          e &&
            !a.skipAxes &&
            this.axes.forEach(function (a) {
              e[a.side]
                ? (a.getPlotLinePath = function () {
                    let g = e[a.side].name,
                      h = this[g],
                      n;
                    this[g] = h - e[a.side].value;
                    n = A.prototype.getPlotLinePath.apply(this, arguments);
                    this[g] = h;
                    return n;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      B(J, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      J.prototype.setUpScrolling = function () {
        const a = {
          WebkitOverflowScrolling: "touch",
          overflowX: "hidden",
          overflowY: "hidden",
        };
        this.scrollablePixelsX && (a.overflowX = "auto");
        this.scrollablePixelsY && (a.overflowY = "auto");
        this.scrollingParent = t(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo
        );
        this.scrollingContainer = t(
          "div",
          { className: "highcharts-scrolling" },
          a,
          this.scrollingParent
        );
        let h;
        B(this.scrollingContainer, "scroll", () => {
          this.pointer &&
            (delete this.pointer.chartPosition,
            this.hoverPoint && (h = this.hoverPoint),
            this.pointer.runPointActions(void 0, h, !0));
        });
        this.innerContainer = t(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      J.prototype.moveFixedElements = function () {
        let a = this.container,
          h = this.fixedRenderer,
          g =
            ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " "
            ),
          e;
        this.scrollablePixelsX && !this.inverted
          ? (e = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (e = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (e = ".highcharts-xaxis")
          : this.scrollablePixelsY &&
            this.inverted &&
            (e = ".highcharts-yaxis");
        e &&
          g.push(
            `${e}:not(.highcharts-radial-axis)`,
            `${e}-labels:not(.highcharts-radial-axis-labels)`
          );
        g.forEach(function (e) {
          [].forEach.call(a.querySelectorAll(e), function (a) {
            (a.namespaceURI === h.SVG_NS
              ? h.box
              : h.box.parentNode
            ).appendChild(a);
            a.style.pointerEvents = "auto";
          });
        });
      };
      J.prototype.applyFixed = function () {
        var a = !this.fixedDiv,
          h = this.options.chart,
          g = h.scrollablePlotArea,
          e = G.getRendererType();
        a
          ? ((this.fixedDiv = t(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((h.style && h.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = h =
              new e(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = h
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": p(g.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            B(this, "afterShowResetZoom", this.moveFixedElements),
            B(this, "afterApplyDrilldown", this.moveFixedElements),
            B(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || a)
          (this.scrollableDirty = !1), this.moveFixedElements();
        h = this.chartWidth + (this.scrollablePixelsX || 0);
        e = this.chartHeight + (this.scrollablePixelsY || 0);
        u(this.container);
        this.container.style.width = h + "px";
        this.container.style.height = e + "px";
        this.renderer.boxWrapper.attr({
          width: h,
          height: e,
          viewBox: [0, 0, h, e].join(" "),
        });
        this.chartBackground.attr({ width: h, height: e });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        a &&
          (g.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * g.scrollPositionX),
          g.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * g.scrollPositionY));
        e = this.axisOffset;
        a = this.plotTop - e[0] - 1;
        g = this.plotLeft - e[3] - 1;
        h = this.plotTop + this.plotHeight + e[2] + 1;
        e = this.plotLeft + this.plotWidth + e[1] + 1;
        let m = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          q = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        a = this.scrollablePixelsX
          ? [
              ["M", 0, a],
              ["L", this.plotLeft - 1, a],
              ["L", this.plotLeft - 1, h],
              ["L", 0, h],
              ["Z"],
              ["M", m, a],
              ["L", this.chartWidth, a],
              ["L", this.chartWidth, h],
              ["L", m, h],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", g, 0],
              ["L", g, this.plotTop - 1],
              ["L", e, this.plotTop - 1],
              ["L", e, 0],
              ["Z"],
              ["M", g, q],
              ["L", g, this.chartHeight],
              ["L", e, this.chartHeight],
              ["L", e, q],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: a });
      };
      B(A, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      B(K, "show", function () {
        this.chart.scrollableDirty = !0;
      });
      ("");
    }
  );
  L(
    a,
    "Core/Axis/Stacking/StackItem.js",
    [
      a["Core/Templating.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { format: u } = a,
        { series: G } = A,
        { destroyObjectProperties: D, fireEvent: E, isNumber: B, pick: t } = J;
      class q {
        constructor(a, p, n, h, g) {
          const e = a.chart.inverted,
            m = a.reversed;
          this.axis = a;
          a = this.isNegative = !!n !== !!m;
          this.options = p = p || {};
          this.x = h;
          this.cumulative = this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = g;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: p.align || (e ? (a ? "left" : "right") : "center"),
            verticalAlign:
              p.verticalAlign || (e ? "middle" : a ? "bottom" : "top"),
            y: p.y,
            x: p.x,
          };
          this.textAlign =
            p.textAlign || (e ? (a ? "right" : "left") : "center");
        }
        destroy() {
          D(this, this.axis);
        }
        render(a) {
          const m = this.axis.chart,
            n = this.options;
          var h = n.format;
          h = h ? u(h, this, m) : n.formatter.call(this);
          this.label
            ? this.label.attr({ text: h, visibility: "hidden" })
            : ((this.label = m.renderer.label(
                h,
                null,
                void 0,
                n.shape,
                void 0,
                void 0,
                n.useHTML,
                !1,
                "stack-labels"
              )),
              (h = {
                r: n.borderRadius || 0,
                text: h,
                padding: t(n.padding, 5),
                visibility: "hidden",
              }),
              m.styledMode ||
                ((h.fill = n.backgroundColor),
                (h.stroke = n.borderColor),
                (h["stroke-width"] = n.borderWidth),
                this.label.css(n.style || {})),
              this.label.attr(h),
              this.label.added || this.label.add(a));
          this.label.labelrank = m.plotSizeY;
          E(this, "afterRender");
        }
        setOffset(a, p, n, h, g, e) {
          const {
              alignOptions: m,
              axis: q,
              label: u,
              options: C,
              textAlign: f,
            } = this,
            y = q.chart;
          n = this.getStackBox({
            xOffset: a,
            width: p,
            boxBottom: n,
            boxTop: h,
            defaultX: g,
            xAxis: e,
          });
          var { verticalAlign: r } = m;
          if (u && n) {
            h = u.getBBox();
            g = u.padding;
            e = "justify" === t(C.overflow, "justify");
            m.x = C.x || 0;
            m.y = C.y || 0;
            const { x: a, y: v } = this.adjustStackPosition({
              labelBox: h,
              verticalAlign: r,
              textAlign: f,
            });
            n.x -= a;
            n.y -= v;
            u.align(m, !1, n);
            (r = y.isInsidePlot(
              u.alignAttr.x + m.x + a,
              u.alignAttr.y + m.y + v
            )) || (e = !1);
            e && G.prototype.justifyDataLabel.call(q, u, m, u.alignAttr, h, n);
            u.attr({
              x: u.alignAttr.x,
              y: u.alignAttr.y,
              rotation: C.rotation,
              rotationOriginX: h.width / 2,
              rotationOriginY: h.height / 2,
            });
            t(!e && C.crop, !0) &&
              (r =
                B(u.x) &&
                B(u.y) &&
                y.isInsidePlot(u.x - g + u.width, u.y) &&
                y.isInsidePlot(u.x + g, u.y));
            u[r ? "show" : "hide"]();
          }
          E(this, "afterSetOffset", { xOffset: a, width: p });
        }
        adjustStackPosition({ labelBox: a, verticalAlign: p, textAlign: n }) {
          const h = {
            bottom: 0,
            middle: 1,
            top: 2,
            right: 1,
            center: 0,
            left: -1,
          };
          return {
            x: a.width / 2 + (a.width / 2) * h[n],
            y: (a.height / 2) * h[p],
          };
        }
        getStackBox(a) {
          var m = this.axis;
          const n = m.chart,
            { boxTop: h, defaultX: g, xOffset: e, width: q, boxBottom: u } = a;
          var M = m.stacking.usePercentage ? 100 : t(h, this.total, 0);
          M = m.toPixels(M);
          a = a.xAxis || n.xAxis[0];
          const C = t(g, a.translate(this.x)) + e;
          m = m.toPixels(
            u ||
              (B(m.min) && m.logarithmic && m.logarithmic.lin2log(m.min)) ||
              0
          );
          m = Math.abs(M - m);
          const f = this.isNegative;
          return n.inverted
            ? {
                x: (f ? M : M - m) - n.plotLeft,
                y: a.height - C - q,
                width: m,
                height: q,
              }
            : {
                x: C + a.transB - n.plotLeft,
                y: (f ? M - m : M) - n.plotTop,
                width: q,
                height: m,
              };
        }
      }
      ("");
      return q;
    }
  );
  L(
    a,
    "Core/Axis/Stacking/StackingAxis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G) {
      function u() {
        const b = this,
          c = b.inverted;
        b.yAxis.forEach((b) => {
          b.stacking &&
            b.stacking.stacks &&
            b.hasVisibleSeries &&
            (b.stacking.oldStacks = b.stacking.stacks);
        });
        b.series.forEach((a) => {
          const d = (a.xAxis && a.xAxis.options) || {};
          !a.options.stacking ||
            (!0 !== a.visible && !1 !== b.options.chart.ignoreHiddenSeries) ||
            (a.stackKey = [
              a.type,
              l(a.options.stack, ""),
              c ? d.top : d.left,
              c ? d.height : d.width,
            ].join());
        });
      }
      function E() {
        const b = this.stacking;
        if (b) {
          var c = b.stacks;
          r(c, function (b, a) {
            M(b);
            c[a] = null;
          });
          b && b.stackTotalGroup && b.stackTotalGroup.destroy();
        }
      }
      function B() {
        "yAxis" !== this.coll || this.stacking || (this.stacking = new v(this));
      }
      function t(b, c, a, d) {
        !I(b) || b.x !== c || (d && b.stackKey !== d)
          ? (b = { x: c, index: 0, key: d, stackKey: d })
          : b.index++;
        b.key = [a, c, b.index].join();
        return b;
      }
      function q() {
        const b = this,
          c = b.stackKey,
          a = b.yAxis.stacking.stacks,
          d = b.processedXData,
          f = b[b.options.stacking + "Stacker"];
        let e;
        f &&
          [c, "-" + c].forEach((c) => {
            let k = d.length;
            let l;
            for (; k--; ) {
              var g = d[k];
              e = b.getStackIndicator(e, g, b.index, c);
              (l = (g = a[c] && a[c][g]) && g.points[e.key]) &&
                f.call(b, l, g, k);
            }
          });
      }
      function m(b, c, a) {
        c = c.total ? 100 / c.total : 0;
        b[0] = x(b[0] * c);
        b[1] = x(b[1] * c);
        this.stackedYData[a] = b[1];
      }
      function p() {
        const b = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? g.setStackedPoints.call(this, "group")
          : b &&
            r(b.stacks, (c, a) => {
              "group" === a.slice(-5) &&
                (r(c, (b) => b.destroy()), delete b.stacks[a]);
            });
      }
      function n(b) {
        var c = this.chart;
        const a = b || this.options.stacking;
        if (
          a &&
          (!0 === this.visible || !1 === c.options.chart.ignoreHiddenSeries)
        ) {
          var d = this.processedXData,
            e = this.processedYData,
            g = [],
            h = e.length,
            n = this.options,
            m = n.threshold,
            r = l(n.startFromThreshold && m, 0);
          n = n.stack;
          b = b ? `${this.type},${a}` : this.stackKey;
          var v = "-" + b,
            p = this.negStacks;
          c = "group" === a ? c.yAxis[0] : this.yAxis;
          var q = c.stacking.stacks,
            y = c.stacking.oldStacks,
            t,
            u;
          c.stacking.stacksTouched += 1;
          for (u = 0; u < h; u++) {
            var C = d[u];
            var B = e[u];
            var M = this.getStackIndicator(M, C, this.index);
            var A = M.key;
            var E = (t = p && B < (r ? 0 : m)) ? v : b;
            q[E] || (q[E] = {});
            q[E][C] ||
              (y[E] && y[E][C]
                ? ((q[E][C] = y[E][C]), (q[E][C].total = null))
                : (q[E][C] = new K(c, c.options.stackLabels, !!t, C, n)));
            E = q[E][C];
            null !== B
              ? ((E.points[A] = E.points[this.index] = [l(E.cumulative, r)]),
                I(E.cumulative) || (E.base = A),
                (E.touched = c.stacking.stacksTouched),
                0 < M.index &&
                  !1 === this.singleStacks &&
                  (E.points[A][0] = E.points[this.index + "," + C + ",0"][0]))
              : (E.points[A] = E.points[this.index] = null);
            "percent" === a
              ? ((t = t ? b : v),
                p && q[t] && q[t][C]
                  ? ((t = q[t][C]),
                    (E.total = t.total =
                      Math.max(t.total, E.total) + Math.abs(B) || 0))
                  : (E.total = x(E.total + (Math.abs(B) || 0))))
              : "group" === a
              ? (f(B) && (B = B[0]),
                null !== B && (E.total = (E.total || 0) + 1))
              : (E.total = x(E.total + (B || 0)));
            E.cumulative =
              "group" === a
                ? (E.total || 1) - 1
                : x(l(E.cumulative, r) + (B || 0));
            null !== B &&
              (E.points[A].push(E.cumulative),
              (g[u] = E.cumulative),
              (E.hasValidPoints = !0));
          }
          "percent" === a && (c.stacking.usePercentage = !0);
          "group" !== a && (this.stackedYData = g);
          c.stacking.oldStacks = {};
        }
      }
      const { getDeferredAnimation: h } = a,
        {
          series: { prototype: g },
        } = J,
        {
          addEvent: e,
          correctFloat: x,
          defined: I,
          destroyObjectProperties: M,
          fireEvent: C,
          isArray: f,
          isNumber: y,
          objectEach: r,
          pick: l,
        } = G;
      class v {
        constructor(b) {
          this.oldStacks = {};
          this.stacks = {};
          this.stacksTouched = 0;
          this.axis = b;
        }
        buildStacks() {
          const b = this.axis,
            c = b.series,
            a = b.options.reversedStacks,
            d = c.length;
          let f, e;
          this.usePercentage = !1;
          for (e = d; e--; )
            (f = c[a ? e : d - e - 1]),
              f.setStackedPoints(),
              f.setGroupedPoints();
          for (e = 0; e < d; e++) c[e].modifyStacks();
          C(b, "afterBuildStacks");
        }
        cleanStacks() {
          let b;
          this.oldStacks && (b = this.stacks = this.oldStacks);
          r(b, function (b) {
            r(b, function (b) {
              b.cumulative = b.total;
            });
          });
        }
        resetStacks() {
          r(this.stacks, (b) => {
            r(b, (c, a) => {
              y(c.touched) && c.touched < this.stacksTouched
                ? (c.destroy(), delete b[a])
                : ((c.total = null), (c.cumulative = null));
            });
          });
        }
        renderStackTotals() {
          var b = this.axis;
          const c = b.chart,
            a = c.renderer,
            d = this.stacks;
          b = h(
            c,
            (b.options.stackLabels && b.options.stackLabels.animation) || !1
          );
          const f = (this.stackTotalGroup =
            this.stackTotalGroup ||
            a.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
          f.translate(c.plotLeft, c.plotTop);
          r(d, function (b) {
            r(b, function (b) {
              b.render(f);
            });
          });
          f.animate({ opacity: 1 }, b);
        }
      }
      var d;
      (function (b) {
        const c = [];
        b.compose = function (b, a, d) {
          G.pushUnique(c, b) && (e(b, "init", B), e(b, "destroy", E));
          G.pushUnique(c, a) && (a.prototype.getStacks = u);
          G.pushUnique(c, d) &&
            ((b = d.prototype),
            (b.getStackIndicator = t),
            (b.modifyStacks = q),
            (b.percentStacker = m),
            (b.setGroupedPoints = p),
            (b.setStackedPoints = n));
        };
      })(d || (d = {}));
      return d;
    }
  );
  L(
    a,
    "Series/Line/LineSeries.js",
    [
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { defined: u, merge: G } = J;
      class D extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawGraph() {
          const a = this,
            u = this.options,
            t = (this.gappedPath || this.getGraphPath).call(this),
            q = this.chart.styledMode;
          let m = [["graph", "highcharts-graph"]];
          q || m[0].push(u.lineColor || this.color || "#cccccc", u.dashStyle);
          m = a.getZonesGraphs(m);
          m.forEach(function (m, n) {
            var h = m[0];
            let g = a[h];
            const e = g ? "animate" : "attr";
            g
              ? ((g.endX = a.preventGraphAnimation ? null : t.xMap),
                g.animate({ d: t }))
              : t.length &&
                (a[h] = g =
                  a.chart.renderer
                    .path(t)
                    .addClass(m[1])
                    .attr({ zIndex: 1 })
                    .add(a.group));
            g &&
              !q &&
              ((h = {
                stroke: m[2],
                "stroke-width": u.lineWidth || 0,
                fill: (a.fillGraph && a.color) || "none",
              }),
              m[3]
                ? (h.dashstyle = m[3])
                : "square" !== u.linecap &&
                  (h["stroke-linecap"] = h["stroke-linejoin"] = "round"),
              g[e](h).shadow(2 > n && u.shadow));
            g && ((g.startX = t.xMap), (g.isArea = t.isArea));
          });
        }
        getGraphPath(a, B, t) {
          const q = this,
            m = q.options,
            p = [],
            n = [];
          let h,
            g = m.step;
          a = a || q.points;
          const e = a.reversed;
          e && a.reverse();
          (g = { right: 1, center: 2 }[g] || (g && 3)) && e && (g = 4 - g);
          a = this.getValidPoints(a, !1, !(m.connectNulls && !B && !t));
          a.forEach(function (e, I) {
            const x = e.plotX,
              C = e.plotY,
              f = a[I - 1],
              y = e.isNull || "number" !== typeof C;
            (e.leftCliff || (f && f.rightCliff)) && !t && (h = !0);
            y && !u(B) && 0 < I
              ? (h = !m.connectNulls)
              : y && !B
              ? (h = !0)
              : (0 === I || h
                  ? (I = [["M", e.plotX, e.plotY]])
                  : q.getPointSpline
                  ? (I = [q.getPointSpline(a, e, I)])
                  : g
                  ? ((I =
                      1 === g
                        ? [["L", f.plotX, C]]
                        : 2 === g
                        ? [
                            ["L", (f.plotX + x) / 2, f.plotY],
                            ["L", (f.plotX + x) / 2, C],
                          ]
                        : [["L", x, f.plotY]]),
                    I.push(["L", x, C]))
                  : (I = [["L", x, C]]),
                n.push(e.x),
                g && (n.push(e.x), 2 === g && n.push(e.x)),
                p.push.apply(p, I),
                (h = !1));
          });
          p.xMap = n;
          return (q.graphPath = p);
        }
        getZonesGraphs(a) {
          this.zones.forEach(function (u, t) {
            t = [
              "zone-graph-" + t,
              "highcharts-graph highcharts-zone-graph-" +
                t +
                " " +
                (u.className || ""),
            ];
            this.chart.styledMode ||
              t.push(
                u.color || this.color,
                u.dashStyle || this.options.dashStyle
              );
            a.push(t);
          }, this);
          return a;
        }
      }
      D.defaultOptions = G(a.defaultOptions, { legendSymbol: "lineMarker" });
      A.registerSeriesType("line", D);
      ("");
      return D;
    }
  );
  L(
    a,
    "Series/Area/AreaSeries.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const {
          seriesTypes: { line: u },
        } = A,
        { extend: G, merge: D, objectEach: E, pick: B } = J;
      class t extends u {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawGraph() {
          this.areaPath = [];
          super.drawGraph.apply(this);
          const a = this,
            m = this.areaPath,
            p = this.options,
            n = [["area", "highcharts-area", this.color, p.fillColor]];
          this.zones.forEach(function (h, g) {
            n.push([
              "zone-area-" + g,
              "highcharts-area highcharts-zone-area-" + g + " " + h.className,
              h.color || a.color,
              h.fillColor || p.fillColor,
            ]);
          });
          n.forEach(function (h) {
            const g = h[0],
              e = {};
            let n = a[g];
            const q = n ? "animate" : "attr";
            n
              ? ((n.endX = a.preventGraphAnimation ? null : m.xMap),
                n.animate({ d: m }))
              : ((e.zIndex = 0),
                (n = a[g] =
                  a.chart.renderer.path(m).addClass(h[1]).add(a.group)),
                (n.isArea = !0));
            a.chart.styledMode ||
              (h[3]
                ? (e.fill = h[3])
                : ((e.fill = h[2]),
                  (e["fill-opacity"] = B(p.fillOpacity, 0.75))));
            n[q](e);
            n.startX = m.xMap;
            n.shiftUnit = p.step ? 2 : 1;
          });
        }
        getGraphPath(a) {
          var m = u.prototype.getGraphPath,
            p = this.options;
          const n = p.stacking,
            h = this.yAxis,
            g = [],
            e = [],
            q = this.index,
            t = h.stacking.stacks[this.stackKey],
            M = p.threshold,
            C = Math.round(h.getThreshold(p.threshold));
          p = B(p.connectNulls, "percent" === n);
          var f = function (f, d, b) {
            var c = a[f];
            f = n && t[c.x].points[q];
            const k = c[b + "Null"] || 0;
            b = c[b + "Cliff"] || 0;
            let l, m;
            c = !0;
            b || k
              ? ((l = (k ? f[0] : f[1]) + b), (m = f[0] + b), (c = !!k))
              : !n && a[d] && a[d].isNull && (l = m = M);
            "undefined" !== typeof l &&
              (e.push({
                plotX: y,
                plotY: null === l ? C : h.getThreshold(l),
                isNull: c,
                isCliff: !0,
              }),
              g.push({
                plotX: y,
                plotY: null === m ? C : h.getThreshold(m),
                doCurve: !1,
              }));
          };
          let y;
          a = a || this.points;
          n && (a = this.getStackPoints(a));
          for (let h = 0, d = a.length; h < d; ++h) {
            n ||
              (a[h].leftCliff =
                a[h].rightCliff =
                a[h].leftNull =
                a[h].rightNull =
                  void 0);
            var r = a[h].isNull;
            y = B(a[h].rectPlotX, a[h].plotX);
            var l = n ? B(a[h].yBottom, C) : C;
            if (!r || p)
              p || f(h, h - 1, "left"),
                (r && !n && p) ||
                  (e.push(a[h]), g.push({ x: h, plotX: y, plotY: l })),
                p || f(h, h + 1, "right");
          }
          f = m.call(this, e, !0, !0);
          g.reversed = !0;
          r = m.call(this, g, !0, !0);
          (l = r[0]) && "M" === l[0] && (r[0] = ["L", l[1], l[2]]);
          r = f.concat(r);
          r.length && r.push(["Z"]);
          m = m.call(this, e, !1, p);
          r.xMap = f.xMap;
          this.areaPath = r;
          return m;
        }
        getStackPoints(a) {
          const m = this,
            p = [],
            n = [],
            h = this.xAxis,
            g = this.yAxis,
            e = g.stacking.stacks[this.stackKey],
            q = {},
            t = g.series,
            u = t.length,
            C = g.options.reversedStacks ? 1 : -1,
            f = t.indexOf(m);
          a = a || this.points;
          if (this.options.stacking) {
            for (let f = 0; f < a.length; f++)
              (a[f].leftNull = a[f].rightNull = void 0), (q[a[f].x] = a[f]);
            E(e, function (a, f) {
              null !== a.total && n.push(f);
            });
            n.sort(function (a, f) {
              return a - f;
            });
            const y = t.map((a) => a.visible);
            n.forEach(function (a, l) {
              let r = 0,
                d,
                b;
              if (q[a] && !q[a].isNull)
                p.push(q[a]),
                  [-1, 1].forEach(function (c) {
                    const k = 1 === c ? "rightNull" : "leftNull",
                      g = e[n[l + c]];
                    let h = 0;
                    if (g) {
                      let c = f;
                      for (; 0 <= c && c < u; ) {
                        const f = t[c].index;
                        d = g.points[f];
                        d ||
                          (f === m.index
                            ? (q[a][k] = !0)
                            : y[c] &&
                              (b = e[a].points[f]) &&
                              (h -= b[1] - b[0]));
                        c += C;
                      }
                    }
                    q[a][1 === c ? "rightCliff" : "leftCliff"] = h;
                  });
              else {
                let b = f;
                for (; 0 <= b && b < u; ) {
                  if ((d = e[a].points[t[b].index])) {
                    r = d[1];
                    break;
                  }
                  b += C;
                }
                r = B(r, 0);
                r = g.translate(r, 0, 1, 0, 1);
                p.push({
                  isNull: !0,
                  plotX: h.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: r,
                  yBottom: r,
                });
              }
            });
          }
          return p;
        }
      }
      t.defaultOptions = D(u.defaultOptions, {
        threshold: 0,
        legendSymbol: "rectangle",
      });
      G(t.prototype, { singleStacks: !1 });
      A.registerSeriesType("area", t);
      ("");
      return t;
    }
  );
  L(
    a,
    "Series/Spline/SplineSeries.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, A) {
      const { line: u } = a.seriesTypes,
        { merge: K, pick: G } = A;
      class D extends u {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        getPointSpline(a, u, t) {
          const q = u.plotX || 0,
            m = u.plotY || 0,
            p = a[t - 1];
          t = a[t + 1];
          let n, h;
          let g;
          if (
            p &&
            !p.isNull &&
            !1 !== p.doCurve &&
            !u.isCliff &&
            t &&
            !t.isNull &&
            !1 !== t.doCurve &&
            !u.isCliff
          ) {
            a = p.plotY || 0;
            var e = t.plotX || 0;
            t = t.plotY || 0;
            let x = 0;
            n = (1.5 * q + (p.plotX || 0)) / 2.5;
            h = (1.5 * m + a) / 2.5;
            e = (1.5 * q + e) / 2.5;
            g = (1.5 * m + t) / 2.5;
            e !== n && (x = ((g - h) * (e - q)) / (e - n) + m - g);
            h += x;
            g += x;
            h > a && h > m
              ? ((h = Math.max(a, m)), (g = 2 * m - h))
              : h < a && h < m && ((h = Math.min(a, m)), (g = 2 * m - h));
            g > t && g > m
              ? ((g = Math.max(t, m)), (h = 2 * m - g))
              : g < t && g < m && ((g = Math.min(t, m)), (h = 2 * m - g));
            u.rightContX = e;
            u.rightContY = g;
          }
          u = [
            "C",
            G(p.rightContX, p.plotX, 0),
            G(p.rightContY, p.plotY, 0),
            G(n, q, 0),
            G(h, m, 0),
            q,
            m,
          ];
          p.rightContX = p.rightContY = void 0;
          return u;
        }
      }
      D.defaultOptions = K(u.defaultOptions);
      a.registerSeriesType("spline", D);
      ("");
      return D;
    }
  );
  L(
    a,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      a["Series/Spline/SplineSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const {
          area: u,
          area: { prototype: G },
        } = A.seriesTypes,
        { extend: D, merge: E } = J;
      class B extends a {
        constructor() {
          super(...arguments);
          this.options = this.points = this.data = void 0;
        }
      }
      B.defaultOptions = E(a.defaultOptions, u.defaultOptions);
      D(B.prototype, {
        getGraphPath: G.getGraphPath,
        getStackPoints: G.getStackPoints,
        drawGraph: G.drawGraph,
      });
      A.registerSeriesType("areaspline", B);
      ("");
      return B;
    }
  );
  L(a, "Series/Column/ColumnSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 3,
      centerInCategory: !1,
      groupPadding: 0.2,
      marker: null,
      pointPadding: 0.1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: { halo: !1, brightness: 0.1 },
        select: { color: "#cccccc", borderColor: "#000000" },
      },
      dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: { distance: 6 },
      threshold: 0,
      borderColor: "#ffffff",
    };
  });
  L(
    a,
    "Series/Column/ColumnSeries.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Series/Column/ColumnSeriesDefaults.js"],
      a["Core/Globals.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E) {
      const { animObject: u } = a,
        { parse: t } = A,
        { hasTouch: q, noop: m } = K,
        {
          clamp: p,
          defined: n,
          extend: h,
          fireEvent: g,
          isArray: e,
          isNumber: x,
          merge: I,
          pick: M,
          objectEach: C,
        } = E;
      class f extends G {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.group =
            this.data =
            this.borderWidth =
              void 0;
        }
        animate(a) {
          const f = this,
            e = this.yAxis,
            g = e.pos,
            d = f.options,
            b = this.chart.inverted,
            c = {},
            k = b ? "translateX" : "translateY";
          let n;
          a
            ? ((c.scaleY = 0.001),
              (a = p(e.toPixels(d.threshold), g, g + e.len)),
              b ? (c.translateX = a - e.len) : (c.translateY = a),
              f.clipBox && f.setClip(),
              f.group.attr(c))
            : ((n = Number(f.group.attr(k))),
              f.group.animate(
                { scaleY: 1 },
                h(u(f.options.animation), {
                  step: function (b, a) {
                    f.group && ((c[k] = n + a.pos * (g - n)), f.group.attr(c));
                  },
                })
              ));
        }
        init(a, f) {
          super.init.apply(this, arguments);
          const e = this;
          a = e.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === e.type && (a.isDirty = !0);
            });
        }
        getColumnMetrics() {
          const a = this;
          var f = a.options;
          const e = a.xAxis,
            g = a.yAxis;
          var d = e.options.reversedStacks;
          d = (e.reversed && !d) || (!e.reversed && d);
          const b = {};
          let c,
            k = 0;
          !1 === f.grouping
            ? (k = 1)
            : a.chart.series.forEach(function (d) {
                const f = d.yAxis,
                  e = d.options;
                let l;
                d.type !== a.type ||
                  (!d.visible && a.chart.options.chart.ignoreHiddenSeries) ||
                  g.len !== f.len ||
                  g.pos !== f.pos ||
                  (e.stacking && "group" !== e.stacking
                    ? ((c = d.stackKey),
                      "undefined" === typeof b[c] && (b[c] = k++),
                      (l = b[c]))
                    : !1 !== e.grouping && (l = k++),
                  (d.columnIndex = l));
              });
          const h = Math.min(
              Math.abs(e.transA) *
                ((e.ordinal && e.ordinal.slope) ||
                  f.pointRange ||
                  e.closestPointRange ||
                  e.tickInterval ||
                  1),
              e.len
            ),
            n = h * f.groupPadding,
            m = (h - 2 * n) / (k || 1);
          f = Math.min(
            f.maxPointWidth || e.len,
            M(f.pointWidth, m * (1 - 2 * f.pointPadding))
          );
          a.columnMetrics = {
            width: f,
            offset:
              (m - f) / 2 +
              (n + ((a.columnIndex || 0) + (d ? 1 : 0)) * m - h / 2) *
                (d ? -1 : 1),
            paddedWidth: m,
            columnCount: k,
          };
          return a.columnMetrics;
        }
        crispCol(a, f, e, g) {
          var d = this.borderWidth,
            b = -(d % 2 ? 0.5 : 0);
          d = d % 2 ? 0.5 : 1;
          this.options.crisp &&
            ((e = Math.round(a + e) + b), (a = Math.round(a) + b), (e -= a));
          g = Math.round(f + g) + d;
          b = 0.5 >= Math.abs(f) && 0.5 < g;
          f = Math.round(f) + d;
          g -= f;
          b && g && (--f, (g += 1));
          return { x: a, y: f, width: e, height: g };
        }
        adjustForMissingColumns(a, f, l, g) {
          const d = this.options.stacking;
          if (!l.isNull && 1 < g.columnCount) {
            const b = this.yAxis.options.reversedStacks;
            let c = 0,
              k = b ? 0 : -g.columnCount;
            C(this.yAxis.stacking && this.yAxis.stacking.stacks, (a) => {
              if ("number" === typeof l.x) {
                const f = a[l.x.toString()];
                f &&
                  ((a = f.points[this.index]),
                  d
                    ? (a && (c = k), f.hasValidPoints && (b ? k++ : k--))
                    : e(a) &&
                      ((a = Object.keys(f.points)
                        .filter(
                          (b) =>
                            !b.match(",") &&
                            f.points[b] &&
                            1 < f.points[b].length
                        )
                        .map(parseFloat)
                        .sort((b, a) => a - b)),
                      (c = a.indexOf(this.index)),
                      (k = a.length)));
              }
            });
            a =
              (l.plotX || 0) +
              ((k - 1) * g.paddedWidth + f) / 2 -
              f -
              c * g.paddedWidth;
          }
          return a;
        }
        translate() {
          const a = this,
            f = a.chart,
            e = a.options;
          var h = (a.dense = 2 > a.closestPointRange * a.xAxis.transA);
          h = a.borderWidth = M(e.borderWidth, h ? 0 : 1);
          const d = a.xAxis,
            b = a.yAxis,
            c = e.threshold,
            k = M(e.minPointLength, 5),
            m = a.getColumnMetrics(),
            z = m.width,
            q = (a.pointXOffset = m.offset),
            t = a.dataMin,
            u = a.dataMax;
          let I = (a.barW = Math.max(z, 1 + 2 * h)),
            C = (a.translatedThreshold = b.getThreshold(c));
          f.inverted && (C -= 0.5);
          e.pointPadding && (I = Math.ceil(I));
          G.prototype.translate.apply(a);
          a.points.forEach(function (l) {
            const g = M(l.yBottom, C);
            var h = 999 + Math.abs(g),
              w = l.plotX || 0;
            h = p(l.plotY, -h, b.len + h);
            let r = Math.min(h, g),
              v = Math.max(h, g) - r,
              F = z,
              y = w + q,
              O = I;
            k &&
              Math.abs(v) < k &&
              ((v = k),
              (w = (!b.reversed && !l.negative) || (b.reversed && l.negative)),
              x(c) &&
                x(u) &&
                l.y === c &&
                u <= c &&
                (b.min || 0) < c &&
                (t !== u || (b.max || 0) <= c) &&
                ((w = !w), (l.negative = !l.negative)),
              (r = Math.abs(r - C) > k ? g - k : C - (w ? k : 0)));
            n(l.options.pointWidth) &&
              ((F = O = Math.ceil(l.options.pointWidth)),
              (y -= Math.round((F - z) / 2)));
            e.centerInCategory && (y = a.adjustForMissingColumns(y, F, l, m));
            l.barX = y;
            l.pointWidth = F;
            l.tooltipPos = f.inverted
              ? [
                  p(
                    b.len + b.pos - f.plotLeft - h,
                    b.pos - f.plotLeft,
                    b.len + b.pos - f.plotLeft
                  ),
                  d.len + d.pos - f.plotTop - y - O / 2,
                  v,
                ]
              : [
                  d.left - f.plotLeft + y + O / 2,
                  p(
                    h + b.pos - f.plotTop,
                    b.pos - f.plotTop,
                    b.len + b.pos - f.plotTop
                  ),
                  v,
                ];
            l.shapeType = a.pointClass.prototype.shapeType || "roundedRect";
            l.shapeArgs = a.crispCol(y, l.isNull ? C : r, O, l.isNull ? 0 : v);
          });
          g(this, "afterColumnTranslate");
        }
        drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        }
        pointAttribs(a, f) {
          const e = this.options;
          var g = this.pointAttrToOptions || {},
            d = g.stroke || "borderColor";
          const b = g["stroke-width"] || "borderWidth";
          let c,
            k = (a && a.color) || this.color,
            h = (a && a[d]) || e[d] || k;
          g = (a && a.options.dashStyle) || e.dashStyle;
          let n = (a && a[b]) || e[b] || this[b] || 0,
            m = M(a && a.opacity, e.opacity, 1);
          a &&
            this.zones.length &&
            ((c = a.getZone()),
            (k =
              a.options.color ||
              (c && (c.color || a.nonZonedColor)) ||
              this.color),
            c &&
              ((h = c.borderColor || h),
              (g = c.dashStyle || g),
              (n = c.borderWidth || n)));
          f &&
            a &&
            ((a = I(
              e.states[f],
              (a.options.states && a.options.states[f]) || {}
            )),
            (f = a.brightness),
            (k =
              a.color ||
              ("undefined" !== typeof f && t(k).brighten(a.brightness).get()) ||
              k),
            (h = a[d] || h),
            (n = a[b] || n),
            (g = a.dashStyle || g),
            (m = M(a.opacity, m)));
          d = { fill: k, stroke: h, "stroke-width": n, opacity: m };
          g && (d.dashstyle = g);
          return d;
        }
        drawPoints(a = this.points) {
          const f = this,
            e = this.chart,
            g = f.options,
            d = e.renderer,
            b = g.animationLimit || 250;
          let c;
          a.forEach(function (a) {
            let k = a.graphic,
              l = !!k,
              h = k && e.pointCount < b ? "animate" : "attr";
            if (x(a.plotY) && null !== a.y) {
              c = a.shapeArgs;
              k && a.hasNewShapeType() && (k = k.destroy());
              f.enabledDataSorting &&
                (a.startXPos = f.xAxis.reversed
                  ? -(c ? c.width || 0 : 0)
                  : f.xAxis.width);
              k ||
                ((a.graphic = k = d[a.shapeType](c).add(a.group || f.group)) &&
                  f.enabledDataSorting &&
                  e.hasRendered &&
                  e.pointCount < b &&
                  (k.attr({ x: a.startXPos }), (l = !0), (h = "animate")));
              if (k && l) k[h](I(c));
              e.styledMode ||
                k[h](f.pointAttribs(a, a.selected && "select")).shadow(
                  !1 !== a.allowShadow && g.shadow
                );
              k &&
                (k.addClass(a.getClassName(), !0),
                k.attr({ visibility: a.visible ? "inherit" : "hidden" }));
            } else k && (a.graphic = k.destroy());
          });
        }
        drawTracker(a = this.points) {
          const f = this,
            l = f.chart,
            h = l.pointer,
            d = function (b) {
              const a = h.getPointFromEvent(b);
              "undefined" !== typeof a &&
                f.options.enableMouseTracking &&
                ((h.isDirectTouch = !0), a.onMouseOver(b));
            };
          let b;
          a.forEach(function (a) {
            b = e(a.dataLabels)
              ? a.dataLabels
              : a.dataLabel
              ? [a.dataLabel]
              : [];
            a.graphic && (a.graphic.element.point = a);
            b.forEach(function (b) {
              b.div ? (b.div.point = a) : (b.element.point = a);
            });
          });
          f._hasTracking ||
            (f.trackerGroups.forEach(function (b) {
              if (f[b]) {
                f[b]
                  .addClass("highcharts-tracker")
                  .on("mouseover", d)
                  .on("mouseout", function (b) {
                    h.onTrackerMouseOut(b);
                  });
                if (q) f[b].on("touchstart", d);
                !l.styledMode &&
                  f.options.cursor &&
                  f[b].css({ cursor: f.options.cursor });
              }
            }),
            (f._hasTracking = !0));
          g(this, "afterDrawTracker");
        }
        remove() {
          const a = this,
            f = a.chart;
          f.hasRendered &&
            f.series.forEach(function (f) {
              f.type === a.type && (f.isDirty = !0);
            });
          G.prototype.remove.apply(a, arguments);
        }
      }
      f.defaultOptions = I(G.defaultOptions, J);
      h(f.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        getSymbol: m,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      D.registerSeriesType("column", f);
      ("");
      return f;
    }
  );
  L(
    a,
    "Core/Series/DataLabel.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Templating.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { getDeferredAnimation: u } = a,
        { format: G } = A,
        {
          defined: D,
          extend: E,
          fireEvent: B,
          isArray: t,
          isString: q,
          merge: m,
          objectEach: p,
          pick: n,
          splat: h,
        } = J;
      var g;
      (function (a) {
        function e(a, b, c, f, e) {
          const d = this.chart;
          var k = this.isCartesian && d.inverted;
          const g = this.enabledDataSorting;
          var l = a.plotX,
            h = a.plotY;
          const m = c.rotation;
          var w = c.align;
          h =
            D(l) &&
            D(h) &&
            d.isInsidePlot(l, Math.round(h), {
              inverted: k,
              paneCoordinates: !0,
              series: this,
            });
          let r = "justify" === n(c.overflow, g ? "none" : "justify");
          k =
            this.visible &&
            !1 !== a.visible &&
            D(l) &&
            (a.series.forceDL ||
              (g && !r) ||
              h ||
              (n(c.inside, !!this.options.stacking) &&
                f &&
                d.isInsidePlot(l, k ? f.x + 1 : f.y + f.height - 1, {
                  inverted: k,
                  paneCoordinates: !0,
                  series: this,
                })));
          l = a.pos();
          if (k && l) {
            m && b.attr({ align: w });
            w = b.getBBox(!0);
            var v = [0, 0];
            var p = d.renderer.fontMetrics(b).b;
            f = E({ x: l[0], y: Math.round(l[1]), width: 0, height: 0 }, f);
            E(c, { width: w.width, height: w.height });
            m
              ? ((r = !1),
                (v = d.renderer.rotCorr(p, m)),
                (p = {
                  x: f.x + (c.x || 0) + f.width / 2 + v.x,
                  y:
                    f.y +
                    (c.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[c.verticalAlign] *
                      f.height,
                }),
                (v = [w.x - Number(b.attr("x")), w.y - Number(b.attr("y"))]),
                g &&
                  this.xAxis &&
                  !r &&
                  this.setDataLabelStartPos(a, b, e, h, p),
                b[e ? "attr" : "animate"](p))
              : (g &&
                  this.xAxis &&
                  !r &&
                  this.setDataLabelStartPos(a, b, e, h, f),
                b.align(c, void 0, f),
                (p = b.alignAttr));
            if (r && 0 <= f.height) this.justifyDataLabel(b, c, p, w, f, e);
            else if (n(c.crop, !0)) {
              let { x: b, y: a } = p;
              b += v[0];
              a += v[1];
              k =
                d.isInsidePlot(b, a, { paneCoordinates: !0, series: this }) &&
                d.isInsidePlot(b + w.width, a + w.height, {
                  paneCoordinates: !0,
                  series: this,
                });
            }
            if (c.shape && !m)
              b[e ? "attr" : "animate"]({ anchorX: l[0], anchorY: l[1] });
          }
          e && g && (b.placed = !1);
          k || (g && !r) ? b.show() : (b.hide(), (b.placed = !1));
        }
        function g(a, b) {
          var c = b.filter;
          return c
            ? ((b = c.operator),
              (a = a[c.property]),
              (c = c.value),
              (">" === b && a > c) ||
              ("<" === b && a < c) ||
              (">=" === b && a >= c) ||
              ("<=" === b && a <= c) ||
              ("==" === b && a == c) ||
              ("===" === b && a === c)
                ? !0
                : !1)
            : !0;
        }
        function M() {
          return this.plotGroup(
            "dataLabelsGroup",
            "data-labels",
            this.hasRendered ? "inherit" : "hidden",
            this.options.dataLabels.zIndex || 6
          );
        }
        function C(a) {
          const b = this.hasRendered || 0,
            c = this.initDataLabelsGroup().attr({ opacity: +b });
          !b &&
            c &&
            (this.visible && c.show(),
            this.options.animation
              ? c.animate({ opacity: 1 }, a)
              : c.attr({ opacity: 1 }));
          return c;
        }
        function f(a = this.points) {
          var b, c;
          const d = this,
            f = d.chart,
            e = d.options,
            l = f.renderer,
            { backgroundColor: m, plotBackgroundColor: v } = f.options.chart,
            x = f.options.plotOptions,
            y = l.getContrast((q(v) && v) || (q(m) && m) || "#000000");
          let I = e.dataLabels,
            C,
            M;
          var A = h(I)[0];
          const E = A.animation;
          A = A.defer ? u(f, E, d) : { defer: 0, duration: 0 };
          I = r(
            r(
              null === (b = null === x || void 0 === x ? void 0 : x.series) ||
                void 0 === b
                ? void 0
                : b.dataLabels,
              null === (c = null === x || void 0 === x ? void 0 : x[d.type]) ||
                void 0 === c
                ? void 0
                : c.dataLabels
            ),
            I
          );
          B(this, "drawDataLabels");
          if (t(I) || I.enabled || d._hasPointLabels)
            (M = this.initDataLabels(A)),
              a.forEach((b) => {
                var a;
                const c = b.dataLabels || [];
                C = h(
                  r(
                    I,
                    b.dlOptions ||
                      (null === (a = b.options) || void 0 === a
                        ? void 0
                        : a.dataLabels)
                  )
                );
                C.forEach((a, k) => {
                  var h,
                    m =
                      a.enabled && (!b.isNull || b.dataLabelOnNull) && g(b, a);
                  const w = b.connectors ? b.connectors[k] : b.connector,
                    r = a.style || {};
                  let v = {},
                    z = c[k],
                    x = !z;
                  const F = n(a.distance, b.labelDistance);
                  if (m) {
                    var t = n(a[b.formatPrefix + "Format"], a.format);
                    var u = b.getLabelConfig();
                    u = D(t)
                      ? G(t, u, f)
                      : (a[b.formatPrefix + "Formatter"] || a.formatter).call(
                          u,
                          a
                        );
                    t = a.rotation;
                    f.styledMode ||
                      ((r.color = n(
                        a.color,
                        r.color,
                        q(d.color) ? d.color : void 0,
                        "#000000"
                      )),
                      "contrast" === r.color
                        ? ((b.contrastColor = l.getContrast(
                            b.color || d.color
                          )),
                          (r.color =
                            (!D(F) && a.inside) || 0 > (F || 0) || e.stacking
                              ? b.contrastColor
                              : y))
                        : delete b.contrastColor,
                      e.cursor && (r.cursor = e.cursor));
                    v = {
                      r: a.borderRadius || 0,
                      rotation: t,
                      padding: a.padding,
                      zIndex: 1,
                    };
                    if (!f.styledMode) {
                      const { backgroundColor: c, borderColor: d } = a;
                      v.fill = "auto" === c ? b.color : c;
                      v.stroke = "auto" === d ? b.color : d;
                      v["stroke-width"] = a.borderWidth;
                    }
                    p(v, (b, a) => {
                      "undefined" === typeof b && delete v[a];
                    });
                  }
                  !z ||
                    (m &&
                      D(u) &&
                      !!z.div === !!a.useHTML &&
                      ((z.rotation && a.rotation) ||
                        z.rotation === a.rotation)) ||
                    ((z = void 0),
                    (x = !0),
                    w &&
                      b.connector &&
                      ((b.connector = b.connector.destroy()),
                      b.connectors &&
                        (1 === b.connectors.length
                          ? delete b.connectors
                          : delete b.connectors[k])));
                  m &&
                    D(u) &&
                    (z
                      ? (v.text = u)
                      : (z = t
                          ? l
                              .text(u, 0, 0, a.useHTML)
                              .addClass("highcharts-data-label")
                          : l.label(
                              u,
                              0,
                              0,
                              a.shape,
                              void 0,
                              void 0,
                              a.useHTML,
                              void 0,
                              "data-label"
                            )) &&
                        z.addClass(
                          " highcharts-data-label-color-" +
                            b.colorIndex +
                            " " +
                            (a.className || "") +
                            (a.useHTML ? " highcharts-tracker" : "")
                        ),
                    z &&
                      ((z.options = a),
                      z.attr(v),
                      f.styledMode || z.css(r).shadow(a.shadow),
                      (m = a[b.formatPrefix + "TextPath"] || a.textPath) &&
                        !a.useHTML &&
                        (z.setTextPath(
                          (null === (h = b.getDataLabelPath) || void 0 === h
                            ? void 0
                            : h.call(b, z)) || b.graphic,
                          m
                        ),
                        b.dataLabelPath &&
                          !m.enabled &&
                          (b.dataLabelPath = b.dataLabelPath.destroy())),
                      z.added || z.add(M),
                      d.alignDataLabel(b, z, a, void 0, x),
                      (z.isActive = !0),
                      c[k] && c[k] !== z && c[k].destroy(),
                      (c[k] = z)));
                });
                for (a = c.length; a--; )
                  c[a].isActive
                    ? (c[a].isActive = !1)
                    : (c[a].destroy(), c.splice(a, 1));
                b.dataLabel = c[0];
                b.dataLabels = c;
              });
          B(this, "afterDrawDataLabels");
        }
        function y(a, b, c, f, e, l) {
          const d = this.chart,
            k = b.align,
            g = b.verticalAlign,
            h = a.box ? 0 : a.padding || 0;
          let { x: n = 0, y: m = 0 } = b,
            w,
            r;
          w = (c.x || 0) + h;
          0 > w &&
            ("right" === k && 0 <= n
              ? ((b.align = "left"), (b.inside = !0))
              : (n -= w),
            (r = !0));
          w = (c.x || 0) + f.width - h;
          w > d.plotWidth &&
            ("left" === k && 0 >= n
              ? ((b.align = "right"), (b.inside = !0))
              : (n += d.plotWidth - w),
            (r = !0));
          w = c.y + h;
          0 > w &&
            ("bottom" === g && 0 <= m
              ? ((b.verticalAlign = "top"), (b.inside = !0))
              : (m -= w),
            (r = !0));
          w = (c.y || 0) + f.height - h;
          w > d.plotHeight &&
            ("top" === g && 0 >= m
              ? ((b.verticalAlign = "bottom"), (b.inside = !0))
              : (m += d.plotHeight - w),
            (r = !0));
          r && ((b.x = n), (b.y = m), (a.placed = !l), a.align(b, void 0, e));
          return r;
        }
        function r(a, b) {
          let c = [],
            d;
          if (t(a) && !t(b))
            c = a.map(function (a) {
              return m(a, b);
            });
          else if (t(b) && !t(a))
            c = b.map(function (b) {
              return m(a, b);
            });
          else if (!t(a) && !t(b)) c = m(a, b);
          else if (t(a) && t(b))
            for (d = Math.max(a.length, b.length); d--; ) c[d] = m(a[d], b[d]);
          return c;
        }
        function l(a, b, c, f, e) {
          const d = this.chart,
            k = d.inverted,
            l = this.xAxis,
            g = l.reversed,
            h = k ? b.height / 2 : b.width / 2;
          a = (a = a.pointWidth) ? a / 2 : 0;
          b.startXPos = k ? e.x : g ? -h - a : l.width - h + a;
          b.startYPos = k ? (g ? this.yAxis.height - h + a : -h - a) : e.y;
          f
            ? "hidden" === b.visibility &&
              (b.show(), b.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : b.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, b.hide);
          d.hasRendered &&
            (c && b.attr({ x: b.startXPos, y: b.startYPos }), (b.placed = !0));
        }
        const v = [];
        a.compose = function (a) {
          J.pushUnique(v, a) &&
            ((a = a.prototype),
            (a.initDataLabelsGroup = M),
            (a.initDataLabels = C),
            (a.alignDataLabel = e),
            (a.drawDataLabels = f),
            (a.justifyDataLabel = y),
            (a.setDataLabelStartPos = l));
        };
      })(g || (g = {}));
      ("");
      return g;
    }
  );
  L(
    a,
    "Series/Column/ColumnDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { series: u } = A,
        { merge: G, pick: D } = J;
      var E;
      (function (B) {
        function t(a, p, n, h, g) {
          let e = this.chart.inverted;
          var m = a.series;
          let q = (m.xAxis ? m.xAxis.len : this.chart.plotSizeX) || 0;
          m = (m.yAxis ? m.yAxis.len : this.chart.plotSizeY) || 0;
          var t = a.dlBox || a.shapeArgs;
          let C = D(a.below, a.plotY > D(this.translatedThreshold, m)),
            f = D(n.inside, !!this.options.stacking);
          t &&
            ((h = G(t)),
            0 > h.y && ((h.height += h.y), (h.y = 0)),
            (t = h.y + h.height - m),
            0 < t && t < h.height && (h.height -= t),
            e &&
              (h = {
                x: m - h.y - h.height,
                y: q - h.x - h.width,
                width: h.height,
                height: h.width,
              }),
            f ||
              (e
                ? ((h.x += C ? 0 : h.width), (h.width = 0))
                : ((h.y += C ? h.height : 0), (h.height = 0))));
          n.align = D(n.align, !e || f ? "center" : C ? "right" : "left");
          n.verticalAlign = D(
            n.verticalAlign,
            e || f ? "middle" : C ? "top" : "bottom"
          );
          u.prototype.alignDataLabel.call(this, a, p, n, h, g);
          n.inside && a.contrastColor && p.css({ color: a.contrastColor });
        }
        const q = [];
        B.compose = function (m) {
          a.compose(u);
          J.pushUnique(q, m) && (m.prototype.alignDataLabel = t);
        };
      })(E || (E = {}));
      return E;
    }
  );
  L(
    a,
    "Series/Bar/BarSeries.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { extend: u, merge: G } = J;
      class D extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
      }
      D.defaultOptions = G(a.defaultOptions, {});
      u(D.prototype, { inverted: !0 });
      A.registerSeriesType("bar", D);
      ("");
      return D;
    }
  );
  L(a, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 0,
      findNearestPointBy: "xy",
      jitter: { x: 0, y: 0 },
      marker: { enabled: !0 },
      tooltip: {
        headerFormat:
          '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.8em"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
      },
    };
  });
  L(
    a,
    "Series/Scatter/ScatterSeries.js",
    [
      a["Series/Scatter/ScatterSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { column: u, line: G } = A.seriesTypes,
        { addEvent: D, extend: E, merge: B } = J;
      class t extends G {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        applyJitter() {
          const a = this,
            m = this.options.jitter,
            p = this.points.length;
          m &&
            this.points.forEach(function (n, h) {
              ["x", "y"].forEach(function (g, e) {
                let q = "plot" + g.toUpperCase(),
                  t,
                  u;
                if (m[g] && !n.isNull) {
                  var C = a[g + "Axis"];
                  u = m[g] * C.transA;
                  C &&
                    !C.isLog &&
                    ((t = Math.max(0, n[q] - u)),
                    (C = Math.min(C.len, n[q] + u)),
                    (e = 1e4 * Math.sin(h + e * p)),
                    (e -= Math.floor(e)),
                    (n[q] = t + (C - t) * e),
                    "x" === g && (n.clientX = n.plotX));
                }
              });
            });
        }
        drawGraph() {
          this.options.lineWidth
            ? super.drawGraph()
            : this.graph && (this.graph = this.graph.destroy());
        }
      }
      t.defaultOptions = B(G.defaultOptions, a);
      E(t.prototype, {
        drawTracker: u.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      D(t, "afterTranslate", function () {
        this.applyJitter();
      });
      A.registerSeriesType("scatter", t);
      return t;
    }
  );
  L(
    a,
    "Series/CenteredUtilities.js",
    [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]],
    function (a, A, J) {
      const { deg2rad: u } = a,
        { fireEvent: G, isNumber: D, pick: E, relativeLength: B } = J;
      var t;
      (function (a) {
        a.getCenter = function () {
          var a = this.options,
            p = this.chart;
          const n = 2 * (a.slicedOffset || 0),
            h = p.plotWidth - 2 * n,
            g = p.plotHeight - 2 * n;
          var e = a.center;
          const q = Math.min(h, g),
            t = a.thickness;
          var u = a.size;
          let C = a.innerSize || 0;
          "string" === typeof u && (u = parseFloat(u));
          "string" === typeof C && (C = parseFloat(C));
          a = [
            E(e[0], "50%"),
            E(e[1], "50%"),
            E(u && 0 > u ? void 0 : a.size, "100%"),
            E(C && 0 > C ? void 0 : a.innerSize || 0, "0%"),
          ];
          !p.angular || this instanceof A || (a[3] = 0);
          for (e = 0; 4 > e; ++e)
            (u = a[e]),
              (p = 2 > e || (2 === e && /%$/.test(u))),
              (a[e] = B(u, [h, g, q, a[2]][e]) + (p ? n : 0));
          a[3] > a[2] && (a[3] = a[2]);
          D(t) && 2 * t < a[2] && 0 < t && (a[3] = a[2] - 2 * t);
          G(this, "afterGetCenter", { positions: a });
          return a;
        };
        a.getStartAndEndRadians = function (a, p) {
          a = D(a) ? a : 0;
          p = D(p) && p > a && 360 > p - a ? p : a + 360;
          return { start: u * (a + -90), end: u * (p + -90) };
        };
      })(t || (t = {}));
      ("");
      return t;
    }
  );
  L(
    a,
    "Series/Pie/PiePoint.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { setAnimation: u } = a,
        {
          addEvent: G,
          defined: D,
          extend: E,
          isNumber: B,
          pick: t,
          relativeLength: q,
        } = J;
      class m extends A {
        constructor() {
          super(...arguments);
          this.series = this.options = this.labelDistance = void 0;
        }
        getConnectorPath() {
          const a = this.labelPosition,
            n = this.series.options.dataLabels,
            h = this.connectorShapes;
          let g = n.connectorShape;
          h[g] && (g = h[g]);
          return g.call(
            this,
            { x: a.computed.x, y: a.computed.y, alignment: a.alignment },
            a.connectorPosition,
            n
          );
        }
        getTranslate() {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        }
        haloPath(a) {
          const n = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                n.x,
                n.y,
                n.r + a,
                n.r + a,
                {
                  innerR: n.r - 1,
                  start: n.start,
                  end: n.end,
                  borderRadius: n.borderRadius,
                }
              );
        }
        init() {
          super.init.apply(this, arguments);
          this.name = t(this.name, "Slice");
          const a = (a) => {
            this.slice("select" === a.type);
          };
          G(this, "select", a);
          G(this, "unselect", a);
          return this;
        }
        isValid() {
          return B(this.y) && 0 <= this.y;
        }
        setVisible(a, n) {
          const h = this.series,
            g = h.chart,
            e = h.options.ignoreHiddenPoint;
          n = t(n, e);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                "undefined" === typeof a ? !this.visible : a),
            (h.options.data[h.data.indexOf(this)] = this.options),
            ["graphic", "dataLabel", "connector"].forEach((e) => {
              if (this[e]) this[e][a ? "show" : "hide"](a);
            }),
            this.legendItem && g.legend.colorizeItem(this, a),
            a || "hover" !== this.state || this.setState(""),
            e && (h.isDirty = !0),
            n && g.redraw());
        }
        slice(a, n, h) {
          const g = this.series;
          u(h, g.chart);
          t(n, !0);
          this.sliced = this.options.sliced = D(a) ? a : !this.sliced;
          g.options.data[g.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
        }
      }
      E(m.prototype, {
        connectorShapes: {
          fixedOffset: function (a, n, h) {
            const g = n.breakAt;
            n = n.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              h.softConnector
                ? [
                    "C",
                    a.x + ("left" === a.alignment ? -5 : 5),
                    a.y,
                    2 * g.x - n.x,
                    2 * g.y - n.y,
                    g.x,
                    g.y,
                  ]
                : ["L", g.x, g.y],
              ["L", n.x, n.y],
            ];
          },
          straight: function (a, n) {
            n = n.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              ["L", n.x, n.y],
            ];
          },
          crookedLine: function (a, n, h) {
            const { breakAt: g, touchingSliceAt: e } = n;
            ({ series: n } = this);
            const [m, p, t] = n.center,
              u = t / 2,
              f = n.chart.plotWidth,
              y = n.chart.plotLeft;
            n = "left" === a.alignment;
            const { x: r, y: l } = a;
            h.crookDistance
              ? ((a = q(h.crookDistance, 1)),
                (a = n ? m + u + (f + y - m - u) * (1 - a) : y + (m - u) * a))
              : (a = m + (p - l) * Math.tan((this.angle || 0) - Math.PI / 2));
            h = [["M", r, l]];
            (n ? a <= r && a >= g.x : a >= r && a <= g.x) &&
              h.push(["L", a, l]);
            h.push(["L", g.x, g.y], ["L", e.x, e.y]);
            return h;
          },
        },
      });
      return m;
    }
  );
  L(a, "Series/Pie/PieSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 3,
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0,
        connectorPadding: 5,
        connectorShape: "crookedLine",
        crookDistance: void 0,
        distance: 30,
        enabled: !0,
        formatter: function () {
          return this.point.isNull ? void 0 : this.point.name;
        },
        softConnector: !0,
        x: 0,
      },
      fillColor: void 0,
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: { followPointer: !0 },
      borderColor: "#ffffff",
      borderWidth: 1,
      lineWidth: void 0,
      states: { hover: { brightness: 0.1 } },
    };
  });
  L(
    a,
    "Series/Pie/PieSeries.js",
    [
      a["Series/CenteredUtilities.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Core/Globals.js"],
      a["Series/Pie/PiePoint.js"],
      a["Series/Pie/PieSeriesDefaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E, B, t) {
      const { getStartAndEndRadians: q } = a;
      ({ noop: J } = J);
      const {
        clamp: m,
        extend: p,
        fireEvent: n,
        merge: h,
        pick: g,
        relativeLength: e,
      } = t;
      class x extends D {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.maxLabelDistance =
            this.data =
            this.center =
              void 0;
        }
        animate(a) {
          const e = this,
            h = e.points,
            f = e.startAngleRad;
          a ||
            h.forEach(function (a) {
              const h = a.graphic,
                l = a.shapeArgs;
              h &&
                l &&
                (h.attr({
                  r: g(a.startR, e.center && e.center[3] / 2),
                  start: f,
                  end: f,
                }),
                h.animate(
                  { r: l.r, start: l.start, end: l.end },
                  e.options.animation
                ));
            });
        }
        drawEmpty() {
          const a = this.startAngleRad,
            e = this.endAngleRad,
            g = this.options;
          let f, h;
          0 === this.total && this.center
            ? ((f = this.center[0]),
              (h = this.center[1]),
              this.graph ||
                (this.graph = this.chart.renderer
                  .arc(f, h, this.center[1] / 2, 0, a, e)
                  .addClass("highcharts-empty-series")
                  .add(this.group)),
              this.graph.attr({
                d: B.arc(f, h, this.center[2] / 2, 0, {
                  start: a,
                  end: e,
                  innerR: this.center[3] / 2,
                }),
              }),
              this.chart.styledMode ||
                this.graph.attr({
                  "stroke-width": g.borderWidth,
                  fill: g.fillColor || "none",
                  stroke: g.color || "#cccccc",
                }))
            : this.graph && (this.graph = this.graph.destroy());
        }
        drawPoints() {
          const a = this.chart.renderer;
          this.points.forEach(function (e) {
            e.graphic &&
              e.hasNewShapeType() &&
              (e.graphic = e.graphic.destroy());
            e.graphic ||
              ((e.graphic = a[e.shapeType](e.shapeArgs).add(e.series.group)),
              (e.delayedRendering = !0));
          });
        }
        generatePoints() {
          super.generatePoints();
          this.updateTotals();
        }
        getX(a, e, g) {
          const f = this.center,
            h = this.radii ? this.radii[g.index] || 0 : f[2] / 2;
          a = Math.asin(m((a - f[1]) / (h + g.labelDistance), -1, 1));
          return (
            f[0] +
            (e ? -1 : 1) * Math.cos(a) * (h + g.labelDistance) +
            (0 < g.labelDistance
              ? (e ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        }
        hasData() {
          return !!this.processedXData.length;
        }
        redrawPoints() {
          const a = this,
            e = a.chart;
          let g, f, n, m;
          this.drawEmpty();
          a.group && !e.styledMode && a.group.shadow(a.options.shadow);
          a.points.forEach(function (l) {
            const r = {};
            f = l.graphic;
            !l.isNull && f
              ? ((m = l.shapeArgs),
                (g = l.getTranslate()),
                e.styledMode || (n = a.pointAttribs(l, l.selected && "select")),
                l.delayedRendering
                  ? (f.setRadialReference(a.center).attr(m).attr(g),
                    e.styledMode ||
                      f.attr(n).attr({ "stroke-linejoin": "round" }),
                    (l.delayedRendering = !1))
                  : (f.setRadialReference(a.center),
                    e.styledMode || h(!0, r, n),
                    h(!0, r, m, g),
                    f.animate(r)),
                f.attr({ visibility: l.visible ? "inherit" : "hidden" }),
                f.addClass(l.getClassName(), !0))
              : f && (l.graphic = f.destroy());
          });
        }
        sortByAngle(a, e) {
          a.sort(function (a, f) {
            return "undefined" !== typeof a.angle && (f.angle - a.angle) * e;
          });
        }
        translate(a) {
          n(this, "translate");
          this.generatePoints();
          var h = this.options;
          const m = h.slicedOffset,
            f = m + (h.borderWidth || 0);
          var p = q(h.startAngle, h.endAngle);
          const r = (this.startAngleRad = p.start);
          p = (this.endAngleRad = p.end) - r;
          const l = this.points,
            v = h.dataLabels.distance;
          h = h.ignoreHiddenPoint;
          const d = l.length;
          let b,
            c,
            k,
            w = 0;
          a || (this.center = a = this.getCenter());
          for (c = 0; c < d; c++) {
            k = l[c];
            var z = r + w * p;
            !k.isValid() || (h && !k.visible) || (w += k.percentage / 100);
            var F = r + w * p;
            var x = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * z) / 1e3,
              end: Math.round(1e3 * F) / 1e3,
            };
            k.shapeType = "arc";
            k.shapeArgs = x;
            k.labelDistance = g(
              k.options.dataLabels && k.options.dataLabels.distance,
              v
            );
            k.labelDistance = e(k.labelDistance, x.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              k.labelDistance
            );
            F = (F + z) / 2;
            F > 1.5 * Math.PI
              ? (F -= 2 * Math.PI)
              : F < -Math.PI / 2 && (F += 2 * Math.PI);
            k.slicedTranslation = {
              translateX: Math.round(Math.cos(F) * m),
              translateY: Math.round(Math.sin(F) * m),
            };
            x = (Math.cos(F) * a[2]) / 2;
            b = (Math.sin(F) * a[2]) / 2;
            k.tooltipPos = [a[0] + 0.7 * x, a[1] + 0.7 * b];
            k.half = F < -Math.PI / 2 || F > Math.PI / 2 ? 1 : 0;
            k.angle = F;
            z = Math.min(f, k.labelDistance / 5);
            k.labelPosition = {
              natural: {
                x: a[0] + x + Math.cos(F) * k.labelDistance,
                y: a[1] + b + Math.sin(F) * k.labelDistance,
              },
              computed: {},
              alignment:
                0 > k.labelDistance ? "center" : k.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + x + Math.cos(F) * z,
                  y: a[1] + b + Math.sin(F) * z,
                },
                touchingSliceAt: { x: a[0] + x, y: a[1] + b },
              },
            };
          }
          n(this, "afterTranslate");
        }
        updateTotals() {
          const a = this.points,
            e = a.length,
            g = this.options.ignoreHiddenPoint;
          let f,
            h,
            n = 0;
          for (f = 0; f < e; f++)
            (h = a[f]), !h.isValid() || (g && !h.visible) || (n += h.y);
          this.total = n;
          for (f = 0; f < e; f++)
            (h = a[f]),
              (h.percentage = 0 < n && (h.visible || !g) ? (h.y / n) * 100 : 0),
              (h.total = n);
        }
      }
      x.defaultOptions = h(D.defaultOptions, G);
      p(x.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawTracker: A.prototype.drawTracker,
        getCenter: a.getCenter,
        getSymbol: J,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: A.prototype.pointAttribs,
        pointClass: K,
        requireSorting: !1,
        searchPoint: J,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      E.registerSeriesType("pie", x);
      return x;
    }
  );
  L(
    a,
    "Series/Pie/PieDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G) {
      const { noop: u } = A,
        { distribute: E } = J,
        { series: B } = K,
        {
          arrayMax: t,
          clamp: q,
          defined: m,
          merge: p,
          pick: n,
          relativeLength: h,
        } = G;
      var g;
      (function (e) {
        function g() {
          const a = this,
            f = a.data,
            e = a.chart,
            g = a.options.dataLabels || {},
            d = g.connectorPadding,
            b = e.plotWidth,
            c = e.plotHeight,
            k = e.plotLeft,
            h = Math.round(e.chartWidth / 3),
            z = a.center,
            q = z[2] / 2,
            x = z[1],
            u = [[], []],
            C = [0, 0, 0, 0],
            I = a.dataLabelPositioners;
          let A, H, G, M, D, J, K, L, Q, R, V, S;
          a.visible &&
            (g.enabled || a._hasPointLabels) &&
            (f.forEach(function (b) {
              b.dataLabel &&
                b.visible &&
                b.dataLabel.shortened &&
                (b.dataLabel
                  .attr({ width: "auto" })
                  .css({ width: "auto", textOverflow: "clip" }),
                (b.dataLabel.shortened = !1));
            }),
            B.prototype.drawDataLabels.apply(a),
            f.forEach(function (b) {
              b.dataLabel &&
                (b.visible
                  ? (u[b.half].push(b),
                    (b.dataLabel._pos = null),
                    !m(g.style.width) &&
                      !m(
                        b.options.dataLabels &&
                          b.options.dataLabels.style &&
                          b.options.dataLabels.style.width
                      ) &&
                      b.dataLabel.getBBox().width > h &&
                      (b.dataLabel.css({ width: Math.round(0.7 * h) + "px" }),
                      (b.dataLabel.shortened = !0)))
                  : ((b.dataLabel = b.dataLabel.destroy()),
                    b.dataLabels &&
                      1 === b.dataLabels.length &&
                      delete b.dataLabels));
            }),
            u.forEach((f, l) => {
              const h = f.length,
                w = [];
              let r,
                v = 0;
              if (h) {
                a.sortByAngle(f, l - 0.5);
                if (0 < a.maxLabelDistance) {
                  var p = Math.max(0, x - q - a.maxLabelDistance);
                  r = Math.min(x + q + a.maxLabelDistance, e.plotHeight);
                  f.forEach(function (b) {
                    0 < b.labelDistance &&
                      b.dataLabel &&
                      ((b.top = Math.max(0, x - q - b.labelDistance)),
                      (b.bottom = Math.min(
                        x + q + b.labelDistance,
                        e.plotHeight
                      )),
                      (v = b.dataLabel.getBBox().height || 21),
                      (b.distributeBox = {
                        target: b.labelPosition.natural.y - b.top + v / 2,
                        size: v,
                        rank: b.y,
                      }),
                      w.push(b.distributeBox));
                  });
                  p = r + v - p;
                  E(w, p, p / 5);
                }
                for (V = 0; V < h; V++) {
                  A = f[V];
                  J = A.labelPosition;
                  M = A.dataLabel;
                  R = !1 === A.visible ? "hidden" : "inherit";
                  Q = p = J.natural.y;
                  w &&
                    m(A.distributeBox) &&
                    ("undefined" === typeof A.distributeBox.pos
                      ? (R = "hidden")
                      : ((K = A.distributeBox.size),
                        (Q = I.radialDistributionY(A))));
                  delete A.positionIndex;
                  if (g.justify) L = I.justify(A, q, z);
                  else
                    switch (g.alignTo) {
                      case "connectors":
                        L = I.alignToConnectors(f, l, b, k);
                        break;
                      case "plotEdges":
                        L = I.alignToPlotEdges(M, l, b, k);
                        break;
                      default:
                        L = I.radialDistributionX(a, A, Q, p);
                    }
                  M._attr = { visibility: R, align: J.alignment };
                  S = A.options.dataLabels || {};
                  M._pos = {
                    x:
                      L +
                      n(S.x, g.x) +
                      ({ left: d, right: -d }[J.alignment] || 0),
                    y: Q + n(S.y, g.y) - M.getBBox().height / 2,
                  };
                  J && ((J.computed.x = L), (J.computed.y = Q));
                  n(g.crop, !0) &&
                    ((D = M.getBBox().width),
                    (p = null),
                    L - D < d && 1 === l
                      ? ((p = Math.round(D - L + d)),
                        (C[3] = Math.max(p, C[3])))
                      : L + D > b - d &&
                        0 === l &&
                        ((p = Math.round(L + D - b + d)),
                        (C[1] = Math.max(p, C[1]))),
                    0 > Q - K / 2
                      ? (C[0] = Math.max(Math.round(-Q + K / 2), C[0]))
                      : Q + K / 2 > c &&
                        (C[2] = Math.max(Math.round(Q + K / 2 - c), C[2])),
                    (M.sideOverflow = p));
                }
              }
            }),
            0 === t(C) || this.verifyDataLabelOverflow(C)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (b) {
              S = p(g, b.options.dataLabels);
              if ((H = n(S.connectorWidth, 1))) {
                let c;
                G = b.connector;
                if (
                  (M = b.dataLabel) &&
                  M._pos &&
                  b.visible &&
                  0 < b.labelDistance
                ) {
                  R = M._attr.visibility;
                  if ((c = !G))
                    (b.connector = G =
                      e.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            b.colorIndex +
                            (b.className ? " " + b.className : "")
                        )
                        .add(a.dataLabelsGroup)),
                      e.styledMode ||
                        G.attr({
                          "stroke-width": H,
                          stroke: S.connectorColor || b.color || "#666666",
                        });
                  G[c ? "attr" : "animate"]({ d: b.getConnectorPath() });
                  G.attr("visibility", R);
                } else G && (b.connector = G.destroy());
              }
            }));
        }
        function I() {
          this.points.forEach(function (a) {
            let f = a.dataLabel,
              e;
            f &&
              a.visible &&
              ((e = f._pos)
                ? (f.sideOverflow &&
                    ((f._attr.width = Math.max(
                      f.getBBox().width - f.sideOverflow,
                      0
                    )),
                    f.css({
                      width: f._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (f.shortened = !0)),
                  f.attr(f._attr),
                  f[f.moved ? "animate" : "attr"](e),
                  (f.moved = !0))
                : f && f.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function A(a) {
          let f = this.center,
            e = this.options,
            g = e.center,
            d = e.minSize || 80,
            b,
            c = null !== e.size;
          c ||
            (null !== g[0]
              ? (b = Math.max(f[2] - Math.max(a[1], a[3]), d))
              : ((b = Math.max(f[2] - a[1] - a[3], d)),
                (f[0] += (a[3] - a[1]) / 2)),
            null !== g[1]
              ? (b = q(b, d, f[2] - Math.max(a[0], a[2])))
              : ((b = q(b, d, f[2] - a[0] - a[2])),
                (f[1] += (a[0] - a[2]) / 2)),
            b < f[2]
              ? ((f[2] = b),
                (f[3] = Math.min(
                  e.thickness
                    ? Math.max(0, b - 2 * e.thickness)
                    : Math.max(0, h(e.innerSize || 0, b)),
                  b
                )),
                this.translate(f),
                this.drawDataLabels && this.drawDataLabels())
              : (c = !0));
          return c;
        }
        const C = [],
          f = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, f, e, g) {
              return a.getX(
                e < f.top + 2 || e > f.bottom - 2 ? g : e,
                f.half,
                f
              );
            },
            justify: function (a, f, e) {
              return e[0] + (a.half ? -1 : 1) * (f + a.labelDistance);
            },
            alignToPlotEdges: function (a, f, e, g) {
              a = a.getBBox().width;
              return f ? a + g : e - a - g;
            },
            alignToConnectors: function (a, f, e, g) {
              let d = 0,
                b;
              a.forEach(function (a) {
                b = a.dataLabel.getBBox().width;
                b > d && (d = b);
              });
              return f ? d + g : e - d - g;
            },
          };
        e.compose = function (e) {
          a.compose(B);
          G.pushUnique(C, e) &&
            ((e = e.prototype),
            (e.dataLabelPositioners = f),
            (e.alignDataLabel = u),
            (e.drawDataLabels = g),
            (e.placeDataLabels = I),
            (e.verifyDataLabelOverflow = A));
        };
      })(g || (g = {}));
      return g;
    }
  );
  L(
    a,
    "Extensions/OverlappingDataLabels.js",
    [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]],
    function (a, A) {
      function u(a, m) {
        let p,
          n = !1;
        a &&
          ((p = a.newOpacity),
          a.oldOpacity !== p &&
            (a.alignAttr && a.placed
              ? (a[p ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden"
                ),
                (n = !0),
                (a.alignAttr.opacity = p),
                a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                  m.styledMode || a.css({ pointerEvents: p ? "auto" : "none" });
                }),
                G(m, "afterHideOverlappingLabel"))
              : a.attr({ opacity: p })),
          (a.isOld = !0));
        return n;
      }
      const {
        addEvent: K,
        fireEvent: G,
        isArray: D,
        isNumber: E,
        objectEach: B,
        pick: t,
      } = A;
      K(a, "render", function () {
        let a = this,
          m = [];
        (this.labelCollectors || []).forEach(function (a) {
          m = m.concat(a());
        });
        (this.yAxis || []).forEach(function (a) {
          a.stacking &&
            a.options.stackLabels &&
            !a.options.stackLabels.allowOverlap &&
            B(a.stacking.stacks, function (a) {
              B(a, function (a) {
                a.label && m.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (q) {
          var n = q.options.dataLabels;
          q.visible &&
            (!1 !== n.enabled || q._hasPointLabels) &&
            ((n = (h) =>
              h.forEach((g) => {
                g.visible &&
                  (D(g.dataLabels)
                    ? g.dataLabels
                    : g.dataLabel
                    ? [g.dataLabel]
                    : []
                  ).forEach(function (e) {
                    const h = e.options;
                    e.labelrank = t(
                      h.labelrank,
                      g.labelrank,
                      g.shapeArgs && g.shapeArgs.height
                    );
                    h.allowOverlap
                      ? ((e.oldOpacity = e.opacity),
                        (e.newOpacity = 1),
                        u(e, a))
                      : m.push(e);
                  });
              })),
            n(q.nodes || []),
            n(q.points));
        });
        this.hideOverlappingLabels(m);
      });
      a.prototype.hideOverlappingLabels = function (a) {
        let m = this,
          q = a.length,
          n = m.renderer;
        var h;
        let g;
        let e,
          x,
          t,
          A = !1;
        var C = function (a) {
          let f, e;
          var g;
          let h = a.box ? 0 : a.padding || 0,
            d = (g = 0),
            b,
            c;
          if (a && (!a.alignAttr || a.placed))
            return (
              (f = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }),
              (e = a.parentGroup),
              a.width ||
                ((g = a.getBBox()),
                (a.width = g.width),
                (a.height = g.height),
                (g = n.fontMetrics(a.element).h)),
              (b = a.width - 2 * h),
              (c = { left: "0", center: "0.5", right: "1" }[a.alignValue])
                ? (d = +c * b)
                : E(a.x) &&
                  Math.round(a.x) !== a.translateX &&
                  (d = a.x - a.translateX),
              {
                x: f.x + (e.translateX || 0) + h - (d || 0),
                y: f.y + (e.translateY || 0) + h - g,
                width: a.width - 2 * h,
                height: a.height - 2 * h,
              }
            );
        };
        for (g = 0; g < q; g++)
          if ((h = a[g]))
            (h.oldOpacity = h.opacity),
              (h.newOpacity = 1),
              (h.absoluteBox = C(h));
        a.sort(function (a, e) {
          return (e.labelrank || 0) - (a.labelrank || 0);
        });
        for (g = 0; g < q; g++)
          for (x = (C = a[g]) && C.absoluteBox, h = g + 1; h < q; ++h)
            (t = (e = a[h]) && e.absoluteBox),
              !x ||
                !t ||
                C === e ||
                0 === C.newOpacity ||
                0 === e.newOpacity ||
                "hidden" === C.visibility ||
                "hidden" === e.visibility ||
                t.x >= x.x + x.width ||
                t.x + t.width <= x.x ||
                t.y >= x.y + x.height ||
                t.y + t.height <= x.y ||
                ((C.labelrank < e.labelrank ? C : e).newOpacity = 0);
        a.forEach(function (a) {
          u(a, m) && (A = !0);
        });
        A && G(m, "afterHideAllOverlappingLabels");
      };
    }
  );
  L(
    a,
    "Extensions/BorderRadius.js",
    [
      a["Core/Defaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D) {
      const { defaultOptions: u } = a;
      ({ seriesTypes: a } = J);
      const {
          addEvent: B,
          extend: t,
          isObject: q,
          merge: m,
          relativeLength: p,
        } = D,
        n = { radius: 0, scope: "stack", where: void 0 },
        h = (a, e) => {
          q(a) || (a = { radius: a || 0 });
          return m(n, e, a);
        };
      if (-1 === K.symbolCustomAttribs.indexOf("borderRadius")) {
        K.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY");
        const g = G.prototype.symbols.arc;
        G.prototype.symbols.arc = function (a, e, h, n, f = {}) {
          a = g(a, e, h, n, f);
          const { innerR: m = 0, r = h, start: l = 0, end: v = 0 } = f;
          if (f.open || !f.borderRadius) return a;
          h = v - l;
          e = Math.sin(h / 2);
          f = Math.max(
            Math.min(
              p(f.borderRadius || 0, r - m),
              (r - m) / 2,
              (r * e) / (1 + e)
            ),
            0
          );
          h = Math.min(f, (h / Math.PI) * 2 * m);
          for (e = a.length - 1; e--; ) {
            {
              let g = void 0,
                l = void 0,
                m = void 0;
              n = a;
              var d = e,
                b = 1 < e ? h : f,
                c = n[d],
                k = n[d + 1];
              "Z" === k[0] && (k = n[0]);
              ("M" !== c[0] && "L" !== c[0]) || "A" !== k[0]
                ? "A" !== c[0] ||
                  ("M" !== k[0] && "L" !== k[0]) ||
                  ((m = k), (l = c))
                : ((m = c), (l = k), (g = !0));
              if (m && l && l.params) {
                c = l[1];
                var w = l[5];
                k = l.params;
                const { start: a, end: f, cx: e, cy: h } = k;
                var z = w ? c - b : c + b;
                const r = z ? Math.asin(b / z) : 0;
                w = w ? r : -r;
                z *= Math.cos(r);
                g
                  ? ((k.start = a + w),
                    (m[1] = e + z * Math.cos(a)),
                    (m[2] = h + z * Math.sin(a)),
                    n.splice(d + 1, 0, [
                      "A",
                      b,
                      b,
                      0,
                      0,
                      1,
                      e + c * Math.cos(k.start),
                      h + c * Math.sin(k.start),
                    ]))
                  : ((k.end = f - w),
                    (l[6] = e + c * Math.cos(k.end)),
                    (l[7] = h + c * Math.sin(k.end)),
                    n.splice(d + 1, 0, [
                      "A",
                      b,
                      b,
                      0,
                      0,
                      1,
                      e + z * Math.cos(f),
                      h + z * Math.sin(f),
                    ]));
                l[4] = Math.abs(k.end - k.start) < Math.PI ? 0 : 1;
              }
            }
          }
          return a;
        };
        const e = G.prototype.symbols.roundedRect;
        G.prototype.symbols.roundedRect = function (a, g, h, n, f = {}) {
          const m = e(a, g, h, n, f),
            { r = 0, brBoxHeight: l = n, brBoxY: v = g } = f;
          var d = g - v,
            b = v + l - (g + n);
          f = -0.1 < d - r ? 0 : r;
          const c = -0.1 < b - r ? 0 : r;
          var k = Math.max(f && d, 0);
          const w = Math.max(c && b, 0);
          b = [a + f, g];
          d = [a + h - f, g];
          const z = [a + h, g + f],
            q = [a + h, g + n - c],
            p = [a + h - c, g + n],
            x = [a + c, g + n],
            t = [a, g + n - c],
            u = [a, g + f];
          if (k) {
            const a = Math.sqrt(Math.pow(f, 2) - Math.pow(f - k, 2));
            b[0] -= a;
            d[0] += a;
            z[1] = u[1] = g + f - k;
          }
          n < f - k &&
            ((k = Math.sqrt(Math.pow(f, 2) - Math.pow(f - k - n, 2))),
            (z[0] = q[0] = a + h - f + k),
            (p[0] = Math.min(z[0], p[0])),
            (x[0] = Math.max(q[0], x[0])),
            (t[0] = u[0] = a + f - k),
            (z[1] = u[1] = g + n));
          w &&
            ((k = Math.sqrt(Math.pow(c, 2) - Math.pow(c - w, 2))),
            (p[0] += k),
            (x[0] -= k),
            (q[1] = t[1] = g + n - c + w));
          n < c - w &&
            ((n = Math.sqrt(Math.pow(c, 2) - Math.pow(c - w - n, 2))),
            (z[0] = q[0] = a + h - c + n),
            (d[0] = Math.min(z[0], d[0])),
            (b[0] = Math.max(q[0], b[0])),
            (t[0] = u[0] = a + c - n),
            (q[1] = t[1] = g));
          m.length = 0;
          m.push(
            ["M", ...b],
            ["L", ...d],
            ["A", f, f, 0, 0, 1, ...z],
            ["L", ...q],
            ["A", c, c, 0, 0, 1, ...p],
            ["L", ...x],
            ["A", c, c, 0, 0, 1, ...t],
            ["L", ...u],
            ["A", f, f, 0, 0, 1, ...b],
            ["Z"]
          );
          return m;
        };
        B(a.pie, "afterTranslate", function () {
          const a = h(this.options.borderRadius);
          for (const e of this.points) {
            const g = e.shapeArgs;
            g && (g.borderRadius = p(a.radius, (g.r || 0) - (g.innerR || 0)));
          }
        });
        B(
          A,
          "afterColumnTranslate",
          function () {
            var a, e;
            if (
              this.options.borderRadius &&
              (!this.chart.is3d || !this.chart.is3d())
            ) {
              const { options: m, yAxis: r } = this,
                l = "percent" === m.stacking;
              var g =
                null ===
                  (e =
                    null === (a = u.plotOptions) || void 0 === a
                      ? void 0
                      : a[this.type]) || void 0 === e
                  ? void 0
                  : e.borderRadius;
              a = h(m.borderRadius, q(g) ? g : {});
              e = r.options.reversed;
              for (const h of this.points)
                if (
                  (({ shapeArgs: g } = h), "roundedRect" === h.shapeType && g)
                ) {
                  const { width: d = 0, height: b = 0, y: c = 0 } = g;
                  var n = c,
                    f = b;
                  "stack" === a.scope &&
                    h.stackTotal &&
                    ((n = r.translate(l ? 100 : h.stackTotal, !1, !0, !1, !0)),
                    (f = r.translate(m.threshold || 0, !1, !0, !1, !0)),
                    (f = this.crispCol(0, Math.min(n, f), 0, Math.abs(n - f))),
                    (n = f.y),
                    (f = f.height));
                  const k = -1 === (h.negative ? -1 : 1) * (e ? -1 : 1);
                  let w = a.where;
                  !w &&
                    this.is("waterfall") &&
                    Math.abs(
                      (h.yBottom || 0) - (this.translatedThreshold || 0)
                    ) > this.borderWidth &&
                    (w = "all");
                  w || (w = "end");
                  const v =
                    Math.min(
                      p(a.radius, d),
                      d / 2,
                      "all" === w ? b / 2 : Infinity
                    ) || 0;
                  "end" === w && (k && (n -= v), (f += v));
                  t(g, { brBoxHeight: f, brBoxY: n, r: v });
                }
            }
          },
          { order: 9 }
        );
      }
      A = { optionsToObject: h };
      ("");
      return A;
    }
  );
  L(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function (a) {
    const {
      diffObjects: u,
      extend: J,
      find: K,
      merge: G,
      pick: D,
      uniqueKey: E,
    } = a;
    var B;
    (function (t) {
      function q(a, h) {
        const g = a.condition;
        (
          g.callback ||
          function () {
            return (
              this.chartWidth <= D(g.maxWidth, Number.MAX_VALUE) &&
              this.chartHeight <= D(g.maxHeight, Number.MAX_VALUE) &&
              this.chartWidth >= D(g.minWidth, 0) &&
              this.chartHeight >= D(g.minHeight, 0)
            );
          }
        ).call(this) && h.push(a._id);
      }
      function m(a, h) {
        const g = this.options.responsive;
        var e = this.currentResponsive;
        let n = [];
        !h &&
          g &&
          g.rules &&
          g.rules.forEach((a) => {
            "undefined" === typeof a._id && (a._id = E());
            this.matchResponsiveRule(a, n);
          }, this);
        h = G(
          ...n
            .map((a) => K((g || {}).rules || [], (e) => e._id === a))
            .map((a) => a && a.chartOptions)
        );
        h.isResponsiveOptions = !0;
        n = n.toString() || void 0;
        n !== (e && e.ruleIds) &&
          (e && this.update(e.undoOptions, a, !0),
          n
            ? ((e = u(h, this.options, !0, this.collectionsWithUpdate)),
              (e.isResponsiveOptions = !0),
              (this.currentResponsive = {
                ruleIds: n,
                mergedOptions: h,
                undoOptions: e,
              }),
              this.update(h, a, !0))
            : (this.currentResponsive = void 0));
      }
      const p = [];
      t.compose = function (n) {
        a.pushUnique(p, n) &&
          J(n.prototype, { matchResponsiveRule: q, setResponsive: m });
        return n;
      };
    })(B || (B = {}));
    ("");
    ("");
    return B;
  });
  L(
    a,
    "masters/highcharts.src.js",
    [
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
      a["Core/Defaults.js"],
      a["Core/Animation/Fx.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Templating.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Renderer/HTML/HTMLElement.js"],
      a["Core/Renderer/HTML/HTMLRenderer.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Axis/DateTimeAxis.js"],
      a["Core/Axis/LogarithmicAxis.js"],
      a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Tooltip.js"],
      a["Core/Series/Point.js"],
      a["Core/Pointer.js"],
      a["Core/Legend/Legend.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Axis/Stacking/StackingAxis.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Series/Column/ColumnDataLabel.js"],
      a["Series/Pie/PieSeries.js"],
      a["Series/Pie/PieDataLabel.js"],
      a["Core/Series/DataLabel.js"],
      a["Core/Responsive.js"],
      a["Core/Color/Color.js"],
      a["Core/Time.js"],
    ],
    function (
      a,
      A,
      J,
      K,
      G,
      D,
      E,
      B,
      t,
      q,
      m,
      p,
      n,
      h,
      g,
      e,
      x,
      I,
      M,
      C,
      f,
      y,
      r,
      l,
      v,
      d,
      b,
      c,
      k,
      w,
      z,
      F,
      O,
      P
    ) {
      a.animate = G.animate;
      a.animObject = G.animObject;
      a.getDeferredAnimation = G.getDeferredAnimation;
      a.setAnimation = G.setAnimation;
      a.stop = G.stop;
      a.timers = K.timers;
      a.AST = D;
      a.Axis = n;
      a.Chart = y;
      a.chart = y.chart;
      a.Fx = K;
      a.Legend = f;
      a.PlotLineOrBand = e;
      a.Point = M;
      a.Pointer = C;
      a.Series = v;
      a.StackItem = l;
      a.SVGElement = t;
      a.SVGRenderer = q;
      a.Templating = E;
      a.Tick = x;
      a.Time = P;
      a.Tooltip = I;
      a.Color = O;
      a.color = O.parse;
      p.compose(q);
      m.compose(t);
      C.compose(y);
      f.compose(y);
      a.defaultOptions = J.defaultOptions;
      a.getOptions = J.getOptions;
      a.time = J.defaultTime;
      a.setOptions = J.setOptions;
      a.dateFormat = E.dateFormat;
      a.format = E.format;
      a.numberFormat = E.numberFormat;
      a.addEvent = A.addEvent;
      a.arrayMax = A.arrayMax;
      a.arrayMin = A.arrayMin;
      a.attr = A.attr;
      a.clearTimeout = A.clearTimeout;
      a.correctFloat = A.correctFloat;
      a.createElement = A.createElement;
      a.css = A.css;
      a.defined = A.defined;
      a.destroyObjectProperties = A.destroyObjectProperties;
      a.discardElement = A.discardElement;
      a.distribute = B.distribute;
      a.erase = A.erase;
      a.error = A.error;
      a.extend = A.extend;
      a.extendClass = A.extendClass;
      a.find = A.find;
      a.fireEvent = A.fireEvent;
      a.getMagnitude = A.getMagnitude;
      a.getStyle = A.getStyle;
      a.inArray = A.inArray;
      a.isArray = A.isArray;
      a.isClass = A.isClass;
      a.isDOMElement = A.isDOMElement;
      a.isFunction = A.isFunction;
      a.isNumber = A.isNumber;
      a.isObject = A.isObject;
      a.isString = A.isString;
      a.keys = A.keys;
      a.merge = A.merge;
      a.normalizeTickInterval = A.normalizeTickInterval;
      a.objectEach = A.objectEach;
      a.offset = A.offset;
      a.pad = A.pad;
      a.pick = A.pick;
      a.pInt = A.pInt;
      a.relativeLength = A.relativeLength;
      a.removeEvent = A.removeEvent;
      a.seriesType = d.seriesType;
      a.splat = A.splat;
      a.stableSort = A.stableSort;
      a.syncTimeout = A.syncTimeout;
      a.timeUnits = A.timeUnits;
      a.uniqueKey = A.uniqueKey;
      a.useSerialIds = A.useSerialIds;
      a.wrap = A.wrap;
      c.compose(b);
      z.compose(v);
      h.compose(n);
      g.compose(n);
      w.compose(k);
      e.compose(n);
      F.compose(y);
      r.compose(n, y, v);
      I.compose(C);
      return a;
    }
  );
  L(
    a,
    "Core/Axis/BrokenAxis.js",
    [a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]],
    function (a, A) {
      const {
        addEvent: u,
        find: K,
        fireEvent: G,
        isArray: D,
        isNumber: E,
        pick: B,
      } = A;
      var t;
      (function (q) {
        function m() {
          "undefined" !== typeof this.brokenAxis &&
            this.brokenAxis.setBreaks(this.options.breaks, !1);
        }
        function p() {
          this.brokenAxis &&
            this.brokenAxis.hasBreaks &&
            (this.options.ordinal = !1);
        }
        function n() {
          const a = this.brokenAxis;
          if (a && a.hasBreaks) {
            const f = this.tickPositions,
              e = this.tickPositions.info,
              g = [];
            for (let e = 0; e < f.length; e++)
              a.isInAnyBreak(f[e]) || g.push(f[e]);
            this.tickPositions = g;
            this.tickPositions.info = e;
          }
        }
        function h() {
          this.brokenAxis || (this.brokenAxis = new C(this));
        }
        function g() {
          const {
            isDirty: a,
            options: { connectNulls: e },
            points: g,
            xAxis: l,
            yAxis: h,
          } = this;
          if (a) {
            let a = g.length;
            for (; a--; ) {
              const b = g[a],
                c =
                  !(null === b.y && !1 === e) &&
                  ((l && l.brokenAxis && l.brokenAxis.isInAnyBreak(b.x, !0)) ||
                    (h && h.brokenAxis && h.brokenAxis.isInAnyBreak(b.y, !0)));
              b.visible = c ? !1 : !1 !== b.options.visible;
            }
          }
        }
        function e() {
          this.drawBreaks(this.xAxis, ["x"]);
          this.drawBreaks(this.yAxis, B(this.pointArrayMap, ["y"]));
        }
        function t(a, e) {
          const f = this,
            g = f.points;
          let h, d, b, c;
          if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
            const k = a.brokenAxis;
            e.forEach(function (e) {
              h = (k && k.breakArray) || [];
              d = a.isXAxis ? a.min : B(f.options.threshold, a.min);
              g.forEach(function (f) {
                c = B(f["stack" + e.toUpperCase()], f[e]);
                h.forEach(function (e) {
                  if (E(d) && E(c)) {
                    b = !1;
                    if ((d < e.from && c > e.to) || (d > e.from && c < e.from))
                      b = "pointBreak";
                    else if (
                      (d < e.from && c > e.from && c < e.to) ||
                      (d > e.from && c > e.to && c < e.from)
                    )
                      b = "pointInBreak";
                    b && G(a, b, { point: f, brk: e });
                  }
                });
              });
            });
          }
        }
        function I() {
          var e = this.currentDataGrouping,
            g = e && e.gapSize;
          e = this.points.slice();
          const h = this.yAxis;
          let l = this.options.gapSize,
            n = e.length - 1;
          var d;
          if (l && 0 < n)
            for (
              "value" !== this.options.gapUnit && (l *= this.basePointRange),
                g && g > l && g >= this.basePointRange && (l = g);
              n--;

            )
              (d && !1 !== d.visible) || (d = e[n + 1]),
                (g = e[n]),
                !1 !== d.visible &&
                  !1 !== g.visible &&
                  (d.x - g.x > l &&
                    ((d = (g.x + d.x) / 2),
                    e.splice(n + 1, 0, { isNull: !0, x: d }),
                    h.stacking &&
                      this.options.stacking &&
                      ((d = h.stacking.stacks[this.stackKey][d] =
                        new a(h, h.options.stackLabels, !1, d, this.stack)),
                      (d.total = 0))),
                  (d = g));
          return this.getGraphPath(e);
        }
        const M = [];
        q.compose = function (a, q) {
          A.pushUnique(M, a) &&
            (a.keepProps.push("brokenAxis"),
            u(a, "init", h),
            u(a, "afterInit", m),
            u(a, "afterSetTickPositions", n),
            u(a, "afterSetOptions", p));
          if (A.pushUnique(M, q)) {
            const a = q.prototype;
            a.drawBreaks = t;
            a.gappedPath = I;
            u(q, "afterGeneratePoints", g);
            u(q, "afterRender", e);
          }
          return a;
        };
        class C {
          static isInBreak(a, e) {
            const f = a.repeat || Infinity,
              g = a.from,
              h = a.to - a.from;
            e = e >= g ? (e - g) % f : f - ((g - e) % f);
            return a.inclusive ? e <= h : e < h && 0 !== e;
          }
          static lin2Val(a) {
            var e = this.brokenAxis;
            e = e && e.breakArray;
            if (!e || !E(a)) return a;
            let f, g;
            for (g = 0; g < e.length && !((f = e[g]), f.from >= a); g++)
              f.to < a ? (a += f.len) : C.isInBreak(f, a) && (a += f.len);
            return a;
          }
          static val2Lin(a) {
            var e = this.brokenAxis;
            e = e && e.breakArray;
            if (!e || !E(a)) return a;
            let f = a,
              g,
              h;
            for (h = 0; h < e.length; h++)
              if (((g = e[h]), g.to <= a)) f -= g.len;
              else if (g.from >= a) break;
              else if (C.isInBreak(g, a)) {
                f -= a - g.from;
                break;
              }
            return f;
          }
          constructor(a) {
            this.hasBreaks = !1;
            this.axis = a;
          }
          findBreakAt(a, e) {
            return K(e, function (e) {
              return e.from < a && a < e.to;
            });
          }
          isInAnyBreak(a, e) {
            const f = this.axis,
              g = f.options.breaks || [];
            let h = g.length,
              d,
              b,
              c;
            if (h && E(a)) {
              for (; h--; )
                C.isInBreak(g[h], a) &&
                  ((d = !0), b || (b = B(g[h].showPoints, !f.isXAxis)));
              c = d && e ? d && !b : d;
            }
            return c;
          }
          setBreaks(a, e) {
            const f = this,
              g = f.axis,
              h = D(a) && !!a.length;
            g.isDirty = f.hasBreaks !== h;
            f.hasBreaks = h;
            a !== g.options.breaks &&
              (g.options.breaks = g.userOptions.breaks = a);
            g.forceRedraw = !0;
            g.series.forEach(function (a) {
              a.isDirty = !0;
            });
            h ||
              g.val2lin !== C.val2Lin ||
              (delete g.val2lin, delete g.lin2val);
            h &&
              ((g.userOptions.ordinal = !1),
              (g.lin2val = C.lin2Val),
              (g.val2lin = C.val2Lin),
              (g.setExtremes = function (a, b, c, e, h) {
                if (f.hasBreaks) {
                  const c = this.options.breaks || [];
                  let d;
                  for (; (d = f.findBreakAt(a, c)); ) a = d.to;
                  for (; (d = f.findBreakAt(b, c)); ) b = d.from;
                  b < a && (b = a);
                }
                g.constructor.prototype.setExtremes.call(this, a, b, c, e, h);
              }),
              (g.setAxisTranslation = function () {
                g.constructor.prototype.setAxisTranslation.call(this);
                f.unitLength = void 0;
                if (f.hasBreaks) {
                  const a = g.options.breaks || [],
                    b = [],
                    c = [],
                    e = B(g.pointRangePadding, 0);
                  let h = 0,
                    l,
                    n,
                    m = g.userMin || g.min,
                    r = g.userMax || g.max,
                    v,
                    q;
                  a.forEach(function (b) {
                    n = b.repeat || Infinity;
                    E(m) &&
                      E(r) &&
                      (C.isInBreak(b, m) && (m += (b.to % n) - (m % n)),
                      C.isInBreak(b, r) && (r -= (r % n) - (b.from % n)));
                  });
                  a.forEach(function (a) {
                    v = a.from;
                    n = a.repeat || Infinity;
                    if (E(m) && E(r)) {
                      for (; v - n > m; ) v -= n;
                      for (; v < m; ) v += n;
                      for (q = v; q < r; q += n)
                        b.push({ value: q, move: "in" }),
                          b.push({
                            value: q + a.to - a.from,
                            move: "out",
                            size: a.breakSize,
                          });
                    }
                  });
                  b.sort(function (b, a) {
                    return b.value === a.value
                      ? ("in" === b.move ? 0 : 1) - ("in" === a.move ? 0 : 1)
                      : b.value - a.value;
                  });
                  l = 0;
                  v = m;
                  b.forEach(function (b) {
                    l += "in" === b.move ? 1 : -1;
                    1 === l && "in" === b.move && (v = b.value);
                    0 === l &&
                      E(v) &&
                      (c.push({
                        from: v,
                        to: b.value,
                        len: b.value - v - (b.size || 0),
                      }),
                      (h += b.value - v - (b.size || 0)));
                  });
                  f.breakArray = c;
                  E(m) &&
                    E(r) &&
                    E(g.min) &&
                    ((f.unitLength = r - m - h + e),
                    G(g, "afterBreaks"),
                    g.staticScale
                      ? (g.transA = g.staticScale)
                      : f.unitLength &&
                        (g.transA *= (r - g.min + e) / f.unitLength),
                    e &&
                      (g.minPixelPadding = g.transA * (g.minPointOffset || 0)),
                    (g.min = m),
                    (g.max = r));
                }
              }));
            B(e, !0) && g.chart.redraw();
          }
        }
        q.Additions = C;
      })(t || (t = {}));
      return t;
    }
  );
  L(
    a,
    "masters/modules/broken-axis.src.js",
    [a["Core/Globals.js"], a["Core/Axis/BrokenAxis.js"]],
    function (a, A) {
      A.compose(a.Axis, a.Series);
    }
  );
  L(a, "Extensions/DataGrouping/ApproximationRegistry.js", [], function () {
    return {};
  });
  L(
    a,
    "Extensions/DataGrouping/ApproximationDefaults.js",
    [
      a["Extensions/DataGrouping/ApproximationRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A) {
      function u(a) {
        const m = a.length;
        a = K(a);
        t(a) && m && (a = E(a / m));
        return a;
      }
      function K(a) {
        let m = a.length,
          q;
        if (!m && a.hasNulls) q = null;
        else if (m) for (q = 0; m--; ) q += a[m];
        return q;
      }
      const {
        arrayMax: G,
        arrayMin: D,
        correctFloat: E,
        extend: B,
        isNumber: t,
      } = A;
      A = {
        average: u,
        averages: function () {
          const a = [];
          [].forEach.call(arguments, function (m) {
            a.push(u(m));
          });
          return "undefined" === typeof a[0] ? void 0 : a;
        },
        close: function (a) {
          return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
        },
        high: function (a) {
          return a.length ? G(a) : a.hasNulls ? null : void 0;
        },
        hlc: function (q, m, p) {
          q = a.high(q);
          m = a.low(m);
          p = a.close(p);
          if (t(q) || t(m) || t(p)) return [q, m, p];
        },
        low: function (a) {
          return a.length ? D(a) : a.hasNulls ? null : void 0;
        },
        ohlc: function (q, m, p, n) {
          q = a.open(q);
          m = a.high(m);
          p = a.low(p);
          n = a.close(n);
          if (t(q) || t(m) || t(p) || t(n)) return [q, m, p, n];
        },
        open: function (a) {
          return a.length ? a[0] : a.hasNulls ? null : void 0;
        },
        range: function (q, m) {
          q = a.low(q);
          m = a.high(m);
          if (t(q) || t(m)) return [q, m];
          if (null === q && null === m) return null;
        },
        sum: K,
      };
      B(a, A);
      return A;
    }
  );
  L(a, "Extensions/DataGrouping/DataGroupingDefaults.js", [], function () {
    return {
      common: {
        groupPixelWidth: 2,
        dateTimeLabelFormats: {
          millisecond: [
            "%A, %e %b, %H:%M:%S.%L",
            "%A, %e %b, %H:%M:%S.%L",
            "-%H:%M:%S.%L",
          ],
          second: ["%A, %e %b, %H:%M:%S", "%A, %e %b, %H:%M:%S", "-%H:%M:%S"],
          minute: ["%A, %e %b, %H:%M", "%A, %e %b, %H:%M", "-%H:%M"],
          hour: ["%A, %e %b, %H:%M", "%A, %e %b, %H:%M", "-%H:%M"],
          day: ["%A, %e %b %Y", "%A, %e %b", "-%A, %e %b %Y"],
          week: ["Week from %A, %e %b %Y", "%A, %e %b", "-%A, %e %b %Y"],
          month: ["%B %Y", "%B", "-%B %Y"],
          year: ["%Y", "%Y", "-%Y"],
        },
      },
      seriesSpecific: {
        line: {},
        spline: {},
        area: {},
        areaspline: {},
        arearange: {},
        column: { groupPixelWidth: 10 },
        columnrange: { groupPixelWidth: 10 },
        candlestick: { groupPixelWidth: 10 },
        ohlc: { groupPixelWidth: 5 },
        hlc: { groupPixelWidth: 5 },
        heikinashi: { groupPixelWidth: 10 },
      },
      units: [
        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ["second", [1, 2, 5, 10, 15, 30]],
        ["minute", [1, 2, 5, 10, 15, 30]],
        ["hour", [1, 2, 3, 4, 6, 8, 12]],
        ["day", [1]],
        ["week", [1]],
        ["month", [1, 3, 6]],
        ["year", null],
      ],
    };
  });
  L(
    a,
    "Extensions/DataGrouping/DataGroupingAxisComposition.js",
    [
      a["Extensions/DataGrouping/DataGroupingDefaults.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A) {
      function u(a) {
        const h = this,
          g = h.series;
        g.forEach(function (a) {
          a.groupPixelWidth = void 0;
        });
        g.forEach(function (e) {
          e.groupPixelWidth = h.getGroupPixelWidth && h.getGroupPixelWidth();
          e.groupPixelWidth && (e.hasProcessed = !0);
          e.applyGrouping(!!a.hasExtremesChanged);
        });
      }
      function K() {
        const n = this.series;
        let h = n.length,
          g = 0,
          e = !1,
          m,
          p;
        for (; h--; )
          if ((p = n[h].options.dataGrouping))
            if (
              ((g = Math.max(
                g,
                q(p.groupPixelWidth, a.common.groupPixelWidth)
              )),
              (m = (n[h].processedXData || n[h].data).length),
              n[h].groupPixelWidth ||
                m > this.chart.plotSizeX / g ||
                (m && p.forced))
            )
              e = !0;
        return e ? g : 0;
      }
      function G() {
        this.series.forEach(function (a) {
          a.hasProcessed = !1;
        });
      }
      function D(a, h) {
        let g;
        h = q(h, !0);
        a || (a = { forced: !1, units: null });
        if (this instanceof p)
          for (g = this.series.length; g--; )
            this.series[g].update({ dataGrouping: a }, !1);
        else
          this.chart.options.series.forEach(function (e) {
            e.dataGrouping = "boolean" === typeof a ? a : t(a, e.dataGrouping);
          });
        this.ordinal && (this.ordinal.slope = void 0);
        h && this.chart.redraw();
      }
      const { addEvent: E, extend: B, merge: t, pick: q } = A,
        m = [];
      let p;
      return {
        compose: function (a) {
          p = a;
          A.pushUnique(m, a) &&
            (E(a, "afterSetScale", G),
            E(a, "postProcessData", u),
            B(a.prototype, {
              applyGrouping: u,
              getGroupPixelWidth: K,
              setDataGrouping: D,
            }));
        },
      };
    }
  );
  L(
    a,
    "Extensions/DataGrouping/DataGroupingSeriesComposition.js",
    [
      a["Extensions/DataGrouping/ApproximationRegistry.js"],
      a["Extensions/DataGrouping/DataGroupingDefaults.js"],
      a["Core/Axis/DateTimeAxis.js"],
      a["Core/Defaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D) {
      function u(a) {
        var f = this.chart,
          h = this.options.dataGrouping,
          d = !1 !== this.allowDG && h && C(h.enabled, f.options.isStock),
          b = this.visible || !f.options.chart.ignoreHiddenSeries;
        const c = this.currentDataGrouping;
        var k = !1;
        d && !this.requireSorting && (this.requireSorting = k = !0);
        a =
          !1 ===
            !(
              this.isCartesian &&
              !this.isDirty &&
              !this.xAxis.isDirty &&
              !this.yAxis.isDirty &&
              !a
            ) || !d;
        k && (this.requireSorting = !1);
        if (!a) {
          this.destroyGroupedData();
          a = h.groupAll ? this.xData : this.processedXData;
          d = h.groupAll ? this.yData : this.processedYData;
          var m = f.plotSizeX;
          k = this.xAxis;
          var r = k.options.ordinal,
            q = this.groupPixelWidth,
            p;
          let l;
          if (q && a && a.length && m) {
            this.isDirty = l = !0;
            this.points = null;
            var t = k.getExtremes();
            var x = t.min;
            t = t.max;
            r =
              (r &&
                k.ordinal &&
                k.ordinal.getGroupIntervalFactor(x, t, this)) ||
              1;
            m = k.getTimeTicks(
              J.Additions.prototype.normalizeTimeTickInterval(
                ((q * (t - x)) / m) * r,
                h.units || A.units
              ),
              Math.min(x, a[0]),
              Math.max(t, a[a.length - 1]),
              k.options.startOfWeek,
              a,
              this.closestPointRange
            );
            q = n.groupData.apply(this, [a, d, m, h.approximation]);
            a = q.groupedXData;
            d = q.groupedYData;
            r = 0;
            h &&
              h.smoothed &&
              a.length &&
              ((h.firstAnchor = "firstPoint"),
              (h.anchor = "middle"),
              (h.lastAnchor = "lastPoint"),
              e(32, !1, f, {
                "dataGrouping.smoothed": "use dataGrouping.anchor",
              }));
            f = a;
            var u = t,
              y = this.options.dataGrouping;
            t = this.currentDataGrouping && this.currentDataGrouping.gapSize;
            if (y && this.xData && t && this.groupMap) {
              x = f.length - 1;
              var H = y.anchor;
              const b = C(y.firstAnchor, H);
              y = C(y.lastAnchor, H);
              if (H && "start" !== H) {
                var B = t * { middle: 0.5, end: 1 }[H];
                for (H = f.length - 1; H-- && 0 < H; ) f[H] += B;
              }
              b &&
                "start" !== b &&
                this.xData[0] >= f[0] &&
                ((H = this.groupMap[0].start),
                (B = this.groupMap[0].length),
                I(H) && I(B) && (p = H + (B - 1)),
                (f[0] = {
                  middle: f[0] + 0.5 * t,
                  end: f[0] + t,
                  firstPoint: this.xData[0],
                  lastPoint: p && this.xData[p],
                }[b]));
              y &&
                "start" !== y &&
                t &&
                f[x] >= u - t &&
                ((p = this.groupMap[this.groupMap.length - 1].start),
                (f[x] = {
                  middle: f[x] + 0.5 * t,
                  end: f[x] + t,
                  firstPoint: p && this.xData[p],
                  lastPoint: this.xData[this.xData.length - 1],
                }[y]));
            }
            for (p = 1; p < m.length; p++)
              (m.info.segmentStarts &&
                -1 !== m.info.segmentStarts.indexOf(p)) ||
                (r = Math.max(m[p] - m[p - 1], r));
            t = m.info;
            t.gapSize = r;
            this.closestPointRange = m.info.totalRange;
            this.groupMap = q.groupMap;
            if (b) {
              b = k;
              p = a;
              if (g(p[0]) && I(b.min) && I(b.dataMin) && p[0] < b.min) {
                if (
                  (!g(b.options.min) && b.min <= b.dataMin) ||
                  b.min === b.dataMin
                )
                  b.min = Math.min(p[0], b.min);
                b.dataMin = Math.min(p[0], b.dataMin);
              }
              if (
                g(p[p.length - 1]) &&
                I(b.max) &&
                I(b.dataMax) &&
                p[p.length - 1] > b.max
              ) {
                if (
                  (!g(b.options.max) && I(b.dataMax) && b.max >= b.dataMax) ||
                  b.max === b.dataMax
                )
                  b.max = Math.max(p[p.length - 1], b.max);
                b.dataMax = Math.max(p[p.length - 1], b.dataMax);
              }
            }
            h.groupAll &&
              ((this.allGroupedData = d),
              (h = this.cropData(a, d, k.min, k.max, 1)),
              (a = h.xData),
              (d = h.yData),
              (this.cropStart = h.start));
            this.processedXData = a;
            this.processedYData = d;
          } else this.groupMap = null;
          this.hasGroupedData = l;
          this.currentDataGrouping = t;
          this.preventGraphAnimation =
            (c && c.totalRange) !== (t && t.totalRange);
        }
      }
      function B() {
        this.groupedData &&
          (this.groupedData.forEach(function (a, e) {
            a && (this.groupedData[e] = a.destroy ? a.destroy() : null);
          }, this),
          (this.groupedData.length = 0));
      }
      function t() {
        f.apply(this);
        this.destroyGroupedData();
        this.groupedData = this.hasGroupedData ? this.points : null;
      }
      function q() {
        return this.is("arearange")
          ? "range"
          : this.is("ohlc")
          ? "ohlc"
          : this.is("hlc")
          ? "hlc"
          : this.is("column") || this.options.cumulative
          ? "sum"
          : "average";
      }
      function m(e, f, h, d) {
        const b = this,
          c = b.data,
          k = b.options && b.options.data,
          l = [],
          n = [],
          m = [],
          r = e.length,
          p = !!f,
          v = [],
          q = b.pointArrayMap,
          t = q && q.length,
          x = ["x"].concat(q || ["y"]),
          u = this.options.dataGrouping && this.options.dataGrouping.groupAll;
        let y = 0,
          C = 0;
        d =
          "function" === typeof d
            ? d
            : d && a[d]
            ? a[d]
            : a[(b.getDGApproximation && b.getDGApproximation()) || "average"];
        if (t) for (var A = q.length; A--; ) v.push([]);
        else v.push([]);
        A = t || 1;
        for (let a = 0; a <= r; a++)
          if (!(e[a] < h[0])) {
            for (
              ;
              ("undefined" !== typeof h[y + 1] && e[a] >= h[y + 1]) || a === r;

            ) {
              var B = h[y];
              b.dataGroupInfo = {
                start: u ? C : b.cropStart + C,
                length: v[0].length,
              };
              var E = d.apply(b, v);
              b.pointClass &&
                !g(b.dataGroupInfo.options) &&
                ((b.dataGroupInfo.options = M(
                  b.pointClass.prototype.optionsToObject.call(
                    { series: b },
                    b.options.data[b.cropStart + C]
                  )
                )),
                x.forEach(function (a) {
                  delete b.dataGroupInfo.options[a];
                }));
              "undefined" !== typeof E &&
                (l.push(B), n.push(E), m.push(b.dataGroupInfo));
              C = a;
              for (B = 0; B < A; B++) (v[B].length = 0), (v[B].hasNulls = !1);
              y += 1;
              if (a === r) break;
            }
            if (a === r) break;
            if (q) {
              B =
                b.options.dataGrouping && b.options.dataGrouping.groupAll
                  ? a
                  : b.cropStart + a;
              B =
                (c && c[B]) ||
                b.pointClass.prototype.applyOptions.apply({ series: b }, [
                  k[B],
                ]);
              for (let b = 0; b < t; b++)
                (E = B[q[b]]),
                  I(E) ? v[b].push(E) : null === E && (v[b].hasNulls = !0);
            } else
              (B = p ? f[a] : null),
                I(B) ? v[0].push(B) : null === B && (v[0].hasNulls = !0);
          }
        return { groupedXData: l, groupedYData: n, groupMap: m };
      }
      function p(a) {
        a = a.options;
        const e = this.type,
          f = this.chart.options.plotOptions,
          d = this.useCommonDataGrouping && A.common,
          b = A.seriesSpecific;
        let c = K.defaultOptions.plotOptions[e].dataGrouping;
        if (f && (b[e] || d)) {
          const k = this.chart.rangeSelector;
          c || (c = M(A.common, b[e]));
          a.dataGrouping = M(
            d,
            c,
            f.series && f.series.dataGrouping,
            f[e].dataGrouping,
            this.userOptions.dataGrouping,
            !a.isInternal &&
              k &&
              I(k.selected) &&
              k.buttonOptions[k.selected].dataGrouping
          );
        }
      }
      const {
          series: { prototype: n },
        } = G,
        {
          addEvent: h,
          defined: g,
          error: e,
          extend: x,
          isNumber: I,
          merge: M,
          pick: C,
        } = D,
        f = n.generatePoints,
        y = [];
      return {
        compose: function (a) {
          const f = a.prototype.pointClass;
          D.pushUnique(y, f) &&
            h(f, "update", function () {
              if (this.dataGroup) return e(24, !1, this.series.chart), !1;
            });
          D.pushUnique(y, a) &&
            (h(a, "afterSetOptions", p),
            h(a, "destroy", B),
            x(a.prototype, {
              applyGrouping: u,
              destroyGroupedData: B,
              generatePoints: t,
              getDGApproximation: q,
              groupData: m,
            }));
        },
        groupData: m,
      };
    }
  );
  L(
    a,
    "Extensions/DataGrouping/DataGrouping.js",
    [
      a["Extensions/DataGrouping/DataGroupingAxisComposition.js"],
      a["Extensions/DataGrouping/DataGroupingDefaults.js"],
      a["Extensions/DataGrouping/DataGroupingSeriesComposition.js"],
      a["Core/Templating.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G) {
      function u(a) {
        const n = this.chart,
          h = n.time,
          g = a.labelConfig,
          e = g.series;
        var m = e.tooltipOptions,
          p = e.options.dataGrouping;
        const u = e.xAxis;
        var C = m.xDateFormat;
        let f,
          y,
          r = m[a.isFooter ? "footerFormat" : "headerFormat"];
        u &&
          "datetime" === u.options.type &&
          p &&
          q(g.key) &&
          ((y = e.currentDataGrouping),
          (p = p.dateTimeLabelFormats || A.common.dateTimeLabelFormats),
          y
            ? ((m = p[y.unitName]),
              1 === y.count ? (C = m[0]) : ((C = m[1]), (f = m[2])))
            : !C &&
              p &&
              u.dateTime &&
              (C = u.dateTime.getXDateFormat(g.x, m.dateTimeLabelFormats)),
          (C = h.dateFormat(C, g.key)),
          f && (C += h.dateFormat(f, g.key + y.totalRange - 1)),
          e.chart.styledMode && (r = this.styledModeFormat(r)),
          (a.text = E(r, { point: t(g.point, { key: C }), series: e }, n)),
          a.preventDefault());
      }
      const { format: E } = K,
        { addEvent: B, extend: t, isNumber: q } = G,
        m = [];
      K = {
        compose: function (p, n, h) {
          a.compose(p);
          J.compose(n);
          h && G.pushUnique(m, h) && B(h, "headerFormatter", u);
        },
        groupData: J.groupData,
      };
      ("");
      ("");
      return K;
    }
  );
  L(
    a,
    "masters/modules/datagrouping.src.js",
    [
      a["Core/Globals.js"],
      a["Extensions/DataGrouping/ApproximationDefaults.js"],
      a["Extensions/DataGrouping/ApproximationRegistry.js"],
      a["Extensions/DataGrouping/DataGrouping.js"],
    ],
    function (a, A, J, K) {
      a.dataGrouping = { approximationDefaults: A, approximations: J };
      K.compose(a.Axis, a.Series, a.Tooltip);
    }
  );
  L(
    a,
    "Extensions/MouseWheelZoom/MouseWheelZoom.js",
    [a["Core/Utilities.js"]],
    function (a) {
      function u() {
        const a = this,
          e = q(a.options.chart.zooming.mouseWheel);
        e.enabled &&
          J(this.container, "wheel", (g) => {
            g = this.pointer.normalize(g);
            if (a.isInsidePlot(g.chartX - a.plotLeft, g.chartY - a.plotTop)) {
              const n = G(e.sensitivity, 1.1);
              h(
                a,
                Math.pow(n, g.detail || (g.deltaY || 0) / 120),
                a.xAxis[0].toValue(g.chartX),
                a.yAxis[0].toValue(g.chartY),
                g.chartX,
                g.chartY,
                e
              );
            }
            g.preventDefault && g.preventDefault();
          });
      }
      const { addEvent: J, isObject: K, pick: G, defined: D, merge: E } = a,
        B = [],
        t = { enabled: !0, sensitivity: 1.1 },
        q = (a) => (K(a) ? E(t, a) : E(t, { enabled: D(a) ? a : !0 })),
        m = function (a, e) {
          a.x + a.width > e.x + e.width &&
            (a.width > e.width
              ? ((a.width = e.width), (a.x = e.x))
              : (a.x = e.x + e.width - a.width));
          a.width > e.width && (a.width = e.width);
          a.x < e.x && (a.x = e.x);
          a.y + a.height > e.y + e.height &&
            (a.height > e.height
              ? ((a.height = e.height), (a.y = e.y))
              : (a.y = e.y + e.height - a.height));
          a.height > e.height && (a.height = e.height);
          a.y < e.y && (a.y = e.y);
          return a;
        };
      let p, n;
      const h = function (a, e, h, q, t, u, f) {
        const g = a.xAxis[0],
          r = a.yAxis[0];
        var l = G(f.type, a.options.chart.zooming.type, "x");
        f = /x/.test(l);
        l = /y/.test(l);
        if (
          D(g.max) &&
          D(g.min) &&
          D(r.max) &&
          D(r.min) &&
          D(g.dataMax) &&
          D(g.dataMin) &&
          D(r.dataMax) &&
          D(r.dataMin)
        ) {
          if (l) {
            D(p) && clearTimeout(p);
            const { startOnTick: a, endOnTick: b } = r.options;
            n || (n = { startOnTick: a, endOnTick: b });
            (a || b) && r.setOptions({ startOnTick: !1, endOnTick: !1 });
            p = setTimeout(() => {
              if (n) {
                r.setOptions(n);
                const { min: a, max: b } = r.getExtremes();
                r.forceRedraw = !0;
                r.setExtremes(a, b);
                n = void 0;
              }
            }, 400);
          }
          if (a.inverted) {
            var v = r.pos + r.len;
            h = g.toValue(u);
            q = r.toValue(t);
            var d = t;
            t = u;
            u = v - d + r.pos;
          }
          t = t ? (t - g.pos) / g.len : 0.5;
          if ((g.reversed && !a.inverted) || (a.inverted && !g.reversed))
            t = 1 - t;
          u = 1 - (u ? (u - r.pos) / r.len : 0.5);
          r.reversed && (u = 1 - u);
          v = g.max - g.min;
          h = G(h, g.min + v / 2);
          v *= e;
          d = r.max - r.min;
          q = G(q, r.min + d / 2);
          const k = d * e;
          var b = g.dataMax - g.dataMin,
            c = r.dataMax - r.dataMin;
          d = g.dataMin - b * g.options.minPadding;
          b = b + b * g.options.minPadding + b * g.options.maxPadding;
          const w = r.dataMin - c * r.options.minPadding;
          c = c + c * r.options.minPadding + c * r.options.maxPadding;
          t = m(
            { x: h - v * t, y: q - k * u, width: v, height: k },
            { x: d, y: w, width: b, height: c }
          );
          u = t.x <= d && t.width >= b && t.y <= w && t.height >= c;
          D(e) && !u
            ? (f && g.setExtremes(t.x, t.x + t.width, !1),
              l && r.setExtremes(t.y, t.y + t.height, !1))
            : (f && g.setExtremes(void 0, void 0, !1),
              l && r.setExtremes(void 0, void 0, !1));
          a.redraw(!1);
        }
      };
      ("");
      return {
        compose: function (a) {
          -1 === B.indexOf(a) && (B.push(a), J(a, "afterGetContainer", u));
        },
      };
    }
  );
  L(
    a,
    "masters/modules/mouse-wheel-zoom.src.js",
    [a["Core/Globals.js"], a["Extensions/MouseWheelZoom/MouseWheelZoom.js"]],
    function (a, A) {
      A.compose(a.Chart);
    }
  );
  L(
    a,
    "Series/DataModifyComposition.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      const {
          prototype: { tooltipFormatter: u },
        } = A,
        {
          addEvent: D,
          arrayMax: E,
          arrayMin: B,
          correctFloat: t,
          defined: q,
          isArray: m,
          isNumber: p,
          isString: n,
          pick: h,
        } = K;
      var g;
      (function (a) {
        function e(a, b, d) {
          this.isXAxis ||
            (this.series.forEach(function (c) {
              "compare" === a && "boolean" !== typeof b
                ? c.setCompare(b, !1)
                : "cumulative" !== a || n(b) || c.setCumulative(b, !1);
            }),
            h(d, !0) && this.chart.redraw());
        }
        function g(a) {
          const b = this,
            { numberFormatter: c } = b.series.chart,
            d = function (d) {
              a = a.replace(
                "{point." + d + "}",
                (0 < b[d] && "change" === d ? "+" : "") +
                  c(b[d], h(b.series.tooltipOptions.changeDecimals, 2))
              );
            };
          q(b.change) && d("change");
          q(b.cumulativeSum) && d("cumulativeSum");
          return u.apply(this, [a]);
        }
        function A() {
          const a = this.options.compare;
          let d;
          if ("percent" === a || "value" === a || this.options.cumulative)
            (d = new b(this)),
              "percent" === a || "value" === a
                ? d.initCompare(a)
                : d.initCumulative();
          this.dataModify = d;
        }
        function C(a) {
          a = a.dataExtremes;
          const c = a.activeYData;
          if (this.dataModify && a) {
            let d;
            this.options.compare
              ? (d = [
                  this.dataModify.modifyValue(a.dataMin),
                  this.dataModify.modifyValue(a.dataMax),
                ])
              : this.options.cumulative &&
                m(c) &&
                2 <= c.length &&
                (d = b.getCumulativeExtremes(c));
            d && ((a.dataMin = B(d)), (a.dataMax = E(d)));
          }
        }
        function f(a, b) {
          this.options.compare = this.userOptions.compare = a;
          this.update({}, h(b, !0));
          !this.dataModify || ("value" !== a && "percent" !== a)
            ? this.points.forEach((a) => {
                delete a.change;
              })
            : this.dataModify.initCompare(a);
        }
        function y() {
          if (this.xAxis && this.processedYData && this.dataModify) {
            const a = this.processedXData,
              b = this.processedYData,
              d = b.length,
              e = !0 === this.options.compareStart ? 0 : 1;
            let f = -1,
              g;
            this.pointArrayMap &&
              (f = this.pointArrayMap.indexOf(
                this.options.pointValKey || this.pointValKey || "y"
              ));
            for (g = 0; g < d - e; g++) {
              const c = b[g] && -1 < f ? b[g][f] : b[g];
              if (p(c) && 0 !== c && a[g + e] >= (this.xAxis.min || 0)) {
                this.dataModify.compareValue = c;
                break;
              }
            }
          }
        }
        function r(a, b) {
          this.setModifier("compare", a, b);
        }
        function l(a, b) {
          a = h(a, !1);
          this.options.cumulative = this.userOptions.cumulative = a;
          this.update({}, h(b, !0));
          this.dataModify
            ? this.dataModify.initCumulative()
            : this.points.forEach((a) => {
                delete a.cumulativeSum;
              });
        }
        function v(a, b) {
          this.setModifier("cumulative", a, b);
        }
        const d = [];
        a.compose = function (a, b, h) {
          if (K.pushUnique(d, a)) {
            const b = a.prototype;
            b.setCompare = f;
            b.setCumulative = l;
            D(a, "afterInit", A);
            D(a, "afterGetExtremes", C);
            D(a, "afterProcessData", y);
          }
          K.pushUnique(d, b) &&
            ((b = b.prototype),
            (b.setCompare = r),
            (b.setModifier = e),
            (b.setCumulative = v));
          K.pushUnique(d, h) && (h.prototype.tooltipFormatter = g);
          return a;
        };
        class b {
          constructor(a) {
            this.series = a;
          }
          modifyValue() {
            return 0;
          }
          static getCumulativeExtremes(a) {
            let b = Infinity,
              c = -Infinity;
            a.reduce((a, d) => {
              d = a + d;
              b = Math.min(b, d, a);
              c = Math.max(c, d, a);
              return d;
            });
            return [b, c];
          }
          initCompare(a) {
            this.modifyValue = function (b, c) {
              null === b && (b = 0);
              const d = this.compareValue;
              return "undefined" !== typeof b && "undefined" !== typeof d
                ? ((b =
                    "value" === a
                      ? b - d
                      : (b / d) * 100 -
                        (100 === this.series.options.compareBase ? 0 : 100)),
                  "undefined" !== typeof c &&
                    (c = this.series.points[c]) &&
                    (c.change = b),
                  b)
                : 0;
            };
          }
          initCumulative() {
            this.modifyValue = function (a, b) {
              null === a && (a = 0);
              if (void 0 !== a && void 0 !== b) {
                const c = 0 < b ? this.series.points[b - 1] : null;
                c && c.cumulativeSum && (a = t(c.cumulativeSum + a));
                if ((b = this.series.points[b])) b.cumulativeSum = a;
                return a;
              }
              return 0;
            };
          }
        }
        a.Additions = b;
      })(g || (g = {}));
      ("");
      return g;
    }
  );
  L(
    a,
    "Core/Axis/NavigatorAxisComposition.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, A) {
      function u() {
        this.navigatorAxis || (this.navigatorAxis = new p(this));
      }
      function K(a) {
        var h = this.chart,
          g = h.options,
          e = g.navigator;
        const n = this.navigatorAxis,
          m = h.zooming.pinchType;
        g = g.rangeSelector;
        h = h.zooming.type;
        this.isXAxis &&
          ((e && e.enabled) || (g && g.enabled)) &&
          ("y" === h
            ? (a.zoomed = !1)
            : ((!G && "xy" === h) || (G && "xy" === m)) &&
              this.options.range &&
              ((e = n.previousZoom),
              B(a.newMin)
                ? (n.previousZoom = [this.min, this.max])
                : e &&
                  ((a.newMin = e[0]),
                  (a.newMax = e[1]),
                  (n.previousZoom = void 0))));
        "undefined" !== typeof a.zoomed && a.preventDefault();
      }
      const { isTouchDevice: G } = a,
        { addEvent: D, correctFloat: E, defined: B, isNumber: t, pick: q } = A,
        m = [];
      class p {
        static compose(a) {
          A.pushUnique(m, a) &&
            (a.keepProps.push("navigatorAxis"),
            D(a, "init", u),
            D(a, "zoom", K));
        }
        constructor(a) {
          this.axis = a;
        }
        destroy() {
          this.axis = void 0;
        }
        toFixedRange(a, h, g, e) {
          const m = this.axis;
          var n = m.chart;
          a = q(g, m.translate(a, !0, !m.horiz));
          h = q(e, m.translate(h, !0, !m.horiz));
          n = n && n.fixedRange;
          const p = (m.pointRange || 0) / 2;
          B(g) || (a = E(a + p));
          B(e) || (h = E(h - p));
          n &&
            m.dataMin &&
            m.dataMax &&
            (h >= m.dataMax && (a = E(m.dataMax - n)),
            a <= m.dataMin && (h = E(m.dataMin + n)));
          (t(a) && t(h)) || (a = h = void 0);
          return { min: a, max: h };
        }
      }
      return p;
    }
  );
  L(
    a,
    "Stock/Navigator/NavigatorDefaults.js",
    [a["Core/Color/Color.js"], a["Core/Series/SeriesRegistry.js"]],
    function (a, A) {
      ({ parse: a } = a);
      ({ seriesTypes: A } = A);
      A = {
        height: 40,
        margin: 25,
        maskInside: !0,
        handles: {
          width: 7,
          height: 15,
          symbols: ["navigator-handle", "navigator-handle"],
          enabled: !0,
          lineWidth: 1,
          backgroundColor: "#f2f2f2",
          borderColor: "#999999",
        },
        maskFill: a("#667aff").setOpacity(0.3).get(),
        outlineColor: "#999999",
        outlineWidth: 1,
        series: {
          type: "undefined" === typeof A.areaspline ? "line" : "areaspline",
          fillOpacity: 0.05,
          lineWidth: 1,
          compare: null,
          sonification: { enabled: !1 },
          dataGrouping: {
            approximation: "average",
            enabled: !0,
            groupPixelWidth: 2,
            firstAnchor: "firstPoint",
            anchor: "middle",
            lastAnchor: "lastPoint",
            units: [
              ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
              ["second", [1, 2, 5, 10, 15, 30]],
              ["minute", [1, 2, 5, 10, 15, 30]],
              ["hour", [1, 2, 3, 4, 6, 8, 12]],
              ["day", [1, 2, 3, 4]],
              ["week", [1, 2, 3]],
              ["month", [1, 3, 6]],
              ["year", null],
            ],
          },
          dataLabels: { enabled: !1, zIndex: 2 },
          id: "highcharts-navigator-series",
          className: "highcharts-navigator-series",
          lineColor: null,
          marker: { enabled: !1 },
          threshold: null,
        },
        xAxis: {
          overscroll: 0,
          className: "highcharts-navigator-xaxis",
          tickLength: 0,
          lineWidth: 0,
          gridLineColor: "#e6e6e6",
          gridLineWidth: 1,
          tickPixelInterval: 200,
          labels: {
            align: "left",
            style: {
              color: "#000000",
              fontSize: "0.7em",
              opacity: 0.6,
              textOutline: "2px contrast",
            },
            x: 3,
            y: -4,
          },
          crosshair: !1,
        },
        yAxis: {
          className: "highcharts-navigator-yaxis",
          gridLineWidth: 0,
          startOnTick: !1,
          endOnTick: !1,
          minPadding: 0.1,
          maxPadding: 0.1,
          labels: { enabled: !1 },
          crosshair: !1,
          title: { text: null },
          tickLength: 0,
          tickWidth: 0,
        },
      };
      ("");
      return A;
    }
  );
  L(a, "Stock/Navigator/NavigatorSymbols.js", [], function () {
    return {
      "navigator-handle": function (a, A, J, K, G = {}) {
        a = G.width ? G.width / 2 : J;
        A = Math.round(a / 3) + 0.5;
        K = G.height || K;
        return [
          ["M", -a - 1, 0.5],
          ["L", a, 0.5],
          ["L", a, K + 0.5],
          ["L", -a - 1, K + 0.5],
          ["L", -a - 1, 0.5],
          ["M", -A, 4],
          ["L", -A, K - 3],
          ["M", A - 1, 4],
          ["L", A - 1, K - 3],
        ];
      },
    };
  });
  L(
    a,
    "Stock/Navigator/NavigatorComposition.js",
    [
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Axis/NavigatorAxisComposition.js"],
      a["Stock/Navigator/NavigatorDefaults.js"],
      a["Stock/Navigator/NavigatorSymbols.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E) {
      function u() {
        this.navigator && this.navigator.setBaseSeries(null, !1);
      }
      function t() {
        var a;
        const b = this.legend,
          c = this.navigator;
        let e, f, g;
        if (c) {
          e = b && b.options;
          f = c.xAxis;
          g = c.yAxis;
          const { scrollbarHeight: d, scrollButtonSize: k } = c;
          this.inverted
            ? ((c.left = c.opposite
                ? this.chartWidth - d - c.height
                : this.spacing[3] + d),
              (c.top = this.plotTop + k))
            : ((c.left = r(f.left, this.plotLeft + k)),
              (c.top =
                c.navigatorOptions.top ||
                this.chartHeight -
                  c.height -
                  d -
                  ((null === (a = this.scrollbar) || void 0 === a
                    ? void 0
                    : a.options.margin) || 0) -
                  this.spacing[2] -
                  (this.rangeSelector && this.extraBottomMargin
                    ? this.rangeSelector.getHeight()
                    : 0) -
                  (e &&
                  "bottom" === e.verticalAlign &&
                  "proximate" !== e.layout &&
                  e.enabled &&
                  !e.floating
                    ? b.legendHeight + r(e.margin, 10)
                    : 0) -
                  (this.titleOffset ? this.titleOffset[2] : 0)));
          f &&
            g &&
            (this.inverted
              ? (f.options.left = g.options.left = c.left)
              : (f.options.top = g.options.top = c.top),
            f.setAxisSize(),
            g.setAxisSize());
        }
      }
      function q(a) {
        this.navigator ||
          this.scroller ||
          (!this.options.navigator.enabled &&
            !this.options.scrollbar.enabled) ||
          ((this.scroller = this.navigator = new v(this)),
          r(a.redraw, !0) && this.redraw(a.animation));
      }
      function m() {
        const a = this.options;
        if (a.navigator.enabled || a.scrollbar.enabled)
          this.scroller = this.navigator = new v(this);
      }
      function p() {
        var a = this.options;
        const b = a.navigator;
        a = a.rangeSelector;
        if (
          ((b && b.enabled) || (a && a.enabled)) &&
          ((!I && "x" === this.zooming.type) ||
            (I && "x" === this.zooming.pinchType))
        )
          return !1;
      }
      function n(a) {
        const b = a.navigator;
        b &&
          a.xAxis[0] &&
          ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
      }
      function h(a) {
        const b = a.options.navigator || {},
          c = a.options.scrollbar || {};
        this.navigator ||
          this.scroller ||
          (!b.enabled && !c.enabled) ||
          (y(!0, this.options.navigator, b),
          y(!0, this.options.scrollbar, c),
          delete a.options.navigator,
          delete a.options.scrollbar);
      }
      function g() {
        this.chart.navigator &&
          !this.options.isInternal &&
          this.chart.navigator.setBaseSeries(null, !1);
      }
      const { defaultOptions: e, setOptions: x } = a,
        { isTouchDevice: I } = A,
        { getRendererType: M } = D,
        { addEvent: C, extend: f, merge: y, pick: r } = E,
        l = [];
      let v;
      return {
        compose: function (a, b, c, k) {
          J.compose(a);
          v = c;
          E.pushUnique(l, b) &&
            (b.prototype.callbacks.push(n),
            C(b, "afterAddSeries", u),
            C(b, "afterSetChartSize", t),
            C(b, "afterUpdate", q),
            C(b, "beforeRender", m),
            C(b, "beforeShowResetZoom", p),
            C(b, "update", h));
          E.pushUnique(l, k) && C(k, "afterUpdate", g);
          E.pushUnique(l, M) && f(M().prototype.symbols, G);
          E.pushUnique(l, x) && f(e, { navigator: K });
        },
      };
    }
  );
  L(a, "Core/Axis/ScrollbarAxis.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: u, defined: J, pick: K } = a,
      G = [];
    class D {
      static compose(A, B) {
        if (!a.pushUnique(G, A)) return A;
        const t = (a) => {
          const m = K(a.options && a.options.min, a.min),
            p = K(a.options && a.options.max, a.max);
          return {
            axisMin: m,
            axisMax: p,
            scrollMin: J(a.dataMin)
              ? Math.min(m, a.min, a.dataMin, K(a.threshold, Infinity))
              : m,
            scrollMax: J(a.dataMax)
              ? Math.max(p, a.max, a.dataMax, K(a.threshold, -Infinity))
              : p,
          };
        };
        u(A, "afterInit", function () {
          const a = this;
          a.options &&
            a.options.scrollbar &&
            a.options.scrollbar.enabled &&
            ((a.options.scrollbar.vertical = !a.horiz),
            (a.options.startOnTick = a.options.endOnTick = !1),
            (a.scrollbar = new B(
              a.chart.renderer,
              a.options.scrollbar,
              a.chart
            )),
            u(a.scrollbar, "changed", function (m) {
              let { axisMin: p, axisMax: n, scrollMin: h, scrollMax: g } = t(a);
              var e = g - h;
              let q;
              J(p) &&
                J(n) &&
                ((a.horiz && !a.reversed) || (!a.horiz && a.reversed)
                  ? ((q = h + e * this.to), (e = h + e * this.from))
                  : ((q = h + e * (1 - this.from)),
                    (e = h + e * (1 - this.to))),
                this.shouldUpdateExtremes(m.DOMType)
                  ? a.setExtremes(
                      e,
                      q,
                      !0,
                      "mousemove" === m.DOMType || "touchmove" === m.DOMType
                        ? !1
                        : void 0,
                      m
                    )
                  : this.setRange(this.from, this.to));
            }));
        });
        u(A, "afterRender", function () {
          let { scrollMin: a, scrollMax: m } = t(this),
            p = this.scrollbar;
          var n = this.axisTitleMargin + (this.titleOffset || 0),
            h = this.chart.scrollbarsOffsets;
          let g = this.options.margin || 0;
          p &&
            (this.horiz
              ? (this.opposite || (h[1] += n),
                p.position(
                  this.left,
                  this.top + this.height + 2 + h[1] - (this.opposite ? g : 0),
                  this.width,
                  this.height
                ),
                this.opposite || (h[1] += g),
                (n = 1))
              : (this.opposite && (h[0] += n),
                p.position(
                  p.options.opposite
                    ? this.left +
                        this.width +
                        2 +
                        h[0] -
                        (this.opposite ? 0 : g)
                    : this.opposite
                    ? 0
                    : g,
                  this.top,
                  this.width,
                  this.height
                ),
                this.opposite && (h[0] += g),
                (n = 0)),
            (h[n] += p.size + (p.options.margin || 0)),
            isNaN(a) ||
            isNaN(m) ||
            !J(this.min) ||
            !J(this.max) ||
            this.min === this.max
              ? p.setRange(0, 1)
              : ((h = (this.min - a) / (m - a)),
                (n = (this.max - a) / (m - a)),
                (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
                  ? p.setRange(h, n)
                  : p.setRange(1 - n, 1 - h)));
        });
        u(A, "afterGetOffset", function () {
          const a = this.scrollbar;
          var m = a && !a.options.opposite;
          m = this.horiz ? 2 : m ? 3 : 1;
          a &&
            ((this.chart.scrollbarsOffsets = [0, 0]),
            (this.chart.axisOffset[m] += a.size + (a.options.margin || 0)));
        });
        return A;
      }
    }
    return D;
  });
  L(
    a,
    "Stock/Scrollbar/ScrollbarDefaults.js",
    [a["Core/Globals.js"]],
    function (a) {
      return {
        height: 10,
        barBorderRadius: 5,
        buttonBorderRadius: 0,
        buttonsEnabled: !1,
        liveRedraw: void 0,
        margin: void 0,
        minWidth: 6,
        opposite: !0,
        step: 0.2,
        zIndex: 3,
        barBackgroundColor: "#cccccc",
        barBorderWidth: 0,
        barBorderColor: "#cccccc",
        buttonArrowColor: "#333333",
        buttonBackgroundColor: "#e6e6e6",
        buttonBorderColor: "#cccccc",
        buttonBorderWidth: 1,
        rifleColor: "none",
        trackBackgroundColor: "rgba(255, 255, 255, 0.001)",
        trackBorderColor: "#cccccc",
        trackBorderRadius: 5,
        trackBorderWidth: 1,
      };
    }
  );
  L(
    a,
    "Stock/Scrollbar/Scrollbar.js",
    [
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Axis/ScrollbarAxis.js"],
      a["Stock/Scrollbar/ScrollbarDefaults.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G) {
      const { defaultOptions: u } = a,
        {
          addEvent: E,
          correctFloat: B,
          defined: t,
          destroyObjectProperties: q,
          fireEvent: m,
          merge: p,
          pick: n,
          removeEvent: h,
        } = G;
      class g {
        static compose(a) {
          J.compose(a, g);
        }
        static swapXY(a, g) {
          g &&
            a.forEach((a) => {
              const e = a.length;
              let g;
              for (let f = 0; f < e; f += 2)
                (g = a[f + 1]),
                  "number" === typeof g &&
                    ((a[f + 1] = a[f + 2]), (a[f + 2] = g));
            });
          return a;
        }
        constructor(a, g, h) {
          this._events = [];
          this.chart = void 0;
          this.from = this.chartY = this.chartX = 0;
          this.scrollbar = this.renderer = this.options = this.group = void 0;
          this.scrollbarButtons = [];
          this.scrollbarGroup = void 0;
          this.scrollbarLeft = 0;
          this.scrollbarRifles = void 0;
          this.scrollbarStrokeWidth = 1;
          this.to = this.size = this.scrollbarTop = 0;
          this.track = void 0;
          this.trackBorderWidth = 1;
          this.userOptions = void 0;
          this.y = this.x = 0;
          this.init(a, g, h);
        }
        addEvents() {
          var a = this.options.inverted ? [1, 0] : [0, 1];
          const g = this.scrollbarButtons,
            h = this.scrollbarGroup.element,
            m = this.track.element,
            n = this.mouseDownHandler.bind(this),
            f = this.mouseMoveHandler.bind(this),
            p = this.mouseUpHandler.bind(this);
          a = [
            [g[a[0]].element, "click", this.buttonToMinClick.bind(this)],
            [g[a[1]].element, "click", this.buttonToMaxClick.bind(this)],
            [m, "click", this.trackClick.bind(this)],
            [h, "mousedown", n],
            [h.ownerDocument, "mousemove", f],
            [h.ownerDocument, "mouseup", p],
          ];
          A.hasTouch &&
            a.push(
              [h, "touchstart", n],
              [h.ownerDocument, "touchmove", f],
              [h.ownerDocument, "touchend", p]
            );
          a.forEach(function (a) {
            E.apply(null, a);
          });
          this._events = a;
        }
        buttonToMaxClick(a) {
          const e = (this.to - this.from) * n(this.options.step, 0.2);
          this.updatePosition(this.from + e, this.to + e);
          m(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        }
        buttonToMinClick(a) {
          const e = B(this.to - this.from) * n(this.options.step, 0.2);
          this.updatePosition(B(this.from - e), B(this.to - e));
          m(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        }
        cursorToScrollbarPosition(a) {
          var e = this.options;
          e = e.minWidth > this.calculatedWidth ? e.minWidth : 0;
          return {
            chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - e),
            chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - e),
          };
        }
        destroy() {
          const a = this,
            g = a.chart.scroller;
          a.removeEvents();
          [
            "track",
            "scrollbarRifles",
            "scrollbar",
            "scrollbarGroup",
            "group",
          ].forEach(function (e) {
            a[e] && a[e].destroy && (a[e] = a[e].destroy());
          });
          g &&
            a === g.scrollbar &&
            ((g.scrollbar = null), q(g.scrollbarButtons));
        }
        drawScrollbarButton(a) {
          const e = this.renderer,
            h = this.scrollbarButtons,
            m = this.options,
            n = this.size;
          var f = e.g().add(this.group);
          h.push(f);
          m.buttonsEnabled &&
            ((f = e.rect().addClass("highcharts-scrollbar-button").add(f)),
            this.chart.styledMode ||
              f.attr({
                stroke: m.buttonBorderColor,
                "stroke-width": m.buttonBorderWidth,
                fill: m.buttonBackgroundColor,
              }),
            f.attr(
              f.crisp(
                {
                  x: -0.5,
                  y: -0.5,
                  width: n + 1,
                  height: n + 1,
                  r: m.buttonBorderRadius,
                },
                f.strokeWidth()
              )
            ),
            (a = e
              .path(
                g.swapXY(
                  [
                    ["M", n / 2 + (a ? -1 : 1), n / 2 - 3],
                    ["L", n / 2 + (a ? -1 : 1), n / 2 + 3],
                    ["L", n / 2 + (a ? 2 : -2), n / 2],
                  ],
                  m.vertical
                )
              )
              .addClass("highcharts-scrollbar-arrow")
              .add(h[a])),
            this.chart.styledMode || a.attr({ fill: m.buttonArrowColor }));
        }
        init(a, g, h) {
          this.scrollbarButtons = [];
          this.renderer = a;
          this.userOptions = g;
          this.options = p(K, u.scrollbar, g);
          this.options.margin = n(this.options.margin, 10);
          this.chart = h;
          this.size = n(this.options.size, this.options.height);
          g.enabled && (this.render(), this.addEvents());
        }
        mouseDownHandler(a) {
          a = this.chart.pointer.normalize(a);
          a = this.cursorToScrollbarPosition(a);
          this.chartX = a.chartX;
          this.chartY = a.chartY;
          this.initPositions = [this.from, this.to];
          this.grabbedCenter = !0;
        }
        mouseMoveHandler(a) {
          var e = this.chart.pointer.normalize(a),
            g = this.options.vertical ? "chartY" : "chartX";
          const h = this.initPositions || [];
          !this.grabbedCenter ||
            (a.touches && 0 === a.touches[0][g]) ||
            ((e = this.cursorToScrollbarPosition(e)[g]),
            (g = this[g]),
            (g = e - g),
            (this.hasDragged = !0),
            this.updatePosition(h[0] + g, h[1] + g),
            this.hasDragged &&
              m(this, "changed", {
                from: this.from,
                to: this.to,
                trigger: "scrollbar",
                DOMType: a.type,
                DOMEvent: a,
              }));
        }
        mouseUpHandler(a) {
          this.hasDragged &&
            m(this, "changed", {
              from: this.from,
              to: this.to,
              trigger: "scrollbar",
              DOMType: a.type,
              DOMEvent: a,
            });
          this.grabbedCenter =
            this.hasDragged =
            this.chartX =
            this.chartY =
              null;
        }
        position(a, g, h, m) {
          const {
              buttonsEnabled: e,
              margin: f = 0,
              vertical: n,
            } = this.options,
            p = this.rendered ? "animate" : "attr";
          let l = m,
            v = 0;
          this.group.show();
          this.x = a;
          this.y = g + this.trackBorderWidth;
          this.width = h;
          this.height = m;
          this.xOffset = l;
          this.yOffset = v;
          n
            ? ((this.width = this.yOffset = h = this.size),
              (this.xOffset = l = 0),
              (this.yOffset = v = e ? this.size : 0),
              (this.barWidth = m - (e ? 2 * h : 0)),
              (this.x = a += f))
            : ((this.height = m = this.size),
              (this.xOffset = l = e ? this.size : 0),
              (this.barWidth = h - (e ? 2 * m : 0)),
              (this.y += f));
          this.group[p]({ translateX: a, translateY: this.y });
          this.track[p]({ width: h, height: m });
          this.scrollbarButtons[1][p]({
            translateX: n ? 0 : h - l,
            translateY: n ? m - v : 0,
          });
        }
        removeEvents() {
          this._events.forEach(function (a) {
            h.apply(null, a);
          });
          this._events.length = 0;
        }
        render() {
          const a = this.renderer,
            h = this.options,
            m = this.size,
            n = this.chart.styledMode,
            p = a.g("scrollbar").attr({ zIndex: h.zIndex }).hide().add();
          this.group = p;
          this.track = a
            .rect()
            .addClass("highcharts-scrollbar-track")
            .attr({ r: h.trackBorderRadius || 0, height: m, width: m })
            .add(p);
          n ||
            this.track.attr({
              fill: h.trackBackgroundColor,
              stroke: h.trackBorderColor,
              "stroke-width": h.trackBorderWidth,
            });
          const f = (this.trackBorderWidth = this.track.strokeWidth());
          this.track.attr({ x: (-f % 2) / 2, y: (-f % 2) / 2 });
          this.scrollbarGroup = a.g().add(p);
          this.scrollbar = a
            .rect()
            .addClass("highcharts-scrollbar-thumb")
            .attr({ height: m - f, width: m - f, r: h.barBorderRadius || 0 })
            .add(this.scrollbarGroup);
          this.scrollbarRifles = a
            .path(
              g.swapXY(
                [
                  ["M", -3, m / 4],
                  ["L", -3, (2 * m) / 3],
                  ["M", 0, m / 4],
                  ["L", 0, (2 * m) / 3],
                  ["M", 3, m / 4],
                  ["L", 3, (2 * m) / 3],
                ],
                h.vertical
              )
            )
            .addClass("highcharts-scrollbar-rifles")
            .add(this.scrollbarGroup);
          n ||
            (this.scrollbar.attr({
              fill: h.barBackgroundColor,
              stroke: h.barBorderColor,
              "stroke-width": h.barBorderWidth,
            }),
            this.scrollbarRifles.attr({
              stroke: h.rifleColor,
              "stroke-width": 1,
            }));
          this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
          this.scrollbarGroup.translate(
            (-this.scrollbarStrokeWidth % 2) / 2,
            (-this.scrollbarStrokeWidth % 2) / 2
          );
          this.drawScrollbarButton(0);
          this.drawScrollbarButton(1);
        }
        setRange(a, g) {
          const e = this.options,
            h = e.vertical;
          var m = e.minWidth,
            f = this.barWidth;
          const n =
            !this.rendered ||
            this.hasDragged ||
            (this.chart.navigator && this.chart.navigator.hasDragged)
              ? "attr"
              : "animate";
          if (t(f)) {
            var p = f * Math.min(g, 1);
            a = Math.max(a, 0);
            var l = Math.ceil(f * a);
            this.calculatedWidth = p = B(p - l);
            p < m && ((l = (f - m + p) * a), (p = m));
            m = Math.floor(l + this.xOffset + this.yOffset);
            f = p / 2 - 0.5;
            this.from = a;
            this.to = g;
            h
              ? (this.scrollbarGroup[n]({ translateY: m }),
                this.scrollbar[n]({ height: p }),
                this.scrollbarRifles[n]({ translateY: f }),
                (this.scrollbarTop = m),
                (this.scrollbarLeft = 0))
              : (this.scrollbarGroup[n]({ translateX: m }),
                this.scrollbar[n]({ width: p }),
                this.scrollbarRifles[n]({ translateX: f }),
                (this.scrollbarLeft = m),
                (this.scrollbarTop = 0));
            12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show();
            !1 === e.showFull &&
              (0 >= a && 1 <= g ? this.group.hide() : this.group.show());
            this.rendered = !0;
          }
        }
        shouldUpdateExtremes(a) {
          return (
            n(
              this.options.liveRedraw,
              A.svg && !A.isTouchDevice && !this.chart.boosted
            ) ||
            "mouseup" === a ||
            "touchend" === a ||
            !t(a)
          );
        }
        trackClick(a) {
          const e = this.chart.pointer.normalize(a),
            g = this.to - this.from,
            h = this.y + this.scrollbarTop,
            n = this.x + this.scrollbarLeft;
          (this.options.vertical && e.chartY > h) ||
          (!this.options.vertical && e.chartX > n)
            ? this.updatePosition(this.from + g, this.to + g)
            : this.updatePosition(this.from - g, this.to - g);
          m(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        }
        update(a) {
          this.destroy();
          this.init(this.chart.renderer, p(!0, this.options, a), this.chart);
        }
        updatePosition(a, g) {
          1 < g && ((a = B(1 - B(g - a))), (g = 1));
          0 > a && ((g = B(g - a)), (a = 0));
          this.from = a;
          this.to = g;
        }
      }
      g.defaultOptions = K;
      u.scrollbar = p(!0, g.defaultOptions, u.scrollbar);
      return g;
    }
  );
  L(
    a,
    "Stock/Navigator/Navigator.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Axis/NavigatorAxisComposition.js"],
      a["Stock/Navigator/NavigatorComposition.js"],
      a["Stock/Scrollbar/Scrollbar.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E) {
      function u(a, ...c) {
        c = [].filter.call(c, f);
        if (c.length) return Math[a].apply(0, c);
      }
      const { defaultOptions: t } = A,
        { hasTouch: q, isTouchDevice: m } = J,
        {
          addEvent: p,
          clamp: n,
          correctFloat: h,
          defined: g,
          destroyObjectProperties: e,
          erase: x,
          extend: I,
          find: M,
          isArray: C,
          isNumber: f,
          merge: y,
          pick: r,
          removeEvent: l,
          splat: v,
        } = E;
      class d {
        static compose(a, c, e) {
          G.compose(a, c, d, e);
        }
        constructor(a) {
          this.rendered =
            this.range =
            this.outline =
            this.opposite =
            this.navigatorSize =
            this.navigatorSeries =
            this.navigatorOptions =
            this.navigatorGroup =
            this.navigatorEnabled =
            this.left =
            this.height =
            this.handles =
            this.chart =
            this.baseSeries =
              void 0;
          this.scrollbarHeight = 0;
          this.zoomedMin =
            this.zoomedMax =
            this.yAxis =
            this.xAxis =
            this.top =
            this.size =
            this.shades =
            this.scrollButtonSize =
              void 0;
          this.init(a);
        }
        drawHandle(a, c, d, e) {
          const b = this.navigatorOptions.handles.height;
          this.handles[c][e](
            d
              ? {
                  translateX: Math.round(this.left + this.height / 2),
                  translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - b),
                }
              : {
                  translateX: Math.round(this.left + parseInt(a, 10)),
                  translateY: Math.round(
                    this.top + this.height / 2 - b / 2 - 1
                  ),
                }
          );
        }
        drawOutline(a, c, d, e) {
          const b = this.navigatorOptions.maskInside;
          var f = this.outline.strokeWidth();
          const k = f / 2;
          var g = (f % 2) / 2;
          const h = this.scrollButtonSize,
            l = this.size,
            m = this.top;
          f = this.height;
          const n = m - k,
            w = m + f;
          let p = this.left;
          d
            ? ((d = m + c + g),
              (c = m + a + g),
              (g = [
                ["M", p + f, m - h - g],
                ["L", p + f, d],
                ["L", p, d],
                ["M", p, c],
                ["L", p + f, c],
                ["L", p + f, m + l + h],
              ]),
              b && g.push(["M", p + f, d - k], ["L", p + f, c + k]))
            : ((p -= h),
              (a += p + h - g),
              (c += p + h - g),
              (g = [
                ["M", p, n],
                ["L", a, n],
                ["L", a, w],
                ["M", c, w],
                ["L", c, n],
                ["L", p + l + 2 * h, m + k],
              ]),
              b && g.push(["M", a - k, n], ["L", c + k, n]));
          this.outline[e]({ d: g });
        }
        drawMasks(a, c, d, e) {
          const b = this.left,
            f = this.top,
            k = this.height;
          let g, h, l, m;
          d
            ? ((l = [b, b, b]),
              (m = [f, f + a, f + c]),
              (h = [k, k, k]),
              (g = [a, c - a, this.size - c]))
            : ((l = [b, b + a, b + c]),
              (m = [f, f, f]),
              (h = [a, c - a, this.size - c]),
              (g = [k, k, k]));
          this.shades.forEach((a, b) => {
            a[e]({ x: l[b], y: m[b], width: h[b], height: g[b] });
          });
        }
        renderElements() {
          const a = this,
            c = a.navigatorOptions,
            d = c.maskInside,
            f = a.chart,
            e = f.renderer,
            g = { cursor: f.inverted ? "ns-resize" : "ew-resize" },
            h = (a.navigatorGroup = e
              .g("navigator")
              .attr({ zIndex: 8, visibility: "hidden" })
              .add());
          [!d, d, !d].forEach((b, d) => {
            const k = e
              .rect()
              .addClass(
                "highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")
              )
              .add(h);
            f.styledMode ||
              (k.attr({ fill: b ? c.maskFill : "rgba(0,0,0,0)" }),
              1 === d && k.css(g));
            a.shades[d] = k;
          });
          a.outline = e.path().addClass("highcharts-navigator-outline").add(h);
          f.styledMode ||
            a.outline.attr({
              "stroke-width": c.outlineWidth,
              stroke: c.outlineColor,
            });
          if (c.handles && c.handles.enabled) {
            const b = c.handles,
              { height: d, width: k } = b;
            [0, 1].forEach((c) => {
              a.handles[c] = e.symbol(b.symbols[c], -k / 2 - 1, 0, k, d, b);
              f.inverted &&
                a.handles[c].attr({
                  rotation: 90,
                  rotationOriginX: Math.floor(-k / 2),
                  rotationOriginY: (d + k) / 2,
                });
              a.handles[c]
                .attr({ zIndex: 7 - c })
                .addClass(
                  "highcharts-navigator-handle highcharts-navigator-handle-" +
                    ["left", "right"][c]
                )
                .add(h);
              f.styledMode ||
                a.handles[c]
                  .attr({
                    fill: b.backgroundColor,
                    stroke: b.borderColor,
                    "stroke-width": b.lineWidth,
                  })
                  .css(g);
            });
          }
        }
        update(a) {
          (this.series || []).forEach((a) => {
            a.baseSeries && delete a.baseSeries.navigatorSeries;
          });
          this.destroy();
          y(!0, this.chart.options.navigator, a);
          this.init(this.chart);
        }
        render(a, c, d, e) {
          var b = this.chart;
          const k = this.xAxis,
            l = k.pointRange || 0;
          var m = k.navigatorAxis.fake ? b.xAxis[0] : k;
          const p = this.navigatorEnabled;
          var w = this.rendered,
            v = b.inverted;
          const q = b.xAxis[0].minRange,
            t = b.xAxis[0].options.maxRange,
            u = this.scrollButtonSize;
          let x = this.scrollbarHeight,
            y;
          if (!this.hasDragged || g(d)) {
            a = h(a - l / 2);
            c = h(c + l / 2);
            if (!f(a) || !f(c))
              if (w) (d = 0), (e = r(k.width, m.width));
              else return;
            this.left = r(k.left, b.plotLeft + u + (v ? b.plotWidth : 0));
            var A =
              (this.size =
              y =
                r(k.len, (v ? b.plotHeight : b.plotWidth) - 2 * u));
            b = v ? x : y + 2 * u;
            d = r(d, k.toPixels(a, !0));
            e = r(e, k.toPixels(c, !0));
            (f(d) && Infinity !== Math.abs(d)) || ((d = 0), (e = b));
            a = k.toValue(d, !0);
            c = k.toValue(e, !0);
            var B = Math.abs(h(c - a));
            B < q
              ? this.grabbedLeft
                ? (d = k.toPixels(c - q - l, !0))
                : this.grabbedRight && (e = k.toPixels(a + q + l, !0))
              : g(t) &&
                h(B - l) > t &&
                (this.grabbedLeft
                  ? (d = k.toPixels(c - t - l, !0))
                  : this.grabbedRight && (e = k.toPixels(a + t + l, !0)));
            this.zoomedMax = n(Math.max(d, e), 0, A);
            this.zoomedMin = n(
              this.fixedWidth
                ? this.zoomedMax - this.fixedWidth
                : Math.min(d, e),
              0,
              A
            );
            this.range = this.zoomedMax - this.zoomedMin;
            A = Math.round(this.zoomedMax);
            d = Math.round(this.zoomedMin);
            p &&
              (this.navigatorGroup.attr({ visibility: "inherit" }),
              (w = w && !this.hasDragged ? "animate" : "attr"),
              this.drawMasks(d, A, v, w),
              this.drawOutline(d, A, v, w),
              this.navigatorOptions.handles.enabled &&
                (this.drawHandle(d, 0, v, w), this.drawHandle(A, 1, v, w)));
            this.scrollbar &&
              (v
                ? ((v = this.top - u),
                  (m =
                    this.left -
                    x +
                    (p || !m.opposite
                      ? 0
                      : (m.titleOffset || 0) + m.axisTitleMargin)),
                  (x = y + 2 * u))
                : ((v = this.top + (p ? this.height : -x)),
                  (m = this.left - u)),
              this.scrollbar.position(m, v, b, x),
              this.scrollbar.setRange(
                this.zoomedMin / (y || 1),
                this.zoomedMax / (y || 1)
              ));
            this.rendered = !0;
          }
        }
        addMouseEvents() {
          const a = this,
            c = a.chart,
            d = c.container;
          let e = [],
            f,
            g;
          a.mouseMoveHandler = f = function (b) {
            a.onMouseMove(b);
          };
          a.mouseUpHandler = g = function (b) {
            a.onMouseUp(b);
          };
          e = a.getPartsEvents("mousedown");
          e.push(
            p(c.renderTo, "mousemove", f),
            p(d.ownerDocument, "mouseup", g)
          );
          q &&
            (e.push(
              p(c.renderTo, "touchmove", f),
              p(d.ownerDocument, "touchend", g)
            ),
            e.concat(a.getPartsEvents("touchstart")));
          a.eventsToUnbind = e;
          a.series &&
            a.series[0] &&
            e.push(
              p(a.series[0].xAxis, "foundExtremes", function () {
                c.navigator.modifyNavigatorAxisExtremes();
              })
            );
        }
        getPartsEvents(a) {
          const b = this,
            d = [];
          ["shades", "handles"].forEach(function (c) {
            b[c].forEach(function (e, f) {
              d.push(
                p(e.element, a, function (a) {
                  b[c + "Mousedown"](a, f);
                })
              );
            });
          });
          return d;
        }
        shadesMousedown(a, c) {
          a = this.chart.pointer.normalize(a);
          const b = this.chart,
            d = this.xAxis,
            e = this.zoomedMin,
            f = this.size,
            h = this.range;
          let l = this.left,
            m = a.chartX,
            n,
            p;
          b.inverted && ((m = a.chartY), (l = this.top));
          1 === c
            ? ((this.grabbedCenter = m),
              (this.fixedWidth = h),
              (this.dragOffset = m - e))
            : ((a = m - l - h / 2),
              0 === c
                ? (a = Math.max(0, a))
                : 2 === c &&
                  a + h >= f &&
                  ((a = f - h),
                  this.reversedExtremes
                    ? ((a -= h), (p = this.getUnionExtremes().dataMin))
                    : (n = this.getUnionExtremes().dataMax)),
              a !== e &&
                ((this.fixedWidth = h),
                (c = d.navigatorAxis.toFixedRange(a, a + h, p, n)),
                g(c.min) &&
                  b.xAxis[0].setExtremes(
                    Math.min(c.min, c.max),
                    Math.max(c.min, c.max),
                    !0,
                    null,
                    { trigger: "navigator" }
                  )));
        }
        handlesMousedown(a, c) {
          this.chart.pointer.normalize(a);
          a = this.chart;
          const b = a.xAxis[0],
            d = this.reversedExtremes;
          0 === c
            ? ((this.grabbedLeft = !0),
              (this.otherHandlePos = this.zoomedMax),
              (this.fixedExtreme = d ? b.min : b.max))
            : ((this.grabbedRight = !0),
              (this.otherHandlePos = this.zoomedMin),
              (this.fixedExtreme = d ? b.max : b.min));
          a.fixedRange = null;
        }
        onMouseMove(a) {
          const b = this;
          var d = b.chart;
          const e = b.navigatorSize,
            f = b.range,
            g = b.dragOffset,
            h = d.inverted;
          let l = b.left;
          (a.touches && 0 === a.touches[0].pageX) ||
            ((a = d.pointer.normalize(a)),
            (d = a.chartX),
            h && ((l = b.top), (d = a.chartY)),
            b.grabbedLeft
              ? ((b.hasDragged = !0), b.render(0, 0, d - l, b.otherHandlePos))
              : b.grabbedRight
              ? ((b.hasDragged = !0), b.render(0, 0, b.otherHandlePos, d - l))
              : b.grabbedCenter &&
                ((b.hasDragged = !0),
                d < g ? (d = g) : d > e + g - f && (d = e + g - f),
                b.render(0, 0, d - g, d - g + f)),
            b.hasDragged &&
              b.scrollbar &&
              r(b.scrollbar.options.liveRedraw, !m && !this.chart.boosted) &&
              ((a.DOMType = a.type),
              setTimeout(function () {
                b.onMouseUp(a);
              }, 0)));
        }
        onMouseUp(a) {
          var b = this.chart,
            d = this.xAxis,
            e = this.scrollbar;
          const h = a.DOMEvent || a,
            l = b.inverted,
            m = this.rendered && !this.hasDragged ? "animate" : "attr";
          let n, p;
          ((!this.hasDragged || (e && e.hasDragged)) &&
            "scrollbar" !== a.trigger) ||
            ((e = this.getUnionExtremes()),
            this.zoomedMin === this.otherHandlePos
              ? (n = this.fixedExtreme)
              : this.zoomedMax === this.otherHandlePos &&
                (p = this.fixedExtreme),
            this.zoomedMax === this.size &&
              (p = this.reversedExtremes ? e.dataMin : e.dataMax),
            0 === this.zoomedMin &&
              (n = this.reversedExtremes ? e.dataMax : e.dataMin),
            (d = d.navigatorAxis.toFixedRange(
              this.zoomedMin,
              this.zoomedMax,
              n,
              p
            )),
            g(d.min) &&
              b.xAxis[0].setExtremes(
                Math.min(d.min, d.max),
                Math.max(d.min, d.max),
                !0,
                this.hasDragged ? !1 : null,
                {
                  trigger: "navigator",
                  triggerOp: "navigator-drag",
                  DOMEvent: h,
                }
              ));
          "mousemove" !== a.DOMType &&
            "touchmove" !== a.DOMType &&
            (this.grabbedLeft =
              this.grabbedRight =
              this.grabbedCenter =
              this.fixedWidth =
              this.fixedExtreme =
              this.otherHandlePos =
              this.hasDragged =
              this.dragOffset =
                null);
          this.navigatorEnabled &&
            f(this.zoomedMin) &&
            f(this.zoomedMax) &&
            ((b = Math.round(this.zoomedMin)),
            (a = Math.round(this.zoomedMax)),
            this.shades && this.drawMasks(b, a, l, m),
            this.outline && this.drawOutline(b, a, l, m),
            this.navigatorOptions.handles.enabled &&
              Object.keys(this.handles).length === this.handles.length &&
              (this.drawHandle(b, 0, l, m), this.drawHandle(a, 1, l, m)));
        }
        removeEvents() {
          this.eventsToUnbind &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind = void 0));
          this.removeBaseSeriesEvents();
        }
        removeBaseSeriesEvents() {
          const a = this.baseSeries || [];
          this.navigatorEnabled &&
            a[0] &&
            (!1 !== this.navigatorOptions.adaptToUpdatedData &&
              a.forEach(function (a) {
                l(a, "updatedData", this.updatedDataHandler);
              }, this),
            a[0].xAxis &&
              l(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
        }
        init(b) {
          var c = b.options,
            d = c.navigator || {},
            e = d.enabled,
            g = c.scrollbar || {},
            h = g.enabled;
          c = (e && d.height) || 0;
          var l = (h && g.height) || 0;
          const m = (g.buttonsEnabled && l) || 0;
          this.handles = [];
          this.shades = [];
          this.chart = b;
          this.setBaseSeries();
          this.height = c;
          this.scrollbarHeight = l;
          this.scrollButtonSize = m;
          this.scrollbarEnabled = h;
          this.navigatorEnabled = e;
          this.navigatorOptions = d;
          this.scrollbarOptions = g;
          this.opposite = r(d.opposite, !(e || !b.inverted));
          const n = this;
          e = n.baseSeries;
          g = b.xAxis.length;
          h = b.yAxis.length;
          l = (e && e[0] && e[0].xAxis) || b.xAxis[0] || { options: {} };
          b.isDirtyBox = !0;
          n.navigatorEnabled
            ? ((n.xAxis = new a(
                b,
                y(
                  { breaks: l.options.breaks, ordinal: l.options.ordinal },
                  d.xAxis,
                  {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    type: "datetime",
                    index: g,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1,
                  },
                  b.inverted
                    ? { offsets: [m, 0, -m, 0], width: c }
                    : { offsets: [0, -m, 0, m], height: c }
                ),
                "xAxis"
              )),
              (n.yAxis = new a(
                b,
                y(
                  d.yAxis,
                  {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: h,
                    isInternal: !0,
                    reversed: r(
                      d.yAxis && d.yAxis.reversed,
                      b.yAxis[0] && b.yAxis[0].reversed,
                      !1
                    ),
                    zoomEnabled: !1,
                  },
                  b.inverted ? { width: c } : { height: c }
                ),
                "yAxis"
              )),
              e || d.series.data
                ? n.updateNavigatorSeries(!1)
                : 0 === b.series.length &&
                  (n.unbindRedraw = p(b, "beforeRedraw", function () {
                    0 < b.series.length &&
                      !n.series &&
                      (n.setBaseSeries(), n.unbindRedraw());
                  })),
              (n.reversedExtremes =
                (b.inverted && !n.xAxis.reversed) ||
                (!b.inverted && n.xAxis.reversed)),
              n.renderElements(),
              n.addMouseEvents())
            : ((n.xAxis = {
                chart: b,
                navigatorAxis: { fake: !0 },
                translate: function (a, c) {
                  var d = b.xAxis[0];
                  const e = d.getExtremes(),
                    f = d.len - 2 * m,
                    k = u("min", d.options.min, e.dataMin);
                  d = u("max", d.options.max, e.dataMax) - k;
                  return c ? (a * d) / f + k : (f * (a - k)) / d;
                },
                toPixels: function (a) {
                  return this.translate(a);
                },
                toValue: function (a) {
                  return this.translate(a, !0);
                },
              }),
              (n.xAxis.navigatorAxis.axis = n.xAxis),
              (n.xAxis.navigatorAxis.toFixedRange =
                K.prototype.toFixedRange.bind(n.xAxis.navigatorAxis)));
          b.options.scrollbar.enabled &&
            ((d = y(b.options.scrollbar, { vertical: b.inverted })),
            !f(d.margin) &&
              n.navigatorEnabled &&
              (d.margin = b.inverted ? -3 : 3),
            (b.scrollbar = n.scrollbar = new D(b.renderer, d, b)),
            p(n.scrollbar, "changed", function (a) {
              var b = n.size;
              const c = b * this.to;
              b *= this.from;
              n.hasDragged = n.scrollbar.hasDragged;
              n.render(0, 0, b, c);
              this.shouldUpdateExtremes(a.DOMType) &&
                setTimeout(function () {
                  n.onMouseUp(a);
                });
            }));
          n.addBaseSeriesEvents();
          n.addChartEvents();
        }
        getUnionExtremes(a) {
          const b = this.chart.xAxis[0],
            d = this.xAxis,
            e = d.options,
            f = b.options;
          let g;
          (a && null === b.dataMin) ||
            (g = {
              dataMin: r(
                e && e.min,
                u("min", f.min, b.dataMin, d.dataMin, d.min)
              ),
              dataMax: r(
                e && e.max,
                u("max", f.max, b.dataMax, d.dataMax, d.max)
              ),
            });
          return g;
        }
        setBaseSeries(a, c) {
          const b = this.chart,
            d = (this.baseSeries = []);
          a =
            a ||
            (b.options && b.options.navigator.baseSeries) ||
            (b.series.length
              ? M(b.series, (a) => !a.options.isInternal).index
              : 0);
          (b.series || []).forEach((b, c) => {
            b.options.isInternal ||
              (!b.options.showInNavigator &&
                ((c !== a && b.options.id !== a) ||
                  !1 === b.options.showInNavigator)) ||
              d.push(b);
          });
          this.xAxis &&
            !this.xAxis.navigatorAxis.fake &&
            this.updateNavigatorSeries(!0, c);
        }
        updateNavigatorSeries(a, c) {
          const b = this,
            d = b.chart,
            e = b.baseSeries,
            f = {
              enableMouseTracking: !1,
              index: null,
              linkedTo: null,
              group: "nav",
              padXAxis: !1,
              xAxis: "navigator-x-axis",
              yAxis: "navigator-y-axis",
              showInLegend: !1,
              stacking: void 0,
              isInternal: !0,
              states: { inactive: { opacity: 1 } },
            },
            g = (b.series = (b.series || []).filter((a) => {
              const c = a.baseSeries;
              return 0 > e.indexOf(c)
                ? (c &&
                    (l(c, "updatedData", b.updatedDataHandler),
                    delete c.navigatorSeries),
                  a.chart && a.destroy(),
                  !1)
                : !0;
            }));
          let h,
            m,
            n = b.navigatorOptions.series,
            p;
          e &&
            e.length &&
            e.forEach((a) => {
              const k = a.navigatorSeries;
              var l = I(
                { color: a.color, visible: a.visible },
                C(n) ? t.navigator.series : n
              );
              (k && !1 === b.navigatorOptions.adaptToUpdatedData) ||
                ((f.name = "Navigator " + e.length),
                (h = a.options || {}),
                (p = h.navigatorOptions || {}),
                (l.dataLabels = v(l.dataLabels)),
                (m = y(h, f, l, p)),
                (m.pointRange = r(
                  l.pointRange,
                  p.pointRange,
                  t.plotOptions[m.type || "line"].pointRange
                )),
                (l = p.data || l.data),
                (b.hasNavigatorData = b.hasNavigatorData || !!l),
                (m.data = l || (h.data && h.data.slice(0))),
                k && k.options
                  ? k.update(m, c)
                  : ((a.navigatorSeries = d.initSeries(m)),
                    (a.navigatorSeries.baseSeries = a),
                    g.push(a.navigatorSeries)));
            });
          if ((n.data && (!e || !e.length)) || C(n))
            (b.hasNavigatorData = !1),
              (n = v(n)),
              n.forEach((a, c) => {
                f.name = "Navigator " + (g.length + 1);
                m = y(
                  t.navigator.series,
                  {
                    color:
                      (d.series[c] &&
                        !d.series[c].options.isInternal &&
                        d.series[c].color) ||
                      d.options.colors[c] ||
                      d.options.colors[0],
                  },
                  f,
                  a
                );
                m.data = a.data;
                m.data && ((b.hasNavigatorData = !0), g.push(d.initSeries(m)));
              });
          a && this.addBaseSeriesEvents();
        }
        addBaseSeriesEvents() {
          const a = this,
            c = a.baseSeries || [];
          c[0] &&
            c[0].xAxis &&
            c[0].eventsToUnbind.push(
              p(c[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)
            );
          c.forEach((b) => {
            b.eventsToUnbind.push(
              p(b, "show", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
              })
            );
            b.eventsToUnbind.push(
              p(b, "hide", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
              })
            );
            !1 !== this.navigatorOptions.adaptToUpdatedData &&
              b.xAxis &&
              b.eventsToUnbind.push(
                p(b, "updatedData", this.updatedDataHandler)
              );
            b.eventsToUnbind.push(
              p(b, "remove", function () {
                this.navigatorSeries &&
                  (x(a.series, this.navigatorSeries),
                  g(this.navigatorSeries.options) &&
                    this.navigatorSeries.remove(!1),
                  delete this.navigatorSeries);
              })
            );
          });
        }
        getBaseSeriesMin(a) {
          return this.baseSeries.reduce(function (a, b) {
            return Math.min(a, b.xData && b.xData.length ? b.xData[0] : a);
          }, a);
        }
        modifyNavigatorAxisExtremes() {
          const a = this.xAxis;
          if ("undefined" !== typeof a.getExtremes) {
            const b = this.getUnionExtremes(!0);
            !b ||
              (b.dataMin === a.min && b.dataMax === a.max) ||
              ((a.min = b.dataMin), (a.max = b.dataMax));
          }
        }
        modifyBaseAxisExtremes() {
          const a = this.chart.navigator;
          var c = this.getExtremes();
          const d = c.dataMin,
            e = c.dataMax;
          c = c.max - c.min;
          const g = a.stickToMin,
            h = a.stickToMax,
            l = r(this.options.overscroll, 0),
            m = a.series && a.series[0],
            n = !!this.setExtremes;
          let p, v;
          (this.eventArgs &&
            "rangeSelectorButton" === this.eventArgs.trigger) ||
            (g && ((v = d), (p = v + c)),
            h &&
              ((p = e + l),
              g ||
                (v = Math.max(
                  d,
                  p - c,
                  a.getBaseSeriesMin(
                    m && m.xData ? m.xData[0] : -Number.MAX_VALUE
                  )
                ))),
            n &&
              (g || h) &&
              f(v) &&
              ((this.min = this.userMin = v), (this.max = this.userMax = p)));
          a.stickToMin = a.stickToMax = null;
        }
        updatedDataHandler() {
          const a = this.chart.navigator,
            c = this.navigatorSeries;
          a.stickToMax = r(
            this.chart.options.navigator &&
              this.chart.options.navigator.stickToMax,
            a.reversedExtremes
              ? 0 === Math.round(a.zoomedMin)
              : Math.round(a.zoomedMax) >= Math.round(a.size)
          );
          a.stickToMin = a.shouldStickToMin(this, a);
          c &&
            !a.hasNavigatorData &&
            ((c.options.pointStart = this.xData[0]),
            c.setData(this.options.data, !1, null, !1));
        }
        shouldStickToMin(a, c) {
          c = c.getBaseSeriesMin(a.xData[0]);
          var b = a.xAxis;
          a = b.max;
          const d = b.min;
          b = b.options.range;
          return f(a) && f(d) ? (b && 0 < a - c ? a - c < b : d <= c) : !1;
        }
        addChartEvents() {
          this.eventsToUnbind || (this.eventsToUnbind = []);
          this.eventsToUnbind.push(
            p(this.chart, "redraw", function () {
              const a = this.navigator,
                c =
                  a &&
                  ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) ||
                    this.xAxis[0]);
              c && a.render(c.min, c.max);
            }),
            p(this.chart, "getMargins", function () {
              let a = this.navigator,
                c = a.opposite ? "plotTop" : "marginBottom";
              this.inverted && (c = a.opposite ? "marginRight" : "plotLeft");
              this[c] =
                (this[c] || 0) +
                (a.navigatorEnabled || !this.inverted
                  ? a.height + a.scrollbarHeight
                  : 0) +
                a.navigatorOptions.margin;
            })
          );
        }
        destroy() {
          this.removeEvents();
          this.xAxis &&
            (x(this.chart.xAxis, this.xAxis), x(this.chart.axes, this.xAxis));
          this.yAxis &&
            (x(this.chart.yAxis, this.yAxis), x(this.chart.axes, this.yAxis));
          (this.series || []).forEach((a) => {
            a.destroy && a.destroy();
          });
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
            .split(" ")
            .forEach((a) => {
              this[a] && this[a].destroy && this[a].destroy();
              this[a] = null;
            });
          [this.handles].forEach((a) => {
            e(a);
          });
        }
      }
      return d;
    }
  );
  L(a, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function () {
    return {
      lang: {
        rangeSelectorZoom: "Zoom",
        rangeSelectorFrom: "",
        rangeSelectorTo: "\u2192",
      },
      rangeSelector: {
        allButtonsEnabled: !1,
        buttons: void 0,
        buttonSpacing: 5,
        dropdown: "responsive",
        enabled: void 0,
        verticalAlign: "top",
        buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
        floating: !1,
        x: 0,
        y: 0,
        height: void 0,
        inputBoxBorderColor: "none",
        inputBoxHeight: 17,
        inputBoxWidth: void 0,
        inputDateFormat: "%e %b %Y",
        inputDateParser: void 0,
        inputEditDateFormat: "%Y-%m-%d",
        inputEnabled: !0,
        inputPosition: { align: "right", x: 0, y: 0 },
        inputSpacing: 5,
        selected: void 0,
        buttonPosition: { align: "left", x: 0, y: 0 },
        inputStyle: { color: "#334eff", cursor: "pointer", fontSize: "0.8em" },
        labelStyle: { color: "#666666", fontSize: "0.8em" },
      },
    };
  });
  L(
    a,
    "Stock/RangeSelector/RangeSelectorComposition.js",
    [
      a["Core/Defaults.js"],
      a["Stock/RangeSelector/RangeSelectorDefaults.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      function u() {
        const a = this.range,
          e = a.type,
          d = this.max,
          b = this.chart.time,
          c = function (a, c) {
            const d = "year" === e ? "FullYear" : "Month",
              f = new b.Date(a),
              g = b.get(d, f);
            b.set(d, f, g + c);
            g === b.get(d, f) && b.set("Date", f, 0);
            return f.getTime() - a;
          };
        let f, g;
        I(a)
          ? ((f = d - a), (g = a))
          : a &&
            ((f = d + c(d, -(a.count || 1))),
            this.chart && (this.chart.fixedRange = d - f));
        const h = C(this.dataMin, Number.MIN_VALUE);
        I(f) || (f = h);
        f <= h &&
          ((f = h),
          "undefined" === typeof g && (g = c(f, a.count)),
          (this.newMax = Math.min(f + g, C(this.dataMax, Number.MAX_VALUE))));
        I(d) ? !I(a) && a && a._offsetMin && (f += a._offsetMin) : (f = void 0);
        return f;
      }
      function G() {
        this.options.rangeSelector &&
          this.options.rangeSelector.enabled &&
          (this.rangeSelector = new r(this));
      }
      function D() {
        var a = this.axes;
        const e = this.rangeSelector;
        e &&
          (I(e.deferredYTDClick) &&
            (e.clickButton(e.deferredYTDClick), delete e.deferredYTDClick),
          a.forEach((a) => {
            a.updateNames();
            a.setScale();
          }),
          this.getAxisMargins(),
          e.render(),
          (a = e.options.verticalAlign),
          e.options.floating ||
            ("bottom" === a
              ? (this.extraBottomMargin = !0)
              : "middle" !== a && (this.extraTopMargin = !0)));
      }
      function E(a) {
        let e, d, b, c;
        const g = a.rangeSelector,
          l = () => {
            g &&
              ((e = a.xAxis[0].getExtremes()),
              (d = a.legend),
              (c = g && g.options.verticalAlign),
              I(e.min) && g.render(e.min, e.max),
              d.display &&
                "top" === c &&
                c === d.options.verticalAlign &&
                ((b = M(a.spacingBox)),
                (b.y =
                  "vertical" === d.options.layout
                    ? a.plotTop
                    : b.y + g.getHeight()),
                (d.group.placed = !1),
                d.align(b)));
          };
        g &&
          (x(f, (b) => b[0] === a) ||
            f.push([
              a,
              [
                h(a.xAxis[0], "afterSetExtremes", function (a) {
                  g && g.render(a.min, a.max);
                }),
                h(a, "redraw", l),
              ],
            ]),
          l());
      }
      function B() {
        for (let a = 0, e = f.length; a < e; ++a) {
          const d = f[a];
          if (d[0] === this) {
            d[1].forEach((a) => a());
            f.splice(a, 1);
            break;
          }
        }
      }
      function t() {
        var a = this.rangeSelector;
        a &&
          ((a = a.getHeight()),
          this.extraTopMargin && (this.plotTop += a),
          this.extraBottomMargin && (this.marginBottom += a));
      }
      function q() {
        var a = this.rangeSelector;
        a &&
          !a.options.floating &&
          (a.render(),
          (a = a.options.verticalAlign),
          "bottom" === a
            ? (this.extraBottomMargin = !0)
            : "middle" !== a && (this.extraTopMargin = !0));
      }
      function m(a) {
        var e = a.options.rangeSelector;
        a = this.extraBottomMargin;
        const d = this.extraTopMargin;
        let b = this.rangeSelector;
        e &&
          e.enabled &&
          !g(b) &&
          this.options.rangeSelector &&
          ((this.options.rangeSelector.enabled = !0),
          (this.rangeSelector = b = new r(this)));
        this.extraTopMargin = this.extraBottomMargin = !1;
        b &&
          (E(this),
          (e =
            (e && e.verticalAlign) || (b.options && b.options.verticalAlign)),
          b.options.floating ||
            ("bottom" === e
              ? (this.extraBottomMargin = !0)
              : "middle" !== e && (this.extraTopMargin = !0)),
          this.extraBottomMargin !== a || this.extraTopMargin !== d) &&
          (this.isDirtyBox = !0);
      }
      const { defaultOptions: p, setOptions: n } = a,
        {
          addEvent: h,
          defined: g,
          extend: e,
          find: x,
          isNumber: I,
          merge: M,
          pick: C,
        } = J,
        f = [],
        y = [];
      let r;
      return {
        compose: function (a, f, d) {
          r = d;
          J.pushUnique(y, a) && (a.prototype.minFromRange = u);
          J.pushUnique(y, f) &&
            (h(f, "afterGetContainer", G),
            h(f, "beforeRender", D),
            h(f, "destroy", B),
            h(f, "getMargins", t),
            h(f, "render", q),
            h(f, "update", m),
            f.prototype.callbacks.push(E));
          J.pushUnique(y, n) &&
            (e(p, { rangeSelector: A.rangeSelector }), e(p.lang, A.lang));
        },
      };
    }
  );
  L(
    a,
    "Stock/RangeSelector/RangeSelector.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Stock/RangeSelector/RangeSelectorComposition.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D) {
      function u(a) {
        if (-1 !== a.indexOf("%L")) return "text";
        const d = "aAdewbBmoyY"
            .split("")
            .some((b) => -1 !== a.indexOf("%" + b)),
          b = "HkIlMS".split("").some((b) => -1 !== a.indexOf("%" + b));
        return d && b ? "datetime-local" : d ? "date" : b ? "time" : "text";
      }
      const { defaultOptions: B } = A,
        {
          addEvent: t,
          createElement: q,
          css: m,
          defined: p,
          destroyObjectProperties: n,
          discardElement: h,
          extend: g,
          fireEvent: e,
          isNumber: x,
          merge: I,
          objectEach: M,
          pad: C,
          pick: f,
          pInt: y,
          splat: r,
        } = D;
      class l {
        static compose(a, d) {
          K.compose(a, d, l);
        }
        constructor(a) {
          this.buttons = void 0;
          this.buttonOptions = l.prototype.defaultButtons;
          this.initialButtonGroupWidth = 0;
          this.options = void 0;
          this.chart = a;
          this.init(a);
        }
        clickButton(g, d) {
          const b = this.chart,
            c = this.buttonOptions[g],
            k = b.xAxis[0];
          var h = (b.scroller && b.scroller.getUnionExtremes()) || k || {},
            l = c.type;
          const m = c.dataGrouping;
          let n = h.dataMin,
            v = h.dataMax,
            q,
            u = k && Math.round(Math.min(k.max, f(v, k.max))),
            y;
          h = c._range;
          let A,
            B,
            C,
            E = !0;
          if (null !== n && null !== v) {
            b.fixedRange = h;
            this.setSelected(g);
            m &&
              ((this.forcedDataGrouping = !0),
              a.prototype.setDataGrouping.call(
                k || { chart: this.chart },
                m,
                !1
              ),
              (this.frozenStates = c.preserveDataGrouping));
            if ("month" === l || "year" === l)
              k
                ? ((l = { range: c, max: u, chart: b, dataMin: n, dataMax: v }),
                  (q = k.minFromRange.call(l)),
                  x(l.newMax) && (u = l.newMax),
                  (E = !1))
                : (h = c);
            else if (h)
              (q = Math.max(u - h, n)), (u = Math.min(q + h, v)), (E = !1);
            else if ("ytd" === l)
              if (k) {
                if ("undefined" === typeof v || "undefined" === typeof n)
                  (n = Number.MAX_VALUE),
                    (v = Number.MIN_VALUE),
                    b.series.forEach((a) => {
                      if ((a = a.xData))
                        (n = Math.min(a[0], n)),
                          (v = Math.max(a[a.length - 1], v));
                    }),
                    (d = !1);
                l = this.getYTDExtremes(v, n, b.time.useUTC);
                q = A = l.min;
                u = l.max;
              } else {
                this.deferredYTDClick = g;
                return;
              }
            else
              "all" === l &&
                k &&
                (b.navigator &&
                  b.navigator.baseSeries[0] &&
                  (b.navigator.baseSeries[0].xAxis.options.range = void 0),
                (q = n),
                (u = v));
            E && c._offsetMin && p(q) && (q += c._offsetMin);
            c._offsetMax && p(u) && (u += c._offsetMax);
            this.dropdown && (this.dropdown.selectedIndex = g + 1);
            k
              ? k.setExtremes(q, u, f(d, !0), void 0, {
                  trigger: "rangeSelectorButton",
                  rangeSelectorButton: c,
                })
              : ((y = r(b.options.xAxis)[0]),
                (C = y.range),
                (y.range = h),
                (B = y.min),
                (y.min = A),
                t(b, "load", function () {
                  y.range = C;
                  y.min = B;
                }));
            e(this, "afterBtnClick");
          }
        }
        setSelected(a) {
          this.selected = this.options.selected = a;
        }
        init(a) {
          const d = this,
            b = a.options.rangeSelector,
            c = b.buttons || d.defaultButtons.slice(),
            f = b.selected,
            g = function () {
              const a = d.minInput,
                b = d.maxInput;
              a && a.blur && e(a, "blur");
              b && b.blur && e(b, "blur");
            };
          d.chart = a;
          d.options = b;
          d.buttons = [];
          d.buttonOptions = c;
          this.eventsToUnbind = [];
          this.eventsToUnbind.push(t(a.container, "mousedown", g));
          this.eventsToUnbind.push(t(a, "resize", g));
          c.forEach(d.computeButtonRange);
          "undefined" !== typeof f && c[f] && this.clickButton(f, !1);
          this.eventsToUnbind.push(
            t(a, "load", function () {
              a.xAxis &&
                a.xAxis[0] &&
                t(a.xAxis[0], "setExtremes", function (b) {
                  this.max - this.min !== a.fixedRange &&
                    "rangeSelectorButton" !== b.trigger &&
                    "updatedData" !== b.trigger &&
                    d.forcedDataGrouping &&
                    !d.frozenStates &&
                    this.setDataGrouping(!1, !1);
                });
            })
          );
        }
        updateButtonStates() {
          const a = this;
          var d = this.chart;
          const b = this.dropdown,
            c = d.xAxis[0],
            e = Math.round(c.max - c.min),
            f = !c.hasVisibleSeries,
            g = (d.scroller && d.scroller.getUnionExtremes()) || c,
            h = g.dataMin,
            l = g.dataMax;
          d = a.getYTDExtremes(l, h, d.time.useUTC);
          const m = d.min,
            n = d.max,
            p = a.selected,
            r = a.options.allButtonsEnabled,
            q = a.buttons;
          let t = x(p);
          a.buttonOptions.forEach((d, g) => {
            var k = d._range,
              w = d.type,
              v = d.count || 1;
            const z = q[g],
              u = d._offsetMax - d._offsetMin,
              x = g === p,
              F = k > l - h,
              y = k < c.minRange;
            d = 0;
            let A = !1,
              H = !1;
            k = k === e;
            ("month" === w || "year" === w) &&
            e + 36e5 >= 864e5 * { month: 28, year: 365 }[w] * v - u &&
            e - 36e5 <= 864e5 * { month: 31, year: 366 }[w] * v + u
              ? (k = !0)
              : "ytd" === w
              ? ((k = n - m + u === e), (A = !x))
              : "all" === w &&
                ((k = c.max - c.min >= l - h), (H = !x && t && k));
            w = !r && (F || y || H || f);
            v = (x && k) || (k && !t && !A) || (x && a.frozenStates);
            w ? (d = 3) : v && ((t = !0), (d = 2));
            z.state !== d &&
              (z.setState(d),
              b &&
                ((b.options[g + 1].disabled = w),
                2 === d && (b.selectedIndex = g + 1)),
              0 === d && p === g && a.setSelected());
          });
        }
        computeButtonRange(a) {
          const d = a.type,
            b = a.count || 1,
            c = {
              millisecond: 1,
              second: 1e3,
              minute: 6e4,
              hour: 36e5,
              day: 864e5,
              week: 6048e5,
            };
          if (c[d]) a._range = c[d] * b;
          else if ("month" === d || "year" === d)
            a._range = 864e5 * { month: 30, year: 365 }[d] * b;
          a._offsetMin = f(a.offsetMin, 0);
          a._offsetMax = f(a.offsetMax, 0);
          a._range += a._offsetMax - a._offsetMin;
        }
        getInputValue(a) {
          a = "min" === a ? this.minInput : this.maxInput;
          const d = this.chart.options.rangeSelector,
            b = this.chart.time;
          return a
            ? (
                ("text" === a.type && d.inputDateParser) ||
                this.defaultInputDateParser
              )(a.value, b.useUTC, b)
            : 0;
        }
        setInputValue(a, d) {
          const b = this.options,
            c = this.chart.time,
            e = "min" === a ? this.minInput : this.maxInput;
          a = "min" === a ? this.minDateBox : this.maxDateBox;
          if (e) {
            var f = e.getAttribute("data-hc-time");
            f = p(f) ? Number(f) : void 0;
            p(d) &&
              (p(f) && e.setAttribute("data-hc-time-previous", f),
              e.setAttribute("data-hc-time", d),
              (f = d));
            e.value = c.dateFormat(
              this.inputTypeFormats[e.type] || b.inputEditDateFormat,
              f
            );
            a && a.attr({ text: c.dateFormat(b.inputDateFormat, f) });
          }
        }
        setInputExtremes(a, d, b) {
          if ((a = "min" === a ? this.minInput : this.maxInput)) {
            const c = this.inputTypeFormats[a.type],
              e = this.chart.time;
            c &&
              ((d = e.dateFormat(c, d)),
              a.min !== d && (a.min = d),
              (b = e.dateFormat(c, b)),
              a.max !== b && (a.max = b));
          }
        }
        showInput(a) {
          const d = "min" === a ? this.minDateBox : this.maxDateBox;
          if (
            (a = "min" === a ? this.minInput : this.maxInput) &&
            d &&
            this.inputGroup
          ) {
            const b = "text" === a.type,
              { translateX: c, translateY: e } = this.inputGroup,
              { inputBoxWidth: f } = this.options;
            m(a, {
              width: b ? d.width + (f ? -2 : 20) + "px" : "auto",
              height: d.height - 2 + "px",
              border: "2px solid silver",
            });
            b && f
              ? m(a, { left: c + d.x + "px", top: e + "px" })
              : m(a, {
                  left:
                    Math.min(
                      Math.round(d.x + c - (a.offsetWidth - d.width) / 2),
                      this.chart.chartWidth - a.offsetWidth
                    ) + "px",
                  top: e - (a.offsetHeight - d.height) / 2 + "px",
                });
          }
        }
        hideInput(a) {
          (a = "min" === a ? this.minInput : this.maxInput) &&
            m(a, { top: "-9999em", border: 0, width: "1px", height: "1px" });
        }
        defaultInputDateParser(a, d, b) {
          var c = a.split("/").join("-").split(" ").join("T");
          -1 === c.indexOf("T") && (c += "T00:00");
          if (d) c += "Z";
          else {
            var e;
            if ((e = J.isSafari))
              (e = c),
                (e = !(
                  6 < e.length &&
                  (e.lastIndexOf("-") === e.length - 6 ||
                    e.lastIndexOf("+") === e.length - 6)
                ));
            e &&
              ((e = new Date(c).getTimezoneOffset() / 60),
              (c += 0 >= e ? `+${C(-e)}:00` : `-${C(e)}:00`));
          }
          c = Date.parse(c);
          x(c) ||
            ((a = a.split("-")), (c = Date.UTC(y(a[0]), y(a[1]) - 1, y(a[2]))));
          b && d && x(c) && (c += b.getTimezoneOffset(c));
          return c;
        }
        drawInput(a) {
          function d() {
            const { maxInput: c, minInput: d } = f,
              e = b.xAxis[0];
            var g = b.scroller && b.scroller.xAxis ? b.scroller.xAxis : e;
            const k = g.dataMin;
            g = g.dataMax;
            let h = f.getInputValue(a);
            h !== Number(t.getAttribute("data-hc-time-previous")) &&
              x(h) &&
              (t.setAttribute("data-hc-time-previous", h),
              p && c && x(k)
                ? h > Number(c.getAttribute("data-hc-time"))
                  ? (h = void 0)
                  : h < k && (h = k)
                : d &&
                  x(g) &&
                  (h < Number(d.getAttribute("data-hc-time"))
                    ? (h = void 0)
                    : h > g && (h = g)),
              "undefined" !== typeof h &&
                e.setExtremes(p ? h : e.min, p ? e.max : h, void 0, void 0, {
                  trigger: "rangeSelectorInput",
                }));
          }
          const { chart: b, div: c, inputGroup: e } = this,
            f = this,
            h = b.renderer.style || {};
          var l = b.renderer;
          const n = b.options.rangeSelector,
            p = "min" === a;
          var r = B.lang[p ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
          r = l
            .label(r, 0)
            .addClass("highcharts-range-label")
            .attr({ padding: r ? 2 : 0, height: r ? n.inputBoxHeight : 0 })
            .add(e);
          l = l
            .label("", 0)
            .addClass("highcharts-range-input")
            .attr({
              padding: 2,
              width: n.inputBoxWidth,
              height: n.inputBoxHeight,
              "text-align": "center",
            })
            .on("click", function () {
              f.showInput(a);
              f[a + "Input"].focus();
            });
          b.styledMode ||
            l.attr({ stroke: n.inputBoxBorderColor, "stroke-width": 1 });
          l.add(e);
          const t = q(
            "input",
            { name: a, className: "highcharts-range-selector" },
            void 0,
            c
          );
          t.setAttribute("type", u(n.inputDateFormat || "%e %b %Y"));
          b.styledMode ||
            (r.css(I(h, n.labelStyle)),
            l.css(I({ color: "#333333" }, h, n.inputStyle)),
            m(
              t,
              g(
                {
                  position: "absolute",
                  border: 0,
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  textAlign: "center",
                  fontSize: h.fontSize,
                  fontFamily: h.fontFamily,
                  top: "-9999em",
                },
                n.inputStyle
              )
            ));
          t.onfocus = () => {
            f.showInput(a);
          };
          t.onblur = () => {
            t === J.doc.activeElement && d();
            f.hideInput(a);
            f.setInputValue(a);
            t.blur();
          };
          let v = !1;
          t.onchange = () => {
            v || (d(), f.hideInput(a), t.blur());
          };
          t.onkeypress = (a) => {
            13 === a.keyCode && d();
          };
          t.onkeydown = (a) => {
            v = !0;
            (38 !== a.keyCode && 40 !== a.keyCode) || d();
          };
          t.onkeyup = () => {
            v = !1;
          };
          return { dateBox: l, input: t, label: r };
        }
        getPosition() {
          var a = this.chart;
          const d = a.options.rangeSelector;
          a = "top" === d.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
          return {
            buttonTop: a + d.buttonPosition.y,
            inputTop: a + d.inputPosition.y - 10,
          };
        }
        getYTDExtremes(a, d, b) {
          const c = this.chart.time;
          var e = new c.Date(a);
          const f = c.get("FullYear", e);
          b = b ? c.Date.UTC(f, 0, 1) : +new c.Date(f, 0, 1);
          d = Math.max(d, b);
          e = e.getTime();
          return { max: Math.min(a || e, e), min: d };
        }
        render(a, d) {
          var b = this.chart,
            c = b.renderer;
          const e = b.container;
          var g = b.options;
          const h = g.rangeSelector,
            l = f(g.chart.style && g.chart.style.zIndex, 0) + 1;
          g = h.inputEnabled;
          if (!1 !== h.enabled) {
            this.rendered ||
              ((this.group = c
                .g("range-selector-group")
                .attr({ zIndex: 7 })
                .add()),
              (this.div = q("div", void 0, {
                position: "relative",
                height: 0,
                zIndex: l,
              })),
              this.buttonOptions.length && this.renderButtons(),
              e.parentNode && e.parentNode.insertBefore(this.div, e),
              g &&
                ((this.inputGroup = c.g("input-group").add(this.group)),
                (c = this.drawInput("min")),
                (this.minDateBox = c.dateBox),
                (this.minLabel = c.label),
                (this.minInput = c.input),
                (c = this.drawInput("max")),
                (this.maxDateBox = c.dateBox),
                (this.maxLabel = c.label),
                (this.maxInput = c.input)));
            if (
              g &&
              (this.setInputValue("min", a),
              this.setInputValue("max", d),
              (a =
                (b.scroller && b.scroller.getUnionExtremes()) ||
                b.xAxis[0] ||
                {}),
              p(a.dataMin) &&
                p(a.dataMax) &&
                ((b = b.xAxis[0].minRange || 0),
                this.setInputExtremes(
                  "min",
                  a.dataMin,
                  Math.min(a.dataMax, this.getInputValue("max")) - b
                ),
                this.setInputExtremes(
                  "max",
                  Math.max(a.dataMin, this.getInputValue("min")) + b,
                  a.dataMax
                )),
              this.inputGroup)
            ) {
              let a = 0;
              [
                this.minLabel,
                this.minDateBox,
                this.maxLabel,
                this.maxDateBox,
              ].forEach((b) => {
                if (b) {
                  const { width: c } = b.getBBox();
                  c && (b.attr({ x: a }), (a += c + h.inputSpacing));
                }
              });
            }
            this.alignElements();
            this.rendered = !0;
          }
        }
        renderButtons() {
          const { buttons: a, chart: d, options: b } = this,
            c = B.lang,
            g = d.renderer,
            h = I(b.buttonTheme),
            l = h && h.states,
            m = h.width || 28;
          delete h.width;
          delete h.states;
          this.buttonGroup = g.g("range-selector-buttons").add(this.group);
          const n = (this.dropdown = q(
            "select",
            void 0,
            {
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              border: 0,
              top: "-9999em",
              cursor: "pointer",
              opacity: 0.0001,
            },
            this.div
          ));
          t(n, "touchstart", () => {
            n.style.fontSize = "16px";
          });
          [
            [J.isMS ? "mouseover" : "mouseenter"],
            [J.isMS ? "mouseout" : "mouseleave"],
            ["change", "click"],
          ].forEach(([b, c]) => {
            t(n, b, () => {
              const d = a[this.currentButtonIndex()];
              d && e(d.element, c || b);
            });
          });
          this.zoomText = g
            .label((c && c.rangeSelectorZoom) || "", 0)
            .attr({
              padding: b.buttonTheme.padding,
              height: b.buttonTheme.height,
              paddingLeft: 0,
              paddingRight: 0,
            })
            .add(this.buttonGroup);
          this.chart.styledMode ||
            (this.zoomText.css(b.labelStyle),
            (h["stroke-width"] = f(h["stroke-width"], 0)));
          q(
            "option",
            { textContent: this.zoomText.textStr, disabled: !0 },
            void 0,
            n
          );
          this.buttonOptions.forEach((b, c) => {
            q("option", { textContent: b.title || b.text }, void 0, n);
            a[c] = g
              .button(
                b.text,
                0,
                0,
                (a) => {
                  const d = b.events && b.events.click;
                  let e;
                  d && (e = d.call(b, a));
                  !1 !== e && this.clickButton(c);
                  this.isActive = !0;
                },
                h,
                l && l.hover,
                l && l.select,
                l && l.disabled
              )
              .attr({ "text-align": "center", width: m })
              .add(this.buttonGroup);
            b.title && a[c].attr("title", b.title);
          });
        }
        alignElements() {
          const {
            buttonGroup: a,
            buttons: d,
            chart: b,
            group: c,
            inputGroup: e,
            options: g,
            zoomText: h,
          } = this;
          var l = b.options;
          const m =
              l.exporting &&
              !1 !== l.exporting.enabled &&
              l.navigation &&
              l.navigation.buttonOptions,
            { buttonPosition: n, inputPosition: p, verticalAlign: r } = g;
          l = (a, c) =>
            m &&
            this.titleCollision(b) &&
            "top" === r &&
            "right" === c.align &&
            c.y - a.getBBox().height - 12 <
              (m.y || 0) + (m.height || 0) + b.spacing[0]
              ? -40
              : 0;
          var t = b.plotLeft;
          if (c && n && p) {
            var q = n.x - b.spacing[3];
            if (a) {
              this.positionButtons();
              if (!this.initialButtonGroupWidth) {
                let a = 0;
                h && (a += h.getBBox().width + 5);
                d.forEach((b, c) => {
                  a += b.width;
                  c !== d.length - 1 && (a += g.buttonSpacing);
                });
                this.initialButtonGroupWidth = a;
              }
              t -= b.spacing[3];
              this.updateButtonStates();
              var u = l(a, n);
              this.alignButtonGroup(u);
              c.placed = a.placed = b.hasLoaded;
            }
            u = 0;
            e &&
              ((u = l(e, p)),
              "left" === p.align
                ? (q = t)
                : "right" === p.align && (q = -Math.max(b.axisOffset[1], -u)),
              e.align(
                {
                  y: p.y,
                  width: e.getBBox().width,
                  align: p.align,
                  x: p.x + q - 2,
                },
                !0,
                b.spacingBox
              ),
              (e.placed = b.hasLoaded));
            this.handleCollision(u);
            c.align({ verticalAlign: r }, !0, b.spacingBox);
            l = c.alignAttr.translateY;
            t = c.getBBox().height + 20;
            q = 0;
            "bottom" === r &&
              ((q =
                (q = b.legend && b.legend.options) &&
                "bottom" === q.verticalAlign &&
                q.enabled &&
                !q.floating
                  ? b.legend.legendHeight + f(q.margin, 10)
                  : 0),
              (t = t + q - 20),
              (q =
                l -
                t -
                (g.floating ? 0 : g.y) -
                (b.titleOffset ? b.titleOffset[2] : 0) -
                10));
            if ("top" === r)
              g.floating && (q = 0),
                b.titleOffset && b.titleOffset[0] && (q = b.titleOffset[0]),
                (q += b.margin[0] - b.spacing[0] || 0);
            else if ("middle" === r)
              if (p.y === n.y) q = l;
              else if (p.y || n.y)
                q = 0 > p.y || 0 > n.y ? q - Math.min(p.y, n.y) : l - t;
            c.translate(g.x, g.y + Math.floor(q));
            const { minInput: k, maxInput: m, dropdown: w } = this;
            g.inputEnabled &&
              k &&
              m &&
              ((k.style.marginTop = c.translateY + "px"),
              (m.style.marginTop = c.translateY + "px"));
            w && (w.style.marginTop = c.translateY + "px");
          }
        }
        alignButtonGroup(a, d) {
          const { chart: b, options: c, buttonGroup: e } = this,
            { buttonPosition: g } = c,
            h = b.plotLeft - b.spacing[3];
          let l = g.x - b.spacing[3];
          "right" === g.align
            ? (l += a - h)
            : "center" === g.align && (l -= h / 2);
          e &&
            e.align(
              {
                y: g.y,
                width: f(d, this.initialButtonGroupWidth),
                align: g.align,
                x: l,
              },
              !0,
              b.spacingBox
            );
        }
        positionButtons() {
          const { buttons: a, chart: d, options: b, zoomText: c } = this,
            e = d.hasLoaded ? "animate" : "attr",
            { buttonPosition: g } = b,
            h = d.plotLeft;
          let l = h;
          c &&
            "hidden" !== c.visibility &&
            (c[e]({ x: f(h + g.x, h) }), (l += g.x + c.getBBox().width + 5));
          for (let c = 0, d = this.buttonOptions.length; c < d; ++c)
            if ("hidden" !== a[c].visibility)
              a[c][e]({ x: l }), (l += a[c].width + b.buttonSpacing);
            else a[c][e]({ x: h });
        }
        handleCollision(a) {
          const { chart: d, buttonGroup: b, inputGroup: c } = this,
            { buttonPosition: e, dropdown: f, inputPosition: g } = this.options,
            h = () => {
              let a = 0;
              this.buttons.forEach((b) => {
                b = b.getBBox();
                b.width > a && (a = b.width);
              });
              return a;
            },
            l = (d) => {
              if (c && b) {
                const f =
                    c.alignAttr.translateX +
                    c.alignOptions.x -
                    a +
                    c.getBBox().x +
                    2,
                  h = c.alignOptions.width,
                  k = b.alignAttr.translateX + b.getBBox().x;
                return k + d > f && f + h > k && e.y < g.y + c.getBBox().height;
              }
              return !1;
            },
            m = () => {
              c &&
                b &&
                c.attr({
                  translateX:
                    c.alignAttr.translateX + (d.axisOffset[1] >= -a ? 0 : -a),
                  translateY: c.alignAttr.translateY + b.getBBox().height + 10,
                });
            };
          if (b) {
            if ("always" === f) {
              this.collapseButtons(a);
              l(h()) && m();
              return;
            }
            "never" === f && this.expandButtons();
          }
          c && b
            ? g.align === e.align || l(this.initialButtonGroupWidth + 20)
              ? "responsive" === f
                ? (this.collapseButtons(a), l(h()) && m())
                : m()
              : "responsive" === f && this.expandButtons()
            : b &&
              "responsive" === f &&
              (this.initialButtonGroupWidth > d.plotWidth
                ? this.collapseButtons(a)
                : this.expandButtons());
        }
        collapseButtons(a) {
          const {
              buttons: d,
              buttonOptions: b,
              chart: c,
              dropdown: e,
              options: g,
              zoomText: h,
            } = this,
            l =
              (c.userOptions.rangeSelector &&
                c.userOptions.rangeSelector.buttonTheme) ||
              {},
            m = (a) => ({
              text: a ? `${a} \u25be` : "\u25be",
              width: "auto",
              paddingLeft: f(g.buttonTheme.paddingLeft, l.padding, 8),
              paddingRight: f(g.buttonTheme.paddingRight, l.padding, 8),
            });
          h && h.hide();
          let n = !1;
          b.forEach((a, b) => {
            b = d[b];
            2 !== b.state ? b.hide() : (b.show(), b.attr(m(a.text)), (n = !0));
          });
          n ||
            (e && (e.selectedIndex = 0),
            d[0].show(),
            d[0].attr(m(this.zoomText && this.zoomText.textStr)));
          const { align: p } = g.buttonPosition;
          this.positionButtons();
          ("right" !== p && "center" !== p) ||
            this.alignButtonGroup(
              a,
              d[this.currentButtonIndex()].getBBox().width
            );
          this.showDropdown();
        }
        expandButtons() {
          const {
            buttons: a,
            buttonOptions: d,
            options: b,
            zoomText: c,
          } = this;
          this.hideDropdown();
          c && c.show();
          d.forEach((c, d) => {
            d = a[d];
            d.show();
            d.attr({
              text: c.text,
              width: b.buttonTheme.width || 28,
              paddingLeft: f(b.buttonTheme.paddingLeft, "unset"),
              paddingRight: f(b.buttonTheme.paddingRight, "unset"),
            });
            2 > d.state && d.setState(0);
          });
          this.positionButtons();
        }
        currentButtonIndex() {
          const { dropdown: a } = this;
          return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0;
        }
        showDropdown() {
          const { buttonGroup: a, buttons: d, chart: b, dropdown: c } = this;
          if (a && c) {
            const { translateX: e, translateY: f } = a,
              g = d[this.currentButtonIndex()].getBBox();
            m(c, {
              left: b.plotLeft + e + "px",
              top: f + 0.5 + "px",
              width: g.width + "px",
              height: g.height + "px",
            });
            this.hasVisibleDropdown = !0;
          }
        }
        hideDropdown() {
          const { dropdown: a } = this;
          a &&
            (m(a, { top: "-9999em", width: "1px", height: "1px" }),
            (this.hasVisibleDropdown = !1));
        }
        getHeight() {
          var a = this.options,
            d = this.group;
          const b = a.y,
            c = a.buttonPosition.y,
            e = a.inputPosition.y;
          if (a.height) return a.height;
          this.alignElements();
          a = d ? d.getBBox(!0).height + 13 + b : 0;
          d = Math.min(e, c);
          if ((0 > e && 0 > c) || (0 < e && 0 < c)) a += Math.abs(d);
          return a;
        }
        titleCollision(a) {
          return !(a.options.title.text || a.options.subtitle.text);
        }
        update(a) {
          const d = this.chart;
          I(!0, d.options.rangeSelector, a);
          this.destroy();
          this.init(d);
          this.render();
        }
        destroy() {
          const a = this,
            d = a.minInput,
            b = a.maxInput;
          a.eventsToUnbind &&
            (a.eventsToUnbind.forEach((a) => a()), (a.eventsToUnbind = void 0));
          n(a.buttons);
          d && (d.onfocus = d.onblur = d.onchange = null);
          b && (b.onfocus = b.onblur = b.onchange = null);
          M(
            a,
            function (b, d) {
              b &&
                "chart" !== d &&
                (b instanceof G
                  ? b.destroy()
                  : b instanceof S.HTMLElement && h(b));
              b !== l.prototype[d] && (a[d] = null);
            },
            this
          );
        }
      }
      g(l.prototype, {
        defaultButtons: [
          { type: "month", count: 1, text: "1m", title: "View 1 month" },
          { type: "month", count: 3, text: "3m", title: "View 3 months" },
          { type: "month", count: 6, text: "6m", title: "View 6 months" },
          { type: "ytd", text: "YTD", title: "View year to date" },
          { type: "year", count: 1, text: "1y", title: "View 1 year" },
          { type: "all", text: "All", title: "View all" },
        ],
        inputTypeFormats: {
          "datetime-local": "%Y-%m-%dT%H:%M:%S",
          date: "%Y-%m-%d",
          time: "%H:%M:%S",
        },
      });
      ("");
      return l;
    }
  );
  L(
    a,
    "Core/Axis/OrdinalAxis.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Globals.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      const {
          addEvent: u,
          correctFloat: D,
          css: E,
          defined: B,
          error: t,
          pick: q,
          timeUnits: m,
        } = K,
        p = [];
      var n;
      (function (a) {
        function g(a, c, d, e, f = [], g = 0, h) {
          const b = {},
            k = this.options.tickPixelInterval;
          var l = this.chart.time,
            n = [],
            p;
          let r;
          let q;
          var w = 0;
          let u = [],
            v = -Number.MAX_VALUE;
          if (
            (!this.options.ordinal && !this.options.breaks) ||
            !f ||
            3 > f.length ||
            "undefined" === typeof c
          )
            return l.getTimeTicks.apply(l, arguments);
          const z = f.length;
          for (p = 0; p < z; p++) {
            q = p && f[p - 1] > d;
            f[p] < c && (w = p);
            if (p === z - 1 || f[p + 1] - f[p] > 5 * g || q) {
              if (f[p] > v) {
                for (
                  r = l.getTimeTicks(a, f[w], f[p], e);
                  r.length && r[0] <= v;

                )
                  r.shift();
                r.length && (v = r[r.length - 1]);
                n.push(u.length);
                u = u.concat(r);
              }
              w = p + 1;
            }
            if (q) break;
          }
          if (r) {
            f = r.info;
            if (h && f.unitRange <= m.hour) {
              p = u.length - 1;
              for (w = 1; w < p; w++)
                if (l.dateFormat("%d", u[w]) !== l.dateFormat("%d", u[w - 1])) {
                  b[u[w]] = "day";
                  var x = !0;
                }
              x && (b[u[0]] = "day");
              f.higherRanks = b;
            }
            f.segmentStarts = n;
            u.info = f;
          } else t(12, !1, this.chart);
          if (h && B(k)) {
            w = u.length;
            l = [];
            x = [];
            let a;
            for (p = w; p--; )
              (n = this.translate(u[p])), a && (x[p] = a - n), (l[p] = a = n);
            x.sort();
            x = x[Math.floor(x.length / 2)];
            x < 0.6 * k && (x = null);
            p = u[w - 1] > d ? w - 1 : w;
            for (a = void 0; p--; )
              (n = l[p]),
                (w = Math.abs(a - n)),
                a && w < 0.8 * k && (null === x || w < 0.8 * x)
                  ? (b[u[p]] && !b[u[p + 1]] ? ((w = p + 1), (a = n)) : (w = p),
                    u.splice(w, 1))
                  : (a = n);
          }
          return u;
        }
        function e(a) {
          const b = this.ordinal.positions;
          if (!b) return a;
          let d = b.length - 1,
            e;
          0 > a
            ? (a = b[0])
            : a > d
            ? (a = b[d])
            : ((d = Math.floor(a)), (e = a - d));
          return "undefined" !== typeof e && "undefined" !== typeof b[d]
            ? b[d] + (e ? e * (b[d + 1] - b[d]) : 0)
            : a;
        }
        function h(a) {
          var b = this.ordinal,
            d = b.positions;
          if (!d) return a;
          var e = D(
            (a - (this.old ? this.old.min : this.min)) *
              (this.old ? this.old.transA : this.transA) +
              this.minPixelPadding
          );
          (a >= d[0] && a <= d[d.length - 1]) ||
            (b.extendedOrdinalPositions ||
              (b.extendedOrdinalPositions = b.getExtendedPositions()),
            (d = b.extendedOrdinalPositions));
          if (d && d.length) {
            a = d.indexOf(a);
            b = -1 !== a ? a : D(b.getIndexOfPoint(e, d));
            e = D(b % 1);
            if (0 <= b && b <= d.length - 1)
              return (
                d[Math.floor(b)] + e * (d[Math.ceil(b)] - d[Math.floor(b)])
              );
            e = d.length;
            a = d[0];
            d = d[e - 1];
            const c = (d - a) / (e - 1);
            return 0 > b ? a + c * b : d + c * (b - e);
          }
          return a;
        }
        function n(b, c) {
          const d = a.Additions.findIndexOf(b, c, !0);
          return b[d] === c ? d : d + (c - b[d]) / (b[d + 1] - b[d]);
        }
        function G() {
          this.ordinal || (this.ordinal = new a.Additions(this));
        }
        function C() {
          this.isXAxis &&
            B(this.options.overscroll) &&
            this.max === this.dataMax &&
            (!this.chart.mouseIsDown || this.isInternal) &&
            (!this.eventArgs ||
              (this.eventArgs && "navigator" !== this.eventArgs.trigger)) &&
            ((this.max += this.options.overscroll),
            !this.isInternal &&
              B(this.userMin) &&
              (this.min += this.options.overscroll));
        }
        function f() {
          this.horiz &&
            !this.isDirty &&
            (this.isDirty =
              this.isOrdinal &&
              this.chart.navigator &&
              !this.chart.navigator.adaptToUpdatedData);
        }
        function y() {
          this.ordinal &&
            (this.ordinal.beforeSetTickPositions(),
            (this.tickInterval = this.ordinal.postProcessTickInterval(
              this.tickInterval
            )));
        }
        function r(a) {
          const b = this.xAxis[0],
            d = b.options.overscroll,
            e = a.originalEvent.chartX,
            f = this.options.chart.panning;
          let g = !1;
          if (f && "y" !== f.type && b.options.ordinal && b.series.length) {
            var h = this.mouseDownX;
            const a = b.getExtremes(),
              c = a.dataMax,
              f = a.min,
              k = a.max;
            var l = this.hoverPoints,
              n =
                b.closestPointRange ||
                (b.ordinal && b.ordinal.overscrollPointsRange);
            h = Math.round(
              (h - e) / (b.translationSlope * (b.ordinal.slope || n))
            );
            n = b.ordinal.getExtendedPositions();
            var m = { ordinal: { positions: n, extendedOrdinalPositions: n } };
            n = b.index2val;
            const p = b.val2lin;
            let r;
            m.ordinal.positions
              ? 1 < Math.abs(h) &&
                (l &&
                  l.forEach(function (a) {
                    a.setState();
                  }),
                0 > h
                  ? ((l = m), (r = b.ordinal.positions ? b : m))
                  : ((l = b.ordinal.positions ? b : m), (r = m)),
                (m = r.ordinal.positions),
                c > m[m.length - 1] && m.push(c),
                (this.fixedRange = k - f),
                (h = b.navigatorAxis.toFixedRange(
                  void 0,
                  void 0,
                  n.apply(l, [p.apply(l, [f, !0]) + h]),
                  n.apply(r, [p.apply(r, [k, !0]) + h])
                )),
                h.min >= Math.min(a.dataMin, f) &&
                  h.max <= Math.max(c, k) + d &&
                  b.setExtremes(h.min, h.max, !0, !1, { trigger: "pan" }),
                (this.mouseDownX = e),
                E(this.container, { cursor: "move" }))
              : (g = !0);
          } else g = !0;
          g || (f && /y/.test(f.type))
            ? d && (b.max = b.dataMax + d)
            : a.preventDefault();
        }
        function l() {
          const a = this.xAxis;
          a &&
            a.options.ordinal &&
            (delete a.ordinal.index, delete a.ordinal.extendedOrdinalPositions);
        }
        function v(a, c) {
          const b = this.ordinal;
          var d = b.positions;
          let e = b.slope,
            f = b.extendedOrdinalPositions;
          if (!d) return a;
          var g = d.length;
          if (d[0] <= a && d[g - 1] >= a) a = n(d, a);
          else {
            f ||
              ((f = b.getExtendedPositions && b.getExtendedPositions()),
              (b.extendedOrdinalPositions = f));
            if (!f || !f.length) return a;
            g = f.length;
            e || (e = (f[g - 1] - f[0]) / g);
            d = n(f, d[0]);
            a =
              a >= f[0] && a <= f[g - 1]
                ? n(f, a) - d
                : a < f[0]
                ? -d - (f[0] - a) / e
                : (a - f[g - 1]) / e + g - d;
          }
          return c ? a : e * (a || 0) + b.offset;
        }
        a.compose = function (a, c, d) {
          if (K.pushUnique(p, a)) {
            const b = a.prototype;
            b.getTimeTicks = g;
            b.index2val = e;
            b.lin2val = h;
            b.val2lin = v;
            b.ordinal2lin = b.val2lin;
            u(a, "afterInit", G);
            u(a, "foundExtremes", C);
            u(a, "afterSetScale", f);
            u(a, "initialAxisTranslation", y);
          }
          K.pushUnique(p, d) && u(d, "pan", r);
          K.pushUnique(p, c) && u(c, "updatedData", l);
          return a;
        };
        class d {
          constructor(a) {
            this.index = {};
            this.axis = a;
          }
          beforeSetTickPositions() {
            const a = this.axis,
              c = a.ordinal;
            var d = a.getExtremes();
            const e = d.min;
            var f = d.max;
            const g = a.isXAxis && !!a.options.breaks;
            d = a.options.ordinal;
            const h = a.chart.options.chart.ignoreHiddenSeries;
            let l, n;
            var m;
            let p = [],
              r = Number.MAX_VALUE,
              t = !1,
              u = !1,
              v = !1;
            if (d || g) {
              let b = 0;
              a.series.forEach(function (a, c) {
                n = [];
                0 < c &&
                  "highcharts-navigator-series" !== a.options.id &&
                  1 < a.processedXData.length &&
                  (u = b !== a.processedXData[1] - a.processedXData[0]);
                b = a.processedXData[1] - a.processedXData[0];
                a.boosted && (v = a.boosted);
                if (
                  !(
                    (h && !1 === a.visible) ||
                    (!1 === a.takeOrdinalPosition && !g)
                  ) &&
                  ((p = p.concat(a.processedXData)),
                  (l = p.length),
                  p.sort(function (a, b) {
                    return a - b;
                  }),
                  (r = Math.min(r, q(a.closestPointRange, r))),
                  l)
                ) {
                  for (c = 0; c < l - 1; )
                    p[c] !== p[c + 1] && n.push(p[c + 1]), c++;
                  n[0] !== p[0] && n.unshift(p[0]);
                  p = n;
                }
              });
              u && v && (p.pop(), p.shift());
              l = p.length;
              if (2 < l) {
                var x = p[1] - p[0];
                for (m = l - 1; m-- && !t; ) p[m + 1] - p[m] !== x && (t = !0);
                !a.options.keepOrdinalPadding &&
                  (p[0] - e > x || f - p[p.length - 1] > x) &&
                  (t = !0);
              } else
                a.options.overscroll &&
                  (2 === l
                    ? (r = p[1] - p[0])
                    : 1 === l
                    ? ((r = a.options.overscroll), (p = [p[0], p[0] + r]))
                    : (r = c.overscrollPointsRange));
              t || a.forceOrdinal
                ? (a.options.overscroll &&
                    ((c.overscrollPointsRange = r),
                    (p = p.concat(c.getOverscrollPositions()))),
                  (c.positions = p),
                  (x = a.ordinal2lin(Math.max(e, p[0]), !0)),
                  (m = Math.max(
                    a.ordinal2lin(Math.min(f, p[p.length - 1]), !0),
                    1
                  )),
                  (c.slope = f = (f - e) / (m - x)),
                  (c.offset = e - x * f))
                : ((c.overscrollPointsRange = q(
                    a.closestPointRange,
                    c.overscrollPointsRange
                  )),
                  (c.positions = a.ordinal.slope = c.offset = void 0));
            }
            a.isOrdinal = d && t;
            c.groupIntervalFactor = null;
          }
          static findIndexOf(a, c, d) {
            let b = 0,
              e = a.length - 1,
              f;
            for (; b < e; )
              (f = Math.ceil((b + e) / 2)), a[f] <= c ? (b = f) : (e = f - 1);
            return a[b] === c ? b : d ? b : -1;
          }
          getExtendedPositions() {
            const a = this,
              c = a.axis,
              d = c.constructor.prototype,
              e = c.chart,
              f = c.series[0].currentDataGrouping,
              g = f ? f.count + f.unitName : "raw",
              h = c.options.overscroll,
              l = c.getExtremes();
            let n,
              m = void 0,
              p = a.index;
            p || (p = a.index = {});
            p[g] ||
              ((n = {
                series: [],
                chart: e,
                forceOrdinal: !1,
                getExtremes: function () {
                  return { min: l.dataMin, max: l.dataMax + h };
                },
                getGroupPixelWidth: d.getGroupPixelWidth,
                getTimeTicks: d.getTimeTicks,
                options: { ordinal: !0 },
                ordinal: {
                  getGroupIntervalFactor: this.getGroupIntervalFactor,
                },
                ordinal2lin: d.ordinal2lin,
                getIndexOfPoint: d.getIndexOfPoint,
                val2lin: d.val2lin,
              }),
              (n.ordinal.axis = n),
              c.series.forEach(function (b) {
                m = {
                  xAxis: n,
                  xData: b.xData.slice(),
                  chart: e,
                  destroyGroupedData: A.noop,
                  getProcessedData: J.prototype.getProcessedData,
                  applyGrouping: J.prototype.applyGrouping,
                };
                m.xData = m.xData.concat(a.getOverscrollPositions());
                m.options = {
                  dataGrouping: f
                    ? {
                        firstAnchor: "firstPoint",
                        anchor: "middle",
                        lastAnchor: "lastPoint",
                        enabled: !0,
                        forced: !0,
                        approximation: "open",
                        units: [[f.unitName, [f.count]]],
                      }
                    : { enabled: !1 },
                };
                n.series.push(m);
                b.processData.apply(m);
              }),
              m.closestPointRange !== m.basePointRange &&
                m.currentDataGrouping &&
                (n.forceOrdinal = !0),
              c.ordinal.beforeSetTickPositions.apply({ axis: n }),
              (p[g] = n.ordinal.positions));
            return p[g];
          }
          getGroupIntervalFactor(a, c, d) {
            d = d.processedXData;
            const b = d.length;
            var e = [];
            var f = this.groupIntervalFactor;
            if (!f) {
              for (f = 0; f < b - 1; f++) e[f] = d[f + 1] - d[f];
              e.sort(function (a, b) {
                return a - b;
              });
              e = e[Math.floor(b / 2)];
              a = Math.max(a, d[0]);
              c = Math.min(c, d[b - 1]);
              this.groupIntervalFactor = f = (b * e) / (c - a);
            }
            return f;
          }
          getIndexOfPoint(a, c) {
            const b = this.axis,
              e = this.positions ? this.positions[0] : 0,
              f = function (a) {
                return a.points.some((a) => !!a.isInside);
              };
            let g;
            b.series.forEach((a) => {
              var b;
              const c = null === (b = a.points) || void 0 === b ? void 0 : b[0];
              B(null === c || void 0 === c ? void 0 : c.plotX) &&
                (c.plotX < g || !B(g)) &&
                f(a) &&
                (g = c.plotX);
            });
            null !== g && void 0 !== g ? g : (g = b.minPixelPadding);
            a = D(
              (a - g) /
                (b.translationSlope *
                  (this.slope ||
                    b.closestPointRange ||
                    this.overscrollPointsRange))
            );
            return d.findIndexOf(c, e, !0) + a;
          }
          getOverscrollPositions() {
            const a = this.axis,
              c = a.options.overscroll,
              d = this.overscrollPointsRange,
              e = [];
            let f = a.dataMax;
            if (B(d)) for (; f <= a.dataMax + c; ) (f += d), e.push(f);
            return e;
          }
          postProcessTickInterval(a) {
            const b = this.axis,
              d = this.slope;
            return d
              ? b.options.breaks
                ? b.closestPointRange || a
                : a / (d / b.closestPointRange)
              : a;
          }
        }
        a.Additions = d;
      })(n || (n = {}));
      return n;
    }
  );
  L(
    a,
    "Series/HLC/HLCPoint.js",
    [a["Core/Series/SeriesRegistry.js"]],
    function (a) {
      ({
        column: {
          prototype: { pointClass: a },
        },
      } = a.seriesTypes);
      class u extends a {
        constructor() {
          super(...arguments);
          this.series =
            this.plotClose =
            this.options =
            this.low =
            this.high =
            this.close =
              void 0;
        }
      }
      return u;
    }
  );
  L(a, "Series/HLC/HLCSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 1,
      tooltip: {
        pointFormat:
          '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
      },
      threshold: null,
      states: { hover: { lineWidth: 3 } },
      stickyTracking: !0,
    };
  });
  L(
    a,
    "Series/HLC/HLCSeries.js",
    [
      a["Series/HLC/HLCPoint.js"],
      a["Series/HLC/HLCSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      const { column: u } = J.seriesTypes,
        { extend: D, merge: E } = K;
      class B extends u {
        constructor() {
          super(...arguments);
          this.yData = this.points = this.options = this.data = void 0;
        }
        extendStem(a, q, m) {
          const p = a[0];
          a = a[1];
          "number" === typeof p[2] && (p[2] = Math.max(m + q, p[2]));
          "number" === typeof a[2] && (a[2] = Math.min(m - q, a[2]));
        }
        getPointPath(a, q) {
          q = q.strokeWidth();
          const m = a.series,
            p = (q % 2) / 2,
            n = Math.round(a.plotX) - p,
            h = Math.round(a.shapeArgs.width / 2),
            g = [
              ["M", n, Math.round(a.yBottom)],
              ["L", n, Math.round(a.plotHigh)],
            ];
          null !== a.close &&
            ((a = Math.round(a.plotClose) + p),
            g.push(["M", n, a], ["L", n + h, a]),
            m.extendStem(g, q / 2, a));
          return g;
        }
        drawSinglePoint(a) {
          var q = a.series;
          const m = q.chart;
          let p = a.graphic;
          "undefined" !== typeof a.plotY &&
            (p || (a.graphic = p = m.renderer.path().add(q.group)),
            m.styledMode || p.attr(q.pointAttribs(a, a.selected && "select")),
            (q = q.getPointPath(a, p)),
            p[p ? "animate" : "attr"]({ d: q }).addClass(a.getClassName(), !0));
        }
        drawPoints() {
          this.points.forEach(this.drawSinglePoint);
        }
        init() {
          super.init.apply(this, arguments);
          this.options.stacking = void 0;
        }
        pointAttribs(a, q) {
          a = super.pointAttribs.call(this, a, q);
          delete a.fill;
          return a;
        }
        toYData(a) {
          return [a.high, a.low, a.close];
        }
        translate() {
          const a = this,
            q = a.yAxis,
            m = (this.pointArrayMap && this.pointArrayMap.slice()) || [],
            p = m.map((a) => `plot${a.charAt(0).toUpperCase() + a.slice(1)}`);
          p.push("yBottom");
          m.push("low");
          super.translate.apply(a);
          a.points.forEach(function (n) {
            m.forEach(function (h, g) {
              h = n[h];
              null !== h &&
                (a.dataModify && (h = a.dataModify.modifyValue(h)),
                (n[p[g]] = q.toPixels(h, !0)));
            });
            n.tooltipPos[1] = n.plotHigh + q.pos - a.chart.plotTop;
          });
        }
      }
      B.defaultOptions = E(u.defaultOptions, A);
      D(B.prototype, {
        pointClass: a,
        animate: null,
        directTouch: !1,
        pointArrayMap: ["high", "low", "close"],
        pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
        pointValKey: "close",
      });
      J.registerSeriesType("hlc", B);
      return B;
    }
  );
  L(
    a,
    "Series/OHLC/OHLCPoint.js",
    [a["Core/Series/SeriesRegistry.js"]],
    function (a) {
      ({
        seriesTypes: { hlc: a },
      } = a);
      class u extends a.prototype.pointClass {
        constructor() {
          super(...arguments);
          this.series = this.plotOpen = this.options = this.open = void 0;
        }
        getClassName() {
          return (
            super.getClassName.call(this) +
            (this.open < this.close
              ? " highcharts-point-up"
              : " highcharts-point-down")
          );
        }
        resolveUpColor() {
          this.open < this.close &&
            !this.options.color &&
            this.series.options.upColor &&
            (this.color = this.series.options.upColor);
        }
        resolveColor() {
          super.resolveColor();
          this.resolveUpColor();
        }
        getZone() {
          const a = super.getZone();
          this.resolveUpColor();
          return a;
        }
        applyOptions() {
          super.applyOptions.apply(this, arguments);
          this.resolveColor && this.resolveColor();
          return this;
        }
      }
      return u;
    }
  );
  L(a, "Series/OHLC/OHLCSeriesDefaults.js", [], function () {
    "";
    return {
      tooltip: {
        pointFormat:
          '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
      },
    };
  });
  L(
    a,
    "Series/OHLC/OHLCSeries.js",
    [
      a["Series/OHLC/OHLCPoint.js"],
      a["Series/OHLC/OHLCSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      function u(a) {
        a = a.options;
        const h = a.dataGrouping;
        h &&
          a.useOhlcData &&
          "highcharts-navigator-series" !== a.id &&
          (h.approximation = "ohlc");
      }
      function D(a) {
        a = a.options;
        a.useOhlcData &&
          "highcharts-navigator-series" !== a.id &&
          t(this, {
            pointValKey: p.prototype.pointValKey,
            pointArrayMap: p.prototype.pointArrayMap,
            toYData: p.prototype.toYData,
          });
      }
      const {
          seriesTypes: { hlc: E },
        } = J,
        { addEvent: B, extend: t, merge: q } = K,
        m = [];
      class p extends E {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        static compose(a, ...h) {
          K.pushUnique(m, a) && (B(a, "afterSetOptions", u), B(a, "init", D));
        }
        getPointPath(a, h) {
          const g = super.getPointPath(a, h);
          h = h.strokeWidth();
          const e = (h % 2) / 2,
            m = Math.round(a.plotX) - e,
            n = Math.round(a.shapeArgs.width / 2);
          null !== a.open &&
            ((a = Math.round(a.plotOpen) + e),
            g.push(["M", m, a], ["L", m - n, a]),
            super.extendStem(g, h / 2, a));
          return g;
        }
        pointAttribs(a, h) {
          h = super.pointAttribs.call(this, a, h);
          const g = this.options;
          delete h.fill;
          !a.options.color &&
            g.upColor &&
            a.open < a.close &&
            (h.stroke = g.upColor);
          return h;
        }
        toYData(a) {
          return [a.open, a.high, a.low, a.close];
        }
      }
      p.defaultOptions = q(E.defaultOptions, A);
      t(p.prototype, {
        pointClass: a,
        pointArrayMap: ["open", "high", "low", "close"],
      });
      J.registerSeriesType("ohlc", p);
      return p;
    }
  );
  L(
    a,
    "Series/Candlestick/CandlestickSeriesDefaults.js",
    [a["Core/Defaults.js"], a["Core/Utilities.js"]],
    function (a, A) {
      "";
      return {
        states: { hover: { lineWidth: 2 } },
        threshold: null,
        lineColor: "#000000",
        lineWidth: 1,
        upColor: "#ffffff",
        stickyTracking: !0,
      };
    }
  );
  L(
    a,
    "Series/Candlestick/CandlestickSeries.js",
    [
      a["Series/Candlestick/CandlestickSeriesDefaults.js"],
      a["Core/Defaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K) {
      ({ defaultOptions: A } = A);
      const { column: u, ohlc: D } = J.seriesTypes;
      ({ merge: K } = K);
      class E extends D {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        pointAttribs(a, t) {
          const q = u.prototype.pointAttribs.call(this, a, t),
            m = this.options,
            p = a.open < a.close,
            n = m.lineColor || this.color,
            h = a.color || this.color;
          q["stroke-width"] = m.lineWidth;
          q.fill = a.options.color || (p ? m.upColor || h : h);
          q.stroke = a.options.lineColor || (p ? m.upLineColor || n : n);
          t &&
            ((a = m.states[t]),
            (q.fill = a.color || q.fill),
            (q.stroke = a.lineColor || q.stroke),
            (q["stroke-width"] = a.lineWidth || q["stroke-width"]));
          return q;
        }
        drawPoints() {
          var a = this.points;
          const t = this.chart,
            q = this.yAxis.reversed;
          for (const h of a) {
            a = h.graphic;
            var m = void 0,
              p = void 0;
            let g, e;
            var n = void 0;
            let u, A;
            const B = !a;
            "undefined" !== typeof h.plotY &&
              (a || (h.graphic = a = t.renderer.path().add(this.group)),
              this.chart.styledMode ||
                a
                  .attr(this.pointAttribs(h, h.selected && "select"))
                  .shadow(this.options.shadow),
              (n = (a.strokeWidth() % 2) / 2),
              (u = Math.round(h.plotX) - n),
              (m = h.plotOpen),
              (p = h.plotClose),
              (g = Math.min(m, p)),
              (m = Math.max(m, p)),
              (A = Math.round(h.shapeArgs.width / 2)),
              (p = q
                ? m !== h.yBottom
                : Math.round(g) !== Math.round(h.plotHigh)),
              (e = q
                ? Math.round(g) !== Math.round(h.plotHigh)
                : m !== h.yBottom),
              (g = Math.round(g) + n),
              (m = Math.round(m) + n),
              (n = []),
              n.push(
                ["M", u - A, m],
                ["L", u - A, g],
                ["L", u + A, g],
                ["L", u + A, m],
                ["Z"],
                ["M", u, g],
                ["L", u, p ? Math.round(q ? h.yBottom : h.plotHigh) : g],
                ["M", u, m],
                ["L", u, e ? Math.round(q ? h.plotHigh : h.yBottom) : m]
              ),
              a[B ? "attr" : "animate"]({ d: n }).addClass(
                h.getClassName(),
                !0
              ));
          }
        }
      }
      E.defaultOptions = K(
        D.defaultOptions,
        A.plotOptions,
        { tooltip: D.defaultOptions.tooltip },
        a
      );
      J.registerSeriesType("candlestick", E);
      return E;
    }
  );
  L(
    a,
    "Series/Flags/FlagsPoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, A) {
      ({
        column: {
          prototype: { pointClass: a },
        },
      } = a.seriesTypes);
      const { isNumber: u } = A;
      class K extends a {
        constructor() {
          super(...arguments);
          this.series = this.options = void 0;
          this.ttBelow = !1;
        }
        isValid() {
          return u(this.y) || "undefined" === typeof this.y;
        }
        hasNewShapeType() {
          const a = this.options.shape || this.series.options.shape;
          return this.graphic && a && a !== this.graphic.symbolKey;
        }
      }
      return K;
    }
  );
  L(a, "Series/Flags/FlagsSeriesDefaults.js", [], function () {
    "";
    return {
      pointRange: 0,
      allowOverlapX: !1,
      shape: "flag",
      stackDistance: 12,
      textAlign: "center",
      tooltip: { pointFormat: "{point.text}" },
      threshold: null,
      y: -30,
      fillColor: "#ffffff",
      lineWidth: 1,
      states: { hover: { lineColor: "#000000", fillColor: "#ccd3ff" } },
      style: { fontSize: "0.7em", fontWeight: "bold" },
    };
  });
  L(
    a,
    "Series/Flags/FlagsSymbols.js",
    [a["Core/Renderer/RendererRegistry.js"]],
    function (a) {
      var u;
      (function (u) {
        function A(a, u, t, q, m) {
          const p = (m && m.anchorX) || a;
          m = (m && m.anchorY) || u;
          const n = this.circle(p - 1, m - 1, 2, 2);
          n.push(
            ["M", p, m],
            ["L", a, u + q],
            ["L", a, u],
            ["L", a + t, u],
            ["L", a + t, u + q],
            ["L", a, u + q],
            ["Z"]
          );
          return n;
        }
        function G(a, u) {
          a[u + "pin"] = function (t, q, m, p, n) {
            const h = n && n.anchorX;
            n = n && n.anchorY;
            let g;
            "circle" === u &&
              p > m &&
              ((t -= Math.round((p - m) / 2)), (m = p));
            g = a[u](t, q, m, p);
            if (h && n) {
              let e = h;
              "circle" === u
                ? (e = t + m / 2)
                : ((t = g[0]),
                  (m = g[1]),
                  "M" === t[0] && "L" === m[0] && (e = (t[1] + m[1]) / 2));
              g.push(["M", e, q > n ? q : q + p], ["L", h, n]);
              g = g.concat(a.circle(h - 1, n - 1, 2, 2));
            }
            return g;
          };
        }
        const D = [];
        u.compose = function (u) {
          -1 === D.indexOf(u) &&
            (D.push(u),
            (u = u.prototype.symbols),
            (u.flag = A),
            G(u, "circle"),
            G(u, "square"));
          u = a.getRendererType();
          D.indexOf(u) && D.push(u);
        };
      })(u || (u = {}));
      return u;
    }
  );
  L(
    a,
    "Series/OnSeriesComposition.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J) {
      const { prototype: u } = a,
        { prototype: G } = A,
        { defined: D, stableSort: E } = J;
      var B;
      (function (a) {
        function q(a) {
          return G.getPlotBox.call(
            (this.options.onSeries && this.chart.get(this.options.onSeries)) ||
              this,
            a
          );
        }
        function m() {
          u.translate.apply(this);
          const a = this;
          var h = a.options,
            g = a.chart;
          const e = a.points;
          var m = h.onSeries;
          const p = (m = m && g.get(m)) && m.options.step,
            q = m && m.points,
            t = g.inverted,
            f = a.xAxis,
            y = a.yAxis;
          g = e.length - 1;
          let r;
          h = h.onKey || "y";
          let l = q && q.length,
            v = 0,
            d,
            b,
            c,
            k;
          if (m && m.visible && l) {
            v = (m.pointXOffset || 0) + (m.barW || 0) / 2;
            var w = m.currentDataGrouping;
            b = q[l - 1].x + (w ? w.totalRange : 0);
            E(e, (a, b) => a.x - b.x);
            for (
              h = "plot" + h[0].toUpperCase() + h.substr(1);
              l-- &&
              e[g] &&
              !((d = q[l]),
              (w = e[g]),
              (w.y = d.y),
              d.x <= w.x &&
                "undefined" !== typeof d[h] &&
                (w.x <= b &&
                  ((w.plotY = d[h]),
                  d.x < w.x &&
                    !p &&
                    (c = q[l + 1]) &&
                    "undefined" !== typeof c[h] &&
                    ((k = (w.x - d.x) / (c.x - d.x)),
                    (w.plotY += k * (c[h] - d[h])),
                    (w.y += k * (c.y - d.y)))),
                g--,
                l++,
                0 > g));

            );
          }
          e.forEach((b, c) => {
            let d;
            b.plotX += v;
            if ("undefined" === typeof b.plotY || t)
              0 <= b.plotX && b.plotX <= f.len
                ? t
                  ? ((b.plotY = f.translate(b.x, 0, 1, 0, 1)),
                    (b.plotX = D(b.y) ? y.translate(b.y, 0, 0, 0, 1) : 0))
                  : (b.plotY = (f.opposite ? 0 : a.yAxis.len) + f.offset)
                : (b.shapeArgs = {});
            (r = e[c - 1]) &&
              r.plotX === b.plotX &&
              ("undefined" === typeof r.stackIndex && (r.stackIndex = 0),
              (d = r.stackIndex + 1));
            b.stackIndex = d;
          });
          this.onSeries = m;
        }
        const p = [];
        a.compose = function (a) {
          if (J.pushUnique(p, a)) {
            const h = a.prototype;
            h.getPlotBox = q;
            h.translate = m;
          }
          return a;
        };
        a.getPlotBox = q;
        a.translate = m;
      })(B || (B = {}));
      return B;
    }
  );
  L(
    a,
    "Series/Flags/FlagsSeries.js",
    [
      a["Series/Flags/FlagsPoint.js"],
      a["Series/Flags/FlagsSeriesDefaults.js"],
      a["Series/Flags/FlagsSymbols.js"],
      a["Core/Globals.js"],
      a["Series/OnSeriesComposition.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E, B, t) {
      ({ noop: K } = K);
      const { distribute: q } = D,
        {
          series: m,
          seriesTypes: { column: p },
        } = E,
        {
          addEvent: n,
          defined: h,
          extend: g,
          merge: e,
          objectEach: u,
          wrap: I,
        } = t;
      class L extends p {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        animate(a) {
          a && this.setClip();
        }
        drawPoints() {
          var a = this.points,
            f = this.chart;
          const g = f.renderer,
            m = f.inverted,
            l = this.options,
            n = l.y,
            d = this.yAxis,
            b = {},
            c = [];
          let k, p;
          let t, x;
          let A, E, G;
          for (t = a.length; t--; ) {
            x = a[t];
            E = (m ? x.plotY : x.plotX) > this.xAxis.len;
            k = x.plotX;
            var D = x.stackIndex;
            var J = x.options.shape || l.shape;
            p = x.plotY;
            "undefined" !== typeof p &&
              (p =
                x.plotY +
                n -
                ("undefined" !== typeof D && D * l.stackDistance));
            x.anchorX = D ? void 0 : x.plotX;
            A = D ? void 0 : x.plotY;
            G = "flag" !== J;
            D = x.graphic;
            "undefined" !== typeof p && 0 <= k && !E
              ? (D && x.hasNewShapeType() && (D = D.destroy()),
                D ||
                  ((D = x.graphic =
                    g
                      .label("", null, null, J, null, null, l.useHTML)
                      .addClass("highcharts-point")
                      .add(this.markerGroup)),
                  x.graphic.div && (x.graphic.div.point = x),
                  (D.isNew = !0)),
                D.attr({
                  align: G ? "center" : "left",
                  width: l.width,
                  height: l.height,
                  "text-align": l.textAlign,
                }),
                f.styledMode ||
                  D.attr(this.pointAttribs(x))
                    .css(e(l.style, x.style))
                    .shadow(l.shadow),
                0 < k && (k -= D.strokeWidth() % 2),
                (J = { y: p, anchorY: A }),
                l.allowOverlapX && ((J.x = k), (J.anchorX = x.anchorX)),
                D.attr({ text: x.options.title || l.title || "A" })[
                  D.isNew ? "attr" : "animate"
                ](J),
                l.allowOverlapX ||
                  (b[x.plotX]
                    ? (b[x.plotX].size = Math.max(b[x.plotX].size, D.width))
                    : (b[x.plotX] = {
                        align: G ? 0.5 : 0,
                        size: D.width,
                        target: k,
                        anchorX: k,
                      })),
                (x.tooltipPos = [k, p + d.pos - f.plotTop]))
              : D && (x.graphic = D.destroy());
          }
          if (!l.allowOverlapX) {
            let e = 100;
            u(b, function (a) {
              a.plotX = a.anchorX;
              c.push(a);
              e = Math.max(a.size, e);
            });
            q(c, m ? d.len : this.xAxis.len, e);
            for (const c of a)
              (f = c.plotX),
                (f = (a = c.graphic) && b[f]) &&
                  a &&
                  (h(f.pos)
                    ? (a[a.isNew ? "attr" : "animate"]({
                        x: f.pos + (f.align || 0) * f.size,
                        anchorX: c.anchorX,
                      }).show().isNew = !1)
                    : (a.hide().isNew = !0));
          }
          l.useHTML &&
            this.markerGroup &&
            I(this.markerGroup, "on", function (a) {
              return B.prototype.on.apply(
                a.apply(this, [].slice.call(arguments, 1)),
                [].slice.call(arguments, 1)
              );
            });
        }
        drawTracker() {
          const a = this.points;
          super.drawTracker();
          for (const e of a) {
            const f = e.graphic;
            f &&
              (e.unbindMouseOver && e.unbindMouseOver(),
              (e.unbindMouseOver = n(f.element, "mouseover", function () {
                0 < e.stackIndex &&
                  !e.raised &&
                  ((e._y = f.y), f.attr({ y: e._y - 8 }), (e.raised = !0));
                for (const f of a)
                  f !== e &&
                    f.raised &&
                    f.graphic &&
                    (f.graphic.attr({ y: f._y }), (f.raised = !1));
              })));
          }
        }
        pointAttribs(a, e) {
          const f = this.options,
            g = (a && a.color) || this.color;
          let h = f.lineColor,
            m = a && a.lineWidth;
          a = (a && a.fillColor) || f.fillColor;
          e &&
            ((a = f.states[e].fillColor),
            (h = f.states[e].lineColor),
            (m = f.states[e].lineWidth));
          return {
            fill: a || g,
            stroke: h || g,
            "stroke-width": m || f.lineWidth || 0,
          };
        }
        setClip() {
          m.prototype.setClip.apply(this, arguments);
          !1 !== this.options.clip &&
            this.sharedClipKey &&
            this.markerGroup &&
            this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey]);
        }
      }
      L.compose = J.compose;
      L.defaultOptions = e(p.defaultOptions, A);
      G.compose(L);
      g(L.prototype, {
        allowDG: !1,
        forceCrop: !0,
        invertible: !1,
        noSharedTooltip: !0,
        pointClass: a,
        sorted: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ["markerGroup"],
        buildKDTree: K,
        init: m.prototype.init,
      });
      E.registerSeriesType("flags", L);
      ("");
      return L;
    }
  );
  L(
    a,
    "Core/Chart/StockChart.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Templating.js"],
      a["Core/Defaults.js"],
      a["Stock/Navigator/NavigatorDefaults.js"],
      a["Stock/RangeSelector/RangeSelectorDefaults.js"],
      a["Stock/Scrollbar/ScrollbarDefaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, A, J, K, G, D, E, B, t, q) {
      function m(a, b) {
        return "xAxis" === a
          ? {
              minPadding: 0,
              maxPadding: 0,
              overscroll: 0,
              ordinal: !0,
              title: { text: null },
              labels: { overflow: "justify" },
              showLastLabel: !0,
            }
          : "yAxis" === a
          ? {
              labels: { y: -2 },
              opposite: r(b.opposite, !0),
              showLastLabel: !(!b.categories && "category" !== b.type),
              title: { text: null },
            }
          : {};
      }
      function p(a, b) {
        return "xAxis" === a
          ? ((a = { type: "datetime", categories: void 0 }),
            r(b.navigator && b.navigator.enabled, G.enabled, !0) &&
              ((a.startOnTick = !1), (a.endOnTick = !1)),
            a)
          : {};
      }
      const { format: n } = J,
        { getOptions: h } = K,
        {
          addEvent: g,
          clamp: e,
          defined: u,
          extend: I,
          find: L,
          isNumber: C,
          isString: f,
          merge: y,
          pick: r,
          splat: l,
        } = q;
      class v extends A {
        init(a, b) {
          const c = h(),
            d = a.xAxis,
            e = a.yAxis;
          var f = r(a.navigator && a.navigator.enabled, G.enabled, !0);
          a.xAxis = a.yAxis = void 0;
          f = y(
            {
              chart: {
                panning: { enabled: !0, type: "x" },
                zooming: { pinchType: "x" },
              },
              navigator: { enabled: f },
              scrollbar: { enabled: r(E.enabled, !0) },
              rangeSelector: { enabled: r(D.rangeSelector.enabled, !0) },
              title: { text: null },
              tooltip: { split: r(c.tooltip.split, !0), crosshairs: !0 },
              legend: { enabled: !1 },
            },
            a,
            { isStock: !0 }
          );
          a.xAxis = d;
          a.yAxis = e;
          f.xAxis = l(a.xAxis || {}).map(function (b, d) {
            return y(
              m("xAxis", b),
              c.xAxis,
              c.xAxis && c.xAxis[d],
              b,
              p("xAxis", a)
            );
          });
          f.yAxis = l(a.yAxis || {}).map(function (a, b) {
            return y(m("yAxis", a), c.yAxis, c.yAxis && c.yAxis[b], a);
          });
          super.init(f, b);
        }
        createAxis(a, b) {
          b.axis = y(m(a, b.axis), b.axis, p(a, this.userOptions));
          return super.createAxis(a, b);
        }
      }
      (function (a) {
        a.stockChart = function (b, c, d) {
          return new a(b, c, d);
        };
      })(v || (v = {}));
      g(B, "setOptions", function (a) {
        let b;
        this.chart.options.isStock &&
          (this.is("column") || this.is("columnrange")
            ? (b = { borderWidth: 0, shadow: !1 })
            : this.is("scatter") ||
              this.is("sma") ||
              (b = { marker: { enabled: !1, radius: 2 } }),
          b && (a.plotOptions[this.type] = y(a.plotOptions[this.type], b)));
      });
      g(a, "autoLabelAlign", function (a) {
        const { chart: b, options: c } = this,
          d = (b._labelPanes = b._labelPanes || {}),
          e = c.labels;
        if (b.options.isStock && "yAxis" === this.coll) {
          const b = c.top + "," + c.height;
          !d[b] &&
            e.enabled &&
            (15 === e.distance && 1 === this.side && (e.distance = 0),
            "undefined" === typeof e.align && (e.align = "right"),
            (d[b] = this),
            (a.align = "right"),
            a.preventDefault());
        }
      });
      g(a, "destroy", function () {
        const a = this.chart,
          b = this.options && this.options.top + "," + this.options.height;
        b &&
          a._labelPanes &&
          a._labelPanes[b] === this &&
          delete a._labelPanes[b];
      });
      g(a, "getPlotLinePath", function (a) {
        function b(a) {
          const b = "xAxis" === a ? "yAxis" : "xAxis";
          a = c.options[b];
          return C(a)
            ? [g[b][a]]
            : f(a)
            ? [g.get(a)]
            : d.map(function (a) {
                return a[b];
              });
        }
        let c = this,
          d =
            this.isLinked && !this.series
              ? this.linkedParent.series
              : this.series,
          g = c.chart,
          h = g.renderer,
          l = c.left,
          m = c.top,
          n,
          p,
          q,
          t,
          v = [],
          x = [],
          y,
          A,
          B = a.translatedValue,
          D = a.value,
          E = a.force,
          G;
        if (
          (g.options.isStock && !1 !== a.acrossPanes && "xAxis" === c.coll) ||
          "yAxis" === c.coll
        )
          a.preventDefault(),
            (x = b(c.coll)),
            (y = c.isXAxis ? g.yAxis : g.xAxis),
            y.forEach(function (a) {
              if (
                u(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1
              ) {
                var b = a.isXAxis ? "yAxis" : "xAxis";
                b = u(a.options[b]) ? g[b][a.options[b]] : g[b][0];
                c === b && x.push(a);
              }
            }),
            (A = x.length ? [] : [c.isXAxis ? g.yAxis[0] : g.xAxis[0]]),
            x.forEach(function (a) {
              -1 !== A.indexOf(a) ||
                L(A, function (b) {
                  return b.pos === a.pos && b.len === a.len;
                }) ||
                A.push(a);
            }),
            (G = r(B, c.translate(D, void 0, void 0, a.old))),
            C(G) &&
              (c.horiz
                ? A.forEach(function (a) {
                    let b;
                    p = a.pos;
                    t = p + a.len;
                    n = q = Math.round(G + c.transB);
                    "pass" !== E &&
                      (n < l || n > l + c.width) &&
                      (E ? (n = q = e(n, l, l + c.width)) : (b = !0));
                    b || v.push(["M", n, p], ["L", q, t]);
                  })
                : A.forEach(function (a) {
                    let b;
                    n = a.pos;
                    q = n + a.len;
                    p = t = Math.round(m + c.height - G);
                    "pass" !== E &&
                      (p < m || p > m + c.height) &&
                      (E ? (p = t = e(p, m, m + c.height)) : (b = !0));
                    b || v.push(["M", n, p], ["L", q, t]);
                  })),
            (a.path =
              0 < v.length ? h.crispPolyLine(v, a.lineWidth || 1) : null);
      });
      t.prototype.crispPolyLine = function (a, b) {
        for (let c = 0; c < a.length; c += 2) {
          const d = a[c],
            e = a[c + 1];
          d[1] === e[1] && (d[1] = e[1] = Math.round(d[1]) - (b % 2) / 2);
          d[2] === e[2] && (d[2] = e[2] = Math.round(d[2]) + (b % 2) / 2);
        }
        return a;
      };
      g(a, "afterHideCrosshair", function () {
        this.crossLabel && (this.crossLabel = this.crossLabel.hide());
      });
      g(a, "afterDrawCrosshair", function (a) {
        var b, c;
        if (
          this.crosshair &&
          this.crosshair.label &&
          this.crosshair.label.enabled &&
          this.cross &&
          C(this.min) &&
          C(this.max)
        ) {
          var d = this.chart,
            e = this.logarithmic,
            f = this.crosshair.label,
            g = this.horiz,
            h = this.opposite,
            l = this.left,
            m = this.top,
            p = this.width,
            q = this.crossLabel,
            t = f.format,
            u = "",
            v = "inside" === this.options.tickPosition,
            x = !1 !== this.crosshair.snap,
            y = 0,
            A = a.e || (this.cross && this.cross.e);
          a = a.point;
          var B = this.min,
            D = this.max;
          e && ((B = e.lin2log(B)), (D = e.lin2log(D)));
          e = g
            ? "center"
            : h
            ? "right" === this.labelAlign
              ? "right"
              : "left"
            : "left" === this.labelAlign
            ? "left"
            : "center";
          q ||
            ((q = this.crossLabel =
              d.renderer
                .label("", 0, void 0, f.shape || "callout")
                .addClass(
                  "highcharts-crosshair-label highcharts-color-" +
                    (a && a.series
                      ? a.series.colorIndex
                      : this.series[0] && this.series[0].colorIndex)
                )
                .attr({
                  align: f.align || e,
                  padding: r(f.padding, 8),
                  r: r(f.borderRadius, 3),
                  zIndex: 2,
                })
                .add(this.labelGroup)),
            d.styledMode ||
              q
                .attr({
                  fill:
                    f.backgroundColor ||
                    (a && a.series && a.series.color) ||
                    "#666666",
                  stroke: f.borderColor || "",
                  "stroke-width": f.borderWidth || 0,
                })
                .css(
                  I(
                    {
                      color: "#ffffff",
                      fontWeight: "normal",
                      fontSize: "0.7em",
                      textAlign: "center",
                    },
                    f.style || {}
                  )
                ));
          g
            ? ((p = x ? (a.plotX || 0) + l : A.chartX),
              (m += h ? 0 : this.height))
            : ((p = l + this.offset + (h ? p : 0)),
              (m = x ? (a.plotY || 0) + m : A.chartY));
          t ||
            f.formatter ||
            (this.dateTime && (u = "%b %d, %Y"),
            (t = "{value" + (u ? ":" + u : "") + "}"));
          u = x
            ? this.isXAxis
              ? a.x
              : a.y
            : this.toValue(g ? A.chartX : A.chartY);
          x =
            a && a.series ? a.series.isPointInside(a) : C(u) && u > B && u < D;
          A = "";
          t
            ? (A = n(t, { value: u }, d))
            : f.formatter && C(u) && (A = f.formatter.call(this, u));
          q.attr({ text: A, x: p, y: m, visibility: x ? "inherit" : "hidden" });
          f = q.getBBox();
          !C(q.x) || g || h || (p = q.x - f.width / 2);
          if (C(q.y))
            if (g) {
              if ((v && !h) || (!v && h)) m = q.y - f.height;
            } else m = q.y - f.height / 2;
          g
            ? ((b = l - f.x), (c = l + this.width - f.x))
            : ((b = "left" === this.labelAlign ? l : 0),
              (c =
                "right" === this.labelAlign ? l + this.width : d.chartWidth));
          q.translateX < b && (y = b - q.translateX);
          q.translateX + f.width >= c && (y = -(q.translateX + f.width - c));
          q.attr({
            x: p + y,
            y: m,
            anchorX: g ? p : this.opposite ? 0 : d.chartWidth,
            anchorY: g ? (this.opposite ? d.chartHeight : 0) : m + f.height / 2,
          });
        }
      });
      B.prototype.forceCropping = function () {
        const a = this.chart,
          b = this.options.dataGrouping;
        return !1 !== this.allowDG && b && r(b.enabled, a.options.isStock);
      };
      g(A, "update", function (a) {
        a = a.options;
        "scrollbar" in a &&
          this.navigator &&
          (y(!0, this.options.scrollbar, a.scrollbar),
          this.navigator.update({}),
          delete a.scrollbar);
      });
      return v;
    }
  );
  L(
    a,
    "masters/modules/stock.src.js",
    [
      a["Core/Globals.js"],
      a["Series/DataModifyComposition.js"],
      a["Stock/Navigator/Navigator.js"],
      a["Stock/RangeSelector/RangeSelector.js"],
      a["Stock/Scrollbar/Scrollbar.js"],
      a["Core/Axis/OrdinalAxis.js"],
      a["Series/OHLC/OHLCSeries.js"],
      a["Series/Flags/FlagsSeries.js"],
      a["Core/Chart/StockChart.js"],
    ],
    function (a, A, J, K, G, D, E, B, t) {
      a.Navigator = J;
      a.RangeSelector = K;
      a.Scrollbar = G;
      a.StockChart = a.stockChart = t.stockChart;
      A.compose(a.Series, a.Axis, a.Point);
      B.compose(a.Renderer);
      J.compose(a.Axis, a.Chart, a.Series);
      E.compose(a.Series);
      D.compose(a.Axis, a.Series, a.Chart);
      K.compose(a.Axis, a.Chart);
      G.compose(a.Axis);
    }
  );
  L(
    a,
    "masters/highstock.src.js",
    [a["masters/highcharts.src.js"]],
    function (a) {
      a.product = "Highstock";
      return a;
    }
  );
  a["masters/highstock.src.js"]._modules = a;
  return a["masters/highstock.src.js"];
});
//# sourceMappingURL=highstock.js.map
