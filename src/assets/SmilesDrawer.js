(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module) {
        "use strict";
        var _Mathmin = Math.min,
          _Mathmax = Math.max;
        const Drawer = require("./src/Drawer"),
          Parser = require("./src/Parser"),
          SvgDrawer = require("./src/SvgDrawer");
        var canUseDOM = !!(
            "undefined" != typeof window &&
            window.document &&
            window.document.createElement
          ),
          SmilesDrawer = { Version: "1.0.0" };
        (SmilesDrawer.Drawer = Drawer),
          (SmilesDrawer.Parser = Parser),
          (SmilesDrawer.SvgDrawer = SvgDrawer),
          (SmilesDrawer.clean = function (smiles) {
            return smiles.replace(
              /[^A-Za-z0-9@\.\+\-\?!\(\)\[\]\{\}/\\=#\$:\*]/g,
              ""
            );
          }),
          (SmilesDrawer.apply = function (
            options,
            selector = "canvas[data-smiles]",
            themeName = "light",
            onError = null
          ) {
            let smilesDrawer = new Drawer(options),
              elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
              let element = elements[i];
              SmilesDrawer.parse(
                element.getAttribute("data-smiles"),
                function (tree) {
                  smilesDrawer.draw(tree, element, themeName, !1);
                },
                function (err) {
                  onError && onError(err);
                }
              );
            }
          }),
          (SmilesDrawer.parse = function (
            smiles,
            successCallback,
            errorCallback
          ) {
            try {
              successCallback && successCallback(Parser.parse(smiles));
            } catch (err) {
              errorCallback && errorCallback(err);
            }
          }),
          canUseDOM && (window.SmilesDrawer = SmilesDrawer),
          Array.prototype.fill ||
            Object.defineProperty(Array.prototype, "fill", {
              value: function (value) {
                if (null == this)
                  throw new TypeError("this is null or not defined");
                for (
                  var O = Object(this),
                    len = O.length >>> 0,
                    start = arguments[1],
                    relativeStart = start >> 0,
                    k =
                      0 > relativeStart
                        ? _Mathmax(len + relativeStart, 0)
                        : _Mathmin(relativeStart, len),
                    end = arguments[2],
                    relativeEnd = void 0 === end ? len : end >> 0,
                    final =
                      0 > relativeEnd
                        ? _Mathmax(len + relativeEnd, 0)
                        : _Mathmin(relativeEnd, len);
                  k < final;

                )
                  (O[k] = value), k++;
                return O;
              },
            }),
          (module.exports = SmilesDrawer);
      },
      { "./src/Drawer": 5, "./src/Parser": 10, "./src/SvgDrawer": 14 },
    ],
    2: [
      function (require, module) {
        "use strict";
        var _Mathmin2 = Math.min;
        class ArrayHelper {
          static clone(arr) {
            let out = Array.isArray(arr) ? [] : {};
            for (let key in arr) {
              let value = arr[key];
              out[key] =
                "function" == typeof value.clone
                  ? value.clone()
                  : "object" == typeof value
                  ? ArrayHelper.clone(value)
                  : value;
            }
            return out;
          }
          static equals(arrA, arrB) {
            if (arrA.length !== arrB.length) return !1;
            let tmpA = arrA.slice().sort(),
              tmpB = arrB.slice().sort();
            for (var i = 0; i < tmpA.length; i++)
              if (tmpA[i] !== tmpB[i]) return !1;
            return !0;
          }
          static print(arr) {
            if (0 == arr.length) return "";
            let s = "(";
            for (let i = 0; i < arr.length; i++)
              s += arr[i].id ? arr[i].id + ", " : arr[i] + ", ";
            return (s = s.substring(0, s.length - 2)), s + ")";
          }
          static each(arr, callback) {
            for (let i = 0; i < arr.length; i++) callback(arr[i]);
          }
          static get(arr, property, value) {
            for (let i = 0; i < arr.length; i++)
              if (arr[i][property] == value) return arr[i];
          }
          static contains(arr, options) {
            if (!options.property && !options.func) {
              for (let i = 0; i < arr.length; i++)
                if (arr[i] == options.value) return !0;
            } else if (options.func) {
              for (let i = 0; i < arr.length; i++)
                if (options.func(arr[i])) return !0;
            } else
              for (let i = 0; i < arr.length; i++)
                if (arr[i][options.property] == options.value) return !0;
            return !1;
          }
          static intersection(arrA, arrB) {
            let intersection = [];
            for (let i = 0; i < arrA.length; i++)
              for (let j = 0; j < arrB.length; j++)
                arrA[i] === arrB[j] && intersection.push(arrA[i]);
            return intersection;
          }
          static unique(arr) {
            let contains = {};
            return arr.filter(function (i) {
              return !(contains[i] !== void 0) && (contains[i] = !0);
            });
          }
          static count(arr, value) {
            let count = 0;
            for (let i = 0; i < arr.length; i++) arr[i] === value && count++;
            return count;
          }
          static toggle(arr, value) {
            let newArr = [],
              removed = !1;
            for (let i = 0; i < arr.length; i++)
              arr[i] === value ? (removed = !0) : newArr.push(arr[i]);
            return removed || newArr.push(value), newArr;
          }
          static remove(arr, value) {
            let tmp = [];
            for (let i = 0; i < arr.length; i++)
              arr[i] !== value && tmp.push(arr[i]);
            return tmp;
          }
          static removeUnique(arr, value) {
            let index = arr.indexOf(value);
            return -1 < index && arr.splice(index, 1), arr;
          }
          static removeAll(arrA, arrB) {
            return arrA.filter(function (item) {
              return -1 === arrB.indexOf(item);
            });
          }
          static merge(arrA, arrB) {
            let arr = Array(arrA.length + arrB.length);
            for (let i = 0; i < arrA.length; i++) arr[i] = arrA[i];
            for (let i = 0; i < arrB.length; i++)
              arr[arrA.length + i] = arrB[i];
            return arr;
          }
          static containsAll(arrA, arrB) {
            let containing = 0;
            for (let i = 0; i < arrA.length; i++)
              for (let j = 0; j < arrB.length; j++)
                arrA[i] === arrB[j] && containing++;
            return containing === arrB.length;
          }
          static sortByAtomicNumberDesc(arr) {
            let map = arr.map(function (e, i) {
              return { index: i, value: e.atomicNumber.split(".").map(Number) };
            });
            return (
              map.sort(function (a, b) {
                let min = _Mathmin2(b.value.length, a.value.length),
                  i = 0;
                for (; i < min && b.value[i] === a.value[i]; ) i++;
                return i === min
                  ? b.value.length - a.value.length
                  : b.value[i] - a.value[i];
              }),
              map.map(function (e) {
                return arr[e.index];
              })
            );
          }
          static deepCopy(arr) {
            let newArr = [];
            for (let i = 0, item; i < arr.length; i++)
              (item = arr[i]),
                (newArr[i] =
                  item instanceof Array ? ArrayHelper.deepCopy(item) : item);
            return newArr;
          }
        }
        module.exports = ArrayHelper;
      },
      {},
    ],
    3: [
      function (require, module) {
        "use strict";
        const ArrayHelper = require("./ArrayHelper"),
          Vertex = require("./Vertex"),
          Ring = require("./Ring");
        class Atom {
          constructor(element, bondType = "-") {
            (this.element =
              1 === element.length ? element.toUpperCase() : element),
              (this.drawExplicit = !1),
              (this.ringbonds = []),
              (this.rings = []),
              (this.bondType = bondType),
              (this.branchBond = null),
              (this.isBridge = !1),
              (this.isBridgeNode = !1),
              (this.originalRings = []),
              (this.bridgedRing = null),
              (this.anchoredRings = []),
              (this.bracket = null),
              (this.plane = 0),
              (this.attachedPseudoElements = {}),
              (this.hasAttachedPseudoElements = !1),
              (this.isDrawn = !0),
              (this.isConnectedToRing = !1),
              (this.neighbouringElements = []),
              (this.isPartOfAromaticRing = element !== this.element),
              (this.bondCount = 0),
              (this.chirality = ""),
              (this.isStereoCenter = !1),
              (this.priority = 0),
              (this.mainChain = !1),
              (this.hydrogenDirection = "down"),
              (this.subtreeDepth = 1),
              (this.hasHydrogen = !1);
          }
          addNeighbouringElement(element) {
            this.neighbouringElements.push(element);
          }
          attachPseudoElement(
            element,
            previousElement,
            hydrogenCount = 0,
            charge = 0
          ) {
            null === hydrogenCount && (hydrogenCount = 0),
              null === charge && (charge = 0);
            let key = hydrogenCount + element + charge;
            this.attachedPseudoElements[key]
              ? (this.attachedPseudoElements[key].count += 1)
              : (this.attachedPseudoElements[key] = {
                  element: element,
                  count: 1,
                  hydrogenCount: hydrogenCount,
                  previousElement: previousElement,
                  charge: charge,
                }),
              (this.hasAttachedPseudoElements = !0);
          }
          getAttachedPseudoElements() {
            let ordered = {},
              that = this;
            return (
              Object.keys(this.attachedPseudoElements)
                .sort()
                .forEach(function (key) {
                  ordered[key] = that.attachedPseudoElements[key];
                }),
              ordered
            );
          }
          getAttachedPseudoElementsCount() {
            return Object.keys(this.attachedPseudoElements).length;
          }
          isHeteroAtom() {
            return "C" !== this.element && "H" !== this.element;
          }
          addAnchoredRing(ringId) {
            ArrayHelper.contains(this.anchoredRings, { value: ringId }) ||
              this.anchoredRings.push(ringId);
          }
          getRingbondCount() {
            return this.ringbonds.length;
          }
          backupRings() {
            this.originalRings = Array(this.rings.length);
            for (let i = 0; i < this.rings.length; i++)
              this.originalRings[i] = this.rings[i];
          }
          restoreRings() {
            this.rings = Array(this.originalRings.length);
            for (let i = 0; i < this.originalRings.length; i++)
              this.rings[i] = this.originalRings[i];
          }
          haveCommonRingbond(atomA, atomB) {
            for (let i = 0; i < atomA.ringbonds.length; i++)
              for (let j = 0; j < atomB.ringbonds.length; j++)
                if (atomA.ringbonds[i].id == atomB.ringbonds[j].id) return !0;
            return !1;
          }
          neighbouringElementsEqual(arr) {
            if (arr.length !== this.neighbouringElements.length) return !1;
            arr.sort(), this.neighbouringElements.sort();
            for (var i = 0; i < this.neighbouringElements.length; i++)
              if (arr[i] !== this.neighbouringElements[i]) return !1;
            return !0;
          }
          getAtomicNumber() {
            return Atom.atomicNumbers[this.element];
          }
          getMaxBonds() {
            return Atom.maxBonds[this.element];
          }
          static get maxBonds() {
            return {
              H: 1,
              C: 4,
              N: 3,
              O: 2,
              P: 3,
              S: 2,
              B: 3,
              F: 1,
              I: 1,
              Cl: 1,
              Br: 1,
            };
          }
          static get atomicNumbers() {
            return {
              H: 1,
              He: 2,
              Li: 3,
              Be: 4,
              B: 5,
              b: 5,
              C: 6,
              c: 6,
              N: 7,
              n: 7,
              O: 8,
              o: 8,
              F: 9,
              Ne: 10,
              Na: 11,
              Mg: 12,
              Al: 13,
              Si: 14,
              P: 15,
              p: 15,
              S: 16,
              s: 16,
              Cl: 17,
              Ar: 18,
              K: 19,
              Ca: 20,
              Sc: 21,
              Ti: 22,
              V: 23,
              Cr: 24,
              Mn: 25,
              Fe: 26,
              Co: 27,
              Ni: 28,
              Cu: 29,
              Zn: 30,
              Ga: 31,
              Ge: 32,
              As: 33,
              Se: 34,
              Br: 35,
              Kr: 36,
              Rb: 37,
              Sr: 38,
              Y: 39,
              Zr: 40,
              Nb: 41,
              Mo: 42,
              Tc: 43,
              Ru: 44,
              Rh: 45,
              Pd: 46,
              Ag: 47,
              Cd: 48,
              In: 49,
              Sn: 50,
              Sb: 51,
              Te: 52,
              I: 53,
              Xe: 54,
              Cs: 55,
              Ba: 56,
              La: 57,
              Ce: 58,
              Pr: 59,
              Nd: 60,
              Pm: 61,
              Sm: 62,
              Eu: 63,
              Gd: 64,
              Tb: 65,
              Dy: 66,
              Ho: 67,
              Er: 68,
              Tm: 69,
              Yb: 70,
              Lu: 71,
              Hf: 72,
              Ta: 73,
              W: 74,
              Re: 75,
              Os: 76,
              Ir: 77,
              Pt: 78,
              Au: 79,
              Hg: 80,
              Tl: 81,
              Pb: 82,
              Bi: 83,
              Po: 84,
              At: 85,
              Rn: 86,
              Fr: 87,
              Ra: 88,
              Ac: 89,
              Th: 90,
              Pa: 91,
              U: 92,
              Np: 93,
              Pu: 94,
              Am: 95,
              Cm: 96,
              Bk: 97,
              Cf: 98,
              Es: 99,
              Fm: 100,
              Md: 101,
              No: 102,
              Lr: 103,
              Rf: 104,
              Db: 105,
              Sg: 106,
              Bh: 107,
              Hs: 108,
              Mt: 109,
              Ds: 110,
              Rg: 111,
              Cn: 112,
              Uut: 113,
              Uuq: 114,
              Uup: 115,
              Uuh: 116,
              Uus: 117,
              Uuo: 118,
            };
          }
          static get mass() {
            return {
              H: 1,
              He: 2,
              Li: 3,
              Be: 4,
              B: 5,
              b: 5,
              C: 6,
              c: 6,
              N: 7,
              n: 7,
              O: 8,
              o: 8,
              F: 9,
              Ne: 10,
              Na: 11,
              Mg: 12,
              Al: 13,
              Si: 14,
              P: 15,
              p: 15,
              S: 16,
              s: 16,
              Cl: 17,
              Ar: 18,
              K: 19,
              Ca: 20,
              Sc: 21,
              Ti: 22,
              V: 23,
              Cr: 24,
              Mn: 25,
              Fe: 26,
              Co: 27,
              Ni: 28,
              Cu: 29,
              Zn: 30,
              Ga: 31,
              Ge: 32,
              As: 33,
              Se: 34,
              Br: 35,
              Kr: 36,
              Rb: 37,
              Sr: 38,
              Y: 39,
              Zr: 40,
              Nb: 41,
              Mo: 42,
              Tc: 43,
              Ru: 44,
              Rh: 45,
              Pd: 46,
              Ag: 47,
              Cd: 48,
              In: 49,
              Sn: 50,
              Sb: 51,
              Te: 52,
              I: 53,
              Xe: 54,
              Cs: 55,
              Ba: 56,
              La: 57,
              Ce: 58,
              Pr: 59,
              Nd: 60,
              Pm: 61,
              Sm: 62,
              Eu: 63,
              Gd: 64,
              Tb: 65,
              Dy: 66,
              Ho: 67,
              Er: 68,
              Tm: 69,
              Yb: 70,
              Lu: 71,
              Hf: 72,
              Ta: 73,
              W: 74,
              Re: 75,
              Os: 76,
              Ir: 77,
              Pt: 78,
              Au: 79,
              Hg: 80,
              Tl: 81,
              Pb: 82,
              Bi: 83,
              Po: 84,
              At: 85,
              Rn: 86,
              Fr: 87,
              Ra: 88,
              Ac: 89,
              Th: 90,
              Pa: 91,
              U: 92,
              Np: 93,
              Pu: 94,
              Am: 95,
              Cm: 96,
              Bk: 97,
              Cf: 98,
              Es: 99,
              Fm: 100,
              Md: 101,
              No: 102,
              Lr: 103,
              Rf: 104,
              Db: 105,
              Sg: 106,
              Bh: 107,
              Hs: 108,
              Mt: 109,
              Ds: 110,
              Rg: 111,
              Cn: 112,
              Uut: 113,
              Uuq: 114,
              Uup: 115,
              Uuh: 116,
              Uus: 117,
              Uuo: 118,
            };
          }
        }
        module.exports = Atom;
      },
      { "./ArrayHelper": 2, "./Ring": 11, "./Vertex": 19 },
    ],
    4: [
      function (require, module) {
        "use strict";
        var _NumberMAX_VALUE = Number.MAX_VALUE;
        const MathHelper = require("./MathHelper"),
          Vector2 = require("./Vector2"),
          Line = require("./Line"),
          Vertex = require("./Vertex"),
          Ring = require("./Ring"),
          { getChargeText } = require("./UtilityFunctions");
        module.exports = class {
          constructor(target, themeManager, options) {
            (this.canvas =
              "string" == typeof target || target instanceof String
                ? document.getElementById(target)
                : target),
              (this.ctx = this.canvas.getContext("2d")),
              (this.themeManager = themeManager),
              (this.opts = options),
              (this.drawingWidth = 0),
              (this.drawingHeight = 0),
              (this.offsetX = 0),
              (this.offsetY = 0),
              (this.fontLarge =
                this.opts.fontSizeLarge + "pt Helvetica, Arial, sans-serif"),
              (this.fontSmall =
                this.opts.fontSizeSmall + "pt Helvetica, Arial, sans-serif"),
              this.updateSize(this.opts.width, this.opts.height),
              (this.ctx.font = this.fontLarge),
              (this.hydrogenWidth = this.ctx.measureText("H").width),
              (this.halfHydrogenWidth = this.hydrogenWidth / 2),
              (this.halfBondThickness = this.opts.bondThickness / 2);
          }
          updateSize(width, height) {
            (this.devicePixelRatio = window.devicePixelRatio || 1),
              (this.backingStoreRatio =
                this.ctx.webkitBackingStorePixelRatio ||
                this.ctx.mozBackingStorePixelRatio ||
                this.ctx.msBackingStorePixelRatio ||
                this.ctx.oBackingStorePixelRatio ||
                this.ctx.backingStorePixelRatio ||
                1),
              (this.ratio = this.devicePixelRatio / this.backingStoreRatio),
              1 === this.ratio
                ? ((this.canvas.width = width * this.ratio),
                  (this.canvas.height = height * this.ratio))
                : ((this.canvas.width = width * this.ratio),
                  (this.canvas.height = height * this.ratio),
                  (this.canvas.style.width = width + "px"),
                  (this.canvas.style.height = height + "px"),
                  this.ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0));
          }
          setTheme(theme) {
            this.colors = theme;
          }
          scale(vertices) {
            let maxX = -_NumberMAX_VALUE,
              maxY = -_NumberMAX_VALUE,
              minX = _NumberMAX_VALUE,
              minY = _NumberMAX_VALUE;
            for (var i = 0; i < vertices.length; i++) {
              if (!vertices[i].value.isDrawn) continue;
              let p = vertices[i].position;
              maxX < p.x && (maxX = p.x),
                maxY < p.y && (maxY = p.y),
                minX > p.x && (minX = p.x),
                minY > p.y && (minY = p.y);
            }
            var padding = this.opts.padding;
            (maxX += padding),
              (maxY += padding),
              (minX -= padding),
              (minY -= padding),
              (this.drawingWidth = maxX - minX),
              (this.drawingHeight = maxY - minY);
            var scaleX = this.canvas.offsetWidth / this.drawingWidth,
              scaleY = this.canvas.offsetHeight / this.drawingHeight,
              scale = scaleX < scaleY ? scaleX : scaleY;
            this.ctx.scale(scale, scale),
              (this.offsetX = -minX),
              (this.offsetY = -minY),
              scaleX < scaleY
                ? (this.offsetY +=
                    this.canvas.offsetHeight / (2 * scale) -
                    this.drawingHeight / 2)
                : (this.offsetX +=
                    this.canvas.offsetWidth / (2 * scale) -
                    this.drawingWidth / 2);
          }
          reset() {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          }
          getColor(key) {
            return (
              (key = key.toUpperCase()),
              key in this.colors ? this.colors[key] : this.colors.C
            );
          }
          drawCircle(
            x,
            y,
            radius,
            color,
            fill = !0,
            debug = !1,
            debugText = ""
          ) {
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY;
            ctx.save(),
              (ctx.lineWidth = 1.5),
              ctx.beginPath(),
              ctx.arc(
                x + offsetX,
                y + offsetY,
                radius,
                0,
                MathHelper.twoPI,
                !0
              ),
              ctx.closePath(),
              debug
                ? (fill
                    ? ((ctx.fillStyle = "#f00"), ctx.fill())
                    : ((ctx.strokeStyle = "#f00"), ctx.stroke()),
                  this.drawDebugText(x, y, debugText))
                : fill
                ? ((ctx.fillStyle = color), ctx.fill())
                : ((ctx.strokeStyle = color), ctx.stroke()),
              ctx.restore();
          }
          drawLine(line, dashed = !1, alpha = 1) {
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY,
              shortLine = line.clone().shorten(4),
              l = shortLine.getLeftVector().clone(),
              r = shortLine.getRightVector().clone();
            (l.x += offsetX),
              (l.y += offsetY),
              (r.x += offsetX),
              (r.y += offsetY),
              dashed ||
                (ctx.save(),
                (ctx.globalCompositeOperation = "destination-out"),
                ctx.beginPath(),
                ctx.moveTo(l.x, l.y),
                ctx.lineTo(r.x, r.y),
                (ctx.lineCap = "round"),
                (ctx.lineWidth = this.opts.bondThickness + 1.2),
                (ctx.strokeStyle = this.themeManager.getColor("BACKGROUND")),
                ctx.stroke(),
                (ctx.globalCompositeOperation = "source-over"),
                ctx.restore()),
              (l = line.getLeftVector().clone()),
              (r = line.getRightVector().clone()),
              (l.x += offsetX),
              (l.y += offsetY),
              (r.x += offsetX),
              (r.y += offsetY),
              ctx.save(),
              ctx.beginPath(),
              ctx.moveTo(l.x, l.y),
              ctx.lineTo(r.x, r.y),
              (ctx.lineCap = "round"),
              (ctx.lineWidth = this.opts.bondThickness);
            let gradient = this.ctx.createLinearGradient(l.x, l.y, r.x, r.y);
            gradient.addColorStop(
              0.4,
              this.themeManager.getColor(line.getLeftElement()) ||
                this.themeManager.getColor("C")
            ),
              gradient.addColorStop(
                0.6,
                this.themeManager.getColor(line.getRightElement()) ||
                  this.themeManager.getColor("C")
              ),
              dashed &&
                (ctx.setLineDash([1, 1.5]),
                (ctx.lineWidth = this.opts.bondThickness / 1.5)),
              1 > alpha && (ctx.globalAlpha = alpha),
              (ctx.strokeStyle = gradient),
              ctx.stroke(),
              ctx.restore();
          }
          drawWedge(line, width = 1) {
            if (
              isNaN(line.from.x) ||
              isNaN(line.from.y) ||
              isNaN(line.to.x) ||
              isNaN(line.to.y)
            )
              return;
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY,
              shortLine = line.clone().shorten(5),
              l = shortLine.getLeftVector().clone(),
              r = shortLine.getRightVector().clone();
            (l.x += offsetX),
              (l.y += offsetY),
              (r.x += offsetX),
              (r.y += offsetY),
              (l = line.getLeftVector().clone()),
              (r = line.getRightVector().clone()),
              (l.x += offsetX),
              (l.y += offsetY),
              (r.x += offsetX),
              (r.y += offsetY),
              ctx.save();
            let normals = Vector2.normals(l, r);
            normals[0].normalize(), normals[1].normalize();
            let isRightChiralCenter = line.getRightChiral(),
              start = l,
              end = r;
            isRightChiralCenter && ((start = r), (end = l));
            let t = Vector2.add(
                start,
                Vector2.multiplyScalar(normals[0], this.halfBondThickness)
              ),
              u = Vector2.add(
                end,
                Vector2.multiplyScalar(normals[0], 1.5 + this.halfBondThickness)
              ),
              v = Vector2.add(
                end,
                Vector2.multiplyScalar(normals[1], 1.5 + this.halfBondThickness)
              ),
              w = Vector2.add(
                start,
                Vector2.multiplyScalar(normals[1], this.halfBondThickness)
              );
            ctx.beginPath(),
              ctx.moveTo(t.x, t.y),
              ctx.lineTo(u.x, u.y),
              ctx.lineTo(v.x, v.y),
              ctx.lineTo(w.x, w.y);
            let gradient = this.ctx.createRadialGradient(
              r.x,
              r.y,
              this.opts.bondLength,
              r.x,
              r.y,
              0
            );
            gradient.addColorStop(
              0.4,
              this.themeManager.getColor(line.getLeftElement()) ||
                this.themeManager.getColor("C")
            ),
              gradient.addColorStop(
                0.6,
                this.themeManager.getColor(line.getRightElement()) ||
                  this.themeManager.getColor("C")
              ),
              (ctx.fillStyle = gradient),
              ctx.fill(),
              ctx.restore();
          }
          drawDashedWedge(line) {
            if (
              isNaN(line.from.x) ||
              isNaN(line.from.y) ||
              isNaN(line.to.x) ||
              isNaN(line.to.y)
            )
              return;
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY,
              l = line.getLeftVector().clone(),
              r = line.getRightVector().clone();
            (l.x += offsetX),
              (l.y += offsetY),
              (r.x += offsetX),
              (r.y += offsetY),
              ctx.save();
            let normals = Vector2.normals(l, r);
            normals[0].normalize(), normals[1].normalize();
            let isRightChiralCenter = line.getRightChiral(),
              shortLine = line.clone(),
              start,
              end,
              sStart,
              sEnd;
            isRightChiralCenter
              ? ((start = r),
                (end = l),
                shortLine.shortenRight(1),
                (sStart = shortLine.getRightVector().clone()),
                (sEnd = shortLine.getLeftVector().clone()))
              : ((start = l),
                (end = r),
                shortLine.shortenLeft(1),
                (sStart = shortLine.getLeftVector().clone()),
                (sEnd = shortLine.getRightVector().clone())),
              (sStart.x += offsetX),
              (sStart.y += offsetY),
              (sEnd.x += offsetX),
              (sEnd.y += offsetY);
            let dir = Vector2.subtract(end, start).normalize();
            (ctx.strokeStyle = this.themeManager.getColor("C")),
              (ctx.lineCap = "round"),
              (ctx.lineWidth = this.opts.bondThickness),
              ctx.beginPath();
            let length = line.getLength(),
              step = 1.25 / (length / (3 * this.opts.bondThickness)),
              changed = !1;
            for (var t = 0; 1 > t; t += step) {
              let to = Vector2.multiplyScalar(dir, t * length),
                startDash = Vector2.add(start, to),
                width = 1.5 * t,
                dashOffset = Vector2.multiplyScalar(normals[0], width);
              !changed &&
                0.5 < t &&
                (ctx.stroke(),
                ctx.beginPath(),
                (ctx.strokeStyle =
                  this.themeManager.getColor(line.getRightElement()) ||
                  this.themeManager.getColor("C")),
                (changed = !0)),
                startDash.subtract(dashOffset),
                ctx.moveTo(startDash.x, startDash.y),
                startDash.add(Vector2.multiplyScalar(dashOffset, 2)),
                ctx.lineTo(startDash.x, startDash.y);
            }
            ctx.stroke(), ctx.restore();
          }
          drawDebugText(x, y, text) {
            let ctx = this.ctx;
            ctx.save(),
              (ctx.font = "5px Droid Sans, sans-serif"),
              (ctx.textAlign = "start"),
              (ctx.textBaseline = "top"),
              (ctx.fillStyle = "#ff0000"),
              ctx.fillText(text, x + this.offsetX, y + this.offsetY),
              ctx.restore();
          }
          drawBall(x, y, elementName) {
            let ctx = this.ctx;
            ctx.save(),
              ctx.beginPath(),
              ctx.arc(
                x + this.offsetX,
                y + this.offsetY,
                this.opts.bondLength / 4.5,
                0,
                MathHelper.twoPI,
                !1
              ),
              (ctx.fillStyle = this.themeManager.getColor(elementName)),
              ctx.fill(),
              ctx.restore();
          }
          drawPoint(x, y, elementName) {
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY;
            ctx.save(),
              (ctx.globalCompositeOperation = "destination-out"),
              ctx.beginPath(),
              ctx.arc(x + offsetX, y + offsetY, 1.5, 0, MathHelper.twoPI, !0),
              ctx.closePath(),
              ctx.fill(),
              (ctx.globalCompositeOperation = "source-over"),
              ctx.beginPath(),
              ctx.arc(
                x + this.offsetX,
                y + this.offsetY,
                0.75,
                0,
                MathHelper.twoPI,
                !1
              ),
              (ctx.fillStyle = this.themeManager.getColor(elementName)),
              ctx.fill(),
              ctx.restore();
          }
          drawText(
            x,
            y,
            elementName,
            hydrogens,
            direction,
            isTerminal,
            charge,
            isotope,
            attachedPseudoElement = {}
          ) {
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY;
            ctx.save(),
              (ctx.textAlign = "start"),
              (ctx.textBaseline = "alphabetic");
            let chargeText = "",
              chargeWidth = 0;
            charge &&
              ((chargeText = getChargeText(charge)),
              (ctx.font = this.fontSmall),
              (chargeWidth = ctx.measureText(chargeText).width));
            let isotopeText = "0",
              isotopeWidth = 0;
            0 < isotope &&
              ((isotopeText = isotope.toString()),
              (ctx.font = this.fontSmall),
              (isotopeWidth = ctx.measureText(isotopeText).width)),
              1 === charge &&
                "N" === elementName &&
                attachedPseudoElement.hasOwnProperty("0O") &&
                attachedPseudoElement.hasOwnProperty("0O-1") &&
                ((attachedPseudoElement = {
                  "0O": {
                    element: "O",
                    count: 2,
                    hydrogenCount: 0,
                    previousElement: "C",
                    charge: "",
                  },
                }),
                (charge = 0)),
              (ctx.font = this.fontLarge),
              (ctx.fillStyle = this.themeManager.getColor("BACKGROUND"));
            let dim = ctx.measureText(elementName);
            (dim.totalWidth = dim.width + chargeWidth),
              (dim.height = parseInt(this.fontLarge, 10));
            let r =
              dim.width > this.opts.fontSizeLarge
                ? dim.width
                : this.opts.fontSizeLarge;
            (r /= 1.5),
              (ctx.globalCompositeOperation = "destination-out"),
              ctx.beginPath(),
              ctx.arc(x + offsetX, y + offsetY, r, 0, MathHelper.twoPI, !0),
              ctx.closePath(),
              ctx.fill(),
              (ctx.globalCompositeOperation = "source-over");
            let cursorPos = -dim.width / 2,
              cursorPosLeft = -dim.width / 2;
            (ctx.fillStyle = this.themeManager.getColor(elementName)),
              ctx.fillText(
                elementName,
                x + offsetX + cursorPos,
                y + this.opts.halfFontSizeLarge + offsetY
              ),
              (cursorPos += dim.width),
              charge &&
                ((ctx.font = this.fontSmall),
                ctx.fillText(
                  chargeText,
                  x + offsetX + cursorPos,
                  y - this.opts.fifthFontSizeSmall + offsetY
                ),
                (cursorPos += chargeWidth)),
              0 < isotope &&
                ((ctx.font = this.fontSmall),
                ctx.fillText(
                  isotopeText,
                  x + offsetX + cursorPosLeft - isotopeWidth,
                  y - this.opts.fifthFontSizeSmall + offsetY
                ),
                (cursorPosLeft -= isotopeWidth)),
              (ctx.font = this.fontLarge);
            let hydrogenWidth = 0,
              hydrogenCountWidth = 0;
            if (1 === hydrogens) {
              let hx = x + offsetX,
                hy = y + offsetY + this.opts.halfFontSizeLarge;
              (hydrogenWidth = this.hydrogenWidth),
                (cursorPosLeft -= hydrogenWidth),
                "left" === direction
                  ? (hx += cursorPosLeft)
                  : "right" === direction
                  ? (hx += cursorPos)
                  : "up" === direction && isTerminal
                  ? (hx += cursorPos)
                  : "down" === direction && isTerminal
                  ? (hx += cursorPos)
                  : "up" !== direction || isTerminal
                  ? "down" === direction &&
                    !isTerminal &&
                    ((hy +=
                      this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge),
                    (hx -= this.halfHydrogenWidth))
                  : ((hy -=
                      this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge),
                    (hx -= this.halfHydrogenWidth)),
                ctx.fillText("H", hx, hy),
                (cursorPos += hydrogenWidth);
            } else if (1 < hydrogens) {
              let hx = x + offsetX,
                hy = y + offsetY + this.opts.halfFontSizeLarge;
              (hydrogenWidth = this.hydrogenWidth),
                (ctx.font = this.fontSmall),
                (hydrogenCountWidth = ctx.measureText(hydrogens).width),
                (cursorPosLeft -= hydrogenWidth + hydrogenCountWidth),
                "left" === direction
                  ? (hx += cursorPosLeft)
                  : "right" === direction
                  ? (hx += cursorPos)
                  : "up" === direction && isTerminal
                  ? (hx += cursorPos)
                  : "down" === direction && isTerminal
                  ? (hx += cursorPos)
                  : "up" !== direction || isTerminal
                  ? "down" === direction &&
                    !isTerminal &&
                    ((hy +=
                      this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge),
                    (hx -= this.halfHydrogenWidth))
                  : ((hy -=
                      this.opts.fontSizeLarge + this.opts.quarterFontSizeLarge),
                    (hx -= this.halfHydrogenWidth)),
                (ctx.font = this.fontLarge),
                ctx.fillText("H", hx, hy),
                (ctx.font = this.fontSmall),
                ctx.fillText(
                  hydrogens,
                  hx + this.halfHydrogenWidth + hydrogenCountWidth,
                  hy + this.opts.fifthFontSizeSmall
                ),
                (cursorPos +=
                  hydrogenWidth + this.halfHydrogenWidth + hydrogenCountWidth);
            }
            for (let key in attachedPseudoElement) {
              if (!attachedPseudoElement.hasOwnProperty(key)) continue;
              let openParenthesisWidth = 0,
                closeParenthesisWidth = 0,
                element = attachedPseudoElement[key].element,
                elementCount = attachedPseudoElement[key].count,
                hydrogenCount = attachedPseudoElement[key].hydrogenCount,
                elementCharge = attachedPseudoElement[key].charge;
              (ctx.font = this.fontLarge),
                1 < elementCount &&
                  0 < hydrogenCount &&
                  ((openParenthesisWidth = ctx.measureText("(").width),
                  (closeParenthesisWidth = ctx.measureText(")").width));
              let elementWidth = ctx.measureText(element).width,
                elementCountWidth = 0,
                elementChargeText = "",
                elementChargeWidth = 0;
              (hydrogenWidth = 0),
                0 < hydrogenCount && (hydrogenWidth = this.hydrogenWidth),
                (ctx.font = this.fontSmall),
                1 < elementCount &&
                  (elementCountWidth = ctx.measureText(elementCount).width),
                0 !== elementCharge &&
                  ((elementChargeText = getChargeText(elementCharge)),
                  (elementChargeWidth =
                    ctx.measureText(elementChargeText).width)),
                (hydrogenCountWidth = 0),
                1 < hydrogenCount &&
                  (hydrogenCountWidth = ctx.measureText(hydrogenCount).width),
                (ctx.font = this.fontLarge);
              let hx = x + offsetX,
                hy = y + offsetY + this.opts.halfFontSizeLarge;
              (ctx.fillStyle = this.themeManager.getColor(element)),
                0 < elementCount && (cursorPosLeft -= elementCountWidth),
                1 < elementCount &&
                  0 < hydrogenCount &&
                  ("left" === direction
                    ? ((cursorPosLeft -= closeParenthesisWidth),
                      ctx.fillText(")", hx + cursorPosLeft, hy))
                    : (ctx.fillText("(", hx + cursorPos, hy),
                      (cursorPos += openParenthesisWidth))),
                "left" === direction
                  ? ((cursorPosLeft -= elementWidth),
                    ctx.fillText(element, hx + cursorPosLeft, hy))
                  : (ctx.fillText(element, hx + cursorPos, hy),
                    (cursorPos += elementWidth)),
                0 < hydrogenCount &&
                  ("left" === direction
                    ? ((cursorPosLeft -= hydrogenWidth + hydrogenCountWidth),
                      ctx.fillText("H", hx + cursorPosLeft, hy),
                      1 < hydrogenCount &&
                        ((ctx.font = this.fontSmall),
                        ctx.fillText(
                          hydrogenCount,
                          hx + cursorPosLeft + hydrogenWidth,
                          hy + this.opts.fifthFontSizeSmall
                        )))
                    : (ctx.fillText("H", hx + cursorPos, hy),
                      (cursorPos += hydrogenWidth),
                      1 < hydrogenCount &&
                        ((ctx.font = this.fontSmall),
                        ctx.fillText(
                          hydrogenCount,
                          hx + cursorPos,
                          hy + this.opts.fifthFontSizeSmall
                        ),
                        (cursorPos += hydrogenCountWidth)))),
                (ctx.font = this.fontLarge),
                1 < elementCount &&
                  0 < hydrogenCount &&
                  ("left" === direction
                    ? ((cursorPosLeft -= openParenthesisWidth),
                      ctx.fillText("(", hx + cursorPosLeft, hy))
                    : (ctx.fillText(")", hx + cursorPos, hy),
                      (cursorPos += closeParenthesisWidth))),
                (ctx.font = this.fontSmall),
                1 < elementCount &&
                  ("left" === direction
                    ? ctx.fillText(
                        elementCount,
                        hx +
                          cursorPosLeft +
                          openParenthesisWidth +
                          closeParenthesisWidth +
                          hydrogenWidth +
                          hydrogenCountWidth +
                          elementWidth,
                        hy + this.opts.fifthFontSizeSmall
                      )
                    : (ctx.fillText(
                        elementCount,
                        hx + cursorPos,
                        hy + this.opts.fifthFontSizeSmall
                      ),
                      (cursorPos += elementCountWidth))),
                0 !== elementCharge &&
                  ("left" === direction
                    ? ctx.fillText(
                        elementChargeText,
                        hx +
                          cursorPosLeft +
                          openParenthesisWidth +
                          closeParenthesisWidth +
                          hydrogenWidth +
                          hydrogenCountWidth +
                          elementWidth,
                        y - this.opts.fifthFontSizeSmall + offsetY
                      )
                    : (ctx.fillText(
                        elementChargeText,
                        hx + cursorPos,
                        y - this.opts.fifthFontSizeSmall + offsetY
                      ),
                      (cursorPos += elementChargeWidth)));
            }
            ctx.restore();
          }
          getChargeText(charge) {
            return 1 === charge
              ? "+"
              : 2 === charge
              ? "2+"
              : -1 === charge
              ? "-"
              : -2 === charge
              ? "2-"
              : "";
          }
          drawDebugPoint(x, y, debugText = "", color = "#f00") {
            this.drawCircle(x, y, 2, color, !0, !0, debugText);
          }
          drawAromaticityRing(ring) {
            let ctx = this.ctx,
              radius = MathHelper.apothemFromSideLength(
                this.opts.bondLength,
                ring.getSize()
              );
            ctx.save(),
              (ctx.strokeStyle = this.themeManager.getColor("C")),
              (ctx.lineWidth = this.opts.bondThickness),
              ctx.beginPath(),
              ctx.arc(
                ring.center.x + this.offsetX,
                ring.center.y + this.offsetY,
                radius - this.opts.bondSpacing,
                0,
                2 * Math.PI,
                !0
              ),
              ctx.closePath(),
              ctx.stroke(),
              ctx.restore();
          }
          clear() {
            this.ctx.clearRect(
              0,
              0,
              this.canvas.offsetWidth,
              this.canvas.offsetHeight
            );
          }
        };
      },
      {
        "./Line": 8,
        "./MathHelper": 9,
        "./Ring": 11,
        "./UtilityFunctions": 17,
        "./Vector2": 18,
        "./Vertex": 19,
      },
    ],
    5: [
      function (require, module) {
        "use strict";
        var _Mathsin = Math.sin,
          _Mathcos = Math.cos,
          _Mathabs = Math.abs,
          _Mathsqrt = Math.sqrt,
          _MathPI = Math.PI,
          _Mathmin3 = Math.min,
          _Mathmax2 = Math.max;
        const MathHelper = require("./MathHelper"),
          ArrayHelper = require("./ArrayHelper"),
          Vector2 = require("./Vector2"),
          Line = require("./Line"),
          Vertex = require("./Vertex"),
          Edge = require("./Edge"),
          Atom = require("./Atom"),
          Ring = require("./Ring"),
          RingConnection = require("./RingConnection"),
          CanvasWrapper = require("./CanvasWrapper"),
          Graph = require("./Graph"),
          SSSR = require("./SSSR"),
          ThemeManager = require("./ThemeManager");
        module.exports = class {
          constructor(options) {
            (this.graph = null),
              (this.doubleBondConfigCount = 0),
              (this.doubleBondConfig = null),
              (this.ringIdCounter = 0),
              (this.ringConnectionIdCounter = 0),
              (this.canvasWrapper = null),
              (this.totalOverlapScore = 0),
              (this.defaultOptions = {
                width: 500,
                height: 500,
                bondThickness: 0.6,
                bondLength: 15,
                shortBondLength: 0.85,
                bondSpacing: 15 * 0.18,
                atomVisualization: "default",
                isomeric: !0,
                debug: !1,
                terminalCarbons: !1,
                explicitHydrogens: !0,
                overlapSensitivity: 0.42,
                overlapResolutionIterations: 1,
                compactDrawing: !0,
                fontSizeLarge: 5,
                fontSizeSmall: 3,
                padding: 20,
                experimentalSSSR: !1,
                kkThreshold: 0.1,
                kkInnerThreshold: 0.1,
                kkMaxIteration: 2e4,
                kkMaxInnerIteration: 50,
                kkMaxEnergy: 1e9,
                themes: {
                  dark: {
                    C: "#fff",
                    O: "#e74c3c",
                    N: "#3498db",
                    F: "#27ae60",
                    CL: "#16a085",
                    BR: "#d35400",
                    I: "#8e44ad",
                    P: "#d35400",
                    S: "#f1c40f",
                    B: "#e67e22",
                    SI: "#e67e22",
                    H: "#fff",
                    BACKGROUND: "#141414",
                  },
                  light: {
                    C: "#222",
                    O: "#e74c3c",
                    N: "#3498db",
                    F: "#27ae60",
                    CL: "#16a085",
                    BR: "#d35400",
                    I: "#8e44ad",
                    P: "#d35400",
                    S: "#f1c40f",
                    B: "#e67e22",
                    SI: "#e67e22",
                    H: "#222",
                    BACKGROUND: "#fff",
                  },
                },
              }),
              (this.opts = this.extend(!0, this.defaultOptions, options)),
              (this.opts.halfBondSpacing = this.opts.bondSpacing / 2),
              (this.opts.bondLengthSq =
                this.opts.bondLength * this.opts.bondLength),
              (this.opts.halfFontSizeLarge = this.opts.fontSizeLarge / 2),
              (this.opts.quarterFontSizeLarge = this.opts.fontSizeLarge / 4),
              (this.opts.fifthFontSizeSmall = this.opts.fontSizeSmall / 5),
              (this.theme = this.opts.themes.dark);
          }
          extend() {
            let that = this,
              extended = {},
              deep = !1,
              i = 0,
              length = arguments.length;
            "[object Boolean]" ===
              Object.prototype.toString.call(arguments[0]) &&
              ((deep = arguments[0]), i++);
            for (
              let merge = function (obj) {
                for (var prop in obj)
                  Object.prototype.hasOwnProperty.call(obj, prop) &&
                    (extended[prop] =
                      deep &&
                      "[object Object]" ===
                        Object.prototype.toString.call(obj[prop])
                        ? that.extend(!0, extended[prop], obj[prop])
                        : obj[prop]);
              };
              i < length;
              i++
            ) {
              let obj = arguments[i];
              merge(obj);
            }
            return extended;
          }
          draw(data, target, themeName = "light", infoOnly = !1) {
            this.initDraw(data, themeName, infoOnly),
              this.infoOnly ||
                ((this.themeManager = new ThemeManager(
                  this.opts.themes,
                  themeName
                )),
                (this.canvasWrapper = new CanvasWrapper(
                  target,
                  this.themeManager,
                  this.opts
                ))),
              infoOnly ||
                (this.processGraph(),
                this.canvasWrapper.scale(this.graph.vertices),
                this.drawEdges(this.opts.debug),
                this.drawVertices(this.opts.debug),
                this.canvasWrapper.reset(),
                this.opts.debug &&
                  (console.log(this.graph),
                  console.log(this.rings),
                  console.log(this.ringConnections)));
          }
          edgeRingCount(edgeId) {
            let edge = this.graph.edges[edgeId],
              a = this.graph.vertices[edge.sourceId],
              b = this.graph.vertices[edge.targetId];
            return _Mathmin3(a.value.rings.length, b.value.rings.length);
          }
          getBridgedRings() {
            let bridgedRings = [];
            for (var i = 0; i < this.rings.length; i++)
              this.rings[i].isBridged && bridgedRings.push(this.rings[i]);
            return bridgedRings;
          }
          getFusedRings() {
            let fusedRings = [];
            for (var i = 0; i < this.rings.length; i++)
              this.rings[i].isFused && fusedRings.push(this.rings[i]);
            return fusedRings;
          }
          getSpiros() {
            let spiros = [];
            for (var i = 0; i < this.rings.length; i++)
              this.rings[i].isSpiro && spiros.push(this.rings[i]);
            return spiros;
          }
          printRingInfo() {
            let result = "";
            for (var i = 0; i < this.rings.length; i++) {
              const ring = this.rings[i];
              (result += ring.id + ";"),
                (result += ring.members.length + ";"),
                (result += ring.neighbours.length + ";"),
                (result += ring.isSpiro ? "true;" : "false;"),
                (result += ring.isFused ? "true;" : "false;"),
                (result += ring.isBridged ? "true;" : "false;"),
                (result += ring.rings.length + ";"),
                (result += "\n");
            }
            return result;
          }
          rotateDrawing() {
            let a = 0,
              b = 0,
              maxDist = 0;
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let vertexA = this.graph.vertices[i];
              if (vertexA.value.isDrawn)
                for (var j = i + 1; j < this.graph.vertices.length; j++) {
                  let vertexB = this.graph.vertices[j];
                  if (!vertexB.value.isDrawn) continue;
                  let dist = vertexA.position.distanceSq(vertexB.position);
                  dist > maxDist && ((maxDist = dist), (a = i), (b = j));
                }
            }
            let angle = -Vector2.subtract(
              this.graph.vertices[a].position,
              this.graph.vertices[b].position
            ).angle();
            if (!isNaN(angle)) {
              let remainder = angle % 0.523599;
              0.2617995 > remainder
                ? (angle -= remainder)
                : (angle += 0.523599 - remainder);
              for (var i = 0; i < this.graph.vertices.length; i++)
                i !== b &&
                  this.graph.vertices[i].position.rotateAround(
                    angle,
                    this.graph.vertices[b].position
                  );
              for (var i = 0; i < this.rings.length; i++)
                this.rings[i].center.rotateAround(
                  angle,
                  this.graph.vertices[b].position
                );
            }
          }
          getTotalOverlapScore() {
            return this.totalOverlapScore;
          }
          getRingCount() {
            return this.rings.length;
          }
          hasBridgedRing() {
            return this.bridgedRing;
          }
          getHeavyAtomCount() {
            let hac = 0;
            for (var i = 0; i < this.graph.vertices.length; i++)
              "H" !== this.graph.vertices[i].value.element && hac++;
            return hac;
          }
          getMolecularFormula() {
            let molecularFormula = "",
              counts = new Map();
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let atom = this.graph.vertices[i].value;
              if (
                (counts.has(atom.element)
                  ? counts.set(atom.element, counts.get(atom.element) + 1)
                  : counts.set(atom.element, 1),
                atom.bracket &&
                  !atom.bracket.chirality &&
                  (counts.has("H")
                    ? counts.set("H", counts.get("H") + atom.bracket.hcount)
                    : counts.set("H", atom.bracket.hcount)),
                !atom.bracket)
              ) {
                let nHydrogens = Atom.maxBonds[atom.element] - atom.bondCount;
                atom.isPartOfAromaticRing && nHydrogens--,
                  counts.has("H")
                    ? counts.set("H", counts.get("H") + nHydrogens)
                    : counts.set("H", nHydrogens);
              }
            }
            if (counts.has("C")) {
              let count = counts.get("C");
              (molecularFormula += "C" + (1 < count ? count : "")),
                counts.delete("C");
            }
            if (counts.has("H")) {
              let count = counts.get("H");
              (molecularFormula += "H" + (1 < count ? count : "")),
                counts.delete("H");
            }
            let elements = Object.keys(Atom.atomicNumbers).sort();
            return (
              elements.map((e) => {
                if (counts.has(e)) {
                  let count = counts.get(e);
                  molecularFormula += e + (1 < count ? count : "");
                }
              }),
              molecularFormula
            );
          }
          getRingbondType(vertexA, vertexB) {
            if (
              1 > vertexA.value.getRingbondCount() ||
              1 > vertexB.value.getRingbondCount()
            )
              return null;
            for (var i = 0; i < vertexA.value.ringbonds.length; i++)
              for (var j = 0; j < vertexB.value.ringbonds.length; j++)
                if (
                  vertexA.value.ringbonds[i].id ===
                  vertexB.value.ringbonds[j].id
                )
                  return "-" === vertexA.value.ringbonds[i].bondType
                    ? vertexB.value.ringbonds[j].bond
                    : vertexA.value.ringbonds[i].bond;
            return null;
          }
          initDraw(data, themeName, infoOnly) {
            (this.data = data),
              (this.infoOnly = infoOnly),
              (this.ringIdCounter = 0),
              (this.ringConnectionIdCounter = 0),
              (this.graph = new Graph(data, this.opts.isomeric)),
              (this.rings = []),
              (this.ringConnections = []),
              (this.originalRings = []),
              (this.originalRingConnections = []),
              (this.bridgedRing = !1),
              (this.doubleBondConfigCount = null),
              (this.doubleBondConfig = null),
              this.initRings(),
              this.initHydrogens();
          }
          processGraph() {
            this.position(),
              this.restoreRingInformation(),
              this.resolvePrimaryOverlaps();
            let overlapScore = this.getOverlapScore();
            this.totalOverlapScore = this.getOverlapScore().total;
            for (var o = 0; o < this.opts.overlapResolutionIterations; o++)
              for (var i = 0; i < this.graph.edges.length; i++) {
                let edge = this.graph.edges[i];
                if (this.isEdgeRotatable(edge)) {
                  let subTreeDepthA = this.graph.getTreeDepth(
                      edge.sourceId,
                      edge.targetId
                    ),
                    subTreeDepthB = this.graph.getTreeDepth(
                      edge.targetId,
                      edge.sourceId
                    ),
                    a = edge.targetId,
                    b = edge.sourceId;
                  subTreeDepthA > subTreeDepthB &&
                    ((a = edge.sourceId), (b = edge.targetId));
                  let subTreeOverlap = this.getSubtreeOverlapScore(
                    b,
                    a,
                    overlapScore.vertexScores
                  );
                  if (subTreeOverlap.value > this.opts.overlapSensitivity) {
                    let vertexA = this.graph.vertices[a],
                      vertexB = this.graph.vertices[b],
                      neighboursB = vertexB.getNeighbours(a);
                    if (1 === neighboursB.length) {
                      let neighbour = this.graph.vertices[neighboursB[0]],
                        angle = neighbour.position.getRotateAwayFromAngle(
                          vertexA.position,
                          vertexB.position,
                          MathHelper.toRad(120)
                        );
                      this.rotateSubtree(
                        neighbour.id,
                        vertexB.id,
                        angle,
                        vertexB.position
                      );
                      let newTotalOverlapScore = this.getOverlapScore().total;
                      newTotalOverlapScore > this.totalOverlapScore
                        ? this.rotateSubtree(
                            neighbour.id,
                            vertexB.id,
                            -angle,
                            vertexB.position
                          )
                        : (this.totalOverlapScore = newTotalOverlapScore);
                    } else if (2 === neighboursB.length) {
                      if (
                        0 !== vertexB.value.rings.length &&
                        0 !== vertexA.value.rings.length
                      )
                        continue;
                      let neighbourA = this.graph.vertices[neighboursB[0]],
                        neighbourB = this.graph.vertices[neighboursB[1]];
                      if (
                        1 === neighbourA.value.rings.length &&
                        1 === neighbourB.value.rings.length
                      ) {
                        if (
                          neighbourA.value.rings[0] !==
                          neighbourB.value.rings[0]
                        )
                          continue;
                      } else if (
                        0 !== neighbourA.value.rings.length ||
                        0 !== neighbourB.value.rings.length
                      )
                        continue;
                      else {
                        let angleA = neighbourA.position.getRotateAwayFromAngle(
                            vertexA.position,
                            vertexB.position,
                            MathHelper.toRad(120)
                          ),
                          angleB = neighbourB.position.getRotateAwayFromAngle(
                            vertexA.position,
                            vertexB.position,
                            MathHelper.toRad(120)
                          );
                        this.rotateSubtree(
                          neighbourA.id,
                          vertexB.id,
                          angleA,
                          vertexB.position
                        ),
                          this.rotateSubtree(
                            neighbourB.id,
                            vertexB.id,
                            angleB,
                            vertexB.position
                          );
                        let newTotalOverlapScore = this.getOverlapScore().total;
                        newTotalOverlapScore > this.totalOverlapScore
                          ? (this.rotateSubtree(
                              neighbourA.id,
                              vertexB.id,
                              -angleA,
                              vertexB.position
                            ),
                            this.rotateSubtree(
                              neighbourB.id,
                              vertexB.id,
                              -angleB,
                              vertexB.position
                            ))
                          : (this.totalOverlapScore = newTotalOverlapScore);
                      }
                    }
                    overlapScore = this.getOverlapScore();
                  }
                }
              }
            this.resolveSecondaryOverlaps(overlapScore.scores),
              this.opts.isomeric && this.annotateStereochemistry(),
              this.opts.compactDrawing &&
                "default" === this.opts.atomVisualization &&
                this.initPseudoElements(),
              this.rotateDrawing();
          }
          initRings() {
            let openBonds = new Map();
            for (var i = this.graph.vertices.length - 1; 0 <= i; i--) {
              let vertex = this.graph.vertices[i];
              if (0 !== vertex.value.ringbonds.length)
                for (var j = 0; j < vertex.value.ringbonds.length; j++) {
                  let ringbondId = vertex.value.ringbonds[j].id,
                    ringbondBond = vertex.value.ringbonds[j].bond;
                  if (!openBonds.has(ringbondId))
                    openBonds.set(ringbondId, [vertex.id, ringbondBond]);
                  else {
                    let sourceVertexId = vertex.id,
                      targetVertexId = openBonds.get(ringbondId)[0],
                      targetRingbondBond = openBonds.get(ringbondId)[1],
                      edge = new Edge(sourceVertexId, targetVertexId, 1);
                    edge.setBondType(targetRingbondBond || ringbondBond || "-");
                    let edgeId = this.graph.addEdge(edge),
                      targetVertex = this.graph.vertices[targetVertexId];
                    vertex.addRingbondChild(targetVertexId, j),
                      vertex.value.addNeighbouringElement(
                        targetVertex.value.element
                      ),
                      targetVertex.addRingbondChild(sourceVertexId, j),
                      targetVertex.value.addNeighbouringElement(
                        vertex.value.element
                      ),
                      vertex.edges.push(edgeId),
                      targetVertex.edges.push(edgeId),
                      openBonds.delete(ringbondId);
                  }
                }
            }
            let rings = SSSR.getRings(this.graph, this.opts.experimentalSSSR);
            if (null !== rings) {
              for (var i = 0; i < rings.length; i++) {
                let ringVertices = [...rings[i]],
                  ringId = this.addRing(new Ring(ringVertices));
                for (var j = 0; j < ringVertices.length; j++)
                  this.graph.vertices[ringVertices[j]].value.rings.push(ringId);
              }
              for (var i = 0; i < this.rings.length - 1; i++)
                for (var j = i + 1; j < this.rings.length; j++) {
                  let a = this.rings[i],
                    b = this.rings[j],
                    ringConnection = new RingConnection(a, b);
                  0 < ringConnection.vertices.size &&
                    this.addRingConnection(ringConnection);
                }
              for (var i = 0; i < this.rings.length; i++) {
                let ring = this.rings[i];
                ring.neighbours = RingConnection.getNeighbours(
                  this.ringConnections,
                  ring.id
                );
              }
              for (var i = 0; i < this.rings.length; i++) {
                let ring = this.rings[i];
                this.graph.vertices[ring.members[0]].value.addAnchoredRing(
                  ring.id
                );
              }
              for (this.backupRingInformation(); 0 < this.rings.length; ) {
                let id = -1;
                for (var i = 0; i < this.rings.length; i++) {
                  let ring = this.rings[i];
                  this.isPartOfBridgedRing(ring.id) &&
                    !ring.isBridged &&
                    (id = ring.id);
                }
                if (-1 === id) break;
                let ring = this.getRing(id),
                  involvedRings = this.getBridgedRingRings(ring.id);
                (this.bridgedRing = !0),
                  this.createBridgedRing(involvedRings, ring.members[0]);
                for (var i = 0; i < involvedRings.length; i++)
                  this.removeRing(involvedRings[i]);
              }
            }
          }
          initHydrogens() {
            if (!this.opts.explicitHydrogens)
              for (var i = 0; i < this.graph.vertices.length; i++) {
                let vertex = this.graph.vertices[i];
                if ("H" !== vertex.value.element) continue;
                let neighbour = this.graph.vertices[vertex.neighbours[0]];
                (neighbour.value.hasHydrogen = !0),
                  (!neighbour.value.isStereoCenter ||
                    (2 > neighbour.value.rings.length &&
                      !neighbour.value.bridgedRing) ||
                    (neighbour.value.bridgedRing &&
                      2 > neighbour.value.originalRings.length)) &&
                    (vertex.value.isDrawn = !1);
              }
          }
          getBridgedRingRings(ringId) {
            let involvedRings = [],
              that = this,
              recurse = function (r) {
                let ring = that.getRing(r);
                involvedRings.push(r);
                for (var i = 0; i < ring.neighbours.length; i++) {
                  let n = ring.neighbours[i];
                  -1 === involvedRings.indexOf(n) &&
                    n !== r &&
                    RingConnection.isBridge(
                      that.ringConnections,
                      that.graph.vertices,
                      r,
                      n
                    ) &&
                    recurse(n);
                }
              };
            return recurse(ringId), ArrayHelper.unique(involvedRings);
          }
          isPartOfBridgedRing(ringId) {
            for (var i = 0; i < this.ringConnections.length; i++)
              if (
                this.ringConnections[i].containsRing(ringId) &&
                this.ringConnections[i].isBridge(this.graph.vertices)
              )
                return !0;
            return !1;
          }
          createBridgedRing(ringIds, sourceVertexId) {
            let ringMembers = new Set(),
              vertices = new Set(),
              neighbours = new Set();
            for (var i = 0; i < ringIds.length; i++) {
              let ring = this.getRing(ringIds[i]);
              ring.isPartOfBridged = !0;
              for (var j = 0; j < ring.members.length; j++)
                vertices.add(ring.members[j]);
              for (var j = 0; j < ring.neighbours.length; j++) {
                let id = ring.neighbours[j];
                -1 === ringIds.indexOf(id) &&
                  neighbours.add(ring.neighbours[j]);
              }
            }
            let leftovers = new Set();
            for (let id of vertices) {
              let vertex = this.graph.vertices[id],
                intersection = ArrayHelper.intersection(
                  ringIds,
                  vertex.value.rings
                );
              1 === vertex.value.rings.length || 1 === intersection.length
                ? ringMembers.add(vertex.id)
                : leftovers.add(vertex.id);
            }
            let insideRing = [];
            for (let id of leftovers) {
              let vertex = this.graph.vertices[id],
                onRing = !1;
              for (let j = 0; j < vertex.edges.length; j++)
                1 === this.edgeRingCount(vertex.edges[j]) && (onRing = !0);
              onRing
                ? ((vertex.value.isBridgeNode = !0), ringMembers.add(vertex.id))
                : ((vertex.value.isBridge = !0), ringMembers.add(vertex.id));
            }
            let ring = new Ring([...ringMembers]);
            this.addRing(ring),
              (ring.isBridged = !0),
              (ring.neighbours = [...neighbours]);
            for (var i = 0; i < ringIds.length; i++)
              ring.rings.push(this.getRing(ringIds[i]).clone());
            for (var i = 0; i < ring.members.length; i++)
              this.graph.vertices[ring.members[i]].value.bridgedRing = ring.id;
            for (var i = 0; i < insideRing.length; i++) {
              let vertex = this.graph.vertices[insideRing[i]];
              vertex.value.rings = [];
            }
            for (let id of ringMembers) {
              let vertex = this.graph.vertices[id];
              (vertex.value.rings = ArrayHelper.removeAll(
                vertex.value.rings,
                ringIds
              )),
                vertex.value.rings.push(ring.id);
            }
            for (var i = 0; i < ringIds.length; i++)
              for (var j = i + 1; j < ringIds.length; j++)
                this.removeRingConnectionsBetween(ringIds[i], ringIds[j]);
            for (let id of neighbours) {
              let connections = this.getRingConnections(id, ringIds);
              for (var j = 0; j < connections.length; j++)
                this.getRingConnection(connections[j]).updateOther(ring.id, id);
              this.getRing(id).neighbours.push(ring.id);
            }
            return ring;
          }
          areVerticesInSameRing(vertexA, vertexB) {
            for (var i = 0; i < vertexA.value.rings.length; i++)
              for (var j = 0; j < vertexB.value.rings.length; j++)
                if (vertexA.value.rings[i] === vertexB.value.rings[j])
                  return !0;
            return !1;
          }
          getCommonRings(vertexA, vertexB) {
            let commonRings = [];
            for (var i = 0; i < vertexA.value.rings.length; i++)
              for (var j = 0; j < vertexB.value.rings.length; j++)
                vertexA.value.rings[i] == vertexB.value.rings[j] &&
                  commonRings.push(vertexA.value.rings[i]);
            return commonRings;
          }
          getLargestOrAromaticCommonRing(vertexA, vertexB) {
            let commonRings = this.getCommonRings(vertexA, vertexB),
              maxSize = 0,
              largestCommonRing = null;
            for (var i = 0; i < commonRings.length; i++) {
              let ring = this.getRing(commonRings[i]),
                size = ring.getSize();
              if (ring.isBenzeneLike(this.graph.vertices)) return ring;
              size > maxSize && ((maxSize = size), (largestCommonRing = ring));
            }
            return largestCommonRing;
          }
          getVerticesAt(position, radius, excludeVertexId) {
            let locals = [];
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let vertex = this.graph.vertices[i];
              if (vertex.id === excludeVertexId || !vertex.positioned) continue;
              let distance = position.distanceSq(vertex.position);
              distance <= radius * radius && locals.push(vertex.id);
            }
            return locals;
          }
          getClosestVertex(vertex) {
            let minDist = 99999,
              minVertex = null;
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let v = this.graph.vertices[i];
              if (v.id === vertex.id) continue;
              let distSq = vertex.position.distanceSq(v.position);
              distSq < minDist && ((minDist = distSq), (minVertex = v));
            }
            return minVertex;
          }
          addRing(ring) {
            return (
              (ring.id = this.ringIdCounter++), this.rings.push(ring), ring.id
            );
          }
          removeRing(ringId) {
            (this.rings = this.rings.filter(function (item) {
              return item.id !== ringId;
            })),
              (this.ringConnections = this.ringConnections.filter(function (
                item
              ) {
                return (
                  item.firstRingId !== ringId && item.secondRingId !== ringId
                );
              }));
            for (var i = 0; i < this.rings.length; i++) {
              let r = this.rings[i];
              r.neighbours = r.neighbours.filter(function (item) {
                return item !== ringId;
              });
            }
          }
          getRing(ringId) {
            for (var i = 0; i < this.rings.length; i++)
              if (this.rings[i].id == ringId) return this.rings[i];
          }
          addRingConnection(ringConnection) {
            return (
              (ringConnection.id = this.ringConnectionIdCounter++),
              this.ringConnections.push(ringConnection),
              ringConnection.id
            );
          }
          removeRingConnection(ringConnectionId) {
            this.ringConnections = this.ringConnections.filter(function (item) {
              return item.id !== ringConnectionId;
            });
          }
          removeRingConnectionsBetween(vertexIdA, vertexIdB) {
            let toRemove = [];
            for (var i = 0; i < this.ringConnections.length; i++) {
              let ringConnection = this.ringConnections[i];
              ((ringConnection.firstRingId === vertexIdA &&
                ringConnection.secondRingId === vertexIdB) ||
                (ringConnection.firstRingId === vertexIdB &&
                  ringConnection.secondRingId === vertexIdA)) &&
                toRemove.push(ringConnection.id);
            }
            for (var i = 0; i < toRemove.length; i++)
              this.removeRingConnection(toRemove[i]);
          }
          getRingConnection(id) {
            for (var i = 0; i < this.ringConnections.length; i++)
              if (this.ringConnections[i].id == id)
                return this.ringConnections[i];
          }
          getRingConnections(ringId, ringIds) {
            let ringConnections = [];
            for (var i = 0; i < this.ringConnections.length; i++) {
              let rc = this.ringConnections[i];
              for (var j = 0; j < ringIds.length; j++) {
                let id = ringIds[j];
                ((rc.firstRingId === ringId && rc.secondRingId === id) ||
                  (rc.firstRingId === id && rc.secondRingId === ringId)) &&
                  ringConnections.push(rc.id);
              }
            }
            return ringConnections;
          }
          getOverlapScore() {
            let total = 0,
              overlapScores = new Float32Array(this.graph.vertices.length);
            for (var i = 0; i < this.graph.vertices.length; i++)
              overlapScores[i] = 0;
            for (var i = 0, j; i < this.graph.vertices.length; i++)
              for (j = this.graph.vertices.length; --j > i; ) {
                let a = this.graph.vertices[i],
                  b = this.graph.vertices[j];
                if (!a.value.isDrawn || !b.value.isDrawn) continue;
                let dist = Vector2.subtract(a.position, b.position).lengthSq();
                if (dist < this.opts.bondLengthSq) {
                  let weighted =
                    (this.opts.bondLength - _Mathsqrt(dist)) /
                    this.opts.bondLength;
                  (total += weighted),
                    (overlapScores[i] += weighted),
                    (overlapScores[j] += weighted);
                }
              }
            let sortable = [];
            for (var i = 0; i < this.graph.vertices.length; i++)
              sortable.push({ id: i, score: overlapScores[i] });
            return (
              sortable.sort(function (a, b) {
                return b.score - a.score;
              }),
              { total: total, scores: sortable, vertexScores: overlapScores }
            );
          }
          chooseSide(vertexA, vertexB, sides) {
            let an = vertexA.getNeighbours(vertexB.id),
              bn = vertexB.getNeighbours(vertexA.id),
              anCount = an.length,
              bnCount = bn.length,
              tn = ArrayHelper.merge(an, bn),
              sideCount = [0, 0];
            for (var i = 0; i < tn.length; i++) {
              let v = this.graph.vertices[tn[i]].position;
              v.sameSideAs(vertexA.position, vertexB.position, sides[0])
                ? sideCount[0]++
                : sideCount[1]++;
            }
            let totalSideCount = [0, 0];
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let v = this.graph.vertices[i].position;
              v.sameSideAs(vertexA.position, vertexB.position, sides[0])
                ? totalSideCount[0]++
                : totalSideCount[1]++;
            }
            return {
              totalSideCount: totalSideCount,
              totalPosition: totalSideCount[0] > totalSideCount[1] ? 0 : 1,
              sideCount: sideCount,
              position: sideCount[0] > sideCount[1] ? 0 : 1,
              anCount: anCount,
              bnCount: bnCount,
            };
          }
          setRingCenter(ring) {
            let ringSize = ring.getSize(),
              total = new Vector2(0, 0);
            for (var i = 0; i < ringSize; i++)
              total.add(this.graph.vertices[ring.members[i]].position);
            ring.center = total.divide(ringSize);
          }
          getSubringCenter(ring, vertex) {
            let rings = vertex.value.originalRings,
              center = ring.center,
              smallest = Number.MAX_VALUE;
            for (var i = 0; i < rings.length; i++)
              for (var j = 0; j < ring.rings.length; j++)
                rings[i] === ring.rings[j].id &&
                  ring.rings[j].getSize() < smallest &&
                  ((center = ring.rings[j].center),
                  (smallest = ring.rings[j].getSize()));
            return center;
          }
          drawEdges(debug) {
            let that = this,
              drawn = Array(this.graph.edges.length);
            if (
              (drawn.fill(!1),
              this.graph.traverseBF(0, function (vertex) {
                let edges = that.graph.getEdges(vertex.id);
                for (var i = 0; i < edges.length; i++) {
                  let edgeId = edges[i];
                  drawn[edgeId] ||
                    ((drawn[edgeId] = !0), that.drawEdge(edgeId, debug));
                }
              }),
              !this.bridgedRing)
            )
              for (var i = 0; i < this.rings.length; i++) {
                let ring = this.rings[i];
                this.isRingAromatic(ring) &&
                  this.canvasWrapper.drawAromaticityRing(ring);
              }
          }
          drawEdge(edgeId, debug) {
            let that = this,
              edge = this.graph.edges[edgeId],
              vertexA = this.graph.vertices[edge.sourceId],
              vertexB = this.graph.vertices[edge.targetId],
              elementA = vertexA.value.element,
              elementB = vertexB.value.element;
            if (
              (!vertexA.value.isDrawn || !vertexB.value.isDrawn) &&
              "default" === this.opts.atomVisualization
            )
              return;
            let a = vertexA.position,
              b = vertexB.position,
              normals = this.getEdgeNormals(edge),
              sides = ArrayHelper.clone(normals);
            if (
              (sides[0].multiplyScalar(10).add(a),
              sides[1].multiplyScalar(10).add(a),
              "=" === edge.bondType ||
                "=" === this.getRingbondType(vertexA, vertexB) ||
                (edge.isPartOfAromaticRing && this.bridgedRing))
            ) {
              let inRing = this.areVerticesInSameRing(vertexA, vertexB),
                s = this.chooseSide(vertexA, vertexB, sides);
              if (inRing) {
                let lcr = this.getLargestOrAromaticCommonRing(vertexA, vertexB),
                  center = lcr.center;
                normals[0].multiplyScalar(that.opts.bondSpacing),
                  normals[1].multiplyScalar(that.opts.bondSpacing);
                let line = null;
                (line = center.sameSideAs(
                  vertexA.position,
                  vertexB.position,
                  Vector2.add(a, normals[0])
                )
                  ? new Line(
                      Vector2.add(a, normals[0]),
                      Vector2.add(b, normals[0]),
                      elementA,
                      elementB
                    )
                  : new Line(
                      Vector2.add(a, normals[1]),
                      Vector2.add(b, normals[1]),
                      elementA,
                      elementB
                    )),
                  line.shorten(
                    this.opts.bondLength -
                      this.opts.shortBondLength * this.opts.bondLength
                  ),
                  edge.isPartOfAromaticRing
                    ? this.canvasWrapper.drawLine(line, !0)
                    : this.canvasWrapper.drawLine(line),
                  this.canvasWrapper.drawLine(
                    new Line(a, b, elementA, elementB)
                  );
              } else if (
                edge.center ||
                (vertexA.isTerminal() && vertexB.isTerminal())
              ) {
                normals[0].multiplyScalar(that.opts.halfBondSpacing),
                  normals[1].multiplyScalar(that.opts.halfBondSpacing);
                let lineA = new Line(
                    Vector2.add(a, normals[0]),
                    Vector2.add(b, normals[0]),
                    elementA,
                    elementB
                  ),
                  lineB = new Line(
                    Vector2.add(a, normals[1]),
                    Vector2.add(b, normals[1]),
                    elementA,
                    elementB
                  );
                this.canvasWrapper.drawLine(lineA),
                  this.canvasWrapper.drawLine(lineB);
              } else if (
                (0 == s.anCount && 1 < s.bnCount) ||
                (0 == s.bnCount && 1 < s.anCount)
              ) {
                normals[0].multiplyScalar(that.opts.halfBondSpacing),
                  normals[1].multiplyScalar(that.opts.halfBondSpacing);
                let lineA = new Line(
                    Vector2.add(a, normals[0]),
                    Vector2.add(b, normals[0]),
                    elementA,
                    elementB
                  ),
                  lineB = new Line(
                    Vector2.add(a, normals[1]),
                    Vector2.add(b, normals[1]),
                    elementA,
                    elementB
                  );
                this.canvasWrapper.drawLine(lineA),
                  this.canvasWrapper.drawLine(lineB);
              } else if (s.sideCount[0] > s.sideCount[1]) {
                normals[0].multiplyScalar(that.opts.bondSpacing),
                  normals[1].multiplyScalar(that.opts.bondSpacing);
                let line = new Line(
                  Vector2.add(a, normals[0]),
                  Vector2.add(b, normals[0]),
                  elementA,
                  elementB
                );
                line.shorten(
                  this.opts.bondLength -
                    this.opts.shortBondLength * this.opts.bondLength
                ),
                  this.canvasWrapper.drawLine(line),
                  this.canvasWrapper.drawLine(
                    new Line(a, b, elementA, elementB)
                  );
              } else if (s.sideCount[0] < s.sideCount[1]) {
                normals[0].multiplyScalar(that.opts.bondSpacing),
                  normals[1].multiplyScalar(that.opts.bondSpacing);
                let line = new Line(
                  Vector2.add(a, normals[1]),
                  Vector2.add(b, normals[1]),
                  elementA,
                  elementB
                );
                line.shorten(
                  this.opts.bondLength -
                    this.opts.shortBondLength * this.opts.bondLength
                ),
                  this.canvasWrapper.drawLine(line),
                  this.canvasWrapper.drawLine(
                    new Line(a, b, elementA, elementB)
                  );
              } else if (s.totalSideCount[0] > s.totalSideCount[1]) {
                normals[0].multiplyScalar(that.opts.bondSpacing),
                  normals[1].multiplyScalar(that.opts.bondSpacing);
                let line = new Line(
                  Vector2.add(a, normals[0]),
                  Vector2.add(b, normals[0]),
                  elementA,
                  elementB
                );
                line.shorten(
                  this.opts.bondLength -
                    this.opts.shortBondLength * this.opts.bondLength
                ),
                  this.canvasWrapper.drawLine(line),
                  this.canvasWrapper.drawLine(
                    new Line(a, b, elementA, elementB)
                  );
              } else if (s.totalSideCount[0] <= s.totalSideCount[1]) {
                normals[0].multiplyScalar(that.opts.bondSpacing),
                  normals[1].multiplyScalar(that.opts.bondSpacing);
                let line = new Line(
                  Vector2.add(a, normals[1]),
                  Vector2.add(b, normals[1]),
                  elementA,
                  elementB
                );
                line.shorten(
                  this.opts.bondLength -
                    this.opts.shortBondLength * this.opts.bondLength
                ),
                  this.canvasWrapper.drawLine(line),
                  this.canvasWrapper.drawLine(
                    new Line(a, b, elementA, elementB)
                  );
              } else;
            } else if ("#" === edge.bondType) {
              normals[0].multiplyScalar(that.opts.bondSpacing / 1.5),
                normals[1].multiplyScalar(that.opts.bondSpacing / 1.5);
              let lineA = new Line(
                  Vector2.add(a, normals[0]),
                  Vector2.add(b, normals[0]),
                  elementA,
                  elementB
                ),
                lineB = new Line(
                  Vector2.add(a, normals[1]),
                  Vector2.add(b, normals[1]),
                  elementA,
                  elementB
                );
              this.canvasWrapper.drawLine(lineA),
                this.canvasWrapper.drawLine(lineB),
                this.canvasWrapper.drawLine(new Line(a, b, elementA, elementB));
            } else if ("." === edge.bondType);
            else {
              let isChiralCenterA = vertexA.value.isStereoCenter,
                isChiralCenterB = vertexB.value.isStereoCenter;
              "up" === edge.wedge
                ? this.canvasWrapper.drawWedge(
                    new Line(
                      a,
                      b,
                      elementA,
                      elementB,
                      isChiralCenterA,
                      isChiralCenterB
                    )
                  )
                : "down" === edge.wedge
                ? this.canvasWrapper.drawDashedWedge(
                    new Line(
                      a,
                      b,
                      elementA,
                      elementB,
                      isChiralCenterA,
                      isChiralCenterB
                    )
                  )
                : this.canvasWrapper.drawLine(
                    new Line(
                      a,
                      b,
                      elementA,
                      elementB,
                      isChiralCenterA,
                      isChiralCenterB
                    )
                  );
            }
            if (debug) {
              let midpoint = Vector2.midpoint(a, b);
              this.canvasWrapper.drawDebugText(
                midpoint.x,
                midpoint.y,
                "e: " + edgeId
              );
            }
          }
          drawVertices(debug) {
            for (
              var i = this.graph.vertices.length, i = 0;
              i < this.graph.vertices.length;
              i++
            ) {
              let vertex = this.graph.vertices[i],
                atom = vertex.value,
                charge = 0,
                isotope = 0,
                bondCount = vertex.value.bondCount,
                element = atom.element,
                hydrogens = Atom.maxBonds[element] - bondCount,
                dir = vertex.getTextDirection(this.graph.vertices),
                isTerminal =
                  !!(
                    this.opts.terminalCarbons ||
                    "C" !== element ||
                    atom.hasAttachedPseudoElements
                  ) && vertex.isTerminal(),
                isCarbon = "C" === atom.element;
              if (
                ("N" === atom.element &&
                  atom.isPartOfAromaticRing &&
                  (hydrogens = 0),
                atom.bracket &&
                  ((hydrogens = atom.bracket.hcount),
                  (charge = atom.bracket.charge),
                  (isotope = atom.bracket.isotope)),
                "allballs" === this.opts.atomVisualization)
              )
                this.canvasWrapper.drawBall(
                  vertex.position.x,
                  vertex.position.y,
                  element
                );
              else if (
                (atom.isDrawn &&
                  (!isCarbon ||
                    atom.drawExplicit ||
                    isTerminal ||
                    atom.hasAttachedPseudoElements)) ||
                1 === this.graph.vertices.length
              )
                "default" === this.opts.atomVisualization
                  ? this.canvasWrapper.drawText(
                      vertex.position.x,
                      vertex.position.y,
                      element,
                      hydrogens,
                      dir,
                      isTerminal,
                      charge,
                      isotope,
                      atom.getAttachedPseudoElements()
                    )
                  : "balls" === this.opts.atomVisualization &&
                    this.canvasWrapper.drawBall(
                      vertex.position.x,
                      vertex.position.y,
                      element
                    );
              else if (
                2 === vertex.getNeighbourCount() &&
                !0 == vertex.forcePositioned
              ) {
                let a = this.graph.vertices[vertex.neighbours[0]].position,
                  b = this.graph.vertices[vertex.neighbours[1]].position,
                  angle = Vector2.threePointangle(vertex.position, a, b);
                0.1 > _Mathabs(_MathPI - angle) &&
                  this.canvasWrapper.drawPoint(
                    vertex.position.x,
                    vertex.position.y,
                    element
                  );
              }
              if (debug) {
                let value =
                  "v: " + vertex.id + " " + ArrayHelper.print(atom.ringbonds);
                this.canvasWrapper.drawDebugText(
                  vertex.position.x,
                  vertex.position.y,
                  value
                );
              } else;
            }
            if (this.opts.debug)
              for (var i = 0; i < this.rings.length; i++) {
                let center = this.rings[i].center;
                this.canvasWrapper.drawDebugPoint(
                  center.x,
                  center.y,
                  "r: " + this.rings[i].id
                );
              }
          }
          position() {
            let startVertex = null;
            for (var i = 0; i < this.graph.vertices.length; i++)
              if (null !== this.graph.vertices[i].value.bridgedRing) {
                startVertex = this.graph.vertices[i];
                break;
              }
            for (var i = 0; i < this.rings.length; i++)
              this.rings[i].isBridged &&
                (startVertex = this.graph.vertices[this.rings[i].members[0]]);
            0 < this.rings.length &&
              null === startVertex &&
              (startVertex = this.graph.vertices[this.rings[0].members[0]]),
              null === startVertex && (startVertex = this.graph.vertices[0]),
              this.createNextBond(startVertex, null, 0);
          }
          backupRingInformation() {
            (this.originalRings = []), (this.originalRingConnections = []);
            for (var i = 0; i < this.rings.length; i++)
              this.originalRings.push(this.rings[i]);
            for (var i = 0; i < this.ringConnections.length; i++)
              this.originalRingConnections.push(this.ringConnections[i]);
            for (var i = 0; i < this.graph.vertices.length; i++)
              this.graph.vertices[i].value.backupRings();
          }
          restoreRingInformation() {
            let bridgedRings = this.getBridgedRings();
            (this.rings = []), (this.ringConnections = []);
            for (var i = 0; i < bridgedRings.length; i++) {
              let bridgedRing = bridgedRings[i];
              for (var j = 0; j < bridgedRing.rings.length; j++) {
                let ring = bridgedRing.rings[j];
                this.originalRings[ring.id].center = ring.center;
              }
            }
            for (var i = 0; i < this.originalRings.length; i++)
              this.rings.push(this.originalRings[i]);
            for (var i = 0; i < this.originalRingConnections.length; i++)
              this.ringConnections.push(this.originalRingConnections[i]);
            for (var i = 0; i < this.graph.vertices.length; i++)
              this.graph.vertices[i].value.restoreRings();
          }
          createRing(
            ring,
            center = null,
            startVertex = null,
            previousVertex = null
          ) {
            if (ring.positioned) return;
            center = center ? center : new Vector2(0, 0);
            let orderedNeighbours = ring.getOrderedNeighbours(
                this.ringConnections
              ),
              startingAngle = startVertex
                ? Vector2.subtract(startVertex.position, center).angle()
                : 0,
              radius = MathHelper.polyCircumradius(
                this.opts.bondLength,
                ring.getSize()
              ),
              angle = MathHelper.centralAngle(ring.getSize());
            ring.centralAngle = angle;
            let a = startingAngle,
              that = this,
              startVertexId = startVertex ? startVertex.id : null;
            if (
              (-1 === ring.members.indexOf(startVertexId) &&
                (startVertex && (startVertex.positioned = !1),
                (startVertexId = ring.members[0])),
              ring.isBridged)
            ) {
              this.graph.kkLayout(
                ring.members.slice(),
                center,
                startVertex.id,
                ring,
                this.opts.bondLength,
                this.opts.kkThreshold,
                this.opts.kkInnerThreshold,
                this.opts.kkMaxIteration,
                this.opts.kkMaxInnerIteration,
                this.opts.kkMaxEnergy
              ),
                (ring.positioned = !0),
                this.setRingCenter(ring),
                (center = ring.center);
              for (var i = 0; i < ring.rings.length; i++)
                this.setRingCenter(ring.rings[i]);
            } else
              ring.eachMember(
                this.graph.vertices,
                function (v) {
                  let vertex = that.graph.vertices[v];
                  vertex.positioned ||
                    vertex.setPosition(
                      center.x + _Mathcos(a) * radius,
                      center.y + _Mathsin(a) * radius
                    ),
                    (a += angle),
                    (!ring.isBridged || 3 > ring.rings.length) &&
                      ((vertex.angle = a), (vertex.positioned = !0));
                },
                startVertexId,
                previousVertex ? previousVertex.id : null
              );
            (ring.positioned = !0), (ring.center = center);
            for (var i = 0; i < orderedNeighbours.length; i++) {
              let neighbour = this.getRing(orderedNeighbours[i].neighbour);
              if (neighbour.positioned) continue;
              let vertices = RingConnection.getVertices(
                this.ringConnections,
                ring.id,
                neighbour.id
              );
              if (2 === vertices.length) {
                (ring.isFused = !0), (neighbour.isFused = !0);
                let vertexA = this.graph.vertices[vertices[0]],
                  vertexB = this.graph.vertices[vertices[1]],
                  midpoint = Vector2.midpoint(
                    vertexA.position,
                    vertexB.position
                  ),
                  normals = Vector2.normals(vertexA.position, vertexB.position);
                normals[0].normalize(), normals[1].normalize();
                let r = MathHelper.polyCircumradius(
                    this.opts.bondLength,
                    neighbour.getSize()
                  ),
                  apothem = MathHelper.apothem(r, neighbour.getSize());
                normals[0].multiplyScalar(apothem).add(midpoint),
                  normals[1].multiplyScalar(apothem).add(midpoint);
                let nextCenter = normals[0];
                Vector2.subtract(center, normals[1]).lengthSq() >
                  Vector2.subtract(center, normals[0]).lengthSq() &&
                  (nextCenter = normals[1]);
                let posA = Vector2.subtract(vertexA.position, nextCenter),
                  posB = Vector2.subtract(vertexB.position, nextCenter);
                -1 === posA.clockwise(posB)
                  ? !neighbour.positioned &&
                    this.createRing(neighbour, nextCenter, vertexA, vertexB)
                  : !neighbour.positioned &&
                    this.createRing(neighbour, nextCenter, vertexB, vertexA);
              } else if (1 === vertices.length) {
                (ring.isSpiro = !0), (neighbour.isSpiro = !0);
                let vertexA = this.graph.vertices[vertices[0]],
                  nextCenter = Vector2.subtract(center, vertexA.position);
                nextCenter.invert(), nextCenter.normalize();
                let r = MathHelper.polyCircumradius(
                  this.opts.bondLength,
                  neighbour.getSize()
                );
                nextCenter.multiplyScalar(r),
                  nextCenter.add(vertexA.position),
                  neighbour.positioned ||
                    this.createRing(neighbour, nextCenter, vertexA);
              }
            }
            for (var i = 0; i < ring.members.length; i++) {
              let ringMember = this.graph.vertices[ring.members[i]],
                ringMemberNeighbours = ringMember.neighbours;
              for (var j = 0; j < ringMemberNeighbours.length; j++) {
                let v = this.graph.vertices[ringMemberNeighbours[j]];
                v.positioned ||
                  ((v.value.isConnectedToRing = !0),
                  this.createNextBond(v, ringMember, 0));
              }
            }
          }
          rotateSubtree(vertexId, parentVertexId, angle, center) {
            let that = this;
            this.graph.traverseTree(
              vertexId,
              parentVertexId,
              function (vertex) {
                vertex.position.rotateAround(angle, center);
                for (var i = 0; i < vertex.value.anchoredRings.length; i++) {
                  let ring = that.rings[vertex.value.anchoredRings[i]];
                  ring && ring.center.rotateAround(angle, center);
                }
              }
            );
          }
          getSubtreeOverlapScore(
            vertexId,
            parentVertexId,
            vertexOverlapScores
          ) {
            let that = this,
              score = 0,
              center = new Vector2(0, 0),
              count = 0;
            return (
              this.graph.traverseTree(
                vertexId,
                parentVertexId,
                function (vertex) {
                  if (vertex.value.isDrawn) {
                    let s = vertexOverlapScores[vertex.id];
                    s > that.opts.overlapSensitivity && ((score += s), count++);
                    let position =
                      that.graph.vertices[vertex.id].position.clone();
                    position.multiplyScalar(s), center.add(position);
                  }
                }
              ),
              center.divide(score),
              { value: score / count, center: center }
            );
          }
          getCurrentCenterOfMass() {
            let total = new Vector2(0, 0),
              count = 0;
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let vertex = this.graph.vertices[i];
              vertex.positioned && (total.add(vertex.position), count++);
            }
            return total.divide(count);
          }
          getCurrentCenterOfMassInNeigbourhood(
            vec,
            r = 2 * this.opts.bondLength
          ) {
            let total = new Vector2(0, 0),
              count = 0;
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let vertex = this.graph.vertices[i];
              vertex.positioned &&
                vec.distanceSq(vertex.position) < r * r &&
                (total.add(vertex.position), count++);
            }
            return total.divide(count);
          }
          resolvePrimaryOverlaps() {
            let overlaps = [],
              done = Array(this.graph.vertices.length);
            for (var i = 0; i < this.rings.length; i++) {
              let ring = this.rings[i];
              for (var j = 0; j < ring.members.length; j++) {
                let vertex = this.graph.vertices[ring.members[j]];
                if (done[vertex.id]) continue;
                done[vertex.id] = !0;
                let nonRingNeighbours = this.getNonRingNeighbours(vertex.id);
                if (1 < nonRingNeighbours.length) {
                  let rings = [];
                  for (var k = 0; k < vertex.value.rings.length; k++)
                    rings.push(vertex.value.rings[k]);
                  overlaps.push({
                    common: vertex,
                    rings: rings,
                    vertices: nonRingNeighbours,
                  });
                } else if (
                  1 === nonRingNeighbours.length &&
                  2 === vertex.value.rings.length
                ) {
                  let rings = [];
                  for (var k = 0; k < vertex.value.rings.length; k++)
                    rings.push(vertex.value.rings[k]);
                  overlaps.push({
                    common: vertex,
                    rings: rings,
                    vertices: nonRingNeighbours,
                  });
                }
              }
            }
            for (var i = 0; i < overlaps.length; i++) {
              let overlap = overlaps[i];
              if (2 === overlap.vertices.length) {
                let a = overlap.vertices[0],
                  b = overlap.vertices[1];
                if (!a.value.isDrawn || !b.value.isDrawn) continue;
                let angle =
                  (2 * _MathPI - this.getRing(overlap.rings[0]).getAngle()) / 6;
                this.rotateSubtree(
                  a.id,
                  overlap.common.id,
                  angle,
                  overlap.common.position
                ),
                  this.rotateSubtree(
                    b.id,
                    overlap.common.id,
                    -angle,
                    overlap.common.position
                  );
                let overlapScore = this.getOverlapScore(),
                  subTreeOverlapA = this.getSubtreeOverlapScore(
                    a.id,
                    overlap.common.id,
                    overlapScore.vertexScores
                  ),
                  subTreeOverlapB = this.getSubtreeOverlapScore(
                    b.id,
                    overlap.common.id,
                    overlapScore.vertexScores
                  ),
                  total = subTreeOverlapA.value + subTreeOverlapB.value;
                this.rotateSubtree(
                  a.id,
                  overlap.common.id,
                  -2 * angle,
                  overlap.common.position
                ),
                  this.rotateSubtree(
                    b.id,
                    overlap.common.id,
                    2 * angle,
                    overlap.common.position
                  ),
                  (overlapScore = this.getOverlapScore()),
                  (subTreeOverlapA = this.getSubtreeOverlapScore(
                    a.id,
                    overlap.common.id,
                    overlapScore.vertexScores
                  )),
                  (subTreeOverlapB = this.getSubtreeOverlapScore(
                    b.id,
                    overlap.common.id,
                    overlapScore.vertexScores
                  )),
                  subTreeOverlapA.value + subTreeOverlapB.value > total &&
                    (this.rotateSubtree(
                      a.id,
                      overlap.common.id,
                      2 * angle,
                      overlap.common.position
                    ),
                    this.rotateSubtree(
                      b.id,
                      overlap.common.id,
                      -2 * angle,
                      overlap.common.position
                    ));
              } else
                1 !== overlap.vertices.length || 2 !== overlap.rings.length;
            }
          }
          resolveSecondaryOverlaps(scores) {
            for (var i = 0; i < scores.length; i++)
              if (scores[i].score > this.opts.overlapSensitivity) {
                let vertex = this.graph.vertices[scores[i].id];
                if (vertex.isTerminal()) {
                  let closest = this.getClosestVertex(vertex);
                  if (closest) {
                    let closestPosition = null;
                    closestPosition = closest.isTerminal()
                      ? 0 === closest.id
                        ? this.graph.vertices[1].position
                        : closest.previousPosition
                      : 0 === closest.id
                      ? this.graph.vertices[1].position
                      : closest.position;
                    let vertexPreviousPosition =
                      0 === vertex.id
                        ? this.graph.vertices[1].position
                        : vertex.previousPosition;
                    vertex.position.rotateAwayFrom(
                      closestPosition,
                      vertexPreviousPosition,
                      MathHelper.toRad(20)
                    );
                  }
                }
              }
          }
          getLastVertexWithAngle(vertexId) {
            let angle = 0,
              vertex = null;
            for (; !angle && vertexId; )
              (vertex = this.graph.vertices[vertexId]),
                (angle = vertex.angle),
                (vertexId = vertex.parentVertexId);
            return vertex;
          }
          createNextBond(
            vertex,
            previousVertex = null,
            angle = 0,
            originShortest = !1,
            skipPositioning = !1
          ) {
            if (vertex.positioned && !skipPositioning) return;
            let doubleBondConfigSet = !1;
            if (previousVertex) {
              let edge = this.graph.getEdge(vertex.id, previousVertex.id);
              ("/" === edge.bondType || "\\" === edge.bondType) &&
                1 == ++this.doubleBondConfigCount % 2 &&
                null === this.doubleBondConfig &&
                ((this.doubleBondConfig = edge.bondType),
                (doubleBondConfigSet = !0),
                null === previousVertex.parentVertexId &&
                  vertex.value.branchBond &&
                  ("/" === this.doubleBondConfig
                    ? (this.doubleBondConfig = "\\")
                    : "\\" === this.doubleBondConfig &&
                      (this.doubleBondConfig = "/")));
            }
            if (!skipPositioning)
              if (!previousVertex) {
                let dummy = new Vector2(this.opts.bondLength, 0);
                dummy.rotate(MathHelper.toRad(-60)),
                  (vertex.previousPosition = dummy),
                  vertex.setPosition(this.opts.bondLength, 0),
                  (vertex.angle = MathHelper.toRad(-60)),
                  null === vertex.value.bridgedRing && (vertex.positioned = !0);
              } else if (0 < previousVertex.value.rings.length) {
                let neighbours = previousVertex.neighbours,
                  joinedVertex = null,
                  pos = new Vector2(0, 0);
                if (
                  null === previousVertex.value.bridgedRing &&
                  1 < previousVertex.value.rings.length
                )
                  for (var i = 0; i < neighbours.length; i++) {
                    let neighbour = this.graph.vertices[neighbours[i]];
                    if (
                      ArrayHelper.containsAll(
                        neighbour.value.rings,
                        previousVertex.value.rings
                      )
                    ) {
                      joinedVertex = neighbour;
                      break;
                    }
                  }
                if (null === joinedVertex) {
                  for (var i = 0; i < neighbours.length; i++) {
                    let v = this.graph.vertices[neighbours[i]];
                    v.positioned &&
                      this.areVerticesInSameRing(v, previousVertex) &&
                      pos.add(
                        Vector2.subtract(v.position, previousVertex.position)
                      );
                  }
                  pos
                    .invert()
                    .normalize()
                    .multiplyScalar(this.opts.bondLength)
                    .add(previousVertex.position);
                } else
                  pos = joinedVertex.position
                    .clone()
                    .rotateAround(Math.PI, previousVertex.position);
                (vertex.previousPosition = previousVertex.position),
                  vertex.setPositionFromVector(pos),
                  (vertex.positioned = !0);
              } else {
                let v = new Vector2(this.opts.bondLength, 0);
                v.rotate(angle),
                  v.add(previousVertex.position),
                  vertex.setPositionFromVector(v),
                  (vertex.previousPosition = previousVertex.position),
                  (vertex.positioned = !0);
              }
            if (null !== vertex.value.bridgedRing) {
              let nextRing = this.getRing(vertex.value.bridgedRing);
              if (!nextRing.positioned) {
                let nextCenter = Vector2.subtract(
                  vertex.previousPosition,
                  vertex.position
                );
                nextCenter.invert(), nextCenter.normalize();
                let r = MathHelper.polyCircumradius(
                  this.opts.bondLength,
                  nextRing.members.length
                );
                nextCenter.multiplyScalar(r),
                  nextCenter.add(vertex.position),
                  this.createRing(nextRing, nextCenter, vertex);
              }
            } else if (0 < vertex.value.rings.length) {
              let nextRing = this.getRing(vertex.value.rings[0]);
              if (!nextRing.positioned) {
                let nextCenter = Vector2.subtract(
                  vertex.previousPosition,
                  vertex.position
                );
                nextCenter.invert(), nextCenter.normalize();
                let r = MathHelper.polyCircumradius(
                  this.opts.bondLength,
                  nextRing.getSize()
                );
                nextCenter.multiplyScalar(r),
                  nextCenter.add(vertex.position),
                  this.createRing(nextRing, nextCenter, vertex);
              }
            } else {
              let isStereoCenter = vertex.value.isStereoCenter,
                tmpNeighbours = vertex.getNeighbours(),
                neighbours = [];
              for (var i = 0; i < tmpNeighbours.length; i++)
                this.graph.vertices[tmpNeighbours[i]].value.isDrawn &&
                  neighbours.push(tmpNeighbours[i]);
              previousVertex &&
                (neighbours = ArrayHelper.remove(
                  neighbours,
                  previousVertex.id
                ));
              let previousAngle = vertex.getAngle();
              if (1 === neighbours.length) {
                let nextVertex = this.graph.vertices[neighbours[0]];
                if (
                  "#" === vertex.value.bondType ||
                  (previousVertex && "#" === previousVertex.value.bondType) ||
                  ("=" === vertex.value.bondType &&
                    previousVertex &&
                    0 === previousVertex.value.rings.length &&
                    "=" === previousVertex.value.bondType &&
                    "-" !== vertex.value.branchBond)
                ) {
                  if (((vertex.value.drawExplicit = !1), previousVertex)) {
                    let straightEdge1 = this.graph.getEdge(
                      vertex.id,
                      previousVertex.id
                    );
                    straightEdge1.center = !0;
                  }
                  let straightEdge2 = this.graph.getEdge(
                    vertex.id,
                    nextVertex.id
                  );
                  (straightEdge2.center = !0),
                    ("#" === vertex.value.bondType ||
                      (previousVertex &&
                        "#" === previousVertex.value.bondType)) &&
                      (nextVertex.angle = 0),
                    (nextVertex.drawExplicit = !0),
                    this.createNextBond(
                      nextVertex,
                      vertex,
                      previousAngle + nextVertex.angle
                    );
                } else if (
                  previousVertex &&
                  0 < previousVertex.value.rings.length
                ) {
                  let proposedAngleA = MathHelper.toRad(60),
                    proposedAngleB = -proposedAngleA,
                    proposedVectorA = new Vector2(this.opts.bondLength, 0),
                    proposedVectorB = new Vector2(this.opts.bondLength, 0);
                  proposedVectorA.rotate(proposedAngleA).add(vertex.position),
                    proposedVectorB.rotate(proposedAngleB).add(vertex.position);
                  let centerOfMass = this.getCurrentCenterOfMass(),
                    distanceA = proposedVectorA.distanceSq(centerOfMass),
                    distanceB = proposedVectorB.distanceSq(centerOfMass);
                  (nextVertex.angle =
                    distanceA < distanceB ? proposedAngleB : proposedAngleA),
                    this.createNextBond(
                      nextVertex,
                      vertex,
                      previousAngle + nextVertex.angle
                    );
                } else {
                  let a = vertex.angle;
                  if (previousVertex && 3 < previousVertex.neighbours.length)
                    a =
                      0 < a
                        ? _Mathmin3(1.0472, a)
                        : 0 > a
                        ? _Mathmax2(-1.0472, a)
                        : 1.0472;
                  else if (!a) {
                    let v = this.getLastVertexWithAngle(vertex.id);
                    (a = v.angle), a || (a = 1.0472);
                  }
                  if (previousVertex && !doubleBondConfigSet) {
                    let bondType = this.graph.getEdge(
                      vertex.id,
                      nextVertex.id
                    ).bondType;
                    "/" === bondType
                      ? ("/" === this.doubleBondConfig ||
                          ("\\" === this.doubleBondConfig && (a = -a)),
                        (this.doubleBondConfig = null))
                      : "\\" === bondType &&
                        ("/" === this.doubleBondConfig
                          ? (a = -a)
                          : "\\" === this.doubleBondConfig,
                        (this.doubleBondConfig = null));
                  }
                  (nextVertex.angle = originShortest ? a : -a),
                    this.createNextBond(
                      nextVertex,
                      vertex,
                      previousAngle + nextVertex.angle
                    );
                }
              } else if (2 === neighbours.length) {
                let a = vertex.angle;
                a || (a = 1.0472);
                let subTreeDepthA = this.graph.getTreeDepth(
                    neighbours[0],
                    vertex.id
                  ),
                  subTreeDepthB = this.graph.getTreeDepth(
                    neighbours[1],
                    vertex.id
                  ),
                  l = this.graph.vertices[neighbours[0]],
                  r = this.graph.vertices[neighbours[1]];
                (l.value.subtreeDepth = subTreeDepthA),
                  (r.value.subtreeDepth = subTreeDepthB);
                let subTreeDepthC = this.graph.getTreeDepth(
                  previousVertex ? previousVertex.id : null,
                  vertex.id
                );
                previousVertex &&
                  (previousVertex.value.subtreeDepth = subTreeDepthC);
                let cis = 0,
                  trans = 1;
                "C" === r.value.element &&
                "C" !== l.value.element &&
                1 < subTreeDepthB &&
                5 > subTreeDepthA
                  ? ((cis = 1), (trans = 0))
                  : "C" !== r.value.element &&
                    "C" === l.value.element &&
                    1 < subTreeDepthA &&
                    5 > subTreeDepthB
                  ? ((cis = 0), (trans = 1))
                  : subTreeDepthB > subTreeDepthA && ((cis = 1), (trans = 0));
                let cisVertex = this.graph.vertices[neighbours[cis]],
                  transVertex = this.graph.vertices[neighbours[trans]],
                  edgeCis = this.graph.getEdge(vertex.id, cisVertex.id),
                  edgeTrans = this.graph.getEdge(vertex.id, transVertex.id),
                  originShortest = !1;
                subTreeDepthC < subTreeDepthA &&
                  subTreeDepthC < subTreeDepthB &&
                  (originShortest = !0),
                  (transVertex.angle = a),
                  (cisVertex.angle = -a),
                  "\\" === this.doubleBondConfig
                    ? "\\" === transVertex.value.branchBond &&
                      ((transVertex.angle = -a), (cisVertex.angle = a))
                    : "/" === this.doubleBondConfig &&
                      "/" === transVertex.value.branchBond &&
                      ((transVertex.angle = -a), (cisVertex.angle = a)),
                  this.createNextBond(
                    transVertex,
                    vertex,
                    previousAngle + transVertex.angle,
                    originShortest
                  ),
                  this.createNextBond(
                    cisVertex,
                    vertex,
                    previousAngle + cisVertex.angle,
                    originShortest
                  );
              } else if (3 === neighbours.length) {
                let d1 = this.graph.getTreeDepth(neighbours[0], vertex.id),
                  d2 = this.graph.getTreeDepth(neighbours[1], vertex.id),
                  d3 = this.graph.getTreeDepth(neighbours[2], vertex.id),
                  s = this.graph.vertices[neighbours[0]],
                  l = this.graph.vertices[neighbours[1]],
                  r = this.graph.vertices[neighbours[2]];
                (s.value.subtreeDepth = d1),
                  (l.value.subtreeDepth = d2),
                  (r.value.subtreeDepth = d3),
                  d2 > d1 && d2 > d3
                    ? ((s = this.graph.vertices[neighbours[1]]),
                      (l = this.graph.vertices[neighbours[0]]),
                      (r = this.graph.vertices[neighbours[2]]))
                    : d3 > d1 &&
                      d3 > d2 &&
                      ((s = this.graph.vertices[neighbours[2]]),
                      (l = this.graph.vertices[neighbours[0]]),
                      (r = this.graph.vertices[neighbours[1]])),
                  previousVertex &&
                  1 > previousVertex.value.rings.length &&
                  1 > s.value.rings.length &&
                  1 > l.value.rings.length &&
                  1 > r.value.rings.length &&
                  1 === this.graph.getTreeDepth(l.id, vertex.id) &&
                  1 === this.graph.getTreeDepth(r.id, vertex.id) &&
                  1 < this.graph.getTreeDepth(s.id, vertex.id)
                    ? ((s.angle = -vertex.angle),
                      0 <= vertex.angle
                        ? ((l.angle = MathHelper.toRad(30)),
                          (r.angle = MathHelper.toRad(90)))
                        : ((l.angle = -MathHelper.toRad(30)),
                          (r.angle = -MathHelper.toRad(90))),
                      this.createNextBond(s, vertex, previousAngle + s.angle),
                      this.createNextBond(l, vertex, previousAngle + l.angle),
                      this.createNextBond(r, vertex, previousAngle + r.angle))
                    : ((s.angle = 0),
                      (l.angle = MathHelper.toRad(90)),
                      (r.angle = -MathHelper.toRad(90)),
                      this.createNextBond(s, vertex, previousAngle + s.angle),
                      this.createNextBond(l, vertex, previousAngle + l.angle),
                      this.createNextBond(r, vertex, previousAngle + r.angle));
              } else if (4 === neighbours.length) {
                let d1 = this.graph.getTreeDepth(neighbours[0], vertex.id),
                  d2 = this.graph.getTreeDepth(neighbours[1], vertex.id),
                  d3 = this.graph.getTreeDepth(neighbours[2], vertex.id),
                  d4 = this.graph.getTreeDepth(neighbours[3], vertex.id),
                  w = this.graph.vertices[neighbours[0]],
                  x = this.graph.vertices[neighbours[1]],
                  y = this.graph.vertices[neighbours[2]],
                  z = this.graph.vertices[neighbours[3]];
                (w.value.subtreeDepth = d1),
                  (x.value.subtreeDepth = d2),
                  (y.value.subtreeDepth = d3),
                  (z.value.subtreeDepth = d4),
                  d2 > d1 && d2 > d3 && d2 > d4
                    ? ((w = this.graph.vertices[neighbours[1]]),
                      (x = this.graph.vertices[neighbours[0]]),
                      (y = this.graph.vertices[neighbours[2]]),
                      (z = this.graph.vertices[neighbours[3]]))
                    : d3 > d1 && d3 > d2 && d3 > d4
                    ? ((w = this.graph.vertices[neighbours[2]]),
                      (x = this.graph.vertices[neighbours[0]]),
                      (y = this.graph.vertices[neighbours[1]]),
                      (z = this.graph.vertices[neighbours[3]]))
                    : d4 > d1 &&
                      d4 > d2 &&
                      d4 > d3 &&
                      ((w = this.graph.vertices[neighbours[3]]),
                      (x = this.graph.vertices[neighbours[0]]),
                      (y = this.graph.vertices[neighbours[1]]),
                      (z = this.graph.vertices[neighbours[2]])),
                  (w.angle = -MathHelper.toRad(36)),
                  (x.angle = MathHelper.toRad(36)),
                  (y.angle = -MathHelper.toRad(108)),
                  (z.angle = MathHelper.toRad(108)),
                  this.createNextBond(w, vertex, previousAngle + w.angle),
                  this.createNextBond(x, vertex, previousAngle + x.angle),
                  this.createNextBond(y, vertex, previousAngle + y.angle),
                  this.createNextBond(z, vertex, previousAngle + z.angle);
              }
            }
          }
          getCommonRingbondNeighbour(vertex) {
            let neighbours = vertex.neighbours;
            for (var i = 0; i < neighbours.length; i++) {
              let neighbour = this.graph.vertices[neighbours[i]];
              if (
                ArrayHelper.containsAll(
                  neighbour.value.rings,
                  vertex.value.rings
                )
              )
                return neighbour;
            }
            return null;
          }
          isPointInRing(vec) {
            for (var i = 0; i < this.rings.length; i++) {
              let ring = this.rings[i];
              if (!ring.positioned) continue;
              let radius = MathHelper.polyCircumradius(
                this.opts.bondLength,
                ring.getSize()
              );
              if (vec.distanceSq(ring.center) < radius * radius) return !0;
            }
            return !1;
          }
          isEdgeInRing(edge) {
            let source = this.graph.vertices[edge.sourceId],
              target = this.graph.vertices[edge.targetId];
            return this.areVerticesInSameRing(source, target);
          }
          isEdgeRotatable(edge) {
            let vertexA = this.graph.vertices[edge.sourceId],
              vertexB = this.graph.vertices[edge.targetId];
            return (
              !("-" !== edge.bondType) &&
              !(vertexA.isTerminal() || vertexB.isTerminal()) &&
              !(
                0 < vertexA.value.rings.length &&
                0 < vertexB.value.rings.length &&
                this.areVerticesInSameRing(vertexA, vertexB)
              )
            );
          }
          isRingAromatic(ring) {
            for (var i = 0; i < ring.members.length; i++) {
              let vertex = this.graph.vertices[ring.members[i]];
              if (!vertex.value.isPartOfAromaticRing) return !1;
            }
            return !0;
          }
          getEdgeNormals(edge) {
            let v1 = this.graph.vertices[edge.sourceId].position,
              v2 = this.graph.vertices[edge.targetId].position,
              normals = Vector2.units(v1, v2);
            return normals;
          }
          getNonRingNeighbours(vertexId) {
            let nrneighbours = [],
              vertex = this.graph.vertices[vertexId],
              neighbours = vertex.neighbours;
            for (var i = 0; i < neighbours.length; i++) {
              let neighbour = this.graph.vertices[neighbours[i]],
                nIntersections = ArrayHelper.intersection(
                  vertex.value.rings,
                  neighbour.value.rings
                ).length;
              0 === nIntersections &&
                !1 == neighbour.value.isBridge &&
                nrneighbours.push(neighbour);
            }
            return nrneighbours;
          }
          annotateStereochemistry() {
            for (var i = 0; i < this.graph.vertices.length; i++) {
              let vertex = this.graph.vertices[i];
              if (!vertex.value.isStereoCenter) continue;
              let neighbours = vertex.getNeighbours(),
                nNeighbours = neighbours.length,
                priorities = Array(nNeighbours);
              for (var j = 0; j < nNeighbours; j++) {
                let visited = new Uint8Array(this.graph.vertices.length),
                  priority = [[]];
                (visited[vertex.id] = 1),
                  this.visitStereochemistry(
                    neighbours[j],
                    vertex.id,
                    visited,
                    priority,
                    10,
                    0
                  );
                for (var k = 0; k < priority.length; k++)
                  priority[k].sort(function (a, b) {
                    return b - a;
                  });
                priorities[j] = [j, priority];
              }
              let maxLevels = 0,
                maxEntries = 0;
              for (var j = 0; j < priorities.length; j++) {
                priorities[j][1].length > maxLevels &&
                  (maxLevels = priorities[j][1].length);
                for (var k = 0; k < priorities[j][1].length; k++)
                  priorities[j][1][k].length > maxEntries &&
                    (maxEntries = priorities[j][1][k].length);
              }
              for (var j = 0; j < priorities.length; j++) {
                let diff = maxLevels - priorities[j][1].length;
                for (var k = 0; k < diff; k++) priorities[j][1].push([]);
                priorities[j][1].push([neighbours[j]]);
                for (var k = 0; k < priorities[j][1].length; k++) {
                  let diff = maxEntries - priorities[j][1][k].length;
                  for (var l = 0; l < diff; l++) priorities[j][1][k].push(0);
                }
              }
              priorities.sort(function (a, b) {
                for (var j = 0; j < a[1].length; j++)
                  for (var k = 0; k < a[1][j].length; k++) {
                    if (a[1][j][k] > b[1][j][k]) return -1;
                    if (a[1][j][k] < b[1][j][k]) return 1;
                  }
                return 0;
              });
              let order = new Uint8Array(nNeighbours);
              for (var j = 0; j < nNeighbours; j++)
                (order[j] = priorities[j][0]), (vertex.value.priority = j);
              let posA = this.graph.vertices[neighbours[order[0]]].position,
                posB = this.graph.vertices[neighbours[order[1]]].position,
                posC = this.graph.vertices[neighbours[order[2]]].position,
                cwA = posA.relativeClockwise(posB, vertex.position),
                cwB = posA.relativeClockwise(posC, vertex.position),
                isCw = -1 === cwA,
                rotation = "@" === vertex.value.bracket.chirality ? -1 : 1,
                rs =
                  1 == MathHelper.parityOfPermutation(order) * rotation
                    ? "R"
                    : "S",
                wedgeA = "down",
                wedgeB = "up";
              ((isCw && "R" !== rs) || (!isCw && "S" !== rs)) &&
                ((vertex.value.hydrogenDirection = "up"),
                (wedgeA = "up"),
                (wedgeB = "down")),
                vertex.value.hasHydrogen &&
                  (this.graph.getEdge(
                    vertex.id,
                    neighbours[order[order.length - 1]]
                  ).wedge = wedgeA);
              let wedgeOrder = Array(neighbours.length - 1),
                showHydrogen =
                  1 < vertex.value.rings.length && vertex.value.hasHydrogen,
                offset = vertex.value.hasHydrogen ? 1 : 0;
              for (var j = 0; j < order.length - offset; j++) {
                wedgeOrder[j] = new Uint32Array(2);
                let neighbour = this.graph.vertices[neighbours[order[j]]];
                (wedgeOrder[j][0] += neighbour.value.isStereoCenter ? 0 : 1e5),
                  (wedgeOrder[j][0] += this.areVerticesInSameRing(
                    neighbour,
                    vertex
                  )
                    ? 0
                    : 1e4),
                  (wedgeOrder[j][0] += neighbour.value.isHeteroAtom()
                    ? 1e3
                    : 0),
                  (wedgeOrder[j][0] -=
                    0 === neighbour.value.subtreeDepth ? 1e3 : 0),
                  (wedgeOrder[j][0] += 1e3 - neighbour.value.subtreeDepth),
                  (wedgeOrder[j][1] = neighbours[order[j]]);
              }
              if (
                (wedgeOrder.sort(function (a, b) {
                  return a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0;
                }),
                !showHydrogen)
              ) {
                let wedgeId = wedgeOrder[0][1];
                if (vertex.value.hasHydrogen)
                  this.graph.getEdge(vertex.id, wedgeId).wedge = wedgeB;
                else {
                  let wedge = wedgeB;
                  for (
                    var j = order.length - 1;
                    0 <= j &&
                    ((wedge = wedge === wedgeA ? wedgeB : wedgeA),
                    neighbours[order[j]] !== wedgeId);
                    j--
                  );
                  this.graph.getEdge(vertex.id, wedgeId).wedge = wedge;
                }
              }
              vertex.value.chirality = rs;
            }
          }
          visitStereochemistry(
            vertexId,
            previousVertexId,
            visited,
            priority,
            maxDepth,
            depth,
            parentAtomicNumber = 0
          ) {
            visited[vertexId] = 1;
            let vertex = this.graph.vertices[vertexId],
              atomicNumber = vertex.value.getAtomicNumber();
            priority.length <= depth && priority.push([]);
            for (
              var i = 0;
              i < this.graph.getEdge(vertexId, previousVertexId).weight;
              i++
            )
              priority[depth].push(1e3 * parentAtomicNumber + atomicNumber);
            let neighbours = this.graph.vertices[vertexId].neighbours;
            for (var i = 0; i < neighbours.length; i++)
              1 !== visited[neighbours[i]] &&
                depth < maxDepth - 1 &&
                this.visitStereochemistry(
                  neighbours[i],
                  vertexId,
                  visited.slice(),
                  priority,
                  maxDepth,
                  depth + 1,
                  atomicNumber
                );
            if (depth < maxDepth - 1) {
              let bonds = 0;
              for (var i = 0; i < neighbours.length; i++)
                bonds += this.graph.getEdge(vertexId, neighbours[i]).weight;
              for (var i = 0; i < vertex.value.getMaxBonds() - bonds; i++)
                priority.length <= depth + 1 && priority.push([]),
                  priority[depth + 1].push(1e3 * atomicNumber + 1);
            }
          }
          initPseudoElements() {
            for (var i = 0; i < this.graph.vertices.length; i++) {
              const vertex = this.graph.vertices[i],
                neighbourIds = vertex.neighbours;
              let neighbours = Array(neighbourIds.length);
              for (var j = 0; j < neighbourIds.length; j++)
                neighbours[j] = this.graph.vertices[neighbourIds[j]];
              if (
                3 > vertex.getNeighbourCount() ||
                0 < vertex.value.rings.length
              )
                continue;
              if ("P" === vertex.value.element) continue;
              if (
                "C" === vertex.value.element &&
                3 === neighbours.length &&
                "N" === neighbours[0].value.element &&
                "N" === neighbours[1].value.element &&
                "N" === neighbours[2].value.element
              )
                continue;
              let heteroAtomCount = 0,
                ctn = 0;
              for (var j = 0; j < neighbours.length; j++) {
                let neighbour = neighbours[j],
                  neighbouringElement = neighbour.value.element,
                  neighbourCount = neighbour.getNeighbourCount();
                "C" !== neighbouringElement &&
                  "H" !== neighbouringElement &&
                  1 === neighbourCount &&
                  heteroAtomCount++,
                  1 < neighbourCount && ctn++;
              }
              if (1 < ctn || 2 > heteroAtomCount) continue;
              let previous = null;
              for (var j = 0; j < neighbours.length; j++) {
                let neighbour = neighbours[j];
                1 < neighbour.getNeighbourCount() && (previous = neighbour);
              }
              for (var j = 0; j < neighbours.length; j++) {
                let neighbour = neighbours[j];
                if (1 < neighbour.getNeighbourCount()) continue;
                neighbour.value.isDrawn = !1;
                let hydrogens =
                    Atom.maxBonds[neighbour.value.element] -
                    neighbour.value.bondCount,
                  charge = "";
                neighbour.value.bracket &&
                  ((hydrogens = neighbour.value.bracket.hcount),
                  (charge = neighbour.value.bracket.charge || 0)),
                  vertex.value.attachPseudoElement(
                    neighbour.value.element,
                    previous ? previous.value.element : null,
                    hydrogens,
                    charge
                  );
              }
            }
            for (var i = 0; i < this.graph.vertices.length; i++) {
              const vertex = this.graph.vertices[i],
                atom = vertex.value,
                element = atom.element;
              if ("C" === element || "H" === element || !atom.isDrawn) continue;
              const neighbourIds = vertex.neighbours;
              let neighbours = Array(neighbourIds.length);
              for (var j = 0; j < neighbourIds.length; j++)
                neighbours[j] = this.graph.vertices[neighbourIds[j]];
              for (var j = 0; j < neighbours.length; j++) {
                let neighbour = neighbours[j].value;
                if (
                  !neighbour.hasAttachedPseudoElements ||
                  2 !== neighbour.getAttachedPseudoElementsCount()
                )
                  continue;
                const pseudoElements = neighbour.getAttachedPseudoElements();
                pseudoElements.hasOwnProperty("0O") &&
                  pseudoElements.hasOwnProperty("3C") &&
                  ((neighbour.isDrawn = !1),
                  vertex.value.attachPseudoElement("Ac", "", 0));
              }
            }
          }
        };
      },
      {
        "./ArrayHelper": 2,
        "./Atom": 3,
        "./CanvasWrapper": 4,
        "./Edge": 6,
        "./Graph": 7,
        "./Line": 8,
        "./MathHelper": 9,
        "./Ring": 11,
        "./RingConnection": 12,
        "./SSSR": 13,
        "./ThemeManager": 16,
        "./Vector2": 18,
        "./Vertex": 19,
      },
    ],
    6: [
      function (require, module) {
        "use strict";
        class Edge {
          constructor(sourceId, targetId, weight = 1) {
            (this.id = null),
              (this.sourceId = sourceId),
              (this.targetId = targetId),
              (this.weight = weight),
              (this.bondType = "-"),
              (this.isPartOfAromaticRing = !1),
              (this.center = !1),
              (this.wedge = "");
          }
          setBondType(bondType) {
            (this.bondType = bondType), (this.weight = Edge.bonds[bondType]);
          }
          static get bonds() {
            return { "-": 1, "/": 1, "\\": 1, "=": 2, "#": 3, $: 4 };
          }
        }
        module.exports = Edge;
      },
      {},
    ],
    7: [
      function (require, module) {
        "use strict";
        var _Mathpow = Math.pow,
          _Mathsqrt2 = Math.sqrt,
          _Mathmin4 = Math.min;
        const MathHelper = require("./MathHelper"),
          Vector2 = require("./Vector2"),
          Vertex = require("./Vertex"),
          Edge = require("./Edge"),
          Ring = require("./Ring"),
          Atom = require("./Atom");
        class Graph {
          constructor(parseTree, isomeric = !1) {
            (this.vertices = []),
              (this.edges = []),
              (this.vertexIdsToEdgeId = {}),
              (this.isomeric = isomeric),
              (this._time = 0),
              this._init(parseTree);
          }
          _init(node, order = 0, parentVertexId = null, isBranch = !1) {
            let atom = new Atom(
              node.atom.element ? node.atom.element : node.atom,
              node.bond
            );
            (atom.branchBond = node.branchBond),
              (atom.ringbonds = node.ringbonds),
              (atom.bracket = node.atom.element ? node.atom : null);
            let vertex = new Vertex(atom),
              parentVertex = this.vertices[parentVertexId];
            if ((this.addVertex(vertex), null !== parentVertexId)) {
              vertex.setParentVertexId(parentVertexId),
                vertex.value.addNeighbouringElement(parentVertex.value.element),
                parentVertex.addChild(vertex.id),
                parentVertex.value.addNeighbouringElement(atom.element),
                parentVertex.spanningTreeChildren.push(vertex.id);
              let edge = new Edge(parentVertexId, vertex.id, 1),
                vertexId = null;
              isBranch
                ? (edge.setBondType(vertex.value.branchBond || "-"),
                  (vertexId = vertex.id),
                  edge.setBondType(vertex.value.branchBond || "-"),
                  (vertexId = vertex.id))
                : (edge.setBondType(parentVertex.value.bondType || "-"),
                  (vertexId = parentVertex.id));
              this.addEdge(edge);
            }
            let offset = node.ringbondCount + 1;
            atom.bracket && (offset += atom.bracket.hcount);
            let stereoHydrogens = 0;
            if (atom.bracket && atom.bracket.chirality) {
              (atom.isStereoCenter = !0),
                (stereoHydrogens = atom.bracket.hcount);
              for (var i = 0; i < stereoHydrogens; i++)
                this._init(
                  {
                    atom: "H",
                    isBracket: "false",
                    branches: [],
                    branchCount: 0,
                    ringbonds: [],
                    ringbondCount: !1,
                    next: null,
                    hasNext: !1,
                    bond: "-",
                  },
                  i,
                  vertex.id,
                  !0
                );
            }
            for (var i = 0; i < node.branchCount; i++)
              this._init(node.branches[i], i + offset, vertex.id, !0);
            node.hasNext &&
              this._init(node.next, node.branchCount + offset, vertex.id);
          }
          clear() {
            (this.vertices = []),
              (this.edges = []),
              (this.vertexIdsToEdgeId = {});
          }
          addVertex(vertex) {
            return (
              (vertex.id = this.vertices.length),
              this.vertices.push(vertex),
              vertex.id
            );
          }
          addEdge(edge) {
            let source = this.vertices[edge.sourceId],
              target = this.vertices[edge.targetId];
            return (
              (edge.id = this.edges.length),
              this.edges.push(edge),
              (this.vertexIdsToEdgeId[edge.sourceId + "_" + edge.targetId] =
                edge.id),
              (this.vertexIdsToEdgeId[edge.targetId + "_" + edge.sourceId] =
                edge.id),
              (edge.isPartOfAromaticRing =
                source.value.isPartOfAromaticRing &&
                target.value.isPartOfAromaticRing),
              (source.value.bondCount += edge.weight),
              (target.value.bondCount += edge.weight),
              source.edges.push(edge.id),
              target.edges.push(edge.id),
              edge.id
            );
          }
          getEdge(vertexIdA, vertexIdB) {
            let edgeId = this.vertexIdsToEdgeId[vertexIdA + "_" + vertexIdB];
            return edgeId === void 0 ? null : this.edges[edgeId];
          }
          getEdges(vertexId) {
            let edgeIds = [],
              vertex = this.vertices[vertexId];
            for (var i = 0; i < vertex.neighbours.length; i++)
              edgeIds.push(
                this.vertexIdsToEdgeId[vertexId + "_" + vertex.neighbours[i]]
              );
            return edgeIds;
          }
          hasEdge(vertexIdA, vertexIdB) {
            return (
              this.vertexIdsToEdgeId[vertexIdA + "_" + vertexIdB] !== void 0
            );
          }
          getVertexList() {
            let arr = [this.vertices.length];
            for (var i = 0; i < this.vertices.length; i++)
              arr[i] = this.vertices[i].id;
            return arr;
          }
          getEdgeList() {
            let arr = Array(this.edges.length);
            for (var i = 0; i < this.edges.length; i++)
              arr[i] = [this.edges[i].sourceId, this.edges[i].targetId];
            return arr;
          }
          getAdjacencyMatrix() {
            let length = this.vertices.length,
              adjacencyMatrix = Array(length);
            for (var i = 0; i < length; i++)
              (adjacencyMatrix[i] = Array(length)), adjacencyMatrix[i].fill(0);
            for (var i = 0; i < this.edges.length; i++) {
              let edge = this.edges[i];
              (adjacencyMatrix[edge.sourceId][edge.targetId] = 1),
                (adjacencyMatrix[edge.targetId][edge.sourceId] = 1);
            }
            return adjacencyMatrix;
          }
          getComponentsAdjacencyMatrix() {
            let length = this.vertices.length,
              adjacencyMatrix = Array(length),
              bridges = this.getBridges();
            for (var i = 0; i < length; i++)
              (adjacencyMatrix[i] = Array(length)), adjacencyMatrix[i].fill(0);
            for (var i = 0; i < this.edges.length; i++) {
              let edge = this.edges[i];
              (adjacencyMatrix[edge.sourceId][edge.targetId] = 1),
                (adjacencyMatrix[edge.targetId][edge.sourceId] = 1);
            }
            for (var i = 0; i < bridges.length; i++)
              (adjacencyMatrix[bridges[i][0]][bridges[i][1]] = 0),
                (adjacencyMatrix[bridges[i][1]][bridges[i][0]] = 0);
            return adjacencyMatrix;
          }
          getSubgraphAdjacencyMatrix(vertexIds) {
            let length = vertexIds.length,
              adjacencyMatrix = Array(length);
            for (var i = 0; i < length; i++) {
              (adjacencyMatrix[i] = Array(length)), adjacencyMatrix[i].fill(0);
              for (var j = 0; j < length; j++)
                i !== j &&
                  this.hasEdge(vertexIds[i], vertexIds[j]) &&
                  (adjacencyMatrix[i][j] = 1);
            }
            return adjacencyMatrix;
          }
          getDistanceMatrix() {
            let length = this.vertices.length,
              adja = this.getAdjacencyMatrix(),
              dist = Array(length);
            for (var i = 0; i < length; i++)
              (dist[i] = Array(length)), dist[i].fill(1 / 0);
            for (var i = 0; i < length; i++)
              for (var j = 0; j < length; j++)
                1 === adja[i][j] && (dist[i][j] = 1);
            for (var k = 0; k < length; k++)
              for (var i = 0; i < length; i++)
                for (var j = 0; j < length; j++)
                  dist[i][j] > dist[i][k] + dist[k][j] &&
                    (dist[i][j] = dist[i][k] + dist[k][j]);
            return dist;
          }
          getSubgraphDistanceMatrix(vertexIds) {
            let length = vertexIds.length,
              adja = this.getSubgraphAdjacencyMatrix(vertexIds),
              dist = Array(length);
            for (var i = 0; i < length; i++)
              (dist[i] = Array(length)), dist[i].fill(1 / 0);
            for (var i = 0; i < length; i++)
              for (var j = 0; j < length; j++)
                1 === adja[i][j] && (dist[i][j] = 1);
            for (var k = 0; k < length; k++)
              for (var i = 0; i < length; i++)
                for (var j = 0; j < length; j++)
                  dist[i][j] > dist[i][k] + dist[k][j] &&
                    (dist[i][j] = dist[i][k] + dist[k][j]);
            return dist;
          }
          getAdjacencyList() {
            let length = this.vertices.length,
              adjacencyList = Array(length);
            for (var i = 0; i < length; i++) {
              adjacencyList[i] = [];
              for (var j = 0; j < length; j++)
                i !== j &&
                  this.hasEdge(this.vertices[i].id, this.vertices[j].id) &&
                  adjacencyList[i].push(j);
            }
            return adjacencyList;
          }
          getSubgraphAdjacencyList(vertexIds) {
            let length = vertexIds.length,
              adjacencyList = Array(length);
            for (var i = 0; i < length; i++) {
              adjacencyList[i] = [];
              for (var j = 0; j < length; j++)
                i !== j &&
                  this.hasEdge(vertexIds[i], vertexIds[j]) &&
                  adjacencyList[i].push(j);
            }
            return adjacencyList;
          }
          getBridges() {
            let length = this.vertices.length,
              visited = Array(length),
              disc = Array(length),
              low = Array(length),
              parent = Array(length),
              adj = this.getAdjacencyList(),
              outBridges = [];
            visited.fill(!1), parent.fill(null), (this._time = 0);
            for (var i = 0; i < length; i++)
              visited[i] ||
                this._bridgeDfs(i, visited, disc, low, parent, adj, outBridges);
            return outBridges;
          }
          traverseBF(startVertexId, callback) {
            let length = this.vertices.length,
              visited = Array(length);
            visited.fill(!1);
            for (var queue = [startVertexId]; 0 < queue.length; ) {
              let u = queue.shift(),
                vertex = this.vertices[u];
              callback(vertex);
              for (var i = 0; i < vertex.neighbours.length; i++) {
                let v = vertex.neighbours[i];
                visited[v] || ((visited[v] = !0), queue.push(v));
              }
            }
          }
          getTreeDepth(vertexId, parentVertexId) {
            if (null === vertexId || null === parentVertexId) return 0;
            let neighbours =
                this.vertices[vertexId].getSpanningTreeNeighbours(
                  parentVertexId
                ),
              max = 0;
            for (var i = 0; i < neighbours.length; i++) {
              let childId = neighbours[i],
                d = this.getTreeDepth(childId, vertexId);
              d > max && (max = d);
            }
            return max + 1;
          }
          traverseTree(
            vertexId,
            parentVertexId,
            callback,
            maxDepth = 999999,
            ignoreFirst = !1,
            depth = 1,
            visited = null
          ) {
            if (
              (null === visited &&
                (visited = new Uint8Array(this.vertices.length)),
              depth > maxDepth + 1 || 1 === visited[vertexId])
            )
              return;
            visited[vertexId] = 1;
            let vertex = this.vertices[vertexId],
              neighbours = vertex.getNeighbours(parentVertexId);
            (!ignoreFirst || 1 < depth) && callback(vertex);
            for (var i = 0; i < neighbours.length; i++)
              this.traverseTree(
                neighbours[i],
                vertexId,
                callback,
                maxDepth,
                ignoreFirst,
                depth + 1,
                visited
              );
          }
          kkLayout(
            vertexIds,
            center,
            startVertexId,
            ring,
            bondLength,
            threshold = 0.1,
            innerThreshold = 0.1,
            maxIteration = 2e3,
            maxInnerIteration = 50,
            maxEnergy = 1e9
          ) {
            for (var i = vertexIds.length; i--; ) {
              let vertex = this.vertices[vertexIds[i]];
              var j = vertex.neighbours.length;
            }
            let matDist = this.getSubgraphDistanceMatrix(vertexIds),
              length = vertexIds.length,
              radius = MathHelper.polyCircumradius(500, length),
              angle = MathHelper.centralAngle(length),
              a = 0,
              arrPositionX = new Float32Array(length),
              arrPositionY = new Float32Array(length),
              arrPositioned = Array(length);
            for (i = length; i--; ) {
              let vertex = this.vertices[vertexIds[i]];
              vertex.positioned
                ? ((arrPositionX[i] = vertex.position.x),
                  (arrPositionY[i] = vertex.position.y))
                : ((arrPositionX[i] = center.x + Math.cos(a) * radius),
                  (arrPositionY[i] = center.y + Math.sin(a) * radius)),
                (arrPositioned[i] = vertex.positioned),
                (a += angle);
            }
            let matLength = Array(length);
            for (i = length; i--; ) {
              matLength[i] = Array(length);
              for (var j = length; j--; )
                matLength[i][j] = bondLength * matDist[i][j];
            }
            let matStrength = Array(length);
            for (i = length; i--; ) {
              matStrength[i] = Array(length);
              for (var j = length; j--; )
                matStrength[i][j] = bondLength * _Mathpow(matDist[i][j], -2);
            }
            let matEnergy = Array(length),
              arrEnergySumX = new Float32Array(length),
              arrEnergySumY = new Float32Array(length);
            for (i = length; i--; ) matEnergy[i] = Array(length);
            i = length;
            for (let ux, uy, dEx, dEy, vx, vy, denom; i--; ) {
              (ux = arrPositionX[i]),
                (uy = arrPositionY[i]),
                (dEx = 0),
                (dEy = 0);
              for (let j = length; j--; )
                i !== j &&
                  ((vx = arrPositionX[j]),
                  (vy = arrPositionY[j]),
                  (denom =
                    1 /
                    _Mathsqrt2((ux - vx) * (ux - vx) + (uy - vy) * (uy - vy))),
                  (matEnergy[i][j] = [
                    matStrength[i][j] *
                      (ux - vx - matLength[i][j] * (ux - vx) * denom),
                    matStrength[i][j] *
                      (uy - vy - matLength[i][j] * (uy - vy) * denom),
                  ]),
                  (matEnergy[j][i] = matEnergy[i][j]),
                  (dEx += matEnergy[i][j][0]),
                  (dEy += matEnergy[i][j][1]));
              (arrEnergySumX[i] = dEx), (arrEnergySumY[i] = dEy);
            }
            let energy = function (index) {
                return [
                  arrEnergySumX[index] * arrEnergySumX[index] +
                    arrEnergySumY[index] * arrEnergySumY[index],
                  arrEnergySumX[index],
                  arrEnergySumY[index],
                ];
              },
              highestEnergy = function () {
                let maxEnergy = 0,
                  maxEnergyId = 0,
                  maxDEX = 0,
                  maxDEY = 0;
                for (i = length; i--; ) {
                  let [delta, dEX, dEY] = energy(i);
                  delta > maxEnergy &&
                    !1 === arrPositioned[i] &&
                    ((maxEnergy = delta),
                    (maxEnergyId = i),
                    (maxDEX = dEX),
                    (maxDEY = dEY));
                }
                return [maxEnergyId, maxEnergy, maxDEX, maxDEY];
              },
              update = function (index, dEX, dEY) {
                let dxx = 0,
                  dyy = 0,
                  dxy = 0,
                  ux = arrPositionX[index],
                  uy = arrPositionY[index],
                  arrL = matLength[index],
                  arrK = matStrength[index];
                for (i = length; i--; ) {
                  if (i === index) continue;
                  let vx = arrPositionX[i],
                    vy = arrPositionY[i],
                    l = arrL[i],
                    k = arrK[i],
                    m = (ux - vx) * (ux - vx),
                    denom = 1 / _Mathpow(m + (uy - vy) * (uy - vy), 1.5);
                  (dxx += k * (1 - l * (uy - vy) * (uy - vy) * denom)),
                    (dyy += k * (1 - l * m * denom)),
                    (dxy += k * (l * (ux - vx) * (uy - vy) * denom));
                }
                0 == dxx && (dxx = 0.1),
                  0 === dyy && (dyy = 0.1),
                  0 === dxy && (dxy = 0.1);
                let dy = dEX / dxx + dEY / dxy;
                dy /= dxy / dxx - dyy / dxy;
                let dx = -(dxy * dy + dEX) / dxx;
                (arrPositionX[index] += dx), (arrPositionY[index] += dy);
                let arrE = matEnergy[index];
                (dEX = 0),
                  (dEY = 0),
                  (ux = arrPositionX[index]),
                  (uy = arrPositionY[index]);
                let vx, vy, prevEx, prevEy, denom;
                for (i = length; i--; )
                  index !== i &&
                    ((vx = arrPositionX[i]),
                    (vy = arrPositionY[i]),
                    (prevEx = arrE[i][0]),
                    (prevEy = arrE[i][1]),
                    (denom =
                      1 /
                      _Mathsqrt2(
                        (ux - vx) * (ux - vx) + (uy - vy) * (uy - vy)
                      )),
                    (dx = arrK[i] * (ux - vx - arrL[i] * (ux - vx) * denom)),
                    (dy = arrK[i] * (uy - vy - arrL[i] * (uy - vy) * denom)),
                    (arrE[i] = [dx, dy]),
                    (dEX += dx),
                    (dEY += dy),
                    (arrEnergySumX[i] += dx - prevEx),
                    (arrEnergySumY[i] += dy - prevEy));
                (arrEnergySumX[index] = dEX), (arrEnergySumY[index] = dEY);
              },
              maxEnergyId = 0,
              dEX = 0,
              dEY = 0,
              delta = 0,
              iteration = 0,
              innerIteration = 0;
            for (; maxEnergy > threshold && maxIteration > iteration; )
              for (
                iteration++,
                  [maxEnergyId, maxEnergy, dEX, dEY] = highestEnergy(),
                  delta = maxEnergy,
                  innerIteration = 0;
                delta > innerThreshold && maxInnerIteration > innerIteration;

              )
                innerIteration++,
                  update(maxEnergyId, dEX, dEY),
                  ([delta, dEX, dEY] = energy(maxEnergyId));
            for (i = length; i--; ) {
              let index = vertexIds[i],
                vertex = this.vertices[index];
              (vertex.position.x = arrPositionX[i]),
                (vertex.position.y = arrPositionY[i]),
                (vertex.positioned = !0),
                (vertex.forcePositioned = !0);
            }
          }
          _bridgeDfs(u, visited, disc, low, parent, adj, outBridges) {
            (visited[u] = !0), (disc[u] = low[u] = ++this._time);
            for (var i = 0; i < adj[u].length; i++) {
              let v = adj[u][i];
              visited[v]
                ? v !== parent[u] && (low[u] = _Mathmin4(low[u], disc[v]))
                : ((parent[v] = u),
                  this._bridgeDfs(
                    v,
                    visited,
                    disc,
                    low,
                    parent,
                    adj,
                    outBridges
                  ),
                  (low[u] = _Mathmin4(low[u], low[v])),
                  low[v] > disc[u] && outBridges.push([u, v]));
            }
          }
          static getConnectedComponents(adjacencyMatrix) {
            let length = adjacencyMatrix.length,
              visited = Array(length),
              components = [],
              count = 0;
            visited.fill(!1);
            for (var u = 0; u < length; u++)
              if (!visited[u]) {
                let component = [];
                (visited[u] = !0),
                  component.push(u),
                  count++,
                  Graph._ccGetDfs(u, visited, adjacencyMatrix, component),
                  1 < component.length && components.push(component);
              }
            return components;
          }
          static getConnectedComponentCount(adjacencyMatrix) {
            let length = adjacencyMatrix.length,
              visited = Array(length),
              count = 0;
            visited.fill(!1);
            for (var u = 0; u < length; u++)
              visited[u] ||
                ((visited[u] = !0),
                count++,
                Graph._ccCountDfs(u, visited, adjacencyMatrix));
            return count;
          }
          static _ccCountDfs(u, visited, adjacencyMatrix) {
            for (var v = 0; v < adjacencyMatrix[u].length; v++) {
              let c = adjacencyMatrix[u][v];
              c &&
                !visited[v] &&
                u !== v &&
                ((visited[v] = !0),
                Graph._ccCountDfs(v, visited, adjacencyMatrix));
            }
          }
          static _ccGetDfs(u, visited, adjacencyMatrix, component) {
            for (var v = 0; v < adjacencyMatrix[u].length; v++) {
              let c = adjacencyMatrix[u][v];
              c &&
                !visited[v] &&
                u !== v &&
                ((visited[v] = !0),
                component.push(v),
                Graph._ccGetDfs(v, visited, adjacencyMatrix, component));
            }
          }
        }
        module.exports = Graph;
      },
      {
        "./Atom": 3,
        "./Edge": 6,
        "./MathHelper": 9,
        "./Ring": 11,
        "./Vector2": 18,
        "./Vertex": 19,
      },
    ],
    8: [
      function (require, module) {
        "use strict";
        var _Mathpow2 = Math.pow,
          _Mathsin2 = Math.sin,
          _Mathcos2 = Math.cos;
        const Vector2 = require("./Vector2");
        class Line {
          constructor(
            from = new Vector2(0, 0),
            to = new Vector2(0, 0),
            elementFrom = null,
            elementTo = null,
            chiralFrom = !1,
            chiralTo = !1
          ) {
            (this.from = from),
              (this.to = to),
              (this.elementFrom = elementFrom),
              (this.elementTo = elementTo),
              (this.chiralFrom = chiralFrom),
              (this.chiralTo = chiralTo);
          }
          clone() {
            return new Line(
              this.from.clone(),
              this.to.clone(),
              this.elementFrom,
              this.elementTo
            );
          }
          getLength() {
            return Math.sqrt(
              _Mathpow2(this.to.x - this.from.x, 2) +
                _Mathpow2(this.to.y - this.from.y, 2)
            );
          }
          getAngle() {
            let diff = Vector2.subtract(
              this.getRightVector(),
              this.getLeftVector()
            );
            return diff.angle();
          }
          getRightVector() {
            return this.from.x < this.to.x ? this.to : this.from;
          }
          getLeftVector() {
            return this.from.x < this.to.x ? this.from : this.to;
          }
          getRightElement() {
            return this.from.x < this.to.x ? this.elementTo : this.elementFrom;
          }
          getLeftElement() {
            return this.from.x < this.to.x ? this.elementFrom : this.elementTo;
          }
          getRightChiral() {
            return this.from.x < this.to.x ? this.chiralTo : this.chiralFrom;
          }
          getLeftChiral() {
            return this.from.x < this.to.x ? this.chiralFrom : this.chiralTo;
          }
          setRightVector(x, y) {
            return (
              this.from.x < this.to.x
                ? ((this.to.x = x), (this.to.y = y))
                : ((this.from.x = x), (this.from.y = y)),
              this
            );
          }
          setLeftVector(x, y) {
            return (
              this.from.x < this.to.x
                ? ((this.from.x = x), (this.from.y = y))
                : ((this.to.x = x), (this.to.y = y)),
              this
            );
          }
          rotateToXAxis() {
            let left = this.getLeftVector();
            return this.setRightVector(left.x + this.getLength(), left.y), this;
          }
          rotate(theta) {
            let l = this.getLeftVector(),
              r = this.getRightVector(),
              sinTheta = _Mathsin2(theta),
              cosTheta = _Mathcos2(theta),
              x = cosTheta * (r.x - l.x) - sinTheta * (r.y - l.y) + l.x,
              y = sinTheta * (r.x - l.x) - cosTheta * (r.y - l.y) + l.y;
            return this.setRightVector(x, y), this;
          }
          shortenFrom(by) {
            let f = Vector2.subtract(this.to, this.from);
            return f.normalize(), f.multiplyScalar(by), this.from.add(f), this;
          }
          shortenTo(by) {
            let f = Vector2.subtract(this.from, this.to);
            return f.normalize(), f.multiplyScalar(by), this.to.add(f), this;
          }
          shortenRight(by) {
            return (
              this.from.x < this.to.x
                ? this.shortenTo(by)
                : this.shortenFrom(by),
              this
            );
          }
          shortenLeft(by) {
            return (
              this.from.x < this.to.x
                ? this.shortenFrom(by)
                : this.shortenTo(by),
              this
            );
          }
          shorten(by) {
            let f = Vector2.subtract(this.from, this.to);
            return (
              f.normalize(),
              f.multiplyScalar(by / 2),
              this.to.add(f),
              this.from.subtract(f),
              this
            );
          }
        }
        module.exports = Line;
      },
      { "./Vector2": 18 },
    ],
    9: [
      function (require, module) {
        "use strict";
        var _Mathround = Math.round,
          _Mathsin3 = Math.sin,
          _Mathcos3 = Math.cos,
          _MathPI2 = Math.PI;
        class MathHelper {
          static round(value, decimals) {
            return (
              (decimals = decimals ? decimals : 1),
              +(_Mathround(value + "e" + decimals) + "e-" + decimals)
            );
          }
          static meanAngle(arr) {
            let sin = 0,
              cos = 0;
            for (var i = 0; i < arr.length; i++)
              (sin += _Mathsin3(arr[i])), (cos += _Mathcos3(arr[i]));
            return Math.atan2(sin / arr.length, cos / arr.length);
          }
          static innerAngle(n) {
            return MathHelper.toRad((180 * (n - 2)) / n);
          }
          static polyCircumradius(s, n) {
            return s / (2 * _Mathsin3(_MathPI2 / n));
          }
          static apothem(r, n) {
            return r * _Mathcos3(_MathPI2 / n);
          }
          static apothemFromSideLength(s, n) {
            let r = MathHelper.polyCircumradius(s, n);
            return MathHelper.apothem(r, n);
          }
          static centralAngle(n) {
            return MathHelper.toRad(360 / n);
          }
          static toDeg(rad) {
            return rad * MathHelper.degFactor;
          }
          static toRad(deg) {
            return deg * MathHelper.radFactor;
          }
          static parityOfPermutation(arr) {
            let visited = new Uint8Array(arr.length),
              evenLengthCycleCount = 0,
              traverseCycle = function (i, cycleLength = 0) {
                return 1 === visited[i]
                  ? cycleLength
                  : (cycleLength++,
                    (visited[i] = 1),
                    traverseCycle(arr[i], cycleLength));
              };
            for (var i = 0; i < arr.length; i++) {
              if (1 === visited[i]) continue;
              let cycleLength = traverseCycle(i);
              evenLengthCycleCount += 1 - (cycleLength % 2);
            }
            return evenLengthCycleCount % 2 ? -1 : 1;
          }
          static get radFactor() {
            return _MathPI2 / 180;
          }
          static get degFactor() {
            return 180 / _MathPI2;
          }
          static get twoPI() {
            return 2 * _MathPI2;
          }
        }
        module.exports = MathHelper;
      },
      {},
    ],
    10: [
      function (require, module) {
        "use strict";
        module.exports = (function () {
          function peg$SyntaxError(message, expected, found, location) {
            (this.message = message),
              (this.expected = expected),
              (this.found = found),
              (this.location = location),
              (this.name = "SyntaxError"),
              "function" == typeof Error.captureStackTrace &&
                Error.captureStackTrace(this, peg$SyntaxError);
          }
          function peg$parse(input, options) {
            function peg$literalExpectation(text, ignoreCase) {
              return { type: "literal", text: text, ignoreCase: ignoreCase };
            }
            function peg$classExpectation(parts, inverted, ignoreCase) {
              return {
                type: "class",
                parts: parts,
                inverted: inverted,
                ignoreCase: ignoreCase,
              };
            }
            function peg$computePosDetails(pos) {
              var details = peg$posDetailsCache[pos],
                p;
              if (details) return details;
              for (p = pos - 1; !peg$posDetailsCache[p]; ) p--;
              for (
                details = peg$posDetailsCache[p],
                  details = { line: details.line, column: details.column };
                p < pos;

              )
                10 === input.charCodeAt(p)
                  ? (details.line++, (details.column = 1))
                  : details.column++,
                  p++;
              return (peg$posDetailsCache[pos] = details), details;
            }
            function peg$computeLocation(startPos, endPos) {
              var startPosDetails = peg$computePosDetails(startPos),
                endPosDetails = peg$computePosDetails(endPos);
              return {
                start: {
                  offset: startPos,
                  line: startPosDetails.line,
                  column: startPosDetails.column,
                },
                end: {
                  offset: endPos,
                  line: endPosDetails.line,
                  column: endPosDetails.column,
                },
              };
            }
            function peg$fail(expected) {
              peg$currPos < peg$maxFailPos ||
                (peg$currPos > peg$maxFailPos &&
                  ((peg$maxFailPos = peg$currPos), (peg$maxFailExpected = [])),
                peg$maxFailExpected.push(expected));
            }
            function peg$buildSimpleError(message, location) {
              return new peg$SyntaxError(message, null, null, location);
            }
            function peg$parsechain() {
              var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
              if (
                ((s0 = peg$currPos),
                (s1 = peg$currPos),
                (s2 = peg$parseatom()),
                s2 !== peg$FAILED)
              ) {
                for (s3 = [], s4 = peg$parsebranch(); s4 !== peg$FAILED; )
                  s3.push(s4), (s4 = peg$parsebranch());
                if (s3 !== peg$FAILED) {
                  for (
                    s4 = [],
                      s5 = peg$currPos,
                      s6 = peg$parsebond(),
                      s6 === peg$FAILED && (s6 = null),
                      s6 === peg$FAILED
                        ? ((peg$currPos = s5), (s5 = peg$FAILED))
                        : ((s7 = peg$parsering()),
                          s7 === peg$FAILED
                            ? ((peg$currPos = s5), (s5 = peg$FAILED))
                            : ((s6 = [s6, s7]), (s5 = s6)));
                    s5 !== peg$FAILED;

                  )
                    s4.push(s5),
                      (s5 = peg$currPos),
                      (s6 = peg$parsebond()),
                      s6 === peg$FAILED && (s6 = null),
                      s6 === peg$FAILED
                        ? ((peg$currPos = s5), (s5 = peg$FAILED))
                        : ((s7 = peg$parsering()),
                          s7 === peg$FAILED
                            ? ((peg$currPos = s5), (s5 = peg$FAILED))
                            : ((s6 = [s6, s7]), (s5 = s6)));
                  if (s4 !== peg$FAILED) {
                    for (s5 = [], s6 = peg$parsebranch(); s6 !== peg$FAILED; )
                      s5.push(s6), (s6 = peg$parsebranch());
                    if (s5 === peg$FAILED)
                      (peg$currPos = s1), (s1 = peg$FAILED);
                    else if (
                      ((s6 = peg$parsebond()),
                      s6 === peg$FAILED && (s6 = null),
                      s6 === peg$FAILED)
                    )
                      (peg$currPos = s1), (s1 = peg$FAILED);
                    else if (
                      ((s7 = peg$parsechain()),
                      s7 === peg$FAILED && (s7 = null),
                      s7 !== peg$FAILED)
                    ) {
                      for (s8 = [], s9 = peg$parsebranch(); s9 !== peg$FAILED; )
                        s8.push(s9), (s9 = peg$parsebranch());
                      s8 === peg$FAILED
                        ? ((peg$currPos = s1), (s1 = peg$FAILED))
                        : ((s2 = [s2, s3, s4, s5, s6, s7, s8]), (s1 = s2));
                    } else (peg$currPos = s1), (s1 = peg$FAILED);
                  } else (peg$currPos = s1), (s1 = peg$FAILED);
                } else (peg$currPos = s1), (s1 = peg$FAILED);
              } else (peg$currPos = s1), (s1 = peg$FAILED);
              return (
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c0(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsebranch() {
              var s0, s1, s2, s3, s4, s5;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                40 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "("), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c2)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : ((s3 = peg$parsebond()),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s4 = peg$parsechain()),
                        s4 === peg$FAILED
                          ? ((peg$currPos = s1), (s1 = peg$FAILED))
                          : (41 === input.charCodeAt(peg$currPos)
                              ? ((s5 = ")"), peg$currPos++)
                              : ((s5 = peg$FAILED), peg$fail(peg$c4)),
                            s5 === peg$FAILED
                              ? ((peg$currPos = s1), (s1 = peg$FAILED))
                              : ((s2 = [s2, s3, s4, s5]), (s1 = s2))))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c5(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parseatom() {
              var s0, s1;
              return (
                (s0 = peg$currPos),
                (s1 = peg$parseorganicsymbol()),
                s1 === peg$FAILED &&
                  ((s1 = peg$parsearomaticsymbol()),
                  s1 === peg$FAILED &&
                    ((s1 = peg$parsebracketatom()),
                    s1 === peg$FAILED && (s1 = peg$parsewildcard()))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c6(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsebond() {
              var s0, s1;
              if (
                ((s0 = peg$currPos), peg$c7.test(input.charAt(peg$currPos)))
              ) {
                if (
                  ((s1 = input.charAt(peg$currPos)),
                  s1 === input.charAt(peg$currPos + 1))
                )
                  throw (
                    ((s1 = peg$FAILED),
                    peg$buildSimpleError(
                      "The parser encountered a bond repetition.",
                      peg$currPos + 1
                    ))
                  );
                peg$currPos++;
              } else (s1 = peg$FAILED), peg$fail(peg$c8);
              return (
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c9(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsebracketatom() {
              var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                91 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "["), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c11)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : ((s3 = peg$parseisotope()),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ("se" === input.substr(peg$currPos, 2)
                          ? ((s4 = "se"), (peg$currPos += 2))
                          : ((s4 = peg$FAILED), peg$fail(peg$c13)),
                        s4 === peg$FAILED &&
                          ("as" === input.substr(peg$currPos, 2)
                            ? ((s4 = "as"), (peg$currPos += 2))
                            : ((s4 = peg$FAILED), peg$fail(peg$c15)),
                          s4 === peg$FAILED &&
                            ((s4 = peg$parsearomaticsymbol()),
                            s4 === peg$FAILED &&
                              ((s4 = peg$parseelementsymbol()),
                              s4 === peg$FAILED &&
                                (s4 = peg$parsewildcard())))),
                        s4 === peg$FAILED
                          ? ((peg$currPos = s1), (s1 = peg$FAILED))
                          : ((s5 = peg$parsechiral()),
                            s5 === peg$FAILED && (s5 = null),
                            s5 === peg$FAILED
                              ? ((peg$currPos = s1), (s1 = peg$FAILED))
                              : ((s6 = peg$parsehcount()),
                                s6 === peg$FAILED && (s6 = null),
                                s6 === peg$FAILED
                                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                                  : ((s7 = peg$parsecharge()),
                                    s7 === peg$FAILED && (s7 = null),
                                    s7 === peg$FAILED
                                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                                      : ((s8 = peg$parseclass()),
                                        s8 === peg$FAILED && (s8 = null),
                                        s8 === peg$FAILED
                                          ? ((peg$currPos = s1),
                                            (s1 = peg$FAILED))
                                          : (93 ===
                                            input.charCodeAt(peg$currPos)
                                              ? ((s9 = "]"), peg$currPos++)
                                              : ((s9 = peg$FAILED),
                                                peg$fail(peg$c17)),
                                            s9 === peg$FAILED
                                              ? ((peg$currPos = s1),
                                                (s1 = peg$FAILED))
                                              : ((s2 = [
                                                  s2,
                                                  s3,
                                                  s4,
                                                  s5,
                                                  s6,
                                                  s7,
                                                  s8,
                                                  s9,
                                                ]),
                                                (s1 = s2))))))))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c18(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parseorganicsymbol() {
              var s0, s1, s2, s3;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                66 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "B"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c20)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (114 === input.charCodeAt(peg$currPos)
                      ? ((s3 = "r"), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c22)),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s2 = [s2, s3]), (s1 = s2))),
                s1 === peg$FAILED &&
                  ((s1 = peg$currPos),
                  67 === input.charCodeAt(peg$currPos)
                    ? ((s2 = "C"), peg$currPos++)
                    : ((s2 = peg$FAILED), peg$fail(peg$c24)),
                  s2 === peg$FAILED
                    ? ((peg$currPos = s1), (s1 = peg$FAILED))
                    : (108 === input.charCodeAt(peg$currPos)
                        ? ((s3 = "l"), peg$currPos++)
                        : ((s3 = peg$FAILED), peg$fail(peg$c26)),
                      s3 === peg$FAILED && (s3 = null),
                      s3 === peg$FAILED
                        ? ((peg$currPos = s1), (s1 = peg$FAILED))
                        : ((s2 = [s2, s3]), (s1 = s2))),
                  s1 === peg$FAILED &&
                    (peg$c27.test(input.charAt(peg$currPos))
                      ? ((s1 = input.charAt(peg$currPos)), peg$currPos++)
                      : ((s1 = peg$FAILED), peg$fail(peg$c28)))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c29(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsearomaticsymbol() {
              var s0, s1;
              return (
                (s0 = peg$currPos),
                peg$c30.test(input.charAt(peg$currPos))
                  ? ((s1 = input.charAt(peg$currPos)), peg$currPos++)
                  : ((s1 = peg$FAILED), peg$fail(peg$c31)),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c6(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsewildcard() {
              var s0, s1;
              return (
                (s0 = peg$currPos),
                42 === input.charCodeAt(peg$currPos)
                  ? ((s1 = "*"), peg$currPos++)
                  : ((s1 = peg$FAILED), peg$fail(peg$c33)),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c34(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parseelementsymbol() {
              var s0, s1, s2, s3;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                peg$c35.test(input.charAt(peg$currPos))
                  ? ((s2 = input.charAt(peg$currPos)), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c36)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (peg$c37.test(input.charAt(peg$currPos))
                      ? ((s3 = input.charAt(peg$currPos)), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c38)),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s2 = [s2, s3]), (s1 = s2))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c39(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsering() {
              var s0, s1, s2, s3, s4;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                37 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "%"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c41)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (peg$c42.test(input.charAt(peg$currPos))
                      ? ((s3 = input.charAt(peg$currPos)), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c43)),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : (peg$c44.test(input.charAt(peg$currPos))
                          ? ((s4 = input.charAt(peg$currPos)), peg$currPos++)
                          : ((s4 = peg$FAILED), peg$fail(peg$c45)),
                        s4 === peg$FAILED
                          ? ((peg$currPos = s1), (s1 = peg$FAILED))
                          : ((s2 = [s2, s3, s4]), (s1 = s2)))),
                s1 === peg$FAILED &&
                  (peg$c44.test(input.charAt(peg$currPos))
                    ? ((s1 = input.charAt(peg$currPos)), peg$currPos++)
                    : ((s1 = peg$FAILED), peg$fail(peg$c45))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c46(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsechiral() {
              var s0, s1, s2, s3, s4, s5, s6;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                64 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "@"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c48)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (64 === input.charCodeAt(peg$currPos)
                      ? ((s3 = "@"), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c48)),
                    s3 === peg$FAILED &&
                      ((s3 = peg$currPos),
                      "TH" === input.substr(peg$currPos, 2)
                        ? ((s4 = "TH"), (peg$currPos += 2))
                        : ((s4 = peg$FAILED), peg$fail(peg$c50)),
                      s4 === peg$FAILED
                        ? ((peg$currPos = s3), (s3 = peg$FAILED))
                        : (peg$c51.test(input.charAt(peg$currPos))
                            ? ((s5 = input.charAt(peg$currPos)), peg$currPos++)
                            : ((s5 = peg$FAILED), peg$fail(peg$c52)),
                          s5 === peg$FAILED
                            ? ((peg$currPos = s3), (s3 = peg$FAILED))
                            : ((s4 = [s4, s5]), (s3 = s4))),
                      s3 === peg$FAILED &&
                        ((s3 = peg$currPos),
                        "AL" === input.substr(peg$currPos, 2)
                          ? ((s4 = "AL"), (peg$currPos += 2))
                          : ((s4 = peg$FAILED), peg$fail(peg$c54)),
                        s4 === peg$FAILED
                          ? ((peg$currPos = s3), (s3 = peg$FAILED))
                          : (peg$c51.test(input.charAt(peg$currPos))
                              ? ((s5 = input.charAt(peg$currPos)),
                                peg$currPos++)
                              : ((s5 = peg$FAILED), peg$fail(peg$c52)),
                            s5 === peg$FAILED
                              ? ((peg$currPos = s3), (s3 = peg$FAILED))
                              : ((s4 = [s4, s5]), (s3 = s4))),
                        s3 === peg$FAILED &&
                          ((s3 = peg$currPos),
                          "SP" === input.substr(peg$currPos, 2)
                            ? ((s4 = "SP"), (peg$currPos += 2))
                            : ((s4 = peg$FAILED), peg$fail(peg$c56)),
                          s4 === peg$FAILED
                            ? ((peg$currPos = s3), (s3 = peg$FAILED))
                            : (peg$c57.test(input.charAt(peg$currPos))
                                ? ((s5 = input.charAt(peg$currPos)),
                                  peg$currPos++)
                                : ((s5 = peg$FAILED), peg$fail(peg$c58)),
                              s5 === peg$FAILED
                                ? ((peg$currPos = s3), (s3 = peg$FAILED))
                                : ((s4 = [s4, s5]), (s3 = s4))),
                          s3 === peg$FAILED &&
                            ((s3 = peg$currPos),
                            "TB" === input.substr(peg$currPos, 2)
                              ? ((s4 = "TB"), (peg$currPos += 2))
                              : ((s4 = peg$FAILED), peg$fail(peg$c60)),
                            s4 === peg$FAILED
                              ? ((peg$currPos = s3), (s3 = peg$FAILED))
                              : (peg$c42.test(input.charAt(peg$currPos))
                                  ? ((s5 = input.charAt(peg$currPos)),
                                    peg$currPos++)
                                  : ((s5 = peg$FAILED), peg$fail(peg$c43)),
                                s5 === peg$FAILED
                                  ? ((peg$currPos = s3), (s3 = peg$FAILED))
                                  : (peg$c44.test(input.charAt(peg$currPos))
                                      ? ((s6 = input.charAt(peg$currPos)),
                                        peg$currPos++)
                                      : ((s6 = peg$FAILED), peg$fail(peg$c45)),
                                    s6 === peg$FAILED && (s6 = null),
                                    s6 === peg$FAILED
                                      ? ((peg$currPos = s3), (s3 = peg$FAILED))
                                      : ((s4 = [s4, s5, s6]), (s3 = s4)))),
                            s3 === peg$FAILED &&
                              ((s3 = peg$currPos),
                              "OH" === input.substr(peg$currPos, 2)
                                ? ((s4 = "OH"), (peg$currPos += 2))
                                : ((s4 = peg$FAILED), peg$fail(peg$c62)),
                              s4 === peg$FAILED
                                ? ((peg$currPos = s3), (s3 = peg$FAILED))
                                : (peg$c42.test(input.charAt(peg$currPos))
                                    ? ((s5 = input.charAt(peg$currPos)),
                                      peg$currPos++)
                                    : ((s5 = peg$FAILED), peg$fail(peg$c43)),
                                  s5 === peg$FAILED
                                    ? ((peg$currPos = s3), (s3 = peg$FAILED))
                                    : (peg$c44.test(input.charAt(peg$currPos))
                                        ? ((s6 = input.charAt(peg$currPos)),
                                          peg$currPos++)
                                        : ((s6 = peg$FAILED),
                                          peg$fail(peg$c45)),
                                      s6 === peg$FAILED && (s6 = null),
                                      s6 === peg$FAILED
                                        ? ((peg$currPos = s3),
                                          (s3 = peg$FAILED))
                                        : ((s4 = [s4, s5, s6]),
                                          (s3 = s4))))))))),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s2 = [s2, s3]), (s1 = s2))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c63(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsecharge() {
              var s0, s1;
              return (
                (s0 = peg$currPos),
                (s1 = peg$parseposcharge()),
                s1 === peg$FAILED && (s1 = peg$parsenegcharge()),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c64(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parseposcharge() {
              var s0, s1, s2, s3, s4, s5;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                43 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "+"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c66)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (43 === input.charCodeAt(peg$currPos)
                      ? ((s3 = "+"), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c66)),
                    s3 === peg$FAILED &&
                      ((s3 = peg$currPos),
                      peg$c42.test(input.charAt(peg$currPos))
                        ? ((s4 = input.charAt(peg$currPos)), peg$currPos++)
                        : ((s4 = peg$FAILED), peg$fail(peg$c43)),
                      s4 === peg$FAILED
                        ? ((peg$currPos = s3), (s3 = peg$FAILED))
                        : (peg$c44.test(input.charAt(peg$currPos))
                            ? ((s5 = input.charAt(peg$currPos)), peg$currPos++)
                            : ((s5 = peg$FAILED), peg$fail(peg$c45)),
                          s5 === peg$FAILED && (s5 = null),
                          s5 === peg$FAILED
                            ? ((peg$currPos = s3), (s3 = peg$FAILED))
                            : ((s4 = [s4, s5]), (s3 = s4)))),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s2 = [s2, s3]), (s1 = s2))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c67(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsenegcharge() {
              var s0, s1, s2, s3, s4, s5;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                45 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "-"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c69)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (45 === input.charCodeAt(peg$currPos)
                      ? ((s3 = "-"), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c69)),
                    s3 === peg$FAILED &&
                      ((s3 = peg$currPos),
                      peg$c42.test(input.charAt(peg$currPos))
                        ? ((s4 = input.charAt(peg$currPos)), peg$currPos++)
                        : ((s4 = peg$FAILED), peg$fail(peg$c43)),
                      s4 === peg$FAILED
                        ? ((peg$currPos = s3), (s3 = peg$FAILED))
                        : (peg$c44.test(input.charAt(peg$currPos))
                            ? ((s5 = input.charAt(peg$currPos)), peg$currPos++)
                            : ((s5 = peg$FAILED), peg$fail(peg$c45)),
                          s5 === peg$FAILED && (s5 = null),
                          s5 === peg$FAILED
                            ? ((peg$currPos = s3), (s3 = peg$FAILED))
                            : ((s4 = [s4, s5]), (s3 = s4)))),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s2 = [s2, s3]), (s1 = s2))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c70(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parsehcount() {
              var s0, s1, s2, s3;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                72 === input.charCodeAt(peg$currPos)
                  ? ((s2 = "H"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c72)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (peg$c44.test(input.charAt(peg$currPos))
                      ? ((s3 = input.charAt(peg$currPos)), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c45)),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : ((s2 = [s2, s3]), (s1 = s2))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c73(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parseclass() {
              var s0, s1, s2, s3, s4, s5, s6;
              if (
                ((s0 = peg$currPos),
                (s1 = peg$currPos),
                58 === input.charCodeAt(peg$currPos)
                  ? ((s2 = ":"), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c75)),
                s2 !== peg$FAILED)
              ) {
                if (
                  ((s3 = peg$currPos),
                  peg$c42.test(input.charAt(peg$currPos))
                    ? ((s4 = input.charAt(peg$currPos)), peg$currPos++)
                    : ((s4 = peg$FAILED), peg$fail(peg$c43)),
                  s4 !== peg$FAILED)
                ) {
                  for (
                    s5 = [],
                      peg$c44.test(input.charAt(peg$currPos))
                        ? ((s6 = input.charAt(peg$currPos)), peg$currPos++)
                        : ((s6 = peg$FAILED), peg$fail(peg$c45));
                    s6 !== peg$FAILED;

                  )
                    s5.push(s6),
                      peg$c44.test(input.charAt(peg$currPos))
                        ? ((s6 = input.charAt(peg$currPos)), peg$currPos++)
                        : ((s6 = peg$FAILED), peg$fail(peg$c45));
                  s5 === peg$FAILED
                    ? ((peg$currPos = s3), (s3 = peg$FAILED))
                    : ((s4 = [s4, s5]), (s3 = s4));
                } else (peg$currPos = s3), (s3 = peg$FAILED);
                s3 === peg$FAILED &&
                  (peg$c76.test(input.charAt(peg$currPos))
                    ? ((s3 = input.charAt(peg$currPos)), peg$currPos++)
                    : ((s3 = peg$FAILED), peg$fail(peg$c77))),
                  s3 === peg$FAILED
                    ? ((peg$currPos = s1), (s1 = peg$FAILED))
                    : ((s2 = [s2, s3]), (s1 = s2));
              } else (peg$currPos = s1), (s1 = peg$FAILED);
              return (
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c78(s1))),
                (s0 = s1),
                s0
              );
            }
            function peg$parseisotope() {
              var s0, s1, s2, s3, s4;
              return (
                (s0 = peg$currPos),
                (s1 = peg$currPos),
                peg$c42.test(input.charAt(peg$currPos))
                  ? ((s2 = input.charAt(peg$currPos)), peg$currPos++)
                  : ((s2 = peg$FAILED), peg$fail(peg$c43)),
                s2 === peg$FAILED
                  ? ((peg$currPos = s1), (s1 = peg$FAILED))
                  : (peg$c44.test(input.charAt(peg$currPos))
                      ? ((s3 = input.charAt(peg$currPos)), peg$currPos++)
                      : ((s3 = peg$FAILED), peg$fail(peg$c45)),
                    s3 === peg$FAILED && (s3 = null),
                    s3 === peg$FAILED
                      ? ((peg$currPos = s1), (s1 = peg$FAILED))
                      : (peg$c44.test(input.charAt(peg$currPos))
                          ? ((s4 = input.charAt(peg$currPos)), peg$currPos++)
                          : ((s4 = peg$FAILED), peg$fail(peg$c45)),
                        s4 === peg$FAILED && (s4 = null),
                        s4 === peg$FAILED
                          ? ((peg$currPos = s1), (s1 = peg$FAILED))
                          : ((s2 = [s2, s3, s4]), (s1 = s2)))),
                s1 !== peg$FAILED && ((peg$savedPos = s0), (s1 = peg$c79(s1))),
                (s0 = s1),
                s0
              );
            }
            options = void 0 === options ? {} : options;
            var nOpenParentheses = input.split("(").length - 1,
              nCloseParentheses = input.split(")").length - 1;
            if (nOpenParentheses !== nCloseParentheses)
              throw peg$buildSimpleError(
                "The number of opening parentheses does not match the number of closing parentheses.",
                0
              );
            var peg$FAILED = {},
              peg$startRuleFunctions = { chain: peg$parsechain },
              peg$startRuleFunction = peg$parsechain,
              peg$c0 = function (s) {
                for (var branches = [], rings = [], i = 0; i < s[1].length; i++)
                  branches.push(s[1][i]);
                for (var i = 0, bond; i < s[2].length; i++)
                  (bond = s[2][i][0] ? s[2][i][0] : "-"),
                    rings.push({ bond: bond, id: s[2][i][1] });
                for (var i = 0; i < s[3].length; i++) branches.push(s[3][i]);
                for (var i = 0; i < s[6].length; i++) branches.push(s[6][i]);
                return {
                  atom: s[0],
                  isBracket: !!s[0].element,
                  branches: branches,
                  branchCount: branches.length,
                  ringbonds: rings,
                  ringbondCount: rings.length,
                  bond: s[4] ? s[4] : "-",
                  next: s[5],
                  hasNext: !!s[5],
                };
              },
              peg$c2 = peg$literalExpectation("(", !1),
              peg$c4 = peg$literalExpectation(")", !1),
              peg$c5 = function (b) {
                var bond = b[1] ? b[1] : "-";
                return (b[2].branchBond = bond), b[2];
              },
              peg$c6 = function (a) {
                return a;
              },
              peg$c7 = /^[\-=#$:\/\\.]/,
              peg$c8 = peg$classExpectation(
                ["-", "=", "#", "$", ":", "/", "\\", "."],
                !1,
                !1
              ),
              peg$c9 = function (b) {
                return b;
              },
              peg$c11 = peg$literalExpectation("[", !1),
              peg$c13 = peg$literalExpectation("se", !1),
              peg$c15 = peg$literalExpectation("as", !1),
              peg$c17 = peg$literalExpectation("]", !1),
              peg$c18 = function (b) {
                return {
                  isotope: b[1],
                  element: b[2],
                  chirality: b[3],
                  hcount: b[4],
                  charge: b[5],
                  class: b[6],
                };
              },
              peg$c20 = peg$literalExpectation("B", !1),
              peg$c22 = peg$literalExpectation("r", !1),
              peg$c24 = peg$literalExpectation("C", !1),
              peg$c26 = peg$literalExpectation("l", !1),
              peg$c27 = /^[NOPSFI]/,
              peg$c28 = peg$classExpectation(
                ["N", "O", "P", "S", "F", "I"],
                !1,
                !1
              ),
              peg$c29 = function (o) {
                return 1 < o.length ? o.join("") : o;
              },
              peg$c30 = /^[bcnops]/,
              peg$c31 = peg$classExpectation(
                ["b", "c", "n", "o", "p", "s"],
                !1,
                !1
              ),
              peg$c33 = peg$literalExpectation("*", !1),
              peg$c34 = function (w) {
                return w;
              },
              peg$c35 = /^[A-Z]/,
              peg$c36 = peg$classExpectation([["A", "Z"]], !1, !1),
              peg$c37 = /^[a-z]/,
              peg$c38 = peg$classExpectation([["a", "z"]], !1, !1),
              peg$c39 = function (e) {
                return e.join("");
              },
              peg$c41 = peg$literalExpectation("%", !1),
              peg$c42 = /^[1-9]/,
              peg$c43 = peg$classExpectation([["1", "9"]], !1, !1),
              peg$c44 = /^[0-9]/,
              peg$c45 = peg$classExpectation([["0", "9"]], !1, !1),
              peg$c46 = function (r) {
                return 1 == r.length ? +r : +r.join("").replace("%", "");
              },
              peg$c48 = peg$literalExpectation("@", !1),
              peg$c50 = peg$literalExpectation("TH", !1),
              peg$c51 = /^[12]/,
              peg$c52 = peg$classExpectation(["1", "2"], !1, !1),
              peg$c54 = peg$literalExpectation("AL", !1),
              peg$c56 = peg$literalExpectation("SP", !1),
              peg$c57 = /^[1-3]/,
              peg$c58 = peg$classExpectation([["1", "3"]], !1, !1),
              peg$c60 = peg$literalExpectation("TB", !1),
              peg$c62 = peg$literalExpectation("OH", !1),
              peg$c63 = function (c) {
                return c[1]
                  ? "@" == c[1]
                    ? "@@"
                    : c[1].join("").replace(",", "")
                  : "@";
              },
              peg$c64 = function (c) {
                return c;
              },
              peg$c66 = peg$literalExpectation("+", !1),
              peg$c67 = function (c) {
                return c[1] ? ("+" == c[1] ? 2 : +c[1].join("")) : 1;
              },
              peg$c69 = peg$literalExpectation("-", !1),
              peg$c70 = function (c) {
                return c[1] ? ("-" == c[1] ? -2 : -+c[1].join("")) : -1;
              },
              peg$c72 = peg$literalExpectation("H", !1),
              peg$c73 = function (h) {
                return h[1] ? +h[1] : 1;
              },
              peg$c75 = peg$literalExpectation(":", !1),
              peg$c76 = /^[0]/,
              peg$c77 = peg$classExpectation(["0"], !1, !1),
              peg$c78 = function (c) {
                return +(c[1][0] + c[1][1].join(""));
              },
              peg$c79 = function (i) {
                return +i.join("");
              },
              peg$currPos = 0,
              peg$savedPos = 0,
              peg$posDetailsCache = [{ line: 1, column: 1 }],
              peg$maxFailPos = 0,
              peg$maxFailExpected = [],
              peg$result;
            if ("startRule" in options) {
              if (!(options.startRule in peg$startRuleFunctions))
                throw new Error(
                  "Can't start parsing from rule \"" + options.startRule + '".'
                );
              peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
            }
            if (
              ((peg$result = peg$startRuleFunction()),
              peg$result !== peg$FAILED && peg$currPos === input.length)
            )
              return peg$result;
            throw (
              (peg$result !== peg$FAILED &&
                peg$currPos < input.length &&
                peg$fail(
                  (function () {
                    return { type: "end" };
                  })()
                ),
              (function (expected, found, location) {
                return new peg$SyntaxError(
                  peg$SyntaxError.buildMessage(expected, found),
                  expected,
                  found,
                  location
                );
              })(
                peg$maxFailExpected,
                peg$maxFailPos < input.length
                  ? input.charAt(peg$maxFailPos)
                  : null,
                peg$maxFailPos < input.length
                  ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
                  : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
              ))
            );
          }
          return (
            (function (child, parent) {
              function ctor() {
                this.constructor = child;
              }
              (ctor.prototype = parent.prototype),
                (child.prototype = new ctor());
            })(peg$SyntaxError, Error),
            (peg$SyntaxError.buildMessage = function (expected, found) {
              function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
              }
              function literalEscape(s) {
                return s
                  .replace(/\\/g, "\\\\")
                  .replace(/"/g, '\\"')
                  .replace(/\0/g, "\\0")
                  .replace(/\t/g, "\\t")
                  .replace(/\n/g, "\\n")
                  .replace(/\r/g, "\\r")
                  .replace(/[\x00-\x0F]/g, function (ch) {
                    return "\\x0" + hex(ch);
                  })
                  .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
                    return "\\x" + hex(ch);
                  });
              }
              function classEscape(s) {
                return s
                  .replace(/\\/g, "\\\\")
                  .replace(/\]/g, "\\]")
                  .replace(/\^/g, "\\^")
                  .replace(/-/g, "\\-")
                  .replace(/\0/g, "\\0")
                  .replace(/\t/g, "\\t")
                  .replace(/\n/g, "\\n")
                  .replace(/\r/g, "\\r")
                  .replace(/[\x00-\x0F]/g, function (ch) {
                    return "\\x0" + hex(ch);
                  })
                  .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
                    return "\\x" + hex(ch);
                  });
              }
              function describeExpectation(expectation) {
                return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
              }
              var DESCRIBE_EXPECTATION_FNS = {
                literal: function (expectation) {
                  return '"' + literalEscape(expectation.text) + '"';
                },
                class: function (expectation) {
                  var escapedParts = "",
                    i;
                  for (i = 0; i < expectation.parts.length; i++)
                    escapedParts +=
                      expectation.parts[i] instanceof Array
                        ? classEscape(expectation.parts[i][0]) +
                          "-" +
                          classEscape(expectation.parts[i][1])
                        : classEscape(expectation.parts[i]);
                  return (
                    "[" + (expectation.inverted ? "^" : "") + escapedParts + "]"
                  );
                },
                any: function () {
                  return "any character";
                },
                end: function () {
                  return "end of input";
                },
                other: function (expectation) {
                  return expectation.description;
                },
              };
              return (
                "Expected " +
                (function (expected) {
                  var descriptions = Array(expected.length),
                    i,
                    j;
                  for (i = 0; i < expected.length; i++)
                    descriptions[i] = describeExpectation(expected[i]);
                  if ((descriptions.sort(), 0 < descriptions.length)) {
                    for (i = 1, j = 1; i < descriptions.length; i++)
                      descriptions[i - 1] !== descriptions[i] &&
                        ((descriptions[j] = descriptions[i]), j++);
                    descriptions.length = j;
                  }
                  switch (descriptions.length) {
                    case 1:
                      return descriptions[0];
                    case 2:
                      return descriptions[0] + " or " + descriptions[1];
                    default:
                      return (
                        descriptions.slice(0, -1).join(", ") +
                        ", or " +
                        descriptions[descriptions.length - 1]
                      );
                  }
                })(expected) +
                " but " +
                (function (found) {
                  return found
                    ? '"' + literalEscape(found) + '"'
                    : "end of input";
                })(found) +
                " found."
              );
            }),
            { SyntaxError: peg$SyntaxError, parse: peg$parse }
          );
        })();
      },
      {},
    ],
    11: [
      function (require, module) {
        "use strict";
        const ArrayHelper = require("./ArrayHelper"),
          Vector2 = require("./Vector2"),
          Vertex = require("./Vertex"),
          RingConnection = require("./RingConnection");
        class Ring {
          constructor(members) {
            (this.id = null),
              (this.members = members),
              (this.edges = []),
              (this.insiders = []),
              (this.neighbours = []),
              (this.positioned = !1),
              (this.center = new Vector2(0, 0)),
              (this.rings = []),
              (this.isBridged = !1),
              (this.isPartOfBridged = !1),
              (this.isSpiro = !1),
              (this.isFused = !1),
              (this.centralAngle = 0),
              (this.canFlip = !0);
          }
          clone() {
            let clone = new Ring(this.members);
            return (
              (clone.id = this.id),
              (clone.insiders = ArrayHelper.clone(this.insiders)),
              (clone.neighbours = ArrayHelper.clone(this.neighbours)),
              (clone.positioned = this.positioned),
              (clone.center = this.center.clone()),
              (clone.rings = ArrayHelper.clone(this.rings)),
              (clone.isBridged = this.isBridged),
              (clone.isPartOfBridged = this.isPartOfBridged),
              (clone.isSpiro = this.isSpiro),
              (clone.isFused = this.isFused),
              (clone.centralAngle = this.centralAngle),
              (clone.canFlip = this.canFlip),
              clone
            );
          }
          getSize() {
            return this.members.length;
          }
          getPolygon(vertices) {
            let polygon = [];
            for (let i = 0; i < this.members.length; i++)
              polygon.push(vertices[this.members[i]].position);
            return polygon;
          }
          getAngle() {
            return Math.PI - this.centralAngle;
          }
          eachMember(vertices, callback, startVertexId, previousVertexId) {
            startVertexId =
              startVertexId || 0 === startVertexId
                ? startVertexId
                : this.members[0];
            let current = startVertexId,
              max = 0;
            for (; null != current && 100 > max; ) {
              let prev = current;
              callback(prev),
                (current = vertices[current].getNextInRing(
                  vertices,
                  this.id,
                  previousVertexId
                )),
                (previousVertexId = prev),
                current == startVertexId && (current = null),
                max++;
            }
          }
          getOrderedNeighbours(ringConnections) {
            let orderedNeighbours = Array(this.neighbours.length);
            for (let i = 0, vertices; i < this.neighbours.length; i++)
              (vertices = RingConnection.getVertices(
                ringConnections,
                this.id,
                this.neighbours[i]
              )),
                (orderedNeighbours[i] = {
                  n: vertices.length,
                  neighbour: this.neighbours[i],
                });
            return (
              orderedNeighbours.sort(function (a, b) {
                return b.n - a.n;
              }),
              orderedNeighbours
            );
          }
          isBenzeneLike(vertices) {
            let db = this.getDoubleBondCount(vertices),
              length = this.members.length;
            return (3 === db && 6 === length) || (2 === db && 5 === length);
          }
          getDoubleBondCount(vertices) {
            let doubleBondCount = 0;
            for (let i = 0, atom; i < this.members.length; i++)
              (atom = vertices[this.members[i]].value),
                ("=" === atom.bondType || "=" === atom.branchBond) &&
                  doubleBondCount++;
            return doubleBondCount;
          }
          contains(vertexId) {
            for (let i = 0; i < this.members.length; i++)
              if (this.members[i] == vertexId) return !0;
            return !1;
          }
        }
        module.exports = Ring;
      },
      {
        "./ArrayHelper": 2,
        "./RingConnection": 12,
        "./Vector2": 18,
        "./Vertex": 19,
      },
    ],
    12: [
      function (require, module) {
        "use strict";
        const Vertex = require("./Vertex"),
          Ring = require("./Ring");
        module.exports = class {
          constructor(firstRing, secondRing) {
            (this.id = null),
              (this.firstRingId = firstRing.id),
              (this.secondRingId = secondRing.id),
              (this.vertices = new Set());
            for (var m = 0; m < firstRing.members.length; m++) {
              let c = firstRing.members[m];
              for (let n = 0, d; n < secondRing.members.length; n++)
                (d = secondRing.members[n]), c === d && this.addVertex(c);
            }
          }
          addVertex(vertexId) {
            this.vertices.add(vertexId);
          }
          updateOther(ringId, otherRingId) {
            this.firstRingId === otherRingId
              ? (this.secondRingId = ringId)
              : (this.firstRingId = ringId);
          }
          containsRing(ringId) {
            return this.firstRingId === ringId || this.secondRingId === ringId;
          }
          isBridge(vertices) {
            if (2 < this.vertices.size) return !0;
            for (let vertexId of this.vertices)
              if (2 < vertices[vertexId].value.rings.length) return !0;
            return !1;
          }
          static isBridge(
            ringConnections,
            vertices,
            firstRingId,
            secondRingId
          ) {
            let ringConnection = null;
            for (let i = 0; i < ringConnections.length; i++)
              if (
                ((ringConnection = ringConnections[i]),
                (ringConnection.firstRingId === firstRingId &&
                  ringConnection.secondRingId === secondRingId) ||
                  (ringConnection.firstRingId === secondRingId &&
                    ringConnection.secondRingId === firstRingId))
              )
                return ringConnection.isBridge(vertices);
            return !1;
          }
          static getNeighbours(ringConnections, ringId) {
            let neighbours = [];
            for (let i = 0, ringConnection; i < ringConnections.length; i++)
              (ringConnection = ringConnections[i]),
                ringConnection.firstRingId === ringId
                  ? neighbours.push(ringConnection.secondRingId)
                  : ringConnection.secondRingId === ringId &&
                    neighbours.push(ringConnection.firstRingId);
            return neighbours;
          }
          static getVertices(ringConnections, firstRingId, secondRingId) {
            for (let i = 0, ringConnection; i < ringConnections.length; i++)
              if (
                ((ringConnection = ringConnections[i]),
                (ringConnection.firstRingId === firstRingId &&
                  ringConnection.secondRingId === secondRingId) ||
                  (ringConnection.firstRingId === secondRingId &&
                    ringConnection.secondRingId === firstRingId))
              )
                return [...ringConnection.vertices];
          }
        };
      },
      { "./Ring": 11, "./Vertex": 19 },
    ],
    13: [
      function (require, module) {
        "use strict";
        const Graph = require("./Graph");
        class SSSR {
          static getRings(graph, experimental = !1) {
            let adjacencyMatrix = graph.getComponentsAdjacencyMatrix();
            if (0 === adjacencyMatrix.length) return null;
            let connectedComponents =
                Graph.getConnectedComponents(adjacencyMatrix),
              rings = [];
            for (var i = 0; i < connectedComponents.length; i++) {
              let connectedComponent = connectedComponents[i],
                ccAdjacencyMatrix = graph.getSubgraphAdjacencyMatrix([
                  ...connectedComponent,
                ]),
                arrBondCount = new Uint16Array(ccAdjacencyMatrix.length),
                arrRingCount = new Uint16Array(ccAdjacencyMatrix.length);
              for (var j = 0; j < ccAdjacencyMatrix.length; j++) {
                (arrRingCount[j] = 0), (arrBondCount[j] = 0);
                for (var k = 0; k < ccAdjacencyMatrix[j].length; k++)
                  arrBondCount[j] += ccAdjacencyMatrix[j][k];
              }
              let nEdges = 0;
              for (var j = 0; j < ccAdjacencyMatrix.length; j++)
                for (var k = j + 1; k < ccAdjacencyMatrix.length; k++)
                  nEdges += ccAdjacencyMatrix[j][k];
              let nSssr = nEdges - ccAdjacencyMatrix.length + 1,
                allThree = !0;
              for (var j = 0; j < arrBondCount.length; j++)
                3 !== arrBondCount[j] && (allThree = !1);
              if (
                (allThree && (nSssr = 2 + nEdges - ccAdjacencyMatrix.length),
                1 == nSssr)
              ) {
                rings.push([...connectedComponent]);
                continue;
              }
              experimental && (nSssr = 999);
              let { d, pe, pe_prime } =
                  SSSR.getPathIncludedDistanceMatrices(ccAdjacencyMatrix),
                c = SSSR.getRingCandidates(d, pe, pe_prime),
                sssr = SSSR.getSSSR(
                  c,
                  d,
                  ccAdjacencyMatrix,
                  pe,
                  pe_prime,
                  arrBondCount,
                  arrRingCount,
                  nSssr
                );
              for (var j = 0; j < sssr.length; j++) {
                let ring = Array(sssr[j].size),
                  index = 0;
                for (let val of sssr[j])
                  ring[index++] = connectedComponent[val];
                rings.push(ring);
              }
            }
            return rings;
          }
          static matrixToString(matrix) {
            let str = "";
            for (var i = 0; i < matrix.length; i++) {
              for (var j = 0; j < matrix[i].length; j++)
                str += matrix[i][j] + " ";
              str += "\n";
            }
            return str;
          }
          static getPathIncludedDistanceMatrices(adjacencyMatrix) {
            var _NumberPOSITIVE_INFINITY = Number.POSITIVE_INFINITY;
            let length = adjacencyMatrix.length,
              d = Array(length),
              pe = Array(length),
              pe_prime = Array(length);
            for (var l = 0, m = 0, n = 0, i = length; i--; ) {
              (d[i] = Array(length)),
                (pe[i] = Array(length)),
                (pe_prime[i] = Array(length));
              for (var j = length; j--; )
                (d[i][j] =
                  i === j || 1 === adjacencyMatrix[i][j]
                    ? adjacencyMatrix[i][j]
                    : _NumberPOSITIVE_INFINITY),
                  (pe[i][j] = 1 === d[i][j] ? [[[i, j]]] : []),
                  (pe_prime[i][j] = []);
            }
            for (var k = length, j; k--; )
              for (i = length; i--; )
                for (j = length; j--; ) {
                  const previousPathLength = d[i][j],
                    newPathLength = d[i][k] + d[k][j];
                  if (previousPathLength > newPathLength) {
                    var l, m, n;
                    if (previousPathLength === newPathLength + 1)
                      for (
                        pe_prime[i][j] = [pe[i][j].length], l = pe[i][j].length;
                        l--;

                      )
                        for (
                          pe_prime[i][j][l] = [pe[i][j][l].length],
                            m = pe[i][j][l].length;
                          m--;

                        )
                          for (
                            pe_prime[i][j][l][m] = [pe[i][j][l][m].length],
                              n = pe[i][j][l][m].length;
                            n--;

                          )
                            pe_prime[i][j][l][m][n] = [
                              pe[i][j][l][m][0],
                              pe[i][j][l][m][1],
                            ];
                    else pe_prime[i][j] = [];
                    for (
                      d[i][j] = newPathLength,
                        pe[i][j] = [[]],
                        l = pe[i][k][0].length;
                      l--;

                    )
                      pe[i][j][0].push(pe[i][k][0][l]);
                    for (l = pe[k][j][0].length; l--; )
                      pe[i][j][0].push(pe[k][j][0][l]);
                  } else if (previousPathLength === newPathLength) {
                    if (pe[i][k].length && pe[k][j].length) {
                      var l;
                      if (pe[i][j].length) {
                        let tmp = [];
                        for (l = pe[i][k][0].length; l--; )
                          tmp.push(pe[i][k][0][l]);
                        for (l = pe[k][j][0].length; l--; )
                          tmp.push(pe[k][j][0][l]);
                        pe[i][j].push(tmp);
                      } else {
                        let tmp = [];
                        for (l = pe[i][k][0].length; l--; )
                          tmp.push(pe[i][k][0][l]);
                        for (l = pe[k][j][0].length; l--; )
                          tmp.push(pe[k][j][0][l]);
                        pe[i][j][0] = tmp;
                      }
                    }
                  } else if (previousPathLength === newPathLength - 1) {
                    var l;
                    if (pe_prime[i][j].length) {
                      let tmp = [];
                      for (l = pe[i][k][0].length; l--; )
                        tmp.push(pe[i][k][0][l]);
                      for (l = pe[k][j][0].length; l--; )
                        tmp.push(pe[k][j][0][l]);
                      pe_prime[i][j].push(tmp);
                    } else {
                      let tmp = [];
                      for (l = pe[i][k][0].length; l--; )
                        tmp.push(pe[i][k][0][l]);
                      for (l = pe[k][j][0].length; l--; )
                        tmp.push(pe[k][j][0][l]);
                      pe_prime[i][j][0] = tmp;
                    }
                  }
                }
            return { d: d, pe: pe, pe_prime: pe_prime };
          }
          static getRingCandidates(d, pe, pe_prime) {
            let length = d.length,
              candidates = [],
              c = 0;
            for (let i = 0; i < length; i++)
              for (let j = 0; j < length; j++)
                if (
                  0 === d[i][j] ||
                  (1 === pe[i][j].length && 0 === pe_prime[i][j])
                )
                  continue;
                else
                  (c =
                    0 === pe_prime[i][j].length
                      ? 2 * d[i][j]
                      : 2 * (d[i][j] + 0.5)),
                    c !== 1 / 0 &&
                      candidates.push([c, pe[i][j], pe_prime[i][j]]);
            return (
              candidates.sort(function (a, b) {
                return a[0] - b[0];
              }),
              candidates
            );
          }
          static getSSSR(
            c,
            d,
            adjacencyMatrix,
            pe,
            pe_prime,
            arrBondCount,
            arrRingCount,
            nsssr
          ) {
            let cSssr = [],
              allBonds = [];
            for (let i = 0; i < c.length; i++)
              if (0 != c[i][0] % 2)
                for (let j = 0, bonds; j < c[i][2].length; j++) {
                  bonds = c[i][1][0].concat(c[i][2][j]);
                  for (var k = 0; k < bonds.length; k++)
                    bonds[k][0].constructor === Array &&
                      (bonds[k] = bonds[k][0]);
                  let atoms = SSSR.bondsToAtoms(bonds);
                  if (
                    (SSSR.getBondCount(atoms, adjacencyMatrix) !== atoms.size ||
                      SSSR.pathSetsContain(
                        cSssr,
                        atoms,
                        bonds,
                        allBonds,
                        arrBondCount,
                        arrRingCount
                      ) ||
                      (cSssr.push(atoms), (allBonds = allBonds.concat(bonds))),
                    cSssr.length > nsssr)
                  )
                    return cSssr;
                }
              else
                for (let j = 0, bonds; j < c[i][1].length - 1; j++) {
                  bonds = c[i][1][j].concat(c[i][1][j + 1]);
                  for (var k = 0; k < bonds.length; k++)
                    bonds[k][0].constructor === Array &&
                      (bonds[k] = bonds[k][0]);
                  let atoms = SSSR.bondsToAtoms(bonds);
                  if (
                    (SSSR.getBondCount(atoms, adjacencyMatrix) !== atoms.size ||
                      SSSR.pathSetsContain(
                        cSssr,
                        atoms,
                        bonds,
                        allBonds,
                        arrBondCount,
                        arrRingCount
                      ) ||
                      (cSssr.push(atoms), (allBonds = allBonds.concat(bonds))),
                    cSssr.length > nsssr)
                  )
                    return cSssr;
                }
            return cSssr;
          }
          static getEdgeCount(adjacencyMatrix) {
            let edgeCount = 0,
              length = adjacencyMatrix.length;
            for (var i = length - 1; i--; )
              for (var j = length; j--; )
                1 === adjacencyMatrix[i][j] && edgeCount++;
            return edgeCount;
          }
          static getEdgeList(adjacencyMatrix) {
            let length = adjacencyMatrix.length,
              edgeList = [];
            for (var i = length - 1; i--; )
              for (var j = length; j--; )
                1 === adjacencyMatrix[i][j] && edgeList.push([i, j]);
            return edgeList;
          }
          static bondsToAtoms(bonds) {
            let atoms = new Set();
            for (var i = bonds.length; i--; )
              atoms.add(bonds[i][0]), atoms.add(bonds[i][1]);
            return atoms;
          }
          static getBondCount(atoms, adjacencyMatrix) {
            let count = 0;
            for (let u of atoms)
              for (let v of atoms) u !== v && (count += adjacencyMatrix[u][v]);
            return count / 2;
          }
          static pathSetsContain(
            pathSets,
            pathSet,
            bonds,
            allBonds,
            arrBondCount,
            arrRingCount
          ) {
            for (var i = pathSets.length; i--; ) {
              if (SSSR.isSupersetOf(pathSet, pathSets[i])) return !0;
              if (
                pathSets[i].size === pathSet.size &&
                SSSR.areSetsEqual(pathSets[i], pathSet)
              )
                return !0;
            }
            let count = 0,
              allContained = !1;
            for (i = bonds.length; i--; )
              for (var j = allBonds.length; j--; )
                ((bonds[i][0] === allBonds[j][0] &&
                  bonds[i][1] === allBonds[j][1]) ||
                  (bonds[i][1] === allBonds[j][0] &&
                    bonds[i][0] === allBonds[j][1])) &&
                  count++,
                  count === bonds.length && (allContained = !0);
            let specialCase = !1;
            if (allContained)
              for (let element of pathSet)
                if (arrRingCount[element] < arrBondCount[element]) {
                  specialCase = !0;
                  break;
                }
            if (allContained && !specialCase) return !0;
            for (let element of pathSet) arrRingCount[element]++;
            return !1;
          }
          static areSetsEqual(setA, setB) {
            if (setA.size !== setB.size) return !1;
            for (let element of setA) if (!setB.has(element)) return !1;
            return !0;
          }
          static isSupersetOf(setA, setB) {
            for (var element of setB) if (!setA.has(element)) return !1;
            return !0;
          }
        }
        module.exports = SSSR;
      },
      { "./Graph": 7 },
    ],
    14: [
      function (require, module) {
        "use strict";
        var _Mathabs2 = Math.abs,
          _MathPI3 = Math.PI;
        const ArrayHelper = require("./ArrayHelper"),
          Atom = require("./Atom"),
          Drawer = require("./Drawer"),
          Graph = require("./Graph"),
          Line = require("./Line"),
          SvgWrapper = require("./SvgWrapper"),
          ThemeManager = require("./ThemeManager"),
          Vector2 = require("./Vector2");
        module.exports = class {
          constructor(options) {
            this.preprocessor = new Drawer(options);
          }
          draw(data, target, themeName = "light", infoOnly = !1) {
            let preprocessor = this.preprocessor;
            return (
              preprocessor.initDraw(data, themeName, infoOnly),
              infoOnly ||
                ((this.themeManager = new ThemeManager(
                  this.preprocessor.opts.themes,
                  themeName
                )),
                (this.svgWrapper = new SvgWrapper(
                  this.themeManager,
                  target,
                  this.preprocessor.opts
                ))),
              preprocessor.processGraph(),
              this.svgWrapper.determineDimensions(preprocessor.graph.vertices),
              this.drawEdges(preprocessor.opts.debug),
              this.drawVertices(preprocessor.opts.debug),
              preprocessor.opts.debug &&
                (console.log(preprocessor.graph),
                console.log(preprocessor.rings),
                console.log(preprocessor.ringConnections)),
              this.svgWrapper.constructSvg()
            );
          }
          drawAromaticityRing(ring) {
            let ctx = this.ctx,
              radius = MathHelper.apothemFromSideLength(
                this.opts.bondLength,
                ring.getSize()
              );
            ctx.save(),
              (ctx.strokeStyle = this.getColor("C")),
              (ctx.lineWidth = this.opts.bondThickness),
              ctx.beginPath(),
              ctx.arc(
                ring.center.x + this.offsetX,
                ring.center.y + this.offsetY,
                radius - this.opts.bondSpacing,
                0,
                2 * _MathPI3,
                !0
              ),
              ctx.closePath(),
              ctx.stroke(),
              ctx.restore();
          }
          drawEdges(debug) {
            let preprocessor = this.preprocessor,
              graph = preprocessor.graph,
              rings = preprocessor.rings,
              drawn = Array(this.preprocessor.graph.edges.length);
            if (
              (drawn.fill(!1),
              graph.traverseBF(0, (vertex) => {
                let edges = graph.getEdges(vertex.id);
                for (var i = 0; i < edges.length; i++) {
                  let edgeId = edges[i];
                  drawn[edgeId] ||
                    ((drawn[edgeId] = !0), this.drawEdge(edgeId, debug));
                }
              }),
              !this.bridgedRing)
            )
              for (var i = 0; i < rings.length; i++) {
                let ring = rings[i];
                preprocessor.isRingAromatic(ring) &&
                  this.drawAromaticityRing(ring);
              }
          }
          drawEdge(edgeId, debug) {
            let preprocessor = this.preprocessor,
              opts = preprocessor.opts,
              svgWrapper = this.svgWrapper,
              edge = preprocessor.graph.edges[edgeId],
              vertexA = preprocessor.graph.vertices[edge.sourceId],
              vertexB = preprocessor.graph.vertices[edge.targetId],
              elementA = vertexA.value.element,
              elementB = vertexB.value.element;
            if (
              (vertexA.value.isDrawn && vertexB.value.isDrawn) ||
              "default" !== preprocessor.opts.atomVisualization
            ) {
              let a = vertexA.position,
                b = vertexB.position,
                normals = preprocessor.getEdgeNormals(edge),
                sides = ArrayHelper.clone(normals);
              if (
                (sides[0].multiplyScalar(10).add(a),
                sides[1].multiplyScalar(10).add(a),
                "=" === edge.bondType ||
                  "=" === preprocessor.getRingbondType(vertexA, vertexB) ||
                  (edge.isPartOfAromaticRing && preprocessor.bridgedRing))
              ) {
                let inRing = preprocessor.areVerticesInSameRing(
                    vertexA,
                    vertexB
                  ),
                  s = preprocessor.chooseSide(vertexA, vertexB, sides);
                if (inRing) {
                  let lcr = preprocessor.getLargestOrAromaticCommonRing(
                      vertexA,
                      vertexB
                    ),
                    center = lcr.center;
                  normals[0].multiplyScalar(opts.bondSpacing),
                    normals[1].multiplyScalar(opts.bondSpacing);
                  let line = null;
                  (line = center.sameSideAs(
                    vertexA.position,
                    vertexB.position,
                    Vector2.add(a, normals[0])
                  )
                    ? new Line(
                        Vector2.add(a, normals[0]),
                        Vector2.add(b, normals[0]),
                        elementA,
                        elementB
                      )
                    : new Line(
                        Vector2.add(a, normals[1]),
                        Vector2.add(b, normals[1]),
                        elementA,
                        elementB
                      )),
                    line.shorten(
                      opts.bondLength - opts.shortBondLength * opts.bondLength
                    ),
                    edge.isPartOfAromaticRing
                      ? svgWrapper.drawLine(line, !0)
                      : svgWrapper.drawLine(line),
                    svgWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else if (
                  edge.center ||
                  (vertexA.isTerminal() && vertexB.isTerminal()) ||
                  (0 == s.anCount && 1 < s.bnCount) ||
                  (0 == s.bnCount && 1 < s.anCount)
                ) {
                  this.multiplyNormals(normals, opts.halfBondSpacing);
                  let lineA = new Line(
                      Vector2.add(a, normals[0]),
                      Vector2.add(b, normals[0]),
                      elementA,
                      elementB
                    ),
                    lineB = new Line(
                      Vector2.add(a, normals[1]),
                      Vector2.add(b, normals[1]),
                      elementA,
                      elementB
                    );
                  svgWrapper.drawLine(lineA), svgWrapper.drawLine(lineB);
                } else if (
                  s.sideCount[0] > s.sideCount[1] ||
                  s.totalSideCount[0] > s.totalSideCount[1]
                ) {
                  this.multiplyNormals(normals, opts.bondSpacing);
                  let line = new Line(
                    Vector2.add(a, normals[0]),
                    Vector2.add(b, normals[0]),
                    elementA,
                    elementB
                  );
                  line.shorten(
                    opts.bondLength - opts.shortBondLength * opts.bondLength
                  ),
                    svgWrapper.drawLine(line),
                    svgWrapper.drawLine(new Line(a, b, elementA, elementB));
                } else if (
                  s.sideCount[0] < s.sideCount[1] ||
                  s.totalSideCount[0] <= s.totalSideCount[1]
                ) {
                  this.multiplyNormals(normals, opts.bondSpacing);
                  let line = new Line(
                    Vector2.add(a, normals[1]),
                    Vector2.add(b, normals[1]),
                    elementA,
                    elementB
                  );
                  line.shorten(
                    opts.bondLength - opts.shortBondLength * opts.bondLength
                  ),
                    svgWrapper.drawLine(line),
                    svgWrapper.drawLine(new Line(a, b, elementA, elementB));
                }
              } else if ("#" === edge.bondType) {
                normals[0].multiplyScalar(opts.bondSpacing / 1.5),
                  normals[1].multiplyScalar(opts.bondSpacing / 1.5);
                let lineA = new Line(
                    Vector2.add(a, normals[0]),
                    Vector2.add(b, normals[0]),
                    elementA,
                    elementB
                  ),
                  lineB = new Line(
                    Vector2.add(a, normals[1]),
                    Vector2.add(b, normals[1]),
                    elementA,
                    elementB
                  );
                svgWrapper.drawLine(lineA),
                  svgWrapper.drawLine(lineB),
                  svgWrapper.drawLine(new Line(a, b, elementA, elementB));
              } else if ("." === edge.bondType);
              else {
                let isChiralCenterA = vertexA.value.isStereoCenter,
                  isChiralCenterB = vertexB.value.isStereoCenter;
                "up" === edge.wedge
                  ? svgWrapper.drawWedge(
                      new Line(
                        a,
                        b,
                        elementA,
                        elementB,
                        isChiralCenterA,
                        isChiralCenterB
                      )
                    )
                  : "down" === edge.wedge
                  ? svgWrapper.drawDashedWedge(
                      new Line(
                        a,
                        b,
                        elementA,
                        elementB,
                        isChiralCenterA,
                        isChiralCenterB
                      )
                    )
                  : svgWrapper.drawLine(
                      new Line(
                        a,
                        b,
                        elementA,
                        elementB,
                        isChiralCenterA,
                        isChiralCenterB
                      )
                    );
              }
              if (debug) {
                let midpoint = Vector2.midpoint(a, b);
                svgWrapper.drawDebugText(
                  midpoint.x,
                  midpoint.y,
                  "e: " + edgeId
                );
              }
            }
          }
          drawVertices(debug) {
            let preprocessor = this.preprocessor,
              opts = preprocessor.opts,
              graph = preprocessor.graph,
              rings = preprocessor.rings,
              svgWrapper = this.svgWrapper;
            for (
              var i = graph.vertices.length, i = 0;
              i < graph.vertices.length;
              i++
            ) {
              let vertex = graph.vertices[i],
                atom = vertex.value,
                charge = 0,
                isotope = 0,
                bondCount = vertex.value.bondCount,
                element = atom.element,
                hydrogens = Atom.maxBonds[element] - bondCount,
                dir = vertex.getTextDirection(graph.vertices),
                isTerminal =
                  !!(
                    opts.terminalCarbons ||
                    "C" !== element ||
                    atom.hasAttachedPseudoElements
                  ) && vertex.isTerminal(),
                isCarbon = "C" === atom.element;
              if (
                ("N" === atom.element &&
                  atom.isPartOfAromaticRing &&
                  (hydrogens = 0),
                atom.bracket &&
                  ((hydrogens = atom.bracket.hcount),
                  (charge = atom.bracket.charge),
                  (isotope = atom.bracket.isotope)),
                "allballs" === opts.atomVisualization)
              )
                svgWrapper.drawBall(
                  vertex.position.x,
                  vertex.position.y,
                  element
                );
              else if (
                (atom.isDrawn &&
                  (!isCarbon ||
                    atom.drawExplicit ||
                    isTerminal ||
                    atom.hasAttachedPseudoElements)) ||
                1 === graph.vertices.length
              )
                "default" === opts.atomVisualization
                  ? svgWrapper.drawText(
                      vertex.position.x,
                      vertex.position.y,
                      element,
                      hydrogens,
                      dir,
                      isTerminal,
                      charge,
                      isotope,
                      atom.getAttachedPseudoElements()
                    )
                  : "balls" === opts.atomVisualization &&
                    svgWrapper.drawBall(
                      vertex.position.x,
                      vertex.position.y,
                      element
                    );
              else if (
                2 === vertex.getNeighbourCount() &&
                !0 == vertex.forcePositioned
              ) {
                let a = graph.vertices[vertex.neighbours[0]].position,
                  b = graph.vertices[vertex.neighbours[1]].position,
                  angle = Vector2.threePointangle(vertex.position, a, b);
                0.1 > _Mathabs2(_MathPI3 - angle) &&
                  svgWrapper.drawPoint(
                    vertex.position.x,
                    vertex.position.y,
                    element
                  );
              }
              if (debug) {
                let value =
                  "v: " + vertex.id + " " + ArrayHelper.print(atom.ringbonds);
                svgWrapper.drawDebugText(
                  vertex.position.x,
                  vertex.position.y,
                  value
                );
              } else
                svgWrapper.drawDebugText(
                  vertex.position.x,
                  vertex.position.y,
                  vertex.value.chirality
                );
            }
            if (opts.debug)
              for (var i = 0; i < rings.length; i++) {
                let center = rings[i].center;
                svgWrapper.drawDebugPoint(
                  center.x,
                  center.y,
                  "r: " + rings[i].id
                );
              }
          }
          getTotalOverlapScore() {
            return this.preprocessor.getTotalOverlapScore();
          }
          getMolecularFormula() {
            return this.preprocessor.getMolecularFormula();
          }
          multiplyNormals(normals, spacing) {
            normals[0].multiplyScalar(spacing),
              normals[1].multiplyScalar(spacing);
          }
        };
      },
      {
        "./ArrayHelper": 2,
        "./Atom": 3,
        "./Drawer": 5,
        "./Graph": 7,
        "./Line": 8,
        "./SvgWrapper": 15,
        "./ThemeManager": 16,
        "./Vector2": 18,
      },
    ],
    15: [
      function (require, module) {
        "use strict";
        var _NumberMAX_VALUE2 = Number.MAX_VALUE;
        const { getChargeText } = require("./UtilityFunctions"),
          Line = require("./Line"),
          Vector2 = require("./Vector2");
        module.exports = class {
          constructor(themeManager, target, options) {
            (this.svg = document.getElementById(target)),
              (this.opts = options),
              (this.gradientId = 0),
              (this.paths = []),
              (this.vertices = []),
              (this.gradients = []),
              (this.offsetX = 0),
              (this.offsetY = 0),
              (this.drawingWidth = 0),
              (this.drawingHeight = 0),
              (this.halfBondThickness = this.opts.bondThickness / 2),
              (this.themeManager = themeManager),
              (this.maskElements = []);
            let mask = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect"
            );
            for (
              mask.setAttributeNS(null, "x", 0),
                mask.setAttributeNS(null, "y", 0),
                mask.setAttributeNS(null, "width", "100%"),
                mask.setAttributeNS(null, "height", "100%"),
                mask.setAttributeNS(null, "fill", "white"),
                this.maskElements.push(mask);
              this.svg.firstChild;

            )
              this.svg.removeChild(this.svg.firstChild);
          }
          constructSvg() {
            let defs = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "defs"
              ),
              masks = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "mask"
              ),
              style = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "style"
              ),
              paths = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
              ),
              vertices = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
              ),
              pathChildNodes = this.paths;
            masks.setAttributeNS(null, "id", "text-mask"),
              style.appendChild(
                document.createTextNode(`
                .element {
                    font: ${this.opts.fontSizeLarge}pt Helvetica, Arial, sans-serif;
                    alignment-baseline: 'middle';
                }
                .sub {
                    font: ${this.opts.fontSizeSmall}pt Helvetica, Arial, sans-serif;
                }
            `)
              );
            for (let path of pathChildNodes) paths.appendChild(path);
            for (let vertex of this.vertices) vertices.appendChild(vertex);
            for (let mask of this.maskElements) masks.appendChild(mask);
            for (let gradient of this.gradients) defs.appendChild(gradient);
            if (
              (paths.setAttributeNS(null, "mask", "url(#text-mask)"), this.svg)
            )
              return (
                this.svg.appendChild(defs),
                this.svg.appendChild(masks),
                this.svg.appendChild(style),
                this.svg.appendChild(paths),
                this.svg.appendChild(vertices),
                this.svg
              );
            else {
              let container = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
              );
              return (
                container.appendChild(defs),
                container.appendChild(masks),
                container.appendChild(style),
                container.appendChild(paths),
                container.appendChild(vertices),
                container
              );
            }
          }
          createGradient(line) {
            let gradient = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "linearGradient"
              ),
              gradientUrl = `line-${this.gradientId++}`,
              l = line.getLeftVector(),
              r = line.getRightVector(),
              fromX = l.x + this.offsetX,
              fromY = l.y + this.offsetY,
              toX = r.x + this.offsetX,
              toY = r.y + this.offsetY;
            gradient.setAttributeNS(null, "id", gradientUrl),
              gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse"),
              gradient.setAttributeNS(null, "x1", fromX),
              gradient.setAttributeNS(null, "y1", fromY),
              gradient.setAttributeNS(null, "x2", toX),
              gradient.setAttributeNS(null, "y2", toY);
            let firstStop = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "stop"
            );
            firstStop.setAttributeNS(
              null,
              "stop-color",
              this.themeManager.getColor(line.getLeftElement()) ||
                this.themeManager.getColor("C")
            ),
              firstStop.setAttributeNS(null, "offset", "20%");
            let secondStop = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "stop"
            );
            return (
              secondStop.setAttributeNS(
                null,
                "stop-color",
                this.themeManager.getColor(
                  line.getRightElement() || this.themeManager.getColor("C")
                )
              ),
              secondStop.setAttributeNS(null, "offset", "100%"),
              gradient.appendChild(firstStop),
              gradient.appendChild(secondStop),
              this.gradients.push(gradient),
              gradientUrl
            );
          }
          createSubSuperScripts(text, shift) {
            let elem = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "tspan"
            );
            return (
              elem.setAttributeNS(null, "baseline-shift", shift),
              elem.appendChild(document.createTextNode(text)),
              elem.setAttributeNS(null, "class", "sub"),
              elem
            );
          }
          determineDimensions(vertices) {
            let maxX = -_NumberMAX_VALUE2,
              maxY = -_NumberMAX_VALUE2,
              minX = _NumberMAX_VALUE2,
              minY = _NumberMAX_VALUE2;
            for (var i = 0; i < vertices.length; i++) {
              if (!vertices[i].value.isDrawn) continue;
              let p = vertices[i].position;
              maxX < p.x && (maxX = p.x),
                maxY < p.y && (maxY = p.y),
                minX > p.x && (minX = p.x),
                minY > p.y && (minY = p.y);
            }
            let padding = this.opts.padding;
            (maxX += padding),
              (maxY += padding),
              (minX -= padding),
              (minY -= padding),
              (this.drawingWidth = maxX - minX),
              (this.drawingHeight = maxY - minY);
            let scaleX = this.svg.clientWidth / this.drawingWidth,
              scaleY = this.svg.clientHeight / this.drawingHeight,
              scale = scaleX < scaleY ? scaleX : scaleY,
              viewBoxDim = Math.round(
                this.drawingWidth > this.drawingHeight
                  ? this.drawingWidth
                  : this.drawingHeight
              );
            this.svg.setAttributeNS(
              null,
              "viewBox",
              `0 0 ${viewBoxDim} ${viewBoxDim}`
            ),
              (this.offsetX = -minX),
              (this.offsetY = -minY),
              scaleX < scaleY
                ? (this.offsetY +=
                    this.svg.clientHeight / (2 * scale) -
                    this.drawingHeight / 2)
                : (this.offsetX +=
                    this.svg.clientWidth / (2 * scale) - this.drawingWidth / 2);
          }
          drawBall(x, y, elementName) {
            let ball = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            ball.setAttributeNS(null, "cx", x + this.offsetX),
              ball.setAttributeNS(null, "cy", y + this.offsetY),
              ball.setAttributeNS(null, "r", this.opts.bondLength / 4.5),
              ball.setAttributeNS(
                null,
                "fill",
                this.themeManager.getColor(elementName)
              ),
              this.vertices.push(ball);
          }
          drawDashedWedge(line) {
            if (
              isNaN(line.from.x) ||
              isNaN(line.from.y) ||
              isNaN(line.to.x) ||
              isNaN(line.to.y)
            )
              return;
            let offsetX = this.offsetX,
              offsetY = this.offsetY,
              l = line.getLeftVector().clone(),
              r = line.getRightVector().clone(),
              normals = Vector2.normals(l, r);
            normals[0].normalize(), normals[1].normalize();
            let isRightChiralCenter = line.getRightChiral(),
              start,
              end;
            isRightChiralCenter
              ? ((start = r), (end = l))
              : ((start = l), (end = r));
            let dir = Vector2.subtract(end, start).normalize(),
              length = line.getLength(),
              step = 1.25 / (length / (3 * this.opts.bondThickness)),
              gradient = this.createGradient(line);
            for (let t = 0; 1 > t; t += step) {
              let to = Vector2.multiplyScalar(dir, t * length),
                startDash = Vector2.add(start, to),
                width = 1.5 * t,
                dashOffset = Vector2.multiplyScalar(normals[0], width);
              startDash.subtract(dashOffset);
              let endDash = startDash.clone();
              endDash.add(Vector2.multiplyScalar(dashOffset, 2)),
                this.drawLine(new Line(startDash, endDash), null, gradient);
            }
          }
          drawDebugPoint(x, y, debugText = "", color = "#f00") {
            let point = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            point.setAttributeNS(null, "cx", x + this.offsetX),
              point.setAttributeNS(null, "cy", y + this.offsetY),
              point.setAttributeNS(null, "r", "2"),
              point.setAttributeNS(null, "fill", "#f00"),
              this.vertices.push(point),
              this.drawDebugText(x, y, debugText);
          }
          drawDebugText(x, y, text) {
            let textElem = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            textElem.setAttributeNS(null, "x", x + this.offsetX),
              textElem.setAttributeNS(null, "y", y + this.offsetY),
              textElem.setAttributeNS(null, "class", "debug"),
              textElem.setAttributeNS(null, "fill", "#ff0000"),
              textElem.setAttributeNS(
                null,
                "style",
                `
                font: 5px Droid Sans, sans-serif;
            `
              ),
              textElem.appendChild(document.createTextNode(text)),
              this.vertices.push(textElem);
          }
          drawLine(line, dashed = !1, gradient = null) {
            let opts = this.opts,
              stylesArr = [
                ["stroke-linecap", "round"],
                ["stroke-dasharray", dashed ? "5, 5" : "none"],
              ],
              l = line.getLeftVector(),
              r = line.getRightVector(),
              fromX = l.x + this.offsetX,
              fromY = l.y + this.offsetY,
              toX = r.x + this.offsetX,
              toY = r.y + this.offsetY,
              styles = stylesArr.map((sub) => sub.join(":")).join(";"),
              lineElem = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
              );
            lineElem.setAttributeNS(null, "x1", fromX),
              lineElem.setAttributeNS(null, "y1", fromY),
              lineElem.setAttributeNS(null, "x2", toX),
              lineElem.setAttributeNS(null, "y2", toY),
              lineElem.setAttributeNS(null, "style", styles),
              this.paths.push(lineElem),
              null == gradient &&
                (gradient = this.createGradient(line, fromX, fromY, toX, toY)),
              lineElem.setAttributeNS(null, "stroke", `url('#${gradient}')`);
          }
          drawPoint(x, y, elementName) {
            let ctx = this.ctx,
              offsetX = this.offsetX,
              offsetY = this.offsetY,
              mask = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
            mask.setAttributeNS(null, "cx", x + offsetX),
              mask.setAttributeNS(null, "cy", y + offsetY),
              mask.setAttributeNS(null, "r", "1.5"),
              mask.setAttributeNS(null, "fill", "black"),
              this.maskElements.push(mask);
            let point = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            point.setAttributeNS(null, "cx", x + offsetX),
              point.setAttributeNS(null, "cy", y + offsetY),
              point.setAttributeNS(null, "r", "0.75"),
              point.setAttributeNS(
                null,
                "fill",
                this.themeManager.getColor(elementName)
              ),
              this.vertices.push(point);
          }
          drawText(
            x,
            y,
            elementName,
            hydrogens,
            direction,
            isTerminal,
            charge,
            isotope,
            attachedPseudoElement = {}
          ) {
            let offsetX = this.offsetX,
              offsetY = this.offsetY,
              pos = { x: x + offsetX, y: y + offsetY },
              textElem = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
              ),
              writingMode = "horizontal-tb",
              letterSpacing = "normal",
              textOrientation = "mixed",
              textDirection = "direction: ltr;",
              xShift = -2,
              yShift = 2.5,
              mask = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
            mask.setAttributeNS(null, "cx", pos.x),
              mask.setAttributeNS(null, "cy", pos.y),
              mask.setAttributeNS(null, "r", "3.5"),
              mask.setAttributeNS(null, "fill", "black"),
              this.maskElements.push(mask),
              /up|down/.test(direction) &&
                !isTerminal &&
                ((writingMode = "vertical-rl"),
                (textOrientation = "upright"),
                (letterSpacing = "-1px")),
              "down" !== direction || isTerminal
                ? "up" !== direction || isTerminal
                  ? "left" === direction && (xShift = 2)
                  : (xShift = 0.5)
                : ((xShift = 0), (yShift = -2)),
              ("left" !== direction && ("up" !== direction || isTerminal)) ||
                (textDirection =
                  "direction: rtl; unicode-bidi: bidi-override;"),
              textElem.setAttributeNS(null, "x", pos.x + xShift),
              textElem.setAttributeNS(null, "y", pos.y + yShift),
              textElem.setAttributeNS(null, "class", "element"),
              textElem.setAttributeNS(
                null,
                "fill",
                this.themeManager.getColor(elementName)
              ),
              textElem.setAttributeNS(
                null,
                "style",
                `
                text-anchor: start;
                writing-mode: ${writingMode};
                text-orientation: ${textOrientation};
                letter-spacing: ${letterSpacing};
                ${textDirection}
            `
              );
            let textNode = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "tspan"
            );
            if (1 < elementName.length) {
              let textAnchor = /up|down/.test(direction) ? "middle" : "start";
              textNode.setAttributeNS(
                null,
                "style",
                `
                unicode-bidi: plaintext;
                writing-mode: lr-tb;
                letter-spacing: normal;
                text-anchor: ${textAnchor};
            `
              );
            }
            if (
              (textNode.appendChild(document.createTextNode(elementName)),
              textElem.appendChild(textNode),
              charge)
            ) {
              let chargeElem = this.createSubSuperScripts(
                getChargeText(charge),
                "super"
              );
              textNode.appendChild(chargeElem);
            }
            if (0 < isotope) {
              let isotopeElem = this.createSubSuperScripts(
                isotope.toString(),
                "super"
              );
              textNode.appendChild(isotopeElem);
            }
            if (
              (1 === charge &&
                "N" === elementName &&
                attachedPseudoElement.hasOwnProperty("0O") &&
                attachedPseudoElement.hasOwnProperty("0O-1") &&
                ((attachedPseudoElement = {
                  "0O": {
                    element: "O",
                    count: 2,
                    hydrogenCount: 0,
                    previousElement: "C",
                    charge: "",
                  },
                }),
                (charge = 0)),
              0 < hydrogens)
            ) {
              let hydrogenElem = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "tspan"
              );
              if (
                (hydrogenElem.setAttributeNS(
                  null,
                  "style",
                  "unicode-bidi: plaintext;"
                ),
                hydrogenElem.appendChild(document.createTextNode("H")),
                textElem.appendChild(hydrogenElem),
                1 < hydrogens)
              ) {
                let hydrogenCountElem = this.createSubSuperScripts(
                  hydrogens,
                  "sub"
                );
                hydrogenElem.appendChild(hydrogenCountElem);
              }
            }
            for (let key in attachedPseudoElement) {
              if (!attachedPseudoElement.hasOwnProperty(key)) continue;
              let element = attachedPseudoElement[key].element,
                elementCount = attachedPseudoElement[key].count,
                hydrogenCount = attachedPseudoElement[key].hydrogenCount,
                elementCharge = attachedPseudoElement[key].charge,
                pseudoElementElem = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "tspan"
                );
              if (
                (pseudoElementElem.setAttributeNS(
                  null,
                  "style",
                  "unicode-bidi: plaintext;"
                ),
                pseudoElementElem.appendChild(document.createTextNode(element)),
                pseudoElementElem.setAttributeNS(
                  null,
                  "fill",
                  this.themeManager.getColor(element)
                ),
                0 !== elementCharge)
              ) {
                let elementChargeElem = this.createSubSuperScripts(
                  getChargeText(elementCharge),
                  "super"
                );
                pseudoElementElem.appendChild(elementChargeElem);
              }
              if (0 < hydrogenCount) {
                let pseudoHydrogenElem = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "tspan"
                );
                if (
                  (pseudoHydrogenElem.setAttributeNS(
                    null,
                    "style",
                    "unicode-bidi: plaintext;"
                  ),
                  pseudoHydrogenElem.appendChild(document.createTextNode("H")),
                  pseudoElementElem.appendChild(pseudoHydrogenElem),
                  1 < hydrogenCount)
                ) {
                  let hydrogenCountElem = this.createSubSuperScripts(
                    hydrogenCount,
                    "sub"
                  );
                  pseudoHydrogenElem.appendChild(hydrogenCountElem);
                }
              }
              if (1 < elementCount) {
                let elementCountElem = this.createSubSuperScripts(
                  elementCount,
                  "sub"
                );
                pseudoElementElem.appendChild(elementCountElem);
              }
              textElem.appendChild(pseudoElementElem);
            }
            this.vertices.push(textElem);
          }
          drawWedge(line) {
            let offsetX = this.offsetX,
              offsetY = this.offsetY,
              l = line.getLeftVector().clone(),
              r = line.getRightVector().clone();
            (l.x += offsetX),
              (l.y += offsetY),
              (r.x += offsetX),
              (r.y += offsetY);
            let normals = Vector2.normals(l, r);
            normals[0].normalize(), normals[1].normalize();
            let isRightChiralCenter = line.getRightChiral(),
              start = l,
              end = r;
            isRightChiralCenter && ((start = r), (end = l));
            let t = Vector2.add(
                start,
                Vector2.multiplyScalar(normals[0], this.halfBondThickness)
              ),
              u = Vector2.add(
                end,
                Vector2.multiplyScalar(normals[0], 1.5 + this.halfBondThickness)
              ),
              v = Vector2.add(
                end,
                Vector2.multiplyScalar(normals[1], 1.5 + this.halfBondThickness)
              ),
              w = Vector2.add(
                start,
                Vector2.multiplyScalar(normals[1], this.halfBondThickness)
              ),
              polygon = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "polygon"
              ),
              gradient = this.createGradient(line, l.x, l.y, r.x, r.y);
            polygon.setAttributeNS(
              null,
              "points",
              `${t.x},${t.y} ${u.x},${u.y} ${v.x},${v.y} ${w.x},${w.y}`
            ),
              polygon.setAttributeNS(null, "fill", `url('#${gradient}')`),
              this.paths.push(polygon);
          }
        };
      },
      { "./Line": 8, "./UtilityFunctions": 17, "./Vector2": 18 },
    ],
    16: [
      function (require, module) {
        "use strict";
        module.exports = class {
          constructor(colors, theme) {
            (this.colors = colors), (this.theme = this.colors[theme]);
          }
          getColor(key) {
            return key && ((key = key.toUpperCase()), key in this.theme)
              ? this.theme[key]
              : this.theme.C;
          }
          setTheme(theme) {
            this.colors.hasOwnProperty(theme) &&
              (this.theme = this.colors[theme]);
          }
        };
      },
      {},
    ],
    17: [
      function (require, module) {
        "use strict";
        module.exports = {
          getChargeText: function (charge) {
            return (
              console.log("in the utility version of getChargeText"),
              1 === charge
                ? "+"
                : 2 === charge
                ? "2+"
                : -1 === charge
                ? "-"
                : -2 === charge
                ? "2-"
                : ""
            );
          },
        };
      },
      {},
    ],
    18: [
      function (require, module) {
        "use strict";
        var _Mathacos = Math.acos,
          _Mathsin4 = Math.sin,
          _Mathcos4 = Math.cos,
          _Mathsqrt3 = Math.sqrt;
        class Vector2 {
          constructor(x, y) {
            0 == arguments.length
              ? ((this.x = 0), (this.y = 0))
              : 1 == arguments.length
              ? ((this.x = x.x), (this.y = x.y))
              : ((this.x = x), (this.y = y));
          }
          clone() {
            return new Vector2(this.x, this.y);
          }
          toString() {
            return "(" + this.x + "," + this.y + ")";
          }
          add(vec) {
            return (this.x += vec.x), (this.y += vec.y), this;
          }
          subtract(vec) {
            return (this.x -= vec.x), (this.y -= vec.y), this;
          }
          divide(scalar) {
            return (this.x /= scalar), (this.y /= scalar), this;
          }
          multiply(v) {
            return (this.x *= v.x), (this.y *= v.y), this;
          }
          multiplyScalar(scalar) {
            return (this.x *= scalar), (this.y *= scalar), this;
          }
          invert() {
            return (this.x = -this.x), (this.y = -this.y), this;
          }
          angle() {
            return Math.atan2(this.y, this.x);
          }
          distance(vec) {
            return _Mathsqrt3(
              (vec.x - this.x) * (vec.x - this.x) +
                (vec.y - this.y) * (vec.y - this.y)
            );
          }
          distanceSq(vec) {
            return (
              (vec.x - this.x) * (vec.x - this.x) +
              (vec.y - this.y) * (vec.y - this.y)
            );
          }
          clockwise(vec) {
            let a = this.y * vec.x,
              b = this.x * vec.y;
            if (a > b) return -1;
            return a === b ? 0 : 1;
          }
          relativeClockwise(center, vec) {
            let a = (this.y - center.y) * (vec.x - center.x),
              b = (this.x - center.x) * (vec.y - center.y);
            if (a > b) return -1;
            return a === b ? 0 : 1;
          }
          rotate(angle) {
            let tmp = new Vector2(0, 0),
              cosAngle = _Mathcos4(angle),
              sinAngle = _Mathsin4(angle);
            return (
              (tmp.x = this.x * cosAngle - this.y * sinAngle),
              (tmp.y = this.x * sinAngle + this.y * cosAngle),
              (this.x = tmp.x),
              (this.y = tmp.y),
              this
            );
          }
          rotateAround(angle, vec) {
            let s = _Mathsin4(angle),
              c = _Mathcos4(angle);
            (this.x -= vec.x), (this.y -= vec.y);
            let x = this.x * c - this.y * s,
              y = this.x * s + this.y * c;
            return (this.x = x + vec.x), (this.y = y + vec.y), this;
          }
          rotateTo(vec, center, offsetAngle = 0) {
            (this.x += 0.001), (this.y -= 0.001);
            let a = Vector2.subtract(this, center),
              b = Vector2.subtract(vec, center),
              angle = Vector2.angle(b, a);
            return this.rotateAround(angle + offsetAngle, center), this;
          }
          rotateAwayFrom(vec, center, angle) {
            this.rotateAround(angle, center);
            let distSqA = this.distanceSq(vec);
            this.rotateAround(-2 * angle, center);
            let distSqB = this.distanceSq(vec);
            distSqB < distSqA && this.rotateAround(2 * angle, center);
          }
          getRotateAwayFromAngle(vec, center, angle) {
            let tmp = this.clone();
            tmp.rotateAround(angle, center);
            let distSqA = tmp.distanceSq(vec);
            tmp.rotateAround(-2 * angle, center);
            let distSqB = tmp.distanceSq(vec);
            return distSqB < distSqA ? angle : -angle;
          }
          getRotateTowardsAngle(vec, center, angle) {
            let tmp = this.clone();
            tmp.rotateAround(angle, center);
            let distSqA = tmp.distanceSq(vec);
            tmp.rotateAround(-2 * angle, center);
            let distSqB = tmp.distanceSq(vec);
            return distSqB > distSqA ? angle : -angle;
          }
          getRotateToAngle(vec, center) {
            let a = Vector2.subtract(this, center),
              b = Vector2.subtract(vec, center),
              angle = Vector2.angle(b, a);
            return Number.isNaN(angle) ? 0 : angle;
          }
          isInPolygon(polygon) {
            let inside = !1;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++)
              polygon[i].y > this.y != polygon[j].y > this.y &&
                this.x <
                  ((polygon[j].x - polygon[i].x) * (this.y - polygon[i].y)) /
                    (polygon[j].y - polygon[i].y) +
                    polygon[i].x &&
                (inside = !inside);
            return inside;
          }
          length() {
            return _Mathsqrt3(this.x * this.x + this.y * this.y);
          }
          lengthSq() {
            return this.x * this.x + this.y * this.y;
          }
          normalize() {
            return this.divide(this.length()), this;
          }
          normalized() {
            return Vector2.divideScalar(this, this.length());
          }
          whichSide(vecA, vecB) {
            return (
              (this.x - vecA.x) * (vecB.y - vecA.y) -
              (this.y - vecA.y) * (vecB.x - vecA.x)
            );
          }
          sameSideAs(vecA, vecB, vecC) {
            let d = this.whichSide(vecA, vecB),
              dRef = vecC.whichSide(vecA, vecB);
            return (
              (0 > d && 0 > dRef) ||
              (0 == d && 0 == dRef) ||
              (0 < d && 0 < dRef)
            );
          }
          static add(vecA, vecB) {
            return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
          }
          static subtract(vecA, vecB) {
            return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
          }
          static multiply(vecA, vecB) {
            return new Vector2(vecA.x * vecB.x, vecA.y * vecB.y);
          }
          static multiplyScalar(vec, scalar) {
            return new Vector2(vec.x, vec.y).multiplyScalar(scalar);
          }
          static midpoint(vecA, vecB) {
            return new Vector2((vecA.x + vecB.x) / 2, (vecA.y + vecB.y) / 2);
          }
          static normals(vecA, vecB) {
            let delta = Vector2.subtract(vecB, vecA);
            return [
              new Vector2(-delta.y, delta.x),
              new Vector2(delta.y, -delta.x),
            ];
          }
          static units(vecA, vecB) {
            let delta = Vector2.subtract(vecB, vecA);
            return [
              new Vector2(-delta.y, delta.x).normalize(),
              new Vector2(delta.y, -delta.x).normalize(),
            ];
          }
          static divide(vecA, vecB) {
            return new Vector2(vecA.x / vecB.x, vecA.y / vecB.y);
          }
          static divideScalar(vecA, s) {
            return new Vector2(vecA.x / s, vecA.y / s);
          }
          static dot(vecA, vecB) {
            return vecA.x * vecB.x + vecA.y * vecB.y;
          }
          static angle(vecA, vecB) {
            let dot = Vector2.dot(vecA, vecB);
            return _Mathacos(dot / (vecA.length() * vecB.length()));
          }
          static threePointangle(vecA, vecB, vecC) {
            let ab = Vector2.subtract(vecB, vecA),
              bc = Vector2.subtract(vecC, vecB),
              abLength = vecA.distance(vecB),
              bcLength = vecB.distance(vecC);
            return _Mathacos(Vector2.dot(ab, bc) / (abLength * bcLength));
          }
          static scalarProjection(vecA, vecB) {
            let unit = vecB.normalized();
            return Vector2.dot(vecA, unit);
          }
          static averageDirection(vecs) {
            let avg = new Vector2(0, 0);
            for (var i = 0; i < vecs.length; i++) {
              let vec = vecs[i];
              avg.add(vec);
            }
            return avg.normalize();
          }
        }
        module.exports = Vector2;
      },
      {},
    ],
    19: [
      function (require, module) {
        "use strict";
        var _Mathround2 = Math.round,
          _MathPI4 = Math.PI;
        const MathHelper = require("./MathHelper"),
          ArrayHelper = require("./ArrayHelper"),
          Vector2 = require("./Vector2"),
          Atom = require("./Atom");
        class Vertex {
          constructor(value, x = 0, y = 0) {
            (this.id = null),
              (this.value = value),
              (this.position = new Vector2(x ? x : 0, y ? y : 0)),
              (this.previousPosition = new Vector2(0, 0)),
              (this.parentVertexId = null),
              (this.children = []),
              (this.spanningTreeChildren = []),
              (this.edges = []),
              (this.positioned = !1),
              (this.angle = null),
              (this.dir = 1),
              (this.neighbourCount = 0),
              (this.neighbours = []),
              (this.neighbouringElements = []),
              (this.forcePositioned = !1);
          }
          setPosition(x, y) {
            (this.position.x = x), (this.position.y = y);
          }
          setPositionFromVector(v) {
            (this.position.x = v.x), (this.position.y = v.y);
          }
          addChild(vertexId) {
            this.children.push(vertexId),
              this.neighbours.push(vertexId),
              this.neighbourCount++;
          }
          addRingbondChild(vertexId, ringbondIndex) {
            if ((this.children.push(vertexId), this.value.bracket)) {
              let index = 1;
              0 === this.id && 0 === this.value.bracket.hcount && (index = 0),
                1 === this.value.bracket.hcount &&
                  0 === ringbondIndex &&
                  (index = 2),
                1 === this.value.bracket.hcount &&
                  1 === ringbondIndex &&
                  (3 > this.neighbours.length ? (index = 2) : (index = 3)),
                null === this.value.bracket.hcount &&
                  0 === ringbondIndex &&
                  (index = 1),
                null === this.value.bracket.hcount &&
                  1 === ringbondIndex &&
                  (3 > this.neighbours.length ? (index = 1) : (index = 2)),
                this.neighbours.splice(index, 0, vertexId);
            } else this.neighbours.push(vertexId);
            this.neighbourCount++;
          }
          setParentVertexId(parentVertexId) {
            this.neighbourCount++,
              (this.parentVertexId = parentVertexId),
              this.neighbours.push(parentVertexId);
          }
          isTerminal() {
            return (
              !!this.value.hasAttachedPseudoElements ||
              (null === this.parentVertexId && 2 > this.children.length) ||
              0 === this.children.length
            );
          }
          clone() {
            let clone = new Vertex(
              this.value,
              this.position.x,
              this.position.y
            );
            return (
              (clone.id = this.id),
              (clone.previousPosition = new Vector2(
                this.previousPosition.x,
                this.previousPosition.y
              )),
              (clone.parentVertexId = this.parentVertexId),
              (clone.children = ArrayHelper.clone(this.children)),
              (clone.spanningTreeChildren = ArrayHelper.clone(
                this.spanningTreeChildren
              )),
              (clone.edges = ArrayHelper.clone(this.edges)),
              (clone.positioned = this.positioned),
              (clone.angle = this.angle),
              (clone.forcePositioned = this.forcePositioned),
              clone
            );
          }
          equals(vertex) {
            return this.id === vertex.id;
          }
          getAngle(referenceVector = null, returnAsDegrees = !1) {
            let u = null;
            return (
              (u = referenceVector
                ? Vector2.subtract(this.position, referenceVector)
                : Vector2.subtract(this.position, this.previousPosition)),
              returnAsDegrees ? MathHelper.toDeg(u.angle()) : u.angle()
            );
          }
          getTextDirection(vertices) {
            let neighbours = this.getDrawnNeighbours(vertices),
              angles = [];
            for (let i = 0; i < neighbours.length; i++)
              angles.push(this.getAngle(vertices[neighbours[i]].position));
            let textAngle = MathHelper.meanAngle(angles),
              halfPi = _MathPI4 / 2;
            return (
              (textAngle = _Mathround2(
                _Mathround2(textAngle / halfPi) * halfPi
              )),
              2 === textAngle
                ? "down"
                : -2 === textAngle
                ? "up"
                : 0 === textAngle || -0 === textAngle
                ? "right"
                : 3 === textAngle || -3 === textAngle
                ? "left"
                : "down"
            );
          }
          getNeighbours(vertexId = null) {
            if (null === vertexId) return this.neighbours.slice();
            let arr = [];
            for (let i = 0; i < this.neighbours.length; i++)
              this.neighbours[i] !== vertexId && arr.push(this.neighbours[i]);
            return arr;
          }
          getDrawnNeighbours(vertices) {
            let arr = [];
            for (let i = 0; i < this.neighbours.length; i++)
              vertices[this.neighbours[i]].value.isDrawn &&
                arr.push(this.neighbours[i]);
            return arr;
          }
          getNeighbourCount() {
            return this.neighbourCount;
          }
          getSpanningTreeNeighbours(vertexId = null) {
            let neighbours = [];
            for (let i = 0; i < this.spanningTreeChildren.length; i++)
              (void 0 === vertexId ||
                vertexId != this.spanningTreeChildren[i]) &&
                neighbours.push(this.spanningTreeChildren[i]);
            return (
              null != this.parentVertexId &&
                (void 0 === vertexId || vertexId != this.parentVertexId) &&
                neighbours.push(this.parentVertexId),
              neighbours
            );
          }
          getNextInRing(vertices, ringId, previousVertexId) {
            let neighbours = this.getNeighbours();
            for (let i = 0; i < neighbours.length; i++)
              if (
                ArrayHelper.contains(vertices[neighbours[i]].value.rings, {
                  value: ringId,
                }) &&
                neighbours[i] != previousVertexId
              )
                return neighbours[i];
            return null;
          }
        }
        module.exports = Vertex;
      },
      { "./ArrayHelper": 2, "./Atom": 3, "./MathHelper": 9, "./Vector2": 18 },
    ],
  },
  {},
  [1]
);
//# sourceMappingURL=smiles-drawer.min.js.map

