/*
 Highcharts JS v11.1.0 (2023-06-05)

 Module for adding patterns and images as point fills.

 (c) 2010-2021 Highsoft AS
 Author: Torstein Hnsi, ystein Moseng

 License: www.highcharts.com/license
*/
"use strict";
(function (c) {
  "object" === typeof module && module.exports
    ? ((c["default"] = c), (module.exports = c))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/pattern-fill", ["highcharts"], function (e) {
        c(e);
        c.Highcharts = e;
        return c;
      })
    : c("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (c) {
  function e(c, k, e, q) {
    c.hasOwnProperty(k) ||
      ((c[k] = q.apply(null, e)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: k, module: c[k] },
          })
        ));
  }
  c = c ? c._modules : {};
  e(
    c,
    "Extensions/PatternFill.js",
    [
      c["Core/Animation/AnimationUtilities.js"],
      c["Core/Chart/Chart.js"],
      c["Core/Globals.js"],
      c["Core/Defaults.js"],
      c["Core/Series/Point.js"],
      c["Core/Series/Series.js"],
      c["Core/Renderer/SVG/SVGRenderer.js"],
      c["Core/Utilities.js"],
    ],
    function (c, e, y, q, r, t, u, v) {
      function k(a, b) {
        a = JSON.stringify(a);
        const d = a.length || 0;
        let f = 0,
          g = 0;
        if (b) {
          b = Math.max(Math.floor(d / 500), 1);
          for (let g = 0; g < d; g += b) f += a.charCodeAt(g);
          f &= f;
        }
        for (; g < d; ++g)
          (b = a.charCodeAt(g)), (f = (f << 5) - f + b), (f &= f);
        return f.toString(16).replace("-", "1");
      }
      const { animObject: z } = c,
        { getOptions: A } = q,
        {
          addEvent: n,
          defined: B,
          erase: C,
          merge: w,
          pick: p,
          removeEvent: D,
          wrap: E,
        } = v,
        x = (y.patterns = (() => {
          const a = [],
            b = A().colors;
          [
            "M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5",
            "M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5",
            "M 2 0 L 2 5 M 4 0 L 4 5",
            "M 0 2 L 5 2 M 0 4 L 5 4",
            "M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5",
          ].forEach((d, f) => {
            a.push({
              path: d,
              color: b[f],
              width: 5,
              height: 5,
              patternTransform: "scale(1.4 1.4)",
            });
          });
          [
            "M 0 0 L 5 10 L 10 0",
            "M 3 3 L 8 3 L 8 8 L 3 8 Z",
            "M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0",
            "M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11",
            "M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9",
          ].forEach((d, f) => {
            a.push({ path: d, color: b[f + 5], width: 10, height: 10 });
          });
          return a;
        })());
      r.prototype.calculatePatternDimensions = function (a) {
        if (!a.width || !a.height) {
          var b =
              (this.graphic &&
                ((this.graphic.getBBox && this.graphic.getBBox(!0)) ||
                  (this.graphic.element && this.graphic.element.getBBox()))) ||
              {},
            d = this.shapeArgs;
          d &&
            ((b.width = d.width || b.width),
            (b.height = d.height || b.height),
            (b.x = d.x || b.x),
            (b.y = d.y || b.y));
          if (a.image) {
            if (!b.width || !b.height) {
              a._width = "defer";
              a._height = "defer";
              b =
                this.series.chart.mapView &&
                this.series.chart.mapView.getSVGTransform().scaleY;
              B(b) && 0 > b && (a._inverted = !0);
              return;
            }
            a.aspectRatio &&
              ((b.aspectRatio = b.width / b.height),
              a.aspectRatio > b.aspectRatio
                ? (b.aspectWidth = b.height * a.aspectRatio)
                : (b.aspectHeight = b.width / a.aspectRatio));
            a._width = a.width || Math.ceil(b.aspectWidth || b.width);
            a._height = a.height || Math.ceil(b.aspectHeight || b.height);
          }
          a.width ||
            ((a._x = a.x || 0),
            (a._x +=
              b.x -
              Math.round(
                b.aspectWidth ? Math.abs(b.aspectWidth - b.width) / 2 : 0
              )));
          a.height ||
            ((a._y = a.y || 0),
            (a._y +=
              b.y -
              Math.round(
                b.aspectHeight ? Math.abs(b.aspectHeight - b.height) / 2 : 0
              )));
        }
      };
      u.prototype.addPattern = function (a, b) {
        let d;
        b = p(b, !0);
        let f = z(b);
        let g = a.width || a._width || 32,
          c = a.height || a._height || 32,
          e = a.color || "#343434",
          l = a.id,
          k = this;
        var m = function (a) {
          k.rect(0, 0, g, c).attr({ fill: a }).add(d);
        };
        l ||
          ((this.idCounter = this.idCounter || 0),
          (l =
            "highcharts-pattern-" +
            this.idCounter +
            "-" +
            (this.chartIndex || 0)),
          ++this.idCounter);
        this.forExport && (l += "-export");
        this.defIds = this.defIds || [];
        if (!(-1 < this.defIds.indexOf(l))) {
          this.defIds.push(l);
          var h = {
            id: l,
            patternUnits: "userSpaceOnUse",
            patternContentUnits: a.patternContentUnits || "userSpaceOnUse",
            width: g,
            height: c,
            x: a._x || a.x || 0,
            y: a._y || a.y || 0,
          };
          a._inverted &&
            ((h.patternTransform = "scale(1, -1)"),
            a.patternTransform && (a.patternTransform += " scale(1, -1)"));
          a.patternTransform && (h.patternTransform = a.patternTransform);
          d = this.createElement("pattern").attr(h).add(this.defs);
          d.id = l;
          a.path
            ? ((h = v.isObject(a.path) ? a.path : { d: a.path }),
              a.backgroundColor && m(a.backgroundColor),
              (m = { d: h.d }),
              this.styledMode ||
                ((m.stroke = h.stroke || e),
                (m["stroke-width"] = p(h.strokeWidth, 2)),
                (m.fill = h.fill || "none")),
              h.transform && (m.transform = h.transform),
              this.createElement("path").attr(m).add(d),
              (d.color = e))
            : a.image &&
              (b
                ? this.image(a.image, 0, 0, g, c, function () {
                    this.animate({ opacity: p(a.opacity, 1) }, f);
                    D(this.element, "load");
                  })
                    .attr({ opacity: 0 })
                    .add(d)
                : this.image(a.image, 0, 0, g, c).add(d));
          (a.image && b) ||
            "undefined" === typeof a.opacity ||
            [].forEach.call(d.element.childNodes, function (b) {
              b.setAttribute("opacity", a.opacity);
            });
          this.patternElements = this.patternElements || {};
          return (this.patternElements[l] = d);
        }
      };
      E(t.prototype, "getColor", function (a) {
        const b = this.options.color;
        b && b.pattern && !b.pattern.color
          ? (delete this.options.color,
            a.apply(this, Array.prototype.slice.call(arguments, 1)),
            (b.pattern.color = this.color),
            (this.color = this.options.color = b))
          : a.apply(this, Array.prototype.slice.call(arguments, 1));
      });
      n(t, "render", function () {
        const a = this.chart.isResizing;
        (this.isDirtyData || a || !this.chart.hasRendered) &&
          (this.points || []).forEach(function (b) {
            const d = b.options && b.options.color;
            d &&
              d.pattern &&
              (!a || (b.shapeArgs && b.shapeArgs.width && b.shapeArgs.height)
                ? b.calculatePatternDimensions(d.pattern)
                : ((d.pattern._width = "defer"),
                  (d.pattern._height = "defer")));
          });
      });
      n(r, "afterInit", function () {
        const a = this.options.color;
        a &&
          a.pattern &&
          ("string" === typeof a.pattern.path &&
            (a.pattern.path = { d: a.pattern.path }),
          (this.color = this.options.color = w(this.series.options.color, a)));
      });
      n(u, "complexColor", function (a) {
        const b = a.args[0],
          d = a.args[1];
        a = a.args[2];
        const f = this.chartIndex || 0;
        let c = b.pattern,
          e = "#343434";
        "undefined" !== typeof b.patternIndex && x && (c = x[b.patternIndex]);
        if (!c) return !0;
        if (c.image || "string" === typeof c.path || (c.path && c.path.d)) {
          let b = a.parentNode && a.parentNode.getAttribute("class");
          b = b && -1 < b.indexOf("highcharts-legend");
          ("defer" !== c._width && "defer" !== c._height) ||
            r.prototype.calculatePatternDimensions.call(
              { graphic: { element: a } },
              c
            );
          if (b || !c.id)
            (c = w({}, c)),
              (c.id = "highcharts-pattern-" + f + "-" + k(c) + k(c, !0));
          this.addPattern(
            c,
            !this.forExport &&
              p(c.animation, this.globalAnimation, { duration: 100 })
          );
          e = `url(${this.url}#${c.id + (this.forExport ? "-export" : "")})`;
        } else e = c.color || e;
        a.setAttribute(d, e);
        b.toString = function () {
          return e;
        };
        return !1;
      });
      n(e, "endResize", function () {
        ((this.renderer && this.renderer.defIds) || []).filter(function (a) {
          return a && a.indexOf && 0 === a.indexOf("highcharts-pattern-");
        }).length &&
          (this.series.forEach(function (a) {
            a.visible &&
              a.points.forEach(function (a) {
                (a = a.options && a.options.color) &&
                  a.pattern &&
                  ((a.pattern._width = "defer"), (a.pattern._height = "defer"));
              });
          }),
          this.redraw(!1));
      });
      n(e, "redraw", function () {
        const a = {},
          b = this.renderer,
          c = (b.defIds || []).filter(function (a) {
            return a.indexOf && 0 === a.indexOf("highcharts-pattern-");
          });
        c.length &&
          ([].forEach.call(
            this.renderTo.querySelectorAll(
              '[color^="url("], [fill^="url("], [stroke^="url("]'
            ),
            function (c) {
              if (
                (c =
                  c.getAttribute("fill") ||
                  c.getAttribute("color") ||
                  c.getAttribute("stroke"))
              )
                (c = c
                  .replace(b.url, "")
                  .replace("url(#", "")
                  .replace(")", "")),
                  (a[c] = !0);
            }
          ),
          c.forEach(function (c) {
            a[c] ||
              (C(b.defIds, c),
              b.patternElements[c] &&
                (b.patternElements[c].destroy(), delete b.patternElements[c]));
          }));
      });
      ("");
    }
  );
  e(c, "masters/modules/pattern-fill.src.js", [], function () {});
});
//# sourceMappingURL=pattern-fill.js.map
