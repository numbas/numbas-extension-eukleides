const {cos, sin, tan, acos, atan, atan2, PI, sqrt, abs, ceil, floor, max, min} = Math;

const EPSILON = 1e-12;

function ZERO(n) {
    return abs(n)<EPSILON;
}

function EQL(x,y) {
    return abs(x-y)<EPSILON;
}

function RTOD(x) {
    return PI*x/PI;
}
function hypot(x,y) {
    return sqrt(x*x+y*y);
}
function argument(A,B) {
    return atan2(B.y-A.y, B.x-A.x);
}

function principal(an) {
    return an-360*ceil(an/360-0.5);
}

function det2(a,b,c,d) {
    return a*d-b*c;
}

function det3(a,b,c,d,e,f,g,h,i) {
    return a*det2(e,f,h,i) - d*det2(b,c,h,i) + g*det2(b,c,e,f);
}

function parametric_ellipse(t,x0,y0,a,b,c,s) {
    const u = a*cos(t);
    const v = b*sin(t);
    const x = x0 + c*u - s*v;
    const y = y0 + s*u + c*v;
    return [x,y];
}

function parametric_hyperbola(t,x0,y0,a,b,c,s) {
    const u = a/sin(t);
    const v = b/tan(t);
    const x = x0 + c*u - s*v;
    const y = y0 + s*u + c*v;
    return [x,y];
}

function parametric_parabola(t,x0,y0,p,c,s) {
    const q = cos(t);
    const r = -p/(1+q);
    const u = r*q;
    const v = r*sin(t);
    const x = x0 + c*u - s*v;
    const y = y0 + s*u + c*v;
    return [x,y];
}

function cosine(a,b,c) {
    return (b*b+c*c-a*a)/(2*b*c);
}

function tangent(x) {
    return sqrt(1-x*x)/x;
}

class Obj {
}

class Point extends Obj {
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
    }

    static create_polar(r,a) {
        return new Point(r*cos(a), r*sin(a)); 
    }

    static create_point_on_segment(set,t) {
        const [A,B] = set;
        const x = A.x + t*(B.x-A.x);
        const y = A.y + t*(B.y-A.y);
        return new Point(x,y);
    }

    static create_point_on_line(l,t) {
        const x = l.x + t*cos(l.a);
        const y = l.y + t*sin(l.a);
        return new Point(x,y);
    }

    static create_point_with_abscissa(l,x) {
        const c = cos(l.a);
        if(ZERO(c)) {
            throw(new Error("invalid line"));
        }
        return new Point(x,l.y+(x-l.a)*sin(l.a)/c);
    }

    static create_point_with_ordinate(l,y) {
        const s = sin(l.a);
        if(ZERO(s)) {
            throw(new Error("invalid line"));
        }
        return new Point(l.x+(y-l.y)*cos(l.a)/s,y);
    }

    static create_point_on_circle(c,a) {
        return new Point(c.x+c.r*cos(a), c.y+c.r*sin(a));
    }

    static create_midpoint(set) {
        const [A,B] = set.points;
        return new Point((A.x+B.x)/2, (A.y+B.y)/2);
    }

    static create_barycenter(points,weights) {
        let x = 0;
        let y = 0;
        let s = 0;
        for(let i=0;i<points.length;i++) {
            const c = weights[i];
            const p = points[i];
            x += c*p.x;
            y += c*p.y;
            s += c;
        }
        return new Point(x/s, y/s);
    }

    static create_orthocenter(A,B,C) {
        const a = B.distance(C);
        const b = A.distance(C);
        const c = A.distance(B);

        if(ZERO(a) || ZERO(b) || ZERO(c)) {
            throw(new Error("invalid triangle"));
        }

        let ca = cosine(a,b,c);
        let cb = cosine(b,c,a);
        let cc = cosine(c,a,b);

        if(ca==0) {
            ca = 1;
            cb = 0;
            cc = 0;
        } else if(cb==0) {
            ca = 0;
            cb = 1;
            cc = 0;
        } else if(cc==0) {
            ca = 0;
            cb = 0;
            cc = 1;
        } else {
            ca = tangent(ca);
            cb = tangent(cb);
            cc = tangent(cc);
        }
        const d = ca+cb+cc;
        return new Point(
            (ca*A.x + cb*B.x + cc*C.x)/d,
            (ca*A.y + cb*B.y + cc*C.y)/d
        );
    }

    translate(u) {
        return new Point(this.x+u.x, this.y+u.y);
    }

    reflect(l) {
        const c = cos(l.a);
        const s = sin(l.a);

        const x = this.x - l.x;
        const y = this.y - l.y;
        const p = 2*(c*x+s*y);
        return new Point(l.x+p*c-x, l.y+p*s-y);
    }

    symmetric(O) {
        return new Point(2*O.x - this.x, 2*O.y - this.y);
    }

    rotate(a,O) {
        const c = cos(a);
        const s = sin(a);
        const x = this.x - O.x;
        const y = this.y - O.y;
        return new Point(O.x + c*x - s*y, O.y + s*x + c*y);
    }

    distance(B) {
        const dx = this.x - B.x;
        const dy = this.y - B.y;
        return sqrt(dx*dx+dy*dy);
    }

    homothetic(O,k) {
        return new Point(O.x + k*(A.x-O.x), O.y + k*(A.y-O.y));
    }

    abscissa() {
        return this.x;
    }

    ordinate() {
        return this.y;
    }
}

class Vector extends Object {
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
    }

    static create_polar(r,a) {
        return new Vector(r*cos(a), r*sin(a));
    }

    static create_from_points(A,B) {
        return new Vector(B.x-A.x, B.y-A.y);
    }

    static create_from_segment(set) {
        const [A,B] = set;
        return new Vector(B.x-A.x, B.y-A.y);
    }

    static create_from_line(l) {
        return new Vector(cos(l.a), sin(l.a));
    }

    add(v) {
        return new Vector(this.x+v.x, this.y+v.y);
    }

    subtract(v) {
        return new Vector(this.x-v.x, this.y-v.y);
    }

    reverse() {
        return new Vector(-this.x, -this.y);
    }

    multiply(k) {
        return new Vector(k*this.x, k*this.y);
    }

    divide(k) {
        return new Vector(this.x/k, this.y/k);
    }

    rotate(a) {
        const c = cos(a);
        const s = sin(a);
        return new Vector(c*this.x - s*this.y, s*this.x + c*this.y);
    }

    abscissa() {
        return this.x;
    }

    ordinate() {
        return this.y;
    }

    length() {
        return hypot(this.x,this.y);
    }

    argument() {
        return atan2(this.y,this.x);
    }

    static angle_between(u,v) {
        return (u.x*v.y > u.y*v.x ? 1 : -1) * acos( Vector.scalar_product(u,v)/(u.length()*v.length()) );
    }

    static scalar_product(u,v) {
        return u.x*v.x + u.y*v.y;
    }
}

