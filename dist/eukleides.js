(function() {var exports = {};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.point_line_distance = point_line_distance;
exports.orthogonal_projection = orthogonal_projection;
exports.parallel_projection = parallel_projection;
exports.lines_intersection = lines_intersection;
exports.line_set_intersection = line_set_intersection;
exports.line_circle_intersection = line_circle_intersection;
exports.line_conic_intersection = line_conic_intersection;
exports.sets_intersection = sets_intersection;
exports.circles_intersection = circles_intersection;
exports.circle_set_intersection = circle_set_intersection;
exports.minimize = minimize;
exports.gradient = gradient;
exports.findPhaseChange = findPhaseChange;
exports.color_schemes = color_schemes;
exports.colorbrewer = exports.colors = exports.arrows = exports.dirs = exports.parts = exports.shapes = exports.styles = exports.labels = exports.SVGDrawer = exports.Drawer = exports.QuadrilateralMaker = exports.TriangleMaker = exports.Parabola = exports.Hyperbola = exports.Ellipse = exports.Conic = exports.Circle = exports.Set = exports.Line = exports.Vector = exports.Point = exports.Obj = void 0;

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cos = Math.cos,
    sin = Math.sin,
    tan = Math.tan,
    acos = Math.acos,
    atan = Math.atan,
    atan2 = Math.atan2,
    PI = Math.PI,
    sqrt = Math.sqrt,
    abs = Math.abs,
    ceil = Math.ceil,
    floor = Math.floor,
    max = Math.max,
    min = Math.min;
var EPSILON = 1e-12;

function dpformat(n) {
  var dp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var s = n.toFixed(dp);
  return s.replace(/\.?0*$/, '');
}

function ZERO(n) {
  return abs(n) < EPSILON;
}

function EQL(x, y) {
  return abs(x - y) < EPSILON;
}

function RTOD(x) {
  return 180 * x / PI;
}

function hypot(x, y) {
  return sqrt(x * x + y * y);
}

function argument(A, B) {
  return atan2(B.y - A.y, B.x - A.x);
}

function principal(an) {
  return an - 360 * ceil(an / 360 - 0.5);
}

function det2(a, b, c, d) {
  return a * d - b * c;
}

function det3(a, b, c, d, e, f, g, h, i) {
  return a * det2(e, f, h, i) - d * det2(b, c, h, i) + g * det2(b, c, e, f);
}

function parametric_ellipse(t, x0, y0, a, b, c, s) {
  var u = a * cos(t);
  var v = b * sin(t);
  var x = x0 + c * u - s * v;
  var y = y0 + s * u + c * v;
  return [x, y];
}

function parametric_hyperbola(t, x0, y0, a, b, c, s) {
  var u = a / sin(t);
  var v = b / tan(t);
  var x = x0 + c * u - s * v;
  var y = y0 + s * u + c * v;
  return [x, y];
}

function parametric_parabola(t, x0, y0, p, c, s) {
  var q = cos(t);
  var r = -p / (1 + q);
  var u = r * q;
  var v = r * sin(t);
  var x = x0 + c * u - s * v;
  var y = y0 + s * u + c * v;
  return [x, y];
}

function cosine(a, b, c) {
  return (b * b + c * c - a * a) / (2 * b * c);
}

function tangent(x) {
  return sqrt(1 - x * x) / x;
}

var Obj = function Obj() {
  _classCallCheck(this, Obj);
};

exports.Obj = Obj;

var Point =
/*#__PURE__*/
function (_Obj) {
  _inherits(Point, _Obj);

  function Point(x, y) {
    var _this;

    _classCallCheck(this, Point);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Point).call(this));
    _this.x = x;
    _this.y = y;
    return _this;
  }

  _createClass(Point, [{
    key: "toString",
    value: function toString() {
      return "(".concat(dpformat(this.x), ",").concat(dpformat(this.y), ")");
    }
  }, {
    key: "translate",
    value: function translate(u) {
      return new Point(this.x + u.x, this.y + u.y);
    }
  }, {
    key: "reflect",
    value: function reflect(l) {
      var c = cos(l.a);
      var s = sin(l.a);
      var x = this.x - l.x;
      var y = this.y - l.y;
      var p = 2 * (c * x + s * y);
      return new Point(l.x + p * c - x, l.y + p * s - y);
    }
  }, {
    key: "symmetric",
    value: function symmetric(O) {
      return new Point(2 * O.x - this.x, 2 * O.y - this.y);
    }
  }, {
    key: "rotate",
    value: function rotate(a, O) {
      var c = cos(a);
      var s = sin(a);
      var x = this.x - O.x;
      var y = this.y - O.y;
      return new Point(O.x + c * x - s * y, O.y + s * x + c * y);
    }
  }, {
    key: "distance",
    value: function distance(B) {
      var dx = this.x - B.x;
      var dy = this.y - B.y;
      return sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "homothetic",
    value: function homothetic(O, k) {
      return new Point(O.x + k * (A.x - O.x), O.y + k * (A.y - O.y));
    }
  }, {
    key: "abscissa",
    value: function abscissa() {
      return this.x;
    }
  }, {
    key: "ordinate",
    value: function ordinate() {
      return this.y;
    }
  }], [{
    key: "create_polar",
    value: function create_polar(r, a) {
      return new Point(r * cos(a), r * sin(a));
    }
  }, {
    key: "create_point_on_segment",
    value: function create_point_on_segment(set, t) {
      var _set = _slicedToArray(set, 2),
          A = _set[0],
          B = _set[1];

      var x = A.x + t * (B.x - A.x);
      var y = A.y + t * (B.y - A.y);
      return new Point(x, y);
    }
  }, {
    key: "create_point_on_line",
    value: function create_point_on_line(l, t) {
      var x = l.x + t * cos(l.a);
      var y = l.y + t * sin(l.a);
      return new Point(x, y);
    }
  }, {
    key: "create_point_with_abscissa",
    value: function create_point_with_abscissa(l, x) {
      var c = cos(l.a);

      if (ZERO(c)) {
        throw new Error("invalid line");
      }

      return new Point(x, l.y + (x - l.a) * sin(l.a) / c);
    }
  }, {
    key: "create_point_with_ordinate",
    value: function create_point_with_ordinate(l, y) {
      var s = sin(l.a);

      if (ZERO(s)) {
        throw new Error("invalid line");
      }

      return new Point(l.x + (y - l.y) * cos(l.a) / s, y);
    }
  }, {
    key: "create_point_on_circle",
    value: function create_point_on_circle(c, a) {
      return new Point(c.x + c.r * cos(a), c.y + c.r * sin(a));
    }
  }, {
    key: "create_midpoint",
    value: function create_midpoint(set) {
      var _set$points = _slicedToArray(set.points, 2),
          A = _set$points[0],
          B = _set$points[1];

      return new Point((A.x + B.x) / 2, (A.y + B.y) / 2);
    }
  }, {
    key: "create_barycenter",
    value: function create_barycenter(points, weights) {
      var x = 0;
      var y = 0;
      var s = 0;

      for (var i = 0; i < points.length; i++) {
        var _c = weights[i];
        var p = points[i];
        x += _c * p.x;
        y += _c * p.y;
        s += _c;
      }

      return new Point(x / s, y / s);
    }
  }, {
    key: "create_orthocenter",
    value: function create_orthocenter(A, B, C) {
      var a = B.distance(C);
      var b = A.distance(C);
      var c = A.distance(B);

      if (ZERO(a) || ZERO(b) || ZERO(c)) {
        throw new Error("invalid triangle");
      }

      var ca = cosine(a, b, c);
      var cb = cosine(b, c, a);
      var cc = cosine(c, a, b);

      if (ca == 0) {
        ca = 1;
        cb = 0;
        cc = 0;
      } else if (cb == 0) {
        ca = 0;
        cb = 1;
        cc = 0;
      } else if (cc == 0) {
        ca = 0;
        cb = 0;
        cc = 1;
      } else {
        ca = tangent(ca);
        cb = tangent(cb);
        cc = tangent(cc);
      }

      var d = ca + cb + cc;
      return new Point((ca * A.x + cb * B.x + cc * C.x) / d, (ca * A.y + cb * B.y + cc * C.y) / d);
    }
  }]);

  return Point;
}(Obj);

exports.Point = Point;

var Vector =
/*#__PURE__*/
function (_Object) {
  _inherits(Vector, _Object);

  function Vector(x, y) {
    var _this2;

    _classCallCheck(this, Vector);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Vector).call(this));
    _this2.x = x;
    _this2.y = y;
    return _this2;
  }

  _createClass(Vector, [{
    key: "toString",
    value: function toString() {
      return "(".concat(dpformat(this.x), ",").concat(dpformat(this.y), ")");
    }
  }, {
    key: "add",
    value: function add(v) {
      return new Vector(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "subtract",
    value: function subtract(v) {
      return new Vector(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      return new Vector(-this.x, -this.y);
    }
  }, {
    key: "multiply",
    value: function multiply(k) {
      return new Vector(k * this.x, k * this.y);
    }
  }, {
    key: "divide",
    value: function divide(k) {
      return new Vector(this.x / k, this.y / k);
    }
  }, {
    key: "rotate",
    value: function rotate(a) {
      var c = cos(a);
      var s = sin(a);
      return new Vector(c * this.x - s * this.y, s * this.x + c * this.y);
    }
  }, {
    key: "abscissa",
    value: function abscissa() {
      return this.x;
    }
  }, {
    key: "ordinate",
    value: function ordinate() {
      return this.y;
    }
  }, {
    key: "length",
    value: function length() {
      return hypot(this.x, this.y);
    }
  }, {
    key: "argument",
    value: function argument() {
      return atan2(this.y, this.x);
    }
  }], [{
    key: "create_polar",
    value: function create_polar(r, a) {
      return new Vector(r * cos(a), r * sin(a));
    }
  }, {
    key: "create_from_points",
    value: function create_from_points(A, B) {
      return new Vector(B.x - A.x, B.y - A.y);
    }
  }, {
    key: "create_from_segment",
    value: function create_from_segment(set) {
      var _set2 = _slicedToArray(set, 2),
          A = _set2[0],
          B = _set2[1];

      return new Vector(B.x - A.x, B.y - A.y);
    }
  }, {
    key: "create_from_line",
    value: function create_from_line(l) {
      return new Vector(cos(l.a), sin(l.a));
    }
  }, {
    key: "angle_between",
    value: function angle_between(u, v) {
      return (u.x * v.y > u.y * v.x ? 1 : -1) * acos(Vector.scalar_product(u, v) / (u.length() * v.length()));
    }
  }, {
    key: "scalar_product",
    value: function scalar_product(u, v) {
      return u.x * v.x + u.y * v.y;
    }
  }]);

  return Vector;
}(_wrapNativeSuper(Object));

exports.Vector = Vector;

var Line =
/*#__PURE__*/
function (_Object2) {
  _inherits(Line, _Object2);

  function Line(x, y, a) {
    var _this3;

    _classCallCheck(this, Line);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this));
    _this3.x = x;
    _this3.y = y;
    _this3.a = a;
    _this3.defined_by = {
      kind: 'heading',
      through: new Point(x, y),
      heading: a
    };
    return _this3;
  }

  _createClass(Line, [{
    key: "parallel",
    value: function parallel(O) {
      return new Line(O.x, O.y, this.a);
    }
  }, {
    key: "perpendicular",
    value: function perpendicular(O) {
      return new Line(O.x, O.y, this.a + (this.a <= PI / 2 ? PI / 2 : -PI * 3 / 2));
    }
  }, {
    key: "translate",
    value: function translate(u) {
      return new Line(this.x + u.x, this.y + u.y, this.a);
    }
  }, {
    key: "reflect",
    value: function reflect(d) {
      var c = cos(this.a);
      var s = sin(this.a);
      var x = this.x - d.x;
      var y = this.y - d.y;
      var p = 2 * (c * x + s * y);
      return new Line(d.x + p * c - x, d.y + p * s - y, principal(2 * d.a - this.a));
    }
  }, {
    key: "symmetric",
    value: function symmetric(O) {
      return new Line(2 * O.x - this.x, 2 * O.y - this.y, this.a + (this.a > 0 ? -PI : PI));
    }
  }, {
    key: "rotate",
    value: function rotate(O, a) {
      var c = cos(a);
      var s = sin(a);
      var x = this.x - O.x;
      var y = this.y - O.y;
      return new Line(O.x + c * x - s * y, O.y + s * x + c * y, principal(this.a + a));
    }
  }, {
    key: "homothetic",
    value: function homothetic(O, k) {
      if (k == 0) {
        throw new Error("invalid ratio");
      }

      return new Line(O.x + k * (this.x - O.x), O.y + k * (this.y - O.y), this.a + (k < 0 ? this.a > 0 ? -PI : PI : 0));
    }
  }, {
    key: "argument",
    value: function argument() {
      return this.a;
    }
  }], [{
    key: "create_with_points",
    value: function create_with_points(A, B) {
      if (EQL(A.x, B.x) && EQL(A.y, B.y)) {
        throw new Error("undefined line");
      }

      var l = new Line(A.x, A.y, argument(A, B));
      l.defined_by = {
        kind: 'points',
        points: [A, B]
      };
      return l;
    }
  }, {
    key: "create_with_vector",
    value: function create_with_vector(O, u) {
      var l = new Line(O.x, O.y, atan2(u.y, u.x));
      l.defined_by = {
        kind: 'vector',
        through: O,
        vector: u
      };
      return l;
    }
  }, {
    key: "create_with_segment",
    value: function create_with_segment(s) {
      var _s$points = _slicedToArray(s.points, 2),
          A = _s$points[0],
          B = _s$points[1];

      return Line.create_with_points(A, B);
    }
  }, {
    key: "create_parallel_to_segment",
    value: function create_parallel_to_segment(seg, O) {
      var _seg = _slicedToArray(seg, 2),
          A = _seg[0],
          B = _seg[1];

      if (EQL(A.x, B.x) && EQL(A.y, B.y)) {
        throw new Error("invalid argument");
      }

      return new Line(O.x, O.y, argument(A, B));
    }
  }, {
    key: "create_angle_bisector",
    value: function create_angle_bisector(A, B, C) {
      if (EQL(A.x, B.x) && EQL(A.y, B.y) || EQL(B.x, C.x) && EQL(B.y, C.y)) {
        throw new Error("invalid angle");
      }

      return new Line(B.x, B.y, (argument(B, A) + argument(B, C)) / 2);
    }
  }, {
    key: "create_lines_bisector",
    value: function create_lines_bisector(l1, l2) {
      var c1 = cos(l1.a);
      var s1 = sin(l1.a);
      var c2 = cos(l2.a);
      var s2 = sin(l2.a);
      var d = det2(c1, c2, s1, s2);

      if (ZERO(d)) {
        if (ZERO(det2(l2.x - l1.x, l2.y - l1.y, c1, s1))) {
          return l1;
        } else {
          throw new Error("parallel lines");
        }
      } else {
        var b1 = det2(l1.x, l1.y, c1, s1);
        var b2 = det2(l2.x, l2.y, c2, s2);
        var x = det2(c1, c2, b1, b2) / d;
        var y = det2(s1, s2, b1, b2) / d;
        var a = (l1.a + l2.a) / 2;

        if (abs(l1.a - l2.a) > PI / 2) {
          a += a <= PI / 2 ? PI / 2 : -PI * 3 / 2;
        }

        return new Line(x, y, a);
      }
    }
  }, {
    key: "create_altitude",
    value: function create_altitude(A, B, C) {
      var a = argument(B, C);
      return new Line(A.x, A.y, a + (a <= PI / 2 ? PI / 2 : -PI * 3 / 2));
    }
  }, {
    key: "create_median",
    value: function create_median(A, B, C) {
      var x = (B.x + C.x) / 2;
      var y = (B.y + C.y) / 2;

      if (EQL(A.x, x) && EQL(A.y, y)) {
        throw new Error("invalid triangle");
      }

      return new Line(A.x, A.y, atan2(y - A.y, x - A.x));
    }
  }]);

  return Line;
}(_wrapNativeSuper(Object));

exports.Line = Line;

function point_line_distance(A, l) {
  var c = cos(l.a);
  var s = sin(l.a);
  return abs(s * (A.x - l.x) - c * (A.y - l.y));
}

var Set =
/*#__PURE__*/
function (_Obj2) {
  _inherits(Set, _Obj2);

  function Set(points) {
    var _this4;

    _classCallCheck(this, Set);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Set).call(this));
    _this4.points = points.slice();
    return _this4;
  }

  _createClass(Set, [{
    key: "segment",
    value: function segment(tail) {
      var head = this.points[0];
      var s = new Set([head, tail]);
      return s;
    }
  }, {
    key: "add_head_point",
    value: function add_head_point(p) {
      return new Set([p].concat(this.points));
    }
  }, {
    key: "add_tail_point",
    value: function add_tail_point(p) {
      return new Set(this.points.concat([p]));
    }
  }, {
    key: "concatenate",
    value: function concatenate(second) {
      return new Set(this.points.concat(second.points));
    }
  }, {
    key: "extract_point",
    value: function extract_point(i) {
      return this.points[i];
    }
  }, {
    key: "extract_subset",
    value: function extract_subset(i, j) {
      return new Set(this.points.slice(i, j));
    }
  }, {
    key: "translate",
    value: function translate(u) {
      var points = this.points.map(function (p) {
        return p.translate(u);
      });
      return new Set(points);
    }
  }, {
    key: "reflect",
    value: function reflect(l) {
      var points = this.points.map(function (p) {
        return p.reflect(l);
      });
      return new Set(points);
    }
  }, {
    key: "symmetric",
    value: function symmetric(O) {
      var points = this.points.map(function (p) {
        return p.symmetric(O);
      });
      return new Set(points);
    }
  }, {
    key: "rotate",
    value: function rotate(O, a) {
      var points = this.points.map(function (p) {
        return p.rotate(O, a);
      });
      return new Set(points);
    }
  }, {
    key: "cardinal",
    value: function cardinal() {
      return this.points.length;
    }
  }, {
    key: "path_length",
    value: function path_length() {
      var t = 0;

      for (var i = 1; i < this.points.length + (this.points.length > 2 ? 1 : 0); i++) {
        var a = this.points[i % this.points.length];
        var _b = this.points[i - 1];
        t += a.distance(_b);
      }

      return t;
    }
  }, {
    key: "area",
    value: function area() {
      if (this.points.length == 0) {
        return 0;
      } else {
        return abs(compute_area(this.points, this.points)) * 0.5;
      }
    }
  }, {
    key: "perpendicular_to_segment",
    value: function perpendicular_to_segment(O) {
      var _this$points = _slicedToArray(this.points, 2),
          A = _this$points[0],
          B = _this$points[1];

      if (EQL(A.x, B.x) && EQL(A.y, B.y)) {
        throw new Error("invalid set");
      }

      var a = argument(A, B);
      return new Line(O.x, O.y, a + (a <= PI / 2 ? PI / 2 : -PI * 3 / 2));
    }
  }, {
    key: "perpendicular_bisector",
    value: function perpendicular_bisector() {
      var _this$points2 = _slicedToArray(this.points, 2),
          A = _this$points2[0],
          B = _this$points2[1];

      if (EQL(A.x, B.x) && EQL(A.y, B.y)) {
        throw new Error("invalid set");
      }

      var a = argument(A, B);
      return new Line((A.x + B.x) / 2, (A.y + B.y) / 2, a + (a <= PI / 2 ? PI / 2 : -PI * 3 / 2));
    }
  }, {
    key: "isobarycenter",
    value: function isobarycenter() {
      var x = 0;
      var y = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;
          x += p.x;
          y += p.y;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var n = this.points.length;
      return new Point(x / n, y / n);
    }
  }, {
    key: "is_rectangle",
    value: function is_rectangle() {
      if (this.points.length != 4) {
        return false;
      }

      var _this$points3 = _slicedToArray(this.points, 4),
          a = _this$points3[0],
          b = _this$points3[1],
          c = _this$points3[2],
          d = _this$points3[3];

      var _ref = [Vector.create_from_points(a, b), Vector.create_from_points(a, d)],
          u = _ref[0],
          v = _ref[1];
      var f = a.translate(u.add(v));
      var parallelogram = EQL(f.x, c.x) && EQL(f.y, c.y);
      var dp = u.x * v.x + u.y * v.y;
      return parallelogram && ZERO(dp);
    }
  }, {
    key: "is_square",
    value: function is_square() {
      if (!this.is_rectangle()) {
        return false;
      }

      var _this$points4 = _slicedToArray(this.points, 4),
          a = _this$points4[0],
          b = _this$points4[1],
          c = _this$points4[2],
          d = _this$points4[3];

      var _ref2 = [Vector.create_from_points(a, b), Vector.create_from_points(a, d)],
          u = _ref2[0],
          v = _ref2[1];
      return EQL(u.length(), v.length());
    }
  }, {
    key: "is_equilateral_triangle",
    value: function is_equilateral_triangle() {
      if (this.points.length != 3) {
        return false;
      }

      var _this$points5 = _slicedToArray(this.points, 3),
          a = _this$points5[0],
          b = _this$points5[1],
          c = _this$points5[2];

      var _ref3 = [Vector.create_from_points(a, b), Vector.create_from_points(a, c), Vector.create_from_points(c, b)],
          u = _ref3[0],
          v = _ref3[1],
          w = _ref3[2];
      var _ref4 = [u.length(), v.length(), w.length()],
          lu = _ref4[0],
          lv = _ref4[1],
          lw = _ref4[2];
      return EQL(lu, lv) && EQL(lv, lw);
    }
  }, {
    key: "compute_shape_name",
    value: function compute_shape_name() {
      if (this.is_rectangle()) {
        if (this.is_square()) {
          return 'square';
        } else {
          return 'rectangle';
        }
      } else if (this.is_equilateral_triangle()) {
        return 'equilateral triangle';
      } else {
        var names = ['', '', 'segment', 'triangle', 'quadrilateral', 'pentagon', 'hexagon'];

        if (this.points.length < names.length) {
          return names[this.points.length];
        } else {
          return 'polygon';
        }
      }
    }
  }, {
    key: "shape_name",
    value: function shape_name() {
      if (!this._shape_name) {
        this._shape_name = this.compute_shape_name();
      }

      return this._shape_name;
    }
  }], [{
    key: "create_polygon",
    value: function create_polygon(n, O, r, a) {
      var points = [];

      for (var i = 0; i < n; i++) {
        var _ref5 = [O.x + r * cos(a + 2 * PI * i / n), O.y + r * sin(a + 2 * PI * i / n)],
            x = _ref5[0],
            y = _ref5[1];
        points.push(new Point(x, y));
      }

      return new Set(points);
    }
  }]);

  return Set;
}(Obj);

exports.Set = Set;

function compute_area(A, B) {
  if (B.length == 1) {
    return B[0].x * A[0].y - A[0].x * B[0].y;
  } else {
    return B[0].x * B[1].y - B[1].x * b[0].y + compute_area(A, B.slice(1));
  }
}

var Circle =
/*#__PURE__*/
function (_Obj3) {
  _inherits(Circle, _Obj3);

  function Circle(center, r) {
    var _this5;

    _classCallCheck(this, Circle);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this));
    _this5.x = center.x;
    _this5.y = center.y;
    _this5.r = r;
    return _this5;
  }

  _createClass(Circle, [{
    key: "translate",
    value: function translate(u) {
      var center = new Point(this.x, this.y).translate(u);
      return new Circle(center, this.r);
    }
  }, {
    key: "center",
    value: function center() {
      return new Point(this.x, this.y);
    }
  }, {
    key: "tangent",
    value: function tangent(a) {
      return new Line(this.x + this.r * cos(a), this.y + this.r * sin(a), a + (a <= PI / 2 ? PI / 2 : -PI * 3 / 2));
    }
  }], [{
    key: "create_circle_with_diameter",
    value: function create_circle_with_diameter(set) {
      var _set$points2 = _slicedToArray(set.points, 2),
          A = _set$points2[0],
          B = _set$points2[1];

      var r = A.distance(B) / 2;
      var center = new Point((A.x + B.x) / 2, (A.y + B.y) / 2);
      return new Circle(center, r);
    }
  }, {
    key: "create_circumcircle",
    value: function create_circumcircle(A, B, C) {
      var s1 = A.x * A.x + A.y * A.y;
      var s2 = B.x * B.x + B.y * B.y;
      var s3 = C.x * C.x + C.y * C.y;
      var a = det3(A.x, B.x, C.x, A.y, B.y, C.y, 1, 1, 1);

      if (ZERO(a)) {
        throw new Error("invalid points");
      }

      var d = det3(s1, s2, s3, A.y, B.y, C.y, 1, 1, 1);
      var e = det3(s1, s2, s3, A.x, B.x, C.x, 1, 1, 1);
      var f = det3(s1, s2, s3, A.x, B.x, C.x, A.y, B.y, C.y);
      var r = sqrt((d * d + e * e) / (4 * a * a) + f / a);
      var center = new Point(d / (2 * a), -e / (2 * a));
      return new Circle(center, r);
    }
  }, {
    key: "create_incircle",
    value: function create_incircle(A, B, C) {
      var a = B.distance(C);
      var b = A.distance(C);
      var c = A.distance(B);
      var s = det2(B.x - A.x, C.x - A.x, B.y - A.y, C.y - A.y) > 0 ? 1 : -1;
      var s1 = sqrt((a - b + c) * (a + b - c));
      var s2 = sqrt((b + c - a) * (b + c + a));

      if (ZERO(s1) || ZERO(s2)) {
        throw new Error("invalid points");
      }

      var r = 0.5 * s1 * s2 / (a + b + c);
      var t = s1 / s2;
      var u = (B.x - A.x) / c;
      var v = (B.y - A.y) / c;
      var center = new Point(A.x + r * (u / t - s * v), A.y = r * (v / t + s * u));
      return new Circle(center, r);
    }
  }]);

  return Circle;
}(Obj);

