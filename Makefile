NUMBAS_RUNTIME_PATH=../dev
BABEL=node_modules/.bin/babel
make_current_dir=@mkdir -p $(@D)

dist: dist/eukleides.js dist/demo.js dist/playground.js

dist/eukleides.js: dist/eukleides.babel.js extension.js
	$(make_current_dir)
	cat $^ > $@

dist/demo.js: demo.js
	$(make_current_dir)
	$(BABEL) $< > $@

dist/playground.js: playground.js
	$(make_current_dir)
	$(BABEL) $< > $@

dist/eukleides.babel.js: eukleides.js
	$(make_current_dir)
	@echo "(function() {var exports = {};" > $@
	$(BABEL) $< >> $@
	@echo "window.eukleides = exports;})();" >> $@

extension.js: numbas

numbas: lib/jme-runtime.js lib/locales.js

lib/jme-runtime.js: $(NUMBAS_RUNTIME_PATH)/tests/jme-runtime.js
	$(make_current_dir)
	cp $< $@

lib/locales.js: $(NUMBAS_RUNTIME_PATH)/tests/locales.js
	$(make_current_dir)
	cp $< $@
