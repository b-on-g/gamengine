#!/usr/bin/env node
"use strict";
var exports = void 0;

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

;
"use strict";
var $;
(function ($) {
    const mod = require /****/('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
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
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
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
    const path = require /****/('path');
    const mod = require /****/('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);

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
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
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
var $;
(function ($) {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        /** Span for begin of unknown resource */
        static unknown = $mol_span.begin('?');
        /** Makes new span for begin of resource. */
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        /** Makes new span for end of resource. */
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        /** Makes new span for entire resource. */
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        /** Makes new error for this span. */
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        /** Makes new span for same uri. */
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        /** Makes new span after end of this. */
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        /** Makes new span between begin and end. */
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
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
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type, 
        /** Content of data node, `type` should be empty */
        value, 
        /** Child nodes */
        kids, 
        /** Position in most far source resource */
        span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        /** Makes collection node. */
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        /** Makes new derived collection node. */
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        /** Makes data node for any string. */
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        /** Makes new derived data node. */
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        /** Makes struct node. */
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        /** Makes new derived structural node. */
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        /** Makes new derived node with different kids id defined. */
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        /** Returns multiline text content. */
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        /** Serializes to tree format. */
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        /** Makes new tree with node overrided by path. */
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        /** Makes new tree with node overrided by path. */
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        /** Query nodes by path. */
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        /** Filter kids by path or value. */
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        /** Transform tree through context with transformers */
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        /** Makes Error with node coordinates. */
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            // read indent
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            // invalid tab size
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                // skip error line
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            // parse types
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                // type can not contain space and tab
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                // read type
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                // read one space if exists
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            // read data
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            // now must be end of text
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_chunks(array, rule) {
        const br = typeof rule === 'number' ? (_, i) => i % rule === 0 : rule;
        let chunk = [];
        const chunks = [];
        for (let i = 0; i < array.length; ++i) {
            const item = array[i];
            if (br(item, i)) {
                if (chunk.length)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push(item);
        }
        if (chunk.length)
            chunks.push(chunk);
        return chunks;
    }
    $.$mol_array_chunks = $mol_array_chunks;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            const codes = [...buf].map(b => b.toString(16).toUpperCase().padStart(2, '0'));
            const str = $mol_array_chunks(codes, 8).map(c => c.join(' ')).join('\n');
            return $mol_tree2.data(str, [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { ...event, time: new Date().toISOString() };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
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
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: `http://${process.env.DOMAIN || 'localhost'}/` }).window;
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
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
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
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
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
    class $mol_storage_node extends $mol_storage {
        static persisted() {
            return true;
        }
        static stats() {
            $mol_state_time.now(1000);
            return $node.fs.statfsSync('.');
        }
        static total() {
            const { blocks, bsize } = this.stats();
            return blocks * bsize;
        }
        static used() {
            const { blocks, bfree, bsize } = this.stats();
            return (blocks - bfree) * bsize;
        }
        static free() {
            const { bfree, bsize } = this.stats();
            return bfree * bsize;
        }
        static portion() {
            const { blocks, bfree } = this.stats();
            if (!blocks)
                return 1;
            return (blocks - bfree) / blocks;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage_node, "stats", null);
    $.$mol_storage_node = $mol_storage_node;
    $.$mol_storage = $.$mol_storage_node;
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
    let file_modes;
    (function (file_modes) {
        /** create if it doesn't already exist */
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        /** truncate to zero size if it already exists */
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        /** throw exception if it already exists */
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        /** data will be appended to the end */
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
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
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            // Если папки/файла нет, watch упадет с ошибкой
            // exists обратится к parent.version и parent.watcher
            // Поэтому у root-папки и выше не надо вызывать exists, иначе поднимется выше base до корня диска
            // exists вызывать надо, что б пересоздавать вотчер при появлении папки или файла
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                // Между exists и watch файл может удалиться, в любом случае надо обрабатывать ENOENT
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                // Если файла нет - вотчер не создается, создастся потом, когда exists поменяется на true.
                // Если создание упало с другой ошибкой - не ломаем работу mol_file, деградируем до не реактивной fs.
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                // Если в процессе работы вотчер сам закрылся, надо его переоткрыть
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    if (error.code === 'EPERM')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
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
    /** State of arguments like `foo=bar xxx` */
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
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
            const prefix = this.prefix;
            const dict = {};
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
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
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
    $.$mol_3d_glsl_both = '';
    $.$mol_3d_glsl_vert = '';
    $.$mol_3d_glsl_frag = '';
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
    class $bog_gamengine_node extends $mol_object2 {
        pos(next) {
            return next ?? new Float32Array([0, 0, 0]);
        }
        rot(next) {
            return next ?? new Float32Array([0, 0, 0]);
        }
        scale(next) {
            return next ?? new Float32Array([1, 1, 1]);
        }
        parent(next) {
            return next ?? null;
        }
        kids() {
            return [];
        }
        trans() {
            const rot = this.rot();
            return $mol_3d_mat4.multiply($mol_3d_mat4.translation(this.pos()), $mol_3d_mat4.rotation([0, 0, 1], rot[2]), $mol_3d_mat4.rotation([0, 1, 0], rot[1]), $mol_3d_mat4.rotation([1, 0, 0], rot[0]), $mol_3d_mat4.scaling(this.scale()));
        }
        world() {
            const parent = this.parent();
            return parent ? $mol_3d_mat4.multiply(parent.world(), this.trans()) : this.trans();
        }
        step(dt) { }
    }
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
    ], $bog_gamengine_node.prototype, "parent", null);
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
    class $bog_gamengine_cam extends $bog_gamengine_node {
        view() {
            return this.world().inversed();
        }
        proj(aspect) {
            throw new Error('not implemented');
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_cam.prototype, "view", null);
    $.$bog_gamengine_cam = $bog_gamengine_cam;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_texture extends $mol_object {
        api;
        native;
        constructor(api, native = api.createTexture()) {
            super();
            this.api = api;
            this.native = native;
        }
        destructor() {
            this.api.deleteTexture(this.native);
        }
        fill(color) {
            this.api.bindTexture(this.api.TEXTURE_2D, this.native);
            this.api.texImage2D(this.api.TEXTURE_2D, 0, // level
            this.api.RGBA, // internal
            1, // width
            1, // height
            0, // border
            this.api.RGBA, // native
            this.api.UNSIGNED_BYTE, color);
            return color;
        }
        send_one(data) {
            this.api.bindTexture(this.api.TEXTURE_2D, this.native);
            this.api.texImage2D(this.api.TEXTURE_2D, 0, // level
            this.api.RGBA, // internal
            this.api.RGBA, // native
            this.api.UNSIGNED_BYTE, data);
            this.api.texParameteri(this.api.TEXTURE_2D, this.api.TEXTURE_MIN_FILTER, this.api.LINEAR_MIPMAP_LINEAR);
            this.api.texParameteri(this.api.TEXTURE_2D, this.api.TEXTURE_MAG_FILTER, this.api.LINEAR);
            this.api.generateMipmap(this.api.TEXTURE_2D);
            return data;
        }
        send_multi(data) {
            this.api.bindTexture(this.api.TEXTURE_2D_ARRAY, this.native);
            const first = data[0];
            const size = 'displayWidth' in first ? first.displayWidth : first.width;
            this.api.texImage3D(this.api.TEXTURE_2D_ARRAY, 0, this.api.RGBA, size, size, data.length, 0, this.api.RGBA, this.api.UNSIGNED_BYTE, null);
            for (let i = 0; i < data.length; ++i) {
                this.api.texSubImage3D(this.api.TEXTURE_2D_ARRAY, 0, // level
                0, // x
                0, // y
                i, // z
                size, size, 1, // depth
                this.api.RGBA, this.api.UNSIGNED_BYTE, data[i]);
            }
            const anisotropic = this.api.getExtension('EXT_texture_filter_anisotropic');
            const max = this.api.getParameter(anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            this.api.texParameterf(this.api.TEXTURE_2D_ARRAY, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max);
            this.api.texParameteri(this.api.TEXTURE_2D_ARRAY, this.api.TEXTURE_MIN_FILTER, this.api.LINEAR_MIPMAP_LINEAR);
            this.api.texParameteri(this.api.TEXTURE_2D_ARRAY, this.api.TEXTURE_MAG_FILTER, this.api.LINEAR);
            this.api.pixelStorei(this.api.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            this.api.blendFunc(this.api.ONE, this.api.ONE_MINUS_SRC_ALPHA);
            this.api.generateMipmap(this.api.TEXTURE_2D_ARRAY);
            return data;
        }
    }
    $.$mol_3d_texture = $mol_3d_texture;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_glob extends Object {
        api;
        location;
        constructor(api, location) {
            super();
            this.api = api;
            this.location = location;
        }
        vector_int(data, offset = 0, length = data.length - offset) {
            switch (length) {
                case 4:
                    this.api.uniform4iv(this.location, data, offset, length);
                    break;
                case 3:
                    this.api.uniform3iv(this.location, data, offset, length);
                    break;
                case 2:
                    this.api.uniform2iv(this.location, data, offset, length);
                    break;
                case 1:
                    this.api.uniform1iv(this.location, data, offset, length);
                    break;
                default: throw new Error(`Wrong matrix data length (${length})`);
            }
            return data;
        }
        vector_uint(data, offset = 0, length = data.length - offset) {
            switch (length) {
                case 4:
                    this.api.uniform4uiv(this.location, data, offset, length);
                    break;
                case 3:
                    this.api.uniform3uiv(this.location, data, offset, length);
                    break;
                case 2:
                    this.api.uniform2uiv(this.location, data, offset, length);
                    break;
                case 1:
                    this.api.uniform1uiv(this.location, data, offset, length);
                    break;
                default: throw new Error(`Wrong matrix data length (${length})`);
            }
            return data;
        }
        vector_float(data, offset = 0, length = data.length - offset) {
            switch (length) {
                case 4:
                    this.api.uniform4fv(this.location, data, offset, length);
                    break;
                case 3:
                    this.api.uniform3fv(this.location, data, offset, length);
                    break;
                case 2:
                    this.api.uniform2fv(this.location, data, offset, length);
                    break;
                case 1:
                    this.api.uniform1fv(this.location, data, offset, length);
                    break;
                default: throw new Error(`Wrong matrix data length (${length})`);
            }
            return data;
        }
        matrix(data, transpose = false, offset = 0, length = data.length - offset) {
            switch (length) {
                case 16:
                    this.api.uniformMatrix4fv(this.location, transpose, data, offset, length);
                    break;
                case 12:
                    this.api.uniformMatrix4x3fv(this.location, transpose, data, offset, length);
                    break;
                case 9:
                    this.api.uniformMatrix3fv(this.location, transpose, data, offset, length);
                    break;
                case 8:
                    this.api.uniformMatrix4x2fv(this.location, transpose, data, offset, length);
                    break;
                case 6:
                    this.api.uniformMatrix3x2fv(this.location, transpose, data, offset, length);
                    break;
                case 2:
                    this.api.uniformMatrix2fv(this.location, transpose, data, offset, length);
                    break;
                default: throw new Error(`Wrong matrix data length (${length})`);
            }
            return data;
        }
        texture() {
            return new $mol_3d_texture(this.api);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_3d_glob.prototype, "texture", null);
    $.$mol_3d_glob = $mol_3d_glob;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_buffer extends Object {
        api;
        native;
        constructor(api, native) {
            super();
            this.api = api;
            this.native = native;
        }
        send(data) {
            this.api.bindBuffer(this.api.ARRAY_BUFFER, this.native);
            const size = data.reduce((sum, buf) => sum + buf.byteLength, 0);
            this.api.bufferData(this.api.ARRAY_BUFFER, size, this.api.DYNAMIC_DRAW);
            let offset = 0;
            for (let buf of data) {
                this.api.bufferSubData(this.api.ARRAY_BUFFER, offset, buf, 0);
                offset += buf.byteLength;
            }
            return data;
        }
    }
    $.$mol_3d_buffer = $mol_3d_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const float_size = 4;
    class $mol_3d_param extends Object {
        api;
        location;
        constructor(api, location) {
            super();
            this.api = api;
            this.location = location;
        }
        vector(vals) {
            const buffer = this.api.createBuffer();
            this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
            this.api.enableVertexAttribArray(this.location);
            this.api.vertexAttribPointer(this.location, vals, this.api.FLOAT, false, 0, 0);
            return new $mol_3d_buffer(this.api, buffer);
        }
        vectors(vals) {
            const buffer = this.api.createBuffer();
            this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
            this.api.enableVertexAttribArray(this.location);
            this.api.vertexAttribPointer(this.location, vals, this.api.FLOAT, false, 0, 0);
            this.api.vertexAttribDivisor(this.location, 1);
            return new $mol_3d_buffer(this.api, buffer);
        }
        vectors_byte(vals) {
            const buffer = this.api.createBuffer();
            this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
            this.api.enableVertexAttribArray(this.location);
            this.api.vertexAttribPointer(this.location, vals, this.api.UNSIGNED_BYTE, false, 0, 0);
            this.api.vertexAttribDivisor(this.location, 1);
            return new $mol_3d_buffer(this.api, buffer);
        }
        vectors_uint(vals) {
            const buffer = this.api.createBuffer();
            this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
            this.api.enableVertexAttribArray(this.location);
            this.api.vertexAttribPointer(this.location, vals, this.api.UNSIGNED_INT, false, 0, 0);
            this.api.vertexAttribDivisor(this.location, 1);
            return new $mol_3d_buffer(this.api, buffer);
        }
        matrix([cols, rows]) {
            const matrix_size = rows * cols * float_size;
            const buffer = this.api.createBuffer();
            this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
            for (let row = 0; row < rows; ++row) {
                const loc = this.location + row;
                const offset = row * cols * float_size;
                this.api.enableVertexAttribArray(loc);
                this.api.vertexAttribPointer(loc, cols, this.api.FLOAT, false, matrix_size, offset);
            }
            return new $mol_3d_buffer(this.api, buffer);
        }
        matrices([cols, rows]) {
            const matrix_size = rows * cols * float_size;
            const buffer = this.api.createBuffer();
            this.api.bindBuffer(this.api.ARRAY_BUFFER, buffer);
            for (let row = 0; row < rows; ++row) {
                const loc = this.location + row;
                const offset = row * cols * float_size;
                this.api.enableVertexAttribArray(loc);
                this.api.vertexAttribPointer(loc, cols, this.api.FLOAT, false, matrix_size, offset);
                this.api.vertexAttribDivisor(loc, 1);
            }
            return new $mol_3d_buffer(this.api, buffer);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_3d_param.prototype, "vector", null);
    __decorate([
        $mol_mem_key
    ], $mol_3d_param.prototype, "vectors", null);
    __decorate([
        $mol_mem_key
    ], $mol_3d_param.prototype, "vectors_byte", null);
    __decorate([
        $mol_mem_key
    ], $mol_3d_param.prototype, "vectors_uint", null);
    __decorate([
        $mol_mem_key
    ], $mol_3d_param.prototype, "matrix", null);
    __decorate([
        $mol_mem_key
    ], $mol_3d_param.prototype, "matrices", null);
    $.$mol_3d_param = $mol_3d_param;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_geometry extends Object {
        api;
        vertexes;
        constructor(api, vertexes = api.createVertexArray()) {
            super();
            this.api = api;
            this.vertexes = vertexes;
        }
        destructor() {
            this.api.deleteVertexArray(this.vertexes);
        }
        size = 0;
        count = 1;
        use(task) {
            try {
                this.api.bindVertexArray(this.vertexes);
                task(this);
                return this;
            }
            finally {
                this.api.bindVertexArray(null);
            }
        }
    }
    $.$mol_3d_geometry = $mol_3d_geometry;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_program extends Object {
        api;
        native;
        constructor(api, native) {
            api.enable(api.CULL_FACE); // hide back sides
            api.enable(api.DEPTH_TEST); // order indepenent overlap
            api.enable(api.SCISSOR_TEST); // allow partial render
            api.enable(api.BLEND); // allow texture alpha
            super();
            this.api = api;
            this.native = native;
        }
        glob(name) {
            const location = this.api.getUniformLocation(this.native, name);
            return new $mol_3d_glob(this.api, location);
        }
        // @ $mol_mem_key
        param(name) {
            const location = this.api.getAttribLocation(this.native, name);
            if (location === -1)
                return null;
            return new $mol_3d_param(this.api, location);
        }
        geometry(id) {
            return new $mol_3d_geometry(this.api);
        }
        use(task) {
            try {
                this.api.useProgram(this.native);
                task(this);
                return this;
            }
            finally {
                this.api.useProgram(null);
            }
        }
        point(size, offset = 0) {
            this.api.drawArrays(this.api.POINTS, offset, size);
        }
        line(size, offset = 0) {
            this.api.drawArrays(this.api.LINES, offset, size);
        }
        triangle(size, offset = 0) {
            this.api.drawArrays(this.api.TRIANGLES, offset, size);
        }
        strip(size, offset = 0) {
            this.api.drawArrays(this.api.TRIANGLE_STRIP, offset, size);
        }
        points(first, vertices, instances = 1) {
            this.api.drawArraysInstanced(this.api.POINTS, first, vertices, instances);
        }
        lines(first, vertices, instances = 1) {
            this.api.drawArraysInstanced(this.api.LINE_STRIP, first, vertices, instances);
        }
        strips(first, vertices, instances = 1) {
            this.api.drawArraysInstanced(this.api.TRIANGLE_STRIP, first, vertices, instances);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_3d_program.prototype, "glob", null);
    __decorate([
        $mol_mem_key
    ], $mol_3d_program.prototype, "geometry", null);
    $.$mol_3d_program = $mol_3d_program;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_3d_context extends Object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        shader(type, code) {
            // console.log( 'shader', code )
            const gl = this.native;
            const shader = gl.createShader(type);
            gl.shaderSource(shader, code);
            gl.compileShader(shader);
            const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (ok)
                return shader;
            const log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(String(log));
        }
        func(name, face) {
            return this.program(face, $mol_3d_glsl_both + $mol_3d_glsl_vert + `void main() { ${name}(); }`, $mol_3d_glsl_both + $mol_3d_glsl_frag + `void main() { ${name}(); }`);
        }
        program(face, vertex, fragment) {
            const gl = this.native;
            const program = gl.createProgram();
            const prefix = `#version 300 es
				precision highp float;
				precision highp sampler2D;
				precision highp sampler2DArray;
			`;
            let revert = prefix;
            let refrag = prefix;
            for (const name in face.glob ?? {}) {
                revert += `uniform ${face.glob[name]} ${name};\n`;
                refrag += `uniform ${face.glob[name]} ${name};\n`;
            }
            for (const name in face.input ?? {}) {
                revert += `in ${face.input[name]} ${name};\n`;
            }
            for (const name in face.pipe ?? {}) {
                revert += `out ${face.pipe[name]} ${name};\n`;
                refrag += `in ${face.pipe[name]} ${name};\n`;
            }
            for (const name in face.output ?? {}) {
                refrag += `out ${face.output[name]} ${name};\n`;
            }
            gl.attachShader(program, this.shader(gl.VERTEX_SHADER, revert + vertex));
            gl.attachShader(program, this.shader(gl.FRAGMENT_SHADER, refrag + fragment));
            gl.linkProgram(program);
            var ok = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (ok)
                return new $mol_3d_program(this.native, program);
            const log = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error(String(log));
        }
    }
    $.$mol_3d_context = $mol_3d_context;
})($ || ($ = {}));

;
	($.$mol_3d_pane) = class $mol_3d_pane extends ($.$mol_view) {
		context_native(){
			const obj = new this.$.WebGL2RenderingContext();
			return obj;
		}
		width(){
			return 0;
		}
		height(){
			return 0;
		}
		dom_name(){
			return "canvas";
		}
		context(){
			const obj = new this.$.$mol_3d_context((this.context_native()));
			return obj;
		}
		field(){
			return {
				...(super.field()), 
				"width": (this.width()), 
				"height": (this.height())
			};
		}
		paint(){
			return null;
		}
	};
	($mol_mem(($.$mol_3d_pane.prototype), "context_native"));
	($mol_mem(($.$mol_3d_pane.prototype), "context"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_3d_pane extends $.$mol_3d_pane {
            context() {
                const canvas = this.dom_node();
                let context = canvas.getContext('webgl2');
                // context = new Proxy( context, {
                // 	get( gl, f ) {
                // 		let v = gl[f]
                // 		if( typeof v !== 'function' ) return v
                // 		return function( ... args: any[] ) {
                // 			let res
                // 			try {
                // 				return res = v.call( gl, ... args )
                // 			} finally {
                // 				console.debug( v.name, '(', ... args, ')=>', res )
                // 			}
                // 		}
                // 	}
                // } )
                return new $mol_3d_context(context);
            }
            width() {
                return Math.ceil((this.view_rect()?.width ?? 0) * this.$.$mol_dom_context.devicePixelRatio);
            }
            height() {
                return Math.ceil((this.view_rect()?.height ?? 0) * this.$.$mol_dom_context.devicePixelRatio);
            }
            viewport() {
                const viewport = [0, 0, this.width(), this.height()];
                this.context().native.viewport(...viewport);
                return viewport;
            }
            scissor() {
                const scissor = this.viewport();
                this.context().native.scissor(...scissor);
                return scissor;
            }
            render() {
                super.render();
                this.viewport();
                this.scissor();
                this.paint();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_3d_pane.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $mol_3d_pane.prototype, "width", null);
        __decorate([
            $mol_mem
        ], $mol_3d_pane.prototype, "height", null);
        __decorate([
            $mol_mem
        ], $mol_3d_pane.prototype, "viewport", null);
        __decorate([
            $mol_mem
        ], $mol_3d_pane.prototype, "scissor", null);
        $$.$mol_3d_pane = $mol_3d_pane;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_3d_pane, {
            alignSelf: 'stretch',
            justifySelf: 'stretch',
            flex: {
                grow: 1,
                shrink: 1,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
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
        time() {
            const frame = this.frame();
            const dt = this.dt();
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
        program(context) {
            let program = this.programs.get(context);
            if (!program) {
                const sources = this.sources();
                program = context.program(this.face(), sources.vert, sources.frag);
                this.programs.set(context, program);
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
    class $bog_gamengine_atlas extends $mol_object2 {
        uris(next = []) {
            return next;
        }
        size(next = 64) {
            return next;
        }
        names() {
            const uris = this.uris();
            const names = new Map();
            for (let i = 0; i < uris.length; ++i) {
                const name = uris[i].replace(/^.*\//, '').replace(/\.[^.]*$/, '');
                const known = names.get(name);
                if (known !== undefined)
                    $mol_fail(new Error(`Atlas layer name ${name} is used twice: ${uris[known]} and ${uris[i]}`));
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
        image(uri) {
            const image = this.$.$mol_3d_image.make({ uri: () => uri });
            image.$ = this.$;
            return image;
        }
        images() {
            const uris = this.uris();
            const size = this.size();
            const images = $mol_wire_race(...uris.map(uri => () => this.image(uri).data()));
            for (let i = 0; i < images.length; ++i) {
                const { width, height } = images[i];
                if (width === size && height === size)
                    continue;
                const hint = width === 512 && height === 512 ? ', is it loaded?' : '';
                $mol_fail(new Error(`Atlas image ${uris[i]} is ${width}×${height}, expected ${size}×${size}${hint}`));
            }
            return images;
        }
        ready() {
            try {
                this.images();
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
    ], $bog_gamengine_atlas.prototype, "names", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_atlas.prototype, "image", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "images", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_atlas.prototype, "ready", null);
    $.$bog_gamengine_atlas = $bog_gamengine_atlas;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
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
        cap = 0;
        count = 0;
        version = 0;
        trans = new Float32Array(0);
        tint = new Float32Array(0);
        layer = new Float32Array(0);
        uv = new Float32Array(0);
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
        }
        fill() {
            const nodes = this.nodes();
            const count = nodes.length;
            this.grow(count);
            const trans = this.trans;
            const tint = this.tint;
            const layer = this.layer;
            const uv = this.uv;
            for (let i = 0; i < count; ++i) {
                const node = nodes[i];
                trans.set(node.world(), i * 16);
                if (typeof node.tint === 'function') {
                    tint.set(node.tint(), i * 4);
                }
                else {
                    tint[i * 4] = 1;
                    tint[i * 4 + 1] = 1;
                    tint[i * 4 + 2] = 1;
                    tint[i * 4 + 3] = 1;
                }
                layer[i] = typeof node.layer === 'function' ? node.layer() : 0;
                if (typeof node.uv === 'function') {
                    uv.set(node.uv(), i * 4);
                }
                else {
                    uv[i * 4] = 0;
                    uv[i * 4 + 1] = 0;
                    uv[i * 4 + 2] = 1;
                    uv[i * 4 + 3] = 1;
                }
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
    $.$bog_gamengine_batch = $bog_gamengine_batch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys_body extends $bog_gamengine_node {
        vel(next) {
            return next ?? new Float32Array([0, 0, 0]);
        }
        size(next) {
            return next ?? new Float32Array([1, 1]);
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
        hit(other) { }
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
    class $bog_gamengine_phys_tile extends $mol_object2 {
        map(next) {
            return next ?? '';
        }
        solid(next) {
            return next ?? '#';
        }
        rows() {
            return this.map().split('\n').map(row => [...row]);
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
        cell(x, y) {
            const rows = this.rows();
            if (y < 0 || y >= rows.length)
                return true;
            const row = rows[y];
            if (x < 0 || x >= row.length)
                return true;
            return this.solid().includes(row[x]);
        }
        solid_at(wx, wy) {
            return this.cell(Math.floor(wx), Math.floor(-wy));
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "map", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "solid", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "rows", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "width", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_phys_tile.prototype, "height", null);
    $.$bog_gamengine_phys_tile = $bog_gamengine_phys_tile;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_phys extends $mol_object2 {
        bodies(next) {
            return next ?? [];
        }
        tile(next) {
            return next ?? null;
        }
        eps = 1e-4;
        step(dt) {
            const bodies = this.bodies();
            const tile = this.tile();
            for (let i = 0; i < bodies.length; ++i) {
                if (bodies[i].still())
                    continue;
                this.move(bodies[i], bodies[i].ghost() ? null : tile, dt);
            }
            for (let i = 0; i < bodies.length; ++i) {
                for (let j = i + 1; j < bodies.length; ++j)
                    this.touch(bodies[i], bodies[j]);
            }
        }
        move(body, tile, dt) {
            const pos = body.pos();
            const vel = body.vel();
            const size = body.size();
            const hw = size[0] / 2;
            const hh = body.kind() === 'circle' ? hw : size[1] / 2;
            const eps = this.eps;
            let x = pos[0] + vel[0] * dt;
            let y = pos[1];
            let vx = vel[0];
            let vy = vel[1];
            let hit = false;
            if (tile) {
                const ry0 = Math.floor(-(y + hh) + eps);
                const ry1 = Math.floor(-(y - hh) - eps);
                if (vx >= 0) {
                    const cx = Math.floor(x + hw);
                    if (this.col_solid(tile, cx, ry0, ry1)) {
                        const nx = cx - hw;
                        if (nx !== x || vx !== 0) {
                            x = nx;
                            vx = 0;
                            hit = true;
                        }
                    }
                }
                if (vx <= 0) {
                    const cx = Math.floor(x - hw);
                    if (this.col_solid(tile, cx, ry0, ry1)) {
                        const nx = cx + 1 + hw;
                        if (nx !== x || vx !== 0) {
                            x = nx;
                            vx = 0;
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
                        const ny = -cy - 1 - hh;
                        if (ny !== y || vy !== 0) {
                            y = ny;
                            vy = 0;
                            hit = true;
                        }
                    }
                }
                if (vy <= 0) {
                    const cy = Math.floor(-(y - hh));
                    if (this.row_solid(tile, cy, cx0, cx1)) {
                        const ny = -cy + hh;
                        if (ny !== y || vy !== 0) {
                            y = ny;
                            vy = 0;
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
            if (!hit)
                return;
            const next_vel = new Float32Array(3);
            next_vel[0] = vx;
            next_vel[1] = vy;
            next_vel[2] = vel[2];
            body.vel(next_vel);
            body.hit(null);
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
            a.hit(b);
            b.hit(a);
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
    $.$bog_gamengine_phys = $bog_gamengine_phys;
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
        poll() {
            this.pad()?.poll();
        }
        action(name) {
            return (this.key()?.action(name) ?? false) || (this.pad()?.action(name) ?? false);
        }
        axis(neg, pos) {
            const key = this.key()?.axis(neg, pos) ?? 0;
            if (key !== 0)
                return key;
            return this.pad()?.axis(neg, pos) ?? 0;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "key", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_input.prototype, "pad", null);
    $.$bog_gamengine_input = $bog_gamengine_input;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_scene extends $bog_gamengine_node {
        clock(next) {
            return next ?? new $bog_gamengine_clock;
        }
        nodes() {
            const list = [];
            const walk = (node) => {
                const kids = node.kids();
                for (let i = 0; i < kids.length; ++i) {
                    list.push(kids[i]);
                    walk(kids[i]);
                }
            };
            walk(this);
            return list;
        }
        batches(next) {
            return next ?? [];
        }
        phys(next) {
            return next ?? null;
        }
        input(next) {
            return next ?? null;
        }
        frame_done = -1;
        step() {
            const frame = this.clock().frame();
            if (frame !== this.frame_done) {
                this.frame_done = frame;
                this.input()?.poll();
                const dt = this.clock().dt();
                const nodes = this.nodes();
                for (let i = 0; i < nodes.length; ++i)
                    nodes[i].step(dt);
                this.phys()?.step(dt);
            }
            const batches = this.batches();
            for (let i = 0; i < batches.length; ++i)
                batches[i].fill();
            return frame;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "clock", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "nodes", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "batches", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "phys", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "input", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_scene.prototype, "step", null);
    $.$bog_gamengine_scene = $bog_gamengine_scene;
})($ || ($ = {}));

;
	($.$bog_gamengine_draw) = class $bog_gamengine_draw extends ($.$mol_3d_pane) {
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
		ambient(){
			return 0.35;
		}
		stat(){
			return "";
		}
	};
	($mol_mem(($.$bog_gamengine_draw.prototype), "scene"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "cam"));
	($mol_mem(($.$bog_gamengine_draw.prototype), "light_dir"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const stat_window = 30;
        class $bog_gamengine_draw extends $.$bog_gamengine_draw {
            slots_all = new WeakMap();
            textures_all = new WeakMap();
            unit = new Int32Array([0]);
            ambient_vec = new Float32Array(1);
            gaps = new Float32Array(stat_window);
            ticks = new Float32Array(stat_window);
            samples = 0;
            paint_at = 0;
            context() {
                const canvas = this.dom_node();
                const native = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
                return new $mol_3d_context(native);
            }
            light_dir(next) {
                return next ?? new Float32Array([0.4, 1, 0.6]);
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
                return slots;
            }
            slot(batch) {
                const found = this.slots_all.get(batch);
                if (found)
                    return found;
                const context = this.context();
                const gl = context.native;
                const shader = batch.shader();
                const program = shader.program(context);
                const globs = shader.face().glob ?? {};
                const shape = batch.shape();
                if (!this.shape_ready(shape))
                    return null;
                const atlas = batch.atlas();
                const cap = Math.max(batch.cap, 16);
                const slot = {
                    batch,
                    program,
                    proj: program.glob('proj'),
                    view: program.glob('view'),
                    light_dir: 'light_dir' in globs ? program.glob('light_dir') : null,
                    ambient: 'ambient' in globs ? program.glob('ambient') : null,
                    depth: shader.depth(),
                    geometry: new $mol_3d_geometry(gl),
                    trans: null,
                    tint: null,
                    layer: null,
                    uv: null,
                    atlas,
                    sampler: atlas ? program.glob('atlas') : null,
                    tex: atlas ? this.tex(atlas) : null,
                    triangles: shape.mode() === 'triangles',
                    size: shape.size(),
                    cap,
                };
                slot.geometry.use(() => {
                    program.param('vertex').vector(3).send([shape.geometry()]);
                    program.param('uv')?.vector(2).send([shape.skin()]);
                    program.param('normal')?.vector(3).send([shape.normals()]);
                    slot.trans = program.param('inst_trans').matrices([4, 4]);
                    gl.bufferData(gl.ARRAY_BUFFER, cap * 64, gl.DYNAMIC_DRAW);
                    slot.tint = program.param('inst_tint').vectors(4);
                    gl.bufferData(gl.ARRAY_BUFFER, cap * 16, gl.DYNAMIC_DRAW);
                    slot.layer = program.param('inst_layer')?.vectors(1) ?? null;
                    if (slot.layer)
                        gl.bufferData(gl.ARRAY_BUFFER, cap * 4, gl.DYNAMIC_DRAW);
                    slot.uv = program.param('inst_uv')?.vectors(4) ?? null;
                    if (slot.uv)
                        gl.bufferData(gl.ARRAY_BUFFER, cap * 16, gl.DYNAMIC_DRAW);
                });
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
                const tex = {
                    texture: new $mol_3d_texture(this.context().native),
                    sent: false,
                };
                this.textures_all.set(atlas, tex);
                return tex;
            }
            textures() {
                const gl = this.context().native;
                const slots = this.slots();
                let sent = 0;
                for (let i = 0; i < slots.length; ++i) {
                    const slot = slots[i];
                    if (!slot.atlas || slot.tex.sent)
                        continue;
                    if (!slot.atlas.ready())
                        continue;
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                    slot.tex.texture.send_multi(slot.atlas.images());
                    slot.tex.sent = true;
                    ++sent;
                }
                return sent;
            }
            paint() {
                this.scene().step();
                const gl = this.context().native;
                const slots = this.slots();
                this.textures();
                const proj = this.proj();
                const view = this.cam().view();
                const light_dir = this.light_dir();
                this.ambient_vec[0] = this.ambient();
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.clearColor(0.08, 0.08, 0.1, 1);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                for (let i = 0; i < slots.length; ++i)
                    this.paint_slot(gl, slots[i], proj, view, light_dir);
                gl.bindVertexArray(null);
                gl.useProgram(null);
                this.measure();
            }
            paint_slot(gl, slot, proj, view, light_dir) {
                const batch = slot.batch;
                const count = batch.count;
                if (!count)
                    return;
                if (slot.tex && !slot.tex.sent)
                    return;
                const grown = batch.cap > slot.cap;
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
                slot.proj.matrix(proj);
                slot.view.matrix(view);
                if (slot.light_dir)
                    slot.light_dir.vector_float(light_dir);
                if (slot.ambient)
                    slot.ambient.vector_float(this.ambient_vec);
                if (slot.tex) {
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D_ARRAY, slot.tex.texture.native);
                    slot.sampler.vector_int(this.unit);
                }
                gl.bindVertexArray(slot.geometry.vertexes);
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
                if (grown)
                    slot.cap = batch.cap;
                if (slot.triangles)
                    gl.drawArraysInstanced(gl.TRIANGLES, 0, slot.size, count);
                else
                    slot.program.strips(0, slot.size, count);
            }
            measure() {
                const now = performance.now();
                const i = this.samples % stat_window;
                this.ticks[i] = now - this.scene().clock().tick_at;
                this.gaps[i] = this.paint_at ? now - this.paint_at : 0;
                this.paint_at = now;
                ++this.samples;
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
        ], $bog_gamengine_draw.prototype, "light_dir", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "proj", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "slots", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "textures", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_draw.prototype, "stat", null);
        $$.$bog_gamengine_draw = $bog_gamengine_draw;
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
})($ || ($ = {}));

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
            out[0] = x / this.width() * 2 - 1;
            out[1] = 1 - y / this.height() * 2;
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
            out[0] = (clip[0] / w + 1) / 2 * this.width();
            out[1] = (1 - clip[1] / w) / 2 * this.height();
            out[2] = w;
            return out;
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
    ], $bog_gamengine_point.prototype, "proj_view", null);
    $.$bog_gamengine_point = $bog_gamengine_point;
})($ || ($ = {}));

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
    class $bog_gamengine_sound extends $mol_object2 {
        uris(next = {}) {
            return next;
        }
        Room() {
            return this.$.$mol_audio_room.make({ input: () => this.samples() });
        }
        samples() {
            return Object.keys(this.uris()).map(name => this.sample(name));
        }
        sample(name) {
            const uri = this.uris()[name];
            if (!uri)
                $mol_fail(new Error(`Sound has no sample ${name}, known: ${Object.keys(this.uris()).join(', ')}`));
            return this.$.$mol_audio_sample.make({ buffer: () => this.$.$mol_fetch.buffer(uri) });
        }
        play(name) {
            const sample = this.sample(name);
            new this.$.$mol_after_tick(() => $mol_wire_async(this).start(sample));
        }
        start(sample) {
            try {
                sample.start();
                this.Room().output();
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "uris", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "Room", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_sound.prototype, "samples", null);
    __decorate([
        $mol_mem_key
    ], $bog_gamengine_sound.prototype, "sample", null);
    $.$bog_gamengine_sound = $bog_gamengine_sound;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
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
    $.$bog_gamengine_cam_flat = $bog_gamengine_cam_flat;
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
        tint(next) {
            return next ?? new Float32Array([1, 1, 1, 1]);
        }
        flip_x(next = false) {
            return next;
        }
        size(next) {
            return next ?? new Float32Array([1, 1]);
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
    ], $bog_gamengine_sprite.prototype, "tint", null);
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
    class $bog_gamengine_demo_flat_hero extends $bog_gamengine_phys_body {
        key(next) {
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
            const key = this.key();
            if (!key)
                return;
            const speed = this.speed();
            const vx = key.axis('left', 'right') * speed;
            const vy = key.axis('down', 'up') * speed;
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
    ], $bog_gamengine_demo_flat_hero.prototype, "key", null);
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
        taken(next = false) {
            if (next)
                this.sound()?.play('coin');
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
    ], $bog_gamengine_demo_flat_coin.prototype, "taken", null);
    $.$bog_gamengine_demo_flat_coin = $bog_gamengine_demo_flat_coin;
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
		stat(){
			return (this.Draw().stat());
		}
		draw_width(){
			return (this.Draw().width());
		}
		draw_height(){
			return (this.Draw().height());
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
		World(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Draw()), (this.Hero_label())]);
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
		Sprite_shader(){
			const obj = new this.$.$bog_gamengine_shader_sprite();
			return obj;
		}
		sprites(){
			return [];
		}
		Batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Sprite_shader()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ((this.sprites()));
			return obj;
		}
		cam_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		cell_frame(id){
			return "";
		}
		cell_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
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
		coin_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		coin_taken(id, next){
			return (this.Coin(id).taken(next));
		}
		title(){
			return "Плоский мир";
		}
		tools(){
			return [(this.Coins())];
		}
		body(){
			return [(this.World())];
		}
		foot(){
			return [(this.Stat()), (this.Hero_stat())];
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
			(obj.kids) = () => ((this.nodes()));
			(obj.phys) = () => ((this.Phys()));
			(obj.batches) = () => ([(this.Batch())]);
			return obj;
		}
		Cam(){
			const obj = new this.$.$bog_gamengine_cam_flat();
			(obj.height) = () => (15);
			(obj.pos) = () => ((this.cam_pos()));
			return obj;
		}
		Cell(id){
			const obj = new this.$.$bog_gamengine_sprite();
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ((this.cell_frame(id)));
			(obj.pos) = () => ((this.cell_pos(id)));
			return obj;
		}
		Hero(){
			const obj = new this.$.$bog_gamengine_demo_flat_hero();
			(obj.key) = () => ((this.Key()));
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
	};
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Coins"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "pointer_down"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero_label"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "World"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero_stat"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Phys"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Sprite_shader"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Batch"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "cam_pos"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "cell_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "hero_pos"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "coin_pos"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Key"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Tile"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Atlas"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Point"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Sound"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Cam"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "Cell"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero"));
	($mol_mem(($.$bog_gamengine_demo_flat.prototype), "Hero_sprite"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "Coin"));
	($mol_mem_key(($.$bog_gamengine_demo_flat.prototype), "Coin_sprite"));


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
            cell_ids() {
                const rows = this.Tile().rows();
                const ids = [];
                for (let y = 0; y < rows.length; ++y) {
                    for (let x = 0; x < rows[y].length; ++x)
                        ids.push(`${x}_${y}`);
                }
                return ids;
            }
            cell_xy(id) {
                return id.split('_').map(Number);
            }
            cell_frame(id) {
                const [x, y] = this.cell_xy(id);
                return this.Tile().cell(x, y) ? 'wall' : 'floor';
            }
            cell_pos(id) {
                const [x, y] = this.cell_xy(id);
                return new Float32Array([x + 0.5, -y - 0.5, 0]);
            }
            cells() {
                return this.cell_ids().map(id => this.Cell(id));
            }
            hero_pos(next) {
                return next ?? new Float32Array([1.5, -1.5, 0]);
            }
            coin_cells() {
                return [[18, 1], [8, 5], [10, 13]];
            }
            coin_pos(id) {
                const [x, y] = this.coin_cells()[Number(id)];
                return new Float32Array([x + 0.5, -y - 0.5, 0]);
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
                return [...this.cells(), ...this.coin_sprites(), this.Hero_sprite()];
            }
            nodes() {
                return [...this.bodies(), ...this.sprites()];
            }
            pointer_down(event) {
                if (!event)
                    return null;
                const dpr = this.$.$mol_dom_context.devicePixelRatio;
                const x = event.offsetX * dpr;
                const y = event.offsetY * dpr;
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
                const dpr = this.$.$mol_dom_context.devicePixelRatio;
                return [screen[0] / dpr, screen[1] / dpr];
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
        ], $bog_gamengine_demo_flat.prototype, "cell_ids", null);
        __decorate([
            $mol_mem_key
        ], $bog_gamengine_demo_flat.prototype, "cell_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "cells", null);
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
            $mol_mem
        ], $bog_gamengine_demo_flat.prototype, "nodes", null);
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
            World: {
                position: 'relative',
                alignSelf: 'stretch',
                flex: {
                    grow: 1,
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
    class $bog_gamengine_shader_solid extends $bog_gamengine_shader {
        face() {
            return {
                glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray', light_dir: 'vec3', ambient: 'float' },
                input: { vertex: 'vec3', uv: 'vec2', normal: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' },
                pipe: { pipe_uv: 'vec2', pipe_layer: 'float', pipe_tint: 'vec4', pipe_normal: 'vec3' },
                output: { color: 'vec4' },
            };
        }
        depth() {
            return true;
        }
        vert() {
            return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
				}
			`;
        }
        frag() {
            return `
				void main() {
					float light = ambient + ( 1.0 - ambient ) * max( dot( normalize( pipe_normal ), normalize( light_dir ) ), 0.0 );
					color = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint * vec4( light, light, light, 1.0 );
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
        tile(next = 1) {
            return next;
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
            return new Float32Array([
                0, tile,
                tile, tile,
                0, 0,
                tile, 0,
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
    const magic = 0x46546C67;
    const chunk_json = 0x4E4F534A;
    const chunk_bin = 0x004E4942;
    const dims = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
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
            const index = prim.indices === undefined ? null : this.accessor(prim.indices);
            const size = index ? index.length : pos.length / 3;
            const geometry = new Float32Array(size * 3);
            const normals = new Float32Array(size * 3);
            const skin = new Float32Array(size * 2);
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
            return { geometry, normals, skin };
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
    $.$bog_gamengine_shape_gltf = $bog_gamengine_shape_gltf;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const uv_plain = new Float32Array([0, 0, 1, 1]);
    class $bog_gamengine_mesh extends $bog_gamengine_node {
        shape(next) {
            return next ?? new $bog_gamengine_shape_box;
        }
        atlas(next) {
            return next ?? null;
        }
        frame(next = '') {
            return next;
        }
        tint(next) {
            return next ?? new Float32Array([1, 1, 1, 1]);
        }
        size(next) {
            return next ?? new Float32Array([1, 1, 1]);
        }
        layer() {
            const atlas = this.atlas();
            return atlas ? atlas.layer(this.frame()) : 0;
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
    ], $bog_gamengine_mesh.prototype, "shape", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "atlas", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "frame", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "tint", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "size", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "layer", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_mesh.prototype, "trans", null);
    $.$bog_gamengine_mesh = $bog_gamengine_mesh;
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
    $.$bog_gamengine_cam_deep = $bog_gamengine_cam_deep;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_demo_room_walker extends $bog_gamengine_cam_deep {
        key(next) {
            return next ?? null;
        }
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
            const key = this.key();
            if (!key)
                return;
            const rot = this.rot();
            let yaw = rot[1];
            const spin = key.axis('turn_right', 'turn_left');
            if (spin !== 0) {
                yaw += spin * this.turn() * dt;
                const next = new Float32Array(3);
                next[0] = rot[0];
                next[1] = yaw;
                next[2] = rot[2];
                this.rot(next);
            }
            const track = key.axis('back', 'forward');
            const side = key.axis('left', 'right');
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
    ], $bog_gamengine_demo_room_walker.prototype, "key", null);
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
		Pause(){
			const obj = new this.$.$mol_check_box();
			(obj.title) = () => ("Пауза");
			(obj.checked) = (next) => ((this.paused(next)));
			return obj;
		}
		stat(){
			return (this.Draw().stat());
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.Walker()));
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
		Plane(){
			const obj = new this.$.$bog_gamengine_shape_plane();
			(obj.tile) = () => (12);
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
		wall_pos(id){
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
		title(){
			return "Комната";
		}
		tools(){
			return [(this.Pause())];
		}
		body(){
			return [(this.Draw())];
		}
		foot(){
			return [
				(this.Stat()), 
				(this.Walker_stat()), 
				(this.Pillar_stat())
			];
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
			(obj.kids) = () => ((this.nodes()));
			(obj.batches) = () => ([
				(this.Wall_batch()), 
				(this.Floor_batch()), 
				(this.Pillar_batch())
			]);
			return obj;
		}
		Wall(id){
			const obj = new this.$.$bog_gamengine_mesh();
			(obj.shape) = () => ((this.Box()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("wall");
			(obj.pos) = () => ((this.wall_pos(id)));
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
			(obj.key) = () => ((this.Key()));
			(obj.tile) = () => ((this.Tile()));
			(obj.pos) = (next) => ((this.walker_pos(next)));
			(obj.rot) = (next) => ((this.walker_rot(next)));
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pause"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Walker_stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar_stat"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Solid"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Box"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Wall_batch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Plane"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Floor_batch"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "pillar_data"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar_shape"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar_batch"));
	($mol_mem_key(($.$bog_gamengine_demo_room.prototype), "wall_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "floor_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "floor_size"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "pillar_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "walker_pos"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "walker_rot"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Key"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Tile"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Atlas"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Scene"));
	($mol_mem_key(($.$bog_gamengine_demo_room.prototype), "Wall"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Floor"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Pillar"));
	($mol_mem(($.$bog_gamengine_demo_room.prototype), "Walker"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_demo_room extends $.$bog_gamengine_demo_room {
            wall_ids() {
                const rows = this.Tile().rows();
                const ids = [];
                for (let y = 0; y < rows.length; ++y) {
                    for (let x = 0; x < rows[y].length; ++x) {
                        if (this.Tile().cell(x, y))
                            ids.push(`${x}_${y}`);
                    }
                }
                return ids;
            }
            wall_pos(id) {
                const [x, y] = id.split('_').map(Number);
                return new Float32Array([x + 0.5, 0.5, y + 0.5]);
            }
            walls() {
                return this.wall_ids().map(id => this.Wall(id));
            }
            floor_pos() {
                return new Float32Array([this.Tile().width() / 2, 0, this.Tile().height() / 2]);
            }
            floor_size() {
                return new Float32Array([this.Tile().width(), 1, this.Tile().height()]);
            }
            pillar_data() {
                return $mol_fetch.buffer('bog/gamengine/demo/room/model/pillar.glb');
            }
            pillar_pos() {
                return new Float32Array([6.5, 0.5, 3.5]);
            }
            walker_pos(next) {
                return next ?? new Float32Array([6, 0.5, 7.5]);
            }
            walker_rot(next) {
                return next ?? new Float32Array([0, 0, 0]);
            }
            nodes() {
                return [...this.walls(), this.Floor(), this.Pillar(), this.Walker()];
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
            walker_stat() {
                if (!this.Atlas().ready())
                    return '';
                const pos = this.walker_pos();
                const yaw = this.walker_rot()[1];
                return `walker ${pos[0].toFixed(2)} × ${pos[2].toFixed(2)} yaw ${yaw.toFixed(2)}`;
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "wall_ids", null);
        __decorate([
            $mol_mem_key
        ], $bog_gamengine_demo_room.prototype, "wall_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "walls", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "floor_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "floor_size", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "pillar_data", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "pillar_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "walker_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_demo_room.prototype, "walker_rot", null);
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
    let $giper_baza_slot_kind;
    (function ($giper_baza_slot_kind) {
        /** Free Unit Slot */
        $giper_baza_slot_kind[$giper_baza_slot_kind["free"] = 0] = "free";
        /** Land header for the following parts. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["land"] = 76] = "land";
        /** Unit of data. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["sand"] = 252] = "sand";
        /** Rights/Keys sharing. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["gift"] = 253] = "gift";
        /** Sign for hash list. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["seal"] = 254] = "seal";
        /** Public key. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["pass"] = 255] = "pass";
    })($giper_baza_slot_kind = $.$giper_baza_slot_kind || ($.$giper_baza_slot_kind = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode(src) {
        return src.toBase64();
    }
    $.$mol_base64_encode = $mol_base64_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode_node(str) {
        if (!str)
            return '';
        const buf = Buffer.isBuffer(str) ? str : Buffer.from(str);
        return buf.toString('base64');
    }
    $.$mol_base64_encode_node = $mol_base64_encode_node;
    if (!('toBase64' in Uint8Array.prototype)) {
        $.$mol_base64_encode = $mol_base64_encode_node;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode(base64) {
        return Uint8Array.fromBase64(base64);
    }
    $.$mol_base64_decode = $mol_base64_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode_node(base64Str) {
        // without Uint8Array breaks $mol_compare_deep
        const buffer = Buffer.from(base64Str, 'base64');
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    $.$mol_base64_decode_node = $mol_base64_decode_node;
    if (!('fromBase64' in Uint8Array)) {
        $.$mol_base64_decode = $mol_base64_decode_node;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_ae_encode(buffer) {
        return $mol_base64_encode(buffer).replace(/\+/g, 'æ').replace(/\//g, 'Æ').replace(/=/g, '');
    }
    $.$mol_base64_ae_encode = $mol_base64_ae_encode;
    function $mol_base64_ae_decode(str) {
        return $mol_base64_decode(str.replace(/æ/g, '+').replace(/Æ/g, '/'));
    }
    $.$mol_base64_ae_decode = $mol_base64_ae_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_buffer extends DataView {
        [Symbol.toStringTag] = this.constructor.name + '<>';
        static from(array) {
            if (typeof array === 'number')
                array = new Uint8Array(array);
            if (typeof array === 'string')
                array = $mol_base64_ae_decode(array);
            if (!ArrayBuffer.isView(array))
                array = new Uint8Array(array);
            return new this(array.buffer, array.byteOffset, array.byteLength);
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        getUint48(offset, LE = false) {
            if (offset % 4) {
                return this.getUint16(offset, LE) + this.getUint32(offset + 2, LE) * 2 ** 16;
            }
            else {
                return this.getUint32(offset, LE) + this.getUint16(offset + 4, LE) * 2 ** 32;
            }
        }
        setUint48(offset, value, LE = false) {
            if (offset % 4) {
                this.setUint16(offset, value & ((1 << 16) - 1), LE);
                this.setUint32(offset + 2, (value / 2 ** 16) | 0, LE);
            }
            else {
                this.setUint32(offset, value | 0, LE);
                this.setUint16(offset + 4, (value / 2 ** 32) | 0, LE);
            }
        }
        /** 1-byte signed integer channel for offset. */
        int8(offset, next) {
            if (next === undefined)
                return this.getInt8(offset);
            if (next >= -(2 ** 7) && next < 2 ** 7)
                return this.setInt8(offset, next), next;
            $mol_fail(new Error(`Wrong int8 value ${next}`));
        }
        /** 1-byte unsigned integer channel for offset. */
        uint8(offset, next) {
            if (next === undefined)
                return this.getUint8(offset);
            if (next >= 0 && next < 2 ** 8)
                return this.setUint8(offset, next), next;
            $mol_fail(new Error(`Wrong uint8 value ${next}`));
        }
        /** 2-byte signed integer little-endian channel for offset. */
        int16(offset, next) {
            if (next === undefined)
                return this.getInt16(offset, true);
            if (next >= -(2 ** 15) && next < 2 ** 15)
                return this.setInt16(offset, next, true), next;
            $mol_fail(new Error(`Wrong int16 value ${next}`));
        }
        /** 2-byte unsigned integer little-endian channel for offset. */
        uint16(offset, next) {
            if (next === undefined)
                return this.getUint16(offset, true);
            if (next >= 0 && next < 2 ** 16)
                return this.setUint16(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint16 value ${next}`));
        }
        /** 4-byte signed integer little-endian channel for offset. */
        int32(offset, next) {
            if (next === undefined)
                return this.getInt32(offset, true);
            if (next >= -(2 ** 31) && next < 2 ** 31)
                return this.setInt32(offset, next, true), next;
            $mol_fail(new Error(`Wrong int32 value ${next}`));
        }
        /** 4-byte unsigned integer little-endian channel for offset. */
        uint32(offset, next) {
            if (next === undefined)
                return this.getUint32(offset, true);
            if (next >= 0 && next < 2 ** 32)
                return this.setUint32(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint32 value ${next}`));
        }
        /** 8-byte signed integer little-endian channel for offset. */
        int64(offset, next) {
            if (next === undefined)
                return this.getBigInt64(offset, true);
            if (next >= -(2n ** 63n) && next < 2n ** 63n)
                return this.setBigInt64(offset, next, true), next;
            $mol_fail(new Error(`Wrong int64 value ${next}`));
        }
        /** 6-byte unsigned integer little-endian channel for offset. */
        uint48(offset, next) {
            if (next === undefined)
                return this.getUint48(offset, true);
            if (next >= 0 && next < 2 ** 48)
                return this.setUint48(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint48 value ${next}`));
        }
        /** 8-byte unsigned integer little-endian channel for offset. */
        uint64(offset, next) {
            if (next === undefined)
                return this.getBigUint64(offset, true);
            if (next >= 0n && next < 2n ** 64n)
                return this.setBigUint64(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint64 value ${next}`));
        }
        /** 2-byte float little-endian channel for offset. */
        float16(offset, next) {
            if (next !== undefined)
                this.setFloat16(offset, next, true);
            return this.getFloat16(offset, true);
        }
        /** 4-byte float little-endian channel for offset. */
        float32(offset, next) {
            if (next !== undefined)
                this.setFloat32(offset, next, true);
            return this.getFloat32(offset, true);
        }
        /** 8-byte float little-endian channel for offset. */
        float64(offset, next) {
            if (next !== undefined)
                this.setFloat64(offset, next, true);
            return this.getFloat64(offset, true);
        }
        mix(mixin) {
            const arr = this.asArray();
            for (let i = 0; i < mixin.length; ++i)
                arr[i % arr.byteLength] ^= mixin[i];
            return this;
        }
        /** A Uint8Array view for the same buffer. */
        asArray() {
            return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
        }
        /** base64ae string from buffer. */
        toString() {
            return $mol_base64_ae_encode(this.asArray());
        }
    }
    $.$mol_buffer = $mol_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_url_encode(buffer) {
        return buffer.toBase64({ alphabet: 'base64url', omitPadding: true });
    }
    $.$mol_base64_url_encode = $mol_base64_url_encode;
    function $mol_base64_url_decode(str) {
        return Uint8Array.fromBase64(str, { alphabet: 'base64url' });
    }
    $.$mol_base64_url_decode = $mol_base64_url_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_url_encode_node(str) {
        if (!str)
            return '';
        const buf = Buffer.isBuffer(str) ? str : Buffer.from(str);
        return buf.toString('base64url').replace(/=/g, '');
    }
    $.$mol_base64_url_encode_node = $mol_base64_url_encode_node;
    if (!('toBase64' in Uint8Array.prototype)) {
        $.$mol_base64_url_encode = $mol_base64_url_encode_node;
    }
    function $mol_base64_url_decode_node(str) {
        // without Uint8Array breaks $mol_compare_deep
        const buffer = Buffer.from(str, 'base64url');
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    $.$mol_base64_url_decode_node = $mol_base64_url_decode_node;
    if (!('fromBase64' in Uint8Array)) {
        $.$mol_base64_url_decode = $mol_base64_url_decode_node;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Base class for crypto keys. */
    class $mol_crypto2_key extends $mol_buffer {
        static size_str = 43;
        static size_bin = 32;
        /** Kakes key from different params. */
        static from(serial) {
            if (typeof serial === 'string') {
                serial = new Uint8Array(serial.match(/.{43}/g)
                    ?.flatMap(chunk => [...$mol_base64_url_decode(chunk)])
                    ?? $mol_fail(new Error('Str key too short', { cause: {
                            min: 43,
                            real: serial.length,
                        } })));
            }
            return super.from(serial);
        }
        /** Array view of public part. */
        asArray() {
            const size = this.constructor.size_bin;
            if (this.byteLength < size) {
                return $mol_fail(new Error('Bin key too short', { cause: {
                        min: size,
                        real: this.byteLength,
                    } }));
            }
            return new Uint8Array(this.buffer, this.byteOffset, size);
        }
        /** String representation of public part. */
        toString() {
            return $mol_base64_url_encode(this.asArray());
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_key.prototype, "toString", null);
    $.$mol_crypto2_key = $mol_crypto2_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_crypto_native = $node.crypto.webcrypto;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Derived debuggable error with stack */
    function $mol_crypto_restack(error) {
        error = new Error(error instanceof Error ? error.message : String(error), { cause: error });
        $mol_fail_hidden(error);
    }
    $.$mol_crypto_restack = $mol_crypto_restack;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Ed25519 public key for sign verifying. */
    class $mol_crypto2_auditor extends $mol_crypto2_key {
        /** Native WebAPI public key. */
        async native() {
            return $mol_crypto_native.subtle.importKey('jwk', {
                crv: "Ed25519",
                ext: true,
                key_ops: ['verify'],
                kty: "OKP",
                x: this.toString(),
            }, "Ed25519", Boolean('extractable'), ['verify']).catch($mol_crypto_restack);
        }
        /** Verifies signature of data. */
        async verify(data, sign) {
            return await $mol_crypto_native.subtle.verify("Ed25519", await this.native(), sign, data).catch($mol_crypto_restack);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_auditor.prototype, "native", null);
    $.$mol_crypto2_auditor = $mol_crypto2_auditor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** x25519 public key for data encryption. */
    class $mol_crypto2_socket extends $mol_crypto2_key {
        /** Native WebAPI public key. */
        async native() {
            return await $mol_crypto_native.subtle.importKey('jwk', {
                crv: 'X25519',
                ext: true,
                kty: 'OKP',
                key_ops: [],
                x: this.toString(),
            }, "X25519", true, []).catch($mol_crypto_restack);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_socket.prototype, "native", null);
    $.$mol_crypto2_socket = $mol_crypto2_socket;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Compose public key for verifying and encryption, based on Curve25519. */
    class $mol_crypto2_public extends $mol_crypto2_key {
        static size_str = 86;
        static size_bin = 64;
        /** Return Auditor part. */
        auditor() {
            return $mol_crypto2_auditor.from(this.asArray().subarray(0, 32));
        }
        /** Return Socket part. */
        socket() {
            return $mol_crypto2_socket.from(this.asArray().subarray(32, 64));
        }
        toString() {
            return this.auditor().toString() + this.socket().toString();
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_public.prototype, "auditor", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_public.prototype, "socket", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_public.prototype, "toString", null);
    $.$mol_crypto2_public = $mol_crypto2_public;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let sponge = new Uint32Array(80);
    /** Fast small sync SHA-1 (20 bytes, 160 bits) */
    function $mol_crypto2_hash(input) {
        const data = input instanceof Uint8Array
            ? input
            : new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
        const bits = data.byteLength << 3;
        const kbits = bits >> 5;
        const kword = 0x80 << (24 - bits & 0b11111);
        const bytes = 16 + ((bits + 64) >>> 9 << 4);
        const klens = bytes - 1;
        const wlen = data.byteLength >> 2 << 2;
        let tail = 0;
        for (let i = wlen; i < data.length; ++i) {
            tail |= data[i] << ((3 - i & 0b11) << 3);
        }
        // Initial
        const hash = new Int32Array([1732584193, -271733879, -1732584194, 271733878, -1009589776]);
        // Digest
        for (let i = 0; i < bytes; i += 16) {
            let h0 = hash[0];
            let h1 = hash[1];
            let h2 = hash[2];
            let h3 = hash[3];
            let h4 = hash[4];
            for (let j = 0; j < 16; ++j) {
                const k = i + j;
                if (k === klens) {
                    sponge[j] = bits;
                }
                else {
                    const pos = k << 2;
                    let word = pos === wlen ? tail :
                        pos > wlen ? 0 :
                            (data[pos] << 24 | data[pos + 1] << 16 | data[pos + 2] << 8 | data[pos + 3]);
                    if (k === kbits)
                        word |= kword;
                    sponge[j] = word;
                }
                const next = ((h1 & h2 | ~h1 & h3) + 1518500249 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 16; j < 20; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 & h2 | ~h1 & h3) + 1518500249 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 20; j < 40; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 ^ h2 ^ h3) + 1859775393 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 40; j < 60; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 & h2 | h1 & h3 | h2 & h3) - 1894007588 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 60; j < 80; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 ^ h2 ^ h3) - 899497514 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            hash[0] += h0;
            hash[1] += h1;
            hash[2] += h2;
            hash[3] += h3;
            hash[4] += h4;
        }
        for (let i = 0; i < 20; ++i) {
            const word = hash[i];
            hash[i] = word << 24 | word << 8 & 0xFF0000 | word >>> 8 & 0xFF00 | word >>> 24 & 0xFF; // BE -> LE
        }
        return new Uint8Array(hash.buffer);
    }
    $.$mol_crypto2_hash = $mol_crypto2_hash;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo_key extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (key, next) {
                let store2 = store.get(this ?? fun);
                if (!store2)
                    store.set(this ?? fun, store2 = new Map);
                const key_str = $mol_key(key);
                if (next === undefined && store2.has(key_str))
                    return store2.get(key_str);
                const val = task.call(this, key, next) ?? next;
                store2.set(key_str, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo_key = $mol_memo_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_any extends Object {
        static [Symbol.toStringTag];
        static [$mol_key_handle]() {
            return this.toString();
        }
        /** Short user-readable identity. */
        static toString() {
            return $$.$mol_func_name(this);
        }
        /** Type-predicate that checks value by schema. */
        static check(value) {
            try {
                this.guard(value);
                return true;
            }
            catch (error) {
                return false;
            }
        }
        /** `instanceof` support */
        static [Symbol.hasInstance](value) {
            return this.check(value);
        }
        /** Type-parser that fails of wrong values. */
        static guard(value) {
            return value;
        }
        /** Type-caster that normalizes wrong values. */
        static cast(value) {
            try {
                this.guard(value);
                return value;
            }
            catch (error) {
                return this.default;
            }
        }
        /** Default value which conforms schema. */
        static default = null;
    }
    $.$mol_schema_any = $mol_schema_any;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_maybe = $mol_memo_key.func(function $mol_schema_maybe(Some) {
        return class $mol_schema_maybe_ extends $mol_schema_any {
            static Some = Some;
            static toString() {
                if (this !== $mol_schema_maybe_)
                    return super.toString();
                return '$mol_schema_maybe<' + $mol_key(Some) + '>';
            }
            static guard(value) {
                if (value == null)
                    return value;
                return Some.guard(value);
            }
            static default = null;
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_instance = $mol_memo_key.func(function $mol_schema_instance(Class) {
        class $mol_schema_instance_ extends $mol_schema_any {
            static Class = Class;
            static toString() {
                if (this !== $mol_schema_instance_)
                    return super.toString();
                return '$mol_schema_instance<' + $$.$mol_func_name(Class) + '>';
            }
            static guard(value) {
                if (value != null && Object(value) instanceof Class)
                    return value;
                return $mol_fail(new TypeError('Wrong class', { cause: { value, schema: this } }));
            }
            static cast(value) {
                return this.guard(value);
            }
            static default;
        }
        return ((Class?.[Symbol.hasInstance] === $mol_schema_any[Symbol.hasInstance])
            ? Class
            : $mol_schema_instance_);
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_link_compare(left, right) {
        return (right.str > left.str ? 1 : right.str < left.str ? -1 : 0);
    }
    $.$giper_baza_link_compare = $giper_baza_link_compare;
    const regexp = /(?<![\p{L}_])(?:(?:[a-zæA-ZÆ0-9]{8})?_){0,3}(?:[a-zæA-ZÆ0-9]{8})(?![\p{L}_])/gu;
    class $giper_baza_link extends Object {
        str;
        constructor(str) {
            super();
            this.str = str;
            const short = str.replace(/AAAAAAAA/g, '').replace(/_+$/, '');
            const found = short && (short.match(regexp)?.[0] ?? null);
            if (found !== short)
                $mol_fail(new Error('Wrong Link', { cause: str }));
            this.str = found;
        }
        static [Symbol.match](str) {
            return str.match(regexp);
        }
        static [Symbol.matchAll](str) {
            return str.matchAll(regexp);
        }
        static hole = new this('');
        static check(val) {
            try {
                return new this(val);
            }
            catch {
                return null;
            }
        }
        [$mol_key_handle]() {
            return this.str;
        }
        toString() {
            return this.str;
        }
        toJSON() {
            return this.str;
        }
        [Symbol.toPrimitive]() {
            return this.str;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({ 'color': 'darkorange' }, this.str || '_');
        }
        _bin = null;
        /** Binary representation (6/12/18/24 bytes). */
        toBin() {
            if (this._bin)
                return this._bin;
            const str = this.relate(_base).str;
            const norm = str && str
                .replace(/^___/, '')
                .split('_')
                .map(numb => numb || 'AAAAAAAA')
                .join('');
            return this._bin = $mol_base64_ae_decode(norm);
        }
        /** Make from integer (6 bytes). */
        static from_int(int) {
            const bin = new Uint8Array(new BigUint64Array([BigInt(int)]).buffer, 0, 6);
            const link = new this($mol_base64_ae_encode(bin));
            link._bin = bin;
            return link;
        }
        /** Read from binary (6/12/18/24 bytes). */
        static from_bin(bin) {
            const str = [...$mol_base64_ae_encode(bin).match(/(.{8})/g) ?? []].join('_');
            const link = new this(str).resolve(_base);
            link._bin = bin;
            return link;
        }
        static _hash_cache = new WeakMap();
        /** Make hash from binary (12 bytes). */
        static hash_bin(bin) {
            let link = this._hash_cache.get(bin);
            if (link)
                return link;
            const hash = $mol_crypto2_hash(bin);
            link = this.from_bin(new Uint8Array(hash.buffer, 0, 12));
            this._hash_cache.set(bin, link);
            return link;
        }
        /** Make hash from string (12 bytes). */
        static hash_str(str) {
            return this.hash_bin($mol_charset_encode(str));
        }
        /** Land-local Peer id. */
        peer() {
            return new $giper_baza_link(this.str.split('_')[0] ?? '');
        }
        /** Lord-local Area id. */
        area() {
            return new $giper_baza_link(this.str.split('_')[2] ?? '');
        }
        /** Land-local Head id. */
        head() {
            return new $giper_baza_link(this.str.split('_')[3] ?? '');
        }
        /** Link to Lord Home. */
        lord() {
            return new $giper_baza_link(this.str.split('_').slice(0, 2).join('_'));
        }
        /** Link to Land Root. */
        land() {
            return new $giper_baza_link(this.str.split('_').slice(0, 3).join('_'));
        }
        /** Pawn Link relative to base Land: `___QWERTYUI` */
        relate(base) {
            if (base.str === '')
                return this;
            base = base.land();
            if (this.land().str !== base.str)
                return this;
            const head = this.head();
            return new $giper_baza_link('___' + head);
        }
        /** Absolute Pawn Link from relative (`___QWERTYUI`) using base Land Link. */
        resolve(base) {
            if (base.str === '')
                return this;
            if (this.str === '')
                return base.land();
            if (this.str.length > 16)
                return this;
            const parts = base.land().toString().split('_');
            while (parts.length < 3)
                parts.push('');
            parts.push(this.str.replace(/^___/, ''));
            return new $giper_baza_link(parts.join('_'));
        }
        mix(mixin) {
            if (mixin instanceof $giper_baza_link)
                mixin = mixin.toBin();
            const mixout = $mol_buffer.from(this.toBin().slice());
            mixout.mix(mixin);
            return mixout.asArray();
        }
    }
    $.$giper_baza_link = $giper_baza_link;
    let _base = $giper_baza_link.hole;
    function $giper_baza_link_base(base, task) {
        const prev = _base;
        _base = base;
        try {
            return task();
        }
        finally {
            _base = prev;
        }
    }
    $.$giper_baza_link_base = $giper_baza_link_base;
    $.$giper_baza_link_schema = $mol_schema_maybe($mol_schema_instance($giper_baza_link));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Ed25519 private key for data signing. */
    class $mol_crypto2_signer extends $mol_crypto2_auditor {
        static size_sign = 64;
        /** Generates new Signer. */
        static async generate() {
            const pair = await $mol_crypto_native.subtle.generateKey("Ed25519", Boolean('extractable'), ['sign', 'verify']).catch($mol_crypto_restack);
            const { x, d } = await $mol_crypto_native.subtle.exportKey('jwk', pair.privateKey).catch($mol_crypto_restack);
            return this.from(x + d);
        }
        /** Native WebAPI private key. */
        async nativePrivate() {
            return await $mol_crypto_native.subtle.importKey('jwk', {
                crv: "Ed25519",
                ext: true,
                key_ops: ['sign'],
                kty: "OKP",
                x: this.toString(),
                d: this.toStringPrivate(),
            }, "Ed25519", Boolean('extractable'), ['sign']).catch($mol_crypto_restack);
        }
        /** Array view of private part. */
        asArrayPrivate() {
            return new Uint8Array(this.buffer, this.byteOffset + 32, 32);
        }
        /** String representation of private part. */
        toStringPrivate() {
            return $mol_base64_url_encode(this.asArrayPrivate());
        }
        /** Returns Auditor from this Signer. */
        auditor() {
            return $mol_crypto2_auditor.from(this.asArray());
        }
        /** Makes Signature for data. */
        async sign(data) {
            return new Uint8Array(await $mol_crypto_native.subtle.sign("Ed25519", await this.nativePrivate(), data).catch($mol_crypto_restack));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_signer.prototype, "nativePrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_signer.prototype, "toStringPrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_signer.prototype, "auditor", null);
    $.$mol_crypto2_signer = $mol_crypto2_signer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** 16 unique bytes. */
    function $mol_crypto2_nonce() {
        return $mol_crypto_native.getRandomValues(new Uint8Array(16));
    }
    $.$mol_crypto2_nonce = $mol_crypto2_nonce;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** @deprecated Use $mol_crypto2_nonce */
    $.$mol_crypto_salt = $mol_crypto2_nonce;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Symmetric cipher with shortest payload. */
    class $mol_crypto_sacred extends $mol_buffer {
        /** Key size in bytes. */
        static size = 16;
        /** Makes new random secret. */
        static make() {
            return this.from($mol_crypto_salt());
        }
        /** Makes from string of buffer view. */
        static from(serial) {
            if (typeof serial === 'string') {
                serial = new Uint8Array([
                    ...$mol_base64_url_decode(serial),
                ]);
            }
            if (!(serial instanceof Uint8Array)) {
                serial = new Uint8Array(serial.buffer, serial.byteOffset, serial.byteLength);
            }
            ;
            serial[0] = 0xFF;
            const sacred = super.from(serial);
            return sacred;
        }
        static async from_native(native) {
            const buf = await $mol_crypto_native.subtle.exportKey('raw', native).catch($mol_crypto_restack);
            const sacred = this.from(new Uint8Array(buf));
            sacred._native = native;
            return sacred;
        }
        constructor(buffer, byteOffset, byteLength) {
            super(buffer, byteOffset, byteLength);
            if (this.getUint8(0) !== 0xFF)
                $mol_fail(new Error('Buffer should starts with 0xFF byte'));
        }
        toString() {
            return $mol_base64_url_encode(this.asArray());
        }
        _native;
        /** Native crypto secret */
        async native() {
            return this._native ?? (this._native = await $mol_crypto_native.subtle.importKey('raw', this, {
                name: 'AES-CBC',
                length: 128,
            }, true, ['encrypt', 'decrypt']).catch($mol_crypto_restack));
        }
        /** Encrypt any binary message. 16n bytes */
        async encrypt(open, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.encrypt({
                name: 'AES-CBC',
                length: 128,
                tagLength: 32,
                iv: salt,
            }, await this.native(), open).catch($mol_crypto_restack));
        }
        /** Decrypt any binary message. */
        async decrypt(closed, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.decrypt({
                name: 'AES-CBC',
                length: 128,
                tagLength: 32,
                iv: salt,
            }, await this.native(), closed).catch($mol_crypto_restack));
        }
        /** Encrypts 0xFF prefixed buffer. 16 bytes */
        async close(opened, salt) {
            if (opened.getUint8(0) !== 0xFF)
                throw new Error('Closable buffer should starts with 0xFF');
            const trimed = new Uint8Array(opened.buffer, opened.byteOffset + 1, opened.byteLength - 1);
            return this.encrypt(trimed, salt);
        }
        /** Decrypts 0xFF prefixed buffer. 16 bytes */
        async open(closed, salt) {
            const trimed = await this.decrypt(closed, salt);
            if (trimed.byteLength !== closed.byteLength - 1)
                throw new Error('Length of opened buffer should be ' + (closed.byteLength - 1));
            const opened = new Uint8Array(closed.byteLength);
            opened[0] = 0xFF;
            opened.set(trimed, 1);
            return opened;
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto_sacred.prototype, "toString", null);
    $.$mol_crypto_sacred = $mol_crypto_sacred;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** x25519 private key for data encryption. */
    class $mol_crypto2_cipher extends $mol_crypto2_socket {
        static size_secret = 16;
        /** Generates new Cipher. */
        static async generate() {
            const pair = await $mol_crypto_native.subtle.generateKey("X25519", Boolean('extractable'), ['deriveKey']).catch($mol_crypto_restack);
            const { x, d } = await $mol_crypto_native.subtle.exportKey('jwk', pair.privateKey).catch($mol_crypto_restack);
            return this.from(x + d);
        }
        /** Native WebAPI private key. */
        async nativePrivate() {
            return $mol_crypto_native.subtle.importKey('jwk', {
                crv: 'X25519',
                ext: true,
                kty: 'OKP',
                key_ops: ['deriveKey', 'deriveBits'],
                x: this.toString(),
                d: this.toStringPrivate(),
            }, "X25519", Boolean('extractable'), ['deriveKey', 'deriveBits']).catch($mol_crypto_restack);
        }
        /** Array view of private part. */
        asArrayPrivate() {
            return new Uint8Array(this.buffer, this.byteOffset + 32, 32);
        }
        /** String representation of private part. */
        toStringPrivate() {
            return $mol_base64_url_encode(this.asArrayPrivate());
        }
        /** Returns Socket from this Chipher. */
        socket() {
            return $mol_crypto2_socket.from(this.asArray());
        }
        /** Makes shared secret for combination of Chiper and Soacket. */
        async secret(pub) {
            return $mol_crypto_sacred.from(new Uint8Array(await $mol_crypto_native.subtle.deriveBits({
                name: "X25519",
                public: await pub.native(),
            }, await this.nativePrivate(), $mol_crypto_sacred.size * 8).catch($mol_crypto_restack)));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_cipher.prototype, "nativePrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_cipher.prototype, "toStringPrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_cipher.prototype, "socket", null);
    $.$mol_crypto2_cipher = $mol_crypto2_cipher;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Compose private key for signing and encryption, based on Curve25519. */
    class $mol_crypto2_private extends $mol_crypto2_public {
        /** Generates new private key. */
        static async generate() {
            const [signer, cipher] = await Promise.all([
                $mol_crypto2_signer.generate(),
                $mol_crypto2_cipher.generate(),
            ]);
            const key = $mol_crypto2_private.from($mol_crypto2_public.size_bin + $mol_crypto2_private.size_bin);
            key.asArray().set(signer.asArray(), 0);
            key.asArray().set(cipher.asArray(), 32);
            key.asArrayPrivate().set(signer.asArrayPrivate(), 0);
            key.asArrayPrivate().set(cipher.asArrayPrivate(), 32);
            return key;
        }
        /** Return Signer part. */
        signer() {
            const signer = $mol_crypto2_signer.from($mol_crypto2_auditor.size_bin + $mol_crypto2_signer.size_bin);
            signer.asArray().set(this.asArray().subarray(0, 32));
            signer.asArrayPrivate().set(this.asArrayPrivate().subarray(0, 32));
            return signer;
        }
        /** Return Cipher part. */
        cipher() {
            const cipher = $mol_crypto2_cipher.from($mol_crypto2_socket.size_bin + $mol_crypto2_cipher.size_bin);
            cipher.asArray().set(this.asArray().subarray(32, 64));
            cipher.asArrayPrivate().set(this.asArrayPrivate().subarray(32, 64));
            return cipher;
        }
        /** Return Public part. */
        public() {
            return $mol_crypto2_public.from(this.asArray());
        }
        /** Array view of private part. */
        asArrayPrivate() {
            return new Uint8Array(this.buffer, this.byteOffset + 64, 64);
        }
        /** String representation of private part. */
        toStringPrivate() {
            return this.signer().toStringPrivate() + this.cipher().toStringPrivate();
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "signer", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "cipher", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "public", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "toStringPrivate", null);
    $.$mol_crypto2_private = $mol_crypto2_private;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Public key generated with Proof of Work */
    class $giper_baza_auth_pass extends $mol_crypto2_public {
        static like(bin) {
            const pass = this.from(bin);
            if (pass.byteLength !== $giper_baza_auth_pass.size_bin)
                return null;
            if (pass.uint8(0) !== 0xFF)
                return null;
            return pass;
        }
        hash() {
            return $giper_baza_link.hash_bin(this.asArray());
        }
        path() {
            return `pass:${this.hash().str}`;
        }
        /** Independent actor with global unique id generated from Auth key */
        lord() {
            return this.hash().lord();
        }
        /** Land local unique identifier of independent actor (first half of Lord) */
        peer() {
            return this.hash().peer();
        }
        toJSON() {
            return '@' + this.lord().str;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' 🎫');
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "hash", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "path", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "lord", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "peer", null);
    $.$giper_baza_auth_pass = $giper_baza_auth_pass;
    /** Private key generated with Proof of Work */
    class $giper_baza_auth extends $mol_crypto2_private {
        /** Current Private key generated with Proof of Work  */
        static current(next) {
            $mol_wire_solid();
            if (next === undefined) {
                const key = String($mol_state_local.value('$giper_baza_auth') ?? '');
                if (key) {
                    const auth = $giper_baza_auth.from(key);
                    if (auth.byteLength === 128)
                        return auth;
                    $$.$mol_log3_warn({
                        message: 'Wrong Auth size',
                        hint: 'Relax. Right Auth is created.',
                        place: `${this}.current()`,
                    });
                }
            }
            if (!next)
                next = this.grab();
            $mol_state_local.value('$giper_baza_auth', next.toString() + next.toStringPrivate());
            return next;
        }
        static embryos = [];
        static grab() {
            if (this.embryos.length)
                return this.from(this.embryos.pop());
            return $mol_wire_sync(this)._generate();
        }
        static async _generate() {
            for (let i = 0; i < 4096; ++i) {
                const auth = this.from(await super.generate());
                if (auth.uint8(0) !== 0xFF)
                    continue;
                if (/[æÆ]/.test(auth.pass().lord().str))
                    continue;
                return auth;
            }
            $mol_fail(new Error(`Too long key generation`));
        }
        pass() {
            return $giper_baza_auth_pass.from(this.public());
        }
        secret_mutual(pass) {
            return $mol_wire_sync(this.cipher()).secret(pass.socket());
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.pass().lord()), ' 🔑');
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth.prototype, "pass", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_auth.prototype, "secret_mutual", null);
    __decorate([
        $mol_mem
    ], $giper_baza_auth, "current", null);
    __decorate([
        $mol_action
    ], $giper_baza_auth, "grab", null);
    $.$giper_baza_auth = $giper_baza_auth;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * # Generic Graph model
     * - Supports any type of Nodes and Edges.
     * - All links are ordered, but this may be ignored.
     * - Multigraph supported using arrays of Edges.
     * - Hypergraph supported by reusing same Edge on set of links.
     * - Ubergraph supported using Edges as Nodes to.
     **/
    class $mol_graph {
        /** All registered Nodes */
        nodes = new Set();
        /** Edges for Nodes pairs (from-to-edge) */
        edges_out = new Map();
        /** Edges for Nodes pairs (to-from-edge) */
        edges_in = new Map();
        // LINKING NODES
        /** Full connect two Nodes */
        link(from, to, edge) {
            this.link_out(from, to, edge);
            this.link_in(to, from, edge);
        }
        /** Full disconnect two Nodes */
        unlink(from, to) {
            this.edges_in.get(to)?.delete(from);
            this.edges_out.get(from)?.delete(to);
        }
        /** Forward connect two Nodes */
        link_out(from, to, edge) {
            let pair = this.edges_out.get(from);
            if (!pair) {
                pair = new Map();
                this.edges_out.set(from, pair);
                this.nodes.add(from);
            }
            pair.set(to, edge);
            this.nodes.add(to);
        }
        /** Backward connect two Nodes */
        link_in(to, from, edge) {
            let pair = this.edges_in.get(to);
            if (!pair) {
                pair = new Map();
                this.edges_in.set(to, pair);
                this.nodes.add(to);
            }
            pair.set(from, edge);
            this.nodes.add(to);
        }
        // GETTING EDGES
        /** Return any Edge for two Nodes or null */
        edge(from, to) {
            return this.edge_out(from, to) ?? this.edge_in(to, from);
        }
        /** Return output Edge for two Nodes or null */
        edge_out(from, to) {
            return this.edges_out.get(from)?.get(to) ?? null;
        }
        /** Return input Edge for two Nodes or null */
        edge_in(to, from) {
            return this.edges_in.get(to)?.get(from) ?? null;
        }
        // MUTATIONS
        /** Cut cycles at lowest priority of Edges */
        acyclic(get_weight) {
            const checked = [];
            for (const start of this.nodes) {
                const path = [];
                const visit = (from) => {
                    if (checked.includes(from))
                        return Number.MAX_SAFE_INTEGER;
                    const index = path.lastIndexOf(from);
                    if (index > -1) {
                        const cycle = path.slice(index);
                        return cycle.reduce((weight, node, index) => Math.min(weight, get_weight(this.edge_out(node, cycle[(index + 1) % cycle.length]))), Number.MAX_SAFE_INTEGER);
                    }
                    path.push(from);
                    dive: try {
                        const deps = this.edges_out.get(from);
                        if (!deps)
                            break dive;
                        for (const [to, edge] of deps) {
                            if (to === from) {
                                this.unlink(from, to);
                                continue;
                            }
                            const weight_out = get_weight(edge);
                            const min = visit(to);
                            if (weight_out > min)
                                return min;
                            if (weight_out === min) {
                                this.unlink(from, to);
                                if (path.length > 1) {
                                    const enter = path[path.length - 2];
                                    this.link(enter, to, edge);
                                }
                            }
                        }
                    }
                    finally {
                        path.pop();
                    }
                    checked.push(from);
                    return Number.MAX_SAFE_INTEGER;
                };
                visit(start);
            }
        }
        // NODES SELECTION
        /** Topoligical ordered set of all Nodes for acyclic graph */
        get sorted() {
            const sorted = new Set();
            const visit = (node) => {
                if (sorted.has(node))
                    return;
                const deps = this.edges_out.get(node);
                if (deps) {
                    for (const [dep] of deps)
                        visit(dep);
                }
                sorted.add(node);
            };
            for (const node of this.nodes) {
                visit(node);
            }
            return sorted;
        }
        /** All Nodes which don't have input Edges */
        get roots() {
            const roots = [];
            for (const node of this.nodes) {
                if (this.edges_in.get(node)?.size)
                    continue;
                roots.push(node);
            }
            return roots;
        }
        // DEPTH STATS
        /**
         * Nodes depth statistics for acyclic graph
         * @example
         * graph.depth_stat( Math.min )
         * graph.depth_stat( Math.max )
         **/
        nodes_depth(select) {
            const stat = new Map();
            const visit = (node, depth = 0) => {
                if (stat.has(node))
                    stat.set(node, select(depth, stat.get(node)));
                else
                    stat.set(node, depth);
                for (const kid of this.edges_out.get(node)?.keys() ?? [])
                    visit(kid, depth + 1);
            };
            for (const root of this.roots)
                visit(root);
            return stat;
        }
        /**
         * Depth's Nodes statistics for acyclic graph
         * @example
         * graph.depth_nodes( Math.min )
         * graph.depth_nodes( Math.max )
         **/
        depth_nodes(select) {
            const groups = [];
            for (const [node, depth] of this.nodes_depth(select).entries()) {
                if (groups[depth])
                    groups[depth].push(node);
                else
                    groups[depth] = [node];
            }
            return groups;
        }
    }
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_time_base {
        static patterns = {};
        static formatter(pattern) {
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map((token) => token.replace(/([-+*.\[\]()\^])/g, '\\$1'));
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, (str, text, token) => {
                if (text)
                    funcs.push(() => text);
                if (token)
                    funcs.push(this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = (arg, lang) => {
                return funcs.reduce((res, func) => res + func(arg, lang), '');
            };
        }
        toString(pattern, lang) {
            const Base = this.constructor;
            const formatter = Base.formatter(pattern);
            return formatter(this, lang);
        }
    }
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
     *
     * Immutable iso8601 time duration representation.
     * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
     */
    class $mol_time_duration extends $mol_time_base {
        constructor(config = 0) {
            super();
            if (typeof config === 'number') {
                if (!Number.isFinite(config))
                    throw new RangeError(`Wrong ms count`);
                this.second = config / 1000;
                return;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    this.hour = 0;
                    this.minute = 0;
                    return;
                }
                duration: {
                    const parser = /^(-?)P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    const sign = found[1] ? -1 : 1;
                    if (found[2])
                        this.year = sign * Number(found[2]);
                    if (found[3])
                        this.month = sign * Number(found[3]);
                    if (found[4])
                        this.day = sign * Number(found[4]);
                    if (found[5])
                        this.hour = sign * Number(found[5]);
                    if (found[6])
                        this.minute = sign * Number(found[6]);
                    if (found[7])
                        this.second = sign * Number(found[7]);
                    return;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        this.hour = Number(found[1]);
                    if (found[2])
                        this.minute = Number(found[2]);
                    return;
                }
                throw new Error(`Can not parse time duration (${config})`);
            }
            if (config instanceof Array) {
                ;
                [this.year, this.month, this.day, this.hour, this.minute, this.second] = config;
                return;
            }
            this.year = config.year || 0;
            this.month = config.month || 0;
            this.day = config.day || 0;
            this.hour = config.hour || 0;
            this.minute = config.minute || 0;
            this.second = config.second || 0;
        }
        year = 0;
        month = 0;
        day = 0;
        hour = 0;
        minute = 0;
        second = 0;
        get normal() {
            let second = this.second ?? 0;
            let minute = this.minute ?? 0;
            let hour = this.hour ?? 0;
            let day = this.day ?? 0;
            minute += Math.trunc(second / 60);
            second = second % 60;
            hour += Math.trunc(minute / 60);
            minute = minute % 60;
            day += Math.trunc(hour / 24);
            hour = hour % 24;
            return new $mol_time_duration({
                year: this.year,
                month: this.month,
                day: day,
                hour: hour,
                minute: minute,
                second: second,
            });
        }
        summ(config) {
            const duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        }
        mult(numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        }
        count(config) {
            const duration = new $mol_time_duration(config);
            return this.valueOf() / duration.valueOf();
        }
        valueOf() {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        }
        toJSON() { return this.toString(); }
        toString(pattern = 'P#Y#M#DT#h#m#s') {
            return super.toString(pattern);
        }
        toArray() {
            return [this.year, this.month, this.day, this.hour, this.minute, this.second];
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        static patterns = {
            '#Y': (duration) => {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': (duration) => {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': (duration) => {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': (duration) => {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': (duration) => {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': (duration) => {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            'hh': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(100 + moment.hour).slice(1);
            },
            'h': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(100 + moment.minute).slice(1);
            },
            'm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': (moment) => {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': (moment) => {
                if (moment.second == null)
                    return '';
                return String(100 + moment.second | 0).slice(1);
            },
            's': (moment) => {
                if (moment.second == null)
                    return '';
                return String(moment.second | 0);
            },
            '.sss': (moment) => {
                if (moment.second == null)
                    return '';
                // if( moment.second === ( moment.second | 0 ) ) return ''
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = (moment.second - Math.trunc(moment.second)).toFixed(3);
                return millisecond.slice(2);
            },
        };
    }
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_time_moment_weekdays;
    (function ($mol_time_moment_weekdays) {
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["monday"] = 0] = "monday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["tuesday"] = 1] = "tuesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["wednesday"] = 2] = "wednesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["thursday"] = 3] = "thursday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["friday"] = 4] = "friday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["saturday"] = 5] = "saturday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["sunday"] = 6] = "sunday";
    })($mol_time_moment_weekdays = $.$mol_time_moment_weekdays || ($.$mol_time_moment_weekdays = {}));
    function numb(str, max) {
        const numb = Number(str);
        if (numb < max)
            return numb;
        $mol_fail(new Error(`Wrong time component ${str}`));
    }
    /**
     * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
     *
     * Immutable iso8601 time moment representation.
     * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
     */
    class $mol_time_moment extends $mol_time_base {
        constructor(config = new Date) {
            super();
            if (typeof config === 'number') {
                config = new Date(config);
                if (Number.isNaN(config.valueOf()))
                    throw new RangeError(`Wrong ms count`);
            }
            if (typeof config === 'string') {
                const parsed = /^(?:(\d\d?\d?\d?)(?:-?(\d\d?)(?:-?(\d\d?))?)?)?(?:[T ](?:(\d\d?)(?::?(\d\d?)(?::?(\d\d?(?:\.\d+)?))?)?)?(Z|[\+\-]\d\d?(?::?(?:\d\d?)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error(`Can not parse time moment (${config})`);
                if (parsed[1])
                    this.year = numb(parsed[1], 9999);
                if (parsed[2])
                    this.month = numb(parsed[2], 13) - 1;
                if (parsed[3])
                    this.day = numb(parsed[3], 32) - 1;
                if (parsed[4])
                    this.hour = numb(parsed[4], 60);
                if (parsed[5])
                    this.minute = numb(parsed[5], 60);
                if (parsed[6])
                    this.second = numb(parsed[6], 60);
                if (parsed[7])
                    this.offset = new $mol_time_duration(parsed[7]);
                return;
            }
            if (config instanceof Date) {
                this.year = config.getFullYear();
                this.month = config.getMonth();
                this.day = config.getDate() - 1;
                this.hour = config.getHours();
                this.minute = config.getMinutes();
                this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                this.offset = new $mol_time_duration({ minute: -config.getTimezoneOffset() });
                return;
            }
            if (config instanceof Array) {
                ;
                [this.year, this.month, this.day, this.hour, this.minute, this.second] = config;
                if (config[6] !== undefined)
                    this.offset = new $mol_time_duration(config[6] * 60_000);
                return;
            }
            this.year = config.year;
            this.month = config.month;
            this.day = config.day;
            this.hour = config.hour;
            this.minute = config.minute;
            this.second = config.second;
            this.offset = config.offset == null ? config.offset : new $mol_time_duration(config.offset);
        }
        year;
        month;
        day;
        hour;
        minute;
        second;
        offset;
        get weekday() {
            return (this.native.getDay() + 6) % 7;
        }
        _native;
        get native() {
            if (this._native)
                return this._native;
            const second = Math.floor(this.second ?? 0);
            const current = new Date();
            const native = new Date(this.year ?? current.getFullYear(), this.month ?? (this.year === undefined ? current.getMonth() : 0), (this.day ?? (this.year === undefined && this.month === undefined ? current.getDate() - 1 : 0)) + 1, this.hour ?? 0, this.minute ?? 0, second, Math.floor(((this.second ?? 0) - second) * 1000));
            const offset = -native.getTimezoneOffset();
            shift: if (this.offset) {
                const target = this.offset.count('PT1m');
                if (target === offset)
                    break shift;
                native.setMinutes(native.getMinutes() + offset - target);
            }
            return this._native = native;
        }
        _normal;
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native).toOffset(this.offset);
            return this._normal = new $mol_time_moment({
                year: this.year === undefined ? undefined : moment.year,
                month: this.month === undefined ? undefined : moment.month,
                day: this.day === undefined ? undefined : moment.day,
                hour: this.hour === undefined ? undefined : moment.hour,
                minute: this.minute === undefined ? undefined : moment.minute,
                second: this.second === undefined ? undefined : moment.second,
                offset: this.offset === undefined ? undefined : moment.offset,
            });
        }
        merge(config) {
            const moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: moment.year === undefined ? this.year : moment.year,
                month: moment.month === undefined ? this.month : moment.month,
                day: moment.day === undefined ? this.day : moment.day,
                hour: moment.hour === undefined ? this.hour : moment.hour,
                minute: moment.minute === undefined ? this.minute : moment.minute,
                second: moment.second === undefined ? this.second : moment.second,
                offset: moment.offset === undefined ? this.offset : moment.offset,
            });
        }
        shift(config) {
            const duration = new $mol_time_duration(config);
            const moment = new $mol_time_moment().merge({
                year: this.year ?? 0,
                month: this.month ?? 0,
                day: this.day ?? 0,
                hour: this.hour ?? 0,
                minute: this.minute ?? 0,
                second: this.second ?? 0,
                offset: this.offset ?? 0
            });
            const second = moment.second + (duration.second ?? 0);
            const native = new Date(moment.year + (duration.year ?? 0), moment.month + (duration.month ?? 0), moment.day + 1 + (duration.day ?? 0), moment.hour + (duration.hour ?? 0), moment.minute + (duration.minute ?? 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: this.year === undefined ? undefined : native.getFullYear(),
                month: this.month === undefined ? undefined : native.getMonth(),
                day: this.day === undefined ? undefined : native.getDate() - 1,
                hour: this.hour === undefined ? undefined : native.getHours(),
                minute: this.minute === undefined ? undefined : native.getMinutes(),
                second: this.second === undefined ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        }
        mask(config) {
            const mask = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: mask.year === undefined ? undefined : this.year,
                month: mask.month === undefined ? undefined : this.month,
                day: mask.day === undefined ? undefined : this.day,
                hour: mask.hour === undefined ? undefined : this.hour,
                minute: mask.minute === undefined ? undefined : this.minute,
                second: mask.second === undefined ? undefined : this.second,
                offset: mask.offset === undefined ? undefined : this.offset,
            });
        }
        toOffset(config = new $mol_time_moment().offset) {
            const duration = new $mol_time_duration(config);
            const offset = this.offset || new $mol_time_moment().offset;
            let with_time = new $mol_time_moment('0001-01-01T00:00:00').merge(this);
            const moment = with_time.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        }
        valueOf() { return this.native.getTime(); }
        toJSON() { return this.toString(); }
        toString(pattern = 'YYYY-MM-DDThh:mm:ss.sssZ', lang) {
            return super.toString(pattern, lang);
        }
        toArray() {
            return [this.year, this.month, this.day, this.hour, this.minute, this.second, this.offset?.count('PT1m')];
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_accent(this.toString('YYYY-MM-DD hh:mm:ss.sss Z')));
        }
        static formatters = {};
        static intl(lang, pattern, options) {
            const group = this.formatters[lang ?? ''] ?? (this.formatters[lang ?? ''] = {});
            group[pattern] = group[pattern] ?? new Intl.DateTimeFormat(lang, options);
            return group[pattern];
        }
        /// Mnemonics:
        ///  * single letter for numbers: M - month number, D - day of month.
        ///  * uppercase letters for dates, lowercase for times: M - month number , m - minutes number
        ///  * repeated letters for define register count: YYYY - full year, YY - shot year, MM - padded month number
        ///  * words for word representation: Month - month name, WeekDay - day of week name
        ///  * shortcuts: WD - short day of week, Mon - short month name.
        static patterns = {
            'YYYY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': (moment) => {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': (moment, lang) => {
                if (moment.month == null)
                    return '';
                return $mol_time_moment.intl(lang, 'Month', { month: 'long' }).format(moment.native);
            },
            'DD Month': (moment, lang) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment, lang);
                    }
                    else {
                        return $mol_time_moment.intl(lang, 'DD Month', { day: '2-digit', month: 'long' }).format(moment.native);
                    }
                }
            },
            'D Month': (moment, lang) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return $mol_time_moment.intl(lang, 'D Month', { day: 'numeric', month: 'long' }).format(moment.native);
                    }
                }
            },
            'Mon': (moment, lang) => {
                if (moment.month == null)
                    return '';
                return $mol_time_moment.intl(lang, 'Mon', { month: 'short' }).format(moment.native);
            },
            'DD Mon': (moment, lang) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment, lang);
                    }
                    else {
                        return $mol_time_moment.intl(lang, 'DD Mon', { day: '2-digit', month: 'short' }).format(moment.native);
                    }
                }
            },
            'D Mon': (moment, lang) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment, lang);
                    }
                    else {
                        return $mol_time_moment.intl(lang, 'D Mon', { day: 'numeric', month: 'short' }).format(moment.native);
                    }
                }
            },
            '-MM': (moment) => {
                if (moment.month == null)
                    return '';
                return '-' + $mol_time_moment.patterns['MM'](moment);
            },
            'MM': (moment) => {
                if (moment.month == null)
                    return '';
                return String(100 + moment.month + 1).slice(1);
            },
            'M': (moment) => {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': (moment, lang) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return $mol_time_moment.intl(lang, 'WeekDay', { weekday: 'long' }).format(moment.native);
            },
            'WD': (moment, lang) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return $mol_time_moment.intl(lang, 'WD', { weekday: 'short' }).format(moment.native);
            },
            '-DD': (moment) => {
                if (moment.day == null)
                    return '';
                return '-' + $mol_time_moment.patterns['DD'](moment);
            },
            'DD': (moment) => {
                if (moment.day == null)
                    return '';
                return String(100 + moment.day + 1).slice(1);
            },
            'D': (moment) => {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': (moment) => {
                if (moment.hour == null)
                    return '';
                return 'T' + $mol_time_moment.patterns['hh'](moment);
            },
            'hh': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(100 + moment.hour).slice(1);
            },
            'h': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(100 + moment.minute).slice(1);
            },
            'm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': (moment) => {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': (moment) => {
                if (moment.second == null)
                    return '';
                return String(100 + moment.second | 0).slice(1);
            },
            's': (moment) => {
                if (moment.second == null)
                    return '';
                return String(moment.second | 0);
            },
            '.sss': (moment) => {
                if (moment.second == null)
                    return '';
                if (moment.second === (moment.second | 0))
                    return '';
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = (moment.second - Math.trunc(moment.second)).toFixed(3);
                return millisecond.slice(2);
            },
            'Z': (moment) => {
                const offset = moment.offset?.normal;
                if (!offset)
                    return '';
                let hour = offset.hour;
                let sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return sign + hour.toString().padStart(2, '0') + ':' + offset.minute.toString().padStart(2, '0');
            }
        };
    }
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for given runtype and returns tagged version of returned type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_tagged_demo
     */
    function $mol_data_tagged(config) {
        return config;
    }
    $.$mol_data_tagged = $mol_data_tagged;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_setup(value, config) {
        return Object.assign(value, {
            config,
            Value: null
        });
    }
    $.$mol_data_setup = $mol_data_setup;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_func_is_class(func) {
        return Object.getOwnPropertyDescriptor(func, 'prototype')?.writable === false;
    }
    $.$mol_func_is_class = $mol_func_is_class;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Combines list of unary functions/classes to one function.
     *
     * 	const reparse = $mol_data_pipe( JSON.stringify , JSON.parse )
     **/
    function $mol_data_pipe(...funcs) {
        return $mol_data_setup(function (input) {
            let value = input;
            for (const func of funcs)
                value = $mol_func_is_class(func) ? new func(value) : func.call(this, value);
            return value;
        }, { funcs });
    }
    $.$mol_data_pipe = $mol_data_pipe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_data_error extends $mol_error_mix {
    }
    $.$mol_data_error = $mol_data_error;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for number and returns number type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_number_demo
     */
    $.$mol_data_number = (val) => {
        if (typeof val === 'number')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a number`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for integer and returns number type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_integer_demo
     */
    function $mol_data_integer(val) {
        const val2 = $mol_data_number(val);
        if (Math.floor(val2) === val2)
            return val2;
        return $mol_fail(new $mol_data_error(`${val} is not an integer`));
    }
    $.$mol_data_integer = $mol_data_integer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_rank = $mol_data_tagged({
        $giper_baza_rank: $mol_data_pipe($mol_data_integer, (rank) => {
            if (rank >= $.$giper_baza_rank_deny && rank <= $.$giper_baza_rank_rule)
                return rank;
            $mol_fail(new $mol_data_error(`${rank} is out of Ran range`));
        }),
    }).$giper_baza_rank;
    /** Makes Rank from Tier and Fame names. */
    function $giper_baza_rank_make(tier, fame) {
        return ($giper_baza_rank_tier[tier] | $giper_baza_rank_rate[fame]);
    }
    $.$giper_baza_rank_make = $giper_baza_rank_make;
    /** Access level: deny, read, post, pull, rule */
    let $giper_baza_rank_tier;
    (function ($giper_baza_rank_tier) {
        /** Forbidden. There is no access, neither read nor write. */
        $giper_baza_rank_tier[$giper_baza_rank_tier["deny"] = 0] = "deny";
        /** Read only */
        $giper_baza_rank_tier[$giper_baza_rank_tier["read"] = 16] = "read";
        /** Post changes (Sand) */
        $giper_baza_rank_tier[$giper_baza_rank_tier["post"] = 48] = "post";
        /** Pull forks (Sand) */
        $giper_baza_rank_tier[$giper_baza_rank_tier["pull"] = 112] = "pull";
        /** Full control (Sand, Gift) */
        $giper_baza_rank_tier[$giper_baza_rank_tier["rule"] = 240] = "rule";
    })($giper_baza_rank_tier = $.$giper_baza_rank_tier || ($.$giper_baza_rank_tier = {}));
    function $giper_baza_rank_tier_of(rank) {
        return rank & 0b1111_0000;
    }
    $.$giper_baza_rank_tier_of = $giper_baza_rank_tier_of;
    /** Work as bits count by Rate */
    $.$giper_baza_rank_work_rates = [
        0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF,
        0xE, 0xE, 0xE, 0xE, 0xD, 0xD, 0xD, 0xD,
        0xC, 0xC, 0xB, 0xB, 0xA, 0xA, 0x9, 0x9,
        0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1,
        0x0,
    ];
    /** Ease of making changes, depends on fame: evil, harm, even, nice, good */
    let $giper_baza_rank_rate;
    (function ($giper_baza_rank_rate) {
        /** Days delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["late"] = 0] = "late";
        /** Seconds delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["long"] = 12] = "long";
        /** Half-second delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["slow"] = 13] = "slow";
        /** Milli-seconds delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["fast"] = 14] = "fast";
        /** Micro-seconds delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["just"] = 15] = "just";
    })($giper_baza_rank_rate = $.$giper_baza_rank_rate || ($.$giper_baza_rank_rate = {}));
    function $giper_baza_rank_rate_of(rank) {
        return rank & 0b0000_1111;
    }
    $.$giper_baza_rank_rate_of = $giper_baza_rank_rate_of;
    $.$giper_baza_rank_deny = $giper_baza_rank_make('deny', 'late');
    $.$giper_baza_rank_read = $giper_baza_rank_make('read', 'late');
    $.$giper_baza_rank_rule = $giper_baza_rank_make('rule', 'just');
    function $giper_baza_rank_pull(rate) {
        return $giper_baza_rank_make('pull', rate);
    }
    $.$giper_baza_rank_pull = $giper_baza_rank_pull;
    function $giper_baza_rank_post(rate) {
        return $giper_baza_rank_make('post', rate);
    }
    $.$giper_baza_rank_post = $giper_baza_rank_post;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Moment from time. */
    function $giper_baza_time_moment(time) {
        const stamp = time * 1000;
        return new $mol_time_moment(stamp);
    }
    $.$giper_baza_time_moment = $giper_baza_time_moment;
    /** User readable time+tick view. */
    function $giper_baza_time_dump(time, tick) {
        let res = $giper_baza_time_moment(time).toString('YYYY-MM-DD hh:mm:ss Z');
        if (tick !== undefined)
            res += ' !' + tick.toString(16).toUpperCase().padStart(2, '0');
        return res;
    }
    $.$giper_baza_time_dump = $giper_baza_time_dump;
    /** Current time with 0 tick. */
    function $giper_baza_time_now() {
        return now || Math.floor(Date.now() / 1000);
    }
    $.$giper_baza_time_now = $giper_baza_time_now;
    let now = 0;
    /** Run atomic transaction by temp freezing time. */
    function $giper_baza_time_freeze(task) {
        if (now)
            return task();
        now = $giper_baza_time_now();
        try {
            return task();
        }
        finally {
            now = 0;
        }
    }
    $.$giper_baza_time_freeze = $giper_baza_time_freeze;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_face extends Object {
        time;
        tick;
        summ;
        static length() {
            return 16;
        }
        constructor(time = 0, tick = 0, summ = 0) {
            super();
            this.time = time;
            this.tick = tick;
            this.summ = summ;
        }
        clone() {
            return new $giper_baza_face(this.time, this.tick, this.summ);
        }
        get moment() {
            return $giper_baza_time_moment(this.time);
        }
        get time_tick() {
            return this.time * 2 ** 16 + this.tick;
        }
        sync_time(time, tick) {
            if (this.time < time) {
                this.time = time;
                this.tick = tick;
                return true;
            }
            else if (this.time === time && this.tick < tick) {
                this.tick = tick;
                return true;
            }
            else {
                return false;
            }
        }
        sync_summ(summ) {
            if (this.summ < summ)
                this.summ = summ;
        }
        toJSON() {
            const time = $giper_baza_time_dump(this.time, this.tick);
            const summ = '%' + this.summ;
            return `${time} ${summ}`;
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$giper_baza_face ')
                + $mol_term_color.gray($giper_baza_time_dump(this.time, this.tick)
                    + ' %' + this.summ);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), $mol_dev_format_shade(' ', $giper_baza_time_dump(this.time, this.tick), ' %', this.summ));
        }
    }
    $.$giper_baza_face = $giper_baza_face;
    /** Statistics about Units in Land. it's total Units count & dictionary which maps Peer to Time */
    class $giper_baza_face_map extends Map {
        /** Cumulative face for all peers. */
        stat = new $giper_baza_face;
        _peer_last = '';
        constructor(entries) {
            super();
            if (entries)
                this.sync(entries);
        }
        clone() {
            return new $giper_baza_face_map(this);
        }
        /** Synchronize this clock with another. */
        sync(right) {
            // if( right instanceof $giper_baza_face_map ) this.stat = right.stat.clone()
            for (const [peer, face] of right) {
                this.peer_time(peer, face.time, face.tick);
                this.peer_summ(peer, face.summ);
            }
        }
        /** Update last time for peer. */
        peer_time(peer, time, tick) {
            if (this.stat.sync_time(time, tick)) {
                this._peer_last = peer;
            }
            let prev = this.get(peer);
            if (prev)
                prev.sync_time(time, tick);
            else
                this.set(peer, new $giper_baza_face(time, tick));
        }
        /** Update Summ for Peer. */
        peer_summ(peer, summ) {
            const prev = this.get(peer);
            this.stat.summ = (this.stat.summ ?? 0) + summ - (prev?.summ ?? 0);
            if (this.stat.summ < 0)
                $mol_fail(new Error('Negative summ'));
            if (prev)
                prev.summ = summ;
            else
                this.set(peer, new $giper_baza_face(0, 0, summ));
        }
        peer_summ_shift(peer, diff) {
            this.peer_summ(peer, (this.get(peer)?.summ ?? 0) + diff);
        }
        /** Generates new time for peer that greater then other seen. */
        tick(peer) {
            const now = $giper_baza_time_now();
            if (this.stat.time < now) {
                this.stat.time = now;
                this.stat.tick = 0;
            }
            else if (this._peer_last !== peer.str) {
                this.stat.time += 1;
                this.stat.tick = 0;
                this._peer_last = peer.str;
            }
            else {
                this.stat.tick = (this.stat.tick + 1) % 2 ** 16;
                if (!this.stat.tick)
                    ++this.stat.time;
            }
            return this.stat;
        }
        toJSON() {
            return Object.fromEntries(this.entries());
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$giper_baza_face_map ')
                + $mol_term_color.gray(this.stat.toJSON());
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.stat));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_face_map.prototype, "tick", null);
    $.$giper_baza_face_map = $giper_baza_face_map;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** reactive Dictionary */
    class $mol_wire_dict extends Map {
        pub = new $mol_wire_pub;
        // Accessors
        has(key) {
            this.pub.promote();
            return super.has(key);
        }
        get(key) {
            this.pub.promote();
            return super.get(key);
        }
        entries() {
            this.pub.promote();
            return super.entries();
        }
        keys() {
            this.pub.promote();
            return super.keys();
        }
        values() {
            this.pub.promote();
            return super.values();
        }
        forEach(task, self) {
            this.pub.promote();
            super.forEach(task, self);
        }
        [Symbol.iterator]() {
            this.pub.promote();
            return super[Symbol.iterator]();
        }
        get size() {
            this.pub.promote();
            return super.size;
        }
        // Mutators
        set(key, value) {
            if (super.get(key) === value)
                return this;
            super.set(key, value);
            this.pub?.emit(); // undefined in constructor
            return this;
        }
        delete(key) {
            const res = super.delete(key);
            if (res)
                this.pub.emit();
            return res;
        }
        clear() {
            if (!super.size)
                return;
            super.clear();
            this.pub.emit();
        }
        // Extensions
        item(key, next) {
            if (next === undefined)
                return this.get(key) ?? null;
            if (next === null)
                this.delete(key);
            else
                this.set(key, next);
            return next;
        }
    }
    $.$mol_wire_dict = $mol_wire_dict;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * 48-bit streamable array hash function
     * Based on cyrb53: https://stackoverflow.com/a/52171480
     */
    function $mol_hash_numbers(buff, seed = 0) {
        let h1 = 0xdeadbeef ^ seed;
        let h2 = 0x41c6ce57 ^ seed;
        for (let i = 0; i < buff.length; ++i) {
            const item = buff[i];
            h1 = Math.imul(h1 ^ item, 2654435761);
            h2 = Math.imul(h2 ^ item, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (((1 << 16) - 1) & h2) + (h1 >>> 0);
    }
    $.$mol_hash_numbers = $mol_hash_numbers;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Simple memory allocator.
     * Holds linked list of free blocks.
     * Prefers blocks from the beginning.
     * Near blocks are joined automatically.
     */
    class $mol_memory_pool extends Object {
        _free;
        constructor(size = Number.POSITIVE_INFINITY) {
            super();
            this._free = {
                from: -1,
                size: 0,
                next: {
                    from: 0,
                    size,
                    next: null,
                }
            };
        }
        /** Returns offset of first free block with required size. */
        acquire(size) {
            let prev = this._free;
            let next = prev.next;
            let max = 0;
            while (next.size < size) {
                if (next.size > max)
                    max = next.size;
                prev = next;
                next = next.next;
                if (!next)
                    $mol_fail(new Error(`No free space\nneed: ${size}\nhave: ${max}`));
            }
            const from = next.from;
            if (next.size === size) {
                prev.next = next.next;
            }
            else {
                next.from += size;
                next.size -= size;
            }
            return from;
        }
        /** Allows memory range to be acquired. */
        release(from, size) {
            let prev = this._free;
            let next = prev.next;
            while (next.from < from) {
                prev = next;
                next = next.next;
                if (!next)
                    $mol_fail(new Error('Release out of allocated', { cause: { last: prev, from, size } }));
            }
            if ((from + size > next.from) || (prev.from + prev.size > from)) {
                $mol_fail(new Error('Double release', { cause: { prev, next, from, size } }));
            }
            const begin = prev.from + prev.size === from;
            const end = from + size === next.from;
            if (begin) {
                if (end) {
                    prev.size += size + next.size;
                    prev.next = next.next;
                }
                else {
                    prev.size += size;
                }
            }
            else {
                if (end) {
                    next.from -= size;
                    next.size += size;
                }
                else {
                    prev.next = { from, size, next };
                }
            }
        }
        empty() {
            const first = this._free.next;
            return first.next === null && first.from === 0;
        }
        acquired() {
        }
    }
    $.$mol_memory_pool = $mol_memory_pool;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_pack_four_code = $mol_charset_encode('LAND'); // 76 65 78 68
    $.$giper_baza_pack_head_size = 4 /*BAZA*/ + 12 /*Lord*/ + 6 /*Area*/ + 2; /*Size*/
    /**
     * One Land info (Faces+Units) to Pack.
     * Sync: +Faces -Units
     * Diff: -Faces +Units
     * Stop: -Faces -Units
     */
    class $giper_baza_pack_part extends $mol_object {
        units;
        faces;
        constructor(units = [], faces = new $giper_baza_face_map) {
            super();
            this.units = units;
            this.faces = faces;
        }
        static from(units, faces = new $giper_baza_face_map) {
            return new this(units, faces);
        }
        *[Symbol.iterator]() {
            return {
                units: this.units,
                faces: this.faces,
            };
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_pack_part, "from", null);
    $.$giper_baza_pack_part = $giper_baza_pack_part;
    /** Universal binary package which contains some Faces/Units/Rocks */
    class $giper_baza_pack extends $mol_buffer {
        toBlob() {
            return new Blob([this], { type: 'application/vnd.giper_baza_pack.v1' });
        }
        parts(offsets, pool) {
            const parts = new Map;
            let part = null;
            const buf = this.asArray();
            for (let offset = 0; offset < this.byteLength;) {
                const kind = this.uint8(offset);
                switch ($giper_baza_slot_kind[kind]) {
                    case 'free': {
                        pool?.release(offset, 8);
                        offset += 8;
                        continue;
                    }
                    case 'land': {
                        const link = $giper_baza_link.from_bin(new Uint8Array(buf.buffer, buf.byteOffset + offset + 4, 18));
                        part = parts.get(link.str);
                        if (!part)
                            parts.set(link.str, part = new $giper_baza_pack_part);
                        const size = this.uint16(offset + 22);
                        offset += 24;
                        // Faces
                        for (let i = 0; i < size; ++i) {
                            const peer = $giper_baza_link.from_bin(new Uint8Array(buf.buffer, buf.byteOffset + offset, 6));
                            const tick = this.uint16(offset + 6);
                            const time = this.uint32(offset + 8);
                            const summ = this.uint32(offset + 12);
                            part.faces.peer_time(peer.str, time, tick);
                            part.faces.peer_summ(peer.str, summ);
                            offset += $giper_baza_face.length();
                        }
                        continue;
                    }
                    case 'pass': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const pass = $giper_baza_auth_pass.from(buf.slice(offset, offset + 64));
                        offsets?.set(pass.buffer, offset);
                        part.units.push(pass);
                        offset += pass.byteLength;
                        continue;
                    }
                    case 'seal': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const size = new $giper_baza_unit_seal(this.buffer, this.byteOffset + offset, this.byteLength - offset).size();
                        const length = $giper_baza_unit_seal.length(size);
                        const seal = $giper_baza_unit_seal.from(buf.slice(offset, offset + length));
                        offsets?.set(seal.buffer, offset);
                        part.units.push(seal);
                        offset += seal.byteLength;
                        continue;
                    }
                    case 'sand': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const size = new $giper_baza_unit_sand(this.buffer, this.byteOffset + offset, 40).size();
                        const length_sand = $giper_baza_unit_sand.length(size);
                        const length_ball = $giper_baza_unit_sand.length_ball(size);
                        const sand = $giper_baza_unit_sand.from(buf.slice(offset, offset + length_sand));
                        offsets?.set(sand.buffer, offset);
                        offset += sand.byteLength;
                        if (length_ball) {
                            sand._ball = buf.slice(offset, offset + size);
                            offset += length_ball;
                        }
                        ;
                        part.units.push(sand);
                        continue;
                    }
                    case 'gift': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const length = $giper_baza_unit_gift.length();
                        const gift = $giper_baza_unit_gift.from(buf.slice(offset, offset + length));
                        offsets?.set(gift.buffer, offset);
                        part.units.push(gift);
                        offset += gift.byteLength;
                        continue;
                    }
                    default: return $mol_fail(new Error('Unknown Kind', { cause: { kind, offset } }));
                }
            }
            return [...parts];
        }
        static length(parts) {
            let size = 0;
            for (const [land, { units, faces }] of parts) {
                size += $.$giper_baza_pack_head_size;
                size += faces.size * $giper_baza_face.length();
                for (const unit of units) {
                    size += unit.byteLength;
                    if (unit instanceof $giper_baza_auth_pass)
                        continue;
                    unit.choose({
                        gift: gift => { },
                        seal: seal => { },
                        sand: sand => size += $giper_baza_unit_sand.length_ball(sand.ball().byteLength),
                    });
                }
            }
            return size;
        }
        static make(parts) {
            let length = this.length(parts);
            if (length === 0)
                $mol_fail(new Error('Empty Pack'));
            const buff = new Uint8Array(length);
            const pack = new $giper_baza_pack(buff.buffer);
            let offset = 0;
            // fill Lands
            for (const [id, { units, faces }] of parts) {
                // Head
                buff.set($.$giper_baza_pack_four_code, offset); // 4B
                buff.set(new $giper_baza_link(id).toBin(), offset + 4); // Land = Lord + Area
                pack.uint16(offset + 22, faces.size); // Vers
                offset += 24;
                // Peer + Tick + Time + Summ for every Face
                for (const [peer, face] of faces) {
                    buff.set(new $giper_baza_link(peer).toBin(), offset);
                    pack.uint16(offset + 6, face.tick);
                    pack.uint32(offset + 8, face.time);
                    pack.uint32(offset + 12, face.summ);
                    offset += $giper_baza_face.length();
                }
                // Units + Balls
                for (const unit of units) {
                    buff.set(unit.asArray(), offset);
                    offset += unit.byteLength;
                    if (unit instanceof $giper_baza_auth_pass)
                        continue;
                    unit.choose({
                        gift: gift => { },
                        seal: seal => { },
                        sand: sand => {
                            if (!sand.big())
                                return;
                            buff.set(sand.ball(), offset);
                            offset += $giper_baza_unit_sand.length_ball(sand.size());
                        },
                    });
                }
            }
            return pack;
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_pack.prototype, "parts", null);
    __decorate([
        $mol_action
    ], $giper_baza_pack, "make", null);
    $.$giper_baza_pack = $giper_baza_pack;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Registry of Pawns as Deck entities. */
    class $giper_baza_fund extends $mol_object {
        item_make;
        constructor(item_make) {
            super();
            this.item_make = item_make;
        }
        Head(head) {
            return this.item_make(head);
        }
        Data() {
            return this.Head($giper_baza_land_root.data);
        }
        Tine() {
            return this.Head($giper_baza_land_root.tine);
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_fund.prototype, "Head", null);
    $.$giper_baza_fund = $giper_baza_fund;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
     *
     * Immutable iso8601 time interval representation.
     * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
     */
    class $mol_time_interval extends $mol_time_base {
        constructor(config) {
            super();
            if (typeof config === 'string') {
                var chunks = config.split('/');
                if (chunks[0]) {
                    if (chunks[0][0].toUpperCase() === 'P') {
                        this._duration = new $mol_time_duration(chunks[0]);
                    }
                    else {
                        this._start = new $mol_time_moment(chunks[0]);
                    }
                }
                else {
                    this._start = new $mol_time_moment();
                }
                if (chunks[1]) {
                    if (chunks[1][0].toUpperCase() === 'P') {
                        this._duration = new $mol_time_duration(chunks[1]);
                    }
                    else {
                        this._end = new $mol_time_moment(chunks[1]);
                    }
                }
                else {
                    this._end = new $mol_time_moment();
                }
                return;
            }
            if (config.start !== undefined)
                this._start = new $mol_time_moment(config.start);
            if (config.end !== undefined)
                this._end = new $mol_time_moment(config.end);
            if (config.duration !== undefined)
                this._duration = new $mol_time_duration(config.duration);
        }
        _start;
        get start() {
            if (this._start)
                return this._start;
            return this._start = this._end.shift(this._duration.mult(-1));
        }
        _end;
        get end() {
            if (this._end)
                return this._end;
            return this._end = this._start.shift(this._duration);
        }
        _duration;
        get duration() {
            if (this._duration)
                return this._duration;
            return this._duration = new $mol_time_duration(this._end.valueOf() - this._start.valueOf());
        }
        toJSON() { return this.toString(); }
        toString() {
            return (this._start || this._duration || '').toString() + '/' + (this._end || this._duration || '').toString();
        }
        [Symbol.toPrimitive](mode) {
            return this.toString();
        }
    }
    $.$mol_time_interval = $mol_time_interval;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_bigint_encode(num) {
        const minus = num < 0n ? 255 : 0;
        num = minus ? -num - 1n : num;
        const bytes = [];
        do {
            let byte = minus ^ Number(num & 255n);
            bytes.push(byte);
            if (num >>= 8n)
                continue;
            if ((minus & 128) !== (byte & 128))
                bytes.push(minus);
            break;
        } while (num);
        return new Uint8Array(bytes);
    }
    $.$mol_bigint_encode = $mol_bigint_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const ascii_set = [...`0123456789.,:;()'"- \n`].map(c => c.charCodeAt(0));
    const ascii_map = new Array(0x80).fill(0);
    for (let i = 0; i < ascii_set.length; ++i)
        ascii_map[ascii_set[i]] = i | 0x80;
    const diacr_set = [
        0x00, 0x01, 0x0F, 0x0B, 0x07, 0x08, 0x12, 0x13, // up
        0x02, 0x0C, 0x06, 0x11, 0x03, 0x09, 0x0A, 0x04, // up
        0x28, 0x31, 0x27, 0x26, 0x23, // down
    ];
    const diacr_map = new Array(0x80).fill(0);
    for (let i = 0; i < diacr_set.length; ++i)
        diacr_map[diacr_set[i]] = i | 0x80;
    const wide_offset = 0x0E_00;
    const wide_limit = 128 * 128 * 8 + wide_offset;
    const tiny_limit = 128 * 98;
    const full_mode = 0x95;
    const wide_mode = 0x96;
    const tiny_mode = 0x9E;
    /** Encode text to Unicode Compact Format. */
    function $mol_charset_ucf_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_ucf_encode_to(str, buf));
    }
    $.$mol_charset_ucf_encode = $mol_charset_ucf_encode;
    function $mol_charset_ucf_encode_to(str, buf, from = 0) {
        let pos = from;
        let mode = tiny_mode;
        const write_high = (code) => {
            buf[pos++] = ((code + 128 - mode) & 0x7F) | 0x80;
        };
        const write_remap = (code) => {
            const fast = ascii_map[code];
            if (fast)
                write_high(fast);
            else
                buf[pos++] = code;
        };
        const write_mode = (m) => {
            write_high(m);
            mode = m;
        };
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 0xD8_00 && code < 0xDC_00)
                code = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
            if (code < 0x80) { // ASCII
                if (mode !== tiny_mode) {
                    const fast = ascii_map[code];
                    if (!fast)
                        write_mode(tiny_mode);
                }
                buf[pos++] = code;
            }
            else if (code < tiny_limit) { // Tiny
                const page = (code >> 7) + tiny_mode;
                code &= 0x7F;
                if (page === 164) { // diacritics
                    const fast = diacr_map[code];
                    if (fast) {
                        if (mode !== tiny_mode)
                            write_mode(tiny_mode);
                        write_high(fast);
                        continue;
                    }
                }
                if (mode !== page)
                    write_mode(page);
                write_remap(code);
            }
            else if (code < wide_limit) { // Wide
                code -= wide_offset;
                const page = (code >> 14) + wide_mode;
                if (mode !== page)
                    write_mode(page);
                write_remap(code & 0x7F);
                write_remap((code >> 7) & 0x7F);
            }
            else { // Full
                if (mode !== full_mode)
                    write_mode(full_mode);
                write_remap(code & 0x7F);
                write_remap((code >> 7) & 0x7F);
                write_remap(code >> 14);
            }
        }
        if (mode !== tiny_mode)
            write_mode(tiny_mode);
        return pos - from;
    }
    $.$mol_charset_ucf_encode_to = $mol_charset_ucf_encode_to;
    /** Decode text from Unicode Compact Format. */
    function $mol_charset_ucf_decode(buffer, mode = tiny_mode) {
        let text = '';
        let pos = 0;
        let page_offset = 0;
        const read_code = () => {
            let code = buffer[pos++];
            if (code >= 0x80)
                code = ((mode + code) & 0x7F) | 0x80;
            return code;
        };
        const read_remap = () => {
            let code = read_code();
            if (code >= 0x80)
                code = ascii_set[code - 0x80];
            if (code === undefined)
                $mol_fail(new Error('Wrong byte', { cause: { text, pos: pos - 1 } }));
            return code;
        };
        while (pos < buffer.length) {
            let code = read_code();
            if (code < full_mode) { // Char Code
                if (mode === tiny_mode) {
                    if (code >= 0x80) {
                        code = diacr_set[code - 0x080] | (6 << 7);
                    }
                }
                else if (!ascii_map[code]) {
                    if (code >= 0x80)
                        code = ascii_set[code - 0x80];
                    if (mode < tiny_mode) {
                        if (pos === buffer.length)
                            $mol_fail(new Error('Expected 2 bytes', { cause: { text, pos: pos - 1 } }));
                        code |= read_remap() << 7;
                    }
                    if (mode === full_mode) {
                        if (pos === buffer.length)
                            $mol_fail(new Error('Expected 3 bytes', { cause: { text, pos: pos - 2 } }));
                        code |= read_remap() << 14;
                    }
                    code += page_offset;
                }
                text += String.fromCodePoint(code);
            }
            else if (code >= tiny_mode) { // Tiny Set
                mode = code;
                page_offset = (mode - tiny_mode) << 7;
            }
            else if (code === full_mode) { // Full Set
                mode = code;
                page_offset = 0;
            }
            else { // Wide Set
                mode = code;
                page_offset = ((mode - wide_mode) << 14) + wide_offset;
            }
        }
        if (mode !== tiny_mode) {
            return $mol_fail(new Error('Wrong ending', { cause: { text, mode } }));
        }
        return text;
    }
    $.$mol_charset_ucf_decode = $mol_charset_ucf_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_bigint_decode(buf) {
        if (buf.length === 8)
            return new BigInt64Array(buf.buffer, buf.byteOffset, 1)[0];
        if (buf.length === 4)
            return BigInt(new Int32Array(buf.buffer, buf.byteOffset, 1)[0]);
        if (buf.length === 2)
            return BigInt(new Int16Array(buf.buffer, buf.byteOffset, 1)[0]);
        if (buf.length === 1)
            return BigInt(new Int8Array(buf.buffer, buf.byteOffset, 1)[0]);
        const minus = (buf.at(-1) & 128) ? 255 : 0;
        let result = 0n;
        let offset = 0n;
        for (let i = 0; i < buf.length; i++, offset += 8n) {
            result |= BigInt(buf[i] ^ minus) << offset;
        }
        if (minus)
            result = (result + 1n) * -1n;
        return result;
    }
    $.$mol_bigint_decode = $mol_bigint_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_vary_tip;
    (function ($mol_vary_tip) {
        $mol_vary_tip[$mol_vary_tip["uint"] = 0] = "uint";
        $mol_vary_tip[$mol_vary_tip["link"] = 32] = "link";
        $mol_vary_tip[$mol_vary_tip["spec"] = 64] = "spec";
        $mol_vary_tip[$mol_vary_tip["list"] = 96] = "list";
        $mol_vary_tip[$mol_vary_tip["blob"] = 128] = "blob";
        $mol_vary_tip[$mol_vary_tip["text"] = 160] = "text";
        $mol_vary_tip[$mol_vary_tip["tupl"] = 192] = "tupl";
        $mol_vary_tip[$mol_vary_tip["sint"] = 224] = "sint";
    })($mol_vary_tip = $.$mol_vary_tip || ($.$mol_vary_tip = {}));
    let $mol_vary_len;
    (function ($mol_vary_len) {
        $mol_vary_len[$mol_vary_len["L1"] = 28] = "L1";
        $mol_vary_len[$mol_vary_len["L2"] = 29] = "L2";
        $mol_vary_len[$mol_vary_len["L4"] = 30] = "L4";
        $mol_vary_len[$mol_vary_len["L8"] = 31] = "L8";
        $mol_vary_len[$mol_vary_len["LA"] = 32] = "LA";
    })($mol_vary_len = $.$mol_vary_len || ($.$mol_vary_len = {}));
    let $mol_vary_spec;
    (function ($mol_vary_spec) {
        $mol_vary_spec[$mol_vary_spec["none"] = 'N'.charCodeAt(0)] = "none";
        $mol_vary_spec[$mol_vary_spec["true"] = 'T'.charCodeAt(0)] = "true";
        $mol_vary_spec[$mol_vary_spec["fake"] = 'F'.charCodeAt(0)] = "fake";
        $mol_vary_spec[$mol_vary_spec["both"] = 'B'.charCodeAt(0)] = "both";
        $mol_vary_spec[$mol_vary_spec["fp16"] = 'H'.charCodeAt(0)] = "fp16";
        $mol_vary_spec[$mol_vary_spec["fp32"] = 'S'.charCodeAt(0)] = "fp32";
        $mol_vary_spec[$mol_vary_spec["fp64"] = 'D'.charCodeAt(0)] = "fp64";
        $mol_vary_spec[$mol_vary_spec["f128"] = 'Q'.charCodeAt(0)] = "f128";
        $mol_vary_spec[$mol_vary_spec["f256"] = 'O'.charCodeAt(0)] = "f256";
    })($mol_vary_spec = $.$mol_vary_spec || ($.$mol_vary_spec = {}));
    const pojo_maker = (keys) => (vals) => {
        const obj = {};
        for (let i = 0; i < keys.length; ++i)
            obj[keys[i]] = vals[i];
        return obj;
    };
    /** VaryPack - simple fast compact data binarization format. */
    class $mol_vary_class extends Object {
        lean_symbol = Symbol('$mol_vary_lean');
        array = new Uint8Array(256);
        buffer = new DataView(this.array.buffer);
        /** Packs any data to Uint8Array with deduplication. */
        pack(data) {
            let pos = 0;
            let capacity = 0;
            const offsets = new Map();
            const stack = [];
            const acquire = (size) => {
                if (size < 0)
                    return;
                capacity += size;
                if (this.array.byteLength >= capacity)
                    return;
                const buffer2 = new Uint8Array(Math.ceil(capacity / 4096) * 4096);
                buffer2.set(this.array);
                this.array = buffer2;
                this.buffer = new DataView(this.array.buffer);
            };
            const release = (size) => {
                capacity -= size;
            };
            const calc_size = (val) => {
                if (val < $mol_vary_len.L1)
                    return 1;
                if (val < 2 ** 8)
                    return 2;
                if (val < 2 ** 16)
                    return 3;
                if (val < 2 ** 32)
                    return 5;
                if (val < 2n ** 64n)
                    return 9;
                return $mol_fail(new Error('Too large number'));
            };
            const dump_unum = (tip, val, max = val) => {
                if (max < $mol_vary_len.L1) {
                    this.array[pos++] = tip | Number(val);
                    release(8);
                    return;
                }
                if (tip == $mol_vary_tip.uint) {
                    const offset = offsets.get(val);
                    if (offset !== undefined)
                        return dump_unum($mol_vary_tip.link, offset);
                }
                if (max < 2 ** 8) {
                    this.array[pos++] = tip | $mol_vary_len.L1;
                    this.array[pos++] = Number(val);
                    release(7);
                }
                else if (max < 2 ** 16) {
                    this.array[pos++] = tip | $mol_vary_len.L2;
                    this.buffer.setUint16(pos, Number(val), true);
                    pos += 2;
                    release(6);
                }
                else if (max < 2 ** 32) {
                    this.array[pos++] = tip | $mol_vary_len.L4;
                    this.buffer.setUint32(pos, Number(val), true);
                    pos += 4;
                    release(4);
                }
                else if (max < 2n ** 64n) {
                    this.array[pos++] = tip | $mol_vary_len.L8;
                    this.buffer.setBigUint64(pos, BigInt(val), true);
                    pos += 8;
                }
                else {
                    dump_bint(val);
                }
                if (tip == $mol_vary_tip.uint)
                    offsets.set(val, offsets.size);
            };
            const dump_snum = (val) => {
                if (val > -$mol_vary_len.L1) {
                    this.array[pos++] = Number(val);
                    release(8);
                    return;
                }
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                if (val >= -(2 ** 7)) {
                    this.array[pos++] = -$mol_vary_len.L1;
                    this.array[pos++] = Number(val);
                    release(7);
                }
                else if (val >= -(2 ** 15)) {
                    this.array[pos++] = -$mol_vary_len.L2;
                    this.buffer.setInt16(pos, Number(val), true);
                    pos += 2;
                    release(6);
                }
                else if (val >= -(2 ** 31)) {
                    this.array[pos++] = -$mol_vary_len.L4;
                    this.buffer.setInt32(pos, Number(val), true);
                    pos += 4;
                    release(4);
                }
                else if (val >= -(2n ** 63n)) {
                    this.array[pos++] = -$mol_vary_len.L8;
                    this.buffer.setBigInt64(pos, BigInt(val), true);
                    pos += 8;
                }
                else {
                    dump_bint(val);
                }
                offsets.set(val, offsets.size);
            };
            const dump_bint = (val) => {
                const buf = $mol_bigint_encode(val);
                if (buf.byteLength > (2 ** 16 + 8))
                    $mol_fail(new Error('Number too high', { cause: { val } }));
                acquire(buf.byteLength - 6);
                this.array[pos++] = -$mol_vary_len.LA;
                this.buffer.setUint16(pos, buf.byteLength - 9, true);
                pos += 2;
                this.array.set(buf, pos);
                pos += buf.byteLength;
            };
            const dump_float = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                this.array[pos++] = $mol_vary_spec.fp64;
                this.buffer.setFloat64(pos, val, true);
                pos += 8;
                offsets.set(val, offsets.size);
            };
            const dump_string = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                const len_max = val.length * 3 + 2;
                const len_size = calc_size(len_max);
                acquire(len_max);
                const len = $mol_charset_ucf_encode_to(val, this.array, pos + len_size);
                dump_unum($mol_vary_tip.text, len, len_max);
                pos += len;
                release(len_max - len);
                offsets.set(val, offsets.size);
                return;
            };
            const dump_buffer = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                dump_unum($mol_vary_tip.blob, val.byteLength);
                acquire(1 + val.byteLength);
                if (val instanceof Uint8Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L1;
                else if (val instanceof Uint16Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L2;
                else if (val instanceof Uint32Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L4;
                else if (val instanceof BigUint64Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L8;
                else if (val instanceof Int8Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L1;
                else if (val instanceof Int16Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L2;
                else if (val instanceof Int32Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L4;
                else if (val instanceof BigInt64Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L8;
                else if (typeof Float16Array === 'function' && val instanceof Float16Array)
                    this.array[pos++] = $mol_vary_spec.fp16;
                else if (val instanceof Float32Array)
                    this.array[pos++] = $mol_vary_spec.fp32;
                else if (val instanceof Float64Array)
                    this.array[pos++] = $mol_vary_spec.fp64;
                else
                    $mol_fail(new Error(`Unsupported type`));
                const src = (val instanceof Uint8Array) ? val : new Uint8Array(val.buffer, val.byteOffset, val.byteLength);
                this.array.set(src, pos);
                pos += val.byteLength;
                offsets.set(val, offsets.size);
            };
            const dump_list = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                dump_unum($mol_vary_tip.list, val.length);
                acquire(val.length * 9);
                if (stack.includes(val))
                    $mol_fail(new Error('Cyclic refs', { cause: { stack, val } }));
                stack.push(val);
                for (let i = 0; i < val.length; ++i)
                    dump(val[i]);
                if (stack.at(-1) !== val)
                    $mol_fail(new Error('Broken stack', { cause: { stack, val } }));
                stack.pop();
                offsets.set(val, offsets.size);
            };
            const shapes = new Map();
            const shape = (val) => {
                const keys1 = Object.keys(val);
                const key = keys1.join('\0');
                const keys2 = shapes.get(key);
                if (keys2)
                    return keys2;
                shapes.set(key, keys1);
                return keys1;
            };
            const dump_object = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                const { 0: keys, 1: vals } = this.lean_find(val)?.(val) ?? [shape(val), Object.values(val)];
                dump_unum($mol_vary_tip.tupl, vals.length);
                acquire((vals.length + 1) * 9);
                dump_list(keys);
                if (stack.includes(val))
                    $mol_fail(new Error('Cyclic refs', { cause: { stack, val } }));
                stack.push(val);
                for (let i = 0; i < vals.length; ++i)
                    dump(vals[i]);
                if (stack.at(-1) !== val)
                    $mol_fail(new Error('Broken stack', { cause: { stack, val } }));
                stack.pop();
                offsets.set(val, offsets.size);
            };
            const dumpers = {
                undefined: () => {
                    this.array[pos++] = $mol_vary_spec.both;
                    capacity -= 8;
                },
                boolean: val => {
                    this.array[pos++] = val ? $mol_vary_spec.true : $mol_vary_spec.fake;
                    capacity -= 8;
                },
                number: val => {
                    if (!Number.isInteger(val))
                        dump_float(val);
                    else
                        dumpers.bigint(val);
                },
                bigint: val => {
                    if (val < 0) {
                        dump_snum(val);
                    }
                    else {
                        dump_unum($mol_vary_tip.uint, val);
                    }
                },
                string: val => dump_string(val),
                object: val => {
                    if (!val) {
                        capacity -= 8;
                        return this.array[pos++] = $mol_vary_spec.none;
                    }
                    if (Array.isArray(val))
                        return dump_list(val);
                    if (ArrayBuffer.isView(val))
                        return dump_buffer(val);
                    return dump_object(val);
                }
            };
            /** Recursive fills buffer with data. */
            const dump = (val) => {
                const dumper = dumpers[typeof val];
                if (!dumper)
                    $mol_fail(new Error(`Unsupported type`));
                dumper(val);
            };
            for (let i = 0; i < data.length; ++i) {
                capacity += 9;
                dump(data[i]);
                if (stack.length)
                    $mol_fail(new Error('Stack underflow', { cause: { stack, item: data[i] } }));
                offsets.clear();
            }
            if (pos !== capacity)
                $mol_fail(new Error('Wrong reserved capacity', { cause: { capacity, size: pos, data } }));
            return this.array.slice(0, pos);
        }
        /** Parses buffer to rich runtime structures. */
        take(array) {
            const buffer = new DataView(array.buffer, array.byteOffset, array.byteLength);
            const stream = [];
            let pos = 0;
            const read_unum = (kind) => {
                ++pos;
                const num = kind & 0b11111;
                if (num < $mol_vary_len.L1)
                    return num;
                let res = 0;
                if (num === $mol_vary_len.L1) {
                    res = buffer.getUint8(pos++);
                }
                else if (num === $mol_vary_len.L2) {
                    res = buffer.getUint16(pos, true);
                    pos += 2;
                }
                else if (num === $mol_vary_len.L4) {
                    res = buffer.getUint32(pos, true);
                    pos += 4;
                }
                else if (num === $mol_vary_len.L8) {
                    res = buffer.getBigUint64(pos, true);
                    if (res <= Number.MAX_SAFE_INTEGER)
                        res = Number(res);
                    pos += 8;
                }
                else {
                    $mol_fail(new Error('Unsupported unum', { cause: { num } }));
                }
                if ((kind & 0b111_00000) === $mol_vary_tip.uint)
                    stream.push(res);
                return res;
            };
            const read_snum = (kind) => {
                const num = buffer.getInt8(pos++);
                if (num > -$mol_vary_len.L1)
                    return num;
                let res = 0;
                if (num === -$mol_vary_len.L1) {
                    res = buffer.getInt8(pos++);
                }
                else if (num === -$mol_vary_len.L2) {
                    res = buffer.getInt16(pos, true);
                    pos += 2;
                }
                else if (num === -$mol_vary_len.L4) {
                    res = buffer.getInt32(pos, true);
                    pos += 4;
                }
                else if (num === -$mol_vary_len.L8) {
                    res = buffer.getBigInt64(pos, true);
                    if (res >= Number.MIN_SAFE_INTEGER && res <= Number.MAX_SAFE_INTEGER)
                        res = Number(res);
                    pos += 8;
                }
                else if (num === -$mol_vary_len.LA) {
                    const len = buffer.getUint16(pos, true) + 9;
                    pos += 2;
                    res = $mol_bigint_decode(new Uint8Array(buffer.buffer, buffer.byteOffset + pos, len));
                    pos += len;
                }
                else {
                    $mol_fail(new Error('Unsupported snum', { cause: { num } }));
                }
                stream.push(res);
                return res;
            };
            const read_text = (kind) => {
                const len = read_unum(kind);
                const text = $mol_charset_ucf_decode(new Uint8Array(array.buffer, array.byteOffset + pos, len));
                pos += len;
                stream.push(text);
                return text;
            };
            const read_buffer = (len, TypedArray) => {
                const bin = new TypedArray(array.slice(pos, pos + len).buffer);
                pos += len;
                stream.push(bin);
                return bin;
            };
            const read_blob = (kind) => {
                const len = read_unum(kind);
                const kind_item = buffer.getUint8(pos++);
                switch (kind_item) {
                    case $mol_vary_len.L1: return read_buffer(len, Uint8Array);
                    case $mol_vary_len.L2: return read_buffer(len, Uint16Array);
                    case $mol_vary_len.L4: return read_buffer(len, Uint32Array);
                    case $mol_vary_len.L8: return read_buffer(len, BigUint64Array);
                    case ~$mol_vary_len.L1 + 256: return read_buffer(len, Int8Array);
                    case ~$mol_vary_len.L2 + 256: return read_buffer(len, Int16Array);
                    case ~$mol_vary_len.L4 + 256: return read_buffer(len, Int32Array);
                    case ~$mol_vary_len.L8 + 256: return read_buffer(len, BigInt64Array);
                    case $mol_vary_tip.spec | $mol_vary_spec.fp16: return read_buffer(len, Float16Array);
                    case $mol_vary_tip.spec | $mol_vary_spec.fp32: return read_buffer(len, Float32Array);
                    case $mol_vary_tip.spec | $mol_vary_spec.fp64: return read_buffer(len, Float64Array);
                    default:
                        $mol_fail(new Error('Unsupported blob item kind', { cause: { kind_item } }));
                }
            };
            const read_list = (kind) => {
                const len = read_unum(kind);
                const list = new Array(len);
                for (let i = 0; i < len; ++i)
                    list[i] = read_vary();
                stream.push(list);
                return list;
            };
            const read_link = (kind) => {
                const index = read_unum(kind);
                if (index >= stream.length)
                    $mol_fail(new Error('Too large index', { cause: { index, exists: stream.length } }));
                return stream[index];
            };
            const read_tupl = (kind) => {
                const len = read_unum(kind);
                const keys = read_vary();
                const vals = new Array(len);
                for (let i = 0; i < len; ++i)
                    vals[i] = read_vary();
                const obj = this.rich(keys, vals);
                stream.push(obj);
                return obj;
            };
            const read_spec = (kind) => {
                switch (kind) {
                    case $mol_vary_spec.none:
                        ++pos;
                        return null;
                    case $mol_vary_spec.fake:
                        ++pos;
                        return false;
                    case $mol_vary_spec.true:
                        ++pos;
                        return true;
                    case $mol_vary_spec.both:
                        ++pos;
                        return undefined;
                    case $mol_vary_spec.fp64: {
                        const val = buffer.getFloat64(++pos, true);
                        stream.push(val);
                        pos += 8;
                        return val;
                    }
                    case $mol_vary_spec.fp32: {
                        const val = buffer.getFloat32(++pos, true);
                        stream.push(val);
                        pos += 4;
                        return val;
                    }
                    case $mol_vary_spec.fp16: {
                        const val = buffer.getFloat16(++pos, true);
                        stream.push(val);
                        pos += 2;
                        return val;
                    }
                    default:
                        $mol_fail(new Error('Unsupported spec', { cause: { kind } }));
                }
            };
            const read_vary = () => {
                const kind = buffer.getUint8(pos);
                const tip = kind & 0b111_00000;
                switch (tip) {
                    case $mol_vary_tip.uint: return read_unum(kind);
                    case $mol_vary_tip.sint: return read_snum(kind);
                    case $mol_vary_tip.link: return read_link(kind);
                    case $mol_vary_tip.text: return read_text(kind);
                    case $mol_vary_tip.list: return read_list(kind);
                    case $mol_vary_tip.blob: return read_blob(kind);
                    case $mol_vary_tip.tupl: return read_tupl(kind);
                    case $mol_vary_tip.spec: return read_spec(kind);
                    default: $mol_fail(new Error('Unsupported tip', { cause: { tip } }));
                }
            };
            const result = [];
            while (pos < array.byteLength) {
                result.push(read_vary());
                stream.length = 0;
            }
            return result;
        }
        rich_index = new Map([
            [null, () => ({})]
        ]);
        /** Isolated Vary for custom types */
        zone() {
            const room = new $mol_vary_class;
            Object.setPrototypeOf(room, this);
            const index_clone = (map) => new Map([...map].map(([k, v]) => [k, k === null ? v : index_clone(v)]));
            room.rich_index = index_clone(this.rich_index);
            return room;
        }
        rich(keys, vals) {
            const node = this.rich_node(keys);
            let rich = node.get(null);
            if (!rich)
                node.set(null, rich = pojo_maker(keys));
            return rich(vals);
        }
        rich_node(keys) {
            let node = this.rich_index;
            for (let i = 0; i < keys.length; ++i) {
                let sub = node.get(keys[i]);
                if (sub)
                    node = sub;
                else
                    node.set(keys[i], node = new Map);
            }
            return node;
        }
        lean(obj) {
            return this.lean_find(obj)?.(obj) ?? [Object.keys(obj), Object.values(obj)];
        }
        lean_find(val) {
            const lean = val[this.lean_symbol];
            if (lean)
                return lean;
            const sup = Object.getPrototypeOf(this);
            if (sup === Object.prototype)
                return;
            return sup.lean_find(val);
        }
        /** Adds custom types support. */
        type({ type, keys, rich, lean }) {
            this.rich_node(keys).set(null, rich);
            type.prototype[this.lean_symbol] = (val) => [keys, lean(val)];
        }
    }
    $.$mol_vary_class = $mol_vary_class;
    $.$mol_vary = new $mol_vary_class;
    /** Native Map support */
    $.$mol_vary.type({
        type: Map,
        keys: ['keys', 'vals'],
        lean: obj => [[...obj.keys()], [...obj.values()]],
        rich: ([keys, vals]) => new Map((keys ?? []).map((k, i) => [k, vals?.[i]])),
    });
    /** Native Set support */
    $.$mol_vary.type({
        type: Set,
        keys: ['set'],
        lean: obj => [[...obj.values()]],
        rich: ([vals]) => new Set(vals),
    });
    /** Native Date support */
    $.$mol_vary.type({
        type: Date,
        keys: ['unix_time'],
        lean: obj => [obj.valueOf() / 1000],
        rich: ([ts]) => new Date(ts * 1000),
    });
    if ('Element' in $mol_dom) { // Absent in workers
        /** Native Element support */
        $.$mol_vary.type({
            type: $mol_dom.Element,
            keys: ['XML'],
            lean: node => [$mol_dom_serialize(node)],
            rich: ([text]) => $mol_dom_parse(text, 'application/xml').documentElement,
        });
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // export let $giper_baza_vary_schema = $mol_schema_some([
    // 	$mol_schema_boolean, $mol_schema_float, $mol_schema_bigint, $mol_schema_string,
    // 	Uint8Array, Uint16Array, Uint32Array, BigUint64Array,
    // 	Int8Array, Int16Array, Int32Array, BigInt64Array,
    // 	Float64Array, Float32Array, Float64Array,
    // 	$mol_time_moment, $mol_time_duration, $mol_time_interval,
    // 	$mol_tree2, $giper_baza_link, Element,
    // 	$mol_schema_list( ()=> $giper_baza_vary_schema ),
    // 	$mol_schema_dict([ ()=> $giper_baza_vary_schema, ()=> $giper_baza_vary_schema ]),
    // ].map( klass => $mol_schema_instance( klass ) )
    $.$giper_baza_vary = $mol_vary.zone();
    $.$giper_baza_vary.type({
        type: $giper_baza_link,
        keys: ['link'],
        lean: obj => [obj.toBin()],
        rich: ([bin]) => $giper_baza_link.from_bin(bin),
    });
    $.$giper_baza_vary.type({
        type: $mol_time_duration,
        keys: ['dura'],
        lean: obj => obj.toArray(),
        rich: data => new $mol_time_duration(data),
    });
    $.$giper_baza_vary.type({
        type: $mol_time_moment,
        keys: ['time'],
        lean: obj => obj.toArray(),
        rich: data => new $mol_time_moment(data),
    });
    $.$giper_baza_vary.type({
        type: $mol_time_interval,
        keys: ['span'],
        lean: obj => [obj.toString()],
        rich: ([str]) => new $mol_time_interval(str),
    });
    $.$giper_baza_vary.type({
        type: $mol_tree2,
        keys: ['tree'],
        lean: obj => [$$.$mol_tree2_to_string(obj)],
        rich: ([str]) => $$.$mol_tree2_from_string(str),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_bus extends $mol_object {
        name;
        handle;
        channel = null;
        constructor(name, handle) {
            super();
            this.name = name;
            this.handle = handle;
            try {
                this.channel = new BroadcastChannel(name);
                this.channel.onmessage = (event) => this.handle(event.data);
            }
            catch (error) {
                console.warn(error);
            }
        }
        destructor() {
            this.channel?.close();
        }
        send(data) {
            this.channel?.postMessage(data);
        }
    }
    $.$mol_bus = $mol_bus;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_log() {
        return this.$mol_state_arg.value('giper_baza_log') !== null;
    }
    $.$giper_baza_log = $giper_baza_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function batch(host, items, task) {
        items.call(host); // track deps
        const skip = new Set();
        while (true) {
            const snap = $mol_wire_sync(items).call(host);
            const news = snap.filter(item => !skip.has(item));
            if (!news.length)
                break;
            $mol_wire_sync(task).call(host, news);
            for (const item of news)
                skip.add(item);
        }
    }
    $.$giper_baza_land_root = {
        data: new $giper_baza_link(''), // 0
        tine: new $giper_baza_link('AQAAAAAA'), // 1
    };
    /** Standalone part of Glob which syncs separately, have own rights, and contains Units */
    class $giper_baza_land extends $mol_object {
        /** Auth Independent actor with global unique id generated from Auth key */
        link() {
            return this.auth().pass().lord();
        }
        /** Auth Private key generated with Proof of Work  */
        auth() {
            return this.$.$giper_baza_auth.current();
        }
        faces = new $giper_baza_face_map;
        tick() {
            return this.faces.tick(this.auth().pass().peer());
        }
        _pass = new $mol_wire_dict();
        _seal_item = new Map();
        _seal_shot = new Map();
        _gift = new $mol_wire_dict();
        _sand = new $mol_wire_dict();
        _unit_hash = new Map();
        pass_add(pass) {
            if (this._pass.has(pass.lord().str))
                return;
            this._pass.set(pass.lord().str, pass);
        }
        seal_add(seal) {
            const prev = this._seal_shot.get(seal.shot().str);
            if (prev)
                return;
            for (const hash of seal.hash_list()) {
                const prev = this.seal_item_get(seal.lord(), hash);
                if ($giper_baza_unit_seal.compare(prev, seal) <= 0)
                    continue;
                if (prev?.alive_items.has(hash.str)) {
                    prev.alive_items.delete(hash.str);
                    if (!prev.alive_items.size)
                        this.seal_del(prev);
                    seal.alive_items.add(hash.str);
                }
                this.seal_item_set(seal, hash);
            }
            this._seal_shot.set(seal.shot().str, seal);
        }
        gift_add(gift) {
            const mate = gift.mate();
            const prev = this._gift.get(mate.str);
            if ($giper_baza_unit_gift.compare(prev, gift) <= 0)
                return;
            const peer = gift.lord().peer();
            if (prev)
                this.gift_del(prev);
            this.faces.peer_summ_shift(peer.str, +1);
            this._gift.set(mate.str, gift);
            this.faces.peer_time(peer.str, gift.time(), gift.tick());
            this.unit_seal_inc(gift);
            if ((prev?.rank() ?? $giper_baza_rank_deny) > gift.rank())
                this.rank_audit();
        }
        sand_add(sand) {
            let peers = this._sand.get(sand.head().str);
            if (!peers)
                this._sand.set(sand.head().str, peers = new $mol_wire_dict);
            let sands = peers.get(sand.lord().str);
            if (!sands)
                peers.set(sand.lord().str, sands = new $mol_wire_dict);
            const prev = sands.get(sand.self().str);
            if ($giper_baza_unit_sand.compare(prev, sand) <= 0)
                return;
            const peer = sand.lord().peer();
            if (prev)
                this.sand_del(prev);
            this.faces.peer_summ_shift(peer.str, +1);
            sands.set(sand.self().str, sand);
            this._self_all.set(sand.self().str, !sand.dead());
            this.faces.peer_time(peer.str, sand.time(), sand.tick());
            this.unit_seal_inc(sand);
        }
        units_reaping = new Set();
        unit_reap(unit) {
            if (!this.mine().units_persisted.has(unit))
                return;
            this.units_reaping.add(unit);
        }
        unit_seal_inc(unit) {
            unit._alive = true;
            if (!unit.encoded())
                return;
            this._unit_hash.set(unit.hash().str, unit);
            const seal = this.unit_seal(unit);
            if (!seal)
                return;
            seal.alive_items.add(unit.hash().str);
        }
        unit_seal_dec(unit) {
            unit._alive = false;
            if (!unit.encoded())
                return;
            this._unit_hash.delete(unit.hash().str);
            const seal = this.unit_seal(unit);
            if (!seal)
                return;
            seal.alive_items.delete(unit.hash().str);
            if (!seal.alive_items.size)
                this.seal_del(seal);
        }
        seal_del(seal) {
            const shot = seal.shot();
            if (!this._seal_shot.has(shot.str))
                return;
            this._seal_shot.delete(shot.str);
            for (const hash of seal.hash_list()) {
                if (this.seal_item_get(seal.lord(), hash) === seal) {
                    this.seal_item_del(seal.lord(), hash);
                }
            }
            this.unit_reap(seal);
        }
        gift_del(gift) {
            const prev = this._gift.get(gift.mate().str);
            if (prev !== gift)
                return;
            this._gift.delete(gift.mate().str);
            this.faces.peer_summ_shift(gift.lord().peer().str, -1);
            this.unit_reap(gift);
            this.unit_seal_dec(gift);
        }
        sand_del(sand) {
            const peers = this._sand.get(sand.head().str);
            if (!peers)
                return;
            const sands = peers.get(sand.lord().str);
            if (!sands)
                return;
            const prev = sands.get(sand.self().str);
            if (prev !== sand)
                return;
            sands.delete(sand.self().str);
            this.faces.peer_summ_shift(sand.lord().peer().str, -1);
            this.unit_reap(sand);
            this.unit_seal_dec(sand);
        }
        lord_pass(lord) {
            return this._pass.get(lord.str) ?? null;
        }
        unit_seal(unit) {
            if (!unit.encoded())
                return null;
            return this.seal_item_get(unit.lord(), unit.hash()) ?? null;
        }
        seal_item_get(lord, hash) {
            return this._seal_item.get(lord.str)?.get(hash.str);
        }
        seal_item_del(lord, hash) {
            this._seal_item.get(lord.str)?.delete(hash.str);
        }
        seal_item_set(seal, hash) {
            let seals = this._seal_item.get(seal.lord().str);
            if (!seals)
                this._seal_item.set(seal.lord().str, seals = new Map);
            seals.set(hash.str, seal);
        }
        sand_get(head, lord, self) {
            return this._sand.get(head.str)?.get(lord.str)?.get(self.str) ?? null;
        }
        _self_all = new Map();
        /** Generates unique local id base on optional idea number or random. */
        self_make(idea = Math.floor(Math.random() * 2 ** 48)) {
            const auth = this.auth();
            const rank = this.pass_rank(auth.pass());
            if (rank < $giper_baza_rank_tier.post)
                $mol_fail(new Error(`Rank too low (${rank})`));
            for (let i = 0; i < 4096; ++i) {
                idea = $mol_hash_numbers([idea]);
                if (!idea)
                    continue;
                const idea_link = $giper_baza_link.from_int(idea);
                if (/[æÆ]/.test(idea_link.str))
                    continue;
                if (this._self_all.has(idea_link.str))
                    continue;
                this._self_all.set(idea_link.str, false);
                return idea_link;
            }
            $mol_fail(new Error(`Too long self generation`));
        }
        /** Makes new Area based on Idea or random. Once transfers rights from this Land. */
        area_make(idea = Math.floor($mol_wire_sync(Math).random() * 2 ** 48)) {
            // this.saving()
            let id = '';
            while (true) {
                idea = $mol_hash_numbers([idea]);
                if (!idea)
                    continue;
                id = $giper_baza_link.from_int(idea).str;
                if (/[æÆ]/.test(id))
                    continue;
                break;
            }
            const link = new $giper_baza_link(this.link().lord().str + '_' + id);
            const area = this.$.$giper_baza_glob.Land(link);
            area.inherit();
            area.bus();
            area.sync_mine();
            area.sync_yard();
            return area;
        }
        sync_rights() {
            return new $mol_wire_atom('', () => this.inherit()).fresh();
        }
        inherit() {
            const area = this.link();
            const lord = this.link().lord();
            if (area.str === lord.str)
                return;
            const Lord = this.$.$giper_baza_glob.Land(lord);
            Lord.units_saving();
            const units = new Set();
            for (const gift of Lord._gift.values()) {
                const prev = $mol_wire_sync(this._gift).get(gift.mate().str);
                if ($giper_baza_unit_gift.compare(prev, gift) <= 0)
                    continue;
                const seal = Lord.unit_seal(gift);
                if (!seal)
                    continue;
                units.add(gift);
                units.add(seal);
                units.add(Lord.lord_pass(gift.lord()));
                const mate = gift.mate();
                if (mate.str)
                    units.add(Lord.lord_pass(mate));
            }
            let part = $giper_baza_pack_part.from([...units]);
            const pack = $giper_baza_pack.make([[this.link().str, part]]);
            part = pack.parts()[0][1];
            this.diff_apply(part.units);
        }
        /** Data root */
        Data(Pawn) {
            return this.Pawn(Pawn).Head($.$giper_baza_land_root.data);
        }
        /** Lands for inheritance */
        Tine() {
            return this.Pawn($giper_baza_list_link).Head($.$giper_baza_land_root.tine);
        }
        /** High level representation of stored data */
        Pawn(Pawn) {
            return new $giper_baza_fund((head) => {
                return Pawn.make({
                    land: $mol_const(this), //.sync(),
                    head: $mol_const(head),
                });
            });
        }
        /** Total count of Units inside Land. */
        total() {
            let total = this._gift.size + this._seal_shot.size;
            for (const peers of this._sand.values()) {
                for (const units of peers.values()) {
                    total += units.size;
                }
            }
            return total;
        }
        king_pass() {
            return this.lord_pass(this.link().lord());
        }
        /** Rights level of Pass for Land. */
        pass_rank(pass, next) {
            const prev = this.lord_rank(pass?.lord() ?? null);
            if (next === undefined)
                return prev;
            if (next === prev)
                return prev;
            this.give(pass, next);
            return next;
        }
        lord_tier(lord) {
            return $giper_baza_rank_tier_of(this.lord_rank(lord));
        }
        lord_rate(lord) {
            return $giper_baza_rank_rate_of(this.lord_rank(lord));
        }
        /** Rights level of Lord for Land. Works only when Pass for Lord exists in Land. */
        lord_rank(lord, next) {
            if (lord?.str === this.link().lord().str)
                return $giper_baza_rank_rule;
            if (next === undefined) {
                return this._gift.get(lord?.str ?? '')?.rank()
                    ?? this._gift.get($giper_baza_link.hole.str)?.rank()
                    ?? (this.encrypted() ? $giper_baza_rank_deny : $giper_baza_rank_read);
            }
            const pass = lord ? this.lord_pass(lord) : null;
            // if( !pass ) $mol_fail( new Error( `No Pass for ${ lord }` ) )
            return this.pass_rank(pass, next);
        }
        /** Picks units between Face and current state. */
        diff_units(skip_faces = new $giper_baza_face_map) {
            this.units_signing();
            const skipped = new Map();
            const delta = new Set();
            const passes = new Set();
            const seals = new Set();
            function collect(unit) {
                const peer = unit.lord().peer().str;
                const face_limit = skip_faces.get(peer)?.time_tick ?? 0;
                if (unit.time_tick() > face_limit)
                    return delta.add(unit);
                const skipped_units = skipped.get(peer);
                if (skipped_units)
                    skipped_units.add(unit);
                else
                    skipped.set(peer, new Set([unit]));
            }
            for (const gift of this._gift.values()) {
                collect(gift);
                if (gift.mate().str) {
                    if (skip_faces.has(gift.lord().peer().str))
                        continue;
                    const mate_pass = this.lord_pass(gift.mate());
                    if (mate_pass)
                        passes.add(mate_pass);
                }
            }
            for (const kids of this._sand.values()) {
                for (const peers of kids.values()) {
                    for (const sand of peers.values()) {
                        this.sand_load(sand);
                        collect(sand);
                    }
                }
            }
            // detect Unit absence and then restore all for Peer
            for (const [peer, face] of skip_faces) {
                const skipped_units = skipped.get(peer);
                const skip_mass = skipped_units?.size ?? 0;
                if (skip_mass <= face.summ)
                    continue;
                $mol_wire_sync(this.$).$mol_log3_warn({
                    place: this,
                    message: 'Fail Summ',
                    hint: 'Relax and wait for full peer resync',
                    peer,
                    skip_mass,
                    peer_face: face,
                    self_face: this.faces.get(peer),
                });
                for (const unit of skipped_units)
                    delta.add(unit);
            }
            for (const unit of delta) {
                const seal = this.seal_item_get(unit.lord(), unit.hash());
                if (seal)
                    seals.add(seal);
                else
                    delta.delete(unit);
            }
            for (const unit of delta) {
                if (skip_faces.has(unit.lord().peer().str))
                    continue;
                const pass = this.lord_pass(unit.lord());
                if (!pass)
                    return $mol_fail(new Error('No pass for lord'));
                passes.add(pass);
            }
            return [...passes, ...seals, ...delta];
        }
        /** Picks units between Face and current state and make Part. */
        // @ $mol_action
        diff_part(skip_faces = new $giper_baza_face_map) {
            const units = this.diff_units(skip_faces);
            const faces = new $giper_baza_face_map;
            for (const unit of units) {
                const peer = unit.lord().peer();
                if (faces.has(peer.str))
                    continue;
                const face = this.faces.get(peer.str);
                if (!face)
                    continue;
                faces.set(peer.str, face.clone());
            }
            return new $giper_baza_pack_part(units, faces);
        }
        /** Picks units between Face and current state and make Parts. */
        // @ $mol_action
        diff_parts(skip_faces = new $giper_baza_face_map) {
            return [[this.link().str, this.diff_part(skip_faces)]];
        }
        face_pack() {
            return $giper_baza_pack.make([[
                    this.link().str,
                    new $giper_baza_pack_part([], this.faces.clone()),
                ]]);
        }
        /** Applies Diff to current state with verification. */
        diff_apply(units, skip_load) {
            if (units.length === 0)
                return;
            if (!skip_load)
                this.loading();
            units = $mol_wire_sync(this.$).$giper_baza_unit_sort(units);
            const passes = new Map();
            const mixin_area = this.link().toBin();
            const mixin_lord = this.link().lord().toBin();
            for (const unit of units) {
                if (unit instanceof $giper_baza_auth_pass) {
                    passes.set(unit.hash().str, unit);
                }
            }
            for (const unit of units)
                if (unit instanceof $giper_baza_unit_seal) {
                    const lord_pass = this.lord_pass(unit.lord()) ?? passes.get(unit.lord().str);
                    if (!lord_pass)
                        return this.$.$mol_fail(new Error(`No Pass for Lord`, { cause: unit.lord() }));
                    if (this.$.$giper_baza_unit_trusted_check(unit))
                        continue;
                    const mixin = unit.wide() ? mixin_lord : mixin_area;
                    const sens = unit.shot().mix(mixin);
                    const checked = $mol_wire_sync(lord_pass.auditor()).verify(sens, unit.sign());
                    if (!checked)
                        return $mol_fail(new Error(`Wrong Sign`));
                }
            for (const unit of units) {
                if (unit instanceof $giper_baza_unit_seal) {
                    $giper_baza_unit_trusted_grant(unit);
                }
            }
            for (const unit of units) {
                if (unit instanceof $giper_baza_auth_pass)
                    continue;
                if (this.lord_tier(unit.lord()) < unit.tier_min()) {
                    this.$.$mol_log3_warn({
                        message: 'Too low Tier',
                        tier_min: unit.tier_min().toString(2),
                        tier_actual: this.lord_tier(unit.lord()).toString(2),
                        hint: 'Relax. Unit is skipped.',
                        place: `${this}.diff_apply()`,
                    });
                    continue;
                }
                const lord_pass = this.lord_pass(unit.lord()) ?? passes.get(unit.lord().str);
                if (!lord_pass)
                    return this.$.$mol_fail(new Error(`No Pass for Lord`, { cause: unit.lord() }));
                switch (unit.kind()) {
                    case 'seal': {
                        const seal = unit;
                        if (this.lord_rate(unit.lord()) < seal.rate_min()) {
                            return this.$.$mol_fail(new Error('Too low Rate'));
                        }
                        this.seal_add(seal);
                        break;
                    }
                    case 'gift': {
                        const gift = unit;
                        if (!this.$.$giper_baza_unit_trusted_check(gift)) {
                            const seal = this.unit_seal(gift);
                            if (!seal)
                                return this.$.$mol_fail(new Error(`No Seal for Gift`, { cause: gift }));
                        }
                        if (gift.mate().str) {
                            const mate_pass = this.lord_pass(gift.mate()) ?? passes.get(gift.mate().str);
                            if (!mate_pass)
                                return this.$.$mol_fail(new Error(`No Pass for Mate`, { cause: gift }));
                            this.pass_add(mate_pass);
                        }
                        this.gift_add(gift);
                        break;
                    }
                    case 'sand': {
                        const sand = unit;
                        if (!this.$.$giper_baza_unit_trusted_check(sand)) {
                            const seal = this.unit_seal(sand);
                            if (!seal)
                                return this.$.$mol_fail(new Error(`No Seal for Sand`, { cause: sand }));
                        }
                        this.sand_add(sand);
                        break;
                    }
                    default: {
                        return this.$.$mol_fail(new Error(`Unsupported Kind`));
                    }
                }
                this.pass_add(lord_pass);
            }
            return units;
        }
        units_steal(donor) {
            this.diff_apply(donor.diff_units(), 'skip_load');
        }
        rank_audit() {
            start: while (true) {
                for (const [shot, seal] of this._seal_shot) {
                    const rank = this.lord_rank(seal.lord());
                    if (rank >= seal.rank_min())
                        continue;
                    this.seal_del(seal);
                }
                for (const [lord, gift] of this._gift) {
                    // if( this.unit_seal( gift ) ) {
                    const tier = this.lord_tier(gift.lord());
                    if (tier >= gift.tier_min())
                        continue;
                    // }
                    this.gift_del(gift);
                    continue start;
                }
                for (const [head, peers] of this._sand) {
                    for (const [peer, sands] of peers) {
                        for (const [self, sand] of sands) {
                            const tier = this.lord_tier(sand.lord());
                            if (tier >= sand.tier_min())
                                continue;
                            this.sand_del(sand);
                        }
                    }
                }
                break;
            }
        }
        fork(preset = [[null, $giper_baza_rank_read]]) {
            const land = this.$.$giper_baza_glob.land_grab(preset);
            land.Tine().items_vary([this.link()]);
            return land;
        }
        sand_ordered({ head, peer }) {
            this.sync();
            // this.secret() // early async to prevent async on put
            const queue = (peer?.str)
                ? [...this._sand.get(head.str)?.get(peer.str)?.values() ?? []]
                : [...this._sand.get(head.str)?.values() ?? []].flatMap(units => [...units.values()]);
            const slices = new Map;
            for (const sand of queue)
                slices.set(sand, 0);
            merge: if (head.str !== $.$giper_baza_land_root.tine.str) {
                const tines = (this.Tine()?.items_vary().slice().reverse() ?? [])
                    .map(val => $giper_baza_link_schema.cast(val))
                    .filter($mol_guard_defined);
                if (!tines.length)
                    break merge;
                const exists = new Set(queue.map(sand => sand.self().str));
                const glob = this.$.$giper_baza_glob;
                let slice = 0;
                for (const link of tines) {
                    ++slice;
                    const land = glob.Land(link);
                    for (const sand of land.sand_ordered({ head, peer })) {
                        if (exists.has(sand.self().str))
                            continue;
                        queue.push(sand);
                        exists.add(sand.self().str);
                        slices.set(sand, slice);
                    }
                }
            }
            if (queue.length < 2)
                return queue;
            const compare = (left, right) => {
                return (slices.get(left) - slices.get(right)) || $giper_baza_unit_sand.compare(left, right);
            };
            queue.sort(compare);
            let entry = {
                sand: null,
                next: null,
                prev: null,
            };
            const key = peer === null ? (sand) => sand.path() : (sand) => sand.self().str;
            const by_key = new Map([[entry.prev, entry]]);
            const by_self = new Map([[entry.prev, entry]]);
            while (queue.length) {
                const last = queue.pop();
                by_key.get(entry.prev).next = key(last);
                const item = { sand: last, next: null, prev: entry.prev };
                by_key.set(key(last), item);
                const exists = by_self.get(last.self().str);
                if (!exists || compare(exists.sand, last) < 0) {
                    by_self.set(last.self().str, item);
                }
                entry.prev = key(last);
                for (let cursor = queue.length - 1; cursor >= 0; --cursor) {
                    const kid = queue[cursor];
                    let lead = by_self.get(kid.lead().str || null);
                    if (!lead)
                        continue;
                    while (lead.next && (compare(by_key.get(lead.next).sand, kid) < 0))
                        lead = by_key.get(lead.next);
                    const exists1 = by_key.get(key(kid));
                    if (exists1) {
                        if ((lead.sand ? key(lead.sand) : null) === exists1.prev) {
                            exists1.sand = kid;
                            if (cursor === queue.length - 1)
                                queue.pop();
                            continue;
                        }
                        by_key.get(exists1.prev).next = exists1.next;
                        by_key.get(exists1.next).prev = exists1.prev;
                    }
                    const follower = by_key.get(lead.next);
                    follower.prev = key(kid);
                    const item = { sand: kid, next: lead.next, prev: lead.sand ? key(lead.sand) : null };
                    by_key.set(key(kid), item);
                    const exists2 = by_self.get(kid.self().str);
                    if (!exists2 || compare(exists2.sand, kid) < 0) {
                        by_self.set(kid.self().str, item);
                    }
                    lead.next = key(kid);
                    if (cursor === queue.length - 1)
                        queue.pop();
                    cursor = queue.length;
                }
            }
            const res = [];
            while (entry.next !== null) {
                entry = by_key.get(entry.next);
                res.push(entry.sand);
            }
            return res;
        }
        join() {
            this.encrypted(this.encrypted());
        }
        /**
         * Gives access rights to Lord by Auth key.
         * `null` - gives rights for all Peers.
         */
        give(mate_pass, rank) {
            this.join();
            const gift = $giper_baza_unit_gift.make();
            const lord_pass = this.auth().pass();
            gift._land = this;
            gift.lord(lord_pass.lord());
            gift.rank(rank);
            gift.time_tick(this.tick().time_tick);
            if (mate_pass)
                gift.mate(mate_pass.lord());
            if (rank >= $giper_baza_rank_read) {
                const secret_land = this.secret();
                if (secret_land) {
                    if (!mate_pass)
                        return $mol_fail(new Error(`Encrypted land can't be shared to everyone`));
                    const secret_mutual = this.auth().secret_mutual(mate_pass);
                    if (secret_mutual) {
                        const salt = $mol_buffer.from(gift.salt().slice()).mix(this.link().lord().toBin());
                        const code = $mol_wire_sync(secret_mutual).close(secret_land, salt);
                        gift.code().set(code);
                    }
                }
            }
            else {
                if (!this.encrypted())
                    $mol_fail(new Error('Unencrypted Land is always public'));
            }
            $giper_baza_unit_trusted_grant(gift);
            this.diff_apply([lord_pass, ...$mol_maybe(mate_pass), gift]);
            this.broadcast();
            return gift;
        }
        /** Places data to tree. */
        post(lead, head, self, vary, tag = 'term') {
            this.join();
            const lord_pass = this.auth().pass();
            const encrypted = vary === null ? false : this.encrypted();
            let open = $giper_baza_link_base(this.link(), () => $giper_baza_vary.pack([vary]));
            const length = encrypted ? Math.ceil((open.byteLength + 1) / 16) * 16 : open.byteLength;
            const sand = $giper_baza_unit_sand.make(length, tag);
            sand._open = open;
            sand._land = this;
            $giper_baza_unit_trusted_grant(sand);
            sand.time_tick(this.tick().time_tick);
            sand.lord(lord_pass.lord());
            sand.lead(lead);
            sand.head(head);
            sand._vary = vary;
            sand.self(self ?? this.self_make(encrypted ? undefined : $mol_hash_numbers(open, sand.idea_seed())));
            this.diff_apply([lord_pass, sand]);
            this.broadcast();
            return sand;
        }
        sand_move(sand, head, seat, peer = $giper_baza_link.hole) {
            if (sand.dead())
                $mol_fail(new RangeError(`Can't move wiped sand`));
            const units = this.sand_ordered({ head, peer }).filter(unit => !unit.dead());
            if (seat > units.length)
                $mol_fail(new RangeError(`Seat (${seat}) out of units length (${units.length})`));
            const lead = seat ? units[seat - 1].self() : $giper_baza_link.hole;
            const vary = this.sand_decode(sand);
            if (sand.head() === head) {
                const seat_prev = units.indexOf(sand);
                if (seat === seat_prev)
                    return;
                if (seat === seat_prev + 1)
                    return;
                const prev = seat_prev ? units[seat_prev - 1].self() : $giper_baza_link.hole;
                const next = units[seat_prev + 1];
                if (next)
                    this.post(prev, head, next.self(), this.sand_decode(next), next.tag());
            }
            else {
                this.sand_wipe(sand);
            }
            return this.post(lead, head, sand.self(), vary, sand.tag());
        }
        sand_wipe(sand, peer = $giper_baza_link.hole) {
            const head = sand.head();
            const units = this.sand_ordered({ head, peer }).filter(unit => !unit.dead());
            const seat = units.indexOf(sand);
            if (seat < 0)
                return sand;
            return this.post(seat ? units[seat - 1].self() : $giper_baza_link.hole, head, sand.self(), null, 'term');
        }
        broadcast() {
            this.persisted(true);
            this.$.$giper_baza_glob.yard().lands_news.add(this.link().str);
        }
        sync() {
            this.loading();
            this.sync_rights();
            this.bus();
            this.sync_mine();
            this.sync_yard();
            return this;
        }
        destructor() {
            Promise.resolve().then(() => {
                this.$.$giper_baza_glob.yard().forget_land(this);
            });
        }
        mine() {
            $mol_wire_solid();
            return this.$.$giper_baza_mine.land(this.link());
        }
        sync_mine() {
            return new $mol_wire_atom('', () => this.units_saving()).fresh();
        }
        sync_yard() {
            const root = new $mol_wire_atom('sync_yard', () => this.$.$giper_baza_glob.yard().sync_land(this.link()));
            setTimeout(() => root.fresh());
            return root;
        }
        bus() {
            return new this.$.$mol_bus(`$giper_baza_land:${this.link()}`, $mol_wire_async(buf => {
                const pack = new $giper_baza_pack(buf);
                const part = new Map(pack.parts()).get(this.link().str);
                for (const unit of part.units) {
                    $giper_baza_unit_trusted_grant(unit);
                    this.mine().units_persisted.add(unit);
                }
                this.diff_apply(part.units);
            }));
        }
        loading() {
            $mol_wire_solid();
            let units = $mol_wire_sync(this.mine()).units_load();
            if (units.length)
                this.persisted(true);
            if (this.$.$giper_baza_log())
                $mol_wire_sync(this.$).$mol_log3_rise({
                    place: this,
                    message: 'Load Unit',
                    units: units,
                });
            $mol_wire_sync(this).diff_apply(units, 'skip_load');
        }
        sands_unencoded() {
            const sands = [];
            for (const kids of this._sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if (sand._vary === undefined)
                            continue;
                        if (sand._ball)
                            continue;
                        sands.push(sand);
                    }
                }
            }
            return sands;
        }
        sand_encoding() {
            this.loading();
            batch(this, this.sands_unencoded, this.sands_encode);
        }
        units_unsigned() {
            const signing = [];
            for (const gift of this._gift.values()) {
                if (this.unit_seal(gift))
                    continue;
                signing.push(gift);
            }
            for (const kids of this._sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if (this.unit_seal(sand))
                            continue;
                        signing.push(sand);
                    }
                }
            }
            return signing;
        }
        units_signing() {
            this.sand_encoding();
            batch(this, this.units_unsigned, this.units_sign);
        }
        units_unsaved() {
            const mine = this.mine();
            const persisting = new Set();
            const check_lord = (lord) => {
                const pass = this.lord_pass(lord);
                if (!pass)
                    return;
                if (mine.units_persisted.has(pass))
                    return;
                persisting.add(pass);
            };
            for (const gift of this._gift.values()) {
                if (mine.units_persisted.has(gift))
                    continue;
                if (!this.unit_seal(gift))
                    continue;
                persisting.add(gift);
                check_lord(gift.lord());
                check_lord(gift.mate());
            }
            for (const kids of this._sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if ($mol_wire_sync(mine.units_persisted).has(sand))
                            continue;
                        if (!this.unit_seal(sand))
                            continue;
                        persisting.add(sand);
                        check_lord(sand.lord());
                    }
                }
            }
            for (const seal of this._seal_shot.values()) {
                if (!seal.alive_items.size)
                    continue;
                if (mine.units_persisted.has(seal))
                    continue;
                persisting.add(seal);
            }
            return [...persisting];
        }
        units_saving() {
            this.units_signing();
            if (!this.persisted())
                return;
            batch(this, this.units_unsaved, this.units_save);
        }
        async units_save(units) {
            const mine = this.mine();
            const reaping = [...this.units_reaping];
            this.units_reaping.clear();
            await $mol_wire_async(mine).units_save({ ins: units, del: reaping });
            const part = new $giper_baza_pack_part(units);
            const pack = $giper_baza_pack.make([[this.link().str, part]]);
            this.bus().send(pack.buffer);
            if (this.$.$giper_baza_log())
                this.$.$mol_log3_done({
                    place: this,
                    message: 'Save Unit',
                    ins: units,
                    del: reaping,
                });
        }
        persisted(next) {
            $mol_wire_solid();
            if (next !== undefined)
                return next;
            const level = $mol_wire_sync(this.$.$mol_storage).level();
            if (level <= 0)
                return true;
            if (level > 6)
                return false;
            const crop = 8 - level;
            const self = this.auth().pass().lord().toBin().at(-1);
            const land = this.link().toBin().at(-1);
            return (self >>> crop) === (land >>> crop);
        }
        async units_sign(units) {
            await Promise.resolve(); // prevent deps
            const lands = new Map();
            for (const unit of units) {
                if (!unit._land)
                    continue;
                let us = lands.get(unit._land);
                if (us)
                    us.push(unit.hash());
                else
                    lands.set(unit._land, [unit.hash()]);
            }
            const me = this.auth().pass().lord().str;
            for (const seal of this._seal_shot.values()) {
                if (seal.alive_full())
                    continue;
                if (seal.lord().str !== me)
                    continue;
                seal._land ??= this;
                let us = lands.get(this);
                if (!us)
                    lands.set(seal._land, us = []);
                const hashes = seal.alive_list();
                us.push(...hashes);
                // this.seal_del( seal )
            }
            const threads = [...lands.entries()].flatMap(([land, hashes]) => {
                const auth = land.auth();
                const rate = $giper_baza_rank_rate_of(land.pass_rank(auth.pass()));
                const wide = !land.link().area().str;
                return $mol_array_chunks(hashes, $giper_baza_unit_seal_limit).map(async (hashes) => {
                    const seal = $giper_baza_unit_seal.make(hashes.length, wide);
                    seal.lord(auth.pass().lord());
                    seal.hash_list(hashes);
                    seal._land = this;
                    do {
                        seal.time_tick(this.tick().time_tick);
                        const sens = seal.shot().mix(this.link());
                        const sign = await auth.signer().sign(sens);
                        seal.sign(sign);
                    } while (seal.rate_min() > rate);
                    return seal;
                });
            });
            const seals = await Promise.all(threads);
            for (const seal of seals) {
                for (const hash of seal.hash_list()) {
                    if (this._unit_hash.has(hash.str)) {
                        seal.alive_items.add(hash.str);
                    }
                }
                if (seal.alive_items.size)
                    this.seal_add(seal);
            }
            return seals;
        }
        sands_encode(sands) {
            return Promise.all(sands.map(sand => this.sand_encode(sand)));
        }
        async sand_encode(sand) {
            let bin = sand._open;
            if (sand._vary !== null) {
                const secret = sand._land.secret();
                if (secret) {
                    const salt = $mol_buffer.from(sand.salt().slice()).mix(this.link().toBin());
                    bin = await secret.encrypt(bin, salt);
                }
            }
            sand.ball(bin);
            if (sand._alive)
                this._unit_hash.set(sand.hash().str, sand);
            return sand;
        }
        sand_load(sand) {
            if (sand._ball)
                return;
            sand._ball = sand.big() ? $mol_wire_sync(this.mine()).ball_load(sand) : sand.data();
        }
        sand_decode(sand) {
            try {
                // const open = this.sand_decrypt( sand )
                const open = sand._open;
                return $giper_baza_link_base(this.link(), () => $giper_baza_vary.take(open)[0]);
            }
            catch (error) {
                if (error instanceof Promise)
                    return $mol_fail_hidden(error);
                this.$.$mol_fail_log(error);
                return null;
            }
        }
        // @ $mol_mem_key
        // sand_decrypt( sand: $giper_baza_unit_sand ): Uint8Array< ArrayBuffer > {
        // 	if( this.sand_get( sand.head(), sand.lord(), sand.self() ) !== sand ) {
        // 		for( const id of this.Tine().items_vary() ?? [] ) {
        // 			const open = this.$.$giper_baza_glob.Land( $giper_baza_vary_cast_link( id! )! ).sand_decrypt( sand )
        // 			if( open ) return open
        // 		}
        // 		return undefined!
        // 	}
        // 	const secret = this.secret()
        // 	if( sand._open ) return sand._open
        // 	if( !sand._ball ) sand._ball = sand.big() ? $mol_wire_sync( this.mine() ).ball_load( sand ) : sand.data()
        // 	if( secret && sand._ball && !sand.dead() ) {
        // 		try {
        // 			sand._open = $mol_wire_sync( secret ).decrypt( sand._ball, sand.salt() )
        // 		} catch( error: any ) {
        // 			if( $mol_fail_catch( error ) ) {
        // 				if( error.message ) $mol_fail_hidden( error )
        // 				else $mol_fail_hidden( new Error( `Can't decrypt`, { cause: error } ) )
        // 			}
        // 		}
        // 	} else {
        // 		sand._open = sand._ball
        // 	}
        // 	return sand._open!
        // }
        sands_open(sands) {
            const encrypted = this.encrypted();
            const closed = sands.filter(sand => {
                if (sand._open)
                    return false;
                if (!sand._ball) {
                    if (sand.big())
                        return true;
                    sand._ball = sand.data();
                }
                if (encrypted && !sand.dead())
                    return true;
                sand._open = sand._ball;
            });
            if (!closed.length)
                return;
            return Promise.all(closed.map(sand => this.sand_open(sand)));
        }
        async sand_open(sand) {
            if (this.sand_get(sand.head(), sand.lord(), sand.self()) !== sand) {
                for (const id of this.Tine().items_vary() ?? []) {
                    const open = await this.$.$giper_baza_glob.Land($giper_baza_link_schema.cast(id)).sand_open(sand);
                    if (open)
                        return open;
                }
                return undefined;
            }
            const secret = this.secret();
            if (sand._open)
                return sand._open;
            if (!sand._ball)
                sand._ball = sand.big() ? await $mol_wire_async(this.mine()).ball_load(sand) : sand.data();
            if (secret && sand._ball && !sand.dead()) {
                const salt = $mol_buffer.from(sand.salt().slice()).mix(this.link().toBin());
                try {
                    sand._open = await secret.decrypt(sand._ball, salt);
                }
                catch (error) {
                    if ($mol_fail_catch(error)) {
                        if (error.message)
                            $mol_fail_hidden(error);
                        else
                            $mol_fail_hidden(new Error(`Can't decrypt`, { cause: error }));
                    }
                }
            }
            else {
                sand._open = sand._ball;
            }
            return sand._open;
        }
        encryptable() {
            return !this._sand.size;
        }
        encrypted(next) {
            $mol_wire_solid();
            const gift = this._gift.get(this.link().str);
            const prev = gift?.code_exists() ?? false;
            if (next === undefined)
                return prev;
            if (this.faces.size) {
                if (prev === next)
                    return prev;
                $mol_fail(new Error(`Change encryption is forbidden`));
            }
            const auth = this.auth();
            const unit = $mol_wire_sync($giper_baza_unit_gift).make();
            $giper_baza_unit_trusted_grant(unit);
            unit.rank($giper_baza_rank_rule);
            unit.time_tick(this.tick().time_tick);
            unit.lord(auth.pass().lord());
            unit.mate(auth.pass().lord());
            unit._land = this;
            if (next) {
                const secret = $mol_wire_sync($mol_crypto_sacred).make();
                const secret_mutual = auth.secret_mutual(auth.pass());
                const secret_closed = $mol_wire_sync(secret_mutual).close(secret, unit.salt());
                unit.code().set(secret_closed);
            }
            this.diff_apply([auth.pass(), unit]);
            return next;
        }
        secret() {
            if (!this.encrypted())
                return null;
            const auth = this.auth();
            const gift = this._gift.get(auth.pass().lord().str);
            if (!gift)
                return $mol_fail(new Error(`Access denied`));
            if (!gift.code_exists())
                return $mol_fail(new Error(`No key to decrypt`));
            const secret_mutual = auth.secret_mutual(this.lord_pass(gift.lord()));
            if (!secret_mutual)
                return $mol_fail(new Error(`Can't decrypt secret`));
            const salt = $mol_buffer.from(gift.salt().slice()).mix(this.link().lord().toBin());
            return new $mol_crypto_sacred($mol_wire_sync(secret_mutual).open(gift.code(), salt).buffer);
        }
        dump() {
            this.units_saving();
            const units = [];
            for (const gift of this._gift.values())
                units.push(gift);
            for (const heads of this._sand.values()) {
                for (const sands of heads.values()) {
                    for (const sand of sands.values()) {
                        units.push(sand);
                    }
                }
            }
            return {
                land: this.link(),
                units
            };
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$giper_baza_land')
                + $mol_term_color.magenta(` @` + this.link());
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.faces.stat));
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "lord_pass", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "self_make", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "area_make", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync_rights", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "inherit", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "Data", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "Tine", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "Pawn", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "total", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "king_pass", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "pass_rank", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "face_pack", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "diff_apply", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "units_steal", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "fork", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "sand_ordered", null);
    __decorate([
        $mol_mem,
        $mol_action
    ], $giper_baza_land.prototype, "join", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "give", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "post", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "sand_move", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "sand_wipe", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "mine", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync_mine", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync_yard", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "bus", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "loading", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sands_unencoded", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sand_encoding", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_unsigned", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_signing", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_unsaved", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_saving", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "persisted", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "sand_load", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "sand_decode", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "sands_open", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "encryptable", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "encrypted", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "secret", null);
    $.$giper_baza_land = $giper_baza_land;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port extends $mol_object {
        send_code(code) { }
        send_type(mime) { }
        send_name(name) { }
        origin() { return 'unknown'; }
        address() { return 'unknown'; }
        send_data(data) {
            if (data === null)
                return this.send_nil();
            if (typeof data === 'string')
                return this.send_text(data);
            if (data instanceof Uint8Array)
                return this.send_bin(data);
            if (data instanceof $mol_dom_context.Element)
                return this.send_dom(data);
            return this.send_json(data);
        }
        send_nil() {
            this.send_code(204);
        }
        send_bin(data) {
            this.send_code(200);
            this.send_type('application/octet-stream');
        }
        send_text(data) {
            this.send_code(200);
            this.send_type('text/plain;charset=utf-8');
            this.send_bin($mol_charset_encode(data));
        }
        send_json(data) {
            this.send_code(200);
            this.send_type('application/json');
            this.send_text(JSON.stringify(data));
        }
        send_dom(data) {
            this.send_code(200);
            this.send_type('text/html;charset=utf-8');
            this.send_text($mol_dom_serialize(data));
        }
        static make(config) {
            return super.make(config);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_data", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_text", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_json", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_dom", null);
    __decorate([
        ($mol_action)
    ], $mol_rest_port, "make", null);
    $.$mol_rest_port = $mol_rest_port;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive Set */
    class $mol_wire_set extends Set {
        pub = new $mol_wire_pub;
        // Accessors
        has(value) {
            this.pub.promote();
            return super.has(value);
        }
        entries() {
            this.pub.promote();
            return super.entries();
        }
        keys() {
            this.pub.promote();
            return super.keys();
        }
        values() {
            this.pub.promote();
            return super.values();
        }
        forEach(task, self) {
            this.pub.promote();
            super.forEach(task, self);
        }
        [Symbol.iterator]() {
            this.pub.promote();
            return super[Symbol.iterator]();
        }
        get size() {
            this.pub.promote();
            return super.size;
        }
        // Mutators
        add(value) {
            if (super.has(value))
                return this;
            super.add(value);
            this.pub.emit();
            return this;
        }
        delete(value) {
            const res = super.delete(value);
            if (res)
                this.pub.emit();
            return res;
        }
        clear() {
            if (!super.size)
                return;
            super.clear();
            this.pub.emit();
        }
        // Extensions
        item(val, next) {
            if (next === undefined)
                return this.has(val);
            if (next)
                this.add(val);
            else
                this.delete(val);
            return next;
        }
    }
    $.$mol_wire_set = $mol_wire_set;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws extends $mol_rest_port {
    }
    $.$mol_rest_port_ws = $mol_rest_port_ws;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_message extends $mol_object {
        port;
        method() {
            return 'POST';
        }
        uri() {
            return new URL(`rest://localhost/`);
        }
        type() {
            return 'application/octet-stream';
        }
        origin() {
            return 'unknown';
        }
        address() {
            return 'unknown';
        }
        protocols() {
            return [];
        }
        data() {
            return null;
        }
        bin() {
            let data = this.data();
            if (data instanceof Uint8Array)
                return data;
            if (data instanceof $mol_dom_context.Element)
                data = $mol_dom_serialize(data);
            if (typeof data !== 'string')
                data = JSON.stringify(data);
            return $mol_charset_encode(data);
        }
        text() {
            const data = this.data();
            if (typeof data === 'string')
                return data;
            if (data instanceof Uint8Array)
                return $mol_charset_decode(data);
            if (data instanceof $mol_dom_context.Element)
                return $mol_dom_serialize(data);
            return JSON.stringify(data);
        }
        reply(data, meta) {
            if (meta?.code)
                this.port.send_code(meta.code);
            if (meta?.type)
                this.port.send_type(meta.type);
            this.port.send_data(data);
        }
        route(uri) {
            return $mol_rest_message.make({
                port: this.port,
                method: () => this.method(),
                uri: $mol_const(uri),
                protocols: () => this.protocols(),
                type: () => this.type(),
                origin: () => this.origin(),
                data: () => this.data(),
            });
        }
        derive(method, data, type = this.type()) {
            return $mol_rest_message.make({
                port: this.port,
                method: $mol_const(method),
                uri: () => this.uri(),
                protocols: () => this.protocols(),
                type: $mol_const(type),
                origin: () => this.origin(),
                data: $mol_const(data),
            });
        }
        static make(config) {
            return super.make(config);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "uri", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "bin", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_rest_message.prototype, "route", null);
    __decorate([
        $mol_action
    ], $mol_rest_message.prototype, "derive", null);
    __decorate([
        ($mol_action)
    ], $mol_rest_message, "make", null);
    $.$mol_rest_message = $mol_rest_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_message_http extends $mol_rest_message {
        input;
        method() {
            return this.input.method ?? super.method();
        }
        uri() {
            const addr = this.input.socket?.localAddress ?? '::1';
            const port = this.input.socket?.localPort ?? '80';
            return new URL(this.input.url, `http://[${addr}]:${port}/`);
        }
        type() {
            return (this.input.headers['content-type'] ?? 'application/octet-stream');
        }
        origin() {
            return this.input.headers['origin'] ?? super.origin();
        }
        address() {
            return String(this.input.headers['x-forwarded-for'] ?? '') || this.input.socket?.remoteAddress || super.address();
        }
        protocols() {
            return String(this.input.headers['sec-websocket-protocol'] ?? '').split(',').map(p => p.trim()).filter(Boolean);
        }
        data() {
            const consume = $mol_wire_sync($node['stream/consumers']);
            if (this.type().startsWith('text/')) {
                const text = consume.text(this.input);
                if (this.type() === 'text/html') {
                    return $mol_dom_parse(text, 'application/xhtml+xml').documentElement;
                }
                return text;
            }
            else {
                if (this.type() === 'application/json') {
                    return consume.json(this.input);
                }
                else {
                    return new Uint8Array(consume.arrayBuffer(this.input));
                }
            }
        }
        route(uri) {
            return $mol_rest_message_http.make({
                port: this.port,
                input: this.input,
                uri: $mol_const(uri),
                data: () => this.data(),
            });
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "method", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "uri", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "origin", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "address", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "protocols", null);
    __decorate([
        $mol_mem
    ], $mol_rest_message_http.prototype, "data", null);
    __decorate([
        $mol_action
    ], $mol_rest_message_http.prototype, "route", null);
    $.$mol_rest_message_http = $mol_rest_message_http;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_websocket_frame_op;
    (function ($mol_websocket_frame_op) {
        $mol_websocket_frame_op[$mol_websocket_frame_op["con"] = 0] = "con";
        $mol_websocket_frame_op[$mol_websocket_frame_op["txt"] = 1] = "txt";
        $mol_websocket_frame_op[$mol_websocket_frame_op["bin"] = 2] = "bin";
        $mol_websocket_frame_op[$mol_websocket_frame_op["stop"] = 8] = "stop";
        $mol_websocket_frame_op[$mol_websocket_frame_op["ping"] = 9] = "ping";
        $mol_websocket_frame_op[$mol_websocket_frame_op["pong"] = 10] = "pong";
    })($mol_websocket_frame_op = $.$mol_websocket_frame_op || ($.$mol_websocket_frame_op = {}));
    /**
     * WebSocket frame header.
     * https://datatracker.ietf.org/doc/html/rfc6455#section-5.2
     * Payload >= 2^32 isn't supported
     */
    class $mol_websocket_frame extends $mol_buffer {
        /** Kind of socket frame. */
        kind(next) {
            if (next) {
                this.setUint8(0, Number(next.fin) << 7 | $mol_websocket_frame_op[next.op]);
                return next;
            }
            else {
                const state = this.getUint8(0);
                const fin = state >> 7;
                const op = $mol_websocket_frame_op[state & 0b1111];
                if (op === undefined)
                    $mol_fail(new Error(`Wrong op (${state.toString(2)})`));
                return { op, fin };
            }
        }
        /** Payload info. */
        data(next) {
            if (next === undefined) {
                const state = this.getUint8(1);
                const mask = state >> 7;
                let size = state & 0b0111_1111;
                if (size === 126)
                    size = this.getUint16(2);
                else if (size === 127)
                    size = this.getUint32(6);
                return { size, mask };
            }
            else {
                if (next.size >= 2 ** 16) {
                    this.setUint8(1, 127 | Number(next.mask) << 7);
                    this.setUint32(6, next.size);
                }
                else if (next.size >= 126) {
                    this.setUint8(1, 126 | Number(next.mask) << 7);
                    this.setUint16(2, next.size);
                }
                else {
                    this.setUint8(1, next.size | Number(next.mask) << 7);
                }
                return next;
            }
        }
        /** Header size (2..14). */
        size() {
            if (this.byteLength < 2)
                return 2;
            const short = this.getUint8(1) & 0b0111_1111;
            const mask = this.getUint8(1) >> 7;
            return (short === 127 ? 10 : short === 126 ? 4 : 2) + (mask ? 4 : 0);
        }
        /** 4 byte mask. */
        mask() {
            return new Uint8Array(this.buffer, this.byteOffset + this.size() - 4, 4);
        }
        toString() {
            const { op, fin } = this.kind();
            const { size, mask } = this.data();
            return `${op}${fin ? '!' : '+'}${size}${mask ? '@' : '#'}`;
        }
        static make(op, size = 0, mask = false, fin = true) {
            const head = (size >= 2 ** 16 ? 10 : size >= 126 ? 4 : 2) + (mask ? 4 : 0);
            const frame = $mol_websocket_frame.from(head);
            frame.kind({ op, fin });
            frame.data({ size, mask });
            return frame;
        }
    }
    $.$mol_websocket_frame = $mol_websocket_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws_std extends $mol_rest_port_ws {
        socket;
        origin() {
            return this.socket.url;
        }
        send_nil() {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            this.socket.send('');
        }
        send_bin(data) {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            this.socket.send(data);
        }
        send_text(data) {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            const bin = $mol_charset_encode(data);
            this.socket.send(bin);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_text", null);
    $.$mol_rest_port_ws_std = $mol_rest_port_ws_std;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws_node extends $mol_rest_port_ws {
        prolog;
        socket;
        upgrade() {
            return $mol_rest_message_http.make({ port: this, input: this.prolog });
        }
        origin() {
            return this.upgrade().origin();
        }
        address() {
            return this.upgrade().address();
        }
        send_nil() {
            if (this.socket.writableEnded)
                return;
            this.socket.write($mol_websocket_frame.make('pong', 0).asArray());
        }
        send_bin(data) {
            if (this.socket.writableEnded)
                return;
            this.socket.write($mol_websocket_frame.make('bin', data.byteLength).asArray());
            this.socket.write(data);
        }
        send_text(data) {
            if (this.socket.writableEnded)
                return;
            const bin = $mol_charset_encode(data);
            this.socket.write($mol_websocket_frame.make('txt', bin.byteLength).asArray());
            this.socket.write(bin);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_port_ws_node.prototype, "upgrade", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_node.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_node.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_node.prototype, "send_text", null);
    $.$mol_rest_port_ws_node = $mol_rest_port_ws_node;
    $.$mol_rest_port_ws = $mol_rest_port_ws_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const Passives = new WeakMap();
    /** Glob synchronizer */
    class $giper_baza_yard extends $mol_object {
        /** Whole global graph database which contains Lands */
        glob() {
            return null;
        }
        lands_news = new $mol_wire_set();
        static masters_default = [];
        static masters() {
            const all = this.$.$giper_baza_glob.Seed().peers();
            const self = this.$.$giper_baza_auth.current().pass().lord();
            const pos = all.findLastIndex(peer => peer.link().str === self.str);
            const links = all.slice(pos + 1).flatMap(peer => peer.urls());
            return [...this.masters_default, ...links];
        }
        master_cursor(next = 0) {
            return next;
        }
        master_current() {
            return this.$.$giper_baza_yard.masters()[this.master_cursor()];
        }
        master_next() {
            this.master_cursor((this.master_cursor() + 1) % this.$.$giper_baza_yard.masters().length);
        }
        reconnects(reset) {
            return ($mol_wire_probe(() => this.reconnects()) ?? 0) + 1;
        }
        master() {
            this.reconnects();
            const link = this.master_current();
            if (!link)
                return null;
            const socket = new $mol_dom_context.WebSocket(link.replace(/^http/, 'ws'), ['$giper_baza_yard_2']);
            socket.binaryType = 'arraybuffer';
            const port = new $mol_rest_port_ws_std;
            port.socket = socket;
            socket.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) {
                    if (!event.data.byteLength)
                        return;
                    await $mol_wire_async(this).port_income(port, new Uint8Array(event.data));
                }
                else {
                    this.$.$mol_log3_fail({
                        place: this,
                        message: 'Wrong data',
                        data: event.data
                    });
                }
            };
            let interval;
            socket.onclose = () => {
                clearInterval(interval);
                setTimeout(() => this.reconnects(null), 1000);
            };
            port.destructor = () => {
                socket.onclose = () => { };
                clearInterval(interval);
                socket.close();
            };
            return new Promise((done, fail) => {
                socket.onopen = () => {
                    this.$.$mol_log3_come({
                        place: this,
                        message: 'Connected',
                        port: $mol_key(port),
                        server: link,
                    });
                    interval = setInterval(() => socket.send(new Uint8Array), 30000);
                    done(port);
                };
                socket.onerror = () => {
                    socket.onclose = event => {
                        if (this.$.$giper_baza_log())
                            this.$.$mol_log3_warn({
                                place: this,
                                message: 'Master unavailable',
                                hint: 'Relax and wait for reconnect',
                                link,
                                code: event.code,
                            });
                        clearInterval(interval);
                        interval = setTimeout(() => {
                            // fail( new Error( `Master unavailable`, { cause: { link, code: event.code } } ) )
                            this.master_next();
                            this.reconnects(null);
                        }, 1000);
                    };
                };
            });
        }
        slaves = new $mol_wire_set();
        sync() {
            this.sync_news();
            this.sync_port();
        }
        sync_news() {
            const glob = this.$.$giper_baza_glob;
            const lands = [...this.lands_news].map(link => glob.Land(new $giper_baza_link(link)));
            try {
                for (const port of this.masters()) {
                    for (const land of lands) {
                        this.sync_port_land([port, land.link()]);
                    }
                }
                for (const land of lands)
                    land.units_saving();
                this.lands_news.clear();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        sync_port() {
            for (const port of this.ports())
                this.sync_port_lands(port);
        }
        sync_port_lands(port) {
            const masters = this.masters();
            for (const land of this.port_lands_active(port)) {
                const land_link = new $giper_baza_link(land);
                this.sync_port_land([port, land_link]);
                for (const master of masters)
                    this.sync_port_land([master, land_link]);
            }
        }
        ports() {
            return [...this.masters(), ...this.slaves];
        }
        masters() {
            try {
                return [this.master()].filter($mol_guard_defined);
            }
            catch (error) {
                $mol_fail_log(error);
                return [];
            }
        }
        port_lands_active(port) {
            return new $mol_wire_set();
        }
        port_lands_passive(port) {
            let passives = Passives.get(port);
            if (!passives)
                Passives.set(port, passives = new Set);
            return passives;
        }
        lands_alive() {
            const ports = this.ports();
            const actives = ports.flatMap(port => [...this.port_lands_active(port)]);
            const passives = ports.flatMap(port => [...this.port_lands_passive(port)]);
            const lands = new Set([...actives, ...passives]);
            const glob = this.$.$giper_baza_glob;
            return [...lands].map(id => glob.Land(new $giper_baza_link(id)));
        }
        port_income(port, msg) {
            const pack = $mol_wire_sync($giper_baza_pack).from(msg);
            const parts = $mol_wire_sync(pack).parts();
            for (const [land, part] of parts) {
                const Land = this.$.$giper_baza_glob.Land(new $giper_baza_link(land));
                forget: {
                    if (part.units.length)
                        break forget;
                    if (part.faces.size)
                        break forget;
                    if (!this.port_lands_active(port).has(land))
                        break forget;
                    this.port_lands_active(port).delete(land);
                    if (this.$.$giper_baza_log())
                        $mol_wire_sync(this.$).$mol_log3_done({
                            place: this,
                            message: 'Take Free',
                            port: $mol_key(port),
                            land: Land,
                        });
                    continue;
                }
                this.face_port_sync(port, [[land, part]]);
                if (part.units.length) {
                    if (this.$.$giper_baza_log())
                        $mol_wire_sync(this.$).$mol_log3_rise({
                            place: this,
                            message: 'Take Unit',
                            port: $mol_key(port),
                            land: Land,
                            units: part.units,
                        });
                    Land.diff_apply(part.units);
                }
                else {
                    if (this.$.$giper_baza_log())
                        $mol_wire_sync(this.$).$mol_log3_rise({
                            place: this,
                            message: 'Take Face',
                            port: $mol_key(port),
                            land: Land,
                            faces: part.faces,
                        });
                }
            }
        }
        face_port_sync(port, income) {
            const actives = this.port_lands_active(port);
            const passives = this.port_lands_passive(port);
            for (const [land, part] of income) {
                const land_link = new $giper_baza_link(land);
                if (!passives.has(land))
                    actives.add(land);
                const faces = part.faces;
                let port_faces = this.face_port_land([port, land_link]);
                if (!port_faces)
                    this.face_port_land([port, land_link], port_faces = new $giper_baza_face_map);
                port_faces.sync(faces);
                // for( let unit of part.units ) {
                // 	if( unit instanceof $giper_baza_auth_pass ) continue
                // 	port_faces.peer_time( unit.lord().peer().str, unit.time(), unit.tick() )
                // }
            }
        }
        sync_land(land) {
            for (const port of this.masters()) {
                this.port_lands_passive(port).add(land.str);
                this.sync_port_land([port, land]);
            }
            this.sync();
        }
        forget_land(land) {
            const faces = new $giper_baza_face_map;
            faces.stat = land.faces.stat.clone();
            const pack = $giper_baza_pack.make([[
                    land.link().str,
                    new $giper_baza_pack_part([], faces)
                ]]).asArray();
            for (const port of this.ports()) {
                if (!this.port_lands_passive(port).has(land.link().str))
                    continue;
                this.port_lands_passive(port).delete(land.link().str);
                if (this.$.$giper_baza_log())
                    this.$.$mol_log3_done({
                        place: this,
                        message: 'Send Free',
                        port: $mol_key(port),
                        land,
                    });
                port.send_bin(pack);
            }
        }
        sync_port_land([port, land]) {
            try {
                this.init_port_land([port, land]);
                const faces = this.face_port_land([port, land]);
                if (!faces)
                    return;
                const Land = this.$.$giper_baza_glob.Land(land);
                Land.units_saving();
                const part = Land.diff_part(faces);
                if (!part.units.length)
                    return;
                if (this.$.$giper_baza_log())
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Send Unit',
                        port: $mol_key(port),
                        land: Land,
                        part,
                    });
                const pack = $giper_baza_pack.make([[Land.link().str, part]]);
                port.send_bin(pack.asArray());
                faces.sync(part.faces);
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        init_port_land([port, land]) {
            // $mol_wire_solid() 
            const Land = this.$.$giper_baza_glob.Land(land);
            Land.loading();
            if (this.$.$giper_baza_log())
                this.$.$mol_log3_come({
                    place: this,
                    message: 'Send Face',
                    port: $mol_key(port),
                    land: Land,
                    faces: Land.faces,
                });
            port.send_bin(Land.face_pack().asArray());
        }
        face_port_land([port, land], next = null) {
            $mol_wire_solid();
            return next;
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue(`$giper_baza_yard`);
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "glob", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "master_cursor", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "master_current", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "master_next", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "reconnects", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "master", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "sync", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "sync_news", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "sync_port", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "sync_port_lands", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "ports", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "masters", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "port_lands_active", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "lands_alive", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "port_income", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "face_port_sync", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "sync_land", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "forget_land", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "sync_port_land", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "init_port_land", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "face_port_land", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard, "masters", null);
    $.$giper_baza_yard = $giper_baza_yard;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Kind of Unit */
    let $giper_baza_unit_kind;
    (function ($giper_baza_unit_kind) {
        /** Unit of data. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["sand"] = $giper_baza_slot_kind.sand] = "sand";
        /** Rights/Keys sharing. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["gift"] = $giper_baza_slot_kind.gift] = "gift";
        /** Sign for hash list. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["seal"] = $giper_baza_slot_kind.seal] = "seal";
        /** Public key. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["pass"] = $giper_baza_slot_kind.pass] = "pass";
    })($giper_baza_unit_kind = $.$giper_baza_unit_kind || ($.$giper_baza_unit_kind = {}));
    $.$giper_baza_unit_trusted = new WeakSet();
    function $giper_baza_unit_trusted_grant(unit) {
        if (unit instanceof $giper_baza_auth_pass)
            return;
        $.$giper_baza_unit_trusted.add(unit);
    }
    $.$giper_baza_unit_trusted_grant = $giper_baza_unit_trusted_grant;
    function $giper_baza_unit_trusted_check(unit) {
        if (unit instanceof $giper_baza_auth_pass)
            return true;
        return $.$giper_baza_unit_trusted.has(unit);
    }
    $.$giper_baza_unit_trusted_check = $giper_baza_unit_trusted_check;
    /** Order units: lord / seal / gift / sand */
    function $giper_baza_unit_sort(units) {
        const nodes = new Map();
        const graph = new $mol_graph();
        for (const unit of units) {
            if (unit instanceof $giper_baza_auth_pass) {
                nodes.set(unit.lord().str, unit);
            }
            else {
                if (unit instanceof $giper_baza_unit_sand && !unit.encoded())
                    continue;
                const self = unit.hash().str;
                nodes.set(self, unit);
            }
        }
        for (const unit of units) {
            if (unit instanceof $giper_baza_auth_pass)
                continue;
            unit.choose({
                gift: gift => {
                    graph.link(gift, nodes.get(gift.lord().str) ?? null, 1); // gift => lord
                    graph.link(gift, null, 0); // gift -> every
                    if (gift.lord().str === gift.mate().str)
                        return;
                    graph.link(nodes.get(gift.mate().str) ?? null, gift, 1); // mate => gift
                },
                sand: sand => {
                    graph.link(sand, nodes.get(sand.lord().str) ?? null, 1); // sand => lord
                    graph.link(sand, null, 1); // sand => every
                },
                seal: seal => {
                    graph.link(seal, nodes.get(seal.lord().str) ?? null, 0); // seal -> lord
                    graph.link(seal, null, 0); // seal -> every
                    for (const hash of seal.hash_list()) {
                        graph.link(nodes.get(hash.str) ?? null, seal, 1); // unit => seal
                    }
                }
            });
        }
        graph.acyclic(e => e);
        return [...graph.sorted].filter(Boolean);
    }
    $.$giper_baza_unit_sort = $giper_baza_unit_sort;
    /** Minimal independent stable part of information. */
    class $giper_baza_unit_base extends $mol_buffer {
        /**
         * Compare Seals on timeline ( right - left )
         * Priority: time > lord > tick
         */
        static compare(left, right) {
            if (!left && !right)
                return 0;
            if (!left)
                return +1;
            if (!right)
                return -1;
            return (right.time() - left.time())
                || $giper_baza_link_compare(left.lord(), right.lord())
                || (right.tick() - left.tick());
        }
        static narrow(buf) {
            const kind = $giper_baza_unit_kind[new $mol_buffer(buf).uint8(0)];
            const Type = {
                sand: $giper_baza_unit_sand,
                gift: $giper_baza_unit_gift,
                seal: $giper_baza_unit_seal,
                pass: $giper_baza_auth_pass,
            }[kind];
            return new Type(buf);
        }
        constructor(buffer, byteOffset = 0, byteLength = buffer.byteLength) {
            super(buffer, byteOffset, byteLength);
        }
        kind(next) {
            const val = this.uint8(0, next && $giper_baza_unit_kind[next]);
            const kind = $giper_baza_unit_kind[val];
            if (kind)
                return kind;
            $mol_fail(new Error(`Unknown unit kind (${val})`));
        }
        choose(ways) {
            return ways[this.kind()](this);
        }
        path() {
            throw new Error('Unimplemented');
        }
        id6(offset, next) {
            if (next === undefined) {
                return $giper_baza_link.from_bin(new Uint8Array(this.buffer, this.byteOffset + offset, 6));
            }
            else {
                const bin = next.toBin();
                if (bin.byteLength === 0)
                    return next;
                if (bin.byteLength !== 6)
                    $mol_fail(new Error(`Wrong Link size (${next})`));
                this.asArray().set(bin, this.byteOffset + offset);
                return next;
            }
        }
        id12(offset, next) {
            if (next === undefined) {
                return $giper_baza_link.from_bin(new Uint8Array(this.buffer, this.byteOffset + offset, 12));
            }
            else {
                const bin = next.toBin();
                if (bin.byteLength === 0)
                    return next;
                if (bin.byteLength !== 12)
                    $mol_fail(new Error(`Wrong Link size (${next})`));
                this.asArray().set(bin, this.byteOffset + offset);
                return next;
            }
        }
        /** Seconds from UNIX epoch */
        time(next) {
            return this.uint32(4, next);
        }
        moment() {
            return new $mol_time_moment(Number(this.time() * 1000));
        }
        /** Step in transaction */
        tick(next) {
            return this.uint16(2, next);
        }
        /** Monotonic Real+Logic Time */
        time_tick(next) {
            if (!next)
                return this.tick() + this.time() * 2 ** 16;
            this.tick(next % 2 ** 16);
            this.time(Math.floor(next / 2 ** 16));
            return next;
        }
        _lord = null;
        lord(next) {
            if (next)
                return this._lord = this.id12(8, next);
            return this._lord ?? (this._lord = this.id12(8));
        }
        /** Unique number for encryption */
        salt() {
            return new Uint8Array(this.buffer, this.byteOffset + 2, 16); /* tick(2), time(4), lord(10) */
        }
        hash() {
            return $giper_baza_link.hash_bin(this.asArray());
        }
        tier_min() {
            return $giper_baza_rank_tier.rule;
        }
        encoded() {
            return true;
        }
        _land = null;
        _alive = false;
        dump() {
            return {};
        }
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return this.inspect();
        }
        inspect() {
            const hash = $mol_term_color.cyan('#' + this.hash().str);
            const lord = $mol_term_color.magenta('@' + this.lord().str);
            const time = $mol_term_color.gray($giper_baza_time_dump(this.time(), this.tick()));
            return `${lord} ${hash} ${time}`;
        }
        toJSON() {
            return this.toString();
        }
        toString() {
            const hash = '#' + this.hash().str;
            const lord = '@' + this.lord().str;
            const time = $giper_baza_time_dump(this.time(), this.tick());
            return `${lord} ${hash} ${time}`;
        }
    }
    $.$giper_baza_unit_base = $giper_baza_unit_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_unit_gift_sort(gifts) {
        const dict = new Map();
        const graph = new $mol_graph();
        for (const gift of gifts) {
            const key = gift.mate().str;
            dict.set(key, gift);
            graph.link(key, gift.lord().str);
            graph.link(key, '');
        }
        graph.acyclic(() => 1);
        const keys = [...graph.sorted];
        return keys.map(key => dict.get(key)).filter(Boolean);
    }
    $.$giper_baza_unit_gift_sort = $giper_baza_unit_gift_sort;
    /** Given Rank and Secret */
    class $giper_baza_unit_gift extends $giper_baza_unit_base {
        static length() {
            return 48;
        }
        static make() {
            const sand = this.from(this.length());
            sand.kind('gift');
            return sand;
        }
        rank(next) {
            if (next !== undefined)
                this.uint8(0, $giper_baza_unit_kind.gift);
            const res = this.uint8(1, next);
            if (res < $giper_baza_rank_deny || res > $giper_baza_rank_rule) {
                $mol_fail(new RangeError(`Wrong rank ${res}`));
            }
            return res;
        }
        tier() {
            return (this.rank() & $giper_baza_rank_tier.rule);
        }
        rate() {
            return (this.rank() & $giper_baza_rank_rate.just);
        }
        mate(next) {
            return this.id12(20, next);
        }
        path() {
            return `gift:${this.mate().str || '______every______'}`;
        }
        _code;
        code() {
            return this._code ?? (this._code = new Uint8Array(this.buffer, this.byteOffset + 32, 16));
        }
        code_exists() {
            return this.code().some(b => b);
        }
        dump() {
            return {
                kind: this.kind(),
                lord: this.lord(),
                mate: this.mate(),
                tier: $giper_baza_rank_tier[this.tier()],
                rate: this.rate(),
                time: this.moment().toString('YYYY-MM-DD hh:mm:ss'),
            };
        }
        tier_min() {
            return $giper_baza_rank_tier.rule;
        }
        inspect() {
            const mate = $mol_term_color.magenta('@' + (this.mate().str || '______every______'));
            const read = $mol_term_color.green(this.code().some(v => v) ? 'X' : 'O');
            const rank = $mol_term_color.cyan($giper_baza_rank_tier[this.tier()] + ':' + this.rate().toString(16).toUpperCase());
            return `${super.inspect()} ${read} ${mate} ${rank}`;
        }
        toString() {
            const mate = '@' + (this.mate().str || '______every______');
            const read = this.code().some(v => v) ? 'X' : 'O';
            const rank = $giper_baza_rank_tier[this.tier()] + ':' + this.rate().toString(16).toUpperCase();
            return `${super.toString()} ${read} ${mate} ${rank}`;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' 🏅', ' ', $mol_dev_format_shade($giper_baza_time_dump(this.time(), this.tick())), ' #', $mol_dev_format_auto(this.hash()), ' 👾', $mol_dev_format_accent(this.mate().str || '______every______'), this.code().some(v => v) ? ' 🔐' : ' 👀', $giper_baza_rank_tier[this.tier()], ':', this.rate().toString(16).toUpperCase());
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_unit_gift, "make", null);
    $.$giper_baza_unit_gift = $giper_baza_unit_gift;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_unit_seal_limit = 10;
    /**  Sign for hash list */
    class $giper_baza_unit_seal extends $giper_baza_unit_base {
        static length(size) {
            return Math.ceil((84 + size * 12) / 8) * 8;
        }
        static make(size, wide) {
            const seal = this.from(this.length(size));
            seal.kind('seal');
            seal.meta({ size, wide });
            return seal;
        }
        meta(next) {
            return this.uint8(1, next && (next.size | (next.wide ? 0b1000_0000 : 0)));
        }
        size() {
            return this.meta() & 0b1111;
        }
        wide() {
            return Boolean(this.meta() & 0b1000_0000);
        }
        alive_items = new Set;
        alive_full() {
            return this.alive_items.size === $.$giper_baza_unit_seal_limit;
        }
        alive_list() {
            const alive = this.alive_items;
            return this.hash_list().filter(hash => alive.has(hash.str));
        }
        hash_item(index, next) {
            return this.id12(20 + index * 12, next);
        }
        _hash_list;
        hash_list(next) {
            if (next) {
                for (let i = 0; i < next.length; ++i) {
                    this.hash_item(i, next[i]);
                }
                // this.size( next.length )
                return this._hash_list = next;
            }
            else {
                const list = [];
                const count = this.size();
                for (let i = 0; i < count; ++i) {
                    list.push(this.hash_item(i));
                }
                return this._hash_list = list;
            }
        }
        /** Hash for signing. */
        shot() {
            return $giper_baza_link.hash_bin(new Uint8Array(this.buffer, this.byteOffset, this.byteLength - 64));
        }
        sign(next) {
            const buf = new Uint8Array(this.buffer, this.byteOffset + this.byteLength - 64, 64);
            if (next)
                buf.set(next);
            return buf;
        }
        // @ $mol_memo.method
        work() {
            let int = new Uint32Array(this.hash().toBin().buffer)[0];
            let count = 0;
            while (int & 1) {
                int >>>= 1;
                ++count;
            }
            return count;
        }
        rate_min() {
            return $giper_baza_rank_work_rates[this.work()];
        }
        tier_min() {
            return $giper_baza_rank_tier.post;
        }
        rank_min() {
            return this.tier_min() | this.rate_min();
        }
        path() {
            return `seal:${this.lord()}/${this.hash().str}`;
        }
        inspect() {
            const items = this.hash_list().map(hash => $mol_term_color.cyan('#' + hash.str)).join(', ');
            const kind = $mol_term_color.green('%');
            return `${super.inspect()} ${kind} ${items}`;
        }
        toString() {
            const items = this.hash_list().map(hash => '#' + hash.str).join(', ');
            return `${super.toString()} % ${items}`;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' ✍ ', $mol_dev_format_shade($giper_baza_time_dump(this.time(), this.tick())), ' #', $mol_dev_format_auto(this.hash()), ' ', $mol_dev_format_auto(this.hash_list()));
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_unit_seal.prototype, "sign", null);
    __decorate([
        $mol_action
    ], $giper_baza_unit_seal, "make", null);
    $.$giper_baza_unit_seal = $giper_baza_unit_seal;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Hint how interpret inner Units: term, solo, vals, keys */
    let $giper_baza_unit_sand_tag;
    (function ($giper_baza_unit_sand_tag) {
        /** Itself value. Ignore */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["term"] = 0] = "term";
        /** Value in first sub node. Ignore all after first */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["solo"] = 64] = "solo";
        /** List of values */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["vals"] = 128] = "vals";
        /** List of keys */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["keys"] = 192] = "keys";
    })($giper_baza_unit_sand_tag = $.$giper_baza_unit_sand_tag || ($.$giper_baza_unit_sand_tag = {}));
    /** Data. Actually it's edge between nodes in graph model. */
    class $giper_baza_unit_sand extends $giper_baza_unit_base {
        static size_equator = 63;
        static size_max = 2 ** 16;
        _vary = undefined;
        _open = null;
        static length(size) {
            if (size > 2 ** 16)
                throw new Error(`Size too large (${size})`);
            return size > $giper_baza_unit_sand.size_equator ? 52 : Math.ceil((38 + size) / 8) * 8;
        }
        static length_ball(size) {
            if (size > 2 ** 16)
                throw new Error(`Size too large (${size})`);
            return size > $giper_baza_unit_sand.size_equator ? Math.ceil((size - 4) / 8) * 8 + 4 : 0;
        }
        static make(size, tag = 'term') {
            if (size >= 2 ** 16)
                throw new Error(`Size too large (${size})`);
            const sand = this.from(this.length(size));
            sand.kind('sand');
            if (size > $giper_baza_unit_sand.size_equator) {
                sand.uint16(38, size % 2 ** 16);
                size = 0;
            }
            sand.uint8(1, size | $giper_baza_unit_sand_tag[tag]);
            return sand;
        }
        tag() {
            return $giper_baza_unit_sand_tag[this.uint8(1) & 0b11_00_0000];
        }
        big() {
            return this.size() > $giper_baza_unit_sand.size_equator;
        }
        size() {
            let hint = this.uint8(1) & 0b111_111;
            return hint || this.uint16(38) || 2 ** 16;
        }
        dead() {
            if (this._vary === null)
                return true;
            if (this.size() > 1)
                return false;
            if (this.uint8(38) !== 78 /*N*/)
                return false;
            return true;
        }
        _self;
        self(next) {
            if (next === undefined && this._self !== undefined)
                return this._self;
            else
                return this._self = this.id6(20, next);
        }
        _head;
        head(next) {
            if (next === undefined && this._head !== undefined)
                return this._head;
            else
                return this._head = this.id6(26, next);
        }
        _lead;
        lead(next) {
            if (next === undefined && this._lead !== undefined)
                return this._lead;
            else
                return this._lead = this.id6(32, next);
        }
        path() {
            return `sand:${this.head().str || '__root__'}/${this.lord()}/${this.self().str || '__meta__'}`;
        }
        _shot;
        shot(next) {
            if (!this.big())
                throw new Error('Access to Shot of small Sand is unavailable');
            if (next)
                return this._shot = this.id12(40, next);
            else
                return this._shot = this._shot ?? this.id12(40);
        }
        _data;
        data(next) {
            if (this.big())
                throw new Error('Access to Data of large Sand is unavailable');
            const data = this._data ?? new Uint8Array(this.buffer, this.byteOffset + 38, this.size());
            if (next)
                data.set(next);
            return data;
        }
        _ball;
        ball(next) {
            if (next === undefined) {
                if (this._ball)
                    return this._ball;
                if (this.big())
                    return this._ball;
                return this._ball = this.data();
            }
            else {
                if (this.big()) {
                    this.shot($giper_baza_link.hash_bin(next));
                    return this._ball = next;
                }
                else {
                    return this._ball = this.data(next);
                }
            }
        }
        encoded() {
            return !this._open || !!this._ball;
        }
        hash() {
            if (!this.encoded())
                return $mol_fail(new Error('No Hash for incompleted Sand', { cause: { sand: this } }));
            return super.hash();
        }
        idea_seed() {
            return $mol_hash_numbers(new Uint8Array(this.buffer, this.byteOffset + 26, 12)); // head + lead
        }
        dump() {
            return {
                kind: this.kind(),
                lord: this.lord(),
                lead: this.lead(),
                head: this.head(),
                self: this.self(),
                tag: this.tag(),
                size: this.size(),
                time: this.moment().toString('YYYY-MM-DD hh:mm:ss'),
            };
        }
        tier_min() {
            return (this.head().str === $giper_baza_land_root.tine.str)
                ? $giper_baza_rank_tier.pull
                : $giper_baza_rank_tier.post;
        }
        inspect() {
            const lead = $mol_term_color.blue(this.lead().str || '__knot__');
            const head = $mol_term_color.blue(this.head().str || '__root__');
            const self = $mol_term_color.blue(this.self().str || '__meta__');
            const tag = $mol_term_color.green({
                term: 'T',
                solo: 'S',
                vals: 'V',
                keys: 'K',
            }[this.tag()]);
            const vary = this._vary === undefined ? '' : $mol_term_color.yellow(String(this._vary));
            return `${super.inspect()} ${tag} ${lead}\\${head}/${self} ${vary}`;
        }
        toString() {
            const lead = this.lead().str || '__knot__';
            const head = this.head().str || '__root__';
            const self = this.self().str || '__meta__';
            const tag = {
                term: 'T',
                solo: 'S',
                vals: 'V',
                keys: 'K',
            }[this.tag()];
            const vary = this._vary === undefined ? '' : String(this._vary);
            return `${super.toString()} ${tag} ${lead}\\${head}/${self} ${vary}`;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' 📦 ', $mol_dev_format_shade($giper_baza_time_dump(this.time(), this.tick())), ' #', this.encoded() ? $mol_dev_format_auto(this.hash()) : $mol_dev_format_shade('___incompleted___'), ' ', this.lead().str || '__knot__', $mol_dev_format_shade('\\'), $mol_dev_format_accent(this.head().str || '__root__'), $mol_dev_format_shade('/'), this.self().str || '__meta__', ' ', {
                term: '💼',
                solo: '1️⃣',
                vals: '🎹',
                keys: '🔑',
            }[this.tag()], ' ', $mol_dev_format_auto(this._vary));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_unit_sand, "make", null);
    $.$giper_baza_unit_sand = $giper_baza_unit_sand;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_mine_temp extends $mol_object {
        static land(land) {
            return this.make({
                land: $mol_const(land)
            });
        }
        land() {
            return $giper_baza_link.hole;
        }
        unit_deletes = 0;
        unit_inserts = 0;
        ball_inserts = 0;
        ball_deletes = 0;
        units_persisted = new WeakSet();
        /** Updates Units in storage */
        units_save(diff) { }
        /** Loads Units from storage */
        units_load() {
            return [];
        }
        /** Loads Ball from storage */
        ball_load(sand) {
            return null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_mine_temp, "land", null);
    $.$giper_baza_mine_temp = $giper_baza_mine_temp;
    $.$giper_baza_mine = $giper_baza_mine_temp;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Atomic transaction. */
    class $giper_baza_mine_fs_yym_act extends $mol_object2 {
        yym;
        constructor(yym) {
            super();
            this.yym = yym;
        }
        transaction;
        offsets_del = new WeakMap;
        offsets_ins = new WeakMap;
        /** Stores data and returns offset in file. */
        save(...data) {
            let offset = this.offsets_ins.get(data[0].buffer);
            if (offset === undefined) {
                offset = this.yym.offsets().get(data[0].buffer);
                if (offset)
                    return offset;
                let size = data.reduce((sum, buf) => sum + buf.byteLength, 0);
                size = Math.ceil(size / 8) * 8;
                offset = this.yym.pool().acquire(size);
                this.offsets_ins.set(data[0].buffer, offset);
                this.yym.offsets().set(data[0].buffer, offset);
            }
            this.transaction.write({
                buffer: data,
                position: offset,
            });
            return offset;
        }
        /** Marks slice of file as free. */
        free(data, size = data.byteLength) {
            size = Math.ceil(size / 8) * 8;
            let offset = this.offsets_del.get(data.buffer);
            if (offset === undefined) {
                offset = this.yym.offsets().get(data.buffer);
                if (!offset) {
                    return $mol_fail(new Error('Try to free non saved', { cause: { data, size } }));
                }
                this.offsets_del.set(data.buffer, offset);
                this.yym.pool().release(offset, size);
                this.yym.offsets().delete(data.buffer);
            }
            this.transaction.write({
                buffer: new Uint8Array(size),
                position: offset,
            });
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_mine_fs_yym_act.prototype, "save", null);
    __decorate([
        $mol_action
    ], $giper_baza_mine_fs_yym_act.prototype, "free", null);
    $.$giper_baza_mine_fs_yym_act = $giper_baza_mine_fs_yym_act;
    /** Yin-Yan Mirrors Storage. */
    class $giper_baza_mine_fs_yym extends $mol_object2 {
        sides;
        /** Memory allocator. */
        pool(reset) {
            $mol_wire_solid();
            return new $mol_memory_pool;
        }
        /** Offsets of stored buffers. */
        offsets(reset) {
            $mol_wire_solid();
            return new Map;
        }
        constructor(
        /** Yin & Yan mirrors files. */
        sides) {
            super();
            this.sides = sides;
        }
        destructor() {
            if (!this.sides[1].exists())
                return;
            this.sides[1].open('write_only').flush();
            this.sides[0].exists(false);
            this.pool(null);
            this.offsets(null);
        }
        /** Prepare mirrors to read. */
        load_init() {
            const version = (file) => file.modified()?.valueOf() ?? 0;
            if (version(this.sides[0]) < version(this.sides[1]))
                this.sides.reverse();
        }
        /** Load whole data. */
        load() {
            this.load_init();
            try {
                const tx = this.sides[0].open('read_only');
                const data = tx.read();
                tx.destructor();
                this.pool().acquire(Math.ceil(data.byteLength / 8) * 8);
                return data;
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    return new Uint8Array();
                return $mol_fail_hidden(error);
            }
        }
        /** Safe writes to both mirrors. */
        atomic(task) {
            this.save_init();
            const act = new $giper_baza_mine_fs_yym_act(this);
            const tx1 = act.transaction = this.sides[1].open('create', 'write_only');
            task(act);
            tx1.flush();
            tx1.destructor();
            this.sides.reverse();
            const tx2 = act.transaction = this.sides[1].open('create', 'write_only');
            task(act);
            tx2.destructor();
        }
        /** Prepares mirrors to write. */
        save_init() {
            $mol_wire_solid();
            this.load_init();
            if (this.sides[1].exists()) {
                $mol_wire_sync(this.$).$mol_log3_rise({
                    place: this,
                    message: 'Reset mirror',
                    file: this.sides[1].path(),
                });
            }
            this.sides[0].clone(this.sides[1].path());
        }
        empty() {
            this.load_init();
            return this.pool().empty();
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_mine_fs_yym.prototype, "pool", null);
    __decorate([
        $mol_mem
    ], $giper_baza_mine_fs_yym.prototype, "offsets", null);
    __decorate([
        $mol_mem,
        $mol_action
    ], $giper_baza_mine_fs_yym.prototype, "load_init", null);
    __decorate([
        $mol_mem
    ], $giper_baza_mine_fs_yym.prototype, "save_init", null);
    $.$giper_baza_mine_fs_yym = $giper_baza_mine_fs_yym;
    class $giper_baza_mine_fs extends $giper_baza_mine_temp {
        store() {
            $mol_wire_solid();
            const land = this.land();
            const area = land.area();
            const root = this.$.$mol_file.relative('.baza');
            let dir = root.resolve(land.str.slice(0, 2));
            if (area.str)
                dir = dir.resolve(area.str.slice(-2));
            dir.exists(true);
            return new $giper_baza_mine_fs_yym([
                dir.resolve(land.str + '.yin.baza'),
                dir.resolve(land.str + '.yan.baza'),
            ]);
        }
        store_init() {
            if (!this.store().empty())
                return;
            const head = $giper_baza_pack.make([[this.land().str, new $giper_baza_pack_part]]);
            this.store().atomic(side => side.save(head));
        }
        units_save(diff) {
            this.store_init();
            this.store().atomic(side => {
                for (const unit of diff.del) {
                    if (unit instanceof $giper_baza_unit_sand && unit.big()) {
                        side.free(unit, unit.byteLength + unit.size());
                    }
                    else {
                        side.free(unit);
                    }
                }
                for (const unit of diff.ins) {
                    if (unit instanceof $giper_baza_unit_sand && unit.big())
                        side.save(unit, unit.ball());
                    else
                        side.save(unit);
                }
            });
            for (const unit of diff.ins) {
                this.units_persisted.add(unit);
            }
        }
        units_load() {
            this.store().pool(null);
            const buf = this.store().load();
            if (!buf.length)
                return [];
            const pack = $giper_baza_pack.from(buf);
            const parts = new Map(pack.parts(this.store().offsets(), this.store().pool()));
            if (parts.size > 1)
                return $mol_fail(new Error('Wrong lands count', { cause: { count: parts.size } }));
            for (const [land, part] of parts) {
                if (land !== this.land().str)
                    return $mol_fail(new Error('Unexpected land', { cause: { expected: this.land().str, existen: land } }));
                for (const unit of part.units) {
                    this.units_persisted.add(unit);
                    // $giper_baza_unit_trusted_grant( unit )
                }
                return part.units;
            }
            return [];
        }
        destructor() {
            this.store().destructor();
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_mine_fs.prototype, "store", null);
    __decorate([
        $mol_mem
    ], $giper_baza_mine_fs.prototype, "store_init", null);
    __decorate([
        $mol_action
    ], $giper_baza_mine_fs.prototype, "units_save", null);
    __decorate([
        $mol_action
    ], $giper_baza_mine_fs.prototype, "units_load", null);
    $.$giper_baza_mine_fs = $giper_baza_mine_fs;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_mine = $giper_baza_mine_fs;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Virtual Pawn that represents contained units as high-level data types. */
    class $giper_baza_pawn extends $mol_object {
        static tag = 'vals';
        static meta = null;
        /** Standalone part of Glob which syncs separately, have own rights, and contains Units */
        land() {
            return null;
        }
        /** Land local Pawn id */
        head() {
            return $giper_baza_link.hole;
        }
        /** Link to Land/Lord. */
        land_link() {
            return this.land()?.link() ?? this.$.$giper_baza_auth.current().pass().lord();
        }
        /** Link to Pawn/Land/Lord. */
        link() {
            return new $giper_baza_link('___' + this.head()).resolve(this.land_link());
        }
        toJSON() {
            return this.link().str;
        }
        /** Returns another representation of this Pawn. */
        cast(Pawn) {
            return this.land().Pawn(Pawn).Head(this.head());
        }
        /** Ordered inner alive Pawn. */
        pawns(Pawn) {
            const land = this.land();
            const map = {
                term: () => land.Pawn(Pawn || $giper_baza_atom),
                solo: () => land.Pawn(Pawn || $giper_baza_atom),
                vals: () => land.Pawn(Pawn || $giper_baza_list),
                keys: () => land.Pawn(Pawn || $giper_baza_dict),
            };
            return this.units().map(unit => map[unit.tag()]().Head(unit.self()));
        }
        /** All ordered alive Units */
        units() {
            return this.units_of($giper_baza_link.hole);
        }
        units_of(peer) {
            const head = this.head();
            const units = this.land().sand_ordered({ head, peer }).filter(unit => !unit.dead() && unit.self().str !== '');
            this.land().sands_open(units);
            return units;
        }
        meta(next) {
            const prev = this.meta_of($giper_baza_link.hole);
            if (!next)
                return prev;
            if (prev?.str === next?.str)
                return prev;
            const head = this.head();
            this.land().post($giper_baza_link.hole, head, $giper_baza_link.hole, next);
            return next;
        }
        meta_of(peer) {
            const head = this.head();
            const unit = this.land().sand_ordered({ head, peer }).find(unit => !unit.dead() && unit.self().str === '') ?? null;
            if (unit)
                this.land().sands_open([unit]);
            return unit ? $giper_baza_link_schema.cast(this.land().sand_decode(unit)) : null;
        }
        filled() {
            return this.units().length > 0;
        }
        /** Ability to make changes by current peer. */
        can_change() {
            return this.land().pass_rank(this.land().auth().pass()) >= $giper_baza_rank_post('late');
        }
        /** Time of last changed unit inside Pawn subtree */
        last_change() {
            const land = this.land();
            let last = 0;
            const visit = (sand) => {
                if (sand.time() > last)
                    last = sand.time();
                if (sand.tag() === 'term')
                    return;
                land.Pawn($giper_baza_pawn).Head(sand.self()).units().forEach(visit);
            };
            this.units().forEach(visit);
            return last ? $giper_baza_time_moment(last) : null;
        }
        /** All author Passes of Pawn subtree */
        authors() {
            const land = this.land();
            const peers = new Set();
            const visit = (sand) => {
                peers.add(land.lord_pass(sand.lord()));
                if (sand.tag() === 'term')
                    return;
                land.Pawn($giper_baza_pawn).Head(sand.self()).units_of(null).forEach(visit);
            };
            this.units_of(null).forEach(visit);
            return [...peers];
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head());
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_pawn.prototype, "link", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "cast", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "pawns", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "units_of", null);
    __decorate([
        $mol_mem
    ], $giper_baza_pawn.prototype, "meta", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "meta_of", null);
    __decorate([
        $mol_mem
    ], $giper_baza_pawn.prototype, "last_change", null);
    __decorate([
        $mol_mem
    ], $giper_baza_pawn.prototype, "authors", null);
    $.$giper_baza_pawn = $giper_baza_pawn;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_reconcile({ prev, from, to, next, equal, drop, insert, update, replace, }) {
        if (!update)
            update = (next, prev, lead) => prev;
        if (!replace)
            replace = (next, prev, lead) => insert(next, drop(prev, lead));
        if (to > prev.length)
            to = prev.length; // $mol_fail( new RangeError( `To(${ to }) greater then length(${ prev.length })` ) )
        if (from > to)
            from = to; // $mol_fail( new RangeError( `From(${ to }) greater then to(${ to })` ) )
        let p = from;
        let n = 0;
        let lead = p ? prev[p - 1] : null;
        while (p < to || n < next.length) {
            if (p < to && n < next.length && equal(next[n], prev[p])) {
                lead = update(next[n], prev[p], lead);
                ++p;
                ++n;
            }
            else if (next.length - n > to - p) {
                lead = insert(next[n], lead);
                ++n;
            }
            else if (next.length - n < to - p) {
                lead = drop(prev[p], lead);
                ++p;
            }
            else {
                lead = replace(next[n], prev[p], lead);
                ++p;
                ++n;
            }
        }
    }
    $.$mol_reconcile = $mol_reconcile;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_boolean extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'boolean')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static default = false;
    }
    $.$mol_schema_boolean = $mol_schema_boolean;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_float extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'number')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static default = Number.NaN;
    }
    $.$mol_schema_float = $mol_schema_float;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_integer extends $mol_schema_float {
        $mol_schema_integer = true;
        static guard(value) {
            const val = super.guard(value);
            if (!Number.isFinite(val))
                return $mol_fail(new TypeError('Non finite', { cause: { value, schema: this } }));
            if (Math.trunc(val) !== val)
                return $mol_fail(new TypeError('Non integer', { cause: { value, schema: this } }));
            return val;
        }
        static default = 0;
    }
    $.$mol_schema_integer = $mol_schema_integer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_bigint extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'bigint')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static cast(value) {
            if (typeof value === 'number')
                return BigInt($mol_schema_integer.cast(value));
            return super.cast(value);
        }
        static default = 0n;
    }
    $.$mol_schema_bigint = $mol_schema_bigint;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_string extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'string')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static cast(value) {
            return super.cast(value);
        }
        static default = '';
    }
    $.$mol_schema_string = $mol_schema_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_dict = $mol_memo_key.func(function $mol_schema_dict(Pair) {
        return class $mol_schema_dict_ extends $mol_schema_any {
            static Pair = Pair;
            static toString() {
                if (this !== $mol_schema_dict_)
                    return super.toString();
                return '$mol_schema_dict<' + $mol_key(Pair) + '>';
            }
            static guard(value) {
                if (Object.getPrototypeOf(Object.getPrototypeOf(value))) {
                    return $mol_fail(new TypeError('Non dictionary', { cause: { value, schema: this } }));
                }
                for (const key in value) {
                    try {
                        Pair[0].guard(key);
                    }
                    catch (error) {
                        return $mol_fail(new TypeError('Wrong key', { cause: { key, error, value, schema: this } }));
                    }
                    try {
                        Pair[1].guard(value[key]);
                    }
                    catch (error) {
                        return $mol_fail(new TypeError('Wrong val', { cause: { key, error, value, schema: this } }));
                    }
                }
                return value;
            }
            static cast(value) {
                if (Object.getPrototypeOf(Object.getPrototypeOf(value)))
                    return this.default;
                const res = {};
                for (const key in value) {
                    if (!Pair[0].check(key))
                        continue;
                    res[key] = Pair[1].cast(value[key]);
                }
                return res;
            }
            static default = {};
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_list = $mol_memo_key.func(function $mol_schema_list(Item) {
        return class $mol_schema_list_ extends $mol_schema_any {
            static Item = Item;
            static toString() {
                if (this !== $mol_schema_list_)
                    return super.toString();
                return '$mol_schema_list<' + $mol_key(Item) + '>';
            }
            static guard(value) {
                if (!Array.isArray(value))
                    return $mol_fail(new TypeError('Non array', { cause: { value, schema: this } }));
                for (const [index, item] of super.guard(value).entries()) {
                    try {
                        Item.guard(item);
                    }
                    catch (error) {
                        return $mol_fail(new TypeError('Wrong item', { cause: { index, error, value, schema: this } }));
                    }
                }
                return value;
            }
            static cast(value) {
                if (!Array.isArray(value))
                    return this.default;
                return value.map(item => Item.cast(item));
            }
            static default = [];
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive convergent list. */
    class $giper_baza_list extends $giper_baza_pawn {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.vals];
        /** All Vary in the list. */
        items_vary(next, tag = 'term') {
            const units = this.units();
            if (next === undefined)
                return units.map(unit => this.land().sand_decode(unit));
            this.splice(next, 0, units.length, tag);
            return this.items_vary();
        }
        /** Replace sublist by new one with reconciliation. */
        splice(next, from = this.units().length, to = from, tag = 'term') {
            const land = this.land();
            $mol_reconcile({
                prev: this.units(),
                from,
                to,
                next,
                equal: (next, prev) => $mol_compare_deep(this.land().sand_decode(prev), next),
                drop: (prev, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, prev.head(), prev.self(), null),
                insert: (next, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, this.head(), land.self_make(), next, tag),
                replace: (next, prev, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, prev.head(), prev.self(), next, prev.tag()),
            });
        }
        /** Unit by Vary. */
        find(vary) {
            for (const unit of this.units()) {
                if ($mol_compare_deep(this.land().sand_decode(unit), vary))
                    return unit;
            }
            return null;
        }
        /** Existence of Vary in the list. */
        has(vary, next, tag = 'term') {
            if (next === undefined)
                return Boolean(this.find(vary));
            if (next)
                this.add(vary, tag);
            else
                this.cut(vary);
            return next;
        }
        /** Add Vary a the beginning if it doesn't exists. */
        add(vary, tag = 'term') {
            if (this.has(vary))
                return;
            this.land().post($giper_baza_link.hole, this.head(), null, vary, tag);
        }
        /** Removes all Vary presence. */
        cut(vary) {
            const units = [...this.units()];
            for (let i = 0; i < units.length; ++i) {
                if (!$mol_compare_deep(this.land().sand_decode(units[i]), vary))
                    continue;
                this.land().post(units[i - 1]?.self() ?? $giper_baza_link.hole, units[i].head(), units[i].self(), null);
                units.splice(i, 1);
                --i;
            }
        }
        /** Moves item from one Seat to another. */
        move(from, to) {
            this.land().sand_move(this.units()[from], this.head(), to);
        }
        /** Remove item by Seat. */
        wipe(seat) {
            this.land().sand_wipe(this.units()[seat]);
        }
        /** Add vary at the end and use maked Self as Pawn Head. */
        pawn_make(Pawn, vary, tag = 'term') {
            this.splice([vary], undefined, undefined, tag);
            return this.land().Pawn(Pawn).Head(this.units().at(-1).self());
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(this.items_vary()));
        }
        /** Mergeable list of atomic vary type factory */
        static of(init) {
            const Item = $mol_schema_instance(init);
            class $giper_baza_list_of extends $giper_baza_list {
                static Item = Item;
                items(next) {
                    if (next === undefined)
                        return this.items_vary().map(item => Item.cast(item));
                    for (const item of next)
                        Item.guard(item);
                    this.items_vary(next);
                    return this.items();
                }
                static toString() {
                    return this === $giper_baza_list_of ? '$giper_baza_list.of<' + Item + '>' : super.toString();
                }
            }
            __decorate([
                $mol_mem
            ], $giper_baza_list_of.prototype, "items", null);
            return $giper_baza_list_of;
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_list.prototype, "items_vary", null);
    __decorate([
        $mol_action
    ], $giper_baza_list.prototype, "splice", null);
    __decorate([
        $mol_memo_key.method
    ], $giper_baza_list, "of", null);
    $.$giper_baza_list = $giper_baza_list;
    /** Mergeable list of atomic buffers */
    class $giper_baza_list_bin extends $giper_baza_list.of(Uint8Array) {
    }
    $.$giper_baza_list_bin = $giper_baza_list_bin;
    /** Mergeable list of atomic booleans */
    class $giper_baza_list_bool extends $giper_baza_list.of($mol_schema_boolean) {
    }
    $.$giper_baza_list_bool = $giper_baza_list_bool;
    /** Mergeable list of atomic big integers */
    class $giper_baza_list_int extends $giper_baza_list.of($mol_schema_bigint) {
    }
    $.$giper_baza_list_int = $giper_baza_list_int;
    /** Mergeable list of atomic floats */
    class $giper_baza_list_real extends $giper_baza_list.of($mol_schema_float) {
    }
    $.$giper_baza_list_real = $giper_baza_list_real;
    /** Mergeable list of atomic strings */
    class $giper_baza_list_str extends $giper_baza_list.of($mol_schema_string) {
    }
    $.$giper_baza_list_str = $giper_baza_list_str;
    /** Mergeable list of atomic time moments */
    class $giper_baza_list_time extends $giper_baza_list.of($mol_time_moment) {
    }
    $.$giper_baza_list_time = $giper_baza_list_time;
    /** Mergeable list of atomic time durations */
    class $giper_baza_list_dur extends $giper_baza_list.of($mol_time_duration) {
    }
    $.$giper_baza_list_dur = $giper_baza_list_dur;
    /** Mergeable list of atomic time intervals */
    class $giper_baza_list_range extends $giper_baza_list.of($mol_time_interval) {
    }
    $.$giper_baza_list_range = $giper_baza_list_range;
    /** Mergeable list of atomic dictionaries */
    class $giper_baza_list_dict extends $giper_baza_list.of($mol_schema_dict([$mol_schema_string, $mol_schema_any])) {
    }
    $.$giper_baza_list_dict = $giper_baza_list_dict;
    /** Mergeable list of atomic arrays */
    class $giper_baza_list_list extends $giper_baza_list.of($mol_schema_list($mol_schema_any)) {
    }
    $.$giper_baza_list_list = $giper_baza_list_list;
    /** Mergeable list of atomic DOM elements */
    class $giper_baza_list_dom extends $giper_baza_list.of($mol_dom.Element ?? Object) {
    }
    $.$giper_baza_list_dom = $giper_baza_list_dom;
    /** Mergeable list of atomic Trees */
    class $giper_baza_list_tree extends $giper_baza_list.of($mol_tree2) {
    }
    $.$giper_baza_list_tree = $giper_baza_list_tree;
    /** Mergeable list of atomic Links */
    class $giper_baza_list_link extends $giper_baza_list.of($giper_baza_link) {
        /** Mergeable List of atomic Links to some Pawn type */
        static to(Value) {
            class $giper_baza_list_link_to extends $giper_baza_list_link {
                Value = $mol_memo.func(Value);
                static toString() {
                    return this === $giper_baza_list_link_to ? '$giper_baza_list_link_to[ []=> ' + Value() + ' ]' : super.toString();
                }
                /** List of linked Pawns */
                remote_list(next) {
                    const glob = this.$.$giper_baza_glob;
                    const Pawn = Value();
                    return this.items(next?.map(item => item.link()))
                        .map(link => glob.Pawn(link, Pawn));
                }
                remote_add(item) {
                    this.add(item.link());
                }
                /** Make new Pawn and place it at end. */
                make(config) {
                    const Pawn = Value();
                    let pawn;
                    if (config === null || typeof config === 'number') {
                        const self = this.land().self_make(config || undefined);
                        pawn = this.land().Pawn(Pawn).Head(self);
                        this.splice([pawn.link()]);
                    }
                    else if (config instanceof $giper_baza_land) {
                        const land = config.area_make();
                        this.splice([land.link()]);
                        pawn = land.Pawn(Pawn).Data();
                    }
                    else if (config) {
                        const land = this.$.$giper_baza_glob.land_grab(config);
                        this.splice([land.link()]);
                        pawn = land.Pawn(Pawn).Data();
                    }
                    else {
                        return $mol_fail(new Error('Wrong config'));
                    }
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    return pawn;
                }
            }
            __decorate([
                $mol_mem
            ], $giper_baza_list_link_to.prototype, "remote_list", null);
            __decorate([
                $mol_action
            ], $giper_baza_list_link_to.prototype, "remote_add", null);
            __decorate([
                $mol_action
            ], $giper_baza_list_link_to.prototype, "make", null);
            return $giper_baza_list_link_to;
        }
    }
    $.$giper_baza_list_link = $giper_baza_list_link;
    /** @deprecated Use $giper_baza_list_link.to( Target ) */
    function $giper_baza_list_link_to(Value) {
        return $giper_baza_list_link.to(Value);
    }
    $.$giper_baza_list_link_to = $giper_baza_list_link_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Mergeable dictionary Pawn with any keys mapped to any embedded Pawn types */
    class $giper_baza_dict extends $giper_baza_list {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.keys];
        /** List of Vary keys. */
        keys() {
            return this.items_vary();
        }
        /** Inner Pawn by key. */
        dive(key, Pawn, auto) {
            if (this.can_change() && auto !== undefined)
                this.has(key, true, Pawn.tag);
            const unit = this.find(key);
            return unit ? this.land().Pawn(Pawn).Head(unit.self()) : null;
        }
        static schema = {};
        /** Mergeable dictionary Pawn with defined keys mapped to different embedded Pawn types */
        static with(schema, path = '') {
            const prefix = path ? path + ':' : '';
            const $giper_baza_dict_with = class $giper_baza_dict_with extends this {
                // static get schema() { return { ... this.schema, ... schema } }
                static path = path;
                static toString() {
                    if (this !== $giper_baza_dict_with)
                        return super.toString();
                    const params = Object.entries(schema).map(([name, type]) => `${name}: ${type}`);
                    return '$giper_baza_dict.with<{' + params.join(', ') + '}>';
                }
            };
            for (const Field in schema) {
                Object.defineProperty($giper_baza_dict_with.prototype, Field, {
                    value: function (auto) {
                        return this.dive(prefix + Field, schema[Field], auto);
                    }
                });
                // $mol_wire_field( Entity.prototype, Field as any )
            }
            return Object.assign($giper_baza_dict_with, { schema: { ...this.schema, ...schema } });
        }
        ;
        [$mol_dev_format_head]() {
            const keys = $mol_wire_probe(() => this.keys());
            const pawns = $mol_wire_probe(() => this.pawns(null)) ?? [];
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(keys?.map((key, index) => new Pair(key, pawns[index]))));
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_dict.prototype, "keys", null);
    $.$giper_baza_dict = $giper_baza_dict;
    class Pair {
        key;
        val;
        constructor(key, val) {
            this.key = key;
            this.val = val;
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_tr({}, $mol_dev_format_td({}, $mol_dev_format_auto(this.key)), $mol_dev_format_td({}, ': '), $mol_dev_format_td({}, $mol_dev_format_auto(this.val)));
        }
    }
    /** Mergeable dictionary with any keys mapped to any embedded Pawn types */
    function $giper_baza_dict_to(Value) {
        return class $giper_baza_dict_to extends $giper_baza_dict {
            Value = Value;
            key(key, auto) {
                return this.dive(key, this.Value, auto);
            }
            static toString() {
                return this === $giper_baza_dict_to ? '$giper_baza_dict_to<' + Value + '>' : super.toString();
            }
        };
    }
    $.$giper_baza_dict_to = $giper_baza_dict_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * 48-bit streamable string hash function
     * Based on cyrb53: https://stackoverflow.com/a/52171480
     */
    function $mol_hash_string(str, seed = 0) {
        let nums = new Array(str.length);
        for (let i = 0; i < str.length; ++i)
            nums[i] = str.charCodeAt(i);
        return $mol_hash_numbers(nums);
    }
    $.$mol_hash_string = $mol_hash_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Atomic dynamic register */
    class $giper_baza_atom extends $giper_baza_pawn {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.solo];
        pick_unit(peer) {
            return this.units_of(peer).at(0);
        }
        vary(next) {
            return this.vary_of($giper_baza_link.hole, next);
        }
        vary_of(peer, next) {
            let unit_prev = this.pick_unit(peer);
            let prev = unit_prev ? this.land().sand_decode(unit_prev) : null;
            if (next === undefined)
                return prev;
            if ($mol_compare_deep(prev, next))
                return next;
            this.land().post($giper_baza_link.hole, unit_prev?.head() ?? this.head(), unit_prev?.self() ?? null, next);
            return this.vary_of(peer);
        }
        selection(lord, next) {
            const link = this.link().head().str;
            const user = this.$.$giper_baza_glob.Land(lord).Data($giper_baza_flex_user);
            if (next) {
                user.caret([[link, next[0], 0], [link, next[1], 0]]);
                return next;
            }
            else {
                this.vary(); // track text to recalc selection on its change
                const selection = user.caret();
                if (!selection)
                    return [0, 0];
                if (selection[0][0] !== link)
                    return [0, 0];
                if (selection[1][0] !== link)
                    return [0, 0];
                return [selection[0][1], selection[0][1]];
            }
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(this.vary()));
        }
        /** Atom which typed by Schema/Class. */
        static of(init) {
            const Schema = $mol_schema_maybe($mol_schema_instance(init));
            class $giper_baza_atom_of extends $giper_baza_atom {
                static Schema = Schema;
                /** Get/Set value of Pawn field */
                val(next) {
                    return this.val_of($giper_baza_link.hole, next);
                }
                val_of(peer, next) {
                    if (next !== undefined)
                        Schema.guard(next);
                    const res = this.vary_of(peer, next);
                    return next === undefined ? Schema.cast(res) : this.val_of(peer);
                }
                static toString() {
                    return this === $giper_baza_atom_of ? '$giper_baza_atom.of<' + Schema + '>' : super.toString();
                }
            }
            __decorate([
                $mol_mem_key
            ], $giper_baza_atom_of.prototype, "val_of", null);
            return $giper_baza_atom_of;
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_atom.prototype, "vary_of", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_atom.prototype, "selection", null);
    __decorate([
        $mol_memo_key.method
    ], $giper_baza_atom, "of", null);
    $.$giper_baza_atom = $giper_baza_atom;
    /** @deprecated Use $giper_baza_atom */
    $.$giper_baza_atom_vary = $giper_baza_atom;
    /** Atomic buffer */
    class $giper_baza_atom_blob extends $giper_baza_atom.of(Uint8Array) {
    }
    $.$giper_baza_atom_blob = $giper_baza_atom_blob;
    /** Atomic boolean */
    class $giper_baza_atom_bool extends $giper_baza_atom.of($mol_schema_boolean) {
    }
    $.$giper_baza_atom_bool = $giper_baza_atom_bool;
    /** Atomic big integer */
    class $giper_baza_atom_bint extends $giper_baza_atom.of($mol_schema_bigint) {
    }
    $.$giper_baza_atom_bint = $giper_baza_atom_bint;
    /** Atomic float number */
    class $giper_baza_atom_real extends $giper_baza_atom.of($mol_schema_float) {
    }
    $.$giper_baza_atom_real = $giper_baza_atom_real;
    /** Atomic string */
    class $giper_baza_atom_text extends $giper_baza_atom.of($mol_schema_string) {
    }
    $.$giper_baza_atom_text = $giper_baza_atom_text;
    /** Atomic time moment */
    class $giper_baza_atom_time extends $giper_baza_atom.of($mol_time_moment) {
    }
    $.$giper_baza_atom_time = $giper_baza_atom_time;
    /** Atomic time duration */
    class $giper_baza_atom_dura extends $giper_baza_atom.of($mol_time_duration) {
    }
    $.$giper_baza_atom_dura = $giper_baza_atom_dura;
    /** Atomic time interval */
    class $giper_baza_atom_span extends $giper_baza_atom.of($mol_time_interval) {
    }
    $.$giper_baza_atom_span = $giper_baza_atom_span;
    /** Atomic dictionary */
    class $giper_baza_atom_dict extends $giper_baza_atom.of($mol_schema_dict([$mol_schema_string, $mol_schema_any])) {
    }
    $.$giper_baza_atom_dict = $giper_baza_atom_dict;
    /** Atomic array */
    class $giper_baza_atom_list extends $giper_baza_atom.of($mol_schema_list($mol_schema_any)) {
    }
    $.$giper_baza_atom_list = $giper_baza_atom_list;
    /** Atomic DOM element */
    class $giper_baza_atom_elem extends $giper_baza_atom.of($mol_dom.Element ?? Object) {
    }
    $.$giper_baza_atom_elem = $giper_baza_atom_elem;
    /** Atomic Tree */
    class $giper_baza_atom_tree extends $giper_baza_atom.of($mol_tree2) {
    }
    $.$giper_baza_atom_tree = $giper_baza_atom_tree;
    /** Atomic Link */
    class $giper_baza_atom_link extends $giper_baza_atom.of($giper_baza_link) {
        /** Atomic link to some Pawn type register */
        static to(Value) {
            class $giper_baza_atom_link_to extends $giper_baza_atom_link {
                Value = $mol_memo.func(Value);
                static toString() {
                    return this === $giper_baza_atom_link_to ? '$giper_baza_atom_link.to[ []=> ' + Value() + ' ]' : super.toString();
                }
                /** Target Pawn */
                remote(next) {
                    return this.remote_of($giper_baza_link.hole, next);
                }
                remote_of(peer, next) {
                    const link = this.val_of(peer, next?.link() ?? next);
                    if (!link)
                        return null;
                    return this.$.$giper_baza_glob.Pawn(link, Value());
                }
                /** Target Pawn. Creates if not exists. */
                ensure(config) {
                    return this.ensure_of($giper_baza_link.hole, config);
                }
                ensure_of(peer, config) {
                    if (!this.val_of(peer)) {
                        if (config === null)
                            this.ensure_here(peer);
                        else if (config instanceof $giper_baza_land)
                            this.ensure_area(peer, config);
                        else if (config)
                            this.ensure_lord(peer, config);
                        else
                            return null;
                    }
                    return this.remote_of(peer);
                }
                ensure_here(peer) {
                    const Pawn = Value();
                    const idea = $mol_hash_string(this.link().str);
                    const head = this.land().self_make(idea);
                    const pawn = this.land().Pawn(Pawn).Head(head);
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    this.remote_of(peer, pawn);
                }
                ensure_area(peer, land) {
                    const Pawn = Value();
                    const idea = $mol_hash_string(this.link().str);
                    const area = land.area_make(idea);
                    const pawn = area.Data(Pawn);
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    this.val_of(peer, pawn.link());
                }
                ensure_lord(peer, preset) {
                    const Pawn = Value();
                    const land = this.$.$giper_baza_glob.land_grab(preset);
                    const pawn = land.Data(Pawn);
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    this.val_of(peer, pawn.link());
                }
                /** @deprecated Use ensure( preset ) */
                remote_ensure(preset) {
                    return this.ensure(preset);
                }
                /** @deprecated Use ensure( null ) */
                local_ensure() {
                    return this.ensure(null);
                }
            }
            __decorate([
                $mol_mem_key
            ], $giper_baza_atom_link_to.prototype, "remote_of", null);
            __decorate([
                $mol_action
            ], $giper_baza_atom_link_to.prototype, "ensure_here", null);
            __decorate([
                $mol_action
            ], $giper_baza_atom_link_to.prototype, "ensure_area", null);
            __decorate([
                $mol_action
            ], $giper_baza_atom_link_to.prototype, "ensure_lord", null);
            return $giper_baza_atom_link_to;
        }
    }
    __decorate([
        $mol_memo_key.method
    ], $giper_baza_atom_link, "to", null);
    $.$giper_baza_atom_link = $giper_baza_atom_link;
    /** @deprecated Use $giper_baza_atom_link.to( Target ) */
    function $giper_baza_atom_link_to(Value) {
        return $giper_baza_atom_link.to(Value);
    }
    $.$giper_baza_atom_link_to = $giper_baza_atom_link_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_stat_series extends $giper_baza_atom.of($mol_schema_list($mol_schema_float)) {
        tick(key, val, count) {
            let vals = this.values().slice();
            while (vals.length < count)
                vals.push(0);
            vals[key] = val + this.initial();
            vals = [...vals.slice(key + 1), ...vals.slice(0, key + 1)];
            for (let i = 1; i < count; ++i)
                if (vals[i] < vals[i - 1])
                    vals[i] = vals[i - 1];
            vals = [...vals.slice(-1 - key), ...vals.slice(0, -1 - key)];
            this.values(vals);
        }
        _initial;
        initial() {
            return this._initial
                ?? (this._initial = this.max());
        }
        max() {
            let max = 0;
            for (const val of this.values())
                if (val > max)
                    max = val;
            return max;
        }
        values(next) {
            if (next) {
                let last = 0;
                next = next.map(v => ([v, last] = [v - last, v])[0]);
            }
            let last = 0;
            return (this.val(next) ?? []).map(v => last += v);
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_stat_series.prototype, "tick", null);
    __decorate([
        $mol_action
    ], $giper_baza_stat_series.prototype, "initial", null);
    __decorate([
        $mol_mem
    ], $giper_baza_stat_series.prototype, "max", null);
    __decorate([
        $mol_mem
    ], $giper_baza_stat_series.prototype, "values", null);
    $.$giper_baza_stat_series = $giper_baza_stat_series;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_stat_ranges extends $giper_baza_dict.with({
        Seconds: $giper_baza_stat_series,
        Minutes: $giper_baza_stat_series,
        Hours: $giper_baza_stat_series,
        Days: $giper_baza_stat_series,
        Months: $giper_baza_stat_series,
        // Years: $giper_baza_stat_series,
    }) {
        _last_instant = 0;
        tick_instant(val) {
            this.tick_integral(this._last_instant += val);
        }
        tick_integral(val) {
            let now = new $mol_time_moment;
            this.Seconds(null).tick(Math.floor(now.second), val, 60);
            this.Minutes(null).tick(now.minute, val, 60);
            this.Hours(null).tick(now.hour, val, 24);
            this.Days(null).tick(now.day, val, 31);
            this.Months(null).tick(now.month, val, 12);
            // this.Years( null )!.tick( now.year!, val )
        }
        series() {
            function pick(Series, length, range) {
                const values = Series?.values() ?? [0];
                let series = Array.from({ length }, (_, i) => values[i]);
                let start = 0;
                let max = 0;
                for (let i = 0; i < series.length; ++i) {
                    if (series[i] < max)
                        continue;
                    max = series[i];
                    start = i + 1;
                }
                if (start)
                    series = [...series.slice(start), ...series.slice(0, start - 1)];
                let last = series[0];
                series = series.slice(1).map(val => {
                    try {
                        if (last === 0 || val < last)
                            return 0;
                        return (val - last) / range;
                    }
                    finally {
                        last = Math.max(val, last);
                    }
                });
                return series;
            }
            const months = pick(this.Days(), 12, 60 * 60 * 24 * 31);
            const days = pick(this.Days(), 31, 60 * 60 * 24);
            const hours = pick(this.Hours(), 24, 60 * 60);
            const minutes = pick(this.Minutes(), 60, 60);
            const seconds = pick(this.Seconds(), 60, 1);
            return [...months, ...days, ...hours, ...minutes, ...seconds].reverse();
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_stat_ranges.prototype, "series", null);
    $.$giper_baza_stat_ranges = $giper_baza_stat_ranges;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_report_handler_all = new Set();
    function handler(event, url, line, col, error) {
        for (const handler of $.$mol_report_handler_all) {
            try {
                handler(event, url, line, col, error);
            }
            catch (e) { }
        }
    }
    const handler_promise = (event) => handler('Unhandled Rejection', '', 0, 0, event.reason);
    const handler_promise_node = (reason) => handler('Unhandled Rejection', '', 0, 0, reason);
    if ('addEventListener' in globalThis) {
        globalThis.addEventListener('error', handler);
        globalThis.addEventListener('unhandledrejection', handler_promise);
    }
    if ('process' in globalThis) {
        process.on('uncaughtExceptionMonitor', handler);
        // process.on('unhandledRejection', handler_promise_node) // revents process halt
    }
    const console_error = console.error;
    console.error = function console_error_custom(...args) {
        const format = (val) => typeof val === 'string'
            ? val.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
            : JSON.stringify(val);
        const secondary = args.slice(1);
        const first = typeof args[0] === 'string'
            ? args[0].replaceAll(/%(?:\.\d+)?[disfcoO]/g, spec => spec === '%c' ? (secondary.shift(), '') : secondary.shift())
            : args[0];
        secondary.unshift(first);
        const result = secondary.map(format).join(' ');
        handler(result);
        console_error.apply(console, args);
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_app_stat extends $giper_baza_dict.with({
        Uptime: $giper_baza_atom_dura,
        Masters: $giper_baza_atom.of($mol_schema_list($mol_schema_string)),
        Slaves: $giper_baza_atom.of($mol_schema_list($mol_schema_string)),
        /** User time in secs */
        Cpu_user: $giper_baza_stat_ranges,
        /** System time in secs */
        Cpu_system: $giper_baza_stat_ranges,
        /** Memory in MB */
        Mem_used: $giper_baza_stat_ranges,
        /** Memory in MB */
        Mem_free: $giper_baza_stat_ranges,
        /** FS used */
        Fs_used: $giper_baza_stat_ranges,
        /** FS free */
        Fs_free: $giper_baza_stat_ranges,
        /** FS read count */
        Fs_reads: $giper_baza_stat_ranges,
        /** FS write count */
        Fs_writes: $giper_baza_stat_ranges,
        /** Slave sockets count */
        Port_slaves: $giper_baza_stat_ranges,
        /** Masters sockets count */
        Port_masters: $giper_baza_stat_ranges,
        /** Alive (in-memory) lands count */
        Land_alive: $giper_baza_stat_ranges,
        /** Ghost (non-persist) lands count */
        Land_ghost: $giper_baza_stat_ranges,
        /** Unhandled errors */
        Errors: $giper_baza_stat_ranges,
    }) {
        freshness() {
            const last = this.last_change();
            if (!last)
                return null;
            const range = new $mol_time_interval({
                start: last,
                end: new $mol_time_moment(this.$.$mol_state_time.now(1000)),
            });
            return range.duration.count('PT1s');
        }
        uptime(next) {
            return this.Uptime(next)?.val(next) ?? new $mol_time_duration(0);
        }
        masters(next) {
            return this.Masters(next)?.val(next) ?? [];
        }
        slaves(next) {
            return this.Slaves(next)?.val(next) ?? [];
        }
        init() {
            this.Errors(null).tick_instant(1); // restarts as errors
            let handler = () => this.Errors(null).tick_instant(1);
            $mol_report_handler_all.add(handler);
            return { destructor: () => $mol_report_handler_all.delete(handler) };
        }
        tick() {
            this.init();
            if (this.$.$giper_baza_log()) {
                this.$.$mol_log3_warn({
                    place: this,
                    message: 'Stat disabled due logging',
                    hint: 'Disable $giper_baza_log to start monitoring'
                });
                return;
            }
            this.$.$mol_state_time.now(1000);
            const yard = this.$.$giper_baza_glob.yard();
            this.uptime(new $mol_time_duration({ second: Math.floor(process.uptime()) }).normal);
            this.masters([...yard.masters()].map(port => port.address() + ' ' + port.origin()));
            this.slaves([...yard.slaves].map(port => port.address() + ' ' + port.origin()));
            const res = process.resourceUsage();
            this.Cpu_user(null).tick_integral(Math.ceil(res.userCPUTime / 1e4)); // %
            this.Cpu_system(null).tick_integral(Math.ceil(res.systemCPUTime / 1e4)); // %
            this.Fs_reads(null).tick_integral(res.fsRead); // pct
            this.Fs_writes(null).tick_integral(res.fsWrite); // pct
            this.Mem_used(null).tick_instant(Math.ceil((res.maxRSS - res.sharedMemorySize) / 1024)); // MB
            this.Mem_free(null).tick_instant(Math.floor($node.os.freemem() / 1024 / 1024)); // MB
            this.Fs_used(null).tick_instant(Math.floor($mol_storage.used() / 1024 / 1024)); // MB
            this.Fs_free(null).tick_instant(Math.floor($mol_storage.free() / 1024 / 1024)); // MB
            const masters = yard.masters()?.length ?? 0;
            this.Port_masters(null).tick_instant(masters); // pct
            this.Port_slaves(null).tick_instant(yard.slaves.size); // pct
            const lands_alive = yard.lands_alive();
            const lands_persist = yard.lands_alive().filter(land => land.persisted());
            this.Land_alive(null).tick_instant(lands_alive.length); // pct
            this.Land_ghost(null).tick_instant(lands_alive.length - lands_persist.length); // pct
            this.Errors(null).tick_instant(0); // pct
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "freshness", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "uptime", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "masters", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "slaves", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "init", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "tick", null);
    $.$giper_baza_app_stat = $giper_baza_app_stat;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_flex_deck_link = new $giper_baza_link('6NUPZgrR_Itnhu9N1_WPsQDQWa');
    /** Subj - named entity */
    class $giper_baza_flex_subj extends $giper_baza_dict.with({
        Name: $giper_baza_atom_text,
        Icon: $giper_baza_atom_text,
        Hint: $giper_baza_atom_text,
    }, 'Subj') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_U2e5XejQ`);
        name(next) {
            return this.Name(next)?.val(next) ?? this.link().str;
        }
        icon(next) {
            return this.Icon(next)?.val(next) ?? '💫';
        }
        hint(next) {
            return this.Hint(next)?.val(next) ?? '';
        }
    }
    $.$giper_baza_flex_subj = $giper_baza_flex_subj;
    /** Atomic Link to any Subj */
    class $giper_baza_flex_subj_link extends $giper_baza_atom_link.to(() => $giper_baza_flex_subj) {
    }
    $.$giper_baza_flex_subj_link = $giper_baza_flex_subj_link;
    /** Meta - schema of entitiy */
    class $giper_baza_flex_meta extends $giper_baza_flex_subj.with({
        Pulls: $giper_baza_list_link.to(() => $giper_baza_flex_subj),
        Props: $giper_baza_list_link.to(() => $giper_baza_flex_prop),
    }, 'Meta') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_Atd6Ty7F`);
        prop_new(key, type, kind, vars, base) {
            const prop = this.Props(null).make($mol_hash_string(key));
            prop.path(this.name() + ':' + key);
            prop.name(key);
            prop.type(type);
            if (kind)
                prop.kind(kind);
            if (vars)
                prop.enum(vars);
            if (base !== undefined)
                prop.base(base);
            return prop;
        }
        prop_add(prop) {
            this.Props(prop).add(prop.link());
        }
        prop_all() {
            return [
                ...this.pull_all().flatMap(meta => meta.prop_all()),
                ...this.Props()?.remote_list() ?? [],
            ];
        }
        pull_add(meta) {
            this.Pulls(meta).add(meta.link());
        }
        pull_all() {
            return (this.Pulls()?.remote_list() ?? []).map(subj => subj.cast($giper_baza_flex_meta));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_flex_meta.prototype, "prop_new", null);
    __decorate([
        $mol_action
    ], $giper_baza_flex_meta.prototype, "prop_add", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_meta.prototype, "prop_all", null);
    __decorate([
        $mol_action
    ], $giper_baza_flex_meta.prototype, "pull_add", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_meta.prototype, "pull_all", null);
    $.$giper_baza_flex_meta = $giper_baza_flex_meta;
    /** Property - attribute of entity */
    class $giper_baza_flex_prop extends $giper_baza_flex_subj.with({
        /** Key to store value */
        Path: $giper_baza_atom_text,
        /** Type of value */
        Type: $giper_baza_atom_text,
        /** Target Meta */
        Kind: $giper_baza_atom_link.to(() => $giper_baza_flex_meta),
        /** Variants of values */
        Enum: $giper_baza_atom_link.to(() => $giper_baza_list),
        /** Base value */
        Base: $giper_baza_atom,
    }, 'Prop') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_DOnW7Ah9`);
        path(next) {
            return this.Path(next)?.val(next) ?? '';
        }
        type(next) {
            return this.Type(next)?.val(next) ?? '';
        }
        base(next) {
            return this.Base(next)?.vary(next) ?? null;
        }
        kind(next) {
            return this.Kind(next)?.remote(next) ?? null;
        }
        enum(next) {
            return this.Enum(next)?.remote(next) ?? null;
        }
    }
    $.$giper_baza_flex_prop = $giper_baza_flex_prop;
    /** Deck - set of schemes and types */
    class $giper_baza_flex_deck extends $giper_baza_flex_subj.with({
        Metas: $giper_baza_list_link.to(() => $giper_baza_flex_meta),
        Types: $giper_baza_list_str,
    }, 'Deck') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_3AvnmQ4q`);
        meta_new(key, icon, hint) {
            const meta = this.Metas(null).make($mol_hash_string(key));
            meta.name(key);
            meta.icon(icon);
            meta.hint(hint);
            return meta;
        }
        meta_for(Meta, icon, hint) {
            const meta = this.meta_new(Meta.path, icon, hint);
            Meta.meta = meta.link();
            return meta;
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_flex_deck.prototype, "meta_new", null);
    __decorate([
        $mol_action
    ], $giper_baza_flex_deck.prototype, "meta_for", null);
    $.$giper_baza_flex_deck = $giper_baza_flex_deck;
    /** Seed - global network config */
    class $giper_baza_flex_seed extends $giper_baza_flex_subj.with({
        Deck: $giper_baza_atom_link.to(() => $giper_baza_flex_deck),
        Peers: $giper_baza_list_link.to(() => $giper_baza_flex_peer),
    }, 'Seed') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_nrUK4ZIW`);
        deck() {
            return this.Deck(null).ensure(this.land());
        }
        peers(next) {
            return this.Peers(next)?.remote_list(next) ?? [];
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_flex_seed.prototype, "deck", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_seed.prototype, "peers", null);
    $.$giper_baza_flex_seed = $giper_baza_flex_seed;
    /** Peer - network peering info */
    class $giper_baza_flex_peer extends $giper_baza_flex_subj.with({
        Urls: $giper_baza_list_str,
        Stat: $giper_baza_atom_link.to(() => $giper_baza_app_stat),
    }, 'Peer') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_xEibvNCP`);
        stat(auto) {
            return this.Stat(auto)?.ensure(this.land()) ?? null;
        }
        urls(next) {
            return (this.Urls(next)?.items(next) ?? []).filter($mol_guard_defined);
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_flex_peer.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_peer.prototype, "urls", null);
    $.$giper_baza_flex_peer = $giper_baza_flex_peer;
    /** User - human profile */
    class $giper_baza_flex_user extends $giper_baza_flex_subj.with({
        Caret: $giper_baza_atom.of($mol_schema_list($mol_schema_any)),
    }, 'User') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_csm0VtAK`);
        caret(next) {
            return this.Caret(next)?.val(next) ?? null;
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_flex_user.prototype, "caret", null);
    $.$giper_baza_flex_user = $giper_baza_flex_user;
    /** Makes new Seed with Deck */
    function $giper_baza_flex_init() {
        const seed_land = this.$.$giper_baza_glob.land_grab();
        const seed = seed_land.Data($giper_baza_flex_seed);
        seed.name('Base Seed');
        const deck = seed.deck();
        deck.name('Base Deck');
        deck.Types(null).items_vary(['vary', 'enum', 'bool', 'int', 'real', 'str', 'link', 'time', 'dict', 'text', 'list']);
        const Meta = deck.meta_for($giper_baza_flex_meta, '✨', 'Meta schema of entities');
        Meta.meta(Meta.link());
        const Subj = deck.meta_for($giper_baza_flex_subj, '💎', 'Named entity');
        const Seed = deck.meta_for($giper_baza_flex_seed, '🌱', 'Seed of network');
        const Prop = deck.meta_for($giper_baza_flex_prop, '🔖', 'Property schema');
        const Deck = deck.meta_for($giper_baza_flex_deck, '📚', 'Collection of Metas');
        const Peer = deck.meta_for($giper_baza_flex_peer, '🔆', 'Peer of network');
        const User = deck.meta_for($giper_baza_flex_user, '👤', 'Profile of user');
        seed.meta(Seed.link());
        deck.meta(Deck.link());
        Meta.pull_add(Subj);
        Seed.pull_add(Subj);
        Prop.pull_add(Subj);
        Deck.pull_add(Subj);
        Peer.pull_add(Subj);
        User.pull_add(Subj);
        Subj.prop_new('Name', 'str', undefined, undefined, '');
        Subj.prop_new('Icon', 'str', undefined, undefined, '💫');
        Subj.prop_new('Hint', 'str', undefined, undefined, '');
        Meta.prop_new('Pulls', 'list', Meta, deck.Metas());
        Meta.prop_new('Props', 'list', Prop);
        Seed.prop_new('Deck', 'link', Deck);
        Seed.prop_new('Peers', 'list', Peer);
        Prop.prop_new('Path', 'str');
        Prop.prop_new('Type', 'enum', undefined, deck.Types(), 'vary');
        Prop.prop_new('Kind', 'link', Meta, deck.Metas(), Subj.link());
        Prop.prop_new('Enum', 'link', Subj);
        Prop.prop_new('Base', 'vary', Subj);
        Deck.prop_new('Metas', 'list', Meta);
        Deck.prop_new('Types', 'list');
        Peer.prop_new('Urls', 'list');
        Peer.prop_new('Stat', 'link');
        User.prop_new('Caret', 'list');
        return seed;
    }
    $.$giper_baza_flex_init = $giper_baza_flex_init;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Whole global graph database which contains Lands. */
    class $giper_baza_glob extends $mol_object {
        static lands_touched = new $mol_wire_set();
        /** Glob synchronizer. */
        static yard() {
            return new this.$.$giper_baza_yard;
        }
        /** Land where Lord is King. Contains only main info */
        static home(Home) {
            const home = this.Land(this.$.$giper_baza_auth.current().pass().lord()).Data(Home ?? this.$.$giper_baza_flex_subj);
            if (Home?.meta && !home.meta())
                home.meta(Home.meta);
            return home;
        }
        static king_grab(preset = [[null, this.$.$giper_baza_rank_read]]) {
            const mapping = new Map(preset);
            const king = this.$.$giper_baza_auth.grab();
            const colony = $mol_wire_sync(this.$.$giper_baza_land).make({ $: this.$ });
            colony.auth = $mol_const(king);
            colony.encrypted((mapping.get(null) ?? this.$.$giper_baza_rank_deny) === this.$.$giper_baza_rank_deny);
            const self = this.$.$giper_baza_auth.current().pass();
            colony.give(self, this.$.$giper_baza_rank_rule);
            for (const [key, rank] of mapping)
                colony.give(key, rank);
            this.Land(colony.link()).units_steal(colony);
            return king;
        }
        static land_grab(preset = [[null, this.$.$giper_baza_rank_read]]) {
            return this.Land(this.king_grab(preset).pass().lord());
        }
        /** Standalone part of Glob which syncs separately, have own rights, and contains Units */
        static Land(link) {
            if (!link.str)
                $mol_fail(new Error('Empty Land Link'));
            this.lands_touched.add(link.str);
            return this.$.$giper_baza_land.make({
                link: $mol_const(link),
            });
        }
        /** High level representation of stored data. */
        static Pawn(link, Pawn) {
            const land = this.Land(link.land());
            return land.Pawn(Pawn).Head(link.head());
        }
        static Seed() {
            const link = $giper_baza_flex_deck_link.lord();
            const seed = this.Pawn(link, $giper_baza_flex_seed);
            // if( !$mol_wire_sync( seed ).meta() )
            this.boot();
            return seed;
        }
        static boot() {
            const file = $mol_file.relative('web.baza');
            const pack = $mol_wire_sync($giper_baza_pack).from(file.buffer());
            this.apply_pack(pack);
        }
        static apply_pack(pack) {
            return this.apply_parts(pack.parts());
        }
        static apply_parts(parts) {
            for (const [land_id, part] of parts) {
                const land = this.Land(new this.$.$giper_baza_link(land_id));
                land.diff_apply(part.units);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_glob, "yard", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "king_grab", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "land_grab", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_glob, "Land", null);
    __decorate([
        $mol_mem
    ], $giper_baza_glob, "Seed", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "boot", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "apply_pack", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "apply_parts", null);
    $.$giper_baza_glob = $giper_baza_glob;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const makeURL = $mol_wire_sync((url, base) => new URL(url, base));
    class $mol_rest_resource extends $mol_object {
        REQUEST(msg) {
            const [path, nest, tail] = /^\/([a-zA-Z][^/]*)(.*)$/.exec(msg.uri().pathname) ?? [];
            const field = nest?.toLowerCase();
            if (field && field in this && !(field in $mol_rest_resource.prototype)) {
                const uri2 = makeURL(msg.uri().toString());
                uri2.pathname = tail ?? msg.uri().pathname;
                const msg2 = msg.route(uri2);
                return this[field]().REQUEST(msg2);
            }
            return $mol_wire_sync(this)[msg.method()](msg);
        }
        // async OPTIONS( msg: $mol_rest_message ) {
        // 	if( msg.type() !== 'application/sdp' ) return msg.reply( null )
        // 	const { RTCPeerConnection } = await import( 'node-datachannel/polyfill' )
        // 	const connection = new RTCPeerConnection
        // 	const channel = connection.createDataChannel( msg.uri().toString(), { negotiated: true, id: 0 } )
        // 	const port = $mol_rest_port_webrtc.make({ channel })
        // 	$mol_wire_sync( this.$ ).$mol_log3_come({
        // 		place: this,
        // 		message: 'OPEN',
        // 		url: msg.uri(),
        // 		port: $mol_key( port ),
        // 	})
        // 	$mol_wire_sync( this ).REQUEST(
        // 		msg.derive( 'OPEN', null )
        // 	)
        // 	channel.onmessage = event => {
        // 		const message = msg.derive( 'POST', event.data )
        // 		message.port = port
        // 		this.$.$mol_log3_rise({
        // 			place: this,
        // 			message: message.method(),
        // 			url: message.uri(),
        // 			port: $mol_key( port ),
        // 		})
        // 		$mol_wire_async( this ).POST( message )
        // 	}
        // 	channel.onclose = ()=> {
        // 		this.$.$mol_log3_done({
        // 			place: this,
        // 			message: 'CLOSE',
        // 			url: msg.uri(),
        // 			port: $mol_key( port ),
        // 		})
        // 		$mol_wire_sync( this ).REQUEST(
        // 			msg.derive( 'CLOSE', null )
        // 		)
        // 	}
        // 	const sdp = await $mol_wire_async( msg ).text()
        // 	await connection.setRemoteDescription({ sdp, type: 'offer' })
        // 	connection.setLocalDescription({ type: 'answer' })
        // 	await new Promise( done => connection.onicecandidate = ({ candidate })=> done( candidate ) )
        // 	msg.port.send_type( 'application/sdp' )
        // 	msg.port.send_text( connection.localDescription!.sdp )
        // }
        _protocols = [];
        OPEN(msg) {
            const protocols = msg.protocols();
            for (const protocol of protocols) {
                if (this._protocols.includes(protocol))
                    return protocol;
            }
            return '';
        }
        CLOSE(msg) { }
        HEAD(msg) { }
        GET(msg) { }
        PUT(msg) { }
        PATCH(msg) { }
        POST(msg) { }
        DELETE(msg) { }
        _auto() { }
        static port(port) {
            const server = $mol_rest_server.make({
                port: () => port,
            });
            server.root(this.make({}));
            server.start();
            new $mol_wire_atom(`${server.root()}._auto<>`, () => {
                try {
                    server.root()._auto();
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    $mol_fail_log(error);
                }
            }).fresh();
            return server;
        }
        static serve() {
            const port = Number(this.$.$mol_state_arg.value('port'));
            return port ? this.port(port) : null;
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_resource.prototype, "REQUEST", null);
    __decorate([
        $mol_mem_key
    ], $mol_rest_resource, "port", null);
    $.$mol_rest_resource = $mol_rest_resource;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_file_extensions = {
        'css': 'text/css;charset=utf-8',
        'csv': 'text/csv;charset=utf-8',
        'htm': 'text/html;charset=utf-8',
        'html': 'text/html;charset=utf-8',
        'ics': 'text/calendar;charset=utf-8',
        'js': 'text/javascript;charset=utf-8',
        'jsx': 'text/javascript;charset=utf-8',
        'md': 'text/plain;charset=utf-8',
        'mjs': 'text/javascript;charset=utf-8',
        'ts': 'text/typescript;charset=utf-8',
        'tsx': 'text/typescript;charset=utf-8',
        'txt': 'text/plain;charset=utf-8',
        'aac': 'audio/aac',
        'mid': 'audio/midi',
        'midi': 'audio/midi',
        'mp3': 'audio/mpeg',
        'oga': 'audio/ogg',
        'opus': 'audio/opus',
        'wav': 'audio/wav',
        'weba': 'audio/webm',
        'apng': 'image/apng',
        'avif': 'image/avif',
        'bmp': 'image/bmp',
        'gif': 'image/gif',
        'ico': 'image/vnd.microsoft.icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'tiff': 'image/tiff',
        'tif': 'image/tiff',
        'webp': 'image/webp',
        'avi': 'video/x-msvideo',
        'mpeg': 'video/mpeg',
        'mp4': 'video/mp4',
        'ogv': 'video/ogg',
        'webm': 'video/webm',
        '3gp': 'video/3gpp',
        '3g2': 'video/3gpp2',
        'otf': 'font/otf',
        'ttf': 'font/ttf',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'abw': 'application/x-abiword',
        'arc': 'application/x-freearc',
        'azw': 'application/vnd.amazon.ebook',
        'bin': 'application/octet-stream',
        'bz': 'application/x-bzip',
        'bz2': 'application/x-bzip2',
        'cda': 'application/x-cdf',
        'crus': 'application/x-crus',
        'csh': 'application/x-csh',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'eot': 'application/vnd.ms-fontobject',
        'epub': 'application/epub+zip',
        'gz': 'application/gzip',
        'jar': 'application/java-archive',
        'json': 'application/json',
        'jsonld': 'application/ld+json',
        'map': 'application/json',
        'mpkg': 'application/vnd.apple.installer+xml',
        'odp': 'application/vnd.oasis.opendocument.presentation',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        'odt': 'application/vnd.oasis.opendocument.text',
        'ogx': 'application/ogg',
        'pdf': 'application/pdf',
        'php': 'application/x-httpd-php',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'rar': 'application/vnd.rar',
        'rtf': 'application/rtf',
        'sh': 'application/x-sh',
        'tar': 'application/x-tar',
        'tree': 'application/x-tree',
        'vsd': 'application/vnd.visio',
        'xhtml': 'application/xhtml+xml',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xml': 'application/xml',
        'xul': 'application/vnd.mozilla.xul+xml',
        'zip': 'application/zip',
        '7z': 'application/x-7z-compressed',
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_http extends $mol_rest_port {
        output;
        send_code(code) {
            if (this.output.writableEnded)
                return;
            if (this.output.statusCode !== 400)
                return;
            this.output.statusCode = code;
            this.output.setHeader('x-content-type-options', 'nosniff');
        }
        send_type(mime) {
            if (this.output.writableEnded)
                return;
            if (this.output.getHeader('content-type'))
                return;
            this.output.setHeader('content-type', mime);
        }
        send_name(name) {
            if (this.output.writableEnded)
                return;
            if (this.output.getHeader('content-disposition'))
                return;
            const utf8 = encodeURIComponent(name)
                .replace(/['()*]/g, char => '%' + char.charCodeAt(0).toString(16).toUpperCase());
            this.output.setHeader('content-disposition', `inline; filename*=UTF-8''${utf8}`);
        }
        send_bin(data) {
            if (this.output.writableEnded)
                return;
            super.send_bin(data);
            this.output.write(data);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_code", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_type", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_name", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_http.prototype, "send_bin", null);
    $.$mol_rest_port_http = $mol_rest_port_http;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_server extends $mol_object {
        log() {
            return this.$.$mol_state_arg.value('mol_rest_server_log') !== null;
        }
        port() {
            return 0;
        }
        start() {
            this.http_server();
        }
        http_server() {
            const server = $node.http.createServer((req, res) => {
                res.statusCode = 400;
                $mol_wire_async(this).http_income(req, res);
            });
            server.on('upgrade', (req, sock, head) => $mol_wire_async(this).ws_upgrade(req, sock, head));
            server.listen(this.port(), () => {
                const ifaces = Object.entries($node.os.networkInterfaces())
                    .flatMap(([type, ifaces]) => ifaces?.map(iface => iface.family === 'IPv6' ? `[${iface.address}]` : iface.address) ?? []);
                this.$.$mol_log3_done({
                    place: this,
                    message: 'HTTP Server Started',
                    links: ifaces.map(iface => `http://${iface}:${this.port()}/`),
                });
            });
            return server;
        }
        http_income(req, res) {
            const port = $mol_rest_port_http.make({ output: res });
            const msg = $mol_rest_message_http.make({ port, input: req });
            if (this.log())
                $mol_wire_sync(this.$).$mol_log3_rise({
                    place: this,
                    message: msg.method(),
                    url: msg.uri(),
                    origin: msg.origin(),
                    remote: req.socket.remoteAddress + ':' + req.socket.remotePort
                });
            $mol_wire_sync(res).setHeader('Access-Control-Allow-Origin', '*');
            $mol_wire_sync(res).setHeader('Access-Control-Allow-Methods', '*');
            $mol_wire_sync(res).setHeader('Access-Control-Allow-Headers', '*');
            try {
                $mol_wire_sync(this.root()).REQUEST(msg);
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_wire_sync($$).$mol_log3_fail({
                    place: this,
                    message: error.message ?? '',
                    origin: msg.origin(),
                    address: msg.address(),
                    cause: error.cause,
                    stack: error.stack,
                });
                $mol_wire_sync(res).writeHead(500, error.name || 'Server Error');
            }
            res.end();
        }
        ws_upgrade(req, socket, head) {
            const port = $mol_rest_port_ws_node.make({ socket, prolog: req });
            const upgrade = port.upgrade();
            let protocol = '';
            try {
                protocol = $mol_wire_sync(this.root()).REQUEST(upgrade.derive('OPEN', null));
                if (!protocol) {
                    socket.write('HTTP/1.1 400 Bad Request\r\n' +
                        '\r\n' +
                        `Unsupported Protocols: ${upgrade.protocols()}`);
                    socket.end();
                    return;
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_wire_sync($$).$mol_log3_fail({
                    place: this,
                    message: error.message ?? '',
                    origin: upgrade.origin(),
                    address: upgrade.address(),
                    cause: error.cause,
                    stack: error.stack,
                });
                socket.end();
                return;
            }
            const onclose = $mol_wire_async(() => {
                if (this.log())
                    $mol_wire_sync(this.$).$mol_log3_done({
                        place: this,
                        message: 'CLOSE',
                        url: upgrade.uri(),
                        origin: upgrade.origin(),
                        port: $mol_key(port),
                    });
                try {
                    $mol_wire_sync(this.root()).REQUEST(upgrade.derive('CLOSE', null));
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    $mol_wire_sync($$).$mol_log3_fail({
                        place: this,
                        message: error.message ?? '',
                        origin: upgrade.origin(),
                        address: upgrade.address(),
                        cause: error.cause,
                        stack: error.stack,
                    });
                    return;
                }
                socket.end();
            });
            socket.on('end', onclose);
            socket.on('error', onclose);
            socket.on('data', (chunk) => this.ws_income(chunk, upgrade, socket));
            const key_in = req.headers["sec-websocket-key"];
            const magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
            const key_out = $mol_base64_encode($mol_crypto2_hash($mol_charset_encode(key_in + magic)));
            socket.write('HTTP/1.1 101 WS Handshaked\r\n' +
                'Upgrade: WebSocket\r\n' +
                'Connection: Upgrade\r\n' +
                `Sec-WebSocket-Accept: ${key_out}\r\n` +
                `Sec-WebSocket-Protocol: ${protocol}\r\n` +
                '\r\n');
            if (this.log())
                $mol_wire_sync(this.$).$mol_log3_come({
                    place: this,
                    message: 'OPEN',
                    url: upgrade.uri(),
                    origin: upgrade.origin(),
                    port: $mol_key(port),
                });
        }
        _ws_income_chunks = new WeakMap;
        _ws_income_frames = new WeakMap;
        async ws_income(chunk, upgrade, sock) {
            sock.pause();
            try {
                let chunks = this._ws_income_chunks.get(sock);
                if (!chunks)
                    this._ws_income_chunks.set(sock, chunks = []);
                chunks.push(chunk);
                let frame = $mol_websocket_frame.from(chunks[0]);
                let header_size = frame.size();
                if (chunks[0].byteLength < header_size) {
                    if (chunks.length < 2)
                        return setTimeout(() => sock.resume()), undefined;
                    chunk = Buffer.from([...chunks[0], ...chunks[1]]);
                    chunks.splice(0, 2, chunk);
                    frame = $mol_websocket_frame.from(chunk);
                    header_size = frame.size();
                    if (chunk.byteLength < header_size)
                        return setTimeout(() => sock.resume()), undefined;
                }
                const msg_size = header_size + frame.data().size;
                const patial_size = chunks.reduce((sum, buf) => sum + buf.byteLength, 0);
                if (msg_size > patial_size)
                    return setTimeout(() => sock.resume()), undefined;
                chunk = Buffer.alloc(patial_size);
                let offset = 0;
                for (const buf of chunks.splice(0)) {
                    chunk.set(buf, offset);
                    offset += buf.byteLength;
                }
                frame = $mol_websocket_frame.from(chunk);
                if (msg_size < chunk.byteLength) {
                    const tail = new Uint8Array(chunk.buffer, chunk.byteOffset + msg_size);
                    sock.unshift(tail);
                }
                let data = new Uint8Array(chunk.buffer, chunk.byteOffset + frame.size(), frame.data().size);
                if (frame.data().mask) {
                    const mask = frame.mask();
                    for (let i = 0; i < data.length; ++i) {
                        data[i] ^= mask[i % 4];
                    }
                }
                const op = frame.kind().op;
                if (op === 'txt')
                    data = $mol_charset_decode(data);
                let frames = this._ws_income_frames.get(sock);
                if (!frames)
                    this._ws_income_frames.set(sock, frames = []);
                if (!frame.kind().fin) {
                    frames.push(data);
                    setTimeout(() => sock.resume());
                    return;
                }
                if (frames.length) {
                    frames.push(data);
                    if (typeof frames[0] === 'string') {
                        data = frames.join('');
                    }
                    else {
                        const size = frames.reduce((s, f) => s + f.byteLength, 0);
                        data = new Uint8Array(size);
                        let offset = 0;
                        for (const frame of frames) {
                            data.set(frame, offset);
                            offset += frame.byteLength;
                        }
                    }
                    frames.length = 0;
                }
                if (op !== 'txt' && op !== 'bin' && op !== 'con') {
                    setTimeout(() => sock.resume());
                    return;
                }
                const type = typeof data === 'string' ? 'text/plain' : 'application/octet-stream';
                const message = upgrade.derive('POST', data, type);
                if (data.length !== 0) {
                    if (this.log())
                        this.$.$mol_log3_rise({
                            place: this,
                            message: message.method(),
                            port: $mol_key(message.port),
                            url: message.uri(),
                            origin: message.origin(),
                            frame: frame.toString(),
                        });
                    await $mol_wire_async(this.root()).REQUEST(message);
                }
                setTimeout(() => sock.resume());
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $$.$mol_log3_fail({
                    place: this,
                    message: error.message ?? '',
                    origin: upgrade.origin(),
                    address: upgrade.address(),
                    cause: error.cause,
                    stack: error.stack,
                });
                sock.end();
            }
        }
        root(resource) {
            $mol_wire_solid();
            return resource ?? $mol_rest_resource.make({});
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$mol_rest_server');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "port", null);
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "start", null);
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "http_server", null);
    __decorate([
        $mol_action
    ], $mol_rest_server.prototype, "http_income", null);
    __decorate([
        $mol_action
    ], $mol_rest_server.prototype, "ws_upgrade", null);
    __decorate([
        $mol_mem
    ], $mol_rest_server.prototype, "root", null);
    $.$mol_rest_server = $mol_rest_server;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    class $mol_rest_resource_fs extends $mol_rest_resource {
        _root() { return $mol_file.relative(__dirname); }
        GET(msg) {
            const root = this._root();
            const file = root.resolve(msg.uri().pathname);
            if (!file.exists())
                return msg.reply(null, { code: 404 });
            switch (file.type()) {
                case 'file': {
                    return msg.reply(file.buffer(), {
                        type: $mol_file_extensions[file.ext().replace(/^.*\./, '')],
                    });
                }
                case 'dir': {
                    const index = file.resolve('./index.html');
                    if (index.exists())
                        return msg.reply(index.buffer(), { type: 'text/html' });
                    const resources = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
                    return msg.reply($mol_jsx("body", null,
                        $mol_jsx("style", null, `
							body { background: black; font: 1rem/1.5rem monospace }
							a { color: royalblue; text-decoration: none }
							a:hover { color: skyblue }
						`),
                        resources.map(res => {
                            if (res === 'constructor')
                                return null;
                            if (!/^[a-z][a-z_-]*$/.test(res))
                                return null;
                            const uri = root.resolve(res);
                            return $mol_jsx("a", { href: uri.relate(file) + '/' },
                                "/",
                                res,
                                "/",
                                $mol_jsx("br", null));
                        }),
                        $mol_jsx("a", { href: "../" },
                            "../",
                            $mol_jsx("br", null)),
                        file.sub().map(kid => {
                            const uri = kid.name() + (kid.type() === 'dir' ? '/' : '');
                            return $mol_jsx("a", { href: uri },
                                uri,
                                $mol_jsx("br", null));
                        })));
                }
            }
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_rest_resource_fs.prototype, "_root", null);
    $.$mol_rest_resource_fs = $mol_rest_resource_fs;
})($ || ($ = {}));

;
"use strict";
// namespace $ {
// 	$mol_report_bugsnag = '18acf016ed2a2a4cc4445daa9dd2dd3c'
// }

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for some of given runtype or throws error.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_variant_demo
     */
    function $mol_data_variant(...sub) {
        return $mol_data_setup((val) => {
            const errors = [];
            for (const type of sub) {
                let hidden = $.$mol_fail_hidden;
                try {
                    $.$mol_fail = $.$mol_fail_hidden;
                    return type(val);
                }
                catch (error) {
                    $.$mol_fail = hidden;
                    if (error instanceof $mol_data_error) {
                        errors.push(error);
                    }
                    else {
                        return $mol_fail_hidden(error);
                    }
                }
            }
            return $mol_fail(new $mol_data_error(`${val} is not any of variants`, {}, ...errors));
        }, sub);
    }
    $.$mol_data_variant = $mol_data_variant;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for string and returns string type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_string_demo
     */
    $.$mol_data_string = (val) => {
        if (typeof val === 'string')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a string`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for undefined or passing given runtype.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_optional_demo
     */
    function $mol_data_optional(sub, fallback) {
        return $mol_data_setup((val) => {
            if (val === undefined) {
                return fallback?.();
            }
            return sub(val);
        }, { sub, fallback });
    }
    $.$mol_data_optional = $mol_data_optional;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for record of given fields with by its runtypes and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_record_demo
     */
    function $mol_data_record(sub) {
        return $mol_data_setup((val) => {
            let res = {};
            for (const field in sub) {
                try {
                    res[field] =
                        sub[field](val[field]);
                }
                catch (error) {
                    if (error instanceof Promise)
                        return $mol_fail_hidden(error);
                    error.message = `[${JSON.stringify(field)}] ${error.message}`;
                    return $mol_fail(error);
                }
            }
            return res;
        }, sub);
    }
    $.$mol_data_record = $mol_data_record;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for array of given runtype and returns expected type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_array_demo
     */
    function $mol_data_array(sub) {
        return $mol_data_setup((val) => {
            if (!Array.isArray(val))
                return $mol_fail(new $mol_data_error(`${val} is not an array`));
            return val.map((item, index) => {
                try {
                    return sub(item);
                }
                catch (error) {
                    if (error instanceof Promise)
                        return $mol_fail_hidden(error);
                    error.message = `[${index}] ${error.message}`;
                    return $mol_fail(error);
                }
            });
        }, sub);
    }
    $.$mol_data_array = $mol_data_array;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for boolean and returns boolean type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_boolean_demo
     */
    $.$mol_data_boolean = (val) => {
        if (typeof val === 'boolean')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a boolean`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [prefix], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const syntax = new $mol_syntax2({
        'filter': /!?=/,
        'range_separator': /@/,
        'fetch_open': /\(/,
        'fetch_separator': /[:;&\/?#]/,
        'fetch_close': /\)/,
    });
    function $hyoo_harp_from_string(uri) {
        let parent = {};
        let prev = null;
        let stack = [parent];
        let range = null;
        let values = null;
        function fail_at(offset) {
            const uri_marked = uri.substring(0, offset) + '\u035C' + uri.substring(offset);
            $mol_fail(new Error(`Unexpected token at ${offset} of "${uri_marked}"`));
        }
        syntax.parse(uri, {
            '': (text, chunks, offset) => {
                if (values) {
                    text = decodeURIComponent(text);
                    range = (range && range.length > 1)
                        ? [range[0], range[1] + text]
                        : [(range?.[0] ?? '') + text];
                }
                else {
                    let [, order, name] = /^([+-]?)(.*)$/.exec(text);
                    prev = parent[decodeURIComponent(name)] = {};
                    if (order)
                        prev['+'] = order === '+';
                    stack.push(parent);
                }
            },
            'filter': (filter, chinks, offset) => {
                if (values) {
                    if (range) {
                        if (filter === '!=')
                            range.push(range.pop() + '!');
                        values.push(range);
                        range = null;
                    }
                    else {
                        range = [filter];
                    }
                }
                else if (prev) {
                    values = prev[filter] = [];
                }
                else {
                    values = [];
                    parent[''] = values;
                }
            },
            'range_separator': (found, chunks, offset) => {
                if (!values)
                    fail_at(offset);
                range = [range?.[0] ?? '', ''];
            },
            'fetch_open': (found, chunks, offset) => {
                if (range) {
                    range[range.length - 1] += found;
                }
                else {
                    if (!prev)
                        fail_at(offset);
                    parent = prev;
                    values = null;
                    prev = null;
                }
            },
            'fetch_separator': (found, chunks, offset) => {
                if (range) {
                    values.push(range);
                    range = null;
                }
                parent = stack.pop();
                values = null;
                prev = null;
            },
            'fetch_close': (found) => {
                if (range) {
                    range[range.length - 1] += found;
                }
                else {
                    parent = stack.pop();
                    values = null;
                    prev = null;
                }
            },
        });
        if (range)
            values.push(range);
        return stack[0];
    }
    $.$hyoo_harp_from_string = $hyoo_harp_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $hyoo_harp_to_string(query) {
        return Object.entries(query).map(([field, harp]) => {
            if (field === '+')
                return '';
            if (field === '=')
                return '';
            if (field === '!=')
                return '';
            if (!harp)
                return '';
            const harp2 = harp;
            const order = harp2['+'] === true ? '+' : harp2['+'] === false ? '-' : '';
            const filter = harp2['='] ? '=' : harp2['!='] ? '!=' : '';
            const name = encodeURIComponent(field);
            let values = (harp2['='] || harp2['!='] || []).map(([min, max]) => {
                if (max === undefined || min === max)
                    return encodeURIComponent(String(min)) + '=';
                min = (min === undefined) ? '' : encodeURIComponent(String(min));
                max = (max === undefined) ? '' : encodeURIComponent(String(max));
                return `${min}@${max}=`;
            }).join('');
            let fetch = $hyoo_harp_to_string(harp);
            if (fetch)
                fetch = `(${fetch})`;
            return `${order}${name}${filter}${values}${fetch}`;
        }).filter(Boolean).join(';');
    }
    $.$hyoo_harp_to_string = $hyoo_harp_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const Int = $mol_data_pipe($mol_data_variant($mol_data_string, $mol_data_integer), Number);
    function $hyoo_harp_scheme(sub, value = $mol_data_integer) {
        const inner = $mol_data_optional($mol_data_record(sub));
        const values = $mol_data_optional($mol_data_array($mol_data_array(value)));
        const val = $mol_data_record({
            ...sub,
            '+': $mol_data_optional($mol_data_boolean),
            '=': values,
            '!=': values,
            '_num': $mol_data_optional($mol_data_record({
                '=': $mol_data_array($mol_data_array(Int))
            })),
            '_len': inner,
            '_max': inner,
            '_min': inner,
            '_sum': inner,
        });
        return Object.assign(val, {
            parse(str) {
                return val($hyoo_harp_from_string(str));
            },
            build(query) {
                return $hyoo_harp_to_string(query);
            },
        });
    }
    $.$hyoo_harp_scheme = $hyoo_harp_scheme;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));

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
    try {
        $mol_offline();
    }
    catch (error) {
        console.error(error);
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_file_mime_safe(type) {
        return ['audio', 'video', 'image', 'font'].includes(type.replace(/\/.*$/, ''))
            ? type
            : 'application/octet-stream';
    }
    $.$giper_baza_file_mime_safe = $giper_baza_file_mime_safe;
    $.$giper_baza_file_query = $hyoo_harp_scheme({
        BAZA: $hyoo_harp_scheme({}),
        file: $hyoo_harp_scheme({}, $mol_data_string),
    });
    class $giper_baza_file extends $giper_baza_dict.with({
        /** File name */
        Name: $giper_baza_atom_text,
        /** File Content-Type */
        Type: $giper_baza_atom_text,
        /** File content in chunks - list of binaries */
        Chunks: $giper_baza_list_bin,
    }) {
        /** Persistent URI to file content */
        uri() {
            return `?BAZA:file=${this.link()};name=${this.name()}`;
        }
        /** File name */
        name(next) {
            const ext = {
                'text/plain': 'txt',
                'application/json': 'json',
            }[this.type()] ?? 'bin';
            return this.Name(next)?.val(next) ?? `${this.link()}.${ext}`;
        }
        /** Mime type */
        type(next) {
            return this.Type(next)?.val(next) ?? 'application/octet-stream';
        }
        /** Blob, File etc. */
        blob(next) {
            if (!next)
                return new $mol_blob(this.chunks(), { type: this.type() });
            const buffer = new Uint8Array($mol_wire_sync(next).arrayBuffer());
            this.buffer(buffer);
            this.type(next.type);
            if (next instanceof $mol_dom_context.File)
                this.name(next.name);
            return next;
        }
        /** Solid byte buffer. */
        buffer(next) {
            if (next) {
                const chunks = [];
                for (let offset = 0; offset < next.byteLength;) {
                    chunks.push(next.slice(offset, offset += 2 ** 15)); // split by 32 KB
                }
                this.chunks(chunks);
                return next;
            }
            else {
                const chunks = this.chunks();
                const size = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
                const res = new Uint8Array(size);
                let offset = 0;
                for (const chunk of chunks) {
                    res.set(chunk, offset);
                    offset += chunk.byteLength;
                }
                return res;
            }
        }
        chunks(next) {
            return (this.Chunks(next)?.items(next)?.filter($mol_guard_defined) ?? []);
        }
        str(next, type = 'text/plain') {
            if (next === undefined)
                return $mol_charset_decode(this.buffer());
            this.buffer($mol_charset_encode(next));
            this.type(type);
            return next;
        }
        json(next, type = 'application/json') {
            if (next === undefined)
                return JSON.parse(this.str());
            this.str(JSON.stringify(next), type);
            return next;
        }
    }
    $.$giper_baza_file = $giper_baza_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_app_home extends $giper_baza_flex_peer {
        init() {
            this.meta($giper_baza_flex_peer.meta);
        }
        tick() {
            this.init();
            this.stat(null).tick();
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_app_home.prototype, "init", null);
    $.$giper_baza_app_home = $giper_baza_app_home;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_app_home_node extends $giper_baza_app_home {
        init() {
            super.init();
            if (process.env.GIPER_BAZA_ADMIN) {
                const pass = $giper_baza_auth_pass.from(process.env.GIPER_BAZA_ADMIN);
                this.land().give(pass, $giper_baza_rank_rule);
            }
            const host = process.env.GIPER_BAZA_DOMAIN || $node.os.hostname();
            this.name(host.replace(/\.ip\..*$/, ''));
            this.urls([`https://${host}/`]);
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_app_home_node.prototype, "init", null);
    $.$giper_baza_app_home_node = $giper_baza_app_home_node;
    $.$giper_baza_app_home = $giper_baza_app_home_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_app_node extends $mol_rest_resource_fs {
        link() {
            return new $giper_baza_app_node_link;
        }
        _protocols = ['$giper_baza_yard_2'];
        GET(msg) {
            let id;
            try {
                id = $giper_baza_file_query.parse(msg.uri().search).file['=']?.[0][0];
            }
            catch { }
            if (!id)
                return super.GET(msg);
            const link = new $giper_baza_link(id);
            const file = this.$.$giper_baza_glob.Pawn(link, $giper_baza_file);
            msg.port.send_code(file.filled() ? 200 : 404);
            msg.port.send_type($giper_baza_file_mime_safe(file.type()));
            msg.port.send_bin(file.buffer());
        }
        _yard() {
            return this.$.$giper_baza_glob.yard();
        }
        OPEN(msg) {
            const protocol = super.OPEN(msg);
            if (!protocol)
                return '';
            this._yard().slaves.add(msg.port);
            return protocol;
        }
        POST(msg) {
            if (msg.type() !== 'application/octet-stream')
                return super.POST(msg);
            this._yard().port_income(msg.port, msg.bin());
        }
        CLOSE(msg) {
            this._yard().slaves.delete(msg.port);
            super.CLOSE(msg);
        }
        _auto() {
            this._stat_update();
            this.$.$giper_baza_glob.yard().sync();
        }
        _home() {
            return this.$.$giper_baza_glob.home($giper_baza_app_home);
        }
        _stat_update() {
            this._home().tick();
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_app_node.prototype, "link", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_node.prototype, "_home", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_node.prototype, "_stat_update", null);
    $.$giper_baza_app_node = $giper_baza_app_node;
    class $giper_baza_app_node_link extends $mol_rest_resource {
        GET(msg) {
            msg.reply(this.$.$giper_baza_auth.current().pass().lord().str);
        }
    }
    $.$giper_baza_app_node_link = $giper_baza_app_node_link;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_spike_net_hero extends $giper_baza_dict.with({
        X: $giper_baza_atom_real,
        Y: $giper_baza_atom_real,
    }) {
    }
    $.$bog_gamengine_spike_net_hero = $bog_gamengine_spike_net_hero;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_spike_net_self extends $bog_gamengine_demo_flat_hero {
        pawn(next) {
            return next ?? null;
        }
        gap(next = 50) {
            return next;
        }
        pushed = new Float32Array(2);
        pushed_at = 0;
        pushes = 0;
        step(dt) {
            super.step(dt);
            const pawn = this.pawn();
            if (!pawn)
                return;
            const pos = this.pos();
            if (pos[0] === this.pushed[0] && pos[1] === this.pushed[1])
                return;
            const now = Date.now();
            if (now - this.pushed_at < this.gap())
                return;
            this.pushed_at = now;
            this.pushed[0] = pos[0];
            this.pushed[1] = pos[1];
            const x = pos[0];
            const y = pos[1];
            new this.$.$mol_after_tick(() => $mol_wire_async(this).push(pawn, x, y));
        }
        push(pawn, x, y) {
            pawn.X('auto').val(x);
            pawn.Y('auto').val(y);
            ++this.pushes;
        }
    }
    __decorate([
        $mol_mem
    ], $bog_gamengine_spike_net_self.prototype, "pawn", null);
    __decorate([
        $mol_mem
    ], $bog_gamengine_spike_net_self.prototype, "gap", null);
    $.$bog_gamengine_spike_net_self = $bog_gamengine_spike_net_self;
})($ || ($ = {}));

;
	($.$bog_gamengine_spike_net) = class $bog_gamengine_spike_net extends ($.$mol_page) {
		stat(){
			return (this.Draw().stat());
		}
		Draw(){
			const obj = new this.$.$bog_gamengine_draw();
			(obj.scene) = () => ((this.Scene()));
			(obj.cam) = () => ((this.Cam()));
			return obj;
		}
		Stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.stat())]);
			return obj;
		}
		net_stat(){
			return "";
		}
		Net_stat(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.net_stat())]);
			return obj;
		}
		nodes(){
			return [];
		}
		Phys(){
			const obj = new this.$.$bog_gamengine_phys();
			(obj.bodies) = () => ([(this.Hero())]);
			return obj;
		}
		Sprite_shader(){
			const obj = new this.$.$bog_gamengine_shader_sprite();
			return obj;
		}
		sprites(){
			return [];
		}
		Batch(){
			const obj = new this.$.$bog_gamengine_batch();
			(obj.shader) = () => ((this.Sprite_shader()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.nodes) = () => ((this.sprites()));
			return obj;
		}
		cam_pos(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		hero_pos(next){
			if(next !== undefined) return next;
			const obj = new this.$.Float32Array();
			return obj;
		}
		hero_face_left(next){
			return (this.Hero().face_left(next));
		}
		my_hero(){
			return null;
		}
		other_pos(id){
			const obj = new this.$.Float32Array();
			return obj;
		}
		other_tint(){
			const obj = new this.$.Float32Array();
			return obj;
		}
		title(){
			return "Сеть";
		}
		body(){
			return [(this.Draw())];
		}
		foot(){
			return [(this.Stat()), (this.Net_stat())];
		}
		Key(){
			const obj = new this.$.$bog_gamengine_key();
			(obj.bind) = () => ({
				"left": ["A"], 
				"right": ["D"], 
				"up": ["W"], 
				"down": ["S"]
			});
			return obj;
		}
		Atlas(){
			const obj = new this.$.$bog_gamengine_atlas();
			(obj.uris) = () => (["bog/gamengine/demo/atlas/hero.png"]);
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
			(obj.kids) = () => ((this.nodes()));
			(obj.phys) = () => ((this.Phys()));
			(obj.batches) = () => ([(this.Batch())]);
			return obj;
		}
		Cam(){
			const obj = new this.$.$bog_gamengine_cam_flat();
			(obj.height) = () => (15);
			(obj.pos) = () => ((this.cam_pos()));
			return obj;
		}
		Hero(){
			const obj = new this.$.$bog_gamengine_spike_net_self();
			(obj.key) = () => ((this.Key()));
			(obj.pos) = (next) => ((this.hero_pos(next)));
			(obj.pawn) = () => ((this.my_hero()));
			return obj;
		}
		Hero_sprite(){
			const obj = new this.$.$bog_gamengine_sprite();
			(obj.parent) = () => ((this.Hero()));
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("hero");
			(obj.flip_x) = () => ((this.hero_face_left()));
			return obj;
		}
		Other(id){
			const obj = new this.$.$bog_gamengine_sprite();
			(obj.atlas) = () => ((this.Atlas()));
			(obj.frame) = () => ("hero");
			(obj.pos) = () => ((this.other_pos(id)));
			(obj.tint) = () => ((this.other_tint()));
			return obj;
		}
	};
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Draw"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Stat"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Net_stat"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Phys"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Sprite_shader"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Batch"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "cam_pos"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "hero_pos"));
	($mol_mem_key(($.$bog_gamengine_spike_net.prototype), "other_pos"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "other_tint"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Key"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Atlas"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Cam"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Hero"));
	($mol_mem(($.$bog_gamengine_spike_net.prototype), "Hero_sprite"));
	($mol_mem_key(($.$bog_gamengine_spike_net.prototype), "Other"));


;
"use strict";
var $;
(function ($) {
    class $bog_gamengine_spike_net_world extends $giper_baza_dict.with({
        Heroes: $giper_baza_dict_to($bog_gamengine_spike_net_hero),
    }) {
    }
    $.$bog_gamengine_spike_net_world = $bog_gamengine_spike_net_world;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    $.$bog_gamengine_spike_net_land = 'UHhZpFrc_naf5XUWK';
    $.$bog_gamengine_spike_net_alive = 15;
})($ || ($ = {}));
(function ($) {
    var $$;
    (function ($$) {
        class $bog_gamengine_spike_net extends $.$bog_gamengine_spike_net {
            auto() {
                this.pin();
                this.my_hero_ready();
            }
            pinned = '';
            master_url() {
                const arg = this.$.$mol_state_arg.value('master');
                if (!arg)
                    return '';
                return (/^(https?|wss?):/.test(arg) ? arg : 'http://' + arg).replace(/\/?$/, '/');
            }
            pin() {
                const url = this.master_url();
                if (!url || this.pinned === url)
                    return;
                this.pinned = url;
                const yard = this.$.$giper_baza_yard;
                yard.masters_default.length = 0;
                yard.masters = () => [url];
                const live = this.$.$giper_baza_glob.yard();
                live.master_cursor(1);
                live.master_cursor(0);
            }
            land_link() {
                this.pin();
                if ($.$bog_gamengine_spike_net_land)
                    return $.$bog_gamengine_spike_net_land;
                return this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]]).link().str;
            }
            land() {
                return this.$.$giper_baza_glob.Land(new $giper_baza_link(this.land_link()));
            }
            world() {
                return this.land().Data($bog_gamengine_spike_net_world);
            }
            my_id() {
                return $mol_guid();
            }
            my_hero_ready() {
                const hero = this.world().Heroes('auto')?.key(this.my_id(), 'auto') ?? null;
                if (!hero)
                    return false;
                if (hero.X()?.val() == null) {
                    const pos = this.hero_pos();
                    hero.X('auto').val(pos[0]);
                    hero.Y('auto').val(pos[1]);
                }
                return true;
            }
            my_hero() {
                if (!this.my_hero_ready())
                    return null;
                return this.world().Heroes()?.key(this.my_id()) ?? null;
            }
            other(id) {
                return this.world().Heroes()?.key(id) ?? null;
            }
            other_ids() {
                const heroes = this.world().Heroes();
                if (!heroes)
                    return [];
                const now = Date.now();
                const fresh = [];
                for (const key of heroes.keys()) {
                    const id = String(key);
                    if (id === this.my_id())
                        continue;
                    const changed = this.other(id)?.last_change()?.valueOf() ?? 0;
                    if (now - changed < $.$bog_gamengine_spike_net_alive * 1000)
                        fresh.push([id, changed]);
                }
                return fresh.sort((a, b) => b[1] - a[1]).map(([id]) => id);
            }
            other_pos(id) {
                const hero = this.other(id);
                return new Float32Array([hero?.X()?.val() ?? 0, hero?.Y()?.val() ?? 0, 0]);
            }
            other_tint() {
                return new Float32Array([1, 0.5, 0.5, 1]);
            }
            others() {
                return this.other_ids().map(id => this.Other(id));
            }
            cam_pos() {
                return new Float32Array([0, 0, 0]);
            }
            hero_pos(next) {
                return next ?? new Float32Array([0, 0, 0]);
            }
            sprites() {
                return [this.Hero_sprite(), ...this.others()];
            }
            nodes() {
                return [this.Hero(), ...this.sprites()];
            }
            net_stat() {
                const pos = this.hero_pos();
                const ids = this.other_ids();
                const xy = (pos) => `${pos[0].toFixed(2)} × ${pos[1].toFixed(2)}`;
                const seen = ids.length ? this.other(ids[0])?.last_change()?.toString('hh:mm:ss') ?? '' : '';
                return [
                    `me ${this.my_id()} ${xy(pos)}`,
                    `others ${ids.length}`,
                    ids.map(id => `${id} ${xy(this.other_pos(id))}`).join(', ') || 'nobody',
                    `seen ${seen || 'never'}`,
                    `pushes ${this.Hero().pushes}`,
                    `land ${this.land_link()}`,
                    `master ${this.$.$giper_baza_glob.yard().master_current() ?? 'none'}`,
                ].join(' | ');
            }
        }
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "land_link", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "my_id", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "my_hero_ready", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "other_ids", null);
        __decorate([
            $mol_mem_key
        ], $bog_gamengine_spike_net.prototype, "other_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "other_tint", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "others", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "cam_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "hero_pos", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "sprites", null);
        __decorate([
            $mol_mem
        ], $bog_gamengine_spike_net.prototype, "nodes", null);
        $$.$bog_gamengine_spike_net = $bog_gamengine_spike_net;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($bog_gamengine_spike_net, {
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
            Draw: {
                flex: {
                    grow: 1,
                },
                alignSelf: 'stretch',
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
            return new Float32Array([1, 0.2, 0.2, 1]);
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
		Net(){
			const obj = new this.$.$bog_gamengine_spike_net();
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
				"net": (this.Net())
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
	($mol_mem(($.$bog_gamengine_demo.prototype), "Net"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Batch"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "cam_deep_pos"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Clock"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Scene"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Spin"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Cam_flat"));
	($mol_mem(($.$bog_gamengine_demo.prototype), "Cam_deep"));


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
                const maps = [this.Flat().Key().keys(), this.Room().Key().keys(), this.Net().Key().keys()];
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


//# sourceMappingURL=node.js.map
