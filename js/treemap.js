/*
 Highcharts JS v11.1.0 (2023-06-05)

 (c) 2014-2021 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
"use strict";
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a;
      };
$jscomp.getGlobal = function (a) {
  a = [
    "object" == typeof globalThis && globalThis,
    a,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function (a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {
    configurable: !0,
    writable: !0,
    value: b,
  });
};
$jscomp.SymbolClass.prototype.toString = function () {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = (function () {
  function a(c) {
    if (this instanceof a) throw new TypeError("Symbol is not a constructor");
    return new $jscomp.SymbolClass(
      $jscomp.SYMBOL_PREFIX + (c || "") + "_" + b++,
      c
    );
  }
  var b = 0;
  return a;
})();
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a ||
    (a = $jscomp.global.Symbol.iterator =
      $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] &&
    $jscomp.defineProperty(Array.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function () {
        return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
      },
    });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.initSymbolAsyncIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a ||
    (a = $jscomp.global.Symbol.asyncIterator =
      $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function () {};
};
$jscomp.iteratorPrototype = function (a) {
  $jscomp.initSymbolIterator();
  a = { next: a };
  a[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function (a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0,
    d = {
      next: function () {
        if (c < a.length) {
          var e = c++;
          return { value: b(e, a[e]), done: !1 };
        }
        d.next = function () {
          return { done: !0, value: void 0 };
        };
        return d.next();
      },
    };
  d[Symbol.iterator] = function () {
    return d;
  };
  return d;
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function (a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) return a[b];
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function (a, b, c, d) {
  b &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, b, c, d)
      : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function (a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    e in c || (c[e] = {});
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d &&
    null != b &&
    $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b });
};
$jscomp.polyfillIsolated = function (a, b, c, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var w = 0; w < e.length - 1; w++) {
    var t = e[w];
    t in d || (d[t] = {});
    d = d[t];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b &&
    (a
      ? $jscomp.defineProperty($jscomp.polyfills, e, {
          configurable: !0,
          writable: !0,
          value: b,
        })
      : b !== c &&
        (($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(e)
          : $jscomp.POLYFILL_PREFIX + e),
        (e = $jscomp.propertyToPolyfillSymbol[e]),
        $jscomp.defineProperty(d, e, {
          configurable: !0,
          writable: !0,
          value: b,
        })));
};
$jscomp.polyfill(
  "Array.prototype.values",
  function (a) {
    return a
      ? a
      : function () {
          return $jscomp.iteratorFromArray(this, function (a, c) {
            return c;
          });
        };
  },
  "es8",
  "es3"
);
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/treemap", ["highcharts"], function (b) {
        a(b);
        a.Highcharts = b;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function b(a, d, e, b) {
    a.hasOwnProperty(d) ||
      ((a[d] = b.apply(null, e)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: d, module: a[d] },
          })
        ));
  }
  a = a ? a._modules : {};
  b(
    a,
    "Series/ColorMapComposition.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, d) {
      const {
          column: { prototype: c },
        } = a.seriesTypes,
        { addEvent: b, defined: t } = d;
      var n;
      (function (a) {
        function e(a) {
          this.moveToTopOnHover &&
            this.graphic &&
            this.graphic.attr({ zIndex: a && "hover" === a.state ? 1 : 0 });
        }
        const k = [];
        a.pointMembers = {
          dataLabelOnNull: !0,
          moveToTopOnHover: !0,
          isValid: function () {
            return (
              null !== this.value &&
              Infinity !== this.value &&
              -Infinity !== this.value &&
              (void 0 === this.value || !isNaN(this.value))
            );
          },
        };
        a.seriesMembers = {
          colorKey: "value",
          axisTypes: ["xAxis", "yAxis", "colorAxis"],
          parallelArrays: ["x", "y", "value"],
          pointArrayMap: ["value"],
          trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
          colorAttribs: function (a) {
            const d = {};
            !t(a.color) ||
              (a.state && "normal" !== a.state) ||
              (d[this.colorProp || "fill"] = a.color);
            return d;
          },
          pointAttribs: c.pointAttribs,
        };
        a.compose = function (a) {
          const f = a.prototype.pointClass;
          d.pushUnique(k, f) && b(f, "afterSetState", e);
          return a;
        };
      })(n || (n = {}));
      return n;
    }
  );
  b(a, "Series/Treemap/TreemapAlgorithmGroup.js", [], function () {
    class a {
      constructor(a, c, b, t) {
        this.height = a;
        this.width = c;
        this.plot = t;
        this.startDirection = this.direction = b;
        this.lH = this.nH = this.lW = this.nW = this.total = 0;
        this.elArr = [];
        this.lP = {
          total: 0,
          lH: 0,
          nH: 0,
          lW: 0,
          nW: 0,
          nR: 0,
          lR: 0,
          aspectRatio: function (a, d) {
            return Math.max(a / d, d / a);
          },
        };
      }
      addElement(a) {
        this.lP.total = this.elArr[this.elArr.length - 1];
        this.total += a;
        0 === this.direction
          ? ((this.lW = this.nW),
            (this.lP.lH = this.lP.total / this.lW),
            (this.lP.lR = this.lP.aspectRatio(this.lW, this.lP.lH)),
            (this.nW = this.total / this.height),
            (this.lP.nH = this.lP.total / this.nW),
            (this.lP.nR = this.lP.aspectRatio(this.nW, this.lP.nH)))
          : ((this.lH = this.nH),
            (this.lP.lW = this.lP.total / this.lH),
            (this.lP.lR = this.lP.aspectRatio(this.lP.lW, this.lH)),
            (this.nH = this.total / this.width),
            (this.lP.nW = this.lP.total / this.nH),
            (this.lP.nR = this.lP.aspectRatio(this.lP.nW, this.nH)));
        this.elArr.push(a);
      }
      reset() {
        this.lW = this.nW = 0;
        this.elArr = [];
        this.total = 0;
      }
    }
    return a;
  });
  b(a, "Series/DrawPointUtilities.js", [a["Core/Utilities.js"]], function (a) {
    return {
      draw: function (a, c) {
        const { animatableAttribs: d, onComplete: b, css: e, renderer: k } = c,
          g =
            a.series && a.series.chart.hasRendered
              ? void 0
              : a.series && a.series.options.animation;
        let l = a.graphic;
        c.attribs =
          Object.assign(Object.assign({}, c.attribs), {
            class: a.getClassName(),
          }) || {};
        if (a.shouldDraw())
          l ||
            ((a.graphic = l =
              "text" === c.shapeType
                ? k.text()
                : k[c.shapeType](c.shapeArgs || {})),
            l.add(c.group)),
            e && l.css(e),
            l.attr(c.attribs).animate(d, c.isNew ? !1 : g, b);
        else if (l) {
          const c = () => {
            a.graphic = l = l && l.destroy();
            "function" === typeof b && b();
          };
          Object.keys(d).length ? l.animate(d, void 0, () => c()) : c();
        }
      },
    };
  });
  b(
    a,
    "Series/Treemap/TreemapPoint.js",
    [
      a["Series/DrawPointUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, d, b) {
      const {
          series: {
            prototype: { pointClass: c },
          },
          seriesTypes: {
            pie: {
              prototype: { pointClass: e },
            },
            scatter: {
              prototype: { pointClass: n },
            },
          },
        } = d,
        { extend: k, isNumber: g, pick: l } = b;
      class f extends n {
        constructor() {
          super(...arguments);
          this.series = this.options = this.node = this.name = void 0;
          this.shapeType = "rect";
          this.value = void 0;
        }
        draw(c) {
          a.draw(this, c);
        }
        getClassName() {
          let a = c.prototype.getClassName.call(this),
            d = this.series,
            f = d.options;
          this.node.level <= d.nodeMap[d.rootNode].level
            ? (a += " highcharts-above-level")
            : this.node.isLeaf || l(f.interactByLeaf, !f.allowTraversingTree)
            ? this.node.isLeaf || (a += " highcharts-internal-node")
            : (a += " highcharts-internal-node-interactive");
          return a;
        }
        isValid() {
          return !(!this.id && !g(this.value));
        }
        setState(a) {
          c.prototype.setState.call(this, a);
          this.graphic && this.graphic.attr({ zIndex: "hover" === a ? 1 : 0 });
        }
        shouldDraw() {
          return g(this.plotY) && null !== this.y;
        }
      }
      k(f.prototype, { setVisible: e.prototype.setVisible });
      return f;
    }
  );
  b(
    a,
    "Series/Treemap/TreemapUtilities.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { objectEach: c } = a;
      var b;
      (function (a) {
        function d(a, c, b = this) {
          a = c.call(b, a);
          !1 !== a && d(a, c, b);
        }
        a.AXIS_MAX = 100;
        a.isBoolean = function (a) {
          return "boolean" === typeof a;
        };
        a.eachObject = function (a, d, b) {
          b = b || this;
          c(a, function (c, f) {
            d.call(b, c, f, a);
          });
        };
        a.recursive = d;
      })(b || (b = {}));
      return b;
    }
  );
  b(
    a,
    "Series/TreeUtilities.js",
    [a["Core/Color/Color.js"], a["Core/Utilities.js"]],
    function (a, b) {
      function c(a, b) {
        var f = b.before;
        const e = b.idRoot,
          k = b.mapIdToNode[e],
          p = b.points[a.i],
          n = (p && p.options) || {},
          v = [];
        let g = 0;
        a.levelDynamic = a.level - (!1 !== b.levelIsConstant ? 0 : k.level);
        a.name = l(p && p.name, "");
        a.visible = e === a.id || !0 === b.visible;
        "function" === typeof f && (a = f(a, b));
        a.children.forEach((f, e) => {
          const y = d({}, b);
          d(y, { index: e, siblings: a.children.length, visible: a.visible });
          f = c(f, y);
          v.push(f);
          f.visible && (g += f.val);
        });
        f = l(n.value, g);
        a.visible = 0 <= f && (0 < g || a.visible);
        a.children = v;
        a.childrenTotal = g;
        a.isLeaf = a.visible && !g;
        a.val = f;
        return a;
      }
      const {
        extend: d,
        isArray: t,
        isNumber: n,
        isObject: k,
        merge: g,
        pick: l,
      } = b;
      return {
        getColor: function (b, c) {
          const d = c.index;
          var f = c.mapOptionsToLevel;
          const e = c.parentColor,
            k = c.parentColorIndex,
            g = c.series;
          var v = c.colors;
          const n = c.siblings;
          var p = g.points,
            t = g.chart.options.chart;
          let y;
          var r;
          let I;
          if (b) {
            p = p[b.i];
            b = f[b.level] || {};
            if ((f = p && b.colorByPoint)) {
              y = p.index % (v ? v.length : t.colorCount);
              var C = v && v[y];
            }
            if (!g.chart.styledMode) {
              v = p && p.options.color;
              t = b && b.color;
              if ((r = e))
                r =
                  (r = b && b.colorVariation) &&
                  "brightness" === r.key &&
                  d &&
                  n
                    ? a
                        .parse(e)
                        .brighten((d / n) * r.to)
                        .get()
                    : e;
              r = l(v, t, C, r, g.color);
            }
            I = l(
              p && p.options.colorIndex,
              b && b.colorIndex,
              y,
              k,
              c.colorIndex
            );
          }
          return { color: r, colorIndex: I };
        },
        getLevelOptions: function (a) {
          let b = {},
            c,
            d,
            e;
          if (k(a)) {
            e = n(a.from) ? a.from : 1;
            var f = a.levels;
            d = {};
            c = k(a.defaults) ? a.defaults : {};
            t(f) &&
              (d = f.reduce((a, b) => {
                let d, f;
                k(b) &&
                  n(b.level) &&
                  ((f = g({}, b)),
                  (d = l(f.levelIsConstant, c.levelIsConstant)),
                  delete f.levelIsConstant,
                  delete f.level,
                  (b = b.level + (d ? 0 : e - 1)),
                  k(a[b]) ? g(!0, a[b], f) : (a[b] = f));
                return a;
              }, {}));
            f = n(a.to) ? a.to : 1;
            for (a = 0; a <= f; a++) b[a] = g({}, c, k(d[a]) ? d[a] : {});
          }
          return b;
        },
        setTreeValues: c,
        updateRootId: function (a) {
          if (k(a)) {
            var b = k(a.options) ? a.options : {};
            b = l(a.rootNode, b.rootId, "");
            k(a.userOptions) && (a.userOptions.rootId = b);
            a.rootNode = b;
          }
          return b;
        },
      };
    }
  );
  b(a, "Extensions/Breadcrumbs/BreadcrumbsDefaults.js", [], function () {
    return {
      lang: { mainBreadcrumb: "Main" },
      options: {
        buttonTheme: {
          fill: "none",
          height: 18,
          padding: 2,
          "stroke-width": 0,
          zIndex: 7,
          states: { select: { fill: "none" } },
          style: { color: "#334eff" },
        },
        buttonSpacing: 5,
        floating: !1,
        format: void 0,
        relativeTo: "plotBox",
        rtl: !1,
        position: { align: "left", verticalAlign: "top", x: 0, y: void 0 },
        separator: {
          text: "/",
          style: { color: "#666666", fontSize: "0.8em" },
        },
        showFullPath: !0,
        style: {},
        useHTML: !1,
        zIndex: 7,
      },
    };
  });
  b(
    a,
    "Extensions/Breadcrumbs/Breadcrumbs.js",
    [
      a["Extensions/Breadcrumbs/BreadcrumbsDefaults.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Templating.js"],
      a["Core/Utilities.js"],
    ],
    function (a, b, e, w) {
      function c() {
        if (this.breadcrumbs) {
          const a = this.resetZoomButton && this.resetZoomButton.getBBox(),
            b = this.breadcrumbs.options;
          a &&
            "right" === b.position.align &&
            "plotBox" === b.relativeTo &&
            this.breadcrumbs.alignBreadcrumbsGroup(-a.width - b.buttonSpacing);
        }
      }
      function d() {
        this.breadcrumbs &&
          (this.breadcrumbs.destroy(), (this.breadcrumbs = void 0));
      }
      function k() {
        const a = this.breadcrumbs;
        if (a && !a.options.floating && a.level) {
          var b = a.options,
            c = b.buttonTheme;
          c = (c.height || 0) + 2 * (c.padding || 0) + b.buttonSpacing;
          b = b.position.verticalAlign;
          "bottom" === b
            ? ((this.marginBottom = (this.marginBottom || 0) + c),
              (a.yOffset = c))
            : "middle" !== b
            ? ((this.plotTop += c), (a.yOffset = -c))
            : (a.yOffset = void 0);
        }
      }
      function g() {
        this.breadcrumbs && this.breadcrumbs.redraw();
      }
      function l(a) {
        !0 === a.resetSelection &&
          this.breadcrumbs &&
          this.breadcrumbs.alignBreadcrumbsGroup();
      }
      const { format: f } = e,
        {
          addEvent: p,
          defined: R,
          extend: S,
          fireEvent: J,
          isString: K,
          merge: B,
          objectEach: v,
          pick: D,
        } = w,
        H = [];
      class x {
        static compose(y, r) {
          w.pushUnique(H, y) &&
            (p(b, "destroy", d),
            p(b, "afterShowResetZoom", c),
            p(b, "getMargins", k),
            p(b, "redraw", g),
            p(b, "selection", l));
          w.pushUnique(H, r) && S(r.lang, a.lang);
        }
        constructor(a, b) {
          this.elementList = {};
          this.isDirty = !0;
          this.level = 0;
          this.list = [];
          b = B(
            a.options.drilldown && a.options.drilldown.drillUpButton,
            x.defaultOptions,
            a.options.navigation && a.options.navigation.breadcrumbs,
            b
          );
          this.chart = a;
          this.options = b || {};
        }
        updateProperties(a) {
          this.setList(a);
          this.setLevel();
          this.isDirty = !0;
        }
        setList(a) {
          this.list = a;
        }
        setLevel() {
          this.level = this.list.length && this.list.length - 1;
        }
        getLevel() {
          return this.level;
        }
        getButtonText(a) {
          const b = this.chart,
            c = this.options;
          var d = b.options.lang;
          const e = D(
            c.format,
            c.showFullPath ? "{level.name}" : "\u2190 {level.name}"
          );
          d = d && D(d.drillUpText, d.mainBreadcrumb);
          a =
            (c.formatter && c.formatter(a)) ||
            f(e, { level: a.levelOptions }, b) ||
            "";
          ((K(a) && !a.length) || "\u2190 " === a) &&
            R(d) &&
            (a = c.showFullPath ? d : "\u2190 " + d);
          return a;
        }
        redraw() {
          this.isDirty && this.render();
          this.group && this.group.align();
          this.isDirty = !1;
        }
        render() {
          const a = this.chart,
            b = this.options;
          !this.group &&
            b &&
            (this.group = a.renderer
              .g("breadcrumbs-group")
              .addClass("highcharts-no-tooltip highcharts-breadcrumbs")
              .attr({ zIndex: b.zIndex })
              .add());
          b.showFullPath
            ? this.renderFullPathButtons()
            : this.renderSingleButton();
          this.alignBreadcrumbsGroup();
        }
        renderFullPathButtons() {
          this.destroySingleButton();
          this.resetElementListState();
          this.updateListElements();
          this.destroyListElements();
        }
        renderSingleButton() {
          const a = this.chart;
          var b = this.list;
          const c = this.options.buttonSpacing;
          this.destroyListElements();
          const d = this.group ? this.group.getBBox().width : c;
          b = b[b.length - 2];
          !a.drillUpButton && 0 < this.level
            ? (a.drillUpButton = this.renderButton(b, d, c))
            : a.drillUpButton &&
              (0 < this.level
                ? this.updateSingleButton()
                : this.destroySingleButton());
        }
        alignBreadcrumbsGroup(a) {
          if (this.group) {
            var b = this.options;
            const d = b.buttonTheme,
              e = b.position,
              r =
                "chart" === b.relativeTo || "spacingBox" === b.relativeTo
                  ? void 0
                  : "scrollablePlotBox";
            var c = this.group.getBBox();
            b = 2 * (d.padding || 0) + b.buttonSpacing;
            e.width = c.width + b;
            e.height = c.height + b;
            c = B(e);
            a && (c.x += a);
            this.options.rtl && (c.x += e.width);
            c.y = D(c.y, this.yOffset, 0);
            this.group.align(c, !0, r);
          }
        }
        renderButton(a, b, c) {
          const d = this,
            e = this.chart,
            f = d.options,
            r = B(f.buttonTheme);
          b = e.renderer
            .button(
              d.getButtonText(a),
              b,
              c,
              function (b) {
                const c = f.events && f.events.click;
                let e;
                c && (e = c.call(d, b, a));
                !1 !== e &&
                  ((b.newLevel = f.showFullPath ? a.level : d.level - 1),
                  J(d, "up", b));
              },
              r
            )
            .addClass("highcharts-breadcrumbs-button")
            .add(d.group);
          e.styledMode || b.attr(f.style);
          return b;
        }
        renderSeparator(a, b) {
          const c = this.chart,
            d = this.options.separator;
          a = c.renderer
            .label(d.text, a, b, void 0, void 0, void 0, !1)
            .addClass("highcharts-breadcrumbs-separator")
            .add(this.group);
          c.styledMode || a.css(d.style);
          return a;
        }
        update(a) {
          B(!0, this.options, a);
          this.destroy();
          this.isDirty = !0;
        }
        updateSingleButton() {
          const a = this.chart,
            b = this.list[this.level - 1];
          a.drillUpButton &&
            a.drillUpButton.attr({ text: this.getButtonText(b) });
        }
        destroy() {
          this.destroySingleButton();
          this.destroyListElements(!0);
          this.group && this.group.destroy();
          this.group = void 0;
        }
        destroyListElements(a) {
          const b = this.elementList;
          v(b, (c, d) => {
            if (a || !b[d].updated)
              (c = b[d]),
                c.button && c.button.destroy(),
                c.separator && c.separator.destroy(),
                delete c.button,
                delete c.separator,
                delete b[d];
          });
          a && (this.elementList = {});
        }
        destroySingleButton() {
          this.chart.drillUpButton &&
            (this.chart.drillUpButton.destroy(),
            (this.chart.drillUpButton = void 0));
        }
        resetElementListState() {
          v(this.elementList, (a) => {
            a.updated = !1;
          });
        }
        updateListElements() {
          const a = this.elementList,
            b = this.options.buttonSpacing,
            c = this.list,
            d = this.options.rtl,
            e = d ? -1 : 1,
            f = function (a, b) {
              return e * a.getBBox().width + e * b;
            },
            k = function (a, b, h) {
              a.translate(b - a.getBBox().width, h);
            };
          let g = this.group ? f(this.group, b) : b,
            l,
            n;
          for (let p = 0, r = c.length; p < r; ++p) {
            const h = p === r - 1;
            let m, q;
            n = c[p];
            a[n.level]
              ? ((l = a[n.level]),
                (m = l.button),
                l.separator || h
                  ? l.separator &&
                    h &&
                    (l.separator.destroy(), delete l.separator)
                  : ((g += e * b),
                    (l.separator = this.renderSeparator(g, b)),
                    d && k(l.separator, g, b),
                    (g += f(l.separator, b))),
                (a[n.level].updated = !0))
              : ((m = this.renderButton(n, g, b)),
                d && k(m, g, b),
                (g += f(m, b)),
                h ||
                  ((q = this.renderSeparator(g, b)),
                  d && k(q, g, b),
                  (g += f(q, b))),
                (a[n.level] = { button: m, separator: q, updated: !0 }));
            m && m.setState(h ? 2 : 0);
          }
        }
      }
      x.defaultOptions = a.options;
      ("");
      return x;
    }
  );
  b(
    a,
    "Series/Treemap/TreemapComposition.js",
    [
      a["Core/Series/SeriesRegistry.js"],
      a["Series/Treemap/TreemapUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, b, e) {
      ({ series: a } = a);
      const { addEvent: c, extend: d } = e;
      let n = !1;
      c(a, "afterBindAxes", function () {
        let a = this.xAxis,
          c = this.yAxis,
          e;
        a &&
          c &&
          (this.is("treemap")
            ? ((e = {
                endOnTick: !1,
                gridLineWidth: 0,
                lineWidth: 0,
                min: 0,
                minPadding: 0,
                max: b.AXIS_MAX,
                maxPadding: 0,
                startOnTick: !1,
                title: void 0,
                tickPositions: [],
              }),
              d(c.options, e),
              d(a.options, e),
              (n = !0))
            : n &&
              (c.setOptions(c.userOptions),
              a.setOptions(a.userOptions),
              (n = !1)));
      });
    }
  );
  b(a, "Series/Treemap/TreemapNode.js", [], function () {
    class a {
      constructor() {
        this.childrenTotal = 0;
        this.visible = !1;
      }
      init(a, b, c, t, n, k, g) {
        this.id = a;
        this.i = b;
        this.children = c;
        this.height = t;
        this.level = n;
        this.series = k;
        this.parent = g;
        return this;
      }
    }
    return a;
  });
  b(
    a,
    "Series/Treemap/TreemapSeries.js",
    [
      a["Core/Color/Color.js"],
      a["Series/ColorMapComposition.js"],
      a["Core/Globals.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Series/Treemap/TreemapAlgorithmGroup.js"],
      a["Series/Treemap/TreemapPoint.js"],
      a["Series/Treemap/TreemapUtilities.js"],
      a["Series/TreeUtilities.js"],
      a["Extensions/Breadcrumbs/Breadcrumbs.js"],
      a["Core/Utilities.js"],
      a["Series/Treemap/TreemapNode.js"],
    ],
    function (a, b, e, w, t, n, k, g, l, f, p) {
      const { parse: c } = a;
      ({ noop: a } = e);
      const {
          series: d,
          seriesTypes: { column: J, heatmap: K, scatter: B },
        } = w,
        { getColor: v, getLevelOptions: D, updateRootId: H } = g,
        {
          addEvent: x,
          correctFloat: y,
          defined: r,
          error: I,
          extend: C,
          fireEvent: T,
          isArray: M,
          isObject: U,
          isString: L,
          merge: A,
          pick: z,
          stableSort: V,
        } = f;
      class E extends B {
        constructor() {
          super(...arguments);
          this.level =
            this.tree =
            this.rootNode =
            this.points =
            this.options =
            this.nodeList =
            this.nodeMap =
            this.mapOptionsToLevel =
            this.data =
            this.axisRatio =
              void 0;
        }
        algorithmCalcPoints(a, b, c, d) {
          let h,
            m,
            q,
            e,
            F = c.lW,
            f = c.lH,
            u = c.plot,
            k,
            g = 0,
            l = c.elArr.length - 1;
          b ? ((F = c.nW), (f = c.nH)) : (k = c.elArr[c.elArr.length - 1]);
          c.elArr.forEach(function (a) {
            if (b || g < l)
              0 === c.direction
                ? ((h = u.x), (m = u.y), (q = F), (e = a / q))
                : ((h = u.x), (m = u.y), (e = f), (q = a / e)),
                d.push({ x: h, y: m, width: q, height: y(e) }),
                0 === c.direction ? (u.y += e) : (u.x += q);
            g += 1;
          });
          c.reset();
          0 === c.direction ? (c.width -= F) : (c.height -= f);
          u.y = u.parent.y + (u.parent.height - c.height);
          u.x = u.parent.x + (u.parent.width - c.width);
          a && (c.direction = 1 - c.direction);
          b || c.addElement(k);
        }
        algorithmFill(a, b, c) {
          let h = [],
            m,
            d = b.direction,
            q = b.x,
            e = b.y,
            f = b.width,
            Q = b.height,
            u,
            k,
            g,
            l;
          c.forEach(function (c) {
            m = (c.val / b.val) * b.height * b.width;
            u = q;
            k = e;
            0 === d
              ? ((l = Q), (g = m / l), (f -= g), (q += g))
              : ((g = f), (l = m / g), (Q -= l), (e += l));
            h.push({ x: u, y: k, width: g, height: l });
            a && (d = 1 - d);
          });
          return h;
        }
        algorithmLowAspectRatio(a, b, c) {
          let h = [],
            d = this,
            m,
            q = { x: b.x, y: b.y, parent: b },
            e = 0,
            f = c.length - 1,
            g = new t(b.height, b.width, b.direction, q);
          c.forEach(function (c) {
            m = (c.val / b.val) * b.height * b.width;
            g.addElement(m);
            g.lP.nR > g.lP.lR && d.algorithmCalcPoints(a, !1, g, h, q);
            e === f && d.algorithmCalcPoints(a, !0, g, h, q);
            e += 1;
          });
          return h;
        }
        alignDataLabel(a, b, c) {
          const h = c.style;
          h &&
            !r(h.textOverflow) &&
            b.text &&
            b.getBBox().width > b.text.textWidth &&
            b.css({ textOverflow: "ellipsis", width: (h.width += "px") });
          J.prototype.alignDataLabel.apply(this, arguments);
          a.dataLabel && a.dataLabel.attr({ zIndex: (a.node.zIndex || 0) + 1 });
        }
        calculateChildrenAreas(a, b) {
          let c = this,
            h = c.options,
            d = c.mapOptionsToLevel[a.level + 1],
            m = z(
              c[d && d.layoutAlgorithm] && d.layoutAlgorithm,
              h.layoutAlgorithm
            ),
            e = h.alternateStartingDirection,
            f = [];
          a = a.children.filter(function (a) {
            return !a.ignore;
          });
          d &&
            d.layoutStartingDirection &&
            (b.direction = "vertical" === d.layoutStartingDirection ? 0 : 1);
          f = c[m](b, a);
          a.forEach(function (a, h) {
            h = f[h];
            a.values = A(h, {
              val: a.childrenTotal,
              direction: e ? 1 - b.direction : b.direction,
            });
            a.pointValues = A(h, {
              x: h.x / c.axisRatio,
              y: k.AXIS_MAX - h.y - h.height,
              width: h.width / c.axisRatio,
            });
            a.children.length && c.calculateChildrenAreas(a, a.values);
          });
        }
        createList(a) {
          var b = this.chart;
          const c = [];
          if (b.breadcrumbs) {
            let h = 0;
            c.push({ level: h, levelOptions: b.series[0] });
            b = a.target.nodeMap[a.newRootId];
            const d = [];
            for (; b.parent || "" === b.parent; )
              d.push(b), (b = a.target.nodeMap[b.parent]);
            d.reverse().forEach(function (a) {
              c.push({ level: ++h, levelOptions: a });
            });
            1 >= c.length && (c.length = 0);
          }
          return c;
        }
        drawDataLabels() {
          let a = this,
            b = a.mapOptionsToLevel,
            c,
            e;
          a.points
            .filter(function (a) {
              return a.node.visible;
            })
            .forEach(function (h) {
              e = b[h.node.level];
              c = { style: {} };
              h.node.isLeaf || (c.enabled = !1);
              e &&
                e.dataLabels &&
                ((c = A(c, e.dataLabels)), (a._hasPointLabels = !0));
              h.shapeArgs &&
                ((c.style.width = h.shapeArgs.width),
                h.dataLabel &&
                  h.dataLabel.css({ width: h.shapeArgs.width + "px" }));
              h.dlOptions = A(c, h.options.dataLabels);
            });
          d.prototype.drawDataLabels.call(this);
        }
        drawPoints(a = this.points) {
          const b = this,
            c = b.chart,
            h = c.renderer,
            d = c.styledMode,
            e = b.options,
            f = d ? {} : e.shadow,
            g = e.borderRadius,
            k = c.pointCount < e.animationLimit,
            l = e.allowTraversingTree;
          a.forEach(function (a) {
            const c = a.node.levelDynamic,
              m = {},
              q = {},
              N = {},
              G = "level-group-" + a.node.level,
              O = !!a.graphic,
              F = k && O,
              P = a.shapeArgs;
            a.shouldDraw() &&
              ((a.isInside = !0),
              g && (q.r = g),
              A(
                !0,
                F ? m : q,
                O ? P : {},
                d ? {} : b.pointAttribs(a, a.selected ? "select" : void 0)
              ),
              b.colorAttribs && d && C(N, b.colorAttribs(a)),
              b[G] ||
                ((b[G] = h
                  .g(G)
                  .attr({ zIndex: 1e3 - (c || 0) })
                  .add(b.group)),
                (b[G].survive = !0)));
            a.draw({
              animatableAttribs: m,
              attribs: q,
              css: N,
              group: b[G],
              renderer: h,
              shadow: f,
              shapeArgs: P,
              shapeType: a.shapeType,
            });
            l &&
              a.graphic &&
              (a.drillId = e.interactByLeaf
                ? b.drillToByLeaf(a)
                : b.drillToByGroup(a));
          });
        }
        drillToByGroup(a) {
          let b = !1;
          1 !== a.node.level - this.nodeMap[this.rootNode].level ||
            a.node.isLeaf ||
            (b = a.id);
          return b;
        }
        drillToByLeaf(a) {
          let b = !1;
          if (a.node.parent !== this.rootNode && a.node.isLeaf)
            for (a = a.node; !b; )
              (a = this.nodeMap[a.parent]),
                a.parent === this.rootNode && (b = a.id);
          return b;
        }
        drillToNode(a, b) {
          I(32, !1, void 0, {
            "treemap.drillToNode": "use treemap.setRootNode",
          });
          this.setRootNode(a, b);
        }
        drillUp() {
          const a = this.nodeMap[this.rootNode];
          a &&
            L(a.parent) &&
            this.setRootNode(a.parent, !0, { trigger: "traverseUpButton" });
        }
        getExtremes() {
          const { dataMin: a, dataMax: b } = d.prototype.getExtremes.call(
            this,
            this.colorValueData
          );
          this.valueMin = a;
          this.valueMax = b;
          return d.prototype.getExtremes.call(this);
        }
        getListOfParents(a, b) {
          a = M(a) ? a : [];
          const c = M(b) ? b : [];
          b = a.reduce(
            function (a, b, c) {
              b = z(b.parent, "");
              "undefined" === typeof a[b] && (a[b] = []);
              a[b].push(c);
              return a;
            },
            { "": [] }
          );
          k.eachObject(b, function (a, b, h) {
            "" !== b &&
              -1 === c.indexOf(b) &&
              (a.forEach(function (a) {
                h[""].push(a);
              }),
              delete h[b]);
          });
          return b;
        }
        getTree() {
          var a = this.data.map(function (a) {
            return a.id;
          });
          a = this.getListOfParents(this.data, a);
          this.nodeMap = {};
          this.nodeList = [];
          return this.buildTree("", -1, 0, a);
        }
        buildTree(a, b, c, d, e) {
          let h = this,
            m = [],
            q = h.points[b],
            f = 0,
            g,
            k;
          (d[a] || []).forEach(function (b) {
            k = h.buildTree(h.points[b].id, b, c + 1, d, a);
            f = Math.max(k.height + 1, f);
            m.push(k);
          });
          g = new h.NodeClass().init(a, b, m, f, c, h, e);
          m.forEach((a) => {
            a.parentNode = g;
          });
          h.nodeMap[g.id] = g;
          h.nodeList.push(g);
          q && ((q.node = g), (g.point = q));
          return g;
        }
        hasData() {
          return !!this.processedXData.length;
        }
        init(a, b) {
          const c = this,
            h = A(b.drillUpButton, b.breadcrumbs);
          let e;
          e = x(c, "setOptions", function (a) {
            a = a.userOptions;
            r(a.allowDrillToNode) &&
              !r(a.allowTraversingTree) &&
              ((a.allowTraversingTree = a.allowDrillToNode),
              delete a.allowDrillToNode);
            r(a.drillUpButton) &&
              !r(a.traverseUpButton) &&
              ((a.traverseUpButton = a.drillUpButton), delete a.drillUpButton);
          });
          d.prototype.init.call(c, a, b);
          delete c.opacity;
          c.eventsToUnbind.push(e);
          c.options.allowTraversingTree &&
            (c.eventsToUnbind.push(x(c, "click", c.onClickDrillToNode)),
            c.eventsToUnbind.push(
              x(c, "setRootNode", function (a) {
                const b = c.chart;
                b.breadcrumbs &&
                  b.breadcrumbs.updateProperties(c.createList(a));
              })
            ),
            c.eventsToUnbind.push(
              x(c, "update", function (a, b) {
                (b = this.chart.breadcrumbs) &&
                  a.options.breadcrumbs &&
                  b.update(a.options.breadcrumbs);
              })
            ),
            c.eventsToUnbind.push(
              x(c, "destroy", function (a) {
                const b = this.chart;
                b.breadcrumbs &&
                  (b.breadcrumbs.destroy(),
                  a.keepEventsForUpdate || (b.breadcrumbs = void 0));
              })
            ));
          a.breadcrumbs || (a.breadcrumbs = new l(a, h));
          c.eventsToUnbind.push(
            x(a.breadcrumbs, "up", function (a) {
              a = this.level - a.newLevel;
              for (let b = 0; b < a; b++) c.drillUp();
            })
          );
        }
        onClickDrillToNode(a) {
          const b = (a = a.point) && a.drillId;
          L(b) &&
            (a.setState(""), this.setRootNode(b, !0, { trigger: "click" }));
        }
        pointAttribs(a, b) {
          var d = U(this.mapOptionsToLevel) ? this.mapOptionsToLevel : {};
          let h = (a && d[a.node.level]) || {};
          d = this.options;
          let e = (b && d.states && d.states[b]) || {},
            f = (a && a.getClassName()) || "";
          a = {
            stroke:
              (a && a.borderColor) ||
              h.borderColor ||
              e.borderColor ||
              d.borderColor,
            "stroke-width": z(
              a && a.borderWidth,
              h.borderWidth,
              e.borderWidth,
              d.borderWidth
            ),
            dashstyle:
              (a && a.borderDashStyle) ||
              h.borderDashStyle ||
              e.borderDashStyle ||
              d.borderDashStyle,
            fill: (a && a.color) || this.color,
          };
          -1 !== f.indexOf("highcharts-above-level")
            ? ((a.fill = "none"), (a["stroke-width"] = 0))
            : -1 !== f.indexOf("highcharts-internal-node-interactive")
            ? ((b = z(e.opacity, d.opacity)),
              (a.fill = c(a.fill).setOpacity(b).get()),
              (a.cursor = "pointer"))
            : -1 !== f.indexOf("highcharts-internal-node")
            ? (a.fill = "none")
            : b && (a.fill = c(a.fill).brighten(e.brightness).get());
          return a;
        }
        setColorRecursive(a, b, c, d, e) {
          let h = this;
          var f = h && h.chart;
          f = f && f.options && f.options.colors;
          let g;
          if (a) {
            g = v(a, {
              colors: f,
              index: d,
              mapOptionsToLevel: h.mapOptionsToLevel,
              parentColor: b,
              parentColorIndex: c,
              series: h,
              siblings: e,
            });
            if ((b = h.points[a.i]))
              (b.color = g.color), (b.colorIndex = g.colorIndex);
            (a.children || []).forEach(function (b, c) {
              h.setColorRecursive(
                b,
                g.color,
                g.colorIndex,
                c,
                a.children.length
              );
            });
          }
        }
        setPointValues() {
          const a = this,
            { points: b, xAxis: c, yAxis: d } = a,
            e = a.chart.styledMode;
          b.forEach(function (b) {
            const { pointValues: h, visible: f } = b.node;
            if (h && f) {
              const { height: f, width: k, x: l, y: q } = h;
              var g = e
                  ? 0
                  : ((a.pointAttribs(b)["stroke-width"] || 0) % 2) / 2,
                m = Math.round(c.toPixels(l, !0)) - g;
              const n = Math.round(c.toPixels(l + k, !0)) - g,
                p = Math.round(d.toPixels(q, !0)) - g;
              g = Math.round(d.toPixels(q + f, !0)) - g;
              m = {
                x: Math.min(m, n),
                y: Math.min(p, g),
                width: Math.abs(n - m),
                height: Math.abs(g - p),
              };
              b.plotX = m.x + m.width / 2;
              b.plotY = m.y + m.height / 2;
              b.shapeArgs = m;
            } else delete b.plotX, delete b.plotY;
          });
        }
        setRootNode(a, b, c) {
          a = C(
            {
              newRootId: a,
              previousRootId: this.rootNode,
              redraw: z(b, !0),
              series: this,
            },
            c
          );
          T(this, "setRootNode", a, function (a) {
            const b = a.series;
            b.idPreviousRoot = a.previousRootId;
            b.rootNode = a.newRootId;
            b.isDirty = !0;
            a.redraw && b.chart.redraw();
          });
        }
        setState(a) {
          this.options.inactiveOtherPoints = !0;
          d.prototype.setState.call(this, a, !1);
          this.options.inactiveOtherPoints = !1;
        }
        setTreeValues(a) {
          let b = this;
          var c = b.options;
          let d = b.nodeMap[b.rootNode];
          c = k.isBoolean(c.levelIsConstant) ? c.levelIsConstant : !0;
          let h = 0,
            e = [],
            f,
            g = b.points[a.i];
          a.children.forEach(function (a) {
            a = b.setTreeValues(a);
            e.push(a);
            a.ignore || (h += a.val);
          });
          V(e, function (a, b) {
            return (a.sortIndex || 0) - (b.sortIndex || 0);
          });
          f = z(g && g.options.value, h);
          g && (g.value = f);
          C(a, {
            children: e,
            childrenTotal: h,
            ignore: !(z(g && g.visible, !0) && 0 < f),
            isLeaf: a.visible && !h,
            levelDynamic: a.level - (c ? 0 : d.level),
            name: z(g && g.name, ""),
            sortIndex: z(g && g.sortIndex, -f),
            val: f,
          });
          return a;
        }
        sliceAndDice(a, b) {
          return this.algorithmFill(!0, a, b);
        }
        squarified(a, b) {
          return this.algorithmLowAspectRatio(!0, a, b);
        }
        strip(a, b) {
          return this.algorithmLowAspectRatio(!1, a, b);
        }
        stripes(a, b) {
          return this.algorithmFill(!1, a, b);
        }
        translate() {
          let a = this;
          var b = a.options,
            c = H(a);
          let e, f;
          d.prototype.translate.call(a);
          f = a.tree = a.getTree();
          e = a.nodeMap[c];
          "" === c ||
            (e && e.children.length) ||
            (a.setRootNode("", !1), (c = a.rootNode), (e = a.nodeMap[c]));
          a.mapOptionsToLevel = D({
            from: e.level + 1,
            levels: b.levels,
            to: f.height,
            defaults: {
              levelIsConstant: a.options.levelIsConstant,
              colorByPoint: b.colorByPoint,
            },
          });
          k.recursive(a.nodeMap[a.rootNode], function (b) {
            let c = !1,
              d = b.parent;
            b.visible = !0;
            if (d || "" === d) c = a.nodeMap[d];
            return c;
          });
          k.recursive(a.nodeMap[a.rootNode].children, function (a) {
            let b = !1;
            a.forEach(function (a) {
              a.visible = !0;
              a.children.length && (b = (b || []).concat(a.children));
            });
            return b;
          });
          a.setTreeValues(f);
          a.axisRatio = a.xAxis.len / a.yAxis.len;
          a.nodeMap[""].pointValues = c = {
            x: 0,
            y: 0,
            width: k.AXIS_MAX,
            height: k.AXIS_MAX,
          };
          a.nodeMap[""].values = c = A(c, {
            width: c.width * a.axisRatio,
            direction: "vertical" === b.layoutStartingDirection ? 0 : 1,
            val: f.val,
          });
          a.calculateChildrenAreas(f, c);
          a.colorAxis || b.colorByPoint || a.setColorRecursive(a.tree);
          b.allowTraversingTree &&
            ((b = e.pointValues),
            a.xAxis.setExtremes(b.x, b.x + b.width, !1),
            a.yAxis.setExtremes(b.y, b.y + b.height, !1),
            a.xAxis.setScale(),
            a.yAxis.setScale());
          a.setPointValues();
        }
      }
      E.defaultOptions = A(B.defaultOptions, {
        allowTraversingTree: !1,
        animationLimit: 250,
        borderRadius: 0,
        showInLegend: !1,
        marker: void 0,
        colorByPoint: !1,
        dataLabels: {
          defer: !1,
          enabled: !0,
          formatter: function () {
            const a = this && this.point ? this.point : {};
            return L(a.name) ? a.name : "";
          },
          inside: !0,
          verticalAlign: "middle",
        },
        tooltip: {
          headerFormat: "",
          pointFormat: "<b>{point.name}</b>: {point.value}<br/>",
        },
        ignoreHiddenPoint: !0,
        layoutAlgorithm: "sliceAndDice",
        layoutStartingDirection: "vertical",
        alternateStartingDirection: !1,
        levelIsConstant: !0,
        traverseUpButton: { position: { align: "right", x: -10, y: 10 } },
        borderColor: "#e6e6e6",
        borderWidth: 1,
        colorKey: "colorValue",
        opacity: 0.15,
        states: {
          hover: {
            borderColor: "#999999",
            brightness: K ? 0 : 0.1,
            halo: !1,
            opacity: 0.75,
            shadow: !1,
          },
        },
        legendSymbol: "rectangle",
      });
      C(E.prototype, {
        buildKDTree: a,
        colorAttribs: b.seriesMembers.colorAttribs,
        colorKey: "colorValue",
        directTouch: !0,
        getExtremesFromAll: !0,
        getSymbol: a,
        optionalAxis: "colorAxis",
        parallelArrays: ["x", "y", "value", "colorValue"],
        pointArrayMap: ["value"],
        pointClass: n,
        NodeClass: p,
        trackerGroups: ["group", "dataLabelsGroup"],
        utils: { recursive: k.recursive },
      });
      b.compose(E);
      w.registerSeriesType("treemap", E);
      ("");
      return E;
    }
  );
  b(
    a,
    "masters/modules/treemap.src.js",
    [a["Core/Globals.js"], a["Extensions/Breadcrumbs/Breadcrumbs.js"]],
    function (a, b) {
      a.Breadcrumbs = b;
      b.compose(a.Chart, a.defaultOptions);
    }
  );
});
//# sourceMappingURL=treemap.js.map
