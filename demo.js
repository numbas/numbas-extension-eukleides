import * as euk from './eukleides.js';
import {Point,Line,Circle,Set,TriangleMaker,Vector} from './eukleides.js';
window.euk = euk;

const {PI} = Math;

Numbas.queueScript('base',[],function(){});

Numbas.queueScript('demo',['extensions/eukleides/eukleides.js'],function() {
    var s = window.s = new Numbas.jme.Scope([Numbas.jme.builtinScope, Numbas.extensions.eukleides.scope]);

    const canvas_size = 900;

    function show_diagram(script) {
        var canvas_diagram = s.evaluate(`draw(${canvas_size},${script})`);
        var canvas = canvas_diagram.value[0];
        document.body.appendChild(canvas);
        var svg_diagram = s.evaluate(`draw_svg(${script})`);
        var svg = svg_diagram.value[0];
        svg.style['width'] = `${canvas_size}px`;
        document.body.appendChild(svg);
    }

    show_diagram(`
        point(1,0),
        point(1,0) label("A",deg(0)),
        point(1,0) label("B",deg(45)),
        point(1,0) label("C",deg(90)),
        point(1,0) label("D",deg(135)),
        point(1,0) label("E",deg(180)),
        point(1,0) label("F",deg(225)),
        point(1,0) label("G",deg(270)),
        point(1,0) label("H",deg(315)),
        point(2,0) disc,
        point(1,1) box,
        point(2,1) plus,
        point(3,0) cross,
        (point(1,0)..point(2,0)..point(2,1)..point(1,1)) filled red opacity(0.2)
    `);

    show_diagram(`
        point(0,0) label("A",deg(0)),
        point(2,0) label("B",deg(-90)),
        point(4,0) label("Cooo",deg(45)),
        point(6,0) label("Doop",deg(135)),
        point(6,0) label("Eep",deg(-135)),
        point(6,0),
        (point(0,0)..point(3,3)) label() simple,
        (point(2,0)..point(4,3)) label() double,
        (point(4,0)..point(5,3)) label() triple
    `);
    
    show_diagram(`
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
    `);

    show_diagram(`
        point(0,2.5) disc label("A",deg(90)), 
        point(1,2.5) dot, 
        point(2,2.5) cross, 
        point(3,2.5) box, 
        point(4,2.5) plus,
        (point(0,0) .. point(2,3) .. point(4,0)) arrows,
        (point(0,1) .. point(2,4) .. point(4,1)),
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
        arc(conic(point(2,4), point(2,5), 0.2),rad(0),rad(pi)) green size(3),
        arc(circle(point(0,0),2),rad(0),rad(pi/2)) hsla(240,0.8,0.8,0.5) size(5) arrow,
        arc(circle(point(0,0),1),rad(0),rad(pi/2)) rgba(255,0,0,0.7) size(1) arrows,
        let(l,line(point(0,0),point(5,1)),
            p,polygon(5,point(3,0),1,rad(0)),
            c,circle(point(5,0.5),1),
            el,conic(point(7,1),point(7,1.5),0.7),
            [
                l,
                p blue,
                intersection(l,p) size(3),
                c,
                intersection(l,c) size(3),
                el,
                intersection(l,el) size(3)
            ]
        ),
        let(
            p1,polygon(5,point(-1,5),1,rad(0)),
            p2,polygon(6,point(0,5),1,rad(0)),
            c1,circle(point(1.5,5),1),
            c2,circle(point(2.5,4.7),0.5),
            [
                p1,
                p2,
                list(intersection(p1,p2)),
                c1,
                c2,
                list(intersection(c1,c2)) blue,
                list(intersection(p2,c1))
            ]
        )
    `);

    show_diagram(`
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
                    (a..b..c),
                    circle(a',b',c'),
                    ([a..a', b..b', c..c']) dashed
                ]
            )))
        )
    `);

    show_diagram(`
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
    `);

    show_diagram(`-1,-1,7,3,
        let(
            t, isosceles(),
            a,t[0],b,t[1],c,t[2],
            H, projection(c,line(a,b)),
            [
                (a..b..c), 
                (c..h) dashed,
                h,
                angle(b,h,c) right,
                angle(b,a,c) double,
                angle(c,b,a) double,
                (a..h) label(),
                (b..h) label(),
                (a..c) label() double,
                (c..b) label() double
            ]
        )
    `);

    show_diagram(`-1,-1,8,5,
        let(
            [a,b,c,d],square(),
            [a,b,f],equilateral(a,b),
            [c,b,g],equilateral(c,b),
            [
                line(f..g) dashed darkgray,
                (a..b..c..d),
                (a..b..f),
                (c..b..g)
            ]
        )
    `);
    
    show_diagram(`-1,-1,8,5,
        let(
            [a,b,c,d],square(),
            (a..b..c..d) hsl(0,0.5,0.9)
        ),
        let(
            [a,b,c,d],square(point(1,1),point(3,2)),
            (a..b..c..d) filled hsl(240,0.5,0.75)
        ),
        let(
            [a,b,c,d],square(1),
            (a..b..c..d) filled hsl(120,0.5,0.75)
        )
    `);
});
