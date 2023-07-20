# Eukleides extension for Numbas

This extension for Numbas contains a port of the [Eukleides geometrical drawing language](http://eukleides.org/) by Christian Obrecht, with extensions to make diagrams interactive and accessibility improvements.

# Using this extension

This extension is available on [the public Numbas editor at numbas.mathcentre.ac.uk](https://numbas.mathcentre.ac.uk/).

To use this extension with your own instance of the editor, you only need the file `dist/eukleides.js`.

## Documentation 

There's [documentation on how the extension works and a full function reference](docs/index.md).

See the [demo page](demo.html) for a gallery of examples, and the [interactive playground](playground.html) to draw your own diagrams.

## Development

The extension is written using ES6 syntax and features. This is compiled with [babeljs](https://babeljs.io/) to ES5, which is supported by lots more browsers.

[dev_demo.html](dev_demo.html) and [dev_playground.html](dev_playground.html) load the source scripts directly, on browsers which support ES6.

To install the babeljs tools, first install [nodejs](https://nodejs.org/en/) and then run:

```
npm install
```

Then, when you make a change to the source, run

```
make
```

to compile the scripts in the `dist` folder.

You might need to set the environment variable `NUMBAS_RUNTIME_PATH` to the location of your [Numbas compiler](https://github.com/numbas/Numbas) directory.

## License

&copy; 2019 Christian Lawson-Perfect for Newcastle University.

The original Eukleides is &copy; 2004-2010 Christian Obrecht.

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 3 of the License, or (at your
option) any later version.

Some code is taken from [g9](https://github.com/bijection/g9), and used under the terms of the MIT license.

Data from [ColorBrewer2](https://github.com/axismaps/colorbrewer/) is used under the terms of the Apache 2.0 license.
