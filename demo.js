import * as euk from './eukleides.js';
window.eukleides = euk;

window.run_demo = function() {

const {PI} = Math;

Numbas.queueScript('base',[],function(){});

Numbas.queueScript('demo',['extensions/eukleides/eukleides.js'],function() {
    var s = window.s = new Numbas.jme.Scope([Numbas.jme.builtinScope, Numbas.extensions.eukleides.scope]);

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

show_diagram(`eukleides("Circle inscribed in a square",let(
  s,polygon(square())
, a,isobarycenter(s)
, c,circle(a,len(s[1]-s[0])/2)
, [
    s description("square")
  , c description("circle inscribed in square")
  ]
))`);

    show_diagram(`
eukleides("A set diagram",[
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
,point(5.5,deg(45)) text("B") bold
,point(5.5,deg(135)) text("A") bold
,point(5.5,deg(-90)) text("C") bold
]) size(2)
])`);

    show_diagram(`eukleides("Interactive plot of sine curve",
-2,-1.7,2*pi+1,2,
[
let(
  x,clamp(rx,0,2pi),
  area,y*(1-cos(x)),
  curve,polygon(map(point(x,sin(x)*y),x,0..x#0.2)+[point(x,sin(x)*y)]),
  [
    (point(0,y)..point(2*pi+0.2,y)) dashed gray description("Horizontal line showing amplitude of the curve"),
    (curve..point(x,0)) filled transparent description("Area under the curve"),
    curve open description("Plot of sin(x)"),
    (point(0,0)..point(2*pi+0.2,0)) arrow description("x axis"),
    point(pi,y) label("Area: "+dpformat(area,2),deg(90)),
    point(x,0) label("x = "+dpformat(x,2),deg(sgn(y)*if(x>pi,90,-90))),
    point(x,0) draggable() size(2),
    point(-0.5,y) label("y = "+dpformat(y,2),deg(180)),
    point(-0.5,y) draggable() size(2)
  ]
)
],
["y":1,"rx":pi/2]
)
`);

show_diagram(`
  let(scale,3,eukleides("Angles in a triangle",
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
        ((c..h)+vector(0.25,0)) arrows gray label("1.00"),
        ((a..h)-vector(0,0.25)) arrows gray label(dpformat(x,2),deg(-90)),
        angle(b,a,c) if(90|precround(theta,0),right,simple) label(deg(precround(theta,0))),
        angle(c,b,a) if(90|precround(theta2,0),right,simple) label(deg(precround(theta2,0))),
        h draggable(),
        c draggable()
      ]
    )
    ],
    ["theta":45]
  ))
`);

show_diagram(`
eukleides("Parallel lines in a circle",-3.5,-3.5,3.5,3.5,
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
    ,angle(b,a,o) label(angle_between(b-a,o-a))
    ,angle(o,b,a) label(angle_between(o-b,a-b))
    ,angle(o,c,b) label(angle_between(o-c,b-c))
    ,angle(b,o,c) label(angle_between(b-o,c-o))
    ,a draggable("A",["rot"])
    ,b draggable("B",["ana"])
  ])
],["ana":50])
`);

show_diagram(`
eukleides("Bearings between A, B and C",[
  let(
    ana, deg(heading_1)
  , anb, deg(heading_2)
  , a, origin
  , b, point(4,deg(90)-ana)
  , c, point(length_2,deg(90)-anb)+(b-a)
  , m, (a+vector(0,1))
  , n, (b+vector(0,1))
  , p, (c+vector(0,1.5)) 
  , [
      (a..b..c)
    , (a..b) label("4")
    , (b..c) label(length_2+"")
    , (a..c) label("x",deg(180)) italic
    , (a..m) arrow
    , (b..n) arrow
    , (c..p) arrow
    , ([
        a label("A",deg(180))
      , b label("B")
      , c label("C",deg(-90))
      , m label("M",deg(90),0.1)
      , n label("N",deg(90),0.1)
      , p label("P",deg(90),0.1)
      ]) italic
    , angle(b,a,m) label(ana)
    , angle(c,b,n) label(anb)
    , angle(c,a,b) label("θ") italic
    , angle(n,b,a) label(deg(180)-ana)
    , angle(a,b,c) label(deg(180)+ana-anb)
    , b draggable(["heading_1"])
    , c draggable(["heading_2"])
  ])
],["heading_1": 100, "heading_2": 200, "length_2": 5])
`);        

    show_diagram(`eukleides("Feuerbach's circle",[
    let([a,b,c],triangle(),
        a',projection(a,line(b,c)),
        b',projection(b,line(c,a)),
        c',projection(c,line(a,b)),
        a_0,midpoint(b..c),
        b_0,midpoint(c..a),
        c_0,midpoint(a..b),
        
        [
            a label("A",deg(-135)),
            b label("B",deg(-45)),
            c label("C",deg(90)),
            a',b',c',
            a' label("A'",deg(45)),
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
    )
])`);

    show_diagram(`eukleides("Tangents to a circle",[
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

    show_diagram(`eukleides("An isosceles triangle",
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

    show_diagram(`eukleides("Collinear points",
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
    
    show_diagram(`eukleides("Touching squares",[
    let(
        [a,b,c,d],square(),
        (a..b..c..d) lightgray
    ),
    let(
        [a,b,c,d],square(point(1,1),point(3,2)),
        (a..b..c..d) filled color2
    ),
    let(
        [a,b,c,d],square(1),
        (a..b..c..d) filled color3
    )
])`);

    show_diagram(`eukleides("A bar chart in a selection of colour schemes",
let(schemes,qualitative_color_schemes(3),
map(
let(
  w, 2
, origin, point(0,12sn)
, [c1,c2,c3],schemes[sn]
, gap, 0.5
, biggap, 2
, cw, 3*w+2*gap+biggap
, data,[
    [3,4,1,2010]
  , [5,6,6,2011]
  , [2,8,4,2012]
  , [7,1,9,2013]
  ]
, style_a, filled dotted c1
, style_b, filled dashed c2
, style_c, filled c3
, [
    map(
      let(
        [name,style,j],d
      , o, origin+vector(-biggap-gap,5-1.5j)
      , [
          polygon(square(o,1)) style
        , (o+vector(0,0.5)) label(name,deg(180)) size(w)
        ]
      ) 
    , d
    , zip(["A","B","C"],[style_a,style_b,style_c],[0,1,2])
    )
  , map(
      let(
        x,cw*j
      , o1,origin+vector(x,0)
      , o2, o1+vector(w+gap,0)
      , o3, o2+vector(w+gap,0)
      , [a,b,c,year], data[j]
      , [ 
          polygon(rectangle(o1,o1+vector(w,0),a)) style_a
        , (o1+vector(w/2,a)) label(a+"",deg(90)) size(2)

        , polygon(rectangle(o2,o2+vector(w,0),b)) style_b
        , (o2+vector(w/2,b)) label(b+"",deg(90)) size(2)

        , polygon(rectangle(o3,o3+vector(w,0),c)) style_c
        , (o3+vector(w/2,c)) label(c+"",deg(90)) size(2)

        , (o1+vector((2w+gap)/2,-0.2)) label(year+"", deg(-90)) size(w)
        ]
      )
    , j
    , 0..len(data)-1
    )
  , (origin+vector(0,-0.2)..origin+vector(cw*len(data),-0.2)) arrow size(3)
  ]
)
, sn
, 0..len(schemes)-1
)))
`);

    show_diagram(`
// Based on https://twitter.com/Cshearer41/status/1115917680027021312
eukleides("Catriona Shearer puzzle",[
let(
  [a,b,c],equilateral(30)
, [c,b,d],equilateral(c,b)
, [d,b,f],equilateral(d,b)
, a1, b+2/3*(c-b)
, a2, a+1/2*(b-a)
, b1, b+3/4*(d-b)
, b2, b+2/3*(c-b)
, b3, b+1/2*(b1-b)
, c1, b+4/5*(f-b)
, c2, b+3/4*(d-b)
, c3, b+2/3*(c1-b)
, c4, b+1/2*(c2-b)
, [
    a..b..c
  , b..c..d
  , d..b..f
  , (a..a1..a2) color1 open
  , (c..b1..b2..b3) color2 open
  , (d..c1..c2..c3..c4) color3 open
  , ((c..d)+vector(0,2)) arrows size(10) label("30")
  , ((c3..a2)+vector(0,-2)) arrows size(10) label("?")
  ] * size(20) font("sans")
)
])
`);

show_diagram(`
// from https://twitter.com/Cshearer41/status/1116736986507882498
eukleides("The diagonal of the square has been divided into three sections of length 4. What's the shaded area?",
let(
 w,6sqrt(2)
,[a,b,c,d],square(w)
,p1,d+(b-d)/3
,p2,d+(b-d)*2/3
,e2,intersection(line(a,p2),b..c)[0]
,e1,intersection(line(e2,p1),a..d)[0]
,[
  (d..p1) label("4") size(2)
 ,(p2..p1) label("4") size(2)
 ,(p2..b) label("4") size(2)
 ,[(d..e1..p1)
  ,(p1..e2..p2)
  ,(a..p2..b)
  ] * filled color3
 ,(d..b) size(4) color2
 ,(e1..e2..a) size(4) color4 open
 ,(a..b..c..d) size(4)
 ]
)
,["y":7]
)
`);

show_diagram(`
// https://twitter.com/Cshearer41/status/1114798315504308224
eukleides("The equilateral triangle in the corner of this square is tangent to the circle where they touch. What’s the diameter?",let(
 w,15
,[a,b,c],equilateral(w)
,d,point(r,deg(60+90))+(c-origin)
,s,y(d)+r
,[s1,s2,s3,s4],square(b,s,deg(90))
,[
  (s1..s2..s3..s4) size(15) color3
 ,circle(d,r) size(15) color2
 ,(a..b..c) color1 size(15)
 ,((d-vector(r,0))..(d+vector(r,0))) arrows size(9) label("?") color4
 ,((b..a)-vector(0,1.5)) arrows size(9) label(w) color4
 ]
),["r":15])
`);

show_diagram(`
// based on https://twitter.com/panlepan/status/1101789897902436353
eukleides("Three 6×3 rectangles overlap. Is this triangle a 3-4-5?",let(
 [a1,a2,a3,a4],rectangle(origin,point(6,0),3)
,[b1,b2,b3,b4],(a1..a2..a3..a4)+vector(3,3)
,[c1,c2,c3,c4],rectangle(a2,3,6,rad(arctan(3/6)*2))
,p,intersection(b1..b2,c2..c3)[0]
,ma,midpoint(a1..a2)
,mb,midpoint(b3..b4)
,[
  (a1..a2..a3..a4) filled color1 transparent
 ,(b1..b2..b3..b4) filled color1 transparent
 ,(c1..c2..c3..c4) filled color1 transparent
 ,(ma..b1) dashed color2 size(2)
 ,(mb..a3) dashed color2 size(2)
 ,(a1..a2..a3..a4) color2 size(4)
 ,(b1..b2..b3..b4) color2 size(4)
 ,(c1..c2..c3..c4) color2 size(4)
 ,(p..b1..b4) color4 size(6)
 ]
))
`);

show_diagram(`
// based on https://twitter.com/panlepan/status/1101103820598362112
eukleides("What fraction of the semi-circle does the pink square represent ? Is it more or less than a half?",let(
 theta,arccos(0.5)
,r,sqrt(5)/2
,[
  arc(circle(origin,r),deg(0),deg(180)) filled color1
 ,(polygon(square(1))-vector(0.5,0)) filled color2
 ,[
   arc(circle(origin,r),deg(0),deg(180))
  ,point(-r,0)..point(r,0)
 ]
 ]
))
`);

show_diagram(`
// based on https://twitter.com/panlepan/status/1097644438455750656
eukleides("What is the missing area?",let(
 show_hint,false
,l1,4
,l2,2.5
,an,deg(raw_an)
,v1,vector(l1,0)
,v2,point(l2,an)-origin
,a,origin
,b,a+v1
,c,a+2v1
,d,c+v2
,f,c+2v2
,g,f-v1
,h,a+2v2
,j,a+v2
,p,point(x,y)

,[
  (a..b..p..j) filled opacity(0.2) color1
 ,(b..c..d..p) filled opacity(0.2) color2
 ,(d..f..g..p) filled opacity(0.2) color3
 ,(g..h..j..p) filled opacity(0.2) color4
 ,[
   (a..b) double
  ,(b..c) double
  ,(f..g) double
  ,(g..h) double
  ,(a..j) simple
  ,(j..h) simple
  ,(c..d) simple
  ,(d..f) simple
 ]
 ,([b..p, d..p, g..p, j..p]) size(2)
 ,center(a..b..p..j) text("27") color1
 ,center(b..c..d..j) text("?") color2
 ,center(d..f..g..p) text("53") color3
 ,center(g..h..j..p) text("35") color4

 ,if(show_hint,
   [
     (p..h)
    ,(p..a)
    ,(p..f)
    ,(p..c)
    ,center(a..p..j) text("A")
    ,center(h..p..j) text("A")
    ,center(a..p..b) text("B")
    ,center(b..p..c) text("B") 
    ,center(c..p..d) text("C")
    ,center(d..p..f) text("C")
    ,center(f..p..g) text("D")
    ,center(g..p..h) text("D") 
   ]
  ,[]
  )
 ,p draggable()
 ,f draggable()
 ]
),["x":2.5,"y":2,"raw_an":60])
`);

show_diagram(`
eukleides("Constructing an angle bisector",let(
 ana,deg(30)
,anb,deg(-30)
,r,1
,r2,r
,a,point(r,ana)
,b,point(r,anb)
,p,intersection(circle(a,r2),circle(b,r2))[0]
,incidental, dashed gray transparent
,new,size(2) color2
,w,3.5
,h,1
,steps,[
  [
   origin..point(2r,ana)
  ,origin..point(2r,anb)
 ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,circle(origin,r) incidental
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5)) new
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,circle(a,r2) incidental
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5))
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5))
  ,arc(circle(a,r2),-ana-deg(5),-ana+deg(5)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,circle(b,r2) incidental
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5))
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5))
  ,arc(circle(a,r2),-ana-deg(5),-ana+deg(5))
  ,arc(circle(b,r2),-anb-deg(5),-anb+deg(5)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5))
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5))
  ,arc(circle(a,r),-ana-deg(5),-ana+deg(5))
  ,arc(circle(b,r),-anb-deg(5),-anb+deg(5))
  ,origin..(origin+1.2(p-origin)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,origin..(origin+1.2(p-origin))
  ,angle(p,origin,a) simple dashed
  ,angle(b,origin,p) simple dashed
  ]
 ]
