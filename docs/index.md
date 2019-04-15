# Numbas Eukleides extension

## Basic concepts

The function `eukleides` creates a diagram which you can include anywhere in a Numbas question.

A diagram consists of a list of objects, drawn into a frame which is shown on screen. 
The boundaries of the frame are automatically determined, or you can give explicit values.

The basic objects in a diagram are:

* point
* point set (rendered as a line segment or a polygon, depending on the number of points)
* line
* circle
* conic (parabola, hyperbola or ellipse)
* text label
* angle label

Drawing modifiers change how an object is drawn, for example changing the colour or size. 
Modifiers can be applied to single objects, lists of objects, or even chained together to create reusable styles.

## Coordinates

All coordinates in Eukleides diagrams are specified in terms of the frame and then transformed onto the browser's coordinates.
The bottom-left of the diagram has coordinates `(min_x,min_y)` and the top-right of the diagram has coordinates `(max_x,max_y)`.
The positive horizontal direction is **right**, and the positive vertical direction is **up**.

## Accessibility

It's important that diagrams are accessible to as many people as possible.
The Eukleides extension provides a variety of ways of doing this.
It tries to do as much as it can automatically to improve accessibility, but you should bear accessibility in mind when designing diagrams.

### Screenreaders

Users who can't see the diagram might access it through a screenreader.

The first argument to the `eukleides` function is a title for the diagram, which a screenreader will read out.
This title should briefly identify the diagram and describe its contents, for example, "A circle inscribed in a square", or "Bar chart showing number of customers against month".

The Web Accessibility Initiative has [a good tutorial on describing complex images](https://www.w3.org/WAI/tutorials/images/complex/ "Complex Images WAI Web Accessibility Tutorial").

The user can then navigate inside the diagram to have individual objects described.

Eukleides automatically adds a text description to each object in the diagram.
At minimum, this is just the name of the object, for example 'line' or 'circle'.
If the object is defined in terms of points which have been labelled, those will be used: "triangle through A, B, C" for example.

The object's colour and drawing style will also be described, for example "gray dotted line segment through A, B".

The text descriptions are designed not to reveal any information which is not visually obvious.
If you add the `verbose` modifier to an object, information such as coordinates and angles will be used to provide a more precise description of the object.

While these descriptions can give a rough idea of the contents of a diagram, information such as relative positions or implicit meanings of objects will be missing.
You can manually set the description for an object with the `description` function.
For example, a circle inscribed in a square will just be described as "circle"; "circle inscribed in square A B C D" would be a more helpful description.

### Colours

Eukleides provides a variety of colour schemes which have been designed to maximise accessibility, considering colour vision deficiency and other vision impairments.
Most of these colour schemes are drawn from [ColorBrewer](http://colorbrewer2.org/).

The variables `color1` to `color6` are assigned to a set of colours which should be easily distinguishable by almost all sighted people, including those with colour vision deficiency.

The functions `qualitative_color_scheme`, `sequential_color_scheme` and `divergent_color_scheme` return lists of colours designed for different uses:

* A qualitative colour scheme is suitable for objects belonging to different categories.
* A sequential colour scheme is suitable for objects which can be mapped onto some linear scale.
* A divergent colour scheme is suitable for objects which can be mapped onto a scale with a "medium" and two different end points.

You can select other colours with the `color()` modifier, which accepts any colour specification accepted by CSS, such as hexadecimal format, RGB or HSL.
You should not use other colours without considering contrast and CVD.
The [WebAIM link constrast checker](https://webaim.org/resources/linkcontrastchecker/) is a good first port of call to check whether a pair of colours can be easily distinguished against each other and the background.

It's a good idea to use aspects other than colour, such as the `dotted` and `dashed` modifiers, to distinguish objects.

## Animation and interactivity

Eukleiedes diagrams can be made dynamic in several ways.

The variable `time` represents the number of seconds since the diagram was created.
Diagrams which contain references to `time` are continually redrawn with updated values for `time`.

The variables `mousex` and `mousey` represent the position of the mouse cursor, or the position of the last touch on touchscreen devices, in diagram coordinates.
When the mouse moves, the diagram is redrawn with update values of these variables.

A point on the diagram can be made draggable by applying the modifier `draggable()` to it when drawing it.
Any other free variables in the diagram are interpreted as free parameters, and given the initial value of `0`.
You can explicitly give initial values for free variables in a dictionary as the last argument to the `eukleides` function.

When the user moves a draggable point, the system tries to position it as close as possible to the mouse by changing the values of the free variables.
It does this by repeatedly picking values for the variables, redrawing the diagram, and measuring the distance between the drawn point and the cursor.
A gradient descent algorithm homes in on the best solution within a few iterations.

The great advantage of this system is that you don't need to explicitly provide a mapping between target coordinates and the free variables in your diagram.
The algorithm will find a solution, even if the position of the dragged point is calculated indirectly.

**Note:** The solver algorithm assumes that draggable points move continuously, so will fail if the point's position can only take discrete values.
A workaround is to have a draggable point which can move continuously, and a second non-interactive point which takes the position you really want.

By default, moving a draggable point can affect any of the free variables in a diagram. 
You can give the `draggable` function an optional list of variable names that it's allowed to affect.

## Function reference


