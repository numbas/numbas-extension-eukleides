Numbas.addExtension('eukleides',['math','jme'], function(extension) {

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
    jme.registerType(TAngle,'eukleides_angle');

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
            return new TList(s.value);
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

	var TLabel = function(object,style) {
        this.object = object;
		this.style = style;
	};
    jme.registerType(TLabel,'eukleides_label');

	var TAngleLabel = function(a,b,c) {
        this.a = a;
        this.b = b;
        this.c = c;
	};
    jme.registerType(TAngleLabel,'eukleides_angle_label');

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
                    throw(new Numbas.Error('Eukleides trying to draw unknown object type: '+obj.type));
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

    var sig = Numbas.jme.signature;
    var spoint = sig.type('eukleides_point');
    var sangle = sig.type('eukleides_angle');
    var snum = sig.type('number');
    var snumorangle = sig.optional(sig.or(snum,sangle));

    extension.scope.setVariable('O',new TPoint(new euk.Point(0,0)));

    extension.scope.addFunction(new funcObj('+',[TAngle,TAngle],TAngle,math.add),
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

    extension.scope.addFunction(new funcObj('midpoint',[TPointSet],TPoint,function(set) {
        return euk.Point.create_midpoint(set);
    },{description:'The midpoint of the given segment'}));

    extension.scope.addFunction(new funcObj('barycenter',[TPointSet,TList],TPoint,function(points,weights) {
        return euk.Point.create_barycenter(points,weights);
    },{unwrapValues: true},{description:'The barycenter of the given polygon'}));

    extension.scope.addFunction(new funcObj('orthocenter',[TPoint,TPoint,TPoint],TPoint,function(A,B,C) {
        return euk.Point.create_orthocenter(A,B,C);
    },{description:'The orthocenter of the given polygon'}));

    extension.scope.addFunction(new funcObj('+',[TPoint,TVector],TPoint,function(p,u) {
        return p.translate(vec(u));
    },{description:'Translate a point by a vector'}));

    extension.scope.addFunction(new funcObj('-',[TPoint,TVector],TPoint,function(p,u) {
        return p.translate(vec(Numbas.vectormath.negate(u)));
    },{description:'Translate a point by the opposite of a vector'}));

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
        return unvec(euk.Vector.create_from_points(a,b));
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

    extension.scope.addFunction(new funcObj('+',[TLine,TVector],TLine,function(line,u) {
        return line.translate(vec(u));
    },{description:'Translate a line by a vector'}));

    extension.scope.addFunction(new funcObj('-',[TLine,TVector],TLine,function(line,u) {
        return line.translate(vec(Numbas.vectormath.negate(u)));
    },{description:'Translate a line by the opposite of the given vector'}));

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

    extension.scope.addFunction(new funcObj('pointset',[sig.listof(sig.type('eukleides_point'))],TPointSet,function(points) {
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

    extension.scope.addFunction(new funcObj('+',[TPointSet,TVector],TPointSet,function(set,u) {
        return set.translate(vec(u));
    },{description:'Translate a polygon by the given vector'}));

    extension.scope.addFunction(new funcObj('-',[TPointSet,TVector],TPointSet,function(set,u) {
        return set.translate(vec(Numbas.vectormath.negate(u)));
    },{description:'Translate a polygon by the opposite of the given vector'}));

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

    extension.scope.addFunction(new funcObj('+',[TConic,TVector],TConic,function(conic,u) {
        return conic.translate(vec(u));
    },{description:'Translate a conic by the given vector'}));

    extension.scope.addFunction(new funcObj('-',[TConic,TVector],TConic,function(conic,u) {
        return conic.translate(vec(Numbas.vectormath.negate(u)));
    },{description:'Translate a conic by the opposite of the given vector'}));

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
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('label',[TString],TDrawing,function(text,angle) {
        return new TDrawing([],{label:true, label_text: text, label_direction: -Math.PI/4});
    }, {unwrapValues: true},{description:''}));

    extension.scope.addFunction(new funcObj('label',[TString,TAngle],TDrawing,function(text,angle) {
        return new TDrawing([],{label:true, label_text: text, label_direction: angle});
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

    extension.scope.addFunction(new funcObj('*',['?',TDrawing],TDrawing,null,{
        evaluate: function(args,scope) {
            var object = args[0];
            var d = args[1].value;
            var nobjects = d.objects.concat([object]);
            return new TDrawing(nobjects, d.style);
        }
    },{description:''}))

    extension.scope.addFunction(new funcObj('draw_canvas',[TNum,TNum,TNum,TNum,TNum,'*?'],THTML,null,{
        evaluate: function(args,scope) {
            var width = args[0].value;
            var min_x = args[1].value;
            var min_y = args[2].value;
            var max_x = args[3].value;
            var max_y = args[4].value;
            var canvas = document.createElement('canvas');
            var drawer = new euk.CanvasDrawer(canvas,width);
            drawer.setup_frame(min_x,min_y,max_x,max_y,1);
            var drawing = new TDrawing(args.slice(5));
            draw_drawing(drawer,drawing.value);
            return new THTML(canvas);
        }
    },{description:''}));

    extension.scope.addFunction(new funcObj('draw_canvas',[TNum,'*?'],THTML,null,{
        evaluate: function(args,scope) {
            var width = args[0].value;
            var canvas = document.createElement('canvas');
            var drawer = new euk.CanvasDrawer(canvas,width);
            var drawing = new TDrawing(args.slice(1));
            draw_drawing(drawer,drawing.value);
            return new THTML(canvas);
        }
    },{description:''}));

    extension.scope.addFunction(new funcObj('draw_canvas',['*?'],THTML,null,{
        evaluate: function(args,scope) {
            var canvas = document.createElement('canvas');
            var drawer = new euk.CanvasDrawer(canvas);
            var drawing = new TDrawing(args);
            draw_drawing(drawer,drawing.value);
            return new THTML(canvas);
        }
    },{description:''}));

    function draw_svg(drawing,min_x,min_y,max_x,max_y) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        var drawer = new euk.SVGDrawer(svg,document);
        if(min_x!==undefined) {
            drawer.setup_frame(min_x,min_y,max_x,max_y,1);
        }
        draw_drawing(drawer,drawing.value);
        return svg;
    }

    function find_bounding_box(drawing) {
        // Draw with default frame first, then find a bounding box for all the elements
        var svg = draw_svg(drawing);

        document.body.appendChild(svg);
        var svg_rect = svg.getBoundingClientRect();
        var min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_y = -Infinity;
        var children = Array.prototype.slice.apply(svg.children);
        children.forEach(function(c) {
            var r = c.getBBox();
            var m = c.getCTM();

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

    function draw_interactive_svg(args,scope,min_x,min_y,max_x,max_y) {
        var start = new Date();
        var div = document.createElement('div');
        var mousex = 0;
        var mousey = 0;
        var animating = false;
        function draw() {
            var now = new Date();
            var t = (now - start)/1000;
            try {
                var drawing = new TDrawing(args.map(function(a){return scope.evaluate(a,{time: new jme.types.TNum(t), mousex: new jme.types.TNum(mousex), mousey: new jme.types.TNum(mousey)})}));
                var svg = draw_svg(drawing,min_x,min_y,max_x,max_y);
            } catch(e) {
                console.error(e);
            }
            div.innerHTML = '';
            div.appendChild(svg);
        }
        function frame() {
            if(animating) {
                draw();
            }
            requestAnimationFrame(frame);
        }
        div.addEventListener('mouseover',function(e) {
            animating = true;
        });
        div.addEventListener('mouseout',function(e) {
            animating = false;
        });
        div.addEventListener('mousemove',function(e) {
            var r = div.getBoundingClientRect();
            mousex = (e.clientX-r.x)/r.width*(max_x-min_x)+min_x;
            mousey = (e.clientY-r.y)/r.height*(min_y-max_y)+max_y;
        });
        draw();
        frame();
        return div;
    }

    extension.scope.addFunction(new funcObj('draw_svg',[TNum,TNum,TNum,TNum,'*?'],THTML,null,{
        evaluate: function(args,scope) {
            var min_x = args[0].value;
            var min_y = args[1].value;
            var max_x = args[2].value;
            var max_y = args[3].value;
            var drawing = new TDrawing(args.slice(4));
            var svg = draw_svg(drawing,min_x,min_y,max_x,max_y);
            return new THTML(svg);
        }
    },{description:''}));

    extension.scope.addFunction(new funcObj('draw_svg',['*?'],THTML,null,{
        evaluate: function(args,scope) {
            var drawing = new TDrawing(args);
            var res = find_bounding_box(drawing);
            // Now redraw the drawing, using the derived bounding box
            var svg = draw_svg(drawing,res.min_x,res.min_y,res.max_x,res.max_y);

            return new THTML(svg);
        }
    },{description:''}));

    extension.scope.addFunction(new funcObj('draw_interactive_svg',[TNum,TNum,TNum,TNum,TDrawing],THTML,null,{
        evaluate: function(args,scope) {
            var objects;
            var min_x,min_y,max_x,max_y;
            if(args.length==1) {
                objects = args[0].args;
                var zero = new jme.types.TNum(0);
                var drawing = new TDrawing(objects.map(function(a){return scope.evaluate(a,{time: zero, mousex: zero, mousey: zero})}));
                var res = find_bounding_box(drawing);
                min_x = res.min_x;
                min_y = res.min_y;
                max_x = res.max_x;
                max_y = res.max_y;
            } else {
                min_x = scope.evaluate(args[0]).value;
                min_y = scope.evaluate(args[1]).value;
                max_x = scope.evaluate(args[2]).value;
                max_y = scope.evaluate(args[3]).value;
                objects = args[4].args;
            }
            var container = draw_interactive_svg(objects,scope,min_x,min_y,max_x,max_y);
            return new THTML(container);
        }
    },{description:''}));
    Numbas.jme.lazyOps.push('draw_interactive_svg');
});