class Line extends Object {
    constructor(x,y,a) {
        super();
        this.x = x;
        this.y = y;
        this.a = a;
    }
    static create_with_points(A,B) {
        if(EQL(A.x,B.x) && EQL(A.y,B.y)) {
            throw(new Error("undefined line"));
        }
        return new Line(A.x,A.y,argument(A,B));
    }
    static create_with_vector(O,u) {
        return new Line(O.x,O.y,atan2(u.y,u.x));
    }
    static create_with_segment(s) {
        const [A,B] = s;
        return Line.create_with_points(A,B);
    }
    parallel(O) {
        return new Line(O.x,O.y,this.a);
    }
    static create_parallel_to_segment(seg,O) {
        const [A,B] = seg;
        if(EQL(A.x,B.x) && EQL(A.y,B.y)) {
            throw(new Error("invalid argument"));
        }
        return new Line(O.x,O.y,argument(A,B));
    }
    perpendicular(O) {
        return new Line(O.x,O.y,this.a + (this.a<=PI/2 ? PI/2 : -PI*3/2));
    }

    static create_angle_bisector(A,B,C) {
        if((EQL(A.x,B.x) && EQL(A.y,B.y)) || (EQL(B.x,C.x) && EQL(B.y,C.y))) {
            throw(new Error("invalid angle"));
        }
        return new Line(B.x,B.y,(argument(B,A) + argument(B,C))/2);
    }

    static create_lines_bisector(l1,l2) {
        const c1 = cos(l1.a);
        const s1 = sin(l1.a);
        const c2 = cos(l2.a);
        const s2 = sin(l2.a);
        const d = det2(c1,c2,s1,s2);
        if(ZERO(d)) {
            if(ZERO(det2(l2.x-l1.x, l2.y-l1.y, c1,s1))) {
                return l1;
            } else {
                throw(new Error("parallel lines"));
            }
        } else {
            const b1 = det2(l1.x,l1.y,c1,s1);
            const b2 = det2(l2.x,l2.y,c2,s2);
            const x = det2(c1,c2,b1,b2)/d;
            const y = det2(s1,s2,b1,b2)/d;
            let a = (l1.a+l2.a)/2;
            if(abs(l1.a-l2.a)>PI/2) {
                a += (a<=PI/2 ? PI/2 : -PI*3/2);
            }
            return new Line(x,y,a);
        }
    }

    static create_altitude(A,B,C) {
        const a = argument(B,C);
        return new Line(A.x,A.y,a+(a<=PI/2 ? PI/2 : -PI*3/2));
    }

    static create_median(A,B,C) {
        const x = (B.x+C.x)/2;
        const y = (B.y+C.y)/2;
        if(EQL(A.x,x) && EQL(A.y,y)) {
            throw(new Error("invalid triangle"));
        }
        return new Line(A.x,A.y,atan2(y-A.y,x-A.x));
    }

    translate(u) {
        return new Line(this.x+u.x, this.y+u.y, this.a);
    }

    reflect(d) {
        const c = cos(this.a);
        const s = sin(this.a);
        const x = this.x-d.x;
        const y = this.y-d.y;
        const p = 2*(c*x+s*y);
        return new Line(d.x+p*c-x, d.y+p*s-y, principal(2*d.a-this.a));
    }

    symmetric(O) {
        return new Line(2*O.x-this.x, 2*O.y-this.y, this.a+(this.a>0 ? -PI : PI));
    }

    rotate(O,a) {
        const c = cos(a);
        const s = sin(a);
        const x = this.x - O.x;
        const y = this.y - O.y;
        return new Line(O.x+c*x-s*y, O.y+s*x+c*y, principal(this.a+a));
    }

    homothetic(O,k) {
        if(k==0) {
            throw(new Error("invalid ratio"));
        }
        return new Line(O.x+k*(this.x-O.x), O.y+k*(this.y-O.y), this.a+(k<0?(this.a>0?-PI:PI):0));
    }

    argument() {
        return this.a;
    }
}

function point_line_distance(A,l) {
    const c = cos(l.a);
    const s = sin(l.a);
    return abs(s*(A.x-l.x) - c*(A.y-l.y));
}

class Set extends Obj {
    constructor(points) {
        super();
        this.points = points.slice();
    }

    static create_polygon(n,O,r,a) {
        const points = [];
        for(let i=0;i<n;i++) {
            const [x,y] = [
                O.x + r*cos(a+2*PI*i/n),
                O.y + r*sin(a+2*PI*i/n)
            ];
            points.push(new Point(x,y));
        }
        return new Set(points);
    }

    segment(tail) {
        const head = this.points[0];
        const s = new Set([head,tail]);
        return s;
    }

    add_head_point(p) {
        return new Set([p].concat(this.points));
    }

    add_tail_point(p) {
        return new Set(this.points.concat([p]));
    }

    concatenate(second) {
        return new Set(this.points.concat(second.points));
    }

    extract_point(i) {
        return this.points[i];
    }

    extract_subset(i,j) {
        return new Set(this.points.slice(i,j));
    }
    
    translate(u) {
        const points = this.points.map(p=>p.translate(u));
        return new Set(points);
    }

    reflect(l) {
        const points = this.points.map(p=>p.reflect(l));
        return new Set(points);
    }

    symmetric(O) {
        const points = this.points.map(p=>p.symmetric(O));
        return new Set(points);
    }

    rotate(O,a) {
        const points = this.points.map(p=>p.rotate(O,a));
        return new Set(points);
    }

    cardinal() {
        return this.points.length;
    }

    path_length() {
        let t = 0;
        for(let i=1;i<=this.points.length;i++) {
            const a = this.points[i%this.points.length];
            const b = this.points[i-1];
            t += a.distance(b);
        }
    }

    area() {
        if(this.points.length==0) {
            return 0;
        } else {
            return abs(compute_area(this.points,this.points))*0.5;
        }
    }

    perpendicular_to_segment(O) {
        const [A,B] = this.points;
        if(EQL(A.x,B.x) && EQL(A.y,B.y)) {
            throw(new Error("invalid set"));
        }
        const a = argument(A,B);
        return new Line(O.x,O.y,a+(a<=PI/2 ? PI/2 : -PI*3/2));
    }

    perpendicular_bisector() {
        const [A,B] = this.points;
        if(EQL(A.x,B.x) && EQL(A.y,B.y)) {
            throw(new Error("invalid set"));
        }
        const a = argument(A,B);
        return new Line((A.x+B.x)/2, (A.y+B.y)/2, a+(a<=PI/2 ? PI/2 : -PI*3/2));
    }

    isobarycenter() {
        let x = 0;
        let y = 0;
        for(let p of this.points) {
            x += p.x;
            y += p.y;
        }
        const n = this.points.length;
        return new Point(x/n, y/n);
    }

}

function compute_area(A,B) {
    if(B.length==1) {
        return B[0].x*A[0].y - A[0].x*B[0].y;
    } else {
        return B[0].x*B[1].y - B[1].x*b[0].y + compute_area(A,B.slice(1));
    }
}

class Circle extends Obj {
    constructor(center,r) {
        super();
        this.x = center.x;
        this.y = center.y;
        this.r = r;
    }

    static create_circle_with_diameter(set) {
        const [A,B] = set.points;
        const r = A.distance(B)/2;
        const center = new Point((A.x+B.x)/2, (A.y+B.y)/2);
        return new Circle(center,r);
    }

