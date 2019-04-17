"use strict";

var euk = _interopRequireWildcard(require("./eukleides.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.eukleides = euk;

window.run_playground = function () {
  var nice_type_names = {
    'eukleides_angle': 'angle',
    'eukleides_point': 'point',
    'eukleides_line': 'line',
    'eukleides_point_set': 'point set',
    'eukleides_circle': 'circle',
    'eukleides_conic': 'conic',
    'eukleides_drawing': 'drawing',
    'eukleides_angle_label': 'angle label'
  };
  var type_descriptions = {
    'eukleides_angle': 'An angle. The positive direction is anti-clockwise, and 0 points right.',
    'eukleides_point': 'A single point.',
    'eukleides_line': 'An infinite line.',
    'eukleides_point_set': 'An ordered list of points, interpreted as a line segment, an outline, or a polygon, depending on context.',
    'eukleides_circle': 'A circle, defined by its centre point and radius.',
    'eukleides_conic': 'A conic curve: an ellipse, hyperbola or parabola.',
    'eukleides_drawing': 'A collection of drawing modifiers, applied to a list of objects.',
    'eukleides_angle_label': 'A curve showing the angle defined by three points.'
  };
  var modifier_descriptions = {
    'origin': 'The point at coordinates (0,0).',
    'dot': 'Points are drawn as solid dots.',
    'disc': 'Points are drawn as hollow discs.',
    'box': 'Points are drawn as solid squares.',
    'plus': 'Points are drawn as + shapes.',
    'cross': 'Points are drawn as x shapes.',
    'closed': 'Point sets are drawn as closed polygons - the last point is joined to the first.',
    'open': 'Point sets are drawn as open paths.',
    'filled': 'Point sets are drawn as filled polygons.',
    'simple': 'Segments and angle labels are marked with a single dash.',
    'double': 'Segments and angle labels are marked with a double dash. If <code>dotted</code> is also applied, angle labels will instead be labelled with two dots.',
    'triple': 'Segments and angle labels are marked with a triple dash. If <code>dotted</code> is also applied, angle labels will instead be labelled with three dots.',
    'full': 'Lines are drawn as continuous lines. This is the default.',
    'dotted': 'Lines and filled shapes are drawn with a dotted pattern.',
    'dashed': 'Lines are drawn with a dashed pattern, and filled shapes are drawn with stripes.',
    'entire': 'Draw lines and conics as far as possible in both directions.',
    'half': 'Only draw lines and curves in the direction specified. The default is forwards.',
    'right': 'Draw angle labels as right angles.',
    'forth': 'When <code>half</code> is applied, draw lines and curves in the forward direction. Arrows on line segments are drawn on the last point. Arrows on angle labels are drawn pointing anti-clockwise.',
    'back': 'When <code>half</code> is applied, draw lines and curves in the backward direction. Arrows on line segments are drawn on the first point. Arrows on angle labels are drawn pointing clockwise.',
    'noarrow': 'Do not draw an arrow on segments or angle labels. This is the default.',
    'arrow': 'Draw an arrow on line segments and angle labels, in the direction specified by <code>forth</code> or <code>back</code>.',
    'arrows': 'Draw arrows on both ends of line segments and angle labels.',
    'transparent': 'Set the opacity to 0.5.',
    'bold': 'Text is drawn in boldface.',
    'italic': 'Text is drawn in italic style.',
    'verbose': 'Accessible descriptions give information not explicitly given in the visual rendering, such as coordinates and bearings.',
    'nospoilers': 'Accessible descriptions will not give any information not explicitly given in the visual rendering.'
  };

  function nice_type_name(name) {
    return nice_type_names[name] || name;
  }

  function nice_fn_name(name) {
    var prefix = Object.entries(Numbas.jme.prefixForm).find(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          d = _ref2[0],
          o = _ref2[1];

      return o == name;
    });

    if (prefix) {
      return prefix[0];
    } else {
      return name;
    }
  }

  function join_word(list, comma, word) {
    if (list.length > 1) {
      return [list.slice(0, list.length - 1).join("".concat(comma, " ")), list[list.length - 1]].join(" ".concat(word, " "));
    } else {
      return list.join('');
    }
  }

  function desc_type(type) {
    if (!type.match) {
      console.error(type);
      return type;
    }

    var local = type.match(/^eukleides_/);
    var href = local ? "#type-".concat(type) : "https://docs.numbas.org.uk/en/latest/jme-reference.html#".concat(type);
    var target = local ? '' : 'jme-docs';
    return ["<a href=\"".concat(href, "\" target=\"").concat(target, "\"><code class=\"type\">").concat(nice_type_name(type), "</code></a>")];
  }

  function desc_named_sig(sig) {
    var desc = desc_sig(sig);

    if (!desc) {
      console.error(sig);
    }

    if (sig.param_name) {
      desc[0] = "<code class=\"name\">".concat(sig.param_name, "</code>: ").concat(desc[0]);
    }

    return desc;
  }

  function desc_sig(sig) {
    switch (sig.kind) {
      case 'anything':
        return ['anything'];

      case 'type':
        return [desc_type(sig.type)];

      case 'multiple':
        return ['multiple ' + desc_named_sig(sig.signature)];

      case 'optional':
        return ['[' + desc_named_sig(sig.signature).join(', ') + ']'];

      case 'sequence':
        return Array.prototype.concat.apply([], sig.signatures.map(desc_named_sig));

      case 'list':
        return ['<code>list</code> of ' + sig.signatures.map(desc_named_sig)];

      case 'dict':
        return ['<code>dict</code> of ' + desc_named_sig(sig.signature)];

      case 'or':
        var bits = sig.signatures.map(function (s) {
          var d = desc_named_sig(s);

          if (s.kind != 'type' && s.kind != 'anything') {
            d = "(".concat(d.join(', '), ")");
          }

          return d;
        });
        return [bits.join(' | ')];

      case 'eukleides_drawing':
        return ['drawing of ' + desc_named_sig(sig.signature)];
    }
  }

  function describe_definitions(fns) {
    function describe_def(fn, sig) {
      if (sig.kind == 'sequence' && sig.signatures.length == 1 && sig.signatures[0].kind == 'or') {
        return sig.signatures[0].signatures.map(function (s) {
          return describe_def(fn, s);
        }).join('\n');
      }

      var intype = desc_named_sig(sig);
      var names = arg_names(fn.fn);

      if (names) {
        intype = intype.map(function (s, i) {
          return "<code class=\"name\">".concat(names[i], "</code>: ").concat(s);
        });
      } else {}

      var open = '<span class="function-bracket">(</span>';
      var close = '<span class="function-bracket">)</span>';
      var name = "<code class=\"function-name\">".concat(fn.name, "</code>");
      var application;

      if (Numbas.jme.Parser.prototype.re.re_op.exec(fn.name)) {
        var prefix = Object.entries(Numbas.jme.prefixForm).find(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              d = _ref4[0],
              o = _ref4[1];

          return o == fn.name;
        });

        if (prefix) {
          application = "".concat(prefix[0], " ").concat(intype[0]);
        } else {
          application = "".concat(open).concat(intype[0]).concat(close, " ").concat(name, " ").concat(open).concat(intype[1]).concat(close);
        }
      } else {
        application = "".concat(name, " ").concat(open).concat(intype.join(', ')).concat(close);
      }

      var outtype = desc_type(fn.outtype);
      return "<p class=\"signature\">".concat(application, " \u2192 <code class=\"type\">").concat(outtype, "</code></p>");
    }

    return fns.map(function (fn) {
      var description = fn.description ? "<p class=\"description\">".concat(fn.description, "</p>") : '';
      return "<li>".concat(describe_def(fn, fn.intype)).concat(description, "</li>");
    }).join('\n');
  }

  function arg_names(fn) {
    var s = fn + '';
    var m = /^function\(([^\)]*)\)/.exec(s);

    if (!m) {
      return;
    }

    var args = m[1].split(',');
    return args;
  }

  Numbas.queueScript('base', [], function () {});
  Numbas.runImmediately(['jme'], function () {});
  Numbas.queueScript('base', [], function () {});
  Numbas.queueScript('demo', ['extensions/eukleides/eukleides.js'], function () {
    var euk = Numbas.extensions.eukleides;
    var s = window.s = new Numbas.jme.Scope([Numbas.jme.builtinScope, euk.scope]);
    var type_html = '';
    Object.keys(euk.types).map(function (name) {
      type_html += "<dt id=\"type-".concat(name, "\">").concat(nice_type_name(name), "</dt><dd>").concat(type_descriptions[name], "</dd>\n");
    });
    document.getElementById('types').innerHTML = type_html;
    var fn_html = '';
    var fn_definitions = {};
    Object.entries(euk.scope.allFunctions()).sort().map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          name = _ref6[0],
          fns = _ref6[1];

      name = nice_fn_name(name);
      fn_definitions[name] = fn_definitions[name] || [];
      fn_definitions[name].push("<dd><ul>".concat(describe_definitions(fns), "</ul></dd>"));
    });
    var fn_alphabet = document.getElementById('fn-alphabet');
    var last_letter = '';
    Object.entries(fn_definitions).sort().forEach(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          name = _ref8[0],
          defs = _ref8[1];

      var initial = name[0].toLowerCase();
      var anchor = '';

      if (initial != last_letter) {
        fn_alphabet.innerHTML += "<a href=\"#fn-letter-".concat(initial, "\">").concat(initial.toUpperCase(), "</a>");
        last_letter = initial;
        anchor = "<a name=\"fn-letter-".concat(initial, "\" class=\"anchor\"></a>");
      }

      fn_html += "<dt data-name=\"".concat(name, "\">").concat(anchor).concat(name, "</dt>\n").concat(defs.join('\n'));
    });
    document.getElementById('function-definitions').innerHTML = fn_html;
    var modifier_html = '';
    var color_htmls = [];
    Object.entries(euk.scope.allVariables()).sort().map(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          name = _ref10[0],
          value = _ref10[1];

      var description = modifier_descriptions[name];

      if (description) {
        modifier_html += "<dt data-name=\"".concat(name, "\">").concat(name, "</dt><dd>").concat(description, "</dd>");
      } else if (value.value.style.color !== undefined) {
        color_htmls.push("<span data-name=\"".concat(name, "\" class=\"color\">").concat(name, "</span>"));
      }
    });
    modifier_html = "<p><strong>Colours:</strong> ".concat(color_htmls.join(', '), "</p>") + modifier_html;
    document.getElementById('modifiers').innerHTML = modifier_html;
    var code = document.getElementById('code');
    var output = document.getElementById('output');
    var error_display = document.getElementById('error');

    function look_at_selection() {
      Array.prototype.map.call(document.querySelectorAll('dt.active'), function (e) {
        e.classList.remove('active');
      });
      var name = code.value.slice(code.selectionStart, code.selectionEnd);

      if (name) {
        var def = document.querySelector("[data-name=\"".concat(name, "\"]"));

        if (def) {
          console.log(def);
          def.classList.add('active');
          def.scrollIntoView({
            block: 'center'
          });
        }
      }
    }

    code.addEventListener('select', look_at_selection);
    var mx = 0,
        my = 0;
    var error = false;

    function show_diagram(script) {
      var svg_diagram = s.evaluate(script);
      var svg = svg_diagram.value[0];
      output.innerHTML = '';
      output.appendChild(svg);
      svg.addEventListener('mousemove', function (e) {
        var r = svg.getBoundingClientRect();
        var sx = e.clientX - r.x;
        var sy = e.clientY - r.y;
      });
    }

    var remake = window.remake = function () {
      console.clear();
      var script = code.value;

      try {
        error = false;
        document.body.classList.remove('error');
        show_diagram(script);
      } catch (e) {
        error = true;
        document.body.classList.add('error');
        error_display.innerHTML = e.message;
        console.error(e);
      }
    };

    code.addEventListener('input', remake);
    remake();
  });
};