exports.Circle = Circle;

var Conic =
/*#__PURE__*/
function (_Obj4) {
  _inherits(Conic, _Obj4);

  function Conic(v, a, b, d) {
    var _this6;

    _classCallCheck(this, Conic);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Conic).call(this));
    _this6.d = d;
    _this6.b = b;
    _this6.a = a;
    _this6.x = v.x;
    _this6.y = v.y;
    return _this6;
  }

  _createClass(Conic, [{
    key: "center",
    value: function center() {
      return new Point(this.x, this.y);
    }
  }, {
    key: "foci",
    value: function foci() {
      var c = cos(this.d);
      var s = sin(this.d);
      var f = sqrt(this.a * this.a + this.b * this.b * (this instanceof Ellipse ? -1 : 1));
      var first = {
        x: this.x + c * f,
        y: this.y + s * f
      };
      var second = {
        x: this.x - c * f,
        y: this.y - s * f
      };
      return [first, second];
    }
  }, {
    key: "translate",
    value: function translate(u) {
      return new this.__proto__.constructor(new Point(this.x + u.x, this.y + u.y), this.a, this.b, this.d);
    }
  }, {
    key: "reflect",
    value: function reflect(l) {
      var c = cos(l.a);
      var s = sin(l.a);
      var x = this.x - l.x;
      var y = this.y - l.y;
      var p = 2 * (c * x + s * y);
      return new this.__proto__.constructor(new Point(l.x + p * c - x, l.y + p * s - y), this.a, this.b, principal(2 * l.a - this.d));
    }
  }, {
    key: "symmetric",
    value: function symmetric(O) {
      return new this.__proto__.constructor(new Point(2 * O.x - this.x, 2 * O.y - this.y), this.a, this.b, this.d + (this.d > 0 ? -PI : PI));
    }
  }, {
    key: "rotate",
    value: function rotate(O, a) {
      var c = cos(a);
      var s = sin(a);
      var x = this.x - O.x;
      var y = this.y - O.y;
      return new this.__proto__.constructor(new Point(O.x + c * x - s * y, O.y + s * x + c * y), this.a, this.b, principal(this.d + a));
    }
  }, {
    key: "homothetic",
    value: function homothetic(O, k) {
      return new this.__proto__.constructor(new Point(O.x + k * (this.x - O.x), O.y + k * (this.y - O.y)), abs(k) * this.a, abs(k) * this.b, this.d);
    }
  }, {
    key: "major_axis",
    value: function major_axis() {
      return this.a;
    }
  }, {
    key: "minor_axis",
    value: function minor_axis() {
      return this.b;
    }
  }, {
    key: "argument",
    value: function argument() {
      return this.d;
    }
  }], [{
    key: "create_with_directrix",
    value: function create_with_directrix(A, l, x) {
      var c = cos(l.a);
      var s = sin(l.a);
      var d = s * (A.x - l.x) - c * (A.y - l.y);

      if (ZERO(d)) {
        throw new Error("d is 0");
      }

      var dd = principal(l.a + (d < 0 ? PI / 2 : -PI / 2));

      if (e == 1) {
        return new Parabola(dd, abs(d), A);
      } else {
        var h = 1 / e - e;
        var f = abs(d) * e / h;
        var _x$y = {
          x: A.x + s * f,
          y: A.y - c * f
        },
            _x = _x$y.x,
            y = _x$y.y;
        var v = new Point(_x, y);
        var a = abs(d / h);

        if (e < 1) {
          var _b2 = a * sqrt(1 - e * e);

          return new Ellipse(v, a, _b2, dd);
        } else {
          var _b3 = a * sqrt(e * e - 1);

          return new Hyperbola(v, a, _b3, dd);
        }
      }
    }
  }, {
    key: "create_with_foci",
    value: function create_with_foci(A, B, a) {
      if (a <= 0) {
        throw new Error("invalid major or real axis");
      }

      var f = A.distance(B);

      if (ZERO(f) || EQL(f, a)) {
        throw new Error("invalid parameters");
      }

      var x = (A.x + B.x) / 2;
      var y = (A.y + B.y) / 2;
      var v = new Point(x, y);
      var d = argument(A, B);

      if (f < a) {
        var eb = sqrt(a * a - f * f);
        return new Ellipse(v, a, eb, d);
      } else {
        var hb = sqrt(f * f - a * a);
        return new Hyperbola(v, a, hb, d);
      }
    }
  }]);

  return Conic;
}(Obj);

exports.Conic = Conic;

var Ellipse =
/*#__PURE__*/
function (_Conic) {
  _inherits(Ellipse, _Conic);

  function Ellipse(v, a, b, d) {
    _classCallCheck(this, Ellipse);

    if (a <= 0 || b <= 0 || a < b) {
      throw new Error("invalid parameters");
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(Ellipse).call(this, v, a, b, d));
  }

  _createClass(Ellipse, [{
    key: "point_on",
    value: function point_on(t) {
      var c = cos(this.d);
      var s = sin(this.d);

      var _parametric_ellipse = parametric_ellipse(t, this.x, this.y, this.a, this.b, c, s),
          _parametric_ellipse2 = _slicedToArray(_parametric_ellipse, 2),
          x = _parametric_ellipse2[0],
          y = _parametric_ellipse2[1];

      return new Point(x, y);
    }
  }, {
    key: "eccentricity",
    value: function eccentricity() {
      return sqrt(1 - this.b * this.b / (this.a * this.a));
    }
  }, {
    key: "point_argument",
    value: function point_argument(A) {
      var c = cos(this.d);
      var s = sin(this.d);
      var x = A.x - this.x;
      var y = A.y - this.y;
      var u = c * x + s * y;
      var v = -s * x + c * y;
      return atan2(v * this.a, u * this.b);
    }
  }, {
    key: "tangent",
    value: function tangent(t) {
      var _parametric_ellipse3 = parametric_ellipse(t, this.x, this.y, this.a, this.b, c, s),
          _parametric_ellipse4 = _slicedToArray(_parametric_ellipse3, 2),
          x = _parametric_ellipse4[0],
          y = _parametric_ellipse4[1];

      var a = atan2(this.b * cos(t), -this.a * sin(t));
      return new Line(x, y, a);
    }
  }]);

  return Ellipse;
}(Conic);

exports.Ellipse = Ellipse;

var Hyperbola =
/*#__PURE__*/
function (_Conic2) {
  _inherits(Hyperbola, _Conic2);

  function Hyperbola() {
    _classCallCheck(this, Hyperbola);

    return _possibleConstructorReturn(this, _getPrototypeOf(Hyperbola).apply(this, arguments));
  }

  _createClass(Hyperbola, [{
    key: "point_on",
    value: function point_on(t) {
      var c = cos(this.d);
      var s = sin(this.d);

      if (t <= -PI || t >= PI || t == 0) {
        throw new Error("invalid argument");
      }

      var _parametric_hyperbola = parametric_hyperbola(t, this.x, this.y, this.a, this.b, c, s),
          _parametric_hyperbola2 = _slicedToArray(_parametric_hyperbola, 2),
          x = _parametric_hyperbola2[0],
          y = _parametric_hyperbola2[1];

      return new Point(x, y);
    }
  }, {
    key: "eccentricity",
    value: function eccentricity() {
      return sqrt(1 + this.b * this.b / (this.a * this.a));
    }
  }, {
    key: "point_argument",
    value: function point_argument(A) {
      var c = cos(this.d);
      var s = sin(this.d);
      var x = A.x - this.x;
      var y = A.y - this.y;
      var u = c * x + s * y;
      var v = -s * x + c * y;
      return atan2(this.b, v) - (u < 0 ? PI : 0);
    }
  }, {
    key: "tangent",
    value: function tangent(t) {
      var c = cos(this.d);
      var s = sin(this.d);

      if (t <= -PI || t >= PI) {
        throw new Error("invalid argument");
      }

      var x, y, a;

      if (t == 0 || t == PI) {
        x = this.x;
        y = this.y;
        a = atan2(this.b, this.a * (t == 0 ? 1 : -1));
      } else {
        var _parametric_hyperbola3 = parametric_hyperbola(t, this.x, this.y, this.a, this.b, c, s),
            _parametric_hyperbola4 = _slicedToArray(_parametric_hyperbola3, 2),
            _x2 = _parametric_hyperbola4[0],
            _y = _parametric_hyperbola4[1];

        a = atan2(-this.b, -this.a * cos(t));
      }

      return new Line(x, y, principal(a + this.d));
    }
  }]);

  return Hyperbola;
}(Conic);

exports.Hyperbola = Hyperbola;

var Parabola =
/*#__PURE__*/
function (_Conic3) {
  _inherits(Parabola, _Conic3);

  _createClass(Parabola, [{
    key: "point_on",
    value: function point_on(t) {
      var c = cos(this.d);
      var s = sin(this.d);

      if (t <= -PI || t >= PI || t == 0) {
        throw new Error("invalid argument");
      }

      var _parametric_parabola = parametric_parabola(t, this.x, this.y, this.a, this.b, c, s),
          _parametric_parabola2 = _slicedToArray(_parametric_parabola, 2),
          x = _parametric_parabola2[0],
          y = _parametric_parabola2[1];

      return new Point(x, y);
    }
  }]);

  function Parabola(v, a, d) {
    _classCallCheck(this, Parabola);

    if (a < 0) {
      throw new Error("Invalid a");
    }

    var nx = v.x + a * Math.cos(d) / 2,
        ny = v.y + a * Math.sin(d) / 2;
    return _possibleConstructorReturn(this, _getPrototypeOf(Parabola).call(this, new Point(nx, ny), a, 0, d));
  }

  _createClass(Parabola, [{
    key: "center",
    value: function center() {
      throw new Error("undefined center");
    }
  }, {
    key: "eccentricity",
    value: function eccentricity() {
      return 1;
    }
  }, {
    key: "point_argument",
    value: function point_argument(A) {
      var c = cos(this.d);
      var s = sin(this.d);
      var x = A.x - this.x;
      var y = A.y - this.y;
      var u = c * x + s * y;
      var v = -s * x + c * y;
      return atan2(-v, (this.a - v * v / this.a) / 2);
    }
  }, {
    key: "tangent",
    value: function tangent(t) {
      if (t <= -PI || t >= PI) {
        throw new Error("invalid argument");
      }

      var c = cos(this.d);
      var s = sin(this.d);

      var _parametric_parabola3 = parametric_parabola(t, this.x, this.y, this.a, c, s),
          _parametric_parabola4 = _slicedToArray(_parametric_parabola3, 2),
          x = _parametric_parabola4[0],
          y = _parametric_parabola4[1];

      var a = principal(atan2(-1 - cos(t), sin(t)) + this.d);
      return new Line(x, y, a);
    }
  }]);

  return Parabola;
}(Conic);

exports.Parabola = Parabola;

var TriangleMaker =
/*#__PURE__*/
function () {
  function TriangleMaker(vertices) {
    _classCallCheck(this, TriangleMaker);

    this.vertices = vertices.slice();
  }

  _createClass(TriangleMaker, [{
    key: "assign_A_B",
    value: function assign_A_B() {
      var A, B;

      switch (this.vertices.length) {
        case 0:
          A = new Point(0, 0);
          B = new Point(this.a * this.x, this.a * this.y);
          this.vertices = [A, B];
          break;

        case 1:
          var _this$vertices = _slicedToArray(this.vertices, 1);

          A = _this$vertices[0];
          B = new Point(A.x + this.a * this.x, A.y + this.a * this.y);
          this.vertices = [A, B];
          break;

        case 2:
          var _this$vertices2 = _slicedToArray(this.vertices, 2);

          A = _this$vertices2[0];
          B = _this$vertices2[1];
          this.a = A.distance(B);

          if (ZERO(this.a)) {
            throw new Error("invalid points");
          }

          var _ref6 = [(B.x - A.x) / this.a, (B.y - A.y) / this.a];
          this.x = _ref6[0];
          this.y = _ref6[1];
          break;
      }
    }
  }, {
    key: "assign_C",
    value: function assign_C(u, v) {
      var _this$vertices3 = _slicedToArray(this.vertices, 2),
          A = _this$vertices3[0],
          B = _this$vertices3[1];

      var C = new Point(A.x + u * this.x - v * this.y, A.y + v * this.x + u * this.y);
      this.vertices = [A, B, C];
    }
  }], [{
    key: "define_optimal_scalene",
    value: function define_optimal_scalene(vertices, a, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      tm.assign_C(tm.a * .375, tm.a * .61237244);
      return tm.vertices;
    }
  }, {
    key: "define_triangle_SSS",
    value: function define_triangle_SSS(vertices, a, b, c, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      a = tm.a;
      var s1 = (b - a + c) * (b + a - c);
      var s2 = (a + c - b) * (a + b + c);
      var u, v;

      if (ZERO(s2)) {
        u = -c;
        v = 0;
      } else {
        var _s2 = s1 / s2;

        if (_s2 < 0) {
          throw new Error("invalid lengths");
        }

        t = 2 * atan(sqrt(_s2));
        u = c * cos(t);
        v = c * sin(t);
      }

      tm.assign_C(u, v);
      return tm.vertices;
    }
  }, {
    key: "define_triangle_SAA",
    value: function define_triangle_SAA(vertices, a, u, v, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      var cu = cos(u);
      var su = sin(u);
      var cv = cos(v);
      var sv = sin(v);
      var d = cu * sv + su * cv;

      if (ZERO(d)) {
        throw new Error("invalid angles");
      }

      tm.assign_A_B();
      var c = a * sv / d;
      tm.assign_C(c * cu, c * su);
      return tm.vertices;
    }
  }, {
    key: "define_triangle_SAS",
    value: function define_triangle_SAS(vertices, a, u, c, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      tm.assign_C(c * cos(u), c * sin(u));
      return tm.vertices;
    }
  }, {
    key: "define_triangle_SSA",
    value: function define_triangle_SSA(vertices, a, c, v, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      var cv = cos(v);
      var sv = sin(v);
      var s = c * c - a * a * sv * sv;

      if (s < 0) {
        throw new Error("invalid parameters");
      }

      var b = a * cv + sqrt(s);
      tm.assign_C(a - b * cv, b * sv);
      return tm.vertices;
    }
  }, {
    key: "define_right_SS",
    value: function define_right_SS(vertices, a, b, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      a = tm.a;
      tm.assign_C(a, b);
      return tm.vertices;
    }
  }, {
    key: "define_right_SA",
    value: function define_right_SA(vertices, a, u, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      if (u >= PI / 2 || u <= -PI / 2) {
        throw new Error("invalid angle");
      }

      tm.assign_A_B();
      a = tm.a;
      tm.assign_C(a, a * tan(u));
      return tm.vertices;
    }
  }, {
    key: "define_isosceles_SS",
    value: function define_isosceles_SS(vertices, a, b, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      a = tm.a / 2;
      var s = b * b - a * a;

      if (s < 0) {
        throw new Error("invalid lengths");
      }

      tm.assign_C(a, sqrt(s));
      return tm.vertices;
    }
  }, {
    key: "define_isosceles_SA",
    value: function define_isosceles_SA(vertices, a, u, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      if (u >= PI / 2 || u <= -PI / 2) {
        throw new Error("invalid angle");
      }

      tm.assign_A_B();
      a = tm.a / 2;
      tm.assign_C(a, a * tan(u));
      return tm.vertices;
    }
  }, {
    key: "define_equilateral",
    value: function define_equilateral(vertices, a, t) {
      var tm = new TriangleMaker(vertices);

      if (vertices.length < 2) {
        tm.a = a;
        tm.x = cos(t);
        tm.y = sin(t);
      }

      tm.assign_A_B();
      a = tm.a / 2;
      tm.assign_C(a, a * sqrt(3));
      return tm.vertices;
    }
  }]);

  return TriangleMaker;
}();

exports.TriangleMaker = TriangleMaker;

var QuadrilateralMaker =
/*#__PURE__*/
function () {
  function QuadrilateralMaker(vertices) {
    _classCallCheck(this, QuadrilateralMaker);

    this.vertices = vertices.slice();
  }
  /** Assign the positions of the vertices of a quadrilateral ABCD
   * @param {Number} x - x-component of vector in direction of first side (A-B)
   * @param {Number} y - y-component of vector in direction of first side (A-B)
   * @param {Number} u - x-component of vector in direction of second side (B-C)
   * @param {Number} v - y-component of vector in direction of second side (B-C)
   * @param {Number} l - length of first side (A-B)
   * @param {Number} m - length of second side (B-C)
   * @param {Boolean} square - is the quadrilateral a square? (i.e., length of second side equals length of first side)
   * @returns {Array.<Point>} - the vertices A,B,C,D
   */


  _createClass(QuadrilateralMaker, [{
    key: "assign",
    value: function assign(x, y, u, v, l, m, square) {
      var _this$vertices4 = _slicedToArray(this.vertices, 3),
          A = _this$vertices4[0],
          B = _this$vertices4[1],
          C = _this$vertices4[2];

      if (this.vertices.length < 3) {
        switch (this.vertices.length) {
          case 0:
            A = new Point(0, 0);
            B = new Point(l * x, l * y);
            break;

          case 1:
            B = new Point(A.x + l * x, A.y + l * y);
            break;

          case 2:
            l = A.distance(B);

            if (ZERO(l)) {
              throw new Error("invalid points");
            }

            x = (B.x - A.x) / l;
            y = (B.y - A.y) / l;
            break;
        }

        if (square) {
          m = l;
        }

        C = new Point(B.x + m * (u * x - v * y), B.y + m * (v * x + u * y));
      }

      var D = new Point(A.x + C.x - B.x, A.y + C.y - B.y);
      this.vertices = [A, B, C, D];
      return this.vertices;
    }
  }], [{
    key: "define_parallelogram_SSA",
    value: function define_parallelogram_SSA(vertices, m, a, l, b) {
      var x, y, u, v;

      if (vertices.length < 2) {
        x = cos(b);
        y = sin(b);
        u = cos(a);
        v = sin(a);
      } else {
        u = cos(a);
        v = sin(a);
      }

      var qm = new QuadrilateralMaker(vertices);
      return qm.assign(x, y, u, v, l, m);
    }
  }, {
    key: "define_parallelogram_VV",
    value: function define_parallelogram_VV(vertices, u, v) {
      var _vertices = _slicedToArray(vertices, 1),
          A = _vertices[0];

      if (vertices.length == 0) {
        A = new Point(0, 0);
      }

      var B = new Point(A.x + u.x, A.y + u.y);
      var C = new Point(A.x + u.x + v.x, A.y + u.y + v.y);
      var D = new Point(A.x + v.x, A.y + v.y);
      return [A, B, C, D];
    }
  }, {
    key: "define_rectangle",
    value: function define_rectangle(vertices, l, m, b) {
      var x, y;

      if (vertices.length < 2) {
        x = cos(b);
        y = sin(b);
      }

      var qm = new QuadrilateralMaker(vertices);
      return qm.assign(x, y, 0, 1, l, m);
    }
  }, {
    key: "define_square",
    value: function define_square(vertices, l, b) {
      var x, y;

      if (vertices.length < 2) {
        x = cos(b);
        y = sin(b);
      }

      var qm = new QuadrilateralMaker(vertices);
      return qm.assign(x, y, 0, 1, l, l, true);
    }
  }]);

  return QuadrilateralMaker;
}();

exports.QuadrilateralMaker = QuadrilateralMaker;

function orthogonal_projection(A, l) {
  var c = cos(l.a);
  var s = sin(l.a);
  var p = c * (A.x - l.x) + s * (A.y - l.y);
  return new Point(l.x + p * c, l.y + p * s);
}

function intersection_point(x1, y1, a1, x2, y2, a2) {
  var c1 = cos(a1);
  var s1 = sin(a1);
  var c2 = cos(a2);
  var s2 = sin(a2);
  var d = det2(c1, c2, s1, s2);

  if (ZERO(d)) {
    throw new Error("parallel lines");
  }

  var b1 = det2(x1, y1, c1, s1);
  var b2 = det2(x2, y2, c2, s2);
  return new Point(det2(c1, c2, b1, b2) / d, det2(s1, s2, b1, b2) / d);
}

function parallel_projection(A, l1, l2) {
  return intersection_point(l1.x, l1.y, l1.a, A.x, A.y, l2.a);
}

function lines_intersection(l1, l2) {
  return intersection_point(l1.x, l1.y, l1.a, l2.x, l2.y, l2.a);
}

function line_segment_intersection(set, a, b, c, d) {
  var _set3 = _slicedToArray(set, 2),
      p = _set3[0],
      t = _set3[1];

  if (t === undefined) {
    return [];
  }

  function dist(p) {
    return a * p.x + b * p.y + c;
  }

  var e = dist(t, a, b, c);

  if (d * e <= EPSILON && abs(e) > EPSILON) {
    var f = abs(d) + abs(e);
    var g = f == 0 ? 0 : abs(d) / f;
    var p1 = new Point(p.x + g * (t.x - p.x), p.y + g * (t.y - p.y));
    return [p1].concat(line_segment_intersection(set.slice(1), a, b, c, e));
  }

  return line_segment_intersection(set.slice(1), a, b, c, e);
}

function line_set_intersection(l, s) {
  if (s.points.length == 0) {
    return new Set([]);
  }

  var a = sin(l.a);
  var b = -cos(l.a);
  var c = -a * l.x - b * l.y;

  function dist(p) {
    return a * p.x + b * p.y + c;
  }

  return new Set(line_segment_intersection(s.points, a, b, c, dist(s.points[0], a, b, c)));
}
/** Solve a quadratic equation a*x^2 + b*x + c = 0
 */


function solve(a, b, c) {
  if (ZERO(a)) {
    if (ZERO(b)) {
      return [];
    }

    return [-c / b, 1];
  }

  var d = b * b - 4 * a * c;

  if (d < 0) {
    return [];
  }

  if (ZERO(d)) {
    return [-b / (2 * a)];
  }

  var r = sqrt(d);
  var x1 = (-b - r) / (2 * a);
  var x2 = (-b + r) / (2 * a);
  return [x1, x2];
}

function line_circle_intersection(l, C) {
  var x = l.x - C.x;
  var y = l.y - C.y;
  var c = cos(l.a);
  var s = sin(l.a);
  var roots = solve(1, 2 * (x * c + y * s), x * x + y * y - C.r * C.r);
  return new Set(roots.map(function (t) {
    return new Point(l.x + c * t, l.y + s * t);
  }));
}

function line_conic_intersection(l, C) {
  var c = cos(C.d);
  var s = sin(C.d);
  var a = C.a * C.a;
  var b = C.b * C.b;
  var x = c * (l.x - C.x) + s * (l.y - C.y);
  var y = -s * (l.x - C.x) + c * (l.y - C.y);
  var ca = cos(l.a);
  var sa = sin(l.a);
  var u = c * ca + s * sa;
  var v = -s * ca + c * sa;
  var roots;

  if (C instanceof Ellipse) {
    roots = solve(u * u / a + v * v / b, 2 * (x * u / a + y * v / b), x * x / a + y * y / b - 1);
  } else if (C instanceof Hyperbola) {
    roots = solve(u * u / a - v * v / b, 2 * (x * u / a - y * v / b), x * x / a - y * y / b - 1);
  } else if (C instanceof Parabola) {
    roots = solve(v * v / (2 * C.a), y * v / C.a - u, y * y / (2 * C.a) - x - C.a / 2);
  }

  return new Set(roots.map(function (t) {
    return new Point(l.x + ca * t, l.y + sa * t);
  }));
}