    static create_circumcircle(A,B,C) {
        const s1 = A.x*A.x + A.y*A.y;
        const s2 = B.x*B.x + B.y*B.y;
        const s3 = C.x*C.x + C.y*C.y;
        const a = det3(A.x,B.x,C.x,A.y,B.y,C.y,1,1,1);
        if(ZERO(a)) {
            throw(new Error("invalid points"));
        }
        const d = det3(s1, s2, s3, A.y, B.y, C.y, 1, 1, 1);
        const e = det3(s1, s2, s3, A.x, B.x, C.x, 1, 1, 1);
        const f = det3(s1, s2, s3, A.x, B.x, C.x, A.y, B.y, C.y);
        const r = sqrt((d*d+e*e)/(4*a*a)+f/a);
        const center = new Point(d/(2*a), -e/(2*a));
        return new Circle(center,r);
    }

    static create_incircle(A,B,C) {
        const a = B.distance(C);
        const b = A.distance(C);
        const c = A.distance(B);
        const s = det2(B.x-A.x, C.x-A.x, B.y-A.y, C.y-A.y) > 0 ? 1 : -1;
        const s1 = sqrt((a-b+c)*(a+b-c));
        const s2 = sqrt((b+c-a)*(b+c+a));
        if(ZERO(s1) || ZERO(s2)) {
            throw(new Error("invalid points"));
        }
        const r = 0.5*s1*s2/(a+b+c);
        const t = s1/s2;
        const u = (B.x-A.x)/c;
        const v = (B.y-A.y)/c;
        const center = new Point(A.x+r*(u/t-s*v), A.y=r*(v/t+s*u));
        return new Circle(center,r);
    }

    center() {
        return new Point(this.x,this.y);
    }
    
    tangent(a) {
        return new Line(this.x+this.r*cos(a), this.y+this.r*sin(a), a+(a<=PI/2 ? PI/2 : -PI*3/2));
    }
}

class Conic extends Obj {
    constructor(v,a,b,d) {
        super();
        this.d = d;
        this.b = b;
        this.a = a;
        this.x = v.x;
        this.y = v.y;
    }

    static create_with_directrix(A,l,x) {
        const c = cos(l.a);
        const s = sin(l.a);
        const d = s*(A.x-l.x) - c*(A.y-l.y);
        if(ZERO(d)) {
            throw(new Error("d is 0"));
        }
        const dd = principal(l.a + (d<0 ? PI/2 : -PI/2));
        if(e==1) {
            return new Parabola(dd, abs(d), A);
        } else {
            const h = 1/e - e;
            const f = abs(d)*e/h;
            const {x,y} = {x: A.x+s*f, y: A.y-c*f};
            const v = new Point(x,y);
            const a = abs(d/h);
            if(e<1) {
                const b = a*sqrt(1-e*e);
                return new Ellipse(v,a,b,dd);
            } else {
                const b = a*sqrt(e*e-1);
                return new Hyperbola(v,a,b,dd);
            }
        }
    }

    static create_with_foci(A,B,a) {
        if(a<=0) {
            throw(new Error("invalid major or real axis"));
        }
        const f = A.distance(B);
        if(ZERO(f) || EQL(f,a)) {
            throw(new Error("invalid parameters"));
        }
        const x = (A.x+B.x)/2;
        const y = (A.y+B.y)/2;
        const v = new Point(x,y);
        const d = argument(A,B);
        if(f<a) {
            const eb = sqrt(a*a-f*f);
            return new Ellipse(v,a,eb,d);
        } else {
            const hb = sqrt(f*f-a*a);
            return new Hyperbola(v,a,hb,d);
        }
    }
    center() {
        return new Point(this.x,this.y);
    }

    foci() {
        const c = cos(this.d);
        const s = sin(this.d);
        const f = sqrt(this.a*this.a + this.b*this.b*(this instanceof Ellipse ? -1 : 1));
        const first = {x: this.x + c*f, y: this.y + s*f};
        const second = {x: this.x - c*f, y: this.y - s*f};
        return [first,second];
    }

    translate(u) {
        return new (this.__proto__.constructor)(new Point(this.x+u.x,this.y+u.y), this.a, this.b, this.d);
    }

    reflect(l) {
        const c = cos(l.a);
        const s = sin(l.a);
        const x = this.x-l.x;
        const y = this.y-l.y;
        const p = 2*(c*x+s*y);
        return new (this.__proto__.constructor)(
            new Point(l.x+p*c-x, l.y+p*s-y),
            this.a,
            this.b,
            principal(2*l.a-this.d)
        );
    }

    symmetric(O) {
        return new (this.__proto__.constructor)(
            new Point(2*O.x-this.x, 2*O.y-this.y),
            this.a,
            this.b,
            this.d+(this.d > 0 ? -PI : PI)
        );
    }

    rotate(O,a) {
        const c = cos(a);
        const s = sin(a);
        const x = this.x - O.x;
        const y = this.y - O.y;
        return new (this.__proto__.constructor)(
            new Point(O.x + c*x - s*y, O.y + s*x + c*y),
            this.a,
            this.b,
            principal(this.d+a)
        );
    }

    homothetic(O,k) {
        return new (this.__proto__.constructor)(
            new Point(O.x + k*(this.x - O.x), O.y + k*(this.y - O.y)),
            abs(k)*this.a,
            abs(k)*this.b,
            this.d
        );
    }

    major_axis() {
        return this.a;
    }

    minor_axis() {
        return this.b;
    }

    argument() {
        return this.d;
    }
}

class Ellipse extends Conic {
    constructor(v,a,b,d) {
        if(a<=0 || b<=0 || a<b) {
            throw(new Error("invalid parameters"));
        }
        super(v,a,b,d);
    }
    point_on(t) {
        const c = cos(this.d);
        const s = sin(this.d);
        const [x,y] = parametric_ellipse(t,this.x,this.y,this.a,this.b,c,s);
        return new Point(x,y);
    }

    eccentricity() {
        return sqrt(1-this.b*this.b/(this.a*this.a));
    }

    point_argument(A) {
        const c = cos(this.d);
        const s = sin(this.d);
        const x = A.x-this.x;
        const y = A.y-this.y;
        const u = c*x + s*y;
        const v = -s*x + c*y;

        return atan2(v*this.a,u*this.b);
    }

    tangent(t) {
        const [x,y] = parametric_ellipse(t,this.x,this.y,this.a,this.b,c,s);
        const a = atan2(this.b*cos(t), -this.a*sin(t));
        return new Line(x,y,a);
    }
}

class Hyperbola extends Conic {
    point_on(t) {
        const c = cos(this.d);
        const s = sin(this.d);
        if(t<=-PI || t>= PI || t==0) {
            throw(new Error("invalid argument"));
        }
        const [x,y] = parametric_hyperbola(t,this.x,this.y,this.a,this.b,c,s);
        return new Point(x,y);
    }

    eccentricity() {
        return sqrt(1+this.b*this.b/(this.a*this.a));
    }

    point_argument(A) {
        const c = cos(this.d);
        const s = sin(this.d);
        const x = A.x-this.x;
        const y = A.y-this.y;
        const u = c*x + s*y;
        const v = -s*x + c*y;

        return atan2(this.b,v) - (u<0 ? PI : 0);
    }

    tangent(t) {
        const c = cos(this.d);
        const s = sin(this.d);
        if(t<=-PI || t>=PI) {
            throw(new Error("invalid argument"));
        }
        let x,y,a;
        if(t==0 || t==PI) {
            x = this.x;
            y = this.y;
            a = atan2(this.b,this.a*(t==0?1:-1));
        } else {
            const [x,y] = parametric_hyperbola(t,this.x,this.y,this.a,this.b,c,s);
            a = atan2(-this.b, -this.a*cos(t));
        }
        return new Line(x,y,principal(a+this.d));
    }
}