,map(
  map(x+vector(w*mod(j,3),-h*(j-mod(j,3))),x,steps[j])
 ,j
 ,0..len(steps)-1
 )
))
`);

show_diagram(`
eukleides("Constructing an angle bisector animation",-0.5,-1.5,2.5,1.5,let(
 ana,deg(30)
,anb,deg(-30)
,r,1
,r2,r
,a,point(r,ana)
,b,point(r,anb)
,p,intersection(circle(a,r2),circle(b,r2))[0]
,speed,1.5
,st,mod(time/speed,6)
,t,floor(st)
,dt,st-t
,b1,0.6
,b2,0.8
,op,switch(
  dt<b1,dt/b1
 ,dt<b2,1
 ,(1-dt)/(1-b2)
 )
,incidental, dashed gray opacity(op)
,new,size(2) color2 opacity(op)
,added,opacity(if(dt>b2,1,0))
,fadein,opacity(if(dt<b1,dt/b1,1))
,w,3.5
,h,1
,steps,[
  [
   origin..point(2r,ana)
  ,origin..point(2r,anb)
 ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,circle(origin,r) incidental
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5)) added
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5)) added
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5)) new
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,circle(a,r2) incidental
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5))
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5))
  ,arc(circle(a,r2),-ana-deg(5),-ana+deg(5)) added
  ,arc(circle(a,r2),-ana-deg(5),-ana+deg(5)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,circle(b,r2) incidental
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5))
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5))
  ,arc(circle(a,r2),-ana-deg(5),-ana+deg(5))
  ,arc(circle(b,r2),-anb-deg(5),-anb+deg(5)) added
  ,arc(circle(b,r2),-anb-deg(5),-anb+deg(5)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,arc(circle(origin,r),ana-deg(5),ana+deg(5))
  ,arc(circle(origin,r),anb-deg(5),anb+deg(5))
  ,arc(circle(a,r),-ana-deg(5),-ana+deg(5))
  ,arc(circle(b,r),-anb-deg(5),-anb+deg(5))
  ,origin..(origin+1.2(p-origin)) added
  ,origin..(origin+1.2(p-origin)) new
  ]
 ,[
   origin..point(2r,ana)
  ,origin..point(2r,anb)
  ,origin..(origin+1.2(p-origin))
  ,angle(p,origin,a) simple dashed fadein
  ,angle(b,origin,p) simple dashed fadein
  ]
 ]
