#!/usr/bin/env node
"use strict";
function require( path ){ return $node[ path ] };

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS Units
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    /**
     * CSS Functions
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Create record of CSS variables. */
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Theme css variables
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
     */
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
        'hue',
        'hue_spread',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\nbody, :where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_style_attach( '$mol_theme_lights', `:root { --mol_theme_back: oklch( ${ $$.$mol_lights() ? 92 : 20 }% .01 var(--mol_theme_hue) ) }` )
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Gap in CSS
     * @see https://page.hyoo.ru/#!=msdb74_bm7nsq
     */
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'emoji',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_emoji: .5rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    /**
     * JSX adapter that makes DOM tree.
     * Generates global unique ids for every DOM-element by components tree with ids.
     * Ensures all local ids are unique.
     * Can reuse an existing nodes by GUIDs when used inside [`mol_jsx_attach`](https://github.com/hyoo-ru/mam_mol/tree/master/jsx/attach).
     */
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-inline-start': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_object2 {
        task;
        static _promise = null;
        static get promise() {
            if (this._promise)
                return this._promise;
            return this._promise = new Promise(done => {
                const complete = () => {
                    this._promise = null;
                    done();
                };
                if (typeof requestAnimationFrame === 'function') {
                    requestAnimationFrame(complete);
                }
                else {
                    setTimeout(complete, 16);
                }
            });
        }
        cancelled = false;
        promise;
        constructor(task) {
            super();
            this.task = task;
            this.promise = $mol_after_frame.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_log3_web_make(level, color) {
        return function $mol_log3_logger(event) {
            const pending = this.$mol_log3_stack.pop();
            if (pending)
                pending();
            let tpl = '%c';
            const chunks = Object.entries(event);
            for (let i = 0; i < chunks.length; ++i) {
                tpl += (typeof chunks[i][1] === 'string') ? '%s: %s\n' : '%s: %o\n';
            }
            const style = `color:${color};font-weight:bolder`;
            this.console[level](tpl.trim(), style, ...[].concat(...chunks));
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_web_make = $mol_log3_web_make;
    $.$mol_log3_come = $mol_log3_web_make('info', 'royalblue');
    $.$mol_log3_done = $mol_log3_web_make('info', 'forestgreen');
    $.$mol_log3_fail = $mol_log3_web_make('error', 'orangered');
    $.$mol_log3_warn = $mol_log3_web_make('warn', 'goldenrod');
    $.$mol_log3_rise = $mol_log3_web_make('log', 'magenta');
    $.$mol_log3_area = $mol_log3_web_make('group', 'cyan');
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let error;
    let result;
    let handler;
    /// Debugger will stop at exceptions but exception will be returned normally
    function $mol_try_web(handler2) {
        handler = handler2;
        error = undefined;
        result = undefined;
        self.dispatchEvent(new Event('$mol_try'));
        const error2 = error;
        const result2 = result;
        error = undefined;
        result = undefined;
        return error2 || result2;
    }
    $.$mol_try_web = $mol_try_web;
    $.$mol_try = $mol_try_web;
    self.addEventListener('$mol_try', (event) => {
        result = handler();
    }, true);
    self.addEventListener('error', (event) => {
        error = event.error;
    }, true);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            this.resizes();
            return {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
        static resizes(next) { return next; }
    }
    __decorate([
        $mol_mem
    ], $mol_window, "size", null);
    __decorate([
        $mol_mem
    ], $mol_window, "resizes", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', event => $mol_window.resizes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
    * Key names code for hotkey
    * @see [mol_hotkey](../../hotkey/hotkey.view.ts)
    */
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if ($mol_dom_context.document) {
        function focus(event) {
            const target = event.target;
            if (target?.shadowRoot)
                watch(target.shadowRoot);
            $mol_view_selection.focused($mol_maybe(target), 'notify');
        }
        function watch(root) {
            root.removeEventListener('focus', focus, true);
            root.addEventListener('focus', focus, true);
        }
        watch($mol_dom_context.document);
        $mol_dom.document.addEventListener('keydown', event => {
            if (!event.altKey)
                return;
            const self = $mol_view_selection.focused()[0];
            if (!self)
                return;
            switch (event.keyCode) {
                case $mol_keyboard_code.down:
                    var vert = 1, hor = 0;
                    break;
                case $mol_keyboard_code.up:
                    var vert = -1, hor = 0;
                    break;
                case $mol_keyboard_code.left:
                    var hor = -1, vert = 0;
                    break;
                case $mol_keyboard_code.right:
                    var hor = 1, vert = 0;
                    break;
                default: return;
            }
            event.preventDefault();
            const self_rect = self.getBoundingClientRect();
            const center_hor = (self_rect.left + self_rect.right) / 2;
            const center_vert = (self_rect.top + self_rect.bottom) / 2;
            const all = [...$mol_dom.document.querySelectorAll(':where( [role="button"], [role="checkbox"], input, button, a ):not([disabled])')]
                .map(el => {
                const rect = el.getBoundingClientRect();
                const dist = (Math.max(0, center_hor - rect.right) + Math.max(0, rect.left - center_hor)) * vert * vert
                    + (Math.max(0, center_vert - rect.bottom) + Math.max(0, rect.top - center_vert)) * hor * hor;
                return [el, rect, dist];
            })
                .filter(([el, rect]) => {
                if (el === self)
                    return false;
                if (vert > 0 && rect.top < self_rect.bottom)
                    return false;
                if (vert < 0 && rect.bottom > self_rect.top)
                    return false;
                if (hor > 0 && rect.left < self_rect.right)
                    return false;
                if (hor < 0 && rect.right > self_rect.left)
                    return false;
                return true;
            })
                .sort(([, one, dist1], [, two, dist2]) => {
                return (dist1 - dist2) || ((one.top - two.top) * vert + (one.left - two.left) * hor);
            });
            const target = all[0]?.[0];
            target?.focus();
        });
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this ?? fun))
                    return store.get(this ?? fun);
                const val = task.call(this, next) ?? next;
                store.set(this ?? fun, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Real-time refresh current atom.
     * Don't use if possible. May reduce performance.
     */
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "@view-transition {\n\tnavigation: auto;\n}\n\n[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n\t/* text-wrap-style: pretty; dont work in textarea */\n\tunicode-bidi: plaintext\n}\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\t/*overscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    /**
     * The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions.
     * @see https://mol.hyoo.ru/#!section=docs/=vv2nig_s5zr0f
     */
    /// Reactive statefull lazy ViewModel
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        /// Name of element that created when element not found in DOM
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        /// NameSpace of element that created when element not found in DOM
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        /// Raw child views
        sub() {
            return [];
        }
        /// Visible sub views with defined ambient context
        /// Render all by default
        sub_visible() {
            return this.sub();
        }
        /// Minimal width that used for lazy rendering
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        /// Minimal height that used for lazy rendering
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null; // don't touch DOM to prevent instant reflow
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom }; // pick to optimize compare
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        /** Deep search view by predicate. */
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        /** Renders path of views to DOM. */
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        /** Renders view to DOM and scroll to it. */
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            // new this.$.$mol_after_frame( ()=> {
            // 	this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' })
            // } )
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_dom_context.document?.addEventListener('DOMContentLoaded', () => $mol_view.auto(), { once: true });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Plugin is component without its own DOM element, but instead uses the owner DOM element */
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media' || key === '@container') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * CSS in TS.
     * Statically typed CSS style sheets. Following samples show which CSS code are generated from TS code.
     * @see https://mol.hyoo.ru/#!section=docs/=xwq9q5_f966fg
     */
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Scrolling pane.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_scroll_demo
         */
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                // basis: 0,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    // transform: 'translateZ(0)', // enforce gpu scroll in all agents
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2) = class $mol_book2 extends ($.$mol_scroll) {
		pages_deep(){
			return [];
		}
		pages(){
			return (this.pages_deep());
		}
		Placeholder(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		placeholders(){
			return [(this.Placeholder())];
		}
		menu_title(){
			return "";
		}
		sub(){
			return [...(this.pages()), ...(this.placeholders())];
		}
		minimal_width(){
			return 0;
		}
		Gap(id){
			const obj = new this.$.$mol_view();
			(obj.title) = () => ("");
			return obj;
		}
	};
	($mol_mem(($.$mol_book2.prototype), "Placeholder"));
	($mol_mem_key(($.$mol_book2.prototype), "Gap"));


;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Z-index values for layers
     * https://page.hyoo.ru/#!=xthcpx_wqmiba
     */
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Root component for adaptivity to various screen sizes. Implements booklet UX.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_demo
         */
        class $mol_book2 extends $.$mol_book2 {
            pages_deep() {
                let result = [];
                for (const subpage of this.pages()) {
                    if (subpage instanceof $mol_book2)
                        result = [...result, ...subpage.pages_deep()];
                    else
                        result.push(subpage);
                }
                return result;
            }
            title() {
                return this.pages_deep().map(page => {
                    try {
                        return page?.title();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                    }
                }).reverse().filter(Boolean).join(' | ');
            }
            menu_title() {
                return this.pages_deep()[0]?.title() || this.title();
            }
            sub() {
                const placeholders = this.placeholders();
                const next = this.pages_deep().filter(Boolean);
                const prev = $mol_mem_cached(() => this.sub())?.filter(page => !placeholders.includes(page)) ?? [];
                for (let i = 1; i; ++i) {
                    const p = prev[prev.length - i];
                    const n = next[next.length - i];
                    if (!n)
                        break;
                    if (p === n)
                        continue;
                    new this.$.$mol_after_tick(() => {
                        const b = this.dom_node();
                        const p = n.dom_node();
                        b.scroll({
                            left: p.offsetLeft + p.offsetWidth - b.offsetWidth,
                            behavior: 'smooth',
                        });
                        // new this.$.$mol_after_timeout( 1000, ()=> n.bring() )
                    });
                    break;
                }
                return [...next, ...placeholders];
            }
            bring() {
                const pages = this.pages_deep();
                if (pages.length)
                    pages[pages.length - 1].bring();
                else
                    super.bring();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "pages_deep", null);
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "sub", null);
        $$.$mol_book2 = $mol_book2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/book2.view.css", "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\tscroll-snap-type: x mandatory;\n\t/* padding: 0 1px;\n\tscroll-padding: 0 1px;\n\tgap: 1px; */\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_field);\n}\n\n[mol_book2] > *:not(:first-of-type):before,\n[mol_book2] > *:not(:last-of-type)::after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 1.5rem;\n\twidth: 3px;\n\theight: 1rem;\n\tbackground: linear-gradient(\n\t\tto bottom,\n\t\tvar(--mol_theme_special) 0%,\n\t\tvar(--mol_theme_special) 14%,\n\t\ttransparent 15%,\n\t\ttransparent 42%,\n\t\tvar(--mol_theme_special) 43%,\n\t\tvar(--mol_theme_special) 57%,\n\t\ttransparent 58%,\n\t\ttransparent 85%,\n\t\tvar(--mol_theme_special) 86%,\n\t\tvar(--mol_theme_special) 100%\n\t);\n\topacity: .5;\n\tz-index: var(--mol_layer_speck);\n}\n[mol_book2] > *:not(:first-of-type):before {\n\tleft: -3px;\n}\n[mol_book2] > *:not(:last-of-type)::after {\n\tright: -3px;\n}\n\n:where([mol_book2]) > * {\n\tbackground-color: var(--mol_theme_card);\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_back); */\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\tbackground: none;\n}\n\n[mol_book2_gap] {\n\tbackground: none;\n\tflex-grow: 1;\n\tscroll-snap-align: none;\n\tmargin-inline-end: -1px;\n\tbox-shadow: none;\n}\n\n[mol_book2_gap]::before,\n[mol_book2_gap]::after {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_ghost) = class $mol_ghost extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$mol_ghost.prototype), "Sub"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Mixin view logic to DOM node of another component.
         */
        class $mol_ghost extends $.$mol_ghost {
            dom_node_external(next) {
                return this.Sub().dom_node(next);
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		transform(){
			return "";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		align(){
			return [-.5, -.5];
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Marker on top of another component with tracking of its position.
         */
        class $mol_follower extends $.$mol_follower {
            pos() {
                const self_rect = this.view_rect();
                const prev = $mol_wire_probe(() => this.pos());
                const anchor_rect = this.Anchor()?.view_rect();
                if (!anchor_rect)
                    return null;
                const offset = this.offset();
                const align = this.align();
                const left = Math.floor((prev?.left ?? 0)
                    - (self_rect?.left ?? 0)
                    + (self_rect?.width ?? 0) * align[0]
                    + (anchor_rect?.left ?? 0)
                    + offset[0] * (anchor_rect?.width ?? 0));
                const top = Math.floor((prev?.top ?? 0)
                    - (self_rect?.top ?? 0)
                    + (self_rect?.height ?? 0) * align[1]
                    + (anchor_rect?.top ?? 0)
                    + offset[1] * (anchor_rect?.height ?? 0));
                return { left, top };
            }
            transform() {
                const pos = this.pos();
                if (!pos)
                    return 'scale(0)';
                const { left, top } = pos;
                return `translate( ${left}px, ${top}px )`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "pos", null);
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "transform", null);
        $$.$mol_follower = $mol_follower;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/follower/follower.view.css", "[mol_follower] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		align(){
			return "bottom_center";
		}
		bubble(){
			return null;
		}
		Anchor(){
			return null;
		}
		bubble_offset(){
			return [0, 1];
		}
		bubble_align(){
			return [0, 0];
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.content) = () => ((this.bubble_content()));
			(obj.height_max) = () => ((this.height_max()));
			return obj;
		}
		Follower(){
			const obj = new this.$.$mol_follower();
			(obj.offset) = () => ((this.bubble_offset()));
			(obj.align) = () => ((this.bubble_align()));
			(obj.Anchor) = () => ((this.Anchor()));
			(obj.Sub) = () => ((this.Bubble()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		direction(){
			return "ltr";
		}
		align_enriched(){
			return (this.align());
		}
		prefer(){
			return "vert";
		}
		auto(){
			return [(this.bubble())];
		}
		sub(){
			return [(this.Anchor())];
		}
		sub_visible(){
			return [(this.Anchor()), (this.Follower())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "Follower"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		sub(){
			return (this.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"popover": "manual"
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        /** Is storage a long term. */
        static persisted(next) {
            return false;
        }
        /** Total storage quota in bytes. */
        static total() {
            return 0;
        }
        /** Total storage usage in bytes. */
        static used() {
            return 0;
        }
        /** Minimum available free space in bytes. */
        static free() {
            return this.total() - this.used();
        }
        /** Fulfillness of storage. */
        static portion() {
            const total = this.total();
            if (!total)
                return 1;
            return this.used() / total;
        }
        /**
         * Fulfillness logarithmic level.
         * `0` - empty
         * `1` - half free
         * `2` - quart free
         * `Infinity` - fulfilled
         */
        static level() {
            return Math.floor(-Math.log2(1 - this.portion()));
        }
    }
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_user_async() {
        return new Promise(done => $mol_dom.addEventListener('click', function onclick() {
            $mol_dom.removeEventListener('click', onclick);
            done(null);
        }));
    }
    $.$mol_wait_user_async = $mol_wait_user_async;
    function $mol_wait_user() {
        return this.$mol_wire_sync(this).$mol_wait_user_async();
    }
    $.$mol_wait_user = $mol_wait_user;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage_web extends $mol_storage {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                this.$.$mol_wait_user_async()
                    .then(() => native.persist())
                    .then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            $mol_state_time.now(1000);
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static total() {
            return this.estimate().quota ?? 0;
        }
        static used() {
            return this.estimate().usage ?? 0;
        }
        static free() {
            const { usage = 0, quota = 0 } = this.estimate();
            return quota - usage;
        }
        static portion() {
            const { usage = 0, quota = 0 } = this.estimate();
            if (!quota)
                return 1;
            return usage / quota;
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage_web, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage_web, "persisted", null);
    __decorate([
        $mol_mem
    ], $mol_storage_web, "estimate", null);
    $.$mol_storage_web = $mol_storage_web;
    $.$mol_storage = $.$mol_storage_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => $.$mol_state_local.changes(event));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_rest_code;
    (function ($mol_rest_code) {
        $mol_rest_code[$mol_rest_code["Continue"] = 100] = "Continue";
        $mol_rest_code[$mol_rest_code["Switching protocols"] = 101] = "Switching protocols";
        $mol_rest_code[$mol_rest_code["Processing"] = 102] = "Processing";
        $mol_rest_code[$mol_rest_code["OK"] = 200] = "OK";
        $mol_rest_code[$mol_rest_code["Created"] = 201] = "Created";
        $mol_rest_code[$mol_rest_code["Accepted"] = 202] = "Accepted";
        $mol_rest_code[$mol_rest_code["Non-Authoritative Information"] = 203] = "Non-Authoritative Information";
        $mol_rest_code[$mol_rest_code["No Content"] = 204] = "No Content";
        $mol_rest_code[$mol_rest_code["Reset Content"] = 205] = "Reset Content";
        $mol_rest_code[$mol_rest_code["Partial Content"] = 206] = "Partial Content";
        $mol_rest_code[$mol_rest_code["Multi Status"] = 207] = "Multi Status";
        $mol_rest_code[$mol_rest_code["Already Reported"] = 208] = "Already Reported";
        $mol_rest_code[$mol_rest_code["IM Used"] = 226] = "IM Used";
        $mol_rest_code[$mol_rest_code["Multiple Choices"] = 300] = "Multiple Choices";
        $mol_rest_code[$mol_rest_code["Moved Permanently"] = 301] = "Moved Permanently";
        $mol_rest_code[$mol_rest_code["Found"] = 302] = "Found";
        $mol_rest_code[$mol_rest_code["See Other"] = 303] = "See Other";
        $mol_rest_code[$mol_rest_code["Not Modified"] = 304] = "Not Modified";
        $mol_rest_code[$mol_rest_code["Use Proxy"] = 305] = "Use Proxy";
        $mol_rest_code[$mol_rest_code["Temporary Redirect"] = 307] = "Temporary Redirect";
        $mol_rest_code[$mol_rest_code["Bad Request"] = 400] = "Bad Request";
        $mol_rest_code[$mol_rest_code["Unauthorized"] = 401] = "Unauthorized";
        $mol_rest_code[$mol_rest_code["Payment Required"] = 402] = "Payment Required";
        $mol_rest_code[$mol_rest_code["Forbidden"] = 403] = "Forbidden";
        $mol_rest_code[$mol_rest_code["Not Found"] = 404] = "Not Found";
        $mol_rest_code[$mol_rest_code["Method Not Allowed"] = 405] = "Method Not Allowed";
        $mol_rest_code[$mol_rest_code["Not Acceptable"] = 406] = "Not Acceptable";
        $mol_rest_code[$mol_rest_code["Proxy Authentication Required"] = 407] = "Proxy Authentication Required";
        $mol_rest_code[$mol_rest_code["Request Timeout"] = 408] = "Request Timeout";
        $mol_rest_code[$mol_rest_code["Conflict"] = 409] = "Conflict";
        $mol_rest_code[$mol_rest_code["Gone"] = 410] = "Gone";
        $mol_rest_code[$mol_rest_code["Length Required"] = 411] = "Length Required";
        $mol_rest_code[$mol_rest_code["Precondition Failed"] = 412] = "Precondition Failed";
        $mol_rest_code[$mol_rest_code["Request Entity Too Large"] = 413] = "Request Entity Too Large";
        $mol_rest_code[$mol_rest_code["Request URI Too Long"] = 414] = "Request URI Too Long";
        $mol_rest_code[$mol_rest_code["Unsupported Media Type"] = 415] = "Unsupported Media Type";
        $mol_rest_code[$mol_rest_code["Requested Range Not Satisfiable"] = 416] = "Requested Range Not Satisfiable";
        $mol_rest_code[$mol_rest_code["Expectation Failed"] = 417] = "Expectation Failed";
        $mol_rest_code[$mol_rest_code["Teapot"] = 418] = "Teapot";
        $mol_rest_code[$mol_rest_code["Unprocessable Entity"] = 422] = "Unprocessable Entity";
        $mol_rest_code[$mol_rest_code["Locked"] = 423] = "Locked";
        $mol_rest_code[$mol_rest_code["Failed Dependency"] = 424] = "Failed Dependency";
        $mol_rest_code[$mol_rest_code["Upgrade Required"] = 426] = "Upgrade Required";
        $mol_rest_code[$mol_rest_code["Precondition Required"] = 428] = "Precondition Required";
        $mol_rest_code[$mol_rest_code["Too Many Requests"] = 429] = "Too Many Requests";
        $mol_rest_code[$mol_rest_code["Request Header Fields Too Large"] = 431] = "Request Header Fields Too Large";
        $mol_rest_code[$mol_rest_code["Unavailable For Legal Reasons"] = 451] = "Unavailable For Legal Reasons";
        $mol_rest_code[$mol_rest_code["Internal Server Error"] = 500] = "Internal Server Error";
        $mol_rest_code[$mol_rest_code["Not Implemented"] = 501] = "Not Implemented";
        $mol_rest_code[$mol_rest_code["Bad Gateway"] = 502] = "Bad Gateway";
        $mol_rest_code[$mol_rest_code["Service Unavailable"] = 503] = "Service Unavailable";
        $mol_rest_code[$mol_rest_code["Gateway Timeout"] = 504] = "Gateway Timeout";
        $mol_rest_code[$mol_rest_code["HTTP Version Not Supported"] = 505] = "HTTP Version Not Supported";
        $mol_rest_code[$mol_rest_code["Insufficient Storage"] = 507] = "Insufficient Storage";
        $mol_rest_code[$mol_rest_code["Loop Detected"] = 508] = "Loop Detected";
        $mol_rest_code[$mol_rest_code["Not Extended"] = 510] = "Not Extended";
        $mol_rest_code[$mol_rest_code["Network Authentication Required"] = 511] = "Network Authentication Required";
        $mol_rest_code[$mol_rest_code["Network Read Timeout Error"] = 598] = "Network Read Timeout Error";
        $mol_rest_code[$mol_rest_code["Network Connect Timeout Error"] = 599] = "Network Connect Timeout Error";
    })($mol_rest_code = $.$mol_rest_code || ($.$mol_rest_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function pass(data) {
        return data;
    }
    function $mol_error_fence(task, fallback, loading = pass) {
        try {
            return task();
        }
        catch (error) {
            let normalized;
            try {
                normalized = $mol_promise_like(error) ? loading(error) : fallback(error);
            }
            catch (sub_error) {
                normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(sub_error.message, { error }, sub_error);
            }
            if (normalized instanceof Error || $mol_promise_like(normalized)) {
                $mol_fail_hidden(normalized);
            }
            return normalized;
        }
    }
    $.$mol_error_fence = $mol_error_fence;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_enriched(cause, cb) {
        return $mol_error_fence(cb, e => new $mol_error_mix(e.message, cause, e));
    }
    $.$mol_error_enriched = $mol_error_enriched;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object {
        native;
        request;
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        ok() {
            return this.native.ok;
        }
        message() {
            return $mol_rest_code[this.code()] || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const mime = this.mime() || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).json());
        }
        blob() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).blob());
        }
        buffer() {
            return $mol_error_enriched(this, () => $mol_wire_sync(this.native).arrayBuffer());
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch_request extends $mol_object {
        native;
        response_async() {
            const controller = new AbortController();
            let done = false;
            const request = new Request(this.native, { signal: controller.signal });
            const promise = fetch(request).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    // Abort of done request breaks response parsing
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        response() {
            const native = $mol_error_enriched(this, () => $mol_wire_sync(this).response_async());
            return this.$.$mol_fetch_response.make({
                native,
                request: this
            });
        }
        success() {
            const response = this.response();
            if (response.status() === 'success')
                return response;
            throw new Error(response.message(), { cause: response });
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_request.prototype, "response", null);
    $.$mol_fetch_request = $mol_fetch_request;
    class $mol_fetch extends $mol_object {
        static request(input, init) {
            return this.$.$mol_fetch_request.make({
                native: new Request(input, init)
            });
        }
        static response(input, init) {
            return this.request(input, init).response();
        }
        static success(input, init) {
            return this.request(input, init).success();
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static blob(input, init) {
            return this.success(input, init).blob();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "request", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_webdav extends $mol_file_base {
        static relative(path) {
            return this.absolute(new URL(path, this.base).toString());
        }
        resolve(path) {
            let res = this.path() + '/' + path;
            while (true) {
                let prev = res;
                // foo/../ -> /
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            // http://localhost/.. -> http://localhost
            res = res.replace(/\/\.\.\/?$/, '');
            if (res === this.path())
                return this;
            return this.constructor.absolute(res);
        }
        static headers() { return {}; }
        headers() { return this.constructor.headers(); }
        fetch(init) {
            return this.$.$mol_fetch.success(this.path(), {
                ...init,
                headers: {
                    ...this.headers(),
                    ...init.headers,
                }
            });
        }
        read() {
            try {
                const response = this.fetch({});
                return new Uint8Array(response.buffer());
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return new Uint8Array;
                $mol_fail_hidden(error);
            }
        }
        write(body) { this.fetch({ method: 'PUT', body }); }
        ensure() { this.fetch({ method: 'MKCOL' }); }
        drop() { this.fetch({ method: 'DELETE' }); }
        copy(to) {
            this.fetch({
                method: 'COPY',
                headers: { Destination: to }
            });
        }
        kids() {
            const response = this.fetch({ method: 'PROPFIND' });
            const xml = response.xml();
            const result = [];
            for (const multistatus of xml.childNodes) {
                if (multistatus.nodeName !== 'D:multistatus')
                    continue;
                for (const response of multistatus.childNodes) {
                    let path;
                    if (response.nodeName === 'D:href')
                        path = response.textContent ?? '';
                    if (!path)
                        continue;
                    if (response.nodeName !== 'D:propstat')
                        continue;
                    const stat = webdav_stat(response);
                    const file = this.resolve(path);
                    file.stat(stat, 'virt');
                    result.push(file);
                }
            }
            return result;
        }
        readable(opts) {
            return this.fetch({
                headers: !opts.start ? {} : {
                    'Range': `bytes=${opts.start}-${opts.end ?? ''}`
                }
            }).stream() || $mol_fail(new Error('Not found'));
        }
        info() {
            return this.kids().at(0)?.stat() ?? null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_file_webdav.prototype, "readable", null);
    $.$mol_file_webdav = $mol_file_webdav;
    function webdav_stat(prop_stat) {
        const now = new Date();
        const stat = {
            type: 'file',
            size: 0,
            atime: now,
            mtime: now,
            ctime: now,
        };
        for (const prop of prop_stat.childNodes) {
            if (prop.nodeName !== 'D:prop')
                continue;
            for (const value of prop.childNodes) {
                const name = value.nodeName;
                const text = value.textContent ?? '';
                if (name === 'D:getcontenttype') {
                    stat.type = text.endsWith('directory') ? 'dir' : 'file';
                }
                if (name === 'D:getcontentlength') {
                    stat.size = Number(value.textContent || '0');
                    if (Number.isNaN(stat.size))
                        stat.size = 0;
                }
                if (name === 'D:getlastmodified')
                    stat.mtime = stat.atime = new Date(text);
                if (name === 'D:creationdate')
                    stat.ctime = new Date(text);
            }
        }
        return stat;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_web extends $mol_file_webdav {
        static base = new URL('.', $mol_dom_context.document?.currentScript?.['src'] ?? globalThis.location.href).toString();
        // Вотчер выключен, версия всегда будет одна
        // Если пустая строка - будет считаться, что файла нет
        version() { return '1'; }
        // Ворнинги подавляем, иначе в каждом приложении, загружающим локали, будет ворнинг
        // override watcher() { return { destructor() {} }}
        info() {
            // Директории не поддерживаются
            try {
                const response = this.fetch({ method: 'HEAD' });
                const headers = response.headers();
                let size = Number(headers.get('Content-Length'));
                if (Number.isNaN(size))
                    size = 0;
                const last = headers.get('Last-Modified');
                const mtime = last ? new Date(last) : new Date();
                return {
                    type: 'file',
                    size,
                    mtime,
                    atime: mtime,
                    ctime: mtime,
                };
            }
            catch (error) {
                if (error instanceof Error
                    && error.cause instanceof $mol_fetch_response
                    && error.cause.native.status === 404)
                    return null;
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_file_web = $mol_file_web;
    $.$mol_file = $mol_file_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static langs_rtl() {
            return ['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'ug', 'sd'];
        }
        static direction() {
            const lang = this.lang();
            let direction;
            try {
                direction = new Intl.Locale(lang).getTextInfo().direction;
            }
            catch (e) {
                $mol_fail_log(e);
            }
            return direction ?? (this.langs_rtl().includes(lang) ? 'rtl' : 'ltr');
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "direction", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * `Bubble` that can be shown anchored to `Anchor` element.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo
         */
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Follower()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom);
                if (align === 'top')
                    return rect_bubble.top;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom';
            }
            align_hor() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.left > viewport.width / 2 ? 'left' : 'right';
            }
            direction() { return this.$.$mol_locale.direction(); }
            align_enriched() {
                const align = this.align();
                const rtl = this.direction() === 'rtl';
                const start = rtl ? 'right' : 'left';
                const end = rtl ? 'left' : 'right';
                return align.replace('start', start).replace('end', end);
            }
            bubble_offset() {
                const tags = new Set(this.align_enriched().split('_'));
                if (tags.has('suspense'))
                    return [0, 0];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                if ([...tags][0] === hor) {
                    return [
                        { left: 0, center: .5, right: 1 }[hor],
                        { top: 1, center: .5, bottom: 0 }[vert],
                    ];
                }
                else {
                    return [
                        { left: 1, center: .5, right: 0 }[hor],
                        { top: 0, center: .5, bottom: 1 }[vert],
                    ];
                }
            }
            bubble_align() {
                const tags = new Set(this.align_enriched().split('_'));
                if (tags.has('suspense'))
                    return [-.5, -.5];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                return [
                    { left: -1, center: -.5, right: 0, suspense: -.5 }[hor],
                    { top: -1, center: -.5, bottom: 0, suspense: -.5 }[vert],
                ];
            }
            bubble() {
                if (!this.showed())
                    return;
                this.Bubble().dom_node().showPopover?.();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_offset", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "@keyframes mol_pop_show {\n\tfrom {\n\t\topacity: 0;\n\t}\n}\n\n[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tborder: none;\n\tpadding: 0;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: fixed;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\t/* height: max-content; */\n\tflex-direction: column;\n\tmax-width: 100vw;\n\tmax-height: 80vw;\n\tcontain: paint;\n\ttransition-property: opacity;\n\t/* Safari ios layer fix, https://t.me/mam_mol/170017 */\n\ttransform: translateZ(0);\n\tanimation: mol_pop_show .1s ease-in;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_hotkey2) = class $mol_hotkey2 extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		action(){
			return {};
		}
	};
	($mol_mem(($.$mol_hotkey2.prototype), "keydown"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which adds handlers for keyboard keys.
         * @see [mol_keyboard_code](../keyboard/code/code.ts)
         */
        class $mol_hotkey2 extends $.$mol_hotkey2 {
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                const key = [...new Set([
                        ...(event.ctrlKey || event.metaKey) ? ['ctrl'] : [],
                        ...event.altKey ? ['alt'] : [],
                        ...event.shiftKey ? ['shift'] : [],
                        $mol_keyboard_code[event.keyCode] ?? '?',
                    ])].join('_');
                this.action()[key]?.(event);
            }
        }
        $$.$mol_hotkey2 = $mol_hotkey2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_hotkey2) {
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which adds handlers for keyboard keys.
         * @deprecated Use $mol_hotkey2
         * @see [mol_keyboard_code](../keyboard/code/code.ts)
         */
        class $mol_hotkey extends $.$mol_hotkey {
            action() {
                const prefix = [...new Set([
                        ...this.mod_ctrl() ? ['ctrl_'] : [],
                        ...this.mod_alt() ? ['alt_'] : [],
                        ...this.mod_shift() ? ['shift_'] : [],
                    ])].join('');
                return Object.fromEntries(Object.entries(this.key())
                    .map(([key, val]) => [prefix + key, val]));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_hotkey.prototype, "action", null);
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_nav) = class $mol_nav extends ($.$mol_plugin) {
		event_key(next){
			if(next !== undefined) return next;
			return null;
		}
		cycle(next){
			if(next !== undefined) return next;
			return false;
		}
		mod_ctrl(){
			return false;
		}
		mod_shift(){
			return false;
		}
		mod_alt(){
			return false;
		}
		keys_x(next){
			if(next !== undefined) return next;
			return [];
		}
		keys_y(next){
			if(next !== undefined) return next;
			return [];
		}
		current_x(next){
			if(next !== undefined) return next;
			return null;
		}
		current_y(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_left(next){
			if(next !== undefined) return next;
			return null;
		}
		event_right(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.event_key(next))};
		}
	};
	($mol_mem(($.$mol_nav.prototype), "event_key"));
	($mol_mem(($.$mol_nav.prototype), "cycle"));
	($mol_mem(($.$mol_nav.prototype), "keys_x"));
	($mol_mem(($.$mol_nav.prototype), "keys_y"));
	($mol_mem(($.$mol_nav.prototype), "current_x"));
	($mol_mem(($.$mol_nav.prototype), "current_y"));
	($mol_mem(($.$mol_nav.prototype), "event_up"));
	($mol_mem(($.$mol_nav.prototype), "event_down"));
	($mol_mem(($.$mol_nav.prototype), "event_left"));
	($mol_mem(($.$mol_nav.prototype), "event_right"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin which can navigate in list of items
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_nav_demo
         */
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering single line text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
         */
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                el.value = this.value_changed(el.value);
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            value_changed(next) {
                const el = this.dom_node();
                try {
                    el.setCustomValidity('');
                    return this.value(next);
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    return next ?? $mol_mem_cached(() => this.value_changed()) ?? '';
                }
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "value_changed", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Base SVG component to display SVG images or icons. */
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";


;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";


;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Simple button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    // Calling actions from catch section, if throwing promise breaks idempotency
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor]:where(:not([disabled])) {\n\tcolor: var(--mol_theme_control);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.
         * `mol_list` should contain only components that inherits `mol_view`. You should not place raw strings or numbers in list.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_list_demo
         */
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            _view_window_last = [0, 0];
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? this._view_window_last;
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                // change nothing when already covers all limits
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                // jumps when fully over limits
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                // force recalc min when overlapse top limit
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                // force recalc max when overlapse bottom limit
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                // extend min to cover top limit
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                // extend max to cover bottom limit
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this._view_window_last = this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\t/* will-change: contents; */\n}\n\n[mol_list]:where([mol_view_error]) {\n\tmin-height: 1.5rem;\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    let x = /x/[Symbol.matchAll];
    /** Type safe reguar expression builder */
    class $mol_regexp extends RegExp {
        groups;
        /** Prefer to use $mol_regexp.from */
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        /** Splits string by regexp edges */
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that match any of options */
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        /** Makes regexp that allow absent of this pattern */
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        /** Makes regexp that look ahead for pattern */
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Converts some js values to regexp */
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Output text with dimmed mismatched substrings.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dimmer_demo
         */
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_search) = class $mol_search extends ($.$mol_pop) {
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.clear(next))});
			return obj;
		}
		nav_components(){
			return [];
		}
		nav_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.nav_focused(next)));
			return obj;
		}
		suggests_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_search_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		keyboard(){
			return "search";
		}
		enter(){
			return "search";
		}
		bring(){
			return (this.Query().bring());
		}
		Query(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.keyboard) = () => ((this.keyboard()));
			(obj.enter) = () => ((this.enter()));
			return obj;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_search_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		anchor_content(){
			return [(this.Query()), (this.Clear())];
		}
		menu_items(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_items()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		suggest_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		suggest_label(id){
			return "";
		}
		Suggest_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.suggest_label(id)));
			(obj.needle) = () => ((this.query()));
			return obj;
		}
		suggest_content(id){
			return [(this.Suggest_label(id))];
		}
		suggests(){
			return [];
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Hotkey()), 
				(this.Nav())
			];
		}
		showed(next){
			return (this.suggests_showed(next));
		}
		align_hor(){
			return "right";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.anchor_content()));
			return obj;
		}
		bubble_content(){
			return [(this.Bubble_pane())];
		}
		Suggest(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.suggest_select(id, next)));
			(obj.sub) = () => ((this.suggest_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_search.prototype), "clear"));
	($mol_mem(($.$mol_search.prototype), "Hotkey"));
	($mol_mem(($.$mol_search.prototype), "nav_focused"));
	($mol_mem(($.$mol_search.prototype), "Nav"));
	($mol_mem(($.$mol_search.prototype), "suggests_showed"));
	($mol_mem(($.$mol_search.prototype), "query"));
	($mol_mem(($.$mol_search.prototype), "submit"));
	($mol_mem(($.$mol_search.prototype), "Query"));
	($mol_mem(($.$mol_search.prototype), "Clear_icon"));
	($mol_mem(($.$mol_search.prototype), "Clear"));
	($mol_mem(($.$mol_search.prototype), "Menu"));
	($mol_mem(($.$mol_search.prototype), "Bubble_pane"));
	($mol_mem_key(($.$mol_search.prototype), "suggest_select"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest_label"));
	($mol_mem(($.$mol_search.prototype), "Anchor"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Search input with suggest and clear button.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_search_demo
         */
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: start;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		uri_unsafe(){
			return (this.uri_toggle());
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_unsafe()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** State of arguments like `#foo=bar/xxx` or `?foo=bar&xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static href(next) {
            if (next === undefined) {
                next = $mol_dom.location.href;
            }
            else if (!/^about:srcdoc/.test(next)) {
                new $mol_after_frame(() => {
                    const next = this.href();
                    const prev = $mol_dom.location.href;
                    if (next === prev)
                        return;
                    const history = $mol_dom.history;
                    history.replaceState(history.state, $mol_dom.document.title, next);
                });
            }
            if ($mol_dom.parent && ($mol_dom.parent !== $mol_dom.self)) {
                $mol_dom.parent.postMessage(['hashchange', next], '*');
            }
            return next;
        }
        static href_normal() {
            return this.link({});
        }
        static href_absolute() {
            return new URL(this.href(), $mol_dom.location.href).toString();
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#!?/)[1] || '';
            var chunks = href.split(this.separator);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    break;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : { ...this.dict(), [key]: next };
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link({
                ...this.dict_cut(Object.keys(next)),
                ...next,
            });
        }
        static prolog = '!';
        static separator = '/';
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                const val = next[key];
                chunks.push([key].concat(val ? [val] : []).map(this.encode).join('='));
            }
            return new URL('#' + this.prolog + chunks.join(this.separator), this.href_absolute()).toString();
        }
        static commit() {
            $mol_dom.history.pushState($mol_dom.history.state, $mol_dom.document.title, this.href());
        }
        static go(next) {
            $mol_dom.location.href = this.link(next);
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_absolute", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "make_link", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "commit", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
    function $mol_state_arg_change() {
        $mol_state_arg.href($mol_dom.location.href);
    }
    self.addEventListener('hashchange', $mol_state_arg_change);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_safe_uri(uri) {
        return uri.replace(/^(?=\w+script+:)/, 'about:blank#');
    }
    $.$mol_dom_safe_uri = $mol_dom_safe_uri;
    function $mol_dom_safe_attr(val) {
        return val;
    }
    $.$mol_dom_safe_attr = $mol_dom_safe_attr;
    $.$mol_dom_safe_rules = {
        // defaults
        '': { id: $mol_dom_safe_attr },
        // special
        a: { href: $mol_dom_safe_uri },
        img: { src: $mol_dom_safe_uri },
        object: { src: $mol_dom_safe_uri },
        // blocks
        div: {},
        p: {},
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        blockquote: {},
        pre: {},
        ul: {},
        ol: {},
        li: {},
        details: {},
        section: {},
        summary: {},
        hr: {},
        table: {},
        tr: {},
        td: {},
        // inlines
        span: {},
        strong: {},
        em: {},
        br: {},
        ins: {},
        del: {},
        code: {},
    };
    function $mol_dom_safe(nodes) {
        const res = [];
        for (const node of nodes) {
            if (node.nodeType === node.TEXT_NODE) {
                res.push(node);
                continue;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const kids = this.$mol_dom_safe([...node.childNodes]);
                const allowed = this.$mol_dom_safe_rules[node.localName];
                if (!allowed) {
                    res.push(...kids);
                    continue;
                }
                for (const attr of [...node.attributes]) {
                    const proc = allowed[attr.localName] ?? this.$mol_dom_safe_rules[''][attr.localName];
                    if (proc)
                        attr.nodeValue = proc(attr.nodeValue);
                    else
                        node.removeAttribute(attr.nodeName);
                }
                $mol_dom_render_children(node, kids);
                res.push(node);
                continue;
            }
        }
        return res;
    }
    $.$mol_dom_safe = $mol_dom_safe;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Dynamic hyperlink. It can add, change or remove parameters. A link that leads to the current page has [mol_link_current] attribute set to true.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_link_demo
         */
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    if (error instanceof Error)
                        return '💥' + error.message;
                    return '';
                }
            }
            uri_unsafe() {
                return $mol_dom_safe_uri(super.uri_unsafe());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_page) = class $mol_page extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		Logo(){
			return null;
		}
		title_content(){
			return [(this.Logo()), (this.title())];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (64);
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		body_scroll_top(next){
			return (this.Body().scroll_top(next));
		}
		body(){
			return [];
		}
		Body_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		body_content(){
			return [(this.Body_content())];
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		foot(){
			return [];
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		dom_name(){
			return "article";
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tabindex())};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Body()), 
				(this.Foot())
			];
		}
	};
	($mol_mem(($.$mol_page.prototype), "Title"));
	($mol_mem(($.$mol_page.prototype), "Tools"));
	($mol_mem(($.$mol_page.prototype), "Head"));
	($mol_mem(($.$mol_page.prototype), "Body_content"));
	($mol_mem(($.$mol_page.prototype), "Body"));
	($mol_mem(($.$mol_page.prototype), "Foot"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { hsla, blur } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            // backdropFilter: blur( `3px` ), enforces layering
            // zIndex: 0 ,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 2,
                '@media': {
                    'print': {
                        box: {
                            shadow: [[0, `1px`, 0, 0, hsla(0, 0, 0, .25)]],
                        },
                    },
                },
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 0,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '@media': {
                    'print': {
                        display: 'none',
                    },
                },
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Body_content: {
                padding: $mol_gap.block,
                minHeight: 0,
                minWidth: 0,
                flex: {
                    direction: 'column',
                    shrink: 1,
                    grow: 1,
                },
                justify: {
                    self: 'stretch',
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2_catalog) = class $mol_book2_catalog extends ($.$mol_book2) {
		Menu_title(){
			return (this.Menu().Title());
		}
		menu_title(){
			return "";
		}
		Menu_tools(){
			return (this.Menu().Tools());
		}
		Menu_logo(){
			return null;
		}
		menu_head(){
			return [(this.Menu_title()), (this.Menu_tools())];
		}
		menu_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Menu_filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.menu_filter(next)));
			return obj;
		}
		Menu_links_empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		arg(id){
			return {};
		}
		menu_link_arg(id){
			return (this.arg(id));
		}
		spread_title(id){
			return "";
		}
		Menu_link_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.menu_filter()));
			(obj.haystack) = () => ((this.spread_title(id)));
			return obj;
		}
		menu_link_content(id){
			return [(this.Menu_link_title(id))];
		}
		Menu_link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.menu_link_arg(id)));
			(obj.sub) = () => ((this.menu_link_content(id)));
			return obj;
		}
		menu_item_content(id){
			return [(this.Menu_link(id))];
		}
		Menu_item(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.menu_item_content(id)));
			return obj;
		}
		menu_links(){
			return [(this.Menu_item("0"))];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.Empty) = () => ((this.Menu_links_empty()));
			(obj.rows) = () => ((this.menu_links()));
			return obj;
		}
		menu_body(){
			return [(this.Menu_filter()), (this.Menu_links())];
		}
		menu_foot(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.menu_title()));
			(obj.Logo) = () => ((this.Menu_logo()));
			(obj.tools) = () => ([...(this.menu_tools()), ...(this.addon_tools())]);
			(obj.head) = () => ((this.menu_head()));
			(obj.body) = () => ((this.menu_body()));
			(obj.foot) = () => ((this.menu_foot()));
			return obj;
		}
		spread_close_arg(){
			return {};
		}
		Spread_close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		param(){
			return "";
		}
		spread(next){
			if(next !== undefined) return next;
			return "";
		}
		spreads(){
			return {};
		}
		Spread(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Spread_default(){
			return null;
		}
		spread_ids(){
			return [];
		}
		menu_filter_enabled(){
			return false;
		}
		spread_ids_filtered(){
			return [];
		}
		spread_current(){
			return null;
		}
		menu_tools(){
			return [];
		}
		addon_tools(){
			return [];
		}
		pages(){
			return [(this.Menu())];
		}
		Spread_close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.spread_close_arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_book2_catalog_Spread_close_hint")));
			(obj.sub) = () => ([(this.Spread_close_icon())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_book2_catalog.prototype), "menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links_empty"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link_title"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_item"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close_icon"));
	($mol_mem(($.$mol_book2_catalog.prototype), "spread"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Spread"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close"));


;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Variant of [mol_book2](../book2.view.ts) which draws menu in side bar on opens one of taken spreads.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_catalog_demo
         */
        class $mol_book2_catalog extends $.$mol_book2_catalog {
            spread_current() {
                return this.spread() === '' ? this.Spread_default() : this.Spread(this.spread());
            }
            pages() {
                const spread = this.spread_current();
                return [
                    this.Menu(),
                    ...spread
                        ? spread instanceof $mol_book2
                            ? spread.pages_deep()
                            : [spread]
                        : [],
                ];
            }
            auto() {
                const spread = this.spread_current();
                if (spread instanceof $mol_book2)
                    spread.auto();
                return [];
            }
            spread_ids() {
                return Object.keys(this.spreads());
            }
            menu_body() {
                return [
                    ...this.menu_filter_enabled() ? [this.Menu_filter()] : [],
                    this.Menu_links(),
                ];
            }
            menu_filter_enabled() {
                return this.spread_ids().length >= 10;
            }
            menu_links() {
                return this.spread_ids_filtered()
                    .map(spread => this.Menu_item(spread));
            }
            spread_ids_filtered() {
                return this.spread_ids()
                    .filter($mol_match_text(this.menu_filter(), spread => [this.spread_title(spread)]));
            }
            Spread(id) {
                return this.spreads()[id];
            }
            Spread_default() {
                return this.spreads()[''];
            }
            spread(next) {
                return this.$.$mol_state_arg.value(this.param(), next) ?? '';
            }
            arg(spread) {
                return { [this.param()]: spread || null };
            }
            spread_close_arg() {
                return { [this.param()]: null };
            }
            spread_title(spread) {
                const page = this.Spread(spread);
                return page instanceof $mol_book2
                    && page.menu_title()
                    || page.title()
                    || spread;
            }
            spread_current_book() {
                const spread = this.spread_current();
                return spread instanceof $mol_book2 ? spread : null;
            }
            placeholders() {
                const spread_placeholders = this.spread_current_book()?.placeholders() ?? [];
                return spread_placeholders.length ? spread_placeholders : super.placeholders();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_body", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_links", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "placeholders", null);
        $$.$mol_book2_catalog = $mol_book2_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_book2_catalog, {
            Menu_filter: {
                flex: {
                    shrink: 0,
                    grow: 0,
                },
                alignSelf: 'stretch',
            },
            Menu_item: {
                align: {
                    items: 'flex-start',
                },
            },
            Menu_link: {
                flex: {
                    grow: 1,
                    shrink: 1,
                    wrap: 'wrap',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_keyboard_state) = class $mol_keyboard_state extends ($.$mol_plugin) {
		down(next){
			if(next !== undefined) return next;
			return null;
		}
		up(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {
				...(super.event()), 
				"keydown": (next) => (this.down(next)), 
				"keyup": (next) => (this.up(next))
			};
		}
		key(){
			return {};
		}
	};
	($mol_mem(($.$mol_keyboard_state.prototype), "down"));
	($mol_mem(($.$mol_keyboard_state.prototype), "up"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_keyboard_state extends $.$mol_keyboard_state {
            key() {
                return super.key();
            }
            down(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                const handle = this.key()[name];
                if (handle)
                    handle(true);
            }
            up(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                const handle = this.key()[name];
                if (handle)
                    handle(false);
            }
        }
        $$.$mol_keyboard_state = $mol_keyboard_state;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: start;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Checkbox UI component. See Variants for more concrete implementations.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
         */
        class $mol_check extends $.$mol_check {
            click(next) {
                const event = next ? $mol_dom_event.wrap(next) : null;
                if (event?.prevented())
                    return;
                event?.prevented(true);
                this.checked(!this.checked());
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_check_list) = class $mol_check_list extends ($.$mol_view) {
		option_checked(id, next){
			if(next !== undefined) return next;
			return false;
		}
		option_title(id){
			return "";
		}
		option_label(id){
			return [(this.option_title(id))];
		}
		enabled(){
			return true;
		}
		option_enabled(id){
			return (this.enabled());
		}
		option_hint(id){
			return "";
		}
		items(){
			return [];
		}
		dictionary(){
			return {};
		}
		Option(id){
			const obj = new this.$.$mol_check();
			(obj.checked) = (next) => ((this.option_checked(id, next)));
			(obj.label) = () => ((this.option_label(id)));
			(obj.enabled) = () => ((this.option_enabled(id)));
			(obj.hint) = () => ((this.option_hint(id)));
			(obj.minimal_height) = () => (24);
			return obj;
		}
		options(){
			return {};
		}
		keys(){
			return [];
		}
		sub(){
			return (this.items());
		}
	};
	($mol_mem_key(($.$mol_check_list.prototype), "option_checked"));
	($mol_mem_key(($.$mol_check_list.prototype), "Option"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * List of checkboxes
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_list_demo
         */
        class $mol_check_list extends $.$mol_check_list {
            options() {
                return {};
            }
            dictionary(next) {
                return next ?? {};
            }
            option_checked(id, next) {
                const prev = this.dictionary();
                if (next === undefined)
                    return prev[id] ?? null;
                const next_rec = { ...prev, [id]: next };
                if (next === null)
                    delete next_rec[id];
                return this.dictionary(next_rec)[id] ?? null;
            }
            keys() {
                return Object.keys(this.options());
            }
            items() {
                return this.keys().map(key => this.Option(key));
            }
            option_title(key) {
                return this.options()[key] || key;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_check_list.prototype, "keys", null);
        __decorate([
            $mol_mem
        ], $mol_check_list.prototype, "items", null);
        $$.$mol_check_list = $mol_check_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/list/list.view.css", "[mol_check_list] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\tborder-radius: var(--mol_gap_round);\n\tgap: 1px;\n}\n\n[mol_check_list_option] {\n\tflex: 0 1 auto;\n}\n\n[mol_check_list_option]:where([mol_check_checked=\"true\"]) {\n\ttext-shadow: 0 0;\n\tcolor: var(--mol_theme_current);\n}\n\n[mol_check_list_option]:where([mol_check_checked=\"true\"][disabled]) {\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
	($.$mol_switch) = class $mol_switch extends ($.$mol_check_list) {
		value(next){
			if(next !== undefined) return next;
			return "";
		}
	};
	($mol_mem(($.$mol_switch.prototype), "value"));


;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Buttons which switching the state
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_switch_demo
         */
        class $mol_switch extends $.$mol_switch {
            value(next) {
                return $mol_state_session.value(`${this}.value()`, next) ?? '';
            }
            option_checked(key, next) {
                if (next === undefined)
                    return this.value() == key;
                this.value(next ? key : '');
                return next;
            }
        }
        $$.$mol_switch = $mol_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_tick) = class $mol_icon_tick extends ($.$mol_icon) {
		path(){
			return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
		}
	};


;
"use strict";


;
	($.$mol_check_box) = class $mol_check_box extends ($.$mol_check) {
		Icon(){
			const obj = new this.$.$mol_icon_tick();
			return obj;
		}
	};
	($mol_mem(($.$mol_check_box.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/box/box.view.css", "[mol_check_box_icon] {\n\tborder-radius: var(--mol_gap_round);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n\tcolor: var(--mol_theme_shade);\n\theight: 1rem;\n\talign-self: center;\n}\n\n[mol_check]:not([mol_check_checked]) > [mol_check_box_icon] {\n\tfill: transparent;\n}\n\n[mol_check]:not([disabled]) > [mol_check_box_icon] {\n\tbackground: var(--mol_theme_field);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    const prefix = `#version 300 es
				precision highp float;
				precision highp sampler2D;
				precision highp sampler2DArray;
				precision highp sampler2DShadow;
			`;
    function $bog_gamengine_gl_decl(kind, type, name) {
        const open = type.indexOf('[');
        if (open < 0)
            return `${kind} ${type} ${name};\n`;
        return `${kind} ${type.slice(0, open)} ${name}${type.slice(open)};\n`;
    }
    $.$bog_gamengine_gl_decl = $bog_gamengine_gl_decl;
    function $bog_gamengine_gl_slots(type) {
        switch (type) {
            case 'mat4': return 4;
            case 'mat3': return 3;
            case 'mat2': return 2;
            default: return 1;
        }
    }
    $.$bog_gamengine_gl_slots = $bog_gamengine_gl_slots;
    function $bog_gamengine_gl_source(face, vert, frag) {
        let revert = prefix;
        let refrag = prefix;
        for (const name in face.glob ?? {}) {
            const decl = $bog_gamengine_gl_decl('uniform', face.glob[name], name);
            revert += decl;
            refrag += decl;
        }
        let location = 0;
        for (const name in face.input ?? {}) {
            const type = face.input[name];
            revert += `layout( location = ${location} ) in ${type} ${name};\n`;
            location += $bog_gamengine_gl_slots(type);
        }
        for (const name in face.pipe ?? {}) {
            revert += `out ${face.pipe[name]} ${name};\n`;
            refrag += `in ${face.pipe[name]} ${name};\n`;
        }
        for (const name in face.output ?? {}) {
            refrag += `out ${face.output[name]} ${name};\n`;
        }
        return { vert: revert + vert, frag: refrag + frag };
    }
    $.$bog_gamengine_gl_source = $bog_gamengine_gl_source;
    function $bog_gamengine_gl_shader(gl, type, code) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            return shader;
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(String(log));
    }
    $.$bog_gamengine_gl_shader = $bog_gamengine_gl_shader;
    class $bog_gamengine_gl_program extends Object {
        gl;
        native;
        uniforms = new Map();
        constructor(gl, face, vert, frag) {
            super();
            this.gl = gl;
            const source = $bog_gamengine_gl_source(face, vert, frag);
            const program = gl.createProgram();
            gl.attachShader(program, $bog_gamengine_gl_shader(gl, gl.VERTEX_SHADER, source.vert));
            gl.attachShader(program, $bog_gamengine_gl_shader(gl, gl.FRAGMENT_SHADER, source.frag));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                const log = gl.getProgramInfoLog(program);
                gl.deleteProgram(program);
                throw new Error(String(log));
            }
            this.native = program;
        }
        uniform(name) {
            let location = this.uniforms.get(name);
            if (location === undefined) {
                location = this.gl.getUniformLocation(this.native, name);
                this.uniforms.set(name, location);
            }
            return location;
        }
        attribute(name) {
            const location = this.gl.getAttribLocation(this.native, name);
            return location === -1 ? null : location;
        }
    }
    $.$bog_gamengine_gl_program = $bog_gamengine_gl_program;
    class $bog_gamengine_gl_buffer extends Object {
        gl;
        native;
        constructor(gl, location, size, divisor) {
            super();
            this.gl = gl;
            this.native = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.native);
            if (size === 16) {
                for (let row = 0; row < 4; ++row) {
                    gl.enableVertexAttribArray(location + row);
                    gl.vertexAttribPointer(location + row, 4, gl.FLOAT, false, 64, row * 16);
                    gl.vertexAttribDivisor(location + row, divisor);
                }
            }
            else {
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
                gl.vertexAttribDivisor(location, divisor);
            }
        }
        send(data) {
            const gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.native);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            return data;
        }
        reserve(bytes) {
            const gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.native);
            gl.bufferData(gl.ARRAY_BUFFER, bytes, gl.DYNAMIC_DRAW);
            return bytes;
        }
    }
    $.$bog_gamengine_gl_buffer = $bog_gamengine_gl_buffer;
    function $bog_gamengine_gl_texture_array(gl, images, size, srgb = false) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, srgb ? gl.SRGB8_ALPHA8 : gl.RGBA8, size, size, images.length, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        for (let i = 0; i < images.length; ++i) {
            gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, size, size, 1, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
        }
        const anisotropic = gl.getExtension('EXT_texture_filter_anisotropic');
        if (anisotropic) {
            const max = gl.getParameter(anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            gl.texParameterf(gl.TEXTURE_2D_ARRAY, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max);
        }
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        return texture;
    }
    $.$bog_gamengine_gl_texture_array = $bog_gamengine_gl_texture_array;
    function $bog_gamengine_gl_texture_array_flat(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA8, 1, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([128, 128, 255, 255]));
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        return texture;
    }
    $.$bog_gamengine_gl_texture_array_flat = $bog_gamengine_gl_texture_array_flat;
    class $bog_gamengine_gl_depth_target extends Object {
        gl;
        size;
        native;
        texture;
        constructor(gl, size) {
            super();
            this.gl = gl;
            this.size = size;
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT24, size, size);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.native = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.native);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.texture, 0);
            gl.drawBuffers([gl.NONE]);
            gl.readBuffer(gl.NONE);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            if (status === gl.FRAMEBUFFER_COMPLETE)
                return;
            this.dispose();
            throw new Error(`Depth target is incomplete (${status})`);
        }
        dispose() {
            this.gl.deleteFramebuffer(this.native);
            this.gl.deleteTexture(this.texture);
            return this;
        }
    }
    $.$bog_gamengine_gl_depth_target = $bog_gamengine_gl_depth_target;
    class $bog_gamengine_gl_color_target extends Object {
        gl;
        native = null;
        texture = null;
        depth = null;
        width = 0;
        height = 0;
        float;
        constructor(gl, width, height) {
            super();
            this.gl = gl;
            this.float = !!gl.getExtension('EXT_color_buffer_float');
            this.attach(width, height);
        }
        attach(width, height) {
            const gl = this.gl;
            this.width = Math.max(Math.round(width), 1);
            this.height = Math.max(Math.round(height), 1);
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texStorage2D(gl.TEXTURE_2D, 1, this.float ? gl.RGBA16F : gl.RGBA8, this.width, this.height);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.depth = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, this.width, this.height);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            this.native = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.native);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            if (status === gl.FRAMEBUFFER_COMPLETE)
                return this;
            this.dispose();
            throw new Error(`Color target is incomplete (${status})`);
        }
        resize(width, height) {
            if (this.width === Math.max(Math.round(width), 1) && this.height === Math.max(Math.round(height), 1))
                return this;
            this.dispose();
            return this.attach(width, height);
        }
        dispose() {
            const gl = this.gl;
            if (this.native)
                gl.deleteFramebuffer(this.native);
            if (this.texture)
                gl.deleteTexture(this.texture);
            if (this.depth)
                gl.deleteRenderbuffer(this.depth);
            this.native = null;
            this.texture = null;
            this.depth = null;
            return this;
        }
    }
    $.$bog_gamengine_gl_color_target = $bog_gamengine_gl_color_target;
    function $bog_gamengine_gl_uniform_matrix(gl, location, data) {
        if (!location)
            return data;
        switch (data.length) {
            case 16:
                gl.uniformMatrix4fv(location, false, data);
                break;
            case 9:
                gl.uniformMatrix3fv(location, false, data);
                break;
            case 4:
                gl.uniformMatrix2fv(location, false, data);
                break;
            default: throw new Error(`Wrong matrix data length (${data.length})`);
        }
        return data;
    }
    $.$bog_gamengine_gl_uniform_matrix = $bog_gamengine_gl_uniform_matrix;
    function $bog_gamengine_gl_uniform_vector(gl, location, data) {
        if (!location)
            return data;
        switch (data.length) {
            case 4:
                gl.uniform4fv(location, data);
                break;
            case 3:
                gl.uniform3fv(location, data);
                break;
            case 2:
                gl.uniform2fv(location, data);
                break;
            case 1:
                gl.uniform1fv(location, data);
                break;
            default: throw new Error(`Wrong vector data length (${data.length})`);
        }
        return data;
    }
    $.$bog_gamengine_gl_uniform_vector = $bog_gamengine_gl_uniform_vector;
    function $bog_gamengine_gl_uniform_vec4s(gl, location, data) {
        if (location)
            gl.uniform4fv(location, data);
        return data;
    }
    $.$bog_gamengine_gl_uniform_vec4s = $bog_gamengine_gl_uniform_vec4s;
    function $bog_gamengine_gl_uniform_int(gl, location, value) {
        if (location)
            gl.uniform1i(location, value);
        return value;
    }
    $.$bog_gamengine_gl_uniform_int = $bog_gamengine_gl_uniform_int;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_3d_glsl_both = '';
    $.$mol_3d_glsl_vert = '';
    $.$mol_3d_glsl_frag = '';
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader extends $mol_object2 {
        programs = new WeakMap();
        face() {
            return {};
        }
        vert() {
            return `void main() {}`;
        }
        frag() {
            return `void main() {}`;
        }
        depth() {
            return false;
        }
        sources() {
            return {
                vert: $mol_3d_glsl_both + this.vert(),
                frag: $mol_3d_glsl_both + this.frag(),
            };
        }
        program(gl) {
            let program = this.programs.get(gl);
            if (!program) {
                const sources = this.sources();
                program = new $bog_gamengine_gl_program(gl, this.face(), sources.vert, sources.frag);
                this.programs.set(gl, program);
            }
            return program;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shader.prototype, "sources", null);
    $.$bog_gamengine_shader = $bog_gamengine_shader;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** App tree: `plugins / <= Control mol_keyboard_state key <= key_map`, where `key_map()` in app ts returns `this.Key().keys()` */
    class $bog_gamengine_key extends $mol_object2 {
        bind(next = {}) {
            return next;
        }
        states = new Map();
        pressed(name, next) {
            if (next !== undefined)
                this.states.set(name, next);
            return this.states.get(name) ?? false;
        }
        action(name) {
            const keys = this.bind()[name];
            if (!keys)
                return false;
            for (let i = 0; i < keys.length; ++i)
                if (this.pressed(keys[i]))
                    return true;
            return false;
        }
        axis(neg, pos) {
            return (this.action(pos) ? 1 : 0) - (this.action(neg) ? 1 : 0);
        }
        keys() {
            const keys = {};
            for (const names of Object.values(this.bind())) {
                for (const name of names) {
                    keys[name] = (state) => this.pressed(name, state);
                }
            }
            return keys;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_key.prototype, "bind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_key.prototype, "keys", null);
    $.$bog_gamengine_key = $bog_gamengine_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const button_index = {
        a: 0, b: 1, x: 2, y: 3,
        lb: 4, rb: 5, lt: 6, rt: 7,
        back: 8, start: 9, ls: 10, rs: 11,
        up: 12, down: 13, left: 14, right: 15,
    };
    const axis_index = {
        'lx-': [0, -1], 'lx+': [0, 1],
        'ly-': [1, -1], 'ly+': [1, 1],
        'rx-': [2, -1], 'rx+': [2, 1],
        'ry-': [3, -1], 'ry+': [3, 1],
    };
    class $bog_gamengine_pad extends $mol_object2 {
        bind(next = {}) {
            return next;
        }
        dead(next = 0.2) {
            return next;
        }
        buttons = new Uint8Array(16);
        axes = new Float32Array(4);
        pads() {
            return globalThis.navigator?.getGamepads?.() ?? [];
        }
        poll() {
            const pads = this.pads();
            let pad = null;
            for (let i = 0; i < pads.length; ++i) {
                if (pads[i]) {
                    pad = pads[i];
                    break;
                }
            }
            const buttons = this.buttons;
            const axes = this.axes;
            if (!pad) {
                buttons.fill(0);
                axes.fill(0);
                return;
            }
            for (let i = 0; i < buttons.length; ++i)
                buttons[i] = pad.buttons[i]?.pressed ? 1 : 0;
            for (let i = 0; i < axes.length; ++i)
                axes[i] = pad.axes[i] ?? 0;
        }
        value(name) {
            const button = button_index[name];
            if (button !== undefined)
                return this.buttons[button];
            const axis = axis_index[name];
            if (!axis)
                return 0;
            const raw = this.axes[axis[0]] * axis[1];
            return raw > this.dead() ? raw : 0;
        }
        strength(name) {
            const names = this.bind()[name];
            if (!names)
                return 0;
            let max = 0;
            for (let i = 0; i < names.length; ++i) {
                const value = this.value(names[i]);
                if (value > max)
                    max = value;
            }
            return max;
        }
        action(name) {
            return this.strength(name) > 0;
        }
        axis(neg, pos) {
            return this.strength(pos) - this.strength(neg);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_pad.prototype, "bind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_pad.prototype, "dead", null);
    $.$bog_gamengine_pad = $bog_gamengine_pad;
})($ || ($ = {}));

;
	($.$bog_gamengine_input_screen) = class $bog_gamengine_input_screen extends ($.$mol_view) {
		stick_down(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_move(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_up(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_cancel(next){
			if(next !== undefined) return next;
			return null;
		}
		stick_leave(next){
			if(next !== undefined) return next;
			return null;
		}
		Knob(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"transform": (this.knob_shift())});
			return obj;
		}
		Stick(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({
				"pointerdown": (next) => (this.stick_down(next)), 
				"pointermove": (next) => (this.stick_move(next)), 
				"pointerup": (next) => (this.stick_up(next)), 
				"pointercancel": (next) => (this.stick_cancel(next)), 
				"pointerleave": (next) => (this.stick_leave(next))
			});
			(obj.sub) = () => ([(this.Knob())]);
			return obj;
		}
		buttons(){
			return [];
		}
		Buttons(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.buttons()));
			return obj;
		}
		button_title(id){
			return "";
		}
		button_down(id, next){
			if(next !== undefined) return next;
			return null;
		}
		button_up(id, next){
			if(next !== undefined) return next;
			return null;
		}
		button_cancel(id, next){
			if(next !== undefined) return next;
			return null;
		}
		button_leave(id, next){
			if(next !== undefined) return next;
			return null;
		}
		shown(next){
			if(next !== undefined) return next;
			return false;
		}
		actions(){
			return [];
		}
		titles(){
			return {};
		}
		bind(){
			return {};
		}
		dead(){
			return 0.2;
		}
		radius(){
			return 48;
		}
		knob_shift(next){
			if(next !== undefined) return next;
			return "";
		}
		sub(){
			return [(this.Stick()), (this.Buttons())];
		}
		Button(id){
			const obj = new this.$.$mol_button();
			(obj.title) = () => ((this.button_title(id)));
			(obj.event) = () => ({
				...(this.$.$mol_button.prototype.event.call(obj)), 
				"pointerdown": (next) => (this.button_down(id, next)), 
				"pointerup": (next) => (this.button_up(id, next)), 
				"pointercancel": (next) => (this.button_cancel(id, next)), 
				"pointerleave": (next) => (this.button_leave(id, next))
			});
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_down"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_move"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_up"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_cancel"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "stick_leave"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "Knob"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "Stick"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "Buttons"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_down"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_up"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_cancel"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "button_leave"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "shown"));
	($mol_mem(($.$bog_gamengine_input_screen.prototype), "knob_shift"));
	($mol_mem_key(($.$bog_gamengine_input_screen.prototype), "Button"));


;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

;
"use strict";

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_input_screen extends $.$bog_gamengine_input_screen {
            stick = new Float32Array(2);
            held = new Map();
            stick_pointer = -1;
            bind() {
                return { left: ['x-'], right: ['x+'], up: ['y+'], down: ['y-'] };
            }
            coarse() {
                return this.$.$mol_media.match('(pointer: coarse)');
            }
            visible() {
                return this.shown() || this.coarse();
            }
            sub() {
                return this.visible() ? super.sub() : [];
            }
            buttons() {
                return this.actions().map(name => this.Button(name));
            }
            button_title(name) {
                return this.titles()[name] ?? name;
            }
            value(name) {
                const stick = this.stick;
                if (name === 'x-')
                    return stick[0] < 0 ? -stick[0] : 0;
                if (name === 'x+')
                    return stick[0] > 0 ? stick[0] : 0;
                if (name === 'y-')
                    return stick[1] < 0 ? -stick[1] : 0;
                if (name === 'y+')
                    return stick[1] > 0 ? stick[1] : 0;
                return this.held.get(name) ? 1 : 0;
            }
            strength(name) {
                let max = this.held.get(name) ? 1 : 0;
                const names = this.bind()[name];
                if (!names)
                    return max;
                for (let i = 0; i < names.length; ++i) {
                    const value = this.value(names[i]);
                    if (value > max)
                        max = value;
                }
                return max;
            }
            action(name) {
                return this.strength(name) > 0;
            }
            axis(neg, pos) {
                return this.strength(pos) - this.strength(neg);
            }
            move(dx, dy) {
                const radius = this.radius();
                let x = dx / radius;
                let y = -dy / radius;
                const len = Math.hypot(x, y);
                if (len > 1) {
                    x /= len;
                    y /= len;
                }
                this.knob_shift(`translate(${(x * radius).toFixed(1)}px, ${(-y * radius).toFixed(1)}px)`);
                if (len < this.dead()) {
                    x = 0;
                    y = 0;
                }
                this.stick[0] = x;
                this.stick[1] = y;
            }
            press(name) {
                this.held.set(name, true);
            }
            release(name) {
                this.held.set(name, false);
            }
            stick_track(event) {
                const box = event.currentTarget.getBoundingClientRect();
                this.move(event.clientX - box.left - box.width / 2, event.clientY - box.top - box.height / 2);
            }
            stick_down(event) {
                if (!event)
                    return null;
                this.stick_pointer = event.pointerId;
                this.stick_track(event);
                return event;
            }
            stick_move(event) {
                if (!event || event.pointerId !== this.stick_pointer)
                    return null;
                this.stick_track(event);
                return event;
            }
            stick_up(event) {
                if (!event || event.pointerId !== this.stick_pointer)
                    return null;
                this.stick_pointer = -1;
                this.move(0, 0);
                return event;
            }
            stick_cancel(event) {
                return this.stick_up(event);
            }
            stick_leave(event) {
                return this.stick_up(event);
            }
            button_down(name, event) {
                if (!event)
                    return null;
                this.press(name);
                return event;
            }
            button_up(name, event) {
                if (!event)
                    return null;
                this.release(name);
                return event;
            }
            button_cancel(name, event) {
                return this.button_up(name, event);
            }
            button_leave(name, event) {
                return this.button_up(name, event);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_input_screen.prototype, "coarse", null);
        $$.$bog_gamengine_input_screen = $bog_gamengine_input_screen;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_input_screen, {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: $mol_gap.block,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            pointerEvents: 'none',
            userSelect: 'none',
            Stick: {
                pointerEvents: 'auto',
                touchAction: 'none',
                width: '9rem',
                height: '9rem',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                background: {
                    color: $mol_theme.card,
                },
            },
            Knob: {
                pointerEvents: 'none',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: {
                    color: $mol_theme.line,
                },
            },
            Buttons: {
                pointerEvents: 'auto',
                gap: $mol_gap.space,
            },
            Button: {
                touchAction: 'none',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                background: {
                    color: $mol_theme.card,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_input extends $mol_object2 {
        key(next) {
            return next ?? null;
        }
        pad(next) {
            return next ?? null;
        }
        screen(next) {
            return next ?? null;
        }
        poll() {
            this.pad()?.poll();
        }
        action(name) {
            return (this.key()?.action(name) ?? false)
                || (this.pad()?.action(name) ?? false)
                || (this.screen()?.action(name) ?? false);
        }
        axis(neg, pos) {
            const key = this.key()?.axis(neg, pos) ?? 0;
            if (key !== 0)
                return key;
            const pad = this.pad()?.axis(neg, pos) ?? 0;
            if (pad !== 0)
                return pad;
            return this.screen()?.axis(neg, pos) ?? 0;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "key", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "pad", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "screen", null);
    $.$bog_gamengine_input = $bog_gamengine_input;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_clock extends $mol_object2 {
        frames = 0;
        now_last = NaN;
        dt_raw = 0;
        time_total = 0;
        time_frame = 0;
        tick_at = 0;
        frame() {
            this.tick_at = performance.now();
            const now = this.$.$mol_state_time.now(0);
            this.dt_raw = isNaN(this.now_last) ? 0 : Math.min((now - this.now_last) / 1000, 0.1);
            this.now_last = now;
            return ++this.frames;
        }
        dt() {
            this.frame();
            if (this.paused())
                return 0;
            return this.dt_raw * this.speed();
        }
        time(next) {
            const frame = this.frame();
            const dt = this.dt();
            if (next !== undefined) {
                this.time_frame = frame;
                this.time_total = next;
                return next;
            }
            if (frame !== this.time_frame) {
                this.time_frame = frame;
                this.time_total += dt;
            }
            return this.time_total;
        }
        paused(next = false) {
            return next;
        }
        speed(next = 1) {
            return next;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "dt", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "time", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "paused", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_clock.prototype, "speed", null);
    $.$bog_gamengine_clock = $bog_gamengine_clock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_mat4 extends Float32Array {
        static identity() {
            return new $mol_3d_mat4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ]);
        }
        static translation([x, y, z]) {
            return new $mol_3d_mat4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x, y, z, 1,
            ]);
        }
        static scaling([x, y, z]) {
            return new $mol_3d_mat4([
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1,
            ]);
        }
        static rotation([x, y, z], angle) {
            var length = Math.hypot(x, y, z);
            x /= length;
            y /= length;
            z /= length;
            const xx = x ** 2;
            const yy = y ** 2;
            const zz = z ** 2;
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            const mc = 1 - c;
            return new $mol_3d_mat4([
                xx + (1 - xx) * c,
                x * y * mc + z * s,
                x * z * mc - y * s,
                0,
                x * y * mc - z * s,
                yy + (1 - yy) * c,
                y * z * mc + x * s,
                0,
                x * z * mc + y * s,
                y * z * mc - x * s,
                zz + (1 - zz) * c,
                0,
                0, 0, 0, 1,
            ]);
        }
        static orthographic(left, right, bottom, top, near, far) {
            const rpl = right + left;
            const tpb = top + bottom;
            const npf = near + far;
            const rml = right - left;
            const tmb = top - bottom;
            const nmf = near - far;
            return new $mol_3d_mat4([
                2 / rml, 0, 0, 0,
                0, 2 / tmb, 0, 0,
                0, 0, 2 / nmf, 0,
                -rpl / rml, -tpb / tmb, npf / nmf, 1,
            ]);
        }
        static perspective(fov, aspect, near, far) {
            var f = Math.tan(Math.PI / 2 - fov / 2);
            var irange = 1.0 / (near - far);
            return new $mol_3d_mat4([
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (near + far) * irange, -1,
                0, 0, near * far * irange * 2, 0,
            ]);
        }
        static multiply(head, ...tail) {
            if (tail.length === 0)
                return new $mol_3d_mat4(head);
            const foot = tail.length > 1 ? this.multiply(...tail) : tail[0];
            return new $mol_3d_mat4([
                foot[0] * head[0] + foot[1] * head[4] + foot[2] * head[8] + foot[3] * head[12],
                foot[0] * head[1] + foot[1] * head[5] + foot[2] * head[9] + foot[3] * head[13],
                foot[0] * head[2] + foot[1] * head[6] + foot[2] * head[10] + foot[3] * head[14],
                foot[0] * head[3] + foot[1] * head[7] + foot[2] * head[11] + foot[3] * head[15],
                foot[4] * head[0] + foot[5] * head[4] + foot[6] * head[8] + foot[7] * head[12],
                foot[4] * head[1] + foot[5] * head[5] + foot[6] * head[9] + foot[7] * head[13],
                foot[4] * head[2] + foot[5] * head[6] + foot[6] * head[10] + foot[7] * head[14],
                foot[4] * head[3] + foot[5] * head[7] + foot[6] * head[11] + foot[7] * head[15],
                foot[8] * head[0] + foot[9] * head[4] + foot[10] * head[8] + foot[11] * head[12],
                foot[8] * head[1] + foot[9] * head[5] + foot[10] * head[9] + foot[11] * head[13],
                foot[8] * head[2] + foot[9] * head[6] + foot[10] * head[10] + foot[11] * head[14],
                foot[8] * head[3] + foot[9] * head[7] + foot[10] * head[11] + foot[11] * head[15],
                foot[12] * head[0] + foot[13] * head[4] + foot[14] * head[8] + foot[15] * head[12],
                foot[12] * head[1] + foot[13] * head[5] + foot[14] * head[9] + foot[15] * head[13],
                foot[12] * head[2] + foot[13] * head[6] + foot[14] * head[10] + foot[15] * head[14],
                foot[12] * head[3] + foot[13] * head[7] + foot[14] * head[11] + foot[15] * head[15],
            ]);
        }
        inversed() {
            const p_0 = this[10] * this[15], p_1 = this[14] * this[11], p_2 = this[6] * this[15], p_3 = this[14] * this[7];
            const p_4 = this[6] * this[11], p_5 = this[10] * this[7], p_6 = this[2] * this[15], p_7 = this[14] * this[3];
            const p_8 = this[2] * this[11], p_9 = this[10] * this[3], p10 = this[2] * this[7], p11 = this[6] * this[3];
            const p12 = this[8] * this[13], p13 = this[12] * this[9], p14 = this[4] * this[13], p15 = this[12] * this[5];
            const p16 = this[4] * this[9], p17 = this[8] * this[5], p18 = this[0] * this[13], p19 = this[12] * this[1];
            const p20 = this[0] * this[9], p21 = this[8] * this[1], p22 = this[0] * this[5], p23 = this[4] * this[1];
            const t0 = p_0 * this[5] + p_3 * this[9] + p_4 * this[13] - p_1 * this[5] - p_2 * this[9] - p_5 * this[13];
            const t1 = p_1 * this[1] + p_6 * this[9] + p_9 * this[13] - p_0 * this[1] - p_7 * this[9] - p_8 * this[13];
            const t2 = p_2 * this[1] + p_7 * this[5] + p10 * this[13] - p_3 * this[1] - p_6 * this[5] - p11 * this[13];
            const t3 = p_5 * this[1] + p_8 * this[5] + p11 * this[9] - p_4 * this[1] - p_9 * this[5] - p10 * this[9];
            const d = 1.0 / (this[0] * t0 + this[4] * t1 + this[8] * t2 + this[12] * t3);
            return new $mol_3d_mat4([
                d * t0, d * t1, d * t2, d * t3,
                d * (p_1 * this[4] + p_2 * this[8] + p_5 * this[12] - p_0 * this[4] - p_3 * this[8] - p_4 * this[12]),
                d * (p_0 * this[0] + p_7 * this[8] + p_8 * this[12] - p_1 * this[0] - p_6 * this[8] - p_9 * this[12]),
                d * (p_3 * this[0] + p_6 * this[4] + p11 * this[12] - p_2 * this[0] - p_7 * this[4] - p10 * this[12]),
                d * (p_4 * this[0] + p_9 * this[4] + p10 * this[8] - p_5 * this[0] - p_8 * this[4] - p11 * this[8]),
                d * (p12 * this[7] + p15 * this[11] + p16 * this[15] - p13 * this[7] - p14 * this[11] - p17 * this[15]),
                d * (p13 * this[3] + p18 * this[11] + p21 * this[15] - p12 * this[3] - p19 * this[11] - p20 * this[15]),
                d * (p14 * this[3] + p19 * this[7] + p22 * this[15] - p15 * this[3] - p18 * this[7] - p23 * this[15]),
                d * (p17 * this[3] + p20 * this[7] + p23 * this[11] - p16 * this[3] - p21 * this[7] - p22 * this[11]),
                d * (p14 * this[10] + p17 * this[14] + p13 * this[6] - p16 * this[14] - p12 * this[6] - p15 * this[10]),
                d * (p20 * this[14] + p12 * this[2] + p19 * this[10] - p18 * this[10] - p21 * this[14] - p13 * this[2]),
                d * (p18 * this[6] + p23 * this[14] + p15 * this[2] - p22 * this[14] - p14 * this[2] - p19 * this[6]),
                d * (p22 * this[10] + p16 * this[2] + p21 * this[6] - p20 * this[6] - p23 * this[10] - p17 * this[2]),
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_mat4.prototype, "inversed", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_mat4, "identity", null);
    $.$mol_3d_mat4 = $mol_3d_mat4;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_3d_glsl_both += "// vector of scales by transformation matrix\nvec4 mol_3d_mat4_scales( in mat4 trans ) {\n\treturn vec4(\n\t\tlength( trans[0] ),\n\t\tlength( trans[1] ),\n\t\tlength( trans[2] ),\n\t\tlength( trans[3] )\n\t);\n}\n";
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_node_vec(next) {
        return next instanceof Float32Array ? next : new Float32Array(next);
    }
    $.$bog_gamengine_node_vec = $bog_gamengine_node_vec;
    class $bog_gamengine_node extends $mol_object2 {
        name(next = '') {
            return next;
        }
        title() {
            const name = this.name();
            if (name)
                return name;
            const cls = this.constructor;
            return cls.$.$mol_func_name(cls).replace(/^\$bog_gamengine_/, '');
        }
        props() {
            return [
                { name: 'pos', kind: 'vec3', get: () => this.pos(), set: next => this.pos(next) },
                { name: 'rot', kind: 'euler', get: () => this.rot(), set: next => this.rot(next) },
                { name: 'scale', kind: 'vec3', get: () => this.scale(), set: next => this.scale(next) },
                { name: 'tint', kind: 'vec4', get: () => this.tint(), set: next => this.tint(next) },
            ];
        }
        pos(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        rot(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        scale(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1]);
        }
        tint(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1, 1]);
        }
        billboard(next = false) {
            return next;
        }
        shader(next) {
            return next ?? null;
        }
        parent(next) {
            return next ?? null;
        }
        kids(next) {
            if (!next)
                return [];
            for (let i = 0; i < next.length; ++i) {
                if (!next[i].parent())
                    next[i].parent(this);
            }
            return next;
        }
        hidden = false;
        shown() {
            for (let node = this; node; node = node.parent()) {
                if (node.hidden)
                    return false;
            }
            return true;
        }
        root() {
            let node = this;
            for (let parent = node.parent(); parent; parent = node.parent())
                node = parent;
            return node;
        }
        is_scene() {
            return false;
        }
        is_brain() {
            return false;
        }
        scene() {
            const root = this.root();
            return root.is_scene() ? root : null;
        }
        input() {
            return this.scene()?.input() ?? null;
        }
        clock() {
            return this.scene()?.clock() ?? null;
        }
        cam_yaw() {
            const cam = this.scene()?.cam() ?? null;
            if (!cam)
                return this.rot()[1];
            const world = cam.world();
            return Math.atan2(world[8], world[10]);
        }
        trans() {
            const rot = this.rot();
            const yaw = this.billboard() ? this.cam_yaw() : rot[1];
            return $mol_3d_mat4.multiply($mol_3d_mat4.translation(this.pos()), $mol_3d_mat4.rotation([0, 0, 1], rot[2]), $mol_3d_mat4.rotation([0, 1, 0], yaw), $mol_3d_mat4.rotation([1, 0, 0], rot[0]), $mol_3d_mat4.scaling(this.scale()));
        }
        world() {
            const parent = this.parent();
            return parent ? $mol_3d_mat4.multiply(parent.world(), this.trans()) : this.trans();
        }
        step(dt) { }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "name", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "pos", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "rot", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "scale", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "tint", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "billboard", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "shader", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "parent", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "kids", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "trans", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_node.prototype, "world", null);
    $.$bog_gamengine_node = $bog_gamengine_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_light extends $bog_gamengine_node {
        kind(next = 'sun') {
            return next;
        }
        color(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1]);
        }
        power(next = 1) {
            return next;
        }
        range(next = 10) {
            return next;
        }
        angle(next = Math.PI / 6) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'kind', kind: 'text', get: () => this.kind(), set: next => this.kind(next) },
                { name: 'color', kind: 'vec3', get: () => this.color(), set: next => this.color(next) },
                { name: 'power', kind: 'number', get: () => this.power(), set: next => this.power(next) },
                { name: 'range', kind: 'number', get: () => this.range(), set: next => this.range(next) },
                { name: 'angle', kind: 'number', get: () => this.angle(), set: next => this.angle(next) },
            ];
        }
        dir() {
            const dir = new Float32Array(3);
            return $bog_gamengine_light_dir(this.world(), dir, 0);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "kind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "color", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "power", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "range", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "angle", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_light.prototype, "dir", null);
    $.$bog_gamengine_light = $bog_gamengine_light;
    function $bog_gamengine_light_dir(world, out, offset) {
        const x = -world[8];
        const y = -world[9];
        const z = -world[10];
        const len = Math.hypot(x, y, z) || 1;
        out[offset] = x / len;
        out[offset + 1] = y / len;
        out[offset + 2] = z / len;
        return out;
    }
    $.$bog_gamengine_light_dir = $bog_gamengine_light_dir;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_sprite extends $bog_gamengine_shader {
        face() {
            return {
                glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray' },
                input: { vertex: 'vec3', uv: 'vec2', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' },
                pipe: { pipe_uv: 'vec2', pipe_layer: 'float', pipe_tint: 'vec4' },
                output: { color: 'vec4' },
            };
        }
        vert() {
            return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
				}
			`;
        }
        frag() {
            return `
				void main() {
					color = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint;
				}
			`;
        }
    }
    $.$bog_gamengine_shader_sprite = $bog_gamengine_shader_sprite;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_solid extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    proj: 'mat4',
                    view: 'mat4',
                    atlas: 'sampler2DArray',
                    atlas_data: 'sampler2DArray',
                    light_count: 'int',
                    light_pos: 'vec4[8]',
                    light_dir: 'vec4[8]',
                    light_color: 'vec4[8]',
                    ambient: 'vec3',
                    cam_pos: 'vec3',
                    fog: 'vec2',
                    fog_color: 'vec3',
                    wireframe: 'float',
                    shadow_mat: 'mat4',
                    shadow_map: 'sampler2DShadow',
                    shadow_light: 'int',
                },
                input: {
                    vertex: 'vec3',
                    uv: 'vec2',
                    normal: 'vec3',
                    inst_trans: 'mat4',
                    inst_tint: 'vec4',
                    inst_layer: 'float',
                    inst_uv: 'vec4',
                    inst_material: 'vec4',
                    inst_normal_layer: 'float',
                },
                pipe: {
                    pipe_uv: 'vec2',
                    pipe_layer: 'float',
                    pipe_tint: 'vec4',
                    pipe_normal: 'vec3',
                    pipe_pos: 'vec3',
                    pipe_material: 'vec4',
                    pipe_normal_layer: 'float',
                },
                output: { color: 'vec4' },
            };
        }
        depth() {
            return true;
        }
        vert() {
            return `
				void main() {
					vec4 world = inst_trans * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
					pipe_material = inst_material;
					pipe_normal_layer = inst_normal_layer;
				}
			`;
        }
        frag() {
            return `
				vec3 perturb( vec3 normal, vec3 bump, vec3 pos, vec2 uv ) {
					vec3 dpx = dFdx( pos );
					vec3 dpy = dFdy( pos );
					vec2 dux = dFdx( uv );
					vec2 duy = dFdy( uv );
					vec3 px = cross( dpy, normal );
					vec3 py = cross( normal, dpx );
					vec3 tangent = px * dux.x + py * duy.x;
					vec3 bitangent = px * dux.y + py * duy.y;
					float scale = inversesqrt( max( dot( tangent, tangent ), dot( bitangent, bitangent ) ) );
					return normalize( mat3( tangent * scale, bitangent * scale, normal ) * bump );
				}
				float shade( vec3 pos, vec3 normal, vec3 light ) {
					float slope = 1.0 - max( dot( normal, light ), 0.0 );
					vec4 clip = shadow_mat * vec4( pos + normal * ( 0.03 + 0.09 * slope ), 1.0 );
					if( any( greaterThan( abs( clip.xyz ), vec3( 1.0 ) ) ) ) return 1.0;
					vec3 coord = clip.xyz * 0.5 + 0.5;
					coord.z -= 0.0015;
					vec2 texel = 1.0 / vec2( textureSize( shadow_map, 0 ) );
					float sum = 0.0;
					for( int y = -1; y <= 1; ++ y ) {
						for( int x = -1; x <= 1; ++ x ) {
							sum += texture( shadow_map, coord + vec3( vec2( x, y ) * texel, 0.0 ) );
						}
					}
					return sum / 9.0;
				}
				void main() {
					if( wireframe > 0.5 ) {
						color = vec4( 1.0 );
						return;
					}
					vec4 base = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint;
					vec3 normal = normalize( pipe_normal );
					if( pipe_normal_layer >= 0.0 ) {
						vec3 bump = texture( atlas_data, vec3( pipe_uv, pipe_normal_layer ) ).xyz * 2.0 - 1.0;
						normal = perturb( normal, bump, pipe_pos, pipe_uv );
					}
					vec3 eye = normalize( cam_pos - pipe_pos );
					float metallic = pipe_material.x;
					float roughness = max( pipe_material.y, 0.05 );
					vec3 albedo = base.rgb;
					vec3 f0 = mix( vec3( 0.04 ), albedo, metallic );
					vec3 diffuse = albedo * ( 1.0 - metallic );
					vec3 sum = albedo * ( ambient + pipe_material.z );
					float lit = 1.0;
					if( shadow_light >= 0 ) lit = shade( pipe_pos, normal, - normalize( light_dir[ shadow_light ].xyz ) );
					for( int i = 0; i < 8; ++ i ) {
						if( i < light_count ) {
							vec3 way = light_pos[ i ].xyz - pipe_pos;
							float dist = length( way );
							vec3 aim = normalize( light_dir[ i ].xyz );
							vec3 light = - aim;
							float atten = i == shadow_light ? lit : 1.0;
							if( light_pos[ i ].w > 0.5 ) {
								light = way / max( dist, 0.0001 );
								atten = bog_gamengine_pbr_window( dist, light_color[ i ].w );
								if( light_dir[ i ].w > -0.5 ) atten *= bog_gamengine_pbr_cone( dot( - light, aim ), light_dir[ i ].w );
							}
							float ndl = max( dot( normal, light ), 0.0 );
							if( ndl > 0.0 && atten > 0.0 ) {
								sum += bog_gamengine_pbr_brdf( normal, eye, light, diffuse, f0, roughness ) * light_color[ i ].rgb * ( atten * ndl );
							}
						}
					}
					float haze = fog.y > fog.x ? clamp( ( length( cam_pos - pipe_pos ) - fog.x ) / ( fog.y - fog.x ), 0.0, 1.0 ) : 0.0;
					color = vec4( mix( sum, fog_color * base.a, haze ), base.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_solid = $bog_gamengine_shader_solid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_3d_glsl_both += "float bog_gamengine_pbr_ggx( float ndh, float alpha ) {\n\tfloat a2 = alpha * alpha;\n\tfloat d = ndh * ndh * ( a2 - 1.0 ) + 1.0;\n\treturn a2 / max( d * d, 0.0000001 );\n}\n\nfloat bog_gamengine_pbr_smith( float ndl, float ndv, float alpha ) {\n\tfloat a2 = alpha * alpha;\n\tfloat shadowv = ndl * sqrt( ndv * ndv * ( 1.0 - a2 ) + a2 );\n\tfloat shadowl = ndv * sqrt( ndl * ndl * ( 1.0 - a2 ) + a2 );\n\treturn 0.5 / max( shadowv + shadowl, 0.0001 );\n}\n\nvec3 bog_gamengine_pbr_fresnel( vec3 f0, float vdh ) {\n\tfloat fade = pow( 1.0 - vdh, 5.0 );\n\treturn f0 + ( 1.0 - f0 ) * fade;\n}\n\nvec3 bog_gamengine_pbr_brdf( vec3 normal, vec3 eye, vec3 light, vec3 diffuse, vec3 f0, float roughness ) {\n\tvec3 mid = normalize( eye + light );\n\tfloat ndl = max( dot( normal, light ), 0.001 );\n\tfloat ndv = max( dot( normal, eye ), 0.001 );\n\tfloat ndh = max( dot( normal, mid ), 0.0 );\n\tfloat vdh = max( dot( eye, mid ), 0.0 );\n\tfloat alpha = roughness * roughness;\n\tvec3 fresnel = bog_gamengine_pbr_fresnel( f0, vdh );\n\tvec3 spec = fresnel * bog_gamengine_pbr_ggx( ndh, alpha ) * bog_gamengine_pbr_smith( ndl, ndv, alpha );\n\treturn ( 1.0 - fresnel ) * diffuse + spec;\n}\n\nfloat bog_gamengine_pbr_window( float dist, float range ) {\n\tfloat ratio = dist / max( range, 0.0001 );\n\tfloat fade = clamp( 1.0 - ratio * ratio * ratio * ratio, 0.0, 1.0 );\n\treturn fade * fade / max( dist * dist, 0.01 );\n}\n\nfloat bog_gamengine_pbr_cone( float cosine, float edge ) {\n\treturn smoothstep( edge, mix( edge, 1.0, 0.2 ), cosine );\n}\n";
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_solid_plain extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    proj: 'mat4',
                    view: 'mat4',
                    light_count: 'int',
                    light_pos: 'vec4[8]',
                    light_dir: 'vec4[8]',
                    light_color: 'vec4[8]',
                    ambient: 'vec3',
                    cam_pos: 'vec3',
                    fog: 'vec2',
                    fog_color: 'vec3',
                    wireframe: 'float',
                },
                input: {
                    vertex: 'vec3',
                    normal: 'vec3',
                    inst_trans: 'mat4',
                    inst_tint: 'vec4',
                    inst_material: 'vec4',
                },
                pipe: {
                    pipe_tint: 'vec4',
                    pipe_normal: 'vec3',
                    pipe_pos: 'vec3',
                    pipe_material: 'vec4',
                },
                output: { color: 'vec4' },
            };
        }
        depth() {
            return true;
        }
        vert() {
            return `
				void main() {
					vec4 world = inst_trans * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_tint = inst_tint;
					pipe_material = inst_material;
				}
			`;
        }
        frag() {
            return `
				void main() {
					if( wireframe > 0.5 ) {
						color = vec4( 1.0 );
						return;
					}
					vec3 normal = normalize( pipe_normal );
					vec3 eye = normalize( cam_pos - pipe_pos );
					float metallic = pipe_material.x;
					float roughness = max( pipe_material.y, 0.05 );
					vec3 albedo = pipe_tint.rgb;
					vec3 f0 = mix( vec3( 0.04 ), albedo, metallic );
					vec3 diffuse = albedo * ( 1.0 - metallic );
					vec3 sum = albedo * ( ambient + pipe_material.z );
					for( int i = 0; i < 8; ++ i ) {
						if( i < light_count ) {
							vec3 way = light_pos[ i ].xyz - pipe_pos;
							float dist = length( way );
							vec3 aim = normalize( light_dir[ i ].xyz );
							vec3 light = - aim;
							float atten = 1.0;
							if( light_pos[ i ].w > 0.5 ) {
								light = way / max( dist, 0.0001 );
								atten = bog_gamengine_pbr_window( dist, light_color[ i ].w );
								if( light_dir[ i ].w > -0.5 ) atten *= bog_gamengine_pbr_cone( dot( - light, aim ), light_dir[ i ].w );
							}
							float ndl = max( dot( normal, light ), 0.0 );
							if( ndl > 0.0 && atten > 0.0 ) {
								sum += bog_gamengine_pbr_brdf( normal, eye, light, diffuse, f0, roughness ) * light_color[ i ].rgb * ( atten * ndl );
							}
						}
					}
					float haze = fog.y > fog.x ? clamp( ( length( cam_pos - pipe_pos ) - fog.x ) / ( fog.y - fog.x ), 0.0, 1.0 ) : 0.0;
					color = vec4( mix( sum, fog_color * pipe_tint.a, haze ), pipe_tint.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_solid_plain = $bog_gamengine_shader_solid_plain;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_shape extends $mol_object {
        geometry() {
            return new Float32Array;
        }
        size() {
            return this.geometry().length / 3;
        }
        skin() {
            return new Float32Array(this.size() * 2);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape.prototype, "skin", null);
    $.$mol_3d_shape = $mol_3d_shape;
    class $mol_3d_shape_triangle extends $mol_3d_shape {
        geometry() {
            return new Float32Array([
                -1, -1, 0,
                +1, -1, 0,
                +0, +1, 0,
            ]);
        }
        skin() {
            return new Float32Array([
                0.0, 1,
                1.0, 1,
                0.5, 0,
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_triangle.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_triangle.prototype, "skin", null);
    $.$mol_3d_shape_triangle = $mol_3d_shape_triangle;
    class $mol_3d_shape_square extends $mol_3d_shape {
        geometry() {
            return new Float32Array([
                -1, -1, 0,
                +1, -1, 0,
                -1, +1, 0,
                +1, +1, 0,
            ]);
        }
        skin() {
            return new Float32Array([
                0, 1,
                1, 1,
                0, 0,
                1, 0,
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_square.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $mol_3d_shape_square.prototype, "skin", null);
    $.$mol_3d_shape_square = $mol_3d_shape_square;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape extends $mol_3d_shape {
        normals() {
            const size = this.size();
            const normals = new Float32Array(size * 3);
            for (let i = 0; i < size; ++i)
                normals[i * 3 + 2] = 1;
            return normals;
        }
        radius() {
            const geometry = this.geometry();
            let max = 0;
            for (let i = 0; i < geometry.length; i += 3) {
                const len = geometry[i] * geometry[i] + geometry[i + 1] * geometry[i + 1] + geometry[i + 2] * geometry[i + 2];
                if (len > max)
                    max = len;
            }
            return Math.sqrt(max);
        }
        count() {
            return this.size();
        }
        mode() {
            return 'strip';
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape.prototype, "normals", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape.prototype, "radius", null);
    $.$bog_gamengine_shape = $bog_gamengine_shape;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape_quad extends $bog_gamengine_shape {
        geometry() {
            return new Float32Array([
                -0.5, -0.5, 0,
                +0.5, -0.5, 0,
                -0.5, +0.5, 0,
                +0.5, +0.5, 0,
            ]);
        }
        skin() {
            return new Float32Array([
                0, 1,
                1, 1,
                0, 0,
                1, 0,
            ]);
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_quad.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_quad.prototype, "skin", null);
    $.$bog_gamengine_shape_quad = $bog_gamengine_shape_quad;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_flat extends $bog_gamengine_shader {
        face() {
            return {
                glob: { proj: 'mat4', view: 'mat4' },
                input: { vertex: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4' },
                pipe: { pipe_tint: 'vec4' },
                output: { color: 'vec4' },
            };
        }
        vert() {
            return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_tint = inst_tint;
				}
			`;
        }
        frag() {
            return `
				void main() {
					color = pipe_tint;
				}
			`;
        }
    }
    $.$bog_gamengine_shader_flat = $bog_gamengine_shader_flat;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_image extends $mol_object {
        uri() {
            return 'about:blank';
        }
        load() {
            return new Promise((done, fail) => {
                const image = new Image;
                image.src = this.uri();
                image.onload = () => done(image);
                image.onerror = event => fail(event);
            });
        }
        data() {
            $mol_wire_solid();
            try {
                return $mol_wire_sync(this).load();
            }
            catch (error) {
                $mol_fail_log(error);
                return new ImageData(new Uint8ClampedArray(512 * 512 * 4), 512, 512);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_3d_image.prototype, "data", null);
    $.$mol_3d_image = $mol_3d_image;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Starts subtasks concurrently instead of serial. */
    function $mol_wire_race(...tasks) {
        const results = tasks.map(task => {
            try {
                return task();
            }
            catch (error) {
                return error;
            }
        });
        const promises = results.filter(res => $mol_promise_like(res));
        if (promises.length)
            $mol_fail(Promise.race(promises));
        const error = results.find(res => res instanceof Error);
        if (error)
            $mol_fail(error);
        return results;
    }
    $.$mol_wire_race = $mol_wire_race;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_atlas_image extends $mol_3d_image {
        data() {
            $mol_wire_solid();
            return $mol_wire_sync(this).load();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas_image.prototype, "data", null);
    $.$bog_gamengine_atlas_image = $bog_gamengine_atlas_image;
    function $bog_gamengine_atlas_blank(image) {
        return ArrayBuffer.isView(image.data);
    }
    $.$bog_gamengine_atlas_blank = $bog_gamengine_atlas_blank;
    class $bog_gamengine_atlas extends $mol_object2 {
        uris(next = []) {
            return next;
        }
        size(next = 64) {
            return next;
        }
        kind(next) {
            return next ?? 'color';
        }
        data(next) {
            return next ?? null;
        }
        sources(next = []) {
            return next;
        }
        origins() {
            const uris = this.uris();
            const sources = this.sources();
            const origins = [];
            for (let i = 0; i < uris.length; ++i) {
                origins.push({ name: uris[i].replace(/^.*\//, '').replace(/\.[^.]*$/, ''), from: uris[i] });
            }
            for (let i = 0; i < sources.length; ++i) {
                origins.push({ name: sources[i].name, from: sources[i].name });
            }
            return origins;
        }
        names() {
            const origins = this.origins();
            const names = new Map();
            for (let i = 0; i < origins.length; ++i) {
                const name = origins[i].name;
                const known = names.get(name);
                if (known !== undefined)
                    $mol_fail(new Error(`Atlas layer name ${name} is used twice: ${origins[known].from} and ${origins[i].from}`));
                names.set(name, i);
            }
            return names;
        }
        layer(name) {
            const index = this.names().get(name);
            if (index === undefined)
                return $mol_fail(new Error(`Atlas has no layer ${name}, known: ${[...this.names().keys()].join(', ')}`));
            return index;
        }
        static image(uri) {
            $mol_wire_solid();
            return this.$.$bog_gamengine_atlas_image.make({ uri: () => uri });
        }
        image(uri) {
            return this.constructor.image(uri);
        }
        images() {
            const uris = this.uris();
            const size = this.size();
            const origins = this.origins();
            const loaded = $mol_wire_race(...uris.map(uri => () => this.image(uri).data()));
            const images = [...loaded, ...this.sources().map(source => source.image)];
            for (let i = 0; i < images.length; ++i) {
                if ($bog_gamengine_atlas_blank(images[i]))
                    continue;
                const box = images[i];
                const width = box.width;
                const height = box.height;
                if (width === size && height === size)
                    continue;
                $mol_fail(new Error(`Atlas image ${origins[i].from} is ${width}×${height}, expected ${size}×${size}`));
            }
            return images;
        }
        ready() {
            try {
                const images = this.images();
                for (let i = 0; i < images.length; ++i)
                    if ($bog_gamengine_atlas_blank(images[i]))
                        return false;
                return true;
            }
            catch (error) {
                if ($mol_promise_like(error))
                    return false;
                return $mol_fail_hidden(error);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "uris", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "kind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "sources", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "origins", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "names", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "images", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "ready", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_atlas, "image", null);
    $.$bog_gamengine_atlas = $bog_gamengine_atlas;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_batch_scale_max(world) {
        const x = world[0] * world[0] + world[1] * world[1] + world[2] * world[2];
        const y = world[4] * world[4] + world[5] * world[5] + world[6] * world[6];
        const z = world[8] * world[8] + world[9] * world[9] + world[10] * world[10];
        return Math.sqrt(Math.max(x, y, z));
    }
    $.$bog_gamengine_batch_scale_max = $bog_gamengine_batch_scale_max;
    class $bog_gamengine_batch extends $mol_object2 {
        shader(next) {
            return next ?? new $bog_gamengine_shader_flat;
        }
        shape(next) {
            return next ?? new $bog_gamengine_shape_quad;
        }
        atlas(next) {
            return next ?? null;
        }
        nodes(next) {
            return next ?? [];
        }
        source(next) {
            return next ?? null;
        }
        skip(next = 0) {
            return next;
        }
        instances(next = 0) {
            return next;
        }
        cull(next = true) {
            return next;
        }
        near(next = 0) {
            return next;
        }
        far(next = Infinity) {
            return next;
        }
        cap = 0;
        count = 0;
        version = 0;
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        material = new Float32Array(0);
        normal_layer = new Float32Array(0);
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.material = new Float32Array(cap * 4);
            this.normal_layer = new Float32Array(cap);
        }
        fill_plain(count) {
            this.grow(count);
            const trans = this.trans;
            const tint = this.tint;
            const layer = this.layer;
            const uv = this.uv;
            const material = this.material;
            const normal_layer = this.normal_layer;
            for (let i = 0; i < count; ++i) {
                const at = i * 16;
                for (let k = 0; k < 16; ++k)
                    trans[at + k] = 0;
                trans[at] = 1;
                trans[at + 5] = 1;
                trans[at + 10] = 1;
                trans[at + 15] = 1;
                for (let k = 0; k < 4; ++k)
                    tint[i * 4 + k] = 1;
                layer[i] = 0;
                uv[i * 4] = 0;
                uv[i * 4 + 1] = 0;
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
                material[i * 4] = 0;
                material[i * 4 + 1] = 0.6;
                material[i * 4 + 2] = 0;
                material[i * 4 + 3] = 0;
                normal_layer[i] = -1;
            }
            this.count = count;
            ++this.version;
            return count;
        }
        fill(frustum = null, eye = null) {
            const source = this.source();
            if (source)
                return this.fill_source(source, frustum);
            const instances = this.instances();
            if (instances > 0)
                return this.fill_plain(instances);
            const nodes = this.nodes();
            const cull = frustum && this.cull() ? frustum : null;
            const near = this.near();
            const far = this.far();
            const ranged = eye && (near > 0 || far < Infinity) ? eye : null;
            this.grow(nodes.length);
            const trans = this.trans;
            const tint = this.tint;
            const layer = this.layer;
            const uv = this.uv;
            const material = this.material;
            const normal_layer = this.normal_layer;
            let count = 0;
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                if (!node.shown())
                    continue;
                const world = node.world();
                if (ranged) {
                    const dx = world[12] - ranged[0];
                    const dy = world[13] - ranged[1];
                    const dz = world[14] - ranged[2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < near || dist >= far)
                        continue;
                }
                if (cull && typeof node.radius === 'function') {
                    const radius = node.radius() * $bog_gamengine_batch_scale_max(world);
                    if (!$bog_gamengine_cam_frustum_sphere(cull, world[12], world[13], world[14], radius))
                        continue;
                }
                trans.set(world, count * 16);
                if (typeof node.tint === 'function') {
                    tint.set(node.tint(), count * 4);
                }
                else {
                    tint[count * 4] = 1;
                    tint[count * 4 + 1] = 1;
                    tint[count * 4 + 2] = 1;
                    tint[count * 4 + 3] = 1;
                }
                layer[count] = typeof node.layer === 'function' ? node.layer() : 0;
                if (typeof node.uv === 'function') {
                    uv.set(node.uv(), count * 4);
                }
                else {
                    uv[count * 4] = 0;
                    uv[count * 4 + 1] = 0;
                    uv[count * 4 + 2] = 1;
                    uv[count * 4 + 3] = 1;
                }
                if (typeof node.material === 'function') {
                    material.set(node.material(), count * 4);
                }
                else {
                    material[count * 4] = 0;
                    material[count * 4 + 1] = 0.6;
                    material[count * 4 + 2] = 0;
                    material[count * 4 + 3] = 0;
                }
                normal_layer[count] = typeof node.normal_layer === 'function' ? node.normal_layer() : -1;
                ++count;
            }
            this.count = count;
            ++this.version;
            return count;
        }
        fill_source(source, frustum = null) {
            const skip = this.skip();
            const total = Math.max(0, source.count - skip);
            const cap = this.cap;
            this.grow(total);
            if (this.cap !== cap) {
                this.tint.fill(1);
                this.layer.fill(0);
                this.normal_layer.fill(-1);
                const uv = this.uv;
                const material = this.material;
                for (let i = 0; i < this.cap; ++i) {
                    uv[i * 4] = 0;
                    uv[i * 4 + 1] = 0;
                    uv[i * 4 + 2] = 1;
                    uv[i * 4 + 3] = 1;
                    material[i * 4] = 0;
                    material[i * 4 + 1] = 0.6;
                    material[i * 4 + 2] = 0;
                    material[i * 4 + 3] = 0;
                }
            }
            const aabb = source.aabb;
            const cull = frustum && aabb && this.cull() ? frustum : null;
            const tint = source.tint ?? null;
            const layer = source.layer ?? null;
            const uv = source.uv ?? null;
            let count = total;
            if (cull && aabb) {
                const trans = this.trans;
                const from = source.trans;
                count = 0;
                for (let i = skip; i < source.count; ++i) {
                    if (!$bog_gamengine_cam_frustum_aabb(cull, aabb, i * 6))
                        continue;
                    const src = i * 16;
                    const dst = count * 16;
                    for (let k = 0; k < 16; ++k)
                        trans[dst + k] = from[src + k];
                    if (tint)
                        for (let k = 0; k < 4; ++k)
                            this.tint[count * 4 + k] = tint[i * 4 + k];
                    if (layer)
                        this.layer[count] = layer[i];
                    if (uv)
                        for (let k = 0; k < 4; ++k)
                            this.uv[count * 4 + k] = uv[i * 4 + k];
                    ++count;
                }
            }
            else {
                this.trans.set(source.trans.subarray(skip * 16, (skip + total) * 16));
                if (tint)
                    this.tint.set(tint.subarray(skip * 4, (skip + total) * 4));
                if (layer)
                    this.layer.set(layer.subarray(skip, skip + total));
                if (uv)
                    this.uv.set(uv.subarray(skip * 4, (skip + total) * 4));
            }
            this.count = count;
            ++this.version;
            return count;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "shader", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "source", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "skip", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "instances", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "cull", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "near", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_batch.prototype, "far", null);
    $.$bog_gamengine_batch = $bog_gamengine_batch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const group_ids = new WeakMap();
    let group_id_last = 0;
    function $bog_gamengine_batch_group_id(item) {
        if (!item)
            return '0';
        let id = group_ids.get(item);
        if (!id)
            group_ids.set(item, id = String(++group_id_last));
        return id;
    }
    $.$bog_gamengine_batch_group_id = $bog_gamengine_batch_group_id;
    function $bog_gamengine_batch_group(nodes, shader, shape) {
        const parts = new Map();
        for (const node of nodes) {
            const node_shader = shader(node);
            const node_shape = shape(node);
            const atlas = node.atlas();
            const key = $bog_gamengine_batch_group_id(node_shader)
                + ' ' + $bog_gamengine_batch_group_id(node_shape)
                + ' ' + $bog_gamengine_batch_group_id(atlas);
            const part = parts.get(key);
            if (part)
                part.nodes.push(node);
            else
                parts.set(key, { key, shader: node_shader, shape: node_shape, atlas, nodes: [node] });
        }
        return [...parts.values()];
    }
    $.$bog_gamengine_batch_group = $bog_gamengine_batch_group;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys_body extends $bog_gamengine_node {
        static side_down = 1;
        static side_up = 2;
        static side_left = 4;
        static side_right = 8;
        touched = 0;
        on_ground() {
            return (this.touched & $bog_gamengine_phys_body.side_down) !== 0;
        }
        on_ceil() {
            return (this.touched & $bog_gamengine_phys_body.side_up) !== 0;
        }
        on_wall() {
            const body = $bog_gamengine_phys_body;
            return (this.touched & (body.side_left | body.side_right)) !== 0;
        }
        vel(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        kind(next) {
            return next ?? 'aabb';
        }
        still(next) {
            return next ?? false;
        }
        ghost(next) {
            return next ?? false;
        }
        props() {
            return [
                ...super.props(),
                { name: 'vel', kind: 'vec3', get: () => this.vel(), set: next => this.vel(next) },
                { name: 'size', kind: 'vec2', get: () => this.size(), set: next => this.size(next) },
                { name: 'kind', kind: 'text', get: () => this.kind(), set: next => this.kind(next) },
                { name: 'still', kind: 'flag', get: () => this.still(), set: next => this.still(next) },
                { name: 'ghost', kind: 'flag', get: () => this.ghost(), set: next => this.ghost(next) },
            ];
        }
        hit(other, normal) { }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "vel", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "kind", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "still", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_body.prototype, "ghost", null);
    $.$bog_gamengine_phys_body = $bog_gamengine_phys_body;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_map extends $mol_object2 {
        map(next) {
            return next ?? '';
        }
        plane(next) {
            return next ?? 'xy';
        }
        rows() {
            return this.map().split('\n');
        }
        width() {
            const rows = this.rows();
            let width = 0;
            for (let i = 0; i < rows.length; ++i)
                width = Math.max(width, rows[i].length);
            return width;
        }
        height() {
            return this.rows().length;
        }
        char(x, y) {
            const rows = this.rows();
            if (y < 0 || y >= rows.length)
                return '';
            const row = rows[y];
            if (x < 0 || x >= row.length)
                return '';
            return row[x];
        }
        spots(char) {
            const rows = this.rows();
            const spots = [];
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x) {
                    if (row[x] === char)
                        spots.push([x, y]);
                }
            }
            return spots;
        }
        chars() {
            const rows = this.rows();
            const chars = new Set();
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x)
                    chars.add(row[x]);
            }
            return chars;
        }
        ids(char) {
            const spots = this.spots(char);
            const ids = [];
            for (let i = 0; i < spots.length; ++i)
                ids.push(`${spots[i][0]}_${spots[i][1]}`);
            return ids;
        }
        at = new Int32Array(2);
        xy(id, out) {
            const split = id.indexOf('_');
            out[0] = Number(id.slice(0, split));
            out[1] = Number(id.slice(split + 1));
            return out;
        }
        place(cx, cy, lift, out) {
            if (this.plane() === 'xz') {
                out[0] = cx;
                out[1] = lift;
                out[2] = cy;
            }
            else {
                out[0] = cx;
                out[1] = -cy;
                out[2] = lift;
            }
            return out;
        }
        pos(x, y, lift, out) {
            return this.place(x + 0.5, y + 0.5, lift, out);
        }
        spot_pos(id, lift, out) {
            const at = this.xy(id, this.at);
            return this.pos(at[0], at[1], lift, out);
        }
        center(lift, out) {
            return this.place(this.width() / 2, this.height() / 2, lift, out);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_map.prototype, "map", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_map.prototype, "plane", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_map.prototype, "rows", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_map.prototype, "width", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_map.prototype, "height", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_map.prototype, "spots", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_map.prototype, "chars", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_map.prototype, "ids", null);
    $.$bog_gamengine_map = $bog_gamengine_map;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys_tile extends $bog_gamengine_map {
        solid(next) {
            return next ?? '#';
        }
        cell(x, y) {
            const rows = this.rows();
            if (y < 0 || y >= rows.length)
                return true;
            const row = rows[y];
            if (x < 0 || x >= row.length)
                return true;
            return this.solid().includes(row[x]);
        }
        cell_pos(x, y, out) {
            return this.pos(x, y, 0, out);
        }
        cell_at(wx, wy, out) {
            out[0] = Math.floor(wx);
            out[1] = Math.floor(-wy);
            return out;
        }
        solid_at(wx, wy) {
            const at = this.cell_at(wx, wy, this.at);
            return this.cell(at[0], at[1]);
        }
        ahead(wx, wy, dx, dy, dist) {
            const at = this.cell_at(wx + dx * dist, wy + dy * dist, this.at);
            return this.char(at[0], at[1]);
        }
        edge(wx, wy, dx, dy) {
            const at = this.cell_at(wx + dx, wy + dy, this.at);
            if (this.cell(at[0], at[1]))
                return false;
            return !this.cell(at[0], at[1] + 1);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "solid", null);
    $.$bog_gamengine_phys_tile = $bog_gamengine_phys_tile;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys extends $mol_object2 {
        static stat_window = 30;
        bodies(next) {
            return next ?? [];
        }
        tile(next) {
            return next ?? null;
        }
        gravity(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0]);
        }
        pull() {
            this.bodies();
            this.tile();
            this.gravity();
        }
        eps = 1e-4;
        normal = new Float32Array(2);
        times = new Float32Array($bog_gamengine_phys.stat_window);
        samples = 0;
        step(dt) {
            const window = $bog_gamengine_phys.stat_window;
            const start = performance.now();
            this.step_world(dt);
            this.times[this.samples % window] = performance.now() - start;
            ++this.samples;
        }
        step_ms() {
            const size = Math.min(this.samples, $bog_gamengine_phys.stat_window);
            let sum = 0;
            for (let i = 0; i < size; ++i)
                sum += this.times[i];
            return size ? sum / size : 0;
        }
        step_world(dt) {
            const bodies = this.bodies();
            const tile = this.tile();
            const gravity = this.gravity();
            const gx = gravity[0] * dt;
            const gy = gravity[1] * dt;
            for (let i = 0; i < bodies.length; ++i) {
                const body = bodies[i];
                body.touched = 0;
                if (body.still())
                    continue;
                const ghost = body.ghost();
                if (!ghost && (gx !== 0 || gy !== 0))
                    this.fall(body, gx, gy);
                this.move(body, ghost ? null : tile, dt);
            }
            for (let i = 0; i < bodies.length; ++i) {
                for (let j = i + 1; j < bodies.length; ++j)
                    this.touch(bodies[i], bodies[j]);
            }
        }
        fall(body, gx, gy) {
            const vel = body.vel();
            const next = new Float32Array(3);
            next[0] = vel[0] + gx;
            next[1] = vel[1] + gy;
            next[2] = vel[2];
            body.vel(next);
        }
        move(body, tile, dt) {
            const pos = body.pos();
            const vel = body.vel();
            const size = body.size();
            const hw = size[0] / 2;
            const hh = body.kind() === 'circle' ? hw : size[1] / 2;
            const eps = this.eps;
            const side = $bog_gamengine_phys_body;
            let x = pos[0] + vel[0] * dt;
            let y = pos[1];
            let vx = vel[0];
            let vy = vel[1];
            let hit = false;
            let nx = 0;
            let ny = 0;
            if (tile) {
                const ry0 = Math.floor(-(y + hh) + eps);
                const ry1 = Math.floor(-(y - hh) - eps);
                if (vx >= 0) {
                    const cx = Math.floor(x + hw);
                    if (this.col_solid(tile, cx, ry0, ry1)) {
                        body.touched |= side.side_right;
                        const at = cx - hw;
                        if (at !== x || vx !== 0) {
                            x = at;
                            vx = 0;
                            nx = -1;
                            hit = true;
                        }
                    }
                }
                if (vx <= 0) {
                    const cx = Math.floor(x - hw);
                    if (this.col_solid(tile, cx, ry0, ry1)) {
                        body.touched |= side.side_left;
                        const at = cx + 1 + hw;
                        if (at !== x || vx !== 0) {
                            x = at;
                            vx = 0;
                            nx = 1;
                            hit = true;
                        }
                    }
                }
            }
            y = pos[1] + vy * dt;
            if (tile) {
                const cx0 = Math.floor(x - hw + eps);
                const cx1 = Math.floor(x + hw - eps);
                if (vy >= 0) {
                    const cy = Math.floor(-(y + hh));
                    if (this.row_solid(tile, cy, cx0, cx1)) {
                        body.touched |= side.side_up;
                        const at = -cy - 1 - hh;
                        if (at !== y || vy !== 0) {
                            y = at;
                            vy = 0;
                            ny = -1;
                            hit = true;
                        }
                    }
                }
                if (vy <= 0) {
                    const cy = Math.floor(-(y - hh));
                    if (this.row_solid(tile, cy, cx0, cx1)) {
                        body.touched |= side.side_down;
                        const at = -cy + hh;
                        if (at !== y || vy !== 0) {
                            y = at;
                            vy = 0;
                            ny = 1;
                            hit = true;
                        }
                    }
                }
            }
            const next = new Float32Array(3);
            next[0] = x;
            next[1] = y;
            next[2] = pos[2];
            body.pos(next);
            const back = body.pos();
            if (back[0] !== next[0] || back[1] !== next[1]) {
                $mol_fail(new Error(`${body.title()}: pos is read-only, declare it as \`pos? <=>\``));
            }
            if (!hit)
                return;
            const next_vel = new Float32Array(3);
            next_vel[0] = vx;
            next_vel[1] = vy;
            next_vel[2] = vel[2];
            body.vel(next_vel);
            const normal = this.normal;
            const len = Math.sqrt(nx * nx + ny * ny);
            normal[0] = len === 0 ? 0 : nx / len;
            normal[1] = len === 0 ? 0 : ny / len;
            body.hit(null, normal);
        }
        col_solid(tile, cx, cy0, cy1) {
            for (let cy = cy0; cy <= cy1; ++cy)
                if (tile.cell(cx, cy))
                    return true;
            return false;
        }
        row_solid(tile, cy, cx0, cx1) {
            for (let cx = cx0; cx <= cx1; ++cx)
                if (tile.cell(cx, cy))
                    return true;
            return false;
        }
        touch(a, b) {
            const a_still = a.still();
            const b_still = b.still();
            if (a_still && b_still)
                return;
            const ap = a.pos();
            const bp = b.pos();
            const as = a.size();
            const bs = b.size();
            const dx = bp[0] - ap[0];
            const dy = bp[1] - ap[1];
            let px = 0;
            let py = 0;
            if (a.kind() === 'circle' && b.kind() === 'circle') {
                const r = (as[0] + bs[0]) / 2;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d >= r)
                    return;
                if (d === 0) {
                    px = r;
                }
                else {
                    px = (r - d) * dx / d;
                    py = (r - d) * dy / d;
                }
            }
            else {
                const ahw = as[0] / 2;
                const ahh = a.kind() === 'circle' ? ahw : as[1] / 2;
                const bhw = bs[0] / 2;
                const bhh = b.kind() === 'circle' ? bhw : bs[1] / 2;
                const ox = ahw + bhw - Math.abs(dx);
                const oy = ahh + bhh - Math.abs(dy);
                if (ox <= 0 || oy <= 0)
                    return;
                if (ox <= oy)
                    px = dx < 0 ? -ox : ox;
                else
                    py = dy < 0 ? -oy : oy;
            }
            if (!a.ghost() && !b.ghost())
                this.push(a, b, px, py);
            const normal = this.normal;
            const len = Math.sqrt(px * px + py * py);
            normal[0] = len === 0 ? 0 : -px / len;
            normal[1] = len === 0 ? 0 : -py / len;
            a.hit(b, normal);
            normal[0] = -normal[0];
            normal[1] = -normal[1];
            b.hit(a, normal);
        }
        push(a, b, px, py) {
            if (a.still()) {
                this.shift(b, px, py, true);
            }
            else if (b.still()) {
                this.shift(a, -px, -py, true);
            }
            else {
                this.shift(a, -px / 2, -py / 2, false);
                this.shift(b, px / 2, py / 2, false);
            }
        }
        shift(body, sx, sy, stop) {
            const side = $bog_gamengine_phys_body;
            if (sx > 0)
                body.touched |= side.side_left;
            else if (sx < 0)
                body.touched |= side.side_right;
            if (sy > 0)
                body.touched |= side.side_down;
            else if (sy < 0)
                body.touched |= side.side_up;
            const pos = body.pos();
            const next = new Float32Array(3);
            next[0] = pos[0] + sx;
            next[1] = pos[1] + sy;
            next[2] = pos[2];
            body.pos(next);
            if (!stop)
                return;
            const vel = body.vel();
            const len = Math.sqrt(sx * sx + sy * sy);
            if (len === 0)
                return;
            const nx = sx / len;
            const ny = sy / len;
            const into = vel[0] * nx + vel[1] * ny;
            if (into >= 0)
                return;
            const next_vel = new Float32Array(3);
            next_vel[0] = vel[0] - into * nx;
            next_vel[1] = vel[1] - into * ny;
            next_vel[2] = vel[2];
            body.vel(next_vel);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys.prototype, "bodies", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys.prototype, "tile", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys.prototype, "gravity", null);
    $.$bog_gamengine_phys = $bog_gamengine_phys;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_broad extends $mol_object2 {
        static shape_plane = 3;
        static flag_sleep = 1;
        static flag_kinematic = 4;
        pairs = new Uint32Array(0);
        pair_count = 0;
        order = new Uint32Array(0);
        order_len = 0;
        find(world) {
            this.pair_count = 0;
            this.order_sync(world.count);
            this.order_sort(world.aabb);
            this.sweep(world);
            this.planes(world);
            return this.pair_count;
        }
        order_sync(count) {
            if (this.order.length < count) {
                let len = Math.max(this.order.length, 16);
                while (len < count)
                    len *= 2;
                const next = new Uint32Array(len);
                next.set(this.order.subarray(0, this.order_len));
                this.order = next;
            }
            const order = this.order;
            let len = this.order_len;
            if (count < len) {
                let w = 0;
                for (let r = 0; r < len; ++r) {
                    if (order[r] < count)
                        order[w++] = order[r];
                }
                len = w;
            }
            while (len < count) {
                order[len] = len;
                ++len;
            }
            this.order_len = len;
        }
        order_sort(aabb) {
            const order = this.order;
            const len = this.order_len;
            for (let a = 1; a < len; ++a) {
                const i = order[a];
                const key = aabb[i * 6];
                let b = a - 1;
                while (b >= 0 && aabb[order[b] * 6] > key) {
                    order[b + 1] = order[b];
                    --b;
                }
                order[b + 1] = i;
            }
        }
        sweep(world) {
            const order = this.order;
            const len = this.order_len;
            const aabb = world.aabb, inv_mass = world.inv_mass, flags = world.flags, shape = world.shape;
            const plane = $bog_gamengine_phys3_broad.shape_plane;
            const sleep = $bog_gamengine_phys3_broad.flag_sleep;
            const kind = $bog_gamengine_phys3_broad.flag_kinematic;
            for (let a = 0; a < len; ++a) {
                const i = order[a];
                if (shape[i] === plane)
                    continue;
                const i6 = i * 6;
                const max_x = aabb[i6 + 3];
                const min_y = aabb[i6 + 1], max_y = aabb[i6 + 4];
                const min_z = aabb[i6 + 2], max_z = aabb[i6 + 5];
                const active_i = (inv_mass[i] > 0 || (flags[i] & kind) !== 0) && !(flags[i] & sleep);
                for (let b = a + 1; b < len; ++b) {
                    const j = order[b];
                    const j6 = j * 6;
                    if (aabb[j6] > max_x)
                        break;
                    if (shape[j] === plane)
                        continue;
                    if (!active_i && !((inv_mass[j] > 0 || (flags[j] & kind) !== 0) && !(flags[j] & sleep)))
                        continue;
                    if (aabb[j6 + 1] > max_y || aabb[j6 + 4] < min_y)
                        continue;
                    if (aabb[j6 + 2] > max_z || aabb[j6 + 5] < min_z)
                        continue;
                    this.push(i, j);
                }
            }
        }
        planes(world) {
            const count = world.count;
            const inv_mass = world.inv_mass, flags = world.flags, shape = world.shape;
            const plane = $bog_gamengine_phys3_broad.shape_plane;
            const sleep = $bog_gamengine_phys3_broad.flag_sleep;
            for (let i = 0; i < count; ++i) {
                if (shape[i] !== plane || inv_mass[i] > 0)
                    continue;
                for (let j = 0; j < count; ++j) {
                    if (!(inv_mass[j] > 0) || flags[j] & sleep)
                        continue;
                    this.push(i, j);
                }
            }
        }
        push(i, j) {
            const at = this.pair_count * 2;
            if (at + 2 > this.pairs.length) {
                const next = new Uint32Array(Math.max(64, this.pairs.length * 2));
                next.set(this.pairs);
                this.pairs = next;
            }
            const pairs = this.pairs;
            if (i < j) {
                pairs[at] = i;
                pairs[at + 1] = j;
            }
            else {
                pairs[at] = j;
                pairs[at + 1] = i;
            }
            ++this.pair_count;
        }
    }
    $.$bog_gamengine_phys3_broad = $bog_gamengine_phys3_broad;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const vert_cap = 128;
    const face_cap = 256;
    class $bog_gamengine_phys3_narrow extends $mol_object2 {
        contact_cap = 0;
        contact_count = 0;
        contact_a = new Uint32Array(0);
        contact_b = new Uint32Array(0);
        contact_point = new Float32Array(0);
        contact_normal = new Float32Array(0);
        contact_depth = new Float32Array(0);
        world = {};
        pair_a = 0;
        pair_b = 0;
        flip = false;
        pa = new Float32Array(3);
        pb = new Float32Array(3);
        qa = new Float32Array(4);
        qb = new Float32Array(4);
        ua = new Float32Array(9);
        ub = new Float32Array(9);
        pn = new Float32Array(3);
        axis = new Float32Array(3);
        dir = new Float32Array(3);
        tmp = new Float32Array(3);
        sup = new Float32Array(3);
        sup_local = new Float32Array(3);
        cand_count = 0;
        cand_depth = new Float32Array(4);
        cand_point = new Float32Array(12);
        poly_count = 0;
        poly = new Float32Array(48);
        poly_next = new Float32Array(48);
        si = new Int32Array(4);
        sn = 0;
        ev_count = 0;
        ev = new Float32Array(vert_cap * 3);
        eva = new Float32Array(vert_cap * 3);
        evb = new Float32Array(vert_cap * 3);
        ef_count = 0;
        ef = new Int32Array(face_cap * 3);
        efn = new Float32Array(face_cap * 3);
        efd = new Float32Array(face_cap);
        eh_count = 0;
        eh = new Int32Array(face_cap * 6);
        ec = new Float32Array(3);
        grow(need) {
            if (need <= this.contact_cap)
                return;
            let cap = Math.max(this.contact_cap, 64);
            while (cap < need)
                cap *= 2;
            this.contact_cap = cap;
            const a = new Uint32Array(cap);
            a.set(this.contact_a);
            this.contact_a = a;
            const b = new Uint32Array(cap);
            b.set(this.contact_b);
            this.contact_b = b;
            const point = new Float32Array(cap * 3);
            point.set(this.contact_point);
            this.contact_point = point;
            const normal = new Float32Array(cap * 3);
            normal.set(this.contact_normal);
            this.contact_normal = normal;
            const depth = new Float32Array(cap);
            depth.set(this.contact_depth);
            this.contact_depth = depth;
        }
        collide(world, pairs, pair_count) {
            this.world = world;
            this.contact_count = 0;
            const shape = world.shape;
            const sphere = $bog_gamengine_phys3.shape_sphere;
            const box = $bog_gamengine_phys3.shape_box;
            const capsule = $bog_gamengine_phys3.shape_capsule;
            const plane = $bog_gamengine_phys3.shape_plane;
            const hull = $bog_gamengine_phys3.shape_hull;
            for (let p = 0; p < pair_count; ++p) {
                let a = pairs[p * 2], b = pairs[p * 2 + 1];
                let sa = shape[a], sb = shape[b];
                this.flip = sa > sb;
                if (this.flip) {
                    const t = a;
                    a = b;
                    b = t;
                    const s = sa;
                    sa = sb;
                    sb = s;
                }
                this.pair_a = a;
                this.pair_b = b;
                this.load(a, this.pa, this.qa);
                this.load(b, this.pb, this.qb);
                if (sa === sphere) {
                    if (sb === sphere)
                        this.sphere_sphere();
                    else if (sb === box)
                        this.sphere_box();
                    else if (sb === capsule)
                        this.sphere_capsule();
                    else if (sb === plane)
                        this.sphere_plane();
                    else
                        this.gjk_epa();
                }
                else if (sa === box) {
                    if (sb === box)
                        this.box_box();
                    else if (sb === plane)
                        this.box_plane();
                    else
                        this.gjk_epa();
                }
                else if (sa === capsule) {
                    if (sb === capsule)
                        this.capsule_capsule();
                    else if (sb === plane)
                        this.capsule_plane();
                    else
                        this.gjk_epa();
                }
                else if (sa === plane) {
                    if (sb === hull)
                        this.plane_hull();
                }
                else
                    this.gjk_epa();
            }
            return this.contact_count;
        }
        load(i, c, q) {
            const world = this.world;
            c[0] = world.pos[i * 3];
            c[1] = world.pos[i * 3 + 1];
            c[2] = world.pos[i * 3 + 2];
            q[0] = world.rot[i * 4];
            q[1] = world.rot[i * 4 + 1];
            q[2] = world.rot[i * 4 + 2];
            q[3] = world.rot[i * 4 + 3];
        }
        emit(px, py, pz, nx, ny, nz, depth) {
            const k = this.contact_count;
            this.grow(k + 1);
            this.contact_count = k + 1;
            if (this.flip) {
                this.contact_a[k] = this.pair_b;
                this.contact_b[k] = this.pair_a;
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            else {
                this.contact_a[k] = this.pair_a;
                this.contact_b[k] = this.pair_b;
            }
            this.contact_point[k * 3] = px;
            this.contact_point[k * 3 + 1] = py;
            this.contact_point[k * 3 + 2] = pz;
            this.contact_normal[k * 3] = nx;
            this.contact_normal[k * 3 + 1] = ny;
            this.contact_normal[k * 3 + 2] = nz;
            this.contact_depth[k] = depth;
        }
        cand_push(px, py, pz, depth) {
            let k = this.cand_count;
            const cand_depth = this.cand_depth;
            if (k < 4) {
                this.cand_count = k + 1;
            }
            else {
                k = 0;
                for (let m = 1; m < 4; ++m)
                    if (cand_depth[m] < cand_depth[k])
                        k = m;
                if (depth <= cand_depth[k])
                    return;
            }
            cand_depth[k] = depth;
            this.cand_point[k * 3] = px;
            this.cand_point[k * 3 + 1] = py;
            this.cand_point[k * 3 + 2] = pz;
        }
        cand_flush(nx, ny, nz) {
            const point = this.cand_point, depth = this.cand_depth;
            for (let k = 0; k < this.cand_count; ++k) {
                this.emit(point[k * 3], point[k * 3 + 1], point[k * 3 + 2], nx, ny, nz, depth[k]);
            }
            this.cand_count = 0;
        }
        rot_apply(out, q, vx, vy, vz) {
            const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
            const tx = 2 * (qy * vz - qz * vy);
            const ty = 2 * (qz * vx - qx * vz);
            const tz = 2 * (qx * vy - qy * vx);
            out[0] = vx + qw * tx + qy * tz - qz * ty;
            out[1] = vy + qw * ty + qz * tx - qx * tz;
            out[2] = vz + qw * tz + qx * ty - qy * tx;
            return out;
        }
        rot_unapply(out, q, vx, vy, vz) {
            const qx = -q[0], qy = -q[1], qz = -q[2], qw = q[3];
            const tx = 2 * (qy * vz - qz * vy);
            const ty = 2 * (qz * vx - qx * vz);
            const tz = 2 * (qx * vy - qy * vx);
            out[0] = vx + qw * tx + qy * tz - qz * ty;
            out[1] = vy + qw * ty + qz * tx - qx * tz;
            out[2] = vz + qw * tz + qx * ty - qy * tx;
            return out;
        }
        axes(out, q) {
            const x = q[0], y = q[1], z = q[2], w = q[3];
            const xx = x * x, yy = y * y, zz = z * z;
            const xy = x * y, xz = x * z, yz = y * z;
            const wx = w * x, wy = w * y, wz = w * z;
            out[0] = 1 - 2 * (yy + zz);
            out[1] = 2 * (xy + wz);
            out[2] = 2 * (xz - wy);
            out[3] = 2 * (xy - wz);
            out[4] = 1 - 2 * (xx + zz);
            out[5] = 2 * (yz + wx);
            out[6] = 2 * (xz + wy);
            out[7] = 2 * (yz - wx);
            out[8] = 1 - 2 * (xx + yy);
            return out;
        }
        plane_normal(i, q, out) {
            const size = this.world.size;
            this.rot_apply(out, q, size[i * 3], size[i * 3 + 1], size[i * 3 + 2]);
            const len = Math.sqrt(out[0] * out[0] + out[1] * out[1] + out[2] * out[2]);
            const k = len > 0 ? 1 / len : 0;
            out[0] *= k;
            out[1] *= k;
            out[2] *= k;
            return out;
        }
        sphere_sphere() {
            const size = this.world.size;
            const pa = this.pa, pb = this.pb;
            const ra = size[this.pair_a * 3], rb = size[this.pair_b * 3];
            this.sphere_pair(pa[0], pa[1], pa[2], ra, pb[0], pb[1], pb[2], rb);
        }
        sphere_pair(ax, ay, az, ra, bx, by, bz, rb) {
            const dx = bx - ax, dy = by - ay, dz = bz - az;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const depth = ra + rb - dist;
            if (depth < 0)
                return;
            let nx = 0, ny = 1, nz = 0;
            if (dist > 0) {
                nx = dx / dist;
                ny = dy / dist;
                nz = dz / dist;
            }
            const k = ra - depth / 2;
            this.emit(ax + nx * k, ay + ny * k, az + nz * k, nx, ny, nz, depth);
        }
        sphere_plane() {
            const size = this.world.size;
            const pa = this.pa, pb = this.pb;
            const n = this.plane_normal(this.pair_b, this.qb, this.pn);
            const r = size[this.pair_a * 3];
            this.sphere_plane_point(pa[0], pa[1], pa[2], r, pb, n);
        }
        sphere_plane_point(cx, cy, cz, r, p, n) {
            const d = (cx - p[0]) * n[0] + (cy - p[1]) * n[1] + (cz - p[2]) * n[2];
            const depth = r - d;
            if (depth < 0)
                return;
            const k = (d + r) / 2;
            this.emit(cx - n[0] * k, cy - n[1] * k, cz - n[2] * k, -n[0], -n[1], -n[2], depth);
        }
        box_plane() {
            const size = this.world.size;
            const a = this.pair_a;
            const pa = this.pa, pb = this.pb, u = this.axes(this.ua, this.qa);
            const n = this.plane_normal(this.pair_b, this.qb, this.pn);
            const h0 = size[a * 3], h1 = size[a * 3 + 1], h2 = size[a * 3 + 2];
            for (let s = 0; s < 8; ++s) {
                const s0 = s & 1 ? h0 : -h0;
                const s1 = s & 2 ? h1 : -h1;
                const s2 = s & 4 ? h2 : -h2;
                const vx = pa[0] + s0 * u[0] + s1 * u[3] + s2 * u[6];
                const vy = pa[1] + s0 * u[1] + s1 * u[4] + s2 * u[7];
                const vz = pa[2] + s0 * u[2] + s1 * u[5] + s2 * u[8];
                const d = (vx - pb[0]) * n[0] + (vy - pb[1]) * n[1] + (vz - pb[2]) * n[2];
                if (d > 0)
                    continue;
                this.cand_push(vx - n[0] * d / 2, vy - n[1] * d / 2, vz - n[2] * d / 2, -d);
            }
            this.cand_flush(-n[0], -n[1], -n[2]);
        }
        capsule_plane() {
            const size = this.world.size;
            const a = this.pair_a;
            const pa = this.pa, pb = this.pb;
            const n = this.plane_normal(this.pair_b, this.qb, this.pn);
            const r = size[a * 3], h = size[a * 3 + 1];
            const axis = this.rot_apply(this.axis, this.qa, 0, h, 0);
            this.sphere_plane_point(pa[0] + axis[0], pa[1] + axis[1], pa[2] + axis[2], r, pb, n);
            this.sphere_plane_point(pa[0] - axis[0], pa[1] - axis[1], pa[2] - axis[2], r, pb, n);
        }
        plane_hull() {
            const world = this.world;
            const b = this.pair_b;
            const pa = this.pa, pb = this.pb, qb = this.qb, v = this.tmp;
            const n = this.plane_normal(this.pair_a, this.qa, this.pn);
            const hull = world.hull, off = world.hull_off[b], count = world.hull_count[b];
            for (let k = 0; k < count; ++k) {
                this.rot_apply(v, qb, hull[off + k * 3], hull[off + k * 3 + 1], hull[off + k * 3 + 2]);
                const vx = pb[0] + v[0], vy = pb[1] + v[1], vz = pb[2] + v[2];
                const d = (vx - pa[0]) * n[0] + (vy - pa[1]) * n[1] + (vz - pa[2]) * n[2];
                if (d > 0)
                    continue;
                this.cand_push(vx - n[0] * d / 2, vy - n[1] * d / 2, vz - n[2] * d / 2, -d);
            }
            this.cand_flush(n[0], n[1], n[2]);
        }
        sphere_box() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb, qb = this.qb;
            const l = this.rot_unapply(this.tmp, qb, pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
            const hx = size[b * 3], hy = size[b * 3 + 1], hz = size[b * 3 + 2];
            const r = size[a * 3];
            let cx = l[0] < -hx ? -hx : l[0] > hx ? hx : l[0];
            let cy = l[1] < -hy ? -hy : l[1] > hy ? hy : l[1];
            let cz = l[2] < -hz ? -hz : l[2] > hz ? hz : l[2];
            let dx = l[0] - cx, dy = l[1] - cy, dz = l[2] - cz;
            const dist2 = dx * dx + dy * dy + dz * dz;
            if (dist2 > r * r)
                return;
            let depth = 0;
            if (dist2 > 1e-12) {
                const dist = Math.sqrt(dist2);
                dx /= dist;
                dy /= dist;
                dz /= dist;
                depth = r - dist;
            }
            else {
                const gx = hx - Math.abs(l[0]), gy = hy - Math.abs(l[1]), gz = hz - Math.abs(l[2]);
                dx = 0;
                dy = 0;
                dz = 0;
                if (gx <= gy && gx <= gz) {
                    dx = l[0] < 0 ? -1 : 1;
                    cx = dx * hx;
                    depth = r + gx;
                }
                else if (gy <= gz) {
                    dy = l[1] < 0 ? -1 : 1;
                    cy = dy * hy;
                    depth = r + gy;
                }
                else {
                    dz = l[2] < 0 ? -1 : 1;
                    cz = dz * hz;
                    depth = r + gz;
                }
            }
            const n = this.rot_apply(this.pn, qb, dx, dy, dz);
            const s = this.rot_apply(this.sup, qb, cx, cy, cz);
            this.emit(pb[0] + s[0] - n[0] * depth / 2, pb[1] + s[1] - n[1] * depth / 2, pb[2] + s[2] - n[2] * depth / 2, -n[0], -n[1], -n[2], depth);
        }
        sphere_capsule() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb;
            const ra = size[a * 3], rb = size[b * 3], h = size[b * 3 + 1];
            const axis = this.rot_apply(this.axis, this.qb, 0, 1, 0);
            let t = (pa[0] - pb[0]) * axis[0] + (pa[1] - pb[1]) * axis[1] + (pa[2] - pb[2]) * axis[2];
            t = t < -h ? -h : t > h ? h : t;
            this.sphere_pair(pa[0], pa[1], pa[2], ra, pb[0] + axis[0] * t, pb[1] + axis[1] * t, pb[2] + axis[2] * t, rb);
        }
        capsule_capsule() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb;
            const ra = size[a * 3], ha = size[a * 3 + 1];
            const rb = size[b * 3], hb = size[b * 3 + 1];
            const d1 = this.rot_apply(this.axis, this.qa, 0, 2 * ha, 0);
            const d2 = this.rot_apply(this.tmp, this.qb, 0, 2 * hb, 0);
            const p1x = pa[0] - d1[0] / 2, p1y = pa[1] - d1[1] / 2, p1z = pa[2] - d1[2] / 2;
            const p2x = pb[0] - d2[0] / 2, p2y = pb[1] - d2[1] / 2, p2z = pb[2] - d2[2] / 2;
            const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z;
            const aa = d1[0] * d1[0] + d1[1] * d1[1] + d1[2] * d1[2];
            const ee = d2[0] * d2[0] + d2[1] * d2[1] + d2[2] * d2[2];
            const f = d2[0] * rx + d2[1] * ry + d2[2] * rz;
            let s = 0, t = 0;
            const eps = 1e-12;
            if (aa <= eps && ee <= eps) {
            }
            else if (aa <= eps) {
                t = f / ee;
                t = t < 0 ? 0 : t > 1 ? 1 : t;
            }
            else {
                const c = d1[0] * rx + d1[1] * ry + d1[2] * rz;
                if (ee <= eps) {
                    s = -c / aa;
                    s = s < 0 ? 0 : s > 1 ? 1 : s;
                }
                else {
                    const bb = d1[0] * d2[0] + d1[1] * d2[1] + d1[2] * d2[2];
                    const denom = aa * ee - bb * bb;
                    if (denom !== 0) {
                        s = (bb * f - c * ee) / denom;
                        s = s < 0 ? 0 : s > 1 ? 1 : s;
                    }
                    t = (bb * s + f) / ee;
                    if (t < 0) {
                        t = 0;
                        s = -c / aa;
                        s = s < 0 ? 0 : s > 1 ? 1 : s;
                    }
                    else if (t > 1) {
                        t = 1;
                        s = (bb - c) / aa;
                        s = s < 0 ? 0 : s > 1 ? 1 : s;
                    }
                }
            }
            this.sphere_pair(p1x + d1[0] * s, p1y + d1[1] * s, p1z + d1[2] * s, ra, p2x + d2[0] * t, p2y + d2[1] * t, p2z + d2[2] * t, rb);
        }
        box_box() {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb;
            const ua = this.axes(this.ua, this.qa), ub = this.axes(this.ub, this.qb);
            const ha0 = size[a * 3], ha1 = size[a * 3 + 1], ha2 = size[a * 3 + 2];
            const hb0 = size[b * 3], hb1 = size[b * 3 + 1], hb2 = size[b * 3 + 2];
            const dx = pb[0] - pa[0], dy = pb[1] - pa[1], dz = pb[2] - pa[2];
            const dir = this.dir;
            let best = Infinity, best_over = 0, best_axis = -1;
            for (let k = 0; k < 15; ++k) {
                let lx = 0, ly = 0, lz = 0;
                if (k < 3) {
                    lx = ua[k * 3];
                    ly = ua[k * 3 + 1];
                    lz = ua[k * 3 + 2];
                }
                else if (k < 6) {
                    lx = ub[(k - 3) * 3];
                    ly = ub[(k - 3) * 3 + 1];
                    lz = ub[(k - 3) * 3 + 2];
                }
                else {
                    const i = ((k - 6) / 3 | 0) * 3, j = ((k - 6) % 3) * 3;
                    const ax = ua[i], ay = ua[i + 1], az = ua[i + 2];
                    const bx = ub[j], by = ub[j + 1], bz = ub[j + 2];
                    lx = ay * bz - az * by;
                    ly = az * bx - ax * bz;
                    lz = ax * by - ay * bx;
                    const len2 = lx * lx + ly * ly + lz * lz;
                    if (len2 < 1e-8)
                        continue;
                    const inv = 1 / Math.sqrt(len2);
                    lx *= inv;
                    ly *= inv;
                    lz *= inv;
                }
                const ra = ha0 * Math.abs(ua[0] * lx + ua[1] * ly + ua[2] * lz)
                    + ha1 * Math.abs(ua[3] * lx + ua[4] * ly + ua[5] * lz)
                    + ha2 * Math.abs(ua[6] * lx + ua[7] * ly + ua[8] * lz);
                const rb = hb0 * Math.abs(ub[0] * lx + ub[1] * ly + ub[2] * lz)
                    + hb1 * Math.abs(ub[3] * lx + ub[4] * ly + ub[5] * lz)
                    + hb2 * Math.abs(ub[6] * lx + ub[7] * ly + ub[8] * lz);
                const dist = dx * lx + dy * ly + dz * lz;
                const over = ra + rb - Math.abs(dist);
                if (over < 0)
                    return;
                const score = k < 6 ? over : over * 1.05 + 1e-5;
                if (score < best) {
                    best = score;
                    best_over = over;
                    best_axis = k;
                    if (dist < 0) {
                        dir[0] = -lx;
                        dir[1] = -ly;
                        dir[2] = -lz;
                    }
                    else {
                        dir[0] = lx;
                        dir[1] = ly;
                        dir[2] = lz;
                    }
                }
            }
            if (best_axis < 0)
                return;
            if (best_axis < 6)
                this.box_box_face(best_axis);
            else
                this.box_box_edge(best_axis, best_over);
        }
        box_box_face(axis) {
            const size = this.world.size;
            const ref_a = axis < 3;
            const ref = ref_a ? this.pair_a : this.pair_b, inc = ref_a ? this.pair_b : this.pair_a;
            const cr = ref_a ? this.pa : this.pb, ci = ref_a ? this.pb : this.pa;
            const ur = ref_a ? this.ua : this.ub, ui = ref_a ? this.ub : this.ua;
            const dir = this.dir;
            const nx = ref_a ? dir[0] : -dir[0];
            const ny = ref_a ? dir[1] : -dir[1];
            const nz = ref_a ? dir[2] : -dir[2];
            const ri = axis % 3;
            let j = 0, jd = -1;
            for (let k = 0; k < 3; ++k) {
                const d = Math.abs(ui[k * 3] * nx + ui[k * 3 + 1] * ny + ui[k * 3 + 2] * nz);
                if (d > jd) {
                    jd = d;
                    j = k;
                }
            }
            const js = ui[j * 3] * nx + ui[j * 3 + 1] * ny + ui[j * 3 + 2] * nz > 0 ? -1 : 1;
            const k1 = (j + 1) % 3, k2 = (j + 2) % 3;
            const hj = size[inc * 3 + j] * js, h1 = size[inc * 3 + k1], h2 = size[inc * 3 + k2];
            const fx = ci[0] + ui[j * 3] * hj, fy = ci[1] + ui[j * 3 + 1] * hj, fz = ci[2] + ui[j * 3 + 2] * hj;
            const e1x = ui[k1 * 3] * h1, e1y = ui[k1 * 3 + 1] * h1, e1z = ui[k1 * 3 + 2] * h1;
            const e2x = ui[k2 * 3] * h2, e2y = ui[k2 * 3 + 1] * h2, e2z = ui[k2 * 3 + 2] * h2;
            const poly = this.poly;
            poly[0] = fx + e1x + e2x;
            poly[1] = fy + e1y + e2y;
            poly[2] = fz + e1z + e2z;
            poly[3] = fx - e1x + e2x;
            poly[4] = fy - e1y + e2y;
            poly[5] = fz - e1z + e2z;
            poly[6] = fx - e1x - e2x;
            poly[7] = fy - e1y - e2y;
            poly[8] = fz - e1z - e2z;
            poly[9] = fx + e1x - e2x;
            poly[10] = fy + e1y - e2y;
            poly[11] = fz + e1z - e2z;
            this.poly_count = 4;
            for (let m = 0; m < 3; ++m) {
                if (m === ri)
                    continue;
                const mx = ur[m * 3], my = ur[m * 3 + 1], mz = ur[m * 3 + 2];
                const cd = mx * cr[0] + my * cr[1] + mz * cr[2];
                const h = size[ref * 3 + m];
                this.clip(mx, my, mz, cd + h);
                this.clip(-mx, -my, -mz, -cd + h);
            }
            const hr = size[ref * 3 + ri];
            const cn = nx * cr[0] + ny * cr[1] + nz * cr[2] + hr;
            const out = this.poly;
            for (let k = 0; k < this.poly_count; ++k) {
                const vx = out[k * 3], vy = out[k * 3 + 1], vz = out[k * 3 + 2];
                const sep = nx * vx + ny * vy + nz * vz - cn;
                if (sep > 0)
                    continue;
                this.cand_push(vx - nx * sep / 2, vy - ny * sep / 2, vz - nz * sep / 2, -sep);
            }
            this.cand_flush(dir[0], dir[1], dir[2]);
        }
        clip(nx, ny, nz, off) {
            const src = this.poly, dst = this.poly_next, n = this.poly_count;
            let m = 0;
            for (let i = 0; i < n; ++i) {
                const j = (i + 1) % n;
                const ix = src[i * 3], iy = src[i * 3 + 1], iz = src[i * 3 + 2];
                const jx = src[j * 3], jy = src[j * 3 + 1], jz = src[j * 3 + 2];
                const fi = off - (nx * ix + ny * iy + nz * iz);
                const fj = off - (nx * jx + ny * jy + nz * jz);
                if (fi >= 0) {
                    dst[m * 3] = ix;
                    dst[m * 3 + 1] = iy;
                    dst[m * 3 + 2] = iz;
                    ++m;
                }
                if ((fi >= 0) !== (fj >= 0)) {
                    const t = fi / (fi - fj);
                    dst[m * 3] = ix + (jx - ix) * t;
                    dst[m * 3 + 1] = iy + (jy - iy) * t;
                    dst[m * 3 + 2] = iz + (jz - iz) * t;
                    ++m;
                }
            }
            this.poly_count = m;
            this.poly = dst;
            this.poly_next = src;
        }
        box_box_edge(axis, over) {
            const size = this.world.size;
            const a = this.pair_a, b = this.pair_b;
            const pa = this.pa, pb = this.pb, ua = this.ua, ub = this.ub, dir = this.dir;
            const i = (axis - 6) / 3 | 0, j = (axis - 6) % 3;
            let p1x = pa[0], p1y = pa[1], p1z = pa[2];
            let p2x = pb[0], p2y = pb[1], p2z = pb[2];
            for (let k = 0; k < 3; ++k) {
                if (k !== i) {
                    const d = ua[k * 3] * dir[0] + ua[k * 3 + 1] * dir[1] + ua[k * 3 + 2] * dir[2];
                    const h = d > 0 ? size[a * 3 + k] : -size[a * 3 + k];
                    p1x += ua[k * 3] * h;
                    p1y += ua[k * 3 + 1] * h;
                    p1z += ua[k * 3 + 2] * h;
                }
                if (k !== j) {
                    const d = ub[k * 3] * dir[0] + ub[k * 3 + 1] * dir[1] + ub[k * 3 + 2] * dir[2];
                    const h = d > 0 ? -size[b * 3 + k] : size[b * 3 + k];
                    p2x += ub[k * 3] * h;
                    p2y += ub[k * 3 + 1] * h;
                    p2z += ub[k * 3 + 2] * h;
                }
            }
            const e1x = ua[i * 3], e1y = ua[i * 3 + 1], e1z = ua[i * 3 + 2];
            const e2x = ub[j * 3], e2y = ub[j * 3 + 1], e2z = ub[j * 3 + 2];
            const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z;
            const bb = e1x * e2x + e1y * e2y + e1z * e2z;
            const c = e1x * rx + e1y * ry + e1z * rz;
            const f = e2x * rx + e2y * ry + e2z * rz;
            const den = 1 - bb * bb;
            let s = (bb * f - c) / den;
            let t = (f - bb * c) / den;
            const ha = size[a * 3 + i], hb = size[b * 3 + j];
            s = s < -ha ? -ha : s > ha ? ha : s;
            t = t < -hb ? -hb : t > hb ? hb : t;
            this.emit((p1x + e1x * s + p2x + e2x * t) / 2, (p1y + e1y * s + p2y + e2y * t) / 2, (p1z + e1z * s + p2z + e2z * t) / 2, dir[0], dir[1], dir[2], over);
        }
        support(i, c, q, dx, dy, dz, out) {
            const world = this.world, size = world.size, s = i * 3;
            const shape = world.shape[i];
            if (shape === $bog_gamengine_phys3.shape_sphere) {
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const k = len > 0 ? size[s] / len : 0;
                out[0] = c[0] + dx * k;
                out[1] = c[1] + dy * k;
                out[2] = c[2] + dz * k;
                return out;
            }
            const l = this.rot_unapply(this.sup_local, q, dx, dy, dz);
            if (shape === $bog_gamengine_phys3.shape_box) {
                this.rot_apply(out, q, l[0] >= 0 ? size[s] : -size[s], l[1] >= 0 ? size[s + 1] : -size[s + 1], l[2] >= 0 ? size[s + 2] : -size[s + 2]);
            }
            else if (shape === $bog_gamengine_phys3.shape_capsule) {
                this.rot_apply(out, q, 0, l[1] >= 0 ? size[s + 1] : -size[s + 1], 0);
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const k = len > 0 ? size[s] / len : 0;
                out[0] += dx * k;
                out[1] += dy * k;
                out[2] += dz * k;
            }
            else if (shape === $bog_gamengine_phys3.shape_hull) {
                const hull = world.hull, off = world.hull_off[i], count = world.hull_count[i];
                let best = -Infinity, bx = 0, by = 0, bz = 0;
                for (let k = 0; k < count; ++k) {
                    const vx = hull[off + k * 3], vy = hull[off + k * 3 + 1], vz = hull[off + k * 3 + 2];
                    const d = vx * l[0] + vy * l[1] + vz * l[2];
                    if (d > best) {
                        best = d;
                        bx = vx;
                        by = vy;
                        bz = vz;
                    }
                }
                this.rot_apply(out, q, bx, by, bz);
            }
            else {
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
            }
            out[0] += c[0];
            out[1] += c[1];
            out[2] += c[2];
            return out;
        }
        mink(dx, dy, dz) {
            const k = this.ev_count;
            if (k >= vert_cap)
                return -1;
            const s = this.sup, eva = this.eva, evb = this.evb, ev = this.ev;
            this.support(this.pair_a, this.pa, this.qa, dx, dy, dz, s);
            eva[k * 3] = s[0];
            eva[k * 3 + 1] = s[1];
            eva[k * 3 + 2] = s[2];
            this.support(this.pair_b, this.pb, this.qb, -dx, -dy, -dz, s);
            evb[k * 3] = s[0];
            evb[k * 3 + 1] = s[1];
            evb[k * 3 + 2] = s[2];
            ev[k * 3] = eva[k * 3] - s[0];
            ev[k * 3 + 1] = eva[k * 3 + 1] - s[1];
            ev[k * 3 + 2] = eva[k * 3 + 2] - s[2];
            this.ev_count = k + 1;
            return k;
        }
        gjk_epa() {
            if (!this.gjk())
                return;
            this.epa();
        }
        gjk() {
            this.ev_count = 0;
            const dir = this.dir, si = this.si, ev = this.ev;
            const pa = this.pa, pb = this.pb;
            dir[0] = pb[0] - pa[0];
            dir[1] = pb[1] - pa[1];
            dir[2] = pb[2] - pa[2];
            if (dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2] < 1e-12)
                dir[0] = 1;
            let k = this.mink(dir[0], dir[1], dir[2]);
            si[0] = k;
            this.sn = 1;
            dir[0] = -ev[k * 3];
            dir[1] = -ev[k * 3 + 1];
            dir[2] = -ev[k * 3 + 2];
            for (let iter = 0; iter < 32; ++iter) {
                if (dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2] < 1e-12)
                    return true;
                k = this.mink(dir[0], dir[1], dir[2]);
                if (k < 0)
                    return false;
                if (ev[k * 3] * dir[0] + ev[k * 3 + 1] * dir[1] + ev[k * 3 + 2] * dir[2] <= 0)
                    return false;
                si[this.sn++] = k;
                if (this.simplex())
                    return true;
            }
            return false;
        }
        simplex() {
            if (this.sn === 2)
                return this.simplex_line();
            if (this.sn === 3)
                return this.simplex_triangle();
            return this.simplex_tetra();
        }
        simplex_line() {
            const ev = this.ev, si = this.si, dir = this.dir;
            const a = si[1] * 3, b = si[0] * 3;
            const ax = ev[a], ay = ev[a + 1], az = ev[a + 2];
            const abx = ev[b] - ax, aby = ev[b + 1] - ay, abz = ev[b + 2] - az;
            const aox = -ax, aoy = -ay, aoz = -az;
            if (abx * aox + aby * aoy + abz * aoz > 0) {
                const tx = aby * aoz - abz * aoy, ty = abz * aox - abx * aoz, tz = abx * aoy - aby * aox;
                dir[0] = ty * abz - tz * aby;
                dir[1] = tz * abx - tx * abz;
                dir[2] = tx * aby - ty * abx;
            }
            else {
                si[0] = si[1];
                this.sn = 1;
                dir[0] = aox;
                dir[1] = aoy;
                dir[2] = aoz;
            }
            return false;
        }
        simplex_triangle() {
            const ev = this.ev, si = this.si, dir = this.dir;
            const a = si[2] * 3, b = si[1] * 3, c = si[0] * 3;
            const ax = ev[a], ay = ev[a + 1], az = ev[a + 2];
            const abx = ev[b] - ax, aby = ev[b + 1] - ay, abz = ev[b + 2] - az;
            const acx = ev[c] - ax, acy = ev[c + 1] - ay, acz = ev[c + 2] - az;
            const aox = -ax, aoy = -ay, aoz = -az;
            const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
            const tx = ny * acz - nz * acy, ty = nz * acx - nx * acz, tz = nx * acy - ny * acx;
            if (tx * aox + ty * aoy + tz * aoz > 0) {
                if (acx * aox + acy * aoy + acz * aoz > 0) {
                    si[1] = si[2];
                    this.sn = 2;
                    const px = acy * aoz - acz * aoy, py = acz * aox - acx * aoz, pz = acx * aoy - acy * aox;
                    dir[0] = py * acz - pz * acy;
                    dir[1] = pz * acx - px * acz;
                    dir[2] = px * acy - py * acx;
                    return false;
                }
                si[0] = si[1];
                si[1] = si[2];
                this.sn = 2;
                return this.simplex_line();
            }
            const sx = aby * nz - abz * ny, sy = abz * nx - abx * nz, sz = abx * ny - aby * nx;
            if (sx * aox + sy * aoy + sz * aoz > 0) {
                si[0] = si[1];
                si[1] = si[2];
                this.sn = 2;
                return this.simplex_line();
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                dir[0] = nx;
                dir[1] = ny;
                dir[2] = nz;
            }
            else {
                const t = si[0];
                si[0] = si[1];
                si[1] = t;
                dir[0] = -nx;
                dir[1] = -ny;
                dir[2] = -nz;
            }
            return false;
        }
        simplex_tetra() {
            const ev = this.ev, si = this.si;
            const a = si[3] * 3, b = si[2] * 3, c = si[1] * 3, d = si[0] * 3;
            const ax = ev[a], ay = ev[a + 1], az = ev[a + 2];
            const abx = ev[b] - ax, aby = ev[b + 1] - ay, abz = ev[b + 2] - az;
            const acx = ev[c] - ax, acy = ev[c + 1] - ay, acz = ev[c + 2] - az;
            const adx = ev[d] - ax, ady = ev[d + 1] - ay, adz = ev[d + 2] - az;
            const aox = -ax, aoy = -ay, aoz = -az;
            let nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
            if (nx * adx + ny * ady + nz * adz > 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                si[0] = si[1];
                si[1] = si[2];
                si[2] = si[3];
                this.sn = 3;
                return this.simplex_triangle();
            }
            nx = acy * adz - acz * ady;
            ny = acz * adx - acx * adz;
            nz = acx * ady - acy * adx;
            if (nx * abx + ny * aby + nz * abz > 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                si[2] = si[3];
                this.sn = 3;
                return this.simplex_triangle();
            }
            nx = ady * abz - adz * aby;
            ny = adz * abx - adx * abz;
            nz = adx * aby - ady * abx;
            if (nx * acx + ny * acy + nz * acz > 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
            }
            if (nx * aox + ny * aoy + nz * aoz > 0) {
                const t = si[0];
                si[0] = si[2];
                si[1] = t;
                si[2] = si[3];
                this.sn = 3;
                return this.simplex_triangle();
            }
            return true;
        }
        simplex_fill() {
            const ev = this.ev, si = this.si;
            if (this.sn === 1) {
                const a = si[0] * 3;
                for (let s = 0; s < 6 && this.sn < 2; ++s) {
                    const sign = s & 1 ? -1 : 1;
                    const k = this.mink(s < 2 ? sign : 0, s >= 2 && s < 4 ? sign : 0, s >= 4 ? sign : 0);
                    if (k < 0)
                        return false;
                    const dx = ev[k * 3] - ev[a], dy = ev[k * 3 + 1] - ev[a + 1], dz = ev[k * 3 + 2] - ev[a + 2];
                    if (dx * dx + dy * dy + dz * dz > 1e-10) {
                        si[1] = k;
                        this.sn = 2;
                    }
                }
                if (this.sn < 2)
                    return false;
            }
            if (this.sn === 2) {
                const a = si[0] * 3, b = si[1] * 3;
                const abx = ev[b] - ev[a], aby = ev[b + 1] - ev[a + 1], abz = ev[b + 2] - ev[a + 2];
                const mx = Math.abs(abx), my = Math.abs(aby), mz = Math.abs(abz);
                const ex = mx <= my && mx <= mz ? 1 : 0, ey = ex === 0 && my <= mz ? 1 : 0, ez = ex === 0 && ey === 0 ? 1 : 0;
                const px = aby * ez - abz * ey, py = abz * ex - abx * ez, pz = abx * ey - aby * ex;
                for (let s = 0; s < 2 && this.sn < 3; ++s) {
                    const sign = s ? -1 : 1;
                    const k = this.mink(px * sign, py * sign, pz * sign);
                    if (k < 0)
                        return false;
                    const vx = ev[k * 3] - ev[a], vy = ev[k * 3 + 1] - ev[a + 1], vz = ev[k * 3 + 2] - ev[a + 2];
                    const cx = aby * vz - abz * vy, cy = abz * vx - abx * vz, cz = abx * vy - aby * vx;
                    if (cx * cx + cy * cy + cz * cz > 1e-10 * (abx * abx + aby * aby + abz * abz)) {
                        si[2] = k;
                        this.sn = 3;
                    }
                }
                if (this.sn < 3)
                    return false;
            }
            if (this.sn === 3) {
                const a = si[0] * 3, b = si[1] * 3, c = si[2] * 3;
                const abx = ev[b] - ev[a], aby = ev[b + 1] - ev[a + 1], abz = ev[b + 2] - ev[a + 2];
                const acx = ev[c] - ev[a], acy = ev[c + 1] - ev[a + 1], acz = ev[c + 2] - ev[a + 2];
                const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
                const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
                if (len < 1e-12)
                    return false;
                for (let s = 0; s < 2 && this.sn < 4; ++s) {
                    const sign = s ? -1 : 1;
                    const k = this.mink(nx * sign, ny * sign, nz * sign);
                    if (k < 0)
                        return false;
                    const d = ((ev[k * 3] - ev[a]) * nx + (ev[k * 3 + 1] - ev[a + 1]) * ny + (ev[k * 3 + 2] - ev[a + 2]) * nz) / len;
                    if (Math.abs(d) > 1e-6) {
                        si[3] = k;
                        this.sn = 4;
                    }
                }
                if (this.sn < 4)
                    return false;
            }
            return true;
        }
        face_add(i0, i1, i2) {
            const k = this.ef_count;
            if (k >= face_cap)
                return;
            const ev = this.ev, ec = this.ec;
            const ax = ev[i0 * 3], ay = ev[i0 * 3 + 1], az = ev[i0 * 3 + 2];
            const e1x = ev[i1 * 3] - ax, e1y = ev[i1 * 3 + 1] - ay, e1z = ev[i1 * 3 + 2] - az;
            const e2x = ev[i2 * 3] - ax, e2y = ev[i2 * 3 + 1] - ay, e2z = ev[i2 * 3 + 2] - az;
            let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
            const len2 = nx * nx + ny * ny + nz * nz;
            if (len2 < 1e-14)
                return;
            const inv = 1 / Math.sqrt(len2);
            nx *= inv;
            ny *= inv;
            nz *= inv;
            if (nx * (ax - ec[0]) + ny * (ay - ec[1]) + nz * (az - ec[2]) < 0) {
                nx = -nx;
                ny = -ny;
                nz = -nz;
                const t = i1;
                i1 = i2;
                i2 = t;
            }
            this.ef[k * 3] = i0;
            this.ef[k * 3 + 1] = i1;
            this.ef[k * 3 + 2] = i2;
            this.efn[k * 3] = nx;
            this.efn[k * 3 + 1] = ny;
            this.efn[k * 3 + 2] = nz;
            this.efd[k] = nx * ax + ny * ay + nz * az;
            this.ef_count = k + 1;
        }
        face_remove(i) {
            const last = --this.ef_count;
            const ef = this.ef, efn = this.efn;
            ef[i * 3] = ef[last * 3];
            ef[i * 3 + 1] = ef[last * 3 + 1];
            ef[i * 3 + 2] = ef[last * 3 + 2];
            efn[i * 3] = efn[last * 3];
            efn[i * 3 + 1] = efn[last * 3 + 1];
            efn[i * 3 + 2] = efn[last * 3 + 2];
            this.efd[i] = this.efd[last];
        }
        horizon_edge(a, b) {
            const eh = this.eh;
            for (let i = 0; i < this.eh_count; ++i) {
                if (eh[i * 2] !== b || eh[i * 2 + 1] !== a)
                    continue;
                const last = --this.eh_count;
                eh[i * 2] = eh[last * 2];
                eh[i * 2 + 1] = eh[last * 2 + 1];
                return;
            }
            const k = this.eh_count;
            if (k * 2 + 1 >= eh.length)
                return;
            eh[k * 2] = a;
            eh[k * 2 + 1] = b;
            this.eh_count = k + 1;
        }
        epa() {
            if (this.sn < 4 && !this.simplex_fill())
                return;
            const si = this.si, ev = this.ev, ec = this.ec, efn = this.efn, efd = this.efd, ef = this.ef, eh = this.eh;
            ec[0] = (ev[si[0] * 3] + ev[si[1] * 3] + ev[si[2] * 3] + ev[si[3] * 3]) / 4;
            ec[1] = (ev[si[0] * 3 + 1] + ev[si[1] * 3 + 1] + ev[si[2] * 3 + 1] + ev[si[3] * 3 + 1]) / 4;
            ec[2] = (ev[si[0] * 3 + 2] + ev[si[1] * 3 + 2] + ev[si[2] * 3 + 2] + ev[si[3] * 3 + 2]) / 4;
            this.ef_count = 0;
            this.face_add(si[0], si[1], si[2]);
            this.face_add(si[0], si[2], si[3]);
            this.face_add(si[0], si[3], si[1]);
            this.face_add(si[1], si[3], si[2]);
            if (this.ef_count < 4)
                return;
            for (let iter = 0; iter < 64; ++iter) {
                let f = 0;
                for (let i = 1; i < this.ef_count; ++i)
                    if (efd[i] < efd[f])
                        f = i;
                if (this.ev_count >= vert_cap || this.ef_count >= face_cap - 16)
                    break;
                const nx = efn[f * 3], ny = efn[f * 3 + 1], nz = efn[f * 3 + 2];
                const p = this.mink(nx, ny, nz);
                const px = ev[p * 3], py = ev[p * 3 + 1], pz = ev[p * 3 + 2];
                if (px * nx + py * ny + pz * nz - efd[f] < 1e-4)
                    break;
                this.eh_count = 0;
                for (let i = 0; i < this.ef_count;) {
                    if (efn[i * 3] * px + efn[i * 3 + 1] * py + efn[i * 3 + 2] * pz - efd[i] > 1e-7) {
                        this.horizon_edge(ef[i * 3], ef[i * 3 + 1]);
                        this.horizon_edge(ef[i * 3 + 1], ef[i * 3 + 2]);
                        this.horizon_edge(ef[i * 3 + 2], ef[i * 3]);
                        this.face_remove(i);
                    }
                    else
                        ++i;
                }
                for (let i = 0; i < this.eh_count; ++i)
                    this.face_add(eh[i * 2], eh[i * 2 + 1], p);
                if (this.ef_count < 4)
                    return;
            }
            let f = 0;
            for (let i = 1; i < this.ef_count; ++i)
                if (efd[i] < efd[f])
                    f = i;
            this.epa_emit(f);
        }
        epa_emit(f) {
            const ev = this.ev, eva = this.eva, evb = this.evb, ef = this.ef, efn = this.efn;
            const i0 = ef[f * 3], i1 = ef[f * 3 + 1], i2 = ef[f * 3 + 2];
            const nx = efn[f * 3], ny = efn[f * 3 + 1], nz = efn[f * 3 + 2];
            const dist = this.efd[f];
            const ax = ev[i0 * 3], ay = ev[i0 * 3 + 1], az = ev[i0 * 3 + 2];
            const e0x = ev[i1 * 3] - ax, e0y = ev[i1 * 3 + 1] - ay, e0z = ev[i1 * 3 + 2] - az;
            const e1x = ev[i2 * 3] - ax, e1y = ev[i2 * 3 + 1] - ay, e1z = ev[i2 * 3 + 2] - az;
            const e2x = nx * dist - ax, e2y = ny * dist - ay, e2z = nz * dist - az;
            const d00 = e0x * e0x + e0y * e0y + e0z * e0z;
            const d01 = e0x * e1x + e0y * e1y + e0z * e1z;
            const d11 = e1x * e1x + e1y * e1y + e1z * e1z;
            const d20 = e2x * e0x + e2y * e0y + e2z * e0z;
            const d21 = e2x * e1x + e2y * e1y + e2z * e1z;
            const den = d00 * d11 - d01 * d01;
            let u = 1, v = 0, w = 0;
            if (Math.abs(den) > 1e-20) {
                v = (d11 * d20 - d01 * d21) / den;
                w = (d00 * d21 - d01 * d20) / den;
                v = v < 0 ? 0 : v > 1 ? 1 : v;
                w = w < 0 ? 0 : w > 1 - v ? 1 - v : w;
                u = 1 - v - w;
            }
            const wax = u * eva[i0 * 3] + v * eva[i1 * 3] + w * eva[i2 * 3];
            const way = u * eva[i0 * 3 + 1] + v * eva[i1 * 3 + 1] + w * eva[i2 * 3 + 1];
            const waz = u * eva[i0 * 3 + 2] + v * eva[i1 * 3 + 2] + w * eva[i2 * 3 + 2];
            const wbx = u * evb[i0 * 3] + v * evb[i1 * 3] + w * evb[i2 * 3];
            const wby = u * evb[i0 * 3 + 1] + v * evb[i1 * 3 + 1] + w * evb[i2 * 3 + 1];
            const wbz = u * evb[i0 * 3 + 2] + v * evb[i1 * 3 + 2] + w * evb[i2 * 3 + 2];
            this.emit((wax + wbx) / 2, (way + wby) / 2, (waz + wbz) / 2, nx, ny, nz, dist < 0 ? 0 : dist);
        }
    }
    $.$bog_gamengine_phys3_narrow = $bog_gamengine_phys3_narrow;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_solve extends $mol_object2 {
        static beta = 0.2;
        static slop = 0.005;
        static bounce_speed = 1;
        static warm_dist = 0.05;
        static flag_sleep = 1;
        static flag_ghost = 2;
        world = {};
        cap = 0;
        count = 0;
        body_a = new Uint32Array(0);
        body_b = new Uint32Array(0);
        point = new Float32Array(0);
        normal = new Float32Array(0);
        ra = new Float32Array(0);
        rb = new Float32Array(0);
        t1 = new Float32Array(0);
        t2 = new Float32Array(0);
        an_a = new Float32Array(0);
        an_b = new Float32Array(0);
        at1_a = new Float32Array(0);
        at1_b = new Float32Array(0);
        at2_a = new Float32Array(0);
        at2_b = new Float32Array(0);
        mass_n = new Float32Array(0);
        mass_t1 = new Float32Array(0);
        mass_t2 = new Float32Array(0);
        bias = new Float32Array(0);
        pn = new Float32Array(0);
        pt1 = new Float32Array(0);
        pt2 = new Float32Array(0);
        pt = new Float32Array(0);
        live = new Uint8Array(0);
        prev_count = 0;
        prev_a = new Uint32Array(0);
        prev_b = new Uint32Array(0);
        prev_point = new Float32Array(0);
        prev_pn = new Float32Array(0);
        prev_pt = new Float32Array(0);
        hash_cap = 0;
        hash_head = new Int32Array(0);
        hash_next = new Int32Array(0);
        tmp = new Float32Array(3);
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 64);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.body_a = this.grow_u32(this.body_a, cap);
            this.body_b = this.grow_u32(this.body_b, cap);
            this.point = this.grow_f32(this.point, cap * 3);
            this.ra = this.grow_f32(this.ra, cap * 3);
            this.rb = this.grow_f32(this.rb, cap * 3);
            this.t1 = this.grow_f32(this.t1, cap * 3);
            this.t2 = this.grow_f32(this.t2, cap * 3);
            this.an_a = this.grow_f32(this.an_a, cap * 3);
            this.an_b = this.grow_f32(this.an_b, cap * 3);
            this.at1_a = this.grow_f32(this.at1_a, cap * 3);
            this.at1_b = this.grow_f32(this.at1_b, cap * 3);
            this.at2_a = this.grow_f32(this.at2_a, cap * 3);
            this.at2_b = this.grow_f32(this.at2_b, cap * 3);
            this.mass_n = this.grow_f32(this.mass_n, cap);
            this.mass_t1 = this.grow_f32(this.mass_t1, cap);
            this.mass_t2 = this.grow_f32(this.mass_t2, cap);
            this.bias = this.grow_f32(this.bias, cap);
            this.pn = this.grow_f32(this.pn, cap);
            this.pt1 = this.grow_f32(this.pt1, cap);
            this.pt2 = this.grow_f32(this.pt2, cap);
            this.pt = this.grow_f32(this.pt, cap * 3);
            const live = new Uint8Array(cap);
            live.set(this.live);
            this.live = live;
            this.prev_a = this.grow_u32(this.prev_a, cap);
            this.prev_b = this.grow_u32(this.prev_b, cap);
            this.prev_point = this.grow_f32(this.prev_point, cap * 3);
            this.prev_pn = this.grow_f32(this.prev_pn, cap);
            this.prev_pt = this.grow_f32(this.prev_pt, cap * 3);
            const next = new Int32Array(cap);
            next.set(this.hash_next);
            this.hash_next = next;
        }
        grow_f32(prev, len) {
            const next = new Float32Array(len);
            next.set(prev);
            return next;
        }
        grow_u32(prev, len) {
            const next = new Uint32Array(len);
            next.set(prev);
            return next;
        }
        solve(world, narrow, dt, joint) {
            this.world = world;
            const count = narrow.contact_count;
            this.grow(count);
            this.count = count;
            this.normal = narrow.contact_normal;
            this.hash_build();
            this.prepare(narrow, dt);
            const iterations = world.iterations();
            const friction = world.friction();
            for (let it = 0; it < iterations; ++it) {
                this.iterate(friction);
                joint?.iterate();
            }
            this.remember();
            return count;
        }
        hash_of(a, b) {
            return (Math.imul(a, 73856093) ^ Math.imul(b, 19349663)) & (this.hash_cap - 1);
        }
        hash_build() {
            const need = this.prev_count * 2;
            if (this.hash_cap < need) {
                let cap = Math.max(this.hash_cap, 64);
                while (cap < need)
                    cap *= 2;
                this.hash_cap = cap;
                this.hash_head = new Int32Array(cap);
            }
            const head = this.hash_head, next = this.hash_next;
            head.fill(-1, 0, this.hash_cap);
            if (this.hash_cap === 0)
                return;
            const prev_a = this.prev_a, prev_b = this.prev_b;
            for (let j = 0; j < this.prev_count; ++j) {
                const h = this.hash_of(prev_a[j], prev_b[j]);
                next[j] = head[h];
                head[h] = j;
            }
        }
        prev_find(a, b, px, py, pz) {
            if (this.hash_cap === 0)
                return -1;
            const prev_a = this.prev_a, prev_b = this.prev_b, prev_point = this.prev_point, next = this.hash_next;
            let best = -1;
            let best_dist = $bog_gamengine_phys3_solve.warm_dist * $bog_gamengine_phys3_solve.warm_dist;
            for (let j = this.hash_head[this.hash_of(a, b)]; j >= 0; j = next[j]) {
                if (prev_a[j] !== a || prev_b[j] !== b)
                    continue;
                const dx = prev_point[j * 3] - px, dy = prev_point[j * 3 + 1] - py, dz = prev_point[j * 3 + 2] - pz;
                const dist = dx * dx + dy * dy + dz * dz;
                if (dist >= best_dist)
                    continue;
                best_dist = dist;
                best = j;
            }
            return best;
        }
        inertia_apply(i, vx, vy, vz, out, off) {
            const rot = this.world.rot, inv = this.world.inv_inertia;
            const qx = rot[i * 4], qy = rot[i * 4 + 1], qz = rot[i * 4 + 2], qw = rot[i * 4 + 3];
            let tx = 2 * (qz * vy - qy * vz);
            let ty = 2 * (qx * vz - qz * vx);
            let tz = 2 * (qy * vx - qx * vy);
            const lx = (vx + qw * tx + qz * ty - qy * tz) * inv[i * 3];
            const ly = (vy + qw * ty + qx * tz - qz * tx) * inv[i * 3 + 1];
            const lz = (vz + qw * tz + qy * tx - qx * ty) * inv[i * 3 + 2];
            tx = 2 * (qy * lz - qz * ly);
            ty = 2 * (qz * lx - qx * lz);
            tz = 2 * (qx * ly - qy * lx);
            out[off] = lx + qw * tx + qy * tz - qz * ty;
            out[off + 1] = ly + qw * ty + qz * tx - qx * tz;
            out[off + 2] = lz + qw * tz + qx * ty - qy * tx;
        }
        axis_mass(k, a, b, ax, ay, az, out_a, out_b) {
            const ra = this.ra, rb = this.rb, world = this.world;
            const k3 = k * 3;
            const rax = ra[k3], ray = ra[k3 + 1], raz = ra[k3 + 2];
            const rbx = rb[k3], rby = rb[k3 + 1], rbz = rb[k3 + 2];
            const cax = ray * az - raz * ay, cay = raz * ax - rax * az, caz = rax * ay - ray * ax;
            const cbx = rby * az - rbz * ay, cby = rbz * ax - rbx * az, cbz = rbx * ay - rby * ax;
            this.inertia_apply(a, cax, cay, caz, out_a, k3);
            this.inertia_apply(b, cbx, cby, cbz, out_b, k3);
            const sum = world.inv_mass[a] + world.inv_mass[b]
                + cax * out_a[k3] + cay * out_a[k3 + 1] + caz * out_a[k3 + 2]
                + cbx * out_b[k3] + cby * out_b[k3 + 1] + cbz * out_b[k3 + 2];
            return sum > 0 ? 1 / sum : 0;
        }
        wake(i) {
            this.world.flags[i] &= ~$bog_gamengine_phys3_solve.flag_sleep;
            this.world.sleep_timer[i] = 0;
        }
        prepare(narrow, dt) {
            const world = this.world;
            const pos = world.pos, inv_mass = world.inv_mass, flags = world.flags;
            const ca = narrow.contact_a, cb = narrow.contact_b, cp = narrow.contact_point, cn = narrow.contact_normal, cd = narrow.contact_depth;
            const body_a = this.body_a, body_b = this.body_b, point = this.point, live = this.live;
            const ra = this.ra, rb = this.rb, t1 = this.t1, t2 = this.t2, tmp = this.tmp;
            const pn = this.pn, pt1 = this.pt1, pt2 = this.pt2, bias = this.bias;
            const prev_pn = this.prev_pn, prev_pt = this.prev_pt;
            const sleep = $bog_gamengine_phys3_solve.flag_sleep, ghost = $bog_gamengine_phys3_solve.flag_ghost;
            const restitution = world.restitution();
            const bounce_speed = $bog_gamengine_phys3_solve.bounce_speed;
            const beta_dt = $bog_gamengine_phys3_solve.beta / dt;
            const slop = $bog_gamengine_phys3_solve.slop;
            for (let k = 0; k < this.count; ++k) {
                const k3 = k * 3;
                const a = ca[k], b = cb[k];
                body_a[k] = a;
                body_b[k] = b;
                const px = cp[k3], py = cp[k3 + 1], pz = cp[k3 + 2];
                point[k3] = px;
                point[k3 + 1] = py;
                point[k3 + 2] = pz;
                live[k] = 0;
                pn[k] = 0;
                pt1[k] = 0;
                pt2[k] = 0;
                const fa = flags[a], fb = flags[b];
                if ((fa | fb) & ghost)
                    continue;
                const ima = inv_mass[a], imb = inv_mass[b];
                if (ima === 0 && imb === 0)
                    continue;
                const sa = fa & sleep, sb = fb & sleep;
                if (sa && sb)
                    continue;
                if (sa)
                    this.wake(a);
                if (sb)
                    this.wake(b);
                live[k] = 1;
                ra[k3] = px - pos[a * 3];
                ra[k3 + 1] = py - pos[a * 3 + 1];
                ra[k3 + 2] = pz - pos[a * 3 + 2];
                rb[k3] = px - pos[b * 3];
                rb[k3 + 1] = py - pos[b * 3 + 1];
                rb[k3 + 2] = pz - pos[b * 3 + 2];
                const nx = cn[k3], ny = cn[k3 + 1], nz = cn[k3 + 2];
                this.mass_n[k] = this.axis_mass(k, a, b, nx, ny, nz, this.an_a, this.an_b);
                let ux = 0, uy = 0, uz = 0;
                if (Math.abs(nx) >= 0.57735) {
                    ux = ny;
                    uy = -nx;
                }
                else {
                    uy = nz;
                    uz = -ny;
                }
                const ul = 1 / Math.sqrt(ux * ux + uy * uy + uz * uz);
                ux *= ul;
                uy *= ul;
                uz *= ul;
                t1[k3] = ux;
                t1[k3 + 1] = uy;
                t1[k3 + 2] = uz;
                const vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux;
                t2[k3] = vx;
                t2[k3 + 1] = vy;
                t2[k3 + 2] = vz;
                this.mass_t1[k] = this.axis_mass(k, a, b, ux, uy, uz, this.at1_a, this.at1_b);
                this.mass_t2[k] = this.axis_mass(k, a, b, vx, vy, vz, this.at2_a, this.at2_b);
                this.rel_vel(k, a, b);
                const vn = tmp[0] * nx + tmp[1] * ny + tmp[2] * nz;
                const bounce = vn < -bounce_speed ? -restitution * vn : 0;
                let baum = beta_dt * (cd[k] - slop);
                if (baum < 0)
                    baum = 0;
                bias[k] = bounce > baum ? bounce : baum;
                const j = this.prev_find(a, b, px, py, pz);
                if (j < 0)
                    continue;
                const ln = prev_pn[j];
                const ptx = prev_pt[j * 3], pty = prev_pt[j * 3 + 1], ptz = prev_pt[j * 3 + 2];
                const l1 = ptx * ux + pty * uy + ptz * uz;
                const l2 = ptx * vx + pty * vy + ptz * vz;
                pn[k] = ln;
                pt1[k] = l1;
                pt2[k] = l2;
                this.apply(k, a, b, cn, this.an_a, this.an_b, ln);
                this.apply(k, a, b, t1, this.at1_a, this.at1_b, l1);
                this.apply(k, a, b, t2, this.at2_a, this.at2_b, l2);
            }
        }
        rel_vel(k, a, b) {
            const vel = this.world.vel, ang = this.world.ang, ra = this.ra, rb = this.rb, out = this.tmp;
            const a3 = a * 3, b3 = b * 3, k3 = k * 3;
            const wax = ang[a3], way = ang[a3 + 1], waz = ang[a3 + 2];
            const wbx = ang[b3], wby = ang[b3 + 1], wbz = ang[b3 + 2];
            const rax = ra[k3], ray = ra[k3 + 1], raz = ra[k3 + 2];
            const rbx = rb[k3], rby = rb[k3 + 1], rbz = rb[k3 + 2];
            out[0] = vel[b3] + (wby * rbz - wbz * rby) - vel[a3] - (way * raz - waz * ray);
            out[1] = vel[b3 + 1] + (wbz * rbx - wbx * rbz) - vel[a3 + 1] - (waz * rax - wax * raz);
            out[2] = vel[b3 + 2] + (wbx * rby - wby * rbx) - vel[a3 + 2] - (wax * ray - way * rax);
            return out;
        }
        apply(k, a, b, axis, ang_a, ang_b, lambda) {
            if (lambda === 0)
                return;
            const vel = this.world.vel, ang = this.world.ang, inv_mass = this.world.inv_mass;
            const a3 = a * 3, b3 = b * 3, k3 = k * 3;
            const ima = inv_mass[a] * lambda, imb = inv_mass[b] * lambda;
            vel[a3] -= axis[k3] * ima;
            vel[a3 + 1] -= axis[k3 + 1] * ima;
            vel[a3 + 2] -= axis[k3 + 2] * ima;
            ang[a3] -= ang_a[k3] * lambda;
            ang[a3 + 1] -= ang_a[k3 + 1] * lambda;
            ang[a3 + 2] -= ang_a[k3 + 2] * lambda;
            vel[b3] += axis[k3] * imb;
            vel[b3 + 1] += axis[k3 + 1] * imb;
            vel[b3 + 2] += axis[k3 + 2] * imb;
            ang[b3] += ang_b[k3] * lambda;
            ang[b3 + 1] += ang_b[k3 + 1] * lambda;
            ang[b3 + 2] += ang_b[k3 + 2] * lambda;
        }
        iterate(friction) {
            const body_a = this.body_a, body_b = this.body_b, live = this.live, tmp = this.tmp;
            const normal = this.normal, t1 = this.t1, t2 = this.t2;
            const mass_n = this.mass_n, mass_t1 = this.mass_t1, mass_t2 = this.mass_t2, bias = this.bias;
            const pn = this.pn, pt1 = this.pt1, pt2 = this.pt2;
            for (let k = 0; k < this.count; ++k) {
                if (!live[k])
                    continue;
                const k3 = k * 3;
                const a = body_a[k], b = body_b[k];
                const max = friction * pn[k];
                this.rel_vel(k, a, b);
                const vt1 = tmp[0] * t1[k3] + tmp[1] * t1[k3 + 1] + tmp[2] * t1[k3 + 2];
                const old1 = pt1[k];
                let new1 = old1 - mass_t1[k] * vt1;
                new1 = new1 < -max ? -max : new1 > max ? max : new1;
                pt1[k] = new1;
                this.apply(k, a, b, t1, this.at1_a, this.at1_b, new1 - old1);
                this.rel_vel(k, a, b);
                const vt2 = tmp[0] * t2[k3] + tmp[1] * t2[k3 + 1] + tmp[2] * t2[k3 + 2];
                const old2 = pt2[k];
                let new2 = old2 - mass_t2[k] * vt2;
                new2 = new2 < -max ? -max : new2 > max ? max : new2;
                pt2[k] = new2;
                this.apply(k, a, b, t2, this.at2_a, this.at2_b, new2 - old2);
                this.rel_vel(k, a, b);
                const vn = tmp[0] * normal[k3] + tmp[1] * normal[k3 + 1] + tmp[2] * normal[k3 + 2];
                const old = pn[k];
                let next = old + mass_n[k] * (bias[k] - vn);
                if (next < 0)
                    next = 0;
                pn[k] = next;
                this.apply(k, a, b, normal, this.an_a, this.an_b, next - old);
            }
        }
        remember() {
            const pt = this.pt, pt1 = this.pt1, pt2 = this.pt2, t1 = this.t1, t2 = this.t2;
            for (let k = 0; k < this.count; ++k) {
                const k3 = k * 3;
                pt[k3] = t1[k3] * pt1[k] + t2[k3] * pt2[k];
                pt[k3 + 1] = t1[k3 + 1] * pt1[k] + t2[k3 + 1] * pt2[k];
                pt[k3 + 2] = t1[k3 + 2] * pt1[k] + t2[k3 + 2] * pt2[k];
            }
            const a = this.body_a;
            this.body_a = this.prev_a;
            this.prev_a = a;
            const b = this.body_b;
            this.body_b = this.prev_b;
            this.prev_b = b;
            const point = this.point;
            this.point = this.prev_point;
            this.prev_point = point;
            const pn = this.pn;
            this.pn = this.prev_pn;
            this.prev_pn = pn;
            this.pt = this.prev_pt;
            this.prev_pt = pt;
            this.prev_count = this.count;
        }
    }
    $.$bog_gamengine_phys3_solve = $bog_gamengine_phys3_solve;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_vec_add(out, a, b) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] + b[i];
        return out;
    }
    $.$bog_gamengine_vec_add = $bog_gamengine_vec_add;
    function $bog_gamengine_vec_sub(out, a, b) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] - b[i];
        return out;
    }
    $.$bog_gamengine_vec_sub = $bog_gamengine_vec_sub;
    function $bog_gamengine_vec_scale(out, a, k) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] * k;
        return out;
    }
    $.$bog_gamengine_vec_scale = $bog_gamengine_vec_scale;
    function $bog_gamengine_vec_len(a) {
        let sum = 0;
        for (let i = 0; i < a.length; ++i)
            sum += a[i] * a[i];
        return Math.sqrt(sum);
    }
    $.$bog_gamengine_vec_len = $bog_gamengine_vec_len;
    function $bog_gamengine_vec_norm(out, a) {
        const len = $bog_gamengine_vec_len(a);
        const k = len === 0 ? 0 : 1 / len;
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] * k;
        return out;
    }
    $.$bog_gamengine_vec_norm = $bog_gamengine_vec_norm;
    function $bog_gamengine_vec_dot(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; ++i)
            sum += a[i] * b[i];
        return sum;
    }
    $.$bog_gamengine_vec_dot = $bog_gamengine_vec_dot;
    function $bog_gamengine_vec_cross(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2];
        const bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }
    $.$bog_gamengine_vec_cross = $bog_gamengine_vec_cross;
    function $bog_gamengine_vec_lerp(out, a, b, t) {
        for (let i = 0; i < a.length; ++i)
            out[i] = a[i] + (b[i] - a[i]) * t;
        return out;
    }
    $.$bog_gamengine_vec_lerp = $bog_gamengine_vec_lerp;
    function $bog_gamengine_vec_mat4_apply(out, m, v) {
        const x = v[0], y = v[1], z = v[2], w = v[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
    }
    $.$bog_gamengine_vec_mat4_apply = $bog_gamengine_vec_mat4_apply;
    function $bog_gamengine_vec_quat_identity(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
    }
    $.$bog_gamengine_vec_quat_identity = $bog_gamengine_vec_quat_identity;
    function $bog_gamengine_vec_quat_mul(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2], aw = a[3];
        const bx = b[0], by = b[1], bz = b[2], bw = b[3];
        out[0] = aw * bx + ax * bw + ay * bz - az * by;
        out[1] = aw * by - ax * bz + ay * bw + az * bx;
        out[2] = aw * bz + ax * by - ay * bx + az * bw;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }
    $.$bog_gamengine_vec_quat_mul = $bog_gamengine_vec_quat_mul;
    function $bog_gamengine_vec_quat_from_axis(out, axis, angle) {
        const len = Math.hypot(axis[0], axis[1], axis[2]);
        const k = len === 0 ? 0 : Math.sin(angle / 2) / len;
        out[0] = axis[0] * k;
        out[1] = axis[1] * k;
        out[2] = axis[2] * k;
        out[3] = Math.cos(angle / 2);
        return out;
    }
    $.$bog_gamengine_vec_quat_from_axis = $bog_gamengine_vec_quat_from_axis;
    function $bog_gamengine_vec_quat_from_euler(out, x, y, z) {
        const cx = Math.cos(x / 2), sx = Math.sin(x / 2);
        const cy = Math.cos(y / 2), sy = Math.sin(y / 2);
        const cz = Math.cos(z / 2), sz = Math.sin(z / 2);
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        return out;
    }
    $.$bog_gamengine_vec_quat_from_euler = $bog_gamengine_vec_quat_from_euler;
    function $bog_gamengine_vec_quat_normalize(out, q) {
        const len = Math.hypot(q[0], q[1], q[2], q[3]);
        if (len === 0)
            return $bog_gamengine_vec_quat_identity(out);
        const k = 1 / len;
        out[0] = q[0] * k;
        out[1] = q[1] * k;
        out[2] = q[2] * k;
        out[3] = q[3] * k;
        return out;
    }
    $.$bog_gamengine_vec_quat_normalize = $bog_gamengine_vec_quat_normalize;
    function $bog_gamengine_vec_quat_rotate(out, q, v) {
        const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
        const vx = v[0], vy = v[1], vz = v[2];
        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);
        out[0] = vx + qw * tx + qy * tz - qz * ty;
        out[1] = vy + qw * ty + qz * tx - qx * tz;
        out[2] = vz + qw * tz + qx * ty - qy * tx;
        return out;
    }
    $.$bog_gamengine_vec_quat_rotate = $bog_gamengine_vec_quat_rotate;
    function $bog_gamengine_vec_quat_integrate(out, q, ang, dt) {
        const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
        const wx = ang[0] * dt / 2, wy = ang[1] * dt / 2, wz = ang[2] * dt / 2;
        out[0] = qx + wx * qw + wy * qz - wz * qy;
        out[1] = qy - wx * qz + wy * qw + wz * qx;
        out[2] = qz + wx * qy - wy * qx + wz * qw;
        out[3] = qw - wx * qx - wy * qy - wz * qz;
        return $bog_gamengine_vec_quat_normalize(out, out);
    }
    $.$bog_gamengine_vec_quat_integrate = $bog_gamengine_vec_quat_integrate;
    function $bog_gamengine_vec_quat_to_mat4(out, q, pos, scale) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        const xx = x * x, yy = y * y, zz = z * z;
        const xy = x * y, xz = x * z, yz = y * z;
        const wx = w * x, wy = w * y, wz = w * z;
        const sx = scale[0], sy = scale[1], sz = scale[2];
        out[0] = (1 - 2 * (yy + zz)) * sx;
        out[1] = 2 * (xy + wz) * sx;
        out[2] = 2 * (xz - wy) * sx;
        out[3] = 0;
        out[4] = 2 * (xy - wz) * sy;
        out[5] = (1 - 2 * (xx + zz)) * sy;
        out[6] = 2 * (yz + wx) * sy;
        out[7] = 0;
        out[8] = 2 * (xz + wy) * sz;
        out[9] = 2 * (yz - wx) * sz;
        out[10] = (1 - 2 * (xx + yy)) * sz;
        out[11] = 0;
        out[12] = pos[0];
        out[13] = pos[1];
        out[14] = pos[2];
        out[15] = 1;
        return out;
    }
    $.$bog_gamengine_vec_quat_to_mat4 = $bog_gamengine_vec_quat_to_mat4;
    function $bog_gamengine_vec_quat_to_euler(out, q) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        const sy = 2 * (w * y - x * z);
        out[1] = sy >= 1 ? Math.PI / 2 : sy <= -1 ? -Math.PI / 2 : Math.asin(sy);
        out[0] = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
        out[2] = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
        return out;
    }
    $.$bog_gamengine_vec_quat_to_euler = $bog_gamengine_vec_quat_to_euler;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_joint extends $mol_object2 {
        static type_point = 0;
        static type_hinge = 1;
        static type_slider = 2;
        static type_spring = 3;
        static beta = 0.2;
        static flag_sleep = 1;
        static sleep_speed = 0.05;
        world = {};
        cap = 0;
        count = 0;
        type = new Uint8Array(0);
        a = new Uint32Array(0);
        b = new Uint32Array(0);
        anchor_a = new Float32Array(0);
        anchor_b = new Float32Array(0);
        axis_a = new Float32Array(0);
        axis_b = new Float32Array(0);
        ref_a = new Float32Array(0);
        ref_b = new Float32Array(0);
        rel = new Float32Array(0);
        param = new Float32Array(0);
        imp_lin = new Float32Array(0);
        imp_ang = new Float32Array(0);
        lim = new Int8Array(0);
        live = new Uint8Array(0);
        ima = new Float32Array(0);
        imb = new Float32Array(0);
        ra = new Float32Array(0);
        rb = new Float32Array(0);
        iwa = new Float32Array(0);
        iwb = new Float32Array(0);
        axis = new Float32Array(0);
        u = new Float32Array(0);
        v = new Float32Array(0);
        kin = new Float32Array(0);
        mass_u = new Float32Array(0);
        mass_v = new Float32Array(0);
        mass_lim = new Float32Array(0);
        bias_lin = new Float32Array(0);
        bias_ang = new Float32Array(0);
        lim_target = new Float32Array(0);
        tmp = new Float32Array(3);
        tmp2 = new Float32Array(3);
        tmp3 = new Float32Array(3);
        mat = new Float32Array(9);
        q1 = new Float32Array(4);
        q2 = new Float32Array(4);
        q3 = new Float32Array(4);
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.type = this.grow_u8(this.type, cap);
            this.a = this.grow_u32(this.a, cap);
            this.b = this.grow_u32(this.b, cap);
            this.anchor_a = this.grow_f32(this.anchor_a, cap * 3);
            this.anchor_b = this.grow_f32(this.anchor_b, cap * 3);
            this.axis_a = this.grow_f32(this.axis_a, cap * 3);
            this.axis_b = this.grow_f32(this.axis_b, cap * 3);
            this.ref_a = this.grow_f32(this.ref_a, cap * 3);
            this.ref_b = this.grow_f32(this.ref_b, cap * 3);
            this.rel = this.grow_f32(this.rel, cap * 4);
            this.param = this.grow_f32(this.param, cap * 4);
            this.imp_lin = this.grow_f32(this.imp_lin, cap * 3);
            this.imp_ang = this.grow_f32(this.imp_ang, cap * 3);
            const lim = new Int8Array(cap);
            lim.set(this.lim);
            this.lim = lim;
            this.live = this.grow_u8(this.live, cap);
            this.ima = this.grow_f32(this.ima, cap);
            this.imb = this.grow_f32(this.imb, cap);
            this.ra = this.grow_f32(this.ra, cap * 3);
            this.rb = this.grow_f32(this.rb, cap * 3);
            this.iwa = this.grow_f32(this.iwa, cap * 9);
            this.iwb = this.grow_f32(this.iwb, cap * 9);
            this.axis = this.grow_f32(this.axis, cap * 3);
            this.u = this.grow_f32(this.u, cap * 3);
            this.v = this.grow_f32(this.v, cap * 3);
            this.kin = this.grow_f32(this.kin, cap * 9);
            this.mass_u = this.grow_f32(this.mass_u, cap);
            this.mass_v = this.grow_f32(this.mass_v, cap);
            this.mass_lim = this.grow_f32(this.mass_lim, cap);
            this.bias_lin = this.grow_f32(this.bias_lin, cap * 3);
            this.bias_ang = this.grow_f32(this.bias_ang, cap * 3);
            this.lim_target = this.grow_f32(this.lim_target, cap);
        }
        grow_f32(prev, len) {
            const next = new Float32Array(len);
            next.set(prev);
            return next;
        }
        grow_u32(prev, len) {
            const next = new Uint32Array(len);
            next.set(prev);
            return next;
        }
        grow_u8(prev, len) {
            const next = new Uint8Array(len);
            next.set(prev);
            return next;
        }
        add(type, a, b, anchor_a, anchor_b, axis, param) {
            const world = this.world;
            const k = this.count;
            this.grow(k + 1);
            this.count = k + 1;
            const k3 = k * 3, k4 = k * 4;
            this.type[k] = type;
            this.a[k] = a;
            this.b[k] = b;
            this.anchor_a.set(anchor_a, k3);
            this.anchor_b.set(anchor_b, k3);
            this.param.fill(0, k4, k4 + 4);
            if (param)
                this.param.set(param, k4);
            this.imp_lin.fill(0, k3, k3 + 3);
            this.imp_ang.fill(0, k3, k3 + 3);
            this.lim[k] = 0;
            const tmp = this.tmp, tmp2 = this.tmp2;
            tmp[0] = axis ? axis[0] : 0;
            tmp[1] = axis ? axis[1] : 1;
            tmp[2] = axis ? axis[2] : 0;
            $bog_gamengine_vec_norm(tmp, tmp);
            this.axis_a.set(tmp, k3);
            const qa = world.rot.subarray(a * 4, a * 4 + 4), qb = world.rot.subarray(b * 4, b * 4 + 4);
            $bog_gamengine_vec_quat_rotate(tmp2, qa, tmp);
            this.rotate_inv(tmp, qb, tmp2);
            this.axis_b.set(tmp, k3);
            this.perp(tmp2[0], tmp2[1], tmp2[2], tmp);
            this.rotate_inv(tmp2, qa, tmp);
            this.ref_a.set(tmp2, k3);
            this.rotate_inv(tmp2, qb, tmp);
            this.ref_b.set(tmp2, k3);
            const q1 = this.q1, q2 = this.q2;
            q1[0] = -qa[0];
            q1[1] = -qa[1];
            q1[2] = -qa[2];
            q1[3] = qa[3];
            $bog_gamengine_vec_quat_mul(q2, q1, qb);
            this.rel.set(q2, k4);
            return k;
        }
        remove(index) {
            const last = this.count - 1;
            if (index !== last) {
                this.type[index] = this.type[last];
                this.a[index] = this.a[last];
                this.b[index] = this.b[last];
                this.anchor_a.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.anchor_b.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.axis_a.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.axis_b.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.ref_a.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.ref_b.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.rel.copyWithin(index * 4, last * 4, last * 4 + 4);
                this.param.copyWithin(index * 4, last * 4, last * 4 + 4);
                this.imp_lin.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.imp_ang.copyWithin(index * 3, last * 3, last * 3 + 3);
                this.lim[index] = this.lim[last];
            }
            this.count = last;
            return last;
        }
        body_remove(index, last) {
            for (let k = this.count - 1; k >= 0; --k) {
                if (this.a[k] === index || this.b[k] === index)
                    this.remove(k);
            }
            if (index === last)
                return;
            for (let k = 0; k < this.count; ++k) {
                if (this.a[k] === last)
                    this.a[k] = index;
                if (this.b[k] === last)
                    this.b[k] = index;
            }
        }
        rotate_inv(out, q, v) {
            const q3 = this.q3;
            q3[0] = -q[0];
            q3[1] = -q[1];
            q3[2] = -q[2];
            q3[3] = q[3];
            return $bog_gamengine_vec_quat_rotate(out, q3, v);
        }
        perp(nx, ny, nz, out) {
            let ux = 0, uy = 0, uz = 0;
            if (Math.abs(nx) >= 0.57735) {
                ux = ny;
                uy = -nx;
            }
            else {
                uy = nz;
                uz = -ny;
            }
            const ul = 1 / Math.sqrt(ux * ux + uy * uy + uz * uz);
            out[0] = ux * ul;
            out[1] = uy * ul;
            out[2] = uz * ul;
            return out;
        }
        inertia_world(i, out, off) {
            const rot = this.world.rot, inv = this.world.inv_inertia;
            const x = rot[i * 4], y = rot[i * 4 + 1], z = rot[i * 4 + 2], w = rot[i * 4 + 3];
            const d0 = inv[i * 3], d1 = inv[i * 3 + 1], d2 = inv[i * 3 + 2];
            const xx = x * x, yy = y * y, zz = z * z;
            const xy = x * y, xz = x * z, yz = y * z;
            const wx = w * x, wy = w * y, wz = w * z;
            const r00 = 1 - 2 * (yy + zz), r01 = 2 * (xy - wz), r02 = 2 * (xz + wy);
            const r10 = 2 * (xy + wz), r11 = 1 - 2 * (xx + zz), r12 = 2 * (yz - wx);
            const r20 = 2 * (xz - wy), r21 = 2 * (yz + wx), r22 = 1 - 2 * (xx + yy);
            out[off] = r00 * r00 * d0 + r01 * r01 * d1 + r02 * r02 * d2;
            out[off + 1] = r00 * r10 * d0 + r01 * r11 * d1 + r02 * r12 * d2;
            out[off + 2] = r00 * r20 * d0 + r01 * r21 * d1 + r02 * r22 * d2;
            out[off + 3] = out[off + 1];
            out[off + 4] = r10 * r10 * d0 + r11 * r11 * d1 + r12 * r12 * d2;
            out[off + 5] = r10 * r20 * d0 + r11 * r21 * d1 + r12 * r22 * d2;
            out[off + 6] = out[off + 2];
            out[off + 7] = out[off + 5];
            out[off + 8] = r20 * r20 * d0 + r21 * r21 * d1 + r22 * r22 * d2;
        }
        invert3(src, soff, dst, doff) {
            const m00 = src[soff], m01 = src[soff + 1], m02 = src[soff + 2];
            const m10 = src[soff + 3], m11 = src[soff + 4], m12 = src[soff + 5];
            const m20 = src[soff + 6], m21 = src[soff + 7], m22 = src[soff + 8];
            const c00 = m11 * m22 - m12 * m21;
            const c01 = m12 * m20 - m10 * m22;
            const c02 = m10 * m21 - m11 * m20;
            const det = m00 * c00 + m01 * c01 + m02 * c02;
            if (!(det > 1e-12)) {
                dst.fill(0, doff, doff + 9);
                return;
            }
            const inv = 1 / det;
            dst[doff] = c00 * inv;
            dst[doff + 1] = (m02 * m21 - m01 * m22) * inv;
            dst[doff + 2] = (m01 * m12 - m02 * m11) * inv;
            dst[doff + 3] = c01 * inv;
            dst[doff + 4] = (m00 * m22 - m02 * m20) * inv;
            dst[doff + 5] = (m02 * m10 - m00 * m12) * inv;
            dst[doff + 6] = c02 * inv;
            dst[doff + 7] = (m01 * m20 - m00 * m21) * inv;
            dst[doff + 8] = (m00 * m11 - m01 * m10) * inv;
        }
        quad(m, off, x, y, z) {
            return x * (m[off] * x + m[off + 1] * y + m[off + 2] * z)
                + y * (m[off + 3] * x + m[off + 4] * y + m[off + 5] * z)
                + z * (m[off + 6] * x + m[off + 7] * y + m[off + 8] * z);
        }
        mass_lin(k, nx, ny, nz) {
            const k3 = k * 3, k9 = k * 9;
            const ra = this.ra, rb = this.rb;
            const cax = ra[k3 + 1] * nz - ra[k3 + 2] * ny, cay = ra[k3 + 2] * nx - ra[k3] * nz, caz = ra[k3] * ny - ra[k3 + 1] * nx;
            const cbx = rb[k3 + 1] * nz - rb[k3 + 2] * ny, cby = rb[k3 + 2] * nx - rb[k3] * nz, cbz = rb[k3] * ny - rb[k3 + 1] * nx;
            const sum = this.ima[k] + this.imb[k] + this.quad(this.iwa, k9, cax, cay, caz) + this.quad(this.iwb, k9, cbx, cby, cbz);
            return sum > 0 ? 1 / sum : 0;
        }
        mass_ang(k, nx, ny, nz) {
            const k9 = k * 9;
            const sum = this.quad(this.iwa, k9, nx, ny, nz) + this.quad(this.iwb, k9, nx, ny, nz);
            return sum > 0 ? 1 / sum : 0;
        }
        kin_lin(k) {
            const k3 = k * 3, k9 = k * 9;
            const m = this.mat;
            const im = this.ima[k] + this.imb[k];
            m.fill(0);
            m[0] = m[4] = m[8] = im;
            this.kin_skew(this.ra, k3, this.iwa, k9, m);
            this.kin_skew(this.rb, k3, this.iwb, k9, m);
            this.invert3(m, 0, this.kin, k9);
        }
        kin_skew(r, r3, iw, i9, m) {
            const rx = r[r3], ry = r[r3 + 1], rz = r[r3 + 2];
            const s00 = 0, s01 = -rz, s02 = ry;
            const s10 = rz, s11 = 0, s12 = -rx;
            const s20 = -ry, s21 = rx, s22 = 0;
            const i00 = iw[i9], i01 = iw[i9 + 1], i02 = iw[i9 + 2];
            const i10 = iw[i9 + 3], i11 = iw[i9 + 4], i12 = iw[i9 + 5];
            const i20 = iw[i9 + 6], i21 = iw[i9 + 7], i22 = iw[i9 + 8];
            const t00 = s00 * i00 + s01 * i10 + s02 * i20, t01 = s00 * i01 + s01 * i11 + s02 * i21, t02 = s00 * i02 + s01 * i12 + s02 * i22;
            const t10 = s10 * i00 + s11 * i10 + s12 * i20, t11 = s10 * i01 + s11 * i11 + s12 * i21, t12 = s10 * i02 + s11 * i12 + s12 * i22;
            const t20 = s20 * i00 + s21 * i10 + s22 * i20, t21 = s20 * i01 + s21 * i11 + s22 * i21, t22 = s20 * i02 + s21 * i12 + s22 * i22;
            m[0] += t00 * s00 + t01 * s01 + t02 * s02;
            m[1] += t00 * s10 + t01 * s11 + t02 * s12;
            m[2] += t00 * s20 + t01 * s21 + t02 * s22;
            m[3] += t10 * s00 + t11 * s01 + t12 * s02;
            m[4] += t10 * s10 + t11 * s11 + t12 * s12;
            m[5] += t10 * s20 + t11 * s21 + t12 * s22;
            m[6] += t20 * s00 + t21 * s01 + t22 * s02;
            m[7] += t20 * s10 + t21 * s11 + t22 * s12;
            m[8] += t20 * s20 + t21 * s21 + t22 * s22;
        }
        kin_ang(k) {
            const k9 = k * 9;
            const m = this.mat, iwa = this.iwa, iwb = this.iwb;
            for (let i = 0; i < 9; ++i)
                m[i] = iwa[k9 + i] + iwb[k9 + i];
            this.invert3(m, 0, this.kin, k9);
        }
        rel_vel(k) {
            const world = this.world, vel = world.vel, ang = world.ang, ra = this.ra, rb = this.rb, out = this.tmp;
            const a3 = this.a[k] * 3, b3 = this.b[k] * 3, k3 = k * 3;
            const wax = ang[a3], way = ang[a3 + 1], waz = ang[a3 + 2];
            const wbx = ang[b3], wby = ang[b3 + 1], wbz = ang[b3 + 2];
            const rax = ra[k3], ray = ra[k3 + 1], raz = ra[k3 + 2];
            const rbx = rb[k3], rby = rb[k3 + 1], rbz = rb[k3 + 2];
            out[0] = vel[b3] + (wby * rbz - wbz * rby) - vel[a3] - (way * raz - waz * ray);
            out[1] = vel[b3 + 1] + (wbz * rbx - wbx * rbz) - vel[a3 + 1] - (waz * rax - wax * raz);
            out[2] = vel[b3 + 2] + (wbx * rby - wby * rbx) - vel[a3 + 2] - (wax * ray - way * rax);
            return out;
        }
        rel_ang(k) {
            const ang = this.world.ang, out = this.tmp2;
            const a3 = this.a[k] * 3, b3 = this.b[k] * 3;
            out[0] = ang[b3] - ang[a3];
            out[1] = ang[b3 + 1] - ang[a3 + 1];
            out[2] = ang[b3 + 2] - ang[a3 + 2];
            return out;
        }
        apply_lin(k, lx, ly, lz) {
            const world = this.world, vel = world.vel, ang = world.ang;
            const a = this.a[k], b = this.b[k], a3 = a * 3, b3 = b * 3, k3 = k * 3, k9 = k * 9;
            const ima = this.ima[k], imb = this.imb[k], ra = this.ra, rb = this.rb, iwa = this.iwa, iwb = this.iwb;
            if (ima > 0) {
                vel[a3] -= lx * ima;
                vel[a3 + 1] -= ly * ima;
                vel[a3 + 2] -= lz * ima;
                const tx = ra[k3 + 1] * lz - ra[k3 + 2] * ly, ty = ra[k3 + 2] * lx - ra[k3] * lz, tz = ra[k3] * ly - ra[k3 + 1] * lx;
                ang[a3] -= iwa[k9] * tx + iwa[k9 + 1] * ty + iwa[k9 + 2] * tz;
                ang[a3 + 1] -= iwa[k9 + 3] * tx + iwa[k9 + 4] * ty + iwa[k9 + 5] * tz;
                ang[a3 + 2] -= iwa[k9 + 6] * tx + iwa[k9 + 7] * ty + iwa[k9 + 8] * tz;
            }
            if (imb > 0) {
                vel[b3] += lx * imb;
                vel[b3 + 1] += ly * imb;
                vel[b3 + 2] += lz * imb;
                const tx = rb[k3 + 1] * lz - rb[k3 + 2] * ly, ty = rb[k3 + 2] * lx - rb[k3] * lz, tz = rb[k3] * ly - rb[k3 + 1] * lx;
                ang[b3] += iwb[k9] * tx + iwb[k9 + 1] * ty + iwb[k9 + 2] * tz;
                ang[b3 + 1] += iwb[k9 + 3] * tx + iwb[k9 + 4] * ty + iwb[k9 + 5] * tz;
                ang[b3 + 2] += iwb[k9 + 6] * tx + iwb[k9 + 7] * ty + iwb[k9 + 8] * tz;
            }
        }
        apply_ang(k, tx, ty, tz) {
            const ang = this.world.ang;
            const a3 = this.a[k] * 3, b3 = this.b[k] * 3, k9 = k * 9;
            const iwa = this.iwa, iwb = this.iwb;
            if (this.ima[k] > 0) {
                ang[a3] -= iwa[k9] * tx + iwa[k9 + 1] * ty + iwa[k9 + 2] * tz;
                ang[a3 + 1] -= iwa[k9 + 3] * tx + iwa[k9 + 4] * ty + iwa[k9 + 5] * tz;
                ang[a3 + 2] -= iwa[k9 + 6] * tx + iwa[k9 + 7] * ty + iwa[k9 + 8] * tz;
            }
            if (this.imb[k] > 0) {
                ang[b3] += iwb[k9] * tx + iwb[k9 + 1] * ty + iwb[k9 + 2] * tz;
                ang[b3 + 1] += iwb[k9 + 3] * tx + iwb[k9 + 4] * ty + iwb[k9 + 5] * tz;
                ang[b3 + 2] += iwb[k9 + 6] * tx + iwb[k9 + 7] * ty + iwb[k9 + 8] * tz;
            }
        }
        active(i) {
            const world = this.world;
            if (!(world.inv_mass[i] > 0))
                return false;
            if (world.flags[i] & $bog_gamengine_phys3_joint.flag_sleep)
                return false;
            return true;
        }
        moving(i) {
            const vel = this.world.vel, ang = this.world.ang, i3 = i * 3;
            const v2 = vel[i3] * vel[i3] + vel[i3 + 1] * vel[i3 + 1] + vel[i3 + 2] * vel[i3 + 2];
            const w2 = ang[i3] * ang[i3] + ang[i3 + 1] * ang[i3 + 1] + ang[i3 + 2] * ang[i3 + 2];
            const speed2 = $bog_gamengine_phys3_joint.sleep_speed * $bog_gamengine_phys3_joint.sleep_speed;
            return v2 >= speed2 || w2 >= speed2;
        }
        wake(i) {
            this.world.flags[i] &= ~$bog_gamengine_phys3_joint.flag_sleep;
            this.world.sleep_timer[i] = 0;
        }
        prepare(world, dt) {
            this.world = world;
            const count = this.count;
            const pos = world.pos, rot = world.rot, inv_mass = world.inv_mass, flags = world.flags;
            const type = this.type, live = this.live, ima = this.ima, imb = this.imb;
            const ra = this.ra, rb = this.rb, iwa = this.iwa, iwb = this.iwb;
            const axis = this.axis, u = this.u, v = this.v, tmp = this.tmp, tmp2 = this.tmp2, tmp3 = this.tmp3;
            const bias_lin = this.bias_lin, bias_ang = this.bias_ang, imp_lin = this.imp_lin, imp_ang = this.imp_ang;
            const beta_dt = $bog_gamengine_phys3_joint.beta / dt;
            const sleep = $bog_gamengine_phys3_joint.flag_sleep;
            for (let k = 0; k < count; ++k) {
                const k3 = k * 3, k9 = k * 9;
                const a = this.a[k], b = this.b[k];
                let act_a = this.active(a), act_b = this.active(b);
                live[k] = 0;
                if (!act_a && !act_b)
                    continue;
                if (!act_a && inv_mass[a] > 0 && flags[a] & sleep && this.moving(b)) {
                    this.wake(a);
                    act_a = true;
                }
                if (!act_b && inv_mass[b] > 0 && flags[b] & sleep && this.moving(a)) {
                    this.wake(b);
                    act_b = true;
                }
                ima[k] = act_a ? inv_mass[a] : 0;
                imb[k] = act_b ? inv_mass[b] : 0;
                if (act_a)
                    this.inertia_world(a, iwa, k9);
                else
                    iwa.fill(0, k9, k9 + 9);
                if (act_b)
                    this.inertia_world(b, iwb, k9);
                else
                    iwb.fill(0, k9, k9 + 9);
                const qa = rot.subarray(a * 4, a * 4 + 4), qb = rot.subarray(b * 4, b * 4 + 4);
                $bog_gamengine_vec_quat_rotate(tmp, qa, this.anchor_a.subarray(k3, k3 + 3));
                ra.set(tmp, k3);
                $bog_gamengine_vec_quat_rotate(tmp, qb, this.anchor_b.subarray(k3, k3 + 3));
                rb.set(tmp, k3);
                const dx = pos[b * 3] + rb[k3] - pos[a * 3] - ra[k3];
                const dy = pos[b * 3 + 1] + rb[k3 + 1] - pos[a * 3 + 1] - ra[k3 + 1];
                const dz = pos[b * 3 + 2] + rb[k3 + 2] - pos[a * 3 + 2] - ra[k3 + 2];
                const kind = type[k];
                if (kind === $bog_gamengine_phys3_joint.type_spring) {
                    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (len < 1e-6)
                        continue;
                    const nx = dx / len, ny = dy / len, nz = dz / len;
                    const mass_n = this.mass_lin(k, nx, ny, nz);
                    const rel = this.rel_vel(k);
                    const vn = rel[0] * nx + rel[1] * ny + rel[2] * nz;
                    const rest = this.param[k * 4], stiff = this.param[k * 4 + 1], damp = this.param[k * 4 + 2];
                    const cd = damp * dt;
                    const lambda = -stiff * (len - rest) * dt - vn * (cd < mass_n ? cd : mass_n);
                    this.apply_lin(k, lambda * nx, lambda * ny, lambda * nz);
                    continue;
                }
                live[k] = 1;
                if (kind === $bog_gamengine_phys3_joint.type_point) {
                    bias_lin[k3] = beta_dt * dx;
                    bias_lin[k3 + 1] = beta_dt * dy;
                    bias_lin[k3 + 2] = beta_dt * dz;
                    this.kin_lin(k);
                    this.apply_lin(k, imp_lin[k3], imp_lin[k3 + 1], imp_lin[k3 + 2]);
                    continue;
                }
                $bog_gamengine_vec_quat_rotate(tmp, qa, this.axis_a.subarray(k3, k3 + 3));
                axis.set(tmp, k3);
                const ax = tmp[0], ay = tmp[1], az = tmp[2];
                this.perp(ax, ay, az, tmp2);
                u.set(tmp2, k3);
                const ux = tmp2[0], uy = tmp2[1], uz = tmp2[2];
                const vx = ay * uz - az * uy, vy = az * ux - ax * uz, vz = ax * uy - ay * ux;
                v[k3] = vx;
                v[k3 + 1] = vy;
                v[k3 + 2] = vz;
                const min = this.param[k * 4], max = this.param[k * 4 + 1];
                if (kind === $bog_gamengine_phys3_joint.type_hinge) {
                    bias_lin[k3] = beta_dt * dx;
                    bias_lin[k3 + 1] = beta_dt * dy;
                    bias_lin[k3 + 2] = beta_dt * dz;
                    this.kin_lin(k);
                    $bog_gamengine_vec_quat_rotate(tmp3, qb, this.axis_b.subarray(k3, k3 + 3));
                    const ex = tmp3[1] * az - tmp3[2] * ay, ey = tmp3[2] * ax - tmp3[0] * az, ez = tmp3[0] * ay - tmp3[1] * ax;
                    bias_ang[k3] = -beta_dt * (ex * ux + ey * uy + ez * uz);
                    bias_ang[k3 + 1] = -beta_dt * (ex * vx + ey * vy + ez * vz);
                    this.mass_u[k] = this.mass_ang(k, ux, uy, uz);
                    this.mass_v[k] = this.mass_ang(k, vx, vy, vz);
                    let state = 0;
                    if (min < max) {
                        $bog_gamengine_vec_quat_rotate(tmp2, qa, this.ref_a.subarray(k3, k3 + 3));
                        $bog_gamengine_vec_quat_rotate(tmp3, qb, this.ref_b.subarray(k3, k3 + 3));
                        const cx = tmp2[1] * tmp3[2] - tmp2[2] * tmp3[1], cy = tmp2[2] * tmp3[0] - tmp2[0] * tmp3[2], cz = tmp2[0] * tmp3[1] - tmp2[1] * tmp3[0];
                        const angle = Math.atan2(cx * ax + cy * ay + cz * az, tmp2[0] * tmp3[0] + tmp2[1] * tmp3[1] + tmp2[2] * tmp3[2]);
                        state = angle - min < max - angle ? 1 : -1;
                        const c = state > 0 ? angle - min : max - angle;
                        this.lim_target[k] = -(c > 0 ? c : c * $bog_gamengine_phys3_joint.beta) / dt;
                        this.mass_lim[k] = this.mass_ang(k, ax, ay, az);
                    }
                    if (state !== this.lim[k])
                        imp_ang[k3 + 2] = 0;
                    this.lim[k] = state;
                    this.apply_lin(k, imp_lin[k3], imp_lin[k3 + 1], imp_lin[k3 + 2]);
                    const t1 = imp_ang[k3], t2 = imp_ang[k3 + 1], t3 = imp_ang[k3 + 2] * state;
                    this.apply_ang(k, t1 * ux + t2 * vx + t3 * ax, t1 * uy + t2 * vy + t3 * ay, t1 * uz + t2 * vz + t3 * az);
                    continue;
                }
                ra[k3] += dx;
                ra[k3 + 1] += dy;
                ra[k3 + 2] += dz;
                bias_lin[k3] = beta_dt * (dx * ux + dy * uy + dz * uz);
                bias_lin[k3 + 1] = beta_dt * (dx * vx + dy * vy + dz * vz);
                this.mass_u[k] = this.mass_lin(k, ux, uy, uz);
                this.mass_v[k] = this.mass_lin(k, vx, vy, vz);
                const q1 = this.q1, q2 = this.q2;
                $bog_gamengine_vec_quat_mul(q1, qa, this.rel.subarray(k * 4, k * 4 + 4));
                q2[0] = -qb[0];
                q2[1] = -qb[1];
                q2[2] = -qb[2];
                q2[3] = qb[3];
                $bog_gamengine_vec_quat_mul(q1, q1, q2);
                const sign = q1[3] < 0 ? -2 : 2;
                bias_ang[k3] = -beta_dt * sign * q1[0];
                bias_ang[k3 + 1] = -beta_dt * sign * q1[1];
                bias_ang[k3 + 2] = -beta_dt * sign * q1[2];
                this.kin_ang(k);
                let state = 0;
                if (min < max) {
                    const s = dx * ax + dy * ay + dz * az;
                    state = s - min < max - s ? 1 : -1;
                    const c = state > 0 ? s - min : max - s;
                    this.lim_target[k] = -(c > 0 ? c : c * $bog_gamengine_phys3_joint.beta) / dt;
                    this.mass_lim[k] = this.mass_lin(k, ax, ay, az);
                }
                if (state !== this.lim[k])
                    imp_lin[k3 + 2] = 0;
                this.lim[k] = state;
                const l1 = imp_lin[k3], l2 = imp_lin[k3 + 1], l3 = imp_lin[k3 + 2] * state;
                this.apply_lin(k, l1 * ux + l2 * vx + l3 * ax, l1 * uy + l2 * vy + l3 * ay, l1 * uz + l2 * vz + l3 * az);
                this.apply_ang(k, imp_ang[k3], imp_ang[k3 + 1], imp_ang[k3 + 2]);
            }
        }
        iterate() {
            const count = this.count;
            const type = this.type, live = this.live, kin = this.kin;
            const axis = this.axis, u = this.u, v = this.v;
            const bias_lin = this.bias_lin, bias_ang = this.bias_ang, imp_lin = this.imp_lin, imp_ang = this.imp_ang;
            const mass_u = this.mass_u, mass_v = this.mass_v, mass_lim = this.mass_lim, lim = this.lim, lim_target = this.lim_target;
            for (let k = 0; k < count; ++k) {
                if (!live[k])
                    continue;
                const k3 = k * 3, k9 = k * 9;
                const kind = type[k];
                if (kind !== $bog_gamengine_phys3_joint.type_slider) {
                    const rel = this.rel_vel(k);
                    const rx = -rel[0] - bias_lin[k3], ry = -rel[1] - bias_lin[k3 + 1], rz = -rel[2] - bias_lin[k3 + 2];
                    const lx = kin[k9] * rx + kin[k9 + 1] * ry + kin[k9 + 2] * rz;
                    const ly = kin[k9 + 3] * rx + kin[k9 + 4] * ry + kin[k9 + 5] * rz;
                    const lz = kin[k9 + 6] * rx + kin[k9 + 7] * ry + kin[k9 + 8] * rz;
                    imp_lin[k3] += lx;
                    imp_lin[k3 + 1] += ly;
                    imp_lin[k3 + 2] += lz;
                    this.apply_lin(k, lx, ly, lz);
                    if (kind === $bog_gamengine_phys3_joint.type_point)
                        continue;
                }
                const ax = axis[k3], ay = axis[k3 + 1], az = axis[k3 + 2];
                const ux = u[k3], uy = u[k3 + 1], uz = u[k3 + 2];
                const vx = v[k3], vy = v[k3 + 1], vz = v[k3 + 2];
                const state = lim[k];
                if (kind === $bog_gamengine_phys3_joint.type_hinge) {
                    let w = this.rel_ang(k);
                    const lu = -mass_u[k] * (w[0] * ux + w[1] * uy + w[2] * uz + bias_ang[k3]);
                    imp_ang[k3] += lu;
                    this.apply_ang(k, lu * ux, lu * uy, lu * uz);
                    w = this.rel_ang(k);
                    const lv = -mass_v[k] * (w[0] * vx + w[1] * vy + w[2] * vz + bias_ang[k3 + 1]);
                    imp_ang[k3 + 1] += lv;
                    this.apply_ang(k, lv * vx, lv * vy, lv * vz);
                    if (state === 0)
                        continue;
                    w = this.rel_ang(k);
                    const jv = state * (w[0] * ax + w[1] * ay + w[2] * az);
                    const old = imp_ang[k3 + 2];
                    let next = old + mass_lim[k] * (lim_target[k] - jv);
                    if (next < 0)
                        next = 0;
                    imp_ang[k3 + 2] = next;
                    const dl = (next - old) * state;
                    this.apply_ang(k, dl * ax, dl * ay, dl * az);
                    continue;
                }
                let rel = this.rel_vel(k);
                const lu = -mass_u[k] * (rel[0] * ux + rel[1] * uy + rel[2] * uz + bias_lin[k3]);
                imp_lin[k3] += lu;
                this.apply_lin(k, lu * ux, lu * uy, lu * uz);
                rel = this.rel_vel(k);
                const lv = -mass_v[k] * (rel[0] * vx + rel[1] * vy + rel[2] * vz + bias_lin[k3 + 1]);
                imp_lin[k3 + 1] += lv;
                this.apply_lin(k, lv * vx, lv * vy, lv * vz);
                if (state !== 0) {
                    rel = this.rel_vel(k);
                    const jv = state * (rel[0] * ax + rel[1] * ay + rel[2] * az);
                    const old = imp_lin[k3 + 2];
                    let next = old + mass_lim[k] * (lim_target[k] - jv);
                    if (next < 0)
                        next = 0;
                    imp_lin[k3 + 2] = next;
                    const dl = (next - old) * state;
                    this.apply_lin(k, dl * ax, dl * ay, dl * az);
                }
                const w = this.rel_ang(k);
                const rx = -w[0] - bias_ang[k3], ry = -w[1] - bias_ang[k3 + 1], rz = -w[2] - bias_ang[k3 + 2];
                const tx = kin[k9] * rx + kin[k9 + 1] * ry + kin[k9 + 2] * rz;
                const ty = kin[k9 + 3] * rx + kin[k9 + 4] * ry + kin[k9 + 5] * rz;
                const tz = kin[k9 + 6] * rx + kin[k9 + 7] * ry + kin[k9 + 8] * rz;
                imp_ang[k3] += tx;
                imp_ang[k3 + 1] += ty;
                imp_ang[k3 + 2] += tz;
                this.apply_ang(k, tx, ty, tz);
            }
        }
    }
    $.$bog_gamengine_phys3_joint = $bog_gamengine_phys3_joint;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3 extends $mol_object2 {
        static shape_sphere = 0;
        static shape_box = 1;
        static shape_capsule = 2;
        static shape_plane = 3;
        static shape_hull = 4;
        static flag_sleep = 1;
        static flag_ghost = 2;
        static flag_kinematic = 4;
        static sleep_speed = 0.05;
        static sleep_time = 0.5;
        static stat_window = 30;
        cap = 0;
        count = 0;
        pos = new Float32Array(0);
        rot = new Float32Array(0);
        vel = new Float32Array(0);
        ang = new Float32Array(0);
        mass = new Float32Array(0);
        inv_mass = new Float32Array(0);
        inv_inertia = new Float32Array(0);
        shape = new Uint8Array(0);
        size = new Float32Array(0);
        flags = new Uint8Array(0);
        trans = new Float32Array(0);
        aabb = new Float32Array(0);
        sleep_timer = new Float32Array(0);
        hull_off = new Uint32Array(0);
        hull_count = new Uint32Array(0);
        hull = new Float32Array(0);
        hull_len = 0;
        handle_at = new Int32Array(0);
        index_at = new Int32Array(0);
        handle_seq = 0;
        free = new Int32Array(0);
        free_count = 0;
        pos_view = [];
        rot_view = [];
        ang_view = [];
        trans_view = [];
        tmp_scale = new Float32Array(3);
        tmp_point = new Float32Array(3);
        broad = new $bog_gamengine_phys3_broad;
        narrow = new $bog_gamengine_phys3_narrow;
        solve = new $bog_gamengine_phys3_solve;
        joint = new $bog_gamengine_phys3_joint;
        constructor() {
            super();
            this.joint.world = this;
        }
        gravity(next) {
            return next ?? new Float32Array([0, -9.81, 0]);
        }
        friction(next) {
            return next ?? 0.5;
        }
        restitution(next) {
            return next ?? 0;
        }
        iterations(next) {
            return next ?? 8;
        }
        pull() {
            this.gravity();
            this.friction();
            this.restitution();
            this.iterations();
        }
        grow(need) {
            if (need <= this.cap)
                return;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.pos = this.grow_f32(this.pos, cap * 3);
            this.rot = this.grow_f32(this.rot, cap * 4);
            this.vel = this.grow_f32(this.vel, cap * 3);
            this.ang = this.grow_f32(this.ang, cap * 3);
            this.mass = this.grow_f32(this.mass, cap);
            this.inv_mass = this.grow_f32(this.inv_mass, cap);
            this.inv_inertia = this.grow_f32(this.inv_inertia, cap * 3);
            this.size = this.grow_f32(this.size, cap * 3);
            this.trans = this.grow_f32(this.trans, cap * 16);
            this.aabb = this.grow_f32(this.aabb, cap * 6);
            this.sleep_timer = this.grow_f32(this.sleep_timer, cap);
            const shape = new Uint8Array(cap);
            shape.set(this.shape);
            this.shape = shape;
            const flags = new Uint8Array(cap);
            flags.set(this.flags);
            this.flags = flags;
            const hull_off = new Uint32Array(cap);
            hull_off.set(this.hull_off);
            this.hull_off = hull_off;
            const hull_count = new Uint32Array(cap);
            hull_count.set(this.hull_count);
            this.hull_count = hull_count;
            const handle_at = new Int32Array(cap);
            handle_at.set(this.handle_at);
            this.handle_at = handle_at;
            this.pos_view = this.views(this.pos, 3);
            this.rot_view = this.views(this.rot, 4);
            this.ang_view = this.views(this.ang, 3);
            this.trans_view = this.views(this.trans, 16);
        }
        views(buf, stride) {
            const list = [];
            for (let i = 0; i < this.cap; ++i)
                list.push(buf.subarray(i * stride, i * stride + stride));
            return list;
        }
        grow_f32(prev, len) {
            const next = new Float32Array(len);
            next.set(prev);
            return next;
        }
        add(shape, size, mass, pos, rot) {
            const i = this.count;
            this.grow(i + 1);
            this.count = i + 1;
            this.shape[i] = shape;
            this.size.set(size, i * 3);
            this.pos.set(pos, i * 3);
            if (rot)
                this.rot.set(rot, i * 4);
            else
                $bog_gamengine_vec_quat_identity(this.rot_view[i]);
            this.vel.fill(0, i * 3, i * 3 + 3);
            this.ang.fill(0, i * 3, i * 3 + 3);
            this.flags[i] = 0;
            this.sleep_timer[i] = 0;
            this.hull_off[i] = 0;
            this.hull_count[i] = 0;
            this.mass_set(i, mass);
            this.trans_write(i);
            this.bounds_of(i);
            return this.handle_new(i);
        }
        handle_grow(need) {
            if (need <= this.index_at.length)
                return;
            let len = Math.max(this.index_at.length, 16);
            while (len < need)
                len *= 2;
            const index_at = new Int32Array(len);
            index_at.set(this.index_at);
            this.index_at = index_at;
            const free = new Int32Array(len);
            free.set(this.free);
            this.free = free;
        }
        handle_new(index) {
            let handle = 0;
            if (this.free_count > 0)
                handle = this.free[--this.free_count];
            else {
                handle = ++this.handle_seq;
                this.handle_grow(handle);
            }
            this.index_at[handle - 1] = index;
            this.handle_at[index] = handle;
            return handle;
        }
        index_of(handle) {
            if (handle < 1 || handle > this.handle_seq)
                return -1;
            return this.index_at[handle - 1];
        }
        handle_of(index) {
            return index >= 0 && index < this.count ? this.handle_at[index] : 0;
        }
        pos_of(handle) {
            const i = this.index_of(handle);
            return i < 0 ? null : this.pos_view[i];
        }
        rot_of(handle) {
            const i = this.index_of(handle);
            return i < 0 ? null : this.rot_view[i];
        }
        mass_of(handle, next) {
            const i = this.index_of(handle);
            if (i < 0)
                return 0;
            if (next !== undefined)
                this.mass_set(i, next);
            return this.mass[i];
        }
        flag_set(i, flag, on) {
            if (on)
                this.flags[i] |= flag;
            else
                this.flags[i] &= ~flag;
        }
        ghost_of(handle, next) {
            const i = this.index_of(handle);
            if (i < 0)
                return false;
            const flag = $bog_gamengine_phys3.flag_ghost;
            if (next !== undefined)
                this.flag_set(i, flag, next);
            return (this.flags[i] & flag) !== 0;
        }
        kinematic_of(handle, next) {
            const i = this.index_of(handle);
            if (i < 0)
                return false;
            const flag = $bog_gamengine_phys3.flag_kinematic;
            if (next !== undefined)
                this.flag_set(i, flag, next);
            return (this.flags[i] & flag) !== 0;
        }
        move(handle, pos, rot) {
            const i = this.index_of(handle);
            if (i < 0)
                return false;
            this.pos.set(pos, i * 3);
            if (rot)
                this.rot.set(rot, i * 4);
            this.flags[i] &= ~$bog_gamengine_phys3.flag_sleep;
            this.sleep_timer[i] = 0;
            this.bounds_of(i);
            this.trans_write(i);
            return true;
        }
        mass_set(i, mass) {
            this.mass[i] = mass;
            this.inv_mass[i] = mass > 0 ? 1 / mass : 0;
            const inertia = this.inv_inertia;
            inertia.fill(0, i * 3, i * 3 + 3);
            if (mass <= 0)
                return;
            const size = this.size;
            const sx = size[i * 3], sy = size[i * 3 + 1], sz = size[i * 3 + 2];
            switch (this.shape[i]) {
                case $bog_gamengine_phys3.shape_sphere: {
                    const k = 2.5 / (mass * sx * sx);
                    inertia[i * 3] = k;
                    inertia[i * 3 + 1] = k;
                    inertia[i * 3 + 2] = k;
                    break;
                }
                case $bog_gamengine_phys3.shape_box: {
                    inertia[i * 3] = 3 / (mass * (sy * sy + sz * sz));
                    inertia[i * 3 + 1] = 3 / (mass * (sx * sx + sz * sz));
                    inertia[i * 3 + 2] = 3 / (mass * (sx * sx + sy * sy));
                    break;
                }
                case $bog_gamengine_phys3.shape_capsule: {
                    const r = sx, h = sy;
                    const vol_cyl = Math.PI * r * r * 2 * h;
                    const vol_sph = Math.PI * r * r * r * 4 / 3;
                    const m_cyl = mass * vol_cyl / (vol_cyl + vol_sph);
                    const m_sph = mass - m_cyl;
                    const side = m_cyl * (h * h / 3 + r * r / 4) + m_sph * (r * r * 2 / 5 + h * h + h * r * 3 / 4);
                    const axis = m_cyl * r * r / 2 + m_sph * r * r * 2 / 5;
                    inertia[i * 3] = 1 / side;
                    inertia[i * 3 + 1] = 1 / axis;
                    inertia[i * 3 + 2] = 1 / side;
                    break;
                }
            }
        }
        remove(handle) {
            const index = this.index_of(handle);
            if (index < 0)
                return false;
            this.drop(index);
            return true;
        }
        drop(index) {
            const last = this.count - 1;
            const handle = this.handle_at[index];
            if (index !== last) {
                this.swap(index, last);
                const moved = this.handle_at[last];
                this.handle_at[index] = moved;
                this.index_at[moved - 1] = index;
            }
            this.handle_at[last] = 0;
            if (handle > 0) {
                this.index_at[handle - 1] = -1;
                this.free[this.free_count++] = handle;
            }
            this.count = last;
            this.joint.body_remove(index, last);
            return last;
        }
        swap(index, last) {
            this.pos.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.rot.copyWithin(index * 4, last * 4, last * 4 + 4);
            this.vel.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.ang.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.mass[index] = this.mass[last];
            this.inv_mass[index] = this.inv_mass[last];
            this.inv_inertia.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.shape[index] = this.shape[last];
            this.size.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.flags[index] = this.flags[last];
            this.trans.copyWithin(index * 16, last * 16, last * 16 + 16);
            this.aabb.copyWithin(index * 6, last * 6, last * 6 + 6);
            this.sleep_timer[index] = this.sleep_timer[last];
            this.hull_off[index] = this.hull_off[last];
            this.hull_count[index] = this.hull_count[last];
        }
        hull_points(index, points) {
            const off = this.hull_len;
            const need = off + points.length;
            if (need > this.hull.length) {
                let len = Math.max(this.hull.length, 64 * 3);
                while (len < need)
                    len *= 2;
                this.hull = this.grow_f32(this.hull, len);
            }
            this.hull.set(points, off);
            this.hull_len = need;
            this.hull_off[index] = off;
            this.hull_count[index] = points.length / 3;
            this.bounds_of(index);
        }
        scale_of(i) {
            const out = this.tmp_scale;
            const size = this.size;
            const sx = size[i * 3], sy = size[i * 3 + 1], sz = size[i * 3 + 2];
            switch (this.shape[i]) {
                case $bog_gamengine_phys3.shape_sphere:
                    out[0] = out[1] = out[2] = sx * 2;
                    break;
                case $bog_gamengine_phys3.shape_box:
                    out[0] = sx * 2;
                    out[1] = sy * 2;
                    out[2] = sz * 2;
                    break;
                case $bog_gamengine_phys3.shape_capsule:
                    out[0] = out[2] = sx * 2;
                    out[1] = (sx + sy) * 2;
                    break;
                default:
                    out[0] = out[1] = out[2] = 1;
            }
            return out;
        }
        trans_write(i) {
            $bog_gamengine_vec_quat_to_mat4(this.trans_view[i], this.rot_view[i], this.pos_view[i], this.scale_of(i));
        }
        timestep = 1 / 60;
        max_steps = 4;
        pending = 0;
        steps_done = 0;
        times = new Float32Array($bog_gamengine_phys3.stat_window);
        samples = 0;
        step(dt) {
            const window = $bog_gamengine_phys3.stat_window;
            const start = performance.now();
            this.step_world(dt);
            this.times[this.samples % window] = performance.now() - start;
            ++this.samples;
        }
        step_ms() {
            const size = Math.min(this.samples, $bog_gamengine_phys3.stat_window);
            let sum = 0;
            for (let i = 0; i < size; ++i)
                sum += this.times[i];
            return size ? sum / size : 0;
        }
        step_world(dt) {
            this.steps_done = 0;
            const timestep = this.timestep;
            let pending = this.pending + dt;
            while (pending >= timestep - 1e-9 && this.steps_done < this.max_steps) {
                this.substep(timestep);
                ++this.steps_done;
                pending -= timestep;
            }
            if (pending < 0)
                pending = 0;
            this.pending = pending < timestep ? pending : timestep;
            const count = this.count;
            const flags = this.flags, rot_view = this.rot_view, pos_view = this.pos_view, trans_view = this.trans_view;
            const sleep = $bog_gamengine_phys3.flag_sleep;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & sleep)
                    continue;
                $bog_gamengine_vec_quat_to_mat4(trans_view[i], rot_view[i], pos_view[i], this.scale_of(i));
            }
        }
        substep(dt) {
            const count = this.count;
            const gravity = this.gravity();
            const gx = gravity[0] * dt, gy = gravity[1] * dt, gz = gravity[2] * dt;
            const pos = this.pos, vel = this.vel, ang = this.ang;
            const inv_mass = this.inv_mass, flags = this.flags, timer = this.sleep_timer;
            const rot_view = this.rot_view, ang_view = this.ang_view;
            const sleep = $bog_gamengine_phys3.flag_sleep;
            const kind = $bog_gamengine_phys3.flag_kinematic;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & (sleep | kind) || !(inv_mass[i] > 0))
                    continue;
                const p = i * 3;
                vel[p] += gx;
                vel[p + 1] += gy;
                vel[p + 2] += gz;
            }
            this.bounds();
            this.broad.find(this);
            this.narrow.collide(this, this.broad.pairs, this.broad.pair_count);
            this.joint.prepare(this, dt);
            this.solve.solve(this, this.narrow, dt, this.joint);
            const speed2 = $bog_gamengine_phys3.sleep_speed * $bog_gamengine_phys3.sleep_speed;
            const sleep_time = $bog_gamengine_phys3.sleep_time;
            const kinematic = $bog_gamengine_phys3.flag_kinematic;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & sleep)
                    continue;
                const p = i * 3;
                if (flags[i] & kinematic) {
                    pos[p] += vel[p] * dt;
                    pos[p + 1] += vel[p + 1] * dt;
                    pos[p + 2] += vel[p + 2] * dt;
                    $bog_gamengine_vec_quat_integrate(rot_view[i], rot_view[i], ang_view[i], dt);
                }
                else if (inv_mass[i] > 0) {
                    const v2 = vel[p] * vel[p] + vel[p + 1] * vel[p + 1] + vel[p + 2] * vel[p + 2];
                    const w2 = ang[p] * ang[p] + ang[p + 1] * ang[p + 1] + ang[p + 2] * ang[p + 2];
                    if (v2 < speed2 && w2 < speed2) {
                        timer[i] += dt;
                        if (timer[i] >= sleep_time) {
                            flags[i] |= sleep;
                            vel.fill(0, p, p + 3);
                            ang.fill(0, p, p + 3);
                            continue;
                        }
                    }
                    else
                        timer[i] = 0;
                    pos[p] += vel[p] * dt;
                    pos[p + 1] += vel[p + 1] * dt;
                    pos[p + 2] += vel[p + 2] * dt;
                    $bog_gamengine_vec_quat_integrate(rot_view[i], rot_view[i], ang_view[i], dt);
                }
            }
        }
        bounds() {
            const count = this.count;
            const flags = this.flags;
            const sleep = $bog_gamengine_phys3.flag_sleep;
            for (let i = 0; i < count; ++i) {
                if (flags[i] & sleep)
                    continue;
                this.bounds_of(i);
            }
        }
        bounds_of(i) {
            const aabb = this.aabb;
            const a = i * 6;
            const pos = this.pos;
            const px = pos[i * 3], py = pos[i * 3 + 1], pz = pos[i * 3 + 2];
            const size = this.size;
            const sx = size[i * 3], sy = size[i * 3 + 1], sz = size[i * 3 + 2];
            switch (this.shape[i]) {
                case $bog_gamengine_phys3.shape_sphere:
                case $bog_gamengine_phys3.shape_capsule: {
                    const r = this.shape[i] === $bog_gamengine_phys3.shape_sphere ? sx : sx + sy;
                    aabb[a] = px - r;
                    aabb[a + 1] = py - r;
                    aabb[a + 2] = pz - r;
                    aabb[a + 3] = px + r;
                    aabb[a + 4] = py + r;
                    aabb[a + 5] = pz + r;
                    break;
                }
                case $bog_gamengine_phys3.shape_box: {
                    const q = this.rot;
                    const x = q[i * 4], y = q[i * 4 + 1], z = q[i * 4 + 2], w = q[i * 4 + 3];
                    const xx = x * x, yy = y * y, zz = z * z;
                    const xy = x * y, xz = x * z, yz = y * z;
                    const wx = w * x, wy = w * y, wz = w * z;
                    const ex = Math.abs(1 - 2 * (yy + zz)) * sx + Math.abs(2 * (xy - wz)) * sy + Math.abs(2 * (xz + wy)) * sz;
                    const ey = Math.abs(2 * (xy + wz)) * sx + Math.abs(1 - 2 * (xx + zz)) * sy + Math.abs(2 * (yz - wx)) * sz;
                    const ez = Math.abs(2 * (xz - wy)) * sx + Math.abs(2 * (yz + wx)) * sy + Math.abs(1 - 2 * (xx + yy)) * sz;
                    aabb[a] = px - ex;
                    aabb[a + 1] = py - ey;
                    aabb[a + 2] = pz - ez;
                    aabb[a + 3] = px + ex;
                    aabb[a + 4] = py + ey;
                    aabb[a + 5] = pz + ez;
                    break;
                }
                case $bog_gamengine_phys3.shape_hull: {
                    const hull = this.hull;
                    const off = this.hull_off[i], end = off + this.hull_count[i] * 3;
                    const rot = this.rot_view[i];
                    const point = this.tmp_point;
                    let min_x = Infinity, min_y = Infinity, min_z = Infinity;
                    let max_x = -Infinity, max_y = -Infinity, max_z = -Infinity;
                    for (let k = off; k < end; k += 3) {
                        point[0] = hull[k];
                        point[1] = hull[k + 1];
                        point[2] = hull[k + 2];
                        $bog_gamengine_vec_quat_rotate(point, rot, point);
                        if (point[0] < min_x)
                            min_x = point[0];
                        if (point[1] < min_y)
                            min_y = point[1];
                        if (point[2] < min_z)
                            min_z = point[2];
                        if (point[0] > max_x)
                            max_x = point[0];
                        if (point[1] > max_y)
                            max_y = point[1];
                        if (point[2] > max_z)
                            max_z = point[2];
                    }
                    if (end === off)
                        min_x = min_y = min_z = max_x = max_y = max_z = 0;
                    aabb[a] = px + min_x;
                    aabb[a + 1] = py + min_y;
                    aabb[a + 2] = pz + min_z;
                    aabb[a + 3] = px + max_x;
                    aabb[a + 4] = py + max_y;
                    aabb[a + 5] = pz + max_z;
                    break;
                }
                default: {
                    aabb[a] = aabb[a + 1] = aabb[a + 2] = -1e9;
                    aabb[a + 3] = aabb[a + 4] = aabb[a + 5] = 1e9;
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "gravity", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "friction", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "restitution", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3.prototype, "iterations", null);
    $.$bog_gamengine_phys3 = $bog_gamengine_phys3;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_scene extends $bog_gamengine_node {
        clock(next) {
            return next ?? new $bog_gamengine_clock;
        }
        is_scene() {
            return true;
        }
        auto_nodes(next) {
            return next ?? [];
        }
        nodes() {
            const list = [];
            const brains = (node) => {
                const kids = node.kids();
                for (let i = 0; i < kids.length; ++i) {
                    const kid = kids[i];
                    if (!kid.parent())
                        kid.parent(node);
                    if (!kid.is_brain())
                        continue;
                    list.push(kid);
                    rest(kid);
                }
            };
            const rest = (node) => {
                const kids = node.kids();
                for (let i = 0; i < kids.length; ++i) {
                    const kid = kids[i];
                    if (!kid.parent())
                        kid.parent(node);
                    if (kid.is_brain())
                        continue;
                    brains(kid);
                    list.push(kid);
                    rest(kid);
                }
            };
            brains(this);
            rest(this);
            const auto = this.auto_nodes();
            for (let i = 0; i < auto.length; ++i) {
                if (!auto[i].parent())
                    auto[i].parent(this);
                brains(auto[i]);
                list.push(auto[i]);
                rest(auto[i]);
            }
            return list;
        }
        lights() {
            const nodes = this.nodes();
            const lights = [];
            for (let i = 0; i < nodes.length && lights.length < 8; ++i) {
                const node = nodes[i];
                if (node instanceof $bog_gamengine_light)
                    lights.push(node);
            }
            return lights;
        }
        Shader_sprite(next) {
            return next ?? new this.$.$bog_gamengine_shader_sprite;
        }
        Shader_solid(next) {
            return next ?? new this.$.$bog_gamengine_shader_solid;
        }
        Shader_plain(next) {
            return next ?? new this.$.$bog_gamengine_shader_solid_plain;
        }
        Shape_quad(next) {
            return next ?? new this.$.$bog_gamengine_shape_quad;
        }
        Batch(key) {
            return new this.$.$bog_gamengine_batch;
        }
        node_source(node) {
            const probe = node;
            if (typeof probe.is_source !== 'function' || !probe.is_source())
                return null;
            return probe.source?.() ?? null;
        }
        node_drawn(node) {
            const probe = node;
            return typeof probe.atlas === 'function'
                && typeof probe.layer === 'function'
                && typeof probe.uv === 'function';
        }
        node_shader(node) {
            const own = node.shader?.();
            if (own)
                return own;
            if (typeof node.normal_layer !== 'function')
                return this.Shader_sprite();
            return node.atlas() ? this.Shader_solid() : this.Shader_plain();
        }
        node_shape(node) {
            return typeof node.shape === 'function' ? node.shape() : this.Shape_quad();
        }
        auto_batches() {
            const nodes = this.nodes();
            const drawn = [];
            const sources = new Map();
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                const source = this.node_source(node);
                if (source) {
                    const batch = this.Batch('source ' + $bog_gamengine_batch_group_id(node));
                    batch.shader(this.node_shader(node));
                    batch.shape(this.node_shape(node));
                    batch.atlas(node.atlas());
                    batch.source(source);
                    sources.set(node, batch);
                    continue;
                }
                if (this.node_drawn(node))
                    drawn.push(node);
            }
            const parts = $bog_gamengine_batch_group(drawn, node => this.node_shader(node), node => this.node_shape(node));
            const grouped = new Map();
            for (let i = 0; i < parts.length; ++i) {
                const part = parts[i];
                const batch = this.Batch(part.key);
                batch.shader(part.shader);
                batch.shape(part.shape);
                batch.atlas(part.atlas);
                batch.nodes(part.nodes);
                grouped.set(part.nodes[0], batch);
            }
            const batches = [];
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                const batch = sources.get(node) ?? grouped.get(node);
                if (batch)
                    batches.push(batch);
            }
            return batches;
        }
        batches(next) {
            return next ?? this.auto_batches();
        }
        phys(next) {
            return next ?? null;
        }
        phys3(next) {
            return next ?? null;
        }
        input(next) {
            return next ?? null;
        }
        cam(next) {
            return next ?? null;
        }
        aspect(next = 1) {
            return next;
        }
        frame_done = -1;
        frustum = new Float32Array(24);
        eye = new Float32Array(3);
        snap = new Float32Array(0);
        snap_count = 0;
        snapshot() {
            return this.snap;
        }
        snapshot_count() {
            return this.snap_count;
        }
        snapshot_version(next = 0) {
            return next;
        }
        snap_fill(nodes) {
            if (this.snap.length < nodes.length * 3)
                this.snap = new Float32Array(nodes.length * 3);
            const snap = this.snap;
            for (let i = 0; i < nodes.length; ++i) {
                const node = nodes[i];
                const at = i * 3;
                if (!node.shown()) {
                    snap[at] = 0;
                    snap[at + 1] = 0;
                    snap[at + 2] = 0;
                    continue;
                }
                const world = node.world();
                snap[at] = world[12];
                snap[at + 1] = world[13];
                snap[at + 2] = world[14];
            }
            this.snap_count = nodes.length;
        }
        step() {
            const frame = this.clock().frame();
            const dt = this.clock().dt();
            const input = this.input();
            const nodes = this.nodes();
            const phys = this.phys();
            const phys3 = this.phys3();
            phys?.pull();
            phys3?.pull();
            const cam = this.cam();
            const aspect = this.aspect();
            if (frame !== this.frame_done) {
                this.frame_done = frame;
                input?.poll();
                for (let i = 0; i < nodes.length; ++i) {
                    const node = nodes[i];
                    if (node.shown())
                        node.step(dt);
                }
                phys?.step(dt);
                phys3?.step(dt);
                if (cam && nodes.indexOf(cam) < 0) {
                    if (!cam.parent())
                        cam.parent(this);
                    cam.step(dt);
                }
                this.snap_fill(nodes);
                this.snapshot_version(frame);
            }
            if (cam) {
                cam.frustum(aspect, this.frustum);
                const world = cam.world();
                this.eye[0] = world[12];
                this.eye[1] = world[13];
                this.eye[2] = world[14];
            }
            const batches = this.batches();
            for (let i = 0; i < batches.length; ++i)
                batches[i].fill(cam ? this.frustum : null, cam ? this.eye : null);
            return frame;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "clock", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "auto_nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "lights", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shader_sprite", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shader_solid", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shader_plain", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "Shape_quad", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_scene.prototype, "Batch", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "auto_batches", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "batches", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "phys", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "phys3", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "input", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "cam", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "aspect", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "snapshot_version", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "step", null);
    $.$bog_gamengine_scene = $bog_gamengine_scene;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_cam_frustum_sphere(frustum, x, y, z, radius) {
        for (let side = 0; side < 6; ++side) {
            const at = side * 4;
            if (frustum[at] * x + frustum[at + 1] * y + frustum[at + 2] * z + frustum[at + 3] < -radius)
                return false;
        }
        return true;
    }
    $.$bog_gamengine_cam_frustum_sphere = $bog_gamengine_cam_frustum_sphere;
    function $bog_gamengine_cam_frustum_aabb(frustum, aabb, at) {
        for (let side = 0; side < 6; ++side) {
            const p = side * 4;
            const a = frustum[p];
            const b = frustum[p + 1];
            const c = frustum[p + 2];
            const x = a > 0 ? aabb[at + 3] : aabb[at];
            const y = b > 0 ? aabb[at + 4] : aabb[at + 1];
            const z = c > 0 ? aabb[at + 5] : aabb[at + 2];
            if (a * x + b * y + c * z + frustum[p + 3] < 0)
                return false;
        }
        return true;
    }
    $.$bog_gamengine_cam_frustum_aabb = $bog_gamengine_cam_frustum_aabb;
    class $bog_gamengine_cam extends $bog_gamengine_node {
        aspect(next) {
            return next ?? this.scene()?.aspect() ?? 1;
        }
        view() {
            return this.world().inversed();
        }
        proj(aspect) {
            throw new Error('not implemented');
        }
        clip = new Float32Array(16);
        frustum(aspect, out) {
            const proj = this.proj(aspect);
            const view = this.view();
            const clip = this.clip;
            for (let col = 0; col < 4; ++col) {
                for (let row = 0; row < 4; ++row) {
                    clip[col * 4 + row] =
                        proj[row] * view[col * 4] +
                            proj[4 + row] * view[col * 4 + 1] +
                            proj[8 + row] * view[col * 4 + 2] +
                            proj[12 + row] * view[col * 4 + 3];
                }
            }
            for (let side = 0; side < 6; ++side) {
                const row = side >> 1;
                const sign = side & 1 ? -1 : 1;
                const a = clip[3] + sign * clip[row];
                const b = clip[7] + sign * clip[4 + row];
                const c = clip[11] + sign * clip[8 + row];
                const d = clip[15] + sign * clip[12 + row];
                const len = Math.sqrt(a * a + b * b + c * c) || 1;
                out[side * 4] = a / len;
                out[side * 4 + 1] = b / len;
                out[side * 4 + 2] = c / len;
                out[side * 4 + 3] = d / len;
            }
            return out;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam.prototype, "aspect", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam.prototype, "view", null);
    $.$bog_gamengine_cam = $bog_gamengine_cam;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    source: 'sampler2D',
                    texel: 'vec2',
                },
                pipe: {
                    pipe_uv: 'vec2',
                },
                output: { color: 'vec4' },
            };
        }
        vert() {
            return `
				void main() {
					vec2 corner = vec2( float( ( gl_VertexID << 1 ) & 2 ), float( gl_VertexID & 2 ) );
					pipe_uv = corner;
					gl_Position = vec4( corner * 2.0 - 1.0, 0.0, 1.0 );
				}
			`;
        }
        frag() {
            return `
				void main() {
					color = texture( source, pipe_uv );
				}
			`;
        }
        steps() {
            return [{ shader: this, scale: 1, from: 'in', extra: null }];
        }
    }
    $.$bog_gamengine_shader_post = $bog_gamengine_shader_post;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post_tone extends $bog_gamengine_shader_post {
        frag() {
            return `
				vec3 aces( vec3 hue ) {
					vec3 top = hue * ( 2.51 * hue + 0.03 );
					vec3 bottom = hue * ( 2.43 * hue + 0.59 ) + 0.14;
					return top / bottom;
				}
				void main() {
					vec4 base = texture( source, pipe_uv );
					vec3 mapped = clamp( aces( max( base.rgb, vec3( 0.0 ) ) ), 0.0, 1.0 );
					color = vec4( pow( mapped, vec3( 1.0 / 2.2 ) ), base.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_tone = $bog_gamengine_shader_post_tone;
})($ || ($ = {}));

;
	($.$bog_gamengine_draw) = class $bog_gamengine_draw extends ($.$mol_view) {
		width(){
			return 0;
		}
		height(){
			return 0;
		}
		dom_name(){
			return "canvas";
		}
		field(){
			return {
				...(super.field()), 
				"width": (this.width()), 
				"height": (this.height())
			};
		}
		dpr(){
			return 1;
		}
		scene(){
			const obj = new this.$.$bog_gamengine_scene();
			return obj;
		}
		cam(){
			const obj = new this.$.$bog_gamengine_cam();
			return obj;
		}
		light_dir(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		fog(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		fog_color(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		ambient(){
			return 0.35;
		}
		wireframe(next){
			if(next !== undefined) return next;
			return false;
		}
		shadows(next){
			if(next !== undefined) return next;
			return true;
		}
		shadow_size(next){
			if(next !== undefined) return next;
			return 2048;
		}
		shadow_range(next){
			if(next !== undefined) return next;
			return 20;
		}
		post(next){
			if(next !== undefined) return next;
			return true;
		}
		Tone(){
			const obj = new this.$.$bog_gamengine_shader_post_tone();
			return obj;
		}
		passes(){
			return [(this.Tone())];
		}
		stat(){
			return "";
		}
		report(){
			return {
				"tick": 0, 
				"fill": 0, 
				"shadow": 0, 
				"main": 0, 
				"post": 0, 
				"batches": 0, 
				"instances": 0, 
				"draws": 0, 
				"triangles": 0, 
				"bytes": 0
			};
		}
	};
	($mol_mem(($.$bog_gamengine_draw.prototype), "scene"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "cam"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "light_dir"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "clear"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "fog"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "fog_color"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "wireframe"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "shadows"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "shadow_size"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "shadow_range"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "post"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "Tone"));


;
"use strict";
var $;
(function ($) {
    const magic = 0x46546C67;
    const chunk_json = 0x4E4F534A;
    const chunk_bin = 0x004E4942;
    const dims = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
    const zero3 = [0, 0, 0];
    const one3 = [1, 1, 1];
    const unit4 = [0, 0, 0, 1];
    class $bog_gamengine_shape_gltf extends $bog_gamengine_shape {
        data(next) {
            return next ?? null;
        }
        chunks() {
            const data = this.data();
            if (!data)
                return $mol_fail(new Error('glTF has no data'));
            const view = new DataView(data);
            if (view.getUint32(0, true) !== magic)
                return $mol_fail(new Error('glTF is not a GLB container'));
            let json = null;
            let bin = null;
            let at = 12;
            while (at + 8 <= data.byteLength) {
                const length = view.getUint32(at, true);
                const type = view.getUint32(at + 4, true);
                const body = data.slice(at + 8, at + 8 + length);
                if (type === chunk_json)
                    json = JSON.parse(new TextDecoder().decode(body));
                if (type === chunk_bin)
                    bin = body;
                at += 8 + length;
            }
            if (!json)
                return $mol_fail(new Error('GLB has no JSON chunk'));
            return { json, bin };
        }
        json(next) {
            return next ?? this.chunks().json;
        }
        bin(next) {
            return next ?? this.chunks().bin ?? $mol_fail(new Error('GLB has no BIN chunk'));
        }
        accessor(index) {
            const doc = this.json();
            const accessor = doc.accessors?.[index] ?? $mol_fail(new Error(`glTF has no accessor ${index}`));
            const dim = dims[accessor.type] ?? $mol_fail(new Error(`glTF accessor type ${accessor.type} is not supported`));
            const out = new Float32Array(accessor.count * dim);
            if (accessor.bufferView === undefined)
                return out;
            const bview = doc.bufferViews?.[accessor.bufferView] ?? $mol_fail(new Error(`glTF has no bufferView ${accessor.bufferView}`));
            const view = new DataView(this.bin(), (bview.byteOffset ?? 0) + (accessor.byteOffset ?? 0));
            const unit = accessor.componentType === 5126 || accessor.componentType === 5125 ? 4 : accessor.componentType === 5123 ? 2 : 1;
            const stride = bview.byteStride ?? unit * dim;
            for (let i = 0; i < accessor.count; ++i) {
                for (let d = 0; d < dim; ++d) {
                    const at = i * stride + d * unit;
                    switch (accessor.componentType) {
                        case 5126:
                            out[i * dim + d] = view.getFloat32(at, true);
                            break;
                        case 5125:
                            out[i * dim + d] = view.getUint32(at, true);
                            break;
                        case 5123:
                            out[i * dim + d] = view.getUint16(at, true);
                            break;
                        case 5121:
                            out[i * dim + d] = view.getUint8(at);
                            break;
                        case 5122:
                            out[i * dim + d] = view.getInt16(at, true);
                            break;
                        case 5120:
                            out[i * dim + d] = view.getInt8(at);
                            break;
                        default: return $mol_fail(new Error(`glTF component type ${accessor.componentType} is not supported`));
                    }
                }
            }
            return out;
        }
        arrays() {
            const doc = this.json();
            const prim = doc.meshes?.[0]?.primitives?.[0] ?? $mol_fail(new Error('glTF has no mesh primitive'));
            const attrs = prim.attributes;
            if (attrs.POSITION === undefined)
                return $mol_fail(new Error('glTF primitive has no POSITION'));
            const pos = this.accessor(attrs.POSITION);
            const norm = attrs.NORMAL === undefined ? null : this.accessor(attrs.NORMAL);
            const tex = attrs.TEXCOORD_0 === undefined ? null : this.accessor(attrs.TEXCOORD_0);
            const bone = attrs.JOINTS_0 === undefined ? null : this.accessor(attrs.JOINTS_0);
            const load = attrs.WEIGHTS_0 === undefined ? null : this.accessor(attrs.WEIGHTS_0);
            const index = prim.indices === undefined ? null : this.accessor(prim.indices);
            const size = index ? index.length : pos.length / 3;
            const geometry = new Float32Array(size * 3);
            const normals = new Float32Array(size * 3);
            const skin = new Float32Array(size * 2);
            const joints = new Float32Array(bone ? size * 4 : 0);
            const weights = new Float32Array(load ? size * 4 : 0);
            for (let i = 0; i < size; ++i) {
                const v = index ? index[i] : i;
                for (let axis = 0; axis < 3; ++axis) {
                    geometry[i * 3 + axis] = pos[v * 3 + axis];
                    if (norm)
                        normals[i * 3 + axis] = norm[v * 3 + axis];
                }
                if (tex) {
                    skin[i * 2] = tex[v * 2];
                    skin[i * 2 + 1] = 1 - tex[v * 2 + 1];
                }
                for (let k = 0; k < 4; ++k) {
                    if (bone)
                        joints[i * 4 + k] = bone[v * 4 + k];
                    if (load)
                        weights[i * 4 + k] = load[v * 4 + k];
                }
            }
            if (!norm) {
                for (let t = 0; t + 2 < size; t += 3) {
                    const a = t * 3;
                    const b = a + 3;
                    const c = a + 6;
                    const ux = geometry[b] - geometry[a];
                    const uy = geometry[b + 1] - geometry[a + 1];
                    const uz = geometry[b + 2] - geometry[a + 2];
                    const vx = geometry[c] - geometry[a];
                    const vy = geometry[c + 1] - geometry[a + 1];
                    const vz = geometry[c + 2] - geometry[a + 2];
                    let nx = uy * vz - uz * vy;
                    let ny = uz * vx - ux * vz;
                    let nz = ux * vy - uy * vx;
                    const len = Math.hypot(nx, ny, nz) || 1;
                    nx /= len;
                    ny /= len;
                    nz /= len;
                    for (let k = 0; k < 3; ++k) {
                        normals[a + k * 3] = nx;
                        normals[a + k * 3 + 1] = ny;
                        normals[a + k * 3 + 2] = nz;
                    }
                }
            }
            return { geometry, normals, skin, joints, weights };
        }
        geometry() {
            return this.arrays().geometry;
        }
        normals() {
            return this.arrays().normals;
        }
        skin() {
            return this.arrays().skin;
        }
        joints() {
            return this.arrays().joints;
        }
        weights() {
            return this.arrays().weights;
        }
        skeleton() {
            const doc = this.json();
            const skin = doc.skins?.[0];
            if (!skin)
                return null;
            const nodes = doc.nodes ?? [];
            const count = skin.joints.length;
            const at_joint = new Map();
            for (let i = 0; i < count; ++i)
                at_joint.set(skin.joints[i], i);
            const parents = new Int32Array(count).fill(-1);
            for (let i = 0; i < nodes.length; ++i) {
                const kids = nodes[i].children;
                if (!kids)
                    continue;
                for (let k = 0; k < kids.length; ++k) {
                    const kid = at_joint.get(kids[k]);
                    if (kid === undefined)
                        continue;
                    parents[kid] = at_joint.get(i) ?? -1;
                }
            }
            const names = [];
            const base = new Float32Array(count * 10);
            for (let i = 0; i < count; ++i) {
                const node = nodes[skin.joints[i]] ?? {};
                names.push(node.name ?? `joint${i}`);
                const move = node.translation ?? zero3;
                const turn = node.rotation ?? unit4;
                const size = node.scale ?? one3;
                for (let k = 0; k < 3; ++k)
                    base[i * 10 + k] = move[k];
                for (let k = 0; k < 4; ++k)
                    base[i * 10 + 3 + k] = turn[k];
                for (let k = 0; k < 3; ++k)
                    base[i * 10 + 7 + k] = size[k];
            }
            const binds = new Float32Array(count * 16);
            if (skin.inverseBindMatrices === undefined) {
                for (let i = 0; i < count; ++i)
                    for (let k = 0; k < 4; ++k)
                        binds[i * 16 + k * 5] = 1;
            }
            else {
                const source = this.accessor(skin.inverseBindMatrices);
                for (let k = 0; k < binds.length && k < source.length; ++k)
                    binds[k] = source[k];
            }
            const order = new Int32Array(count);
            const ready = new Uint8Array(count);
            let done = 0;
            while (done < count) {
                const was = done;
                for (let i = 0; i < count; ++i) {
                    if (ready[i])
                        continue;
                    const parent = parents[i];
                    if (parent >= 0 && !ready[parent])
                        continue;
                    ready[i] = 1;
                    order[done++] = i;
                }
                if (done === was)
                    return $mol_fail(new Error('glTF skeleton has a cycle'));
            }
            return { count, names, parents, order, base, binds };
        }
        clips() {
            const doc = this.json();
            const clips = new Map();
            const skin = doc.skins?.[0];
            if (!skin)
                return clips;
            const at_joint = new Map();
            for (let i = 0; i < skin.joints.length; ++i)
                at_joint.set(skin.joints[i], i);
            const anims = doc.animations ?? [];
            for (let a = 0; a < anims.length; ++a) {
                const anim = anims[a];
                const channels = [];
                let duration = 0;
                for (let c = 0; c < anim.channels.length; ++c) {
                    const target = anim.channels[c].target;
                    if (target.path !== 'translation' && target.path !== 'rotation' && target.path !== 'scale')
                        continue;
                    const joint = target.node === undefined ? undefined : at_joint.get(target.node);
                    if (joint === undefined)
                        continue;
                    const sampler = anim.samplers[anim.channels[c].sampler]
                        ?? $mol_fail(new Error(`glTF animation has no sampler ${anim.channels[c].sampler}`));
                    const interp = sampler.interpolation ?? 'LINEAR';
                    if (interp !== 'LINEAR' && interp !== 'STEP') {
                        return $mol_fail(new Error(`glTF animation interpolation ${interp} is not supported`));
                    }
                    const times = this.accessor(sampler.input);
                    const values = this.accessor(sampler.output);
                    if (times.length)
                        duration = Math.max(duration, times[times.length - 1]);
                    channels.push({ joint, path: target.path, step: interp === 'STEP', times, values });
                }
                const name = anim.name ?? `clip${a}`;
                clips.set(name, { name, duration, channels });
            }
            return clips;
        }
        mode() {
            return 'triangles';
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "chunks", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "json", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "bin", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "arrays", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "skeleton", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_gltf.prototype, "clips", null);
    $.$bog_gamengine_shape_gltf = $bog_gamengine_shape_gltf;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$bog_gamengine_skin_max = 64;
    $.$bog_gamengine_skin_empty = new Float32Array(0);
    function $bog_gamengine_skin_mat_trs(out, at, trs, from) {
        const x = trs[from + 3];
        const y = trs[from + 4];
        const z = trs[from + 5];
        const w = trs[from + 6];
        const sx = trs[from + 7];
        const sy = trs[from + 8];
        const sz = trs[from + 9];
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const xy = x * y;
        const xz = x * z;
        const yz = y * z;
        const wx = w * x;
        const wy = w * y;
        const wz = w * z;
        out[at] = (1 - 2 * (yy + zz)) * sx;
        out[at + 1] = 2 * (xy + wz) * sx;
        out[at + 2] = 2 * (xz - wy) * sx;
        out[at + 3] = 0;
        out[at + 4] = 2 * (xy - wz) * sy;
        out[at + 5] = (1 - 2 * (xx + zz)) * sy;
        out[at + 6] = 2 * (yz + wx) * sy;
        out[at + 7] = 0;
        out[at + 8] = 2 * (xz + wy) * sz;
        out[at + 9] = 2 * (yz - wx) * sz;
        out[at + 10] = (1 - 2 * (xx + yy)) * sz;
        out[at + 11] = 0;
        out[at + 12] = trs[from];
        out[at + 13] = trs[from + 1];
        out[at + 14] = trs[from + 2];
        out[at + 15] = 1;
        return out;
    }
    $.$bog_gamengine_skin_mat_trs = $bog_gamengine_skin_mat_trs;
    function $bog_gamengine_skin_mat_mul(out, at, left, left_at, right, right_at) {
        for (let col = 0; col < 4; ++col) {
            const b0 = right[right_at + col * 4];
            const b1 = right[right_at + col * 4 + 1];
            const b2 = right[right_at + col * 4 + 2];
            const b3 = right[right_at + col * 4 + 3];
            for (let row = 0; row < 4; ++row) {
                out[at + col * 4 + row] =
                    left[left_at + row] * b0
                        + left[left_at + 4 + row] * b1
                        + left[left_at + 8 + row] * b2
                        + left[left_at + 12 + row] * b3;
            }
        }
        return out;
    }
    $.$bog_gamengine_skin_mat_mul = $bog_gamengine_skin_mat_mul;
    function $bog_gamengine_skin_quat_mix(out, at, left, left_at, right, right_at, weight) {
        const ax = left[left_at];
        const ay = left[left_at + 1];
        const az = left[left_at + 2];
        const aw = left[left_at + 3];
        let bx = right[right_at];
        let by = right[right_at + 1];
        let bz = right[right_at + 2];
        let bw = right[right_at + 3];
        let dot = ax * bx + ay * by + az * bz + aw * bw;
        if (dot < 0) {
            dot = -dot;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        let ka = 1 - weight;
        let kb = weight;
        if (dot < 0.9995) {
            const angle = Math.acos(dot > 1 ? 1 : dot);
            const sin = Math.sin(angle);
            ka = Math.sin(ka * angle) / sin;
            kb = Math.sin(kb * angle) / sin;
        }
        const x = ax * ka + bx * kb;
        const y = ay * ka + by * kb;
        const z = az * ka + bz * kb;
        const w = aw * ka + bw * kb;
        const len = Math.sqrt(x * x + y * y + z * z + w * w) || 1;
        out[at] = x / len;
        out[at + 1] = y / len;
        out[at + 2] = z / len;
        out[at + 3] = w / len;
        return out;
    }
    $.$bog_gamengine_skin_quat_mix = $bog_gamengine_skin_quat_mix;
    function $bog_gamengine_skin_sample(channel, time, out, at) {
        const times = channel.times;
        const values = channel.values;
        const size = times.length;
        if (!size)
            return out;
        const shift = channel.path === 'translation' ? 0 : channel.path === 'rotation' ? 3 : 7;
        const dim = channel.path === 'rotation' ? 4 : 3;
        let from = 0;
        while (from < size - 1 && times[from + 1] <= time)
            ++from;
        const to = from + 1 < size ? from + 1 : from;
        const span = times[to] - times[from];
        let part = span > 0 ? (time - times[from]) / span : 0;
        if (part < 0)
            part = 0;
        if (part > 1)
            part = 1;
        if (channel.step)
            part = 0;
        if (dim === 4) {
            $bog_gamengine_skin_quat_mix(out, at + shift, values, from * 4, values, to * 4, part);
        }
        else {
            for (let k = 0; k < 3; ++k) {
                out[at + shift + k] = values[from * 3 + k] * (1 - part) + values[to * 3 + k] * part;
            }
        }
        return out;
    }
    $.$bog_gamengine_skin_sample = $bog_gamengine_skin_sample;
    function $bog_gamengine_skin_bones(batch) {
        const nodes = batch.nodes();
        if (nodes.length !== 1)
            return null;
        const node = nodes[0];
        const skin = typeof node.skin === 'function' ? node.skin() : null;
        return skin ? skin.pose() : null;
    }
    $.$bog_gamengine_skin_bones = $bog_gamengine_skin_bones;
    function $bog_gamengine_skin_shape_joints(shape) {
        const probe = shape;
        return typeof probe.joints === 'function' ? probe.joints() : $.$bog_gamengine_skin_empty;
    }
    $.$bog_gamengine_skin_shape_joints = $bog_gamengine_skin_shape_joints;
    function $bog_gamengine_skin_shape_weights(shape) {
        const probe = shape;
        return typeof probe.weights === 'function' ? probe.weights() : $.$bog_gamengine_skin_empty;
    }
    $.$bog_gamengine_skin_shape_weights = $bog_gamengine_skin_shape_weights;
    class $bog_gamengine_skin extends $mol_object2 {
        shape(next) {
            return next ?? null;
        }
        clip(next) {
            return next ?? '';
        }
        mix(next) {
            return next ?? '';
        }
        weight(next) {
            return next ?? 0;
        }
        time(next) {
            return next ?? 0;
        }
        loop(next) {
            return next ?? true;
        }
        speed(next) {
            return next ?? 1;
        }
        blend(clip, weight) {
            this.mix(clip);
            this.weight(weight);
            return weight;
        }
        duration() {
            return this.shape()?.clips().get(this.clip())?.duration ?? 0;
        }
        version = 0;
        bones = $.$bog_gamengine_skin_empty;
        locals = $.$bog_gamengine_skin_empty;
        worlds = $.$bog_gamengine_skin_empty;
        trs_main = $.$bog_gamengine_skin_empty;
        trs_mix = $.$bog_gamengine_skin_empty;
        done_skeleton = null;
        done_time = NaN;
        done_clip = '';
        done_mix = '';
        done_weight = NaN;
        prepare() {
            if (this.bones.length)
                return this.bones;
            const max = $.$bog_gamengine_skin_max;
            this.bones = new Float32Array(max * 16);
            for (let i = 0; i < max; ++i)
                for (let k = 0; k < 4; ++k)
                    this.bones[i * 16 + k * 5] = 1;
            this.locals = new Float32Array(max * 16);
            this.worlds = new Float32Array(max * 16);
            this.trs_main = new Float32Array(max * 10);
            this.trs_mix = new Float32Array(max * 10);
            return this.bones;
        }
        apply(clip, time, trs, count, base) {
            for (let k = 0; k < count * 10; ++k)
                trs[k] = base[k];
            if (!clip)
                return trs;
            const channels = clip.channels;
            for (let c = 0; c < channels.length; ++c) {
                const channel = channels[c];
                if (channel.joint >= count)
                    continue;
                $bog_gamengine_skin_sample(channel, time, trs, channel.joint * 10);
            }
            return trs;
        }
        pose() {
            const shape = this.shape();
            const skeleton = shape?.skeleton() ?? null;
            this.prepare();
            if (!skeleton)
                return this.bones;
            if (skeleton.count > $.$bog_gamengine_skin_max) {
                return $mol_fail(new Error(`Skeleton has more than ${$.$bog_gamengine_skin_max} joints`));
            }
            const time = this.time();
            const clip = this.clip();
            const mix = this.mix();
            const weight = this.weight();
            if (this.done_skeleton === skeleton
                && this.done_time === time
                && this.done_clip === clip
                && this.done_mix === mix
                && this.done_weight === weight)
                return this.bones;
            const clips = shape.clips();
            const count = skeleton.count;
            const trs = this.trs_main;
            this.apply(clips.get(clip), time, trs, count, skeleton.base);
            if (mix && weight > 0) {
                const other = this.trs_mix;
                this.apply(clips.get(mix), time, other, count, skeleton.base);
                for (let i = 0; i < count; ++i) {
                    const at = i * 10;
                    for (let k = 0; k < 3; ++k) {
                        trs[at + k] = trs[at + k] * (1 - weight) + other[at + k] * weight;
                        trs[at + 7 + k] = trs[at + 7 + k] * (1 - weight) + other[at + 7 + k] * weight;
                    }
                    $bog_gamengine_skin_quat_mix(trs, at + 3, trs, at + 3, other, at + 3, weight);
                }
            }
            for (let o = 0; o < count; ++o) {
                const i = skeleton.order[o];
                $bog_gamengine_skin_mat_trs(this.locals, i * 16, trs, i * 10);
                const parent = skeleton.parents[i];
                if (parent < 0) {
                    for (let k = 0; k < 16; ++k)
                        this.worlds[i * 16 + k] = this.locals[i * 16 + k];
                }
                else {
                    $bog_gamengine_skin_mat_mul(this.worlds, i * 16, this.worlds, parent * 16, this.locals, i * 16);
                }
                $bog_gamengine_skin_mat_mul(this.bones, i * 16, this.worlds, i * 16, skeleton.binds, i * 16);
            }
            this.done_skeleton = skeleton;
            this.done_time = time;
            this.done_clip = clip;
            this.done_mix = mix;
            this.done_weight = weight;
            ++this.version;
            return this.bones;
        }
        step(dt) {
            const speed = this.speed();
            const duration = this.duration();
            if (!speed || !duration)
                return;
            let time = this.time() + dt * speed;
            if (this.loop()) {
                time = time % duration;
                if (time < 0)
                    time += duration;
            }
            else {
                if (time > duration)
                    time = duration;
                if (time < 0)
                    time = 0;
            }
            this.time(time);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "clip", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "mix", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "weight", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "time", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "loop", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_skin.prototype, "duration", null);
    $.$bog_gamengine_skin = $bog_gamengine_skin;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_skin_gl_data extends Object {
        gl;
        width;
        height;
        native;
        constructor(gl, width, height) {
            super();
            this.gl = gl;
            this.width = width;
            this.height = height;
            this.native = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.native);
            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F, width, height);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        send(floats) {
            const gl = this.gl;
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.bindTexture(gl.TEXTURE_2D, this.native);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, floats);
            return floats;
        }
        dispose() {
            this.gl.deleteTexture(this.native);
            return this;
        }
    }
    $.$bog_gamengine_skin_gl_data = $bog_gamengine_skin_gl_data;
    function $bog_gamengine_skin_gl_bones(gl) {
        return new $bog_gamengine_skin_gl_data(gl, 4, $bog_gamengine_skin_max);
    }
    $.$bog_gamengine_skin_gl_bones = $bog_gamengine_skin_gl_bones;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_depth extends $bog_gamengine_shader {
        face() {
            return {
                glob: {
                    shadow_mat: 'mat4',
                },
                input: {
                    vertex: 'vec3',
                    uv: 'vec2',
                    normal: 'vec3',
                    inst_trans: 'mat4',
                    inst_tint: 'vec4',
                    inst_layer: 'float',
                    inst_uv: 'vec4',
                    inst_material: 'vec4',
                    inst_normal_layer: 'float',
                },
            };
        }
        vert() {
            return `
				void main() {
					gl_Position = shadow_mat * inst_trans * vec4( vertex, 1.0 );
				}
			`;
        }
        frag() {
            return `
				void main() {}
			`;
        }
    }
    $.$bog_gamengine_shader_depth = $bog_gamengine_shader_depth;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_draw_slot extends Object {
            batch = null;
            program = null;
            proj = null;
            view = null;
            light_count = null;
            light_pos = null;
            light_dir = null;
            light_color = null;
            ambient = null;
            cam_pos = null;
            fog = null;
            fog_color = null;
            wireframe = null;
            shadow_mat = null;
            shadow_map = null;
            shadow_light = null;
            bones = null;
            bones_tex = null;
            depth = false;
            ready = false;
            vao = null;
            vertex = null;
            live = false;
            trans = null;
            tint = null;
            layer = null;
            uv = null;
            material = null;
            normal_layer = null;
            buffers = [];
            atlas = null;
            sampler = null;
            tex = null;
            sampler_data = null;
            tex_data = null;
            prim = 0;
            wire = null;
            size = 0;
            cap = 0;
            tris = 0;
            stride = 0;
            bytes_shape = 0;
            bytes = 0;
            dispose(gl) {
                for (let i = 0; i < this.buffers.length; ++i)
                    gl.deleteBuffer(this.buffers[i].native);
                this.buffers = [];
                gl.deleteVertexArray(this.vao);
                this.bones_tex?.dispose();
                this.bones_tex = null;
                return this;
            }
        }
        $$.$bog_gamengine_draw_slot = $bog_gamengine_draw_slot;
        class $bog_gamengine_draw_tex extends Object {
            atlas = null;
            native = null;
            dispose(gl) {
                if (this.native)
                    gl.deleteTexture(this.native);
                this.native = null;
                return this;
            }
        }
        $$.$bog_gamengine_draw_tex = $bog_gamengine_draw_tex;
        const stat_window = 30;
        const light_max = 8;
        function $bog_gamengine_draw_shadow_mat(dir, at, center, range, out) {
            let dx = dir[at];
            let dy = dir[at + 1];
            let dz = dir[at + 2];
            const len = Math.hypot(dx, dy, dz) || 1;
            dx /= len;
            dy /= len;
            dz /= len;
            const flat = Math.abs(dy) > 0.99;
            const ax = 0;
            const ay = flat ? 0 : 1;
            const az = flat ? 1 : 0;
            let rx = ay * dz - az * dy;
            let ry = az * dx - ax * dz;
            let rz = ax * dy - ay * dx;
            const rl = Math.hypot(rx, ry, rz) || 1;
            rx /= rl;
            ry /= rl;
            rz /= rl;
            const ux = dy * rz - dz * ry;
            const uy = dz * rx - dx * rz;
            const uz = dx * ry - dy * rx;
            const cx = center[0];
            const cy = center[1];
            const cz = center[2];
            out[0] = rx / range;
            out[1] = ux / range;
            out[2] = dx / range;
            out[3] = 0;
            out[4] = ry / range;
            out[5] = uy / range;
            out[6] = dy / range;
            out[7] = 0;
            out[8] = rz / range;
            out[9] = uz / range;
            out[10] = dz / range;
            out[11] = 0;
            out[12] = -(rx * cx + ry * cy + rz * cz) / range;
            out[13] = -(ux * cx + uy * cy + uz * cz) / range;
            out[14] = -(dx * cx + dy * cy + dz * cz) / range;
            out[15] = 1;
            return out;
        }
        $$.$bog_gamengine_draw_shadow_mat = $bog_gamengine_draw_shadow_mat;
        class $bog_gamengine_draw extends $.$bog_gamengine_draw {
            slots_all = new WeakMap();
            slots_last = [];
            textures_all = new WeakMap();
            textures_last = [];
            ambient_vec = new Float32Array(3);
            cam_pos_vec = new Float32Array(3);
            fog_vec = new Float32Array(2);
            fog_color_vec = new Float32Array(3);
            lights_pos = new Float32Array(light_max * 4);
            lights_dir = new Float32Array(light_max * 4);
            lights_color = new Float32Array(light_max * 4);
            lights_count = 0;
            wire_off = new Float32Array(1);
            wire_on = new Float32Array([1]);
            shadow_mat_buf = new Float32Array(16);
            shadow_last = null;
            sun_at = -1;
            shadow_at = -1;
            gaps = new Float32Array(stat_window);
            ticks = new Float32Array(stat_window);
            steps_ms = new Float32Array(stat_window);
            fills_ms = new Float32Array(stat_window);
            shadows_ms = new Float32Array(stat_window);
            mains_ms = new Float32Array(stat_window);
            posts_ms = new Float32Array(stat_window);
            batches_ring = new Float32Array(stat_window);
            instances_ring = new Float32Array(stat_window);
            draws_ring = new Float32Array(stat_window);
            triangles_ring = new Float32Array(stat_window);
            bytes_ring = new Float32Array(stat_window);
            count_batches = 0;
            count_instances = 0;
            count_draws = 0;
            count_triangles = 0;
            count_bytes = 0;
            texel_vec = new Float32Array(2);
            post_last = new Map();
            blank_data_last = null;
            post_vao_last = null;
            samples = 0;
            paint_at = 0;
            context() {
                const canvas = this.dom_node();
                return canvas.getContext('webgl2', { preserveDrawingBuffer: true });
            }
            dpr() {
                return this.$.$mol_dom_context.devicePixelRatio;
            }
            width() {
                return Math.ceil((this.view_rect()?.width ?? 0) * this.dpr());
            }
            height() {
                return Math.ceil((this.view_rect()?.height ?? 0) * this.dpr());
            }
            viewport() {
                const viewport = [0, 0, this.width(), this.height()];
                this.context().viewport(...viewport);
                return viewport;
            }
            scissor() {
                const scissor = this.viewport();
                const gl = this.context();
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(...scissor);
                return scissor;
            }
            render() {
                super.render();
                this.viewport();
                this.scissor();
                this.paint();
            }
            light_dir(next) {
                return next ?? new Float32Array([0.4, 1, 0.6]);
            }
            clear(next) {
                return next ? $bog_gamengine_node_vec(next) : new Float32Array([0.004, 0.004, 0.007, 1]);
            }
            fog(next) {
                return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0]);
            }
            fog_color(next) {
                if (next)
                    return $bog_gamengine_node_vec(next);
                const clear = this.clear();
                return new Float32Array([clear[0], clear[1], clear[2]]);
            }
            proj() {
                const aspect = this.width() / this.height();
                return this.cam().proj(Number.isFinite(aspect) && aspect > 0 ? aspect : 1);
            }
            slots() {
                const batches = this.scene().batches();
                const slots = [];
                for (let i = 0; i < batches.length; ++i) {
                    const slot = this.slot(batches[i]);
                    if (slot)
                        slots.push(slot);
                }
                const last = this.slots_last;
                for (let i = 0; i < last.length; ++i) {
                    if (slots.includes(last[i]))
                        continue;
                    this.slot_drop(last[i]);
                }
                this.slots_last = slots;
                return slots;
            }
            slot_drop(slot) {
                this.slots_all.delete(slot.batch);
                return slot.dispose(this.context());
            }
            tex_drop(tex) {
                this.textures_all.delete(tex.atlas);
                return tex.dispose(this.context());
            }
            shadow_shader() {
                return new $bog_gamengine_shader_depth;
            }
            shadow_target() {
                const gl = this.context();
                const size = this.shadow_size();
                this.shadow_last?.dispose();
                this.shadow_last = null;
                const target = new $bog_gamengine_gl_depth_target(gl, size);
                this.shadow_last = target;
                return target;
            }
            post_plan() {
                const plan = [];
                if (!this.post())
                    return plan;
                const passes = this.passes();
                const turn = new Map();
                let input = 'scene';
                let prev = 'scene';
                for (let p = 0; p < passes.length; ++p) {
                    const steps = passes[p].steps();
                    for (let s = 0; s < steps.length; ++s) {
                        const step = steps[s];
                        const from = step.from === 'in' ? input : prev;
                        const extra = step.extra === null ? null : step.extra === 'in' ? input : prev;
                        const last = p === passes.length - 1 && s === steps.length - 1;
                        let out = null;
                        if (!last) {
                            let index = turn.get(step.scale) ?? 0;
                            let key = `${step.scale}_${index}`;
                            if (key === from || key === extra) {
                                index = index ? 0 : 1;
                                key = `${step.scale}_${index}`;
                            }
                            turn.set(step.scale, index ? 0 : 1);
                            out = key;
                        }
                        plan.push({ shader: step.shader, from, extra, out });
                        prev = out ?? 'screen';
                    }
                    input = prev;
                }
                return plan;
            }
            post_targets() {
                const plan = this.post_plan();
                const width = this.width();
                const height = this.height();
                const keys = [];
                if (plan.length)
                    keys.push('scene');
                for (let i = 0; i < plan.length; ++i) {
                    const out = plan[i].out;
                    if (out && !keys.includes(out))
                        keys.push(out);
                }
                const gl = keys.length ? this.context() : null;
                for (let i = 0; i < keys.length; ++i) {
                    const key = keys[i];
                    const at = key.indexOf('_');
                    const scale = at < 0 ? 1 : Number(key.slice(0, at));
                    const wide = Math.max(Math.round(width / scale), 1);
                    const high = Math.max(Math.round(height / scale), 1);
                    const found = this.post_last.get(key);
                    if (found)
                        found.resize(wide, high);
                    else
                        this.post_last.set(key, new $bog_gamengine_gl_color_target(gl, wide, high));
                }
                for (const key of [...this.post_last.keys()]) {
                    if (keys.includes(key))
                        continue;
                    this.post_last.get(key).dispose();
                    this.post_last.delete(key);
                }
                return keys;
            }
            post_vao() {
                const vao = this.context().createVertexArray();
                this.post_vao_last = vao;
                return vao;
            }
            post_drop() {
                for (const target of this.post_last.values())
                    target.dispose();
                this.post_last.clear();
                if (this.post_vao_last)
                    this.context().deleteVertexArray(this.post_vao_last);
                this.post_vao_last = null;
                return this;
            }
            destructor() {
                this.post_drop();
                if (this.blank_data_last)
                    this.context().deleteTexture(this.blank_data_last);
                this.blank_data_last = null;
                this.shadow_last?.dispose();
                this.shadow_last = null;
                const slots = this.slots_last;
                for (let i = 0; i < slots.length; ++i)
                    this.slot_drop(slots[i]);
                this.slots_last = [];
                const textures = this.textures_last;
                for (let i = 0; i < textures.length; ++i)
                    this.tex_drop(textures[i]);
                this.textures_last = [];
                super.destructor();
            }
            slot(batch) {
                const found = this.slots_all.get(batch);
                if (found)
                    return found;
                const gl = this.context();
                const shader = batch.shader();
                const program = shader.program(gl);
                const globs = shader.face().glob ?? {};
                const shape = batch.shape();
                if (!this.shape_ready(shape))
                    return null;
                const atlas = batch.atlas();
                const cap = Math.max(batch.cap, 16);
                const mode = shape.mode();
                const depth = shader.depth();
                const wireframe = 'wireframe' in globs ? program.uniform('wireframe') : null;
                const glob = (name) => name in globs ? program.uniform(name) : null;
                const slot = Object.assign(new $bog_gamengine_draw_slot, {
                    batch,
                    program,
                    proj: program.uniform('proj'),
                    view: program.uniform('view'),
                    light_count: glob('light_count'),
                    light_pos: glob('light_pos'),
                    light_dir: glob('light_dir'),
                    light_color: glob('light_color'),
                    ambient: glob('ambient'),
                    cam_pos: glob('cam_pos'),
                    fog: glob('fog'),
                    fog_color: glob('fog_color'),
                    wireframe,
                    shadow_mat: glob('shadow_mat'),
                    shadow_map: glob('shadow_map'),
                    shadow_light: glob('shadow_light'),
                    bones: glob('bones'),
                    depth,
                    vao: gl.createVertexArray(),
                    live: mode === 'lines',
                    atlas,
                    sampler: atlas ? program.uniform('atlas') : null,
                    tex: atlas ? this.tex(atlas) : null,
                    sampler_data: glob('atlas_data'),
                    tex_data: atlas?.data() ? this.tex(atlas.data()) : null,
                    prim: mode === 'lines' ? gl.LINES : mode === 'triangles' ? gl.TRIANGLES : gl.TRIANGLE_STRIP,
                    wire: depth && wireframe && mode !== 'lines' ? (mode === 'triangles' ? gl.LINES : gl.LINE_STRIP) : null,
                    size: shape.size(),
                    cap,
                });
                const buffer = (location, size, divisor) => {
                    if (location === null)
                        return null;
                    const buffer = new $bog_gamengine_gl_buffer(gl, location, size, divisor);
                    slot.buffers.push(buffer);
                    return buffer;
                };
                gl.bindVertexArray(slot.vao);
                slot.vertex = buffer(program.attribute('vertex'), 3, 0);
                slot.vertex.send(shape.geometry());
                buffer(program.attribute('uv'), 2, 0)?.send(shape.skin());
                buffer(program.attribute('normal'), 3, 0)?.send(shape.normals());
                slot.trans = buffer(program.attribute('inst_trans'), 16, 1);
                slot.trans.reserve(cap * 64);
                slot.tint = buffer(program.attribute('inst_tint'), 4, 1);
                slot.tint.reserve(cap * 16);
                slot.layer = buffer(program.attribute('inst_layer'), 1, 1);
                slot.layer?.reserve(cap * 4);
                slot.uv = buffer(program.attribute('inst_uv'), 4, 1);
                slot.uv?.reserve(cap * 16);
                slot.material = buffer(program.attribute('inst_material'), 4, 1);
                slot.material?.reserve(cap * 16);
                slot.normal_layer = buffer(program.attribute('inst_normal_layer'), 1, 1);
                slot.normal_layer?.reserve(cap * 4);
                let bytes_skin = 0;
                if (slot.bones) {
                    const joints = $bog_gamengine_skin_shape_joints(shape);
                    const weights = $bog_gamengine_skin_shape_weights(shape);
                    buffer(program.attribute('joints'), 4, 0)?.send(joints);
                    buffer(program.attribute('weights'), 4, 0)?.send(weights);
                    bytes_skin = joints.byteLength + weights.byteLength;
                    slot.bones_tex = $bog_gamengine_skin_gl_bones(gl);
                }
                gl.bindVertexArray(null);
                slot.tris = mode === 'lines' ? 0 : mode === 'triangles' ? slot.size / 3 : Math.max(slot.size - 2, 0);
                slot.stride = 80
                    + (slot.layer ? 4 : 0)
                    + (slot.uv ? 16 : 0)
                    + (slot.material ? 16 : 0)
                    + (slot.normal_layer ? 4 : 0);
                slot.bytes_shape = shape.geometry().byteLength + bytes_skin;
                slot.bytes = slot.stride * cap + slot.bytes_shape;
                this.slots_all.set(batch, slot);
                return slot;
            }
            shape_ready(shape) {
                try {
                    shape.geometry();
                    return true;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return false;
                    return $mol_fail_hidden(error);
                }
            }
            tex(atlas) {
                const found = this.textures_all.get(atlas);
                if (found)
                    return found;
                const tex = new $bog_gamengine_draw_tex;
                tex.atlas = atlas;
                this.textures_all.set(atlas, tex);
                return tex;
            }
            tex_fill(gl, textures, tex) {
                if (!tex || textures.includes(tex))
                    return tex;
                textures.push(tex);
                const atlas = tex.atlas;
                if (tex.native || !atlas.ready())
                    return tex;
                tex.native = $bog_gamengine_gl_texture_array(gl, atlas.images(), atlas.size(), atlas.kind() === 'color');
                return tex;
            }
            blank_data() {
                const texture = $bog_gamengine_gl_texture_array_flat(this.context());
                this.blank_data_last = texture;
                return texture;
            }
            textures() {
                const gl = this.context();
                const slots = this.slots();
                const textures = [];
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    this.tex_fill(gl, textures, slot.tex);
                    this.tex_fill(gl, textures, slot.tex_data);
                }
                const last = this.textures_last;
                for (let i = 0; i < last.length; ++i) {
                    if (textures.includes(last[i]))
                        continue;
                    this.tex_drop(last[i]);
                }
                this.textures_last = textures;
                return textures;
            }
            lights_fill() {
                const lights = this.scene().lights();
                const pos = this.lights_pos;
                const dir = this.lights_dir;
                const color = this.lights_color;
                if (!lights.length) {
                    const sun = this.light_dir();
                    const len = Math.hypot(sun[0], sun[1], sun[2]) || 1;
                    pos[0] = 0;
                    pos[1] = 0;
                    pos[2] = 0;
                    pos[3] = 0;
                    dir[0] = -sun[0] / len;
                    dir[1] = -sun[1] / len;
                    dir[2] = -sun[2] / len;
                    dir[3] = -1;
                    color[0] = 1;
                    color[1] = 1;
                    color[2] = 1;
                    color[3] = 0;
                    this.lights_count = 1;
                    this.sun_at = 0;
                    return 1;
                }
                const count = Math.min(lights.length, light_max);
                this.sun_at = -1;
                for (let i = 0; i < count; ++i) {
                    const light = lights[i];
                    const kind = light.kind();
                    const world = light.world();
                    const tone = light.color();
                    const power = light.power();
                    const at = i * 4;
                    pos[at] = world[12];
                    pos[at + 1] = world[13];
                    pos[at + 2] = world[14];
                    pos[at + 3] = kind === 'sun' ? 0 : 1;
                    if (kind === 'sun' && this.sun_at < 0)
                        this.sun_at = i;
                    $bog_gamengine_light_dir(world, dir, at);
                    dir[at + 3] = kind === 'spot' ? Math.cos(light.angle()) : -1;
                    color[at] = tone[0] * power;
                    color[at + 1] = tone[1] * power;
                    color[at + 2] = tone[2] * power;
                    color[at + 3] = light.range();
                }
                this.lights_count = count;
                return count;
            }
            step() {
                try {
                    return this.scene().step();
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return -1;
                    return $mol_fail_hidden(error);
                }
            }
            paint() {
                const at_start = performance.now();
                this.scene().aspect(this.width() / this.height() || 1);
                this.step();
                const at_step = performance.now();
                const gl = this.context();
                const slots = this.slots();
                this.textures();
                const plan = this.post_plan();
                if (plan.length)
                    this.post_targets();
                const proj = this.proj();
                const view = this.cam().view();
                const wireframe = this.wireframe();
                const ambient = this.ambient();
                this.ambient_vec[0] = ambient;
                this.ambient_vec[1] = ambient;
                this.ambient_vec[2] = ambient;
                const fog = this.fog();
                this.fog_vec[0] = fog[0];
                this.fog_vec[1] = fog[1];
                const fog_color = this.fog_color();
                this.fog_color_vec[0] = fog_color[0];
                this.fog_color_vec[1] = fog_color[1];
                this.fog_color_vec[2] = fog_color[2];
                const cam_world = this.cam().world();
                this.cam_pos_vec[0] = cam_world[12];
                this.cam_pos_vec[1] = cam_world[13];
                this.cam_pos_vec[2] = cam_world[14];
                this.lights_fill();
                this.count_draws = 0;
                const at_prep = performance.now();
                for (let i = 0; i < slots.length; ++i)
                    slots[i].ready = this.slot_send(gl, slots[i]);
                const at_fill = performance.now();
                this.shadow_pass(gl, slots);
                const at_shadow = performance.now();
                const target = plan.length ? this.post_last.get('scene') : null;
                const wide = target ? target.width : this.width();
                const high = target ? target.height : this.height();
                gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.native : null);
                gl.viewport(0, 0, wide, high);
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(0, 0, wide, high);
                gl.cullFace(gl.BACK);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                const clear = this.clear();
                gl.clearColor(clear[0], clear[1], clear[2], clear[3]);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                for (let i = 0; i < slots.length; ++i) {
                    if (slots[i].ready)
                        this.paint_slot(gl, slots[i], proj, view, wireframe);
                }
                const at_main = performance.now();
                this.post_run(gl, plan);
                const at_post = performance.now();
                gl.bindVertexArray(null);
                gl.useProgram(null);
                this.count_fill(slots);
                this.measure(at_start, at_step, at_prep, at_fill, at_shadow, at_main, at_post);
            }
            post_run(gl, plan) {
                if (!plan.length)
                    return 0;
                gl.disable(gl.DEPTH_TEST);
                gl.disable(gl.CULL_FACE);
                gl.disable(gl.BLEND);
                gl.disable(gl.SCISSOR_TEST);
                gl.bindVertexArray(this.post_vao());
                for (let i = 0; i < plan.length; ++i) {
                    const step = plan[i];
                    const from = this.post_last.get(step.from);
                    const out = step.out ? this.post_last.get(step.out) : null;
                    const program = step.shader.program(gl);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, out ? out.native : null);
                    gl.viewport(0, 0, out ? out.width : this.width(), out ? out.height : this.height());
                    gl.useProgram(program.native);
                    gl.activeTexture(gl.TEXTURE2);
                    gl.bindTexture(gl.TEXTURE_2D, from.texture);
                    $bog_gamengine_gl_uniform_int(gl, program.uniform('source'), 2);
                    if (step.extra) {
                        gl.activeTexture(gl.TEXTURE3);
                        gl.bindTexture(gl.TEXTURE_2D, this.post_last.get(step.extra).texture);
                        $bog_gamengine_gl_uniform_int(gl, program.uniform('extra'), 3);
                    }
                    this.texel_vec[0] = 1 / from.width;
                    this.texel_vec[1] = 1 / from.height;
                    $bog_gamengine_gl_uniform_vector(gl, program.uniform('texel'), this.texel_vec);
                    gl.drawArrays(gl.TRIANGLES, 0, 3);
                    ++this.count_draws;
                }
                gl.activeTexture(gl.TEXTURE0);
                return plan.length;
            }
            slot_send(gl, slot) {
                const batch = slot.batch;
                const count = batch.count;
                if (!count)
                    return false;
                if (slot.tex && !slot.tex.native)
                    return false;
                if (slot.tex_data && !slot.tex_data.native)
                    return false;
                if (slot.live) {
                    const shape = batch.shape();
                    slot.vertex.send(shape.geometry());
                    slot.size = shape.size();
                }
                if (!slot.size)
                    return false;
                const grown = batch.cap > slot.cap;
                gl.bindVertexArray(slot.vao);
                gl.bindBuffer(gl.ARRAY_BUFFER, slot.trans.native);
                if (grown)
                    gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 64, gl.DYNAMIC_DRAW);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.trans, 0, count * 16);
                gl.bindBuffer(gl.ARRAY_BUFFER, slot.tint.native);
                if (grown)
                    gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.tint, 0, count * 4);
                if (slot.layer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.layer.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 4, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.layer, 0, count);
                }
                if (slot.uv) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.uv.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.uv, 0, count * 4);
                }
                if (slot.material) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.material.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.material, 0, count * 4);
                }
                if (slot.normal_layer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, slot.normal_layer.native);
                    if (grown)
                        gl.bufferData(gl.ARRAY_BUFFER, batch.cap * 4, gl.DYNAMIC_DRAW);
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, batch.normal_layer, 0, count);
                }
                if (grown) {
                    slot.cap = batch.cap;
                    slot.bytes = slot.stride * slot.cap + slot.bytes_shape;
                }
                return true;
            }
            count_fill(slots) {
                let batches = 0;
                let instances = 0;
                let triangles = 0;
                let bytes = 0;
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    if (!slot.ready)
                        continue;
                    const count = slot.batch.count;
                    ++batches;
                    instances += count;
                    triangles += slot.tris * count;
                    bytes += slot.bytes;
                }
                this.count_batches = batches;
                this.count_instances = instances;
                this.count_triangles = triangles;
                this.count_bytes = bytes;
                return instances;
            }
            shadow_pass(gl, slots) {
                this.shadow_at = this.shadows() ? this.sun_at : -1;
                const target = this.shadow_target();
                if (this.shadow_at < 0)
                    return target;
                $bog_gamengine_draw_shadow_mat(this.lights_dir, this.shadow_at * 4, this.cam_pos_vec, this.shadow_range(), this.shadow_mat_buf);
                const program = this.shadow_shader().program(gl);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.native);
                gl.viewport(0, 0, target.size, target.size);
                gl.disable(gl.SCISSOR_TEST);
                gl.disable(gl.BLEND);
                gl.enable(gl.DEPTH_TEST);
                gl.depthMask(true);
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                gl.clear(gl.DEPTH_BUFFER_BIT);
                gl.useProgram(program.native);
                $bog_gamengine_gl_uniform_matrix(gl, program.uniform('shadow_mat'), this.shadow_mat_buf);
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    if (!slot.ready || !slot.depth)
                        continue;
                    gl.bindVertexArray(slot.vao);
                    gl.drawArraysInstanced(slot.prim, 0, slot.size, slot.batch.count);
                    ++this.count_draws;
                }
                return target;
            }
            paint_slot(gl, slot, proj, view, wireframe) {
                const batch = slot.batch;
                const count = batch.count;
                if (slot.depth) {
                    gl.enable(gl.DEPTH_TEST);
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.BACK);
                }
                else {
                    gl.disable(gl.DEPTH_TEST);
                    gl.disable(gl.CULL_FACE);
                }
                gl.useProgram(slot.program.native);
                $bog_gamengine_gl_uniform_matrix(gl, slot.proj, proj);
                $bog_gamengine_gl_uniform_matrix(gl, slot.view, view);
                $bog_gamengine_gl_uniform_int(gl, slot.light_count, this.lights_count);
                $bog_gamengine_gl_uniform_vec4s(gl, slot.light_pos, this.lights_pos);
                $bog_gamengine_gl_uniform_vec4s(gl, slot.light_dir, this.lights_dir);
                $bog_gamengine_gl_uniform_vec4s(gl, slot.light_color, this.lights_color);
                $bog_gamengine_gl_uniform_vector(gl, slot.ambient, this.ambient_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.cam_pos, this.cam_pos_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.fog, this.fog_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.fog_color, this.fog_color_vec);
                $bog_gamengine_gl_uniform_vector(gl, slot.wireframe, this.wire_off);
                $bog_gamengine_gl_uniform_matrix(gl, slot.shadow_mat, this.shadow_mat_buf);
                $bog_gamengine_gl_uniform_int(gl, slot.shadow_light, this.shadow_at);
                if (slot.shadow_map) {
                    gl.activeTexture(gl.TEXTURE1);
                    gl.bindTexture(gl.TEXTURE_2D, this.shadow_target().texture);
                    $bog_gamengine_gl_uniform_int(gl, slot.shadow_map, 1);
                }
                if (slot.tex) {
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D_ARRAY, slot.tex.native);
                    $bog_gamengine_gl_uniform_int(gl, slot.sampler, 0);
                }
                if (slot.sampler_data) {
                    gl.activeTexture(gl.TEXTURE5);
                    gl.bindTexture(gl.TEXTURE_2D_ARRAY, slot.tex_data?.native ?? this.blank_data());
                    $bog_gamengine_gl_uniform_int(gl, slot.sampler_data, 5);
                }
                if (slot.bones_tex) {
                    gl.activeTexture(gl.TEXTURE4);
                    const bones = $bog_gamengine_skin_bones(batch);
                    if (bones)
                        slot.bones_tex.send(bones);
                    else
                        gl.bindTexture(gl.TEXTURE_2D, slot.bones_tex.native);
                    $bog_gamengine_gl_uniform_int(gl, slot.bones, 4);
                }
                gl.bindVertexArray(slot.vao);
                gl.drawArraysInstanced(slot.prim, 0, slot.size, count);
                ++this.count_draws;
                if (!wireframe || slot.wire === null)
                    return;
                $bog_gamengine_gl_uniform_vector(gl, slot.wireframe, this.wire_on);
                gl.drawArraysInstanced(slot.wire, 0, slot.size, count);
                ++this.count_draws;
            }
            measure(at_start, at_step, at_prep, at_fill, at_shadow, at_main, at_post) {
                const i = this.samples % stat_window;
                this.ticks[i] = at_post - this.scene().clock().tick_at;
                this.gaps[i] = this.paint_at ? at_post - this.paint_at : 0;
                this.steps_ms[i] = at_step - at_start;
                this.fills_ms[i] = at_fill - at_prep;
                this.shadows_ms[i] = at_shadow - at_fill;
                this.mains_ms[i] = at_main - at_shadow;
                this.posts_ms[i] = at_post - at_main;
                this.batches_ring[i] = this.count_batches;
                this.instances_ring[i] = this.count_instances;
                this.draws_ring[i] = this.count_draws;
                this.triangles_ring[i] = this.count_triangles;
                this.bytes_ring[i] = this.count_bytes;
                this.paint_at = at_post;
                ++this.samples;
            }
            mean(ring, size) {
                let sum = 0;
                for (let i = 0; i < size; ++i)
                    sum += ring[i];
                return size ? sum / size : 0;
            }
            report() {
                this.scene().clock().frame();
                const size = Math.min(this.samples, stat_window);
                return {
                    tick: this.mean(this.steps_ms, size),
                    fill: this.mean(this.fills_ms, size),
                    shadow: this.mean(this.shadows_ms, size),
                    main: this.mean(this.mains_ms, size),
                    post: this.mean(this.posts_ms, size),
                    batches: this.mean(this.batches_ring, size),
                    instances: this.mean(this.instances_ring, size),
                    draws: this.mean(this.draws_ring, size),
                    triangles: this.mean(this.triangles_ring, size),
                    bytes: this.mean(this.bytes_ring, size),
                };
            }
            stat() {
                const frame = this.scene().clock().frame();
                const size = Math.min(this.samples, stat_window);
                let gap = 0;
                let tick = 0;
                for (let i = 0; i < size; ++i) {
                    gap += this.gaps[i];
                    tick += this.ticks[i];
                }
                const div = size || 1;
                return `frame ${frame} | ${(gap / div).toFixed(1)} ms | tick ${(tick / div).toFixed(1)} ms`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "width", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "height", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "viewport", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "scissor", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "light_dir", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "clear", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "fog", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "fog_color", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "proj", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "slots", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "shadow_shader", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "shadow_target", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "post_plan", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "post_targets", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "post_vao", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "blank_data", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "textures", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "report", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "stat", null);
        $$.$bog_gamengine_draw = $bog_gamengine_draw;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_draw, {
            alignSelf: 'stretch',
            justifySelf: 'stretch',
            minWidth: 0,
            minHeight: 0,
            flex: {
                grow: 1,
                shrink: 1,
                basis: 0,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_labeler) = class $mol_labeler extends ($.$mol_list) {
		label(){
			return [(this.title())];
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (32);
			(obj.sub) = () => ((this.label()));
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_labeler.prototype), "Label"));
	($mol_mem(($.$mol_labeler.prototype), "Content"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/labeler/labeler.view.css", "[mol_labeler] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n\tcursor: inherit;\n}\n\n[mol_labeler_label] {\n\tmin-height: 2rem;\n\tcolor: var(--mol_theme_shade);\n\tpadding: 0;\n\tpadding-top: .5rem;\n\tpadding-inline: .75rem;\n\tgap: 0 var(--mol_gap_block);\n\tflex-wrap: wrap;\n}\n\n[mol_labeler_content] {\n\tdisplay: flex;\n\tpadding: var(--mol_gap_text);\n\tmin-height: 2.5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_point extends $mol_object2 {
        cam(next) {
            return next === undefined ? null : next;
        }
        width(next) {
            return next ?? 0;
        }
        height(next) {
            return next ?? 0;
        }
        scale(next) {
            return next ?? 1;
        }
        screen_pos = new Float32Array(2);
        down = false;
        move(x, y) {
            this.screen_pos[0] = x;
            this.screen_pos[1] = y;
        }
        press(down) {
            this.down = down;
        }
        proj_view() {
            const cam = this.cam();
            if (!cam)
                return $mol_3d_mat4.identity();
            const aspect = this.width() / this.height();
            const proj = cam.proj(Number.isFinite(aspect) && aspect > 0 ? aspect : 1);
            return $mol_3d_mat4.multiply(proj, cam.view());
        }
        near4 = new Float32Array(4);
        far4 = new Float32Array(4);
        clip4 = new Float32Array(4);
        ray_origin = new Float32Array(3);
        ray_dir = new Float32Array(3);
        ndc(out, x, y) {
            const scale = this.scale();
            out[0] = x * scale / this.width() * 2 - 1;
            out[1] = 1 - y * scale / this.height() * 2;
            return out;
        }
        ray(out_origin, out_dir, x, y) {
            const inv = this.proj_view().inversed();
            const near = this.near4;
            const far = this.far4;
            this.ndc(near, x, y);
            far[0] = near[0];
            far[1] = near[1];
            near[2] = -1;
            far[2] = 1;
            near[3] = 1;
            far[3] = 1;
            $bog_gamengine_vec_mat4_apply(near, inv, near);
            $bog_gamengine_vec_mat4_apply(far, inv, far);
            const nw = near[3];
            const fw = far[3];
            for (let i = 0; i < 3; ++i) {
                out_origin[i] = near[i] / nw;
                out_dir[i] = far[i] / fw - out_origin[i];
            }
            $bog_gamengine_vec_norm(out_dir, out_dir);
            return out_dir;
        }
        world(out, x, y) {
            const origin = this.ray_origin;
            const dir = this.ray_dir;
            this.ray(origin, dir, x, y);
            if (dir[2] === 0) {
                out[0] = NaN;
                out[1] = NaN;
                out[2] = NaN;
                return out;
            }
            const t = -origin[2] / dir[2];
            out[0] = origin[0] + dir[0] * t;
            out[1] = origin[1] + dir[1] * t;
            out[2] = 0;
            return out;
        }
        screen(out, pos) {
            const clip = this.clip4;
            clip[0] = pos[0];
            clip[1] = pos[1];
            clip[2] = pos[2];
            clip[3] = 1;
            $bog_gamengine_vec_mat4_apply(clip, this.proj_view(), clip);
            const w = clip[3];
            const scale = this.scale();
            out[0] = (clip[0] / w + 1) / 2 * this.width() / scale;
            out[1] = (1 - clip[1] / w) / 2 * this.height() / scale;
            out[2] = w;
            return out;
        }
        box_from = new Float32Array(3);
        box_to = new Float32Array(3);
        box_hits = [];
        pick_box(nodes, x0, y0, x1, y1, out) {
            const from = this.world(this.box_from, Math.min(x0, x1), Math.min(y0, y1));
            const to = this.world(this.box_to, Math.max(x0, x1), Math.max(y0, y1));
            const lo_x = Math.min(from[0], to[0]);
            const hi_x = Math.max(from[0], to[0]);
            const lo_y = Math.min(from[1], to[1]);
            const hi_y = Math.max(from[1], to[1]);
            const hits = this.box_hits;
            hits.length = 0;
            if (out)
                out.length = 0;
            for (let n = 0; n < nodes.length; ++n) {
                const node = nodes[n];
                const world = node.world();
                const size = typeof node.size === 'function' ? node.size() : null;
                const half_x = size && size.length > 0 ? size[0] / 2 : 0;
                const half_y = size && size.length > 1 ? size[1] / 2 : 0;
                const x = world[12];
                const y = world[13];
                if (x + half_x < lo_x || x - half_x > hi_x)
                    continue;
                if (y + half_y < lo_y || y - half_y > hi_y)
                    continue;
                hits.push(nodes[n]);
                if (out)
                    out.push(n);
            }
            return hits;
        }
        pick(nodes, x, y) {
            const origin = this.ray_origin;
            const dir = this.ray_dir;
            this.ray(origin, dir, x, y);
            let best = null;
            let best_t = Infinity;
            for (let n = 0; n < nodes.length; ++n) {
                const node = nodes[n];
                const world = node.world();
                const size = typeof node.size === 'function' ? node.size() : null;
                let tmin = -Infinity;
                let tmax = Infinity;
                let hit = true;
                for (let i = 0; i < 3; ++i) {
                    const half = size && size.length > i ? size[i] / 2 : 0.5;
                    const lo = world[12 + i] - half;
                    const hi = world[12 + i] + half;
                    const o = origin[i];
                    const d = dir[i];
                    if (d === 0) {
                        if (o < lo || o > hi) {
                            hit = false;
                            break;
                        }
                        continue;
                    }
                    let t1 = (lo - o) / d;
                    let t2 = (hi - o) / d;
                    if (t1 > t2) {
                        const swap = t1;
                        t1 = t2;
                        t2 = swap;
                    }
                    if (t1 > tmin)
                        tmin = t1;
                    if (t2 < tmax)
                        tmax = t2;
                    if (tmax < tmin) {
                        hit = false;
                        break;
                    }
                }
                if (!hit || tmax < 0)
                    continue;
                const t = tmin < 0 ? 0 : tmin;
                if (t < best_t) {
                    best_t = t;
                    best = node;
                }
            }
            return best;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_point.prototype, "cam", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_point.prototype, "width", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_point.prototype, "height", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_point.prototype, "scale", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_point.prototype, "proj_view", null);
    $.$bog_gamengine_point = $bog_gamengine_point;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
// @ts-ignore
var $node = $node || {};

;
"use strict";
var $;
(function ($) {
    class $mol_audio_context extends $mol_object {
        time() {
            return this.native().currentTime;
        }
        native(reset) {
            const AudioContext = this.$.$mol_dom_context.AudioContext || this.$.$node['web-audio-api'].AudioContext;
            const ctx = new AudioContext();
            ctx.onstatechange = (e) => this.state(null);
            return $mol_wire_sync(ctx);
        }
        state(next) {
            const ctx = this.native();
            if (ctx.state === next)
                return next;
            if (next === 'closed')
                ctx.close();
            if (next === 'running')
                ctx.resume();
            if (next === 'suspended')
                ctx.suspend();
            return ctx.state;
        }
        active(next) {
            return this.state(next ? 'running' : next === false ? 'suspended' : undefined) === 'running';
        }
    }
    __decorate([
        $mol_mem
    ], $mol_audio_context.prototype, "native", null);
    __decorate([
        $mol_mem
    ], $mol_audio_context.prototype, "state", null);
    $.$mol_audio_context = $mol_audio_context;
    $.$mol_audio_context_main = new $mol_audio_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_audio_node extends $mol_object {
        context(next) {
            return next ?? this.$.$mol_audio_context_main;
        }
        input(next = []) { return next; }
        input_connected() {
            const node = this.node();
            const prev = $mol_wire_probe(() => this.input_connected()) ?? [];
            const next = this.input();
            for (const src of prev) {
                if (next.includes(src))
                    continue;
                $mol_wire_probe(() => src.output())?.disconnect(node);
            }
            const ctx = this.context();
            for (const src of next) {
                src.context(ctx);
                src.output().connect(node);
            }
            return next;
        }
        active(next) { return next ?? false; }
        inputs_active() {
            return this.input_connected().some(src => src.active());
        }
        node() {
            throw new Error('implement');
        }
        output() {
            this.input_connected();
            return this.node();
        }
        time_cut() { return this.context().time(); }
        destructor() {
            const inputs = $mol_wire_probe(() => this.input_connected());
            if (!inputs?.length)
                return;
            const node = $mol_wire_probe(() => this.node());
            if (!node)
                return;
            for (const src of inputs) {
                src.output().disconnect(node);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "context", null);
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "input", null);
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "input_connected", null);
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "active", null);
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "inputs_active", null);
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "node", null);
    __decorate([
        $mol_mem
    ], $mol_audio_node.prototype, "output", null);
    __decorate([
        $mol_action
    ], $mol_audio_node.prototype, "time_cut", null);
    $.$mol_audio_node = $mol_audio_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_audio_tone_indices = {
        'b#': 0,
        a: 1,
        'a#': 2,
        b: 3,
        c: 4,
        'c#': 5,
        d: 6,
        'd#': 7,
        e: 8,
        f: 9,
        'f#': 10,
        g: 11,
    };
    $.$mol_audio_tone_base_freq = 440;
    function $mol_audio_tone_key_freq(name, octave) {
        const index = $.$mol_audio_tone_indices[name] + 12 * (octave ?? 4);
        // @see https://en.wikipedia.org/wiki/Piano_key_frequencies
        return $.$mol_audio_tone_base_freq * (2 ** ((index - 49) / 12));
    }
    $.$mol_audio_tone_key_freq = $mol_audio_tone_key_freq;
    /**
     * @param raw string https://wiki.ccarh.org/wiki/Guido_Music_Notation
     *
     * Accidentals: only one # allowed: e5#
     * No Augmentation dots.
     */
    function $mol_audio_tone_parse(raw) {
        const [, key, octave_str, duration_str] = raw.match(/((?:[a-g]#?)|_)(-?[0-4])?(?:\/(\d+))?/) ?? [];
        if (!key)
            throw new $mol_error_mix('Not a note', { note: raw });
        const octave = octave_str ? (3 + Number(octave_str)) : null;
        const duration = Number(duration_str || 1);
        return {
            key: key.startsWith('_') ? null : key,
            octave,
            duration
        };
    }
    $.$mol_audio_tone_parse = $mol_audio_tone_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const started = new WeakMap();
    class $mol_audio_instrument extends $mol_audio_node {
        node(reset) {
            throw new Error('implement');
        }
        node_destruct() {
            const node = this.node();
            const destructor = node.onended = this.onended.bind(this, node);
            return Object.assign(node, { destructor });
        }
        output() {
            this.node_destruct();
            return super.output();
        }
        onended(node, e) {
            const state = started.get(node);
            if (state === false)
                return;
            if (state === true)
                node.stop();
            started.set(node, false);
            if (node !== $mol_wire_probe(() => this.node()))
                return;
            this.active(false);
            if (e)
                this.end();
        }
        end() { }
        node_started() {
            const prev = $mol_wire_probe(() => this.node());
            return prev ? (started.get(prev) ?? null) : null;
        }
        start_at(next) {
            if (next === -1)
                return next;
            if (this.node_started() !== null)
                this.node(null);
            if (next === undefined)
                return -1;
            this.output().start(next + this.time_cut());
            started.set(this.node(), true);
            return next;
        }
        note(next) { return next ?? null; }
        stop_at(next) {
            if (next === undefined || next < 0)
                return -1;
            if (!this.node_started())
                return next;
            this.node().stop(next + this.time_cut());
            return next;
        }
        active(next) {
            this.node();
            const start_at = this.start_at();
            this.stop_at();
            if (next) {
                this.context().active(true);
                this.start_at(0);
                this.stop_at(-1);
                return true;
            }
            if (next === false) {
                this.start_at(-1);
                this.stop_at(0);
                return false;
            }
            return start_at !== -1;
        }
        start() {
            this.node(null);
            this.active(true);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_audio_instrument.prototype, "node_destruct", null);
    __decorate([
        $mol_mem
    ], $mol_audio_instrument.prototype, "output", null);
    __decorate([
        $mol_mem
    ], $mol_audio_instrument.prototype, "start_at", null);
    __decorate([
        $mol_mem
    ], $mol_audio_instrument.prototype, "note", null);
    __decorate([
        $mol_mem
    ], $mol_audio_instrument.prototype, "stop_at", null);
    __decorate([
        $mol_mem
    ], $mol_audio_instrument.prototype, "active", null);
    __decorate([
        $mol_action
    ], $mol_audio_instrument.prototype, "start", null);
    $.$mol_audio_instrument = $mol_audio_instrument;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_audio_sample extends $mol_audio_instrument {
        duration() {
            return this.audio_buffer()?.duration ?? 0;
        }
        buffer() {
            return null;
        }
        audio_buffer() {
            const buffer = this.buffer();
            return buffer ? this.context().native().decodeAudioData(buffer) : null;
        }
        loop_default() { return false; }
        loop(next) {
            return this.node().loop = next ?? this.loop_default();
        }
        loop_start_default() { return 0; }
        loop_start(next) {
            return this.node().loopStart = next ?? this.loop_start_default();
        }
        loop_end_default() { return this.duration(); }
        loop_end(next) {
            return this.node().loopEnd = next ?? this.loop_end_default();
        }
        rate_default() {
            return this.node().playbackRate.defaultValue;
        }
        rate(next) {
            return this.node().playbackRate.value = next ?? this.rate_default();
        }
        node(reset) {
            const node = this.context().native().createBufferSource();
            node.buffer = this.audio_buffer();
            return node;
        }
        active(next) {
            const prev = super.active(next);
            if (this.node_started()) {
                if (next)
                    this.context().active(true);
                this.rate(next ? null : 0);
                return next ?? false;
            }
            return prev;
        }
        output() {
            this.loop();
            this.loop_start();
            this.loop_end();
            this.rate();
            return super.output();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "audio_buffer", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "loop", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "loop_start", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "loop_end", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "rate", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "node", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "active", null);
    __decorate([
        $mol_mem
    ], $mol_audio_sample.prototype, "output", null);
    $.$mol_audio_sample = $mol_audio_sample;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
     */
    class $mol_audio_room extends $mol_audio_node {
        node() {
            return this.context().native().destination;
        }
        // @ $mol_mem
        // override context() {
        // 	return new this.$.$mol_audio_context
        // }
        active(next) {
            return this.context().active(next);
        }
        suspend_time(sec) {
            return sec ?? 5;
        }
        suspend_timer() {
            const time = this.suspend_time();
            if (!time)
                return null;
            if (!this.active())
                return null;
            return new this.$.$mol_after_timeout(time * 1000, () => $mol_wire_async(this).active(false));
        }
        error() {
            try {
                this.output();
            }
            catch (e) {
                if (!$mol_promise_like(e))
                    return { value: e };
            }
            return null;
        }
        status(next) {
            if (next === 'playing')
                next = 'running';
            if (next === 'error')
                next = 'closed';
            const state = this.context().state(next);
            if (state === 'closed')
                return state;
            if (this.error())
                return 'error';
            if (this.inputs_active() && state === 'running')
                return 'playing';
            this.suspend_timer();
            return state;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_audio_room.prototype, "node", null);
    __decorate([
        $mol_mem
    ], $mol_audio_room.prototype, "suspend_time", null);
    __decorate([
        $mol_mem
    ], $mol_audio_room.prototype, "suspend_timer", null);
    __decorate([
        $mol_mem
    ], $mol_audio_room.prototype, "error", null);
    __decorate([
        $mol_mem
    ], $mol_audio_room.prototype, "status", null);
    $.$mol_audio_room = $mol_audio_room;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_sound extends $mol_object2 {
        voices = [];
        music_voice = null;
        timer = null;
        effects_node = null;
        music_node = null;
        uris(next = {}) {
            return next;
        }
        listener(next = null) {
            return next;
        }
        range(next = 10) {
            return next;
        }
        fade(next = 1) {
            return next;
        }
        Room() {
            $mol_wire_solid();
            return this.$.$mol_audio_room.make({});
        }
        native() {
            return this.Room().context().native();
        }
        time() {
            return this.Room().context().time();
        }
        panner() {
            return this.native().createStereoPanner();
        }
        gain() {
            return this.native().createGain();
        }
        gain_to_room() {
            const gain = this.gain();
            gain.connect(this.Room().node());
            return gain;
        }
        effects_gain() {
            return this.effects_node ??= this.gain_to_room();
        }
        effects(next = 1) {
            this.effects_gain().gain.value = next;
            return next;
        }
        music_gain() {
            return this.music_node ??= this.gain_to_room();
        }
        volume(next = 1) {
            this.music_gain().gain.value = next;
            return next;
        }
        uri(name) {
            const uri = this.uris()[name];
            if (!uri)
                $mol_fail(new Error(`Sound has no sample ${name}, known: ${Object.keys(this.uris()).join(', ')}`));
            return uri;
        }
        sample(name) {
            $mol_wire_solid();
            const uri = this.uri(name);
            return this.$.$mol_audio_sample.make({ buffer: () => this.$.$mol_fetch.buffer(uri) });
        }
        music_sample(name) {
            $mol_wire_solid();
            const uri = this.uri(name);
            return this.$.$mol_audio_sample.make({
                buffer: () => this.$.$mol_fetch.buffer(uri),
                loop_default: () => true,
            });
        }
        play(name, pos) {
            const sample = this.sample(name);
            new this.$.$mol_after_tick(() => $mol_wire_async(this).start(sample, pos));
        }
        start(sample, pos) {
            try {
                sample.start();
                const source = sample.output();
                this.effects();
                if (pos)
                    this.voice_add(sample, source, pos);
                else
                    source.connect(this.effects_gain());
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        voice_add(sample, source, pos) {
            const panner = this.panner();
            const gain = this.gain();
            source.connect(panner);
            panner.connect(gain);
            gain.connect(this.effects_gain());
            const voice = { sample, panner, gain, pos };
            this.voices.push(voice);
            source.addEventListener('ended', () => this.voice_drop(voice));
            this.voice_update(voice, this.listener_world());
            if (!this.timer)
                this.follow();
        }
        voice_drop(voice) {
            const voices = this.voices;
            const index = voices.indexOf(voice);
            if (index < 0)
                return;
            voices[index] = voices[voices.length - 1];
            voices.pop();
            voice.gain.disconnect();
        }
        listener_world() {
            return this.listener()?.world() ?? $mol_3d_mat4.identity();
        }
        update() {
            const world = this.listener_world();
            const voices = this.voices;
            for (let i = 0; i < voices.length; ++i)
                this.voice_update(voices[i], world);
        }
        voice_update(voice, world) {
            const pos = voice.pos;
            const dx = pos[0] - world[12];
            const dy = pos[1] - world[13];
            const dz = (pos.length > 2 ? pos[2] : 0) - world[14];
            const dist = Math.hypot(dx, dy, dz);
            const right = Math.hypot(world[0], world[1], world[2]);
            const side = dx * world[0] + dy * world[1] + dz * world[2];
            const ratio = dist / this.range();
            voice.panner.pan.value = dist && right ? side / (dist * right) : 0;
            voice.gain.gain.value = 1 / (1 + ratio * ratio);
        }
        follow() {
            this.timer = null;
            $mol_wire_async(this).update();
            if (this.voices.length)
                this.timer = new this.$.$mol_after_timeout(100, () => this.follow());
        }
        music(next) {
            if (next === undefined)
                return null;
            if (next === ($mol_wire_probe(() => this.music()) ?? null))
                return next;
            const sample = next === null ? null : this.music_sample(next);
            new this.$.$mol_after_tick(() => $mol_wire_async(this).music_start(sample));
            return next;
        }
        music_start(sample) {
            try {
                const prev = this.music_voice;
                if (prev) {
                    this.ramp(prev.gain, 0);
                    prev.sample.stop_at(this.fade());
                }
                this.music_voice = sample && this.music_voice_add(sample);
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        music_voice_add(sample) {
            const gain = this.gain();
            gain.gain.value = 0;
            this.volume();
            sample.start();
            sample.output().connect(gain);
            gain.connect(this.music_gain());
            this.ramp(gain, 1);
            return { sample, gain };
        }
        ramp(gain, value) {
            const now = this.time();
            gain.gain.setValueAtTime(gain.gain.value, now);
            gain.gain.linearRampToValueAtTime(value, now + this.fade());
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "uris", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "listener", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "range", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "fade", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "Room", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "effects", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "volume", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_sound.prototype, "sample", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_sound.prototype, "music_sample", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "music", null);
    $.$bog_gamengine_sound = $bog_gamengine_sound;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $bog_gamengine_cam_flat_clamp(value, min, max, size) {
        if (max - min <= size)
            return (min + max) / 2;
        return Math.min(Math.max(value, min + size / 2), max - size / 2);
    }
    $.$bog_gamengine_cam_flat_clamp = $bog_gamengine_cam_flat_clamp;
    class $bog_gamengine_cam_flat extends $bog_gamengine_cam {
        zoom(next) {
            return next ?? 1;
        }
        pixels_per_unit(next) {
            return next ?? 32;
        }
        height(next) {
            return next ?? 10;
        }
        props() {
            return [
                ...super.props(),
                { name: 'zoom', kind: 'number', get: () => this.zoom(), set: next => this.zoom(next) },
                { name: 'height', kind: 'number', get: () => this.height(), set: next => this.height(next) },
            ];
        }
        target(next) {
            return next ?? null;
        }
        bounds(next) {
            return next ?? null;
        }
        follow(next) {
            return next ?? 0;
        }
        zoom_min(next) {
            return next ?? 0.25;
        }
        zoom_max(next) {
            return next ?? 4;
        }
        place(x, y) {
            const bounds = this.bounds();
            if (bounds) {
                const height = this.height() / this.zoom();
                x = $bog_gamengine_cam_flat_clamp(x, bounds[0], bounds[2], height * this.aspect());
                y = $bog_gamengine_cam_flat_clamp(y, bounds[1], bounds[3], height);
            }
            const pos = this.pos();
            if (x === pos[0] && y === pos[1])
                return pos;
            const next = new Float32Array(3);
            next[0] = x;
            next[1] = y;
            next[2] = pos[2];
            return this.pos(next);
        }
        pan(dx, dy) {
            const pos = this.pos();
            return this.place(pos[0] + dx, pos[1] + dy);
        }
        zoom_at(factor, x, y) {
            const zoom = this.zoom();
            const next = Math.min(this.zoom_max(), Math.max(this.zoom_min(), zoom * factor));
            if (next === zoom)
                return this.pos();
            this.zoom(next);
            const rate = zoom / next;
            const pos = this.pos();
            return this.place(x + (pos[0] - x) * rate, y + (pos[1] - y) * rate);
        }
        step(dt) {
            const target = this.target();
            if (!target)
                return;
            const world = target.world();
            const height = this.height() / this.zoom();
            const bounds = this.bounds();
            let x = world[12];
            let y = world[13];
            if (bounds) {
                x = $bog_gamengine_cam_flat_clamp(x, bounds[0], bounds[2], height * this.aspect());
                y = $bog_gamengine_cam_flat_clamp(y, bounds[1], bounds[3], height);
            }
            const pos = this.pos();
            const follow = this.follow();
            const rate = follow > 0 ? 1 - Math.exp(-dt / follow) : 1;
            this.place(pos[0] + (x - pos[0]) * rate, pos[1] + (y - pos[1]) * rate);
        }
        proj(aspect) {
            const h = this.height() / this.zoom();
            return $mol_3d_mat4.orthographic(-h * aspect / 2, h * aspect / 2, -h / 2, h / 2, -100, 100);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "zoom", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "pixels_per_unit", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "height", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "target", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "bounds", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "follow", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "zoom_min", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_flat.prototype, "zoom_max", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_cam_flat.prototype, "proj", null);
    $.$bog_gamengine_cam_flat = $bog_gamengine_cam_flat;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_tilemap_pool extends $mol_object2 {
        cap = 0;
        count = 0;
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        aabb = new Float32Array(0);
        fit(need) {
            if (need <= this.cap)
                return this.cap;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.aabb = new Float32Array(cap * 6);
            const uv = this.uv;
            for (let i = 0; i < cap; ++i) {
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
            }
            return cap;
        }
    }
    $.$bog_gamengine_tilemap_pool = $bog_gamengine_tilemap_pool;
    class $bog_gamengine_tilemap extends $bog_gamengine_node {
        pool(next) {
            return next ?? new $bog_gamengine_tilemap_pool;
        }
        is_source() {
            return true;
        }
        source() {
            return this.pool();
        }
        tile(next) {
            return next ?? null;
        }
        palette(next) {
            return next ?? {};
        }
        atlas(next) {
            return next ?? null;
        }
        size(next = 1) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'size', kind: 'number', get: () => this.size(), set: next => this.size(next) },
            ];
        }
        done_map = null;
        done_size = NaN;
        done_palette = null;
        done_world = new Float32Array(16);
        done_tint = new Float32Array(4);
        fresh(map, world, size, palette, tint) {
            let same = map === this.done_map && size === this.done_size && palette === this.done_palette;
            const done_world = this.done_world;
            for (let i = 0; i < 16; ++i) {
                if (world[i] !== done_world[i])
                    same = false;
                done_world[i] = world[i];
            }
            const done_tint = this.done_tint;
            for (let i = 0; i < 4; ++i) {
                if (tint[i] !== done_tint[i])
                    same = false;
                done_tint[i] = tint[i];
            }
            this.done_map = map;
            this.done_size = size;
            this.done_palette = palette;
            return same;
        }
        cell = new Float32Array(3);
        emit() {
            const pool = this.pool();
            const tile = this.tile();
            const world = this.world();
            const size = this.size();
            const palette = this.palette();
            const tint = this.tint();
            const atlas = this.atlas();
            if (!tile) {
                pool.count = 0;
                return 0;
            }
            if (this.fresh(tile.map(), world, size, palette, tint))
                return pool.count;
            const rows = tile.rows();
            let need = 0;
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x) {
                    if (palette[row[x]] !== undefined)
                        ++need;
                }
            }
            pool.fit(need);
            const trans = pool.trans;
            const tints = pool.tint;
            const layer = pool.layer;
            const aabb = pool.aabb;
            const cell = this.cell;
            const radius = size * $bog_gamengine_batch_scale_max(world) * Math.SQRT1_2;
            let count = 0;
            for (let y = 0; y < rows.length; ++y) {
                const row = rows[y];
                for (let x = 0; x < row.length; ++x) {
                    const frame = palette[row[x]];
                    if (frame === undefined)
                        continue;
                    tile.cell_pos(x, y, cell);
                    const at = count * 16;
                    for (let r = 0; r < 4; ++r) {
                        trans[at + r] = world[r] * size;
                        trans[at + 4 + r] = world[4 + r] * size;
                        trans[at + 8 + r] = world[8 + r];
                        trans[at + 12 + r] = world[12 + r] + world[r] * cell[0] + world[4 + r] * cell[1];
                    }
                    for (let k = 0; k < 4; ++k)
                        tints[count * 4 + k] = tint[k];
                    layer[count] = atlas ? atlas.layer(frame) : 0;
                    const wx = trans[at + 12];
                    const wy = trans[at + 13];
                    const wz = trans[at + 14];
                    aabb[count * 6] = wx - radius;
                    aabb[count * 6 + 1] = wy - radius;
                    aabb[count * 6 + 2] = wz - radius;
                    aabb[count * 6 + 3] = wx + radius;
                    aabb[count * 6 + 4] = wy + radius;
                    aabb[count * 6 + 5] = wz + radius;
                    ++count;
                }
            }
            pool.count = count;
            return count;
        }
        box = new Float32Array(6);
        aabb() {
            const box = this.box;
            const tile = this.tile();
            if (!tile) {
                box.fill(0);
                return box;
            }
            const world = this.world();
            const size = this.size();
            const half = size / 2;
            const left = 0.5 - half;
            const right = tile.width() - 0.5 + half;
            const top = -0.5 + half;
            const bottom = -tile.height() + 0.5 - half;
            for (let k = 0; k < 3; ++k) {
                box[k] = Infinity;
                box[k + 3] = -Infinity;
            }
            for (let i = 0; i < 4; ++i) {
                const x = i & 1 ? right : left;
                const y = i & 2 ? top : bottom;
                for (let k = 0; k < 3; ++k) {
                    const value = world[12 + k] + world[k] * x + world[4 + k] * y;
                    if (value < box[k])
                        box[k] = value;
                    if (value > box[k + 3])
                        box[k + 3] = value;
                }
            }
            return box;
        }
        step(dt) {
            this.emit();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "pool", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "tile", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "palette", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_tilemap.prototype, "size", null);
    $.$bog_gamengine_tilemap = $bog_gamengine_tilemap;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_demo_flat_hero extends $bog_gamengine_phys_body {
        input(next) {
            return next ?? null;
        }
        speed(next = 4) {
            return next;
        }
        size(next) {
            return next ?? new Float32Array([0.8, 0.8]);
        }
        face_left(next = false) {
            return next;
        }
        clip(next = '') {
            return next;
        }
        step(dt) {
            const input = this.input();
            if (!input)
                return;
            const speed = this.speed();
            const vx = input.axis('left', 'right') * speed;
            const vy = input.axis('down', 'up') * speed;
            if (vx !== 0)
                this.face_left(vx < 0);
            const clip = vx !== 0 || vy !== 0 ? 'walk' : '';
            if (this.clip() !== clip)
                this.clip(clip);
            const vel = this.vel();
            if (vel[0] === vx && vel[1] === vy)
                return;
            const next = new Float32Array(3);
            next[0] = vx;
            next[1] = vy;
            next[2] = vel[2];
            this.vel(next);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_hero.prototype, "input", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_hero.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_hero.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_hero.prototype, "face_left", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_hero.prototype, "clip", null);
    $.$bog_gamengine_demo_flat_hero = $bog_gamengine_demo_flat_hero;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const uv_plain = new Float32Array([0, 0, 1, 1]);
    const uv_flip = new Float32Array([1, 0, -1, 1]);
    class $bog_gamengine_sprite extends $bog_gamengine_node {
        atlas(next) {
            return next ?? null;
        }
        frame(next = '') {
            return next;
        }
        clip(next = '') {
            return next;
        }
        fps(next = 8) {
            return next;
        }
        clock(next) {
            return next ?? null;
        }
        clips(next) {
            return next ?? {};
        }
        flip_x(next = false) {
            return next;
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        props() {
            return [
                ...super.props(),
                { name: 'frame', kind: 'frame', get: () => this.frame(), set: next => this.frame(next) },
                { name: 'flip_x', kind: 'flag', get: () => this.flip_x(), set: next => this.flip_x(next) },
                { name: 'size', kind: 'vec2', get: () => this.size(), set: next => this.size(next) },
                { name: 'clip', kind: 'text', get: () => this.clip(), set: next => this.clip(next) },
                { name: 'fps', kind: 'number', get: () => this.fps(), set: next => this.fps(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
            ];
        }
        radius() {
            return Math.SQRT1_2;
        }
        frame_now() {
            const clip = this.clip();
            if (!clip)
                return this.frame();
            const list = this.clips()[clip];
            if (!list)
                return this.frame();
            const clock = this.clock();
            const time = clock ? clock.time() : 0;
            return list[Math.floor(time * this.fps()) % list.length];
        }
        layer() {
            const atlas = this.atlas();
            return atlas ? atlas.layer(this.frame_now()) : 0;
        }
        uv() {
            return this.flip_x() ? uv_flip : uv_plain;
        }
        trans() {
            const size = this.size();
            return $mol_3d_mat4.multiply(super.trans(), $mol_3d_mat4.scaling([size[0], size[1], 1]));
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "clip", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "fps", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "clock", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "clips", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "flip_x", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "uv", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sprite.prototype, "trans", null);
    $.$bog_gamengine_sprite = $bog_gamengine_sprite;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const sqrt2 = Math.SQRT2;
    class $bog_gamengine_nav_grid extends $mol_object2 {
        tile(next) {
            return next ?? null;
        }
        pad(next = 0.3) {
            return next;
        }
        width() {
            return this.tile()?.width() ?? 0;
        }
        height() {
            return this.tile()?.height() ?? 0;
        }
        solid() {
            const tile = this.tile();
            const width = this.width();
            const height = this.height();
            const solid = new Uint8Array(width * height);
            if (!tile)
                return solid;
            for (let y = 0; y < height; ++y) {
                for (let x = 0; x < width; ++x)
                    solid[y * width + x] = tile.cell(x, y) ? 1 : 0;
            }
            return solid;
        }
        cell(x, y) {
            const width = this.width();
            if (x < 0 || y < 0 || x >= width || y >= this.height())
                return true;
            return this.solid()[y * width + x] === 1;
        }
        solid_at(wx, wy) {
            return this.cell(Math.floor(wx), Math.floor(-wy));
        }
        block(x, y, solid) {
            const width = this.width();
            if (x < 0 || y < 0 || x >= width || y >= this.height())
                return;
            this.solid()[y * width + x] = solid ? 1 : 0;
        }
        size = 0;
        gen = 0;
        seen = new Int32Array(0);
        state = new Uint8Array(0);
        cost = new Float32Array(0);
        rank = new Float32Array(0);
        from = new Int32Array(0);
        heap = new Int32Array(0);
        at = new Int32Array(0);
        trace = new Int32Array(0);
        heap_size = 0;
        grow() {
            const size = this.width() * this.height();
            if (size <= this.size)
                return;
            this.size = size;
            this.seen = new Int32Array(size);
            this.state = new Uint8Array(size);
            this.cost = new Float32Array(size);
            this.rank = new Float32Array(size);
            this.from = new Int32Array(size);
            this.heap = new Int32Array(size);
            this.at = new Int32Array(size);
            this.trace = new Int32Array(size);
        }
        heur(x0, y0, x1, y1) {
            const dx = Math.abs(x1 - x0);
            const dy = Math.abs(y1 - y0);
            return dx + dy + (sqrt2 - 2) * Math.min(dx, dy);
        }
        heap_push(node) {
            const heap = this.heap;
            let i = this.heap_size++;
            heap[i] = node;
            this.at[node] = i;
            this.heap_up(i);
        }
        heap_up(i) {
            const heap = this.heap;
            const rank = this.rank;
            const at = this.at;
            const node = heap[i];
            const r = rank[node];
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (rank[heap[p]] <= r)
                    break;
                heap[i] = heap[p];
                at[heap[i]] = i;
                i = p;
            }
            heap[i] = node;
            at[node] = i;
        }
        heap_pop() {
            const heap = this.heap;
            const rank = this.rank;
            const at = this.at;
            const top = heap[0];
            const size = --this.heap_size;
            if (size === 0)
                return top;
            const node = heap[size];
            const r = rank[node];
            let i = 0;
            for (;;) {
                let c = i * 2 + 1;
                if (c >= size)
                    break;
                if (c + 1 < size && rank[heap[c + 1]] < rank[heap[c]])
                    ++c;
                if (rank[heap[c]] >= r)
                    break;
                heap[i] = heap[c];
                at[heap[i]] = i;
                i = c;
            }
            heap[i] = node;
            at[node] = i;
            return top;
        }
        path(from, to, out) {
            const width = this.width();
            const height = this.height();
            if (width === 0 || height === 0)
                return 0;
            this.grow();
            const solid = this.solid();
            const x0 = Math.floor(from[0]);
            const y0 = Math.floor(-from[1]);
            const x1 = Math.floor(to[0]);
            const y1 = Math.floor(-to[1]);
            if (x0 < 0 || y0 < 0 || x0 >= width || y0 >= height)
                return 0;
            if (x1 < 0 || y1 < 0 || x1 >= width || y1 >= height)
                return 0;
            if (solid[y1 * width + x1])
                return 0;
            const gen = ++this.gen;
            const seen = this.seen;
            const state = this.state;
            const cost = this.cost;
            const rank = this.rank;
            const parent = this.from;
            const start = y0 * width + x0;
            const goal = y1 * width + x1;
            this.heap_size = 0;
            seen[start] = gen;
            state[start] = 1;
            cost[start] = 0;
            rank[start] = this.heur(x0, y0, x1, y1);
            parent[start] = -1;
            this.heap_push(start);
            let found = false;
            while (this.heap_size > 0) {
                const node = this.heap_pop();
                if (node === goal) {
                    found = true;
                    break;
                }
                state[node] = 2;
                const nx = node % width;
                const ny = (node - nx) / width;
                const g = cost[node];
                for (let dy = -1; dy <= 1; ++dy) {
                    const yy = ny + dy;
                    if (yy < 0 || yy >= height)
                        continue;
                    for (let dx = -1; dx <= 1; ++dx) {
                        if (dx === 0 && dy === 0)
                            continue;
                        const xx = nx + dx;
                        if (xx < 0 || xx >= width)
                            continue;
                        const next = yy * width + xx;
                        if (solid[next])
                            continue;
                        let step = 1;
                        if (dx !== 0 && dy !== 0) {
                            if (solid[ny * width + xx] || solid[yy * width + nx])
                                continue;
                            step = sqrt2;
                        }
                        const ng = g + step;
                        if (seen[next] === gen) {
                            if (state[next] === 2 || cost[next] <= ng)
                                continue;
                            cost[next] = ng;
                            rank[next] = ng + this.heur(xx, yy, x1, y1);
                            parent[next] = node;
                            this.heap_up(this.at[next]);
                        }
                        else {
                            seen[next] = gen;
                            state[next] = 1;
                            cost[next] = ng;
                            rank[next] = ng + this.heur(xx, yy, x1, y1);
                            parent[next] = node;
                            this.heap_push(next);
                        }
                    }
                }
            }
            if (!found)
                return 0;
            const trace = this.trace;
            let len = 0;
            for (let node = goal; node !== -1; node = parent[node])
                trace[len++] = node;
            const cap = out.length >> 1;
            let count = 0;
            for (let i = len - 1; i >= 0 && count < cap; --i) {
                const node = trace[i];
                const x = node % width;
                const y = (node - x) / width;
                out[count * 2] = x + 0.5;
                out[count * 2 + 1] = -y - 0.5;
                ++count;
            }
            out[0] = from[0];
            out[1] = from[1];
            if (count === len) {
                out[count * 2 - 2] = to[0];
                out[count * 2 - 1] = to[1];
            }
            return count;
        }
        visible(x0, y0, x1, y1) {
            const pad = this.pad();
            const dx = x1 - x0;
            const dy = y1 - y0;
            const steps = Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) * 4);
            for (let i = 0; i <= steps; ++i) {
                const t = steps === 0 ? 0 : i / steps;
                const x = x0 + dx * t;
                const y = y0 + dy * t;
                if (this.solid_at(x - pad, y - pad))
                    return false;
                if (this.solid_at(x + pad, y - pad))
                    return false;
                if (this.solid_at(x - pad, y + pad))
                    return false;
                if (this.solid_at(x + pad, y + pad))
                    return false;
            }
            return true;
        }
        smooth(path, count, out) {
            if (count === 0)
                return 0;
            const cap = out.length >> 1;
            let written = 0;
            let i = 0;
            out[0] = path[0];
            out[1] = path[1];
            written = 1;
            while (i < count - 1 && written < cap) {
                let j = count - 1;
                while (j > i + 1 && !this.visible(path[i * 2], path[i * 2 + 1], path[j * 2], path[j * 2 + 1]))
                    --j;
                out[written * 2] = path[j * 2];
                out[written * 2 + 1] = path[j * 2 + 1];
                ++written;
                i = j;
            }
            return written;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_grid.prototype, "tile", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_grid.prototype, "pad", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_grid.prototype, "width", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_grid.prototype, "height", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_grid.prototype, "solid", null);
    $.$bog_gamengine_nav_grid = $bog_gamengine_nav_grid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const eps = 1e-5;
    class $bog_gamengine_nav_mesh extends $mol_object2 {
        polys(next) {
            return next ?? [];
        }
        y(next = 0) {
            return next;
        }
        center = new Float32Array(0);
        portal = new Float32Array(0);
        portal_poly = new Int32Array(0);
        adj_start = new Int32Array(0);
        adj_list = new Int32Array(0);
        portal_count = 0;
        gen = 0;
        seen = new Int32Array(0);
        state = new Uint8Array(0);
        cost = new Float32Array(0);
        rank = new Float32Array(0);
        from = new Int32Array(0);
        heap = new Int32Array(0);
        at = new Int32Array(0);
        heap_size = 0;
        route = new Int32Array(0);
        left = new Float32Array(0);
        right = new Float32Array(0);
        build() {
            const polys = this.polys();
            const n = polys.length;
            const center = new Float32Array(n * 2);
            for (let p = 0; p < n; ++p) {
                const poly = polys[p];
                const m = poly.length >> 1;
                let cx = 0, cz = 0;
                for (let i = 0; i < m; ++i) {
                    cx += poly[i * 2];
                    cz += poly[i * 2 + 1];
                }
                center[p * 2] = cx / m;
                center[p * 2 + 1] = cz / m;
            }
            this.center = center;
            const portals = [];
            const pairs = [];
            const degree = new Int32Array(n);
            for (let p = 0; p < n; ++p) {
                for (let q = p + 1; q < n; ++q) {
                    if (!this.overlap(polys[p], polys[q], portals))
                        continue;
                    pairs.push(p, q);
                    ++degree[p];
                    ++degree[q];
                }
            }
            const count = pairs.length >> 1;
            this.portal_count = count;
            this.portal = new Float32Array(portals);
            this.portal_poly = new Int32Array(pairs);
            const adj_start = new Int32Array(n + 1);
            for (let p = 0; p < n; ++p)
                adj_start[p + 1] = adj_start[p] + degree[p];
            const fill = new Int32Array(n);
            const adj_list = new Int32Array(count * 2);
            for (let k = 0; k < count; ++k) {
                const p = pairs[k * 2];
                const q = pairs[k * 2 + 1];
                adj_list[adj_start[p] + fill[p]++] = k;
                adj_list[adj_start[q] + fill[q]++] = k;
            }
            this.adj_start = adj_start;
            this.adj_list = adj_list;
            const nodes = count + 1;
            this.seen = new Int32Array(nodes);
            this.state = new Uint8Array(nodes);
            this.cost = new Float32Array(nodes);
            this.rank = new Float32Array(nodes);
            this.from = new Int32Array(nodes);
            this.heap = new Int32Array(nodes);
            this.at = new Int32Array(nodes);
            this.route = new Int32Array(nodes);
            this.left = new Float32Array(nodes * 2 + 2);
            this.right = new Float32Array(nodes * 2 + 2);
            return count;
        }
        overlap(a, b, portals) {
            const am = a.length >> 1;
            const bm = b.length >> 1;
            for (let i = 0; i < am; ++i) {
                const ax0 = a[i * 2], az0 = a[i * 2 + 1];
                const ax1 = a[((i + 1) % am) * 2], az1 = a[((i + 1) % am) * 2 + 1];
                const dx = ax1 - ax0, dz = az1 - az0;
                const len2 = dx * dx + dz * dz;
                if (len2 < eps)
                    continue;
                for (let j = 0; j < bm; ++j) {
                    const bx0 = b[j * 2], bz0 = b[j * 2 + 1];
                    const bx1 = b[((j + 1) % bm) * 2], bz1 = b[((j + 1) % bm) * 2 + 1];
                    if (Math.abs(dx * (bz0 - az0) - dz * (bx0 - ax0)) > eps)
                        continue;
                    if (Math.abs(dx * (bz1 - az0) - dz * (bx1 - ax0)) > eps)
                        continue;
                    const t0 = ((bx0 - ax0) * dx + (bz0 - az0) * dz) / len2;
                    const t1 = ((bx1 - ax0) * dx + (bz1 - az0) * dz) / len2;
                    const lo = Math.max(0, Math.min(t0, t1));
                    const hi = Math.min(1, Math.max(t0, t1));
                    if (hi - lo < 1e-3)
                        continue;
                    portals.push(ax0 + dx * lo, az0 + dz * lo, ax0 + dx * hi, az0 + dz * hi);
                    return true;
                }
            }
            return false;
        }
        inside(poly, x, z) {
            const m = poly.length >> 1;
            let sign = 0;
            for (let i = 0; i < m; ++i) {
                const x0 = poly[i * 2], z0 = poly[i * 2 + 1];
                const x1 = poly[((i + 1) % m) * 2], z1 = poly[((i + 1) % m) * 2 + 1];
                const cross = (x1 - x0) * (z - z0) - (z1 - z0) * (x - x0);
                if (Math.abs(cross) < eps)
                    continue;
                const s = cross > 0 ? 1 : -1;
                if (sign === 0)
                    sign = s;
                else if (sign !== s)
                    return false;
            }
            return true;
        }
        locate(x, z) {
            const polys = this.polys();
            for (let p = 0; p < polys.length; ++p)
                if (this.inside(polys[p], x, z))
                    return p;
            const center = this.center;
            let best = -1;
            let best_d = Infinity;
            for (let p = 0; p < polys.length; ++p) {
                const dx = center[p * 2] - x;
                const dz = center[p * 2 + 1] - z;
                const d = dx * dx + dz * dz;
                if (d < best_d) {
                    best_d = d;
                    best = p;
                }
            }
            return best;
        }
        portal_x(k) {
            return (this.portal[k * 4] + this.portal[k * 4 + 2]) / 2;
        }
        portal_z(k) {
            return (this.portal[k * 4 + 1] + this.portal[k * 4 + 3]) / 2;
        }
        heap_push(node) {
            const i = this.heap_size++;
            this.heap[i] = node;
            this.at[node] = i;
            this.heap_up(i);
        }
        heap_up(i) {
            const heap = this.heap;
            const rank = this.rank;
            const at = this.at;
            const node = heap[i];
            const r = rank[node];
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (rank[heap[p]] <= r)
                    break;
                heap[i] = heap[p];
                at[heap[i]] = i;
                i = p;
            }
            heap[i] = node;
            at[node] = i;
        }
        heap_pop() {
            const heap = this.heap;
            const rank = this.rank;
            const at = this.at;
            const top = heap[0];
            const size = --this.heap_size;
            if (size === 0)
                return top;
            const node = heap[size];
            const r = rank[node];
            let i = 0;
            for (;;) {
                let c = i * 2 + 1;
                if (c >= size)
                    break;
                if (c + 1 < size && rank[heap[c + 1]] < rank[heap[c]])
                    ++c;
                if (rank[heap[c]] >= r)
                    break;
                heap[i] = heap[c];
                at[heap[i]] = i;
                i = c;
            }
            heap[i] = node;
            at[node] = i;
            return top;
        }
        relax(next, ng, parent, tx, tz) {
            const gen = this.gen;
            const h = Math.hypot(this.portal_x(next) - tx, this.portal_z(next) - tz);
            if (this.seen[next] === gen) {
                if (this.state[next] === 2 || this.cost[next] <= ng)
                    return;
                this.cost[next] = ng;
                this.rank[next] = ng + h;
                this.from[next] = parent;
                this.heap_up(this.at[next]);
            }
            else {
                this.seen[next] = gen;
                this.state[next] = 1;
                this.cost[next] = ng;
                this.rank[next] = ng + h;
                this.from[next] = parent;
                this.heap_push(next);
            }
        }
        path(from, to, out) {
            this.build();
            const polys = this.polys();
            if (polys.length === 0)
                return 0;
            const cap = Math.floor(out.length / 3);
            if (cap < 2)
                return 0;
            const y = this.y();
            const sx = from[0], sz = from[2];
            const tx = to[0], tz = to[2];
            const sp = this.locate(sx, sz);
            const tp = this.locate(tx, tz);
            if (sp < 0 || tp < 0)
                return 0;
            if (sp === tp) {
                out[0] = sx;
                out[1] = y;
                out[2] = sz;
                out[3] = tx;
                out[4] = y;
                out[5] = tz;
                return 2;
            }
            const gen = ++this.gen;
            const count = this.portal_count;
            const adj_start = this.adj_start;
            const adj_list = this.adj_list;
            const portal_poly = this.portal_poly;
            const goal = count;
            this.heap_size = 0;
            for (let i = adj_start[sp]; i < adj_start[sp + 1]; ++i) {
                const k = adj_list[i];
                this.relax(k, Math.hypot(this.portal_x(k) - sx, this.portal_z(k) - sz), -1, tx, tz);
            }
            let found = false;
            while (this.heap_size > 0) {
                const node = this.heap_pop();
                if (node === goal) {
                    found = true;
                    break;
                }
                this.state[node] = 2;
                const g = this.cost[node];
                const px = this.portal_x(node);
                const pz = this.portal_z(node);
                for (let side = 0; side < 2; ++side) {
                    const p = portal_poly[node * 2 + side];
                    if (p === tp) {
                        const ng = g + Math.hypot(tx - px, tz - pz);
                        if (this.seen[goal] !== gen || this.cost[goal] > ng) {
                            if (this.seen[goal] === gen) {
                                this.cost[goal] = ng;
                                this.rank[goal] = ng;
                                this.from[goal] = node;
                                this.heap_up(this.at[goal]);
                            }
                            else {
                                this.seen[goal] = gen;
                                this.state[goal] = 1;
                                this.cost[goal] = ng;
                                this.rank[goal] = ng;
                                this.from[goal] = node;
                                this.heap_push(goal);
                            }
                        }
                    }
                    for (let i = adj_start[p]; i < adj_start[p + 1]; ++i) {
                        const k = adj_list[i];
                        if (k === node)
                            continue;
                        this.relax(k, g + Math.hypot(this.portal_x(k) - px, this.portal_z(k) - pz), node, tx, tz);
                    }
                }
            }
            if (!found)
                return 0;
            const route = this.route;
            let len = 0;
            for (let node = this.from[goal]; node !== -1; node = this.from[node])
                route[len++] = node;
            const left = this.left;
            const right = this.right;
            const portal = this.portal;
            const center = this.center;
            let poly = sp;
            let cx = sx, cz = sz;
            for (let i = 0; i < len; ++i) {
                const k = route[len - 1 - i];
                const ax = portal[k * 4], az = portal[k * 4 + 1];
                const bx = portal[k * 4 + 2], bz = portal[k * 4 + 3];
                const mx = (ax + bx) / 2 - cx;
                const mz = (az + bz) / 2 - cz;
                const cross = mx * (az - cz) - mz * (ax - cx);
                if (cross > 0) {
                    left[i * 2] = ax;
                    left[i * 2 + 1] = az;
                    right[i * 2] = bx;
                    right[i * 2 + 1] = bz;
                }
                else {
                    left[i * 2] = bx;
                    left[i * 2 + 1] = bz;
                    right[i * 2] = ax;
                    right[i * 2 + 1] = az;
                }
                poly = portal_poly[k * 2] === poly ? portal_poly[k * 2 + 1] : portal_poly[k * 2];
                cx = center[poly * 2];
                cz = center[poly * 2 + 1];
            }
            left[len * 2] = tx;
            left[len * 2 + 1] = tz;
            right[len * 2] = tx;
            right[len * 2 + 1] = tz;
            return this.funnel(sx, sz, len + 1, out, cap, y);
        }
        funnel(sx, sz, count, out, cap, y) {
            const left = this.left;
            const right = this.right;
            let apex_x = sx, apex_z = sz;
            let left_x = sx, left_z = sz;
            let right_x = sx, right_z = sz;
            let apex_i = 0, left_i = 0, right_i = 0;
            out[0] = sx;
            out[1] = y;
            out[2] = sz;
            let written = 1;
            for (let i = 0; i < count && written < cap; ++i) {
                const lx = left[i * 2], lz = left[i * 2 + 1];
                const rx = right[i * 2], rz = right[i * 2 + 1];
                if (this.area(apex_x, apex_z, right_x, right_z, rx, rz) <= 0) {
                    if ((apex_x === right_x && apex_z === right_z) || this.area(apex_x, apex_z, left_x, left_z, rx, rz) > 0) {
                        right_x = rx;
                        right_z = rz;
                        right_i = i;
                    }
                    else {
                        apex_x = left_x;
                        apex_z = left_z;
                        apex_i = left_i;
                        out[written * 3] = apex_x;
                        out[written * 3 + 1] = y;
                        out[written * 3 + 2] = apex_z;
                        ++written;
                        left_x = apex_x;
                        left_z = apex_z;
                        right_x = apex_x;
                        right_z = apex_z;
                        left_i = apex_i;
                        right_i = apex_i;
                        i = apex_i;
                        continue;
                    }
                }
                if (this.area(apex_x, apex_z, left_x, left_z, lx, lz) >= 0) {
                    if ((apex_x === left_x && apex_z === left_z) || this.area(apex_x, apex_z, right_x, right_z, lx, lz) < 0) {
                        left_x = lx;
                        left_z = lz;
                        left_i = i;
                    }
                    else {
                        apex_x = right_x;
                        apex_z = right_z;
                        apex_i = right_i;
                        out[written * 3] = apex_x;
                        out[written * 3 + 1] = y;
                        out[written * 3 + 2] = apex_z;
                        ++written;
                        left_x = apex_x;
                        left_z = apex_z;
                        right_x = apex_x;
                        right_z = apex_z;
                        left_i = apex_i;
                        right_i = apex_i;
                        i = apex_i;
                        continue;
                    }
                }
            }
            if (written < cap) {
                const tx = left[(count - 1) * 2];
                const tz = left[(count - 1) * 2 + 1];
                const px = out[(written - 1) * 3];
                const pz = out[(written - 1) * 3 + 2];
                if (px !== tx || pz !== tz) {
                    out[written * 3] = tx;
                    out[written * 3 + 1] = y;
                    out[written * 3 + 2] = tz;
                    ++written;
                }
            }
            return written;
        }
        area(ax, az, bx, bz, cx, cz) {
            return (cx - ax) * (bz - az) - (bx - ax) * (cz - az);
        }
        from_tile(tile, y = 0) {
            const width = tile.width();
            const height = tile.height();
            const polys = [];
            let open = [];
            for (let row = 0; row <= height; ++row) {
                const runs = [];
                if (row < height) {
                    let x = 0;
                    while (x < width) {
                        if (tile.cell(x, row)) {
                            ++x;
                            continue;
                        }
                        const x0 = x;
                        while (x < width && !tile.cell(x, row))
                            ++x;
                        runs.push([x0, x]);
                    }
                }
                const next = [];
                for (let i = 0; i < runs.length; ++i) {
                    const [x0, x1] = runs[i];
                    let found = null;
                    for (let j = 0; j < open.length; ++j) {
                        if (open[j][0] === x0 && open[j][1] === x1)
                            found = open[j];
                    }
                    next.push(found ?? [x0, x1, row]);
                }
                for (let j = 0; j < open.length; ++j) {
                    if (next.includes(open[j]))
                        continue;
                    const [x0, x1, z0] = open[j];
                    polys.push(new Float32Array([x0, z0, x1, z0, x1, row, x0, row]));
                }
                open = next;
            }
            this.y(y);
            this.polys(polys);
            this.build();
            return this;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_mesh.prototype, "polys", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_mesh.prototype, "y", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_mesh.prototype, "build", null);
    $.$bog_gamengine_nav_mesh = $bog_gamengine_nav_mesh;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_nav_agent extends $bog_gamengine_node {
        grid(next) {
            return next ?? null;
        }
        mesh(next) {
            return next ?? null;
        }
        speed(next = 3) {
            return next;
        }
        radius(next = 0.4) {
            return next;
        }
        replan(next = 0.5) {
            return next;
        }
        others(next) {
            return next ?? [];
        }
        goal = new Float32Array(3);
        goal_on = false;
        target(next) {
            if (next !== undefined) {
                if (next)
                    this.aim(next[0], next[1], next.length > 2 ? next[2] : 0);
                else
                    this.stop();
            }
            return this.goal_on ? this.goal : null;
        }
        aim(x, y, z = 0) {
            this.goal[0] = x;
            this.goal[1] = y;
            this.goal[2] = z;
            this.goal_on = true;
            this.since = Infinity;
            return this.goal;
        }
        stop() {
            this.goal_on = false;
            this.count = 0;
            this.index = 0;
        }
        route = new Float32Array(0);
        stride = 2;
        count = 0;
        index = 0;
        since = Infinity;
        vel = new Float32Array(3);
        path_count() {
            return this.count;
        }
        plan(pos, target) {
            const grid = this.grid();
            const mesh = this.mesh();
            if (grid) {
                const need = grid.width() * grid.height() * 2 + 4;
                if (this.route.length < need)
                    this.route = new Float32Array(need);
                this.stride = 2;
                this.count = grid.smooth(this.route, grid.path(pos, target, this.route), this.route);
            }
            else if (mesh) {
                mesh.build();
                const need = (mesh.portal_count + 2) * 3;
                if (this.route.length < need)
                    this.route = new Float32Array(need);
                this.stride = 3;
                this.count = mesh.path(pos, target, this.route);
            }
            else {
                this.count = 0;
            }
            this.index = this.count > 1 ? 1 : 0;
            this.since = 0;
        }
        step(dt) {
            const target = this.target();
            if (!target)
                return;
            const pos = this.pos();
            const radius = this.radius();
            const speed = this.speed();
            this.since += dt;
            if (this.since >= this.replan())
                this.plan(pos, target);
            const route = this.route;
            const stride = this.stride;
            const vel = this.vel;
            vel[0] = 0;
            vel[1] = 0;
            vel[2] = 0;
            while (this.index < this.count) {
                const base = this.index * stride;
                const dx = route[base] - pos[0];
                const dy = route[base + 1] - pos[1];
                const dz = stride === 3 ? route[base + 2] - pos[2] : 0;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < radius) {
                    ++this.index;
                    continue;
                }
                vel[0] = dx / dist * speed;
                vel[1] = dy / dist * speed;
                vel[2] = dz / dist * speed;
                break;
            }
            const others = this.others();
            for (let i = 0; i < others.length; ++i) {
                const other = others[i];
                if (other === this)
                    continue;
                const op = other.pos();
                const dx = pos[0] - op[0];
                const dy = pos[1] - op[1];
                const dz = pos[2] - op[2];
                const reach = radius + other.radius();
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist >= reach || dist === 0)
                    continue;
                const k = (reach - dist) / reach * speed / dist;
                vel[0] += dx * k;
                vel[1] += dy * k;
                vel[2] += dz * k;
            }
            const len = Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1] + vel[2] * vel[2]);
            if (len === 0)
                return;
            const k = len > speed ? speed / len : 1;
            const next = new Float32Array(3);
            next[0] = pos[0] + vel[0] * k * dt;
            next[1] = pos[1] + vel[1] * k * dt;
            next[2] = pos[2] + vel[2] * k * dt;
            this.pos(next);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_agent.prototype, "grid", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_agent.prototype, "mesh", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_agent.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_agent.prototype, "radius", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_agent.prototype, "replan", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_nav_agent.prototype, "others", null);
    $.$bog_gamengine_nav_agent = $bog_gamengine_nav_agent;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_particle_pool extends $mol_object2 {
        cap(next = 1000) {
            return next;
        }
        count = 0;
        pos = new Float32Array(0);
        vel = new Float32Array(0);
        age = new Float32Array(0);
        life = new Float32Array(0);
        size = new Float32Array(0);
        seed = new Float32Array(0);
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        aabb = new Float32Array(0);
        fit() {
            const cap = this.cap();
            if (this.age.length === cap)
                return cap;
            this.pos = new Float32Array(cap * 3);
            this.vel = new Float32Array(cap * 3);
            this.age = new Float32Array(cap);
            this.life = new Float32Array(cap);
            this.size = new Float32Array(cap);
            this.seed = new Float32Array(cap);
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.aabb = new Float32Array(cap * 6);
            const uv = this.uv;
            for (let i = 0; i < cap; ++i) {
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
            }
            this.count = 0;
            return cap;
        }
        kill(index) {
            const last = --this.count;
            if (index === last)
                return;
            this.pos.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.vel.copyWithin(index * 3, last * 3, last * 3 + 3);
            this.age[index] = this.age[last];
            this.life[index] = this.life[last];
            this.size[index] = this.size[last];
            this.seed[index] = this.seed[last];
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle_pool.prototype, "cap", null);
    $.$bog_gamengine_particle_pool = $bog_gamengine_particle_pool;
    class $bog_gamengine_particle extends $bog_gamengine_node {
        pool(next) {
            return next ?? new $bog_gamengine_particle_pool;
        }
        atlas(next) {
            return next ?? null;
        }
        is_source() {
            return true;
        }
        source() {
            return this.pool();
        }
        rate(next = 0) {
            return next;
        }
        life(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        speed(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        spread(next = 0) {
            return next;
        }
        dir(next) {
            return next ? $bog_gamengine_node_vec(next) : null;
        }
        gravity(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0, 0]);
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        color(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1, 1, 1, 1, 1, 1]);
        }
        frame(next = '') {
            return next;
        }
        frames(next) {
            return next ?? [];
        }
        world_space(next = true) {
            return next;
        }
        seed(next = 1) {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'rate', kind: 'number', get: () => this.rate(), set: next => this.rate(next) },
                { name: 'life', kind: 'vec2', get: () => this.life(), set: next => this.life(next) },
                { name: 'speed', kind: 'vec2', get: () => this.speed(), set: next => this.speed(next) },
                { name: 'spread', kind: 'number', get: () => this.spread(), set: next => this.spread(next) },
                { name: 'gravity', kind: 'vec3', get: () => this.gravity(), set: next => this.gravity(next) },
                { name: 'size', kind: 'vec2', get: () => this.size(), set: next => this.size(next) },
                { name: 'frame', kind: 'frame', get: () => this.frame(), set: next => this.frame(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
                { name: 'world_space', kind: 'flag', get: () => this.world_space(), set: next => this.world_space(next) },
            ];
        }
        layers() {
            const atlas = this.atlas();
            const frames = this.frames();
            const frame = this.frame();
            const list = new Float32Array(Math.max(1, frames.length));
            if (!atlas)
                return list;
            if (frames.length) {
                for (let i = 0; i < frames.length; ++i)
                    list[i] = atlas.layer(frames[i]);
            }
            else if (frame) {
                list[0] = atlas.layer(frame);
            }
            return list;
        }
        rand_state = 0;
        rand_seed = NaN;
        accum = 0;
        origin = new Float32Array(3);
        axis = new Float32Array(3);
        side = new Float32Array(3);
        up = new Float32Array(3);
        basis = new Float32Array(9);
        local = new Float32Array(16);
        rand() {
            const seed = this.seed();
            if (seed !== this.rand_seed) {
                this.rand_seed = seed;
                this.rand_state = seed | 0;
            }
            let t = this.rand_state = (this.rand_state + 0x6D2B79F5) | 0;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        }
        frame_of(world) {
            const axis = this.axis;
            const dir = this.dir();
            if (this.world_space()) {
                if (dir) {
                    axis[0] = world[0] * dir[0] + world[4] * dir[1] + world[8] * dir[2];
                    axis[1] = world[1] * dir[0] + world[5] * dir[1] + world[9] * dir[2];
                    axis[2] = world[2] * dir[0] + world[6] * dir[1] + world[10] * dir[2];
                }
                else {
                    axis[0] = -world[8];
                    axis[1] = -world[9];
                    axis[2] = -world[10];
                }
            }
            else if (dir) {
                axis[0] = dir[0];
                axis[1] = dir[1];
                axis[2] = dir[2];
            }
            else {
                axis[0] = 0;
                axis[1] = 0;
                axis[2] = -1;
            }
            $bog_gamengine_vec_norm(axis, axis);
            const side = this.side;
            const up = this.up;
            const ax = Math.abs(axis[0]);
            up[0] = ax < 0.9 ? 1 : 0;
            up[1] = ax < 0.9 ? 0 : 1;
            up[2] = 0;
            $bog_gamengine_vec_cross(side, up, axis);
            $bog_gamengine_vec_norm(side, side);
            $bog_gamengine_vec_cross(up, axis, side);
        }
        spawn(n, at = null) {
            const pool = this.pool();
            const cap = pool.fit();
            const world = this.world();
            const origin = this.origin;
            if (at) {
                origin[0] = at[0];
                origin[1] = at[1];
                origin[2] = at[2];
            }
            else if (this.world_space()) {
                origin[0] = world[12];
                origin[1] = world[13];
                origin[2] = world[14];
            }
            else {
                origin[0] = 0;
                origin[1] = 0;
                origin[2] = 0;
            }
            this.frame_of(world);
            const axis = this.axis;
            const side = this.side;
            const up = this.up;
            const life = this.life();
            const speed = this.speed();
            const size = this.size();
            const cos_min = Math.cos(Math.min(Math.PI, this.spread()));
            const pos = pool.pos;
            const vel = pool.vel;
            const seed = pool.seed;
            let count = pool.count;
            for (let k = 0; k < n && count < cap; ++k) {
                const i = count++;
                const phi = this.rand() * Math.PI * 2;
                const cos = cos_min + (1 - cos_min) * this.rand();
                const sin = Math.sqrt(Math.max(0, 1 - cos * cos));
                const v = speed[0] + (speed[1] - speed[0]) * this.rand();
                const sx = Math.cos(phi) * sin;
                const sy = Math.sin(phi) * sin;
                pos[i * 3] = origin[0];
                pos[i * 3 + 1] = origin[1];
                pos[i * 3 + 2] = origin[2];
                vel[i * 3] = (axis[0] * cos + side[0] * sx + up[0] * sy) * v;
                vel[i * 3 + 1] = (axis[1] * cos + side[1] * sx + up[1] * sy) * v;
                vel[i * 3 + 2] = (axis[2] * cos + side[2] * sx + up[2] * sy) * v;
                pool.age[i] = 0;
                pool.life[i] = life[0] + (life[1] - life[0]) * this.rand();
                pool.size[i] = size[0];
                seed[i] = this.rand();
            }
            pool.count = count;
            return count;
        }
        burst(n, at = null) {
            this.spawn(n, at);
            this.emit();
            return this.pool().count;
        }
        integrate(dt) {
            const pool = this.pool();
            const gravity = this.gravity();
            const gx = gravity[0] * dt;
            const gy = gravity[1] * dt;
            const gz = gravity[2] * dt;
            const pos = pool.pos;
            const vel = pool.vel;
            const age = pool.age;
            const life = pool.life;
            for (let i = 0; i < pool.count; ++i) {
                age[i] += dt;
                if (age[i] >= life[i]) {
                    pool.kill(i);
                    --i;
                    continue;
                }
                vel[i * 3] += gx;
                vel[i * 3 + 1] += gy;
                vel[i * 3 + 2] += gz;
                pos[i * 3] += vel[i * 3] * dt;
                pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
                pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
            }
        }
        emit() {
            const pool = this.pool();
            const world_space = this.world_space();
            const world = this.world();
            const size = this.size();
            const color = this.color();
            const layers = this.layers();
            const basis = this.basis;
            const cam = this.billboard() ? this.scene()?.cam() ?? null : null;
            if (cam) {
                const view = cam.world();
                for (let c = 0; c < 3; ++c) {
                    const x = view[c * 4];
                    const y = view[c * 4 + 1];
                    const z = view[c * 4 + 2];
                    const k = 1 / (Math.sqrt(x * x + y * y + z * z) || 1);
                    basis[c * 3] = x * k;
                    basis[c * 3 + 1] = y * k;
                    basis[c * 3 + 2] = z * k;
                }
            }
            else {
                basis.fill(0);
                basis[0] = 1;
                basis[4] = 1;
                basis[8] = 1;
            }
            const local = this.local;
            const scale_world = world_space ? 1 : $bog_gamengine_batch_scale_max(world);
            const trans = pool.trans;
            const tint = pool.tint;
            const layer = pool.layer;
            const aabb = pool.aabb;
            const pos = pool.pos;
            const age = pool.age;
            const life = pool.life;
            const sizes = pool.size;
            const last = layers.length - 1;
            for (let i = 0; i < pool.count; ++i) {
                const t = life[i] > 0 ? Math.min(1, age[i] / life[i]) : 1;
                const s = size[0] + (size[1] - size[0]) * t;
                sizes[i] = s;
                for (let k = 0; k < 4; ++k)
                    tint[i * 4 + k] = color[k] + (color[4 + k] - color[k]) * t;
                layer[i] = layers[Math.min(last, Math.floor(t * layers.length))];
                const out = world_space ? trans : local;
                const at = world_space ? i * 16 : 0;
                for (let c = 0; c < 3; ++c) {
                    out[at + c * 4] = basis[c * 3] * s;
                    out[at + c * 4 + 1] = basis[c * 3 + 1] * s;
                    out[at + c * 4 + 2] = basis[c * 3 + 2] * s;
                    out[at + c * 4 + 3] = 0;
                }
                out[at + 12] = pos[i * 3];
                out[at + 13] = pos[i * 3 + 1];
                out[at + 14] = pos[i * 3 + 2];
                out[at + 15] = 1;
                if (!world_space)
                    $bog_gamengine_particle_mat_mul(trans, i * 16, world, local);
                const r = s * scale_world * Math.SQRT1_2;
                const x = trans[i * 16 + 12];
                const y = trans[i * 16 + 13];
                const z = trans[i * 16 + 14];
                aabb[i * 6] = x - r;
                aabb[i * 6 + 1] = y - r;
                aabb[i * 6 + 2] = z - r;
                aabb[i * 6 + 3] = x + r;
                aabb[i * 6 + 4] = y + r;
                aabb[i * 6 + 5] = z + r;
            }
        }
        step(dt) {
            const pool = this.pool();
            pool.fit();
            this.accum += this.rate() * dt;
            const born = Math.floor(this.accum);
            if (born > 0) {
                this.accum -= born;
                this.spawn(born);
            }
            this.integrate(dt);
            this.emit();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "pool", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "rate", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "life", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "spread", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "dir", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "gravity", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "color", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "frames", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "world_space", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "seed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_particle.prototype, "layers", null);
    $.$bog_gamengine_particle = $bog_gamengine_particle;
    function $bog_gamengine_particle_mat_mul(out, at, a, b) {
        for (let c = 0; c < 4; ++c) {
            const b0 = b[c * 4];
            const b1 = b[c * 4 + 1];
            const b2 = b[c * 4 + 2];
            const b3 = b[c * 4 + 3];
            for (let r = 0; r < 4; ++r) {
                out[at + c * 4 + r] = a[r] * b0 + a[4 + r] * b1 + a[8 + r] * b2 + a[12 + r] * b3;
            }
        }
        return out;
    }
    $.$bog_gamengine_particle_mat_mul = $bog_gamengine_particle_mat_mul;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_demo_flat_coin extends $bog_gamengine_phys_body {
        size(next) {
            return next ?? new Float32Array([0.6, 0.6]);
        }
        ghost() {
            return true;
        }
        still() {
            return true;
        }
        sound(next) {
            return next ?? null;
        }
        emitter(next) {
            return next ?? null;
        }
        taken(next = false) {
            if (next) {
                this.sound()?.play('coin');
                const emitter = this.emitter();
                const pos = this.pos();
                if (emitter)
                    new this.$.$mol_after_tick(() => emitter.burst(20, pos));
            }
            return next;
        }
        hit(other) {
            if (other instanceof $bog_gamengine_demo_flat_hero && !this.taken())
                this.taken(true);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_coin.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_coin.prototype, "sound", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_coin.prototype, "emitter", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_flat_coin.prototype, "taken", null);
    $.$bog_gamengine_demo_flat_coin = $bog_gamengine_demo_flat_coin;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$bog_gamengine_text_font_chars = ' !"#%&\'()*+,-./0123456789:;<=>?@'
        + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_'
        + 'abcdefghijklmnopqrstuvwxyz{|}~'
        + 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
        + 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    function $bog_gamengine_text_font_render(context, family, size, chars) {
        const advance = new Map();
        const sources = [];
        const view = context;
        if (!view.document || !view.CanvasRenderingContext2D)
            return { sources, advance };
        const canvas = view.document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const paint = canvas.getContext('2d', { willReadFrequently: true });
        if (!paint)
            return { sources, advance };
        paint.font = `${Math.round(size * 0.75)}px ${family}`;
        paint.textAlign = 'center';
        paint.textBaseline = 'middle';
        paint.fillStyle = '#ffffff';
        for (let i = 0; i < chars.length; ++i) {
            const char = chars[i];
            advance.set(char, paint.measureText(char).width / size);
            if (char === ' ')
                continue;
            paint.clearRect(0, 0, size, size);
            paint.fillText(char, size / 2, size / 2);
            sources.push({ name: char, image: paint.getImageData(0, 0, size, size) });
        }
        return { sources, advance };
    }
    $.$bog_gamengine_text_font_render = $bog_gamengine_text_font_render;
    class $bog_gamengine_text_font extends $mol_object2 {
        family(next = 'sans-serif') {
            return next;
        }
        size(next = 64) {
            return next;
        }
        chars(next = $.$bog_gamengine_text_font_chars) {
            return next;
        }
        static glyphs(key) {
            $mol_wire_solid();
            const at = key.indexOf('\n');
            const to = key.indexOf('\n', at + 1);
            return $bog_gamengine_text_font_render(this.$.$mol_dom_context, key.slice(0, at), Number(key.slice(at + 1, to)), key.slice(to + 1));
        }
        glyphs() {
            const cls = this.constructor;
            return cls.glyphs(`${this.family()}\n${this.size()}\n${this.chars()}`);
        }
        sources() {
            return this.glyphs().sources;
        }
        advance(char) {
            return this.glyphs().advance.get(char) ?? 0.6;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_text_font.prototype, "family", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text_font.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text_font.prototype, "chars", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_text_font, "glyphs", null);
    $.$bog_gamengine_text_font = $bog_gamengine_text_font;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_text_pool extends $mol_object2 {
        cap = 0;
        count = 0;
        version = 0;
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
        aabb = new Float32Array(0);
        fit(need) {
            if (need <= this.cap)
                return this.cap;
            let cap = Math.max(this.cap, 16);
            while (cap < need)
                cap *= 2;
            this.cap = cap;
            this.trans = new Float32Array(cap * 16);
            this.tint = new Float32Array(cap * 4);
            this.layer = new Float32Array(cap);
            this.uv = new Float32Array(cap * 4);
            this.aabb = new Float32Array(cap * 6);
            const uv = this.uv;
            for (let i = 0; i < cap; ++i) {
                uv[i * 4 + 2] = 1;
                uv[i * 4 + 3] = 1;
            }
            return cap;
        }
    }
    $.$bog_gamengine_text_pool = $bog_gamengine_text_pool;
    class $bog_gamengine_text extends $bog_gamengine_node {
        pool_own(next) {
            return next ?? new $bog_gamengine_text_pool;
        }
        pool() {
            this.emit();
            return this.pool_own();
        }
        is_source() {
            return true;
        }
        source() {
            return this.pool();
        }
        font(next) {
            return next ?? new $bog_gamengine_text_font;
        }
        atlas(next) {
            return next ?? null;
        }
        value(next = '') {
            return next;
        }
        height(next = 0.5) {
            return next;
        }
        align(next) {
            return next ?? 'left';
        }
        color(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1, 1]);
        }
        props() {
            return [
                ...super.props(),
                { name: 'value', kind: 'text', get: () => this.value(), set: next => this.value(next) },
                { name: 'height', kind: 'number', get: () => this.height(), set: next => this.height(next) },
                { name: 'align', kind: 'text', get: () => this.align(), set: next => this.align(next) },
                { name: 'color', kind: 'vec4', get: () => this.color(), set: next => this.color(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
            ];
        }
        width() {
            const value = this.value();
            const font = this.font();
            let total = 0;
            for (let i = 0; i < value.length; ++i)
                total += font.advance(value[i]);
            return total * this.height();
        }
        axes = new Float32Array(16);
        done_world = new Float32Array(16);
        done_color = new Float32Array(4);
        done_value = null;
        done_height = NaN;
        done_align = '';
        fresh(value, axes, height, align, color) {
            let same = value === this.done_value && height === this.done_height && align === this.done_align;
            const done_world = this.done_world;
            for (let i = 0; i < 16; ++i) {
                if (axes[i] !== done_world[i])
                    same = false;
                done_world[i] = axes[i];
            }
            const done_color = this.done_color;
            for (let i = 0; i < 4; ++i) {
                if (color[i] !== done_color[i])
                    same = false;
                done_color[i] = color[i];
            }
            this.done_value = value;
            this.done_height = height;
            this.done_align = align;
            return same;
        }
        emit() {
            const pool = this.pool_own();
            const value = this.value();
            const world = this.world();
            const height = this.height();
            const align = this.align();
            const color = this.color();
            const billboard = this.billboard();
            const cam = billboard ? this.scene()?.cam() ?? null : null;
            const axes = this.axes;
            if (cam) {
                const view = cam.world();
                for (let c = 0; c < 3; ++c) {
                    const x = view[c * 4];
                    const y = view[c * 4 + 1];
                    const z = view[c * 4 + 2];
                    const k = 1 / (Math.sqrt(x * x + y * y + z * z) || 1);
                    axes[c * 4] = x * k;
                    axes[c * 4 + 1] = y * k;
                    axes[c * 4 + 2] = z * k;
                    axes[c * 4 + 3] = 0;
                }
                axes[12] = world[12];
                axes[13] = world[13];
                axes[14] = world[14];
                axes[15] = 1;
            }
            else {
                for (let k = 0; k < 16; ++k)
                    axes[k] = world[k];
            }
            if (this.fresh(value, axes, height, align, color))
                return pool.count;
            ++pool.version;
            pool.fit(value.length);
            const font = this.font();
            const names = this.atlas()?.names() ?? null;
            const unknown = names?.get('?') ?? 0;
            const trans = pool.trans;
            const tint = pool.tint;
            const layer = pool.layer;
            const aabb = pool.aabb;
            const radius = height * $bog_gamengine_batch_scale_max(axes) * Math.SQRT1_2;
            let total = 0;
            for (let i = 0; i < value.length; ++i)
                total += font.advance(value[i]);
            let pen = align === 'center' ? -total * height / 2 : align === 'right' ? -total * height : 0;
            let count = 0;
            for (let i = 0; i < value.length; ++i) {
                const char = value[i];
                const step = font.advance(char) * height;
                const dx = pen + step / 2;
                pen += step;
                if (char === ' ')
                    continue;
                const at = count * 16;
                for (let r = 0; r < 4; ++r) {
                    trans[at + r] = axes[r] * height;
                    trans[at + 4 + r] = axes[4 + r] * height;
                    trans[at + 8 + r] = axes[8 + r];
                    trans[at + 12 + r] = axes[12 + r] + axes[r] * dx;
                }
                for (let k = 0; k < 4; ++k)
                    tint[count * 4 + k] = color[k];
                layer[count] = names ? names.get(char) ?? unknown : 0;
                const x = trans[at + 12];
                const y = trans[at + 13];
                const z = trans[at + 14];
                aabb[count * 6] = x - radius;
                aabb[count * 6 + 1] = y - radius;
                aabb[count * 6 + 2] = z - radius;
                aabb[count * 6 + 3] = x + radius;
                aabb[count * 6 + 4] = y + radius;
                aabb[count * 6 + 5] = z + radius;
                ++count;
            }
            pool.count = count;
            return count;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "pool_own", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "pool", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "font", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "height", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "align", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_text.prototype, "color", null);
    $.$bog_gamengine_text = $bog_gamengine_text;
})($ || ($ = {}));

;
	($.$bog_gamengine_demo_flat) = class $bog_gamengine_demo_flat extends ($.$mol_page) {
		coins_stat(){
			return "";
		}
		Coins(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Монеты");
			(obj.content) = () => ([(this.coins_stat())]);
			return obj;
		}
		screen_shown(next){
			if(next !== undefined) return next;
			return false;
		}
		Screen_switch(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Кнопки");
			(obj.checked) = (next) => ((this.screen_shown(next)));
			return obj;
		}
		stat(){
			return (this.Draw().stat());
		}
		draw_width(){
			return (this.Draw().width());
		}
		draw_height(){
			return (this.Draw().height());
		}
		draw_dpr(){
			return (this.Draw().dpr());
		}
		pointer_down(next){
			if(next !== undefined) return next;
			return null;
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.Cam()));
			(obj.event) = () => ({"pointerdown": (next) => (this.pointer_down(next))});
			return obj;
		}
		label_left(){
			return "0px";
		}
		label_top(){
			return "0px";
		}
		Hero_label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => (["Герой"]);
			(obj.style) = () => ({"left": (this.label_left()), "top": (this.label_top())});
			return obj;
		}
		Screen(){
			const obj = new this.$.$bog_gamengine_input_screen();
			(obj.shown) = (next) => ((this.screen_shown(next)));
			return obj;
		}
		Stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.stat())]);
			return obj;
		}
		hero_stat(){
			return "";
		}
		Hero_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.hero_stat())]);
			return obj;
		}
		ghost_stat(){
			return "";
		}
		Ghost_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.ghost_stat())]);
			return obj;
		}
		nodes_stat(){
			return "";
		}
		Nodes_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.nodes_stat())]);
			return obj;
		}
		nodes(){
			return [];
		}
		bodies(){
			return [];
		}
		Phys(){
			const obj = new this.$.$bog_gamengine_phys();
			(obj.bodies) = () => ((this.bodies()));
			(obj.tile) = () => ((this.Tile()));
			return obj;
		}
		cam_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		palette(){
			return {};
		}
		hero_pos(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		hero_face_left(next){
			return (this.Hero().face_left(next));
		}
		hero_clip(next){
			return (this.Hero().clip(next));
		}
		ghost_pos(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		ghost_tint(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		coin_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		coin_taken(id, next){
			return (this.Coin(id).taken(next));
		}
		font_sources(){
			return [];
		}
		coin_text_color(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		coin_text_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		title(){
			return "Плоский мир";
		}
		tools(){
			return [(this.Coins()), (this.Screen_switch())];
		}
		body(){
			return [
				(this.Draw()), 
				(this.Hero_label()), 
				(this.Screen())
			];
		}
		foot(){
			return [
				(this.Stat()), 
				(this.Hero_stat()), 
				(this.Ghost_stat()), 
				(this.Nodes_stat())
			];
		}
		Input(){
			const obj = new this.$.$bog_gamengine_input();
			(obj.key) = () => ((this.Key()));
			(obj.screen) = () => ((this.Screen()));
			return obj;
		}
		Key(){
			const obj = new this.$.$bog_gamengine_key();
			(obj.bind) = () => ({
				"left": ["A", "left"], 
				"right": ["D", "right"], 
				"up": ["W", "up"], 
				"down": ["S", "down"]
			});
			return obj;
		}
		map(){
			return "####################\n#..................#\n#..####............#\n#..#...............#\n#..#....######.....#\n#..#.........#.....#\n#............#.....#\n#......###...#.....#\n#............#.....#\n#.....#............#\n#.....#............#\n#.....#.....####...#\n#..................#\n#..................#\n####################";
		}
		Tile(){
			const obj = new this.$.$bog_gamengine_phys_tile();
			(obj.map) = () => ((this.map()));
			return obj;
		}
		Atlas(){
			const obj = new this.$.$bog_gamengine_atlas();
			(obj.uris) = () => ([
				"bog/gamengine/demo/atlas/hero.png", 
				"bog/gamengine/demo/atlas/hero_1.png", 
				"bog/gamengine/demo/atlas/hero_2.png", 
				"bog/gamengine/demo/atlas/coin.png", 
				"bog/gamengine/demo/atlas/wall.png", 
				"bog/gamengine/demo/atlas/floor.png"
			]);
			(obj.size) = () => (64);
			return obj;
		}
		Point(){
			const obj = new this.$.$bog_gamengine_point();
			(obj.cam) = () => ((this.Cam()));
			(obj.width) = () => ((this.draw_width()));
			(obj.height) = () => ((this.draw_height()));
			(obj.scale) = () => ((this.draw_dpr()));
			return obj;
		}
		Sound(){
			const obj = new this.$.$bog_gamengine_sound();
			(obj.uris) = () => ({"coin": "bog/gamengine/demo/sound/coin.wav"});
			return obj;
		}
		Clock(){
			const obj = new this.$.$bog_gamengine_clock();
			return obj;
		}
		Scene(){
			const obj = new this.$.$bog_gamengine_scene();
			(obj.clock) = () => ((this.Clock()));
			(obj.input) = () => ((this.Input()));
			(obj.kids) = () => ((this.nodes()));
			(obj.phys) = () => ((this.Phys()));
			return obj;
		}
		Cam(){
			const obj = new this.$.$bog_gamengine_cam_flat();
			(obj.height) = () => (15);
			(obj.pos) = () => ((this.cam_pos()));
			return obj;
		}
		Tilemap(){
			const obj = new this.$.$bog_gamengine_tilemap();
			(obj.tile) = () => ((this.Tile()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.palette) = () => ((this.palette()));
			return obj;
		}
		Hero(){
			const obj = new this.$.$bog_gamengine_demo_flat_hero();
			(obj.input) = () => ((this.Input()));
			(obj.pos) = (next) => ((this.hero_pos(next)));
			return obj;
		}
		Hero_sprite(){
			const obj = new this.$.$bog_gamengine_sprite();
			(obj.parent) = () => ((this.Hero()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("hero");
			(obj.flip_x) = () => ((this.hero_face_left()));
			(obj.clock) = () => ((this.Clock()));
			(obj.clip) = () => ((this.hero_clip()));
			(obj.fps) = () => (6);
			(obj.clips) = () => ({"walk": [
				"hero", 
				"hero_1", 
				"hero_2", 
				"hero_1"
			]});
			return obj;
		}
		Grid(){
			const obj = new this.$.$bog_gamengine_nav_grid();
			(obj.tile) = () => ((this.Tile()));
			return obj;
		}
		Ghost(){
			const obj = new this.$.$bog_gamengine_nav_agent();
			(obj.grid) = () => ((this.Grid()));
			(obj.target) = () => ((this.hero_pos()));
			(obj.pos) = (next) => ((this.ghost_pos(next)));
			return obj;
		}
		Ghost_sprite(){
			const obj = new this.$.$bog_gamengine_sprite();
			(obj.parent) = () => ((this.Ghost()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("coin");
			(obj.tint) = () => ((this.ghost_tint()));
			return obj;
		}
		Coin(id){
			const obj = new this.$.$bog_gamengine_demo_flat_coin();
			(obj.sound) = () => ((this.Sound()));
			(obj.pos) = () => ((this.coin_pos(id)));
			return obj;
		}
		Coin_sprite(id){
			const obj = new this.$.$bog_gamengine_sprite();
			(obj.parent) = () => ((this.Coin(id)));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("coin");
			return obj;
		}
		Font(){
			const obj = new this.$.$bog_gamengine_text_font();
			(obj.size) = () => (64);
			(obj.chars) = () => ("+1");
			return obj;
		}
		Font_atlas(){
			const obj = new this.$.$bog_gamengine_atlas();
			(obj.size) = () => (64);
			(obj.sources) = () => ((this.font_sources()));
			return obj;
		}
		Coin_text(id){
			const obj = new this.$.$bog_gamengine_text();
			(obj.font) = () => ((this.Font()));
			(obj.atlas) = () => ((this.Font_atlas()));
			(obj.value) = () => ("+1");
			(obj.height) = () => (0.4);
			(obj.align) = () => ("center");
			(obj.color) = () => ((this.coin_text_color()));
			(obj.pos) = () => ((this.coin_text_pos(id)));
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Coins"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "screen_shown"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Screen_switch"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "pointer_down"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero_label"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Screen"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero_stat"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Ghost_stat"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Nodes_stat"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Phys"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "cam_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "hero_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "ghost_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "ghost_tint"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "coin_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "coin_text_color"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "coin_text_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Input"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Key"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Tile"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Atlas"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Point"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Sound"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Cam"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Tilemap"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero_sprite"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Grid"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Ghost"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Ghost_sprite"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "Coin"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "Coin_sprite"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Font"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Font_atlas"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "Coin_text"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_demo_flat extends $.$bog_gamengine_demo_flat {
            cam_pos() {
                return new Float32Array([this.Tile().width() / 2, -this.Tile().height() / 2, 0]);
            }
            palette() {
                return { '#': 'wall', '.': 'floor' };
            }
            hero_pos(next) {
                return next ?? new Float32Array([1.5, -1.5, 0]);
            }
            coin_cells() {
                return [[18, 1], [8, 5], [10, 13]];
            }
            coin_pos(id) {
                const [x, y] = this.coin_cells()[Number(id)];
                return this.Tile().cell_pos(x, y, new Float32Array(3));
            }
            coin_ids() {
                return this.coin_cells().map((cell, i) => String(i));
            }
            coins_left() {
                return this.coin_ids().filter(id => !this.coin_taken(id));
            }
            coins() {
                return this.coins_left().map(id => this.Coin(id));
            }
            coin_sprites() {
                return this.coins_left().map(id => this.Coin_sprite(id));
            }
            bodies() {
                return [this.Hero(), ...this.coins()];
            }
            sprites() {
                return [...this.coin_sprites(), this.Ghost_sprite(), this.Hero_sprite()];
            }
            font_sources() {
                return this.Font().sources();
            }
            coin_text_pos(id) {
                const pos = this.coin_pos(id);
                return new Float32Array([pos[0], pos[1] + 0.6, pos[2]]);
            }
            coin_text_color() {
                return new Float32Array([1, 0.92, 0.35, 1]);
            }
            coin_texts() {
                return this.coins_left().map(id => this.Coin_text(id));
            }
            nodes() {
                return [this.Tilemap(), ...this.bodies(), this.Ghost(), ...this.sprites(), ...this.coin_texts()];
            }
            nodes_stat() {
                return `nodes ${this.Scene().nodes().length}`;
            }
            ghost_pos(next) {
                return next ?? new Float32Array([18.5, -13.5, 0]);
            }
            ghost_tint() {
                return new Float32Array([0.7, 0.4, 1, 1]);
            }
            ghost_stat() {
                if (!this.Atlas().ready())
                    return '';
                const pos = this.ghost_pos();
                return `ghost ${pos[0].toFixed(2)} × ${pos[1].toFixed(2)} | path ${this.Ghost().path_count()}`;
            }
            pointer_down(event) {
                if (!event)
                    return null;
                const x = event.offsetX;
                const y = event.offsetY;
                const point = this.Point();
                point.move(x, y);
                const coin = point.pick(this.coins(), x, y);
                if (coin instanceof $bog_gamengine_demo_flat_coin)
                    coin.taken(true);
                return event;
            }
            label_world = new Float32Array(3);
            label_screen = new Float32Array(3);
            label_pos() {
                this.Scene().step();
                const pos = this.hero_pos();
                const world = this.label_world;
                world[0] = pos[0];
                world[1] = pos[1] + 0.5;
                world[2] = pos[2];
                const screen = this.Point().screen(this.label_screen, world);
                const draw = this.Draw().view_rect();
                const node = this.Hero_label().dom_node();
                const page = node.offsetParent?.getBoundingClientRect();
                const dx = (draw?.left ?? 0) - (page?.left ?? 0);
                const dy = (draw?.top ?? 0) - (page?.top ?? 0);
                return [screen[0] + dx, screen[1] + dy];
            }
            label_left() {
                return `${this.label_pos()[0].toFixed(1)}px`;
            }
            label_top() {
                return `${this.label_pos()[1].toFixed(1)}px`;
            }
            coins_stat() {
                const all = this.coin_ids().length;
                return `${all - this.coins_left().length} / ${all}`;
            }
            hero_stat() {
                if (!this.Atlas().ready())
                    return '';
                const pos = this.hero_pos();
                return `hero ${pos[0].toFixed(2)} × ${pos[1].toFixed(2)} | frame ${this.Hero_sprite().frame_now()}`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "cam_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "palette", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "hero_pos", null);
        __decorate([
            $mol_mem_key
        ], $bog_gamengine_demo_flat.prototype, "coin_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "coin_ids", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "coins_left", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "coins", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "coin_sprites", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "bodies", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "sprites", null);
        __decorate([
            $mol_mem_key
        ], $bog_gamengine_demo_flat.prototype, "coin_text_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "coin_text_color", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "coin_texts", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "nodes", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "ghost_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "ghost_tint", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "label_pos", null);
        $$.$bog_gamengine_demo_flat = $bog_gamengine_demo_flat;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_demo_flat, {
            flex: {
                grow: 1,
            },
            '>': {
                $mol_scroll: {
                    '>': {
                        $mol_view: {
                            alignSelf: 'stretch',
                        },
                    },
                },
            },
            Hero_label: {
                position: 'absolute',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                transform: 'translate(-50%, -100%)',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const faces = [
        [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
        [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
        [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
        [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
        [[0, 1, 0], [1, 0, 0], [0, 0, -1]],
        [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    ];
    const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
    const strip = [];
    for (let face = 0; face < faces.length; ++face) {
        if (face > 0)
            strip.push([face, 0]);
        for (let corner = 0; corner < corners.length; ++corner)
            strip.push([face, corner]);
        if (face < faces.length - 1)
            strip.push([face, 3]);
    }
    class $bog_gamengine_shape_box extends $bog_gamengine_shape {
        geometry() {
            const geometry = new Float32Array(strip.length * 3);
            for (let i = 0; i < strip.length; ++i) {
                const [normal, u, v] = faces[strip[i][0]];
                const [cx, cy] = corners[strip[i][1]];
                for (let axis = 0; axis < 3; ++axis) {
                    geometry[i * 3 + axis] = (normal[axis] + u[axis] * cx + v[axis] * cy) / 2;
                }
            }
            return geometry;
        }
        skin() {
            const skin = new Float32Array(strip.length * 2);
            for (let i = 0; i < strip.length; ++i) {
                const [cx, cy] = corners[strip[i][1]];
                skin[i * 2] = cx > 0 ? 1 : 0;
                skin[i * 2 + 1] = cy > 0 ? 0 : 1;
            }
            return skin;
        }
        normals() {
            const normals = new Float32Array(strip.length * 3);
            for (let i = 0; i < strip.length; ++i) {
                const normal = faces[strip[i][0]][0];
                for (let axis = 0; axis < 3; ++axis)
                    normals[i * 3 + axis] = normal[axis];
            }
            return normals;
        }
        count() {
            return faces.length * corners.length;
        }
    }
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_box.prototype, "geometry", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_box.prototype, "skin", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_box.prototype, "normals", null);
    $.$bog_gamengine_shape_box = $bog_gamengine_shape_box;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape_plane extends $bog_gamengine_shape {
        tile(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1]);
        }
        geometry() {
            return new Float32Array([
                -0.5, 0, +0.5,
                +0.5, 0, +0.5,
                -0.5, 0, -0.5,
                +0.5, 0, -0.5,
            ]);
        }
        skin() {
            const tile = this.tile();
            const u = tile[0];
            const v = tile[1];
            return new Float32Array([
                0, v,
                u, v,
                0, 0,
                u, 0,
            ]);
        }
        normals() {
            return new Float32Array([
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
            ]);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_plane.prototype, "tile", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_plane.prototype, "geometry", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_plane.prototype, "skin", null);
    __decorate([
        $mol_memo.method
    ], $bog_gamengine_shape_plane.prototype, "normals", null);
    $.$bog_gamengine_shape_plane = $bog_gamengine_shape_plane;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const programs = new WeakMap();
    class $bog_gamengine_shader_skin extends $bog_gamengine_shader_solid {
        programs = programs;
        face() {
            const base = super.face();
            return {
                glob: { ...base.glob, bones: 'sampler2D' },
                input: { ...base.input, joints: 'vec4', weights: 'vec4' },
                pipe: { ...base.pipe },
                output: { ...base.output },
            };
        }
        vert() {
            return `
				mat4 bone( float index ) {
					int at = int( index );
					return mat4(
						texelFetch( bones, ivec2( 0, at ), 0 ),
						texelFetch( bones, ivec2( 1, at ), 0 ),
						texelFetch( bones, ivec2( 2, at ), 0 ),
						texelFetch( bones, ivec2( 3, at ), 0 )
					);
				}
				void main() {
					float total = weights.x + weights.y + weights.z + weights.w;
					mat4 pose = mat4( 1.0 );
					if( total > 0.0 ) {
						pose = (
							bone( joints.x ) * weights.x
							+ bone( joints.y ) * weights.y
							+ bone( joints.z ) * weights.z
							+ bone( joints.w ) * weights.w
						) * ( 1.0 / total );
					}
					mat4 model = inst_trans * pose;
					vec4 world = model * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( model ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
					pipe_material = inst_material;
					pipe_normal_layer = inst_normal_layer;
				}
			`;
        }
    }
    $.$bog_gamengine_shader_skin = $bog_gamengine_shader_skin;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post_vignette extends $bog_gamengine_shader_post {
        frag() {
            return `
				void main() {
					vec4 base = texture( source, pipe_uv );
					float away = length( pipe_uv - vec2( 0.5 ) );
					float keep = mix( 0.7, 1.0, smoothstep( 0.85, 0.35, away ) );
					color = vec4( base.rgb * keep, base.a );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_vignette = $bog_gamengine_shader_post_vignette;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shader_post_bloom_bright extends $bog_gamengine_shader_post {
        frag() {
            return `
				void main() {
					vec3 base = max( texture( source, pipe_uv ).rgb, vec3( 0.0 ) );
					float power = max( max( base.r, base.g ), base.b );
					float over = max( power - 0.13, 0.0 );
					color = vec4( base * ( over / max( power, 0.0001 ) ), 1.0 );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_bloom_bright = $bog_gamengine_shader_post_bloom_bright;
    class $bog_gamengine_shader_post_bloom_blur extends $bog_gamengine_shader_post {
        across() {
            return false;
        }
        frag() {
            return `
				void main() {
					vec2 hop = vec2( ${this.across() ? '0.0, 1.0' : '1.0, 0.0'} ) * texel;
					vec3 sum = texture( source, pipe_uv ).rgb * 0.227027;
					sum += ( texture( source, pipe_uv + hop * 1.384615 ).rgb + texture( source, pipe_uv - hop * 1.384615 ).rgb ) * 0.316216;
					sum += ( texture( source, pipe_uv + hop * 3.230769 ).rgb + texture( source, pipe_uv - hop * 3.230769 ).rgb ) * 0.070270;
					color = vec4( sum, 1.0 );
				}
			`;
        }
    }
    $.$bog_gamengine_shader_post_bloom_blur = $bog_gamengine_shader_post_bloom_blur;
    class $bog_gamengine_shader_post_bloom_blur_across extends $bog_gamengine_shader_post_bloom_blur {
        across() {
            return true;
        }
    }
    $.$bog_gamengine_shader_post_bloom_blur_across = $bog_gamengine_shader_post_bloom_blur_across;
    class $bog_gamengine_shader_post_bloom extends $bog_gamengine_shader_post {
        bright = new $bog_gamengine_shader_post_bloom_bright;
        blur_along = new $bog_gamengine_shader_post_bloom_blur;
        blur_across = new $bog_gamengine_shader_post_bloom_blur_across;
        face() {
            return {
                glob: {
                    source: 'sampler2D',
                    texel: 'vec2',
                    extra: 'sampler2D',
                },
                pipe: {
                    pipe_uv: 'vec2',
                },
                output: { color: 'vec4' },
            };
        }
        frag() {
            return `
				void main() {
					vec4 base = texture( source, pipe_uv );
					vec3 glow = texture( extra, pipe_uv ).rgb;
					color = vec4( base.rgb + glow * 1.3, base.a );
				}
			`;
        }
        steps() {
            return [
                { shader: this.bright, scale: 2, from: 'in', extra: null },
                { shader: this.blur_along, scale: 2, from: 'prev', extra: null },
                { shader: this.blur_across, scale: 2, from: 'prev', extra: null },
                { shader: this, scale: 1, from: 'in', extra: 'prev' },
            ];
        }
    }
    $.$bog_gamengine_shader_post_bloom = $bog_gamengine_shader_post_bloom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Call fullscreen( true ) and lock( true ) from a click or key handler only, browsers refuse both outside a user gesture */
    class $bog_gamengine_screen extends $mol_object2 {
        target(next) {
            return next ?? null;
        }
        dx = 0;
        dy = 0;
        listeners = null;
        doc() {
            return this.$.$mol_dom_context.document;
        }
        listen() {
            return this.listeners ??= [
                new this.$.$mol_dom_listener(this.doc(), 'fullscreenchange', () => {
                    this.fullscreen(Boolean(this.doc().fullscreenElement));
                }),
                new this.$.$mol_dom_listener(this.doc(), 'pointerlockchange', () => {
                    this.lock(this.locked());
                }),
                new this.$.$mol_dom_listener(this.doc(), 'mousemove', (event) => {
                    if (!this.locked())
                        return;
                    this.dx += event.movementX;
                    this.dy += event.movementY;
                }),
            ];
        }
        fullscreen(next) {
            this.listen();
            if (next === undefined)
                return Boolean(this.doc().fullscreenElement);
            new this.$.$mol_after_tick(() => this.fullscreen_apply(next));
            return next;
        }
        fullscreen_apply(next) {
            const doc = this.doc();
            if (next === Boolean(doc.fullscreenElement))
                return;
            if (next)
                doc.documentElement.requestFullscreen().catch(() => this.fullscreen(false));
            else
                doc.exitFullscreen().catch(() => this.fullscreen(true));
        }
        locked() {
            const target = this.target();
            return target !== null && this.doc().pointerLockElement === target;
        }
        lock(next) {
            this.listen();
            if (next === undefined)
                return this.locked();
            new this.$.$mol_after_tick(() => this.lock_apply(next));
            return next;
        }
        lock_apply(next) {
            if (next === this.locked())
                return;
            if (next)
                this.target()?.requestPointerLock().catch(() => this.lock(false));
            else
                this.doc().exitPointerLock();
        }
        take(out) {
            this.listen();
            out[0] = this.dx;
            out[1] = this.dy;
            this.dx = 0;
            this.dy = 0;
            return out;
        }
        destructor() {
            for (const listener of this.listeners ?? [])
                listener.destructor();
            this.listeners = null;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_screen.prototype, "target", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_screen.prototype, "fullscreen", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_screen.prototype, "lock", null);
    $.$bog_gamengine_screen = $bog_gamengine_screen;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const uv_plain = new Float32Array([0, 0, 1, 1]);
    class $bog_gamengine_mesh extends $bog_gamengine_node {
        lods(next) {
            return next ?? [];
        }
        radius() {
            try {
                return this.shape().radius();
            }
            catch (error) {
                if ($mol_promise_like(error))
                    return Infinity;
                return $mol_fail_hidden(error);
            }
        }
        shape(next) {
            return next ?? new $bog_gamengine_shape_box;
        }
        atlas(next) {
            return next ?? null;
        }
        frame(next = '') {
            return next;
        }
        size(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([1, 1, 1]);
        }
        material(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array([0, 0.6, 0, 0]);
        }
        normal_frame(next = '') {
            return next;
        }
        props() {
            return [
                ...super.props(),
                { name: 'frame', kind: 'frame', get: () => this.frame(), set: next => this.frame(next) },
                { name: 'normal_frame', kind: 'frame', get: () => this.normal_frame(), set: next => this.normal_frame(next) },
                { name: 'size', kind: 'vec3', get: () => this.size(), set: next => this.size(next) },
                { name: 'material', kind: 'vec4', get: () => this.material(), set: next => this.material(next) },
                { name: 'billboard', kind: 'flag', get: () => this.billboard(), set: next => this.billboard(next) },
            ];
        }
        layer() {
            const atlas = this.atlas();
            return atlas ? atlas.layer(this.frame()) : 0;
        }
        normal_layer() {
            const data = this.atlas()?.data() ?? null;
            const frame = this.normal_frame();
            return data && frame ? data.layer(frame) : -1;
        }
        uv() {
            return uv_plain;
        }
        trans() {
            return $mol_3d_mat4.multiply(super.trans(), $mol_3d_mat4.scaling(this.size()));
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "lods", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "material", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "normal_frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "layer", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "normal_layer", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "trans", null);
    $.$bog_gamengine_mesh = $bog_gamengine_mesh;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_mesh_skin extends $bog_gamengine_mesh {
        skin(next) {
            return next ?? null;
        }
        Shader() {
            return new this.$.$bog_gamengine_shader_skin;
        }
        shader(next) {
            return next ?? this.Shader();
        }
        shape(next) {
            return next ?? this.skin()?.shape() ?? new $bog_gamengine_shape_box;
        }
        bones() {
            return this.skin()?.pose() ?? null;
        }
        step(dt) {
            super.step(dt);
            this.skin()?.step(dt);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh_skin.prototype, "skin", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh_skin.prototype, "Shader", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh_skin.prototype, "shader", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh_skin.prototype, "shape", null);
    $.$bog_gamengine_mesh_skin = $bog_gamengine_mesh_skin;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_cam_deep extends $bog_gamengine_cam {
        fov(next) {
            return next ?? Math.PI / 3;
        }
        near(next) {
            return next ?? 0.1;
        }
        far(next) {
            return next ?? 100;
        }
        follow(next) {
            return next ?? null;
        }
        lift(next) {
            return next ?? 0;
        }
        step(dt) {
            const node = this.follow();
            if (!node)
                return;
            const at = node.pos();
            const lift = this.lift();
            const pos = this.pos();
            if (pos[0] !== at[0] || pos[1] !== at[1] + lift || pos[2] !== at[2]) {
                const next = new Float32Array(3);
                next[0] = at[0];
                next[1] = at[1] + lift;
                next[2] = at[2];
                this.pos(next);
            }
            const turn = node.rot();
            const rot = this.rot();
            if (rot[0] === turn[0] && rot[1] === turn[1] && rot[2] === turn[2])
                return;
            const next = new Float32Array(3);
            next[0] = turn[0];
            next[1] = turn[1];
            next[2] = turn[2];
            this.rot(next);
        }
        props() {
            return [
                ...super.props(),
                { name: 'lift', kind: 'number', get: () => this.lift(), set: next => this.lift(next) },
                { name: 'fov', kind: 'number', get: () => this.fov(), set: next => this.fov(next) },
                { name: 'near', kind: 'number', get: () => this.near(), set: next => this.near(next) },
                { name: 'far', kind: 'number', get: () => this.far(), set: next => this.far(next) },
            ];
        }
        proj(aspect) {
            return $mol_3d_mat4.perspective(this.fov(), aspect, this.near(), this.far());
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "fov", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "near", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "far", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "follow", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam_deep.prototype, "lift", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_cam_deep.prototype, "proj", null);
    $.$bog_gamengine_cam_deep = $bog_gamengine_cam_deep;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const pitch_limit = Math.PI / 2 - 1e-3;
    class $bog_gamengine_demo_room_walker extends $bog_gamengine_cam_deep {
        input(next) {
            return next ?? null;
        }
        screen(next) {
            return next ?? null;
        }
        sense(next = 0.003) {
            return next;
        }
        look = new Float32Array(2);
        tile(next) {
            return next ?? null;
        }
        speed(next = 3) {
            return next;
        }
        turn(next = 2) {
            return next;
        }
        radius(next = 0.3) {
            return next;
        }
        free(x, z) {
            const tile = this.tile();
            if (!tile)
                return true;
            const r = this.radius();
            if (tile.solid_at(x - r, -(z - r)))
                return false;
            if (tile.solid_at(x + r, -(z - r)))
                return false;
            if (tile.solid_at(x - r, -(z + r)))
                return false;
            if (tile.solid_at(x + r, -(z + r)))
                return false;
            return true;
        }
        step(dt) {
            const input = this.input();
            if (!input)
                return;
            const rot = this.rot();
            let pitch = rot[0];
            let yaw = rot[1];
            let turned = false;
            const spin = input.axis('turn_right', 'turn_left');
            if (spin !== 0) {
                yaw += spin * this.turn() * dt;
                turned = true;
            }
            const screen = this.screen();
            if (screen) {
                const look = screen.take(this.look);
                if (look[0] !== 0 || look[1] !== 0) {
                    const sense = this.sense();
                    yaw -= look[0] * sense;
                    pitch -= look[1] * sense;
                    if (pitch > pitch_limit)
                        pitch = pitch_limit;
                    if (pitch < -pitch_limit)
                        pitch = -pitch_limit;
                    turned = true;
                }
            }
            if (turned) {
                const next = new Float32Array(3);
                next[0] = pitch;
                next[1] = yaw;
                next[2] = rot[2];
                this.rot(next);
            }
            const track = input.axis('back', 'forward');
            const side = input.axis('left', 'right');
            if (track === 0 && side === 0)
                return;
            const way = this.speed() * dt;
            const sin = Math.sin(yaw);
            const cos = Math.cos(yaw);
            const dx = (-sin * track + cos * side) * way;
            const dz = (-cos * track - sin * side) * way;
            const pos = this.pos();
            let x = pos[0];
            let z = pos[2];
            if (this.free(x + dx, z))
                x += dx;
            if (this.free(x, z + dz))
                z += dz;
            if (x === pos[0] && z === pos[2])
                return;
            const next = new Float32Array(3);
            next[0] = x;
            next[1] = pos[1];
            next[2] = z;
            this.pos(next);
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "input", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "screen", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "sense", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "tile", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "turn", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_room_walker.prototype, "radius", null);
    $.$bog_gamengine_demo_room_walker = $bog_gamengine_demo_room_walker;
})($ || ($ = {}));

;
	($.$bog_gamengine_demo_room) = class $bog_gamengine_demo_room extends ($.$mol_page) {
		Wireframe(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Каркас");
			(obj.checked) = (next) => ((this.wireframe(next)));
			return obj;
		}
		shine(next){
			if(next !== undefined) return next;
			return false;
		}
		Shine(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Блики");
			(obj.checked) = (next) => ((this.shine(next)));
			return obj;
		}
		glow(next){
			if(next !== undefined) return next;
			return false;
		}
		Glow(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Свечение");
			(obj.checked) = (next) => ((this.glow(next)));
			return obj;
		}
		Shadows(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Тени");
			(obj.checked) = (next) => ((this.shadows(next)));
			return obj;
		}
		fogged(next){
			if(next !== undefined) return next;
			return false;
		}
		Fog_check(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Туман");
			(obj.checked) = (next) => ((this.fogged(next)));
			return obj;
		}
		arm_shown(next){
			if(next !== undefined) return next;
			return false;
		}
		Arm_check(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Рука");
			(obj.checked) = (next) => ((this.arm_shown(next)));
			return obj;
		}
		Pause(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Пауза");
			(obj.checked) = (next) => ((this.paused(next)));
			return obj;
		}
		screen_shown(next){
			if(next !== undefined) return next;
			return false;
		}
		Screen_switch(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Кнопки");
			(obj.checked) = (next) => ((this.screen_shown(next)));
			return obj;
		}
		fullscreen(next){
			if(next !== undefined) return next;
			return false;
		}
		Full(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Во весь экран");
			(obj.checked) = (next) => ((this.fullscreen(next)));
			return obj;
		}
		profile(next){
			if(next !== undefined) return next;
			return false;
		}
		Profile(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Профиль");
			(obj.checked) = (next) => ((this.profile(next)));
			return obj;
		}
		wireframe(next){
			return (this.Draw().wireframe(next));
		}
		shadows(next){
			return (this.Draw().shadows(next));
		}
		fog(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		fog_color(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		passes(){
			return [];
		}
		stat(){
			return (this.Draw().stat());
		}
		report(){
			return (this.Draw().report());
		}
		canvas_down(next){
			if(next !== undefined) return next;
			return null;
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.Walker()));
			(obj.fog) = () => ((this.fog()));
			(obj.fog_color) = () => ((this.fog_color()));
			(obj.passes) = () => ((this.passes()));
			(obj.event) = () => ({"pointerdown": (next) => (this.canvas_down(next))});
			return obj;
		}
		Screen(){
			const obj = new this.$.$bog_gamengine_input_screen();
			(obj.shown) = (next) => ((this.screen_shown(next)));
			(obj.bind) = () => ({
				"left": ["x-"], 
				"right": ["x+"], 
				"forward": ["y+"], 
				"back": ["y-"]
			});
			(obj.actions) = () => (["turn_left", "turn_right"]);
			(obj.titles) = () => ({"turn_left": "⟲", "turn_right": "⟳"});
			return obj;
		}
		Stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.stat())]);
			return obj;
		}
		walker_stat(){
			return "";
		}
		Walker_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.walker_stat())]);
			return obj;
		}
		pillar_stat(){
			return "";
		}
		Pillar_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.pillar_stat())]);
			return obj;
		}
		arm_stat(){
			return "";
		}
		Arm_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.arm_stat())]);
			return obj;
		}
		light_stat(){
			return "";
		}
		Light_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.light_stat())]);
			return obj;
		}
		foot_rows(){
			return [
				(this.Stat()), 
				(this.Walker_stat()), 
				(this.Pillar_stat()), 
				(this.Arm_stat()), 
				(this.Light_stat())
			];
		}
		report_tick(){
			return "";
		}
		Report_tick(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Тик");
			(obj.content) = () => ([(this.report_tick())]);
			return obj;
		}
		report_fill(){
			return "";
		}
		Report_fill(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Заливка");
			(obj.content) = () => ([(this.report_fill())]);
			return obj;
		}
		report_shadow(){
			return "";
		}
		Report_shadow(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Тени");
			(obj.content) = () => ([(this.report_shadow())]);
			return obj;
		}
		report_main(){
			return "";
		}
		Report_main(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Проход");
			(obj.content) = () => ([(this.report_main())]);
			return obj;
		}
		report_post(){
			return "";
		}
		Report_post(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Пост");
			(obj.content) = () => ([(this.report_post())]);
			return obj;
		}
		report_batches(){
			return "";
		}
		Report_batches(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Батчи");
			(obj.content) = () => ([(this.report_batches())]);
			return obj;
		}
		report_instances(){
			return "";
		}
		Report_instances(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Инстансы");
			(obj.content) = () => ([(this.report_instances())]);
			return obj;
		}
		report_draws(){
			return "";
		}
		Report_draws(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Вызовы");
			(obj.content) = () => ([(this.report_draws())]);
			return obj;
		}
		report_triangles(){
			return "";
		}
		Report_triangles(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Треугольники");
			(obj.content) = () => ([(this.report_triangles())]);
			return obj;
		}
		report_bytes(){
			return "";
		}
		Report_bytes(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Память");
			(obj.content) = () => ([(this.report_bytes())]);
			return obj;
		}
		screen_target(){
			const obj = new this.$.Element();
			return obj;
		}
		tile_plane(){
			const obj = new this.$.$bog_gamengine_map_plane();
			return obj;
		}
		paused(next){
			return (this.Clock().paused(next));
		}
		nodes(){
			return [];
		}
		Solid(){
			const obj = new this.$.$bog_gamengine_shader_solid();
			return obj;
		}
		Box(){
			const obj = new this.$.$bog_gamengine_shape_box();
			return obj;
		}
		walls(){
			return [];
		}
		Wall_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Box()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ((this.walls()));
			return obj;
		}
		floor_tile(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		Plane(){
			const obj = new this.$.$bog_gamengine_shape_plane();
			(obj.tile) = () => ((this.floor_tile()));
			return obj;
		}
		Floor_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Plane()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ([(this.Floor())]);
			return obj;
		}
		pillar_data(){
			const obj = new this.$.ArrayBuffer();
			return obj;
		}
		Pillar_shape(){
			const obj = new this.$.$bog_gamengine_shape_gltf();
			(obj.data) = () => ((this.pillar_data()));
			return obj;
		}
		Pillar_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Pillar_shape()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ([(this.Pillar())]);
			return obj;
		}
		Skin(){
			const obj = new this.$.$bog_gamengine_shader_skin();
			return obj;
		}
		arm_data(){
			const obj = new this.$.ArrayBuffer();
			return obj;
		}
		Arm_shape(){
			const obj = new this.$.$bog_gamengine_shape_gltf();
			(obj.data) = () => ((this.arm_data()));
			return obj;
		}
		arm_nodes(){
			return [];
		}
		Arm_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Skin()));
			(obj.shape) = () => ((this.Arm_shape()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ((this.arm_nodes()));
			return obj;
		}
		Arm_skin(){
			const obj = new this.$.$bog_gamengine_skin();
			(obj.shape) = () => ((this.Arm_shape()));
			(obj.clip) = () => ("wave");
			return obj;
		}
		arm_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		wall_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		wall_material(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		floor_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		floor_size(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		pillar_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		walker_pos(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		walker_rot(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		sun_rot(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		light_warm_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		light_warm_color(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		light_cold_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		light_cold_color(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		torch_rot(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		title(){
			return "Комната";
		}
		tools(){
			return [
				(this.Wireframe()), 
				(this.Shine()), 
				(this.Glow()), 
				(this.Shadows()), 
				(this.Fog_check()), 
				(this.Arm_check()), 
				(this.Pause()), 
				(this.Screen_switch()), 
				(this.Full()), 
				(this.Profile())
			];
		}
		body(){
			return [(this.Draw()), (this.Screen())];
		}
		foot(){
			return (this.foot_rows());
		}
		Tone(){
			const obj = new this.$.$bog_gamengine_shader_post_tone();
			return obj;
		}
		Vignette(){
			const obj = new this.$.$bog_gamengine_shader_post_vignette();
			return obj;
		}
		Bloom(){
			const obj = new this.$.$bog_gamengine_shader_post_bloom();
			return obj;
		}
		Report(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Report_tick()), 
				(this.Report_fill()), 
				(this.Report_shadow()), 
				(this.Report_main()), 
				(this.Report_post()), 
				(this.Report_batches()), 
				(this.Report_instances()), 
				(this.Report_draws()), 
				(this.Report_triangles()), 
				(this.Report_bytes())
			]);
			return obj;
		}
		Screen_api(){
			const obj = new this.$.$bog_gamengine_screen();
			(obj.target) = () => ((this.screen_target()));
			return obj;
		}
		Input(){
			const obj = new this.$.$bog_gamengine_input();
			(obj.key) = () => ((this.Key()));
			(obj.screen) = () => ((this.Screen()));
			return obj;
		}
		Key(){
			const obj = new this.$.$bog_gamengine_key();
			(obj.bind) = () => ({
				"forward": ["W"], 
				"back": ["S"], 
				"left": ["A"], 
				"right": ["D"], 
				"turn_left": ["Q"], 
				"turn_right": ["E"]
			});
			return obj;
		}
		map(){
			return "############\n#..........#\n#..........#\n#.......#..#\n#...#......#\n#..........#\n#..........#\n#..........#\n############";
		}
		Tile(){
			const obj = new this.$.$bog_gamengine_phys_tile();
			(obj.map) = () => ((this.map()));
			(obj.plane) = () => ((this.tile_plane()));
			return obj;
		}
		Atlas(){
			const obj = new this.$.$bog_gamengine_atlas();
			(obj.uris) = () => (["bog/gamengine/demo/atlas/wall.png", "bog/gamengine/demo/atlas/floor.png"]);
			(obj.size) = () => (64);
			return obj;
		}
		Clock(){
			const obj = new this.$.$bog_gamengine_clock();
			return obj;
		}
		Scene(){
			const obj = new this.$.$bog_gamengine_scene();
			(obj.clock) = () => ((this.Clock()));
			(obj.input) = () => ((this.Input()));
			(obj.kids) = () => ((this.nodes()));
			(obj.batches) = () => ([
				(this.Wall_batch()), 
				(this.Floor_batch()), 
				(this.Pillar_batch()), 
				(this.Arm_batch())
			]);
			return obj;
		}
		Arm(){
			const obj = new this.$.$bog_gamengine_mesh_skin();
			(obj.skin) = () => ((this.Arm_skin()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("wall");
			(obj.pos) = () => ((this.arm_pos()));
			return obj;
		}
		Wall(id){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Box()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("wall");
			(obj.pos) = () => ((this.wall_pos(id)));
			(obj.material) = () => ((this.wall_material()));
			return obj;
		}
		Floor(){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Plane()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("floor");
			(obj.pos) = () => ((this.floor_pos()));
			(obj.size) = () => ((this.floor_size()));
			return obj;
		}
		Pillar(){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Pillar_shape()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("wall");
			(obj.pos) = () => ((this.pillar_pos()));
			return obj;
		}
		Walker(){
			const obj = new this.$.$bog_gamengine_demo_room_walker();
			(obj.input) = () => ((this.Input()));
			(obj.screen) = () => ((this.Screen_api()));
			(obj.tile) = () => ((this.Tile()));
			(obj.pos) = (next) => ((this.walker_pos(next)));
			(obj.rot) = (next) => ((this.walker_rot(next)));
			return obj;
		}
		Sun(){
			const obj = new this.$.$bog_gamengine_light();
			(obj.kind) = () => ("sun");
			(obj.rot) = () => ((this.sun_rot()));
			(obj.power) = () => (1);
			return obj;
		}
		Light_warm(){
			const obj = new this.$.$bog_gamengine_light();
			(obj.kind) = () => ("point");
			(obj.pos) = () => ((this.light_warm_pos()));
			(obj.color) = () => ((this.light_warm_color()));
			(obj.power) = () => (1.2);
			(obj.range) = () => (4);
			return obj;
		}
		Light_cold(){
			const obj = new this.$.$bog_gamengine_light();
			(obj.kind) = () => ("point");
			(obj.pos) = () => ((this.light_cold_pos()));
			(obj.color) = () => ((this.light_cold_color()));
			(obj.power) = () => (1.2);
			(obj.range) = () => (4);
			return obj;
		}
		Light_torch(){
			const obj = new this.$.$bog_gamengine_light();
			(obj.kind) = () => ("spot");
			(obj.parent) = () => ((this.Walker()));
			(obj.rot) = () => ((this.torch_rot()));
			(obj.power) = () => (2);
			(obj.range) = () => (10);
			(obj.angle) = () => (0.6);
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Wireframe"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "shine"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Shine"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "glow"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Glow"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Shadows"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "fogged"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Fog_check"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "arm_shown"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Arm_check"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pause"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "screen_shown"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Screen_switch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "fullscreen"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Full"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "profile"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Profile"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "fog"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "fog_color"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "canvas_down"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Screen"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Walker_stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar_stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Arm_stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Light_stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_tick"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_fill"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_shadow"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_main"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_post"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_batches"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_instances"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_draws"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_triangles"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report_bytes"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "screen_target"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "tile_plane"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Solid"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Box"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Wall_batch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "floor_tile"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Plane"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Floor_batch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "pillar_data"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar_shape"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar_batch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Skin"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "arm_data"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Arm_shape"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Arm_batch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Arm_skin"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "arm_pos"));
	($mol_mem_key(($.$bog_gamengine_demo_room.prototype), "wall_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "wall_material"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "floor_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "floor_size"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "pillar_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "walker_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "walker_rot"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "sun_rot"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "light_warm_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "light_warm_color"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "light_cold_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "light_cold_color"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "torch_rot"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Tone"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Vignette"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Bloom"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Report"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Screen_api"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Input"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Key"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Tile"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Atlas"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Arm"));
	($mol_mem_key(($.$bog_gamengine_demo_room.prototype), "Wall"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Floor"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Walker"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Sun"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Light_warm"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Light_cold"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Light_torch"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_demo_room extends $.$bog_gamengine_demo_room {
            tile_plane() {
                return 'xz';
            }
            wall_ids() {
                return this.Tile().ids('#');
            }
            wall_pos(id) {
                return this.Tile().spot_pos(id, 0.5, new Float32Array(3));
            }
            walls() {
                return this.wall_ids().map(id => this.Wall(id));
            }
            shine(next = false) {
                return next;
            }
            glow(next = false) {
                return next;
            }
            profile(next = false) {
                return next;
            }
            screen_target() {
                return this.Draw().dom_node();
            }
            fullscreen(next) {
                return this.Screen_api().fullscreen(next);
            }
            canvas_down(event) {
                this.Screen_api().lock(true);
                return event ?? null;
            }
            fogged(next = false) {
                return next;
            }
            fog() {
                return this.fogged() ? new Float32Array([1, 9]) : new Float32Array([0, 0]);
            }
            fog_color() {
                return new Float32Array([0.0014, 0.002, 0.005]);
            }
            passes() {
                const tail = [this.Tone(), this.Vignette()];
                return this.glow() ? [this.Bloom(), ...tail] : tail;
            }
            foot_rows() {
                return [
                    this.Stat(),
                    this.Walker_stat(),
                    this.Pillar_stat(),
                    this.Arm_stat(),
                    this.Light_stat(),
                    ...this.profile() ? [this.Report()] : [],
                ];
            }
            report_tick() {
                return this.report().tick.toFixed(2) + ' мс';
            }
            report_fill() {
                return this.report().fill.toFixed(2) + ' мс';
            }
            report_shadow() {
                return this.report().shadow.toFixed(2) + ' мс';
            }
            report_main() {
                return this.report().main.toFixed(2) + ' мс';
            }
            report_post() {
                return this.report().post.toFixed(2) + ' мс';
            }
            report_batches() {
                return String(Math.round(this.report().batches));
            }
            report_instances() {
                return String(Math.round(this.report().instances));
            }
            report_draws() {
                return String(Math.round(this.report().draws));
            }
            report_triangles() {
                return String(Math.round(this.report().triangles));
            }
            report_bytes() {
                return Math.round(this.report().bytes / 1024) + ' КБ';
            }
            wall_material() {
                return this.shine() ? new Float32Array([0.8, 0.2, 0, 0]) : new Float32Array([0, 0.6, 0, 0]);
            }
            floor_pos() {
                return new Float32Array([this.Tile().width() / 2, 0, this.Tile().height() / 2]);
            }
            floor_size() {
                return new Float32Array([this.Tile().width(), 1, this.Tile().height()]);
            }
            floor_tile() {
                return new Float32Array([this.Tile().width(), this.Tile().height()]);
            }
            pillar_data() {
                return $mol_fetch.buffer('bog/gamengine/demo/room/model/pillar.glb');
            }
            pillar_pos() {
                return new Float32Array([6.5, 0.5, 3.5]);
            }
            arm_data() {
                return $mol_fetch.buffer('bog/gamengine/skin/model/arm.glb');
            }
            arm_pos() {
                return new Float32Array([4, 0, 3.5]);
            }
            arm_nodes() {
                return this.arm_shown() ? [this.Arm()] : [];
            }
            walker_pos(next) {
                return next ?? new Float32Array([6, 0.5, 7.5]);
            }
            walker_rot(next) {
                return next ?? new Float32Array([0, 0, 0]);
            }
            sun_rot() {
                return new Float32Array([-0.6, 1.1, 0]);
            }
            light_warm_pos() {
                return new Float32Array([4.5, 1.7, 4.5]);
            }
            light_warm_color() {
                return new Float32Array([1, 0.6, 0.3]);
            }
            light_cold_pos() {
                return new Float32Array([6.5, 1.7, 3.5]);
            }
            light_cold_color() {
                return new Float32Array([0.3, 0.6, 1]);
            }
            torch_rot() {
                return new Float32Array([-0.35, 0, 0]);
            }
            lights() {
                return [this.Sun(), this.Light_warm(), this.Light_cold(), this.Light_torch()];
            }
            nodes() {
                return [...this.walls(), this.Floor(), this.Pillar(), this.Walker(), ...this.lights(), ...this.arm_nodes()];
            }
            pillar_stat() {
                try {
                    return `pillar ${this.Pillar_shape().size()}`;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return '';
                    return $mol_fail_hidden(error);
                }
            }
            arm_stat() {
                if (!this.arm_shown())
                    return '';
                try {
                    return `arm ${this.Arm_shape().size()}`;
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        return '';
                    return $mol_fail_hidden(error);
                }
            }
            walker_stat() {
                if (!this.Atlas().ready())
                    return '';
                const pos = this.walker_pos();
                const yaw = this.walker_rot()[1];
                return `walker ${pos[0].toFixed(2)} × ${pos[2].toFixed(2)} yaw ${yaw.toFixed(2)}`;
            }
            light_stat() {
                return `lights ${this.Scene().lights().length}`;
            }
        }
        __decorate([
            $mol_mem_key
        ], $bog_gamengine_demo_room.prototype, "wall_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "walls", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "shine", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "glow", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "profile", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "screen_target", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "fogged", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "fog", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "fog_color", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "passes", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "foot_rows", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "wall_material", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "floor_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "floor_size", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "floor_tile", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "pillar_data", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "pillar_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "arm_data", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "arm_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "arm_nodes", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "walker_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "walker_rot", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "sun_rot", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "light_warm_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "light_warm_color", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "light_cold_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "light_cold_color", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "torch_rot", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "lights", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "nodes", null);
        $$.$bog_gamengine_demo_room = $bog_gamengine_demo_room;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_demo_room, {
            flex: {
                grow: 1,
            },
            '>': {
                $mol_scroll: {
                    '>': {
                        $mol_view: {
                            alignSelf: 'stretch',
                            flex: {
                                grow: 1,
                            },
                        },
                    },
                },
            },
            Foot: {
                flex: {
                    wrap: 'wrap',
                },
            },
            Report: {
                flex: {
                    wrap: 'wrap',
                    grow: 1,
                },
                minWidth: 0,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_menu) = class $mol_icon_menu extends ($.$mol_icon) {
		path(){
			return "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_down) = class $mol_icon_menu_down extends ($.$mol_icon) {
		path(){
			return "M7,10L12,15L17,10H7Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_down_outline) = class $mol_icon_menu_down_outline extends ($.$mol_icon) {
		path(){
			return "M18,9V10.5L12,16.5L6,10.5V9H18M12,13.67L14.67,11H9.33L12,13.67Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_up) = class $mol_icon_menu_up extends ($.$mol_icon) {
		path(){
			return "M7,15L12,10L17,15H7Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_up_outline) = class $mol_icon_menu_up_outline extends ($.$mol_icon) {
		path(){
			return "M18,16V14.5L12,8.5L6,14.5V16H18M12,11.33L14.67,14H9.33L12,11.33Z";
		}
	};


;
"use strict";


;
	($.$mol_number) = class $mol_number extends ($.$mol_view) {
		precision(){
			return 0;
		}
		event_dec(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc(next){
			if(next !== undefined) return next;
			return null;
		}
		event_dec_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"down": (next) => (this.event_dec(next)), 
				"up": (next) => (this.event_inc(next)), 
				"pageDown": (next) => (this.event_dec_boost(next)), 
				"pageUp": (next) => (this.event_inc_boost(next))
			});
			return obj;
		}
		type(){
			return "text";
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this.type()));
			(obj.keyboard) = () => ("decimal");
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.selection) = (next) => ((this.selection(next)));
			return obj;
		}
		dec_enabled(){
			return (this.enabled());
		}
		dec_icon(){
			const obj = new this.$.$mol_icon_menu_down_outline();
			return obj;
		}
		Dec(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_dec(next)));
			(obj.enabled) = () => ((this.dec_enabled()));
			(obj.sub) = () => ([(this.dec_icon())]);
			return obj;
		}
		inc_enabled(){
			return (this.enabled());
		}
		inc_icon(){
			const obj = new this.$.$mol_icon_menu_up_outline();
			return obj;
		}
		Inc(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_inc(next)));
			(obj.enabled) = () => ((this.inc_enabled()));
			(obj.sub) = () => ([(this.inc_icon())]);
			return obj;
		}
		precision_view(){
			return (this.precision());
		}
		precision_change(){
			return (this.precision());
		}
		boost(){
			return 10;
		}
		value_min(){
			return -Infinity;
		}
		value_max(){
			return +Infinity;
		}
		value(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		enabled(){
			return true;
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [
				(this.String()), 
				(this.Dec()), 
				(this.Inc())
			];
		}
	};
	($mol_mem(($.$mol_number.prototype), "event_dec"));
	($mol_mem(($.$mol_number.prototype), "event_inc"));
	($mol_mem(($.$mol_number.prototype), "event_dec_boost"));
	($mol_mem(($.$mol_number.prototype), "event_inc_boost"));
	($mol_mem(($.$mol_number.prototype), "Hotkey"));
	($mol_mem(($.$mol_number.prototype), "value_string"));
	($mol_mem(($.$mol_number.prototype), "submit"));
	($mol_mem(($.$mol_number.prototype), "selection"));
	($mol_mem(($.$mol_number.prototype), "String"));
	($mol_mem(($.$mol_number.prototype), "dec_icon"));
	($mol_mem(($.$mol_number.prototype), "Dec"));
	($mol_mem(($.$mol_number.prototype), "inc_icon"));
	($mol_mem(($.$mol_number.prototype), "Inc"));
	($mol_mem(($.$mol_number.prototype), "value"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/number/number.css", "[mol_number] {\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tposition: relative;\n\talign-items: stretch;\n\tmax-width: 100%;\n}\n\n[mol_number_string] {\n\tappearance: textfield;\n\tflex: 1 1 7rem;\n\twidth: 7rem;\n}\n\n[mol_number_string]::-webkit-inner-spin-button {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Component for entering, incrementing and decrementing numeric values.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
         */
        class $mol_number extends $.$mol_number {
            sub() {
                return [
                    this.String(),
                    ...this.dec_enabled() ? [this.Dec()] : [],
                    ...this.inc_enabled() ? [this.Inc()] : [],
                ];
            }
            value_limited(val) {
                if (Number.isNaN(val))
                    return this.value(val);
                if (val === undefined)
                    return this.value();
                const min = this.value_min();
                const max = this.value_max();
                if (val < min)
                    return this.value(min);
                if (val > max)
                    return this.value(max);
                return this.value(val);
            }
            event_dec(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change());
                next?.preventDefault();
            }
            precision_change() {
                return this.precision() || 1;
            }
            event_inc(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change());
                next?.preventDefault();
            }
            event_dec_boost(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change() * this.boost());
                next?.preventDefault();
            }
            event_inc_boost(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change() * this.boost());
                next?.preventDefault();
            }
            round(val) {
                if (Number.isNaN(val))
                    return '';
                if (val === 0)
                    return '0';
                if (!val)
                    return '';
                const precision_view = this.precision_view();
                if (precision_view === 0)
                    return String(val);
                if (precision_view >= 1) {
                    return (val / precision_view).toFixed();
                }
                else {
                    const fixed_number = Math.log10(1 / precision_view);
                    return val.toFixed(Math.ceil(fixed_number));
                }
            }
            value_string(next) {
                // Вытягиваем value
                // Если кто-то поменяет из вне value, value_string надо обновить
                const current = this.round(this.value_limited());
                if (next === undefined)
                    return current;
                const precision = this.precision_view();
                // Точку в конце поставить нельзя, если precision_view целое число > 0
                if (precision > 0 && precision - Math.floor(precision) === 0)
                    next = next.replace(/[.,]/g, '');
                // Запятые меняем на точки, удаляем не-цифры и не-точки и лишние ноли в начале целой части.
                // Минус получится ввести только в начале.
                next = (this.value_min() < 0 && next.startsWith('-') ? '-' : '')
                    + next.replace(/,/g, '.').replace(/[^\d\.]/g, '').replace(/^0{2,}/, '0');
                let dot_pos = next.indexOf('.');
                if (dot_pos !== -1) {
                    const prev = $mol_wire_probe(() => this.value_string()) ?? '';
                    const dot_pos_prev = prev.indexOf('.');
                    // Определяем где относительно предыдущей точки юзер поставил новую
                    if (dot_pos_prev === dot_pos)
                        dot_pos = next.lastIndexOf('.');
                    // Из частей до и после новой точки старую точку удаляем
                    const frac = next.slice(dot_pos + 1).replace(/\./g, '');
                    // Если точка идет первой, перед ней пишем 0, что бы форматирование выглядело нормально в mask
                    next = (next.slice(0, dot_pos) || '0').replace(/\./g, '') + '.' + frac;
                }
                // Оставляем старое значение в value есть сочетание, приводящие к NaN, например -.
                if (Number.isNaN(Number(next)))
                    return next;
                if (next.endsWith('.'))
                    return next;
                if (next.endsWith('-'))
                    return next;
                // Если пустая строка - сетим NaN
                // Применяем округления.
                this.value_limited(Number(next || Number.NaN));
                // Возвращаем все-равно не нормализованное значение
                // Иначе нельзя ввести будет 10, если min/max 5..10
                return next;
            }
            dec_enabled() {
                return this.enabled() && (!((this.value() || 0) <= this.value_min()));
            }
            inc_enabled() {
                return this.enabled() && (!((this.value() || 0) >= this.value_max()));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "value_string", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "dec_enabled", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "inc_enabled", null);
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_shape_lines extends $bog_gamengine_shape {
        points(next) {
            return next ? $bog_gamengine_node_vec(next) : new Float32Array(0);
        }
        count(next) {
            return next ?? this.points().length / 6;
        }
        geometry() {
            return this.points();
        }
        size() {
            const all = this.points().length / 3;
            const drawn = this.count() * 2;
            return drawn < all ? drawn : all;
        }
        normals() {
            return new Float32Array(this.points().length);
        }
        skin() {
            return new Float32Array(this.points().length / 3 * 2);
        }
        radius() {
            return Infinity;
        }
        mode() {
            return 'lines';
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_lines.prototype, "points", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_lines.prototype, "count", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_lines.prototype, "normals", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_shape_lines.prototype, "skin", null);
    $.$bog_gamengine_shape_lines = $bog_gamengine_shape_lines;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_demo_boxes_phys extends $bog_gamengine_phys3 {
        low() {
            let low = Infinity;
            const pos = this.pos, inv_mass = this.inv_mass;
            for (let i = 0; i < this.count; ++i) {
                if (!(inv_mass[i] > 0))
                    continue;
                if (pos[i * 3 + 1] < low)
                    low = pos[i * 3 + 1];
            }
            return low;
        }
    }
    $.$bog_gamengine_demo_boxes_phys = $bog_gamengine_demo_boxes_phys;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_debug extends $bog_gamengine_node {
        static normal_len = 0.2;
        phys3(next) {
            return next ?? null;
        }
        buf = new Float32Array(0);
        points() {
            const phys = this.phys3();
            const count = phys ? phys.narrow.contact_count : 0;
            const need = count * 6;
            if (need > this.buf.length)
                this.buf = new Float32Array(need);
            const buf = this.buf;
            if (!phys)
                return buf;
            const point = phys.narrow.contact_point;
            const normal = phys.narrow.contact_normal;
            const len = $bog_gamengine_phys3_debug.normal_len;
            for (let i = 0; i < count; ++i) {
                const p = i * 3, o = i * 6;
                buf[o] = point[p];
                buf[o + 1] = point[p + 1];
                buf[o + 2] = point[p + 2];
                buf[o + 3] = point[p] + normal[p] * len;
                buf[o + 4] = point[p + 1] + normal[p + 1] * len;
                buf[o + 5] = point[p + 2] + normal[p + 2] * len;
            }
            buf.fill(0, need);
            return buf;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_debug.prototype, "phys3", null);
    $.$bog_gamengine_phys3_debug = $bog_gamengine_phys3_debug;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_body extends $bog_gamengine_node {
        phys3(next) {
            return next ?? new $bog_gamengine_phys3;
        }
        shape(next) {
            return next ?? $bog_gamengine_phys3.shape_box;
        }
        size(next) {
            return next ?? new Float32Array([0.5, 0.5, 0.5]);
        }
        mass(next) {
            if (next !== undefined && this.handle_last)
                this.world_last.mass_of(this.handle_last, next);
            return next ?? 1;
        }
        ghost(next) {
            if (next !== undefined && this.handle_last)
                this.world_last.ghost_of(this.handle_last, next);
            return next ?? false;
        }
        kinematic(next) {
            if (next !== undefined && this.handle_last)
                this.world_last.kinematic_of(this.handle_last, next);
            return next ?? false;
        }
        handle_last = 0;
        world_last = null;
        mass_now = NaN;
        ghost_now = null;
        kinematic_now = null;
        pos_out = new Float32Array(3);
        rot_out = new Float32Array(3);
        rot_tmp = new Float32Array(4);
        mass_set(next) {
            this.mass_now = next;
            if (this.handle_last)
                this.world_last.mass_of(this.handle_last, next);
        }
        ghost_set(next) {
            this.ghost_now = next;
            if (this.handle_last)
                this.world_last.ghost_of(this.handle_last, next);
        }
        kinematic_set(next) {
            this.kinematic_now = next;
            if (this.handle_last)
                this.world_last.kinematic_of(this.handle_last, next);
        }
        handle() {
            if (this.handle_last)
                return this.handle_last;
            const world = this.phys3();
            this.world_last = world;
            const mass = Number.isNaN(this.mass_now) ? this.mass() : this.mass_now;
            this.handle_last = world.add(this.shape(), this.size(), mass, this.pos_out);
            world.ghost_of(this.handle_last, this.ghost_now ?? this.ghost());
            world.kinematic_of(this.handle_last, this.kinematic_now ?? this.kinematic());
            return this.handle_last;
        }
        index() {
            const handle = this.handle();
            return this.world_last.index_of(handle);
        }
        alive() {
            return this.index() >= 0;
        }
        pos(next) {
            const i = this.index();
            if (i < 0) {
                if (next)
                    this.pos_out.set(next);
                return this.pos_out;
            }
            const world = this.world_last;
            if (next)
                world.move(this.handle_last, next);
            this.pos_out.set(world.pos.subarray(i * 3, i * 3 + 3));
            return this.pos_out;
        }
        rot(next) {
            const i = this.index();
            if (i < 0)
                return this.rot_out;
            const world = this.world_last;
            if (next) {
                $bog_gamengine_vec_quat_from_euler(this.rot_tmp, next[0], next[1], next[2]);
                world.move(this.handle_last, world.pos_view[i], this.rot_tmp);
            }
            $bog_gamengine_vec_quat_to_euler(this.rot_out, world.rot.subarray(i * 4, i * 4 + 4));
            return this.rot_out;
        }
        props() {
            return [
                ...super.props(),
                { name: 'mass', kind: 'number', get: () => this.mass(), set: next => this.mass_set(next) },
                { name: 'ghost', kind: 'flag', get: () => this.ghost(), set: next => this.ghost_set(next) },
                { name: 'kinematic', kind: 'flag', get: () => this.kinematic(), set: next => this.kinematic_set(next) },
            ];
        }
        destructor() {
            if (this.handle_last)
                this.world_last?.remove(this.handle_last);
            this.handle_last = 0;
            this.world_last = null;
            super.destructor();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_body.prototype, "phys3", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_body.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_body.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_body.prototype, "mass", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_body.prototype, "ghost", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys3_body.prototype, "kinematic", null);
    $.$bog_gamengine_phys3_body = $bog_gamengine_phys3_body;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_demo_boxes_platform extends $bog_gamengine_phys3_body {
        span(next = 2) {
            return next;
        }
        speed(next = 0.6) {
            return next;
        }
        center(next) {
            return next ?? new Float32Array(3);
        }
        way = 1;
        step(dt) {
            const i = this.index();
            if (i < 0)
                return;
            const world = this.world_last;
            const span = this.span();
            const from = this.center()[0];
            const at = world.pos[i * 3];
            if (at > from + span)
                this.way = -1;
            if (at < from - span)
                this.way = 1;
            world.vel[i * 3] = this.way * this.speed();
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_boxes_platform.prototype, "span", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_boxes_platform.prototype, "speed", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_boxes_platform.prototype, "center", null);
    $.$bog_gamengine_demo_boxes_platform = $bog_gamengine_demo_boxes_platform;
})($ || ($ = {}));

;
	($.$bog_gamengine_demo_boxes) = class $bog_gamengine_demo_boxes extends ($.$mol_page) {
		count(next){
			if(next !== undefined) return next;
			return 300;
		}
		Count(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.count(next)));
			(obj.value_min) = () => (1);
			return obj;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Сброс");
			(obj.click) = (next) => ((this.reset(next)));
			return obj;
		}
		chain(next){
			if(next !== undefined) return next;
			return null;
		}
		Chain(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Цепь");
			(obj.click) = (next) => ((this.chain(next)));
			return obj;
		}
		door(next){
			if(next !== undefined) return next;
			return null;
		}
		Door(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ("Дверь");
			(obj.click) = (next) => ((this.door(next)));
			return obj;
		}
		Wireframe(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Каркас");
			(obj.checked) = (next) => ((this.wireframe(next)));
			return obj;
		}
		contacts(next){
			if(next !== undefined) return next;
			return false;
		}
		Contacts(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Контакты");
			(obj.checked) = (next) => ((this.contacts(next)));
			return obj;
		}
		Pause(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Пауза");
			(obj.checked) = (next) => ((this.paused(next)));
			return obj;
		}
		wireframe(next){
			return (this.Draw().wireframe(next));
		}
		stat(){
			return (this.Draw().stat());
		}
		shoot(next){
			if(next !== undefined) return next;
			return null;
		}
		dig(next){
			if(next !== undefined) return next;
			return null;
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.Walker()));
			(obj.event) = () => ({"pointerdown": (next) => (this.shoot(next)), "contextmenu": (next) => (this.dig(next))});
			return obj;
		}
		Stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.stat())]);
			return obj;
		}
		phys_stat(){
			return "";
		}
		Phys_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.phys_stat())]);
			return obj;
		}
		cull_stat(){
			return "";
		}
		Cull_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.cull_stat())]);
			return obj;
		}
		paused(next){
			return (this.Clock().paused(next));
		}
		nodes(){
			return [];
		}
		batches(){
			return [];
		}
		aspect(){
			return 1;
		}
		Solid(){
			const obj = new this.$.$bog_gamengine_shader_solid();
			return obj;
		}
		Box(){
			const obj = new this.$.$bog_gamengine_shape_box();
			return obj;
		}
		Flat(){
			const obj = new this.$.$bog_gamengine_shader_flat();
			return obj;
		}
		contact_points(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		contact_count(){
			return 0;
		}
		Lines(){
			const obj = new this.$.$bog_gamengine_shape_lines();
			(obj.points) = () => ((this.contact_points()));
			(obj.count) = () => ((this.contact_count()));
			return obj;
		}
		floor_tile(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		Plane(){
			const obj = new this.$.$bog_gamengine_shape_plane();
			(obj.tile) = () => ((this.floor_tile()));
			return obj;
		}
		floor_size(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		platform_size(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		walker_pos(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		walker_rot(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		title(){
			return "Ящики";
		}
		tools(){
			return [
				(this.Count()), 
				(this.Reset()), 
				(this.Chain()), 
				(this.Door()), 
				(this.Wireframe()), 
				(this.Contacts()), 
				(this.Pause())
			];
		}
		body(){
			return [(this.Draw())];
		}
		foot(){
			return [
				(this.Stat()), 
				(this.Phys_stat()), 
				(this.Cull_stat())
			];
		}
		seed(next){
			if(next !== undefined) return next;
			return 1;
		}
		Input(){
			const obj = new this.$.$bog_gamengine_input();
			(obj.key) = () => ((this.Key()));
			return obj;
		}
		Key(){
			const obj = new this.$.$bog_gamengine_key();
			(obj.bind) = () => ({
				"forward": ["W"], 
				"back": ["S"], 
				"left": ["A"], 
				"right": ["D"], 
				"turn_left": ["Q"], 
				"turn_right": ["E"]
			});
			return obj;
		}
		Atlas(){
			const obj = new this.$.$bog_gamengine_atlas();
			(obj.uris) = () => (["bog/gamengine/demo/atlas/wall.png", "bog/gamengine/demo/atlas/floor.png"]);
			(obj.size) = () => (64);
			return obj;
		}
		Clock(){
			const obj = new this.$.$bog_gamengine_clock();
			return obj;
		}
		Phys(){
			const obj = new this.$.$bog_gamengine_demo_boxes_phys();
			return obj;
		}
		Scene(){
			const obj = new this.$.$bog_gamengine_scene();
			(obj.clock) = () => ((this.Clock()));
			(obj.input) = () => ((this.Input()));
			(obj.kids) = () => ((this.nodes()));
			(obj.phys3) = () => ((this.Phys()));
			(obj.batches) = () => ((this.batches()));
			(obj.cam) = () => ((this.Walker()));
			(obj.aspect) = () => ((this.aspect()));
			(obj.Shader_solid) = () => ((this.Solid()));
			return obj;
		}
		Crates(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Solid()));
			(obj.shape) = () => ((this.Box()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.source) = () => ((this.Phys()));
			(obj.skip) = () => (1);
			return obj;
		}
		Contact_batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Flat()));
			(obj.shape) = () => ((this.Lines()));
			(obj.instances) = () => (1);
			return obj;
		}
		Debug(){
			const obj = new this.$.$bog_gamengine_phys3_debug();
			(obj.phys3) = () => ((this.Phys()));
			return obj;
		}
		Floor(){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Plane()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("floor");
			(obj.size) = () => ((this.floor_size()));
			return obj;
		}
		Thrown(id){
			const obj = new this.$.$bog_gamengine_phys3_body();
			(obj.name) = () => ("Брошенный");
			return obj;
		}
		Platform(id){
			const obj = new this.$.$bog_gamengine_demo_boxes_platform();
			(obj.name) = () => ("Платформа");
			(obj.phys3) = () => ((this.Phys()));
			(obj.size) = () => ((this.platform_size()));
			(obj.mass) = () => (0);
			(obj.kinematic) = () => (true);
			return obj;
		}
		Walker(){
			const obj = new this.$.$bog_gamengine_demo_room_walker();
			(obj.input) = () => ((this.Input()));
			(obj.pos) = (next) => ((this.walker_pos(next)));
			(obj.rot) = (next) => ((this.walker_rot(next)));
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "count"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Count"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "reset"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Reset"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "chain"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Chain"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "door"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Door"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Wireframe"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "contacts"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Contacts"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Pause"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "shoot"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "dig"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Phys_stat"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Cull_stat"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Solid"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Box"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Flat"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "contact_points"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Lines"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "floor_tile"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Plane"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "floor_size"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "platform_size"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "walker_pos"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "walker_rot"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "seed"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Input"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Key"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Atlas"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Phys"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Crates"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Contact_batch"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Debug"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Floor"));
	($mol_mem_key(($.$bog_gamengine_demo_boxes.prototype), "Thrown"));
	($mol_mem_key(($.$bog_gamengine_demo_boxes.prototype), "Platform"));
	($mol_mem(($.$bog_gamengine_demo_boxes.prototype), "Walker"));


;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys3_cast extends $mol_object2 {
        static tolerance = 1e-3;
        static iterations = 32;
        world = {};
        shape = new Uint8Array(2);
        size = new Float32Array(6);
        pos = new Float32Array(6);
        rot = new Float32Array(8);
        hoff = new Uint32Array(2);
        hcnt = new Uint32Array(2);
        skip_ghost = false;
        skip_one = -1;
        skip_list = null;
        ud = new Float32Array(3);
        origin = new Float32Array(3);
        hit = new Float32Array(7);
        box_lo = new Float32Array(3);
        box_hi = new Float32Array(3);
        lo = new Float32Array(3);
        ld = new Float32Array(3);
        ln = new Float32Array(3);
        pn = new Float32Array(3);
        tmp = new Float32Array(3);
        v = new Float64Array(3);
        wa = new Float64Array(3);
        wb = new Float64Array(3);
        pb = new Float64Array(3);
        last = new Float64Array(6);
        sw = new Float64Array(12);
        sa = new Float64Array(12);
        sb = new Float64Array(12);
        sn = 0;
        keep = new Int32Array(4);
        coef = new Float64Array(4);
        keep_n = 0;
        best_keep = new Int32Array(4);
        best_coef = new Float64Array(4);
        best_n = 0;
        opts_read(opts) {
            this.skip_ghost = opts?.skip_ghost ?? false;
            const skip = opts?.skip;
            if (typeof skip === 'number') {
                this.skip_one = skip;
                this.skip_list = null;
            }
            else {
                this.skip_one = -1;
                this.skip_list = skip ?? null;
            }
        }
        skipped(i) {
            if (i === this.skip_one)
                return true;
            if (this.skip_ghost && this.world.flags[i] & $bog_gamengine_phys3.flag_ghost)
                return true;
            const list = this.skip_list;
            if (!list)
                return false;
            for (let k = 0; k < list.length; ++k)
                if (list[k] === i)
                    return true;
            return false;
        }
        ray(world, origin, dir, max, out, opts) {
            this.world = world;
            this.opts_read(opts);
            const ud = this.ud;
            const len = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2]);
            if (!(len > 0) || !(max > 0))
                return -1;
            ud[0] = dir[0] / len;
            ud[1] = dir[1] / len;
            ud[2] = dir[2] / len;
            const o = this.origin;
            o[0] = origin[0];
            o[1] = origin[1];
            o[2] = origin[2];
            this.shape[0] = $bog_gamengine_phys3.shape_sphere;
            this.size[0] = this.size[1] = this.size[2] = 0;
            this.pos[0] = o[0];
            this.pos[1] = o[1];
            this.pos[2] = o[2];
            this.rot[0] = this.rot[1] = this.rot[2] = 0;
            this.rot[3] = 1;
            const shape = world.shape;
            const hit = this.hit;
            let best = -1;
            let limit = max;
            for (let i = 0; i < world.count; ++i) {
                if (this.skipped(i))
                    continue;
                if (shape[i] !== $bog_gamengine_phys3.shape_plane && !this.slab(i, limit))
                    continue;
                this.load(1, i);
                let t = -1;
                switch (shape[i]) {
                    case $bog_gamengine_phys3.shape_sphere:
                        t = this.ray_sphere(limit);
                        break;
                    case $bog_gamengine_phys3.shape_box:
                        t = this.ray_box(limit);
                        break;
                    case $bog_gamengine_phys3.shape_capsule:
                        t = this.ray_capsule(limit);
                        break;
                    case $bog_gamengine_phys3.shape_plane:
                        t = this.sweep_plane(limit);
                        break;
                    default: t = this.advance(limit);
                }
                if (t < 0 || t > limit)
                    continue;
                best = i;
                limit = t;
                out.set(hit);
            }
            return best;
        }
        sweep(world, shape, size, origin, rot, dir, max, out, opts) {
            this.world = world;
            this.opts_read(opts);
            const ud = this.ud;
            const len = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2]);
            if (!(len > 0) || !(max > 0))
                return -1;
            ud[0] = dir[0] / len;
            ud[1] = dir[1] / len;
            ud[2] = dir[2] / len;
            const o = this.origin;
            o[0] = origin[0];
            o[1] = origin[1];
            o[2] = origin[2];
            this.shape[0] = shape;
            this.size[0] = size[0];
            this.size[1] = size[1];
            this.size[2] = size[2];
            this.rot[0] = rot[0];
            this.rot[1] = rot[1];
            this.rot[2] = rot[2];
            this.rot[3] = rot[3];
            this.pos[0] = o[0];
            this.pos[1] = o[1];
            this.pos[2] = o[2];
            this.bounds(max);
            const shapes = world.shape, aabb = world.aabb;
            const lo = this.box_lo, hi = this.box_hi;
            const hit = this.hit;
            let best = -1;
            let limit = max;
            for (let i = 0; i < world.count; ++i) {
                if (this.skipped(i))
                    continue;
                const a = i * 6;
                if (aabb[a] > hi[0] || aabb[a + 3] < lo[0])
                    continue;
                if (aabb[a + 1] > hi[1] || aabb[a + 4] < lo[1])
                    continue;
                if (aabb[a + 2] > hi[2] || aabb[a + 5] < lo[2])
                    continue;
                this.load(1, i);
                let t = -1;
                const sb = shapes[i];
                if (sb === $bog_gamengine_phys3.shape_plane)
                    t = this.sweep_plane(limit);
                else if (sb === $bog_gamengine_phys3.shape_sphere && shape === $bog_gamengine_phys3.shape_sphere)
                    t = this.ray_sphere(limit);
                else
                    t = this.advance(limit);
                if (t < 0 || t > limit)
                    continue;
                best = i;
                limit = t;
                out.set(hit);
            }
            return best;
        }
        load(s, i) {
            const world = this.world;
            this.shape[s] = world.shape[i];
            this.size[s * 3] = world.size[i * 3];
            this.size[s * 3 + 1] = world.size[i * 3 + 1];
            this.size[s * 3 + 2] = world.size[i * 3 + 2];
            this.pos[s * 3] = world.pos[i * 3];
            this.pos[s * 3 + 1] = world.pos[i * 3 + 1];
            this.pos[s * 3 + 2] = world.pos[i * 3 + 2];
            this.rot[s * 4] = world.rot[i * 4];
            this.rot[s * 4 + 1] = world.rot[i * 4 + 1];
            this.rot[s * 4 + 2] = world.rot[i * 4 + 2];
            this.rot[s * 4 + 3] = world.rot[i * 4 + 3];
            this.hoff[s] = world.hull_off[i];
            this.hcnt[s] = world.hull_count[i];
        }
        bounds(max) {
            const lo = this.box_lo, hi = this.box_hi, tmp = this.tmp, ud = this.ud;
            for (let k = 0; k < 3; ++k) {
                this.support(0, k === 0 ? 1 : 0, k === 1 ? 1 : 0, k === 2 ? 1 : 0, tmp);
                hi[k] = tmp[k];
                this.support(0, k === 0 ? -1 : 0, k === 1 ? -1 : 0, k === 2 ? -1 : 0, tmp);
                lo[k] = tmp[k];
                const d = ud[k] * max;
                if (d > 0)
                    hi[k] += d;
                else
                    lo[k] += d;
            }
        }
        slab(i, max) {
            const aabb = this.world.aabb, a = i * 6;
            const o = this.origin, ud = this.ud;
            let t0 = 0, t1 = max;
            for (let k = 0; k < 3; ++k) {
                const d = ud[k];
                if (d === 0) {
                    if (o[k] < aabb[a + k] || o[k] > aabb[a + k + 3])
                        return false;
                    continue;
                }
                const inv = 1 / d;
                let n = (aabb[a + k] - o[k]) * inv;
                let f = (aabb[a + k + 3] - o[k]) * inv;
                if (n > f) {
                    const s = n;
                    n = f;
                    f = s;
                }
                if (n > t0)
                    t0 = n;
                if (f < t1)
                    t1 = f;
                if (t0 > t1)
                    return false;
            }
            return true;
        }
        rotate(out, s, x, y, z, inv) {
            const q = this.rot, r = s * 4;
            const k = inv ? -1 : 1;
            const qx = q[r] * k, qy = q[r + 1] * k, qz = q[r + 2] * k, qw = q[r + 3];
            const tx = 2 * (qy * z - qz * y);
            const ty = 2 * (qz * x - qx * z);
            const tz = 2 * (qx * y - qy * x);
            out[0] = x + qw * tx + qy * tz - qz * ty;
            out[1] = y + qw * ty + qz * tx - qx * tz;
            out[2] = z + qw * tz + qx * ty - qy * tx;
            return out;
        }
        support(s, dx, dy, dz, out) {
            const shape = this.shape[s], size = this.size, so = s * 3, pos = this.pos;
            if (shape === $bog_gamengine_phys3.shape_sphere) {
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const k = len > 0 ? size[so] / len : 0;
                out[0] = dx * k;
                out[1] = dy * k;
                out[2] = dz * k;
            }
            else if (shape === $bog_gamengine_phys3.shape_box) {
                const l = this.rotate(this.tmp, s, dx, dy, dz, true);
                this.rotate(out, s, l[0] >= 0 ? size[so] : -size[so], l[1] >= 0 ? size[so + 1] : -size[so + 1], l[2] >= 0 ? size[so + 2] : -size[so + 2], false);
            }
            else if (shape === $bog_gamengine_phys3.shape_capsule) {
                const l = this.rotate(this.tmp, s, dx, dy, dz, true);
                this.rotate(out, s, 0, l[1] >= 0 ? size[so + 1] : -size[so + 1], 0, false);
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const k = len > 0 ? size[so] / len : 0;
                out[0] += dx * k;
                out[1] += dy * k;
                out[2] += dz * k;
            }
            else if (shape === $bog_gamengine_phys3.shape_hull) {
                const l = this.rotate(this.tmp, s, dx, dy, dz, true);
                const hull = this.world.hull, off = this.hoff[s], count = this.hcnt[s];
                let best = -Infinity, bx = 0, by = 0, bz = 0;
                for (let k = 0; k < count; ++k) {
                    const vx = hull[off + k * 3], vy = hull[off + k * 3 + 1], vz = hull[off + k * 3 + 2];
                    const d = vx * l[0] + vy * l[1] + vz * l[2];
                    if (d > best) {
                        best = d;
                        bx = vx;
                        by = vy;
                        bz = vz;
                    }
                }
                this.rotate(out, s, bx, by, bz, false);
            }
            else {
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
            }
            out[0] += pos[so];
            out[1] += pos[so + 1];
            out[2] += pos[so + 2];
            return out;
        }
        record(t, px, py, pz, nx, ny, nz) {
            const hit = this.hit;
            hit[0] = t;
            hit[1] = px;
            hit[2] = py;
            hit[3] = pz;
            hit[4] = nx;
            hit[5] = ny;
            hit[6] = nz;
            return t;
        }
        ray_sphere(limit) {
            const o = this.origin, ud = this.ud, pos = this.pos;
            const r = this.size[3] + this.size[0];
            const mx = o[0] - pos[3], my = o[1] - pos[4], mz = o[2] - pos[5];
            const b = mx * ud[0] + my * ud[1] + mz * ud[2];
            const c = mx * mx + my * my + mz * mz - r * r;
            if (c > 0 && b > 0)
                return -1;
            const disc = b * b - c;
            if (disc < 0)
                return -1;
            let t = -b - Math.sqrt(disc);
            if (t < 0)
                t = 0;
            if (t > limit)
                return -1;
            const cx = o[0] + ud[0] * t, cy = o[1] + ud[1] * t, cz = o[2] + ud[2] * t;
            let nx = cx - pos[3], ny = cy - pos[4], nz = cz - pos[5];
            const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
            if (len > 0) {
                nx /= len;
                ny /= len;
                nz /= len;
            }
            else {
                nx = -ud[0];
                ny = -ud[1];
                nz = -ud[2];
            }
            const rb = this.size[3];
            return this.record(t, pos[3] + nx * rb, pos[4] + ny * rb, pos[5] + nz * rb, nx, ny, nz);
        }
        local() {
            const o = this.origin, ud = this.ud, pos = this.pos;
            this.rotate(this.lo, 1, o[0] - pos[3], o[1] - pos[4], o[2] - pos[5], true);
            this.rotate(this.ld, 1, ud[0], ud[1], ud[2], true);
        }
        local_hit(t, nx, ny, nz) {
            const o = this.origin, ud = this.ud;
            const n = this.rotate(this.ln, 1, nx, ny, nz, false);
            return this.record(t, o[0] + ud[0] * t, o[1] + ud[1] * t, o[2] + ud[2] * t, n[0], n[1], n[2]);
        }
        ray_box(limit) {
            this.local();
            const lo = this.lo, ld = this.ld, size = this.size;
            let t0 = 0, t1 = limit, axis = -1, sign = 0;
            for (let k = 0; k < 3; ++k) {
                const h = size[3 + k];
                const d = ld[k];
                if (Math.abs(d) < 1e-9) {
                    if (lo[k] < -h || lo[k] > h)
                        return -1;
                    continue;
                }
                const inv = 1 / d;
                let n = (-h - lo[k]) * inv;
                let f = (h - lo[k]) * inv;
                let s = -1;
                if (n > f) {
                    const x = n;
                    n = f;
                    f = x;
                    s = 1;
                }
                if (n > t0) {
                    t0 = n;
                    axis = k;
                    sign = s;
                }
                if (f < t1)
                    t1 = f;
                if (t0 > t1)
                    return -1;
            }
            if (axis < 0)
                return this.record(0, this.origin[0], this.origin[1], this.origin[2], -this.ud[0], -this.ud[1], -this.ud[2]);
            return this.local_hit(t0, axis === 0 ? sign : 0, axis === 1 ? sign : 0, axis === 2 ? sign : 0);
        }
        ray_capsule(limit) {
            this.local();
            const lo = this.lo, ld = this.ld;
            const r = this.size[3], h = this.size[4];
            const cy = Math.max(-h, Math.min(h, lo[1]));
            if (lo[0] * lo[0] + (lo[1] - cy) * (lo[1] - cy) + lo[2] * lo[2] <= r * r) {
                return this.record(0, this.origin[0], this.origin[1], this.origin[2], -this.ud[0], -this.ud[1], -this.ud[2]);
            }
            let best = Infinity, nx = 0, ny = 0, nz = 0;
            const a = ld[0] * ld[0] + ld[2] * ld[2];
            if (a > 1e-12) {
                const b = lo[0] * ld[0] + lo[2] * ld[2];
                const c = lo[0] * lo[0] + lo[2] * lo[2] - r * r;
                const disc = b * b - a * c;
                if (disc >= 0) {
                    const t = (-b - Math.sqrt(disc)) / a;
                    const y = lo[1] + ld[1] * t;
                    if (t >= 0 && t <= limit && y >= -h && y <= h) {
                        best = t;
                        nx = (lo[0] + ld[0] * t) / r;
                        ny = 0;
                        nz = (lo[2] + ld[2] * t) / r;
                    }
                }
            }
            for (let s = -1; s <= 1; s += 2) {
                const my = lo[1] - h * s;
                const b = lo[0] * ld[0] + my * ld[1] + lo[2] * ld[2];
                const c = lo[0] * lo[0] + my * my + lo[2] * lo[2] - r * r;
                const disc = b * b - c;
                if (disc < 0)
                    continue;
                const t = -b - Math.sqrt(disc);
                if (t < 0 || t > limit || t >= best)
                    continue;
                best = t;
                nx = (lo[0] + ld[0] * t) / r;
                ny = (my + ld[1] * t) / r;
                nz = (lo[2] + ld[2] * t) / r;
            }
            if (best > limit)
                return -1;
            return this.local_hit(best, nx, ny, nz);
        }
        sweep_plane(limit) {
            const n = this.rotate(this.pn, 1, this.size[3], this.size[4], this.size[5], false);
            const len = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
            if (!(len > 0))
                return -1;
            n[0] /= len;
            n[1] /= len;
            n[2] /= len;
            const pos = this.pos, ud = this.ud;
            const deep = this.support(0, -n[0], -n[1], -n[2], this.tmp);
            const d0 = (deep[0] - pos[3]) * n[0] + (deep[1] - pos[4]) * n[1] + (deep[2] - pos[5]) * n[2];
            if (d0 <= 0)
                return this.record(0, deep[0], deep[1], deep[2], n[0], n[1], n[2]);
            const approach = -(ud[0] * n[0] + ud[1] * n[1] + ud[2] * n[2]);
            if (approach <= 1e-9)
                return -1;
            const t = d0 / approach;
            if (t > limit)
                return -1;
            return this.record(t, deep[0] + ud[0] * t, deep[1] + ud[1] * t, deep[2] + ud[2] * t, n[0], n[1], n[2]);
        }
        advance(limit) {
            const o = this.origin, ud = this.ud, pos = this.pos, v = this.v, pb = this.pb, last = this.last;
            const tol = $bog_gamengine_phys3_cast.tolerance;
            pos[0] = o[0];
            pos[1] = o[1];
            pos[2] = o[2];
            let t = 0;
            for (let iter = 0; iter < $bog_gamengine_phys3_cast.iterations; ++iter) {
                const d = this.gjk();
                if (d < tol) {
                    if (this.sn !== 4) {
                        const approach = -(ud[0] * v[0] + ud[1] * v[1] + ud[2] * v[2]);
                        if (approach > 0.1)
                            t = Math.min(limit, t + d / approach);
                        return this.record(t, pb[0], pb[1], pb[2], v[0], v[1], v[2]);
                    }
                    if (iter === 0)
                        return this.record(0, pos[0], pos[1], pos[2], -ud[0], -ud[1], -ud[2]);
                    return this.record(t, last[0], last[1], last[2], last[3], last[4], last[5]);
                }
                const approach = -(ud[0] * v[0] + ud[1] * v[1] + ud[2] * v[2]);
                if (approach <= 1e-6)
                    return -1;
                last[0] = pb[0];
                last[1] = pb[1];
                last[2] = pb[2];
                last[3] = v[0];
                last[4] = v[1];
                last[5] = v[2];
                t += d / approach;
                if (t > limit)
                    return -1;
                pos[0] = o[0] + ud[0] * t;
                pos[1] = o[1] + ud[1] * t;
                pos[2] = o[2] + ud[2] * t;
            }
            return -1;
        }
        gjk() {
            const v = this.v, wa = this.wa, wb = this.wb, sw = this.sw, sa = this.sa, sb = this.sb, pos = this.pos;
            v[0] = pos[0] - pos[3];
            v[1] = pos[1] - pos[4];
            v[2] = pos[2] - pos[5];
            let vv = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
            if (vv < 1e-12) {
                v[0] = 1;
                vv = 1;
            }
            this.sn = 0;
            for (let iter = 0; iter < 48; ++iter) {
                this.support(0, -v[0], -v[1], -v[2], wa);
                this.support(1, v[0], v[1], v[2], wb);
                const wx = wa[0] - wb[0], wy = wa[1] - wb[1], wz = wa[2] - wb[2];
                const vw = v[0] * wx + v[1] * wy + v[2] * wz;
                if (this.sn > 0 && vv - vw <= 1e-6 * vv + 1e-6 * Math.sqrt(vv))
                    break;
                let dup = false;
                for (let k = 0; k < this.sn; ++k) {
                    if (sw[k * 3] === wx && sw[k * 3 + 1] === wy && sw[k * 3 + 2] === wz)
                        dup = true;
                }
                if (dup)
                    break;
                const k = this.sn;
                sw[k * 3] = wx;
                sw[k * 3 + 1] = wy;
                sw[k * 3 + 2] = wz;
                sa[k * 3] = wa[0];
                sa[k * 3 + 1] = wa[1];
                sa[k * 3 + 2] = wa[2];
                sb[k * 3] = wb[0];
                sb[k * 3 + 1] = wb[1];
                sb[k * 3 + 2] = wb[2];
                this.sn = k + 1;
                if (!this.reduce()) {
                    this.sn = 4;
                    return 0;
                }
                vv = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
                if (vv < 1e-12) {
                    this.sn = 4;
                    return 0;
                }
            }
            const d = Math.sqrt(vv);
            const pb = this.pb;
            pb[0] = pb[1] = pb[2] = 0;
            for (let k = 0; k < this.sn; ++k) {
                const c = this.coef[k];
                pb[0] += sb[k * 3] * c;
                pb[1] += sb[k * 3 + 1] * c;
                pb[2] += sb[k * 3 + 2] * c;
            }
            v[0] /= d;
            v[1] /= d;
            v[2] /= d;
            return d;
        }
        reduce() {
            const sn = this.sn, sw = this.sw, sa = this.sa, sb = this.sb, keep = this.keep, coef = this.coef;
            if (sn === 1) {
                keep[0] = 0;
                coef[0] = 1;
                this.keep_n = 1;
            }
            else if (sn === 2) {
                this.segment(0, 1);
            }
            else if (sn === 3) {
                this.triangle(0, 1, 2);
            }
            else {
                if (!this.tetra())
                    return false;
            }
            const n = this.keep_n;
            for (let k = 0; k < n; ++k) {
                const from = keep[k];
                if (from === k)
                    continue;
                sw[k * 3] = sw[from * 3];
                sw[k * 3 + 1] = sw[from * 3 + 1];
                sw[k * 3 + 2] = sw[from * 3 + 2];
                sa[k * 3] = sa[from * 3];
                sa[k * 3 + 1] = sa[from * 3 + 1];
                sa[k * 3 + 2] = sa[from * 3 + 2];
                sb[k * 3] = sb[from * 3];
                sb[k * 3 + 1] = sb[from * 3 + 1];
                sb[k * 3 + 2] = sb[from * 3 + 2];
            }
            this.sn = n;
            const v = this.v;
            v[0] = v[1] = v[2] = 0;
            for (let k = 0; k < n; ++k) {
                const c = coef[k];
                v[0] += sw[k * 3] * c;
                v[1] += sw[k * 3 + 1] * c;
                v[2] += sw[k * 3 + 2] * c;
            }
            return true;
        }
        segment(i, j) {
            const sw = this.sw, keep = this.keep, coef = this.coef;
            const ax = sw[i * 3], ay = sw[i * 3 + 1], az = sw[i * 3 + 2];
            const bx = sw[j * 3] - ax, by = sw[j * 3 + 1] - ay, bz = sw[j * 3 + 2] - az;
            const bb = bx * bx + by * by + bz * bz;
            let t = bb > 0 ? -(ax * bx + ay * by + az * bz) / bb : 0;
            if (t <= 0) {
                keep[0] = i;
                coef[0] = 1;
                this.keep_n = 1;
            }
            else if (t >= 1) {
                keep[0] = j;
                coef[0] = 1;
                this.keep_n = 1;
            }
            else {
                keep[0] = i;
                keep[1] = j;
                coef[0] = 1 - t;
                coef[1] = t;
                this.keep_n = 2;
            }
            const px = ax + bx * t, py = ay + by * t, pz = az + bz * t;
            return px * px + py * py + pz * pz;
        }
        triangle(i, j, k) {
            const sw = this.sw, keep = this.keep, coef = this.coef;
            const ax = sw[i * 3], ay = sw[i * 3 + 1], az = sw[i * 3 + 2];
            const bx = sw[j * 3], by = sw[j * 3 + 1], bz = sw[j * 3 + 2];
            const cx = sw[k * 3], cy = sw[k * 3 + 1], cz = sw[k * 3 + 2];
            const abx = bx - ax, aby = by - ay, abz = bz - az;
            const acx = cx - ax, acy = cy - ay, acz = cz - az;
            const d1 = -(abx * ax + aby * ay + abz * az);
            const d2 = -(acx * ax + acy * ay + acz * az);
            if (d1 <= 0 && d2 <= 0) {
                keep[0] = i;
                coef[0] = 1;
                this.keep_n = 1;
                return ax * ax + ay * ay + az * az;
            }
            const d3 = -(abx * bx + aby * by + abz * bz);
            const d4 = -(acx * bx + acy * by + acz * bz);
            if (d3 >= 0 && d4 <= d3) {
                keep[0] = j;
                coef[0] = 1;
                this.keep_n = 1;
                return bx * bx + by * by + bz * bz;
            }
            const vc = d1 * d4 - d3 * d2;
            if (vc <= 0 && d1 >= 0 && d3 <= 0)
                return this.segment(i, j);
            const d5 = -(abx * cx + aby * cy + abz * cz);
            const d6 = -(acx * cx + acy * cy + acz * cz);
            if (d6 >= 0 && d5 <= d6) {
                keep[0] = k;
                coef[0] = 1;
                this.keep_n = 1;
                return cx * cx + cy * cy + cz * cz;
            }
            const vb = d5 * d2 - d1 * d6;
            if (vb <= 0 && d2 >= 0 && d6 <= 0)
                return this.segment(i, k);
            const va = d3 * d6 - d5 * d4;
            if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0)
                return this.segment(j, k);
            const denom = 1 / (va + vb + vc);
            const wb = vb * denom, wc = vc * denom;
            keep[0] = i;
            keep[1] = j;
            keep[2] = k;
            coef[0] = 1 - wb - wc;
            coef[1] = wb;
            coef[2] = wc;
            this.keep_n = 3;
            const px = ax + abx * wb + acx * wc, py = ay + aby * wb + acy * wc, pz = az + abz * wb + acz * wc;
            return px * px + py * py + pz * pz;
        }
        outside(i, j, k, l) {
            const sw = this.sw;
            const ax = sw[i * 3], ay = sw[i * 3 + 1], az = sw[i * 3 + 2];
            const abx = sw[j * 3] - ax, aby = sw[j * 3 + 1] - ay, abz = sw[j * 3 + 2] - az;
            const acx = sw[k * 3] - ax, acy = sw[k * 3 + 1] - ay, acz = sw[k * 3 + 2] - az;
            const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx;
            const so = -(nx * ax + ny * ay + nz * az);
            const sl = nx * (sw[l * 3] - ax) + ny * (sw[l * 3 + 1] - ay) + nz * (sw[l * 3 + 2] - az);
            return so * sl <= 0;
        }
        tetra() {
            let best = Infinity;
            let any = false;
            for (let f = 0; f < 4; ++f) {
                const i = f === 0 ? 1 : 0;
                const j = f <= 1 ? 2 : 1;
                const k = f <= 2 ? 3 : 2;
                if (!this.outside(i, j, k, f))
                    continue;
                any = true;
                const d = this.triangle(i, j, k);
                if (d < best) {
                    best = d;
                    this.best_n = this.keep_n;
                    for (let m = 0; m < this.keep_n; ++m) {
                        this.best_keep[m] = this.keep[m];
                        this.best_coef[m] = this.coef[m];
                    }
                }
            }
            if (!any)
                return false;
            this.keep_n = this.best_n;
            for (let m = 0; m < this.best_n; ++m) {
                this.keep[m] = this.best_keep[m];
                this.coef[m] = this.best_coef[m];
            }
            return true;
        }
    }
    $.$bog_gamengine_phys3_cast = $bog_gamengine_phys3_cast;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const box_half = 0.5;
        const pile_gap = 0.1;
        const pile_step = box_half * 2 * Math.sqrt(3) + pile_gap;
        const pile_layers = 3;
        const throw_speed = 8;
        const throw_ahead = 1.5;
        const chain_links = 5;
        const chain_half = 0.3;
        const chain_link = 1;
        const chain_top = 6;
        const chain_x = -4;
        const chain_push = 2;
        const door_x = 4;
        const door_lift = 0.05;
        const side_ahead = 3;
        const plat_half = 1.2;
        const plat_thick = 0.15;
        const plat_y = 0.6;
        const plat_ahead = 2;
        const plat_x = -6;
        const plat_load = 3;
        const plat_load_half = 0.3;
        const dig_reach = 60;
        function $bog_gamengine_demo_boxes_rand(seed) {
            let state = seed | 0;
            return () => {
                state = (state + 0x6D2B79F5) | 0;
                let t = Math.imul(state ^ (state >>> 15), 1 | state);
                t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        }
        $$.$bog_gamengine_demo_boxes_rand = $bog_gamengine_demo_boxes_rand;
        class $bog_gamengine_demo_boxes extends $.$bog_gamengine_demo_boxes {
            count(next) {
                if (next !== undefined)
                    return next;
                return Number(this.$.$mol_state_arg.value('count')) || super.count();
            }
            reset(next) {
                if (!next)
                    return null;
                this.seed(this.seed() + 1);
                this.thrown_count(0);
                return next;
            }
            platform_on() {
                return this.count() > plat_load + 1;
            }
            pile_count() {
                const count = this.count();
                return this.platform_on() ? count - plat_load - 1 : count;
            }
            pile_side() {
                return Math.ceil(Math.sqrt(this.pile_count() / pile_layers));
            }
            Phys() {
                const count = this.pile_count();
                const rand = $bog_gamengine_demo_boxes_rand(this.seed());
                const phys = new this.$.$bog_gamengine_demo_boxes_phys;
                this.chain_head = 0;
                this.chain_tail = 0;
                this.floor_handle = phys.add($bog_gamengine_phys3.shape_plane, new Float32Array([0, 1, 0]), 0, new Float32Array(3));
                const side = this.pile_side();
                const size = new Float32Array([box_half, box_half, box_half]);
                const pos = new Float32Array(3);
                const rot = new Float32Array(4);
                for (let i = 0; i < count; ++i) {
                    const cell = i % (side * side);
                    const layer = Math.floor(i / (side * side));
                    pos[0] = (cell % side - (side - 1) / 2) * pile_step;
                    pos[1] = box_half * 2 + layer * pile_step;
                    pos[2] = (Math.floor(cell / side) - (side - 1) / 2) * pile_step;
                    $bog_gamengine_vec_quat_from_euler(rot, rand() * Math.PI * 2, rand() * Math.PI * 2, rand() * Math.PI * 2);
                    phys.add($bog_gamengine_phys3.shape_box, size, 1, pos, rot);
                }
                if (!this.platform_on())
                    return phys;
                const load_size = new Float32Array([plat_load_half, plat_load_half, plat_load_half]);
                const load_pos = new Float32Array([plat_x, plat_y + plat_thick + plat_load_half, 0]);
                const plat_z = this.side_z() + plat_ahead;
                for (let n = 0; n < plat_load; ++n) {
                    load_pos[2] = plat_z + (n - (plat_load - 1) / 2) * plat_load_half * 2.5;
                    phys.add($bog_gamengine_phys3.shape_box, load_size, 1, load_pos);
                }
                return phys;
            }
            floor_handle = 0;
            platform_size() {
                return new Float32Array([plat_half, plat_thick, plat_half]);
            }
            platform() {
                const node = this.Platform(`${this.seed()}`);
                node.center(new Float32Array([plat_x, plat_y, this.side_z() + plat_ahead]));
                node.pos(node.center());
                return node;
            }
            floor_size() {
                return new Float32Array([60, 1, 60]);
            }
            floor_tile() {
                return new Float32Array([60, 60]);
            }
            walker_pos(next) {
                return next ?? new Float32Array([0, 1.5, (this.pile_side() - 1) / 2 * pile_step + 8]);
            }
            walker_rot(next) {
                return next ?? new Float32Array([-0.2, 0, 0]);
            }
            thrown_count(next = 0) {
                return next;
            }
            thrown() {
                const seed = this.seed();
                const list = [];
                for (let i = 0; i < this.thrown_count(); ++i)
                    list.push(this.Thrown(`${seed}_${i}`));
                return list;
            }
            nodes() {
                return [this.Floor(), this.Walker(), ...this.platform_on() ? [this.platform()] : [], ...this.thrown()];
            }
            batches() {
                const list = [this.Crates(), ...this.Scene().auto_batches()];
                if (this.contacts())
                    list.push(this.Contact_batch());
                return list;
            }
            contact_points() {
                this.Scene().step();
                return this.Debug().points();
            }
            contact_count() {
                this.Scene().step();
                return this.Phys().narrow.contact_count;
            }
            throw_dir = new Float32Array([0, 0, -1, 0]);
            throw_out = new Float32Array(4);
            dig_dir = new Float32Array(3);
            dig_hit = new Float32Array(7);
            dig_opts = { skip_ghost: true, skip: -1 };
            dig_cast = new $bog_gamengine_phys3_cast;
            dig(next) {
                if (!next)
                    return null;
                next.preventDefault();
                const phys = this.Phys();
                const dir = $bog_gamengine_vec_mat4_apply(this.throw_out, this.Walker().world(), this.throw_dir);
                const aim = this.dig_dir;
                aim[0] = dir[0];
                aim[1] = dir[1];
                aim[2] = dir[2];
                this.dig_opts.skip = phys.index_of(this.floor_handle);
                const i = this.dig_cast.ray(phys, this.Walker().pos(), aim, dig_reach, this.dig_hit, this.dig_opts);
                if (i >= 0)
                    phys.remove(phys.handle_of(i));
                return next;
            }
            shoot(next) {
                if (!next)
                    return null;
                const phys = this.Phys();
                const dir = $bog_gamengine_vec_mat4_apply(this.throw_out, this.Walker().world(), this.throw_dir);
                const from = this.Walker().pos();
                const id = this.thrown_count();
                const body = this.Thrown(`${this.seed()}_${id}`);
                body.phys3(phys);
                body.pos(new Float32Array([
                    from[0] + dir[0] * throw_ahead,
                    from[1] + dir[1] * throw_ahead,
                    from[2] + dir[2] * throw_ahead,
                ]));
                const i = body.index();
                phys.vel[i * 3] = dir[0] * throw_speed;
                phys.vel[i * 3 + 1] = dir[1] * throw_speed;
                phys.vel[i * 3 + 2] = dir[2] * throw_speed;
                this.thrown_count(id + 1);
                return next;
            }
            side_z() {
                return (this.pile_side() - 1) / 2 * pile_step + side_ahead;
            }
            chain_head = 0;
            chain_tail = 0;
            chain(next) {
                if (!next)
                    return null;
                const phys = this.Phys();
                const size = new Float32Array([chain_half, chain_half, chain_half]);
                const pos = new Float32Array([chain_x, 0, this.side_z()]);
                const top = new Float32Array([0, chain_link / 2, 0]);
                const bottom = new Float32Array([0, -chain_link / 2, 0]);
                const axis = new Float32Array([0, 0, 1]);
                const hook = new Float32Array([chain_x, chain_top, this.side_z()]);
                let prev = -1;
                for (let n = 0; n < chain_links; ++n) {
                    pos[1] = chain_top - chain_link / 2 - n * chain_link;
                    const handle = phys.add($bog_gamengine_phys3.shape_box, size, 1, pos);
                    const i = phys.index_of(handle);
                    this.chain_tail = handle;
                    if (n === 0) {
                        this.chain_head = handle;
                        phys.joint.add($bog_gamengine_phys3_joint.type_point, i, 0, top, hook);
                    }
                    else {
                        phys.joint.add($bog_gamengine_phys3_joint.type_hinge, i, prev, top, bottom, axis);
                    }
                    prev = i;
                }
                phys.vel[prev * 3] = chain_push;
                return next;
            }
            chain_drop() {
                const phys = this.Phys();
                const head = phys.pos_of(this.chain_head);
                const tail = phys.pos_of(this.chain_tail);
                if (!head || !tail)
                    return 0;
                return head[1] - tail[1];
            }
            door(next) {
                if (!next)
                    return null;
                const phys = this.Phys();
                const z = this.side_z();
                const post_size = new Float32Array([0.15, 1.5, 0.15]);
                const post = phys.index_of(phys.add($bog_gamengine_phys3.shape_box, post_size, 0, new Float32Array([door_x, 1.5, z])));
                const leaf_size = new Float32Array([0.5, 1, 0.1]);
                const leaf = phys.index_of(phys.add($bog_gamengine_phys3.shape_box, leaf_size, 1, new Float32Array([door_x + 0.8, 1 + door_lift, z])));
                phys.joint.add($bog_gamengine_phys3_joint.type_hinge, post, leaf, new Float32Array([0.3, door_lift - 0.5, 0]), new Float32Array([-0.5, 0, 0]), new Float32Array([0, 1, 0]), new Float32Array([-Math.PI / 2, Math.PI / 2]));
                return next;
            }
            aspect() {
                const aspect = this.Draw().width() / this.Draw().height();
                return Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
            }
            cull_stat() {
                this.Scene().step();
                const crates = this.Crates();
                return `drawn ${crates.count} / ${this.Phys().count - crates.skip()}`;
            }
            phys_stat() {
                this.Scene().step();
                const phys = this.Phys();
                return `bodies ${phys.count} | contacts ${phys.narrow.contact_count} | joints ${phys.joint.count} | chain_drop ${this.chain_drop().toFixed(2)} | phys ${phys.step_ms().toFixed(2)} ms | low ${phys.low().toFixed(2)}`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "count", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "Phys", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "platform_size", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "platform", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "floor_size", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "floor_tile", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "walker_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "walker_rot", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "thrown_count", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "thrown", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "nodes", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "batches", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "aspect", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "cull_stat", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_boxes.prototype, "phys_stat", null);
        $$.$bog_gamengine_demo_boxes = $bog_gamengine_demo_boxes;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_demo_boxes, {
            flex: {
                grow: 1,
            },
            '>': {
                $mol_scroll: {
                    '>': {
                        $mol_view: {
                            alignSelf: 'stretch',
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_demo_spin extends $bog_gamengine_node {
        tint() {
            return new Float32Array([1, 0.04, 0.04, 1]);
        }
        step(dt) {
            const rot = this.rot();
            this.rot(new Float32Array([rot[0], rot[1], rot[2] + dt]));
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_demo_spin.prototype, "tint", null);
    $.$bog_gamengine_demo_spin = $bog_gamengine_demo_spin;
})($ || ($ = {}));

;
	($.$bog_gamengine_demo) = class $bog_gamengine_demo extends ($.$mol_book2_catalog) {
		key_map(){
			return {};
		}
		Control(){
			const obj = new this.$.$mol_keyboard_state();
			(obj.key) = () => ((this.key_map()));
			return obj;
		}
		cam_kind(next){
			if(next !== undefined) return next;
			return "flat";
		}
		Cam_switch(){
			const obj = new this.$.$mol_switch();
			(obj.value) = (next) => ((this.cam_kind(next)));
			(obj.options) = () => ({"flat": "Плоская", "deep": "Объёмная"});
			return obj;
		}
		Pause(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Пауза");
			(obj.checked) = (next) => ((this.paused(next)));
			return obj;
		}
		cam(){
			const obj = new this.$.$bog_gamengine_cam();
			return obj;
		}
		stat(){
			return (this.Draw().stat());
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.cam()));
			return obj;
		}
		Stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.stat())]);
			return obj;
		}
		Quad(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("Квад");
			(obj.tools) = () => ([(this.Cam_switch()), (this.Pause())]);
			(obj.body) = () => ([(this.Draw())]);
			(obj.foot) = () => ([(this.Stat())]);
			return obj;
		}
		Flat(){
			const obj = new this.$.$bog_gamengine_demo_flat();
			return obj;
		}
		Room(){
			const obj = new this.$.$bog_gamengine_demo_room();
			return obj;
		}
		Boxes(){
			const obj = new this.$.$bog_gamengine_demo_boxes();
			return obj;
		}
		paused(next){
			return (this.Clock().paused(next));
		}
		Batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.nodes) = () => ([(this.Spin())]);
			return obj;
		}
		cam_deep_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		param(){
			return "demo";
		}
		plugins(){
			return [(this.Control())];
		}
		spreads(){
			return {
				"quad": (this.Quad()), 
				"flat": (this.Flat()), 
				"room": (this.Room()), 
				"boxes": (this.Boxes())
			};
		}
		Clock(){
			const obj = new this.$.$bog_gamengine_clock();
			return obj;
		}
		Scene(){
			const obj = new this.$.$bog_gamengine_scene();
			(obj.clock) = () => ((this.Clock()));
			(obj.kids) = () => ([(this.Spin())]);
			(obj.batches) = () => ([(this.Batch())]);
			return obj;
		}
		Spin(){
			const obj = new this.$.$bog_gamengine_demo_spin();
			return obj;
		}
		Cam_flat(){
			const obj = new this.$.$bog_gamengine_cam_flat();
			return obj;
		}
		Cam_deep(){
			const obj = new this.$.$bog_gamengine_cam_deep();
			(obj.pos) = () => ((this.cam_deep_pos()));
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_demo.prototype), "Control"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "cam_kind"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Cam_switch"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Pause"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "cam"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Quad"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Flat"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Room"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Boxes"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Batch"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "cam_deep_pos"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Spin"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Cam_flat"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Cam_deep"));


;
"use strict";
var $;
(function ($) {
    function $mol_offline() { }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const blacklist = new Set([
        '//cse.google.com/adsense/search/async-ads.js'
    ]);
    /** Installs service worker proxy, which caches all requests and respond from cache on http errors. */
    function $mol_offline_web() {
        if (typeof window === 'undefined') {
            self.addEventListener('install', (event) => {
                ;
                self.skipWaiting();
            });
            self.addEventListener('activate', (event) => {
                // caches.delete( '$mol_offline' )
                ;
                self.clients.claim();
                $$.$mol_log3_done({
                    place: '$mol_offline',
                    message: 'Activated',
                });
            });
            self.addEventListener('fetch', (event) => {
                const request = event.request;
                // console.log( 'FETCH', request.mode, request.cache, request.url )
                if (blacklist.has(request.url.replace(/^https?:/, ''))) {
                    return event.respondWith(new Response(null, {
                        status: 418,
                        statusText: 'Blocked'
                    }));
                }
                if (request.method !== 'GET')
                    return;
                if (!/^https?:/.test(request.url))
                    return;
                if (/\?/.test(request.url))
                    return;
                if (request.cache === 'no-store')
                    return;
                const fetch_data = () => fetch(new Request(request, { credentials: 'omit' })).then(response => {
                    if (response.status !== 200)
                        return response;
                    event.waitUntil(caches.open('$mol_offline').then(cache => cache.put(request, response)));
                    return response.clone();
                });
                const enrich = (response) => {
                    // console.log( 'ENRICH', response.status, response.url )
                    if (!response.status)
                        return response;
                    const headers = new Headers(response.headers);
                    headers.set("$mol_offline", "");
                    headers.set("Origin-Agent-Cluster", "?1"); // prevent thread sharing
                    // headers.set( "Cross-Origin-Embedder-Policy", "credentialless" )
                    // headers.set( "Cross-Origin-Resource-Policy", "cross-origin" )
                    // headers.set( "Cross-Origin-Opener-Policy", "same-origin" )
                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers,
                    });
                };
                const fresh = request.cache === 'force-cache' ? null : fetch_data();
                if (fresh)
                    event.waitUntil(fresh.then(enrich));
                event.respondWith(caches.match(request).then(cached => request.cache === 'no-cache' || request.cache === 'reload'
                    ? (cached
                        ? fresh
                            .then(actual => {
                            if (actual.status === cached.status)
                                return actual;
                            throw new Error(`${actual.status}${actual.statusText ? ` ${actual.statusText}` : ''}`, { cause: actual });
                        })
                            .catch((err) => {
                            const cloned = cached.clone();
                            const message = `${err.cause instanceof Response ? '' : '500 '}${err.message} $mol_offline fallback to cache`;
                            cloned.headers.set('$mol_offline_remote_status', message);
                            return cloned;
                        })
                        : fresh)
                    : (cached || fresh || fetch_data())).then(enrich));
            });
            self.addEventListener('beforeinstallprompt', (event) => event.prompt());
        }
        else if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            console.warn('HTTPS or localhost is required for service workers.');
        }
        else if (!navigator.serviceWorker) {
            console.warn('Service Worker is not supported.');
        }
        else {
            $mol_dom.addEventListener('DOMContentLoaded', () => {
                navigator.serviceWorker.register('web.js').then(reg => {
                    reg.addEventListener('updatefound', () => {
                        $$.$mol_log3_rise({
                            place: '$mol_offline',
                            message: 'Outdated',
                        });
                        const worker = reg.installing;
                        worker.addEventListener('statechange', () => {
                            if (worker.state !== 'activated')
                                return;
                            window.location.reload();
                        });
                    });
                });
            });
        }
    }
    $.$mol_offline_web = $mol_offline_web;
    $.$mol_offline = $mol_offline_web;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    try {
        $mol_offline();
    }
    catch (error) {
        console.error(error);
    }
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_demo extends $.$bog_gamengine_demo {
            key_map() {
                const maps = [this.Flat().Key().keys(), this.Room().Key().keys(), this.Boxes().Key().keys()];
                const keys = {};
                for (const map of maps) {
                    for (const name of Object.keys(map)) {
                        const prev = keys[name];
                        const own = map[name];
                        keys[name] = prev ? (state) => { prev(state); return own(state); } : own;
                    }
                }
                return keys;
            }
            cam() {
                return this.cam_kind() === 'deep' ? this.Cam_deep() : this.Cam_flat();
            }
            cam_deep_pos() {
                return new Float32Array([0, 0, 3]);
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo.prototype, "key_map", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo.prototype, "cam", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo.prototype, "cam_deep_pos", null);
        $$.$bog_gamengine_demo = $bog_gamengine_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_demo, {
            Quad: {
                flex: {
                    grow: 1,
                },
                '>': {
                    $mol_scroll: {
                        '>': {
                            $mol_view: {
                                alignSelf: 'stretch',
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));


//# sourceMappingURL=web.js.map