class Parabola extends Conic {
    point_on(t) {
        const c = cos(this.d);
        const s = sin(this.d);
        if(t<=-PI || t>= PI || t==0) {
            throw(new Error("invalid argument"));
        }
        const [x,y] = parametric_parabola(t,this.x,this.y,this.a,this.b,c,s);
        return new Point(x,y);
    }

    constructor(v,a,d) {
        if(a<0) {
            throw(new Error("Invalid a"));
        }
        const [nx,ny] = [
            v.x+a*Math.cos(d)/2,
            v.y+a*Math.sin(d)/2
        ];
        super(new Point(nx,ny),a,0,d);
    }

    center() {
        throw(new Error("undefined center"));
    }

    eccentricity() {
        return 1;
    }

    point_argument(A) {
        const c = cos(this.d);
        const s = sin(this.d);
        const x = A.x-this.x;
        const y = A.y-this.y;
        const u = c*x + s*y;
        const v = -s*x + c*y;

        return atan2(-v, (this.a-v*v/this.a)/2);
    }
    
    tangent(t) {
        if(t<=-PI || t>=PI) {
            throw(new Error("invalid argument"));
        }
        const c = cos(this.d);
        const s = sin(this.d);
        const [x,y] = parametric_parabola(t,this.x,this.y,this.a,c,s);
        const a = principal(atan2(-1-cos(t),sin(t))+this.d);
        return new Line(x,y,a);
    }
}

class TriangleMaker {
    constructor(vertices) {
        this.vertices = vertices.slice();
    }

    assign_A_B() {
        let A,B;
        switch(this.vertices.length) {
            case 0:
                A = new Point(0,0);
                B = new Point(this.a*this.x,this.a*this.y);
                this.vertices = [A,B];
                break;
            case 1:
                [A] = this.vertices;
                B = new Point(A.x + this.a*this.x, A.y + this.a*this.y);
                this.vertices = [A,B];
                break;
            case 2:
                [A,B] = this.vertices;
                this.a = A.distance(B);
                if(ZERO(this.a)) {
                    throw(new Error("invalid points"));
                }
                [this.x,this.y] = [(B.x-A.x)/this.a, (B.y-A.y)/this.a];
                break;
        }

    }

    assign_C(u,v) {
        const [A,B] = this.vertices;
        const C = new Point(
            A.x+u*this.x-v*this.y,
            A.y+v*this.x+u*this.y
        );
        this.vertices = [A,B,C];
    }

    static define_optimal_scalene(vertices,a,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        tm.assign_C(tm.a*.375, tm.a*.61237244);
        return tm.vertices;
    }

    static define_triangle_SSS(vertices,a,b,c,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        a = tm.a;
        const s1 = (b-a+c)*(b+a-c);
        const s2 = (a+c-b)*(a+b+c);
        let u,v;
        if(ZERO(s2)) {
            u = -c;
            v = 0;
        } else {
            const s = s1/s2;
            if(s<0) {
                throw(new Error("invalid lengths"));
            }
            t = 2*atan(sqrt(s));
            u = c*cos(t);
            v = c*sin(t);
        }
        tm.assign_C(u,v);
        return tm.vertices;
    }

    static define_triangle_SAA(vertices,a,u,v,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        const cu = cos(u);
        const su = sin(u);
        const cv = cos(v);
        const sv = sin(v);
        const d = cu*sv + su*cv;
        if(ZERO(d)) {
            throw(new Error("invalid angles"));
        }
        tm.assign_A_B();
        const c = a*sv/d;
        tm.assign_C(c*cu,c*su);
        return tm.vertices;
    }

    static define_triangle_SAS(vertices,a,u,c,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        tm.assign_C(c*cos(u),c*sin(u));
        return tm.vertices;
    }

    static define_triangle_SSA(vertices,a,c,v,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        const cv = cos(v);
        const sv = sin(v);
        const s = c*c-a*a*sv*sv;
        if(s<0) {
            throw(new Error("invalid parameters"));
        }
        const b = a*cv + sqrt(s);
        tm.assign_C(a-b*cv, b*sv);
        return tm.vertices;
    }

    static define_right_SS(vertices,a,b,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        a = tm.a;
        tm.assign_C(a, b);
        return tm.vertices;
    }
    
    static define_right_SA(vertices,a,u,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        if(u>=PI/2 || u<=-PI/2) {
            throw(new Error("invalid angle"));
        }
        tm.assign_A_B();
        a = tm.a;
        tm.assign_C(a, a*tan(u));
        return tm.vertices;
    }

    static define_isosceles_SS(vertices,a,b,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        a = tm.a/2;
        const s = b*b-a*a;
        if(s<0) {
            throw(new Error("invalid lengths"));
        }
        tm.assign_C(a,sqrt(s));
        return tm.vertices;
    }

    static define_isosceles_SA(vertices,a,u,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        if(u>=PI/2 || u<=-PI/2) {
            throw(new Error("invalid angle"));
        }
        tm.assign_A_B();
        a = tm.a/2;
        tm.assign_C(a,a*tan(u));
        return tm.vertices;
    }

    static define_equilateral(vertices,a,t) {
        const tm = new TriangleMaker(vertices);
        if(vertices.length<2) {
            tm.a = a;
            tm.x = cos(t);
            tm.y = sin(t);
        }
        tm.assign_A_B();
        a = tm.a/2;
        tm.assign_C(a,a*sqrt(3));
        return tm.vertices;
    }
}

class QuadrilateralMaker {
    constructor(vertices) {
        this.vertices = vertices.slice();
    }

    assign(x,y,u,v,l,m,b,square) {
        let [A,B,C] = this.vertices;
        switch(this.vertices.length) {
            case 0:
                A = new Point(0,0);
                B = new Point(l*x,l*y);
                break;
            case 1:
                B = new Point(A.x+l*x, A.y+l*y);
                break;
            case 2:
                l = A.distance(B);
                if(ZERO(l)) {
                    throw(new Error("invalid points"));
                }
                x = (B.x-A.x)/l;
                y = (B.y-A.y)/l;
                break;
        }
        if(square) {
            m = l;
        }
        C = new Point(B.x+m*(u*x-v*y), B.y+m*(v*x+u*y));
        const D = new Point(
            A.x+C.x-B.x,
            A.y+C.y-B.y
        );
        this.vertices = [A,B,C,D];
        return this.vertices;
    }

    static define_parallelogram_SSA(vertices,m,a,l,b) {
        let x,y,u,v;
        if(vertices.length < 2) {
            x = cos(b);
            y = sin(b);
            u = cos(a);
            v = sin(a);
        } else {
            u = cos(a);
            v = sin(a);
        }
        const qm = new QuadrilateralMaker(vertices);
        return qm.assign(x,y,u,v,l,m,b);
    }

    static define_parallelogram_VV(vertices,u,v) {
        let [A] = vertices;
        if(vertices.length==0) {
            A = new Point(0,0);
        }
        const B = new Point(A.x+u.x, A.y+u.y);
        const C = new Point(A.x+u.x+v.x, A.y+u.y+v.y);
        const D = new Point(A.x+v.x,A.y+v.y);
        return [A,B,C,D];
    }