function sets_intersection(s1, s2) {
  if (s1.points.length == 0 || s2.points.length == 0) {
    return new Set([]);
  }

  var out = [];
  var s = s1.points[s1.points.length - 1];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = s1.points[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var t = _step2.value;
      var v = s2.points[s2.points.length - 1];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = s2.points[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var w = _step3.value;

          if (max(s.x, t.x) >= min(v.x, w.x) && max(v.x, w.x) >= min(s.x, t.x) && max(s.y, t.y) >= min(v.y, w.y) && max(v.y, w.y) >= min(s.y, t.y)) {
            var d1 = s.distance(t);
            var c1 = (t.x - s.x) / d1;

            var _s3 = (t.y - s.y) / d1;

            var d2 = v.distance(w);
            var c2 = (w.x - v.x) / d2;

            var _s4 = (w.y - v.y) / d2;

            var x = v.x - s.x;
            var y = v.y - s.y;
            var d = det2(c1, c2, _s3, _s4);

            if (ZERO(d)) {
              if (ZERO(det2(x, y, c1, _s3))) {
                out.push(s);
              }
            } else {
              var t1 = det2(x, y, c2, _s4) / d;
              var t2 = det2(x, y, c1, _s3) / d;

              if (t1 >= 0 && t1 <= d1 && t2 > +0 && t2 <= d2) {
                out.push(new Point(s.x + c1 * t1, s.y + _s3 * t1));
              }
            }
          }

          v = w;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      s = t;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return new Set(out);
}

function circles_intersection(c1, c2) {
  var x = c2.x - c1.x;
  var y = c2.y - c1.y;
  var a = hypot(x, y);
  var b = c2.r;
  var c = c1.r;

  if (ZERO(a) || a > b + c || a < abs(b - c)) {
    return new Set([]);
  }

  x /= a;
  y /= a;

  if (a == b + c || a == abs(b - c)) {
    return new Set([new Point(c1.x + c * x, c2.x + c * y)]);
  }

  var t = 2 * atan(sqrt((b - a + c) * (b + a - c) / ((a + c - b) * (a + b + c))));
  var u = c * cos(t);
  var v = c * sin(t);
  var first = new Point(c1.x + u * x - v * y, c1.y + v * x + u * y);
  var second = new Point(c1.x + u * x + v * y, c1.y - v * x + u * y);
  return new Set([first, second]);
}

function circle_set_intersection(set, c) {
  var out = [];

  if (set.points.length < 2) {
    return [];
  }

  var s = set.points[set.points.length - 1];

  function dist(s) {
    return hypot(s.x - c.x, s.y - c.y);
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = set.points[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var t = _step4.value;
      var d = dist(s);

      var _e2 = dist(t);

      if (d >= c.r || _e2 >= c.r) {
        var f = s.distance(t);
        var x = s.x - c.x;
        var y = s.y - c.y;
        var u = (t.x - s.x) / f;
        var v = (t.y - s.y) / f;
        var roots = solve(1, 2 * (x * u + y * v), x * x + y * y - c.r * c.r);

        if (roots.length > 0) {
          var _roots = _slicedToArray(roots, 2),
              t1 = _roots[0],
              t2 = _roots[1];

          if (roots.length > 1 && t2 >= 0 && t2 <= f) {
            var v2 = new Point(s.x + u * t2, s.y + v * t2);
            out.push(v2);
          }

          if (t1 >= 0 && t1 <= f) {
            var v1 = new Point(s.x + u * t1, s.y + v * t1);
            out.push(v1);
          }
        }
      }

      s = t;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return new Set(out);
}

function clean_label(text) {
  text = text + '';
  text = text.replace("'", "′");
  var superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  var subscripts = '₀₁₂₃₄₅₆₇₈₉';
  text = text.replace(/\^(\d)/g, function (m) {
    return superscripts[parseInt(m[1])];
  });
  text = text.replace(/_(\d)/g, function (m) {
    return subscripts[parseInt(m[1])];
  });
  return text;
}

var Drawer =
/*#__PURE__*/
function () {
  function Drawer() {
    _classCallCheck(this, Drawer);
  }

  _createClass(Drawer, [{
    key: "initialise",
    value: function initialise() {
      this.restore_default_settings();
      this.restore_local_settings();
      this.setup_frame(-2, -2, 8, 6, 1);
      this.settings_stack = [];
    }
  }, {
    key: "restore_default_settings",
    value: function restore_default_settings() {
      this.global = {
        label: false,
        label_segment: NONE,
        aria_mode: NOSPOILERS,
        color: BLACK,
        size: 1,
        step: 3,
        style: FULL,
        shape: DOT,
        part: ENTIRE,
        dir: FORTH,
        arrow: NONE,
        font_desc: '',
        segment: SIMPLE,
        angle: SIMPLE,
        dec: NONE,
        opacity: 1,
        font_size: 0.2,
        bold: false,
        italic: false,
        font_family: 'sans-serif',
        close: true,
        label_dist: 0.2
      };
    }
  }, {
    key: "restore_local_settings",
    value: function restore_local_settings() {
      this.local = Object.assign({}, this.global);
    }
  }, {
    key: "push_local_settings",
    value: function push_local_settings() {
      this.settings_stack.push(this.local);
      this.local = _objectSpread({}, this.local);
    }
  }, {
    key: "pop_local_settings",
    value: function pop_local_settings() {
      this.local = this.settings_stack.pop();
    }
  }, {
    key: "setup_frame",
    value: function setup_frame(min_x, min_y, max_x, max_y, scale) {
      this.min_x = min_x;
      this.min_y = min_y;
      this.max_x = max_x;
      this.max_y = max_y;
      this.scale = scale || 1;
      this.font_scale = 100;
      this.default_dist = 0.2;
    }
  }, {
    key: "SIZE",
    value: function SIZE(x) {
      return this.local.size * x / this.scale;
    }
  }, {
    key: "check_basic_settings",
    value: function check_basic_settings() {
      this.check_color();
      this.check_size();
      this.check_style();
    }
  }, {
    key: "set_xy",
    value: function set_xy(A, B, C, d) {
      var l1 = B.distance(A);

      if (ZERO(l1)) {
        throw new Error("invalid angle");
      }

      var x1 = d * (A.x - B.x) / l1;
      var y1 = d * (A.y - B.y) / l1;
      var l2 = B.distance(C);

      if (ZERO(l2)) {
        throw new Error("invalid angle");
      }

      var x2 = d * (C.x - B.x) / l2;
      var y2 = d * (C.y - B.y) / l2;
      return [x1, y1, x2, y2];
    } // distance to the furthest corner of the frame

  }, {
    key: "get_max",
    value: function get_max(x, y) {
      var min_x = this.min_x,
          min_y = this.min_y,
          max_x = this.max_x,
          max_y = this.max_y;
      var m = hypot(min_x - x, min_y - y);
      var l = hypot(max_x - x, min_y - y);

      if (l > m) {
        m = l;
      }

      l = hypot(max_x - x, max_y - y);

      if (l > m) {
        m = l;
      }

      l = hypot(min_x - x, max_y - y);

      if (l > m) {
        m = l;
      }

      return m;
    }
  }, {
    key: "draw_hyperbolic_arc",
    value: function draw_hyperbolic_arc(x0, y0, a, b, f, g, c, s) {
      var e = atan(b / this.get_max(x0, y0));

      if (f < -e) {
        this.draw_branch(-PI + e, -e, x0, y0, a, b, f, g, c, s);
      }

      if (g > e) {
        this.draw_branch(e, PI - e, x0, y0, a, b, f, g, c, s);
      }
    }
  }, {
    key: "draw_conic",
    value: function draw_conic(C) {
      this.check_basic_settings();

      if (C instanceof Parabola) {
        this.draw_parabolic_arc(C.x, C.y, C.a, -PI, PI, cos(C.d), sin(C.d));
      } else if (C instanceof Ellipse) {
        this.draw_elliptic_arc(C.x, C.y, C.a, C.b, -PI, PI, cos(C.d), sin(C.d));
      } else if (C instanceof Hyperbola) {
        this.draw_hyperbolic_arc(C.x, C.y, C.a, C.b, -PI, PI, cos(C.d), sin(C.d));
      }
    }
  }, {
    key: "draw_conic_arc",
    value: function draw_conic_arc(C, f, g) {
      this.check_basic_settings();

      if (C instanceof Ellipse && f > g) {
        g += 360;
      }

      if (f >= g) {
        throw new Error("invalid boundaries");
      }

      if (C instanceof Parabola) {
        this.draw_parabolic_arc(C.x, C.y, C.a, f, g, cos(C.d), sin(C.d));
      } else if (C instanceof Ellipse) {
        this.draw_elliptic_arc(C.x, C.y, C.a, C.b, f, g, cos(C.d), sin(C.d));
      } else if (C instanceof Hyperbola) {
        this.draw_hyperbolic_arc(C.x, C.y, C.a, C.b, f, g, cos(C.d), sin(C.d));
      }
    }
  }]);

  return Drawer;
}();

exports.Drawer = Drawer;
var labels = ["simple", "double", "triple"];
exports.labels = labels;
var SIMPLE = labels[0],
    DOUBLE = labels[1],
    TRIPLE = labels[2];
var styles = ["full", "dotted", "dashed"];
exports.styles = styles;
var FULL = styles[0],
    DOTTED = styles[1],
    DASHED = styles[2];
var shapes = ["dot", "disc", "box", "plus", "cross"];
exports.shapes = shapes;
var DOT = shapes[0],
    DISC = shapes[1],
    BOX = shapes[2],
    PLUS = shapes[3],
    CROSS = shapes[4];
var parts = ["entire", "half"];
exports.parts = parts;
var ENTIRE = parts[0],
    HALF = parts[1];
var dirs = ["right", "forth", "back"];
exports.dirs = dirs;
var RIGHT = dirs[0],
    FORTH = dirs[1],
    BACK = dirs[2];
var arrows = ["none", "arrow", "arrows"];
exports.arrows = arrows;
var NONE = arrows[0],
    ARROW = arrows[1],
    ARROWS = arrows[2];
var colors = ['black', 'darkgray', 'gray', 'lightgray', 'white', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow'];
exports.colors = colors;
var BLACK = colors[0],
    DARKGRAY = colors[1],
    GRAY = colors[2],
    LIGHTGRAY = colors[3],
    WHITE = colors[4],
    RED = colors[5],
    GREEN = colors[6],
    BLUE = colors[7],
    CYAN = colors[8],
    MAGENTA = colors[9],
    YELLOW = colors[10];
var aria_modes = ['verbose', 'nospoilers'];
var VERBOSE = aria_modes[0],
    NOSPOILERS = aria_modes[1];

function dp(n) {
  return parseFloat(n).toFixed(7);
}

var SVGDrawer =
/*#__PURE__*/
function (_Drawer) {
  _inherits(SVGDrawer, _Drawer);

  function SVGDrawer(svg, doc) {
    var _this7;

    _classCallCheck(this, SVGDrawer);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(SVGDrawer).call(this));
    _this7.svg = svg;
    _this7.doc = doc || document;
    _this7.shapes = {};
    _this7.elements = {};

    _this7.initialise();

    _this7.before_render();

    return _this7;
  }

  _createClass(SVGDrawer, [{
    key: "initialise",
    value: function initialise() {
      _get(_getPrototypeOf(SVGDrawer.prototype), "initialise", this).call(this);

      var defs = this.svg.querySelector('defs');

      if (!defs) {
        defs = this.doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
        this.svg.appendChild(defs);
      }

      var def_items = {
        'eukleides-pattern-stripes': "\n                <pattern id=\"eukleides-pattern-stripes\" x=\"0\" y=\"0\" width=\"0.75\" height=\"0.75\" patternContentUnits=\"userSpaceOnUse\" patternUnits=\"userSpaceOnUse\" viewBox=\"0 0 10 10\" fill=\"white\" patternTransform=\"rotate(57)\"> \n                    <rect x=\"1\" y=\"0\" width=\"9\" height=\"10\"/>\n                </pattern>\n            ",
        'eukleides-mask-stripes': "\n                <mask id=\"eukleides-mask-stripes\" x=\"-0.5\" y=\"-0.5\" width=\"2\" height=\"2\" maskContentUnits=\"userSpaceOnUse\">\n                    <rect x=\"-1000000\" y=\"-1000000\" width=\"2000000\" height=\"2000000\" fill=\"url(#eukleides-pattern-stripes)\">\n                </mask>\n            ",
        'eukleides-pattern-dots': "\n                <pattern id=\"eukleides-pattern-dots\" width=\"0.5\" height=\"0.5\" patternContentUnits=\"userSpaceOnUse\" patternUnits=\"userSpaceOnUse\" viewBox=\"0 0 1 1\" fill=\"white\" patternTransform=\"rotate(27)\"> \n                    <rect x=\"0\" y=\"0\" width=\"1\" height=\"1\" fill=\"white\"/>\n                    <circle cx=\"0.5\" cy=\"0.5\" r=\"0.15\" fill=\"black\"/>\n                </pattern>\n            ",
        'eukleides-mask-dots': "\n                <mask id=\"eukleides-mask-dots\" x=\"-0.5\" y=\"-0.5\" width=\"2\" height=\"2\" maskContentUnits=\"userSpaceOnUse\">\n                    <rect x=\"-1000000\" y=\"-1000000\" width=\"2000000\" height=\"2000000\" fill=\"url(#eukleides-pattern-dots)\">\n                </mask>\n            "
      };

      for (var _i2 = 0, _Object$entries = Object.entries(def_items); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
            id = _Object$entries$_i[0],
            def = _Object$entries$_i[1];

        if (!defs.querySelector('#' + id)) {
          defs.innerHTML += def;
        }
      }
    }
  }, {
    key: "before_render",
    value: function before_render() {
      this.used_ids = {};
      this.idacc = 0;
      this.point_labels = [];
    }
  }, {
    key: "after_render",
    value: function after_render() {
      var _this8 = this;

      Object.entries(this.elements).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            id = _ref8[0],
            element = _ref8[1];

        if (!_this8.used_ids[id]) {
          delete _this8.elements[id];
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = _this8.svg.querySelectorAll("[data-eukleides-id=\"".concat(id, "\"]"))[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var el = _step5.value;
              el.parentElement.removeChild(el);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      });
    }
  }, {
    key: "add_point_label",
    value: function add_point_label(p) {
      this.point_labels.push({
        point: p,
        label: clean_label(this.local.label_text)
      });
    }
  }, {
    key: "has_label_for_point",
    value: function has_label_for_point(p) {
      if (this.aria_mode == VERBOSE) {
        return true;
      }

      var d = this.point_labels.find(function (d) {
        return d.point.x == p.x && d.point.y == p.y;
      });
      return d;
    }
  }, {
    key: "label_for_point",
    value: function label_for_point(p) {
      var d = this.point_labels.find(function (d) {
        return d.point.x == p.x && d.point.y == p.y;
      });
      return d ? d.label : "(".concat(dpformat(p.x), ",").concat(dpformat(p.y), ")");
    }
  }, {
    key: "setup_frame",
    value: function setup_frame(min_x, min_y, max_x, max_y, scale) {
      _get(_getPrototypeOf(SVGDrawer.prototype), "setup_frame", this).call(this, min_x, min_y, max_x, max_y, scale);

      this.svg.setAttribute('viewBox', "".concat(dp(min_x), " ").concat(dp(min_y), " ").concat(dp(max_x - min_x), " ").concat(dp(max_y - min_y)));
      this.svg.style.transform = "scale(".concat(dp(scale), ",").concat(dp(-scale), ")");
    }
  }, {
    key: "check_color",
    value: function check_color() {}
  }, {
    key: "check_font",
    value: function check_font() {}
  }, {
    key: "check_size",
    value: function check_size() {}
  }, {
    key: "check_style",
    value: function check_style() {}
  }, {
    key: "check_angle_style",
    value: function check_angle_style() {}
  }, {
    key: "set_fill",
    value: function set_fill(e) {
      switch (this.local.style) {
        case DOTTED:
          e.setAttribute('mask', 'url(#eukleides-mask-dots)');
          break;

        case DASHED:
          e.setAttribute('mask', 'url(#eukleides-mask-stripes)');
          break;
      }

      e.setAttribute('fill', this.local.color);
      e.style.opacity = this.local.opacity;
    }
  }, {
    key: "set_stroke",
    value: function set_stroke(e) {
      e.setAttribute('fill', 'none');
      e.setAttribute('stroke', this.local.color);
      e.setAttribute('stroke-width', this.local.size * 0.02);
      e.setAttribute('stroke-linejoin', 'round');
      e.setAttribute('stroke-linecap', 'round');
      e.style.opacity = this.local.opacity;
    }
  }, {
    key: "set_style",
    value: function set_style(e) {
      var s = '';

      switch (this.local.style) {
        case FULL:
          s = '1 0';
          break;

        case DOTTED:
          var lineWidth = e.getAttribute('stroke-width') || this.local.size * 0.02;
          s = "0 0.2";
          break;

        case DASHED:
          s = "".concat(this.SIZE(0.15), " ").concat(this.SIZE(0.1));
          break;
      }

      e.setAttribute('stroke-dasharray', s);
    }
  }, {
    key: "set_font",
    value: function set_font(e) {
      var size = this.font_scale * this.SIZE(this.local.font_size) / 100;
      e.style['font'] = "".concat(this.local.italic ? 'italic ' : '').concat(this.local.bold ? 'bold ' : '').concat(dp(size), "pt ").concat(this.local.font_family);
    }
  }, {
    key: "element",
    value: function element(name, attr, content) {
      var id = this.local.key || this.idacc++;
      this.used_ids[id] = true;
      var olde = this.elements[id];
      var e;

      if (olde && olde.tagName == name) {
        e = olde;
        e.removeAttribute('transform');
      } else {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.svg.querySelectorAll("[data-eukleides-id=\"".concat(id, "\"]"))[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _e3 = _step6.value;

            _e3.parentElement.removeChild(_e3);
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        e = this.doc.createElementNS('http://www.w3.org/2000/svg', name);
        e.setAttribute('data-eukleides-id', id);
      }

      if (name != 'text') {
        e.setAttribute('role', 'presentation');
      }

      this.elements[id] = e;

      if (attr) {
        for (var _i3 = 0, _Object$entries2 = Object.entries(attr); _i3 < _Object$entries2.length; _i3++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
              k = _Object$entries2$_i[0],
              v = _Object$entries2$_i[1];

          e.setAttribute(k, v);
        }
      }

      if (content !== undefined) {
        e.innerHTML = content;
      }

      this.svg.appendChild(e);
      return e;
    }
  }, {
    key: "transform",
    value: function transform(element, def) {
      var odef = element.getAttribute('transform') || '';
      element.setAttribute('transform', [odef, def].join(' '));
      return element;
    }
  }, {
    key: "describe_style",
    value: function describe_style(desc) {
      switch (this.local.style) {
        case DOTTED:
          desc = "dotted ".concat(desc);
          break;

        case DASHED:
          desc = "dashed ".concat(desc);
          break;
      }

      return desc;
    }
  }, {
    key: "describe_arrows",
    value: function describe_arrows(desc) {
      if (this.local.arrow == NONE) {
        return desc;
      } else if (this.local.arrow == ARROWS) {
        desc += ' with an arrow at each end';
      } else {
        desc += this.local.dir == BACK ? ' with an arrow at the start' : ' with an arrow at the end';
      }

      return desc;
    }
  }, {
    key: "set_aria_label",
    value: function set_aria_label(element, label) {
      if (this.local.color_description) {
        label = "".concat(this.local.color_description, " ").concat(label);
      } else if (colors.contains(this.local.color) && this.local.color != this.global.color) {
        label = "".concat(this.local.color, " ").concat(label);
      }

      if (this.local.opacity < 1) {
        label = "transparent ".concat(label);
      }

      if (this.local.description !== undefined) {
        label = this.local.description;
      }

      element.setAttribute('aria-label', label);

      if (element.getAttribute('role') == 'presentation') {
        element.setAttribute('role', 'img');
      }
    }
  }, {
    key: "handle_dragging",
    value: function handle_dragging(element, callback) {
      var _this9 = this;

      var onstart = function onstart(e) {
        var ondrag = callback();
        e.stopPropagation();
        e.preventDefault();
        e = e.touches ? e.touches[0] : e;
        var _ref9 = [e.clientX, e.clientY],
            sx = _ref9[0],
            sy = _ref9[1];

        var onmove = function onmove(e) {
          e.preventDefault();
          e = e.touches ? e.touches[0] : e;
          var m = element.getScreenCTM().inverse();

          var p = _this9.svg.createSVGPoint();

          p.x = e.clientX;
          p.y = -e.clientY;
          var tp1 = p.matrixTransform(m);
          p.x = sx;
          p.y = -sy;
          var tp0 = p.matrixTransform(m);
          var dx = tp1.x - tp0.x,
              dy = tp1.y - tp0.y;
          ondrag(dx, dy);
        };

        var onend = function onend(e) {
          e.preventDefault();
          document.removeEventListener('mousemove', onmove);
          document.removeEventListener('mouseup', onend);
          document.removeEventListener('touchmove', onmove);
          document.removeEventListener('touchend', onend);
          document.removeEventListener('touchcancel', onend);
        };

        document.addEventListener('mousemove', onmove);
        document.addEventListener('touchmove', onmove);
        document.addEventListener('mouseup', onend);
        document.addEventListener('touchend', onend);
        document.addEventListener('touchcancel', onend);
      };

      element.addEventListener('mousedown', onstart);
      element.addEventListener('touchstart', onstart);
    }
  }, {
    key: "show",
    value: function show(element) {
      this.svg.appendChild(element);
      return element;
    }
  }, {
    key: "draw_dot",
    value: function draw_dot(x, y, r) {
      var c = this.element('circle', {
        cx: x,
        cy: y,
        r: r
      });
      this.set_fill(c);
      return c;
    }
  }, {
    key: "arc",
    value: function arc(x, y, r, a, b) {
      var d = b - a;
      var sweep = 0;

      if (d > 0) {
        d -= 2 * PI;
      }

      var large_circle = Math.abs(d) >= PI ? 1 : 0;

      if (d >= 2 * PI) {
        return this.element('circle', {
          cx: x,
          cy: y,
          r: r
        });
      } else {
        return this.element('path', {
          d: "M ".concat(dp(x + Math.cos(a) * r), " ").concat(dp(y + Math.sin(a) * r), " A ").concat(dp(r), " ").concat(dp(r), " 0 ").concat(large_circle, " ").concat(sweep, " ").concat(dp(x + Math.cos(b) * r), " ").concat(dp(y + Math.sin(b) * r))
        });
      }
    }
  }, {
    key: "draw_dash",
    value: function draw_dash(x, y, angle, a, b) {
      var e = this.transform(this.element('path', {
        d: "M ".concat(dp(a), " 0 L ").concat(dp(b), " 0")
      }), "translate(".concat(dp(x), " ").concat(dp(y), ") rotate(").concat(dp(RTOD(angle)), ")"));
      this.set_stroke(e);
      return e;
    }
  }, {
    key: "draw_double_dot",
    value: function draw_double_dot(x, y, angle, t, d, r) {
      var g = this.transform(this.element('g'), "translate(".concat(dp(x), " ").concat(dp(y), ") rotate(").concat(dp(RTOD(angle)), ")"));

      for (var i = 0; i < 2; i++) {
        var _dot = this.transform(this.draw_dot(d, 0, r), "rotate(".concat(dp(RTOD(i * t)), ")"));

        g.appendChild(_dot);
      }

      return g;
    }
  }, {
    key: "draw_double_dash",
    value: function draw_double_dash(x, y, angle, a, b, t) {
      var g = this.transform(this.element('g'), "translate(".concat(dp(x), " ").concat(dp(y), ") rotate(").concat(dp(RTOD(angle)), ")"));

      for (var i = 0; i < 2; i++) {
        var p = this.transform(this.element('path', {
          d: "M ".concat(dp(a), " 0 L ").concat(dp(b), " 0")
        }), "rotate(".concat(dp(RTOD(i * t)), ")"));
        g.appendChild(p);
      }

      this.set_stroke(g);
      return g;
    }
  }, {
    key: "draw_double_arc",
    value: function draw_double_arc(x, y, r1, r2, a, b) {
      var g = this.element('g');
      g.appendChild(this.arc(x, y, r1, a, b));
      g.appendChild(this.arc(x, y, r2, a, b));
      this.set_stroke(g);
      return g;
    }
  }, {
    key: "draw_triple_dot",
    value: function draw_triple_dot(x, y, angle, t, d, r) {
      var g = this.transform(this.element('g'), "translate(".concat(dp(x), " ").concat(dp(y), ") rotate(").concat(dp(RTOD(angle)), ")"));

      for (var i = 0; i < 2; i++) {
        var _dot2 = this.transform(this.draw_dot(d, 0, r), "rotate(".concat(dp(RTOD(i * t)), ")"));

        g.appendChild(_dot2);
      }

      g.appendChild(this.transform(this.draw_dot(d * .75, 0, r), "rotate(".concat(dp(RTOD(t * 0.5)), ")")));
      return g;
    }
  }, {
    key: "draw_triple_dash",
    value: function draw_triple_dash(x, y, angle, a, b, t) {
      var g = this.transform(this.element('g'), "translate(".concat(dp(x), " ").concat(dp(y), ") rotate(").concat(dp(RTOD(angle)), ")"));

      for (var i = 0; i < 3; i++) {
        var p = this.transform(this.element('path', {
          d: "M ".concat(dp(a), " 0 L ").concat(dp(b), " 0")
        }), "rotate(".concat(dp(RTOD(i * t)), ")"));
        g.appendChild(p);
      }

      this.set_stroke(g);
      return g;
    }
  }, {
    key: "draw_triple_arc",
    value: function draw_triple_arc(x, y, r1, r2, r3, a, b) {
      var g = this.element('g');
      g.appendChild(this.arc(x, y, r1, a, b));
      g.appendChild(this.arc(x, y, r2, a, b));
      g.appendChild(this.arc(x, y, r3, a, b));
      this.set_stroke(g);
      return g;
    }
  }, {
    key: "draw_point",
    value: function draw_point(A) {
      var _this10 = this;

      var size = this.SIZE(0.05);
      this.check_color();

      var element = function () {
        switch (_this10.local.shape) {
          case DOT:
            return _this10.draw_dot(A.x, A.y, size);

          case DISC:
            var disc = _this10.element('circle', {
              cx: A.x,
              cy: A.y,
              r: size
            });

            _this10.set_stroke(disc);

            return disc;

          case BOX:
            var r = _this10.element('rect', {
              x: A.x - size,
              y: A.y - size,
              width: 2 * size,
              height: 2 * size
            });

            _this10.set_fill(r);

            return r;

          case PLUS:
            var plus = _this10.element('path', {
              d: "M ".concat(dp(A.x - size), " ").concat(dp(A.y), " l ").concat(dp(2 * size), " 0 M ").concat(dp(A.x), " ").concat(dp(A.y - size), " l 0 ").concat(dp(2 * size))
            });

            _this10.set_stroke(plus);

            return plus;

          case CROSS:
            var cross = _this10.element('path', {
              d: "M ".concat(dp(A.x - size), " ").concat(dp(A.y - size), " l ").concat(dp(2 * size), " ").concat(dp(2 * size), " M ").concat(dp(A.x - size), " ").concat(dp(A.y + size), " l ").concat(dp(2 * size), " ").concat(dp(-2 * size))
            });

            _this10.set_stroke(cross);

            return cross;

          default:
            console.error("no style");
        }
      }();

      var desc = this.local.shape;

      if (this.local.draggable) {
        desc = "draggable ".concat(desc);
      }

      if (this.has_label_for_point(A)) {
        desc += " at ".concat(this.label_for_point(A));
      }

      this.set_aria_label(element, desc);
      return element;
    }
  }, {
    key: "draw_text",
    value: function draw_text(text, x, y) {
      var e = this.element('text', {
        x: x,
        y: -y,
        'dominant-baseline': 'central',
        transform: 'scale(1,-1)'
      }, clean_label(text));
      this.set_font(e);
      this.set_fill(e);
      return e;
    }
  }, {
    key: "label_point",
    value: function label_point(A) {
      var text = this.local.label_text;

      if (!text) {
        return;
      }

      var angle = this.local.label_direction || 0;

      if (angle > PI) {
        angle -= 2 * PI;
      }

      if (angle < -PI) {
        angle += 2 * PI;
      }

      var dist = this.SIZE(this.local.label_dist);
      var x = A.x + dist * cos(angle);
      var y = A.y + dist * sin(angle);
      var e = this.draw_text(text, x, y);
      var textAlign = 'start';
      var dy = '0';

      if (angle >= 3 * PI / 4 || angle <= -3 * PI / 4) {
        textAlign = 'end';
      } else if (angle > PI / 4 || angle < -PI / 4) {
        textAlign = 'middle';

        if (angle > PI / 4) {
          dy = '-0.5em';
        } else {
          dy = '0.5em';
        }
      }

      if (dist == 0) {
        textAlign = 'middle';
      }

      e.setAttribute('dy', dy);
      e.setAttribute('text-anchor', textAlign);
      var desc = "label \"".concat(clean_label(text), "\"");

      if (this.aria_mode == VERBOSE) {
        desc += " at ".concat(A);
      }

      this.set_aria_label(e, desc);
      return e;
    }
  }, {
    key: "label_segment",
    value: function label_segment(A, B) {
      var size = this.SIZE(0.1);
      var angle = argument(A, B);
      var x = (A.x + B.x) / 2;
      var y = (A.y + B.y) / 2;
      var g = this.element('g');
      var s = this.draw_polygon(new Set([A, B]));
      var desc = s.getAttribute('aria-label') || '';
      g.appendChild(s);
      var mark, text;

      if (this.local.label_segment != NONE) {
        mark = this.transform(this.element('path'), "translate(".concat(dp(x), " ").concat(dp(y), ") scale(").concat(dp(size), ") rotate(").concat(dp(RTOD(angle)), ")"));
        this.set_stroke(mark);
        mark.setAttribute('stroke-width', mark.getAttribute('stroke-width') / size);
        this.set_style(mark);
        var d;

        switch (this.local.label_segment) {
          case SIMPLE:
            d = "M -0.5 -1 L 0.5 1";
            desc += ', marked with a dash';
            break;

          case DOUBLE:
            d = "M -1 -1 L 0 1 M 0 -1 L 1 1";
            desc += ', marked with two dashes';
            break;

          case TRIPLE:
            d = "M -1.5 -1 L -0.5 1 M -0.5 -1 L 0.5 1 M 0.5 -1 L 1.5 1";
            desc += ', marked with three dashes';
            break;
        }

        mark.setAttribute('d', d);
        g.appendChild(mark);
      }

      if (this.local.label_text) {
        this.push_local_settings();

        if (this.local.label_direction === undefined) {
          this.local.label_direction = argument(A, B) + PI / 2;
        }

        var m = Point.create_midpoint(new Set([A, B]));
        text = this.label_point(m);
        this.pop_local_settings();
        g.appendChild(text);
        text.removeAttribute('aria-label');
        desc += ", labelled \"".concat(this.local.label_text, "\"");
      }

      g.setAttribute('aria-label', desc);
      return g;
    }
  }, {
    key: "draw_mark",
    value: function draw_mark(B, r, a, b) {
      var e = this.arc(B.x, B.y, r, a, b);
      this.set_stroke(e);
      return e;
    }
  }, {
    key: "draw_arrow",
    value: function draw_arrow(x, y, angle, size) {
      var p = this.transform(this.element('path', {
        d: "M -2 1 L 0.0362998 0.0803779 A 0.088194 0.088194 0 0 0 0.0362998 -0.0803779 L -2 -1 L -1 0 z"
      }), "translate(".concat(dp(x), " ").concat(dp(y), ") rotate(").concat(dp(RTOD(angle)), ") scale(").concat(dp(size), ")"));
      this.set_fill(p);
      return p;
    }
  }, {
    key: "label_angle",
    value: function label_angle(A, B, C) {
      var a = argument(B, C);
      var b = argument(B, A);
      var wiggle = (a % (2 * PI) + (a < 0 ? 2 * PI : 0)) / (4 * PI) * 0.2; // so angles round the same point can be distinguished

      var r = this.SIZE(0.5 + wiggle);
      var s = 0.08 / this.scale;
      var mida = (b - a) / 2;

      if (mida > 0) {
        mida += PI;
      }

      var x1, y1, x2, y2;
      var t = 8 * PI / 180 / this.local.size;
      var g = this.element('g');
      var desc = 'angle';

      if (this.has_label_for_point(A) && this.has_label_for_point(B) && this.has_label_for_point(C)) {
        desc += " ".concat(this.label_for_point(A), " ").concat(this.label_for_point(B), " ").concat(this.label_for_point(C));
      }

      switch (this.local.angle) {
        case SIMPLE:
          g.appendChild(this.draw_mark(B, r, a, b));

          switch (this.local.dec) {
            case DOTTED:
              var _this$set_xy = this.set_xy(A, B, C, this.SIZE(Math.sqrt(2) / 8));

              var _this$set_xy2 = _slicedToArray(_this$set_xy, 4);

              x1 = _this$set_xy2[0];
              y1 = _this$set_xy2[1];
              x2 = _this$set_xy2[2];
              y2 = _this$set_xy2[3];
              g.appendChild(this.draw_dot(B.x + x1 + x2, B.y + y1 + y2, this.SIZE(0.05)));
              desc += ' marked with a dot';
              break;

            case DASHED:
              g.appendChild(this.draw_dash(B.x, B.y, (a + b) / 2, r - s, r + s));
              desc += ' marked with a dash';
              break;
          }

          break;

        case DOUBLE:
          switch (this.local.dec) {
            case DOTTED:
              g.appendChild(this.draw_mark(B, r, a, b));
              g.appendChild(this.draw_double_dot(B.x, B.y, (a + b) / 2 - t, t * 2, r * 0.75, 0.03));
              desc += ' marked with two dots';
              break;

            case DASHED:
              g.appendChild(this.draw_mark(B, r, a, b));
              g.appendChild(this.draw_double_dash(B.x, B.y, (a + b) / 2 - t / 2, r + s, r - s, t));
              desc += ' marked with two dashes';
              break;

            default:
              g.appendChild(this.draw_double_arc(B.x, B.y, r - s / 2, r + s / 2, a, b));
              desc += ' double marked';
          }

          break;

        case TRIPLE:
          switch (this.local.dec) {
            case DASHED:
              g.appendChild(this.draw_mark(B, r, a, b));
              g.appendChild(this.draw_triple_dash(B.x, B.y, (a + b) / 2 - t, r + s, r - s, t));
              desc += ' marked with three dashes';
              break;

            case DOTTED:
              g.appendChild(this.draw_mark(B, r, a, b));
              g.appendChild(this.draw_triple_dot(B.x, B.y, (a + b) / 2 - t, t * 2, r * 0.75, 0.03));
              desc += ' marked with three dots';
              break;

            default:
              g.appendChild(this.draw_triple_arc(B.x, B.y, r - s, r, r + s, a, b));
              desc += ' triple marked';
              break;
          }

          break;

        case RIGHT:
          var _this$set_xy3 = this.set_xy(A, B, C, this.SIZE(0.35));

          var _this$set_xy4 = _slicedToArray(_this$set_xy3, 4);

          x1 = _this$set_xy4[0];
          y1 = _this$set_xy4[1];
          x2 = _this$set_xy4[2];
          y2 = _this$set_xy4[3];
          var p = this.element('path', {
            d: "M ".concat(dp(B.x + x1), " ").concat(dp(B.y + y1), " l ").concat(dp(x2), " ").concat(dp(y2), " l ").concat(dp(-x1), " ").concat(dp(-y1))
          });
          this.set_stroke(p);
          g.appendChild(p);
          desc = 'right ' + desc;

          if (this.local.dec == DOTTED) {
            g.appendChild(this.draw_dot(B.x + (x1 + x2) / 2, B.y + (y1 + y2) / 2, this.SIZE(0.05)));
            desc += ' marked with a dot';
          }

          break;

        case FORTH:
          this.draw_mark(B, r, a, b);

          var _this$set_xy5 = this.set_xy(A, B, C, r);

          var _this$set_xy6 = _slicedToArray(_this$set_xy5, 4);

          x1 = _this$set_xy6[0];
          y1 = _this$set_xy6[1];
          x2 = _this$set_xy6[2];
          y2 = _this$set_xy6[3];
          g.appendChild(this.draw_arrow(B.x + x2, B.y + y2, a + acos(0.12 / this.scale), 0.1 / this.scale));
          desc += ' clockwise';
          break;

        case BACK:
          this.draw_mark(B, r, a, b);

          var _this$set_xy7 = this.set_xy(A, B, C, r);

          var _this$set_xy8 = _slicedToArray(_this$set_xy7, 4);

          x1 = _this$set_xy8[0];
          y1 = _this$set_xy8[1];
          x2 = _this$set_xy8[2];
          y2 = _this$set_xy8[3];
          g.appendChild(this.draw_arrow(B.x + x1, B.y + y1, b - acos(0.12 / this.scale), 0.1 / this.scale));
          desc += ' anti-clockwise';
          break;
      }

      if (this.local.label_text) {
        desc += " labelled \"".concat(clean_label(this.local.label_text), "\"");
        this.push_local_settings();
        this.local.label_direction = a + mida;
        this.local.label_dist = (r + 2 * s) * this.scale;
        var text = this.label_point(B);
        g.appendChild(text);
        this.pop_local_settings();
      }

      this.set_aria_label(g, desc);
      return g;
    }
  }, {
    key: "polygon",
    value: function polygon(set, closed) {
      var p = this.element(closed ? 'polygon' : 'polyline');
      p.setAttribute('points', set.points.map(function (p) {
        return "".concat(p.x, ",").concat(p.y);
      }).join(' '));
      return p;
    }
  }, {
    key: "draw_polygon",
    value: function draw_polygon(set) {
      var _this11 = this;

      var p = this.polygon(set, set.points.length > 2 && this.local.arrow == NONE && this.local.close);
      this.set_stroke(p);
      this.set_style(p);
      var desc;

      if (set.points.length == 2) {
        desc = "line segment";

        if (this.has_label_for_point(set.points[0]) && this.has_label_for_point(set.points[1])) {
          desc += " from ".concat(this.label_for_point(set.points[0]), " to ").concat(this.label_for_point(set.points[1]));
        }
      } else {
        desc = this.local.close ? set.shape_name() : 'path';

        if (set.points.every(function (p) {
          return _this11.has_label_for_point(p);
        })) {
          desc += " through ".concat(set.points.map(function (p) {
            return _this11.label_for_point(p);
          }).join(', '));
        } else if (desc == 'polygon' || desc == 'path') {
          desc += " through ".concat(set.points.length, " vertices");
        }
      }

      desc = this.describe_style(desc);

      if (this.local.arrow != NONE && set.points.length >= 2) {
        var g = this.element('g');
        g.appendChild(p);

        if (this.local.dir == BACK || this.local.arrow == ARROWS) {
          var _set$points3 = _slicedToArray(set.points, 2),
              p1 = _set$points3[0],
              p2 = _set$points3[1];

          g.appendChild(this.draw_arrow(p1.x, p1.y, argument(p2, p1), this.SIZE(0.1)));
        }

        if (this.local.dir == FORTH || this.local.arrow == ARROWS) {
          var _ref10 = [set.points[set.points.length - 2], set.points[set.points.length - 1]],
              p3 = _ref10[0],
              p4 = _ref10[1];
          g.appendChild(this.draw_arrow(p4.x, p4.y, argument(p3, p4), this.SIZE(0.1)));
        }

        desc = this.describe_arrows(desc);
        this.set_aria_label(g, desc);
        return g;
      } else {
        this.set_aria_label(p, desc);
        return p;
      }
    }
  }, {
    key: "fill_polygon",
    value: function fill_polygon(set) {
      var _this12 = this;

      var p = this.polygon(set, true);
      this.set_fill(p);
      var desc = "filled ".concat(set.shape_name());

      switch (this.local.style) {
        case DOTTED:
          desc = "dotted ".concat(desc);
          break;

        case DASHED:
          desc = "striped ".concat(desc);
          break;
      }

      if (set.points.every(function (p) {
        return _this12.has_label_for_point(p);
      })) {
        desc += " through vertices ".concat(set.points.map(function (p) {
          return _this12.label_for_point(p);
        }).join(', '));
      } else if (set.shape_name() == 'polygon') {
        desc += " through ".concat(set.points.length, " vertices");
      }

      this.set_aria_label(p, desc);
      return p;
    }
  }, {
    key: "draw_line",
    value: function draw_line(l) {
      var _this13 = this;

      var m_x = this.min_x,
          m_y = this.min_y,
          M_x = this.max_x,
          M_y = this.max_y;
      var desc = 'line';

      if (this.local.part == HALF) {
        desc = 'ray';

        if (this.local.dir == FORTH && l.a > -PI / 2 && l.a <= PI / 2 || this.local.dir == BACK && (l.a <= -PI / 2 || l.a > PI / 2)) {
          m_x = l.x;
        } else {
          M_x = l.x;
        }

        if (this.local.dir == FORTH && l.a > 0 || this.local.dir == BACK && l.a <= 0) {
          m_y = l.y;
        } else {
          M_y = l.y;
        }
      }

      var x = [0, 0];
      var y = [0, 0];
      var i = 0;

      if (l.a == PI / 2 || l.a == -PI / 2) {
        if (l.x >= m_x && l.x <= M_x) {
          x[0] = x[1] = l.x;
          y[0] = m_y;
          y[1] = M_y;
          i = 2;
        }
      } else if (l.a == 0 || l.a == PI) {
        if (l.y >= m_y && l.y <= M_y) {
          y[0] = y[1] = l.y;
          x[0] = m_x;
          x[1] = M_x;
          i = 2;
        }
      } else {
        var t = tan(l.a);
        var z = t * (m_x - l.x) + l.y;

        if (z >= m_y && z <= M_y) {
          x[i] = m_x;
          y[i] = z;
          i += 1;
        }

        z = t * (M_x - l.x) + l.y;

        if (z >= m_y && z <= M_y) {
          x[i] = M_x;
          y[i] = z;
          i += 1;
        }

        z = (m_y - l.y) / t + l.x;

        if (z >= m_x && z <= M_x && i < 2) {
          x[i] = z;
          y[i] = m_y;
          i += 1;
        }

        z = (M_y - l.y) / t + l.x;

        if (z >= m_x && z <= M_x && i < 2) {
          x[i] = z;
          y[i] = M_y;
          i += 1;
        }
      }

      if (i == 2) {
        var p = this.element('line', {
          x1: x[0],
          y1: y[0],
          x2: x[1],
          y2: y[1]
        });

        switch (l.defined_by.kind) {
          case 'heading':
            if (this.has_label_for_point(l)) {
              desc += " through ".concat(this.label_for_point(l));
            }

            if (this.aria_mode == VERBOSE) {
              desc += " with heading ".concat(dpformat(RTOD(l.a)), "\xB0");
            }

            break;

          case 'points':
            var lps = l.defined_by.points.filter(function (p) {
              return _this13.has_label_for_point(p);
            });

            if (lps.length > 0) {
              desc += " through ".concat(lps.join(' and '));
            }

            break;

          case 'vector':
            if (this.has_label_for_point(l)) {
              desc += " through ".concat(this.label_for_point(l));
            }

            if (this.aria_mode == VERBOSE) {
              desc += " with vector ".concat(l.defined_by.vector);
            }

            break;
        }

        desc = this.describe_style(desc);
        this.set_aria_label(p, desc);
        this.set_stroke(p);
        this.set_style(p);
        return p;
      }
    }
  }, {
    key: "draw_circle",
    value: function draw_circle(c) {
      var e = this.element('circle', {
        cx: c.x,
        cy: c.y,
        r: c.r
      });
      this.set_stroke(e);
      this.set_style(e);
      var desc = 'circle';

      if (this.has_label_for_point(c)) {
        desc += " centred at ".concat(this.label_for_point(c));
      }

      if (this.aria_mode == VERBOSE) {
        desc += " with radius ".concat(dpformat(c.r));
      }

      desc = this.describe_style(desc);
      this.set_aria_label(e, desc);
      return e;
    }
  }, {
    key: "draw_arc",
    value: function draw_arc(c, a, b) {
      var arc = this.arc(c.x, c.y, c.r, b, a);
      this.set_stroke(arc);
      this.set_style(arc);
      var desc = 'arc';

      if (this.has_label_for_point(c)) {
        desc += " centred at ".concat(this.label_for_point(c));
      }

      if (this.aria_mode == VERBOSE) {
        desc += " with radius ".concat(dpformat(c.r), " between ").concat(dpformat(RTOD(a)), "\xB0 and ").concat(dpformat(RTOD(b)), "\xB0");
      }

      desc = this.describe_style(desc);

      if (this.local.arrow != NONE) {
        var g = this.element('g');
        g.appendChild(arc);
        var d = acos(this.SIZE(.06) / c.r);

        if (this.local.dir == BACK || this.local.arrow == ARROWS) {
          g.appendChild(this.draw_arrow(c.x + c.r * cos(b), c.y + c.r * sin(b), b + d, this.SIZE(0.1)));
        }

        if (this.local.dir == FORTH || this.local.arrow == ARROWS) {
          g.appendChild(this.draw_arrow(c.x + c.r * cos(a), c.y + c.r * sin(a), a - d, this.SIZE(0.1)));
        }

        if (this.local.arrow == ARROWS) {
          desc += ' with an arrow at each end';
        } else {
          desc += this.local.dir == BACK ? ' anti-clockwise' : ' clockwise';
        }

        this.set_aria_label(g, desc);
        return g;
      } else {
        this.set_aria_label(arc, desc);
        return arc;
      }
    }
  }, {
    key: "fill_arc",
    value: function fill_arc(c, a, b) {
      var arc = this.arc(c.x, c.y, c.r, b, a);
      this.set_fill(arc);
      this.set_style(arc);
      var desc = 'filled arc';

      if (this.has_label_for_point(c)) {
        desc += " centred at ".concat(this.label_for_point(c));
      }

      if (this.aria_mode == VERBOSE) {
        desc += " with radius ".concat(dpformat(c.r), " between ").concat(dpformat(RTOD(a)), "\xB0 and ").concat(dpformat(RTOD(b)), "\xB0");
      }

      desc = this.describe_style(desc);
      this.set_aria_label(arc, desc);
      return arc;
    }
  }, {
    key: "fill_circle",
    value: function fill_circle(c) {
      var e = this.element('circle', {
        cx: c.x,
        cy: c.y,
        r: c.r
      });
      this.set_fill(e);
      var desc = 'filled circle';

      if (this.has_label_for_point(c)) {
        desc += " centred at ".concat(this.label_for_point(c));
      }

      if (this.aria_mode == VERBOSE) {
        desc += " with radius ".concat(dpformat(c.r));
      }

      this.set_aria_label(e, desc);
      return e;
    }
  }, {
    key: "draw_parabolic_arc",
    value: function draw_parabolic_arc(x0, y0, p, f, g, c, s) {
      var e = acos(p / this.get_max(x0, y0) - 1);
      f = Math.max(f, -e);
      g = Math.min(g, e);
      var ds = [];

      for (var t = f, n = 1; t <= g; t += this.local.step * PI / 180, n++) {
        var _parametric_parabola5 = parametric_parabola(t, x0, y0, p, c, s),
            _parametric_parabola6 = _slicedToArray(_parametric_parabola5, 2),
            x = _parametric_parabola6[0],
            y = _parametric_parabola6[1];

        ds.push(n == 1 ? "M ".concat(x, " ").concat(y) : "L ".concat(x, " ").concat(y));
      }

      var path = this.element('path', {
        d: ds.join(' ')
      });
      this.set_stroke(path);
      this.set_style(path);
      var desc = "parabola";
      desc = this.describe_style(desc);
      this.set_aria_label(path, desc);
      return path;
    }
  }, {
    key: "draw_elliptic_arc",
    value: function draw_elliptic_arc(x0, y0, a, b, f, g, c, s) {
      var ds = [];

      for (var t = f, n = 1; t <= g; t += this.local.step * PI / 180, n++) {
        var _parametric_ellipse5 = parametric_ellipse(t, x0, y0, a, b, c, s),
            _parametric_ellipse6 = _slicedToArray(_parametric_ellipse5, 2),
            x = _parametric_ellipse6[0],
            y = _parametric_ellipse6[1];

        ds.push(n == 1 ? "M ".concat(x, " ").concat(y) : "L ".concat(x, " ").concat(y));
      }

      var path = this.element('path', {
        d: ds.join(' ')
      });
      this.set_stroke(path);
      this.set_style(path);
      var desc = 'ellipse';
      desc = this.describe_style(desc);
      this.set_aria_label(path, desc);
      return path;
    }
  }, {
    key: "draw_branch",
    value: function draw_branch(i, j, x0, y0, a, b, f, g, c, s) {
      i = Math.max(i, f);
      j = Math.min(j, g);
      var ds = [];

      for (var t = i, n = 1; t <= j; t += this.local.step * PI / 180, n++) {
        var _parametric_hyperbola5 = parametric_hyperbola(t, x0, y0, a, b, c, s),
            _parametric_hyperbola6 = _slicedToArray(_parametric_hyperbola5, 2),
            x = _parametric_hyperbola6[0],
            y = _parametric_hyperbola6[1];

        ds.push(n == 1 ? "M ".concat(x, " ").concat(y) : "L ".concat(x, " ").concat(y));
      }

      var path = this.element('path', {
        d: ds.join(' ')
      });
      this.set_stroke(path);
      this.set_style(path);
      var desc = 'hyperbola';
      desc = this.describe_style(desc);
      this.set_aria_label(path, desc);
      return path;
    }
  }]);

  return SVGDrawer;
}(Drawer);
/** Minimization routines
 * from https://github.com/bijection/g9/blob/master/src/minimize.js
 * 
 * MIT License
 * 
 * Copyright (c) 2016
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


exports.SVGDrawer = SVGDrawer;

function norm2(x) {
  return Math.sqrt(x.reduce(function (a, b) {
    return a + b * b;
  }, 0));
}

function identity(n) {
  var ret = Array(n);

  for (var i = 0; i < n; i++) {
    ret[i] = Array(n);

    for (var j = 0; j < n; j++) {
      ret[i][j] = +(i == j);
    }
  }

  return ret;
}

function neg(x) {
  return x.map(function (a) {
    return -a;
  });
}

function dot(a, b) {
  if (typeof a[0] !== 'number') {
    return a.map(function (x) {
      return dot(x, b);
    });
  }

  return a.reduce(function (x, y, i) {
    return x + y * b[i];
  }, 0);
}

function sub(a, b) {
  if (typeof a[0] !== 'number') {
    return a.map(function (c, i) {
      return sub(c, b[i]);
    });
  }

  return a.map(function (c, i) {
    return c - b[i];
  });
}

function add(a, b) {
  if (typeof a[0] !== 'number') {
    return a.map(function (c, i) {
      return add(c, b[i]);
    });
  }

  return a.map(function (c, i) {
    return c + b[i];
  });
}

function div(a, b) {
  return a.map(function (c) {
    return c.map(function (d) {
      return d / b;
    });
  });
}

function mul(a, b) {
  if (typeof a[0] !== 'number') {
    return a.map(function (c) {
      return mul(c, b);
    });
  }

  return a.map(function (c) {
    return c * b;
  });
}

function ten(a, b) {
  return a.map(function (c, i) {
    return mul(b, c);
  });
}

function isZero(a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== 0) return false;
  }

  return true;
} // Adapted from the numeric.js gradient and uncmin functions
// Numeric Javascript
// Copyright (C) 2011 by Sébastien Loisel
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


function gradient(f, x) {
  var dim = x.length,
      f1 = f(x);
  if (isNaN(f1)) throw new Error('The gradient at [' + x.join(' ') + '] is NaN!');
  var max = Math.max,
      abs = Math.abs,
      min = Math.min;
  var tempX = x.slice(0),
      grad = Array(dim);

  for (var i = 0; i < dim; i++) {
    var delta = max(1e-6 * f1, 1e-8);

    for (var k = 0;; k++) {
      if (k == 20) throw new Error("Gradient failed at index " + i + " of [" + x.join(' ') + "]");
      tempX[i] = x[i] + delta;
      var f0 = f(tempX);
      tempX[i] = x[i] - delta;
      var f2 = f(tempX);
      tempX[i] = x[i];

      if (!(isNaN(f0) || isNaN(f2))) {
        grad[i] = (f0 - f2) / (2 * delta);
        var t0 = x[i] - delta;
        var t1 = x[i];
        var t2 = x[i] + delta;
        var d1 = (f0 - f1) / delta;
        var d2 = (f1 - f2) / delta;
        var err = min(max(abs(d1 - grad[i]), abs(d2 - grad[i]), abs(d1 - d2)), delta);
        var normalize = max(abs(grad[i]), abs(f0), abs(f1), abs(f2), abs(t0), abs(t1), abs(t2), 1e-8);
        if (err / normalize < 1e-3) break; //break if this index is done
      }

      delta /= 16;
    }
  }

  return grad;
}

function minimize(f, x0, end_on_line_search) {
  var tol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1e-8;
  var maxit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
  tol = Math.max(tol, 2e-16);

  var grad = function grad(a) {
    return gradient(f, a);
  };

  x0 = x0.slice(0);
  var g0 = grad(x0);
  var f0 = f(x0);
  if (isNaN(f0)) throw new Error('minimize: f(x0) is a NaN!');
  var n = x0.length;
  var H1 = identity(n);

  for (var it = 0; it < maxit; it++) {
    if (!g0.every(isFinite)) {
      var msg = "Gradient has Infinity or NaN";
      break;
    }

    var step = neg(dot(H1, g0));

    if (!step.every(isFinite)) {
      var msg = "Search direction has Infinity or NaN";
      break;
    }

    var nstep = norm2(step);

    if (nstep < tol) {
      var msg = "Newton step smaller than tol";
      break;
    }

    var t = 1;
    var df0 = dot(g0, step); // line search

    var x1 = x0;
    var s;

    for (; it < maxit && t * nstep >= tol; it++) {
      s = mul(step, t);
      x1 = add(x0, s);
      var f1 = f(x1);
      if (!(f1 - f0 >= 0.1 * t * df0 || isNaN(f1))) break;
      t *= 0.5;
    }

    if (t * nstep < tol && end_on_line_search) {
      var msg = "Line search step size smaller than tol";
      break;
    }

    if (it === maxit) {
      var msg = "maxit reached during line search";
      break;
    }

    var g1 = grad(x1);
    var y = sub(g1, g0);
    var ys = dot(y, s);
    var Hy = dot(H1, y);
    H1 = sub(add(H1, mul(ten(s, s), (ys + dot(y, Hy)) / (ys * ys))), div(add(ten(Hy, s), ten(s, Hy)), ys));
    x0 = x1;
    f0 = f1;
    g0 = g1;
  }

  return {
    solution: x0,
    f: f0,
    gradient: g0,
    invHessian: H1,
    iterations: it,
    message: msg
  };
}

function findPhaseChange(f, known_true, known_false) {
  while (Math.abs(known_true - known_false) > 1e-3) {
    var mid = (known_true + known_false) / 2;
    f(mid) ? known_true = mid : known_false = mid;
  }

  return (known_true + known_false) / 2;
}
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/).
 
 https://groups.google.com/forum/?fromgroups=#!topic/d3-js/iyXFgJR1JY0
 */


var colorbrewer = {
  /*** Diverging ***/
  Spectral: {
    3: ['rgb(252,141,89)', 'rgb(255,255,191)', 'rgb(153,213,148)'],
    4: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(171,221,164)', 'rgb(43,131,186)'],
    5: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(255,255,191)', 'rgb(171,221,164)', 'rgb(43,131,186)'],
    6: ['rgb(213,62,79)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(230,245,152)', 'rgb(153,213,148)', 'rgb(50,136,189)'],
    7: ['rgb(213,62,79)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(153,213,148)', 'rgb(50,136,189)'],
    8: ['rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)'],
    9: ['rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)'],
    10: ['rgb(158,1,66)', 'rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)', 'rgb(94,79,162)'],
    11: ['rgb(158,1,66)', 'rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)', 'rgb(94,79,162)'],
    'properties': {
      'type': 'div',
      'blind': [2, 2, 2, 0, 0, 0, 0, 0, 0],
      'print': [1, 1, 1, 0, 0, 0, 0, 0, 0],
      'copy': [1, 1, 1, 0, 0, 0, 0, 0, 0],
      'screen': [1, 1, 2, 0, 0, 0, 0, 0, 0]
    }
  },
  RdYlGn: {
    3: ['rgb(252,141,89)', 'rgb(255,255,191)', 'rgb(145,207,96)'],
    4: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(166,217,106)', 'rgb(26,150,65)'],
    5: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(255,255,191)', 'rgb(166,217,106)', 'rgb(26,150,65)'],
    6: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(217,239,139)', 'rgb(145,207,96)', 'rgb(26,152,80)'],
    7: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(145,207,96)', 'rgb(26,152,80)'],
    8: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)'],
    9: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)'],
    10: ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)', 'rgb(0,104,55)'],
    11: ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)', 'rgb(0,104,55)'],
    'properties': {
      'type': 'div',
      'blind': [2, 2, 2, 0, 0, 0, 0, 0, 0],
      'print': [1, 1, 1, 2, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 1, 0, 0, 0, 0, 0, 0]
    }
  },
  RdBu: {
    3: ['rgb(239,138,98)', 'rgb(247,247,247)', 'rgb(103,169,207)'],
    4: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(146,197,222)', 'rgb(5,113,176)'],
    5: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(247,247,247)', 'rgb(146,197,222)', 'rgb(5,113,176)'],
    6: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(209,229,240)', 'rgb(103,169,207)', 'rgb(33,102,172)'],
    7: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(247,247,247)', 'rgb(209,229,240)', 'rgb(103,169,207)', 'rgb(33,102,172)'],
    8: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(209,229,240)', 'rgb(146,197,222)', 'rgb(67,147,195)', 'rgb(33,102,172)'],
    9: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(247,247,247)', 'rgb(209,229,240)', 'rgb(146,197,222)', 'rgb(67,147,195)', 'rgb(33,102,172)'],
    10: ['rgb(103,0,31)', 'rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(209,229,240)', 'rgb(146,197,222)', 'rgb(67,147,195)', 'rgb(33,102,172)', 'rgb(5,48,97)'],
    11: ['rgb(103,0,31)', 'rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(247,247,247)', 'rgb(209,229,240)', 'rgb(146,197,222)', 'rgb(67,147,195)', 'rgb(33,102,172)', 'rgb(5,48,97)'],
    'properties': {
      'type': 'div',
      'blind': [1],
      'print': [1, 1, 1, 1, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 1, 0, 0, 0, 0, 0, 0]
    }
  },
  PiYG: {
    3: ['rgb(233,163,201)', 'rgb(247,247,247)', 'rgb(161,215,106)'],
    4: ['rgb(208,28,139)', 'rgb(241,182,218)', 'rgb(184,225,134)', 'rgb(77,172,38)'],
    5: ['rgb(208,28,139)', 'rgb(241,182,218)', 'rgb(247,247,247)', 'rgb(184,225,134)', 'rgb(77,172,38)'],
    6: ['rgb(197,27,125)', 'rgb(233,163,201)', 'rgb(253,224,239)', 'rgb(230,245,208)', 'rgb(161,215,106)', 'rgb(77,146,33)'],
    7: ['rgb(197,27,125)', 'rgb(233,163,201)', 'rgb(253,224,239)', 'rgb(247,247,247)', 'rgb(230,245,208)', 'rgb(161,215,106)', 'rgb(77,146,33)'],
    8: ['rgb(197,27,125)', 'rgb(222,119,174)', 'rgb(241,182,218)', 'rgb(253,224,239)', 'rgb(230,245,208)', 'rgb(184,225,134)', 'rgb(127,188,65)', 'rgb(77,146,33)'],
    9: ['rgb(197,27,125)', 'rgb(222,119,174)', 'rgb(241,182,218)', 'rgb(253,224,239)', 'rgb(247,247,247)', 'rgb(230,245,208)', 'rgb(184,225,134)', 'rgb(127,188,65)', 'rgb(77,146,33)'],
    10: ['rgb(142,1,82)', 'rgb(197,27,125)', 'rgb(222,119,174)', 'rgb(241,182,218)', 'rgb(253,224,239)', 'rgb(230,245,208)', 'rgb(184,225,134)', 'rgb(127,188,65)', 'rgb(77,146,33)', 'rgb(39,100,25)'],
    11: ['rgb(142,1,82)', 'rgb(197,27,125)', 'rgb(222,119,174)', 'rgb(241,182,218)', 'rgb(253,224,239)', 'rgb(247,247,247)', 'rgb(230,245,208)', 'rgb(184,225,134)', 'rgb(127,188,65)', 'rgb(77,146,33)', 'rgb(39,100,25)'],
    'properties': {
      'type': 'div',
      'blind': [1],
      'print': [1, 1, 2, 0, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 2, 0, 0, 0, 0, 0, 0]
    }
  },
  PRGn: {
    3: ['rgb(175,141,195)', 'rgb(247,247,247)', 'rgb(127,191,123)'],
    4: ['rgb(123,50,148)', 'rgb(194,165,207)', 'rgb(166,219,160)', 'rgb(0,136,55)'],
    5: ['rgb(123,50,148)', 'rgb(194,165,207)', 'rgb(247,247,247)', 'rgb(166,219,160)', 'rgb(0,136,55)'],
    6: ['rgb(118,42,131)', 'rgb(175,141,195)', 'rgb(231,212,232)', 'rgb(217,240,211)', 'rgb(127,191,123)', 'rgb(27,120,55)'],
    7: ['rgb(118,42,131)', 'rgb(175,141,195)', 'rgb(231,212,232)', 'rgb(247,247,247)', 'rgb(217,240,211)', 'rgb(127,191,123)', 'rgb(27,120,55)'],
    8: ['rgb(118,42,131)', 'rgb(153,112,171)', 'rgb(194,165,207)', 'rgb(231,212,232)', 'rgb(217,240,211)', 'rgb(166,219,160)', 'rgb(90,174,97)', 'rgb(27,120,55)'],
    9: ['rgb(118,42,131)', 'rgb(153,112,171)', 'rgb(194,165,207)', 'rgb(231,212,232)', 'rgb(247,247,247)', 'rgb(217,240,211)', 'rgb(166,219,160)', 'rgb(90,174,97)', 'rgb(27,120,55)'],
    10: ['rgb(64,0,75)', 'rgb(118,42,131)', 'rgb(153,112,171)', 'rgb(194,165,207)', 'rgb(231,212,232)', 'rgb(217,240,211)', 'rgb(166,219,160)', 'rgb(90,174,97)', 'rgb(27,120,55)', 'rgb(0,68,27)'],
    11: ['rgb(64,0,75)', 'rgb(118,42,131)', 'rgb(153,112,171)', 'rgb(194,165,207)', 'rgb(231,212,232)', 'rgb(247,247,247)', 'rgb(217,240,211)', 'rgb(166,219,160)', 'rgb(90,174,97)', 'rgb(27,120,55)', 'rgb(0,68,27)'],
    'properties': {
      'type': 'div',
      'blind': [1],
      'print': [1, 1, 1, 1, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 2, 2, 0, 0, 0, 0, 0]
    }
  },
  RdYlBu: {
    3: ['rgb(252,141,89)', 'rgb(255,255,191)', 'rgb(145,191,219)'],
    4: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(171,217,233)', 'rgb(44,123,182)'],
    5: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(255,255,191)', 'rgb(171,217,233)', 'rgb(44,123,182)'],
    6: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,144)', 'rgb(224,243,248)', 'rgb(145,191,219)', 'rgb(69,117,180)'],
    7: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,144)', 'rgb(255,255,191)', 'rgb(224,243,248)', 'rgb(145,191,219)', 'rgb(69,117,180)'],
    8: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)'],
    9: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(255,255,191)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)'],
    10: ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)', 'rgb(49,54,149)'],
    11: ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(255,255,191)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)', 'rgb(49,54,149)'],
    'properties': {
      'type': 'div',
      'blind': [1],
      'print': [1, 1, 1, 1, 2, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 1, 2, 0, 0, 0, 0, 0]
    }
  },
  BrBG: {
    3: ['rgb(216,179,101)', 'rgb(245,245,245)', 'rgb(90,180,172)'],
    4: ['rgb(166,97,26)', 'rgb(223,194,125)', 'rgb(128,205,193)', 'rgb(1,133,113)'],
    5: ['rgb(166,97,26)', 'rgb(223,194,125)', 'rgb(245,245,245)', 'rgb(128,205,193)', 'rgb(1,133,113)'],
    6: ['rgb(140,81,10)', 'rgb(216,179,101)', 'rgb(246,232,195)', 'rgb(199,234,229)', 'rgb(90,180,172)', 'rgb(1,102,94)'],
    7: ['rgb(140,81,10)', 'rgb(216,179,101)', 'rgb(246,232,195)', 'rgb(245,245,245)', 'rgb(199,234,229)', 'rgb(90,180,172)', 'rgb(1,102,94)'],
    8: ['rgb(140,81,10)', 'rgb(191,129,45)', 'rgb(223,194,125)', 'rgb(246,232,195)', 'rgb(199,234,229)', 'rgb(128,205,193)', 'rgb(53,151,143)', 'rgb(1,102,94)'],
    9: ['rgb(140,81,10)', 'rgb(191,129,45)', 'rgb(223,194,125)', 'rgb(246,232,195)', 'rgb(245,245,245)', 'rgb(199,234,229)', 'rgb(128,205,193)', 'rgb(53,151,143)', 'rgb(1,102,94)'],
    10: ['rgb(84,48,5)', 'rgb(140,81,10)', 'rgb(191,129,45)', 'rgb(223,194,125)', 'rgb(246,232,195)', 'rgb(199,234,229)', 'rgb(128,205,193)', 'rgb(53,151,143)', 'rgb(1,102,94)', 'rgb(0,60,48)'],
    11: ['rgb(84,48,5)', 'rgb(140,81,10)', 'rgb(191,129,45)', 'rgb(223,194,125)', 'rgb(246,232,195)', 'rgb(245,245,245)', 'rgb(199,234,229)', 'rgb(128,205,193)', 'rgb(53,151,143)', 'rgb(1,102,94)', 'rgb(0,60,48)'],
    'properties': {
      'type': 'div',
      'blind': [1],
      'print': [1, 1, 1, 1, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 1, 1, 0, 0, 0, 0, 0]
    }
  },
  RdGy: {
    3: ['rgb(239,138,98)', 'rgb(255,255,255)', 'rgb(153,153,153)'],
    4: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(186,186,186)', 'rgb(64,64,64)'],
    5: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(255,255,255)', 'rgb(186,186,186)', 'rgb(64,64,64)'],
    6: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(224,224,224)', 'rgb(153,153,153)', 'rgb(77,77,77)'],
    7: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(255,255,255)', 'rgb(224,224,224)', 'rgb(153,153,153)', 'rgb(77,77,77)'],
    8: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(224,224,224)', 'rgb(186,186,186)', 'rgb(135,135,135)', 'rgb(77,77,77)'],
    9: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(255,255,255)', 'rgb(224,224,224)', 'rgb(186,186,186)', 'rgb(135,135,135)', 'rgb(77,77,77)'],
    10: ['rgb(103,0,31)', 'rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(224,224,224)', 'rgb(186,186,186)', 'rgb(135,135,135)', 'rgb(77,77,77)', 'rgb(26,26,26)'],
    11: ['rgb(103,0,31)', 'rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(255,255,255)', 'rgb(224,224,224)', 'rgb(186,186,186)', 'rgb(135,135,135)', 'rgb(77,77,77)', 'rgb(26,26,26)'],
    'properties': {
      'type': 'div',
      'blind': [2],
      'print': [1, 1, 1, 2, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [1, 1, 2, 0, 0, 0, 0, 0, 0]
    }
  },
  PuOr: {
    3: ['rgb(241,163,64)', 'rgb(247,247,247)', 'rgb(153,142,195)'],
    4: ['rgb(230,97,1)', 'rgb(253,184,99)', 'rgb(178,171,210)', 'rgb(94,60,153)'],
    5: ['rgb(230,97,1)', 'rgb(253,184,99)', 'rgb(247,247,247)', 'rgb(178,171,210)', 'rgb(94,60,153)'],
    6: ['rgb(179,88,6)', 'rgb(241,163,64)', 'rgb(254,224,182)', 'rgb(216,218,235)', 'rgb(153,142,195)', 'rgb(84,39,136)'],
    7: ['rgb(179,88,6)', 'rgb(241,163,64)', 'rgb(254,224,182)', 'rgb(247,247,247)', 'rgb(216,218,235)', 'rgb(153,142,195)', 'rgb(84,39,136)'],
    8: ['rgb(179,88,6)', 'rgb(224,130,20)', 'rgb(253,184,99)', 'rgb(254,224,182)', 'rgb(216,218,235)', 'rgb(178,171,210)', 'rgb(128,115,172)', 'rgb(84,39,136)'],
    9: ['rgb(179,88,6)', 'rgb(224,130,20)', 'rgb(253,184,99)', 'rgb(254,224,182)', 'rgb(247,247,247)', 'rgb(216,218,235)', 'rgb(178,171,210)', 'rgb(128,115,172)', 'rgb(84,39,136)'],
    10: ['rgb(127,59,8)', 'rgb(179,88,6)', 'rgb(224,130,20)', 'rgb(253,184,99)', 'rgb(254,224,182)', 'rgb(216,218,235)', 'rgb(178,171,210)', 'rgb(128,115,172)', 'rgb(84,39,136)', 'rgb(45,0,75)'],
    11: ['rgb(127,59,8)', 'rgb(179,88,6)', 'rgb(224,130,20)', 'rgb(253,184,99)', 'rgb(254,224,182)', 'rgb(247,247,247)', 'rgb(216,218,235)', 'rgb(178,171,210)', 'rgb(128,115,172)', 'rgb(84,39,136)', 'rgb(45,0,75)'],
    'properties': {
      'type': 'div',
      'blind': [1],
      'print': [1, 1, 2, 2, 0, 0, 0, 0, 0],
      'copy': [1, 1, 0, 0, 0, 0, 0, 0, 0],
      'screen': [1, 1, 1, 1, 0, 0, 0, 0, 0]
    }
  },

  /*** Qualitative ***/
  Set2: {
    3: ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)'],
    4: ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)'],
    5: ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)'],
    6: ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)', 'rgb(255,217,47)'],
    7: ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)', 'rgb(255,217,47)', 'rgb(229,196,148)'],
    8: ['rgb(102,194,165)', 'rgb(252,141,98)', 'rgb(141,160,203)', 'rgb(231,138,195)', 'rgb(166,216,84)', 'rgb(255,217,47)', 'rgb(229,196,148)', 'rgb(179,179,179)'],
    'properties': {
      'type': 'qual',
      'blind': [1, 2, 2, 2, 0, 0, 0],
      'print': [1, 1, 1, 2, 2, 2],
      'copy': [0],
      'screen': [1, 1, 2, 2, 2, 2]
    }
  },
  Accent: {
    3: ['rgb(127,201,127)', 'rgb(190,174,212)', 'rgb(253,192,134)'],
    4: ['rgb(127,201,127)', 'rgb(190,174,212)', 'rgb(253,192,134)', 'rgb(255,255,153)'],
    5: ['rgb(127,201,127)', 'rgb(190,174,212)', 'rgb(253,192,134)', 'rgb(255,255,153)', 'rgb(56,108,176)'],
    6: ['rgb(127,201,127)', 'rgb(190,174,212)', 'rgb(253,192,134)', 'rgb(255,255,153)', 'rgb(56,108,176)', 'rgb(240,2,127)'],
    7: ['rgb(127,201,127)', 'rgb(190,174,212)', 'rgb(253,192,134)', 'rgb(255,255,153)', 'rgb(56,108,176)', 'rgb(240,2,127)', 'rgb(191,91,23)'],
    8: ['rgb(127,201,127)', 'rgb(190,174,212)', 'rgb(253,192,134)', 'rgb(255,255,153)', 'rgb(56,108,176)', 'rgb(240,2,127)', 'rgb(191,91,23)', 'rgb(102,102,102)'],
    'properties': {
      'type': 'qual',
      'blind': [2, 0, 0, 0, 0, 0, 0],
      'print': [1, 1, 2, 2, 2, 2],
      'copy': [0],
      'screen': [1, 1, 1, 2, 2, 2]
    }
  },
  Set1: {
    3: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)'],
    4: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)'],
    5: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)', 'rgb(255,127,0)'],
    6: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)', 'rgb(255,127,0)', 'rgb(255,255,51)'],
    7: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)', 'rgb(255,127,0)', 'rgb(255,255,51)', 'rgb(166,86,40)'],
    8: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)', 'rgb(255,127,0)', 'rgb(255,255,51)', 'rgb(166,86,40)', 'rgb(247,129,191)'],
    9: ['rgb(228,26,28)', 'rgb(55,126,184)', 'rgb(77,175,74)', 'rgb(152,78,163)', 'rgb(255,127,0)', 'rgb(255,255,51)', 'rgb(166,86,40)', 'rgb(247,129,191)', 'rgb(153,153,153)'],
    'properties': {
      'type': 'qual',
      'blind': [2],
      'print': [1],
      'copy': [0],
      'screen': [1]
    }
  },
  Set3: {
    3: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)'],
    4: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)'],
    5: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)'],
    6: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)'],
    7: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)'],
    8: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)'],
    9: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)'],
    10: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)'],
    11: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)', 'rgb(204,235,197)'],
    12: ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)', 'rgb(253,180,98)', 'rgb(179,222,105)', 'rgb(252,205,229)', 'rgb(217,217,217)', 'rgb(188,128,189)', 'rgb(204,235,197)', 'rgb(255,237,111)'],
    'properties': {
      'type': 'qual',
      'blind': [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      'print': [1, 1, 1, 1, 1, 1, 2, 0, 0, 0],
      'copy': [1, 2, 2, 2, 2, 2, 2, 0, 0, 0],
      'screen': [1, 1, 1, 2, 2, 2, 0, 0, 0, 0]
    }
  },
  Dark2: {
    3: ['rgb(27,158,119)', 'rgb(217,95,2)', 'rgb(117,112,179)'],
    4: ['rgb(27,158,119)', 'rgb(217,95,2)', 'rgb(117,112,179)', 'rgb(231,41,138)'],
    5: ['rgb(27,158,119)', 'rgb(217,95,2)', 'rgb(117,112,179)', 'rgb(231,41,138)', 'rgb(102,166,30)'],
    6: ['rgb(27,158,119)', 'rgb(217,95,2)', 'rgb(117,112,179)', 'rgb(231,41,138)', 'rgb(102,166,30)', 'rgb(230,171,2)'],
    7: ['rgb(27,158,119)', 'rgb(217,95,2)', 'rgb(117,112,179)', 'rgb(231,41,138)', 'rgb(102,166,30)', 'rgb(230,171,2)', 'rgb(166,118,29)'],
    8: ['rgb(27,158,119)', 'rgb(217,95,2)', 'rgb(117,112,179)', 'rgb(231,41,138)', 'rgb(102,166,30)', 'rgb(230,171,2)', 'rgb(166,118,29)', 'rgb(102,102,102)'],
    'properties': {
      'type': 'qual',
      'blind': [1, 2, 2, 2, 0, 0],
      'print': [1],
      'copy': [0],
      'screen': [1]
    }
  },
  Paired: {
    3: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)'],
    4: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)'],
    5: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)'],
    6: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)'],
    7: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)'],
    8: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)'],
    9: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)'],
    10: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)'],
    11: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)'],
    12: ['rgb(166,206,227)', 'rgb(31,120,180)', 'rgb(178,223,138)', 'rgb(51,160,44)', 'rgb(251,154,153)', 'rgb(227,26,28)', 'rgb(253,191,111)', 'rgb(255,127,0)', 'rgb(202,178,214)', 'rgb(106,61,154)', 'rgb(255,255,153)', 'rgb(177,89,40)'],
    'properties': {
      'type': 'qual',
      'blind': [1, 1, 2, 2, 2, 2, 0, 0, 0],
      'print': [1, 1, 1, 1, 1, 2, 2, 2, 2],
      'copy': [0],
      'screen': [1, 1, 1, 1, 1, 1, 1, 1, 2]
    }
  },
  Pastel2: {
    3: ['rgb(179,226,205)', 'rgb(253,205,172)', 'rgb(203,213,232)'],
    4: ['rgb(179,226,205)', 'rgb(253,205,172)', 'rgb(203,213,232)', 'rgb(244,202,228)'],
    5: ['rgb(179,226,205)', 'rgb(253,205,172)', 'rgb(203,213,232)', 'rgb(244,202,228)', 'rgb(230,245,201)'],
    6: ['rgb(179,226,205)', 'rgb(253,205,172)', 'rgb(203,213,232)', 'rgb(244,202,228)', 'rgb(230,245,201)', 'rgb(255,242,174)'],
    7: ['rgb(179,226,205)', 'rgb(253,205,172)', 'rgb(203,213,232)', 'rgb(244,202,228)', 'rgb(230,245,201)', 'rgb(255,242,174)', 'rgb(241,226,204)'],
    8: ['rgb(179,226,205)', 'rgb(253,205,172)', 'rgb(203,213,232)', 'rgb(244,202,228)', 'rgb(230,245,201)', 'rgb(255,242,174)', 'rgb(241,226,204)', 'rgb(204,204,204)'],
    'properties': {
      'type': 'qual',
      'blind': [2, 0, 0, 0, 0, 0],
      'print': [2, 0, 0, 0, 0, 0],
      'copy': [0],
      'screen': [2, 2, 0, 0, 0, 0]
    }
  },
  Pastel1: {
    3: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)'],
    4: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 'rgb(222,203,228)'],
    5: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 'rgb(222,203,228)', 'rgb(254,217,166)'],
    6: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 'rgb(222,203,228)', 'rgb(254,217,166)', 'rgb(255,255,204)'],
    7: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 'rgb(222,203,228)', 'rgb(254,217,166)', 'rgb(255,255,204)', 'rgb(229,216,189)'],
    8: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 'rgb(222,203,228)', 'rgb(254,217,166)', 'rgb(255,255,204)', 'rgb(229,216,189)', 'rgb(253,218,236)'],
    9: ['rgb(251,180,174)', 'rgb(179,205,227)', 'rgb(204,235,197)', 'rgb(222,203,228)', 'rgb(254,217,166)', 'rgb(255,255,204)', 'rgb(229,216,189)', 'rgb(253,218,236)', 'rgb(242,242,242)'],
    'properties': {
      'type': 'qual',
      'blind': [2, 0, 0, 0, 0, 0, 0],
      'print': [2, 2, 2, 0, 0, 0, 0],
      'copy': [0],
      'screen': [2, 2, 2, 2, 0, 0, 0]
    }
  },
  // from https://sashat.me/2017/01/11/list-of-20-simple-distinct-colors/
  Trubetskoy: {
    3: ['#ffe119', '#4363d8', '#f58231'],
    4: ['#ffe119', '#4363d8', '#f58231', '#e6beff'],
    5: ['#ffe119', '#4363d8', '#f58231', '#e6beff', '#800000'],
    6: ['#ffe119', '#4363d8', '#f58231', '#e6beff', '#800000', '#000075'],
    'properties': {
      'type': 'qual',
      'blind': [1],
      'print': [1],
      'copy': [1],
      'screen': [1]
    }
  },

  /*** Sequential ***/
  OrRd: {
    3: ['rgb(254,232,200)', 'rgb(253,187,132)', 'rgb(227,74,51)'],
    4: ['rgb(254,240,217)', 'rgb(253,204,138)', 'rgb(252,141,89)', 'rgb(215,48,31)'],
    5: ['rgb(254,240,217)', 'rgb(253,204,138)', 'rgb(252,141,89)', 'rgb(227,74,51)', 'rgb(179,0,0)'],
    6: ['rgb(254,240,217)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(227,74,51)', 'rgb(179,0,0)'],
    7: ['rgb(254,240,217)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(239,101,72)', 'rgb(215,48,31)', 'rgb(153,0,0)'],
    8: ['rgb(255,247,236)', 'rgb(254,232,200)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(239,101,72)', 'rgb(215,48,31)', 'rgb(153,0,0)'],
    9: ['rgb(255,247,236)', 'rgb(254,232,200)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(239,101,72)', 'rgb(215,48,31)', 'rgb(179,0,0)', 'rgb(127,0,0)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 0, 0, 0, 0, 0],
      'copy': [1, 1, 2, 0, 0, 0, 0],
      'screen': [1, 1, 1, 0, 0, 0, 0]
    }
  },
  PuBu: {
    3: ['rgb(236,231,242)', 'rgb(166,189,219)', 'rgb(43,140,190)'],
    4: ['rgb(241,238,246)', 'rgb(189,201,225)', 'rgb(116,169,207)', 'rgb(5,112,176)'],
    5: ['rgb(241,238,246)', 'rgb(189,201,225)', 'rgb(116,169,207)', 'rgb(43,140,190)', 'rgb(4,90,141)'],
    6: ['rgb(241,238,246)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(43,140,190)', 'rgb(4,90,141)'],
    7: ['rgb(241,238,246)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(3,78,123)'],
    8: ['rgb(255,247,251)', 'rgb(236,231,242)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(3,78,123)'],
    9: ['rgb(255,247,251)', 'rgb(236,231,242)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(4,90,141)', 'rgb(2,56,88)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 2, 2, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 2, 0, 0, 0, 0]
    }
  },
  BuPu: {
    3: ['rgb(224,236,244)', 'rgb(158,188,218)', 'rgb(136,86,167)'],
    4: ['rgb(237,248,251)', 'rgb(179,205,227)', 'rgb(140,150,198)', 'rgb(136,65,157)'],
    5: ['rgb(237,248,251)', 'rgb(179,205,227)', 'rgb(140,150,198)', 'rgb(136,86,167)', 'rgb(129,15,124)'],
    6: ['rgb(237,248,251)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(136,86,167)', 'rgb(129,15,124)'],
    7: ['rgb(237,248,251)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(110,1,107)'],
    8: ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(110,1,107)'],
    9: ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(129,15,124)', 'rgb(77,0,75)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 2, 2, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 1, 0, 0, 0, 0]
    }
  },
  Oranges: {
    3: ['rgb(254,230,206)', 'rgb(253,174,107)', 'rgb(230,85,13)'],
    4: ['rgb(254,237,222)', 'rgb(253,190,133)', 'rgb(253,141,60)', 'rgb(217,71,1)'],
    5: ['rgb(254,237,222)', 'rgb(253,190,133)', 'rgb(253,141,60)', 'rgb(230,85,13)', 'rgb(166,54,3)'],
    6: ['rgb(254,237,222)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(230,85,13)', 'rgb(166,54,3)'],
    7: ['rgb(254,237,222)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(140,45,4)'],
    8: ['rgb(255,245,235)', 'rgb(254,230,206)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(140,45,4)'],
    9: ['rgb(255,245,235)', 'rgb(254,230,206)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(166,54,3)', 'rgb(127,39,4)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 2, 0, 0, 0, 0, 0],
      'copy': [1, 2, 2, 0, 0, 0, 0],
      'screen': [1, 1, 1, 0, 0, 0, 0]
    }
  },
  BuGn: {
    3: ['rgb(229,245,249)', 'rgb(153,216,201)', 'rgb(44,162,95)'],
    4: ['rgb(237,248,251)', 'rgb(178,226,226)', 'rgb(102,194,164)', 'rgb(35,139,69)'],
    5: ['rgb(237,248,251)', 'rgb(178,226,226)', 'rgb(102,194,164)', 'rgb(44,162,95)', 'rgb(0,109,44)'],
    6: ['rgb(237,248,251)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(44,162,95)', 'rgb(0,109,44)'],
    7: ['rgb(237,248,251)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(65,174,118)', 'rgb(35,139,69)', 'rgb(0,88,36)'],
    8: ['rgb(247,252,253)', 'rgb(229,245,249)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(65,174,118)', 'rgb(35,139,69)', 'rgb(0,88,36)'],
    9: ['rgb(247,252,253)', 'rgb(229,245,249)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(65,174,118)', 'rgb(35,139,69)', 'rgb(0,109,44)', 'rgb(0,68,27)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 2, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 2, 0, 0, 0, 0, 0]
    }
  },
  YlOrBr: {
    3: ['rgb(255,247,188)', 'rgb(254,196,79)', 'rgb(217,95,14)'],
    4: ['rgb(255,255,212)', 'rgb(254,217,142)', 'rgb(254,153,41)', 'rgb(204,76,2)'],
    5: ['rgb(255,255,212)', 'rgb(254,217,142)', 'rgb(254,153,41)', 'rgb(217,95,14)', 'rgb(153,52,4)'],
    6: ['rgb(255,255,212)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(217,95,14)', 'rgb(153,52,4)'],
    7: ['rgb(255,255,212)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(140,45,4)'],
    8: ['rgb(255,255,229)', 'rgb(255,247,188)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(140,45,4)'],
    9: ['rgb(255,255,229)', 'rgb(255,247,188)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(153,52,4)', 'rgb(102,37,6)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 2, 0, 0, 0, 0],
      'copy': [1, 2, 2, 0, 0, 0, 0],
      'screen': [1, 2, 0, 0, 0, 0, 0]
    }
  },
  YlGn: {
    3: ['rgb(247,252,185)', 'rgb(173,221,142)', 'rgb(49,163,84)'],
    4: ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(35,132,67)'],
    5: ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)', 'rgb(0,104,55)'],
    6: ['rgb(255,255,204)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(49,163,84)', 'rgb(0,104,55)'],
    7: ['rgb(255,255,204)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,90,50)'],
    8: ['rgb(255,255,229)', 'rgb(247,252,185)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,90,50)'],
    9: ['rgb(255,255,229)', 'rgb(247,252,185)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,104,55)', 'rgb(0,69,41)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 1, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 1, 0, 0, 0, 0]
    }
  },
  Reds: {
    3: ['rgb(254,224,210)', 'rgb(252,146,114)', 'rgb(222,45,38)'],
    4: ['rgb(254,229,217)', 'rgb(252,174,145)', 'rgb(251,106,74)', 'rgb(203,24,29)'],
    5: ['rgb(254,229,217)', 'rgb(252,174,145)', 'rgb(251,106,74)', 'rgb(222,45,38)', 'rgb(165,15,21)'],
    6: ['rgb(254,229,217)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(222,45,38)', 'rgb(165,15,21)'],
    7: ['rgb(254,229,217)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(153,0,13)'],
    8: ['rgb(255,245,240)', 'rgb(254,224,210)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(153,0,13)'],
    9: ['rgb(255,245,240)', 'rgb(254,224,210)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(165,15,21)', 'rgb(103,0,13)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 2, 2, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 2, 0, 0, 0, 0, 0]
    }
  },
  RdPu: {
    3: ['rgb(253,224,221)', 'rgb(250,159,181)', 'rgb(197,27,138)'],
    4: ['rgb(254,235,226)', 'rgb(251,180,185)', 'rgb(247,104,161)', 'rgb(174,1,126)'],
    5: ['rgb(254,235,226)', 'rgb(251,180,185)', 'rgb(247,104,161)', 'rgb(197,27,138)', 'rgb(122,1,119)'],
    6: ['rgb(254,235,226)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(197,27,138)', 'rgb(122,1,119)'],
    7: ['rgb(254,235,226)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)'],
    8: ['rgb(255,247,243)', 'rgb(253,224,221)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)'],
    9: ['rgb(255,247,243)', 'rgb(253,224,221)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)', 'rgb(73,0,106)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 1, 2, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 1, 0, 0, 0, 0]
    }
  },
  Greens: {
    3: ['rgb(229,245,224)', 'rgb(161,217,155)', 'rgb(49,163,84)'],
    4: ['rgb(237,248,233)', 'rgb(186,228,179)', 'rgb(116,196,118)', 'rgb(35,139,69)'],
    5: ['rgb(237,248,233)', 'rgb(186,228,179)', 'rgb(116,196,118)', 'rgb(49,163,84)', 'rgb(0,109,44)'],
    6: ['rgb(237,248,233)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(49,163,84)', 'rgb(0,109,44)'],
    7: ['rgb(237,248,233)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(65,171,93)', 'rgb(35,139,69)', 'rgb(0,90,50)'],
    8: ['rgb(247,252,245)', 'rgb(229,245,224)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(65,171,93)', 'rgb(35,139,69)', 'rgb(0,90,50)'],
    9: ['rgb(247,252,245)', 'rgb(229,245,224)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(65,171,93)', 'rgb(35,139,69)', 'rgb(0,109,44)', 'rgb(0,68,27)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 0, 0, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 2, 0, 0, 0, 0, 0]
    }
  },
  YlGnBu: {
    3: ['rgb(237,248,177)', 'rgb(127,205,187)', 'rgb(44,127,184)'],
    4: ['rgb(255,255,204)', 'rgb(161,218,180)', 'rgb(65,182,196)', 'rgb(34,94,168)'],
    5: ['rgb(255,255,204)', 'rgb(161,218,180)', 'rgb(65,182,196)', 'rgb(44,127,184)', 'rgb(37,52,148)'],
    6: ['rgb(255,255,204)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(44,127,184)', 'rgb(37,52,148)'],
    7: ['rgb(255,255,204)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(12,44,132)'],
    8: ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(12,44,132)'],
    9: ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(37,52,148)', 'rgb(8,29,88)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 1, 2, 2, 2, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 2, 0, 0, 0, 0]
    }
  },
  Purples: {
    3: ['rgb(239,237,245)', 'rgb(188,189,220)', 'rgb(117,107,177)'],
    4: ['rgb(242,240,247)', 'rgb(203,201,226)', 'rgb(158,154,200)', 'rgb(106,81,163)'],
    5: ['rgb(242,240,247)', 'rgb(203,201,226)', 'rgb(158,154,200)', 'rgb(117,107,177)', 'rgb(84,39,143)'],
    6: ['rgb(242,240,247)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(117,107,177)', 'rgb(84,39,143)'],
    7: ['rgb(242,240,247)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(74,20,134)'],
    8: ['rgb(252,251,253)', 'rgb(239,237,245)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(74,20,134)'],
    9: ['rgb(252,251,253)', 'rgb(239,237,245)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(84,39,143)', 'rgb(63,0,125)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 0, 0, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 0, 0, 0, 0, 0, 0]
    }
  },
  GnBu: {
    3: ['rgb(224,243,219)', 'rgb(168,221,181)', 'rgb(67,162,202)'],
    4: ['rgb(240,249,232)', 'rgb(186,228,188)', 'rgb(123,204,196)', 'rgb(43,140,190)'],
    5: ['rgb(240,249,232)', 'rgb(186,228,188)', 'rgb(123,204,196)', 'rgb(67,162,202)', 'rgb(8,104,172)'],
    6: ['rgb(240,249,232)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(67,162,202)', 'rgb(8,104,172)'],
    7: ['rgb(240,249,232)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(78,179,211)', 'rgb(43,140,190)', 'rgb(8,88,158)'],
    8: ['rgb(247,252,240)', 'rgb(224,243,219)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(78,179,211)', 'rgb(43,140,190)', 'rgb(8,88,158)'],
    9: ['rgb(247,252,240)', 'rgb(224,243,219)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(78,179,211)', 'rgb(43,140,190)', 'rgb(8,104,172)', 'rgb(8,64,129)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 1, 2, 2, 2, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 2, 0, 0, 0, 0]
    }
  },
  Greys: {
    3: ['rgb(240,240,240)', 'rgb(189,189,189)', 'rgb(99,99,99)'],
    4: ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(82,82,82)'],
    5: ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(99,99,99)', 'rgb(37,37,37)'],
    6: ['rgb(247,247,247)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(99,99,99)', 'rgb(37,37,37)'],
    7: ['rgb(247,247,247)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)'],
    8: ['rgb(255,255,255)', 'rgb(240,240,240)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)'],
    9: ['rgb(255,255,255)', 'rgb(240,240,240)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)', 'rgb(0,0,0)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 2, 0, 0, 0, 0],
      'copy': [1, 0, 0, 0, 0, 0, 0],
      'screen': [1, 2, 0, 0, 0, 0, 0]
    }
  },
  YlOrRd: {
    3: ['rgb(255,237,160)', 'rgb(254,178,76)', 'rgb(240,59,32)'],
    4: ['rgb(255,255,178)', 'rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(227,26,28)'],
    5: ['rgb(255,255,178)', 'rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(240,59,32)', 'rgb(189,0,38)'],
    6: ['rgb(255,255,178)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(240,59,32)', 'rgb(189,0,38)'],
    7: ['rgb(255,255,178)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(252,78,42)', 'rgb(227,26,28)', 'rgb(177,0,38)'],
    8: ['rgb(255,255,204)', 'rgb(255,237,160)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(252,78,42)', 'rgb(227,26,28)', 'rgb(177,0,38)'],
    9: ['rgb(255,255,204)', 'rgb(255,237,160)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(252,78,42)', 'rgb(227,26,28)', 'rgb(189,0,38)', 'rgb(128,0,38)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 2, 2, 0, 0, 0],
      'copy': [1, 2, 2, 0, 0, 0, 0],
      'screen': [1, 2, 2, 0, 0, 0, 0]
    }
  },
  PuRd: {
    3: ['rgb(231,225,239)', 'rgb(201,148,199)', 'rgb(221,28,119)'],
    4: ['rgb(241,238,246)', 'rgb(215,181,216)', 'rgb(223,101,176)', 'rgb(206,18,86)'],
    5: ['rgb(241,238,246)', 'rgb(215,181,216)', 'rgb(223,101,176)', 'rgb(221,28,119)', 'rgb(152,0,67)'],
    6: ['rgb(241,238,246)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(221,28,119)', 'rgb(152,0,67)'],
    7: ['rgb(241,238,246)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(231,41,138)', 'rgb(206,18,86)', 'rgb(145,0,63)'],
    8: ['rgb(247,244,249)', 'rgb(231,225,239)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(231,41,138)', 'rgb(206,18,86)', 'rgb(145,0,63)'],
    9: ['rgb(247,244,249)', 'rgb(231,225,239)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(231,41,138)', 'rgb(206,18,86)', 'rgb(152,0,67)', 'rgb(103,0,31)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 1, 1, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 1, 0, 0, 0, 0]
    }
  },
  Blues: {
    3: ['rgb(222,235,247)', 'rgb(158,202,225)', 'rgb(49,130,189)'],
    4: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(33,113,181)'],
    5: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'],
    6: ['rgb(239,243,255)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'],
    7: ['rgb(239,243,255)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,69,148)'],
    8: ['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,69,148)'],
    9: ['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,81,156)', 'rgb(8,48,107)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 2, 0, 0, 0, 0, 0],
      'copy': [1, 0, 0, 0, 0, 0, 0],
      'screen': [1, 2, 0, 0, 0, 0, 0]
    }
  },
  PuBuGn: {
    3: ['rgb(236,226,240)', 'rgb(166,189,219)', 'rgb(28,144,153)'],
    4: ['rgb(246,239,247)', 'rgb(189,201,225)', 'rgb(103,169,207)', 'rgb(2,129,138)'],
    5: ['rgb(246,239,247)', 'rgb(189,201,225)', 'rgb(103,169,207)', 'rgb(28,144,153)', 'rgb(1,108,89)'],
    6: ['rgb(246,239,247)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(28,144,153)', 'rgb(1,108,89)'],
    7: ['rgb(246,239,247)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(54,144,192)', 'rgb(2,129,138)', 'rgb(1,100,80)'],
    8: ['rgb(255,247,251)', 'rgb(236,226,240)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(54,144,192)', 'rgb(2,129,138)', 'rgb(1,100,80)'],
    9: ['rgb(255,247,251)', 'rgb(236,226,240)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(54,144,192)', 'rgb(2,129,138)', 'rgb(1,108,89)', 'rgb(1,70,54)'],
    'properties': {
      'type': 'seq',
      'blind': [1],
      'print': [1, 2, 2, 0, 0, 0, 0],
      'copy': [1, 2, 0, 0, 0, 0, 0],
      'screen': [1, 1, 2, 0, 0, 0, 0]
    }
  }
};
exports.colorbrewer = colorbrewer;

