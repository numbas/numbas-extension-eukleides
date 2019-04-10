import * as euk from './eukleides.js';
window.eukleides = euk;

const nice_type_names = {
    'eukleides_angle': 'angle',
    'eukleides_point': 'point',
    'eukleides_line': 'line',
    'eukleides_point_set': 'polygon',
    'eukleides_circle': 'circle',
    'eukleides_conic': 'conic',
    'eukleides_drawing': 'drawing',
    'eukleides_label': 'label',
    'eukleides_angle_label': 'angle label'
}

function nice_type_name(name) {
    return nice_type_names[name] || name;
}

function desc_sig(sig) {
	switch(sig.kind) {
		case 'anything': 
            return ['anything'];
        case 'type':
            return [`<code>${nice_type_name(sig.type)}</code>`];
		case 'multiple': 
            return ['multiple '+desc_sig(sig.signature)];
		case 'optional': 
            return ['['+desc_sig(sig.signature)+']'];
    	case 'sequence': 
            return Array.prototype.concat.apply([],sig.signatures.map(desc_sig));
		case 'list':
            return ['<code>list</code> of '+sig.signatures.map(desc_sig)];
		case 'dict':
            return ['<code>dict</code> of '+desc_sig(sig.signature)];
		case 'or':
            return sig.signatures.map(s=>{
                let d = desc_sig(s);
                if(s.kind!='type' && s.kind!='anything') {
                    d = `(${d})`;
                }
                return d;
            }).join(' or ');
	}
}

function describe_definitions(fns) {
    return fns.map(fn=>{
        const intype = desc_sig(fn.intype).join(',  ');
        const outtype = nice_type_name(fn.outtype);
        const description = fn.description ? `<p class="description">${fn.description}</p>` : '';
        return `<li>${intype} → <code>${outtype}</code>${description}</li>`;
    }).join('\n');
}

Numbas.queueScript('base',[], function() {});

Numbas.runImmediately(['jme'],function() {
});



Numbas.queueScript('base',[],function(){});

Numbas.queueScript('demo',['extensions/eukleides/eukleides.js'],function() {
    var s = window.s = new Numbas.jme.Scope([Numbas.jme.builtinScope, Numbas.extensions.eukleides.scope]);


    let fn_html = '';
    Object.entries(Numbas.extensions.eukleides.scope.allFunctions()).sort().map(([name,fns])=>{
        fn_html += `<dt>${name}</dt>\n<dd><ul>${describe_definitions(fns)}</ul></dd>\n`;
    })
    document.getElementById('function-definitions').innerHTML = fn_html;

    const code = document.getElementById('code');
    const output = document.getElementById('output');
    const error_display = document.getElementById('error');

    let mx = 0, my = 0;
    let error = false;

    function show_diagram(script) {
        var svg_diagram = s.evaluate(script);
        var svg = svg_diagram.value[0];
        output.innerHTML = '';
        output.appendChild(svg);
        svg.addEventListener('mousemove',function(e) {
            const r = svg.getBoundingClientRect();
            const sx = e.clientX - r.x;
            const sy = e.clientY - r.y;
        });
    }

    var remake = window.remake = function() {
        console.clear();
        const script = code.value;
        try {
            error = false;
            document.body.classList.remove('error');
            show_diagram(script);
        } catch(e) {
            error = true;
            document.body.classList.add('error');
            error_display.innerHTML = e.message;
            console.error(e);
        }
    }

    code.addEventListener('input',remake);
//    output.addEventListener('click',remake);
    remake();

});