    static define_rectangle(vertices,l,m,b) {
        let x,y;
        if(vertices.length<2) {
            x = cos(b);
            y = sin(b);
        }
        const qm = new QuadrilateralMaker(vertices);
        return qm.assign(x,y,0,1,l,m,b);
    }

    static define_square(vertices,l,b) {
        let x,y;
        if(vertices.length<2) {
            x = cos(b);
            y = sin(b);
        }
        const qm = new QuadrilateralMaker(vertices);
        return qm.assign(x,y,0,1,l,l,b,true);
    }
}

function orthogonal_projection(A,l) {
    const c = cos(l.a);
    const s = sin(l.a);
    const p = c*(A.x - l.x) + s*(A.y-l.y);

    return new Point(l.x + p*c, l.y + p*s);
}

function intersection_point(x1,y1,a1,x2,y2,a2) {
    const c1 = cos(a1);
    const s1 = sin(a1);
    const c2 = cos(a2);
    const s2 = sin(a2);
    const d = det2(c1,c2,s1,s2);
    if(ZERO(d)) {
        throw(new Error("parallel lines"));
    }
    const b1 = det2(x1,y1,c1,s1);
    const b2 = det2(x2,y2,c2,s2);
    return new Point(
        det2(c1,c2,b1,b2)/d,
        det2(s1,s2,b1,b2)/d
    );
}

function parallel_projection(A,l1,l2) {
    return intersection_point(l1.x,l1.y,l1.a,A.x,A.y,l2.a);
}

function lines_intersection(l1,l2) {
    return intersection_point(l1.x,l1.y,l1.a,l2.x,l2.y,l2.a);
}

function line_segment_intersection(set,a,b,c,d) {
    var [p,t] = set;
    if(t===undefined) {
        return [];
    }
    function dist(p) {
        return a*p.x+b*p.y+c;
    }

    const e = dist(t,a,b,c);
    if(d*e<=EPSILON && abs(e)>EPSILON) {
        const f = abs(d)+abs(e);
        const g = f==0 ? 0 : abs(d)/f;
        const p1 = new Point(p.x+g*(t.x-p.x), p.y+g*(t.y-p.y));
        return [p1].concat(line_segment_intersection(set.slice(1),a,b,c,e));
    }
    return line_segment_intersection(set.slice(1),a,b,c,e);
}

function line_set_intersection(l,s) {
    if(s.points.length==0) {
        return new Set([]);
    }
    const a = sin(l.a);
    const b = -cos(l.a);
    const c = -a*l.x+b*l.y;
    function dist(p) {
        return a*p.x+b*p.y+c;
    }

    return new Set(line_segment_intersection(s.points,a,b,c,dist(s.points[0],a,b,c)));
}

/** Solve a quadratic equation a*x^2 + b*x + c = 0
 */
function solve(a,b,c) {
    if(ZERO(a)) {
        if(ZERO(b)) {
            return [];
        }
        return [-c/b,1];
    }
    const d = b*b-4*a*c;
    if(d<0) {
        return [];
    }
    if(ZERO(d)) {
        return [-b/(2*a)];
    }
    const r = sqrt(d);
    const x1 = (-b-r)/(2*a);
    const x2 = (-b+r)/(2*a);
    return [x1,x2];
}

function line_circle_intersection(l,C) {
    const x = l.x-C.x;
    const y = l.y-C.y;
    const c = cos(l.a);
    const s = sin(l.a);
    const roots = solve(1,2*(x*c+y*s),x*x+y*y-C.r*C.r);
    return new Set(roots.map(t=>new Point(l.x+c*t, l.y+s*t)));
}

function line_conic_intersection(l,C) {
    const c = cos(C.d);
    const s = sin(C.d);
    const a = C.a*C.a;
    const b = C.b*C.b;
    const x = c*(l.x-C.x)+s*(l.y-C.y);
    const y = -s*(l.x-C.x)+c*(l.y-C.y);
    const ca = cos(l.a);
    const sa = sin(l.a);
    const u = c*ca+s*sa;
    const v = -s*ca+c*sa;
    let roots;
    if(C instanceof Ellipse) {
        roots = solve(u*u/a + v*v/b, 2*(x*u/a + y*v/b), x*x/a + y*y/b - 1);
    } else if(C instanceof Hyperbola) {
        roots = solve(u*u/a - v*v/b, 2*(x*u/a - y*v/b), x*x/a - y*y/b - 1);
    } else if(C instanceof Parabola) {
        roots = solve(v*v/(2*C.a), y*v/C.a - u, y*y/(2*C.a) - x - C.a/2);
    }

    return new Set(roots.map(t=>new Point(l.x+ca*t, l.y+sa*t)));
}

function sets_intersection(s1,s2) {
    if(s1.points.length==0 || s2.points.length==0) {
        return new Set([]);
    }
    const out = [];
    let s = s1.points[s1.points.length-1];
    for(let t of s1.points) {
        let v = s2.points[s2.points.length-1];
        for(let w of s2.points) {
            if(max(s.x,t.x) >= min(v.x,w.x)
                && max(v.x,w.x) >= min(s.x,t.x)
                && max(s.y,t.y) >= min(v.y,w.y)
                && max(v.y,w.y) >= min(s.y,t.y)
            ) {
                const d1 = s.distance(t);
                const c1 = (t.x-s.x)/d1;
                const s1 = (t.y-s.y)/d1;
                const d2 = v.distance(w);
                const c2 = (w.x-v.x)/d2;
                const s2 = (w.y-v.y)/d2;
                const x = v.x-s.x;
                const y = v.y-s.y;
                const d = det2(c1,c2,s1,s2);
                if(ZERO(d)) {
                    if(ZERO(det2(x,y,c1,s1))) {
                        out.push(s);
                    }
                } else {
                    const t1 = det2(x,y,c2,s2)/d;
                    const t2 = det2(x,y,c1,s1)/d;
                    if(t1>=0 && t1<=d1 && t2>+0 && t2<=d2) {
                        out.push(new Point(s.x+c1*t1,s.y+s1*t1));
                    }
                }
            }
            v = w;
        }
        s = t;
    }
    return new Set(out);
}

function circles_intersection(c1,c2) {
    let x = c2.x-c1.x;
    let y = c2.y-c1.y;
    const a = hypot(x,y);
    const b = c2.r;
    const c = c1.r;
    if(ZERO(a) || a>b+c || a<abs(b-c)) {
        return new Set([]);
    }
    x /= a;
    y /= a;
    if(a==b+c || a==abs(b-c)) {
        return new Set([new Point(
            c1.x+c*x,
            c2.x+c*y
        )]);
    }

    const t = 2*atan(sqrt((b-a+c)*(b+a-c)/((a+c-b)*(a+b+c))));
    const u = c*cos(t);
    const v = c*sin(t);
    const first = new Point(
        c1.x+u*x-v*y,
        c1.y+v*x+u*y
    );
    const second = new Point(
        c1.x+u*x+v*y,
        c1.y-v*x+u*y
    );
    return new Set([first,second]);
}

