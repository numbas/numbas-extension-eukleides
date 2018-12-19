import * as euk from './eukleides.js';
import {Point,Line,Circle,Set,TriangleMaker,Vector} from './eukleides.js';
window.euk = euk;

const {PI} = Math;

/*
const canvas = document.getElementById('canvas');

const d = new euk.CanvasDrawer(canvas);
window.d = d;

const p = new euk.Point(0,0);
//d.draw_point(p);

/*
const pentagon = euk.Set.create_polygon(5,new euk.Point(0,0),1,0);
d.local.color = 'yellow';
d.fill_polygon(pentagon);
d.restore_local_settings();
d.draw_polygon(pentagon);

d.draw_line({x:0,y:0,a:Math.PI*1.25});
d.local.style = 'dashed';
d.draw_line({x:0,y:0,a:Math.PI*1.15});
d.local.style = 'dotted';
d.draw_line({x:0,y:0,a:Math.PI*1.05});

const A = new Point(3,0);
const B = new Point(4,0);
const C = new Point(5,4);
const s = new Set([A,B,C]);
d.draw_point(A);
d.draw_point(B);
d.draw_point(C);
d.local.style = 'full';
d.draw_polygon(s);
d.draw_circle(Circle.create_circumcircle(A,B,C));
d.draw_circle(Circle.create_incircle(A,B,C));

const [D,E,F] = TriangleMaker.define_optimal_scalene([],1,0);
const s2 = new Set([D,E,F]);
d.draw_polygon(s2);

d.draw_polygon(new Set(TriangleMaker.define_triangle_SSS([],5,5,6,Math.PI/5)));
d.draw_polygon(new Set(TriangleMaker.define_triangle_SAA([],2,Math.PI/3,Math.PI/4,0)));
d.draw_polygon(new Set(TriangleMaker.define_triangle_SAS([],1,Math.PI/5,2,0)));
d.draw_polygon(new Set(TriangleMaker.define_triangle_SSA([],1,1,Math.PI/6,0)));
d.draw_polygon(new Set(TriangleMaker.define_right_SS([],1,2,0)));
d.draw_polygon(new Set(TriangleMaker.define_right_SA([],1,Math.PI/12,0)));
d.draw_polygon(new Set(TriangleMaker.define_isosceles_SS([],1,4,0)));
d.draw_polygon(new Set(TriangleMaker.define_isosceles_SA([],4,Math.PI/6,0)));
d.draw_polygon(new Set(TriangleMaker.define_equilateral([],3,0)));
d.draw_polygon(new Set(TriangleMaker.define_equilateral([new Point(-1,-1)],3,0)));
d.draw_polygon(new Set(TriangleMaker.define_equilateral([new Point(-1,-1), new Point(0,0)],3,0)));
const e = new euk.Ellipse(new Point(3,1),1,4,Math.PI/4);
//d.draw_conic(e);
const parabola = new euk.Parabola(new Point(0,0),5,Math.PI/4);
//d.draw_conic(parabola);
const hyperbola = new euk.Hyperbola(new Point(0.5,0),1,0.99,0.1);
//d.draw_conic(hyperbola);

const c = euk.Conic.create_with_foci(new Point(0,0), new Point(2,0),1);
console.log(c);
d.draw_conic(c);

const c2 = c.homothetic(new Point(1,1),0.1);
console.log(c2);
d.draw_conic(c2);

const c = new Circle(p,1);
//d.draw_circle(c);
const lp = new Point(2,3);
d.draw_point(lp);
const l = new Line(lp,PI/3);
d.draw_line(l);
const lsi = euk.line_circle_intersection(l,c);
console.log(lsi);
for(let ip of lsi.points) {
    d.draw_point(ip);
}
const e = new euk.Ellipse(new Point(3,1),4,1,Math.PI/6);
d.draw_conic(e);
const lei = euk.line_conic_intersection(l,e);
for(let ip of lei.points) {
    d.draw_point(ip);
}
const parabola = new euk.Parabola(new Point(0,0),5,Math.PI/4);
d.draw_conic(parabola);
const lpi = euk.line_conic_intersection(l,parabola);
for(let ip of lpi.points) {
    d.draw_point(ip);
}
const hyperbola = new euk.Hyperbola(new Point(0.5,0),0.5,0.99,PI/6);
console.log(hyperbola);
d.draw_conic(hyperbola);
const lhi = euk.line_conic_intersection(l,hyperbola);
for(let ip of lhi.points) {
    d.draw_point(ip);
}

//const points = euk.QuadrilateralMaker.define_rectangle([new Point(1,2),new Point(3,1)],0,3);
//const points = euk.QuadrilateralMaker.define_parallelogram_VV([new Point(-1,2)],new Vector(1,1),new Vector(4,-1));
const points = euk.QuadrilateralMaker.define_parallelogram_SSA([new Point(1,1),new Point(2,0)],2,PI/4,2,0);
points.forEach(p=>d.draw_point(p));
*/

