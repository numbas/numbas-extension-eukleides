Numbas.addExtension('eukleides',['math','jme'], function(extension) {

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

	var TAngle = Numbas.jme.types.eukleides_angle = Numbas.jme.types.eukleides_TAngle= function(angle) {
		this.value = angle;
	};
	TAngle.prototype.type = 'eukleides_angle';

	var TPoint = Numbas.jme.types.eukleides_point = Numbas.jme.types.eukleides_TPoint= function(point) {
		this.value = point;
	};
	TPoint.prototype.type = 'eukleides_point';

	var TLine = Numbas.jme.types.eukleides_line = Numbas.jme.types.eukleides_TLine= function(line) {
		this.value = line;
	};
	TLine.prototype.type = 'eukleides_line';

	var TPointSet = Numbas.jme.types.eukleides_point_set = Numbas.jme.types.eukleides_TPointSet= function(point_set) {
		this.value = point_set;
	};
	TPointSet.prototype.type = 'eukleides_point_set';

	var TCircle = Numbas.jme.types.eukleides_circle = Numbas.jme.types.eukleides_TCircle= function(circle) {
		this.value = circle;
	};
	TCircle.prototype.type = 'eukleides_circle';

	var TConic = Numbas.jme.types.eukleides_conic = Numbas.jme.types.eukleides_TConic= function(conic) {
		this.value = conic;
	};
	TConic.prototype.type = 'eukleides_conic';

	var TDrawing = Numbas.jme.types.eukleides_drawing = Numbas.jme.types.eukleides_TDrawing = function(objects,style) {
        this.value = {
            objects: objects || [],
            style: style || {}
        };
	};
	TDrawing.prototype.type = 'eukleides_drawing';

	var TLabel = Numbas.jme.types.eukleides_label = Numbas.jme.types.eukleides_TLabel= function(object,style) {
        this.object = object;
		this.style = style;
	};
	TLabel.prototype.type = 'eukleides_label';

	var TAngleLabel = Numbas.jme.types.eukleides_angle_label = Numbas.jme.types.eukleides_TAngleLabel = function(a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
	};
	TAngleLabel.prototype.type = 'eukleides_angle_label';

    function draw_drawing(drawer,drawing) {
        var ostyle = drawer.local;
        drawer.local = Numbas.util.extend_object({},ostyle,drawing.style);
        drawing.objects.forEach(function(obj) {
            switch(obj.type) {
                case 'eukleides_drawing':
                    draw_drawing(drawer,obj.value);
                    break;
                case 'eukleides_point':
                    if(drawer.local.label) {
                        drawer.label_point(obj.value);
                    } else {
                        drawer.draw_point(obj.value);
                    }
                    break;
                case 'eukleides_point_set':
                    if(drawer.local.fill) {
                        drawer.fill_polygon(obj.value);
                    } else {
                        drawer.draw_polygon(obj.value);
                    }
                    if(drawer.local.label) {
                        drawer.label_segment(obj.value.points[0],obj.value.points[1]);
                    }
                    break;
                case 'eukleides_line':
                    drawer.draw_line(obj.value);
                    break;
                case 'eukleides_circle':
                    if(drawer.local.fill) {
                        drawer.fill_circle(obj.value);
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
                case 'list':
                    draw_drawing(drawer, {objects:obj.value, style:{}});
                    break;
                case 'eukleides_angle_label':
                    drawer.label_angle(obj.a,obj.b,obj.c);
                    break;
                default:
                    console.log('unknown object type: '+obj.type);
            }
        });
        drawer.local = ostyle;
    }

	var funcObj = Numbas.jme.funcObj;
	var TString = Numbas.jme.types.TString;
	var TNum = Numbas.jme.types.TNum;
	var TList = Numbas.jme.types.TList;
	var TBool = Numbas.jme.types.TBool;
	var TVector = Numbas.jme.types.TVector;
	var TRange = Numbas.jme.types.TRange;
    var THTML = Numbas.jme.types.THTML;

    extension.scope.addFunction(new funcObj('deg',[TNum],TAngle,function(degrees) {
        var rad = Numbas.math.radians(degrees);
        return rad;
    }));

    extension.scope.addFunction(new funcObj('rad',[TNum],TAngle,function(radians) {
        return radians;
    }));

    extension.scope.addFunction(new funcObj('point',[TNum,TNum],TPoint,function(x,y) {
        return new euk.Point(x,y);
    }));

    extension.scope.addFunction(new funcObj('polar',[TNum,TNum],TPoint,function(r,a) {
        return euk.Point.create_polar(r,a);
    }));

    extension.scope.addFunction(new funcObj('point',[TPointSet,TNum],TPoint,function(set,t) {
        return euk.Point.create_point_on_segment(set,t);
    }));

    extension.scope.addFunction(new funcObj('point',[TLine,TNum],TPoint,function(line,t) {
        return euk.Point.create_point_on_line(line,t);
    }));

    extension.scope.addFunction(new funcObj('point_with_abscissa',[TLine,TNum],TPoint,function(line,x) {
        return euk.Point.create_point_with_abscissa(line,x);
    }));

    extension.scope.addFunction(new funcObj('point_with_ordinate',[TLine,TNum],TPoint,function(line,y) {
        return euk.Point.create_point_with_ordinate(line,y);
    }));

    extension.scope.addFunction(new funcObj('point',[TCircle,TNum],TPoint,function(circle,a) {
        return euk.Point.create_point_on_circle(circle,a);
    }));

    extension.scope.addFunction(new funcObj('midpoint',[TPointSet],TPoint,function(set) {
        return euk.Point.create_midpoint(set);
    }));

    extension.scope.addFunction(new funcObj('barycenter',[TPointSet,TList],TPoint,function(points,weights) {
        return euk.Point.create_barycenter(points,weights);
    },{unwrapValues: true}));

    extension.scope.addFunction(new funcObj('orthocenter',[TPoint,TPoint,TPoint],TPoint,function(A,B,C) {
        return euk.Point.create_orthocenter(A,B,C);
    }));

    extension.scope.addFunction(new funcObj('+',[TPoint,TVector],TPoint,function(p,u) {
        return p.translate(vec(u));
    }));

    extension.scope.addFunction(new funcObj('-',[TPoint,TVector],TPoint,function(p,u) {
        return p.translate(vec(Numbas.vectormath.negate(u)));
    }));

    extension.scope.addFunction(new funcObj('reflect',[TPoint,TLine],TPoint,function(p,l) {
        return p.reflect(l);
    }));

    extension.scope.addFunction(new funcObj('symmetric',[TPoint,TPoint],TPoint,function(p,origin) {
        return p.symmetric(origin);
    }));

    extension.scope.addFunction(new funcObj('rotate',[TPoint,TPoint,TNum],TPoint,function(p,origin,angle) {
        return p.rotate(angle,origin);
    }));

    extension.scope.addFunction(new funcObj('distance',[TPoint,TPoint],TNum,function(a,b) {
        return a.distance(b);
    }));

    extension.scope.addFunction(new funcObj('homothetic',[TPoint,TPoint,TNum],TPoint,function(p,origin,k) {
        return p.homothetic(origin,k);
    }));

    extension.scope.addFunction(new funcObj('x',[TPoint],TNum,function(p) {
        return p.abscissa();
    }));

    extension.scope.addFunction(new funcObj('y',[TPoint],TNum,function(p) {
        return p.ordinate();
    }));

    extension.scope.addFunction(new funcObj('-',[TPoint,TPoint],TVector,function(a,b) {
        return unvec(euk.Vector.create_from_points(a,b));
    }));

    extension.scope.addFunction(new funcObj('vector',[TPointSet],TVector,function(set) {
        return unvec(euk.Vector.create_from_segment(set));
    }));

    extension.scope.addFunction(new funcObj('vector',[TLine],TVector,function(line) {
        return unvec(euk.Vector.create_from_line(line));
    }));

    extension.scope.addFunction(new funcObj('rotate',[TVector,TNum],TVector,function(v,a) {
        return unvec(vec(c).rotate(a));
    }));

    extension.scope.addFunction(new funcObj('argument',[TVector],TNum,function(v) {
        return vec(v).argument();
    }));

    extension.scope.addFunction(new funcObj('angle_between',[TVector,TVector],TNum,function(u,v) {
        return euk.Vector.angle_between(vec(u),vec(v));
    }));

    extension.scope.addFunction(new funcObj('line',[TPoint,TNum],TLine,function(origin,angle) {
        return new euk.Line(origin.x,origin.y,angle);
    }));

    extension.scope.addFunction(new funcObj('line',[TPoint,TPoint],TLine,function(A,B) {
        return euk.Line.create_with_points(A,B);
    }));

    extension.scope.addFunction(new funcObj('line',[TPoint,TVector],TLine,function(origin,u) {
        return euk.Line.create_with_vector(origin,vec(u));
    }));

    extension.scope.addFunction(new funcObj('line',[TPointSet],TLine,function(set) {
        return euk.Line.create_with_segment(set);
    }));

    extension.scope.addFunction(new funcObj('parallel',[TLine,TPoint],TLine,function(line,p) {
        return line.parallel(p);
    }));

    extension.scope.addFunction(new funcObj('parallel',[TPointSet,TPoint],TLine,function(set,p) {
        return euk.Line.create_parallel_to_segment(set,p);
    }));

    extension.scope.addFunction(new funcObj('perpendicular',[TLine,TPoint],TLine,function(line,p) {
        return line.perpendicular(p);
    }));

    extension.scope.addFunction(new funcObj('bisector',[TPoint,TPoint,TPoint],TLine,function(A,B,C) {
        return euk.Line.create_angle_bisector(A,B,C);
    }));

    extension.scope.addFunction(new funcObj('bisector',[TLine,TLine],TLine,function(l1,l2) {
        return euk.Line.create_lines_bisector(l1,l2);
    }));

    extension.scope.addFunction(new funcObj('altitude',[TPoint,TPoint,TPoint],TLine,function(A,B,C) {
        return euk.Line.create_altitude(A,B,C);
    }));

    extension.scope.addFunction(new funcObj('median',[TPoint,TPoint,TPoint],TLine,function(A,B,C) {
        return euk.Line.create_median(A,B,C);
    }));

    extension.scope.addFunction(new funcObj('+',[TLine,TVector],TLine,function(line,u) {
        return line.translate(vec(u));
    }));

    extension.scope.addFunction(new funcObj('-',[TLine,TVector],TLine,function(line,u) {
        return line.translate(vec(Numbas.vectormath.negate(u)));
    }));

    extension.scope.addFunction(new funcObj('reflect',[TLine,TPoint],TLine,function(line,p) {
        return line.reflect(p);
    }));

    extension.scope.addFunction(new funcObj('symmetric',[TLine,TPoint],TLine,function(line,p) {
        return line.symmetric(p);
    }));

    extension.scope.addFunction(new funcObj('rotate',[TLine,TPoint,TNum],TLine,function(line,origin,angle) {
        return line.rotate(origin,angle);
    }));

    extension.scope.addFunction(new funcObj('homothetic',[TLine,TPoint,TNum],TLine,function(line,origin,k) {
        return line.homothetic(origin,k);
    }));

    extension.scope.addFunction(new funcObj('argument',[TLine],TNum,function(line) {
        return line.argument();
    }));

    extension.scope.addFunction(new funcObj('distance',[TLine,TPoint],TNum,function(l,p) {
        return euk.point_line_distance(p,l);
    }));

    extension.scope.addFunction(new funcObj('distance',[TPoint,TLine],TNum,function(p,l) {
        return euk.point_line_distance(p,l);
    }));

    extension.scope.addFunction(new funcObj('..',[TPoint,TPoint],TPointSet,function(a,b) {
        return new euk.Set([a,b]);
    }));

    extension.scope.addFunction(new funcObj('..',[TPointSet,TPoint],TPointSet,function(set,p) {
        return set.add_tail_point(p);
    }));

    extension.scope.addFunction(new funcObj('..',[TPoint,TPointSet],TPointSet,function(p,set) {
        return set.add_head_point(p);
    }));

    extension.scope.addFunction(new funcObj('pointset',[TList],TPointSet,function(points) {
        return new euk.Set(points);
    },{unwrapValues: true}))

    extension.scope.addFunction(new funcObj('polygon',[TNum,TPoint,TNum,TNum],TPointSet,function(n,origin,r,a) {
        return euk.Set.create_polygon(n,origin,r,a);
    }));

    extension.scope.addFunction(new funcObj('segment',[TPointSet,TPoint],TPointSet,function(set,p) {
        return set.segment(p);
    }));

    extension.scope.addFunction(new funcObj('..',[TPointSet,TPointSet],TPointSet,function(a,b) {
        return a.concatenate(b);
    }));

    extension.scope.addFunction(new funcObj('list',[TPointSet],TList,function(set) {
        return new TList(set.points.map(function(p){ return new TPoint(p)}));
    },{unwrapValues: true}));

    extension.scope.addFunction(new funcObj('listval',[TPointSet,TNum],TPoint,function(set,i) {
        return set.extract_point(i);
    }));

    extension.scope.addFunction(new funcObj('+',[TPointSet,TVector],TPointSet,function(set,u) {
        return set.translate(vec(u));
    }));

    extension.scope.addFunction(new funcObj('-',[TPointSet,TVector],TPointSet,function(set,u) {
        return set.translate(vec(Numbas.vectormath.negate(u)));
    }));

    extension.scope.addFunction(new funcObj('listval',[TPointSet,TRange],TPointSet,function(set,range) {
        var size = set.cardinal();
        var start = Numbas.util.wrapListIndex(range[0],size);
        var end = Numbas.util.wrapListIndex(range[1],size);
        return set.extract_subset(start,end);
    }));

    extension.scope.addFunction(new funcObj('reflect',[TPointSet,TLine],TPointSet,function(set,line) {
        return set.reflect(line);
    }));

    extension.scope.addFunction(new funcObj('symmetric',[TPointSet,TPoint],TPointSet,function(set,p) {
        return set.symmetric(p);
    }));

    extension.scope.addFunction(new funcObj('rotate',[TPointSet,TPoint,TNum],TPointSet,function(set,origin,a) {
        return set.rotate(origin,a);
    }));

    extension.scope.addFunction(new funcObj('cardinality',[TPointSet],TNum,function(set) {
        return set.cardinal();
    }));

    extension.scope.addFunction(new funcObj('perimeter',[TPointSet],TNum,function(set) {
        return set.path_length();
    }));

    extension.scope.addFunction(new funcObj('area',[TPointSet],TNum,function(set) {
        return set.area();
    }));

    extension.scope.addFunction(new funcObj('perpendicular',[TPointSet,TPoint],TLine,function(set,p) {
        return set.perpendicular_to_segment(p);
    }));

    extension.scope.addFunction(new funcObj('perpendicular_bisector',[TPointSet],TLine,function(set) {
        return set.perpendicular_bisector();
    }));

    extension.scope.addFunction(new funcObj('isobarycenter',[TPointSet],TPoint,function(set) {
        return set.isobarycenter();
    }));

    extension.scope.addFunction(new funcObj('circle',[TPoint,TNum],TCircle,function(center,r) {
        return new euk.Circle(center,r);
    }));

    extension.scope.addFunction(new funcObj('circle',[TPointSet],TCircle,function(set) {
        return euk.Circle.create_circle_with_diameter(set);
    }));

    extension.scope.addFunction(new funcObj('circle',[TPoint,TPoint,TPoint],TCircle,function(A,B,C) {
        return euk.Circle.create_circumcircle(A,B,C);
    }));

    extension.scope.addFunction(new funcObj('incircle',[TPoint,TPoint,TPoint],TCircle,function(A,B,C) {
        return euk.Circle.create_incircle(A,B,C);
    }));

    extension.scope.addFunction(new funcObj('center',[TCircle],TPoint,function(circle) {
        return circle.center();
    }));

    extension.scope.addFunction(new funcObj('tangent',[TCircle,TNum],TLine,function(circle,a) {
        return circle.tangent(a);
    }));

    extension.scope.addFunction(new funcObj('arc',[TCircle,TNum,TNum],TCircle,function(circle,from,to) {
        var c = new TCircle(circle);
        c.from = from;
        c.to = to;
        return c;
    },{unwrapValues:true}));

    extension.scope.addFunction(new funcObj('conic',[TPoint,TLine,TNum],TConic,function(A,l,x) {
        return euk.Conic.create_with_directrix(A,l,x);
    }));

    extension.scope.addFunction(new funcObj('conic',[TPoint,TPoint,TNum],TConic,function(A,B,a) {
        return euk.Conic.create_with_foci(A,B,a);
    }));

    extension.scope.addFunction(new funcObj('center',[TConic],TPoint,function(conic) {
        return conic.center();
    }));

    extension.scope.addFunction(new funcObj('foci',[TConic],TList,function(conic) {
        return conic.foci();
    }));

    extension.scope.addFunction(new funcObj('+',[TConic,TVector],TConic,function(conic,u) {
        return conic.translate(vec(u));
    }));

    extension.scope.addFunction(new funcObj('-',[TConic,TVector],TConic,function(conic,u) {
        return conic.translate(vec(Numbas.vectormath.negate(u)));
    }));

    extension.scope.addFunction(new funcObj('reflect',[TConic,TLine],TConic,function(conic,line) {
        return conic.reflect(line);
    }));

    extension.scope.addFunction(new funcObj('symmetric',[TConic,TPoint],TConic,function(conic,p) {
        return conic.symmetric(p);
    }));

    extension.scope.addFunction(new funcObj('rotate',[TConic,TPoint,TNum],TConic,function(conic,origin,a) {
        return conic.rotate(origin,a);
    }));

    extension.scope.addFunction(new funcObj('homothetic',[TConic,TPoint,TNum],TConic,function(conic,origin,k) {
        return conic.homothetic(origin,k);
    }));

    extension.scope.addFunction(new funcObj('major_axis',[TConic],TNum,function(conic) {
        return conic.major_axis();
    }));

    extension.scope.addFunction(new funcObj('minor_axis',[TConic],TNum,function(conic) {
        return conic.minor_axis();
    }));

    extension.scope.addFunction(new funcObj('argument',[TConic],TNum,function(conic) {
        return conic.argument();
    }));

    extension.scope.addFunction(new funcObj('point',[TConic,TNum],TPoint,function(conic,t) {
        return conic.point_on(t);
    }));

    extension.scope.addFunction(new funcObj('eccentricity',[TConic],TNum,function(conic) {
        return conic.eccentricity();
    }));

    extension.scope.addFunction(new funcObj('argument',[TConic,TPoint],TNum,function(conic,p) {
        return conic.point_argument(p);
    }));

    extension.scope.addFunction(new funcObj('tangent',[TConic,TNum],TLine,function(conic,t) {
        return conic.tangent(t);
    }));

    extension.scope.addFunction(new funcObj('arc',[TConic,TNum,TNum],TConic,function(conic,from,to) {
        var c = new TConic(conic);
        c.from = from;
        c.to = to;
        return c;
    },{unwrapValues:true}));

    function wrap_vertices(vertices) {
        return new TList(vertices.map(function(v){ return new TPoint(v); }));
    }

    extension.scope.addFunction(new funcObj('triangle',[],TList,null,{
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
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to two vertices
            for(var i=0;i<2 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i==variables.length) {
                    return true;
                } else if(variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // can optionally give the two remaining lengths or angles
            if(i<variables.length-1) {
                var a = variables[i];
                if(a.type!='number' && a.type!='eukleides_angle') {
                    return false;
                }
                var b = variables[i+1];
                if(b.type!='number' && b.type!='eukleides_angle') {
                    return false;
                }
                i += 2;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('right',[],TList,null,{
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
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to two vertices
            for(var i=0;i<2 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=variables.length || variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // must give one other length or angle
            if(i<variables.length) {
                var a = variables[i];
                if(a.type!='number' && a.type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            } else {
                return false;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('isosceles',[],TList,null,{
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
                out = euk.TriangleMaker.define_isosceles_SS(vertices,x,s.value,a);
            } else {
                out = euk.TriangleMaker.define_isosceles_SA(vertices,x,s.value,a);
            }
            return wrap_vertices(out);
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to two vertices
            for(var i=0;i<2 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=variables.length || variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // must give one other length or angle
            if(i<variables.length) {
                var a = variables[i];
                if(a.type!='number' && a.type!='eukleides_angle') {
                    return false;
                }
            } else {
                return false;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('equilateral',[],TList,null,{
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
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to two vertices
            for(var i=0;i<2 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=variables.length || variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('parallelogram',[],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to three vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            if(vertices.length==3) {
                return wrap_vertices(euk.QuadrilateralMaker.define_parallelogram_SSA(vertices));
            }
            var num_vertices = vertices.length;
            var s1 = 5, s2 = 4, an = Math.PI*5/12, a = 0;
            if(i==args.length) {
                return wrap_vertices(euk.QuadrilateralMaker.define_parallelogram_SSA(vertices,s1,s2,an,a));
            }
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                s1 = args[i].value;
                i += 1;
            }
            // must give one more side and an angle
            s2 = args[i].value;
            san = args[i+1].value;
            i += 2;
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            return wrap_vertices(euk.QuadrilateralMaker.define_parallelogram_SSA(vertices,s1,s2,an,a));
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to three vertices
            for(var i=0;i<3 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }

            // if three vertices are given, the fourth is fixed
            if(num_vertices==3) {
                return i==variables.length;
            }

            if(i==variables.length) {
                return true;
            }

            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=variables.length || variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // must give one more length and an angle
            if(i<variables.length-1) {
                var a = variables[i];
                if(a.type!='number') {
                    return false;
                }
                var b = variables[i+1];
                if(b.type!='eukleides_angle') {
                    return false;
                }
                i += 2;
            } else {
                return false;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('rectangle',[],TList,null,{
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
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to two vertices
            for(var i=0;i<2 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }

            if(i==variables.length) {
                return true;
            }

            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=variables.length || variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // must give one more length
            if(i<variables.length) {
                var a = variables[i];
                if(a.type!='number') {
                    return false;
                }
                i += 1;
            } else {
                return false;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('square',[],TList,null,{
        evaluate: function(args,scope) {
            var vertices = [];
            // can give up to two vertices
            for(var i=0;i<2 && i<args.length && args[i].type=='eukleides_point';i++) {
                vertices.push(args[i].value);
            }
            var num_vertices = vertices.length;
            var s = 4, a = 0;
            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                s = args[i].value;
                i += 1;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<args.length) {
                a = args[i].value;
            }
            return wrap_vertices(euk.QuadrilateralMaker.define_square(vertices,s,a));
        },
        typecheck: function(variables) {
            var num_vertices = 0;
            // can give up to two vertices
            for(var i=0;i<2 && i<variables.length && variables[i].type=='eukleides_point';i++) {
                num_vertices += 1;
            }

            // length of first side must be given if fewer than two vertices given
            if(num_vertices<2) {
                if(i>=variables.length || variables[i].type!='number') {
                    return false;
                }
                i += 1;
            }
            // can optionally give the orientation of the first side if fewer than two vertices given
            if(num_vertices<2 && i<variables.length) {
                if(variables[i].type!='eukleides_angle') {
                    return false;
                }
                i += 1;
            }
            return i==variables.length;
        }
    }));

    extension.scope.addFunction(new funcObj('projection',[TPoint,TLine],TPoint,function(A,l) {
        return euk.orthogonal_projection(A,l);
    }));

    extension.scope.addFunction(new funcObj('projection',[TPoint,TLine,TLine],TPoint,function(A,l1,l2) {
        return euk.parallel_projection(A,l1,l2);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TLine],TPoint,function(l1,l2) {
        return euk.lines_intersection(l1,l2);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TPointSet],TPointSet,function(l,set) {
        return euk.line_set_intersection(l,set);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TCircle],TPointSet,function(l,c) {
        return euk.line_circle_intersection(l,c);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TLine,TConic],TPointSet,function(l,c) {
        return euk.line_conic_intersection(l,c);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TPointSet,TPointSet],TPointSet,function(s1,s2) {
        return euk.sets_intersection(s1,s2);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TCircle,TCircle],TPointSet,function(c1,c2) {
        return euk.circles_intersection(c1,c2);
    }));

    extension.scope.addFunction(new funcObj('intersection',[TPointSet,TCircle],TPointSet,function(s,c) {
        return euk.circle_set_intersection(s,c);
    }));

    var style_commands = {
        'dot': {shape:'dot'},
        'disc': {shape:'disc'},
        'box': {shape:'box'},
        'plus': {shape: 'plus'},
        'cross': {shape: 'cross', label_segment: 'cross'},
        'closed': {close: true},
        'open': {close: false},
        'filled': {fill: true},
        'simple': {label_segment: 'simple', angle: 'simple'},
        'double': {label_segment: 'double', angle: 'double'},
        'triple': {label_segment: 'triple', angle: 'triple'},
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
        'italic': {italic: true}
    }

    euk.colors.forEach(function(color) {
        style_commands[color] = {color: color}
    });

    Object.entries(style_commands).forEach(function(e) {
        var name = e[0];
        var style = e[1];
        extension.scope.setVariable(name,new TDrawing([],style));
    })


    extension.scope.addFunction(new funcObj('label',[],TDrawing,function() {
        return new TDrawing([],{label:true});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('label',[TString,TAngle],TDrawing,function(text,angle) {
        return new TDrawing([],{label:true, label_text: text, label_direction: angle});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('angle',[TPoint,TPoint,TPoint],TAngleLabel,function(a,b,c) {
        return new TAngleLabel(a,b,c);
    },{unwrapValues: true}));

    extension.scope.addFunction(new funcObj('size',[TNum],TDrawing,function(size) {
        return new TDrawing([],{size:size});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('font',[TString],TDrawing,function(font) {
        return new TDrawing([],{font_family:font});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('color',[TString],TDrawing,function(color) {
        return new TDrawing([],{color:color});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('opacity',[TNum],TDrawing,function(opacity) {
        return new TDrawing([],{opacity:opacity});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('hsl',[TNum,TNum,TNum],TDrawing,function(h,s,l) {
        return new TDrawing([],{color:'hsl('+h+','+(100*s)+'%,'+(100*l)+'%)'});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('hsla',[TNum,TNum,TNum,TNum],TDrawing,function(h,s,l,a) {
        return new TDrawing([],{color:'hsla('+h+','+(100*s)+'%,'+(100*l)+'%,'+a+')'});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('rgb',[TNum,TNum,TNum],TDrawing,function(r,g,b) {
        return new TDrawing([],{color:'rgb('+r+','+g+','+b+')'});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('rgba',[TNum,TNum,TNum,TNum],TDrawing,function(r,g,b,a) {
        return new TDrawing([],{color:'rgb('+r+','+g+','+b+','+a+')'});
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('*',[TDrawing,TDrawing],TDrawing,function(d1,d2) {
        var objects = d1.objects.concat(d2.objects);
        var style = Numbas.util.extend_object({},d1.style,d2.style);
        return new TDrawing(objects,style);
    }, {unwrapValues: true}));

    extension.scope.addFunction(new funcObj('*',[TList,TDrawing],TDrawing,null,{
        evaluate: function(args,scope) {
            var objects = args[0].value;
            var d = args[1].value;
            var nobjects = d.objects.concat(objects);
            return new TDrawing(nobjects, d.style);
        }
    }))

    extension.scope.addFunction(new funcObj('*',['?',TDrawing],TDrawing,null,{
        evaluate: function(args,scope) {
            var object = args[0];
            var d = args[1].value;
            var nobjects = d.objects.concat([object]);
            return new TDrawing(nobjects, d.style);
        }
    }))

    extension.scope.addFunction(new funcObj('draw',[TNum,'*?'],THTML,null,{
        evaluate: function(args,scope) {
            var width = args[0].value;
            var canvas = document.createElement('canvas');
            var drawer = new euk.CanvasDrawer(canvas,width);
            var drawing = new TDrawing(args.slice(1));
            draw_drawing(drawer,drawing.value);
            return new THTML(canvas);
        }
    }));

    extension.scope.addFunction(new funcObj('draw',['*?'],THTML,null,{
        evaluate: function(args,scope) {
            var canvas = document.createElement('canvas');
            var drawer = new euk.CanvasDrawer(canvas);
            var drawing = new TDrawing(args);
            draw_drawing(drawer,drawing.value);
            return new THTML(canvas);
        }
    }));

    /*
    extension.scope.addFunction(new funcObj('',[],,function() {
    }));
    */
});