,[
  group(steps[t]) opacity(1)
 ]
))
`);

show_diagram(`
eukleides("Mouse input and animation demo",
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
eukleides("Variable speed animation",-5,-1,5,5,
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
eukleides("Complete graph",-2.5,-2.5,2.5,2.5,
[
let(
sides,round(min(15,360/an)),
step,360/sides,
points,map(point(2,deg(x)),x,0..360#step),
[
  circle(origin,2) dashed lightgray
, map(point(2,deg(360/n)),n,2..15) gray
, points
, map(a..b,[a,b],combinations(points,2))
, point(2,deg(clamp(an,1,180))) draggable("P")
]
)
],["an":45,"step":90])
`);

    show_diagram(`eukleides("Different point types",[
    (point(1,0)..point(2,0)..point(2,1)..point(1,1)) filled color1,
    point(1,0),
    point(2,0) disc,
    point(1,1) box,
    point(2,1) plus,
    point(1.5,0.5) cross
])`);

    show_diagram(`eukleides("Line marks",[
    (point(0,0)..point(3,3)) label() simple,
    (point(2,0)..point(4,3)) label() double,
    (point(4,0)..point(5,3)) label() triple
])`);
    
    show_diagram(`eukleides("Angle marks",[
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

    show_diagram(`eukleides("Pretty much everything!",[
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
    (line(point(-5,2), point(3,4)) + vector(0,-1)) dashed color1,
    (line(point(-5,2), point(3,4)) + vector(0,-2)) dotted,
    point(0,0),
    (line(point(0,0), point(3,2))) half,
    (line(point(0,0), point(3,2))+vector(0,-0.5)) half back dotted color2 size(3),
    circle(point(1,3),4),
    circle(point(1,3),3) dotted,
    circle(point(1,3),2) dashed size(2) color3,
    conic(point(2,2),point(3,3),1.5),
    arc(conic(point(2,4), point(2,5), 0.2),rad(0),rad(pi)) color4 size(3),
    arc(circle(point(0,0),2),rad(0),rad(pi/2)) hsla(240,0.8,0.8,0.5) size(5) arrow,
    arc(circle(point(0,0),1),rad(0),rad(pi/2)) rgba(255,0,0,0.7) size(1) arrows,
    let(l,line(point(0,0),point(5,1)),
        p,polygon(5,point(3,0),1,rad(0)),
        c,circle(point(5,0.5),1),
        el,conic(point(7,1),point(7,1.5),0.7),
        [
            l,
            p color2,
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
            list(intersection(c1,c2)) color1,
            list(intersection(p2,c1))
        ]
    )
])`);

});
}
