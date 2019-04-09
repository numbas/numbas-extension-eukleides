import * as euk from './eukleides.js';
import {Point,Line,Circle,Set,TriangleMaker,Vector} from './eukleides.js';
window.euk = euk;

const {PI} = Math;

Numbas.queueScript('base',[],function(){});

Numbas.queueScript('demo',['extensions/eukleides/eukleides.js'],function() {
    var s = window.s = new Numbas.jme.Scope([Numbas.jme.builtinScope, Numbas.extensions.eukleides.scope]);

    const canvas_size = window.innerWidth*.9/3;
    const examples = document.getElementById('examples');

    function show_diagram(script) {
        const article = document.createElement('article');
        var svg_diagram = s.evaluate(script);
        var svg = svg_diagram.value[0];
        article.appendChild(svg);
        const pre = document.createElement('pre');
        pre.textContent = script;
        article.appendChild(pre);
        examples.appendChild(article);
    }

    show_diagram(`draw_svg("Different point types and label directions",[
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
])`);

    show_diagram(`draw_svg("Line marks",[
    (point(0,0)..point(3,3)) label() simple,
    (point(2,0)..point(4,3)) label() double,
    (point(4,0)..point(5,3)) label() triple
])`);
    
    show_diagram(`draw_svg("Angle marks",[
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
])`);

    show_diagram(`draw_svg("Pretty much everything!",[
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
])`);

    show_diagram(`draw_svg("Feuerbach's circle",[
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
])`);

    show_diagram(`draw_svg("Tangents to a circle",[
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
])`);

    show_diagram(`draw_svg("An isosceles triangle",
    -1,-1,7,3,[
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
])`);

    show_diagram(`draw_svg("Collinear points",
    -1,-1,8,5,[
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
])`);
    
    show_diagram(`draw_svg("Touching squares",[
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
])`);

    show_diagram(`
draw_svg("A set diagram",[
([
polygon(square(point(-6,-6),point(6,-6))),
circle(point(2,deg(30)),3)
,circle(point(2,deg(150)),3)
,circle(point(2,deg(270)),3)
,point(5,deg(90)) text("1")
,point(0,0) text("2")
,point(3,deg(30)) text("3")
,point(5,deg(-45)) text("4")
,point(3,deg(240)) text("5")
,point(2,deg(210)) text("6")
,point(5,deg(215)) text("7")
,point(3,deg(300)) text("8")
,point(2,deg(90)) text("9")
,point(3,deg(150)) text("10")
,point(6,deg(45)) text("B") bold
,point(6,deg(135)) text("A") bold
,point(5.3,deg(-90)) text("C") bold
]) size(2)
])`);

    show_diagram(`draw_svg("Interactive plot of sine curve",
-1,-1.7,2*pi+1,2,
[
let(
  x,clamp(rx,0,2pi),
  area,y*(1-cos(x)),
  curve,polygon(map(point(x,sin(x)*y),x,0..x#0.2)+[point(x,sin(x)*y)]),
  [
    (point(0,y)..point(2*pi+0.2,y)) dashed gray,
    (curve..point(x,0)) filled transparent,
    curve open,
    (point(0,0)..point(2*pi+0.2,0)) arrow,
    point(pi,y) label("Area: "+dpformat(area,2),deg(90)),
    point(x,0) label("x = "+dpformat(x,2),deg(sgn(y)*if(x>pi,90,-90))),
    point(x,0) draggable() size(2) blue,
    point(-0.5,y) draggable() size(2) blue
  ]
)
],
["y":1,"rx":pi/2]
)
`);

show_diagram(`
draw_svg("Mouse input and animation demo",
-2,-2,5,2,[
  let(theta,argument(vector(mousex,mousey)),
      circ,circle(origin,1),
      a,point(circ,theta),
      b,point(circ,theta+deg(120)),
      c,point(circ,theta+deg(240)),
      [a..b..c, circle(a,b,c), a label("Mouse",theta)]
  ),
  let(
    t, 5*time,
    hours, t,
    seconds, 60*t,
    centre, vector(3,0),
    O, origin+centre,
    h1, point(0.5,deg(90-hours))+centre,
    h2, point(0.7,deg(90-seconds))+centre,
    [
      circle(O,1),
      O..h1,
      O..h2
    ]
  )
])
`);

show_diagram(`
  let(scale,3,draw_svg("Angles in a triangle",
    -0.5,-0.8,2*scale+0.5,scale+0.2,
    [
    let(
      a,point(0,0),
      b,point(2*scale,0),
      x,clamp(1/tan(radians(theta)),0,2),
      c,point(x*scale,scale),
      h,projection(c,line(a,b)),
      theta2,degrees(angle_between(c-b,a-b)),
      [
        a..b..c,
        (c..h) dashed transparent,
        ((c..h)+vector(0.25,0)) arrows gray,
        midpoint(c..h) label("1.00",deg(0),0.45),
        ((a..h)-vector(0,0.25)) arrows gray,
        midpoint(a..h) label(dpformat(x,2),deg(-90),0.45),
        angle(b,a,c) if(90|precround(theta,0),right,simple),
        a label(deg(precround(theta,0)),deg(theta/2),0.8) size(0.7),
        angle(c,b,a) if(90|precround(theta2,0),right,simple),
        b label(deg(precround(theta2,0)),deg(180-theta2/2),0.8) size(0.7),
        h draggable(),
        c draggable() blue
      ]
    )
    ],
    ["theta":45]
  ))
`);

show_diagram(`
draw_svg("Variable speed animation",-5,-1,5,5,
[let(
a,point(xa,ya),
b,point(xb,yb),
v,b-a,
d,len(v),
t,mod(time,1/speed)*speed,
c,a+t*(b-a),
[
([
  point(-2,4.1)..point(-2,3.9),
  point(-2,4)..point(2,4),
  point(2,4.1)..point(2,3.9)
]) gray,
point(-2,4) label("Speed",deg(180)),
point(clamp(5*speed,1,5)-3,4) draggable() gray,
(a..c) dotted arrow,
a draggable(),b draggable()
]
)],["xa":-3,"xb":3,"yb":2,"speed":0.5])
`);

show_diagram(`
draw_svg("Complete graph",-2.5,-2.5,2.5,2.5,
[
let(
sides,round(min(15,360/an)),
step,360/sides,
points,map(point(2,deg(x)),x,0..360#step),
[
  map(point(2,deg(360/n)),n,2..15) gray,
  points
, map(a..b,[a,b],combinations(points,2))
, point(2,deg(clamp(an,1,180))) draggable("P")
]
)
],["an":45,"step":90])
`);

show_diagram(`
draw_svg("Parallel lines in a circle",-3.5,-3.5,3.5,3.5,
[let(
   anb,180-2*ana
  ,circ,circle(origin,3)
  ,a,point(circ,deg(rot))
  ,b,point(circ,deg(anb+rot))
  ,c,point(circ,deg(130+rot))
  ,o,origin
  ,[
    circ
    ,origin..a
    ,(a..b) simple
    ,b..c
    ,(o..b) dashed
    ,(origin..c) simple
    ,o label("O",deg(rot-90)) italic
    ,a label("A",deg(rot)) italic
    ,b label("B",deg(anb+rot)) italic
    ,c label("C",deg(130+rot)) italic
    ,angle(b,a,o)
    ,angle(o,b,a)
    ,angle(o,c,b)
    ,angle(c,o,b)
    ,a label(angle_between(b-a,o-a),argument(midpoint(o..b)-a),0.6)
    ,b label(angle_between(o-b,a-b),argument(midpoint(a..o)-b),0.6)
    ,c label(angle_between(o-c,b-c),argument(midpoint(b..o)-c),0.6)
    ,o label(angle_between(b-o,c-o),argument(midpoint(b..c)-o),0.6)
    ,point(circ,deg(rot)) draggable()
    ,b draggable()
  ])
],["ana":50])
`);

});