function color_schemes(n, kind) {
  var scheme_names = Object.keys(colorbrewer).filter(function (name) {
    var scheme = colorbrewer[name];

    function check(oks) {
      return oks.length == 1 ? oks[0] : oks[n - 3];
    }

    return scheme.properties.type == kind && check(scheme.properties.blind) == 1 && check(scheme.properties.screen) == 1;
  });
  var schemes = scheme_names.map(function (name) {
    return colorbrewer[name][n];
  });
  return schemes;
}

window.eukleides = exports;})();
Numbas.addExtension('eukleides',['math','jme','jme-display'], function(extension) {

    var euk = eukleides;
    var math = Numbas.math;
    var jme = Numbas.jme;

    /** Wrapper to convert Numbas vector (list of numbers) to Eukleides Vector object
     */
    function vec(vector) {
        return new euk.Vector(vector[0],vector[1]);
    }

    /** Wrapper to convert Eukleides Vector object to Numbas vector (list of numbers)
     */
    function unvec(vector) {
        return [vector.x,vector.y];
    }


	var TAngle = function(angle) {
		this.value = angle;
	};
    jme.registerType(TAngle,'eukleides_angle',{
        string: function(v) {
            return new TString(math.niceNumber(math.precround(math.degrees(v.value),2))+'°');
        }
    });
    jme.display.registerType(TAngle,{
        tex: function(thing,tok,texArgs,settings) {
            return settings.texNumber(tok.value,settings)+'°';
        },
        jme: function(tree,tok,bits,settings) {
            var deg = math.degrees(tok.value);
            if(Numbas.util.isInt(deg)) {
                return 'deg('+settings.jmeNumber(deg,settings)+')';
            } else {
                return 'rad('+settings.jmeNumber(tok.value,settings)+')';
            }
        },
        displayString: function(a) {
            return math.niceNumber(math.precround(math.degrees(a.value),2))+'°'.toString();
        }
    });

	var TPoint = function(point) {
		this.value = point;
	};
    jme.registerType(TPoint,'eukleides_point');

	var TLine = function(line) {
		this.value = line;
	};
    jme.registerType(TLine,'eukleides_line');

	var TPointSet = function(point_set) {
		this.value = point_set;
	};
    jme.registerType(TPointSet,'eukleides_point_set',{
        'list': function(s) {
            return new TList(s.value.points.map(function(p){return new TPoint(p)}));
        }
    });

	var TCircle = function(circle) {
		this.value = circle;
	};
    jme.registerType(TCircle,'eukleides_circle');

	var TConic = function(conic) {
		this.value = conic;
	};
    jme.registerType(TConic,'eukleides_conic');

	var TDrawing = function(objects,style) {
        this.value = {
            objects: objects || [],
            style: style || {}
        };
	};
    jme.registerType(TDrawing,'eukleides_drawing');

	var TAngleLabel = function(a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
	};
    jme.registerType(TAngleLabel,'eukleides_angle_label');

    function drawing_visitor(fn) {
        function visit(drawer,drawing,ctx) {
            drawer.push_local_settings();
            Object.entries(drawing.style).forEach(function(d) {
                if(d[1]!==undefined) {
                    drawer.local[d[0]] = d[1];
                }
            });
            drawing.objects.forEach(function(obj) {
                fn(drawer,obj,ctx);
                switch(obj.type) {
                    case 'eukleides_drawing':
                        visit(drawer,obj.value,ctx);
                        break;
                    case 'list':
                        visit(drawer, {objects:obj.value, style:{}},ctx);
                        break;
                    default:
                }
            });
            drawer.pop_local_settings();
        }
        return visit;
    }

    var get_point_labels = drawing_visitor(function(drawer,obj) {
        switch(obj.type) {
            case 'eukleides_point':
                if(drawer.local.label) {
                    drawer.add_point_label(obj.value);
                }
                break;
        }
    });

    var draw_drawing = drawing_visitor(function(drawer,obj,ctx) {
        switch(obj.type) {
            case 'eukleides_point':
                if(drawer.local.label) {
                    drawer.label_point(obj.value);
                } else {
                    var point = drawer.draw_point(obj.value);
                    if(ctx && drawer.local.draggable) {
                        ctx.make_draggable(point, drawer.local.interactive_vars);
                    }
                }
                break;
            case 'eukleides_point_set':
                if(drawer.local.label) {
                    drawer.label_segment(obj.value.points[0],obj.value.points[1]);
                } else if(drawer.local.fill) {
                    drawer.fill_polygon(obj.value);
                } else {
                    drawer.draw_polygon(obj.value);
                }
                break;
            case 'eukleides_line':
                drawer.draw_line(obj.value);
                break;
            case 'eukleides_circle':
                if(drawer.local.fill) {
                    if(obj.from!==undefined) {
                        drawer.fill_arc(obj.value,obj.from,obj.to);
                    } else {
                        drawer.fill_circle(obj.value);
                    }
                } else {
                    if(obj.from!==undefined) {
                        drawer.draw_arc(obj.value,obj.from,obj.to)
                    } else {
                        drawer.draw_circle(obj.value);
                    }
                }
                break;
            case 'eukleides_conic':
                if(obj.from!==undefined) {
                    drawer.draw_conic_arc(obj.value,obj.from,obj.to)
                } else {
                    drawer.draw_conic(obj.value);
                }
                break;
            case 'eukleides_angle_label':
                drawer.label_angle(obj.a,obj.b,obj.c);
                break;
            case 'eukleides_drawing':
            case 'list':
                break;
            default:
                throw(new Numbas.Error('Eukleides trying to draw unknown object type: '+obj.type));
        }
    });

    var translate_types = {
        'eukleides_point': function(p,u) {
            return new TPoint(p.value.translate(u));
        },
        'eukleides_line': function(line,u) {
            return new TLine(line.value.translate(u));
        },
        'eukleides_point_set': function(set,u) {
            return new TPointSet(set.value.translate(u));
        },
        'eukleides_circle': function(circle,u) {
            var c2 = new TCircle(circle.value.translate(u));
            c2.from = circle.from;
            c2.to = circle.to;
            return c2;
        },
        'eukleides_conic': function(conic,u) {
            return new TConic(conic.value.translate(u));
        },
        'eukleides_drawing': function(drawing,u) {
            return new TDrawing(drawing.value.objects.map(function(x){return translate_object(x,u)}),drawing.value.style);
        },
        'eukleides_angle_label': function(l,u) {
            return new TAngleLabel(l.a.translate(u), l.b.translate(u), l.c.translate(u));
        },
        'list': function(list,u) {
            return new TList(list.value.map(function(x){return translate_object(x,u)}));
        }
    };

    function translate_object(x,v) {
        return translate_types[x.type](x,v);
    }

	var funcObj = Numbas.jme.funcObj;
	var TString = Numbas.jme.types.TString;
	var TNum = Numbas.jme.types.TNum;
    var TInt = Numbas.jme.types.TInt;
	var TList = Numbas.jme.types.TList;
    var TDict = Numbas.jme.types.TDict;
	var TBool = Numbas.jme.types.TBool;
	var TVector = Numbas.jme.types.TVector;
	var TRange = Numbas.jme.types.TRange;
    var THTML = Numbas.jme.types.THTML;

    var sig = Numbas.jme.signature;
    var spoint = sig.type('eukleides_point');
    var sangle = sig.type('eukleides_angle');
    var snum = sig.type('number');
    var snumorangle = sig.optional(sig.or(snum,sangle));
    var sig_eukleides = sig.or.apply(sig,['eukleides_angle','eukleides_point','eukleides_point_set','eukleides_line','eukleides_circle','eukleides_conic','eukleides_angle_label','eukleides_angle','eukleides_drawing'].map(sig.type));

    function sig_drawing_of(sig) {

        var f = function(args) {
            if(args.length==0) {
                return false;
            }
            var d = args[0];
            if(d.type!='eukleides_drawing') {
                return false;
            }
            var items = sig(d.value.objects);
            if(items===false || items.length != d.value.objects.length) {
                return false;
            } else {
                return [{type:'eukleides_drawing', items: items}];
            }
        }
        f.kind = 'eukleides_drawing';
        f.signature = sig;
        return f;
    }

    extension.scope.setVariable('origin',new TPoint(new euk.Point(0,0)));

    extension.scope.addFunction(new funcObj('degrees',[TAngle],TNum,function(v){return math.degrees(v)}));

    var sig_translatable = sig.or.apply(sig,Object.keys(translate_types).map(sig.type));
    extension.scope.addFunction(new funcObj('+',[sig_translatable,TVector],'?',null,{
        evaluate: function(args,scope) {
            var x = args[0];
            var v = vec(args[1].value);
            return translate_object(x,v);
        }
    }));
    extension.scope.addFunction(new funcObj('-',[sig_translatable,TVector],'?',null,{
        evaluate: function(args,scope) {
            var x = args[0];
            var v = vec(Numbas.vectormath.negate(args[1].value));
            return translate_object(x,v);
        }
    }));

    extension.scope.addFunction(new funcObj('+',[TAngle,TAngle],TAngle,math.add),
    {description: 'Add two angles'});
    extension.scope.addFunction(new funcObj('-u',[TAngle],TAngle,math.negate),
    {description: 'Add two angles'});
    extension.scope.addFunction(new funcObj('-',[TAngle,TAngle],TAngle,math.sub),
    {description: 'Add two angles'});
    extension.scope.addFunction(new funcObj('*',[TNum,TAngle],TAngle,math.mul),
    {description: 'Add two angles'});
    extension.scope.addFunction(new funcObj('*',[TAngle,TNum],TAngle,math.mul),
    {description: 'Add two angles'});
    extension.scope.addFunction(new funcObj('/',[TAngle,TNum],TAngle,math.div),
    {description: 'Add two angles'});
    extension.scope.addFunction(new funcObj('deg',[TNum],TAngle,function(degrees) {
        var rad = math.radians(degrees);
        return rad;
    },{description: 'Construct an angle in degrees'}));

    extension.scope.addFunction(new funcObj('rad',[TNum],TAngle,function(radians) {
        return radians;
    },{description: 'Construct an angle in radians'}));

    extension.scope.addFunction(new funcObj('point',[TNum,TNum],TPoint,function(x,y) {
        return new euk.Point(x,y);
    },{description: 'A point at the given coordinates'}));

    extension.scope.addFunction(new funcObj('point',[TNum,TAngle],TPoint,function(r,a) {
        return euk.Point.create_polar(r,a);
    },{description: 'A point at the given polar coordinates'}));

    extension.scope.addFunction(new funcObj('point',[TPointSet,TNum],TPoint,function(set,t) {
        return euk.Point.create_point_on_segment(set,t);
    },{description: 'A point along the first edge of the given polygon'}));

    extension.scope.addFunction(new funcObj('point',[TLine,TNum],TPoint,function(line,t) {
        return euk.Point.create_point_on_line(line,t);
    },{description:'A point on the given line, the given distance away from its origin'}));

    extension.scope.addFunction(new funcObj('point_with_abscissa',[TLine,TNum],TPoint,function(line,x) {
        return euk.Point.create_point_with_abscissa(line,x);
    },{description:'A point on the given line with the given abscissa, with respect to the implicit coordinate system'}));

    extension.scope.addFunction(new funcObj('point_with_ordinate',[TLine,TNum],TPoint,function(line,y) {
        return euk.Point.create_point_with_ordinate(line,y);
    },{description:'A point on the given line with the given ordinate, with respect to the implicit coordinate system'}));

    extension.scope.addFunction(new funcObj('point',[TCircle,TAngle],TPoint,function(circle,a) {
        return euk.Point.create_point_on_circle(circle,a);
    },{description:'A point on the given circle at the given angle'}));

    extension.scope.addFunction(new funcObj('list',[TPointSet],TList,function(ps){
        return ps.points.map(function(p){return new TPoint(p)});
    }));

    extension.scope.addFunction(new funcObj('midpoint',[TPointSet],TPoint,function(set) {
        return euk.Point.create_midpoint(set);
    },{description:'The midpoint of the given segment'}));

    extension.scope.addFunction(new funcObj('barycenter',[TPointSet,TList],TPoint,function(points,weights) {
        return euk.Point.create_barycenter(points,weights);
    },{unwrapValues: true},{description:'The barycenter of the given polygon'}));

    extension.scope.addFunction(new funcObj('orthocenter',[TPoint,TPoint,TPoint],TPoint,function(A,B,C) {
        return euk.Point.create_orthocenter(A,B,C);
    },{description:'The orthocenter of the given triangle'}));

    extension.scope.addFunction(new funcObj('reflect',[TPoint,TLine],TPoint,function(p,l) {
        return p.reflect(l);
    },{description:'Reflect a point in a line'}));

    extension.scope.addFunction(new funcObj('symmetric',[TPoint,TPoint],TPoint,function(p,origin) {
        return p.symmetric(origin);
    },{description:'180° rotation of the first point around the second'}));

    extension.scope.addFunction(new funcObj('rotate',[TPoint,TPoint,TAngle],TPoint,function(p,origin,angle) {
        return p.rotate(angle,origin);
    },{description:'Rotate the first point the given angle around the second'}));

    extension.scope.addFunction(new funcObj('distance',[TPoint,TPoint],TNum,function(a,b) {
        return a.distance(b);
    },{description:'Distance between two points'}));

    extension.scope.addFunction(new funcObj('homothetic',[TPoint,TPoint,TNum],TPoint,function(p,origin,k) {
        return p.homothetic(origin,k);
    },{description:'Homothecy (reduction or dilation) of the first point with respect to the second, and the given scale'}));

    extension.scope.addFunction(new funcObj('x',[TPoint],TNum,function(p) {
        return p.abscissa();
    },{description:'x coordinate of a point'}));

    extension.scope.addFunction(new funcObj('y',[TPoint],TNum,function(p) {
        return p.ordinate();
    },{description:'y coordinate of a point'}));

    extension.scope.addFunction(new funcObj('-',[TPoint,TPoint],TVector,function(a,b) {
        return unvec(euk.Vector.create_from_points(b,a));
    },{description:'Vector from the first point\'s position to the second\'s'}));

    extension.scope.addFunction(new funcObj('vector',[TPointSet],TVector,function(set) {
        return unvec(euk.Vector.create_from_segment(set));
    },{description:'Vector from the first point of the polygon to the second'}));

    extension.scope.addFunction(new funcObj('vector',[TLine],TVector,function(line) {
        return unvec(euk.Vector.create_from_line(line));
    },{description:'Vector in the direction of the given line'}));

    extension.scope.addFunction(new funcObj('rotate',[TVector,TAngle],TVector,function(v,a) {
        return unvec(vec(c).rotate(a));
    },{description:'Rotate a vector by the given angle'}));

    extension.scope.addFunction(new funcObj('argument',[TVector],TAngle,function(v) {
        return vec(v).argument();
    },{description:'Direction of the given vector'}));

    extension.scope.addFunction(new funcObj('angle_between',[TVector,TVector],TAngle,function(u,v) {
        return euk.Vector.angle_between(vec(u),vec(v));
    },{description:'Angle between two vectors'}));

    extension.scope.addFunction(new funcObj('line',[TPoint,TAngle],TLine,function(origin,angle) {
        return new euk.Line(origin.x,origin.y,angle);
    },{description:'A line with the given origin and direction'}));

    extension.scope.addFunction(new funcObj('line',[TPoint,TPoint],TLine,function(A,B) {
        return euk.Line.create_with_points(A,B);
    },{description:'A line containing the two given points'}));

    extension.scope.addFunction(new funcObj('line',[TPoint,TVector],TLine,function(origin,u) {
        return euk.Line.create_with_vector(origin,vec(u));
    },{description:'A line with the given origin and direction vector'}));

    extension.scope.addFunction(new funcObj('line',[TPointSet],TLine,function(set) {
        return euk.Line.create_with_segment(set);
    },{description:'A line containing the given segment'}));

    extension.scope.addFunction(new funcObj('parallel',[TLine,TPoint],TLine,function(line,p) {
        return line.parallel(p);
    },{description:'A line parallel to the given line and containing the given point'}));

    extension.scope.addFunction(new funcObj('parallel',[TPointSet,TPoint],TLine,function(set,p) {
        return euk.Line.create_parallel_to_segment(set,p);
    },{description:'A line parallel to the given segment and containing the given point'}));

    extension.scope.addFunction(new funcObj('perpendicular',[TLine,TPoint],TLine,function(line,p) {
        return line.perpendicular(p);
    },{description:'A line perpendicular to the given line and containing the given point'}));

    extension.scope.addFunction(new funcObj('bisector',[TPoint,TPoint,TPoint],TLine,function(A,B,C) {
        return euk.Line.create_angle_bisector(A,B,C);
    },{description:'The bisector of the angle formed by the given points, and containing the second'}));

    extension.scope.addFunction(new funcObj('bisector',[TLine,TLine],TLine,function(l1,l2) {
        return euk.Line.create_lines_bisector(l1,l2);
    },{description:'The bisector of the two given lines'}));

    extension.scope.addFunction(new funcObj('altitude',[TPoint,TPoint,TPoint],TLine,function(A,B,C) {
        return euk.Line.create_altitude(A,B,C);
    },{description:'The line containing the first point and perpendicular to the segment between the second and third'}));

    extension.scope.addFunction(new funcObj('median',[TPoint,TPoint,TPoint],TLine,function(A,B,C) {
        return euk.Line.create_median(A,B,C);
    },{description:'The line containing the first point and passing through the midpoint of the segment between the second and third'}));

    extension.scope.addFunction(new funcObj('reflect',[TLine,TPoint],TLine,function(line,p) {
        return line.reflect(p);
    },{description:'Reflect a line in a point'}));

    extension.scope.addFunction(new funcObj('symmetric',[TLine,TPoint],TLine,function(line,p) {
        return line.symmetric(p);
    },{description:'180° degree rotation of a line around the given point'}));

    extension.scope.addFunction(new funcObj('rotate',[TLine,TPoint,TAngle],TLine,function(line,origin,angle) {
        return line.rotate(origin,angle);
    },{description:'Rotate a line by the given angle around the given point'}));

    extension.scope.addFunction(new funcObj('homothetic',[TLine,TPoint,TNum],TLine,function(line,origin,k) {
        return line.homothetic(origin,k);
    },{description:'Homothecy (reduction or dilation) of a line with respect to the given point and scale factor'}));

    extension.scope.addFunction(new funcObj('argument',[TLine],TAngle,function(line) {
        return line.argument();
    },{description:'Direction angle of the given line'}));

    extension.scope.addFunction(new funcObj('distance',[TLine,TPoint],TNum,function(l,p) {
        return euk.point_line_distance(p,l);
    },{description:'Distance between the given line and point'}));

    extension.scope.addFunction(new funcObj('distance',[TPoint,TLine],TNum,function(p,l) {
        return euk.point_line_distance(p,l);
    },{description:'Distance between the given point and line'}));

    extension.scope.addFunction(new funcObj('..',[TPoint,TPoint],TPointSet,function(a,b) {
        return new euk.Set([a,b]);
    },{description:'A segment between two points'}));

    extension.scope.addFunction(new funcObj('..',[TPointSet,TPoint],TPointSet,function(set,p) {
        return set.add_tail_point(p);
    },{description:'Add a point to the end of a polygon'}));

    extension.scope.addFunction(new funcObj('..',[TPoint,TPointSet],TPointSet,function(p,set) {
        return set.add_head_point(p);
    },{description:'Add a point to the start of a polygon'}));

    extension.scope.addFunction(new funcObj('polygon',[sig.listof(sig.type('eukleides_point'))],TPointSet,function(points) {
        return new TPointSet(new euk.Set(points));
    },{unwrapValues: true},{description:'Construct a polygon from the given list of points'}))

    extension.scope.addFunction(new funcObj('polygon',[TNum,TPoint,TNum,TAngle],TPointSet,function(n,origin,r,a) {
        return euk.Set.create_polygon(n,origin,r,a);
    },{description:'A regular polygon with the given number of sides and circumradius, with center at the given point and rotated by the given angle'}));

    extension.scope.addFunction(new funcObj('segment',[TPointSet,TPoint],TPointSet,function(set,p) {
        return set.segment(p);
    },{description:'A segment from the first point of the given polygon to the given point'}));

    extension.scope.addFunction(new funcObj('..',[TPointSet,TPointSet],TPointSet,function(a,b) {
        return a.concatenate(b);
    },{description:'Concatenate two polygons'}));

    extension.scope.addFunction(new funcObj('..',[TPoint,sig_drawing_of(sig.type('eukleides_point'))],TDrawing,null,{
        evaluate: function(args,scope) {
            var p1 = args[0].value;
            var d = args[1].value;
            var p2 = d.objects[0].value;
            return new TDrawing([new TPointSet(new euk.Set([p1,p2]))],d.style);
        }
    }));

    extension.scope.addFunction(new funcObj('..',[TPointSet,sig_drawing_of(sig.type('eukleides_point'))],TDrawing,null,{
        evaluate: function(args,scope) {
            var s = args[0].value;
            var d = args[1].value;
            var p = d.objects[0].value;
            return new TDrawing([new TPointSet(s.add_tail_point(p))],d.style);
        }
    }));

    extension.scope.addFunction(new funcObj('..',[TPoint,sig_drawing_of(sig.type('eukleides_point_set'))],TDrawing,null,{
        evaluate: function(args,scope) {
            var p = args[0].value;
            var d = args[1].value;
            var s = d.objects[0].value;
            return new TDrawing([new TPointSet(s.add_head_point(p))],d.style);
        }
    }));

    extension.scope.addFunction(new funcObj('reflect',[TPointSet,TLine],TPointSet,function(set,line) {
        return set.reflect(line);
    },{description:'Reflect a polygon in the given point'}));

    extension.scope.addFunction(new funcObj('symmetric',[TPointSet,TPoint],TPointSet,function(set,p) {
        return set.symmetric(p);
    },{description:'180° degree rotation of the given polygon around the given point'}));

    extension.scope.addFunction(new funcObj('rotate',[TPointSet,TPoint,TAngle],TPointSet,function(set,origin,a) {
        return set.rotate(origin,a);
    },{description:'Rotation of a polygon by the given angle around the given point'}));

    extension.scope.addFunction(new funcObj('cardinality',[TPointSet],TNum,function(set) {
        return set.cardinal();
    },{description:'Number of vertices in the given polygon'}));

    extension.scope.addFunction(new funcObj('perimeter',[TPointSet],TNum,function(set) {
        return set.path_length();
    },{description:'Total length of the given polygon\'s edges'}));

    extension.scope.addFunction(new funcObj('area',[TPointSet],TNum,function(set) {
        return set.area();
    },{description:'Area of the given polygon'}));

    extension.scope.addFunction(new funcObj('perpendicular',[TPointSet,TPoint],TLine,function(set,p) {
        return set.perpendicular_to_segment(p);
    },{description:'A line perpendicular to the given segment and containing the given point'}));

    extension.scope.addFunction(new funcObj('perpendicular_bisector',[TPointSet],TLine,function(set) {
        return set.perpendicular_bisector();
    },{description:'The perpendicular bisector of the given segment'}));

    extension.scope.addFunction(new funcObj('center',[TPointSet],TPoint,function(set) {
        return set.isobarycenter();
    },{description:'The isobarycenter of the given polygon'}));

    extension.scope.addFunction(new funcObj('isobarycenter',[TPointSet],TPoint,function(set) {
        return set.isobarycenter();
    },{description:'The isobarycenter of the given polygon'}));

    extension.scope.addFunction(new funcObj('circle',[TPoint,TNum],TCircle,function(center,r) {
        return new euk.Circle(center,r);
    },{description:'A circle with centered at the given point and with the given radius'}));

    extension.scope.addFunction(new funcObj('circle',[TPointSet],TCircle,function(set) {
        return euk.Circle.create_circle_with_diameter(set);
    },{description:'The circle with the given segment as a diameter'}));

    extension.scope.addFunction(new funcObj('circle',[TPoint,TPoint,TPoint],TCircle,function(A,B,C) {
        return euk.Circle.create_circumcircle(A,B,C);
    },{description:'The circle through the given points'}));

    extension.scope.addFunction(new funcObj('incircle',[TPoint,TPoint,TPoint],TCircle,function(A,B,C) {
        return euk.Circle.create_incircle(A,B,C);
    },{description:'The circle inscribed in the triangle defined by the given points'}));

    extension.scope.addFunction(new funcObj('center',[TCircle],TPoint,function(circle) {
        return circle.center();
    },{description:'The center of the given circle'}));

    extension.scope.addFunction(new funcObj('tangent',[TCircle,TAngle],TLine,function(circle,a) {
        return circle.tangent(a);
    },{description:'A line tangent to the given circle at the given heading'}));

    extension.scope.addFunction(new funcObj('arc',[TCircle,TAngle,TAngle],TCircle,function(circle,from,to) {
        var c = new TCircle(circle);
        c.from = from;
        c.to = to;
        return c;
    },{unwrapValues:true, description: 'An arc of the given circle between the given angles'}));

    extension.scope.addFunction(new funcObj('ellipse',[TPoint,TNum,TNum,TAngle],TConic,function(v,a,b,d) {
        return new euk.Ellipse(v,a,b,d);
    },{description:'An ellipse with the given center, major and minor axis, and rotated by the given angle'}));

    extension.scope.addFunction(new funcObj('hyperbola',[TPoint,TNum,TNum,TAngle],TConic,function(v,x,y,a) {
        return new euk.Hyperbola(v,x,y,a);
    },{description:'A hyperbola with the given center, real and imaginary axis, and rotated by the given angle'}));

    extension.scope.addFunction(new funcObj('parabola',[TPoint,TNum,TAngle],TConic,function(v,a,d) {
        return new euk.Parabola(v,a,d);
    },{description:'A parabola with the given summit and parameter, rotated by the given angle'}));

    extension.scope.addFunction(new funcObj('parabola',[TPoint,TLine],TConic,function(A,l) {
        return euk.Conic.create_with_directrix(A,l,1);
    },{description:'A parabola with the given focus and directrix'}));

    extension.scope.addFunction(new funcObj('conic',[TPoint,TLine,TNum],TConic,function(A,l,x) {
        return euk.Conic.create_with_directrix(A,l,x);
    },{description:'A conic with the given focus, directrix and eccentricity'}));

    extension.scope.addFunction(new funcObj('conic',[TPoint,TPoint,TNum],TConic,function(A,B,a) {
        return euk.Conic.create_with_foci(A,B,a);
    },{description:'A conic with the given foci and eccentricity'}));

    extension.scope.addFunction(new funcObj('center',[TConic],TPoint,function(conic) {
        return conic.center();
    },{description:'The center of the given conic'}));

    extension.scope.addFunction(new funcObj('foci',[TConic],TList,function(conic) {
        return conic.foci();
    },{unwrapValues:true, description: 'The foci of the given conic'}));

    extension.scope.addFunction(new funcObj('reflect',[TConic,TLine],TConic,function(conic,line) {
        return conic.reflect(line);
    },{description:'Reflect a conic in a line'}));

    extension.scope.addFunction(new funcObj('symmetric',[TConic,TPoint],TConic,function(conic,p) {
        return conic.symmetric(p);
    },{description:'180° rotation of the given conic around the given point'}));

    extension.scope.addFunction(new funcObj('rotate',[TConic,TPoint,TAngle],TConic,function(conic,origin,a) {
        return conic.rotate(origin,a);
    },{description:'Rotate a conic by the given angle around the given point'}));

    extension.scope.addFunction(new funcObj('homothetic',[TConic,TPoint,TNum],TConic,function(conic,origin,k) {
        return conic.homothetic(origin,k);
    },{description:'Homothecy (reduction or dilation) of a conic with respect to the given point and scaling factor'}));

    extension.scope.addFunction(new funcObj('major',[TConic],TNum,function(conic) {
        return conic.major_axis();
    },{description:'The major axis of the given conic'}));

    extension.scope.addFunction(new funcObj('minor',[TConic],TNum,function(conic) {
        return conic.minor_axis();
    },{description:'The minor axis of the given conic'}));

    extension.scope.addFunction(new funcObj('argument',[TConic],TAngle,function(conic) {
        return conic.argument();
    },{description:'The direction of the given conic'}));

    extension.scope.addFunction(new funcObj('point',[TConic,TNum],TPoint,function(conic,t) {
        return conic.point_on(t);
    },{description:'A point with the given argument on the given conic'}));

    extension.scope.addFunction(new funcObj('eccentricity',[TConic],TNum,function(conic) {
        return conic.eccentricity();
    },{description:'The eccentricity of the given conic'}));

    extension.scope.addFunction(new funcObj('argument',[TConic,TPoint],TAngle,function(conic,p) {
        return conic.point_argument(p);
    },{description:'Polar angle of the given point with respect to the center of the given conic'}));

    extension.scope.addFunction(new funcObj('tangent',[TConic,TNum],TLine,function(conic,t) {
        return conic.tangent(t);
    },{description:'A line tangent to the given conic at the given argument'}));

    extension.scope.addFunction(new funcObj('arc',[TConic,TAngle,TAngle],TConic,function(conic,from,to) {
        var c = new TConic(conic);
        c.from = from;
        c.to = to;
        return c;
    },{unwrapValues:true, description: 'The portion of the given conic between the given arguments'}));

    function wrap_vertices(vertices) {
        return new TList(vertices.map(function(v){ return new TPoint(v); }));
    }

    var sig_triangle = sig.or(
        sig.sequence(spoint, spoint, snumorangle, snumorangle, sig.optional(sangle)),
        sig.sequence(sig.optional(spoint), sig.optional(spoint), sig.optional(
            sig.sequence(snum, snumorangle, snumorangle, sig.optional(sangle))
        ))
    );
    extension.scope.addFunction(new funcObj('triangle',[sig_triangle],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var x,s1,s2,a = 0;
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=args.length) {
                    x = 6;
                } else {
                    x = args[i].value;
                    i += 1;
                }
            }
            // can optionally give the two remaining lengths or angles
            if(i<args.length-1) {
                s1 = args[i];
                s2 = args[i+1];
                i += 2;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            var out;
            if(s1===undefined) {
                out = euk.TriangleMaker.define_optimal_scalene(vertices,x,a);
            } else if(s1.type=='number' && s2.type=='number') {
                out = euk.TriangleMaker.define_triangle_SSS(vertices,x,s1.value,s2.value,a);
            } else if(s1.type=='eukleides_angle' && s2.type=='eukleides_angle') {
                out = euk.TriangleMaker.define_triangle_SAA(vertices,x,s1.value,s2.value,a);
            } else if(s1.type=='eukleides_angle' && s2.type=='number') {
                out = euk.TriangleMaker.define_triangle_SAS(vertices,x,s1.value,s2.value,a);
            } else if(s1.type=='number' && s2.type=='eukleides_angle') {
                out = euk.TriangleMaker.define_triangle_SSA(vertices,x,s1.value,s2.value,a);
            }
            return wrap_vertices(out);
        }
    },{description:'Create a triangle from the given parameters. Can give up to two vertices; any remaining lengths or angles; and the orientation of the first side if fewer than two vertices given'}));

    var sig_right = sig.or(
        sig.sequence(spoint, spoint, snumorangle, sig.optional(sangle)),
        sig.sequence(sig.optional(spoint), sig.optional(spoint), sig.optional(
            sig.sequence(snum, snumorangle, sig.optional(sangle))
        ))
    );
    extension.scope.addFunction(new funcObj('right',[sig_right],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var x,s,a = 0;
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                x = args[i].value;
                i += 1;
            }

            // must give one other length or angle
            var s = args[i];
            i += 1;

            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            
            var out;
            if(s.type=='number') {
                out = euk.TriangleMaker.define_right_SS(vertices,x,s.value,a);
            } else {
                out = euk.TriangleMaker.define_right_SA(vertices,x,s.value,a);
            }
            return wrap_vertices(out);
        }
    },{description:'Create a right-angled triangle from the given parameters. Can give up to two vertices; one other length or angle; and the orientation of the first side if fewer than two vertices given'}));

    var sig_isosceles = sig.or(
        sig.sequence(spoint, spoint, sig.or(snum,sangle)),
        sig.sequence(sig.optional(spoint), sig.optional(spoint), sig.optional(
            sig.sequence(snum, sig.or(snum,sangle), sig.optional(sangle))
        ))
    );
    extension.scope.addFunction(new funcObj('isosceles',[sig_isosceles],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var x,s,a = 0;
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i==args.length) {
                    x = 6;
                } else {
                    x = args[i].value;
                    i += 1;
                }
            }

            // must give one other length or angle
            if(i==args.length) {
                s = new TAngle(Numbas.math.radians(39));
            } else {
                s = args[i];
                i += 1;
            }

            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            
            var out;
            if(s.type=='number') {
                out = euk.TriangleMaker.define_isosceles_SS(vertices,x,s.value,a);
            } else {
                out = euk.TriangleMaker.define_isosceles_SA(vertices,x,s.value,a);
            }
            return wrap_vertices(out);
        }
    },{description:'Create an isosceles triangle from the given points. Can give up to two vertices; one other length or angle; and the orientation of the first side if fewer than two vertices given'}));

    var sig_equilateral = sig.or(
        sig.sequence(spoint, spoint, sig.optional(sangle)),
        sig.sequence(sig.optional(spoint), sig.optional(spoint), snum, sig.optional(sangle))
    );
    extension.scope.addFunction(new funcObj('equilateral',[sig_equilateral],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var x, a = 0;
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                x = args[i].value;
                i += 1;
            }

            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            
            var out = euk.TriangleMaker.define_equilateral(vertices,x,a);
            return wrap_vertices(out);
        }
    },{description:'Create an equilateral triangle from the given points. Can give up two two vertices; if fewer than two vertices are given must give the length of the first side and optionally the orientation of the first side'}));

    var sig_parallelogram = sig.or(
        sig.sequence(spoint, spoint, spoint),
        sig.sequence(spoint, spoint, sig.optional(sig.sequence(snum, sangle))),
        sig.sequence(sig.optional(spoint), sig.optional(sig.sequence(snum, snum, sangle, sig.optional(sangle))))
    );
    extension.scope.addFunction(new funcObj('parallelogram',[sig_parallelogram],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to three vertices
            for(var i=0;i<3 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            if(vertices.length==3) {
                return wrap_vertices(euk.QuadrilateralMaker.define_parallelogram_SSA(vertices));
            }
            var num_vertices = vertices.length;
            var s1 = 5, s2 = 4, an = Math.PI*5/12, a = 0;
            if(i<args.length) {
                // length of first side must be given if fewer than two vertices given
                if(num_vertices<2) {
                    s1 = args[i].value;
                    i += 1;
                }
                // must give one more side and an angle
                s2 = args[i].value;
                an = args[i+1].value;
                i += 2;
                // can optionally give the orientation of the first side if fewer than two vertices given
                if(num_vertices<2 && i<args.length) {
                    a = args[i].value;
                }
            }
            return wrap_vertices(euk.QuadrilateralMaker.define_parallelogram_SSA(vertices,s2,an,s1,a));
        }
    },{description:'Create a parallelogram from the given points. Can give up to three vertices. If fewer than two vertices given, must give the length of the first side, one more side and an angle, and optionally the orientation of the first side'}));

    var sig_rectangle = sig.or(
        sig.sequence(spoint, spoint, sig.optional(snum)),
        sig.sequence(sig.optional(spoint), sig.optional(sig.sequence(snum, snum, sig.optional(sangle))))
    );
    extension.scope.addFunction(new funcObj('rectangle',[sig_rectangle],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var s1 = 6, s2 = 6*2/(1+Math.sqrt(5)), a = 0;
            if(i==args.length) {
                return wrap_vertices(euk.QuadrilateralMaker.define_rectangle(vertices,s1,s2,a));
            }
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                s1 = args[i].value;
                i += 1;
            }
            // must give one more side
            s2 = args[i].value;
            i += 1;
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            return wrap_vertices(euk.QuadrilateralMaker.define_rectangle(vertices,s1,s2,a));
        }
    },{description:'Create a rectangle from the given points. Can give up to two vertices. If fewer than two vertices given, must give the length of the first side. Must give the length of one more side and optionally the orientation of the first side'}));

    var sig_square = sig.or(
        sig.sequence(spoint, spoint),
        sig.sequence(sig.optional(spoint), sig.optional(sig.sequence(snum, sig.optional(sangle))))
    );
    extension.scope.addFunction(new funcObj('square',[sig_square],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var s = 4, a = 0;
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                s = args[i].value;
                i += 1;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            return wrap_vertices(euk.QuadrilateralMaker.define_square(vertices,s,a));
        }
    },{description:'Create a square from the given points. Can give up to two vertices. If fewer than two vertices given, must give the length of the first side and can optionally give the orientation of the first side'}));

    extension.scope.addFunction(new funcObj('projection',[TPoint,TLine],TPoint,function(A,l) {
        return euk.orthogonal_projection(A,l);
    },{description:''}));

    extension.scope.addFunction(new funcObj('projection',[TPoint,TLine,TLine],TPoint,function(A,l1,l2) {
        return euk.parallel_projection(A,l1,l2);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TLine],TPoint,function(l1,l2) {
        return euk.lines_intersection(l1,l2);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TPointSet],TPointSet,function(l,set) {
        return euk.line_set_intersection(l,set);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TCircle],TPointSet,function(l,c) {
        return euk.line_circle_intersection(l,c);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TConic],TPointSet,function(l,c) {
        return euk.line_conic_intersection(l,c);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TPointSet,TPointSet],TPointSet,function(s1,s2) {
        return euk.sets_intersection(s1,s2);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TCircle,TCircle],TPointSet,function(c1,c2) {
        return euk.circles_intersection(c1,c2);
    },{description:''}));

    extension.scope.addFunction(new funcObj('intersection',[TPointSet,TCircle],TPointSet,function(s,c) {
        return euk.circle_set_intersection(s,c);
    },{description:''}));

    var style_commands = {
        'dot': {shape:'dot'},
        'disc': {shape:'disc'},
        'box': {shape:'box'},
        'plus': {shape: 'plus'},
        'cross': {shape: 'cross', label_segment: 'cross'},
        'closed': {close: true},
        'open': {close: false},
        'filled': {fill: true},
        'simple': {label_segment: 'simple', angle: 'simple', label:true},
        'double': {label_segment: 'double', angle: 'double', label:true},
        'triple': {label_segment: 'triple', angle: 'triple', label:true},
        'full': {style: 'full'},
        'dotted': {style: 'dotted', dec: 'dotted'},
        'dashed': {style: 'dashed', dec: 'dashed'},
        'entire': {part: 'entire'},
        'half': {part: 'half'},
        'right': {dir: 'right', angle: 'right'},
        'forth': {dir: 'forth', angle: 'forth'},
        'back': {dir: 'back', angle: 'back'},
        'noarrow': {arrow: 'none'},
        'arrow': {arrow: 'arrow'},
        'arrows': {arrow: 'arrows'},
        'transparent': {opacity: 0.5},
        'bold': {bold: true},
        'italic': {italic: true},
        'verbose': {aria_mode: 'verbose'},
        'nospoilers': {aria_mode: 'nospoilers'}
    }

    var colors = ['black','darkgray','gray','lightgray','white'];
    colors.forEach(function(color) {
        style_commands[color] = {color: color}
    });

    var default_color_scheme = eukleides.colorbrewer['Trubetskoy'][6];
    default_color_scheme.forEach(function(color,i) {
        style_commands['color'+(i+1)] = {color: color, color_description: 'color '+(i+1)};
    });

    Object.entries(style_commands).forEach(function(e) {
        var name = e[0];
        var style = e[1];
        extension.scope.setVariable(name,new TDrawing([],style));
    })

    extension.scope.addFunction(new funcObj('draggable',[sig.optional(sig.type('string')),sig.optional(sig.listof(sig.type('string')))],TDrawing,function(key,names) {
        return new TDrawing([],{draggable:true, key: key, color: 'blue',size:1.5, interactive_vars: names});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('label',[sig.optional(sig.or(sig.type('string'),sig.type('number'))),sig.optional(sig.type('eukleides_angle')),sig.optional(sig.type('number'))],TDrawing,function(text,angle,dist) {
        return new TDrawing([],{label:true, label_text: text, label_direction: angle, label_dist: dist});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('description',[TString],TDrawing,function(description) {
        return new TDrawing([],{description: description});
    },{unwrapValues: true},{description:'Set the accessible description for the object being drawn'}));

    extension.scope.addFunction(new funcObj('text',[TString],TDrawing,function(text) {
        return new TDrawing([],{label:true, label_text: text, label_dist: 0});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('angle',[TPoint,TPoint,TPoint],TAngleLabel,function(a,b,c) {
        return new TAngleLabel(a,b,c);
    },{unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('size',[TNum],TDrawing,function(size) {
        return new TDrawing([],{size:size});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('font',[TString],TDrawing,function(font) {
        return new TDrawing([],{font_family:font});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('color',[TString],TDrawing,function(color) {
        return new TDrawing([],{color:color});
    }, {unwrapValues: true},{description:''}));

    function get_color_schemes(n,kind) {
        var schemes = euk.color_schemes(Math.max(n,3),kind);
        if(schemes.length<1) {
            throw(new Error("No appropriate colour scheme could be found."));
        }
        schemes = schemes.map(function(scheme) {
            return new TList(scheme.slice(0,n).map(function(color,i) {
                return new TDrawing([],{color:color, color_description: 'color '+(i+1)});
            }));
        })
        return schemes;
    }
    function get_color_scheme(n,kind) {
        return get_color_schemes(n,kind)[0];
    }

    extension.scope.addFunction(new funcObj('sequential_color_schemes',[TInt],TList, function(n) {
        return new TList(get_color_schemes(n,'seq'));
    }, {unwrapValues: true}, {description: 'Get a list of colour schemes for a sequential data set'}));

    extension.scope.addFunction(new funcObj('divergent_color_schemes',[TInt],TList, function(n) {
        return new TList(get_color_schemes(n,'div'));
    }, {unwrapValues: true}, {description: 'Get a list of colour schemesfor a divergent data set'}));

    extension.scope.addFunction(new funcObj('qualitative_color_schemes',[TInt],TList, function(n) {
        return new TList(get_color_schemes(n,'qual'));
    }, {unwrapValues: true}, {description: 'Get a list of colour schemes for a qualitative data set'}));

    extension.scope.addFunction(new funcObj('sequential_color_scheme',[TInt],TList, function(n) {
        return get_color_scheme(n,'seq');
    }, {unwrapValues: true}, {description: 'Get a list of colours for a sequential data set'}));

    extension.scope.addFunction(new funcObj('divergent_color_scheme',[TInt],TList, function(n) {
        return get_color_scheme(n,'div');
    }, {unwrapValues: true}, {description: 'Get a list of colours for a divergent data set'}));

    extension.scope.addFunction(new funcObj('qualitative_color_scheme',[TInt],TList, function(n) {
        return get_color_scheme(n,'qual');
    }, {unwrapValues: true}, {description: 'Get a list of colours for a qualitative data set'}));

    extension.scope.addFunction(new funcObj('opacity',[TNum],TDrawing,function(opacity) {
        return new TDrawing([],{opacity:opacity});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('hsl',[TNum,TNum,TNum],TDrawing,function(h,s,l) {
        return new TDrawing([],{color:'hsl('+h+','+(100*s)+'%,'+(100*l)+'%)'});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('hsla',[TNum,TNum,TNum,TNum],TDrawing,function(h,s,l,a) {
        return new TDrawing([],{color:'hsla('+h+','+(100*s)+'%,'+(100*l)+'%,'+a+')'});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('rgb',[TNum,TNum,TNum],TDrawing,function(r,g,b) {
        return new TDrawing([],{color:'rgb('+r+','+g+','+b+')'});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('rgba',[TNum,TNum,TNum,TNum],TDrawing,function(r,g,b,a) {
        return new TDrawing([],{color:'rgb('+r+','+g+','+b+','+a+')'});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('*',[TDrawing,TDrawing],TDrawing,function(d1,d2) {
        var objects = d1.objects.concat(d2.objects);
        var style = Numbas.util.extend_object({},d1.style,d2.style);
        return new TDrawing(objects,style);
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('*',[TPointSet,TDrawing],TDrawing,null,{
        evaluate: function(args,scope) {
            var object = args[0];
            var d = args[1].value;
            var nobjects = d.objects.concat([object]);
            return new TDrawing(nobjects, d.style);
        }
    },{description:''}))

    extension.scope.addFunction(new funcObj('*',[TList,TDrawing],TDrawing,null,{
        evaluate: function(args,scope) {
            var objects = args[0].value;
            var d = args[1].value;
            var nobjects = d.objects.concat(objects);
            return new TDrawing(nobjects, d.style);
        }
    },{description:''}))

    extension.scope.addFunction(new funcObj('group',[sig.multiple(sig.or(sig_eukleides,sig.type('list')))],TDrawing,null,{
        evaluate: function(args,scope) {
            return new TDrawing(args,{});
        }
    },{description:''}));

    extension.scope.addFunction(new funcObj('*',['?',TDrawing],TDrawing,null,{
        evaluate: function(args,scope) {
            var object = args[0];
            var d = args[1].value;
            var nobjects = d.objects.concat([object]);
            return new TDrawing(nobjects, d.style);
        }
    },{description:''}))

    var svg_acc = 0;
    function create_svg() {
        var id = 'eukleides-diagram-'+(svg_acc++)+'-';
        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('role','img');
        var title = document.createElementNS('http://www.w3.org/2000/svg','title');
        title.setAttribute('id',id+'title');
        svg.appendChild(title);
        return svg;
    }

    function find_bounding_box(svg) {
        document.body.appendChild(svg);
        var svg_rect = svg.getBoundingClientRect();
        var min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_y = -Infinity;
        var children = Array.prototype.slice.apply(svg.children);
        children.forEach(function(c) {
            try {
                if(!c.getBBox) {
                    return;
                }
                var r = c.getBBox();
                var m = c.getCTM();
            } catch(e) {
                return;
            }

            /* Text elements are scaled (1,-1) to get them the right way up, since
             * the global coords are flipped so positive y is up.
             * getBBox doesn't apply the transformation, even though it should,
             * so we have to flip the y coordinate manually
             */
            var y = m.d>0 ? r.y : -(r.y+r.height);  

            min_x = Math.min(min_x, r.x);
            min_y = Math.min(min_y, y);
            max_x = Math.max(max_x, r.x+r.width);
            max_y = Math.max(max_y, y+r.height);
        });
        if(children.length==0) {
            min_x = 0;
            max_x = 1;
            min_y = 0;
            max_y = 1;
        }

        var w = (max_x-min_x)*1.1;
        var h = (max_y-min_y)*1.1;
        var cx = (max_x+min_x)/2;
        var cy = (max_y+min_y)/2;
        min_x = cx - w/2;
        min_y = cy - h/2;
        max_x = cx + w/2;
        max_y = cy + h/2;

        document.body.removeChild(svg);
        
        return {min_x: min_x, min_y: min_y, max_x: max_x, max_y: max_y};
    }

    function InteractiveContext(drawer,title_tree,objects,scope,initial_values) {
        var ctx = this;
        
        this.drawer = drawer;
        this.title_tree = title_tree;
        this.objects = objects;
        this.scope = scope;
        this.elements = {};

        this.mousex = 0;
        this.mousey = 0;
        this.animating = false;

        this.start_time = new Date();

        var all_free_vars = jme.findvars(objects);
        var animates = all_free_vars.contains('time');
        var takes_input = all_free_vars.find(function(n){return ['mousex','mousey'].contains(n)})!==undefined;

        this.free_vars = jme.findvars(objects,['time','mousex','mousey'].concat(Object.keys(ctx.scope.allVariables())));
        initial_values = initial_values || {};
        this.values = [];
        this.free_vars.forEach(function(n) {
            if(initial_values[n]) {
                ctx.values.push(jme.unwrapValue(initial_values[n]));
            } else {
                ctx.values.push(0);
            }
        });
        this.initial_values = this.values.slice();

        function frame() {
            if(ctx.animating) {
                ctx.draw();
            }
            if(animates) {
                requestAnimationFrame(frame);
            }
        }
        if(animates) {
            drawer.svg.addEventListener('mouseover',function(e) {
                ctx.animating = animates;
            });
            drawer.svg.addEventListener('mouseout',function(e) {
                ctx.animating = false;
            });
        }
        if(takes_input) {
            drawer.svg.addEventListener('mousemove',function(e) {
                var r = ctx.drawer.svg.getBoundingClientRect();
                ctx.mousex = (e.clientX-r.x)/r.width*(ctx.drawer.max_x-ctx.drawer.min_x) + ctx.drawer.min_x;
                ctx.mousey = (e.clientY-r.y)/r.height*(ctx.drawer.min_y-ctx.drawer.max_y) + ctx.drawer.max_y;
                requestAnimationFrame(frame);
            });
        }
        drawer.svg.addEventListener('dblclick',function(e) {
            e.preventDefault();
            ctx.values = ctx.initial_values.slice();
            ctx.draw();
        });
        this.draw();
        if(animates) {
            frame();
        }

        var shadow_svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        this.optimisation_drawer = new euk.SVGDrawer(shadow_svg,document);
    }
    InteractiveContext.prototype = {
        redraw: function(drawer,vars) {
            var ctx = this;
            var wrapped_vars = {};
            drawer.before_render();
            Object.entries(vars).forEach(function(d) {
                wrapped_vars[d[0]] = jme.wrapValue(d[1]);
            });
            var title = ctx.scope.evaluate(ctx.title_tree).value;
            var title_el = drawer.svg.querySelector('title');
            if(title_el) {
                title_el.textContent = title;
            }
            var drawing = new TDrawing([ctx.scope.evaluate(ctx.objects,wrapped_vars)]);
            get_point_labels(drawer,drawing.value);
            draw_drawing(drawer,drawing.value,ctx);
            drawer.after_render();
        },

        draw: function() {
            this.redraw(this.drawer,this.make_values(this.values));
        },

        make_values: function(values) {
            var now = new Date();
            var time = (now - this.start_time)/1000;

            var vars = {
                time: time,
                mousex: this.mousex,
                mousey: this.mousey
            };
            this.free_vars.forEach(function(n,i){
                vars[n] = values[i];
            });
            return vars;
        },

        optimisation_redraw: function(values) {
            this.redraw(this.optimisation_drawer,this.make_values(values));
            return this.optimisation_drawer.elements;
        },

        make_draggable: function(element, optimise_names) {
            var ctx = this;
            var id = element.getAttribute('data-eukleides-id');
            if(this.elements[id]) {
                return;
            }
            this.elements[id] = element;
            element.setAttribute('tabindex',"1");
            function get_position(elements) {
                var element = elements[id];
                var cx = parseFloat(element.getAttribute('cx'));
                var cy = parseFloat(element.getAttribute('cy'));
                return {x:cx,y:cy};
            }
            var last_good_values = null;
            optimise_names = optimise_names || ctx.free_vars;
            optimise_names = optimise_names.filter(function(n){ return ctx.free_vars.contains(n)});
            function onstart() {
                var initial = get_position(ctx.elements);
                function ondrag(dx,dy) {
                    function fill_remaining_values(vs) {
                        var values = ctx.values.slice();
                        optimise_names.forEach(function(n,i) {
                            var j = ctx.free_vars.indexOf(n);
                            values[j] = vs[i];
                        });
                        return values;
                    };
                    function cost(values) {
                        var elements = ctx.optimisation_redraw(fill_remaining_values(values));
                        var npos = get_position(elements);
                        var delta_x = npos.x-(initial.x+dx);
                        var delta_y = npos.y-(initial.y+dy);
                        var c = delta_x*delta_x + delta_y*delta_y;
                        return c;
                    }
                    function grad(values) {
                        return euk.gradient(cost,values);
                    }
                    function gradZero(values) {
                        return grad(values).every(function(x){return x==0});
                    }
                    var values = optimise_names.map(function(n) {
                        var i = ctx.free_vars.indexOf(n);
                        return ctx.values[i];
                    });
                    var low_precision = true;
                    if(gradZero(values)) {
                        if(last_good_values) {
                            values = last_good_values;
                        } else {
                            values = ctx.initial_values;
                        }
                        low_precision = false;
                    }
                    var nvalues = fill_remaining_values(euk.minimize(cost,values,low_precision).solution);
                    if(gradZero(nvalues)) {
                        values.forEach(function(v,i) {
                            nvalues[i] = euk.findPhaseChange(function(v){
                                var mock = nvalues.slice();
                                mock[i] = v;
                                return grad(mock)[i]==0;
                            },nvalues[i],values[i]);
                        });
                    } else {
                        last_good_values = nvalues;
                    }
                    ctx.values = nvalues;
                    ctx.draw();
                }
                return ondrag;
            }
            ctx.drawer.handle_dragging(element,onstart);
        }
    }

    extension.scope.addFunction(new funcObj('eukleides',[TString,TNum,TNum,TNum,TNum,TDrawing,TDict],THTML,null,{
        evaluate: function(args,scope) {
            var objects;
            var title_tree = args[0];
            var min_x,min_y,max_x,max_y,initial_values;
            if(args.length<=3) {
                objects = args[1];
                if(args[2]) {
                    initial_values = scope.evaluate(args[2]);
                    if(initial_values.type!='dict') {
                        throw(new Numbas.Error("The 3rd argument to draw_interactive_svg must be a dictionary, not "+initial_values.type));
                    }
                    initial_values = initial_values.value;
                }
            } else {
                min_x = scope.evaluate(args[1]).value;
                min_y = scope.evaluate(args[2]).value;
                max_x = scope.evaluate(args[3]).value;
                max_y = scope.evaluate(args[4]).value;
                objects = args[5];
                if(args[6]) {
                    initial_values = scope.evaluate(args[6]);
                    if(initial_values.type!='dict') {
                        throw(new Numbas.Error("The 6th argument to draw_interactive_svg must be a dictionary, not "+initial_values.type));
                    }
                    initial_values = initial_values.value;
                }
            }
            var svg = create_svg();
            var drawer = new euk.SVGDrawer(svg,document);

            if(min_x!==undefined) {
                drawer.setup_frame(min_x,min_y,max_x,max_y,1);
            }

            var ctx = new InteractiveContext(drawer,title_tree,objects,scope,initial_values,min_x===undefined);

            if(min_x===undefined) {
                var res = find_bounding_box(svg);
                drawer.setup_frame(res.min_x,res.min_y,res.max_x,res.max_y,1);
                ctx.draw();
            }

            return new THTML(svg);
        }
    },{description:''}));
    jme.lazyOps.push('eukleides');
    jme.findvarsOps.eukleides = function(tree,boundvars,scope) {
        var vars = [];
        var initial_values;
        var args = tree.args;
        if(args.length<=3) {
            initial_values = args[2];
        } else {
            initial_values = args[6];
        }
        if(initial_values) {
            vars = vars.concat(jme.findvars(initial_values,boundvars,scope));
        }
        return vars;
    }
});