function circle_set_intersection(set,c) {
    const out = [];
    if(set.points.length<2) {
        return [];
    }
    let s = set.points[set.points.length-1];
    function dist(s) {
        return hypot(s.x-c.x,s.y-c.y);
    }
    for(let t of set.points) {
        const d = dist(s);
        const e = dist(t);
        if(d>=c.r || e>=c.r) {
            const f = s.distance(t);
            const x = s.x-c.x;
            const y = s.y-c.y;
            const u = (t.x-s.x)/f;
            const v = (t.y-s.y)/f;
            const roots = solve(1,2*(x*u+y*v), x*x+y*y-c.r*c.r);
            if(roots.length>0) {
                const [t1,t2] = roots;
                if(roots.length>1 && t2>=0 && t2<=f) {
                    const v2 = new Point(
                        s.x+u*t2,
                        s.y+v*t2
                    );
                    out.push(v2);
                }
                if(t1>=0 && t1<=f) {
                    const v1 = new Point(
                        s.x+u*t1,
                        s.y+v*t1
                    );
                    out.push(v1);
                }
            }
        }
        s = t;
    }
    return new Set(out);
}

function clean_label(text) {
    text = text.replace("'","′");
    var superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    var subscripts = '₀₁₂₃₄₅₆₇₈₉';
    text = text.replace(/\^(\d)/g,function(m){return superscripts[parseInt(m[1])]});
    text = text.replace(/_(\d)/g,function(m){return subscripts[parseInt(m[1])]});

    return text;
}


class Drawer {
}

const labels = ["simple","double","triple"];
const [SIMPLE,DOUBLE,TRIPLE] = labels;
const styles = ["full","dotted","dashed"];
const [FULL,DOTTED,DASHED] = styles;
const shapes = ["dot","disc","box","plus","cross"];
const [DOT,DISC,BOX,PLUS,CROSS] = shapes;
const parts = ["entire","half"];
const [ENTIRE,HALF] = parts;
const dirs = ["right","forth","back"];
const [RIGHT,FORTH,BACK] = dirs;
const arrows = ["none","arrow","arrows"];
const [NONE,ARROW,ARROWS] = arrows;
const colors = ['black','darkgray','gray','lightgray','white','red','green','blue','cyan','magenta','yellow'];
const [BLACK,DARKGRAY,GRAY,LIGHTGRAY,WHITE,RED,GREEN,BLUE,CYAN,MAGENTA,YELLOW] = colors;

class CanvasDrawer extends Drawer {
    constructor(canvas,width) {
        super();
        this.canvas = canvas;
        this.width = width || 800;
        this.ctx = canvas.getContext('2d');
        this.restore_default_settings();
        this.restore_local_settings();
        this.setup_frame(-2,-2,8,6,1);
    }

    setup_frame(min_x,min_y,max_x,max_y,scale) {
        const ctx = this.ctx;
        this.min_x = min_x;
        this.min_y = min_y;
        this.max_x = max_x;
        this.max_y = max_y;
        this.scale = scale;
        this.font_scale = 100;
        this.default_dist = 0.2;
        const cscale = this.width/(this.max_x - this.min_x);
        this.canvas.width = this.width;
        this.canvas.height = cscale*(this.max_y-this.min_y);
        this.canvas.style.width = this.canvas.width+'px';
        this.canvas.style.height = this.canvas.height+'px';
        ctx.resetTransform();
        ctx.scale(cscale,-cscale);
        ctx.translate(-this.min_x, -this.max_y);

        ctx.lineWidth = 0.02;
        ctx.lineJoin = 'round';
    }

    restore_default_settings() {
        this.global = {
            label: false,
            label_segment: SIMPLE,
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
            font_family: 'serif'
        }
    }

    restore_local_settings() {
        this.local = Object.assign({},this.global);
    }


    SIZE(x) {
        return this.local.size*x/this.scale;
    }

    check_color() {
        this.ctx.fillStyle = this.local.color;
        this.ctx.strokeStyle = this.local.color;
        this.ctx.globalAlpha = this.local.opacity;
    }

    check_font() {
        const size = this.font_scale*this.SIZE(this.local.font_size);
        this.ctx.font = `${this.local.italic ? 'italic ': ''}${this.local.bold ? 'bold ' : ''}${size}pt ${this.local.font_family}`;
    }

    check_size() {
        const ctx = this.ctx;
        ctx.lineWidth = this.local.size * 0.02 ;
    }

    check_style() {
        const ctx = this.ctx;
        switch(this.local.style) {
            case FULL:
                ctx.setLineDash([1,0]);
                break;
            case DOTTED:
                ctx.setLineDash([ctx.lineWidth, 0.2]);
                break;
            case DASHED:
                ctx.setLineDash([0.3, 0.2])
                break;
        }
    }

    check_angle_style() {
        const ctx = this.ctx;
        ctx.setLineDash([1,0]);
    }

    check_basic_settings() {
        this.check_color();
        this.check_size();
        this.check_style();
    }