Numbas.queueScript('base',[],function(){});

Numbas.queueScript('demo',['extensions/eukleides/eukleides.js'],function() {
    var s = window.s = new Numbas.jme.Scope([Numbas.jme.builtinScope, Numbas.extensions.eukleides.scope]);

    function show_diagram(script) {
        var diagram = s.evaluate(script);
        var canvas = diagram.value[0];
        document.body.appendChild(canvas);
    }

    show_diagram(`draw(900,
        point(0,0) label("A",deg(0)),
        point(2,0) label("B",deg(-90)),
        point(4,0) label("Cooo",deg(45)),
        point(6,0) label("Doop",deg(135)),
        point(6,0) label("Eep",deg(-135)),
        (point(0,0)..point(3,3)) label() simple,
        (point(2,0)..point(4,3)) label() double,
        (point(4,0)..point(5,3)) label() triple
    )`);
    

    show_diagram(`draw(900,
        let(a,point(1,0), b,point(0,0), c,point(1,1),
           [a..b,b..c,angle(a,b,c)]
        ),
        let(a,point(2,0), b,point(1,0), c,point(2,1),
           [a..b,b..c,angle(a,b,c) double]
        ),
        let(a,point(3,0), b,point(2,0), c,point(3,1),
           [a..b,b..c,angle(a,b,c) triple]
        ),
        let(a,point(1,1), b,point(0,1), c,point(1,2),
           [a..b,b..c,angle(a,b,c) dashed]
        ),
        let(a,point(2,1), b,point(1,1), c,point(2,2),
           [a..b,b..c,angle(a,b,c) double dashed]
        ),
        let(a,point(3,1), b,point(2,1), c,point(3,2),
           [a..b,b..c,angle(a,b,c) triple dashed]
        ),
        let(a,point(1,2), b,point(0,2), c,point(1,3),
           [a..b,b..c,angle(a,b,c) dotted]
        ),
        let(a,point(2,2), b,point(1,2), c,point(2,3),
           [a..b,b..c,angle(a,b,c) double dotted]
        ),
        let(a,point(3,2), b,point(2,2), c,point(3,3),
           [a..b,b..c,angle(a,b,c) triple dotted]
        ),
        let(a,point(3,1), b,point(3,0), c,point(4,0),
           [a..b,b..c,angle(a,b,c) right]
        ),
        let(a,point(3,2), b,point(3,1), c,point(4,1),
           [a..b,b..c,angle(a,b,c) right dotted]
        ),
        let(a,point(5,0), b,point(4,0), c,point(5,1),
           [a..b,b..c,angle(a,b,c) forth]
        ),
        let(a,point(5,1), b,point(4,1), c,point(5,2),
           [a..b,b..c,angle(a,b,c) back]
        )
    )`);

    show_diagram(`draw(900,
        point(0,2.5) disc label("A",deg(90)), 
        point(1,2.5) dot, 
        point(2,2.5) cross, 
        point(3,2.5) box, 
        point(4,2.5) plus,
        (point(0,0) .. point(2,3) .. point(4,0)) arrows,
        (point(0,1) .. point(2,4) .. point(4,1)) closed,
        (point(0,-1) .. point(2,2) .. point(4,-1)) filled transparent,
        let(l1,line(point(-5,2), point(3,4)),
            l2,line(point(8,0),point(-2,10)),
            [l1,l2,intersection(l1,l2) label("I",deg(90))]
        ),
        let(p,projection(point(0,0),line(point(-5,2), point(3,4))),
            [p, (point(0,0)..p) dashed]
        ),
        let(p,projection(point(0,2),line(point(-5,2), point(3,4)), line(point(0,0),point(1,1))),
            [p, line(point(0,2),point(1,3)) dashed]
        ),
        (line(point(-5,2), point(3,4)) + vector(0,-1)) dashed blue,
        (line(point(-5,2), point(3,4)) + vector(0,-2)) dotted,
        point(0,0),
        (line(point(0,0), point(3,2))) half,
        (line(point(0,0), point(3,2))+vector(0,-0.5)) half back dotted red size(3),
        circle(point(1,3),4),
        circle(point(1,3),3) dotted,
        circle(point(1,3),2) dashed size(2) yellow,
        conic(point(2,2),point(3,3),1.5),
        arc(conic(point(2,4), point(2,5), 0.2),0,pi) green size(3),
        arc(circle(point(0,0),2),0,pi/2) hsla(240,0.8,0.8,0.5) size(5) arrow,
        arc(circle(point(0,0),1),0,pi/2) rgba(255,0,0,0.7) size(1) arrows,
        let(l,line(point(0,0),point(5,1)),
            p,polygon(5,point(3,0),1,0),
            c,circle(point(5,0.5),1),
            el,conic(point(7,1),point(7,1.5),0.7),
            [
                l,
                p blue closed,
                intersection(l,p) size(3),
                c,
                intersection(l,c) size(3),
                el,
                intersection(l,el) size(3)
            ]
        ),
        let(
            p1,polygon(5,point(-1,5),1,0),
            p2,polygon(6,point(0,5),1,0),
            c1,circle(point(1.5,5),1),
            c2,circle(point(2.5,4.7),0.5),
            [
                p1 closed,
                p2 closed,
                list(intersection(p1,p2)),
                c1,
                c2,
                list(intersection(c1,c2)) blue,
                list(intersection(p2,c1))
            ]
        )
    )`);

    show_diagram(`draw(900,
        let(t,triangle(),
            let(a,t[0],b,t[1],c,t[2],
            let(
                a',projection(a,line(b,c)),
                b',projection(b,line(c,a)),
                c',projection(c,line(a,b)),
            let(
                a_0,midpoint(b..c),
                b_0,midpoint(c..a),
                c_0,midpoint(a..b),
                
                [
                    a label("A",deg(-135)) bold,
                    b label("B",deg(-45)) italic,
                    c label("C",deg(90)) bold italic,
                    a',b',c',
                    a' label("A'",deg(45)) font("sans-serif"),
                    b' label("B'",deg(135)),
                    c' label("C'",deg(-90)),
                    a_0,b_0,c_0,
                    a_0 label("A_0",deg(30)),
                    b_0 label("B_0",deg(150)),
                    c_0 label("C_0",deg(-90)),
                    (a..b..c) closed,
                    circle(a',b',c'),
                    ([a..a', b..b', c..c']) dashed
                ]
            )))
        )
    )`);

console.log("ARRRG");
    show_diagram(`draw(900,
        let(
            O,point(0,2),
            C1,circle(O,2),
            A,point(6.5,2),
            C2,circle(O..A),
            points,intersection(C1,C2),
            [
                line(A,points[0]) gray,
                line(A,points[1]) gray,
                C1,
                C2 dashed gray,
                O plus,
                A
            ]
        )
    )`);
});
