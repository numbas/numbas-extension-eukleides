NUMBAS_RUNTIME_PATH=../dev
BABEL=node_modules/.bin/babel

dist: dist_dir dist/eukleides.js dist/demo.js

dist_dir:
	@mkdir -p dist

dist/eukleides.js: eukleides.babel.js extension.js
	cat $^ > $@

dist/demo.js: demo.js
	$(BABEL) $< > $@

eukleides.babel.js: eukleides.js
	@echo "(function() {\nvar exports = {};\n" > $@
	$(BABEL) $< >> $@
	@echo "window.eukleides = exports;\n})();\n" >> $@

extension.js: numbas

numbas: jme-runtime.js locales.js

jme-runtime.js: $(NUMBAS_RUNTIME_PATH)/tests/jme-runtime.js
	cp $< $@

locales.js: $(NUMBAS_RUNTIME_PATH)/tests/locales.js
	cp $< $@