    draw_dot(x,y,r) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*PI);
        ctx.fill();
    }

    draw_dash(x,y,angle,a,b) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(angle);
        ctx.moveTo(a,0);
        ctx.lineTo(b,0);
        ctx.stroke();
        ctx.restore();
    }

    draw_double_dot(x,y,angle,t,d,r) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(angle);
        for(let i=0;i<2;i++) {
            this.draw_dot(d,0,r);
            ctx.rotate(t);
        }
        ctx.restore();
    }

    draw_double_dash(x,y,angle,a,b,t) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(angle);
        for(let i=0;i<2;i++) {
            ctx.moveTo(a,0);
            ctx.lineTo(b,0);
            ctx.rotate(t);
        }
        ctx.stroke();
        ctx.restore();
    }

    draw_double_arc(x,y,r1,r2,a,b) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.arc(0,0,r1,a,b);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0,0,r2,a,b);
        ctx.stroke();
        ctx.restore();
    }

    draw_triple_dot(x,y,angle,t,d,r) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(angle);
        for(let i=0;i<2;i++) {
            this.draw_dot(d,0,r);
            ctx.rotate(t);
        }
        ctx.rotate(-t*1.5);
        this.draw_dot(d*.75,0,r);
        ctx.restore();
    }

    draw_triple_dash(x,y,angle,a,b,t) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(angle);
        for(let i=0;i<3;i++) {
            ctx.moveTo(a,0);
            ctx.lineTo(b,0);
            ctx.rotate(t);
        }
        ctx.stroke();
        ctx.restore();
    }

    draw_triple_arc(x,y,r1,r2,r3,a,b) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.arc(0,0,r1,a,b);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0,0,r2,a,b);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0,0,r3,a,b);
        ctx.stroke();
        ctx.restore();
    }

    draw_point(A) {
        const size = this.SIZE(0.05);
        const ctx = this.ctx;
        this.check_color();

        switch(this.local.shape) {
            case DOT:
                this.draw_dot(A.x,A.y,size);
                break;
            case DISC:
                ctx.arc(A.x, A.y, size, 0, 2*PI);
                ctx.stroke();
                break;
            case BOX:
                ctx.fillStyle = this.local.color;
                ctx.fillRect(A.x-size, A.y-size, 2*size, 2*size);
                break;
            case PLUS:
                ctx.strokeStyle = this.local.color;
                ctx.beginPath();
                ctx.moveTo(A.x-size,A.y);
                ctx.lineTo(A.x+size,A.y);
                ctx.moveTo(A.x,A.y-size);
                ctx.lineTo(A.x,A.y+size);
                ctx.stroke();
                break;
            case CROSS:
                ctx.strokeStyle = this.local.color;
                ctx.beginPath();
                ctx.moveTo(A.x-size,A.y-size);
                ctx.lineTo(A.x+size,A.y+size);
                ctx.moveTo(A.x-size,A.y+size);
                ctx.lineTo(A.x+size,A.y-size);
                ctx.stroke();
                break;
            default:
                console.error("no style");
        }
    }

    draw_text(text,x,y) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x,y);
        ctx.scale(1/this.font_scale,-1/this.font_scale);
        text = clean_label(text);
        ctx.fillText(text,0,0);
        ctx.restore();
    }

    label_point(A) {
        const ctx = this.ctx;
        this.check_color();
        this.check_font();

        const text = this.local.label_text;
        const angle = this.local.label_direction;
        const dist = this.SIZE(this.default_dist);
        const x = A.x+dist*cos(angle);
        const y = A.y+dist*sin(angle);
        if(angle>=3*PI/4 || angle<=-3*PI/4) {
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
        } else if(angle>PI/4 || angle<-PI/4) {
            ctx.textAlign = 'center';
            if(angle>PI/4) {
                ctx.textBaseline = 'bottom';
            } else {
                ctx.textBaseline = 'top';
            }
        } else {
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
        }
        this.draw_text(text,x,y);
    }

    label_segment(A,B) {
        const ctx = this.ctx;
        this.check_color();
        this.check_style();
        const size = this.SIZE(0.1);

        const angle = argument(A,B);
        const x = (A.x+B.x)/2;
        const y = (A.y+B.y)/2;

        ctx.save();
        ctx.translate(x,y);
        ctx.scale(size,size);
        ctx.lineWidth /= size; 
        ctx.rotate(angle);
        switch(this.local.label_segment) {
            case SIMPLE: 
                ctx.moveTo(-0.5,-1);
                ctx.lineTo(0.5,1);
                ctx.stroke();
                break;
            case DOUBLE:
                ctx.moveTo(-1,-1);
                ctx.lineTo(0,1);
                ctx.moveTo(0,-1);
                ctx.lineTo(1,1);
                ctx.stroke();
                break;
            case TRIPLE:
                ctx.moveTo(-1.5,-1);
                ctx.lineTo(-0.5,1);
                ctx.moveTo(-0.5,-1);
                ctx.lineTo(0.5,1);
                ctx.moveTo(0.5,-1);
                ctx.lineTo(1.5,1);
                ctx.stroke();
                break;
        }
        ctx.restore();
    }

    draw_mark(B,r,a,b) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(B.x,B.y,r,a,b);
        ctx.stroke();
    }

    draw_arrow(x,y,angle,size) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x,y);
        ctx.rotate(angle);
        ctx.scale(size,size);
        ctx.moveTo(-2,1);
        ctx.arcTo(0.214279,0,-2,-1,0.088194);
        ctx.lineTo(-2,-1);
        ctx.lineTo(-1,0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    set_xy(A,B,C,d) {
        const l1 = B.distance(A);
        if(ZERO(l1)) {
            throw(new Error("invalid angle"));
        }
        const x1 = d*(A.x-B.x)/l1;
        const y1 = d*(A.y-B.y)/l1;
        const l2 = B.distance(C);
        if(ZERO(l2)) {
            throw(new Error("invalid angle"));
        }
        const x2 = d*(C.x-B.x)/l2;
        const y2 = d*(C.y-B.y)/l2;
        return [x1,y1,x2,y2];
    }

    label_angle(A,B,C) {
        const ctx = this.ctx;
        this.check_color();
        this.check_angle_style();
        const a = argument(B,A);
        const b = argument(B,C);
        const r = this.SIZE(0.5);
        const s = 0.08/this.scale;
        let x1,y1,x2,y2;
        const t = (8*PI/180)/this.local.size;
        switch(this.local.angle) {
            case SIMPLE:
                this.draw_mark(B,r,a,b);
                switch(this.local.dec) {
                    case DOTTED:
                        [x1,y1,x2,y2] = this.set_xy(A,B,C,this.SIZE(Math.sqrt(2)/8));
                        this.draw_dot(B.x+x1+x2,B.y+y1+y2,this.SIZE(0.05));
                        break;
                    case DASHED:
                        this.draw_dash(B.x,B.y,(a+b)/2,r-s,r+s);
                        break;
                }
                break;
            case DOUBLE:
                switch(this.local.dec) {
                    case DASHED:
                        this.draw_mark(B,r,a,b);
                        this.draw_double_dash(B.x,B.y,(a+b)/2-t/2,r+s,r-s,t);
                        break;
                    case DOTTED:
                        this.draw_mark(B,r,a,b);
                        this.draw_double_dot(B.x,B.y,(a+b)/2-t,t*2,r*0.75,0.03)
                        break;
                    default:
                        this.draw_double_arc(B.x,B.y,r-s/2,r+s/2,a,b);
                }
                break;
            case TRIPLE:
                switch(this.local.dec) {
                    case DASHED:
                        this.draw_mark(B,r,a,b);
                        this.draw_triple_dash(B.x,B.y,(a+b)/2-t,r+s,r-s,t);
                        break;
                    case DOTTED:
                        this.draw_mark(B,r,a,b);
                        this.draw_triple_dot(B.x,B.y,(a+b)/2-t,t*2,r*0.75,0.03)
                        break;
                    default:
                        this.draw_triple_arc(B.x,B.y,r-s,r,r+s,a,b);
                        break;
                }
                break;
            case RIGHT:
                [x1,y1,x2,y2] = this.set_xy(A,B,C,this.SIZE(0.35));
                ctx.beginPath();
                ctx.moveTo(B.x+x1,B.y+y1);
                ctx.lineTo(B.x+x1+x2,B.y+y1+y2);
                ctx.lineTo(B.x+x2,B.y+y2);
                ctx.stroke();
                if(this.local.dec==DOTTED) {
                    this.draw_dot(B.x+(x1+x2)/2,B.y+(y1+y2)/2,this.SIZE(0.05));
                }
                break;
            case FORTH:
                this.draw_mark(B,r,a,b);
                [x1,y1,x2,y2] = this.set_xy(A,B,C,r);
                this.draw_arrow(B.x+x2,B.y+y2, b+acos(0.12/this.scale), 0.1/this.scale);
                break;
            case BACK:
                this.draw_mark(B,r,a,b);
                [x1,y1,x2,y2] = this.set_xy(A,B,C,r);
                this.draw_arrow(B.x+x1,B.y+y1, a-acos(0.12/this.scale), 0.1/this.scale);
                //draw arrow(0.1/scale, a-acos(0.12/scale), B.x+x1, B.y+y1);
                break;
        }
    }

    polygon(set) {
        const ctx = this.ctx;
        if(!set.points.length) {
            return;
        }
        ctx.beginPath();
        ctx.moveTo(set.points[0].x,set.points[0].y);
        for(let p of set.points.slice(1)) {
            ctx.lineTo(p.x,p.y);
        }
        if(this.local.close) {
            ctx.closePath();
        }
    }

    draw_polygon(set) {
        const ctx = this.ctx;
        this.check_basic_settings();
        this.polygon(set);
        ctx.stroke();
        if(!this.local.close && this.local.arrow != NONE && set.points.length>=2) {
            if(this.local.dir==BACK || this.local.arrow==ARROWS) {
                const [p1,p2] = set.points;
                this.draw_arrow(p1.x,p1.y,argument(p2,p1),this.SIZE(0.1));
            }
            if(this.local.dir==FORTH || this.local.arrow==ARROWS) {
                const [p3,p4] = [set.points[set.points.length-2], set.points[set.points.length-1]];
                this.draw_arrow(p4.x,p4.y,argument(p3,p4),this.SIZE(0.1));
            }
        }
    }
    fill_polygon(set) {
        const ctx = this.ctx;
        this.check_basic_settings();
        this.polygon(set);
        ctx.fill();
    }

    draw_line(l) {
        const ctx = this.ctx;
        this.check_basic_settings();
        let m_x=this.min_x, m_y = this.min_y, M_x = this.max_x, M_y = this.max_y;
        if(this.local.part==HALF) {
            if((this.local.dir==FORTH && (l.a> -PI/2 && l.a <= PI/2)) || (this.local.dir==BACK && (l.a<= -PI/2 || l.a > PI/2))) {
                m_x = l.x;
            } else {
                M_x = l.x;
            }
            if((this.local.dir == FORTH && l.a > 0) || (this.local.dir == BACK && l.a<=0)) {
                m_y = l.y;
            } else {
                M_y = l.y;
            }
        }
        const x = [0,0];
        const y = [0,0];
        let i = 0;
        if(l.a==PI/2 || l.a==-PI/2) {
            if(l.x >= m_x && l.x <= M_x) {
                x[0] = x[1] = l.x;
                y[0] = m_y;
                y[1] = M_y;
                i = 2;
            }
        } else if(l.a==0 || l.a==PI) {
            if(l.y >= m_y && l.y <= M_y) {
                y[0] = y[1] = l.y;
                x[0] = m_x;
                x[1] = M_x;
                i = 2;
            }
        } else {
            const t = tan(l.a);
            let z = t*(m_x-l.x)+l.y;
            if(z >= m_y && z <= M_y) {
                x[i] = m_x;
                y[i] = z;
                i += 1;
            }
            z = t*(M_x-l.x)+l.y;
            if(z >= m_y && z<= M_y) {
                x[i] = M_x;
                y[i] = z;
                i += 1;
            }
            z = (m_y-l.y)/t+l.x;
            if(z >= m_x && z<= M_x && i<2) {
                x[i] = z;
                y[i] = m_y;
                i += 1;
            }
            z = (M_y-l.y)/t+l.x;
            if(z >= m_x && z<= M_x && i<2) {
                x[i] = z;
                y[i] = M_y;
                i += 1;
            }
        }
        if(i==2) {
            ctx.beginPath();
            ctx.moveTo(x[0],y[0]);
            ctx.lineTo(x[1],y[1]);
            ctx.stroke();
        }

    }

    draw_circle(c) {
        this.check_basic_settings();
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(c.x,c.y,c.r,0,2*PI);
        ctx.stroke();
    }

    draw_arc(c,a,b) {
        this.check_basic_settings();
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(c.x,c.y,c.r,a,b);
        ctx.stroke();
        if(this.local.arrow!=NONE) {
            const d = acos(this.SIZE(.06)/c.r);
            if(this.local.dir == BACK || this.local.arrow == ARROWS) {
                this.draw_arrow(c.x+c.r*cos(a), c.y+c.r*sin(a), a-d, this.SIZE(0.1));
            }
            if(this.local.dir == FORTH || this.local.arrow == ARROWS) {
                this.draw_arrow(c.x+c.r*cos(b), c.y+c.r*sin(b), b+d, this.SIZE(0.1));
            }
        }
    }

    fill_circle(c) {
        this.check_basic_settings();
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(c.x,c.y,c.r,0,2*PI);
        ctx.fill();
    }

    // distance to the furthest corner of the frame
    get_max(x,y) {
        const {min_x,min_y,max_x,max_y} = this;
        let m = hypot(min_x-x,min_y-y);
        let l = hypot(max_x-x,min_y-y);
        if(l>m) {
            m = l;
        }
        l = hypot(max_x-x,max_y-y);
        if(l>m) {
            m = l;
        }
        l = hypot(min_x-x,max_y-y);
        if(l>m) {
            m = l;
        }
        return m;
    }

    draw_parabolic_arc(x0,y0,p,f,g,c,s) {
        const ctx = this.ctx;
        const e = acos(p/this.get_max(x0,y0)-1);
        f = Math.max(f,-e);
        g = Math.min(g,e);
        ctx.beginPath();
        for(let t=f, n=1; t<=g; t+=this.local.step*PI/180, n++) {
            const [x,y] = parametric_parabola(t,x0,y0,p,c,s);
            n==1 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
    }

    draw_elliptic_arc(x0,y0,a,b,f,g,c,s) {
        const ctx = this.ctx;
        ctx.beginPath();
        for(let t=f,n=1; t<=g; t+= this.local.step*PI/180, n++) {
            const [x,y] = parametric_ellipse(t,x0,y0,a,b,c,s);
            n==1 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
    }

    draw_branch(i,j,x0,y0,a,b,f,g,c,s) {
        const ctx = this.ctx;
        ctx.beginPath();
        i = Math.max(i,f);
        j = Math.min(j,g);
        for(let t=i,n=1; t<=j; t+=this.local.step*PI/180, n++) {
            const [x,y] = parametric_hyperbola(t,x0,y0,a,b,c,s);
            n==1 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
    }

    draw_hyperbolic_arc(x0,y0,a,b,f,g,c,s) {
        const e = atan(b/this.get_max(x0,y0));
        if(f<-e) {
            this.draw_branch(-PI+e,-e,x0,y0,a,b,f,g,c,s);
        }
        if(g>e) {
            this.draw_branch(e,PI-e,x0,y0,a,b,f,g,c,s);
        }
    }

    draw_conic(C) {
        this.check_basic_settings();
        if(C instanceof Parabola) {
            this.draw_parabolic_arc(C.x,C.y,C.a,-PI,PI,cos(C.d),sin(C.d));
        } else if(C instanceof Ellipse) {
            this.draw_elliptic_arc(C.x,C.y,C.a,C.b,-PI,PI,cos(C.d),sin(C.d));
        } else if(C instanceof Hyperbola) {
            this.draw_hyperbolic_arc(C.x, C.y, C.a, C.b, -PI, PI, cos(C.d), sin(C.d));
        }
    }

    draw_conic_arc(C,f,g) {
        this.check_basic_settings();
        if(C instanceof Ellipse && f>g) {
            g += 360;
        }
        if(f>=g) {
            throw(new Error("invalid boundaries"));
        }
        if(C instanceof Parabola) {
            this.draw_parabolic_arc(C.x,C.y,C.a,f,g,cos(C.d),sin(C.d));
        } else if(C instanceof Ellipse) {
            this.draw_elliptic_arc(C.x,C.y,C.a,C.b,f,g,cos(C.d),sin(C.d));
        } else if(C instanceof Hyperbola) {
            this.draw_hyperbolic_arc(C.x,C.y,C.a,C.b,f,g,cos(C.d),sin(C.d));
        }
    }
}

export {
    Obj, Point, Vector, Line, Set, Circle, Conic, Ellipse, Hyperbola, Parabola,
    point_line_distance,
    orthogonal_projection, parallel_projection, lines_intersection, line_set_intersection, 
    line_circle_intersection, line_conic_intersection, sets_intersection, circles_intersection,
    circle_set_intersection,
    TriangleMaker, QuadrilateralMaker,
    Drawer, CanvasDrawer,
    labels, styles, shapes, parts, dirs, arrows, colors
};
